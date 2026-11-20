// 内容生成器：唯一数据源在 plan/ 目录，本脚本生成 docs/ 下的页面与 JSON。
// 用法：node scripts/build-content.mjs
import { mkdir, writeFile, access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { meta, phases, weeks, weekRange, weekdayOf, addDays } from '../plan/index.mjs';
import { dayStudies } from '../plan/study-01-04.mjs';
import { weekStudies } from '../plan/study-05-20.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const docs = path.join(root, 'docs');

const GEN_NOTE = '<!-- 本页由 scripts/build-content.mjs 自动生成，请勿直接编辑。改 plan/ 下的数据源后重新运行 npm run content -->\n';

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

async function exists(file) {
  try {
    await access(file, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function escapeCell(text) {
  return String(text).replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function n2(n) {
  return String(n).padStart(2, '0');
}

function renderSections(sections = []) {
  const lines = [];
  for (const sec of sections) {
    lines.push(`### ${sec.h}`);
    lines.push('');
    for (const p of sec.p ?? []) {
      lines.push(p);
      lines.push('');
    }
    if (sec.list?.length) {
      for (const item of sec.list) lines.push(`- ${item}`);
      lines.push('');
    }
  }
  return lines;
}

function renderResources(resources = []) {
  const lines = [];
  lines.push('## 资料与阅读顺序');
  lines.push('');
  if (!resources.length) {
    lines.push('本周没有额外阅读材料，按清单推进即可。');
    lines.push('');
    return lines;
  }
  resources.forEach((item, i) => {
    lines.push(`${i + 1}. [${item.title}](${item.url})${item.note ? ` — ${item.note}` : ''}`);
  });
  lines.push('');
  return lines;
}

function renderChecklist(title, items = []) {
  const lines = [];
  lines.push(`## ${title}`);
  lines.push('');
  for (const item of items) lines.push(`- [ ] ${item}`);
  lines.push('');
  return lines;
}

function renderBullets(title, items = []) {
  const lines = [];
  lines.push(`## ${title}`);
  lines.push('');
  for (const item of items) lines.push(`- ${item}`);
  lines.push('');
  return lines;
}

function fixedRhythmMd() {
  const lines = [];
  lines.push('## 每日固定节奏');
  lines.push('');
  lines.push('> 不随本周主题变化，按工作日 2h / 周末 8h 执行：');
  lines.push('');
  lines.push('- 25 分钟算法：W1–W6 按[题单](/guide/algo)推进；W7 起每周至少 3 次，错题优先。');
  lines.push('- 15–25 分钟记忆卡：当天到期 + 本周卡；周日做一次周测。');
  lines.push('- 工作日 50 分钟主线；周末按本周清单推进。');
  lines.push('- 每天结束写一句记录：学到什么 / 卡在哪 / 明天怎么调。');
  lines.push('');
  return lines;
}

function dayStudyMd(week, day, index) {
  const key = `w${week.n}d${index + 1}`;
  const study = dayStudies[key];
  const { start, end } = weekRange(week);
  const lines = [];
  lines.push('---');
  lines.push(`title: W${week.n} ${weekdayOf(day.date)} · ${day.focus}`);
  lines.push(`description: ${day.date} · 第 ${week.n} 周学习文档`);
  lines.push('---');
  lines.push(GEN_NOTE);
  lines.push('');
  lines.push(`# W${week.n} ${weekdayOf(day.date)} · ${day.focus}`);
  lines.push('');
  lines.push(
    `<div class="week-meta"><span>📅 ${day.date}</span><span>⏱ ${day.hours}h</span><span>🧭 ${week.phase}</span><span>🗓 W${week.n}（${start} ~ ${end}）</span></div>`
  );
  lines.push('');
  lines.push(
    `> 对应计划：[第 ${week.n} 周 · ${week.theme}](/plan/week-${n2(week.n)})　|　[本周记忆卡](/cards/week-${n2(week.n)})　|　[学习文档总览](/study/)`
  );
  lines.push('');
  lines.push('## 今天要解决什么');
  lines.push('');
  lines.push(study.goal);
  lines.push('');
  lines.push(...renderSections(study.sections));
  lines.push(...renderResources(study.resources));
  lines.push(...renderChecklist('动手清单', study.practice));
  lines.push(...renderChecklist('自检问题', study.selfCheck));
  lines.push('## 收尾');
  lines.push('');
  lines.push(`- 回到[第 ${week.n} 周计划](/plan/week-${n2(week.n)})勾选今天的任务。`);
  lines.push('- 写一句今天的收获或卡点，方便周日复盘。');
  if (index < (week.days?.length ?? 0) - 1) {
    lines.push(`- 明天：[W${week.n} ${weekdayOf(week.days[index + 1].date)} · ${week.days[index + 1].focus}](/study/w${n2(week.n)}d${index + 2})`);
  } else {
    lines.push(`- 下周：[第 ${week.n + 1} 周学习文档](/study/${week.n + 1 <= 4 ? `w${n2(week.n + 1)}d1` : `week-${n2(week.n + 1)}`})`);
  }
  lines.push('');
  return lines.join('\n');
}

function weekStudyMd(week) {
  const study = weekStudies[week.n];
  const { start, end } = weekRange(week);
  const lines = [];
  lines.push('---');
  lines.push(`title: 第 ${week.n} 周学习指南 · ${week.theme}`);
  lines.push(`description: ${start} 起，每周学习文档`);
  lines.push('---');
  lines.push(GEN_NOTE);
  lines.push('');
  lines.push(`# 第 ${week.n} 周学习指南 · ${week.theme}`);
  lines.push('');
  lines.push(
    `<div class="week-meta"><span>📅 ${start} ~ ${end}</span><span>⏱ 约 ${week.hours ?? meta.hoursPerWeek} 小时</span><span>🧭 ${week.phase}</span><span>🎴 ${week.cards.length} 张记忆卡</span></div>`
  );
  lines.push('');
  lines.push(
    `> 对应计划：[第 ${week.n} 周计划](/plan/week-${n2(week.n)})　|　[本周记忆卡](/cards/week-${n2(week.n)})　|　[学习文档总览](/study/)`
  );
  lines.push('');
  lines.push('## 本周目标');
  lines.push('');
  lines.push(study.goal);
  lines.push('');
  lines.push('## 7 天拆分建议');
  lines.push('');
  lines.push('| 时间 | 重点 | 产出 |');
  lines.push('| --- | --- | --- |');
  for (const row of study.split) {
    lines.push(`| ${escapeCell(row.day)} | ${escapeCell(row.focus)} | ${escapeCell(row.output ?? '')} |`);
  }
  lines.push('');
  lines.push(...renderSections(study.sections));
  lines.push(...renderResources(study.resources));
  lines.push(...renderBullets('常见坑', study.pitfalls));
  lines.push(...renderChecklist('验收问题', study.selfCheck));
  lines.push(...fixedRhythmMd());
  lines.push('## 收尾');
  lines.push('');
  lines.push(`- 回到[第 ${week.n} 周计划](/plan/week-${n2(week.n)})勾选清单。`);
  lines.push('- 周日写复盘：计划 vs 实际 / 最大卡点 / 下周只改一件事。');
  lines.push('');
  return lines.join('\n');
}

function studyIndexMd() {
  const lines = [];
  lines.push('---');
  lines.push('title: 学习文档');
  lines.push('---');
  lines.push(GEN_NOTE);
  lines.push('');
  lines.push('# 学习文档');
  lines.push('');
  lines.push('> **W1–W4 每天一页**（讲义级：知识点、阅读顺序、动手、自检）；**W5–W20 每周一页**（导航级：7 天拆分、资料、常见坑、验收问题）。');
  lines.push('');
  lines.push('## 怎么用');
  lines.push('');
  lines.push('1. 每天打开当天页面，先看「今天要解决什么」，再按「资料与阅读顺序」读。');
  lines.push('2. 读完做「动手清单」，最后用「自检问题」检查自己是否真的会了。');
  lines.push('3. 回到[计划页](/plan/)勾选任务；周末在[打卡页](/checkin)复盘。');
  lines.push('');
  for (const phase of phases) {
    const list = weeks.filter((w) => w.n >= phase.weeks[0] && w.n <= phase.weeks[1]);
    lines.push(`## ${phase.name}（W${phase.weeks[0]}–W${phase.weeks[1]}）`);
    lines.push('');
    for (const w of list) {
      if (w.detail === false) {
        lines.push(`- [W${w.n} · ${w.theme}](/study/week-${n2(w.n)})（每周一页）`);
      } else {
        lines.push(`- **W${w.n} · ${w.theme}**`);
        for (let i = 0; i < w.days.length; i += 1) {
          const day = w.days[i];
          lines.push(`  - [W${w.n} ${weekdayOf(day.date)} · ${day.focus}](/study/w${n2(w.n)}d${i + 1})`);
        }
      }
    }
    lines.push('');
  }
  return lines.join('\n');
}

function weekMd(week) {
  const { start, end } = weekRange(week);
  const lines = [];
  lines.push('---');
  lines.push(`title: 第 ${week.n} 周 · ${week.theme}`);
  lines.push(`description: ${week.start} 起，${week.phase}`);
  lines.push('---');
  lines.push(GEN_NOTE);
  lines.push('');
  lines.push(`# 第 ${week.n} 周 · ${week.theme}`);
  lines.push('');
  lines.push(
    `<div class="week-meta"><span>📅 ${start} ~ ${end}</span><span>⏱ 约 ${week.hours ?? meta.hoursPerWeek} 小时</span><span>🧭 ${week.phase}</span><span>🎴 ${week.cards.length} 张记忆卡</span></div>`
  );
  lines.push('');
  lines.push('## 本周目标');
  lines.push('');
  lines.push(week.goal);
  lines.push('');
  lines.push('## 为什么这样安排');
  lines.push('');
  lines.push(week.why);
  lines.push('');
  lines.push('## 核心概念');
  lines.push('');
  for (const c of week.concepts) lines.push(`- ${c}`);
  lines.push('');

  if (week.detail === false) {
    lines.push('## 本周清单');
    lines.push('');
    lines.push(`> 本周学习指南：[第 ${week.n} 周学习文档](/study/week-${n2(week.n)})。这一周按「周目标 + 清单」推进，开始前把清单拆成 7 天。勾选会实时保存，并可通过打卡页同步到 GitHub。`);
    lines.push('');
    lines.push(`<ClientOnly><WeekTasks week="${week.n}" /></ClientOnly>`);
    lines.push('');
    lines.push(...fixedRhythmMd());
  } else {
    lines.push('## 每日安排');
    lines.push('');
    lines.push('> 每天 2 小时（工作日）/ 8 小时（周末）。勾选即打卡，可填写当日收获与耗时。每天的知识点、资料与自检见「学习」列。');
    lines.push('');
    lines.push(`<ClientOnly><WeekTasks week="${week.n}" /></ClientOnly>`);
    lines.push('');
    lines.push('### 时间分配一览');
    lines.push('');
    lines.push('| 日期 | 星期 | 时长 | 重点 | 当日交付 | 学习 |');
    lines.push('| --- | --- | --- | --- | --- | --- |');
    week.days.forEach((d, i) => {
      lines.push(
        `| ${d.date} | ${weekdayOf(d.date)} | ${d.hours}h | ${escapeCell(d.focus)} | ${escapeCell(d.output.replace(/^今日交付：/, ''))} | [打开](/study/w${n2(week.n)}d${i + 1}) |`
      );
    });
    lines.push('');
  }

  lines.push('## 本周交付');
  lines.push('');
  for (const d of week.deliverables) lines.push(`- ${d}`);
  lines.push('');
  lines.push('## 验收标准');
  lines.push('');
  for (const d of week.checkpoints) lines.push(`- [ ] ${d}`);
  lines.push('');
  lines.push('## 面试会问到');
  lines.push('');
  for (const q of week.interview) lines.push(`- ${q}`);
  lines.push('');
  if (week.resources?.length) {
    lines.push('## 参考资料');
    lines.push('');
    for (const r of week.resources) lines.push(`- [${r.title}](${r.url})`);
    lines.push('');
  }
  lines.push('## 记忆卡');
  lines.push('');
  lines.push(`<ClientOnly><FlashCards week="${week.n}" /></ClientOnly>`);
  lines.push('');
  if (week.retro?.length) {
    lines.push('## 复盘问题');
    lines.push('');
    for (const q of week.retro) lines.push(`- ${q}`);
    lines.push('> 周日晚用 30 分钟写进打卡页的「本周复盘」。');
    lines.push('');
  }
  lines.push(`[← 返回 20 周总览](/plan/)　|　[第 ${week.n} 周记忆卡](/cards/week-${n2(week.n)})`);
  lines.push('');
  return lines.join('\n');
}

function cardsMd(week) {
  const lines = [];
  lines.push('---');
  lines.push(`title: 第 ${week.n} 周记忆卡`);
  lines.push('---');
  lines.push(GEN_NOTE);
  lines.push('');
  lines.push(`# 第 ${week.n} 周记忆卡`);
  lines.push('');
  lines.push(`共 **${week.cards.length}** 张 · 主题：${week.theme}`);
  lines.push('');
  lines.push('> 手机上点卡片翻面；按「忘记 / 模糊 / 记得 / 简单」评分，系统按 SM-2 算法安排下次复习。');
  lines.push('');
  lines.push(`<ClientOnly><FlashCards week="${week.n}" /></ClientOnly>`);
  lines.push('');
  lines.push('## 卡片清单（快速浏览 / 打印）');
  lines.push('');
  week.cards.forEach((card, i) => {
    lines.push(`### ${i + 1}. ${card.front}`);
    lines.push('');
    lines.push(`**答**：${card.back}`);
    lines.push('');
    lines.push(`<small>标签：${card.tag} · ID：${card.id}</small>`);
    lines.push('');
  });
  lines.push(`[← 返回记忆卡总览](/cards/)　|　[第 ${week.n} 周计划](/plan/week-${n2(week.n)})`);
  lines.push('');
  return lines.join('\n');
}

function planIndexMd() {
  const lines = [];
  lines.push('---');
  lines.push('title: 20 周总览');
  lines.push('---');
  lines.push(GEN_NOTE);
  lines.push('');
  lines.push(`# ${meta.title} · 20 周作战计划`);
  lines.push('');
  lines.push(`**${meta.subtitle}**　｜　共 ${meta.totalWeeks} 周　｜　约 ${meta.hoursPerWeek} 小时 / 周`);
  lines.push('');
  lines.push('## 你的参数');
  lines.push('');
  lines.push('| 项 | 取值 |');
  lines.push('| --- | --- |');
  const L = meta.learner ?? {};
  const rows = [
    ['目标岗位', L.goal],
    ['技术起点', L.stack],
    ['目标城市', L.city],
    ['时间投入', L.rhythm],
    ['算法基础', L.algo],
    ['周复盘', L.reviewDay],
  ];
  for (const [k, v] of rows) if (v) lines.push(`| ${k} | ${escapeCell(v)} |`);
  lines.push('');
  lines.push('> 南京的岗位结构和北上深不一样：B 端、金融科技、电力能源、传统软件占比更高，Java 栈更吃香。具体的公司类型、投递节奏和题单，见 [南京岗位地图](/guide/market-nanjing) 与 [零基础算法题单](/guide/algo)；模型调用统一用 [DeepSeek 接入指南](/guide/deepseek)。');
  lines.push('');
  lines.push('## 这份计划怎么来的');
  lines.push('');
  lines.push(
    '你的起点是「Java 后端扎实、AI 与 Python 零基础、在职、每天 2 小时 + 周末 8 小时」。' +
      '所以这份计划刻意做了三件事：**不重学编程**（Python 只补到能写服务）、**不铺开广度**（20 周只做两个深项目 + 一个 Java 项目）、**不留「学完再投」的幻想**（第 17 周就开始投递）。'
  );
  lines.push('');
  lines.push('## 六条原则');
  lines.push('');
  meta.principles.forEach((p, i) => lines.push(`${i + 1}. ${p}`));
  lines.push('');
  lines.push('## 每周节奏');
  lines.push('');
  lines.push('| 时段 | 时长 | 怎么用 |');
  lines.push('| --- | --- | --- |');
  for (const r of meta.weeklyRhythm) lines.push(`| ${r.day} | ${r.hours} | ${escapeCell(r.detail)} |`);
  lines.push('');
  lines.push(`> ${meta.timelineNote}`);
  lines.push('');
  lines.push('## 阶段划分');
  lines.push('');
  lines.push('| 阶段 | 周次 | 时间 | 阶段目标 | 通过标准 |');
  lines.push('| --- | --- | --- | --- | --- |');
  for (const p of phases) {
    lines.push(
      `| ${p.name} | W${p.weeks[0]}–W${p.weeks[1]} | ${p.range} | ${escapeCell(p.goal)} | ${escapeCell(p.proof)} |`
    );
  }
  lines.push('');
  lines.push('## 20 周一览');
  lines.push('');
  lines.push('| 周 | 日期 | 阶段 | 主题 | 本周交付 |');
  lines.push('| --- | --- | --- | --- | --- |');
  for (const w of weeks) {
    const { start, end } = weekRange(w);
    lines.push(
      `| [W${w.n}](/plan/week-${n2(w.n)}) | ${start.slice(5)} ~ ${end.slice(5)} | ${w.phase} | ${escapeCell(w.theme)} | ${escapeCell(w.deliverables[0])} |`
    );
  }
  lines.push('');
  lines.push('## 现在开始');
  lines.push('');
  lines.push('1. 打开 [第 1 周计划](/plan/week-01)，先看「本周目标」和「每日安排」。');
  lines.push('2. 打开 [打卡页](/checkin)，配置 GitHub Token（一次即可），以后手机也能打卡。');
  lines.push('3. 每天结束时勾掉任务、写一句收获；每周日晚做复盘。');
  lines.push('');
  return lines.join('\n');
}

function cardsIndexMd() {
  const total = weeks.reduce((s, w) => s + w.cards.length, 0);
  const lines = [];
  lines.push('---');
  lines.push('title: 记忆卡');
  lines.push('---');
  lines.push(GEN_NOTE);
  lines.push('');
  lines.push('# 记忆卡 · 间隔重复');
  lines.push('');
  lines.push(`全站共 **${total}** 张卡片，按周组织。每张卡片的复习间隔由 SM-2 算法根据你的评分自动调整。`);
  lines.push('');
  lines.push('<ClientOnly><FlashCards /></ClientOnly>');
  lines.push('');
  lines.push('## 按周查看');
  lines.push('');
  for (const w of weeks) {
    lines.push(`- [第 ${w.n} 周 · ${w.theme}](/cards/week-${n2(w.n)})（${w.cards.length} 张）`);
  }
  lines.push('');
  lines.push('## 怎么用才有效');
  lines.push('');
  lines.push('1. **先理解再背**：当天学完看一遍卡片，用自己的话复述，再翻面核对。');
  lines.push('2. **每天 15 分钟**：只做「今天到期」的卡，不求一次背完。');
  lines.push('3. **评分要诚实**：想不起来就按「忘记」，间隔会重置——这是算法在帮你，不是惩罚你。');
  lines.push('4. **周日晚加一次周测**：把本周全部卡片过一遍，错 3 张以上重新看笔记。');
  lines.push('');
  return lines.join('\n');
}

function validate() {
  const errors = [];
  const seen = new Map();

  const claim = (id, where) => {
    if (seen.has(id)) errors.push(`重复 ID「${id}」：${seen.get(id)} 与 ${where}`);
    else seen.set(id, where);
  };

  const pad = (n) => String(n).padStart(2, '0');

  weeks.forEach((w, idx) => {
    if (w.n !== idx + 1) errors.push(`周序号不连续：第 ${idx + 1} 个对象写的是 ${w.n}`);
    if (idx > 0) {
      const expected = weekRange(weeks[idx - 1]).end;
      const next = addDays(expected, 1);
      if (w.start !== next) errors.push(`W${w.n} 起始日应为 ${next}，实际 ${w.start}`);
    }
    if (!w.deliverables?.length) errors.push(`W${w.n} 缺少交付物`);
    if (!w.checkpoints?.length) errors.push(`W${w.n} 缺少验收标准`);
    if (!w.cards?.length) errors.push(`W${w.n} 缺少记忆卡`);

    for (const card of w.cards ?? []) claim(card.id, `W${w.n} 记忆卡`);

    if (w.detail === false) {
      if (!w.checklist?.length) errors.push(`W${w.n} 是周粒度但缺少 checklist`);
      for (const c of w.checklist ?? []) claim(c.id, `W${w.n} 清单`);
      return;
    }

    if ((w.days ?? []).length !== 7) errors.push(`W${w.n} 应有 7 天，实际 ${w.days?.length ?? 0}`);
    (w.days ?? []).forEach((d, i) => {
      const expectDate = addDays(w.start, i);
      if (d.date !== expectDate) errors.push(`W${w.n} 第 ${i + 1} 天日期应为 ${expectDate}，实际 ${d.date}`);
      if (!d.tasks?.length) errors.push(`W${w.n} ${d.date} 没有任务`);
      const mins = (d.tasks ?? []).reduce((s, t) => s + (t.min ?? 0), 0);
      const target = d.kind === 'weekend' ? 480 : 120;
      if (Math.abs(mins - target) > 15) {
        errors.push(`W${w.n} ${d.date} 任务时长合计 ${mins} 分钟，偏离 ${target} 分钟过多`);
      }
      for (const t of d.tasks ?? []) claim(t.id, `W${w.n} ${d.date}`);
    });
  });

  // 学习文档覆盖检查：W1–W4 每天一份，W5–W20 每周一份
  weeks.forEach((w) => {
    if (w.detail === false) {
      if (!weekStudies[w.n]) errors.push(`W${w.n} 缺少学习指南（plan/study-05-20.mjs）`);
      return;
    }
    w.days.forEach((d, i) => {
      const key = `w${w.n}d${i + 1}`;
      if (!dayStudies[key]) errors.push(`W${w.n} ${d.date} 缺少学习文档（plan/study-01-04.mjs 的 ${key}）`);
    });
  });

  for (const [key, study] of Object.entries(dayStudies)) {
    if (!study.goal) errors.push(`学习文档 ${key} 缺少 goal`);
    if (!study.sections?.length) errors.push(`学习文档 ${key} 缺少 sections`);
    if (!study.selfCheck?.length) errors.push(`学习文档 ${key} 缺少自检问题`);
  }
  for (const [n, study] of Object.entries(weekStudies)) {
    if (!study.goal) errors.push(`W${n} 学习指南缺少 goal`);
    if (!study.split?.length) errors.push(`W${n} 学习指南缺少 7 天拆分`);
  }

  if (errors.length) {
    throw new Error(`内容校验失败：\n- ${errors.join('\n- ')}`);
  }
}

async function main() {
  validate();

  await ensureDir(path.join(docs, 'plan'));
  await ensureDir(path.join(docs, 'cards'));
  await ensureDir(path.join(docs, 'study'));
  await ensureDir(path.join(docs, 'data'));

  const plan = {
    meta,
    phases,
    weeks: weeks.map((w) => {
      const { start, end } = weekRange(w);
      return { ...w, end, hours: w.hours ?? meta.hoursPerWeek };
    }),
  };

  await writeFile(
    path.join(docs, 'data', 'plan.json'),
    JSON.stringify(plan, null, 2) + '\n',
    'utf8'
  );

  const cards = [];
  for (const w of weeks) {
    for (const card of w.cards) cards.push({ ...card, week: w.n, weekTheme: w.theme });
  }
  await writeFile(path.join(docs, 'data', 'cards.json'), JSON.stringify(cards, null, 2) + '\n', 'utf8');

  let studyPages = 0;
  for (const w of weeks) {
    await writeFile(path.join(docs, 'plan', `week-${n2(w.n)}.md`), weekMd(w), 'utf8');
    await writeFile(path.join(docs, 'cards', `week-${n2(w.n)}.md`), cardsMd(w), 'utf8');
    if (w.detail === false) {
      await writeFile(path.join(docs, 'study', `week-${n2(w.n)}.md`), weekStudyMd(w), 'utf8');
      studyPages += 1;
    } else {
      for (let i = 0; i < w.days.length; i += 1) {
        await writeFile(path.join(docs, 'study', `w${n2(w.n)}d${i + 1}.md`), dayStudyMd(w, w.days[i], i), 'utf8');
        studyPages += 1;
      }
    }
  }

  await writeFile(path.join(docs, 'plan', 'index.md'), planIndexMd(), 'utf8');
  await writeFile(path.join(docs, 'cards', 'index.md'), cardsIndexMd(), 'utf8');
  await writeFile(path.join(docs, 'study', 'index.md'), studyIndexMd(), 'utf8');

  const checkins = path.join(docs, 'data', 'checkins.json');
  if (!(await exists(checkins))) {
    await writeFile(
      checkins,
      JSON.stringify({ version: 1, note: '打卡数据。可手动编辑，格式见 docs/guide/data-format.md', entries: [] }, null, 2) + '\n',
      'utf8'
    );
  }

  const review = path.join(docs, 'data', 'review-state.json');
  if (!(await exists(review))) {
    await writeFile(
      review,
      JSON.stringify({ version: 1, note: '记忆卡复习状态（SM-2）', cards: {} }, null, 2) + '\n',
      'utf8'
    );
  }

  console.log(
    `✅ 已生成：${weeks.length} 个周页面、${weeks.length} 个记忆卡页面、${studyPages} 个学习文档页面、${cards.length} 张卡片、打卡页索引`
  );
}

main().catch((err) => {
  console.error('❌ 生成失败：', err);
  process.exit(1);
});


