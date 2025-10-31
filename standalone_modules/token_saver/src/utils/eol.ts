export type EOL = "\n" | "\r\n" | "\r";

export function detectEol(text: string): EOL {
  const idx = text.indexOf("\n");
  if (idx === -1) return text.indexOf("\r") !== -1 ? "\r" : "\n";
  return text[idx - 1] === "\r" ? "\r\n" : "\n";
}

export function normalizeEol(text: string, keepEol: boolean): { text: string; eol: EOL } {
  if (!text) return { text, eol: "\n" };
  const original = detectEol(text);
  if (keepEol) return { text, eol: original };
  const unified = text.replace(/\r\n?|\n/g, "\n");
  return { text: unified, eol: "\n" };
}

