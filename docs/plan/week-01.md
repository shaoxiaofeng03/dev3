---
title: 第 1 周 · LLM 应用全景 · 环境 · 第一次 API 调用
description: 2026-11-23 起，P0 地基
---
<!-- 本页由 scripts/build-content.mjs 自动生成，请勿直接编辑。改 plan/ 下的数据源后重新运行 npm run content -->


# 第 1 周 · LLM 应用全景 · 环境 · 第一次 API 调用

<div class="week-meta"><span>📅 2026-11-23 ~ 2026-11-29</span><span>⏱ 约 26 小时</span><span>🧭 P0 地基</span><span>🎴 20 张记忆卡</span></div>

## 本周目标

建立「模型 + 上下文 + 工具 + 编排」的全局地图，跑通开发环境，写出可复用的 LLM 调用层。

## 为什么这样安排

零基础最容易死在「先看三个月视频」。第 1 周就把 API 调通、把重试/超时/成本这些工程问题一次性解决，后面每个项目都复用这层客户端。Python 只补「够写服务」的部分，不重学编程。

## 核心概念

- LLM 应用的四种形态：Prompt 工程 / RAG / Agent / 微调，以及各自的适用边界
- token、上下文窗口、温度、流式输出与成本结构
- AI 应用的工程基本盘：超时、重试、限流、结构化输出、用量与成本可观测

## 每日安排

> 每天 2 小时（工作日）/ 8 小时（周末）。勾选即打卡，可填写当日收获与耗时。每天的知识点、资料与自检见「学习」列。

<ClientOnly><WeekTasks week="1" /></ClientOnly>

### 时间分配一览

| 日期 | 星期 | 时长 | 重点 | 当日交付 | 学习 |
| --- | --- | --- | --- | --- | --- |
| 2026-11-23 | 周一 | 2h | 认知地图 + 环境搭建 | 一张技术地图 + 环境检查全部通过 | [打开](/study/w01d1) |
| 2026-11-24 | 周二 | 2h | Python 速成（一）：语法与数据结构 | projects/w1/exercises_w1.py，10 题全部跑通 | [打开](/study/w01d2) |
| 2026-11-25 | 周三 | 2h | Python 速成（二）：工程化与 HTTP | 带类型注解和异常处理的 CLI 小工具 | [打开](/study/w01d3) |
| 2026-11-26 | 周四 | 2h | LLM 基础概念与参数 | 参数速查表 + 能不看文档说清 temperature 和 top_p 的区别 | [打开](/study/w01d4) |
| 2026-11-27 | 周五 | 2h | 第一次 API 调用：单轮 → 多轮 → 流式 | chat.py 支持多轮对话 + 流式输出 + 用量统计 | [打开](/study/w01d5) |
| 2026-11-28 | 周六 | 8h | 封装 LLMClient：重试、超时、结构化输出、单测 | llm_client.py + 单测全绿 + 一篇工程笔记 | [打开](/study/w01d6) |
| 2026-11-29 | 周日 | 8h | 小项目：CLI 学习助手 v0.1 + 周复盘 | 可演示的 CLI 学习助手 v0.1 + README + 第 1 周复盘 | [打开](/study/w01d7) |

## 本周交付

- 可复用的 llm_client.py（重试 / 超时 / 结构化输出 / 用量统计）
- CLI 学习助手 v0.1（多轮 + 流式 + 成本看板）
- 参数速查表 + 技术地图 + 第 1 周复盘

## 验收标准

- [ ] 能不看文档说出 temperature、top_p、max_tokens 各自的影响
- [ ] 能解释为什么结构化输出需要「校验 + 重试」，而不是「让模型别出错」
- [ ] llm_client.py 有单测，能在断网情况下跑通 mock 测试

## 面试会问到

- 你理解的「AI 应用开发」和「算法工程师」有什么区别？
- 调用大模型时你做过哪些工程上的防护？
- token 是怎么算的？为什么同样的问题费用差很多？

## 参考资料

- [Anthropic · Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [DeepSeek API 文档](https://api-docs.deepseek.com/)
- [Python 官方教程（中文）](https://docs.python.org/zh-cn/3/tutorial/)
- [Learn Python in Y minutes](https://learnxinyminutes.com/docs/python/)
- [DeepSeek 模型与价格](https://api-docs.deepseek.com/quick_start/pricing)
- [DeepSeek 错误码](https://api-docs.deepseek.com/quick_start/error_codes)
- [uv 官方文档](https://docs.astral.sh/uv/)
- [零基础算法题单（本站）](https://shaoxiaofeng03.github.io/dev3/guide/algo)

## 记忆卡

<ClientOnly><FlashCards week="1" /></ClientOnly>

## 复盘问题

- 这周哪一天的计划没完成？原因是估时不准还是被打断？
- Python 写起来最别扭的地方是什么？下周怎么补？
> 周日晚用 30 分钟写进打卡页的「本周复盘」。

[← 返回 20 周总览](/plan/)　|　[第 1 周记忆卡](/cards/week-01)
