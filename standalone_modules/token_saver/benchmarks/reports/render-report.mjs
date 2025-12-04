#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resultsDir = path.resolve(__dirname, "../results");
const templatesDir = path.resolve(__dirname, "templates");
const outDir = path.resolve(__dirname);

function readJSON(p, fallback) {
  try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch { return fallback; }
}
function readLines(p) { try { return fs.readFileSync(p, "utf8").trim().split(/\r?\n/); } catch { return []; } }
function writeText(p, s) { fs.writeFileSync(p, s, "utf8"); }

function asciiBar(value, max = 60) {
  const clamped = Math.max(0, Math.min(100, Number(value) || 0));
  const filled = Math.round((clamped / 100) * max);
  return "\u2593".repeat(filled) + "\u2591".repeat(max - filled);
}

function computeByMode(rows) {
  const by = {};
  for (const r of rows || []) {
    if (!by[r.mode]) by[r.mode] = { total: 0, n: 0 };
    by[r.mode].total += r.percent;
    by[r.mode].n += 1;
  }
  const avgByMode = Object.entries(by).map(([mode, v]) => ({ mode, avg: v.total / v.n }));
  avgByMode.sort((a,b)=>b.avg-a.avg);
  return avgByMode;
}

function bestWorst(rows) {
  const sorted = [...(rows||[])].sort((a,b)=>b.percent-a.percent);
  return { best: sorted[0], worst: sorted[sorted.length-1] };
}

function renderMarkdown(ctx) {
  const t = fs.readFileSync(path.join(templatesDir, "report.md.hbs"), "utf8");
  let md = t
    .replace(/\{\{date\}\}/g, ctx.date)
    .replace(/\{\{avg_savings\}\}/g, String(ctx.avg))
    .replace(/\{\{top_mode\}\}/g, ctx.topMode?.mode || "-")
    .replace(/\{\{top_mode_savings\}\}/g, ctx.topMode ? ctx.topMode.avg.toFixed(1) : "0.0")
    .replace(/\{\{run_count\}\}/g, String(ctx.runCount));
  const trend = ctx.history.map(h => `${h.ts} ${asciiBar(h.average_saved_percent)} ${h.average_saved_percent}%`).join("\n\n");
  md = md.replace("{{ascii_trend}}", trend || "(no history)");
  return md;
}

function renderHTML(ctx) {
  const t = fs.readFileSync(path.join(templatesDir, "report.html.hbs"), "utf8");
  const bars = ctx.history.map(h => `<div class=\"row\"><span class=\"ts\">${h.ts}</span><span class=\"bar\" style=\"--p:${h.average_saved_percent}\%\"></span><span class=\"val\">${h.average_saved_percent}%</span></div>`).join("\n");
  const byMode = ctx.byMode.map(m => `<li><b>${m.mode}</b>: ${m.avg.toFixed(1)}%</li>`).join("\n");
  return t
    .replace("{{date}}", ctx.date)
    .replace("{{avg}}", ctx.avg.toFixed(1))
    .replace("{{runCount}}", String(ctx.runCount))
    .replace("{{byMode}}", byMode)
    .replace("{{bars}}", bars);
}

export async function generateReports() {
  const summaryPath = path.join(resultsDir, "summary.json");
  const historyPath = path.join(resultsDir, "history.log");
  const summary = readJSON(summaryPath, { last: null, history: [] });
  const history = summary.history || [];
  const lastRows = summary.last_rows || [];
  const byMode = computeByMode(lastRows);
  const avg = summary.last?.average_saved_percent || 0;
  const ctx = {
    date: new Date().toISOString().slice(0,10),
    avg,
    runCount: history.length,
    byMode,
    topMode: byMode[0],
    history
  };

  const md = renderMarkdown(ctx);
  const html = renderHTML(ctx);
  writeText(path.join(outDir, "latest-report.md"), md);
  writeText(path.join(outDir, "index.html"), html);
}

if (import.meta.url === `file://${__filename}`) {
  generateReports().catch(e => { console.error(e?.stack || String(e)); process.exit(1); });
}

