import { normalizeEol } from "./utils/eol.js";
import { normalizeNFC } from "./utils/unicode.js";

export interface JsonMinifyOptions {
  keepEol?: boolean;
  maxBytes?: number; // default 32MB
}

export interface TransformResult {
  output: string;
  meta: { changed: boolean; preserved: { codeBlocks: number; inline: number; json: boolean } };
}

const DEFAULT_MAX = 32 * 1024 * 1024; // 32MB

export function jsonMinify(input: string, opts: JsonMinifyOptions = {}): TransformResult {
  const maxBytes = opts.maxBytes ?? DEFAULT_MAX;
  const { text } = normalizeEol(normalizeNFC(input), !!opts.keepEol);
  if (Buffer.byteLength(text, "utf8") > maxBytes) {
    const err = new Error("Input exceeds size limit");
    // @ts-expect-error brand
    err.code = 1;
    throw err;
  }

  const trimmed = text.trim();
  // NDJSON detection: multiple lines of JSON objects/arrays/primitives
  const isNdjson = trimmed.includes("\n");

  try {
    if (!isNdjson) {
      const parsed = JSON.parse(trimmed);
      const min = JSON.stringify(parsed);
      return {
        output: min,
        meta: { changed: min !== trimmed, preserved: { codeBlocks: 0, inline: 0, json: true } }
      };
    }

    const lines = text.split("\n");
    const out: string[] = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === "") { out.push(""); continue; }
      try {
        const parsed = JSON.parse(line);
        out.push(JSON.stringify(parsed));
      } catch (e) {
        const msg = (e as Error).message || "Invalid JSON";
        const err = new Error(`Invalid NDJSON at line ${i + 1}: ${msg}`);
        // @ts-expect-error brand
        err.code = 2;
        throw err;
      }
    }
    const joined = out.join("\n");
    return { output: joined, meta: { changed: joined !== text, preserved: { codeBlocks: 0, inline: 0, json: true } } };
  } catch (e) {
    if ((e as any)?.code === 2) throw e;
    const message = (e as Error).message || "Invalid JSON";
    const err = new Error(`Invalid JSON: ${message}`);
    // @ts-expect-error brand
    err.code = 2;
    throw err;
  }
}

