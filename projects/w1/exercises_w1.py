"""第 1 周 · Python 速成练习（10 题）

用法：
    cd projects/w1
    python exercises_w1.py

全部通过时打印 10/10。卡住超过 10 分钟再看题目 docstring 里的提示。

不要在第一次就搜答案——手写一遍比看懂十遍有用。
"""

from __future__ import annotations

import sys
from dataclasses import dataclass

# Windows 控制台默认可能是 GBK，强制 UTF-8 输出，避免中文变乱码
for _stream in (sys.stdout, sys.stderr):
    try:
        _stream.reconfigure(encoding="utf-8")
    except (AttributeError, ValueError):
        pass


# ---------------------------------------------------------------- 1. 词频
def top_words(text: str, n: int = 3) -> list[tuple[str, int]]:
    """返回出现次数最多的 n 个 (单词, 次数)。

    规则：转小写后按空白切分；次数降序，次数相同按单词字母升序。

    提示：dict 计数 + sorted(key = lambda kv: (-kv[1], kv[0]))[:n]
    """

    key_sum = {}
    for c in text.lower().split():
        key_sum[c] = key_sum.get(c, 0) + 1

    return sorted(key_sum.items(), key=lambda kv: (-kv[1], kv[0]))[:n]


# ---------------------------------------------------------------- 2. 推导式
def even_squares(nums: list[int]) -> list[int]:
    """返回所有偶数的平方，保持原顺序。

    提示：一行列表推导式，`if x % 2 == 0`。
    [要放进结果的东西  for x in nums  if 筛选条件]
    map stream filter
    """
    return [x * x for x in nums if x % 2 == 0]


# ---------------------------------------------------------------- 3. 分组
def group_by_first_letter(words: list[str]) -> dict[str, list[str]]:
    """按首字母（小写）分组，组内保持原顺序，组之间按首次出现顺序。

    提示：`d.setdefault(k, []).append(w)` 或 `d.setdefault(k, []).append(w)`。
    """
    d: dict[str, list[str]] = {}
    for word in words:
        first = word[:1].lower()
        d.setdefault(first, []).append(word)
    return d


# ---------------------------------------------------------------- 4. 默认参数
def add_item(item: str, bucket: list[str] | None = None) -> list[str]:
    """把 item 加进 bucket 并返回；不传 bucket 时每次都要得到新列表。

    提示：默认值写 None，函数里判断后新建列表。这是 Python 最经典的坑：
    默认参数只求值一次，写 `bucket=[]` 会导致所有调用共享同一个列表。
    """
    if bucket is not None:
        bucket.append(item)
    else:
        bucket = []
        bucket.append(item)

    return bucket


# ---------------------------------------------------------------- 5. zip
def pair_sums(a: list[int], b: list[int]) -> list[int]:
    """逐项相加，长度不等时以短的为准（zip 的语义）。

    提示：`[x + y for x, y in zip(a, b)]`
    """
    return [x + y for x, y in zip(a, b)]


# ---------------------------------------------------------------- 6. 排序
def sort_records(records: list[dict]) -> list[dict]:
    """按 age 降序、同 age 按 name 升序排序（返回新列表，不改原列表）。

    提示：`sorted(records, key=lambda r: (-r["age"], r["name"]))`
    """
    # return sorted(records, key=lambda r: (-r["age"], r["name"]))
    return sorted(records, key=lambda kv: (-kv["age"], kv["name"]))


# ---------------------------------------------------------------- 7. 文本统计
def count_lines_and_words(text: str) -> tuple[int, int]:
    """返回 (非空行数, 单词数)。单词按空白切分。
    提示：`text.splitlines()` + 逐行 `if line.strip()`；单词用 sum(len(l.split()) ...)。
    """
    row_sum = 0
    word_sum = 0
    for line in text.splitlines():
        if line.strip():
            row_sum = row_sum + 1
            word_sum = word_sum + len(line.split())
    return (row_sum, word_sum)


# ---------------------------------------------------------------- 8. 异常
def safe_int(value, default: int = 0) -> int:
    """把 value 转 int；转不了（None、非法字符串、浮点字符串）就返回 default。

    提示：try/except (TypeError, ValueError)。注意 int("3.5") 也会抛 ValueError。
    """
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


# ---------------------------------------------------------------- 9. 生成器
def fib(n: int):
    """生成斐波那契数列的前 n 项（1, 1, 2, 3, 5, ...），用 yield。

    提示：a, b = 1, 1；循环 n 次，每次 yield a，然后 a, b = b, a + b。
    """
    a, b = 1, 1
    for _ in range(n):
        yield a
        a, b = b, b + a


# ---------------------------------------------------------------- 10. dataclass
@dataclass
class TokenUsage:
    """一次调用的 token 用量。"""

    prompt_tokens: int
    completion_tokens: int

    def total(self) -> int:
        """总 token 数。"""
        return self.prompt_tokens + self.completion_tokens

    def cost(self, prompt_price_per_m: float, completion_price_per_m: float) -> float:
        """按「每百万 token 单价」计算费用，返回美元。

        例：1000 prompt + 500 completion，单价 0.15 / 0.6 → 0.00045
        """
        return (
            self.prompt_tokens / 1_000_000 * prompt_price_per_m
            + self.completion_tokens / 1_000_000 * completion_price_per_m
        )


# ================================================================ 测试
def _t1():
    assert top_words("the cat the dog the bird", 2) == [("the", 3), ("bird", 1)]


def _t2():
    assert even_squares([1, 2, 3, 4]) == [4, 16]


def _t3():
    assert group_by_first_letter(["apple", "Avocado", "banana"]) == {
        "a": ["apple", "Avocado"],
        "b": ["banana"],
    }


def _t4():
    assert add_item("a") == ["a"]
    assert add_item("b") == ["b"]  # 关键：两次调用不能共享同一个列表


def _t5():
    assert pair_sums([1, 2, 3], [10, 20]) == [11, 22]


def _t6():
    records = [
        {"name": "b", "age": 30},
        {"name": "a", "age": 30},
        {"name": "c", "age": 20},
    ]
    assert sort_records(records) == [
        {"name": "a", "age": 30},
        {"name": "b", "age": 30},
        {"name": "c", "age": 20},
    ]
    assert records[0]["name"] == "b"  # 不能改动原列表


def _t7():
    assert count_lines_and_words("hello world\n\nfoo") == (2, 3)


def _t8():
    assert safe_int("42") == 42
    assert safe_int("3.5", -1) == -1
    assert safe_int(None) == 0


def _t9():
    assert list(fib(5)) == [1, 1, 2, 3, 5]


def _t10():
    usage = TokenUsage(1000, 500)
    assert usage.total() == 1500
    assert abs(usage.cost(0.15, 0.6) - 0.00045) < 1e-9


def _expect(name: str, fn):
    try:
        fn()
        return (name, True, "")
    except NotImplementedError:
        return (name, False, "未实现")
    except AssertionError:
        return (name, False, "断言失败：结果和预期不一致")
    except Exception as exc:  # noqa: BLE001
        return (name, False, f"{type(exc).__name__}: {exc}")


def run_tests() -> int:
    tests = [
        ("1. top_words", _t1),
        ("2. even_squares", _t2),
        ("3. group_by_first_letter", _t3),
        ("4. add_item（默认参数陷阱）", _t4),
        ("5. pair_sums", _t5),
        ("6. sort_records", _t6),
        ("7. count_lines_and_words", _t7),
        ("8. safe_int", _t8),
        ("9. fib（生成器）", _t9),
        ("10. TokenUsage（dataclass）", _t10),
    ]

    results = [_expect(name, fn) for name, fn in tests]
    passed = sum(1 for _, ok, _ in results if ok)
    for name, ok, reason in results:
        print(f"{'√' if ok else '×'} {name}{'' if ok else '  ← ' + reason}")
    print(f"\n{passed}/{len(results)}")
    return passed


if __name__ == "__main__":
    raise SystemExit(0 if run_tests() == 10 else 1)
