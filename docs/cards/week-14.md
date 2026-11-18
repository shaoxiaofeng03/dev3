---
title: 第 14 周记忆卡
---
<!-- 本页由 scripts/build-content.mjs 自动生成，请勿直接编辑。改 plan/ 下的数据源后重新运行 pnpm content -->


# 第 14 周记忆卡

共 **4** 张 · 主题：Java 侧 AI：Spring AI / LangChain4j

> 手机上点卡片翻面；按「忘记 / 模糊 / 记得 / 简单」评分，系统按 SM-2 算法安排下次复习。

<FlashCards week="14" />

## 卡片清单（快速浏览 / 打印）

### 1. Spring AI 的核心抽象有哪些？

**答**：ChatClient（链式调用入口）、ChatModel（模型适配）、Advisor（请求/响应拦截链，用于 RAG 注入、日志、审核）、ToolCallback（工具注册）、VectorStore（向量库抽象）、EmbeddingModel、DocumentReader/Splitter。设计目标是「像用 Spring 一样用 AI」。

<small>标签：Spring AI · ID：w14-c1</small>

### 2. Advisor 机制的作用？能拿来做什么？

**答**：在请求前后插入处理逻辑，类似 Servlet Filter：注入检索到的上下文（RAG Advisor）、记录日志与用量、内容安全审核、限流、缓存、改写 prompt。好处是把横切关注点从业务代码里剥离。

<small>标签：Spring AI · ID：w14-c2</small>

### 3. LangChain4j 和 Python 的 LangChain 是什么关系？

**答**：思想同源、API 风格相近（ChatLanguageModel、AiServices、RetrievalAugmentor、Tool 注解），但是独立实现的 Java 库，不依赖 Python。适合已有 Java 技术栈、不想引入 Python 服务的团队。

<small>标签：LangChain4j · ID：w14-c3</small>

### 4. Java 做 AI 应用的优势与边界？

**答**：优势：存量系统集成、企业级工程能力（事务、鉴权、审计、可观测）、团队技能复用、JVM 生态成熟。边界：模型训练/微调、前沿实验、Python 生态的新库（评测、数据处理）仍以 Python 为主，常见做法是 Java 做服务层、Python 做实验与离线任务。

<small>标签：取舍 · ID：w14-c4</small>

[← 返回记忆卡总览](/cards/)　|　[第 14 周计划](/plan/week-14)
