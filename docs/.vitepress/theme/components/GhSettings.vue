<script setup lang="ts">
import { ref } from 'vue';
import {
  ghConfig,
  ghBusy,
  ghStatus,
  ghMessage,
  saveConfig,
  testConnection,
  clearToken,
} from '../composables/github';

const form = ref({ ...ghConfig.value });
const showToken = ref(false);
const savedTip = ref(false);

function save() {
  saveConfig({
    owner: form.value.owner.trim() || 'shaoxiaofeng03',
    repo: form.value.repo.trim() || 'dev3',
    branch: form.value.branch.trim() || 'main',
    token: form.value.token.trim(),
  });
  savedTip.value = true;
  window.setTimeout(() => (savedTip.value = false), 2000);
}

async function test() {
  save();
  ghBusy.value = true;
  ghStatus.value = 'idle';
  ghMessage.value = '';
  try {
    ghMessage.value = await testConnection();
    ghStatus.value = 'ok';
  } catch (err) {
    ghMessage.value = err instanceof Error ? err.message : String(err);
    ghStatus.value = 'error';
  } finally {
    ghBusy.value = false;
  }
}

function clear() {
  clearToken();
  form.value.token = '';
}
</script>

<template>
  <details class="gh-settings">
    <summary>
      <span class="gh-title">🔐 同步设置（GitHub）</span>
      <span class="gh-badge" :class="ghConfig.token ? 'on' : 'off'">
        {{ ghConfig.token ? '已配置' : '未配置' }}
      </span>
    </summary>

    <div class="gh-body">
      <p class="gh-hint">
        配置一次即可在手机和电脑之间同步打卡与复习进度。Token 只保存在这台设备的浏览器里，不会提交到仓库。
      </p>

      <div class="gh-grid">
        <label>
          <span>Owner</span>
          <input v-model="form.owner" type="text" placeholder="shaoxiaofeng03" autocomplete="off" />
        </label>
        <label>
          <span>Repo</span>
          <input v-model="form.repo" type="text" placeholder="dev3" autocomplete="off" />
        </label>
        <label>
          <span>Branch</span>
          <input v-model="form.branch" type="text" placeholder="main" autocomplete="off" />
        </label>
        <label class="gh-token">
          <span>Fine-grained PAT（Contents: Read and write）</span>
          <span class="gh-token-row">
            <input
              v-model="form.token"
              :type="showToken ? 'text' : 'password'"
              placeholder="github_pat_..."
              autocomplete="off"
              spellcheck="false"
            />
            <button type="button" class="gh-mini" @click="showToken = !showToken">
              {{ showToken ? '隐藏' : '显示' }}
            </button>
          </span>
        </label>
      </div>

      <div class="gh-actions">
        <button type="button" class="gh-btn primary" @click="save">保存到本机</button>
        <button type="button" class="gh-btn" :disabled="ghBusy" @click="test">
          {{ ghBusy ? '测试中…' : '测试连接' }}
        </button>
        <button type="button" class="gh-btn ghost" @click="clear">清除 Token</button>
        <span v-if="savedTip" class="gh-ok">已保存</span>
      </div>

      <p v-if="ghMessage" class="gh-msg" :class="ghStatus">{{ ghMessage }}</p>

      <p class="gh-warn">
        安全提醒：Token 存在 localStorage，能读到浏览器数据的人就能拿到它。请用
        <strong>Fine-grained PAT，只授权 dev3 这一个仓库的 Contents 读写</strong>，并设置 90 天过期。手机丢失时去
        GitHub → Settings → Developer settings 立即撤销。
        <a href="/dev3/guide/github-token">怎么创建 →</a>
      </p>
    </div>
  </details>
</template>

<style scoped>
.gh-settings {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px 14px;
  background: var(--vp-c-bg-soft);
  margin: 16px 0;
}
.gh-settings summary {
  cursor: pointer;
  display: flex;
  gap: 10px;
  align-items: center;
  font-weight: 600;
  list-style: none;
}
.gh-settings summary::-webkit-details-marker {
  display: none;
}
.gh-title {
  font-size: 14px;
}
.gh-badge {
  font-size: 11px;
  padding: 1px 8px;
  border-radius: 999px;
  font-weight: 500;
}
.gh-badge.on {
  color: #0a7d32;
  background: rgba(16, 185, 129, 0.15);
}
.gh-badge.off {
  color: var(--vp-c-text-2);
  background: var(--vp-c-default-soft);
}
.gh-body {
  margin-top: 12px;
  font-size: 13px;
}
.gh-hint {
  color: var(--vp-c-text-2);
  margin: 0 0 10px;
  line-height: 1.6;
}
.gh-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.gh-grid label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}
.gh-token {
  grid-column: 1 / -1;
}
.gh-token-row {
  display: flex;
  gap: 8px;
}
.gh-token-row input {
  flex: 1;
}
.gh-grid input {
  width: 100%;
  padding: 7px 9px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-family: var(--vp-font-family-mono, monospace);
}
.gh-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
  align-items: center;
}
.gh-btn {
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13px;
  cursor: pointer;
}
.gh-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.gh-btn.primary {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}
.gh-btn.primary:hover {
  opacity: 0.9;
  color: #fff;
}
.gh-btn.ghost {
  color: var(--vp-c-text-2);
}
.gh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.gh-mini {
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
}
.gh-ok {
  color: #0a7d32;
  font-size: 12px;
}
.gh-msg {
  margin: 10px 0 0;
  padding: 8px 10px;
  border-radius: 8px;
  font-size: 12px;
  line-height: 1.5;
  background: var(--vp-c-default-soft);
}
.gh-msg.ok {
  color: #0a7d32;
  background: rgba(16, 185, 129, 0.12);
}
.gh-msg.error {
  color: #b91c1c;
  background: rgba(239, 68, 68, 0.12);
}
.gh-warn {
  margin: 12px 0 0;
  font-size: 11.5px;
  line-height: 1.6;
  color: var(--vp-c-text-3);
}
.gh-warn a {
  color: var(--vp-c-brand-1);
}
@media (max-width: 640px) {
  .gh-grid {
    grid-template-columns: 1fr;
  }
}
</style>
