#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { estimateTokensHeuristic, jsonMinify, stripFillers } from "../dist/index.js";

function readStdin() {
  try {
    // Always attempt to read fd 0; on interactive TTY this returns empty quickly
    return fs.readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

function summarizeLong(text) {
  const lines = text.split("\n");
  if (lines.length <= 200) return { text, pruned: false, summary: [] };
  // Simple 3-bullet summary using head/mid/tail cues
  const head = lines.slice(0, 5).join(" ").slice(0, 160);
  const mid = lines.slice(Math.floor(lines.length / 2), Math.floor(lines.length / 2) + 5).join(" ").slice(0, 160);
  const tail = lines.slice(-5).join(" ").slice(0, 160);
  const bullets = [
    `- head: ${head}`,
    `- mid: ${mid}`,
    `- tail: ${tail}`
  ];
  const minimal = bullets.join("\n");
  return { text: minimal, pruned: true, summary: bullets };
}

const budget = Number(process.env.TOKEN_BUDGET || 3500);
const enforce = process.argv.includes("--enforce");
const logBench = process.argv.includes("--log-bench");
const isCodeEdit = process.argv.includes("--code-edit"); // signal from caller
const sessionFile = path.join(os.tmpdir(), "token_sentry_session_savings.json");
function readSession() {
  try { return JSON.parse(fs.readFileSync(sessionFile, "utf8")); } catch { return { saved_tokens: 0 }; }
}
function writeSession(data) {
  try { fs.writeFileSync(sessionFile, JSON.stringify(data), "utf8"); } catch {}
}

const input = readStdin();
const estBefore = estimateTokensHeuristic(input);
let buf = input;
let rules = [];

// Prune and summarize long logs
{
  const r = summarizeLong(buf);
  if (r.pruned) { buf = r.text; rules.push("prune"); }
}

// Minimize: JSON if valid else conservative strip-fillers
try {
  const min = jsonMinify(buf);
  buf = min.output;
  rules.push("minify");
} catch {
  const res = stripFillers(buf, { preset: "standard" });
  buf = res.output;
  if (res.meta.changed) rules.push("strip-fillers");
}

// If code edit: prefer diff-only (caller provides before/after upstream); here we mark rule
if (isCodeEdit && !rules.includes("diff-only")) rules.push("diff-only");

const estAfter = estimateTokensHeuristic(buf);
const saved = Math.max(0, estBefore.tokens - estAfter.tokens);
const session = readSession();
session.saved_tokens += saved;
writeSession(session);

const report = {
  budget,
  tokens_before: estBefore.tokens,
  tokens_after: estAfter.tokens,
  percent_saved: estBefore.tokens ? Math.round((saved / estBefore.tokens) * 100) : 0,
  saved_tokens: saved,
  session_saved_tokens: session.saved_tokens,
  rules
};

if (enforce && estAfter.tokens > budget) {
  const warn = {
    decision: "block",
    suggestions: [
      "[1] Summarize history",
      "[2] Collapse tool output",
      "[3] Switch to diff-only"
    ],
    report
  };
  console.error(JSON.stringify(warn));
  // Colorized short summary
  const GRN = "\x1b[32m", YEL = "\x1b[33m", RST = "\x1b[0m";
  const pct = report.percent_saved;
  console.error(`${YEL}Tokens:${RST} before ${estBefore.tokens} | after ${estAfter.tokens} | saved ${saved} (${pct}%)`);
  console.error(`${GRN}Rules:${RST} ${rules.join(" • ") || "none"}`);
  process.exit(3);
}

process.stdout.write(buf);
console.error(JSON.stringify({ decision: "allow", report }));
// Colorized short summary
{
  const GRN = "\x1b[32m", YEL = "\x1b[33m", RST = "\x1b[0m";
  const pct = report.percent_saved;
  console.error(`${YEL}Tokens:${RST} before ${estBefore.tokens} | after ${estAfter.tokens} | saved ${saved} (${pct}%)`);
  console.error(`${GRN}Rules:${RST} ${rules.join(" • ") || "none"}`);
}

// Optional: append to benchmarks history
if (logBench) {
  try {
    const benchDir = path.join(path.dirname(new URL(import.meta.url).pathname), "../benchmarks/results");
    const histPath = path.resolve(benchDir, "history.log");
    const ts = new Date().toISOString().slice(0,10);
    fs.mkdirSync(path.dirname(histPath), { recursive: true });
    fs.appendFileSync(histPath, `${ts},${report.percent_saved}` + "\n", "utf8");
  } catch {}
}












