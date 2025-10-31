import { normalizeEol } from "../utils/eol.js";
import { normalizeNFC } from "../utils/unicode.js";
import { getPresetPatterns, Preset } from "./presets.js";

export interface StripOptions {
  preset?: Preset;
  keepEol?: boolean;
}

export interface StripResult {
  output: string;
  meta: { changed: boolean; preserved: { codeBlocks: number; inline: number; json: boolean } };
}

function isLikelyJson(text: string): boolean {
  const t = text.trim();
  if (!(t.startsWith("{") || t.startsWith("["))) return false;
  try { JSON.parse(t); return true; } catch { return false; }
}

// Three-state scanner: TEXT / FENCED / INLINE
export function stripFillers(input: string, opts: StripOptions = {}): StripResult {
  const { text } = normalizeEol(normalizeNFC(input), !!opts.keepEol);
  if (isLikelyJson(text)) {
    return { output: text, meta: { changed: false, preserved: { codeBlocks: 0, inline: 0, json: true } } };
  }
  const preset = opts.preset ?? "conservative";
  const patterns = getPresetPatterns(preset);

  const lines = text.split("\n");
  let inFence = false;
  let fenceCount = 0;
  let inlineCount = 0;
  const out: string[] = [];

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      if (inFence) fenceCount++;
      out.push(line);
      continue;
    }
    if (inFence) { out.push(line); continue; }

    // Protect inline `code`
    const segments: string[] = [];
    const parts = line.split(/(`[^`]*`)/g);
    for (let i = 0; i < parts.length; i++) {
      const seg = parts[i];
      const isInline = seg.startsWith("`") && seg.endsWith("`");
      if (isInline) { segments.push(seg); inlineCount++; continue; }
      let s = seg;
      // Adverb adjacency guard near inline code: preserve just/really/very if next to inline span
      const left = i > 0 && parts[i - 1].startsWith("`");
      const right = i < parts.length - 1 && parts[i + 1].startsWith("`");
      if (!(left || right)) {
        for (const [re, rep] of patterns) {
          s = s.replace(re, rep);
        }
      }
      segments.push(s);
    }
    out.push(segments.join(""));
  }

  const result = out.join("\n");
  return {
    output: result,
    meta: { changed: result !== text, preserved: { codeBlocks: fenceCount, inline: inlineCount, json: false } }
  };
}

