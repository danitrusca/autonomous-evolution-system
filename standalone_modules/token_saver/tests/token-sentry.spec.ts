import { describe, it, expect } from "vitest";
import { spawnSync } from "node:child_process";
import path from "node:path";
import fs from "node:fs";

const repoRoot = path.resolve(__dirname, "../../../..");
const script = path.join(repoRoot, "scripts", "token-sentry.mjs");

describe("token-sentry", () => {
  it("suggests actions when over budget", () => {
    const big = "x".repeat(40000);
    const res = spawnSync(process.execPath, [script, "--enforce"], { input: big, encoding: "utf8" });
    expect(res.status).toBe(3);
    expect(res.stderr).toMatch(/"suggestions"/);
  });

  it("marks diff-only on code edit flag", () => {
    const txt = "line1\nline2\n";
    const res = spawnSync(process.execPath, [script, "--code-edit"], { input: txt, encoding: "utf8" });
    expect(res.status).toBe(0);
    expect(res.stderr).toMatch(/"rules":\[.*diff-only/);
  });
});

