import { ref } from 'vue';

export interface GhConfig {
  owner: string;
  repo: string;
  branch: string;
  token: string;
}

const CFG_KEY = 'dev3.gh.v1';

export const DEFAULT_GH: GhConfig = {
  owner: 'shaoxiaofeng03',
  repo: 'dev3',
  branch: 'main',
  token: '',
};

const isBrowser = typeof window !== 'undefined';

function load(): GhConfig {
  if (!isBrowser) return { ...DEFAULT_GH };
  try {
    const raw = window.localStorage.getItem(CFG_KEY);
    if (!raw) return { ...DEFAULT_GH };
    return { ...DEFAULT_GH, ...(JSON.parse(raw) as Partial<GhConfig>) };
  } catch {
    return { ...DEFAULT_GH };
  }
}

export const ghConfig = ref<GhConfig>(load());
export const ghBusy = ref(false);
export const ghStatus = ref<'idle' | 'ok' | 'error' | 'warn'>('idle');
export const ghMessage = ref('');

export function saveConfig(cfg: GhConfig): void {
  ghConfig.value = { ...cfg };
  if (isBrowser) {
    window.localStorage.setItem(CFG_KEY, JSON.stringify(ghConfig.value));
  }
  ghStatus.value = 'idle';
  ghMessage.value = '';
}

export function hasToken(): boolean {
  return ghConfig.value.token.trim().length > 0;
}

export function clearToken(): void {
  saveConfig({ ...ghConfig.value, token: '' });
  ghMessage.value = '已清除本机保存的 Token';
  ghStatus.value = 'warn';
}

export class GhConflictError extends Error {
  constructor(message = '远端文件已被修改，出现写入冲突') {
    super(message);
    this.name = 'GhConflictError';
  }
}

export class GhError extends Error {
  status: number;
  constructor(message: string, status = 0) {
    super(message);
    this.name = 'GhError';
    this.status = status;
  }
}

function apiHeaders(): Record<string, string> {
  const h: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  const token = ghConfig.value.token.trim();
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

function fileUrl(path: string): string {
  const { owner, repo } = ghConfig.value;
  return `https://api.github.com/repos/${owner}/${repo}/contents/${path.replace(/^\/+/, '')}`;
}

export function toBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

export function fromBase64(b64: string): string {
  const binary = atob(b64.replace(/\s/g, ''));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function explain(status: number, body: string): string {
  if (status === 401) return 'Token 无效或已过期（401），请重新生成一个 Fine-grained PAT';
  if (status === 403) return 'Token 权限不足或触发限流（403），确认已授予 Contents: Read and write';
  if (status === 404) return '仓库或文件不存在（404），检查 owner / repo / branch 是否正确';
  if (status === 409 || status === 422) return '写入冲突（409/422），稍后重试或先拉取远端数据';
  return `GitHub API 返回 ${status}：${body.slice(0, 200)}`;
}

export interface RemoteFile<T> {
  data: T;
  sha: string;
}

export async function fetchJsonFile<T>(path: string): Promise<RemoteFile<T> | null> {
  const { branch } = ghConfig.value;
  const res = await fetch(`${fileUrl(path)}?ref=${encodeURIComponent(branch)}`, {
    headers: apiHeaders(),
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    const text = await res.text();
    throw new GhError(explain(res.status, text), res.status);
  }
  const json = (await res.json()) as { content: string; sha: string; encoding: string };
  const raw = json.encoding === 'base64' ? fromBase64(json.content) : json.content;
  return { data: JSON.parse(raw) as T, sha: json.sha };
}

export async function putJsonFile<T>(
  path: string,
  data: T,
  message: string,
  sha?: string
): Promise<{ sha: string; commit: string }> {
  const { branch } = ghConfig.value;
  const body: Record<string, unknown> = {
    message,
    content: toBase64(`${JSON.stringify(data, null, 2)}\n`),
    branch,
  };
  if (sha) body.sha = sha;

  const res = await fetch(fileUrl(path), {
    method: 'PUT',
    headers: { ...apiHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (res.status === 409 || res.status === 422) throw new GhConflictError();
  if (!res.ok) {
    const text = await res.text();
    throw new GhError(explain(res.status, text), res.status);
  }
  const json = (await res.json()) as { content: { sha: string }; commit: { sha: string } };
  return { sha: json.content.sha, commit: json.commit.sha };
}

export async function testConnection(): Promise<string> {
  const { owner, repo } = ghConfig.value;
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: apiHeaders(),
  });
  if (res.status === 404) throw new GhError('仓库不存在，或 Token 没有该仓库的访问权限（404）', 404);
  if (!res.ok) {
    const text = await res.text();
    throw new GhError(explain(res.status, text), res.status);
  }
  const json = (await res.json()) as { full_name: string; default_branch: string; permissions?: { push?: boolean } };
  const canPush = json.permissions?.push;
  if (canPush === false) {
    throw new GhError(`已连上 ${json.full_name}，但 Token 没有写权限，请授予 Contents: Read and write`, 403);
  }
  return `连接成功：${json.full_name}（默认分支 ${json.default_branch}）`;
}

/** 用给定 token 拉一次远端文件，用于冲突后重试 */
export async function withConflictRetry<T>(
  read: () => Promise<RemoteFile<T> | null>,
  write: (merged: T, sha?: string) => Promise<{ sha: string; commit: string }>,
  merge: (remote: T | null) => T
): Promise<{ sha: string; commit: string }> {
  const first = await read();
  try {
    return await write(merge(first?.data ?? null), first?.sha);
  } catch (err) {
    if (!(err instanceof GhConflictError)) throw err;
    const second = await read();
    return await write(merge(second?.data ?? null), second?.sha);
  }
}
