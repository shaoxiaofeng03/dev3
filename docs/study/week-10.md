---
title: 第 10 周学习指南 · 多智能体、Agent 评测与可观测
description: 2027-01-25 起，每周学习文档
---
<!-- 本页由 scripts/build-content.mjs 自动生成，请勿直接编辑。改 plan/ 下的数据源后重新运行 npm run content -->


# 第 10 周学习指南 · 多智能体、Agent 评测与可观测

<div class="week-meta"><span>📅 2027-01-25 ~ 2027-01-31</span><span>⏱ 约 26 小时</span><span>🧭 P2 Agent</span><span>🎴 5 张记忆卡</span></div>

> 对应计划：[第 10 周计划](/plan/week-10)　|　[本周记忆卡](/cards/week-10)　|　[学习文档总览](/study/)

## 本周目标

掌握多智能体三种协作模式，并建立 Agent 的评测与可观测体系。

## 7 天拆分建议

| 时间 | 重点 | 产出 |
| --- | --- | --- |
| 周一–周二 | 实现 supervisor 模式：主管分派 + 子 agent 执行 + 汇总 | supervisor demo |
| 周三 | 建 Agent 评测集：20 个任务，标注成功标准与必要步骤 | 评测集 |
| 周四 | 接入 Langfuse（或自建）做 trace 可视化 | trace 面板 |
| 周五 | 单 agent vs 多 agent 对照：成功率、步数、成本、延迟 | 对照数据 |
| 周六 | 整理失败模式清单：至少 8 类，每类给拦截/降级策略 | 失败模式清单 |
| 周日 | 复盘 + 记忆卡周测 | 周复盘 |

### 三种协作模式

Supervisor：主管拆任务、分派、汇总，生产上最常见；Handoff：agent 之间移交控制权；辩论/评审：多个 agent 给不同答案，由评审者裁决。

模式选择看任务是否需要不同工具集、上下文或权限，而不是看「多」听起来更高级。

### Agent 评测双轨

结果级：任务是否完成；轨迹级：是否选对工具、参数是否正确、步数是否合理、失败后能否恢复。

开放任务把成功标准写成可判定的检查项：必须包含的事实、必须调用的工具、必须产出的文件、禁止的动作。

### 可观测三件套

Trace（每步输入/输出/工具调用/耗时）、指标（成功率、步数、工具错误率、P95、成本）、回放（给定 trace 重放整条链路）。

## 资料与阅读顺序

1. [Langfuse 文档](https://langfuse.com/docs) — trace 与评测
2. [Anthropic · Multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system) — 多智能体实践与教训
3. [OpenAI · A practical guide to building agents](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf) — 评测与上线

## 常见坑

- 为了「多智能体」而多智能体，成功率没涨、成本翻倍。
- 只看任务成功率，不看步数、成本和人工接管率。
- trace 没有采样和保留策略，线上出问题找不到记录。

## 验收问题

- [ ] 什么情况下多智能体是负优化？
- [ ] 一次失败发生在哪一步，你怎么定位？
- [ ] 开放任务怎么定义「成功」？

## 每日固定节奏

> 不随本周主题变化，按工作日 2h / 周末 8h 执行：

- 25 分钟算法：W1–W6 按[题单](/guide/algo)推进；W7 起每周至少 3 次，错题优先。
- 15–25 分钟记忆卡：当天到期 + 本周卡；周日做一次周测。
- 工作日 50 分钟主线；周末按本周清单推进。
- 每天结束写一句记录：学到什么 / 卡在哪 / 明天怎么调。

## 收尾

- 回到[第 10 周计划](/plan/week-10)勾选清单。
- 周日写复盘：计划 vs 实际 / 最大卡点 / 下周只改一件事。
