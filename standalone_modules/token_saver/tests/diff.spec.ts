import { describe, it, expect } from "vitest";
import { unifiedDiff } from "../src/diff.js";

describe("diff", () => {
  it("produces unified diff with normalized headers", () => {
    const a = "line1\nline2\nline3\n";
    const b = "line1\nline2 changed\nline3\n";
    const d = unifiedDiff("a", a, "b", b);
    expect(d).toMatch(/^--- before/m);
    expect(d).toMatch(/^\+\+\+ after/m);
    expect(d).toMatch(/@@/);
  });
});

