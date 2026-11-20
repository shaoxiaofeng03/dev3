---
title: DeepSeek 接入指南
---

# DeepSeek 接入指南

计划里所有 **chat** 调用都用 DeepSeek。原因很实际：中文效果好、OpenAI 兼容（一套代码可换模型）、单价低、支持工具调用和 JSON 输出——够你把 20 周的项目全部跑完。

RAG 需要的 **embedding / rerank** 不在这个 chat 接口里，单独配置：默认本地 bge-m3 + Chroma，详见 [embedding 与 rerank 接入](/guide/embedding)。

> 下面的模型名、价格、上下文长度以 2026-11 官方文档为准，DeepSeek 调价和换模型比较频繁，动手前先看一眼 [Models & Pricing](https://api-docs.deepseek.com/quick_start/pricing)。

## 一、30 分钟接入

### 1. 拿 Key

1. 打开 <https://platform.deepseek.com/> 注册（手机号即可）。
2. 左侧 **API keys** → **Create new API key** → 复制 `sk-` 开头的字符串（只显示一次）。
3. **充值**：DeepSeek 按 token 计费，余额为 0 会返回 402。先充最小额度即可，20 周的个人练习通常花不了多少。

### 2. 配置环境变量

```bash
# Windows PowerShell（当前会话）
$env:DEEPSEEK_API_KEY = "sk-xxxx"

# 永久写入用户环境变量
setx DEEPSEEK_API_KEY "sk-xxxx"
```

代码里**永远不要**把 key 写死进文件，更不要提交到 Git。

### 3. 第一个请求

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["DEEPSEEK_API_KEY"],
    base_url="https://api.deepseek.com",   # 注意：不要加 /v1
)

resp = client.chat.completions.create(
    model="deepseek-flash",
    messages=[
        {"role": "system", "content": "你是一个严谨的技术助教。"},
        {"role": "user", "content": "用三句话解释什么是 RAG。"},
    ],
)
print(resp.choices[0].message.content)
print("tokens:", resp.usage.prompt_tokens, resp.usage.completion_tokens)
```

流式输出只是多一个参数：

```python
stream = client.chat.completions.create(
    model="deepseek-flash",
    messages=[{"role": "user", "content": "写一段 200 字的自我介绍"}],
    stream=True,
)
for chunk in stream:
    if chunk.choices and chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

## 二、模型怎么选

| | `deepseek-flash` | `deepseek-v4-pro` |
| --- | --- | --- |
| 定位 | 日常主力，便宜、快 | 复杂推理、难任务 |
| 上下文 | 1M | 1M |
| 最大输出 | 384K | 384K |
| 思考模式 | 支持，默认开启 | 支持，默认开启 |
| JSON 输出 / 工具调用 | ✓ | ✓ |
| 视觉（图片） | ✓ | ✗ |
| 价格（每 1M token，缓存未命中输入 / 输出） | 约 $0.15 / $0.6（低谷）<br>约 $0.3 / $1.2（高峰） | 约 $0.66 / $1.98（低谷）<br>约 $1.32 / $3.96（高峰） |

三条实用结论：

1. **默认用 `deepseek-flash`**，只有在你明显感觉“答得不够深”时才切 `deepseek-v4-pro`。
2. **高峰时段价格翻倍**：高峰是 UTC 01:00–04:00 和 06:00–10:00（北京时间 09:00–12:00、14:00–18:00，周一到周五）。跑批量评测（比如 RAG 的 30 条评测集）放到晚上或周末，成本直接减半。
3. **缓存命中便宜一个数量级**：system prompt、few-shot 示例、知识库前缀这些固定内容放在前面，能吃到缓存价。

> 旧模型名 `deepseek-chat` / `deepseek-reasoner` 仍可用，但会路由到新模型并按新模型计费。新代码直接用 `deepseek-flash`。

## 三、计划里会用到的高级参数

### 思考模式

默认开启。想要更快、更省（比如分类、抽取这类单步任务），可以关掉：

```python
resp = client.chat.completions.create(
    model="deepseek-flash",
    messages=[{"role": "user", "content": "把这句话翻译成英文：..."}],
    extra_body={"thinking": {"type": "disabled"}},
)
```

反过来，需要深度推理时可以用 `extra_body={"thinking": {"type": "enabled"}, "reasoning_effort": "high"}`。

### JSON 输出（W1 周六会用到）

```python
resp = client.chat.completions.create(
    model="deepseek-flash",
    messages=[
        {"role": "system", "content": "只输出 JSON，不要解释。"},
        {"role": "user", "content": "把『张三，28 岁，南京』抽成 {name, age, city}"},
    ],
    response_format={"type": "json_object"},
)
```

注意：`json_object` 只保证「是合法 JSON」，不保证字段对。所以仍然要 **pydantic 校验 + 失败重试**——这正是 W1 周六的任务。

### 工具调用（W2 会用到）

DeepSeek 支持 OpenAI 格式的 `tools` / `tool_calls`，你手写的 ReAct 循环可以直接跑。工具 schema 写法与 OpenAI 完全一致。

## 四、用 Java 接（W14 会用到）

Spring AI 走 OpenAI 兼容协议，改两个配置就行：

```yaml
spring:
  ai:
    openai:
      base-url: https://api.deepseek.com
      api-key: ${DEEPSEEK_API_KEY}
      chat:
        options:
          model: deepseek-flash
```

这就是 P3 阶段「Java 后端 + AI」的技术底座：同一套 Spring AI 抽象，换 base-url 就能在 DeepSeek / 其他兼容厂商之间切换。

## 五、常见错误

| 状态码 | 含义 | 处理 |
| --- | --- | --- |
| 400 | 请求格式错（参数名、messages 结构） | 对照文档检查字段；`base_url` 别写成 `/v1` |
| 401 | Key 无效 | 检查是否复制完整、环境变量是否生效 |
| 402 | 余额不足 | 去平台充值 |
| 422 | 参数不合法（如 max_tokens 超限） | 降低 `max_tokens` |
| 429 | 触发限流 | 指数退避重试、降低并发 |
| 500 / 503 | 服务端问题 | 重试 + 降级到备用模型 |

完整列表：<https://api-docs.deepseek.com/quick_start/error_codes>

## 六、面试会问到的三个点

1. **为什么选这家模型？** 答「便宜」不够。要答：中文效果、OpenAI 兼容带来的可替换性、工具调用/JSON 输出能力、以及你做过成本对比（高峰/低谷、缓存命中）。
2. **1M 上下文了，还需要 RAG 吗？** 需要。理由：塞满上下文的成本与延迟仍然高；知识频繁更新无法靠重训/重塞；权限隔离必须在检索层做；引用溯源需要精确到片段。
3. **怎么控成本？** 模型分层（简单任务关思考、用小模型）、缓存（命中价差十倍）、批量任务放低谷、限制 `max_tokens`、对重复 query 做缓存。
