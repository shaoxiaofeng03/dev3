import { weeks as w14 } from './weeks-01-04.mjs';
import { weeks as w520 } from './weeks-05-20.mjs';

export const phases = [
  {
    id: 'P0',
    name: 'P0 地基',
    weeks: [1, 4],
    range: '2026-11-23 ~ 2026-12-20',
    goal: '把环境和工程基本盘打牢：API 调用层、手写 Agent 循环、最小可用 RAG。',
    proof: '能独立写出带重试/超时/结构化输出的 LLM 客户端，并手写 ReAct 循环。',
  },
  {
    id: 'P1',
    name: 'P1 RAG 工程化',
    weeks: [5, 7],
    range: '2026-12-21 ~ 2027-01-10',
    goal: '把 RAG 从 demo 推到「有评测、有权限、有成本核算」的服务，形成项目一。',
    proof: '项目一 v1.0：30 条评测集、优化前后对比、可 Docker 一键启动。',
  },
  {
    id: 'P2',
    name: 'P2 Agent 工程',
    weeks: [8, 13],
    range: '2027-01-11 ~ 2027-02-21',
    goal: '掌握 Agent 范式、状态与记忆、多智能体与评测，完成项目二。',
    proof: '项目二 v1.0：真实任务链路、30 条评测、可恢复执行、演示视频。',
  },
  {
    id: 'P3',
    name: 'P3 Java 企业级 AI',
    weeks: [14, 15],
    range: '2027-02-22 ~ 2027-03-07',
    goal: '用 Spring AI / LangChain4j 把 AI 能力接进 Java 服务，形成差异化。',
    proof: '项目三 + 多模型路由、审计日志、简历 v1。',
  },
  {
    id: 'P4',
    name: 'P4 求职冲刺',
    weeks: [16, 18],
    range: '2027-03-08 ~ 2027-03-28',
    goal: '八股、系统设计、模拟面试、简历定稿，并启动投递。',
    proof: '70 道高频题答案库、5 个系统设计、2 次模拟面、30 家投递。',
  },
  {
    id: 'P5',
    name: 'P5 面试收尾',
    weeks: [19, 20],
    range: '2027-03-29 ~ 2027-04-11',
    goal: '稳定面试输出、补齐短板、拿到并选对 offer。',
    proof: 'offer 对比表与决策、20 周复盘长文。',
  },
];

export const meta = {
  title: 'Java 后端 → AI 应用 / Agent 开发',
  subtitle: '20 周作战计划 · 2026.11.23 → 2027.04.11',
  start: '2026-11-23',
  end: '2027-04-11',
  totalWeeks: 20,
  hoursPerWeek: 26,
  learner: {
    city: '南京（主投本地，上海 / 杭州作为备选）',
    stack: 'Java 后端，AI 与 Python 零基础',
    algo: '零基础，未刷过题（前 6 周按题单从数组起步）',
    reviewDay: '周日',
    rhythm: '工作日 2h + 周末每天 8h ≈ 26h/周',
    goal: '2027 年 4 月拿到 AI 应用 / Agent 开发 offer',
  },
  weeklyRhythm: [
    { day: '工作日', hours: '2h', detail: '50min 主线 + 25min 算法 + 25min 记忆卡 / 笔记' },
    { day: '周六', hours: '8h', detail: '项目日：上午 4h 实现，下午 4h 测试 / 单测 / 复盘' },
    { day: '周日', hours: '8h', detail: '交付日：收尾、文档、演示、周复盘、记忆卡周测' },
  ],
  principles: [
    '先工程，后模型：把重试、超时、校验、评测、可观测当第一课，而不是最后补。',
    '两个深项目 > 五个 demo：每个项目都要有评测数据、失败案例和取舍论证。',
    '每周只改一个变量：尤其是 RAG/Agent 调优，否则永远说不清是谁的功劳。',
    'Java 不丢：用 Spring AI / LangChain4j 把 AI 能力接进存量系统，这是你的差异化。',
    '边做边投：3 月中旬启动投递，用真实面试反馈驱动最后四周的补强。',
  ],
  timelineNote:
    '2027 年春节是 2 月 6 日，第 11 周设为缓冲周（轻量复盘 + 项目二立项），不要在那周排新课。',
};

export const weeks = [...w14, ...w520].sort((a, b) => a.n - b.n);

if (weeks.length !== 20) {
  throw new Error(`周数应为 20，实际 ${weeks.length}`);
}

export function addDays(dateStr, n) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + n));
  return dt.toISOString().slice(0, 10);
}

export function weekRange(week) {
  return { start: week.start, end: addDays(week.start, 6) };
}

export const weekdayNames = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

export function weekdayOf(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return weekdayNames[(dt.getUTCDay() + 6) % 7];
}
