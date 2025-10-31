import { describe, it, expect } from "vitest";
import { jsonMinify } from "../src/json-minify.js";

describe("json-minify", () => {
  it("minifies JSON", () => {
    const input = '{\n  "a": 1,\n  "b": [1, 2]\n}\n';
    const res = jsonMinify(input);
    expect(res.output).toBe('{"a":1,"b":[1,2]}');
    expect(res.meta.preserved.json).toBe(true);
  });

  it("minifies NDJSON", () => {
    const input = '{"x":1}\n {"y": 2 }\n';
    const res = jsonMinify(input);
    expect(res.output).toBe('{"x":1}\n{"y":2}');
  });

  it("errors on invalid JSON", () => {
    expect(() => jsonMinify('{x:1}')).toThrow(/Invalid JSON/);
  });

  it("errors on invalid NDJSON line with line number", () => {
    const bad = '{"x":1}\n{"y":2}\n{"z":oops}\n';
    expect(() => jsonMinify(bad)).toThrow(/line 3/);
  });

  it("enforces size guard", () => {
    const big = "x".repeat(33 * 1024 * 1024);
    expect(() => jsonMinify(big)).toThrow(/size limit/);
  });
});

