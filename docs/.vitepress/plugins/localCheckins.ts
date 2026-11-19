import fs from 'node:fs/promises';
import path from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin } from 'vite';

const ROUTE = '/__local/checkins';
const MAX_BODY = 2 * 1024 * 1024;
const NOTE = '打卡数据。可手动编辑，格式见 docs/guide/data-format.md';

interface EntryLike {
  date: string;
  items: string[];
  [key: string]: unknown;
}

interface CheckinPayload {
  version?: number;
  note?: string;
  entries: EntryLike[];
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

async function readBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buf.length;
    if (size > MAX_BODY) throw new Error('请求体过大');
    chunks.push(buf);
  }
  return Buffer.concat(chunks).toString('utf8');
}

function isCheckinPayload(value: unknown): value is CheckinPayload {
  if (!value || typeof value !== 'object') return false;
  const entries = (value as { entries?: unknown }).entries;
  if (!Array.isArray(entries)) return false;
  return entries.every((entry) => {
    if (!entry || typeof entry !== 'object') return false;
    const e = entry as { date?: unknown; items?: unknown };
    return (
      typeof e.date === 'string' &&
      Array.isArray(e.items) &&
      e.items.every((id) => typeof id === 'string')
    );
  });
}

/**
 * 开发服务器专用接口：让打卡页直接读写仓库里的 docs/data/checkins.json。
 *
 * 只在 `vitepress dev` 时注册（apply: 'serve'），构建和 GitHub Pages 上都不会存在。
 */
export function localCheckinsPlugin(file: string): Plugin {
  const absFile = path.resolve(file);

  return {
    name: 'dev3-local-checkins',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = (req.url ?? '/').split('?')[0];
        if (pathname !== ROUTE) {
          next();
          return;
        }

        try {
          if (req.method === 'GET') {
            const raw = await fs.readFile(absFile, 'utf8');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.setHeader('Cache-Control', 'no-store');
            res.end(raw);
            return;
          }

          if (req.method === 'PUT') {
            const raw = await readBody(req);
            const parsed = JSON.parse(raw) as unknown;
            if (!isCheckinPayload(parsed)) {
              sendJson(res, 400, { ok: false, error: '打卡数据结构不合法' });
              return;
            }
            const payload: CheckinPayload = {
              version: 1,
              note: parsed.note || NOTE,
              entries: parsed.entries,
            };
            await fs.writeFile(absFile, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
            sendJson(res, 200, { ok: true, entries: payload.entries.length });
            return;
          }

          res.setHeader('Allow', 'GET, PUT');
          sendJson(res, 405, { ok: false, error: '只支持 GET / PUT' });
        } catch (err) {
          sendJson(res, 500, {
            ok: false,
            error: err instanceof Error ? err.message : String(err),
          });
        }
      });
    },
    handleHotUpdate({ file }) {
      // 写入后不要让 Vite 因 JSON 变化触发整页刷新；
      // 页面自己维护 store，手动刷新时会通过接口重新读取。
      if (path.resolve(file) === absFile) return [];
      return;
    },
  };
}
