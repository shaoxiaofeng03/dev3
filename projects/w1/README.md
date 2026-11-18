# 第 1 周 · Python 速成

> 目标不是「学完 Python」，是**能写出调用 API 的脚本**。你已经有 Java 的编程底子，缺的只是语法和几个惯用法。

## 一、周二这 2 小时怎么用

| 时间 | 做什么 |
| --- | --- |
| 20 min | 读《Learn Python in Y minutes》和下面那张对照表，只求「见过」 |
| 20 min | 打开 `exercises_w1.py`，从第 1 题开始写，卡住就看该题 docstring 的提示 |
| 10 min | 跑 `python exercises_w1.py`，看哪题红，改到全绿 |
| 30 min | 把 10 题里最不顺手的 2 题重写一遍（不看之前的代码） |
| 20 min | 记三张卡（w1-c1 ~ w1-c4 里挑），写一句今天最反直觉的点 |

**不要先看完整教程再动手。** 边写边查，遇到不会的语法再回文档，这样 2 小时能真正写出东西。

## 二、资料（只需要这三个）

1. **Learn Python in Y minutes**（一页看完语法）：<https://learnxinyminutes.com/docs/python/>
2. **Python 官方教程（中文）**：<https://docs.python.org/zh-cn/3/tutorial/>
   重点看第 3 章（数据结构）、第 4 章（流程控制）、第 7 章（输入输出）、第 8 章（错误处理）
3. **DeepSeek 接入指南**（周三开始用）：<https://shaoxiaofeng03.github.io/dev3/guide/deepseek>

## 三、Java 程序员的对照表

| Java | Python | 要注意 |
| --- | --- | --- |
| `List<String> list = new ArrayList<>()` | `items = []` | 不用声明类型 |
| `map.put(k, v)` | `d[k] = v` | 键不存在时 `d[k]` 会抛 KeyError，用 `d.get(k, default)` |
| `for (String s : list)` | `for s in items:` | 冒号 + 缩进，没有花括号 |
| `list.stream().filter().map().collect()` | `[f(x) for x in items if cond(x)]` | 推导式替代 stream |
| `String.format("%s", x)` | `f"{x}"` | f-string 是日常主力 |
| `try/catch` | `try/except` | `except ValueError as e:` |
| `interface` + 实现类 | 鸭子类型 + 协议 | 先别管，写脚本用不上 |
| `public static void main` | `if __name__ == "__main__":` | 模块被 import 时不执行 |
| Maven `pom.xml` | `pyproject.toml` | 依赖管理，周三再学 |
| `null` | `None` | 判断用 `is None`，不是 `== None` |

## 四、10 题覆盖什么

| # | 函数 | 练的知识点 |
| --- | --- | --- |
| 1 | `top_words` | dict 计数、`sorted` 多关键字排序 |
| 2 | `even_squares` | 列表推导式 |
| 3 | `group_by_first_letter` | `setdefault` / `dict` 分组、保序 |
| 4 | `add_item` | **可变默认参数陷阱**（Python 最经典的坑） |
| 5 | `pair_sums` | `zip`、`enumerate` |
| 6 | `sort_records` | `sorted(key=lambda)`、不改原列表 |
| 7 | `count_lines_and_words` | 字符串切分、`splitlines` |
| 8 | `safe_int` | `try/except`、类型转换边界 |
| 9 | `fib` | 生成器 `yield` |
| 10 | `TokenUsage` | `@dataclass`、方法、按百万 token 计费 |

## 五、怎么跑

```bash
cd projects/w1
python exercises_w1.py
```

全部通过时最后一行是 `10/10`，退出码 0；有未完成的会打印 ❌ 和原因。

## 六、验收标准（周二的交付）

- [ ] 10 题全绿
- [ ] 能解释第 4 题为什么不能写 `bucket=[]`
- [ ] 能说出列表推导式和 Java stream 的对应关系
- [ ] 代码里有类型注解（`str`、`list[int]`、`dict[str, list[str]]`）

## 七、不要现在学的东西

装饰器、元类、GIL、多进程、asyncio 深入、打包发布——这些等用到再学。你 20 周里的 Python 只需要：**脚本、HTTP 调用、数据处理、FastAPI 服务**。
