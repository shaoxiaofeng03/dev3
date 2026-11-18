// 生成 docs/public/ai-map.svg —— AI 应用技术地图（手机优先的竖版分层图）
// 用法：node scripts/build-ai-map.mjs
import fs from 'node:fs';

const W = 720;
const MARGIN = 44;
const BOX_W = 200;
const BOX_H = 54;
const GAP_X = 16;
const ROW_H = 70;
const BAND_TITLE_H = 46;
const BAND_PAD_BOTTOM = 10;
const BAND_GAP = 24;

const bands = [
  {
    name: '应用层 · 用户看到什么',
    note: '产品形态',
    color: '#6366f1',
    items: ['智能客服', '企业知识库', '代码助手', '文档抽取', '数据分析', '流程自动化', 'AI 搜索', '嵌入式 Copilot'],
  },
  {
    name: '编排层 · 谁决定下一步',
    note: '从代码编排到模型自主',
    color: '#8b5cf6',
    items: ['Prompt 链', '路由分流', '并行投票', '包工头模式', '生成-评审', 'ReAct 循环', '计划-执行', '多智能体'],
  },
  {
    name: '能力层 · 让模型会查、会做、靠谱',
    note: '工程能力',
    color: '#0ea5e9',
    items: ['检索 RAG', '工具调用', '记忆', '结构化输出', '评测', '可观测', '护栏安全', '缓存成本'],
  },
  {
    name: '模型层 · 选哪个模型、要不要改它',
    note: '能力来源',
    color: '#10b981',
    items: ['对话模型', '推理模型', '长上下文', 'Embedding', 'Rerank', '多模态', '小模型', '微调 LoRA'],
  },
  {
    name: '基础设施层 · 跑得稳、跑得省',
    note: '底座',
    color: '#f59e0b',
    items: ['推理服务', '向量库', '模型网关', '队列缓存', '监控告警', 'GPU 资源'],
  },
];

const cross = {
  name: '横切关注点 · 每一层都要管',
  color: '#64748b',
  items: ['评测数据飞轮', '成本与延迟', '安全与合规', '权限与审计'],
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function rowsOf(items, perRow) {
  const rows = [];
  for (let i = 0; i < items.length; i += perRow) rows.push(items.slice(i, i + perRow));
  return rows;
}

function bandHeight(rows) {
  return BAND_TITLE_H + rows.length * ROW_H + BAND_PAD_BOTTOM;
}

const perRow = 3;
const parts = [];
let y = 0;

// 标题
parts.push(`<rect width="${W}" height="100%" fill="#ffffff"/>`);
parts.push(`<text x="${MARGIN}" y="52" font-size="30" font-weight="700" fill="#0f172a">AI 应用技术地图</text>`);
parts.push(
  `<text x="${MARGIN}" y="82" font-size="15" fill="#64748b">从用户看到的产品，到跑在底下的基础设施 · 画于 2026.11</text>`
);
y = 104;

function drawBand(band, offsetY) {
  const rows = rowsOf(band.items, perRow);
  const h = bandHeight(rows);
  parts.push(
    `<rect x="${MARGIN}" y="${offsetY}" width="${W - MARGIN * 2}" height="${h}" rx="16" fill="${band.color}0d" stroke="${band.color}33"/>`
  );
  parts.push(
    `<text x="${MARGIN + 18}" y="${offsetY + 28}" font-size="17" font-weight="700" fill="${band.color}">${esc(band.name)}</text>`
  );
  if (band.note) {
    parts.push(
      `<text x="${W - MARGIN - 18}" y="${offsetY + 28}" font-size="12" fill="#94a3b8" text-anchor="end">${esc(band.note)}</text>`
    );
  }
  rows.forEach((row, ri) => {
    const rowY = offsetY + BAND_TITLE_H + ri * ROW_H;
    const totalW = row.length * BOX_W + (row.length - 1) * GAP_X;
    let x = MARGIN + (W - MARGIN * 2 - totalW) / 2;
    for (const item of row) {
      parts.push(`<rect x="${x}" y="${rowY}" width="${BOX_W}" height="${BOX_H}" rx="10" fill="#ffffff" stroke="${band.color}55"/>`);
      parts.push(
        `<text x="${x + BOX_W / 2}" y="${rowY + BOX_H / 2 + 6}" font-size="17" fill="#1e293b" text-anchor="middle">${esc(item)}</text>`
      );
      x += BOX_W + GAP_X;
    }
  });
  return h;
}

for (const band of bands) {
  const h = drawBand(band, y);
  y += h;
  // 层与层之间的连接
  const cx = W / 2;
  parts.push(`<line x1="${cx}" y1="${y - 2}" x2="${cx}" y2="${y + BAND_GAP - 4}" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4 4"/>`);
  parts.push(
    `<path d="M ${cx - 5} ${y + BAND_GAP - 9} L ${cx} ${y + BAND_GAP - 3} L ${cx + 5} ${y + BAND_GAP - 9}" fill="none" stroke="#cbd5e1" stroke-width="2"/>`
  );
  y += BAND_GAP;
}

// 横切
{
  const rows = rowsOf(cross.items, 2);
  const h = bandHeight(rows);
  parts.push(
    `<rect x="${MARGIN}" y="${y}" width="${W - MARGIN * 2}" height="${h}" rx="16" fill="${cross.color}0d" stroke="${cross.color}33"/>`
  );
  parts.push(
    `<text x="${MARGIN + 18}" y="${y + 28}" font-size="17" font-weight="700" fill="${cross.color}">${esc(cross.name)}</text>`
  );
  rows.forEach((row, ri) => {
    const rowY = y + BAND_TITLE_H + ri * ROW_H;
    const totalW = row.length * BOX_W + (row.length - 1) * GAP_X;
    let x = MARGIN + (W - MARGIN * 2 - totalW) / 2;
    for (const item of row) {
      parts.push(`<rect x="${x}" y="${rowY}" width="${BOX_W}" height="${BOX_H}" rx="10" fill="#ffffff" stroke="${cross.color}55"/>`);
      parts.push(
        `<text x="${x + BOX_W / 2}" y="${rowY + BOX_H / 2 + 6}" font-size="17" fill="#1e293b" text-anchor="middle">${esc(item)}</text>`
      );
      x += BOX_W + GAP_X;
    }
  });
  y += h;
}

// 页脚：20 周路线
const footerY = y + 28;
parts.push(`<rect x="${MARGIN}" y="${footerY}" width="${W - MARGIN * 2}" height="74" rx="12" fill="#f1f5f9" stroke="#e2e8f0"/>`);
parts.push(
  `<text x="${MARGIN + 18}" y="${footerY + 26}" font-size="12.5" fill="#475569">20 周路线：W1–W4 地基 → W5–W7 RAG 工程化 → W8–W13 Agent → W14–W15 Java 集成</text>`
);
parts.push(
  `<text x="${MARGIN + 18}" y="${footerY + 50}" font-size="12.5" fill="#94a3b8">读图方法：先认层，再看层间流动，最后把自己现在的位置标上去</text>`
);

const height = footerY + 74 + 24;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${height}" viewBox="0 0 ${W} ${height}" font-family="'PingFang SC','Microsoft YaHei','Noto Sans SC',system-ui,sans-serif">
${parts.join('\n')}
</svg>
`;

fs.writeFileSync('docs/public/ai-map.svg', svg);
console.log(`✅ docs/public/ai-map.svg  ${W}x${height}`);

