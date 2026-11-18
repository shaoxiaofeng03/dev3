---
title: 第 2 周 · Prompt 工程 · 工具调用 · 手写 Agent 循环
description: 2026-11-30 起，P0 地基
---
<!-- 本页由 scripts/build-content.mjs 自动生成，请勿直接编辑。改 plan/ 下的数据源后重新运行 pnpm content -->


# 第 2 周 · Prompt 工程 · 工具调用 · 手写 Agent 循环

<div class="week-meta"><span>📅 2026-11-30 ~ 2026-12-06</span><span>⏱ 约 26 小时</span><span>🧭 P0 地基</span><span>🎴 12 张记忆卡</span></div>

## 本周目标

不依赖任何框架，从零手写一个 ReAct Agent 循环，并给 CLI 助手装上 3 个工具。

## 为什么这样安排

这一周是全计划最关键的一周。框架每年换，但「模型如何决定调用工具、结果如何回填、循环如何终止」是不变的。手写过一次，后面看 LangChain / LangGraph / Spring AI 才知道它们在替你做什么。

## 核心概念

- Prompt 的四要素与可评测化：没有测试集的 prompt 优化都是玄学
- 工具调用（function calling）的协议本质：JSON Schema + 模型返回的调用意图
- ReAct 循环：思考 → 行动 → 观察 → 再思考，以及终止条件与熔断

## 每日安排

> 每天 2 小时（工作日）/ 8 小时（周末）。勾选即打卡，可填写当日收获与耗时。

<WeekTasks week="2" />

### 时间分配一览

| 日期 | 星期 | 时长 | 重点 | 当日交付 |
| --- | --- | --- | --- | --- |
| 2026-11-30 | 周一 | 2h | Prompt 结构：四要素与反例改写 | 5 组「烂 prompt → 好 prompt」对照笔记 |
| 2026-12-01 | 周二 | 2h | Few-shot、CoT 与输出格式约束 | prompt_testset.jsonl（20 条）+ 基线得分 |
| 2026-12-02 | 周三 | 2h | 工具调用原理与 schema 设计 | tools_schema.json + 一段「工具描述为什么这么写」的说明 |
| 2026-12-03 | 周四 | 2h | 手写 ReAct 循环 | agent_loop.py，能跑「查资料 → 计算 → 给结论」三步任务 |
| 2026-12-04 | 周五 | 2h | 工具错误处理与安全边界 | 带沙箱与错误回填的 agent_loop v2 |
| 2026-12-05 | 周六 | 8h | 给 CLI 助手接上 3 个真实工具 | 带工具的 CLI 助手 v0.2 + 3 个失败案例复盘 |
| 2026-12-06 | 周日 | 8h | Agent 认知固化 + 周复盘 | Agent 原理长文 + 第 2 周复盘 + Docker 就绪 |

## 本周交付

- 手写 ReAct agent_loop.py（含最大步数、熔断、沙箱）
- CLI 学习助手 v0.2（3 个工具 + 轨迹回放）
- prompt 测试集 20 条 + 打分表 + 基线

## 验收标准

- [ ] 能白板画出 ReAct 循环，并说出 4 个必须处理的失败点
- [ ] 能解释为什么工具描述本身就是一个「prompt 工程」问题
- [ ] agent_loop 在没有进展时能自己停下来，而不是死循环烧钱

## 面试会问到

- Agent 和「带 if-else 的工作流」有什么区别？什么场景不该用 Agent？
- 工具调用时模型返回了不存在的工具名，你怎么处理？
- 怎么防止 Agent 死循环 / 无限调用工具？

## 参考资料

- [Anthropic · Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [OpenAI Cookbook](https://cookbook.openai.com/)
- [Lilian Weng · LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/)

## 记忆卡

<FlashCards week="2" />

## 复盘问题

- 手写循环时最反直觉的一点是什么？
- 测试集里模型错得最多的是哪类问题？
> 周日晚用 30 分钟写进打卡页的「本周复盘」。

[← 返回 20 周总览](/plan/)　|　[第 2 周记忆卡](/cards/week-02)
