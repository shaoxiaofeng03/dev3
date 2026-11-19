<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { quickrefOf, type QuickRefItem } from '../composables/quickref';

const props = withDefaults(defineProps<{ topic?: string }>(), { topic: 'python' });

const data = computed(() => quickrefOf(props.topic));
const groups = computed(() => data.value?.groups ?? []);
const allItems = computed<QuickRefItem[]>(() => groups.value.flatMap((g) => g.items));

const STORE = `dev3.quickref.v1.${props.topic}`;

type Filter = 'all' | 'pitfall' | 'outline';
const filter = ref<Filter>('all');
const opened = ref<Record<string, boolean>>({});
const viewed = ref<Record<string, boolean>>({});

const filters: { key: Filter; text: string }[] = [
  { key: 'all', text: '全部' },
  { key: 'pitfall', text: '只看易坑' },
  { key: 'outline', text: '只看大纲' },
];

const filtered = computed(() =>
  groups.value
    .map((g) => ({
      ...g,
      items: g.items.filter((it) => filter.value === 'all' || it.kind === filter.value),
    }))
    .filter((g) => g.items.length > 0)
);

const visibleItems = computed(() => filtered.value.flatMap((g) => g.items));
const allOpen = computed(
  () => visibleItems.value.length > 0 && visibleItems.value.every((it) => opened.value[it.id] === true)
);
const viewedCount = computed(() => allItems.value.filter((it) => viewed.value[it.id] === true).length);

function load() {
  if (typeof window === 'undefined') return;
  try {
    const raw = window.localStorage.getItem(STORE);
    if (!raw) return;
    const parsed = JSON.parse(raw) as { viewed?: string[] };
    if (Array.isArray(parsed.viewed)) {
      const next: Record<string, boolean> = {};
      for (const id of parsed.viewed) next[id] = true;
      viewed.value = next;
    }
  } catch {
    /* 本地存储不可用就当作全新 */
  }
}

function persist() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORE, JSON.stringify({ viewed: Object.keys(viewed.value) }));
  } catch {
    /* 隐私模式写不进去，忽略 */
  }
}

onMounted(load);
watch(viewed, persist, { deep: true });

function toggle(id: string) {
  if (opened.value[id]) {
    const next = { ...opened.value };
    delete next[id];
    opened.value = next;
    return;
  }
  opened.value = { ...opened.value, [id]: true };
  if (!viewed.value[id]) viewed.value = { ...viewed.value, [id]: true };
}

function toggleAll() {
  if (allOpen.value) {
    const next = { ...opened.value };
    for (const it of visibleItems.value) delete next[it.id];
    opened.value = next;
    return;
  }
  const next = { ...opened.value };
  const seen = { ...viewed.value };
  for (const it of visibleItems.value) {
    next[it.id] = true;
    seen[it.id] = true;
  }
  opened.value = next;
  viewed.value = seen;
}

function reset() {
  opened.value = {};
  viewed.value = {};
}

type Tok = { t: 'text' | 'code' | 'bold'; v: string };

/** 把答案里的 `行内代码` 与 **加粗** 拆成片段，避免引一个 markdown 渲染器 */
function tokens(text: string): Tok[] {
  const out: Tok[] = [];
  const re = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push({ t: 'text', v: text.slice(last, m.index) });
    const raw = m[0];
    if (raw.startsWith('`')) out.push({ t: 'code', v: raw.slice(1, -1) });
    else out.push({ t: 'bold', v: raw.slice(2, -2) });
    last = m.index + raw.length;
  }
  if (last < text.length) out.push({ t: 'text', v: text.slice(last) });
  return out;
}
</script>

<template>
  <div class="qr">
    <div class="qr-toolbar">
      <div class="qr-tabs" role="tablist">
        <button
          v-for="f in filters"
          :key="f.key"
          type="button"
          role="tab"
          class="qr-tab"
          :class="{ active: filter === f.key }"
          :aria-selected="filter === f.key"
          @click="filter = f.key"
        >
          {{ f.text }}
        </button>
      </div>
      <button type="button" class="qr-toggle" :class="{ on: allOpen }" @click="toggleAll">
        {{ allOpen ? '全部收起' : '全部展开' }}
      </button>
    </div>

    <p class="qr-meta">
      共 {{ visibleItems.length }} 条<template v-if="filter !== 'all'">（已筛选）</template>
      · 已看 {{ viewedCount }} / {{ allItems.length }}
      <button type="button" class="qr-reset" :disabled="!viewedCount" @click="reset">重置</button>
    </p>

    <p v-if="!allItems.length" class="qr-empty">这个主题还没有内容。</p>

    <div v-for="g in filtered" :key="g.title" class="qr-group">
      <h3 class="qr-gtitle">
        {{ g.title }}<small v-if="g.note"> · {{ g.note }}</small>
      </h3>
      <ul class="qr-list">
        <li v-for="it in g.items" :key="it.id">
          <button
            type="button"
            class="qr-item"
            :class="{ open: opened[it.id], seen: viewed[it.id] }"
            :aria-expanded="opened[it.id] === true"
            @click="toggle(it.id)"
          >
            <span class="qr-kind" :class="it.kind">{{ it.kind === 'pitfall' ? '坑' : '纲' }}</span>
            <span class="qr-q">
              <template v-for="(tok, i) in tokens(it.q)" :key="i">
                <code v-if="tok.t === 'code'">{{ tok.v }}</code>
                <b v-else-if="tok.t === 'bold'">{{ tok.v }}</b>
                <template v-else>{{ tok.v }}</template>
              </template>
            </span>
            <span class="qr-chev" aria-hidden="true">▾</span>
          </button>
          <div v-show="opened[it.id]" class="qr-body">
            <p class="qr-a">
              <template v-for="(tok, i) in tokens(it.a)" :key="i">
                <code v-if="tok.t === 'code'">{{ tok.v }}</code>
                <b v-else-if="tok.t === 'bold'">{{ tok.v }}</b>
                <template v-else>{{ tok.v }}</template>
              </template>
            </p>
            <pre v-if="it.code" class="qr-code"><code>{{ it.code }}</code></pre>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.qr {
  margin: 18px 0;
}
.qr-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}
.qr-tabs {
  display: flex;
  gap: 6px;
}
.qr-tab {
  font-size: 12.5px;
  padding: 5px 11px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}
.qr-tab.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}
.qr-toggle {
  font-size: 12.5px;
  padding: 5px 12px;
  border-radius: 999px;
  border: 1px dashed var(--vp-c-divider);
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
}
.qr-toggle.on {
  border-style: solid;
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.qr-meta {
  font-size: 11.5px;
  color: var(--vp-c-text-3);
  margin: 8px 0 4px;
}
.qr-reset {
  margin-left: 6px;
  font-size: 11.5px;
  padding: 1px 8px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: transparent;
  color: var(--vp-c-text-3);
  cursor: pointer;
}
.qr-reset:disabled {
  opacity: 0.45;
  cursor: default;
}
.qr-empty {
  font-size: 13px;
  color: var(--vp-c-text-3);
}
.qr-group {
  margin-top: 26px;
}
.qr-gtitle {
  font-size: 15px;
  margin: 0 0 10px;
  padding: 0;
  border: none;
}
.qr-gtitle small {
  font-weight: 400;
  color: var(--vp-c-text-3);
  font-size: 12px;
}
.qr-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.qr-item {
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 9px;
  text-align: left;
  padding: 11px 13px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 14px;
  line-height: 1.6;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;
}
.qr-item:hover {
  border-color: var(--vp-c-brand-1);
}
.qr-item.open {
  border-color: var(--vp-c-brand-1);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-color: transparent;
  background: var(--vp-c-bg);
}
.qr-item:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
.qr-kind {
  flex: none;
  margin-top: 2px;
  font-size: 11px;
  line-height: 1.5;
  padding: 1px 6px;
  border-radius: 6px;
  font-weight: 600;
}
.qr-kind.pitfall {
  color: #c2410c;
  background: rgba(249, 115, 22, 0.14);
}
.qr-kind.outline {
  color: #1d4ed8;
  background: rgba(59, 130, 246, 0.14);
}
.dark .qr-kind.pitfall {
  color: #fdba74;
}
.dark .qr-kind.outline {
  color: #93c5fd;
}
.qr-q {
  flex: 1;
}
.qr-q code {
  font-size: 12.5px;
}
.qr-chev {
  flex: none;
  color: var(--vp-c-text-3);
  font-size: 12px;
  transition: transform 0.2s ease;
  margin-top: 2px;
}
.qr-item.open .qr-chev {
  transform: rotate(180deg);
}
.qr-body {
  border: 1px solid var(--vp-c-brand-1);
  border-top: none;
  border-radius: 0 0 12px 12px;
  background: var(--vp-c-bg);
  padding: 12px 13px 14px;
}
.qr-a {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.8;
  color: var(--vp-c-text-1);
  white-space: pre-wrap;
}
.qr-a code {
  font-size: 12.5px;
  padding: 1px 5px;
  border-radius: 5px;
  background: var(--vp-c-default-soft);
}
.qr-code {
  margin: 10px 0 0;
  padding: 12px 14px;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  overflow-x: auto;
  font-size: 12.5px;
  line-height: 1.7;
}
.qr-code code {
  background: none;
  padding: 0;
  font-size: inherit;
  white-space: pre;
}
@media (max-width: 640px) {
  .qr-item {
    font-size: 13.5px;
    padding: 10px 11px;
  }
  .qr-a {
    font-size: 13px;
  }
  .qr-code {
    font-size: 11.5px;
    padding: 10px 11px;
  }
}
</style>
