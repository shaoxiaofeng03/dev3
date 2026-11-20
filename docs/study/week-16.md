---
title: 第 16 周学习指南 · 八股专项一：LLM / RAG / Agent 高频题
description: 2027-03-08 起，每周学习文档
---
<!-- 本页由 scripts/build-content.mjs 自动生成，请勿直接编辑。改 plan/ 下的数据源后重新运行 npm run content -->


# 第 16 周学习指南 · 八股专项一：LLM / RAG / Agent 高频题

<div class="week-meta"><span>📅 2027-03-08 ~ 2027-03-14</span><span>⏱ 约 26 小时</span><span>🧭 P4 冲刺</span><span>🎴 5 张记忆卡</span></div>

> 对应计划：[第 16 周计划](/plan/week-16)　|　[本周记忆卡](/cards/week-16)　|　[学习文档总览](/study/)

## 本周目标

把三周项目里的经验，转成能脱口而出的结构化八股答案。

## 7 天拆分建议

| 时间 | 重点 | 产出 |
| --- | --- | --- |
| 周一 | LLM 基础 20 问：注意力、位置编码、KV cache、MoE、量化、采样 | 20 题答案 |
| 周二 | RAG 25 问：切分、召回、rerank、评测、幻觉、权限、多跳 | 25 题答案 |
| 周三 | Agent 25 问：范式、工具、记忆、多智能体、评测、安全 | 25 题答案 |
| 周四–周五 | 每题写成「一句话结论 + 展开 3 点 + 一个项目实例」 | 70 题答案库 |
| 周六 | 自测打分，低于 3 分的题重写 | 评分表 |
| 周日 | 银行/研究所笔试 + 复盘 | 笔试题感 |

### Transformer 与注意力

Q、K、V 由输入线性变换得到；scores = QKᵀ/√d，softmax 后加权求和 V。复杂度 O(n²·d)，这是长上下文昂贵的根源。

位置编码、多头、残差与 LayerNorm 是常被追问的三个点。

### 推理优化

KV cache：缓存已计算的 K/V，代价是显存随序列长度增长；量化：降精度换吞吐；投机采样：小模型草拟、大模型并行验证。

回答时说清「优化什么、代价是什么」。

### 上下文工程

prompt 工程关注措辞；上下文工程关注往窗口里放什么、按什么顺序、放多少：检索结果、工具输出、记忆、历史、指令的编排与预算。

## 资料与阅读顺序

1. [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) — 注意力与结构
2. [vLLM 文档](https://docs.vllm.ai/) — 推理优化与 PagedAttention
3. [Anthropic · Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — 上下文工程

## 常见坑

- 背答案没有项目实例，一追问就露馅。
- 只准备 AI 八股，不准备 Java 基本盘。
- 银行/研究所笔试临时抱佛脚。

## 验收问题

- [ ] 随机抽 10 题，能在 90 秒内讲清吗？
- [ ] 哪一类题最虚？
- [ ] 每道题都有项目实例吗？

## 每日固定节奏

> 不随本周主题变化，按工作日 2h / 周末 8h 执行：

- 25 分钟算法：W1–W6 按[题单](/guide/algo)推进；W7 起每周至少 3 次，错题优先。
- 15–25 分钟记忆卡：当天到期 + 本周卡；周日做一次周测。
- 工作日 50 分钟主线；周末按本周清单推进。
- 每天结束写一句记录：学到什么 / 卡在哪 / 明天怎么调。

## 收尾

- 回到[第 16 周计划](/plan/week-16)勾选清单。
- 周日写复盘：计划 vs 实际 / 最大卡点 / 下周只改一件事。
