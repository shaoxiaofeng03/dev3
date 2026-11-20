---
title: 第 14 周学习指南 · Java 侧 AI：Spring AI / LangChain4j
description: 2027-02-22 起，每周学习文档
---
<!-- 本页由 scripts/build-content.mjs 自动生成，请勿直接编辑。改 plan/ 下的数据源后重新运行 npm run content -->


# 第 14 周学习指南 · Java 侧 AI：Spring AI / LangChain4j

<div class="week-meta"><span>📅 2027-02-22 ~ 2027-02-28</span><span>⏱ 约 26 小时</span><span>🧭 P3 Java 企业级</span><span>🎴 4 张记忆卡</span></div>

> 对应计划：[第 14 周计划](/plan/week-14)　|　[本周记忆卡](/cards/week-14)　|　[学习文档总览](/study/)

## 本周目标

用最熟的 Java 栈把 AI 能力接进服务，形成「Java 后端 + AI」的差异化。

## 7 天拆分建议

| 时间 | 重点 | 产出 |
| --- | --- | --- |
| 周一–周二 | Spring AI 接入：对话 + 流式 + 工具调用 | 可运行 demo |
| 周三 | 把项目一的 RAG 能力以 HTTP 方式接进 Java 服务 | RAG 接入 |
| 周四 | Advisor 链：日志、限流、RAG 注入、内容审核 | Advisor 实现 |
| 周五 | 小 demo：在现有 Java 业务接口上加智能问答/智能填单 | 业务 demo |
| 周六 | 写 Java vs Python 在 AI 应用开发上的取舍笔记 | 对比笔记 |
| 周日 | 复盘 + 记忆卡周测 | 周复盘 |

### Spring AI 的核心抽象

ChatClient（链式调用）、ChatModel（模型适配）、Advisor（请求/响应拦截链）、ToolCallback（工具注册）、VectorStore、EmbeddingModel、DocumentReader/Splitter。

设计目标是「像用 Spring 一样用 AI」：配置化、可替换、可拦截。

### Advisor 能做什么

类似 Servlet Filter：注入检索上下文、记录日志与用量、内容审核、限流、缓存、改写 prompt。

把横切关注点从业务代码里剥离。

### Java 的优势与边界

优势：存量系统集成、企业级工程能力（事务、鉴权、审计、可观测）、团队技能复用。

边界：模型训练/微调、前沿实验、Python 生态的新库仍以 Python 为主；常见做法是 Java 做服务层、Python 做实验与离线任务。

## 资料与阅读顺序

1. [Spring AI 参考文档](https://docs.spring.io/spring-ai/reference/) — ChatClient / Advisor / Tool
2. [LangChain4j 文档](https://docs.langchain4j.dev/) — Java 侧另一种实现
3. [DeepSeek 接入指南（本站）](https://shaoxiaofeng03.github.io/dev3/guide/deepseek) — Spring AI 的 base-url 配置

## 常见坑

- 把 Spring AI 当黑盒，出问题不会定位。
- 忽略超时、重试、限流，直接照搬 demo。
- 把 Python 服务硬搬进 Java，失去差异化。

## 验收问题

- [ ] Spring AI 的抽象解决了什么问题？
- [ ] Java 团队落地 AI 的三个现实约束是什么？
- [ ] 为什么用 Spring AI 而不是直接调 HTTP？

## 每日固定节奏

> 不随本周主题变化，按工作日 2h / 周末 8h 执行：

- 25 分钟算法：W1–W6 按[题单](/guide/algo)推进；W7 起每周至少 3 次，错题优先。
- 15–25 分钟记忆卡：当天到期 + 本周卡；周日做一次周测。
- 工作日 50 分钟主线；周末按本周清单推进。
- 每天结束写一句记录：学到什么 / 卡在哪 / 明天怎么调。

## 收尾

- 回到[第 14 周计划](/plan/week-14)勾选清单。
- 周日写复盘：计划 vs 实际 / 最大卡点 / 下周只改一件事。
