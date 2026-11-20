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
    goal: '把 Python 从「会写函数」推进到「能写一个小工具」：模块、依赖、异常、类型、HTTP。',
    sections: [
      s('工程化三件套', [
        'pyproject.toml ≈ pom.xml：声明项目元数据和依赖；uv.lock ≈ 依赖锁定；.venv ≈ 每个项目独立的 classpath。',
        'import 是运行时行为，模块被 import 时顶层代码会执行；所以入口写 if __name__ == "__main__":。',
      ]),
      s('异常与类型注解', [
        'except 要具体，不要裸 except Exception 吞掉一切；捕获后要么处理，要么带上上下文重新抛。',
        '类型注解（str、list[int]、dict[str, list[str]]）不会改变运行时，但能让编辑器、mypy 和未来的你少踩坑。',
      ]),
      s('HTTP 客户端三件事', [
        '超时：连接超时和读超时都要设；没有超时的 HTTP 调用等于埋雷。',
        '异常：网络错误、超时、非 2xx 状态码要分开处理，不要只 catch 一个 Exception。',
        '可观测：打印状态码、耗时、请求 id；后面调用 LLM 时这些字段会直接复用。',
      ]),
      s('async/await 先懂概念', [
        'asyncio 是单线程事件循环，适合 IO 密集（HTTP、数据库、LLM 调用）；CPU 密集任务用多进程。',
        '第 1 周不要求写复杂协程，只要知道「await 让出控制权，等 IO 回来再继续」。',
      ]),
    ],
    resources: [
      r('httpx 文档', 'https://www.python-httpx.org/', '看 Quickstart 和 Timeouts'),
      r('uv · Managing projects', 'https://docs.astral.sh/uv/guides/projects/', '对照 Maven 理解依赖与锁'),
      r('Python typing 文档', 'https://docs.python.org/zh-cn/3/library/typing.html', '用到再查，不要背'),
    ],
    practice: [
      '写一个 CLI 小工具：调一个公开 HTTP 接口，设置超时、捕获异常、打印状态码与耗时。',
      '给工具加类型注解和 dataclass 配置。',
      '把依赖写进 pyproject.toml，用 uv sync 重建一次环境。',
    ],
    selfCheck: [
      '为什么 HTTP 调用必须设超时？连接超时和读超时有什么区别？',
      'pyproject.toml、uv.lock、.venv 各自对应 Maven 生态里的什么？',
      'async 适合 CPU 密集任务吗？为什么？',
    ],
  },

  'w1d4': {
    goal: '把 token、上下文、温度、幻觉这些天天被提到的词，变成能算账、能调参的工程概念。',
    sections: [
      s('token 是计费与延迟的单位', [
        '模型按 token 计费，输入和输出分开算，输出通常更贵。上下文越长、输出越长，费用和延迟越高。',
        '中文大约 1 个汉字 ≈ 1 个 token 上下（不同分词器有差异），不要用「字数」估算成本。',
      ]),
      s('上下文窗口 ≠ 最大输出', [
        '上下文窗口是输入 + 输出的总预算；最大输出是单次生成的上限。超窗口要截断、摘要或检索，不要硬塞。',
        '长上下文不是免费的：缓存命中与未命中的价格差一个数量级，延迟也会上升。',
      ]),
      s('temperature 与 top_p', [
        'temperature 缩放概率分布：越低越确定，越高越发散；top_p 是核采样，只在累计概率前 p 的候选里采样。',
        '抽取、分类、代码建议用 0–0.3；创意写作用 0.7–1.0；一般不要同时大改两个参数。',
      ]),
      s('幻觉的三个来源', [
        '知识缺失：用 RAG 提供证据并要求引用。',
        '知识过时：检索 + 时效性说明，别让模型猜。',
        '任务超出能力：拆解任务，给计算器/代码执行等工具，并允许模型说「不知道」。',
      ]),
    ],
    resources: [
      r('DeepSeek · Models & Pricing', 'https://api-docs.deepseek.com/quick_start/pricing', '看上下文长度、价格、缓存命中价'),
      r('DeepSeek API 文档', 'https://api-docs.deepseek.com/', '看请求参数与思考模式'),
      r('OpenAI · Prompt engineering', 'https://platform.openai.com/docs/guides/prompt-engineering', '参数与提示词的关系'),
    ],
    practice: [
      '做一张参数速查表：token、上下文、temperature、top_p、max_tokens、流式、计费。',
      '同一个问题用 temperature 0 / 0.7 / 1.2 各跑一次，记录输出差异。',
      '估算「1000 次问答」的输入/输出 token 与费用。',
    ],
    selfCheck: [
      'temperature 和 top_p 分别控制什么？为什么不要同时大改？',
      '为什么「上下文塞满」既贵又慢？',
      '幻觉的三个来源各自对应什么缓解手段？',
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
