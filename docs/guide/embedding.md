---
title: embedding 与 rerank 接入
---

# embedding 与 rerank 接入

RAG 需要两类模型：**embedding** 把文本变成向量，**rerank** 对候选片段重新排序。DeepSeek 的接入指南覆盖的是 chat 接口；这两类模型要单独配。

计划默认路线：**本地 bge-m3 + Chroma，不依赖 Docker**。如果本机装不上 PyTorch，或者你不想下载 2GB 模型，可以换云 API（见第三节）。

## 一、本地方案：bge-m3 + sentence-transformers

### 1. 建独立环境

RAG 项目的依赖比较重，建议单独建环境，不要和练习脚本共用：

```bash
cd projects
uv venv .venv-rag
uv pip install sentence-transformers chromadb
```

如果 Python 3.13 装 PyTorch 失败，用 uv 指定 3.12：

```bash
uv venv --python 3.12 .venv-rag
```

### 2. 下载并加载模型

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("BAAI/bge-m3")
texts = ["怎么请年假？", "年假申请流程是什么？"]
vecs = model.encode(texts, normalize_embeddings=True, batch_size=16)
print(vecs.shape)  # (2, 1024)
```

首次运行会从 Hugging Face 下载模型（约 2GB）。国内网络慢的话，先手动下载到本地目录，再传路径：

```python
model = SentenceTransformer("D:/models/bge-m3")
```

### 3. 工程要点

- **归一化后统一用内积**：`normalize_embeddings=True`，检索时用余弦/内积都可，排序一致。
- **批量 encode**：一次 16–64 条，比逐条快很多；CPU 也能跑，只是慢。
- **记录模型名与维度**：入库时把 `embedding_model` 写进 collection 的元数据；换模型必须重建索引。
- **缓存 embedding**：同一段文本不要重复 encode；按内容 hash 缓存。

### 4. 和 Chroma 配合

```python
import chromadb

client = chromadb.PersistentClient(path="./chroma_data")
collection = client.get_or_create_collection("notes")

collection.add(
    ids=["doc1#0", "doc1#1"],
    embeddings=vecs.tolist(),
    metadatas=[{"doc_id": "doc1", "chunk": 0, "source": "notes.md"},
               {"doc_id": "doc1", "chunk": 1, "source": "notes.md"}],
    documents=texts,
)

res = collection.query(query_embeddings=[vecs[0].tolist()], n_results=5, where={"doc_id": "doc1"})
```

`where` 是 metadata 过滤，应该在检索时下推，而不是检索后删。

## 二、rerank：bge-reranker-v2-m3

向量检索是双塔粗排，快但精度有限；rerank 是 cross-encoder，把 query 和 doc 拼在一起打分，精度高但慢。

```python
from sentence_transformers import CrossEncoder

reranker = CrossEncoder("BAAI/bge-reranker-v2-m3")
pairs = [("怎么请年假？", "年假申请流程：..."), ("怎么请年假？", "报销流程：...")]
scores = reranker.predict(pairs)
```

工程上：

- 粗排召回 20–50 条 → rerank 取 top 3–5 给模型。
- 先离线测命中率/nDCG 提升，再测 P95 延迟增量，最后算每千次查询成本。
- 延迟预算紧时，只对 top-10 做 rerank，或换更小的模型。

## 三、云 API 备选

如果本地环境折腾不动，可以用 OpenAI 兼容的 embedding/rerank 服务。选型时看四点：中文效果、最大输入长度、价格、是否支持批量。

常见提供方（以官方文档为准）：

- 硅基流动（SiliconFlow）：bge-m3 / bge-reranker，OpenAI 兼容接口。
- 阿里云百炼：text-embedding-v3 等，文档里有 batch 限制。
- OpenAI：text-embedding-3-small / large，中文可用但价格和网络要算。

云 API 的代码结构和本地一样，只是把 `model.encode` 换成 HTTP 调用；**仍然要归一化、批量、缓存**。

## 四、常见坑

| 坑 | 现象 | 处理 |
| --- | --- | --- |
| 换模型没重建索引 | 检索结果明显变差 | 入库时记录模型名，换模型走全量重建 |
| 没归一化 | 点积排序和余弦不一致 | `normalize_embeddings=True` |
| 逐条 encode | 建索引很慢 | 批量 16–64 条 |
| 维度写死 | 换模型后写入报错 | 维度从模型读取，不硬编码 |
| rerank 全量跑 | P95 延迟超标 | 只对 top-10–20 做 |
| 云端限流 | 建索引 429 | 指数退避 + 分批 + 并发限制 |

## 五、验收问题

- 你的索引里记录了 embedding 模型名和维度吗？
- 换 embedding 模型时，重建索引的步骤是什么？
- rerank 的延迟增量是多少？值不值？
- 如果本地 PyTorch 装不上，你的备选方案是什么？
