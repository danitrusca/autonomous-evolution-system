// src/utils/io.ts
import fs from "fs";
import path from "path";
function readStdinSync() {
  const fd = 0;
  try {
    if (fs.fstatSync(fd).isFIFO() || fs.fstatSync(fd).isFile()) {
      return fs.readFileSync(fd, "utf8");
    }
  } catch {
  }
  return "";
}
function readFileText(p) {
  return fs.readFileSync(p, "utf8");
}
function writeFileText(p, data) {
  const dir = path.dirname(p);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(p, data, "utf8");
}

// src/estimators/heuristic.ts
var CHAR_PER_TOKEN = {
  "gpt-4o-mini": 4,
  "gpt-4.1": 3.7,
  "claude-3.5": 3.8,
  "gemini-1.5": 3.9,
  "generic": 4
};
function estimateTokensHeuristic(text, opts = {}) {
  const model = opts.model && CHAR_PER_TOKEN[opts.model] ? opts.model : "generic";
  const chars = text.length;
  const ratio = CHAR_PER_TOKEN[model];
  let tokens = Math.ceil(chars / ratio);
  let note;
  if (opts.diffHeuristicBump) {
    tokens = Math.ceil(tokens * 1.15);
    note = "Heuristic \u2013 Code Context";
  }
  return { chars, tokens, model, note };
}

// src/utils/eol.ts
function detectEol(text) {
  const idx = text.indexOf("\n");
  if (idx === -1) return text.indexOf("\r") !== -1 ? "\r" : "\n";
  return text[idx - 1] === "\r" ? "\r\n" : "\n";
}
function normalizeEol(text, keepEol) {
  if (!text) return { text, eol: "\n" };
  const original = detectEol(text);
  if (keepEol) return { text, eol: original };
  const unified = text.replace(/\r\n?|\n/g, "\n");
  return { text: unified, eol: "\n" };
}

// src/utils/unicode.ts
function normalizeNFC(text) {
  return text.normalize("NFC");
}

// src/json-minify.ts
var DEFAULT_MAX = 32 * 1024 * 1024;
function jsonMinify(input, opts = {}) {
  const maxBytes = opts.maxBytes ?? DEFAULT_MAX;
  const { text } = normalizeEol(normalizeNFC(input), !!opts.keepEol);
  if (Buffer.byteLength(text, "utf8") > maxBytes) {
    const err = new Error("Input exceeds size limit");
    err.code = 1;
    throw err;
  }
  const trimmed = text.trim();
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
    const out = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === "") {
        out.push("");
        continue;
      }
      try {
        const parsed = JSON.parse(line);
        out.push(JSON.stringify(parsed));
      } catch (e) {
        const msg = e.message || "Invalid JSON";
        const err = new Error(`Invalid NDJSON at line ${i + 1}: ${msg}`);
        err.code = 2;
        throw err;
      }
    }
    const joined = out.join("\n");
    return { output: joined, meta: { changed: joined !== text, preserved: { codeBlocks: 0, inline: 0, json: true } } };
  } catch (e) {
    if (e?.code === 2) throw e;
    const message = e.message || "Invalid JSON";
    const err = new Error(`Invalid JSON: ${message}`);
    err.code = 2;
    throw err;
  }
}

// src/diff.ts
import { createTwoFilesPatch } from "diff";
function unifiedDiff(beforeName, before, afterName, after, opts = {}) {
  const a = normalizeEol(normalizeNFC(before), !!opts.keepEol).text;
  const b = normalizeEol(normalizeNFC(after), !!opts.keepEol).text;
  const patch = createTwoFilesPatch("before", "after", a, b, void 0, void 0, { context: 3 });
  return patch.replace(/^--- .*/m, "--- before").replace(/^\+\+\+ .*/m, "+++ after");
}

// src/strip-fillers/presets.ts
function getPresetPatterns(preset) {
  const base = [
    [/\bin order to\b/gi, "to"],
    [/\bdue to the fact that\b/gi, "because"],
    [/\bit'?s important to note( that)?\b/gi, ""],
    [/\bat the end of the day\b/gi, ""],
    [/^\s*I(?:\s+personally)?\s+think(?:\s+that)?\b/gi, ""]
  ];
  const standard = [
    [/\bbasically\b,?\s*/gi, ""],
    [/\bactually\b,?\s*/gi, ""],
    [/\bsimply\b,?\s*/gi, ""],
    [/\bin fact\b,?\s*/gi, ""],
    [/\bneedless to say\b,?\s*/gi, ""],
    [/\bas you can see\b,?\s*/gi, ""],
    [/\bin a nutshell\b,?\s*/gi, ""],
    [/\bfor the most part\b,?\s*/gi, ""],
    [/\bthe truth is(?: that)?\b,?\s*/gi, ""],
    [/\bkind of\b\s*/gi, ""],
    [/\bsort of\b\s*/gi, ""]
  ];
  const aggressive = [
    [/\bobviously\b,?\s*/gi, ""],
    [/\bliterally\b,?\s*/gi, ""],
    [/\bin my opinion\b,?\s*/gi, ""],
    [/\bto be honest\b,?\s*/gi, ""],
    [/\bIMO\b,?\s*/g, ""],
    [/\bTBH\b,?\s*/g, ""]
  ];
  if (preset === "conservative") return base;
  if (preset === "standard") return base.concat(standard);
  return base.concat(standard, aggressive);
}

// src/strip-fillers/engine.ts
function isLikelyJson(text) {
  const t = text.trim();
  if (!(t.startsWith("{") || t.startsWith("["))) return false;
  try {
    JSON.parse(t);
    return true;
  } catch {
    return false;
  }
}
function stripFillers(input, opts = {}) {
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
  const out = [];
  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      if (inFence) fenceCount++;
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }
    const segments = [];
    const parts = line.split(/(`[^`]*`)/g);
    for (let i = 0; i < parts.length; i++) {
      const seg = parts[i];
      const isInline = seg.startsWith("`") && seg.endsWith("`");
      if (isInline) {
        segments.push(seg);
        inlineCount++;
        continue;
      }
      let s = seg;
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

// src/cli.ts
function parseArgs(argv) {
  const opts = {};
  const args = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const [k, v] = a.slice(2).split("=");
      opts[k] = v ?? true;
    } else if (a.startsWith("-")) {
      opts[a.slice(1)] = true;
    } else {
      args.push(a);
    }
  }
  return { cmd: args.shift() || "", args, opts };
}
function outOrStdout(text, out) {
  if (out && typeof out === "string") writeFileText(out, text);
  else process.stdout.write(text);
}
async function main(argv = process.argv.slice(2)) {
  const { cmd, args, opts } = parseArgs(argv);
  if (opts.v || opts.version) {
    const pkg = await import("./package-6FOLK36W.js").catch(() => ({ default: { version: "0.0.0" } }));
    console.log(pkg.default.version);
    return 0;
  }
  try {
    if (cmd === "json-minify") {
      const input = args[0] ? readFileText(args[0]) : readStdinSync();
      const res = jsonMinify(input, { keepEol: !!opts["keep-eol"], maxBytes: void 0 });
      outOrStdout(res.output + "\n", opts.out);
      if (opts.report) {
        const before = estimateTokensHeuristic(input);
        const after = estimateTokensHeuristic(res.output);
        console.error(JSON.stringify({ mode: "json-minify", before, after }));
      }
      return 0;
    }
    if (cmd === "diff") {
      const before = args[0] ? readFileText(args[0]) : readStdinSync();
      const after = args[1] ? readFileText(args[1]) : "";
      const patch = unifiedDiff("before", before, "after", after, { keepEol: !!opts["keep-eol"] });
      outOrStdout(patch, opts.out);
      if (opts.report) {
        const b = estimateTokensHeuristic(before, { diffHeuristicBump: true });
        const a = estimateTokensHeuristic(after, { diffHeuristicBump: true });
        console.error(JSON.stringify({ mode: "diff", before: b, after: a }));
      }
      return 0;
    }
    if (cmd === "strip-fillers") {
      const input = args[0] ? readFileText(args[0]) : readStdinSync();
      const preset = opts.preset || "conservative";
      const res = stripFillers(input, { preset, keepEol: !!opts["keep-eol"] });
      outOrStdout(res.output + "\n", opts.out);
      if (opts.report) {
        const before = estimateTokensHeuristic(input);
        const after = estimateTokensHeuristic(res.output);
        console.error(JSON.stringify({ mode: "strip-fillers", before, after }));
      }
      return 0;
    }
    console.error("Usage: token-saver <json-minify|diff|strip-fillers> [args] [--report --model --keep-eol --out]");
    return 1;
  } catch (e) {
    const msg = e.message || String(e);
    const code = e?.code === 2 ? 2 : 1;
    console.error(msg);
    return code;
  }
}
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("/bin/token-saver.js")) {
  main().then((code) => process.exit(code)).catch((err) => {
    console.error(err?.message ?? String(err));
    process.exit(1);
  });
}

export {
  estimateTokensHeuristic,
  jsonMinify,
  unifiedDiff,
  stripFillers,
  main
};
//# sourceMappingURL=chunk-R3DIJBDB.js.map