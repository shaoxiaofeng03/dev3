---
layout: home

hero:
  name: 20 周 · Java → AI
  text: 从后端工程到 AI 应用 / Agent 开发
  tagline: 2026.11.23 → 2027.04.11 ｜ 工作日 2h + 周末 8h ｜ 目标：4 月拿到 offer
  image:
    src: /logo.svg
    alt: logo
  actions:
    - theme: brand
      text: 看 20 周总览
      link: /plan/
    - theme: alt
      text: 今天该做什么
      link: /checkin

features:
  - icon: 🗺️
    title: 20 周，倒排到 offer
    details: 从 11 月 23 日到 4 月 11 日，六个阶段、三个项目、两次模拟面，3 月中旬开始投递。
  - icon: ✅
    title: 每天的任务都能量化
    details: 工作日 50min 主线 + 25min 算法 + 25min 记忆卡；周末 8h 项目日。勾选即打卡。
  - icon: 🎴
    title: 记忆卡按 SM-2 复习
    details: 100+ 张卡片，手机翻卡、四档评分，到期自动排队，进度可同步到 GitHub。
  - icon: 🧱
    title: 两个深项目 + 一个 Java 项目
    details: RAG 知识库、Agent 系统、Spring AI 企业级集成——用 Java 背景做差异化，而不是和科班拼算法。
  - icon: 📝
    title: 全部是 Markdown
    details: 内容源在 plan/ 目录，一条命令生成所有页面；站点用 VitePress 构建，部署在 GitHub Pages。
  - icon: 📱
    title: 手机上也能用
    details: 响应式布局，打卡和翻卡都适配手机；数据存本机，配置 Token 后可多端同步。
---

<div class="home-section">

<ClientOnly><TodayPanel /></ClientOnly>

## 三个入口

<div class="entry-grid">
  <a class="entry" href="/dev3/plan/">
    <span class="entry-icon">🗺️</span>
    <strong>20 周路线图</strong>
    <span>阶段划分、每周目标、每日任务与交付物</span>
  </a>
  <a class="entry" href="/dev3/study/">
    <span class="entry-icon">📖</span>
    <strong>学习文档</strong>
    <span>每天的知识点、阅读顺序、动手与自检</span>
  </a>
  <a class="entry" href="/dev3/checkin">
    <span class="entry-icon">✅</span>
    <strong>打卡与进度</strong>
    <span>热力图、连续天数、每周完成度、GitHub 同步</span>
  </a>
  <a class="entry" href="/dev3/cards/">
    <span class="entry-icon">🎴</span>
    <strong>记忆卡</strong>
    <span>按周组织的背诵卡 + 间隔重复复习</span>
  </a>
  <a class="entry" href="/dev3/guide/ai-map">
    <span class="entry-icon">🧭</span>
    <strong>AI 技术地图</strong>
    <span>从应用到基建的六层分层图，可放大看</span>
  </a>
</div>

## 这份计划不一样的地方

**它假设你会失败。** 第 11 周是春节缓冲周，第 19 周是面试高峰而不是学新东西——计划里预留了还债和状态下滑的空间。

**它不追求「学完」。** 20 周只做三件事：把 RAG 做深、把 Agent 做可控、把 Java 栈接上 AI。其余内容都是为这三件事服务的。

**它把 Java 当资产，不是包袱。** 你要投的是「AI 应用开发」，不是「算法工程师」。企业里大量系统是 Java 的，能把 AI 安全接进存量系统的人，比会调 API 的人稀缺得多。

</div>

<style>
.entry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 12px;
  margin: 16px 0 8px;
}
.entry {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.entry:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}
.entry-icon {
  font-size: 20px;
}
.entry strong {
  font-size: 14.5px;
}
.entry span:last-child {
  font-size: 12.5px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
@media (max-width: 720px) {
  .entry-grid {
    grid-template-columns: 1fr;
  }
}
</style>


