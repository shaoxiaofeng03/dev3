---
title: 第 9 周 · 记忆、状态与任务编排
description: 2027-01-18 起，P2 Agent
---
<!-- 本页由 scripts/build-content.mjs 自动生成，请勿直接编辑。改 plan/ 下的数据源后重新运行 pnpm content -->


# 第 9 周 · 记忆、状态与任务编排

<div class="week-meta"><span>📅 2027-01-18 ~ 2027-01-24</span><span>⏱ 约 26 小时</span><span>🧭 P2 Agent</span><span>🎴 5 张记忆卡</span></div>

## 本周目标

让 Agent 具备可恢复的会话状态和长期记忆，并支持人工介入。

## 为什么这样安排

真实业务里 Agent 跑几分钟、跨多轮、要能中断续跑。状态管理是「demo 到产品」的分水岭。

## 核心概念

- 短期记忆、长期记忆、情景记忆的区别
- checkpointer 与可恢复执行
- human-in-the-loop 的介入点设计

## 本周清单

> 这一周按「周目标 + 清单」推进，开始前把清单拆成 7 天。勾选会实时保存，并可通过打卡页同步到 GitHub。

<WeekTasks week="9" />

## 本周交付

- 可恢复的会话状态实现
- 长期记忆模块 + 压缩策略
- 人工介入流程 + 记忆策略文档

## 验收标准

- [ ] 能说清「什么该进上下文、什么该进记忆库」
- [ ] 能演示中途杀掉进程后恢复执行

## 面试会问到

- Agent 的记忆怎么设计？
- 上下文太长怎么办？
- 怎么防止 Agent 误删数据？

## 参考资料

- [LangGraph · Persistence](https://langchain-ai.github.io/langgraph/concepts/persistence/)
- [Mem0（记忆层参考）](https://docs.mem0.ai/)

## 记忆卡

<FlashCards week="9" />

## 复盘问题

- 压缩后丢了哪些关键信息？
> 周日晚用 30 分钟写进打卡页的「本周复盘」。

[← 返回 20 周总览](/plan/)　|　[第 9 周记忆卡](/cards/week-09)
