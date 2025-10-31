import { describe, it, expect } from "vitest";
import { stripFillers } from "../src/strip-fillers/engine.js";

describe("strip-fillers", () => {
  it("leaves fenced code untouched", () => {
    const input = "Before\n```\nactually do x\n```\nAfter";
    const res = stripFillers(input, { preset: "standard" });
    expect(res.output).toContain("```\nactually do x\n```");
  });

  it("leaves inline code untouched and guards adverbs adjacent", () => {
    const input = "This is really `doSomething()` fast";
    const res = stripFillers(input, { preset: "standard" });
    expect(res.output).toContain("really `doSomething()`");
  });

  it("does not change valid JSON file", () => {
    const json = '{"a": 1}';
    const res = stripFillers(json, { preset: "aggressive" });
    expect(res.meta.preserved.json).toBe(true);
    expect(res.output).toBe(json);
  });
});

