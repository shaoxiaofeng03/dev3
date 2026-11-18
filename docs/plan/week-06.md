---
title: 第 6 周 · 生产化：权限、多租户、缓存、限流、成本
description: 2026-12-28 起，P1 RAG
---
<!-- 本页由 scripts/build-content.mjs 自动生成，请勿直接编辑。改 plan/ 下的数据源后重新运行 pnpm content -->


# 第 6 周 · 生产化：权限、多租户、缓存、限流、成本

<div class="week-meta"><span>📅 2026-12-28 ~ 2027-01-03</span><span>⏱ 约 26 小时</span><span>🧭 P1 RAG</span><span>🎴 6 张记忆卡</span></div>

## 本周目标

把「能跑」变成「敢上线」：权限、隔离、成本、稳定性四件事各有一个可讲的方案。

## 为什么这样安排

企业级 AI 应用岗最看重这块，也是你把 Java 后端经验变现的地方——网关、鉴权、审计、限流都是你熟悉的东西。

## 核心概念

- 权限过滤下推到检索层
- 语义缓存的两级设计与失效
- 成本归因与配额

## 本周清单

> 这一周按「周目标 + 清单」推进，开始前把清单拆成 7 天。勾选会实时保存，并可通过打卡页同步到 GitHub。

<ClientOnly><WeekTasks week="6" /></ClientOnly>

## 本周交付

- 权限与多租户方案 + 越权测试用例
- 缓存与限流实现
- 成本核算表 + 压测报告

## 验收标准

- [ ] 能说清「检索后过滤」为什么会泄露数据
- [ ] 能给出成本下降 30% 的具体手段与代价

## 面试会问到

- RAG 系统怎么做权限控制？
- 语义缓存有什么坑？
- AI 功能上线怎么控制成本？

## 参考资料

- [Qdrant · Filtering](https://qdrant.tech/documentation/concepts/filtering/)
- [Langfuse · Cost tracking](https://langfuse.com/docs/model-usage-and-cost)

## 记忆卡

<ClientOnly><FlashCards week="6" /></ClientOnly>

## 复盘问题

- 权限这块，有没有测出真实漏洞？
> 周日晚用 30 分钟写进打卡页的「本周复盘」。

[← 返回 20 周总览](/plan/)　|　[第 6 周记忆卡](/cards/week-06)
