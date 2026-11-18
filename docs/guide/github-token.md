---
title: 配置 GitHub Token
---

# 配置 GitHub Token（用于打卡同步）

打卡数据要写到仓库里，需要一个有 `Contents: Read and write` 权限的 Token。**推荐用 Fine-grained PAT，只授权 `dev3` 一个仓库**，把风险限制到最小。

## 一、创建 Fine-grained PAT

1. 打开 <https://github.com/settings/personal-access-tokens/new>（GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token）。
2. **Token name**：`dev3-checkin`
3. **Expiration**：90 days（到期重新生成一个即可）
4. **Repository access**：选 `Only select repositories` → 只勾 `dev3`
5. **Permissions → Repository permissions**：
   - `Contents` → **Read and write**（必须）
   - `Metadata` → Read-only（勾了 Contents 后会自动带上）
   - 其他全部保持 No access
6. 点 **Generate token**，复制 `github_pat_...` 开头的字符串。

> Token 只显示一次，先粘贴到打卡页再关页面。

## 二、填到站点里

1. 打开 [打卡页](/checkin)。
2. 展开「🔐 同步设置」。
3. 确认 Owner = `shaoxiaofeng03`，Repo = `dev3`，Branch = `main`。
4. 粘贴 Token → **保存到本机** → **测试连接**。
5. 看到「连接成功」后，随便勾一个任务，点 **同步到 GitHub**。

## 三、验证

打开 <https://github.com/shaoxiaofeng03/dev3/commits/main>，应该能看到一条 `chore(checkin): 同步打卡 YYYY-MM-DD` 的提交。

## 四、安全边界（认真看）

- Token 存在**这台设备的 localStorage** 里，不会提交到仓库，也不会发给除 `api.github.com` 之外的任何域名。
- 能打开这台设备浏览器开发者工具的人，就能拿走 Token——所以：**只授一个仓库、只给 Contents 权限、90 天过期**。
- 不要用 Classic token 的 `repo` 全权限，一旦泄露等于整个账号的仓库都可写。
- 手机丢了 / 换手机：立刻去 GitHub → Settings → Developer settings 撤销这个 Token。
- 公共电脑上用完，点「清除 Token」。

## 五、常见错误

| 现象 | 原因 | 处理 |
| --- | --- | --- |
| 401 | Token 失效或复制时少了字符 | 重新生成，注意不要带空格 |
| 403 | 没给 Contents 写权限，或触发了限流 | 检查权限；等一分钟再试 |
| 404 | owner / repo / branch 写错，或 Token 没勾选该仓库 | 用「测试连接」确认仓库名 |
| 409 / 422 | 远端文件在编辑期间被改过 | 先「从 GitHub 拉取」，再同步 |

## 六、不想用 Token 的替代方案

每周日把打卡页的「导出 JSON」下载下来，手动替换仓库中的 `docs/data/checkins.json` 并提交。功能完全一致，只是麻烦一点。
