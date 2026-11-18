# projects/ · 每周交付物放这里

一个约定：**每周的代码交付物放在 `projects/wNN/` 下**，和站点内容（`docs/`）分开。

```
projects/
├── w1/          # 第 1 周：Python 速成 + LLMClient + CLI 助手
├── w2/          # 第 2 周：手写 ReAct 循环
├── w3/          # 第 3 周：最小可用 RAG
└── ...
```

好处：

- 面试时打开仓库，`projects/` 就是作品集，一眼能看到每周产出
- 站点只负责“计划与打卡”，代码不进站点构建，互不干扰
- 每个 `wNN` 都能独立运行，README 写清怎么跑

相关资源链接：见每周页面的「参考资料」，以及 [零基础算法题单](/dev3/guide/algo)、[DeepSeek 接入指南](/dev3/guide/deepseek)。

## 第 1 周（projects/w1）

| 天 | 交付物 | 文件 |
| --- | --- | --- |
| 周二 | 10 个 Python 练习 | `exercises_w1.py` |
| 周三 | 带类型注解与异常处理的 CLI | `http_cli.py` |
| 周五 | 多轮 + 流式的 chat.py | `chat.py` |
| 周六 | 可复用的 LLM 客户端 + 单测 | `llm_client.py`、`test_llm_client.py` |
| 周日 | CLI 学习助手 v0.1 | `study_assistant/` |

**周二的 10 个练习**：先读 `README.md` 里的资料清单（20 分钟），再写代码（20 分钟），最后看测试输出（10 分钟）。全部通过会打印 `10/10`。

```bash
cd projects/w1
python exercises_w1.py
```

不要一开始就搜答案。每题的 docstring 里有提示；卡 10 分钟以上再看提示。
