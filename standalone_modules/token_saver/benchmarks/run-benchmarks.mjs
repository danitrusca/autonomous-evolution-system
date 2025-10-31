#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { jsonMinify, stripFillers, unifiedDiff, estimateTokensHeuristic } from "../dist/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const fixturesDir = path.join(__dirname, "fixtures");
const resultsDir = path.join(__dirname, "results");
fs.mkdirSync(resultsDir, { recursive: true });

function read(p) { return fs.readFileSync(p, "utf8"); }
function writeJSON(p, o) { fs.writeFileSync(p, JSON.stringify(o, null, 2) + "\n", "utf8"); }
function append(p, line) { fs.appendFileSync(p, line + "\n", "utf8"); }

function parseArgs(argv) {
  const opts = { model: "gpt-4o-mini", preset: "standard", save: false, reportMd: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--save") opts.save = true;
    else if (a === "--report-md") opts.reportMd = true;
    else if (a.startsWith("--model")) opts.model = a.split("=")[1] || argv[++i];
    else if (a.startsWith("--preset")) opts.preset = a.split("=")[1] || argv[++i];
  }
  return opts;
}

function measure(text, transformed, model, rules) {
  const b = estimateTokensHeuristic(text, /@@|\+\+\+|---/.test(transformed) ? { diffHeuristicBump: true, model } : { model });
  const a = estimateTokensHeuristic(transformed, /@@|\+\+\+|---/.test(transformed) ? { diffHeuristicBump: true, model } : { model });
  const raw = b.tokens ? ((b.tokens - a.tokens) / b.tokens) * 100 : 0;
  const percent = Math.max(0, Math.min(100, Math.round(raw * 10) / 10));
  return { before: b, after: a, percent, rules };
}

function benchFile(file, opts) {
  const p = path.join(fixturesDir, file);
  const text = read(p);
  const rows = [];

  // json-minify
  try {
    const jm = jsonMinify(text);
    const m = measure(text, jm.output, opts.model, ["minify"]);
    rows.push({ file, mode: "json-minify", ...m });
  } catch {}

  // strip-fillers
  {
    const sf = stripFillers(text, { preset: opts.preset });
    const m = measure(text, sf.output, opts.model, ["strip-fillers"]);
    rows.push({ file, mode: "strip-fillers", ...m });
  }

  // diff
  if (file.startsWith("diff-example-")) {
    // handled in pair below
  }

  return rows;
}

function benchDiffPair(beforeFile, afterFile, opts) {
  const before = read(path.join(fixturesDir, beforeFile));
  const after = read(path.join(fixturesDir, afterFile));
  const patch = unifiedDiff("before", before, "after", after, {});
  // For diff, compare patch vs sending full 'after'
  const aFull = estimateTokensHeuristic(after, { diffHeuristicBump: true, model: opts.model });
  const aPatch = estimateTokensHeuristic(patch, { diffHeuristicBump: true, model: opts.model });
  const raw = aFull.tokens ? ((aFull.tokens - aPatch.tokens) / aFull.tokens) * 100 : 0;
  const percent = Math.max(0, Math.min(100, Math.round(raw * 10) / 10));
  return [{ file: "diff-example", mode: "diff", before: aFull, after: aPatch, percent, rules: ["diff-only"] }];
}

function printTable(rows) {
  const pad = (s, n) => String(s).padEnd(n);
  console.log("File                Mode           Saved%   Tokens_Before  Tokens_After  Notes");
  for (const r of rows) {
    const notes = r.rules.join(",");
    console.log(
      `${pad(r.file,20)} ${pad(r.mode,14)} ${pad(r.percent.toFixed(1)+"%",7)} ${pad(r.before.tokens,14)} ${pad(r.after.tokens,12)} ${notes}`
    );
  }
}

function aggregate(rows) {
  const percents = rows.map(r => r.percent);
  const avg = percents.length ? Math.round((percents.reduce((a,b)=>a+b,0)/percents.length)*10)/10 : 0;
  return { average_saved_percent: avg };
}

function renderAsciiHistory(history) {
  for (const h of history.slice(-10)) {
    const bars = Math.max(0, Math.round(h.average_saved_percent / 2));
    console.log(`${h.ts} ${"\u2588".repeat(bars)} ${h.average_saved_percent}%`);
  }
}

async function main() {
  const opts = parseArgs(process.argv);
  const fixtures = ["verbose.txt", "large.json", "mixed.md", "diff-example-before.txt", "diff-example-after.txt"];
  const rows = [];
  for (const f of fixtures) {
    if (f.startsWith("diff-example-")) continue;
    rows.push(...benchFile(f, opts));
  }
  rows.push(...benchDiffPair("diff-example-before.txt", "diff-example-after.txt", opts));

  printTable(rows);
  console.log("\u2500".repeat(73));
  const agg = aggregate(rows);
  console.log(`TOTAL (avg)                        ${agg.average_saved_percent}%`);

  if (opts.save) {
    const summaryPath = path.join(resultsDir, "summary.json");
    const histPath = path.join(resultsDir, "history.log");
    const entry = { ts: new Date().toISOString().slice(0,10), average_saved_percent: agg.average_saved_percent };
    let summary = { last: entry, history: [] };
    try { summary = JSON.parse(fs.readFileSync(summaryPath, "utf8")); } catch {}
    summary.last = entry;
    summary.history = summary.history || [];
    summary.history.push(entry);
    summary.last_rows = rows;
    writeJSON(summaryPath, summary);
    append(histPath, `${entry.ts},${entry.average_saved_percent}`);
    console.log();
    renderAsciiHistory(summary.history);
    // Generate reports
    const { generateReports } = await import("./reports/render-report.mjs");
    await generateReports();
    console.log("\nReport generated: benchmarks/reports/latest-report.md");
    console.log("Open HTML dashboard: benchmarks/reports/index.html");
  }

  if (opts.reportMd && !opts.save) {
    // Update last_rows with current rows (no history append)
    const summaryPath = path.join(resultsDir, "summary.json");
    let summary = {};
    try { summary = JSON.parse(fs.readFileSync(summaryPath, "utf8")); } catch { summary = { history: [] }; }
    summary.last_rows = rows;
    summary.last = { ts: new Date().toISOString().slice(0,10), average_saved_percent: agg.average_saved_percent };
    writeJSON(summaryPath, summary);
    const { generateReports } = await import("./reports/render-report.mjs");
    await generateReports();
    console.log("\nReport generated: benchmarks/reports/latest-report.md");
  }
}

main().catch(e => { console.error(e?.stack || String(e)); process.exit(1); });

