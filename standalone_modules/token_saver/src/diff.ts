import { createTwoFilesPatch } from "diff";
import { normalizeEol } from "./utils/eol.js";
import { normalizeNFC } from "./utils/unicode.js";

export interface DiffOptions {
  keepEol?: boolean;
}

export function unifiedDiff(beforeName: string, before: string, afterName: string, after: string, opts: DiffOptions = {}): string {
  const a = normalizeEol(normalizeNFC(before), !!opts.keepEol).text;
  const b = normalizeEol(normalizeNFC(after), !!opts.keepEol).text;
  const patch = createTwoFilesPatch("before", "after", a, b, undefined, undefined, { context: 3 });
  // Normalize headers
  return patch
    .replace(/^--- .*/m, "--- before")
    .replace(/^\+\+\+ .*/m, "+++ after");
}

