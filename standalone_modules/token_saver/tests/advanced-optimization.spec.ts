import { describe, it, expect } from "vitest";
import { optimizeAdvanced } from "../src/optimizers/advanced-engine.js";
import { applySemanticCompression } from "../src/optimizers/semantic-compression.js";
import { compressWhitespace } from "../src/optimizers/whitespace-compression.js";
import { removeDuplicates } from "../src/optimizers/duplicate-detection.js";
import { detectContentType } from "../src/optimizers/content-type-detection.js";
import { hasOptimizationPotential } from "../src/optimizers/cache.js";

describe("Advanced Optimization", () => {
  it("applies semantic compression", () => {
    const input = "We have the ability to perform an analysis of the situation at this point in time.";
    const result = applySemanticCompression(input);
    expect(result.replacements).toBeGreaterThan(0);
    expect(result.output.length).toBeLessThan(input.length);
    expect(result.output).toContain("can");
    expect(result.output).toContain("analyze");
    expect(result.output).toContain("now");
  });

  it("compresses whitespace while protecting code", () => {
    const input = "Text with    multiple   spaces.\n\n\n\nAnd   tabs\t\t\there.\n```\ncode block\n  with spaces\n```";
    const result = compressWhitespace(input, true);
    expect(result.compressed).toBe(true);
    expect(result.output).toContain("```");
    expect(result.output).toContain("code block");
    // Code block should preserve spaces
    expect(result.output.split("```")[1]).toContain("  with spaces");
  });

  it("removes duplicate sentences", () => {
    const input = "This is a sentence. This is another sentence. This is a sentence. Final sentence.";
    const result = removeDuplicates(input);
    expect(result.duplicatesRemoved).toBeGreaterThan(0);
    const sentences = result.output.split(/[.!?]+/).filter(s => s.trim().length > 0);
    expect(sentences.length).toBeLessThan(4);
  });

  it("detects content types correctly", () => {
    const jsonInput = '{"key": "value"}';
    const jsonResult = detectContentType(jsonInput);
    expect(jsonResult.type).toBe("json");
    expect(jsonResult.confidence).toBeGreaterThan(0.8);

    const codeInput = "function test() {\n  return true;\n}";
    const codeResult = detectContentType(codeInput);
    expect(codeResult.type).toBe("code");

    const proseInput = "This is a paragraph with natural language. It contains multiple sentences.";
    const proseResult = detectContentType(proseInput);
    expect(proseResult.type).toBe("prose");
  });

  it("optimizes advanced with all strategies", () => {
    // Use unique text to avoid cache hits
    const input = `It is important to note that basically, at this point in time ${Date.now()}, 
we have the ability to perform an analysis of the situation. 
The thing is, what I mean is that basically we can actually 
analyze it. You know, I mean, it's basically obvious that 
we can do this analysis.

This is a duplicate sentence. This is a duplicate sentence.`;

    const result = optimizeAdvanced(input, {
      preset: "ultra",
      enableSemanticCompression: true,
      enableWhitespaceCompression: true,
      enableDuplicateRemoval: true,
      enableContextOptimization: false // Disable to test other strategies
    });

    // Should have some savings - check if strategies were applied
    expect(result.strategies.length).toBeGreaterThan(0);
    // If strategies were applied, we should have savings
    if (result.strategies.length > 0 && !result.strategies.includes("cached")) {
      expect(result.savingsPercent).toBeGreaterThan(0);
      expect(result.output.length).toBeLessThanOrEqual(input.length);
    }
  });

  it("stops when target savings reached", () => {
    const input = "basically ".repeat(100) + "actually ".repeat(100);
    const result = optimizeAdvanced(input, {
      targetSavingsPercent: 30,
      preset: "ultra"
    });

    expect(result.savingsPercent).toBeGreaterThanOrEqual(25); // Should be close to target
  });

  it("detects optimization potential", () => {
    const optimizable = "basically we can actually do this";
    expect(hasOptimizationPotential(optimizable)).toBe(true);

    const notOptimizable = "Simple clean text without fillers.";
    expect(hasOptimizationPotential(notOptimizable)).toBe(false);
  });

  it("preserves code blocks", () => {
    const input = `Before code
\`\`\`
function test() {
  return true;
}
\`\`\`
After code`;

    const result = optimizeAdvanced(input);
    expect(result.output).toContain("```");
    expect(result.output).toContain("function test()");
    expect(result.output).toContain("return true");
  });
});

