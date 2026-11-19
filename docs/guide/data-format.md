---
title: 数据结构说明
---

# 数据结构说明

站点里所有内容都来自 `plan/` 下的单一数据源，生成脚本把它们变成页面和 JSON；另有几份手写数据（速查清单）直接放在 `docs/data/`。理解这几个文件就够了。

```
plan/
├── index.mjs          # 元信息、阶段划分、20 周合并
├── weeks-01-04.mjs    # 前 4 周：每日细化
└── weeks-05-20.mjs    # 后 16 周：周粒度 + 清单
scripts/build-content.mjs   # 生成 docs/plan/*.md、docs/cards/*.md、docs/data/*.json
```

## 周对象字段

| 字段 | 说明 |
| --- | --- |
| `n` | 周序号（1–20） |
| `phase` | 阶段名，如 `P1 RAG` |
| `start` | 周一日期 `YYYY-MM-DD`，其余日期由脚本推算 |
| `theme` / `goal` / `why` | 主题、目标、为什么这样安排 |
| `concepts` | 本周核心概念（3 条左右） |
| `detail` | `false` 表示只有周清单，没有每日细化 |
| `days` | 每日安排，见下 |
| `checklist` | 周清单（`detail: false` 时使用） |
| `deliverables` / `checkpoints` | 交付物、验收标准 |
| `interview` | 本周对应的面试题 |
| `resources` | 参考资料 |
| `retro` | 复盘问题 |
| `cards` | 记忆卡 |

## 每日任务

```js
{
  date: '2026-11-23',        // 日期
  kind: 'weekday',            // weekday | weekend
  hours: 2,
  focus: '认知地图 + 环境搭建',
  tasks: [
    { id: 'w1d1t1', min: 25, text: '算法：哈希表 3 题', deliverable: false }
  ],
  output: '今日交付：…'
}
```

## ID 约定（重要）

打卡记录只存 ID，所以 ID **一旦使用就不要再改**，否则历史打卡会对不上。

| 类型 | 格式 | 例子 |
| --- | --- | --- |
| 每日任务 | `w{周}d{天}t{序号}` | `w3d5t2` |
| 周清单 | `w{周}c{序号}` | `w12c4` |
| 记忆卡 | `w{周}-c{序号}` | `w7-c2` |

## 打卡数据 `docs/data/checkins.json`

```json
{
  "version": 1,
  "entries": [
    {
      "date": "2026-11-24",
      "items": ["w1d2t1", "w1d2t2"],
      "note": "今天卡在 pydantic 校验",
      "minutes": 130,
      "retro": "",
      "updatedAt": "2026-11-24T14:32:00.000Z"
    }
  ]
}
```

- `date` 是**任务所属日期**（不是打卡动作发生的时间），所以补做也会记在原本那天。
- `items` 是当天完成的 item id 列表。
- 合并规则：同一 `date` 取 `items` 并集，`note` / `retro` 取 `updatedAt` 较新的非空值，`minutes` 取较大值。
- 可以直接手改这个文件并提交，站点下次构建会读进来。

## 复习数据 `docs/data/review-state.json`

```json
{
  "version": 1,
  "cards": {
    "w1-c2": {
      "ease": 2.5,
      "interval": 3,
      "due": "2026-12-02",
      "reps": 1,
      "lapses": 0,
      "last": "2026-11-29"
    }
  }
}
```

- `interval` 单位是天；`0` 表示今天还要再来一次。
- `ease` 是 SM-2 的难度系数，范围约 1.3–3.0。
- 想彻底重来某张卡：把它从 `cards` 里删掉，或在卡片上点「重置」（会写回 localStorage）。

## 速查数据 `docs/data/quickref-python.json`

供「[Python 易坑点 · 记忆大纲](/guide/python-quickref)」使用：每条一个问题、默认收起答案，点开核对。

```json
{
  "label": "Python 3",
  "source": "https://learnxinyminutes.com/zh-cn/python/",
  "groups": [
    {
      "title": "运算符与真值",
      "note": "Java 迁移第一站",
      "items": [
        {
          "id": "py-01",
          "kind": "pitfall",
          "q": "`35 / 5` 的结果是 7 还是 7.0？",
          "a": "7.0。Python 3 的 `/` 永远返回 float。",
          "code": "35 / 5    # 7.0"
        }
      ]
    }
  ]
}
```

- `kind`：`pitfall` → 红色「坑」；`outline` → 蓝色「纲」。
- `q` 默认展示；`a` 点开才展示，支持 `` `行内代码` `` 与 `**加粗**`；`code` 可选，多行示例用 `\n`。
- 加新主题：在 `docs/data/` 放一个同结构的 JSON → `theme/composables/quickref.ts` 里挂一行 → 页面里写 `<RevealRef topic="新名字" />`。

## 生成产物

| 路径 | 来源 | 是否可手改 |
| --- | --- | --- |
| `docs/plan/week-XX.md` | 生成 | ❌ 会被覆盖 |
| `docs/cards/week-XX.md` | 生成 | ❌ 会被覆盖 |
| `docs/data/plan.json` / `cards.json` | 生成 | ❌ 会被覆盖 |
| `docs/data/checkins.json` | 打卡产生 | ✅ 可手改 |
| `docs/data/review-state.json` | 复习产生 | ✅ 可手改 |
| `docs/data/quickref-python.json` | 手写速查数据 | ✅ 可手改 |
| `docs/guide/*.md`、`docs/checkin.md` | 手写 | ✅ |

## 想加一周 / 改一周

1. 在 `plan/weeks-01-04.mjs`（要每日细化）或 `plan/weeks-05-20.mjs`（周粒度）里加一个周对象。
2. 同步修改 `plan/index.mjs` 里的 `phases` 区间（如果新增了阶段）。
3. 跑 `pnpm content && pnpm dev` 检查。
