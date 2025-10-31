import { describe, it, expect } from "vitest";
import { jsonMinify } from "../src/json-minify.js";
import { stripFillers } from "../src/strip-fillers/engine.js";
import { unifiedDiff } from "../src/diff.js";

describe("regressions", () => {
  it("json-minify preserves semantics", () => {
    const src = '{\n  "a": 1,\n  "b": [1, 2]\n}\n';
    const res = jsonMinify(src);
    expect(JSON.parse(res.output)).toEqual({ a: 1, b: [1,2] });
  });

  it("strip-fillers preserves fenced and inline code", () => {
    const src = "Here `fn()` is used\n```\nactually do x\n```\n";
    const res = stripFillers(src, { preset: "standard" });
    expect(res.output).toContain("`fn()`");
    expect(res.output).toContain("```\nactually do x\n```");
  });

  it("diff output is patchable shape (headers + hunks)", () => {
    const a = "line1\nline2\n";
    const b = "line1\nline2 changed\n";
    const d = unifiedDiff("a", a, "b", b);
    expect(d).toMatch(/^--- before/m);
    expect(d).toMatch(/^\+\+\+ after/m);
    expect(d).toMatch(/@@/);
  });

  it("saves ≥20% on verbose prose (fixture)", () => {
    const verbose = "This is basically actually very simple in fact and simply verbose.";
    const res = stripFillers(verbose, { preset: "standard" });
    const before = verbose.length;
    const after = res.output.length;
    const saved = (before - after) / before;
    expect(saved).toBeGreaterThanOrEqual(0.2);
  });
});

