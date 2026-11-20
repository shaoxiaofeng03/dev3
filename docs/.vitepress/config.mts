import { defineConfig } from 'vitepress';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { localCheckinsPlugin } from './plugins/localCheckins';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '../data');

let plan = { meta: {}, phases: [], weeks: [] };
try {
  plan = JSON.parse(fs.readFileSync(path.join(dataDir, 'plan.json'), 'utf8'));
} catch {
  console.warn('[vitepress] 未找到 docs/data/plan.json，请先运行 node scripts/build-content.mjs');
}

const pad = (n) => String(n).padStart(2, '0');
const shortTheme = (theme) => (theme.length > 30 ? `${theme.slice(0, 29)}…` : theme);

const planSidebar = [
  { text: '20 周总览', link: '/plan/' },
  ...plan.phases.map((phase) => ({
    text: phase.name,
    collapsed: false,
    items: plan.weeks
      .filter((w) => w.n >= phase.weeks[0] && w.n <= phase.weeks[1])
      .map((w) => ({
        text: `W${w.n} · ${shortTheme(w.theme)}`,
        link: `/plan/week-${pad(w.n)}`,
      })),
  })),
];

const cardsSidebar = [
  { text: '记忆卡总览', link: '/cards/' },
  {
    text: '按周复习',
    collapsed: false,
    items: plan.weeks.map((w) => ({
      text: `W${w.n} · ${w.cards.length} 张`,
      link: `/cards/week-${pad(w.n)}`,
    })),
  },
];

const studySidebar = [
  { text: '学习文档总览', link: '/study/' },
  ...plan.phases.map((phase) => ({
    text: phase.name,
    collapsed: false,
    items: plan.weeks
      .filter((w) => w.n >= phase.weeks[0] && w.n <= phase.weeks[1])
      .map((w) =>
        w.detail === false
          ? { text: `W${w.n} · ${shortTheme(w.theme)}`, link: `/study/week-${pad(w.n)}` }
          : {
              text: `W${w.n} · ${shortTheme(w.theme)}`,
              collapsed: true,
              items: (w.days ?? []).map((d: { focus: string }, i: number) => ({
                text: `D${i + 1} ${d.focus}`,
                link: `/study/w${pad(w.n)}d${i + 1}`,
              })),
            }
      ),
  })),
];

export default defineConfig({
  base: '/dev3/',
  lang: 'zh-CN',
  title: 'AI 应用开发 · 20 周',
  description: 'Java 后端转 AI 应用 / Agent 开发的 20 周作战计划：每日任务、打卡、记忆卡与项目交付。',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
    ['meta', { name: 'theme-color', content: '#5b6cff' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['link', { rel: 'icon', href: '/dev3/favicon.svg' }],
  ],
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    logo: '/logo.svg',
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdatedText: '最后更新',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '主题',
    nav: [
      { text: '总览', link: '/plan/' },
      { text: '学习', link: '/study/' },
      { text: '打卡', link: '/checkin' },
      { text: '记忆卡', link: '/cards/' },
      { text: '搜索', link: '/search' },
      {
        text: '指南',
        items: [
          { text: '怎么用这套站点', link: '/guide/how-to-use' },
          { text: 'AI 技术地图', link: '/guide/ai-map' },
          { text: '南京岗位地图', link: '/guide/market-nanjing' },
          { text: '零基础算法题单', link: '/guide/algo' },
          { text: 'Python 速查', link: '/guide/python-quickref' },
          { text: 'DeepSeek 接入', link: '/guide/deepseek' },
          { text: 'embedding 与 rerank', link: '/guide/embedding' },
          { text: '配置 GitHub Token', link: '/guide/github-token' },
          { text: '数据结构说明', link: '/guide/data-format' },
          { text: '部署到 GitHub Pages', link: '/guide/deploy' },
        ],
      },
    ],
    sidebar: {
      '/plan/': planSidebar,
      '/cards/': cardsSidebar,
      '/study/': studySidebar,
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '怎么用这套站点', link: '/guide/how-to-use' },
            { text: 'AI 技术地图', link: '/guide/ai-map' },
            { text: '南京岗位地图', link: '/guide/market-nanjing' },
            { text: '零基础算法题单', link: '/guide/algo' },
            { text: 'Python 速查', link: '/guide/python-quickref' },
            { text: 'DeepSeek 接入', link: '/guide/deepseek' },
            { text: 'embedding 与 rerank', link: '/guide/embedding' },
            { text: '配置 GitHub Token', link: '/guide/github-token' },
            { text: '数据结构说明', link: '/guide/data-format' },
            { text: '部署到 GitHub Pages', link: '/guide/deploy' },
          ],
        },
      ],
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '没有找到结果，试试「搜索」页',
            resetButtonTitle: '清除',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
          },
        },
      },
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/shaoxiaofeng03/dev3' }],
    footer: {
      message: '20 周作战计划 · 内容与打卡数据均以 Markdown / JSON 存储',
      copyright: 'Built with VitePress',
    },
  },
  vite: {
    plugins: [localCheckinsPlugin(path.join(dataDir, 'checkins.json'))],
    server: {
      host: true,
    },
  },
});

