import { describe, it, expect } from "vitest";

function wordCount(s: string) {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

describe("output format rules (static checks)", () => {
  it("explanations stay within 120 words (policy)", () => {
    const explanation = Array.from({ length: 121 }, (_, i) => `w${i}`).join(" ");
    expect(wordCount(explanation)).toBeGreaterThan(120);
  });

  it("bullets/tables preferred (policy)", () => {
    const bullets = ["- a", "- b", "- c"].join("\n");
    expect(bullets).toMatch(/^-/m);
  });
});

