"""第 1 周 · Python 速成练习（第二组 · 20 题）

对应学习文档：docs/study/w01d2.md
「W1 周二 · Python 速成（一）：语法与数据结构」

参考资料：
  1. Learn Python in Y minutes — https://learnxinyminutes.com/docs/python/
  2. Python 官方教程 第 3/4/7/8 章 — https://docs.python.org/zh-cn/3/tutorial/
  3. projects/w1/README.md 里的 Java → Python 对照表

用法：
    cd projects/w1
    python exercises_w1_part2.py

20 道题全部通过时打印 20/20。每题 docstring 里有规则、示例和提示；
卡住超过 10 分钟再看提示，不要一开始搜答案。

覆盖范围：
  #1             算术、// 与 % 的符号
  #2-3           字符串、切片、f-string 之外的字符串处理
  #4-6           列表、解构交换、切片、set、排序
  #7-9           dict、enumerate、setdefault
  #10            多关键字排序
  #11-13         *args、**kwargs、dict 合并
  #14-16         列表/字典推导式、zip、嵌套推导
  #17            异常处理
  #18            可变默认参数陷阱（学习文档点名的重点）
  #19-20         生成器 yield
"""

from __future__ import annotations

import sys
from collections.abc import Iterator

# Windows 控制台默认可能是 GBK，强制 UTF-8 输出，避免中文变乱码
for _stream in (sys.stdout, sys.stderr):
    try:
        _stream.reconfigure(encoding="utf-8")
    except (AttributeError, ValueError):
        pass


# ---------------------------------------------------------------- 1. 算术
def floor_divide(a: int, b: int) -> tuple[int, int]:
    """返回 (a // b, a % b)，并保证 a == 商 * b + 余数。

    注意 Python 的 // 是向下取整（floor），% 的结果符号与除数 b 相同，
    和 Java/C 的截断除法不同。

    示例：
        floor_divide(7, 3)    # (2, 1)
        floor_divide(-7, 3)   # (-3, 2)
        floor_divide(7, -3)   # (-3, -2)

    提示：直接用 // 和 % 两个运算符，不要调内置 divmod。
    Java 对照：Java 的 -7 / 3 == -2、-7 % 3 == -1。
    """
    return a // b, a % b


# ---------------------------------------------------------------- 2. 字符串切片
def truncate(text: str, limit: int, suffix: str = "…") -> str:
    """把 text 截断到最长 limit 个字符；超长时末尾换成 suffix。

    规则：
      - len(text) <= limit：原样返回
      - 否则返回 text[:limit - len(suffix)] + suffix
      - limit <= 0 或 limit < len(suffix) 时抛 ValueError

    示例：
        truncate("hello world", 8)     # "hello w…"
        truncate("short", 10)          # "short"
        truncate("abcdef", 3, "..")    # "a.."

    提示：字符串切片是 text[:n]；注意 suffix 的长度也算进 limit。
    """
    if limit < 0 or limit < len(suffix):
        raise ValueError
    if len(text) <= limit:
        return text
    else:
        return text[:limit - len(suffix)] + suffix


# ---------------------------------------------------------------- 3. 字符串处理
def slugify(title: str) -> str:
    """把标题变成 URL slug：小写、只保留字母/数字/空白、空白折叠成 '-'。

    规则：
      - 先转小写
      - 去掉所有既不是字母数字（str.isalnum）也不是空白的字符
      - 用 split() 按任意空白切分，再用 '-' 连接
      - 结果没有首尾 '-'

    示例：
        slugify("  Hello, World!  ")         # "hello-world"
        slugify("Python 3.13: What's New?")  # "python-313-whats-new"
        slugify("!!!")                        # ""

    提示：
        "".join(c for c in title if c.isalnum() or c.isspace())
        "-".join(kept.split())
    注意 split() 不带参数会自动处理连续空白。
    """

    kept = "".join(c for c in title.lower() if c.isalnum() or c.isspace()) # 遍历判断再用空串拼接
    return "-".join(kept.split())


# ---------------------------------------------------------------- 4. 解构交换
def swap_adjacent(items: list[int]) -> list[int]:
    """返回新列表：相邻两个元素交换位置；奇数个时最后一个不动。

    不要修改传入的列表。

    示例：
        swap_adjacent([1, 2, 3, 4])  # [2, 1, 4, 3]
        swap_adjacent([1, 2, 3])     # [2, 1, 3]

    提示：先 result = items[:] 复制；再 range(0, len(result) - 1, 2) 循环，
    用解构交换：result[i], result[i + 1] = result[i + 1], result[i]。
    Java 对照：需要临时变量 temp 才能交换两个元素。
    """
    raise NotImplementedError


# ---------------------------------------------------------------- 5. 切片轮转
def rotate(items: list[int], k: int) -> list[int]:
    """把列表向右轮转 k 位，返回新列表，不修改原列表。

    k 可以是负数（向左）或大于长度；空列表返回空列表。

    示例：
        rotate([1, 2, 3, 4, 5], 2)   # [4, 5, 1, 2, 3]
        rotate([1, 2, 3, 4, 5], -1)  # [2, 3, 4, 5, 1]
        rotate([1, 2, 3], 5)         # [2, 3, 1]

    提示：先处理空列表；再 k %= len(items) 归一到 [0, len)；
    最后 items[-k:] + items[:-k]（k == 0 时也成立）。
    """
    raise NotImplementedError


# ---------------------------------------------------------------- 6. set 与排序
def second_largest(nums: list[int]) -> int | None:
    """返回第二大的「不同」整数；不同值少于 2 个时返回 None。

    示例：
        second_largest([3, 1, 2])  # 2
        second_largest([5, 5, 4])  # 4
        second_largest([7])        # None
        second_largest([2, 2])     # None

    提示：set(nums) 去重 → sorted → 取倒数第二个；注意空列表和单元素。
    """
    raise NotImplementedError


# ---------------------------------------------------------------- 7. enumerate
def word_positions(text: str) -> dict[str, list[int]]:
    """统计每个单词出现的位置（从 0 开始）；单词转小写、按空白切分。

    返回的 dict 按单词首次出现顺序；每个单词的位置列表保持升序。
    不处理标点（"cat," 仍算一个单词 "cat,"）。

    示例：
        word_positions("The cat the dog")
        # {"the": [0, 2], "cat": [1], "dog": [3]}

    提示：enumerate(text.lower().split())，
    再用 d.setdefault(word, []).append(i)。
    """
    raise NotImplementedError


# ---------------------------------------------------------------- 8. 反向索引
def invert_lookup(d: dict[str, str]) -> dict[str, list[str]]:
    """把 {键: 值} 反转成 {值: [键, ...]}；值重复时收进同一个列表。

    保持输入中键的遍历顺序。

    示例：
        invert_lookup({"a": "x", "b": "y", "c": "x"})
        # {"x": ["a", "c"], "y": ["b"]}

    提示：d.setdefault(value, []).append(key)。
    """
    raise NotImplementedError


# ---------------------------------------------------------------- 9. 计数字典合并
def merge_counts(a: dict[str, int], b: dict[str, int]) -> dict[str, int]:
    """合并两个计数字典，同名键的计数相加；返回新字典，不修改 a、b。

    示例：
        merge_counts({"a": 1, "b": 2}, {"b": 3, "c": 1})
        # {"a": 1, "b": 5, "c": 1}

    提示：result = dict(a) 先复制；遍历 b.items()，
    用 result[k] = result.get(k, 0) + v。
    也可以了解 collections.Counter：Counter(a) + Counter(b)。
    """
    raise NotImplementedError


# ---------------------------------------------------------------- 10. 排序
def rank_players(names: list[str], scores: dict[str, int]) -> list[str]:
    """按分数降序排名；同分按名字字母升序；没有分数的按 0 分。

    返回新列表，不修改输入。

    示例：
        rank_players(["bob", "alice", "carol"],
                     {"alice": 10, "bob": 10})
        # ["alice", "bob", "carol"]

    提示：sorted(names, key=lambda n: (-scores.get(n, 0), n))。
    多关键字排序就是元组比较：前一个键取负号实现降序。
    """
    raise NotImplementedError


# ---------------------------------------------------------------- 11. *args
def sum_all(*nums: float) -> float:
    """返回所有位置参数之和；不传参数时返回 0。

    示例：
        sum_all()          # 0
        sum_all(1, 2, 3)   # 6
        sum_all(1.5, 2.5)  # 4.0

    提示：*nums 在函数内部是一个 tuple；用内置 sum，起始值为 0。
    Java 对照：类似 int... nums 可变参数。
    """
    raise NotImplementedError


# ---------------------------------------------------------------- 12. **kwargs
def format_config(**options: object) -> str:
    """把关键字参数格式化为 "k1=v1; k2=v2"，按键名升序，值用 str()。

    没有参数时返回空字符串。

    示例：
        format_config(b=2, a=1)                # "a=1; b=2"
        format_config(debug=True, port=8000)   # "debug=True; port=8000"

    提示：**options 在函数内部是一个 dict；用 sorted(options.items())。
    """
    raise NotImplementedError


# ---------------------------------------------------------------- 13. dict 合并
def with_defaults(config: dict, defaults: dict) -> dict:
    """合并两个字典：config 覆盖 defaults；返回新字典，不修改任何输入。

    示例：
        with_defaults({"b": 2}, {"a": 1, "b": 0})
        # {"a": 1, "b": 2}

    提示：{**defaults, **config}。注意顺序：后展开的覆盖前面的。
    """
    raise NotImplementedError


# ---------------------------------------------------------------- 14. 推导式
def group_by_parity(nums: list[int]) -> dict[str, list[int]]:
    """把数字分到 "even" 和 "odd" 两组，组内保持原顺序。

    即使某一组为空也要保留键，例如 group_by_parity([]) 返回
    {"even": [], "odd": []}。

    示例：
        group_by_parity([1, 2, 3, 4])  # {"even": [2, 4], "odd": [1, 3]}

    提示：可以直接构造 dict：
        {"even": [n for n in nums if n % 2 == 0],
         "odd":  [n for n in nums if n % 2 != 0]}
    """
    raise NotImplementedError


# ---------------------------------------------------------------- 15. zip(*)
def matrix_transpose(matrix: list[list[int]]) -> list[list[int]]:
    """转置二维列表：行变列。空矩阵返回 []。

    测试只覆盖等长矩阵；不等长时按 zip 的最短语义截断即可。

    示例：
        matrix_transpose([[1, 2, 3], [4, 5, 6]])
        # [[1, 4], [2, 5], [3, 6]]

    提示：zip(*matrix) 把每行拆开，再按列打包；每项是 tuple，
    用 [list(row) for row in zip(*matrix)] 转成 list。
    """
    raise NotImplementedError


# ---------------------------------------------------------------- 16. 嵌套推导
def flatten_once(nested: list[list[int]]) -> list[int]:
    """把「列表的列表」拍平一层，保持原顺序。

    示例：
        flatten_once([[1, 2], [], [3]])  # [1, 2, 3]

    提示：双层列表推导，for 的顺序和嵌套循环一致：
        [x for sub in nested for x in sub]
    不要用 sum(nested, [])——那是 O(n²)，只适合极小数据。
    """
    raise NotImplementedError


# ---------------------------------------------------------------- 17. 异常
def parse_int_list(values: list[object]) -> tuple[list[int], list[object]]:
    """逐个尝试转 int，返回 (成功列表, 失败的原始值列表)。

    成功值和失败值都保持原顺序。int("3.5") 会失败；
    None、list 等会抛 TypeError，也要算失败。

    示例：
        parse_int_list(["1", "x", None, "3.5", "4"])
        # ([1, 4], ["x", None, "3.5"])

    提示：
        try:
            ok.append(int(v))
        except (ValueError, TypeError):
            failed.append(v)
    """
    raise NotImplementedError


# ---------------------------------------------------------------- 18. 默认参数
def add_tag(tag: str, tags: list[str] | None = None) -> list[str]:
    """把 tag 追加到 tags 并返回；不传 tags 时，每次调用都要得到新列表。

    示例：
        add_tag("python")              # ["python"]
        add_tag("llm")                 # ["llm"]，不能和上一次共享列表
        t = ["ai"]
        add_tag("rag", t)              # ["ai", "rag"]，返回值就是 t

    提示：默认值写 None，不要写 tags=[]。
    默认参数只在函数定义时求值一次，写 [] 会让所有调用共享同一个列表。
    这是学习文档里点名的「四个肌肉记忆」之一。
    """
    raise NotImplementedError


# ---------------------------------------------------------------- 19. 生成器
def chunked(items: list[int], size: int) -> Iterator[list[int]]:
    """生成器：把 items 按每块 size 个切开，依次 yield。

    size <= 0 时抛 ValueError；items 为空时不产出任何值。
    注意这是生成器函数，ValueError 在开始迭代时才抛出。

    示例：
        list(chunked([1, 2, 3, 4, 5], 2))  # [[1, 2], [3, 4], [5]]
        list(chunked([], 3))               # []

    提示：
        if size <= 0:
            raise ValueError("size must be positive")
        for i in range(0, len(items), size):
            yield items[i:i + size]
    """
    raise NotImplementedError


# ---------------------------------------------------------------- 20. 生成器状态
def running_total(nums: list[int]) -> Iterator[int]:
    """生成器：依次产出前缀和（累计和）。

    示例：
        list(running_total([1, 2, 3]))  # [1, 3, 6]
        list(running_total([]))         # []

    提示：total = 0；循环里 total += n 之后 yield total。
    """
    raise NotImplementedError


# ================================================================ 测试
def _t1():
    assert floor_divide(7, 3) == (2, 1)
    assert floor_divide(-7, 3) == (-3, 2)
    assert floor_divide(7, -3) == (-3, -2)
    assert floor_divide(-7, -3) == (2, -1)
    for a, b in [(7, 3), (-7, 3), (7, -3), (-7, -3), (0, 5), (9, -4)]:
        q, r = floor_divide(a, b)
        assert q * b + r == a, f"不满足 a == q*b + r：a={a}, b={b}"


def _t2():
    assert truncate("hello world", 8) == "hello w…"
    assert truncate("short", 10) == "short"
    assert truncate("abcdef", 6) == "abcdef"
    assert truncate("abcdef", 3, "..") == "a.."
    try:
        truncate("abcdef", 1, "..")
    except ValueError:
        pass
    else:
        raise AssertionError("limit 小于 suffix 长度时应抛 ValueError")


def _t3():
    assert slugify("  Hello, World!  ") == "hello-world"
    assert slugify("Python 3.13: What's New?") == "python-313-whats-new"
    assert slugify("!!!") == ""
    assert slugify("A  B\tC\n") == "a-b-c"


def _t4():
    original = [1, 2, 3, 4]
    assert swap_adjacent(original) == [2, 1, 4, 3]
    assert swap_adjacent([1, 2, 3]) == [2, 1, 3]
    assert swap_adjacent([]) == []
    assert original == [1, 2, 3, 4], "不能修改传入的列表"


def _t5():
    assert rotate([1, 2, 3, 4, 5], 2) == [4, 5, 1, 2, 3]
    assert rotate([1, 2, 3, 4, 5], -1) == [2, 3, 4, 5, 1]
    assert rotate([1, 2, 3], 5) == [2, 3, 1]
    assert rotate([], 3) == []
    original = [1, 2, 3]
    assert rotate(original, 1) == [3, 1, 2]
    assert original == [1, 2, 3], "不能修改传入的列表"


def _t6():
    assert second_largest([3, 1, 2]) == 2
    assert second_largest([5, 5, 4]) == 4
    assert second_largest([7]) is None
    assert second_largest([]) is None
    assert second_largest([2, 2]) is None


def _t7():
    assert word_positions("The cat the dog") == {
        "the": [0, 2],
        "cat": [1],
        "dog": [3],
    }
    assert word_positions("") == {}
    assert word_positions("a a a") == {"a": [0, 1, 2]}


def _t8():
    result = invert_lookup({"a": "x", "b": "y", "c": "x"})
    assert result == {"x": ["a", "c"], "y": ["b"]}
    assert list(result) == ["x", "y"], "应保持首次出现的顺序"
    assert invert_lookup({}) == {}


def _t9():
    a = {"a": 1, "b": 2}
    b = {"b": 3, "c": 1}
    assert merge_counts(a, b) == {"a": 1, "b": 5, "c": 1}
    assert a == {"a": 1, "b": 2}, "不能修改 a"
    assert b == {"b": 3, "c": 1}, "不能修改 b"


def _t10():
    assert rank_players(
        ["bob", "alice", "carol"], {"alice": 10, "bob": 10}
    ) == ["alice", "bob", "carol"]
    assert rank_players(
        ["zoe", "amy", "max"], {"zoe": 5, "amy": 9, "max": 1}
    ) == ["amy", "zoe", "max"]


def _t11():
    assert sum_all() == 0
    assert sum_all(1, 2, 3) == 6
    assert abs(sum_all(1.5, 2.5) - 4.0) < 1e-9


def _t12():
    assert format_config(b=2, a=1) == "a=1; b=2"
    assert format_config() == ""
    assert format_config(debug=True, port=8000) == "debug=True; port=8000"


def _t13():
    config = {"b": 2}
    defaults = {"a": 1, "b": 0}
    assert with_defaults(config, defaults) == {"a": 1, "b": 2}
    assert config == {"b": 2}, "不能修改 config"
    assert defaults == {"a": 1, "b": 0}, "不能修改 defaults"


def _t14():
    assert group_by_parity([1, 2, 3, 4]) == {"even": [2, 4], "odd": [1, 3]}
    assert group_by_parity([]) == {"even": [], "odd": []}


def _t15():
    assert matrix_transpose([[1, 2, 3], [4, 5, 6]]) == [[1, 4], [2, 5], [3, 6]]
    assert matrix_transpose([[1, 2], [3, 4]]) == [[1, 3], [2, 4]]
    assert matrix_transpose([]) == []


def _t16():
    assert flatten_once([[1, 2], [], [3]]) == [1, 2, 3]
    assert flatten_once([]) == []


def _t17():
    assert parse_int_list(["1", "x", None, "3.5", "4"]) == (
        [1, 4],
        ["x", None, "3.5"],
    )
    assert parse_int_list([]) == ([], [])


def _t18():
    assert add_tag("python") == ["python"]
    assert add_tag("llm") == ["llm"]  # 关键：两次调用不能共享同一个列表
    tags = ["ai"]
    result = add_tag("rag", tags)
    assert result == ["ai", "rag"]
    assert result is tags


def _t19():
    assert list(chunked([1, 2, 3, 4, 5], 2)) == [[1, 2], [3, 4], [5]]
    assert list(chunked([], 3)) == []
    try:
        list(chunked([1, 2], 0))
    except ValueError:
        pass
    else:
        raise AssertionError("size <= 0 时应抛 ValueError")


def _t20():
    assert list(running_total([1, 2, 3])) == [1, 3, 6]
    assert list(running_total([])) == []
    assert list(running_total([5])) == [5]


def _expect(name: str, fn):
    try:
        fn()
        return (name, True, "")
    except NotImplementedError:
        return (name, False, "未实现")
    except AssertionError as exc:
        reason = str(exc) or "结果和预期不一致"
        return (name, False, f"断言失败：{reason}")
    except Exception as exc:  # noqa: BLE001
        return (name, False, f"{type(exc).__name__}: {exc}")


def run_tests() -> int:
    tests = [
        ("1. floor_divide（// 与 %）", _t1),
        ("2. truncate（切片）", _t2),
        ("3. slugify（字符串处理）", _t3),
        ("4. swap_adjacent（解构交换）", _t4),
        ("5. rotate（切片轮转）", _t5),
        ("6. second_largest（set 与排序）", _t6),
        ("7. word_positions（enumerate）", _t7),
        ("8. invert_lookup（setdefault）", _t8),
        ("9. merge_counts（dict 合并）", _t9),
        ("10. rank_players（多关键字排序）", _t10),
        ("11. sum_all（*args）", _t11),
        ("12. format_config（**kwargs）", _t12),
        ("13. with_defaults（dict 展开）", _t13),
        ("14. group_by_parity（推导式）", _t14),
        ("15. matrix_transpose（zip(*))", _t15),
        ("16. flatten_once（嵌套推导）", _t16),
        ("17. parse_int_list（异常）", _t17),
        ("18. add_tag（默认参数陷阱）", _t18),
        ("19. chunked（生成器）", _t19),
        ("20. running_total（生成器状态）", _t20),
    ]

    results = [_expect(name, fn) for name, fn in tests]
    passed = sum(1 for _, ok, _ in results if ok)
    for name, ok, reason in results:
        print(f"{'√' if ok else '×'} {name}{'' if ok else '  ← ' + reason}")
    print(f"\n{passed}/{len(results)}")
    return passed


if __name__ == "__main__":
    raise SystemExit(0 if run_tests() == 20 else 1)
