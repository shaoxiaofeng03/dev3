---
title: 第 5 周 · 检索深水区：混合检索、重排、查询改写
description: 2026-12-21 起，P1 RAG
---
<!-- 本页由 scripts/build-content.mjs 自动生成，请勿直接编辑。改 plan/ 下的数据源后重新运行 pnpm content -->


# 第 5 周 · 检索深水区：混合检索、重排、查询改写

<div class="week-meta"><span>📅 2026-12-21 ~ 2026-12-27</span><span>⏱ 约 26 小时</span><span>🧭 P1 RAG</span><span>🎴 6 张记忆卡</span></div>

## 本周目标

把 RAG 从「能答」推到「答得准」，建立一套可复用的检索优化实验方法。

## 为什么这样安排

W4 已经知道瓶颈在检索。这一周专攻召回与排序，每次只改一个变量并复测，形成可写进简历的优化数据。

## 核心概念

- RRF 融合与加权融合的差别
- 查询改写、扩展、分解的适用场景
- rerank 的成本与收益权衡

## 本周清单

> 这一周按「周目标 + 清单」推进，开始前把清单拆成 7 天。勾选会实时保存，并可通过打卡页同步到 GitHub。

<ClientOnly><WeekTasks week="5" /></ClientOnly>

## 本周交付

- 检索优化实验报告（含 4 组以上对比）
- 混合检索 + rerank 的可配置实现
- 特殊内容处理方案

## 验收标准

- [ ] 能说清 RRF 为什么比加权平均更稳
- [ ] 能给出「加 rerank 值不值」的成本-收益判断

## 面试会问到

- 混合检索的融合方式有哪些？各有什么问题？
- 查询改写会不会引入新的错误？怎么控制？

## 参考资料

- [Qdrant · Hybrid Search](https://qdrant.tech/documentation/concepts/hybrid-queries/)
- [BGE Reranker 模型卡](https://huggingface.co/BAAI/bge-reranker-v2-m3)

## 记忆卡

<ClientOnly><FlashCards week="5" /></ClientOnly>

## 复盘问题

- 哪一组实验的收益最大？和预期一致吗？
> 周日晚用 30 分钟写进打卡页的「本周复盘」。

[← 返回 20 周总览](/plan/)　|　[第 5 周记忆卡](/cards/week-05)
