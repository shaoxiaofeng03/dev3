# dev3 · Java 后端 → AI 应用 / Agent 开发 · 20 周作战计划

一套**可执行、可打卡、可复习**的转行计划站点。所有内容以 Markdown / JSON 存储，用 VitePress 构建，部署在 GitHub Pages。

- 站点：<https://shaoxiaofeng03.github.io/dev3/>
- 周期：2026-11-23 → 2027-04-11（20 周，约 520 小时）
- 目标：2027 年 4 月拿到 AI 应用 / Agent 开发方向 offer
- 投递策略：南京为主场（约 6 成）+ 上海 / 杭州补充，详见站点「南京岗位地图」

## 这套计划解决什么问题

| 常见问题 | 这里的做法 |
| --- | --- |
| 收藏了几十套教程，不知道今天该干什么 | 20 周 × 每天 2 小时的具体任务，勾选即打卡 |
| 学完就忘 | 每周 6 张左右记忆卡，SM-2 间隔重复，手机可翻 |
| 做了很多 demo，面试讲不出深度 | 两个深项目（RAG、Agent）+ 一个 Java 企业级项目，每个都有评测数据和失败案例 |
| 转 AI 就得丢掉 Java 经验 | 用 Spring AI / LangChain4j 做差异化，Java 后端经验是资产 |
| 计划排太满，春节一断就全崩 | 第 11 周预留春节缓冲周，第 19 周是面试高峰而非新课 |

## 目录结构

```
.
├── plan/                        # 唯一内容数据源
│   ├── index.mjs                # 元信息、阶段、20 周合并
│   ├── weeks-01-04.mjs          # 第 1–4 周：每日细化
│   └── weeks-05-20.mjs          # 第 5–20 周：周粒度 + 清单
├── scripts/build-content.mjs    # 生成 md 页面与 plan/cards JSON
├── docs/
│   ├── .vitepress/              # 站点配置与主题组件
│   │   ├── config.mts
│   │   └── theme/
│   │       ├── components/      # 打卡、热力图、记忆卡、搜索
│   │       └── composables/     # 打卡状态、SM-2、GitHub API
│   ├── plan/                    # 生成：20 个周页面
│   ├── cards/                   # 生成：20 个记忆卡页面
│   ├── data/                    # plan.json / cards.json / checkins.json
│   ├── guide/                   # 手写：使用指南
│   ├── index.md                 # 首页
│   ├── checkin.md               # 打卡页
│   └── search.md                # 搜索页
├── .github/workflows/deploy.yml # 自动部署到 GitHub Pages
└── package.json
```

## 本地开发

```bash
npm install
npm run dev      # 生成内容 + http://localhost:5173/dev3/
npm run build    # 构建到 docs/.vitepress/dist
npm run preview  # 预览构建产物
```

修改内容：编辑 `plan/*.mjs` → `npm run content` → 刷新。

## 打卡与记忆卡

- **打卡**：勾选任务写入浏览器 `localStorage`；配置 Fine-grained PAT 后可一键提交到 `docs/data/checkins.json`（多端同步）。
- **记忆卡**：SM-2 算法安排复习间隔，状态存 `localStorage` 与 `docs/data/review-state.json`。
- **安全**：Token 只存在本机，建议只授权本仓库 `Contents: Read and write` 并设置 90 天过期。详见站点内「配置 GitHub Token」。

## 部署

推送到 `main` 后 GitHub Actions 自动构建并发布。首次需要在仓库 **Settings → Pages** 把 Source 设为 **GitHub Actions**。

## 数据说明

生成的页面不要手改（会被覆盖）。打卡与复习数据可以直接编辑 JSON 并提交。格式见 `docs/guide/data-format.md`。
