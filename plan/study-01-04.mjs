// 第 1–4 周：每日学习文档（讲义级）
// 只讲知识点、阅读顺序、动手与自检，不预写每周作业代码。

const s = (h, p, list = []) => ({ h, p: Array.isArray(p) ? p : [p], list });
const r = (title, url, note = '') => ({ title, url, note });

export const dayStudies = {
  // ───────────────────────── W1 ─────────────────────────
  'w1d1': {
    goal: '建立「模型 + 上下文 + 工具 + 编排」的全局地图，把开发环境一次装好。',
    sections: [
      s('AI 应用不是训练模型', [
        '你接下来要做的事，是把大模型当成一个「推理引擎」：它负责理解和生成，你负责给它上下文、给它工具、编排步骤，并对结果做校验和评测。',
        '所以岗位叫「AI 应用开发」，不是「算法工程师」。前者拼的是工程能力：接口、检索、状态、评测、成本、权限。',
      ], [
        'Prompt 工程：改输入，成本最低，先做。',
        'RAG：把外部知识检索进上下文，解决「不知道」和「知识过期」。',
        'Agent：让模型决定调用工具、分步执行，解决「不会做」和「步骤不定」。',
        '微调：改变模型的行为、风格或领域能力，成本最高，最后考虑。',
      ]),
      s('环境只要四样', [
        'Python 3.13 + uv + VS Code + Git。uv 同时管 Python 版本、虚拟环境和依赖，可以理解为「Maven + SDKMAN + venv」三合一。',
        '每个项目一个 .venv，不要往系统 Python 里装业务依赖。先用 uv --version、python --version 验证，装库是后面的事。',
      ]),
      s('先画地图，再学细节', [
        '手画一张四层图：最上面是应用形态（问答、知识库、Agent），中间是编排（prompt、工作流、循环），下面是能力（检索、工具、记忆），最底层是模型与基础设施（API、向量库、可观测）。',
        '这张图会在 20 周里反复更新；第 1 周只需要知道每一层大概负责什么。',
      ]),
    ],
    resources: [
      r('Anthropic · Building effective agents', 'https://www.anthropic.com/engineering/building-effective-agents', '先读「Workflows vs Agents」和五种 workflow，不求全懂'),
      r('DeepSeek API 文档', 'https://api-docs.deepseek.com/', '看 Quick Start 和 Models，知道 base_url、模型名、计费单位'),
      r('uv 官方文档', 'https://docs.astral.sh/uv/', '只看 Getting started 和 Managing projects'),
      r('Python 官方教程（中文）', 'https://docs.python.org/zh-cn/3/tutorial/', '今天不用读完，收藏即可'),
    ],
    practice: [
      '装好 Python 3.13、uv、VS Code、Git，四项版本命令都能跑通。',
      '手绘或文本画出你的 AI 应用技术地图，拍照存档。',
      '写一句：我想投的岗位更偏「应用工程」还是「算法」？为什么？',
    ],
    selfCheck: [
      '不看资料，说出 Prompt / RAG / Agent / 微调各自补什么缺口。',
      'uv 和 Maven 的对应关系是什么？为什么每个项目要独立 .venv？',
      '为什么选型顺序通常是 Prompt → RAG → Agent → 微调？',
    ],
  },

  'w1d2': {
    goal: '用 Java 的底子快速过一遍 Python 语法，把「能写脚本」的 20% 先拿到。',
    sections: [
      s('和 Java 最像的部分', [
        '变量、函数、类、异常、模块都在，但 Python 的类型是后验的：运行时才检查。缩进是语法，不是风格；没有花括号。',
        '不要从「Python 教程第一章」开始重学编程。你已经会编程，缺的是语法映射和惯用法。',
      ]),
      s('四个必须形成肌肉记忆的点', [
        '容器：list / dict / set 覆盖 90% 的日常；推导式替代 Java stream。',
        '解构：a, b = b, a 和 x, y = pair 在 Python 里非常常用。',
        '默认参数：默认值在函数定义时求值一次，可变默认参数会被所有调用共享。',
        '生成器：yield 是惰性求值，处理大文件、流式 token 时不会把内存打爆。',
      ], [
        'list：有序可变，类似 ArrayList。',
        'dict：哈希表，键不存在时 d[k] 抛 KeyError，用 d.get(k, default)。',
        'set：去重与集合运算，类似 HashSet。',
      ]),
      s('怎么练', [
        '先看 Learn Python in Y minutes 建立印象，再直接写 projects/w1/exercises_w1.py 的 10 题；卡住看该题 docstring 的提示，不要先通读教程。',
        '每做完一题，用 Java 想一遍等价写法，把差异写进一句话笔记。',
      ]),
    ],
    resources: [
      r('Learn Python in Y minutes', 'https://learnxinyminutes.com/docs/python/', '20 分钟扫一遍语法'),
      r('Python 官方教程 · 第 3/4/7/8 章', 'https://docs.python.org/zh-cn/3/tutorial/', '按需查：数据结构、流程控制、输入输出、错误处理'),
      r('projects/w1/README.md', 'https://github.com/shaoxiaofeng03/dev3/blob/main/projects/w1/README.md', '本仓库里的 Java→Python 对照表'),
    ],
    practice: [
      '完成 exercises_w1.py 的 10 题，跑到 10/10。',
      '重点理解第 4 题：为什么不能写 bucket=[] 做默认参数。',
      '用自己的话写一句「推导式和 Java stream 的对应关系」。',
    ],
    selfCheck: [
      '可变默认参数为什么危险？正确写法是什么？',
      '列表推导式、生成器表达式、Java stream 三者各自什么时候用？',
      'dict 取不存在的键有哪几种处理方式？',
    ],
  },

  'w1d3': {
    goal: '用 2 小时把 Python 从「会写函数」推进到「能交付一个小工具」：会建项目、管依赖、拆模块、写类型、处理异常、发出带超时和日志的 HTTP 请求；遇到报错，知道该查哪里。',
    sections: [
      s('今日大纲：2 小时怎么用', [
        '先按这张表走一遍；每节的代码都给了完整片段，照抄能跑，不需要再翻官方文档。今天的验收物不是笔记，而是 `projects/hello-world` 里一个能跑的 CLI 探测工具。',
      ], [
        '0:00–0:15 三件套：`pyproject.toml` / `uv.lock` / `.venv` 各自负责什么，uv 的 7 个常用命令。',
        '0:15–0:35 模块与 import：`sys.path`、只执行一次、`__name__` guard、`python -m` 与 `python file.py` 的区别。',
        '0:35–0:55 异常：分类捕获、`raise ... from`、自定义异常、可重试与不可重试。',
        '0:55–1:10 类型注解与 dataclass：边界加类型，配置用 dataclass。',
        '1:10–1:40 HTTP：httpx、四类超时、异常分层、状态码、重试、可观测字段。',
        '1:40–2:00 实战：把以上拼成 `hello_world` 包，用 `uv run python -m hello_world` 跑通，并故意触发一次 401。',
      ]),

      s('一、工程化三件套：声明、锁定、落地', [
        'Java 里 pom 声明依赖，Maven 解析后下载到 `~/.m2`，classpath 决定运行时能加载哪些 jar。Python 把这三件事拆成了三个东西，并且多了一层「每个项目一个解释器环境」。',
      ]),
      s('1.1 三件套的数据流', [
        '把这条链记住，后面所有「为什么装不上 / 为什么版本不对」都能从链上定位：',
      ], [
        '`pyproject.toml`：声明「我要什么」，类似 pom 的 `<dependencies>`，本身不安装任何东西。',
        '`uv.lock`：锁定「最终是哪个版本、从哪来、hash 是多少」，同事和 CI 装出来和你完全一致。',
        '`.venv/`：落地「本项目的解释器和已装依赖」，可随时删除重建，**不进 git**。',
        'uv 全局缓存（`~/.cache/uv`）：真正共享的下载缓存，≈ `~/.m2/repository`，第二次装同一个包几乎不下载。',
        '`sys.path`：运行时真正扮演 classpath 的角色；`.venv` 只是让解释器自动把它加进 `sys.path`。',
      ]),
      s('1.2 pyproject.toml 里只要看懂五块', [
        '下面是本项目的完整配置，字段都已标注；其余字段（authors、readme、license）不影响今天的目标。',
        '```toml\n[project]\nname = "hello-world"\nversion = "0.1.0"\nrequires-python = ">=3.13"            # 允许的解释器版本范围\n\ndependencies = [\n    "httpx>=0.28",                     # 等价于 pom 的 <dependency>\n]\n\n[project.scripts]\nhello-world = "hello_world.cli:main"   # 命令名 → 包.模块:函数\n\n[build-system]\nrequires = ["uv_build>=0.13.8,<0.14.0"]\nbuild-backend = "uv_build"             # 打包后端，先当黑盒\n```',
        '`[project.scripts]` 最容易忽略：它注册的是一条**真实命令**。装好项目后，终端里的 `hello-world` 就等于调用 `hello_world/cli.py` 里的 `main()`，和 Java 在 manifest 里写 `Main-Class` 是同一类机制。',
      ]),
      s('1.3 uv 常用命令：一张表够用', [
        '所有命令都在项目根目录执行；`uv run` 会自动向上查找 `pyproject.toml`，找不到才报错。',
        '| 命令 | 做什么 | Maven 类比 |\n| --- | --- | --- |\n| `uv init --package hello-world` | 建项目骨架（src layout） | `mvn archetype:generate` |\n| `uv add httpx` | 改 pyproject + 更新 lock + 装进 .venv | 改 pom 后 `mvn install` |\n| `uv remove httpx` | 删依赖并同步三件套 | 删依赖后重新解析 |\n| `uv lock` | 只解析并写 `uv.lock` | 无真正对应 |\n| `uv sync` | 让 `.venv` 与 `uv.lock` 一致 | `mvn dependency:go-offline` |\n| `uv sync --locked` | 声明与 lock 不一致就直接失败（CI 用） | 无真正对应 |\n| `uv run <cmd>` | 在项目环境里执行，必要时先 sync | `mvn exec:java` |\n| `uv tree` | 打印依赖树 | `mvn dependency:tree` |\n| `uv python pin 3.13` | 写 `.python-version` | Maven toolchains |',
      ]),
      s('1.4 lock 与 git 的三条纪律', [
        '`pyproject.toml` 和 `uv.lock` 都提交；`.venv/` 不提交。clone 下来的人只跑 `uv sync --locked`，不要让他「自己 pip install 一堆」。',
        '`uv.lock` 不要手改。要升级某个包用 `uv lock --upgrade-package httpx`，要全量升级用 `uv lock --upgrade`，然后看 diff 再提交。',
        'CI 里用 `uv sync --locked`：声明和锁不一致就直接失败，避免普通 `uv sync` **悄悄改锁**绕过评审。`--frozen` 更激进，连锁是否过期都不检查，只在明确不需要动锁的场景用；本地开发用普通 `uv sync` 即可。',
      ]),
      s('1.5 为什么源码放在 src/ 下', [
        '`src/hello_world/` 不在项目根目录，默认不在 `sys.path` 上。`uv sync` 会以 editable 方式把 `hello_world` 装进 `.venv`，于是 `import hello_world` 加载的是源码目录，而不是「碰巧当前目录有个同名文件夹」。',
        '这和 Java 必须把代码打成 jar 才能被别的模块引用是一个道理：先安装，再导入。好处是「本地能跑」和「装完能跑」是同一种状态，测试不会给你假阳性。',
        '```\nprojects/hello-world/\n├── pyproject.toml\n├── uv.lock\n├── .python-version\n└── src/\n    └── hello_world/\n        ├── __init__.py\n        ├── __main__.py\n        ├── cli.py\n        ├── config.py\n        └── http_probe.py\n```',
      ]),

      s('二、import 到底怎么找模块', [
        '先记住一句话：**import 不是编译期链接，而是运行时按路径找文件并执行。** 找的过程只看 `sys.path`，执行的结果缓存在 `sys.modules`。',
      ]),
      s('2.1 模块、包、包的入口', [
        '一个 `.py` 文件就是模块；带 `__init__.py` 的目录是包。`hello_world` 是包，`hello_world.cli` 是包里的模块。',
        '包被 import 时，`__init__.py` 先执行；它应该保持轻量（版本号、少量导出），不要在里面发网络请求或读配置。',
        '`python -m hello_world` 的完整流程是：先 import 包 `hello_world`（执行 `__init__.py`），再执行 `hello_world/__main__.py`，并把它的 `__name__` 设为 `"__main__"`。',
      ]),
      s('2.2 sys.path 随启动方式变化', [
        '这是「我这儿能跑、你那儿 ModuleNotFoundError」的第一大来源。注意区别在于**第一个元素**：',
        '| 启动方式 | `sys.path[0]` | 说明 |\n| --- | --- | --- |\n| `python script.py` | 脚本所在目录 | 不是当前工作目录 |\n| `python -m pkg.mod` | 当前工作目录 | 需要 cwd 是项目根 |\n| `import pkg` | 不变 | 解释器还会加上 `.venv` 的 site-packages |',
        '`uv run` 不改变这条规则，它只是确保用 `.venv` 里的 python，并在必要时先 sync。想在任意目录运行，就不要依赖 cwd，改用已安装的包或 console script。',
      ]),
      s('2.3 顶层代码只执行一次', [
        '把下面这段放进 `src/hello_world/__init__.py`，然后连续 import 两次：',
        '```python\n# src/hello_world/__init__.py\nprint("hello_world 被导入了")\n\n__version__ = "0.1.0"\n```',
        '```bash\nuv run python -c "import hello_world; import hello_world"\n# 输出只有一行：hello_world 被导入了\n```',
        '第二次 import 直接命中 `sys.modules` 缓存。这就是模块级状态的来源：模块里的变量相当于单例，测试之间会互相污染。',
      ]),
      s('2.4 __name__ 与入口 guard', [
        '`__name__` 在「直接作为入口执行」时是 `"__main__"`，被 import 时是模块名。注意：`python file.py` 和 `python -m pkg.mod` 都会让目标文件拿到 `"__main__"`，区别不在 `__name__`，而在 `sys.path` 和是否经过包。',
        '```python\n# src/hello_world/cli.py\ndef main() -> int:\n    print("真正的主逻辑")\n    return 0\n\n\nif __name__ == "__main__":\n    raise SystemExit(main())\n```',
        '两种运行结果：',
        '```bash\nuv run python -m hello_world.cli   # __name__ == "__main__"，主逻辑执行\nuv run python -c "import hello_world.cli"  # __name__ == "hello_world.cli"，主逻辑不执行\n```',
        '不写 guard 的后果很具体：别人 import 你的模块（包括 pytest 收集测试、另一个模块复用你的函数）会连带执行主逻辑。`raise SystemExit(main())` 比 `main()` 多做了两件事：把返回值当退出码，并让 `finally` 正常执行。',
      ]),
      s('2.5 绝对导入、相对导入、循环导入', [
        '项目代码统一用绝对导入：`from hello_world.config import ProbeConfig`。它永远是明确的，挪动文件后也容易搜到。',
        '相对导入 `from .config import ProbeConfig` 只在「模块作为包的一部分被加载」时可用；直接 `python src/hello_world/cli.py` 把文件当顶层脚本执行时，Python 不知道它的父包，会报 `attempted relative import with no known parent package`。这就是推荐 `python -m` 的原因之一。',
        '循环导入（A import B，B 又 import A）通常不是语法问题，而是分层设计问题。按 `config ← http_probe ← cli` 单向依赖组织代码；真遇到时，把公共类型下沉到独立模块，而不是到处写函数内 import。',
      ]),
      s('2.6 import 报错排查三步', [
        '先确认解释器和路径，再确认包名，最后确认导出名。不要一上来就改代码。',
        '```bash\n# 1. 看解释器与搜索路径\nuv run python -c "import sys; print(sys.path)"\n\n# 2. 看实际加载到哪个文件（关键一步）\nuv run python -c "import hello_world; print(hello_world.__file__)"\n\n# 3. 看包是否真的装进了环境\nuv pip list | grep hello\n```',
        '| 报错 | 含义 | 优先检查 |\n| --- | --- | --- |\n| `ModuleNotFoundError: No module named ...` | 路径上找不到模块 | 是否 `uv sync`、cwd 是否是项目根、包名拼写 |\n| `ImportError: cannot import name ...` | 模块找到了，但里面没有这个名字 | 导出名拼写、是否忘了定义、是否循环导入 |\n| `attempted relative import ...` | 把包内文件当脚本直接跑了 | 改用 `python -m`，或改成绝对导入 |\n| `partially initialized module ...` | 循环导入 | 调整依赖方向 |',
      ]),

      s('三、异常：把失败当作正常路径', [
        '网络代码里，失败是常态，不是意外。异常处理的目标不是「不让程序崩」，而是**让每一层只处理自己能处理的错误，其余带着上下文往上抛**。',
      ]),
      s('3.1 异常层次：只记常用的', [
        '```\nBaseException\n├── SystemExit          # sys.exit / raise SystemExit\n├── KeyboardInterrupt   # Ctrl+C\n└── Exception\n    ├── OSError         # IO 错误基类\n    │   ├── FileNotFoundError\n    │   ├── ConnectionError\n    │   └── TimeoutError\n    ├── ValueError      # 值不合法（json.JSONDecodeError 是它的子类）\n    ├── TypeError       # 类型不对\n    ├── KeyError        # dict 键不存在\n    └── RuntimeError\n```',
        '`except Exception` 不会捕获 `KeyboardInterrupt` 和 `SystemExit`，这是好事：Ctrl+C 永远能打断程序。永远不要写裸 `except:`。',
      ]),
      s('3.2 try / except / else / finally 的分工', [
        '```python\ntry:\n    resp = client.get(url)\n    resp.raise_for_status()\nexcept httpx.TimeoutException:\n    ...                      # 只处理超时\nelse:\n    data = resp.json()       # 只有 try 全部成功才执行\nfinally:\n    client.close()           # 无论如何都执行\n```',
        '`else` 的价值：把「可能出错的请求」和「成功后的处理」分开，避免把解析错误也误当成请求错误捕获。',
        '捕获顺序必须**子类在前**。`httpx.TimeoutException` 是 `httpx.RequestError` 的子类，如果先写 `except RequestError`，超时分支永远不会生效。',
      ]),
      s('3.3 重新抛出要带上下文', [
        '```python\ntry:\n    resp = client.get(url)\nexcept httpx.ConnectError as exc:\n    raise ProbeError(f"连接失败: {url}") from exc\n```',
        '`from exc` 会保留原始异常，traceback 里显示「The above exception was the direct cause...」。丢掉它，线上只能看到一句「连接失败」，不知道是 DNS、TLS 还是代理。',
        '如果只是记录后继续抛，不要用 `raise exc`（会重置 traceback），直接用裸 `raise`。',
      ]),
      s('3.4 自定义异常：给调用方一个稳定契约', [
        '不要让 httpx 的异常类型泄漏到 CLI 层。定义一个基类，再按「调用方要不要区别对待」拆子类：',
        '```python\nclass ProbeError(Exception):\n    """探测失败的基类。"""\n\n\nclass NetworkError(ProbeError):\n    """连不上、握手失败、超时、连接中断。"""\n\n\nclass StatusError(ProbeError):\n    """服务器返回了 4xx / 5xx。"""\n\n    def __init__(self, status: int, body: str) -> None:\n        super().__init__(f"HTTP {status}: {body[:200]}")\n        self.status = status\n```',
        '这样 CLI 层只写 `except ProbeError` 就能统一转成退出码；将来做 LLMClient 时，重试层只捕 `NetworkError`，业务层只捕 `StatusError`，职责清楚。',
      ]),
      s('3.5 哪些错误值得重试', [
        '| 情况 | 可重试 | 处理方式 |\n| --- | --- | --- |\n| `ConnectTimeout` / `ConnectError` | 是 | 退避后重试，先确认地址是否写错 |\n| `ReadTimeout` / `RemoteProtocolError` | 是（仅幂等请求） | GET 可重试；POST 可能已经产生副作用 |\n| HTTP 429 | 是 | 优先遵守 `Retry-After`，再指数退避 |\n| HTTP 5xx | 是 | 指数退避 + 上限 3 次 |\n| HTTP 400 / 401 / 403 / 404 | 否 | 重试只会重复犯错，改请求或改 key |\n| `JSONDecodeError` | 否 | 响应格式变了，属于契约问题 |',
        '重试的三个必备要素：最大次数、指数退避 + 随机抖动、只对幂等操作重试。没有上限的重试会把一次故障放大成雪崩。',
      ]),

      s('四、类型注解：写给工具看，不写给解释器看', [
        'Python 的注解在运行时基本不生效。下面这段不会报错，输出是 `12`：',
        '```python\ndef add(a: int, b: int) -> int:\n    return a + b\n\nprint(add("1", "2"))   # 12\n```',
        '所以注解的价值在编辑器补全、mypy/pyright 静态检查、以及读代码的人。策略是：**函数签名和数据结构必标，局部变量能推断就不标。**',
      ]),
      s('4.1 今天够用的类型写法', [
        '| 写法 | 含义 | Java 近似 |\n| --- | --- | --- |\n| `str` / `int` / `float` / `bool` | 基本类型 | 同名 |\n| `list[int]` | 整数列表 | `List<Integer>` |\n| `dict[str, list[str]]` | 字符串到字符串列表 | `Map<String, List<String>>` |\n| `tuple[int, str]` | 定长元组 | `record` / Pair |\n| `str \\| None` | 可能为 None（3.10+） | `Optional<String>` |\n| `Any` | 放弃检查 | `Object`（但更危险） |\n| `Literal["json", "text"]` | 枚举字面量 | enum |\n| `Callable[[str], int]` | 函数类型 | `Function<String, Integer>` |',
        '`Any` 会污染整条调用链：一个 `Any` 传进去，后面所有检查都失效。宁可用 `str | None` 明确表达「可能没有」，也不要图省事写 `Any`。',
      ]),
      s('4.2 配置用 dataclass', [
        '```python\nfrom dataclasses import dataclass, field\n\n\n@dataclass(frozen=True, slots=True)\nclass ProbeConfig:\n    url: str\n    connect_timeout: float = 5.0\n    read_timeout: float = 10.0\n    headers: dict[str, str] = field(default_factory=dict)\n```',
        '三个关键点：`frozen=True` 让配置不可变，避免被调用的函数偷偷改掉；`slots=True` 阻止动态加属性，同时更省内存；可变默认值必须用 `field(default_factory=...)`，直接写 `headers: dict = {}` 会让所有实例共享同一个 dict——和第 2 天默认参数的坑是同一个。',
        'dataclass 自动生成 `__init__`、`__repr__`、`__eq__`，相当于 Java 里手写构造器、`toString`、`equals` 的那堆样板代码。需要转 dict 时用 `dataclasses.asdict(obj)`（注意：`slots=True` 的实例没有 `__dict__`）。',
      ]),
      s('4.3 把检查跑起来', [
        '```bash\nuv add --dev mypy\nuv run mypy src\n```',
        '编辑器里的 Pylance/pyright 会实时提示，命令行 mypy 适合放进 CI。今天只要求 `mypy src` 不报错，不追求 100% 覆盖。',
      ]),

      s('五、HTTP 客户端：超时、异常、状态码、可观测', [
        '安装：`uv add httpx`。下面是最小可用调用，注意用的是 `Client` 而不是模块级 `httpx.get`：',
        '```python\nimport httpx\n\ntimeout = httpx.Timeout(connect=5.0, read=60.0, write=10.0, pool=5.0)\nwith httpx.Client(timeout=timeout, headers={"Accept": "application/json"}) as client:\n    resp = client.get("https://httpbin.org/get", params={"q": "python"})\n    resp.raise_for_status()\n    data = resp.json()\n```',
        '`Client` 复用连接池和 TLS 会话，批量请求能省掉大量握手时间；`httpx.get(...)` 每次都会新建客户端。做 CLI 或服务时，一个客户端复用到底。',
      ]),
      s('5.1 四类超时，分别管什么', [
        '| 参数 | 管什么 | 典型值 |\n| --- | --- | --- |\n| `connect` | DNS + TCP + TLS 握手 | 3–5 秒 |\n| `read` | 两次收到数据之间的最大间隔 | 普通 API 10 秒；LLM 60–120 秒 |\n| `write` | 发送请求体的时间 | 10 秒 |\n| `pool` | 等待连接池空闲连接 | 5 秒 |',
        '两个容易误解的点：第一，`read` 不是总时长，而是「多久没收到新数据」；服务端持续缓慢地吐数据，总时长可以远超 read 超时。第二，httpx 没有内建的「总超时」，需要总时长上限时，异步用 `asyncio.timeout()`，同步在调用方计时并在超时后主动取消。',
        '不传 `timeout` 时 httpx 默认四类都是 5 秒。LLM 调用必须显式把 `read` 调大，否则长回答会被误杀；但也不能不设，没有超时的 HTTP 调用等于埋雷。',
      ]),
      s('5.2 httpx 异常分层', [
        '```\nhttpx.HTTPError\n├── HTTPStatusError              # raise_for_status() 遇到 4xx / 5xx\n└── RequestError                 # 传输层错误的基类\n    ├── TransportError\n    │   ├── TimeoutException     # ConnectTimeout / ReadTimeout / WriteTimeout / PoolTimeout\n    │   ├── NetworkError         # ConnectError / ReadError / WriteError\n    │   ├── ProtocolError        # RemoteProtocolError 等\n    │   └── ProxyError\n    ├── DecodingError\n    └── TooManyRedirects\n\nhttpx.InvalidURL 直接继承 Exception，不在这棵树里\n```',
        '记住基类就够写第一版：传输问题 catch `httpx.RequestError`，状态码问题 catch `httpx.HTTPStatusError`；要细分可重试逻辑时，再按上面的子类判断。',
      ]),
      s('5.3 状态码：默认不抛异常', [
        '这是 httpx 和很多人预期不同的地方：**4xx / 5xx 默认只是普通响应，不会抛异常。** 必须显式调用 `resp.raise_for_status()`，或自己判断 `resp.status_code`。',
        '| 状态 | 含义 | 处理 |\n| --- | --- | --- |\n| 2xx | 成功 | 解析响应 |\n| 301 / 302 | 重定向 | httpx 默认**不跟随**，需要 `follow_redirects=True` |\n| 400 | 请求格式错 | 不重试，检查参数 |\n| 401 / 403 | 认证失败 / 无权限 | 不重试，检查 key 和权限 |\n| 404 | 资源不存在 | 不重试，检查 URL |\n| 429 | 限流 | 可重试，优先读 `Retry-After` |\n| 5xx | 服务端故障 | 可重试，指数退避 |',
      ]),
      s('5.4 重试策略的最小实现', [
        '```python\nimport random\nimport time\n\nimport httpx\n\nRETRYABLE_STATUS = {429, 500, 502, 503, 504}\n\n\ndef should_retry(exc: Exception) -> bool:\n    if isinstance(\n        exc,\n        (httpx.ConnectTimeout, httpx.ReadTimeout, httpx.ConnectError, httpx.RemoteProtocolError),\n    ):\n        return True\n    if isinstance(exc, httpx.HTTPStatusError):\n        return exc.response.status_code in RETRYABLE_STATUS\n    return False\n\n\ndef backoff(attempt: int) -> float:\n    # 0.5s, 1s, 2s, 4s……再乘 0.8–1.2 的随机抖动，避免同时重试\n    return min(8.0, 0.5 * 2 ** attempt) * random.uniform(0.8, 1.2)\n```',
        '重试循环最多 3 次，每次失败记录 attempt、错误类型、耗时；429 时如果响应头有 `Retry-After`，优先按它等待。POST 请求（尤其是后面调 LLM）不要盲目重试，可能已经扣费或产生了副作用。',
      ]),
      s('5.5 可观测：一次请求至少记这六个字段', [
        '日志用 JSON 一行，后续接采集系统不用再改格式。字段选择和后面 LLMClient 完全复用：',
        '```json\n{"event": "http_request", "method": "GET", "url": "https://httpbin.org/get", "status": 200, "elapsed_ms": 183.4, "request_id": null}\n```',
        '`request_id` 从响应头取，不同厂商字段名不同（常见 `x-request-id`，DeepSeek 用 `x-ds-trace-id`，以实际响应头为准）。对账、排障、找厂商支持都靠它。',
        '耗时用 `time.perf_counter()` 而不是 `time.time()`：前者单调递增，不受系统时间调整影响。',
      ]),

      s('六、async/await：只要建立正确的心智模型', [
        'asyncio 是一个单线程事件循环：协程遇到 `await` 时把控制权交还给循环，循环去跑别的任务，IO 完成后再回来继续。它解决的是「等待」的浪费，不是「计算」的浪费。',
        '```python\nimport asyncio\nimport httpx\n\n\nasync def fetch_status(url: str) -> int:\n    async with httpx.AsyncClient(timeout=10.0) as client:\n        resp = await client.get(url)\n        return resp.status_code\n\n\nasync def main() -> None:\n    urls = ["https://httpbin.org/get", "https://httpbin.org/status/404"]\n    codes = await asyncio.gather(*(fetch_status(u) for u in urls))\n    print(codes)\n\n\nasyncio.run(main())\n```',
        '两条纪律：异步函数里不要调用阻塞的 `time.sleep()` 或同步 `httpx.Client`，会把整个事件循环卡住；CPU 密集任务（图像处理、大量计算）用多进程，不是 asyncio。今天会用同步客户端就够了，先把异常、超时、日志写对。',
      ]),

      s('七、实战：拼成一个 CLI 探测工具', [
        '目标：在 `projects/hello-world` 里实现 `uv run python -m hello_world <URL>`，输出状态码、耗时、request id 和响应预览；网络错误和 4xx/5xx 走错误分支，返回非 0 退出码。这个结构和第 5 天的 chat.py、第 6 天的 LLMClient 是同一套骨架。',
      ]),
      s('7.1 文件结构', [
        '```\nsrc/hello_world/\n├── __init__.py      # 只放版本号，保持轻量\n├── __main__.py      # python -m 的入口\n├── cli.py           # argparse + 退出码，供 -m 和 console script 共用\n├── config.py        # dataclass 配置\n└── http_probe.py    # HTTP 调用、异常映射、计时\n```',
        '先改 `__init__.py`（删掉 uv init 生成的 `main`，避免和 cli.py 重名），再把 `[project.scripts]` 改成 `hello-world = "hello_world.cli:main"`。',
        '```python\n# src/hello_world/__init__.py\n__version__ = "0.1.0"\n```',
      ]),
      s('7.2 config.py：不可变配置', [
        '```python\nfrom dataclasses import dataclass, field\n\n\n@dataclass(frozen=True, slots=True)\nclass ProbeConfig:\n    url: str\n    connect_timeout: float = 5.0\n    read_timeout: float = 10.0\n    headers: dict[str, str] = field(default_factory=dict)\n```',
      ]),
      s('7.3 http_probe.py：把 httpx 异常翻译成业务异常', [
        '```python\nimport time\nfrom dataclasses import dataclass\n\nimport httpx\n\nfrom hello_world.config import ProbeConfig\n\n\nclass ProbeError(Exception):\n    """探测失败的基类。"""\n\n\nclass NetworkError(ProbeError):\n    """连不上、握手失败、超时、连接中断。"""\n\n\nclass StatusError(ProbeError):\n    """服务器返回了 4xx / 5xx。"""\n\n    def __init__(self, status: int, body: str) -> None:\n        super().__init__(f"HTTP {status}: {body[:200]}")\n        self.status = status\n\n\n@dataclass(frozen=True, slots=True)\nclass ProbeResult:\n    status: int\n    elapsed_ms: float\n    request_id: str | None\n    body_preview: str\n\n\ndef probe(config: ProbeConfig) -> ProbeResult:\n    timeout = httpx.Timeout(\n        connect=config.connect_timeout,\n        read=config.read_timeout,\n        write=config.read_timeout,\n        pool=config.connect_timeout,\n    )\n    started = time.perf_counter()\n    try:\n        with httpx.Client(timeout=timeout, headers=config.headers) as client:\n            resp = client.get(config.url)\n            resp.raise_for_status()\n    except httpx.TimeoutException as exc:\n        raise NetworkError(f"请求超时: {config.url}") from exc\n    except httpx.RequestError as exc:\n        raise NetworkError(f"网络错误: {exc!r}") from exc\n    except httpx.HTTPStatusError as exc:\n        raise StatusError(exc.response.status_code, exc.response.text) from exc\n\n    elapsed_ms = (time.perf_counter() - started) * 1000\n    return ProbeResult(\n        status=resp.status_code,\n        elapsed_ms=round(elapsed_ms, 1),\n        request_id=resp.headers.get("x-request-id") or resp.headers.get("x-ds-trace-id"),\n        body_preview=resp.text[:200],\n    )\n```',
      ]),
      s('7.4 cli.py 与 __main__.py：参数、退出码、入口', [
        '```python\n# src/hello_world/cli.py\nimport argparse\nimport json\nimport sys\nfrom dataclasses import asdict\n\nfrom hello_world.config import ProbeConfig\nfrom hello_world.http_probe import ProbeError, probe\n\n\ndef main(argv: list[str] | None = None) -> int:\n    parser = argparse.ArgumentParser(prog="hello-world", description="HTTP 探测工具")\n    parser.add_argument("url", help="要请求的 URL")\n    parser.add_argument("--connect-timeout", type=float, default=5.0)\n    parser.add_argument("--read-timeout", type=float, default=10.0)\n    parser.add_argument("--header", action="append", default=[], metavar="K:V")\n    args = parser.parse_args(argv)\n\n    headers: dict[str, str] = {}\n    for raw in args.header:\n        key, sep, value = raw.partition(":")\n        if not sep:\n            parser.error(f"--header 需要 K:V 格式，收到: {raw}")\n        headers[key.strip()] = value.strip()\n\n    config = ProbeConfig(\n        url=args.url,\n        connect_timeout=args.connect_timeout,\n        read_timeout=args.read_timeout,\n        headers=headers,\n    )\n    try:\n        result = probe(config)\n    except ProbeError as exc:\n        print(f"[error] {exc}", file=sys.stderr)\n        return 1\n\n    print(json.dumps(asdict(result), ensure_ascii=False, indent=2))\n    return 0\n```',
        '```python\n# src/hello_world/__main__.py\nfrom hello_world.cli import main\n\nif __name__ == "__main__":\n    raise SystemExit(main())\n```',
        '`cli.py` 的 guard 看似多余（它主要被 import），但保留它能让你在调试时直接 `uv run python -m hello_world.cli ...`。`__main__.py` 里的 guard 同理，习惯成自然。',
      ]),
      s('7.5 运行与验证', [
        '```bash\ncd projects/hello-world\nuv add httpx\n\n# 正常路径\nuv run python -m hello_world https://httpbin.org/get\n\n# 错误路径：没有 key 会返回 401，应走 StatusError，退出码为 1\nuv run python -m hello_world https://api.deepseek.com/models\necho $?    # PowerShell 用 $LASTEXITCODE\n\n# 走 [project.scripts] 注册的命令，和 -m 等价\nuv run hello-world https://httpbin.org/get\n```',
        '正常输出形如 `{"status": 200, "elapsed_ms": 183.4, "request_id": null, "body_preview": "..."}`。如果 httpbin 较慢，加 `--read-timeout 30`；国内网络访问 GitHub API 不稳定，优先用 httpbin 和 DeepSeek 的 401 做验证。',
      ]),

      s('八、常见坑速查', [
        '| 症状 | 原因 | 修法 |\n| --- | --- | --- |\n| `ModuleNotFoundError: hello_world` | 没 sync / 不在项目根 / 用了系统 python | `uv sync`，再用 `uv run python -c "import hello_world; print(hello_world.__file__)"` 确认 |\n| 改了 `pyproject.toml` 但 import 不到新包 | 只改声明没落地 | 跑 `uv sync`，或直接用 `uv add` |\n| `attempted relative import ...` | 直接运行了包内文件 | 改用 `python -m` |\n| 4xx/5xx 没有抛异常 | 忘了 `raise_for_status()` | 显式调用或判断状态码 |\n| 超时设置不生效 | 把 read 当成总时长 | read 是「无新数据的最大间隔」；总时长需自己计时 |\n| 重定向返回 301 | httpx 默认不跟随 | `follow_redirects=True` |\n| `resp.json()` 抛 `JSONDecodeError` | 返回的是 HTML 错误页 | 先看 `status_code` 和 `content-type` |\n| dataclass 可变默认值报错 | 直接写了 `{}` / `[]` | 用 `field(default_factory=dict)` |\n| 测试一 import 就跑了主逻辑 | 缺 `__name__ == "__main__"` guard | 加 guard，主逻辑收进函数 |\n| CI 里锁文件被偷偷改了 | 用了普通 `uv sync` | 改用 `uv sync --locked` |',
      ]),
    ],
    resources: [
      r('httpx · Quickstart', 'https://www.python-httpx.org/quickstart/', '只在需要更多 API 细节时查，正文已覆盖今天用到的部分'),
      r('httpx · Timeouts', 'https://www.python-httpx.org/advanced/timeouts/', '想确认四类超时的精确定义时看'),
      r('uv · Managing projects', 'https://docs.astral.sh/uv/guides/projects/', '对照 Maven 查命令'),
      r('Python 教程 · 错误与异常', 'https://docs.python.org/zh-cn/3/tutorial/errors.html', '需要补语法细节时看'),
      r('Python typing 文档', 'https://docs.python.org/zh-cn/3/library/typing.html', '用到再查，不要背'),
    ],
    practice: [
      '在 `projects/hello-world` 里执行 `uv add httpx`，确认 `pyproject.toml` 和 `uv.lock` 同时变化。',
      '按实战章节建立 `config.py`、`http_probe.py`、`cli.py`、`__main__.py`，把 `[project.scripts]` 指向 `hello_world.cli:main`。',
      '跑通正常路径：`uv run python -m hello_world https://httpbin.org/get`，能打印状态码、耗时和响应预览。',
      '跑通错误路径：请求 `https://api.deepseek.com/models`（不带 key），确认返回 401、打印错误、退出码为 1。',
      '删除 `.venv` 后执行 `uv sync`，重新跑一次工具；再用 `git status` 确认 `.venv` 没有出现在待提交列表里。',
      '运行 `uv run mypy src`，把报错修到零（不要求给局部变量加注解）。',
    ],
    selfCheck: [
      '`pyproject.toml`、`uv.lock`、`.venv` 各自负责什么？分别对应 Maven 生态里的什么？',
      '为什么 lock 文件要提交、`.venv` 不提交？同事 clone 后只需执行哪条命令？',
      '`python -m hello_world` 和 `python src/hello_world/__main__.py` 在 `sys.path`、包初始化、相对导入上有什么差别？',
      '模块顶层写 `print(...)`，被 import 两次会打印几次？为什么？',
      '`if __name__ == "__main__":` 到底防的是什么？不写会出什么具体问题？',
      '`except Exception` 为什么危险？什么位置可以接受它？`raise ... from exc` 解决了什么？',
      '`httpx` 的 read timeout 是请求总时长吗？LLM 场景该怎么设？',
      '默认情况下 httpx 遇到 4xx/5xx 会抛异常吗？怎么让它抛？',
      '哪些 HTTP 错误可重试、哪些绝不能重试？重试必须带哪三个要素？',
      'dataclass 的可变默认值为什么必须用 `field(default_factory=...)`？',
      'asyncio 适合 CPU 密集任务吗？为什么？',
    ],
  },

  'w1d4': {
    goal: '把 token、上下文、温度、幻觉这些天天被提到的词，变成能算账、能调参、能面试的工程概念。今天结束时的验收物：一张参数速查表、一笔算得清的成本账、能脱稿说清 temperature 与 top_p 的区别。',
    sections: [
      s('今日大纲：2 小时怎么用', [
        '今天不写复杂代码，重点是建立「看得懂账单、说得清参数」的模型观。下面每节都自带完整说明和算例，不需要再翻文档；颜色块是面试时真正要能复述的内容。',
      ], [
        '0:00–0:15 模型观：LLM 是下一 token 预测器，一次请求长什么样。',
        '0:15–0:35 token：分词、估算、usage、计费公式，算一笔 1000 次调用的账。',
        '0:35–0:50 上下文窗口 vs 最大输出：预算公式、超窗策略、长上下文的代价。',
        '0:50–1:10 采样参数：temperature、top_p、top_k、惩罚项、stop、seed。',
        '1:10–1:25 输出控制：max_tokens、JSON mode、工具调用、思考模式。',
        '1:25–1:40 延迟与流式：TTFT、tokens/s、SSE。',
        '1:40–1:50 幻觉：三个来源、缓解手段与边界。',
        '1:50–2:00 参数速查表 + 面试自测。',
      ]),
      s('颜色约定', [
        '全篇用四种颜色标记面试相关内容，看到颜色就按对应标准要求自己：',
        '::: info 图例\n- 🔴 红（danger）：面试必背的定义、公式、数字，要能脱稿复述。\n- 🟠 橙（warning）：面试常问的追问和易错点，要能举例说明。\n- 🔵 蓝（info）：对比题、开放题的回答框架，要能分点作答。\n- 🟢 绿（tip）：能拉开差距的工程实践，回答时主动说出来。\n:::',
      ]),

      s('一、先建立模型观：LLM 是下一 token 预测器', [
        '调用一次 chat 接口，模型做的事情只有一件：根据你已经给出的全部 token，计算下一个 token 的概率分布，采样一个，追加到序列末尾，再重复，直到遇到停止条件。所谓「生成」，就是一个 token 一个 token 往外蹦。',
        '这个模型观能推出后面所有工程约束：为什么按 token 计费、为什么上下文有上限、为什么同一个问题答案会变、为什么调用之间没有记忆。',
      ]),
      s('1.1 一次请求长什么样', [
        'OpenAI 兼容协议里，请求的核心是 `messages` 数组。`system` 定角色和规则，`user` 是本次输入，`assistant` 是历史回复（多轮时由客户端回填）。',
        '```json\n{\n  "model": "deepseek-flash",\n  "messages": [\n    {"role": "system", "content": "你是严谨的技术助教。"},\n    {"role": "user", "content": "用一句话解释 token。"}\n  ],\n  "temperature": 0.2,\n  "max_tokens": 200,\n  "stream": false\n}\n```',
        '响应里最值得看的不是正文，而是三个字段：`choices[0].message.content`（正文）、`choices[0].finish_reason`（为什么停）、`usage`（花了多少 token）。',
        '```json\n{\n  "choices": [{\n    "message": {"role": "assistant", "content": "token 是模型处理文本的最小单位。"},\n    "finish_reason": "stop"\n  }],\n  "usage": {\n    "prompt_tokens": 28,\n    "completion_tokens": 16,\n    "total_tokens": 44\n  }\n}\n```',
        '`finish_reason` 的常见取值：',
        '| 值 | 含义 | 你要做什么 |\n| --- | --- | --- |\n| `stop` | 正常结束 | 直接使用结果 |\n| `length` | 达到 `max_tokens` 被截断 | 输出不完整，考虑调大上限或让模型分段输出 |\n| `tool_calls` | 模型请求调用工具 | 执行工具，把结果回填后继续 |\n| `content_filter` | 被安全策略拦截 | 换问法或走人工 |',
      ]),
      s('1.2 三个必须记住的推论', [
        '这三条是后面所有讨论的地基，也是面试里区分「用过 API」和「理解模型」的地方。',
        '::: danger 🔴 面试必背：LLM 的三个工程推论\n- 无状态：两次 API 调用之间模型不记得任何东西；多轮对话靠客户端每次把历史消息重发。\n- 知识有截止日期：训练数据之后的事情它不知道，除非你放进上下文。\n- 输出是采样结果：同一个问题不保证同一个答案；temperature 控制的是随机性，不是「智能程度」。\n:::',
      ]),

      s('二、token：计价、上下文和延迟的共同单位', [
        'token 是模型处理文本的最小单位。它不是字，也不是词，而是分词器（tokenizer）按训练时学到的规则切出来的片段。英文单词可能被切成多个 token，中文一个字也可能对应一个或多个 token，空格和标点同样计入。',
      ]),
      s('2.1 怎么估算 token', [
        'DeepSeek 官方给出的粗略换算：**1 个英文字符 ≈ 0.3 token，1 个中文字符 ≈ 0.6 token**。据此可以快速心算：',
        '| 输入 | 粗算 token | 说明 |\n| --- | --- | --- |\n| 1000 个中文字符 | ≈ 600 | 中文文章、聊天 |\n| 1000 个英文字符 | ≈ 300 | 英文文档 |\n| 1000 行代码 | 往往更多 | 符号、缩进、变量名切得碎 |',
        '这只是估算。不同模型的分词器不同，同一段文本的 token 数可能差很多；真实账单永远以响应里的 `usage` 为准。',
      ]),
      s('2.2 usage 与计费公式', [
        '```json\n"usage": {\n  "prompt_tokens": 2000,\n  "completion_tokens": 500,\n  "total_tokens": 2500,\n  "prompt_cache_hit_tokens": 1500,\n  "prompt_cache_miss_tokens": 500\n}\n```',
        '`prompt_tokens` 是输入，`completion_tokens` 是输出。开启思考模式后，reasoning token 也计入输出（以厂商账单为准）。DeepSeek 还会给出缓存命中和未命中的 token 数，因为两者单价不同。',
        '计费公式：`cost = 输入 token / 1,000,000 × 输入单价 + 输出 token / 1,000,000 × 输出单价`。缓存命中的输入 token 按更低的命中价计算。',
        '::: danger 🔴 面试必背：token 与计费\n- token 是分词器切出来的最小单位，不是字、不是词；中文与英文的换算比例不同。\n- 输入（prompt_tokens）和输出（completion_tokens）分开计价，输出通常更贵。\n- 费用 = 输入 token × 输入单价 + 输出 token × 输出单价；缓存命中价通常低一个数量级。\n- 永远以响应里的 usage 为准，不要用字数估算做账单。\n:::',
      ]),
      s('2.3 DeepSeek 价格与时段（2026-11）', [
        '下面数字来自官方定价页，单位是「元 / 百万 token」，格式为「空闲 / 高峰」。调价频繁，动手前以官方页面为准。',
        '| 模型 | 上下文 | 最大输出 | 输入（缓存未命中） | 输入（缓存命中） | 输出 |\n| --- | --- | --- | --- | --- | --- |\n| `deepseek-flash` | 1M | 384K | 1 / 2 元 | 0.02 / 0.04 元 | 4 / 8 元 |\n| `deepseek-v4-pro` | 1M | 384K | 4.5 / 9 元 | 0.15 / 0.30 元 | 13.5 / 27 元 |',
        '高峰时段是北京时间周一到周五（不含法定节假日）09:00–12:00、14:00–18:00；其余时间为空闲时段，价格是高峰的一半。批量评测、离线任务放到晚上或周末，成本直接减半。',
        '缓存命中要求前缀完全一致，且由服务端自动判断。把稳定的 system prompt、few-shot 示例、知识库固定头部放在消息最前面，后面的可变内容不影响前缀缓存。',
      ]),
      s('2.4 算一笔账', [
        '假设 1000 次调用，每次输入 2000 token、输出 500 token，全部缓存未命中，使用 `deepseek-flash` 空闲时段：',
        '```\n输入：1000 × 2000 = 2,000,000 token = 2M\n      2M × 1 元/M = 2 元\n输出：1000 × 500 = 500,000 token = 0.5M\n      0.5M × 4 元/M = 2 元\n合计：4 元（高峰时段 8 元）\n```',
        '如果其中 1500 token 是固定 system prompt 且命中缓存：',
        '```\n缓存命中输入：1.5M × 0.02 元/M = 0.03 元\n缓存未命中输入：0.5M × 1 元/M = 0.5 元\n输出：0.5M × 4 元/M = 2 元\n合计：2.53 元，比 4 元省约 37%\n```',
        '这就是为什么工程上要「稳定内容放前面、可变内容放后面」：不是为了好看，是直接省钱。',
      ]),
      s('2.5 为什么同一个问题费用差很多', [
        '::: info 🔵 面试对比：为什么同一个问题，两次调用费用差很多？\n- 输出长度不同：最常见，多写 500 token 就是多 500 token 的钱。\n- 多轮对话把历史全带上，输入随轮次线性增长。\n- 思考模式产生 reasoning token，按输出计费。\n- 缓存命中 / 未命中、高峰 / 低谷的单价不同。\n- 模型不同、重试次数不同、分词器不同。\n:::',
      ]),

      s('三、上下文窗口 ≠ 最大输出', [
        '这两个概念经常被混为一谈，但它们在预算里扮演不同角色。',
      ]),
      s('3.1 两个预算', [
        '上下文窗口是本次请求「输入 + 输出」共享的总预算；最大输出是单次生成的上限。以 `deepseek-flash` 为例：窗口 1M，最大输出 384K。你可以输入 900K、输出最多 100K，也可以输入 700K、输出 300K，但两者之和不能超过窗口。',
        '`max_tokens` 只是「最多生成多少」，不是预留。设成 1000 不会提前扣 1000 token 的钱；设得太小，输出会被截断，`finish_reason` 变成 `length`。',
        '::: danger 🔴 面试必背：上下文窗口 ≠ 最大输出\n- 上下文窗口 = 本次请求的输入 + 输出共享的总预算。\n- max_tokens 只是输出上限，不是预留；设大了不会多收费，设小了会被截断（finish_reason=length）。\n- 超窗口必须截断、摘要或检索，不能硬塞。\n:::',
      ]),
      s('3.2 超窗了怎么办', [
        '按代价从低到高：',
        '| 策略 | 做法 | 适用 | 代价 |\n| --- | --- | --- | --- |\n| 滑窗 | 只保留最近 N 轮 | 闲聊、连续对话 | 丢失早期信息 |\n| 摘要 | 把早期对话压成摘要 | 长会话 | 多一次模型调用 |\n| 检索 | RAG 只取相关片段 | 知识库问答 | 需要索引和召回质量 |\n| 分块 | 把长文档拆成多次调用 | 长文分析 | 需要合并结果 |',
        '不要用「硬塞 + 祈祷」的方式处理超窗：既贵又慢，关键信息还可能被模型忽略。',
      ]),
      s('3.3 长上下文的三个代价', [
        '第一是钱：输入 token 按量计费，塞满 1M 就是实打实的成本。第二是延迟：prefill 阶段要处理全部输入，上下文越长，首 token 越慢。第三是注意力：模型对长上下文中间部分的信息召回通常弱于开头和结尾（常说的 lost in the middle），所以关键指令和证据要放在显眼位置。',
      ]),
      s('3.4 1M 上下文还需要 RAG 吗', [
        '::: info 🔵 面试对比：上下文已经 1M，还需要 RAG 吗？\n需要，四个理由：\n- 成本与延迟：每次塞满都按输入 token 付费，长上下文 prefill 更慢。\n- 知识更新：RAG 改索引即可，不用改 prompt、不用重训。\n- 权限隔离：检索层可以按用户过滤，塞上下文做不到细粒度授权。\n- 可引用：返回片段和来源，才能做溯源和评测。\n:::',
      ]),

      s('四、采样参数：temperature、top_p、top_k', [
        '模型每生成一个 token，都会先得到一个覆盖整个词表的分数（logits），再经过 softmax 变成概率分布，最后从这个分布里采样。采样参数改的就是「怎么从分布里选」。',
      ]),
      s('4.1 从 logits 到采样', [
        '```\nlogits z  →  除以 T  →  softmax  →  概率分布 p  →  截断（top_p / top_k）  →  归一化  →  采样\n```',
        'temperature 作用在 softmax 之前，改变分布的「尖锐程度」；top_p 和 top_k 作用在 softmax 之后，直接砍掉尾部候选。三者不是同一层的东西，所以同时大改会很难判断效果来自哪里。',
      ]),
      s('4.2 temperature', [
        '公式是 `p_i = exp(z_i / T) / Σ exp(z_j / T)`。T 越小，大分数和小分数的差距被放大，分布更尖锐；T 越大，分布更平坦，低概率 token 也有机会被选中；T=0 在实际实现中等价于直接取概率最大的 token。',
        '面试里不要只说「temperature 控制创造性」，要说出它改的是概率分布的尖锐程度，以及 T=0 是贪心解码。',
        '::: danger 🔴 面试必背：temperature 与 top_p\n- temperature 缩放 logits：p_i ∝ exp(z_i / T)。T 小于 1 更尖锐（更确定），T 大于 1 更平坦（更发散），T=0 等价于取概率最大的 token。\n- top_p（核采样）按概率从高到低累加，只保留累计概率达到 p 的最小候选集合，再归一化采样；top_p=1 不截断。\n- 两者都在改「从概率分布里怎么选」，不要同时大改；temperature=0 时 top_p 基本不起作用。\n:::',
      ]),
      s('4.3 top_p 与 top_k', [
        'top_p（核采样）先按概率从高到低排序，累加到一个刚好达到 p 的最小集合，只在这个集合里采样。top_p=0.9 表示「只考虑累计概率 90% 的候选」，尾部 10% 直接丢弃。top_k 则是固定保留概率最高的 k 个候选，不管它们的累计概率是多少。',
        '::: info 🔵 面试对比：top_p 和 top_k 有什么区别？\n- top_k 固定保留概率最高的 k 个候选，候选数量固定。\n- top_p 保留累计概率达到 p 的最小集合，候选数量随分布变化：分布尖锐时少，平坦时多。\n- 实践里 top_p 更常用；不少 API 只暴露 temperature 和 top_p。\n:::',
      ]),
      s('4.4 怎么选值', [
        '通用经验：确定性任务（抽取、分类、代码、事实问答）用 0–0.3；通用对话 0.7 左右；创意写作 0.9–1.2。但这只是跨模型的粗略经验，不同厂商对 temperature 的校准不同，不能直接搬数字。',
        'DeepSeek 官方在 2026-11 给出的建议是：代码生成/数学解题 0.0，数据抽取/分析 1.0，通用对话 1.3，翻译 1.3，创意写作/诗歌 1.5。先按厂商建议起步，再用自己的评测集微调。',
        '::: warning 🟠 面试常问：temperature 到底设多少？\n- 通用经验：抽取、分类、代码、事实问答用 0–0.3；创意写作用 0.7–1.2。\n- DeepSeek 官方建议（2026-11）：代码/数学 0.0，数据抽取/分析 1.0，通用对话 1.3，翻译 1.3，创意写作 1.5。\n- 不同厂商的默认值和校准不同，数字不能跨模型直接搬；先按厂商建议，再用自己的评测集调。\n:::',
        '::: warning 🟠 面试追问：temperature=0 就每次都一样吗？\n不一定。GPU 浮点非确定性、动态批处理、并行归约、模型版本更新都会带来差异；seed 只能降低、不能消除。工程上按「不确定」设计：校验、重试、评测。\n:::',
      ]),
      s('4.5 其他采样与生成参数', [
        '| 参数 | 作用 | 常用值 | 坑 |\n| --- | --- | --- | --- |\n| `top_p` | 核采样，截断概率尾部 | 0.9–1.0 | 与 temperature 同时大改会互相掩盖效果 |\n| `top_k` | 固定保留前 k 个候选 | 视 API 支持 | 不是所有厂商都暴露 |\n| `presence_penalty` | 惩罚「已经出现过」的 token，鼓励新话题 | 0–0.5 | 太高会让内容跑题、逻辑断裂 |\n| `frequency_penalty` | 按出现次数惩罚，抑制重复 | 0–0.5 | 太高会破坏专有名词和代码 |\n| `stop` | 遇到指定字符串停止 | 按业务定 | 命中 stop 时 `finish_reason` 仍是 `stop`，但内容被截断 |\n| `seed` | 尽量复现采样 | 固定整数 | 只能降低随机性，不能保证完全一致 |',
        '惩罚项的默认值通常是 0；只有出现明显重复或需要强制换话题时才调。多数业务只调 temperature、max_tokens，必要时加 stop。',
      ]),

      s('五、输出控制：max_tokens、结构化输出、思考模式', [
        '采样参数决定「怎么选 token」，输出控制决定「生成多少、生成什么形状」。',
      ]),
      s('5.1 max_tokens 与 finish_reason', [
        '`max_tokens` 是单次生成的硬上限。判断输出是否完整，不要看字数，要看 `finish_reason`：`stop` 才是正常结束，`length` 说明被截断。截断的 JSON 一定解析失败，截断的代码也不可执行。',
        '不同厂商字段名可能不同（例如 `max_completion_tokens`），以对应 API 文档为准；逻辑是一样的。',
      ]),
      s('5.2 JSON mode 与校验重试', [
        'JSON mode 的服务端约束只保证「输出是合法 JSON」，不保证字段名、类型、枚举值和业务约束。生产流程必须是：拿到文本 → 用 pydantic/JSON Schema 校验 → 失败时把校验错误回填给模型重试 → 仍失败则降级或人工兜底。',
        'DeepSeek 的 JSON 输出还有两个坑：prompt（system 或 user）里必须出现 JSON 字样并给出目标格式样例；`max_tokens` 太小导致截断时，`finish_reason` 可能仍是 `stop`，但 content 会被清洗成空格，看起来像空回复。所以既要给足输出上限，也要对空 content 做兜底重试。',
        '::: warning 🟠 面试常问：JSON mode 能保证字段正确吗？\n不能。json_object 只保证「是合法 JSON」，不保证字段名、类型和业务约束。生产做法是 schema 校验 → 把错误信息回填给模型重试 → 仍失败则降级或人工兜底。结构化输出是「校验 + 重试」，不是「让模型别出错」。\n:::',
      ]),
      s('5.3 工具调用', [
        '工具调用（function calling）是把「模型输出结构化意图」做到协议层：请求里带 `tools` 的 schema，模型返回 `tool_calls`（函数名 + 参数），你的代码执行函数，再把结果作为工具消息回填，模型继续生成。',
        '这条链路是 W2 Agent 的基础。今天只要理解两点：模型只负责「决定调哪个工具、传什么参数」，真正执行和权限校验在代码里；工具返回的结果会成为下一轮上下文的一部分，也会计入 token。',
      ]),
      s('5.4 思考模式', [
        'DeepSeek 的思考模式默认开启。开启后模型会先产生一段 reasoning 内容，再给最终答案；reasoning token 按输出计费，延迟也更高。简单任务（分类、抽取、翻译、格式转换）可以关掉，省钱且更快；复杂推理、数学、多步任务再打开。',
        '```python\nextra_body={"thinking": {"type": "disabled"}}\n# 需要深度推理时：\nextra_body={"thinking": {"type": "enabled"}, "reasoning_effort": "high"}\n```',
        '面试里可以把它和成本控制联系起来：同一件事，开着思考可能贵几倍，关掉思考又可能答不对；按任务难度分层，是比「一律用最强模型」更专业的回答。',
      ]),

      s('六、延迟与流式', [
        '用户感知的「快慢」和账单上的「总时长」不是一回事。把延迟拆开，才知道该优化哪里。',
      ]),
      s('6.1 延迟由什么组成', [
        '一次调用大致由四段组成：排队与网络、prefill（处理输入，生成首 token）、decode（逐个生成输出 token）、以及客户端处理。常用两个指标：',
        '- TTFT（Time To First Token）：从发请求到收到第一个 token 的时间，主要受输入长度和排队影响。',
        '- 输出速度（tokens/s）：decode 阶段的生成速度，决定长回答的总时长。',
        '近似公式：`总时长 ≈ TTFT + 输出 token 数 / 输出速度`。所以要降低「长回答」的等待，优先减少输出长度；要降低「首屏」等待，优先缩短输入、避免排队。',
      ]),
      s('6.2 流式输出', [
        '流式用 SSE（Server-Sent Events）把增量 chunk 持续推给客户端，客户端边收边渲染。它不减少总生成时间，但把「等待完整答案」变成「很快看到开头」，感知延迟大幅下降。',
        '实现上要处理：SSE 的半包/粘包、`[DONE]` 结束标记、断流重连、代理层缓冲，以及分别记录 TTFT 和总耗时。结构化输出场景通常不适合流式，因为你必须等完整 JSON 才能校验。',
        '::: tip 🟢 面试加分：流式为什么「感觉快」，但并没有更便宜？\n- 首 token 时间（TTFT）远小于完整生成时间，用户先看到内容，感知延迟低。\n- 总 token 数和计费完全不变，流式只改变传输方式。\n- 工程上要处理 SSE 半包/粘包、断流重连、代理缓冲，并分别记录 TTFT 和总耗时。\n:::',
      ]),

      s('七、幻觉：来源、缓解与边界', [
        '幻觉是模型生成流畅、自信，但事实错误或无法验证的内容。它不是「模型撒谎」，而是下一 token 预测机制在知识不足时仍然继续生成最像答案的文本。',
      ]),
      s('7.1 三个来源', [
        '| 来源 | 表现 | 对策 |\n| --- | --- | --- |\n| 知识缺失 | 不知道却编一个 | RAG 提供证据、要求引用原文 |\n| 知识过时/训练偏差 | 用旧事实回答新问题 | 检索 + 时效性说明、标注数据日期 |\n| 任务超出能力 | 多步推理、精确计算出错 | 拆解任务、给计算器/代码执行工具 |',
        '::: danger 🔴 面试必背：幻觉的三个来源与对策\n- 知识缺失 → RAG 提供证据，要求引用原文片段。\n- 知识过时或训练偏差 → 检索 + 时效性说明。\n- 任务超出能力（多步推理、精确计算）→ 拆解、给工具（计算器/代码执行）、允许说「不知道」。\n降低 temperature 只能减少随机性，不能补知识；RAG 能降低但不能消除幻觉，最终要靠评测和人工兜底。\n:::',
      ]),
      s('7.2 缓解手段与边界', [
        '有效的组合通常是：检索到证据 → prompt 要求「只根据给定资料回答，并给出引用」→ 输出结构化答案（答案 + 引用片段）→ 程序校验引用是否存在 → 低置信度时转人工。',
        '注意两个边界：第一，「不要幻觉」这种指令几乎没有约束力；第二，RAG 只能降低幻觉，不能消除，检索错、片段冲突、模型误读都会造成新的错误。',
      ]),
      s('7.3 怎么评测', [
        '准备一个小型评测集（20–50 条），每条包含问题、标准答案或评分要点。指标至少看三个：正确率、引用命中率（回答里的引用是否真的支持结论）、拒答率（该说「不知道」时有没有说）。每次改 prompt 或换模型都跑一遍，避免「感觉变好了」。',
        '更细的评测可以用 LLM-as-judge，但 judge 本身也会错，关键业务仍要人工抽检。',
      ]),

      s('八、参数速查表（今天的交付物）', [
        '下面这张表建议自己手抄一遍，或者整理成 `projects/w1/params.md`。面试前只看这张表。',
        '| 参数 | 作用 | 建议 | 常见坑 |\n| --- | --- | --- | --- |\n| `model` | 选模型 | 简单任务 flash，难任务 pro | 不看任务一律用最贵模型 |\n| `messages` | 上下文与角色 | system 放稳定规则，user 放变量 | 多轮忘记回填 assistant 历史 |\n| `temperature` | 分布尖锐程度 | 确定性 0–0.3；创意 0.9+ | 与 top_p 同时大改 |\n| `top_p` | 核采样截断 | 0.9–1.0 | 以为它能替代 temperature |\n| `max_tokens` | 输出上限 | 按业务给足，不设太小 | 被截断后解析失败 |\n| `stop` | 停止序列 | 只在不希望出现特定内容时用 | 误伤正文 |\n| `presence_penalty` | 鼓励新话题 | 0–0.5 | 太高跑题 |\n| `frequency_penalty` | 抑制重复 | 0–0.5 | 太高破坏术语 |\n| `seed` | 尽量复现 | 固定整数 | 以为能 100% 一致 |\n| `stream` | 流式输出 | 聊天 UI 开，批处理关 | 结构化输出不等完整 JSON |\n| `response_format` | JSON 模式 | 配合 schema 校验 | 以为保证字段正确 |\n| `thinking` | 思考模式 | 简单任务关，复杂任务开 | 忽略 reasoning token 成本 |\n| `timeout` | 客户端超时 | connect 5s，read 60–120s | 不设超时 |',
      ]),
      s('8.1 五条使用原则', [
        '1. 一次只改一个参数，并且用固定评测集对比；同时改三个参数，你无法判断收益来自哪里。',
        '2. 先定任务类型，再定 temperature；不要从默认值开始盲调。',
        '3. 输出长度是最容易被忽视的成本项：能 200 token 说清的事，不要让它写 1000。',
        '4. 稳定前缀放前面吃缓存，可变内容放后面；这是零成本的优化。',
        '5. 所有调用记录 model、参数、usage、TTFT、总耗时、finish_reason；没有这些数据，优化只能靠猜。',
      ]),

      s('九、常见误区速查', [
        '| 误区 | 事实 |\n| --- | --- |\n| token 就是字数 | token 由分词器决定，中文、英文、代码的比例都不同 |\n| temperature=0 完全确定 | 浮点、批处理、版本更新都会带来差异 |\n| temperature 和 top_p 一起调更好 | 两者作用在同一环节，同时改会互相掩盖 |\n| max_tokens 设大更贵 | 它只是上限，不预留、不预付 |\n| 流式输出更便宜 | 计费按 token，流式只改传输方式 |\n| JSON mode 保证字段正确 | 只保证合法 JSON，业务约束仍要校验 |\n| 上下文塞得越满效果越好 | 又贵又慢，关键信息还可能被淹没 |\n| RAG 能消除幻觉 | 只能降低，检索和生成都可能出错 |\n| 输入和输出同价 | 输出通常更贵，且思考 token 按输出计费 |\n| 1M 上下文就不需要 RAG | 成本、延迟、更新、权限、引用都仍然需要 |',
      ]),
      s('面试收尾：30 秒回答模板', [
        '::: tip 🟢 面试收尾：30 秒回答模板\n「LLM 是无状态的下一 token 预测器。工程上我用 token 估成本和上下文预算，用 temperature/top_p 控制采样，用 max_tokens 和 finish_reason 控制输出，用流式降低感知延迟，用 RAG 补知识，用 schema 校验和重试保证结构化输出。所有调用都记录 token、费用、TTFT 和 request id。」\n:::',
      ]),
    ],
    resources: [
      r('DeepSeek · Models & Pricing', 'https://api-docs.deepseek.com/quick_start/pricing', '正文已用 2026-11 价格；调价后以此页为准'),
      r('DeepSeek · Token 用量计算', 'https://api-docs.deepseek.com/quick_start/token_usage', '官方换算比例与离线 tokenizer'),
      r('DeepSeek · 模型参数建议', 'https://api-docs.deepseek.com/quick_start/parameter_settings', '按任务查官方 temperature 建议'),
      r('DeepSeek API 文档', 'https://api-docs.deepseek.com/', '查 JSON 输出、思考模式、工具调用细节'),
      r('OpenAI · Prompt engineering', 'https://platform.openai.com/docs/guides/prompt-engineering', '参数与提示词的关系，按需看'),
    ],
    practice: [
      '做一张参数速查表，覆盖 model、messages、temperature、top_p、max_tokens、stop、stream、response_format、thinking、timeout，并写出每个参数的一个坑。',
      '同一道题用 temperature 0 / 0.7 / 1.3 各跑一次（有 key 就写脚本，没有就用平台 Playground），记录输出差异和 usage；说不清差异就继续加次数。',
      '算一笔账：1000 次调用、每次输入 2000 token、输出 500 token，分别算 flash 空闲、flash 高峰、pro 空闲；再算 1500 token 缓存命中后的节省。',
      '把「temperature 与 top_p 的区别」和「为什么同一个问题费用差很多」各写一段 100 字以内的口述稿，录音回听一遍。',
      '找一个你熟悉的业务场景，写出它的模型、温度、max_tokens、是否流式、是否需要 JSON，并说明理由。',
    ],
    selfCheck: [
      '不看资料，解释 token 是什么，并估算 1000 个中文字符大约多少 token。',
      '输入价和输出价为什么不同？缓存命中价为什么能低一个数量级？',
      '上下文窗口和最大输出分别是什么？max_tokens 设小了会发生什么？',
      'temperature 做了什么运算？T=0 时模型如何选 token？',
      'top_p 和 top_k 的区别是什么？为什么一般不同时大改 temperature 和 top_p？',
      'temperature=0 能保证完全可复现吗？为什么？',
      '同一个问题两次调用费用差很多，列出至少四个原因。',
      'finish_reason=length 说明什么？应该怎么处理？',
      'JSON mode 保证了什么、没保证什么？生产上还要做什么？',
      '思考模式对成本、延迟、效果分别有什么影响？什么时候关掉？',
      '幻觉的三个来源各对应什么缓解手段？为什么说 RAG 不能消除幻觉？',
      '为什么上下文已经 1M，仍然需要 RAG？至少说出四个理由。',
    ],
  },

  'w1d5': {
    goal: '跑通第一次真实 API 调用：单轮、多轮、流式，并开始记录成本。',
    sections: [
      s('OpenAI 兼容协议', [
        '请求核心是 messages 数组：system 定角色和规则，user 是输入，assistant 是历史回复。',
        '各家 base_url 不同；DeepSeek 用 https://api.deepseek.com，不要加 /v1。模型名以官方文档为准。',
      ]),
      s('多轮对话的本质', [
        '模型本身不记得上一轮；是客户端把历史消息每次重新发过去。所以上下文会越来越长，成本和延迟都会涨。',
        '后面做 CLI 助手时，要用滑动窗口或摘要来控制历史长度。',
      ]),
      s('流式输出', [
        '服务端用 SSE 持续推送增量 chunk，客户端边收边渲染。首 token 延迟远小于完整生成时间，所以感知快很多。',
        '要处理半包/粘包、断流、以及代理层缓冲；日志里区分首 token 时间和总时长。',
      ]),
      s('成本核算', [
        '每次调用记录 prompt_tokens、completion_tokens、总费用、耗时。',
        '算一遍「1000 次问答要多少钱」，后面做 RAG/Agent 时才知道优化空间在哪。',
      ]),
    ],
    resources: [
      r('DeepSeek API 文档', 'https://api-docs.deepseek.com/', '看 chat completions 与流式示例'),
      r('OpenAI · Chat Completions', 'https://platform.openai.com/docs/api-reference/chat', '协议字段参考'),
      r('MDN · Server-sent events', 'https://developer.mozilla.org/zh-CN/docs/Web/API/Server-sent_events', 'SSE 基础'),
    ],
    practice: [
      '写 chat.py：支持单轮、多轮、流式输出。',
      '每次调用打印 token 用量与估算费用。',
      '把 API Key 放进环境变量，确认代码和 Git 历史里都没有明文 key。',
    ],
    selfCheck: [
      '多轮对话的历史存在哪里？为什么不能只发最后一句？',
      '流式输出为什么感知更快？它让错误处理变简单还是更复杂？',
      '你打算怎么防止 API Key 泄露？',
    ],
  },

  'w1d6': {
    goal: '把一次性脚本升级成可复用的 LLMClient：重试、超时、限流、结构化输出、单测。',
    sections: [
      s('重试不是「失败了再试一次」', [
        '只重试可重试错误：超时、429、5xx。参数错误、401、402 重试没有意义。',
        '指数退避 + 随机抖动（jitter），避免大量客户端同一时刻重试造成惊群；同时设最大重试次数和总预算。',
      ]),
      s('超时、限流与并发', [
        '连接超时和读超时要分开设；流式请求的读超时要按 chunk 重置。',
        '并发用信号量或令牌桶限制；按 token 预算限流比单纯 QPS 更贴近真实成本。',
      ]),
      s('结构化输出', [
        'response_format=json_object 只保证「是合法 JSON」，不保证字段对。',
        '生产做法：JSON mode + pydantic 校验 + 失败重试 + 修复提示词；仍失败就走兜底。',
      ]),
      s('可观测与单测', [
        '记录请求 id、模型与参数、prompt 版本、token、费用、耗时、重试次数。',
        'pytest 里 mock 掉网络层，覆盖重试、超时、坏 JSON、限流四类场景；单测不应该真的调 API。',
      ]),
    ],
    resources: [
      r('Tenacity 文档', 'https://tenacity.readthedocs.io/', '重试与退避的 Python 实现'),
      r('Pydantic 文档', 'https://docs.pydantic.dev/', '模型校验与错误信息'),
      r('OpenAI Cookbook · Structured outputs', 'https://cookbook.openai.com/', '结构化输出的常见做法'),
      r('pytest 文档', 'https://docs.pytest.org/', 'fixture 与 monkeypatch/mock'),
    ],
    practice: [
      '抽象 LLMClient：重试、超时、并发限流、结构化日志、用量统计、多模型切换。',
      '用 pydantic 做结构化输出校验，失败时自动重试一次并带修复提示。',
      '写 10 个 pytest，mock 网络层，覆盖重试、超时、坏 JSON。',
      '写一篇工程笔记：为什么「重试 + 校验 + 可观测」是 AI 应用的基本盘。',
    ],
    selfCheck: [
      '哪些错误应该重试，哪些不应该？为什么？',
      '结构化输出为什么不能只靠「让模型别出错」？',
      '你的单测怎么保证不真的花钱调 API？',
    ],
  },

  'w1d7': {
    goal: '把本周的零件装成一个可演示的 CLI 学习助手 v0.1，并完成第一次周复盘。',
    sections: [
      s('从零件到产品', [
        '本周你已经有了 LLMClient、多轮对话、流式和成本统计。助手只需要三个命令：explain（解释概念）、quiz（出题）、grade（判分）。',
        '先设计命令和输出格式，再写代码；不要边想边改界面。',
      ]),
      s('滑动窗口记忆', [
        '保留最近 N 轮对话 + 系统提示；超出时把更早的内容摘要成一段「之前聊过什么」。',
        '记忆不是越多越好：无关历史会稀释当前问题，还会增加成本。',
      ]),
      s('周复盘四问', [
        '计划 vs 实际：哪一天没完成，原因是估时不准还是被打断？',
        '最大卡点：Python、API、还是工具链？',
        '下周只改一件事：写具体动作，不要写「更努力」。',
        '本周最值钱的认知：一句话，能讲给别人听。',
      ]),
    ],
    resources: [
      r('argparse 文档', 'https://docs.python.org/zh-cn/3/library/argparse.html', 'CLI 参数解析'),
      r('Rich 文档', 'https://rich.readthedocs.io/', '可选：让终端输出更好看'),
      r('pytest 文档', 'https://docs.pytest.org/', '给助手加几个冒烟测试'),
    ],
    practice: [
      '实现 explain / quiz / grade 三个命令，支持多轮与流式。',
      '加成本看板：每次会话的 token、费用、耗时。',
      '写 README：安装、配置、命令示例、演示截图。',
      '完成周复盘四问，并做记忆卡周测。',
    ],
    selfCheck: [
      '你的助手和直接打开聊天窗口相比，多了什么价值？',
      '滑动窗口记忆会丢什么信息？什么时候该用摘要？',
      '下周要改的那一件事，具体到「周几做什么」了吗？',
    ],
  },

  // ───────────────────────── W2 ─────────────────────────
  'w2d1': {
    goal: '把 prompt 从「凭感觉写」变成有结构、可改写的工程件。',
    sections: [
      s('四要素', [
        '角色与目标：你是谁、要达成什么。输入与上下文：数据从哪来、哪些是事实。约束与边界：不能做什么、不确定怎么办。输出格式：结构、长度、字段。',
        '四要素缺一个，输出就会在某处漂移：没有角色会泛泛而谈，没有约束会编造，没有格式会无法解析。',
      ]),
      s('模糊 prompt 的问题', [
        '「帮我写个总结」的问题是：总结给谁看、多长、保留哪些信息、能不能推断，全都没说。',
        '结构化 prompt 不是堆形容词，而是把「成功的标准」写成模型能执行的约束。',
      ]),
      s('可评测化', [
        '每改一版 prompt，都要有一批固定输入和判定标准；否则你只是在这一个例子上碰巧变好。',
        '从今天开始建测试集，后面 RAG/Agent 的评测会直接复用这套方法。',
      ]),
    ],
    resources: [
      r('Prompt Engineering Guide', 'https://www.promptingguide.ai/zh', '看基础篇与结构化提示'),
      r('Anthropic · Prompt engineering', 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', '官方的最佳实践'),
    ],
    practice: [
      '找 5 个你写过的烂 prompt，逐个改写成四要素齐全的版本。',
      '每改一个，写清「改了什么、为什么、预期改善哪一点」。',
      '挑一个 prompt，配 3 条测试输入和判定标准。',
    ],
    selfCheck: [
      '四要素分别防止哪类失败？',
      '你怎么判断一版 prompt 比上一版更好？',
      '为什么「更长」不等于「更清楚」？',
    ],
  },

  'w2d2': {
    goal: '掌握 few-shot、CoT 和输出格式约束的适用边界，并建起第一版 prompt 测试集。',
    sections: [
      s('Few-shot 示例怎么选', [
        '覆盖边界情况，而不是只给简单样例；示例顺序和标签分布会带来偏差。',
        '示例要短、格式一致；能用规则约束的就别堆示例。',
      ]),
      s('CoT 什么时候有用', [
        '多步推理、数学、需要权衡的判断题有用；抽取、分类、格式转换这类单步任务反而增加延迟和 token，还可能编造步骤。',
        '推理模型可以省掉显式的「让我们一步步想」，但复杂任务仍需要你把步骤拆清楚。',
      ]),
      s('测试集与打分表', [
        '20 条覆盖典型场景 + 边界 + 失败案例；0–2 分打分表写清每档标准。',
        '先跑基线，再改 prompt；每次只改一个变量，记录变化。',
      ]),
    ],
    resources: [
      r('Prompt Engineering Guide · Few-shot', 'https://www.promptingguide.ai/techniques/fewshot', '示例选择与偏差'),
      r('Prompt Engineering Guide · CoT', 'https://www.promptingguide.ai/techniques/cot', '适用场景与代价'),
      r('OpenAI Cookbook', 'https://cookbook.openai.com/', '评测与提示词实践'),
    ],
    practice: [
      '建 prompt_testset.jsonl，20 条，含标准答案与打分标准。',
      '跑一遍基线，记录每条得分和失败类型。',
      '从失败最多的类型里挑一条，做一次单变量改写并复测。',
    ],
    selfCheck: [
      '示例顺序为什么会让模型照抄最后一个？',
      'CoT 在什么任务上是有害的？',
      '你的打分表能让别人复现你的评分吗？',
    ],
  },

  'w2d3': {
    goal: '理解 function calling 的协议本质，并为三个工具设计出让模型「不乱用」的 schema。',
    sections: [
      s('工具调用的完整流程', [
        '请求里带 tools（名称、描述、JSON Schema）；模型可能返回 tool_calls，而不是自然语言答案；客户端执行工具，把结果以 role=tool + tool_call_id 回填；再次请求，模型基于结果继续或给最终答案。',
        '循环直到没有 tool_calls。模型只负责「决定调什么」，执行和约束在你的代码里。',
      ]),
      s('Schema 就是给模型的 API 文档', [
        '类型、枚举、必填、默认值要写清楚；描述里写「什么时候用」和「什么时候不要用」。',
        '参数少而明确，能用枚举就不要用自由文本；返回结果要结构化、可截断。',
      ]),
      s('工具设计的原则', [
        '单一职责、语义清晰；错误信息要能被模型理解并纠正，而不是抛堆栈。',
        '工具描述本身就是一个 prompt 工程问题：写得好，模型选得准；写得糊，模型乱调。',
      ]),
    ],
    resources: [
      r('OpenAI · Function calling', 'https://platform.openai.com/docs/guides/function-calling', '协议与示例'),
      r('JSON Schema', 'https://json-schema.org/learn/getting-started-step-by-step', 'schema 写法'),
      r('Anthropic · Tool use', 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use', '另一种协议的对照'),
      r('DeepSeek · Function calling', 'https://api-docs.deepseek.com/', '确认兼容字段'),
    ],
    practice: [
      '设计 3 个工具的 schema：读本地文件、搜索、计算器。',
      '给每个工具写清「何时用 / 何时不用 / 参数约束」。',
      '写一段说明：为什么这么写描述，模型才不容易乱调。',
    ],
    selfCheck: [
      'tool_calls 和普通回答在响应里怎么区分？',
      '参数校验应该放在模型侧还是代码侧？为什么？',
      '工具描述里缺了「何时不用」会发生什么？',
    ],
  },

  'w2d4': {
    goal: '不依赖框架，手写一个能跑、能停、能回放的 ReAct 循环。',
    sections: [
      s('ReAct 的四个阶段', [
        'Thought（当前进展与下一步意图）→ Action（选工具与参数）→ Observation（工具返回）→ 回到 Thought。',
        '这不是「让模型自由发挥」：格式由 system prompt 约定，解析和终止由代码控制。',
      ]),
      s('终止条件与熔断', [
        '至少四道闸：模型给出最终答案、达到最大步数、连续相同动作/无进展、触发人工确认。',
        '没有熔断的 Agent 不是 Agent，是烧钱机。',
      ]),
      s('轨迹落盘', [
        '每一步的 thought / action / observation 存 JSONL；带 step、时间、token、耗时。',
        '轨迹比最终答案更值钱：它能告诉你「哪一步错了」，也是面试时最有说服力的素材。',
      ]),
    ],
    resources: [
      r('ReAct 论文', 'https://arxiv.org/abs/2210.03629', '读摘要与方法图即可'),
      r('Lilian Weng · LLM Powered Autonomous Agents', 'https://lilianweng.github.io/posts/2023-06-23-agent/', 'Planning / Memory / Tool 三部分'),
      r('Anthropic · Building effective agents', 'https://www.anthropic.com/engineering/building-effective-agents', '对照 workflow 与 agent'),
    ],
    practice: [
      '实现 agent_loop.py：system 约定格式、解析动作、执行工具、回填观察。',
      '加最大步数和「连续无进展」熔断。',
      '跑一个「查资料 → 计算 → 给结论」的三步任务，轨迹存 JSONL。',
    ],
    selfCheck: [
      'ReAct 循环有哪四个必须处理的失败点？',
      '你的循环靠什么停下来？如果模型一直说「还没完成」呢？',
      '轨迹里最该记录哪三个字段？',
    ],
  },

  'w2d5': {
    goal: '给 Agent 加上错误处理和安全边界，让它失败时也能安全退出。',
    sections: [
      s('工具错误分四层处理', [
        '可重试错误（超时、限流）自动重试；参数错误把错误原文回填，让模型修正；业务错误（无权限、数据不存在）返回明确原因和替代方案；连续失败触发熔断，降级为人工或返回部分结果。',
        '错误信息是给模型看的，不是给日志看的：要可读、可行动。',
      ]),
      s('安全边界', [
        '限制可访问目录、限制单次执行时长、限制可调用命令；危险操作（写库、删除、付款、对外发送）必须人工确认。',
        '日志脱敏：不要把 key、身份证、手机号写进轨迹。',
      ]),
      s('提示注入', [
        '被检索/被读取的内容里可能藏着指令。把外部内容标记为「数据而非指令」，工具侧做校验，最小权限，输出过滤；无法完全杜绝，只能分层降低风险。',
      ]),
    ],
    resources: [
      r('OWASP · Top 10 for LLM Applications', 'https://genai.owasp.org/llm-top-10/', '提示注入与不安全输出'),
      r('OpenAI · Safety best practices', 'https://platform.openai.com/docs/guides/safety-best-practices', '部署层面的约束'),
    ],
    practice: [
      '给 agent_loop 加沙箱：白名单目录、执行超时、日志脱敏。',
      '构造 3 个失败案例：工具不存在、参数非法、工具返回超大结果。',
      '写清每个案例的预期行为和实际行为。',
    ],
    selfCheck: [
      '工具失败时，什么信息应该回填给模型？',
      '哪些动作必须人工确认？你的确认流程怎么设计？',
      '提示注入为什么无法 100% 防住？你的分层防御有哪些？',
    ],
  },

  'w2d6': {
    goal: '把三个真实工具接进 CLI 助手，并让它能多轮连续调用、能回放。',
    sections: [
      s('工具集怎么接', [
        '读本地笔记、全文搜索、安全计算器；每个工具有 schema、参数校验、超时、错误回填。',
        '工具不要做成万能函数；一个工具对应一个业务动作，参数不超过 5 个。',
      ]),
      s('多轮连续调用', [
        '模型可能连续调多个工具；循环直到没有 tool_calls。',
        '每一步都要记录：选了哪个工具、参数是什么、返回了什么、耗时多少。',
      ]),
      s('回放与失败案例', [
        '把一次完整会话重放成可读时间线；回放能回答「哪一步选错、哪一步参数错、哪一步总结丢信息」。',
        '故意构造失败：工具不存在、参数非法、工具返回超大结果；观察模型如何修正。',
      ]),
    ],
    resources: [
      r('OpenAI Cookbook · Function calling', 'https://cookbook.openai.com/', '多工具与并行调用'),
      r('Rich 文档', 'https://rich.readthedocs.io/', '终端时间线展示'),
    ],
    practice: [
      '把 3 个工具接进 CLI 助手，要求能多轮连续调用。',
      '实现轨迹日志 + 回放时间线。',
      '构造并复盘 3 个失败案例。',
      '写笔记：框架替你做了什么（对照你手写的循环）。',
    ],
    selfCheck: [
      '工具变多后，怎么避免模型选择困难？',
      '回放能回答哪些「只看最终答案」回答不了的问题？',
      'v0.2 和 v0.1 的本质差别是什么？',
    ],
  },

  'w2d7': {
    goal: '把 Agent 的理解固化成一篇长文和一次 5 分钟演示，并完成第 2 周复盘。',
    sections: [
      s('把 ReAct 画成状态机', [
        '节点：思考、行动、观察、结束；边：模型输出、工具返回、熔断。',
        '标出每个可能失败的点：解析失败、工具不存在、参数非法、无进展、超预算、人工拒绝。',
      ]),
      s('5 分钟演示脚本', [
        '从提问开始，展示一次工具调用、一次错误恢复、最终答案；不要只放 PPT。',
        '演示前预置数据，避免现场依赖网络和第三方服务。',
      ]),
      s('周复盘', [
        '12 张卡自测；补欠账；提前准备第 3 周的 embedding 环境（sentence-transformers + bge-m3）。',
      ]),
    ],
    resources: [
      r('LangGraph · Concepts', 'https://langchain-ai.github.io/langgraph/concepts/', '对照你的手写循环看框架抽象'),
      r('Anthropic · Building effective agents', 'https://www.anthropic.com/engineering/building-effective-agents', '再读一遍 workflow 部分'),
    ],
    practice: [
      '写《我理解的 Agent 循环》：状态机 + 失败点。',
      '准备 5 分钟演示脚本并彩排一次。',
      '完成周复盘四问 + 12 张卡周测。',
      '确认 bge-m3 模型开始下载。',
    ],
    selfCheck: [
      '白板画出 ReAct 循环，并说出 4 个失败点。',
      '什么任务不该用 Agent？判断标准是什么？',
      '你的演示里，哪一步最能证明「它真的在思考」？',
    ],
  },

  // ───────────────────────── W3 ─────────────────────────
  'w3d1': {
    goal: '理解 embedding 的几何直觉，选一个能在本机跑起来的中文模型。',
    sections: [
      s('embedding 是什么', [
        '把文本映射成高维向量，语义相近的文本在空间里距离近。模型在大量语料上训练过同义、上下位、相关关系，所以「怎么请假」能命中「年假申请流程」。',
        '归一化后，余弦相似度与点积排序等价；工程上统一归一化 + 内积，性能更好、结果一致。',
      ]),
      s('选型维度', [
        '中文/中英混合效果、最大输入长度、维度（存储与检索成本）、是否支持稀疏向量、部署方式、是否可微调。',
        '换 embedding 模型必须重建索引，所以一开始就留好抽象层：把 encode 封装成一个接口。',
      ]),
      s('本地方案：bge-m3', [
        'sentence-transformers + BAAI/bge-m3，首次下载约 2GB；CPU 能跑但慢，批量 encode 时注意 batch size。',
        '如果 PyTorch 在 Python 3.13 上装不上，用 uv 建一个 Python 3.12 的独立环境；不要为了一个库折腾系统 Python。',
      ]),
    ],
    resources: [
      r('BGE-M3 模型卡', 'https://huggingface.co/BAAI/bge-m3', '看用法、维度、最大长度'),
      r('sentence-transformers 文档', 'https://sbert.net/', 'encode、normalize、批量推理'),
      r('MTEB Leaderboard', 'https://huggingface.co/spaces/mteb/leaderboard', '看中文检索模型排名'),
    ],
    practice: [
      '装好 sentence-transformers，下载 bge-m3，encode 一句话确认维度。',
      '对 20 句话算相似度矩阵，找 3 组「字面不像但语义近」的例子。',
      '把 encode 封装成一个函数，后面换模型只改这一处。',
    ],
    selfCheck: [
      '余弦相似度和点积怎么选？为什么要归一化？',
      '换 embedding 模型后，为什么必须重建索引？',
      '你的语料里，哪类问题最可能被向量检索漏掉？',
    ],
  },

  'w3d2': {
    goal: '理解切分如何决定检索上限，并为自己的语料设计元数据。',
    sections: [
      s('切分决定上限', [
        '检索的最小单位是 chunk。切得太碎，语义不完整、答不出；切得太大，噪声多、稀释相似度、浪费上下文。',
        '切分错了，后面换再好的模型和 rerank 也救不回来。',
      ]),
      s('四种策略', [
        '固定长度：简单，但容易切断句子；按标题层级：结构化文档首选；语义切分：按段落/句子边界，质量好但慢；父子块：小块检索、大块返回。',
        'overlap 取块长的 10%–20%，优先按结构切而不是硬切；overlap 会增加索引体积和重复召回。',
      ]),
      s('元数据设计', [
        '至少记：来源、标题、更新时间、权限、docId、chunkIndex。块 id 要可推导（docId+chunkIndex），保证重复执行幂等。',
        '权限字段从第一天就要有，后面做权限过滤时不用重建。',
      ]),
    ],
    resources: [
      r('LangChain · Text splitters', 'https://python.langchain.com/docs/concepts/text_splitters/', '各种切分器对比'),
      r('Chroma 文档', 'https://docs.trychroma.com/', 'metadata 与过滤'),
      r('RAG 综述（arXiv 2312.10997）', 'https://arxiv.org/abs/2312.10997', '看 chunking 与 retrieval 部分'),
    ],
    practice: [
      '准备 20 篇语料：本仓库 docs/guide/ 下的页面 + 你收藏的 Java/LLM 技术文章。',
      '用两种策略各切一遍，产出 chunks.jsonl。',
      '设计元数据字段，并写一页切分策略对比表。',
    ],
    selfCheck: [
      '为什么说「切分决定检索质量的上限」？',
      '父子块解决什么矛盾？',
      'overlap 太大有什么副作用？',
    ],
  },

  'w3d3': {
    goal: '用 Chroma 在本地把向量库跑起来，理解集合、文档、元数据、过滤的关系。',
    sections: [
      s('选型维度', [
        '部署形态（本地/托管）、过滤能力、混合检索、规模、运维成本、生态。',
        '小团队常选 Chroma（pip 安装、零运维）或 pgvector（少一个组件）；Qdrant 能力强但通常要 Docker。',
      ]),
      s('Chroma 的最小用法', [
        'PersistentClient(path) 持久化到本地目录；create_collection 建集合；add(ids, embeddings, metadatas, documents) 写入；query(query_embeddings, n_results, where) 检索。',
        'where 是 metadata 过滤，应该在检索时下推，而不是检索后删。',
      ]),
      s('过滤为什么重要', [
        '先取 top-k 再按权限过滤，可能导致可用结果为空，还会通过「有没有结果」泄露信息。',
        '权限、租户、时间范围都应下推到检索层。',
      ]),
    ],
    resources: [
      r('Chroma · Getting started', 'https://docs.trychroma.com/getting-started', 'PersistentClient 与 collection'),
      r('Chroma · Filtering', 'https://docs.trychroma.com/guides', 'where 语法'),
      r('Qdrant · Filtering', 'https://qdrant.tech/documentation/concepts/filtering/', '对照理解过滤下推'),
    ],
    practice: [
      '用 Chroma 建集合、写入、带 metadata filter 查询、删除。',
      '把 20 篇语料的 chunks 全部入库，重复执行一次确认不产生重复数据。',
      '写一段笔记：Chroma 和 FAISS 的区别，什么时候会换 Qdrant。',
    ],
    selfCheck: [
      '为什么权限过滤必须下推到检索层？',
      'Chroma 的 collection / document / chunk 是什么关系？',
      '本地 Chroma 的持久化目录应该怎么备份？',
    ],
  },

  'w3d4': {
    goal: '用同一批 query 对比纯向量、纯 BM25、混合检索，理解各自的盲区。',
    sections: [
      s('top-k 与阈值', [
        'k 越大召回率上升但精确率下降，噪声挤占上下文、增加成本和延迟。',
        '常见做法：先 k=10–20 粗排，再 rerank 取 3–5 给模型；阈值用评测集定，不拍脑袋。',
      ]),
      s('BM25 与向量为什么互补', [
        'BM25 靠词频/逆文档频率，对专有名词、型号、错误码、精确短语极强，但不理解同义改写。',
        '向量检索理解语义，但对罕见实体和精确匹配不敏感。混合检索能同时覆盖两类查询。',
      ]),
      s('RRF 融合', [
        '对每个召回列表按排名给分 1/(k+rank)，多列表求和排序。只用排名、不用原始分数，所以不受量纲影响，不需要调权重。',
        '缺点：丢掉了「差多少」的信息；有时加权融合更好，但要调权重、做归一化。',
      ]),
    ],
    resources: [
      r('rank_bm25（Python）', 'https://github.com/dorianbrown/rank_bm25', 'BM25 的最小实现'),
      r('Qdrant · Hybrid queries', 'https://qdrant.tech/documentation/concepts/hybrid-queries/', 'RRF 与融合'),
      r('Elasticsearch · RRF', 'https://www.elastic.co/guide/en/elasticsearch/reference/current/rrf.html', '另一种实现参考'),
    ],
    practice: [
      '在同一批 query 上对比：纯向量 / 纯 BM25 / 混合（RRF）。',
      '记录每组的命中率与典型案例。',
      '找 2 个「BM25 赢」和 2 个「向量赢」的例子，写清原因。',
    ],
    selfCheck: [
      'top-k 调大为什么可能让回答变差？',
      'RRF 为什么比加权平均更稳？它的代价是什么？',
      '什么类型的 query 最适合 BM25？',
    ],
  },

  'w3d5': {
    goal: '把检索结果拼成可引用、可拒答的上下文，避免「检索对了但生成错」。',
    sections: [
      s('上下文拼装', [
        '按相关性排序、去重、加来源标记、控制总长度；相邻块可以合并，避免同一段话重复出现。',
        '给每个片段编号 [1][2]，要求模型在句末标注引用；前端可以点击溯源。',
      ]),
      s('引用要能防伪造', [
        '只允许引用给定片段；引用编号必须存在于上下文；输出后做一次校验，发现不存在的编号就重试或降级。',
      ]),
      s('拒答', [
        '明确指令：只能依据给定片段回答，证据不足就说不知道并说明缺什么。检索分数低于阈值时直接拒答，不要硬生成。',
        '拒答不是失败，是可信度的一部分；评测集里要有「知识库没有」的题。',
      ]),
    ],
    resources: [
      r('Anthropic · Citations', 'https://docs.anthropic.com/en/docs/build-with-claude/citations', '引用机制的设计参考'),
      r('OpenAI Cookbook · RAG', 'https://cookbook.openai.com/', '检索增强生成的实践'),
      r('RAGAS 文档', 'https://docs.ragas.io/', '忠实度与答案相关性指标'),
    ],
    practice: [
      '实现带引用的回答模板，并在 prompt 里写清拒答规则。',
      '准备 5 条「知识库里没有」的问题，验证模型会拒答。',
      '写一个引用校验函数：检查输出里的编号是否都存在。',
    ],
    selfCheck: [
      '引用编号被伪造时，你怎么发现？',
      '什么情况下应该拒答，而不是给一个「大概对」的答案？',
      '上下文太长时，你会优先删哪部分？',
    ],
  },

  'w3d6': {
    goal: '把六步链路串起来，跑通一个能回答自己文档问题的最小 RAG，并做第一轮人工评测。',
    sections: [
      s('六步链路', [
        '解析 → 切分 → 向量化 → 入库 → 检索 → 生成。每一步都可替换，先跑通再优化。',
        '不要一上来就上框架；先用手写脚本把数据流看清楚，后面用 LangChain/LlamaIndex 才知道它们在替你做什么。',
      ]),
      s('20 条评测集', [
        '含 5 条「知识库里没有」的拒答题；每条写清标准答案、证据来源、期望引用。',
        '评测问题要覆盖：单跳事实、同义改写、多跳、否定、时效。',
      ]),
      s('人工评测记录', [
        '每条记录三件事：检索命中吗？回答忠实吗？引用对吗？',
        '不要只记总分；逐条明细才能做归因。',
      ]),
    ],
    resources: [
      r('RAGAS 文档', 'https://docs.ragas.io/', '评测指标与数据集格式'),
      r('Chroma · RAG 教程', 'https://docs.trychroma.com/guides', '端到端示例'),
    ],
    practice: [
      '实现 rag_min.py：解析 → 切分 → 向量化 → 入库 → 检索 → 生成。',
      '建 20 条评测问题（含 5 条拒答），写清答案与证据。',
      '人工跑一遍，逐条记录命中/忠实/引用。',
    ],
    selfCheck: [
      '这条链路里，哪一步最可能成为瓶颈？',
      '忠实度和答案正确率有什么区别？',
      '拒答题怎么设计才不会「送分」？',
    ],
  },

  'w3d7': {
    goal: '把错误分成可行动的三类，做一次单变量改进，并写出项目一立项文档。',
    sections: [
      s('三类错误', [
        '检索没召回：query 与文档表述差异、切分太碎、embedding 不适合。',
        '召回了但排序差：噪声多、top-k 太大、缺少 rerank。',
        '召回对了但生成错：上下文太长、指令不清、模型能力不足。',
      ]),
      s('单变量改进', [
        '一次只改一个：加 rerank、改切分、加 query 改写；改完复测同一批题。',
        '记录配置（模型、k、切分参数、prompt 版本），否则下次说不清是谁的功劳。',
      ]),
      s('项目一立项', [
        '写清：解决谁的什么问题、边界（不做什么）、成功指标、架构草图、里程碑。',
        '指标要可量化：命中率、忠实度、P95 延迟、单次成本。',
      ]),
    ],
    resources: [
      r('RAGAS · Metrics', 'https://docs.ragas.io/en/stable/concepts/metrics/', '指标定义'),
      r('Anthropic · Building effective agents', 'https://www.anthropic.com/engineering/building-effective-agents', '项目边界与取舍'),
    ],
    practice: [
      '写错误归因报告：三类各占多少，各举 2 个例子。',
      '针对最大短板做 1 次改进并复测。',
      '写项目一立项文档（问题、边界、指标、架构草图）。',
    ],
    selfCheck: [
      '排查 RAG 错误的顺序是什么？',
      '为什么每次只能改一个变量？',
      '项目一的成功指标里，哪一个是「必须有」的？',
    ],
  },

  // ───────────────────────── W4 ─────────────────────────
  'w4d1': {
    goal: '把 rag_min.py 包成 HTTP 服务，支持流式输出，并用 curl 验证。',
    sections: [
      s('FastAPI 四件套', [
        '路由、pydantic 请求/响应模型、依赖注入、异常处理。',
        '请求模型要校验输入长度；响应模型要稳定，方便前端和评测脚本消费。',
      ]),
      s('SSE 流式接口', [
        'StreamingResponse + media_type="text/event-stream"；每个 chunk 以 data: 开头，事件之间用空行分隔。',
        '客户端断开时要停止生成；代理层要关闭缓冲；流式中途失败要发一个 error 事件，而不是静默截断。',
      ]),
      s('接口设计要点', [
        '幂等与去重（防止重复计费）、超时与取消、流式错误回传、限流与配额、版本化（prompt 与模型可回滚）。',
      ]),
    ],
    resources: [
      r('FastAPI 文档', 'https://fastapi.tiangolo.com/zh/', '请求模型、依赖注入、异常处理'),
      r('SSE 规范', 'https://html.spec.whatwg.org/multipage/server-sent-events.html', '事件流格式'),
      r('sse-starlette', 'https://github.com/sysid/sse-starlette', 'FastAPI 的 SSE 封装'),
    ],
    practice: [
      '实现 /chat 与 /chat/stream（SSE）。',
      '用 curl -N 验证流式输出。',
      '加请求长度校验和异常处理。',
    ],
    selfCheck: [
      '为什么 AI 对话常用 SSE 而不是 WebSocket？',
      '流式响应中途失败，客户端应该收到什么？',
      '怎么取消一个正在生成的请求？',
    ],
  },

  'w4d2': {
    goal: '让数据管道可重复执行：解析、增量索引、去重、删除同步都幂等。',
    sections: [
      s('解析', [
        'md/pdf/docx 都要保留结构信息：标题层级、页码、表格。解析质量差，后面切分和检索都会被拖累。',
        '常见坑：PDF 分栏、页眉页脚、扫描件；先处理你能拿到的格式，不要一开始追求全格式。',
      ]),
      s('增量索引', [
        '对文档内容算 hash（或 mtime+size 快速判断），与库中记录比对：新增插入、hash 变删旧插新、源文件消失软删除。',
        '块 id 用 docId+chunkIndex，保证重复执行幂等；删除文档时按 docId 删所有块。',
      ]),
      s('去重', [
        '模板化文档有大量重复段落，会挤占 top-k。内容 hash 精确去重，MinHash/SimHash 近似去重。',
      ]),
    ],
    resources: [
      r('pypdf 文档', 'https://pypdf.readthedocs.io/', 'PDF 文本提取'),
      r('python-docx 文档', 'https://python-docx.readthedocs.io/', 'docx 解析'),
      r('Chroma · Metadata', 'https://docs.trychroma.com/', '按 docId 删除与过滤'),
    ],
    practice: [
      '实现 ingest.py：新增/更新/删除三类操作都幂等。',
      '重复执行两次，确认库里没有脏数据。',
      '写一个按 docId 删除的测试用例。',
    ],
    selfCheck: [
      '怎么判断一篇文档变了？',
      '块 id 为什么必须可推导？',
      '删除源文档时，索引里应该怎么处理？',
    ],
  },

  'w4d3': {
    goal: '定义可复现的评测指标，跑出 20 条基线，并知道下一步优化什么。',
    sections: [
      s('五类指标', [
        '检索侧：Recall@k、命中率；生成侧：忠实度、引用正确率、答案正确率；工程侧：P95 延迟、单次成本；安全侧：拒答准确率。',
        '指标要配「评测集 + 可复现命令」，否则只是感觉。',
      ]),
      s('评测脚本', [
        '固定输入、固定配置、输出 JSON/CSV；记录模型版本、prompt 版本、切分参数、k 值。',
        '先跑 20 条基线，再扩到 30 条；不要一开始追求大而全。',
      ]),
      s('怎么读报告', [
        '看分布，不只看看均值：哪类题全错、哪类题延迟高、哪类题成本高。',
        '每条都要有明细，才能做归因。',
      ]),
    ],
    resources: [
      r('RAGAS · Metrics', 'https://docs.ragas.io/en/stable/concepts/metrics/', '忠实度、上下文精度等'),
      r('Langfuse 文档', 'https://langfuse.com/docs', '评测与 trace'),
    ],
    practice: [
      '写 eval.py，跑 W3 的 20 条问题。',
      '输出基线报告：5 个指标 + 逐条明细。',
      '写一句话结论：当前得分多少、瓶颈在哪、下一步优化什么。',
    ],
    selfCheck: [
      '忠实度和答案正确率有什么区别？',
      '为什么要看 P95 而不是平均值？',
      '你的评测命令能让别人复现吗？',
    ],
  },

  'w4d4': {
    goal: '让每条请求都能一键回放完整链路，出问题能定位到具体环节。',
    sections: [
      s('trace 字段', [
        'request_id、用户/租户、原始 query 与改写后 query、召回候选（id/分数/来源）、rerank 后顺序、最终 prompt（或 hash+版本）、模型与参数、首 token 与总耗时、token 与费用、输出、用户反馈。',
      ]),
      s('JSONL + 时间线工具', [
        '每步追加一行 JSON，按 request_id 聚合；写一个小工具打印时间线。',
        '不要把 trace 只存在内存里；进程崩了就没了。',
      ]),
      s('prompt 版本化', [
        'prompt 是代码：存文件/配置中心，带版本号和变更记录；trace 里记录用的哪一版。',
        '这样线上问题可以归因到具体版本，也能 A/B 和回滚。',
      ]),
    ],
    resources: [
      r('Langfuse · Tracing', 'https://langfuse.com/docs/tracing', 'trace 数据结构'),
      r('OpenTelemetry · GenAI', 'https://opentelemetry.io/docs/specs/semconv/gen-ai/', '标准字段参考'),
    ],
    practice: [
      '设计 trace 字段并落地 JSONL。',
      '写一个按 request_id 打印时间线的小工具。',
      '给 prompt 加版本号，并在 trace 里记录。',
    ],
    selfCheck: [
      '线上用户说「答得不对」，你按什么顺序看 trace？',
      'prompt 为什么要版本化？',
      'trace 里最不能省的三个字段是什么？',
    ],
  },

  'w4d5': {
    goal: '让服务在干净环境里一条命令起来，并把文档写到「陌生人能跑」。',
    sections: [
      s('一键启动', [
        'uvicorn + .env + 本地 Chroma 持久化目录；写 start.sh / Makefile；加 /health 健康检查。',
        '配置全部走环境变量：模型名、base_url、k、prompt 版本、Chroma 路径。',
      ]),
      s('日志与数据', [
        '日志落到文件，按天切分；Chroma 目录要能备份和恢复；启动时检查目录是否存在。',
        'Docker 是可选进阶：等本地跑通、需要交付给别人的时候再上，不要让它阻塞项目。',
      ]),
      s('README', [
        '三步命令、架构图（ASCII 即可）、环境变量表、已知限制。',
        '按「陌生人能不能照做」的标准写，不要写「配置一下即可」。',
      ]),
    ],
    resources: [
      r('uvicorn 文档', 'https://www.uvicorn.org/', '启动参数与 worker'),
      r('The Twelve-Factor App（中文）', 'https://12factor.net/zh_cn/', '配置与日志'),
      r('Chroma · Persistence', 'https://docs.trychroma.com/', '持久化目录'),
    ],
    practice: [
      '写一键启动脚本 + /health。',
      '写 README（三步命令 + 架构图 + 环境变量）。',
      '在干净目录/新 venv 里照着 README 跑一遍。',
    ],
    selfCheck: [
      '干净环境里，你需要哪几步才能起来？',
      '配置应该放在代码里还是环境变量里？',
      '什么情况下 Docker 才值得上？',
    ],
  },

  'w4d6': {
    goal: '按归因结论优化两个最大短板，把评测扩到 30 条，并录一段能讲清数据的演示。',
    sections: [
      s('单变量优化', [
        '从 W3 的三类错误里挑最大的两个：加 rerank、改切分、加 query 改写。每次只改一个，复测同一批题。',
        '记录改前/改后指标和配置；没有对比表的优化不算优化。',
      ]),
      s('补难例', [
        '多跳、否定、时效各补几条；难例不是为了好看，是为了暴露真实短板。',
      ]),
      s('3 分钟演示', [
        '问题 → 方案 → 数据 → 取舍；先讲「原来多少分、现在多少分、为什么」，再演示。',
      ]),
    ],
    resources: [
      r('BGE Reranker 模型卡', 'https://huggingface.co/BAAI/bge-reranker-v2-m3', '本地 rerank'),
      r('RAGAS 文档', 'https://docs.ragas.io/', '复测指标'),
      r('OBS / 录屏工具', 'https://obsproject.com/zh-cn', '可选：录演示'),
    ],
    practice: [
      '优化两个最大短板，记录改前/改后。',
      '评测集扩到 30 条，补 10 条难例。',
      '录一段 3 分钟演示，讲清问题-方案-数据。',
    ],
    selfCheck: [
      '你的优化是净收益还是只是换了一批题？',
      '难例里哪一类最暴露系统短板？',
      '演示的前 30 秒应该讲什么？',
    ],
  },

  'w4d7': {
    goal: '按验收标准逐条自查，补齐文档，完成 P0/P1 阶段复盘。',
    sections: [
      s('验收自查', [
        '按 checkpoints 逐条打勾；不达标项写清原因（估时、能力、外部依赖），不要写「以后补」。',
      ]),
      s('补齐文档', [
        '设计取舍、失败案例、后续路线（W5–W7 要做什么）；把「为什么不用另一个方案」写下来。',
      ]),
      s('阶段复盘', [
        '4 周投入 vs 产出；节奏是否需要调整；如果只有 12 周，你会砍掉哪一块。',
      ]),
    ],
    resources: [
      r('RAGAS 文档', 'https://docs.ragas.io/', '评测指标复查'),
      r('怎么用这套站点', 'https://shaoxiaofeng03.github.io/dev3/guide/how-to-use', '复盘与校准节奏'),
    ],
    practice: [
      '按 checkpoints 逐条验收，写原因。',
      '补项目一 α 文档与 3 分钟演示。',
      '完成阶段复盘，抽 20 张 P0 卡片。',
    ],
    selfCheck: [
      '你能用一句话说清「当前得分、瓶颈、下一步」吗？',
      '服务能在干净环境里一条命令起来吗？',
      '如果只有 12 周，你会砍掉哪一块？',
    ],
  },
};
