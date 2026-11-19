---
title: 打卡
---

# 打卡与进度

今天的任务、连续天数、热力图、每周完成度都在这一页。线上（GitHub Pages）勾选会**先保存在这台设备的浏览器里**，配置 GitHub Token 后可同步到仓库；本地 `npm run dev` 时则**直接写入** `docs/data/checkins.json`，提交推送后线上自动更新。

<ClientOnly><CheckinDashboard /></ClientOnly>

## 数据存在哪

| 数据 | 位置 | 说明 |
| --- | --- | --- |
| 打卡记录 | 本地 dev：`docs/data/checkins.json`；线上：本机 `localStorage` + 仓库文件 | 勾选任务、每日笔记、复盘、耗时 |
| 复习进度 | 本机 `localStorage` + 仓库 `docs/data/review-state.json` | 每张卡的间隔、到期日、难度系数 |
| 站点内容 | `plan/` → `docs/` | 由 `scripts/build-content.mjs` 生成 |

两条规则：

1. **本机优先。** 断网也能打卡，页面不会因为网络失败而丢数据。
2. **线上同步是手动的。** 只有点「同步到 GitHub」才会写仓库，避免每勾一下就产生一个 commit。合并规则是「按日期并集 + 较新者覆盖笔记」，所以多端同时打卡不会互相覆盖。
3. **本地 dev 会自动写文件。** 运行 `npm run dev` 时，改动会直接落到 `docs/data/checkins.json`，提交推送即可。

## 本地开发：直接写文件

运行 `npm run dev` 时，打卡页会通过开发服务器把改动**直接写入** `docs/data/checkins.json`，不需要 Token。

1. `npm run dev`
2. 打开 <http://localhost:5173/dev3/checkin>，正常勾选任务、写笔记
3. 页面显示「已写入（时间）」后，提交并推送：
   ```bash
   git add docs/data/checkins.json
   git commit -m "chore(checkin): 打卡 $(date +%F)"
   git push
   ```
4. GitHub Actions 自动重新部署 Pages，约 1–2 分钟后线上更新

> 这个写接口只在 `vitepress dev` 下存在。GitHub Pages 是静态站点，没有写接口；线上打卡仍然用 localStorage + Token 同步，或导出 JSON 手动提交。

## 每天的用法

1. 打开这一页，看「今天」区块，逐条勾掉。
2. 在任务下面点「记录」，写一句收获或卡点，填上实际耗时（可选）。
3. 周日晚在周页面写复盘，然后点「同步到 GitHub」（本地 dev 会自动写文件，直接提交推送即可）。

## 手机怎么用

- 浏览器打开 <https://shaoxiaofeng03.github.io/dev3/checkin>，用「添加到主屏幕」当 App 用。
- 手机上首次使用需要重新填一次 Token（Token 只存在那台设备）。
- 如果不想在手机上放 Token：只勾选不点同步，周日在电脑上统一同步也行——但手机和电脑的记录不会自动合并，需要先「从 GitHub 拉取」。

<ClientOnly><GhSettings /></ClientOnly>

## 常见问题

**勾错了怎么办？** 再点一次取消，记录会从当天条目里移除。

**换了手机 / 清了缓存怎么办？** 在旧设备上「导出 JSON」保存，或直接在新设备上「从 GitHub 拉取」。

**同步报 409 / 422？** 说明远端文件在你编辑期间被改过。代码里已经做了「重新拉取 → 合并 → 重试一次」，如果还失败，先点「从 GitHub 拉取」再同步。

**Token 会不会泄露？** 会存在于本机浏览器的 localStorage。请使用只授权 `dev3` 仓库、只有 Contents 读写权限的 Fine-grained PAT，并设置过期时间。详见 [配置 GitHub Token](/guide/github-token)。

**不想用 Token？** 本地开发直接用 `npm run dev`，打卡会自动写入 `docs/data/checkins.json`，提交推送即可。线上则可以「导出 JSON」，手动替换仓库里的 `docs/data/checkins.json` 再提交。

