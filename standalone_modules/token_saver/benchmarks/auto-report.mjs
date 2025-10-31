#!/usr/bin/env node
// Example cron job (every Monday 10:00):
// 0 10 * * MON cd <project-root>/autonomous-evolution-system/standalone_modules/token_saver && npm run report:weekly

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const moduleRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");

function run(cmd, args, cwd) {
  const res = spawnSync(cmd, args, { cwd, stdio: "inherit", shell: process.platform === "win32" });
  if (res.status !== 0) process.exit(res.status || 1);
}

// 1) Run benchmarks and report generation
run("npm", ["run", "bench:save"], moduleRoot);
run("npm", ["run", "bench:report"], moduleRoot);

// 2) Read latest Markdown report
const latestPath = path.join(moduleRoot, "benchmarks", "reports", "latest-report.md");
const latest = fs.readFileSync(latestPath, "utf8");

// 3) Compose weekly report entry
const iso = new Date().toISOString().slice(0,10);
const header = `# 🪙 Weekly Token Optimization Report — ${iso}`;
const entry = `${header}\n\n${latest}\n\n[View full HTML dashboard → benchmarks/reports/index.html]\n\n---\n`;

// 4) Append to weekly_token_report.md at module root
const outPath = path.join(moduleRoot, "weekly_token_report.md");
fs.appendFileSync(outPath, entry, "utf8");

console.log(`Weekly Token Optimization Report updated: ${outPath}`);

