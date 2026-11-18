---
title: 部署到 GitHub Pages
---

# 部署到 GitHub Pages

目标地址：**<https://shaoxiaofeng03.github.io/dev3/>**

## 一、创建仓库并推送

```bash
# 在项目根目录
git init
git add .
git commit -m "chore: init 20-week plan site"
git branch -M main
git remote add origin https://github.com/shaoxiaofeng03/dev3.git
git push -u origin main
```

如果仓库还不存在，先在 <https://github.com/new> 建一个**公开**仓库，名字必须是 `dev3`（站点 `base` 是按仓库名配的）。

## 二、开启 Pages

1. 仓库 → **Settings** → **Pages**
2. **Build and deployment → Source** 选 **GitHub Actions**（不要选 Deploy from a branch）
3. 回到 **Actions** 标签，等 `Deploy VitePress site to Pages` 跑完（第一次约 1–2 分钟）
4. 打开 <https://shaoxiaofeng03.github.io/dev3/>

工作流已经写在 `.github/workflows/deploy.yml`，推送到 `main` 就会自动构建部署。

## 三、本地预览

```bash
npm install          # 或 pnpm install
npm run dev          # 生成内容 + 启动 http://localhost:5173/dev3/
npm run build        # 生产构建，输出到 docs/.vitepress/dist
npm run preview      # 预览构建产物
```

`dev` 脚本会自动先跑 `scripts/build-content.mjs`，所以你改完 `plan/` 下的数据直接刷新即可。

**同局域网手机预览**：`npm run dev` 已开启 `host: true`，终端会打印 `Network: http://192.168.x.x:5173/dev3/`，手机连同一个 Wi-Fi 就能打开。

## 四、需要改的配置

| 场景 | 改哪里 |
| --- | --- |
| 换仓库名 | `docs/.vitepress/config.mts` 的 `base` |
| 换成 `<用户名>.github.io` 仓库 | `base` 改成 `'/'` |
| 换域名 | 在 `docs/public/` 放 `CNAME` 文件，内容为域名；DNS 加 CNAME 记录指向 `shaoxiaofeng03.github.io` |
| 默认同步仓库 | `docs/.vitepress/theme/composables/github.ts` 的 `DEFAULT_GH` |

## 五、常见问题

**打开是 404 / 样式全丢**：`base` 和仓库名不一致。仓库叫 `dev3` 就必须是 `/dev3/`。

**Actions 失败在 `npm ci`**：本仓库没有提交 `package-lock.json`，工作流用的是 `npm install`；如果你本地生成了 lock 文件也可以提交，改成 `npm ci` 更快。

**推送后 Pages 没更新**：检查 Actions 里最新一次 run 是否成功；Pages 有 CDN 缓存，通常 1 分钟内生效。

**想用自定义域名**：先确认 Pages 设置里 Custom domain 已填，再开 Enforce HTTPS（证书签发可能要几分钟）。
