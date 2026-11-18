import { computed, reactive, watch } from 'vue';
import baselineCheckins from '../../../data/checkins.json';
import { allWeeksItems, todayStr, weeks, addDays } from './plan';
import {
  fetchJsonFile,
  putJsonFile,
  withConflictRetry,
  hasToken,
  ghConfig,
  GhError,
} from './github';

export interface Entry {
  date: string;
  items: string[];
  note?: string;
  minutes?: number;
  retro?: string;
  updatedAt: string;
}

export interface CheckinFile {
  version: number;
  note?: string;
  entries: Entry[];
}

const STORE_KEY = 'dev3.checkins.v1';
const REMOTE_PATH = 'docs/data/checkins.json';
const isBrowser = typeof window !== 'undefined';

function nowIso(): string {
  return new Date().toISOString();
}

function normalize(entry: Partial<Entry> & { date: string }): Entry {
  return {
    date: entry.date,
    items: Array.isArray(entry.items) ? [...new Set(entry.items)] : [],
    note: entry.note ?? '',
    minutes: Number.isFinite(entry.minutes) ? Number(entry.minutes) : 0,
    retro: entry.retro ?? '',
    updatedAt: entry.updatedAt || nowIso(),
  };
}

export function mergeEntries(a: Entry[], b: Entry[]): Entry[] {
  const map = new Map<string, Entry>();
  for (const raw of [...a, ...b]) {
    if (!raw?.date) continue;
    const e = normalize(raw);
    const prev = map.get(e.date);
    if (!prev) {
      map.set(e.date, e);
      continue;
    }
    const newer = e.updatedAt >= prev.updatedAt ? e : prev;
    map.set(e.date, {
      date: e.date,
      items: [...new Set([...prev.items, ...e.items])],
      note: newer.note || prev.note || e.note || '',
      retro: newer.retro || prev.retro || e.retro || '',
      minutes: Math.max(prev.minutes ?? 0, e.minutes ?? 0),
      updatedAt: newer.updatedAt,
    });
  }
  return [...map.values()].sort((x, y) => x.date.localeCompare(y.date));
}

function readLocal(): Entry[] {
  if (!isBrowser) return [];
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Entry[] | CheckinFile;
    const list = Array.isArray(parsed) ? parsed : parsed.entries;
    return Array.isArray(list) ? list.map((e) => normalize(e)) : [];
  } catch {
    return [];
  }
}

function readBaseline(): Entry[] {
  const base = baselineCheckins as unknown as CheckinFile;
  return Array.isArray(base?.entries) ? base.entries.map((e) => normalize(e)) : [];
}

export const store = reactive<{ entries: Record<string, Entry> }>({
  entries: {},
});

export const loaded = reactive({ value: false });

export function initStore(): void {
  if (loaded.value) return;
  const merged = mergeEntries(readBaseline(), readLocal());
  for (const e of merged) store.entries[e.date] = e;
  loaded.value = true;
}

if (isBrowser) initStore();

watch(
  store,
  () => {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(
        STORE_KEY,
        JSON.stringify({ version: 1, entries: Object.values(store.entries) })
      );
    } catch {
      /* 存储配额满时静默失败，不影响使用 */
    }
  },
  { deep: true }
);

export const doneSet = computed<Set<string>>(() => {
  const s = new Set<string>();
  for (const e of Object.values(store.entries)) {
    for (const id of e.items) s.add(id);
  }
  return s;
});

export function isDone(itemId: string): boolean {
  return doneSet.value.has(itemId);
}

function upsert(date: string): Entry {
  if (!store.entries[date]) {
    store.entries[date] = { date, items: [], note: '', minutes: 0, retro: '', updatedAt: nowIso() };
  }
  return store.entries[date];
}

export function toggleItem(itemId: string, date: string): void {
  const current = doneSet.value.has(itemId);
  if (current) {
    for (const e of Object.values(store.entries)) {
      const idx = e.items.indexOf(itemId);
      if (idx >= 0) {
        e.items.splice(idx, 1);
        e.updatedAt = nowIso();
      }
    }
    return;
  }
  const e = upsert(date);
  e.items.push(itemId);
  e.updatedAt = nowIso();
}

export function setNote(date: string, note: string): void {
  const e = upsert(date);
  e.note = note;
  e.updatedAt = nowIso();
}

export function setRetro(date: string, retro: string): void {
  const e = upsert(date);
  e.retro = retro;
  e.updatedAt = nowIso();
}

export function setMinutes(date: string, minutes: number): void {
  const e = upsert(date);
  e.minutes = Number(minutes) || 0;
  e.updatedAt = nowIso();
}

export function weekStats(n: number): { total: number; done: number; minutes: number; percent: number } {
  const items = allWeeksItems.get(n) ?? [];
  const done = items.filter((i) => doneSet.value.has(i.id)).length;
  const minutes = Object.values(store.entries)
    .filter((e) => e.date >= (weeks[n - 1]?.start ?? '') && e.date <= (weeks[n - 1]?.end ?? ''))
    .reduce((s, e) => s + (e.minutes ?? 0), 0);
  return {
    total: items.length,
    done,
    minutes,
    percent: items.length ? Math.round((done / items.length) * 100) : 0,
  };
}

export const overview = computed(() => {
  const entries = Object.values(store.entries);
  const activeDays = entries.filter((e) => e.items.length > 0).length;
  const totalItems = weeks.reduce((s, w) => s + (allWeeksItems.get(w.n)?.length ?? 0), 0);
  const totalDone = [...doneSet.value].length;
  const totalMinutes = entries.reduce((s, e) => s + (e.minutes ?? 0), 0);

  // 连续打卡：从今天（或昨天）往前数，只要当天有记录就算
  let streak = 0;
  let cursor = todayStr();
  const has = (d: string) => (store.entries[d]?.items.length ?? 0) > 0;
  if (!has(cursor)) cursor = addDays(cursor, -1);
  while (has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }

  return {
    activeDays,
    totalItems,
    totalDone,
    totalMinutes,
    streak,
    percent: totalItems ? Math.round((totalDone / totalItems) * 100) : 0,
  };
});

export interface HeatCell {
  date: string;
  count: number;
  minutes: number;
  inPlan: boolean;
}

export function heatmap(days = 140): HeatCell[] {
  const start = addDays(todayStr(), -(days - 1));
  const out: HeatCell[] = [];
  for (let i = 0; i < days; i += 1) {
    const date = addDays(start, i);
    const e = store.entries[date];
    out.push({
      date,
      count: e?.items.length ?? 0,
      minutes: e?.minutes ?? 0,
      inPlan: date >= weeks[0].start && date <= weeks[weeks.length - 1].end,
    });
  }
  return out;
}

export function recentEntries(limit = 12): Entry[] {
  return Object.values(store.entries)
    .filter((e) => e.items.length || e.note || e.retro)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}

export function exportJson(): string {
  return JSON.stringify({ version: 1, entries: Object.values(store.entries) }, null, 2);
}

export function importJson(text: string): number {
  const parsed = JSON.parse(text) as CheckinFile | Entry[];
  const list = Array.isArray(parsed) ? parsed : parsed.entries;
  if (!Array.isArray(list)) throw new Error('格式不对：需要 { entries: [...] } 或数组');
  const merged = mergeEntries(Object.values(store.entries), list.map((e) => normalize(e)));
  store.entries = {};
  for (const e of merged) store.entries[e.date] = e;
  return merged.length;
}

export function weekMarkdown(n: number): string {
  const w = weeks[n - 1];
  if (!w) return '';
  const stats = weekStats(n);
  const lines = [
    `## 第 ${w.n} 周打卡 · ${w.start} ~ ${w.end}`,
    '',
    `完成 ${stats.done}/${stats.total}（${stats.percent}%），投入 ${Math.round(stats.minutes / 6) / 10} 小时`,
    '',
  ];
  for (const item of allWeeksItems.get(n) ?? []) {
    const mark = doneSet.value.has(item.id) ? 'x' : ' ';
    lines.push(`- [${mark}] ${item.date} ${item.text}`);
  }
  return lines.join('\n');
}

export async function pullFromGithub(): Promise<string> {
  if (!hasToken()) throw new GhError('请先填写 GitHub Token');
  const remote = await fetchJsonFile<CheckinFile>(REMOTE_PATH);
  if (!remote) return '远端还没有打卡文件，先同步一次就会创建';
  const merged = mergeEntries(remote.data.entries ?? [], Object.values(store.entries));
  store.entries = {};
  for (const e of merged) store.entries[e.date] = e;
  return `已拉取远端记录，合并后共 ${merged.length} 天`;
}

export async function pushToGithub(): Promise<string> {
  if (!hasToken()) throw new GhError('请先填写 GitHub Token');
  const local = Object.values(store.entries);
  let result;
  try {
    result = await withConflictRetry<CheckinFile>(
      () => fetchJsonFile<CheckinFile>(REMOTE_PATH),
      (data, sha) => putJsonFile(REMOTE_PATH, data, `chore(checkin): 同步打卡 ${todayStr()}`, sha),
      (remote) => ({
        version: 1,
        note: '打卡数据。可手动编辑，格式见 docs/guide/data-format.md',
        entries: mergeEntries(remote?.entries ?? [], local),
      })
    );
  } catch (err) {
    if (err instanceof GhError && err.status === 404) {
      throw new GhError(`仓库 ${ghConfig.value.owner}/${ghConfig.value.repo} 或路径 ${REMOTE_PATH} 不存在`, 404);
    }
    throw err;
  }
  return `已提交到 GitHub（commit ${result.commit.slice(0, 7)}）`;
}
