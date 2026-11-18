<script setup lang="ts">
import { computed, ref } from 'vue';
import { withBase } from 'vitepress';
import { weeks, pad2 } from '../composables/plan';
import { cards } from '../composables/cards';

type EntryType = 'plan' | 'cards' | 'qa';

interface IndexEntry {
  type: EntryType;
  week: number;
  title: string;
  text: string;
  href: string;
}

function buildIndex(): IndexEntry[] {
  const out: IndexEntry[] = [];
  for (const w of weeks) {
    const parts = [
      w.theme,
      w.goal,
      w.why,
      ...w.concepts,
      ...w.deliverables,
      ...w.checkpoints,
      ...(w.interview ?? []),
      ...(w.days ?? []).map((d) => `${d.focus} ${d.tasks.map((t) => t.text).join(' ')}`),
      ...(w.checklist ?? []).map((c) => c.text),
    ];
    out.push({
      type: 'plan',
      week: w.n,
      title: `W${w.n} · ${w.theme}`,
      text: parts.join(' ｜ '),
      href: `/plan/week-${pad2(w.n)}`,
    });
    for (const q of w.interview ?? []) {
      out.push({
        type: 'qa',
        week: w.n,
        title: q,
        text: `${w.theme} ｜ 第 ${w.n} 周面试题`,
        href: `/plan/week-${pad2(w.n)}`,
      });
    }
  }
  for (const c of cards) {
    out.push({
      type: 'cards',
      week: c.week,
      title: c.front,
      text: `${c.back} ｜ ${c.tag}`,
      href: `/cards/week-${pad2(c.week)}`,
    });
  }
  return out;
}

const index = buildIndex();
const query = ref('');
const type = ref<'all' | EntryType>('all');

const typeLabels: { key: 'all' | EntryType; text: string }[] = [
  { key: 'all', text: '全部' },
  { key: 'plan', text: '周计划' },
  { key: 'cards', text: '记忆卡' },
  { key: 'qa', text: '面试题' },
];

const hot = ['混合检索', '评测集', '多智能体', 'MCP', '幻觉', '向量库', '记忆', 'KV cache'];

const terms = computed(() =>
  query.value
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean)
);

const results = computed(() => {
  const ts = terms.value;
  if (!ts.length) return [];
  const pool = type.value === 'all' ? index : index.filter((e) => e.type === type.value);
  const scored: { entry: IndexEntry; score: number }[] = [];
  for (const e of pool) {
    const title = e.title.toLowerCase();
    const text = e.text.toLowerCase();
    let score = 0;
    let ok = true;
    for (const t of ts) {
      const inTitle = title.includes(t);
      const inText = text.includes(t);
      if (!inTitle && !inText) {
        ok = false;
        break;
      }
      score += (inTitle ? 10 : 0) + (inText ? 3 : 0);
    }
    if (ok) scored.push({ entry: e, score });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, 40).map((s) => s.entry);
});

function esc(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string));
}

function snippet(text: string): string {
  const t = terms.value[0] ?? '';
  const idx = t ? text.toLowerCase().indexOf(t) : -1;
  const start = idx > 30 ? idx - 30 : 0;
  return esc(text.slice(start, start + 110)).replace(
    new RegExp(`(${terms.value.map((x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi'),
    '<mark>$1</mark>'
  );
}

const typeText: Record<EntryType, string> = { plan: '周计划', cards: '记忆卡', qa: '面试题' };
</script>

<template>
  <div class="ss">
    <div class="ss-input">
      <input
        v-model="query"
        type="search"
        placeholder="搜知识点、面试题、记忆卡…（支持空格分词）"
        autocomplete="off"
        spellcheck="false"
      />
    </div>

    <div class="ss-toolbar">
      <div class="ss-types">
        <button
          v-for="t in typeLabels"
          :key="t.key"
          type="button"
          class="ss-tab"
          :class="{ active: type === t.key }"
          @click="type = t.key"
        >
          {{ t.text }}
        </button>
      </div>
      <span class="ss-count" v-if="terms.length">
        {{ results.length ? `约 ${results.length} 条结果` : '没有匹配' }}
      </span>
    </div>

    <div v-if="!terms.length" class="ss-hot">
      <p>试着搜：</p>
      <button v-for="h in hot" :key="h" type="button" class="ss-chip" @click="query = h">{{ h }}</button>
    </div>

    <div v-else-if="!results.length" class="ss-empty">
      <p>没找到「{{ query }}」。</p>
      <p class="muted">换成更短的关键词，或从左侧目录按周翻。</p>
    </div>

    <ul v-else class="ss-list">
      <li v-for="(r, i) in results" :key="i">
        <a :href="withBase(r.href)">
          <span class="ss-type" :class="r.type">{{ typeText[r.type] }}</span>
          <span class="ss-title" v-html="snippet(r.title)"></span>
          <span class="ss-snippet" v-html="snippet(r.text)"></span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.ss {
  margin: 16px 0;
}
.ss-input input {
  width: 100%;
  padding: 11px 14px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 15px;
}
.ss-input input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}
.ss-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin: 10px 0 14px;
  flex-wrap: wrap;
}
.ss-types {
  display: flex;
  gap: 6px;
}
.ss-tab {
  font-size: 12.5px;
  padding: 5px 11px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
}
.ss-tab.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}
.ss-count {
  font-size: 11.5px;
  color: var(--vp-c-text-3);
}
.ss-hot p {
  font-size: 12.5px;
  color: var(--vp-c-text-3);
  margin: 0 0 8px;
}
.ss-chip {
  font-size: 12px;
  padding: 4px 10px;
  margin: 0 6px 8px 0;
  border-radius: 999px;
  border: 1px dashed var(--vp-c-divider);
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
}
.ss-chip:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.ss-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.ss-list li {
  border-bottom: 1px solid var(--vp-c-divider);
}
.ss-list a {
  display: block;
  padding: 12px 4px;
  text-decoration: none;
  color: inherit;
}
.ss-list a:hover {
  background: var(--vp-c-bg-soft);
}
.ss-type {
  display: inline-block;
  font-size: 10.5px;
  padding: 1px 7px;
  border-radius: 999px;
  margin-right: 8px;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-3);
  vertical-align: middle;
}
.ss-type.cards {
  color: #7c3aed;
  background: rgba(139, 92, 246, 0.14);
}
.ss-type.qa {
  color: #b45309;
  background: rgba(245, 158, 11, 0.16);
}
.ss-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.ss-snippet {
  display: block;
  margin-top: 4px;
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}
.ss-snippet :deep(mark),
.ss-title :deep(mark) {
  background: rgba(250, 204, 21, 0.35);
  color: inherit;
  border-radius: 2px;
  padding: 0 1px;
}
.ss-empty p {
  font-size: 13.5px;
}
.muted {
  color: var(--vp-c-text-3);
  font-size: 12.5px;
}
</style>
