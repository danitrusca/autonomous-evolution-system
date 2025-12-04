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
  const ultra = [
    [/\bwhat I mean is\b/gi, ""],
    [/\bthe thing is\b/gi, ""],
    [/\bwhat I'm saying is\b/gi, ""],
    [/\bif you will\b/gi, ""],
    [/\bas it were\b/gi, ""],
    [/\byou know\b/gi, ""],
    [/\bI mean\b/gi, ""],
    [/\byou see\b/gi, ""],
    [/\bof course\b/gi, ""],
    [/\bas you know\b/gi, ""],
    [/\bit likely that\b/gi, "likely"],
    [/\bfor all intents and purposes\b/gi, ""],
    [/\bmake sure to\b/gi, "must"],
    [/\bkeep in mind that\b/gi, ""],
    [/\bwhen it comes to\b/gi, "for"],
    [/\bprior to\b/gi, "before"],
    [/\bsubsequent to\b/gi, "after"],
    [/\bin the event that\b/gi, "if"],
    [/\bwith regard to\b/gi, "about"],
    [/\bin terms of\b/gi, "for"],
    [/\bin the case of\b/gi, "for"],
    [/\bin the context of\b/gi, "in"],
    [/\bwith respect to\b/gi, "for"],
    [/\bin relation to\b/gi, "about"],
    [/\bas far as\b/gi, "for"],
    [/\bmore often than not\b/gi, "usually"],
    [/\bat this point in time\b/gi, "now"],
    [/\bin the near future\b/gi, "soon"],
    [/\bat the present time\b/gi, "now"]
  ];
  if (preset === "conservative") return base;
  if (preset === "standard") return base.concat(standard);
  if (preset === "aggressive") return base.concat(standard, aggressive);
  return base.concat(standard, aggressive, ultra);
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

// src/optimizers/semantic-compression.ts
var semanticReplacements = [
  // Verb replacements
  [/\bperform an analysis of\b/gi, "analyze"],
  [/\bconduct a review of\b/gi, "review"],
  [/\bcarry out an examination of\b/gi, "examine"],
  [/\bundertake a study of\b/gi, "study"],
  [/\bcarry out\b/gi, "do"],
  [/\bperform\b/gi, "do"],
  [/\bconduct\b/gi, "do"],
  // Ability phrases
  [/\bhave the ability to\b/gi, "can"],
  [/\bis able to\b/gi, "can"],
  [/\bis capable of\b/gi, "can"],
  [/\bis in a position to\b/gi, "can"],
  [/\bhas the capacity to\b/gi, "can"],
  // Time phrases
  [/\bin the process of\b/gi, ""],
  [/\bat this point in time\b/gi, "now"],
  [/\bat the present time\b/gi, "now"],
  [/\bat this moment in time\b/gi, "now"],
  [/\bin the near future\b/gi, "soon"],
  [/\bat a later date\b/gi, "later"],
  // Prepositional phrases
  [/\bby means of\b/gi, "via"],
  [/\bin the vicinity of\b/gi, "near"],
  [/\bfor the purpose of\b/gi, "for"],
  [/\bin a timely manner\b/gi, "quickly"],
  [/\bwith the exception of\b/gi, "except"],
  [/\bin the case of\b/gi, "for"],
  [/\bin the context of\b/gi, "in"],
  [/\bwith respect to\b/gi, "for"],
  [/\bin relation to\b/gi, "about"],
  [/\bas far as\b/gi, "for"],
  // Redundant phrases
  [/\bmore often than not\b/gi, "usually"],
  [/\bthe majority of\b/gi, "most"],
  [/\ba number of\b/gi, "many"],
  [/\ba lot of\b/gi, "many"],
  [/\ba great deal of\b/gi, "much"],
  [/\ba large amount of\b/gi, "much"],
  [/\ba small number of\b/gi, "few"],
  // Unnecessary qualifiers
  [/\bvery much\b/gi, "much"],
  [/\bquite a lot\b/gi, "many"],
  [/\brather than\b/gi, "than"],
  // Common verbose constructions
  [/\bit is worth noting that\b/gi, ""],
  [/\bit should be noted that\b/gi, ""],
  [/\bit is important to remember that\b/gi, ""],
  [/\bit is essential to\b/gi, "must"],
  [/\bit is necessary to\b/gi, "must"],
  [/\bit is required to\b/gi, "must"]
];
function applySemanticCompression(input) {
  let output = input;
  let replacements = 0;
  for (const [pattern, replacement] of semanticReplacements) {
    const before = output;
    output = output.replace(pattern, replacement);
    if (output !== before) {
      replacements++;
    }
  }
  return {
    output,
    replacements
  };
}

// src/optimizers/whitespace-compression.ts
function compressWhitespace(input, protectCode = true) {
  if (!protectCode) {
    const compressed = input.replace(/\n{3,}/g, "\n\n").replace(/[ \t]{2,}/g, " ").replace(/[ \t]+\n/g, "\n").replace(/\n[ \t]+/g, "\n");
    return {
      output: compressed,
      compressed: compressed !== input
    };
  }
  const lines = input.split("\n");
  const result = [];
  let inFence = false;
  let fenceStart = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed.startsWith("```")) {
      if (!inFence) {
        if (result.length > 0) {
          const last = result[result.length - 1];
          result[result.length - 1] = compressLineWhitespace(last);
        }
        fenceStart = result.length;
      }
      inFence = !inFence;
      result.push(line);
      continue;
    }
    if (inFence) {
      result.push(line);
      continue;
    }
    const compressed = compressLineWhitespace(line);
    const protectedLine = protectInlineCode(compressed);
    result.push(protectedLine);
  }
  const final = [];
  let lastWasEmpty = false;
  for (let i = 0; i < result.length; i++) {
    const line = result[i];
    const isEmpty = line.trim().length === 0;
    if (isEmpty && lastWasEmpty) {
      continue;
    }
    final.push(line);
    lastWasEmpty = isEmpty;
  }
  const output = final.join("\n");
  return {
    output,
    compressed: output !== input
  };
}
function compressLineWhitespace(line) {
  return line.replace(/[ \t]{2,}/g, " ").replace(/^[ \t]+/, "").replace(/[ \t]+$/, "");
}
function protectInlineCode(line) {
  const parts = line.split(/(`[^`]*`)/g);
  const result = [];
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith("`") && part.endsWith("`")) {
      result.push(part);
    } else {
      result.push(compressLineWhitespace(part));
    }
  }
  return result.join("");
}

// src/optimizers/duplicate-detection.ts
function removeDuplicateSentences(input) {
  const paragraphs = input.split(/\n\s*\n/);
  const seenSentences = /* @__PURE__ */ new Set();
  const uniqueParagraphs = [];
  let duplicatesRemoved = 0;
  for (const paragraph of paragraphs) {
    const sentences = paragraph.split(/([.!?]+[\s\n])/);
    const uniqueSentences = [];
    for (let i = 0; i < sentences.length; i += 2) {
      const sentence = sentences[i];
      const punctuation = sentences[i + 1] || "";
      if (!sentence || sentence.trim().length === 0) {
        if (punctuation) uniqueSentences.push(punctuation);
        continue;
      }
      const normalized = normalizeSentence(sentence);
      if (normalized.length > 10 && !seenSentences.has(normalized)) {
        seenSentences.add(normalized);
        uniqueSentences.push(sentence + punctuation);
      } else if (normalized.length > 10) {
        duplicatesRemoved++;
      }
    }
    const uniqueParagraph = uniqueSentences.join("");
    if (uniqueParagraph.trim().length > 0) {
      uniqueParagraphs.push(uniqueParagraph);
    }
  }
  return {
    output: uniqueParagraphs.join("\n\n"),
    duplicatesRemoved
  };
}
function removeDuplicateParagraphs(input) {
  const paragraphs = input.split(/\n\s*\n/);
  const seen = /* @__PURE__ */ new Set();
  const unique = [];
  let duplicatesRemoved = 0;
  for (const paragraph of paragraphs) {
    const normalized = normalizeParagraph(paragraph);
    if (normalized.length > 20 && !seen.has(normalized)) {
      seen.add(normalized);
      unique.push(paragraph);
    } else if (normalized.length > 20) {
      duplicatesRemoved++;
    } else {
      unique.push(paragraph);
    }
  }
  return {
    output: unique.join("\n\n"),
    duplicatesRemoved
  };
}
function removeDuplicates(input) {
  const paragraphResult = removeDuplicateParagraphs(input);
  const sentenceResult = removeDuplicateSentences(paragraphResult.output);
  return {
    output: sentenceResult.output,
    duplicatesRemoved: paragraphResult.duplicatesRemoved + sentenceResult.duplicatesRemoved
  };
}
function normalizeSentence(sentence) {
  return sentence.toLowerCase().trim().replace(/[^\w\s]/g, "").replace(/\s+/g, " ");
}
function normalizeParagraph(paragraph) {
  return paragraph.toLowerCase().trim().replace(/\s+/g, " ").replace(/\n+/g, " ");
}

// src/optimizers/content-type-detection.ts
function detectContentType(input) {
  const features = analyzeContentFeatures(input);
  const total = features.codeChars + features.proseChars + features.jsonChars;
  const codePercent = total > 0 ? features.codeChars / total : 0;
  const prosePercent = total > 0 ? features.proseChars / total : 0;
  const jsonPercent = total > 0 ? features.jsonChars / total : 0;
  let type = "mixed";
  let confidence = 0.5;
  if (jsonPercent > 0.8) {
    type = "json";
    confidence = 0.9;
  } else if (features.logPatterns > 5) {
    type = "log";
    confidence = Math.min(0.9, 0.5 + features.logPatterns / 20);
  } else if (codePercent > 0.6) {
    type = "code";
    confidence = Math.min(0.9, 0.5 + codePercent);
  } else if (features.docPatterns > 3 && prosePercent > 0.7) {
    type = "documentation";
    confidence = Math.min(0.85, 0.5 + features.docPatterns / 10);
  } else if (prosePercent > 0.7) {
    type = "prose";
    confidence = Math.min(0.8, 0.5 + prosePercent);
  }
  return {
    type,
    confidence,
    features: {
      codePercent,
      prosePercent,
      jsonPercent,
      logPatterns: features.logPatterns,
      docPatterns: features.docPatterns
    }
  };
}
function analyzeContentFeatures(input) {
  let codeChars = 0;
  let proseChars = 0;
  let jsonChars = 0;
  let logPatterns = 0;
  let docPatterns = 0;
  const trimmed = input.trim();
  if ((trimmed.startsWith("{") || trimmed.startsWith("[")) && trimmed.endsWith("}") || trimmed.endsWith("]")) {
    try {
      JSON.parse(trimmed);
      jsonChars = input.length;
      return { codeChars: 0, proseChars: 0, jsonChars, logPatterns: 0, docPatterns: 0 };
    } catch {
    }
  }
  logPatterns += (input.match(/\d{4}-\d{2}-\d{2}[\sT]\d{2}:\d{2}:\d{2}/g) || []).length;
  logPatterns += (input.match(/\[(ERROR|WARN|INFO|DEBUG|TRACE)\]/gi) || []).length;
  logPatterns += (input.match(/ERROR|WARNING|INFO|DEBUG/gi) || []).length;
  docPatterns += (input.match(/^#{1,6}\s+/gm) || []).length;
  docPatterns += (input.match(/```[\s\S]*?```/g) || []).length;
  docPatterns += (input.match(/^[\s]*[-*+]\s+/gm) || []).length;
  docPatterns += (input.match(/\[.*?\]\(.*?\)/g) || []).length;
  const lines = input.split("\n");
  let inCodeBlock = false;
  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      if (inCodeBlock) codeChars += line.length;
      continue;
    }
    if (inCodeBlock) {
      codeChars += line.length;
      continue;
    }
    const codeIndicators = (line.match(/[{}();=<>[\]]/g) || []).length;
    const wordCount = (line.match(/\b\w+\b/g) || []).length;
    if (codeIndicators > wordCount * 0.3) {
      codeChars += line.length;
    } else {
      proseChars += line.length;
    }
  }
  return {
    codeChars,
    proseChars,
    jsonChars,
    logPatterns,
    docPatterns
  };
}

// src/optimizers/summarization.ts
function summarizeLongContent(input, options = {}) {
  const {
    maxTokens = 5e3,
    preserveStructure = true,
    keepFirst = true,
    keepLast = true,
    minSentenceLength = 20
  } = options;
  const originalTokens = estimateTokensHeuristic(input).tokens;
  if (originalTokens <= maxTokens) {
    return {
      output: input,
      originalTokens,
      summarizedTokens: originalTokens,
      compressionRatio: 1
    };
  }
  const paragraphs = input.split(/\n\s*\n/);
  const summarized = [];
  if (keepFirst && paragraphs.length > 0) {
    summarized.push(paragraphs[0]);
  }
  const middleParagraphs = keepFirst && keepLast && paragraphs.length > 2 ? paragraphs.slice(1, -1) : keepFirst ? paragraphs.slice(1) : keepLast && paragraphs.length > 1 ? paragraphs.slice(0, -1) : paragraphs;
  for (const paragraph of middleParagraphs) {
    const summary = summarizeParagraph(paragraph, minSentenceLength);
    if (summary.trim().length > 0) {
      summarized.push(summary);
    }
  }
  if (keepLast && paragraphs.length > 1) {
    const lastIdx = keepFirst ? paragraphs.length - 1 : paragraphs.length - 1;
    summarized.push(paragraphs[lastIdx]);
  }
  let output = preserveStructure ? summarized.join("\n\n") : summarized.join(" ");
  let currentTokens = estimateTokensHeuristic(output).tokens;
  if (currentTokens > maxTokens) {
    output = aggressiveCompress(output, maxTokens);
  }
  const summarizedTokens = estimateTokensHeuristic(output).tokens;
  return {
    output,
    originalTokens,
    summarizedTokens,
    compressionRatio: summarizedTokens / originalTokens
  };
}
function summarizeParagraph(paragraph, minLength) {
  const sentences = paragraph.split(/([.!?]+[\s\n])/);
  const keySentences = [];
  for (let i = 0; i < sentences.length; i += 2) {
    const sentence = sentences[i];
    const punctuation = sentences[i + 1] || "";
    if (!sentence || sentence.trim().length < minLength) {
      continue;
    }
    const score = scoreSentence(sentence);
    if (score > 0.3) {
      keySentences.push(sentence + punctuation);
    }
  }
  if (keySentences.length === 0 && sentences.length >= 2) {
    const first = sentences[0];
    const last = sentences[sentences.length - 2];
    if (first && last) {
      return first + (sentences[1] || "") + " ... " + last + (sentences[sentences.length - 1] || "");
    }
  }
  return keySentences.join(" ");
}
function scoreSentence(sentence) {
  let score = 0;
  const lower = sentence.toLowerCase();
  const importantKeywords = [
    "important",
    "essential",
    "critical",
    "key",
    "main",
    "primary",
    "however",
    "therefore",
    "consequently",
    "thus",
    "moreover",
    "example",
    "note",
    "warning",
    "error",
    "result",
    "conclusion"
  ];
  for (const keyword of importantKeywords) {
    if (lower.includes(keyword)) {
      score += 0.1;
    }
  }
  score += Math.min(0.2, sentence.length / 200);
  if (/\d+/.test(sentence)) {
    score += 0.1;
  }
  if (/^[A-Z]/.test(sentence.trim())) {
    score += 0.05;
  }
  return Math.min(1, score);
}
function aggressiveCompress(text, maxTokens) {
  const compressed = text.replace(/\b(the|a|an|and|or|but|in|on|at|to|for|of|with|by)\b/gi, "").replace(/\s+/g, " ").trim();
  const tokens = estimateTokensHeuristic(compressed).tokens;
  if (tokens <= maxTokens) {
    return compressed;
  }
  const ratio = maxTokens / tokens;
  const targetLength = Math.floor(text.length * ratio * 0.9);
  return text.substring(0, targetLength) + "...";
}

// src/optimizers/context-specific.ts
function optimizeLogs(logText) {
  const originalTokens = Math.ceil(logText.length / 4);
  let optimized = logText;
  optimized = optimized.replace(/\d{4}-\d{2}-\d{2}[\sT]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?/g, "");
  optimized = optimized.replace(/\[\d{4}-\d{2}-\d{2}[\sT]\d{2}:\d{2}:\d{2}\]/g, "");
  optimized = optimized.replace(/\d{2}\/\d{2}\/\d{4}\s+\d{2}:\d{2}:\d{2}/g, "");
  optimized = optimized.replace(/\[(ERROR|WARN|INFO|DEBUG|TRACE)\]\s*/gi, "");
  const lines = optimized.split("\n");
  const seenMessages = /* @__PURE__ */ new Map();
  const compressed = [];
  for (const line of lines) {
    const normalized = line.toLowerCase().trim();
    if (normalized.length > 10) {
      const count = seenMessages.get(normalized) || 0;
      seenMessages.set(normalized, count + 1);
      if (count === 0) {
        compressed.push(line);
      } else if (count === 1) {
        compressed.push(`[Repeated ${count + 1}x] ${line}`);
      } else {
        const lastIdx = compressed.length - 1;
        if (compressed[lastIdx].startsWith("[Repeated")) {
          compressed[lastIdx] = `[Repeated ${count + 1}x] ${line}`;
        }
      }
    } else {
      compressed.push(line);
    }
  }
  optimized = compressed.join("\n");
  optimized = optimized.replace(/\n{3,}/g, "\n\n");
  const optimizedTokens = Math.ceil(optimized.length / 4);
  const savingsPercent = originalTokens > 0 ? (originalTokens - optimizedTokens) / originalTokens * 100 : 0;
  return {
    output: optimized,
    originalTokens,
    optimizedTokens,
    savingsPercent: Math.round(savingsPercent * 100) / 100
  };
}
function optimizeDocumentation(docText) {
  const originalTokens = Math.ceil(docText.length / 4);
  let optimized = docText;
  optimized = optimized.replace(/\bas mentioned (above|below|earlier|previously)\b/gi, "");
  optimized = optimized.replace(/\bas (discussed|stated|noted) (above|below|earlier)\b/gi, "");
  optimized = optimized.replace(/Note:\s*(It is important to|Remember that|Keep in mind that)/gi, "Note:");
  optimized = optimized.replace(/Example \d+:\s*/gi, "Example: ");
  const seeAlsoMatches = optimized.match(/See (also|above|below)/gi);
  if (seeAlsoMatches && seeAlsoMatches.length > 3) {
    optimized = optimized.replace(/See (also|above|below)[^.]*\./gi, "");
  }
  optimized = optimized.replace(/\n{4,}/g, "\n\n\n");
  const optimizedTokens = Math.ceil(optimized.length / 4);
  const savingsPercent = originalTokens > 0 ? (originalTokens - optimizedTokens) / originalTokens * 100 : 0;
  return {
    output: optimized,
    originalTokens,
    optimizedTokens,
    savingsPercent: Math.round(savingsPercent * 100) / 100
  };
}
function optimizeCodeComments(codeText) {
  const originalTokens = Math.ceil(codeText.length / 4);
  let optimized = codeText;
  const lines = optimized.split("\n");
  const result = [];
  for (const line of lines) {
    const trimmed = line.trim();
    const isComment = trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("*");
    if (!isComment) {
      result.push(line);
      continue;
    }
    const commentText = trimmed.replace(/^\/\/\s*|\/\*\s*|\*\s*|\*\/\s*$/g, "").toLowerCase();
    const obviousPatterns = [
      /^(set|get|assign|return|create|initialize|define|declare)\s+\w+/i,
      /^(this|the|a|an)\s+\w+\s+(is|does|returns|sets|gets)/i,
      /^(variable|function|method|class|object)\s+\w+/i,
      /^\/\/\s*$/
      // Empty comment
    ];
    const isObvious = obviousPatterns.some((pattern) => pattern.test(commentText));
    if (!isObvious || commentText.length > 50) {
      result.push(line);
    }
  }
  optimized = result.join("\n");
  optimized = optimized.replace(/\n{3,}/g, "\n\n");
  const optimizedTokens = Math.ceil(optimized.length / 4);
  const savingsPercent = originalTokens > 0 ? (originalTokens - optimizedTokens) / originalTokens * 100 : 0;
  return {
    output: optimized,
    originalTokens,
    optimizedTokens,
    savingsPercent: Math.round(savingsPercent * 100) / 100
  };
}

// src/optimizers/cache.ts
var LRUCache = class {
  cache;
  maxSize;
  constructor(maxSize = 1e3) {
    this.cache = /* @__PURE__ */ new Map();
    this.maxSize = maxSize;
  }
  get(key) {
    if (!this.cache.has(key)) {
      return void 0;
    }
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }
  delete(key) {
    return this.cache.delete(key);
  }
  has(key) {
    return this.cache.has(key);
  }
  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
  clear() {
    this.cache.clear();
  }
  size() {
    return this.cache.size;
  }
};
var optimizationCache = new LRUCache(1e3);
var CACHE_TTL = 36e5;
function getCachedResult(input) {
  const cached = optimizationCache.get(input);
  if (!cached) {
    return null;
  }
  const age = Date.now() - cached.timestamp;
  if (age > CACHE_TTL) {
    optimizationCache.delete(input);
    return null;
  }
  return cached;
}
function cacheResult(input, output, tokens) {
  optimizationCache.set(input, {
    output,
    tokens,
    timestamp: Date.now()
  });
}
function clearCache() {
  optimizationCache.clear();
}
function getCacheStats() {
  return {
    size: optimizationCache.size(),
    maxSize: 1e3
  };
}
function hasOptimizationPotential(text) {
  const fillerPattern = /basically|actually|simply|in fact|obviously|literally|you know|I mean/i;
  if (fillerPattern.test(text)) {
    return true;
  }
  const verbosePattern = /in order to|due to the fact that|at this point in time|for the purpose of/i;
  if (verbosePattern.test(text)) {
    return true;
  }
  if (/\n{3,}/.test(text) || /[ \t]{3,}/.test(text)) {
    return true;
  }
  const sentences = text.split(/[.!?]+\s+/);
  const seen = /* @__PURE__ */ new Set();
  for (const sentence of sentences) {
    const normalized = sentence.toLowerCase().trim();
    if (normalized.length > 20 && seen.has(normalized)) {
      return true;
    }
    seen.add(normalized);
  }
  return false;
}

// src/optimizers/advanced-engine.ts
function optimizeAdvanced(input, options = {}) {
  const cacheKey = JSON.stringify({ input, options });
  const cached = getCachedResult(cacheKey);
  if (cached) {
    return {
      output: cached.output,
      originalTokens: estimateTokensHeuristic(input).tokens,
      optimizedTokens: cached.tokens,
      saved: estimateTokensHeuristic(input).tokens - cached.tokens,
      savingsPercent: estimateTokensHeuristic(input).tokens > 0 ? (estimateTokensHeuristic(input).tokens - cached.tokens) / estimateTokensHeuristic(input).tokens * 100 : 0,
      strategies: ["cached"],
      contentType: detectContentType(input).type
    };
  }
  if (!hasOptimizationPotential(input)) {
    const tokens = estimateTokensHeuristic(input).tokens;
    cacheResult(cacheKey, input, tokens);
    return {
      output: input,
      originalTokens: tokens,
      optimizedTokens: tokens,
      saved: 0,
      savingsPercent: 0,
      strategies: [],
      contentType: detectContentType(input).type
    };
  }
  const {
    targetSavingsPercent,
    maxTokens,
    preset = "standard",
    enableSemanticCompression = true,
    enableWhitespaceCompression = true,
    enableDuplicateRemoval = true,
    enableSummarization = true,
    enableContextOptimization = true,
    contentType: providedContentType
  } = options;
  const originalTokens = estimateTokensHeuristic(input).tokens;
  const targetTokens = targetSavingsPercent ? Math.floor(originalTokens * (1 - targetSavingsPercent / 100)) : maxTokens || originalTokens;
  let result = input;
  const strategies = [];
  const detection = detectContentType(result);
  const contentType = providedContentType || detection.type;
  if (enableContextOptimization) {
    let contextResult;
    switch (contentType) {
      case "log":
        contextResult = optimizeLogs(result);
        if (contextResult.savingsPercent > 5) {
          result = contextResult.output;
          strategies.push("log-optimization");
        }
        break;
      case "documentation":
        contextResult = optimizeDocumentation(result);
        if (contextResult.savingsPercent > 5) {
          result = contextResult.output;
          strategies.push("doc-optimization");
        }
        break;
      case "code":
        contextResult = optimizeCodeComments(result);
        if (contextResult.savingsPercent > 5) {
          result = contextResult.output;
          strategies.push("code-comment-optimization");
        }
        break;
    }
    const currentTokens = estimateTokensHeuristic(result).tokens;
    if (currentTokens <= targetTokens) {
      return {
        output: result,
        originalTokens,
        optimizedTokens: currentTokens,
        saved: originalTokens - currentTokens,
        savingsPercent: originalTokens > 0 ? (originalTokens - currentTokens) / originalTokens * 100 : 0,
        strategies,
        contentType
      };
    }
  }
  if (enableDuplicateRemoval) {
    const duplicateResult = removeDuplicates(result);
    if (duplicateResult.duplicatesRemoved > 0) {
      result = duplicateResult.output;
      strategies.push("duplicate-removal");
      const currentTokens = estimateTokensHeuristic(result).tokens;
      if (currentTokens <= targetTokens) {
        return createResult(result, originalTokens, strategies, contentType);
      }
    }
  }
  if (enableSemanticCompression) {
    const semanticResult = applySemanticCompression(result);
    if (semanticResult.replacements > 0) {
      result = semanticResult.output;
      strategies.push("semantic-compression");
      const currentTokens = estimateTokensHeuristic(result).tokens;
      if (currentTokens <= targetTokens) {
        return createResult(result, originalTokens, strategies, contentType);
      }
    }
  }
  const presets = ["conservative", "standard", "aggressive", "ultra"];
  let presetIndex = presets.indexOf(preset);
  for (let i = presetIndex; i < presets.length; i++) {
    const stripResult = stripFillers(result, { preset: presets[i] });
    if (stripResult.meta.changed) {
      result = stripResult.output;
      if (!strategies.includes("strip-fillers")) {
        strategies.push(`strip-fillers-${presets[i]}`);
      } else {
        const idx = strategies.findIndex((s) => s.startsWith("strip-fillers"));
        strategies[idx] = `strip-fillers-${presets[i]}`;
      }
      const currentTokens = estimateTokensHeuristic(result).tokens;
      if (currentTokens <= targetTokens) {
        return createResult(result, originalTokens, strategies, contentType);
      }
    }
  }
  if (enableWhitespaceCompression) {
    const whitespaceResult = compressWhitespace(result, true);
    if (whitespaceResult.compressed) {
      result = whitespaceResult.output;
      strategies.push("whitespace-compression");
      const currentTokens = estimateTokensHeuristic(result).tokens;
      if (currentTokens <= targetTokens) {
        return createResult(result, originalTokens, strategies, contentType);
      }
    }
  }
  if (enableSummarization && originalTokens > 1e4) {
    const summaryResult = summarizeLongContent(result, {
      maxTokens: targetTokens,
      preserveStructure: true,
      keepFirst: true,
      keepLast: true
    });
    if (summaryResult.compressionRatio < 1) {
      result = summaryResult.output;
      strategies.push("summarization");
    }
  }
  const finalResult = createResult(result, originalTokens, strategies, contentType);
  cacheResult(cacheKey, finalResult.output, finalResult.optimizedTokens);
  return finalResult;
}
function createResult(output, originalTokens, strategies, contentType) {
  const optimizedTokens = estimateTokensHeuristic(output).tokens;
  const saved = originalTokens - optimizedTokens;
  const savingsPercent = originalTokens > 0 ? saved / originalTokens * 100 : 0;
  return {
    output,
    originalTokens,
    optimizedTokens,
    saved,
    savingsPercent: Math.round(savingsPercent * 100) / 100,
    strategies,
    contentType
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
    const pkg = await import("./package-7IYFU2IZ.js").catch(() => ({ default: { version: "0.0.0" } }));
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
    if (cmd === "optimize" || cmd === "advanced") {
      const input = args[0] ? readFileText(args[0]) : readStdinSync();
      const options = {
        preset: opts.preset || "standard",
        targetSavingsPercent: opts["target-savings"] ? parseFloat(opts["target-savings"]) : void 0,
        maxTokens: opts["max-tokens"] ? parseInt(opts["max-tokens"], 10) : void 0,
        enableSemanticCompression: opts["no-semantic"] !== true,
        enableWhitespaceCompression: opts["no-whitespace"] !== true,
        enableDuplicateRemoval: opts["no-duplicates"] !== true,
        enableSummarization: opts["no-summarization"] !== true,
        enableContextOptimization: opts["no-context"] !== true
      };
      const res = optimizeAdvanced(input, options);
      outOrStdout(res.output + "\n", opts.out);
      if (opts.report) {
        console.error(JSON.stringify({
          mode: "advanced-optimization",
          before: { tokens: res.originalTokens },
          after: { tokens: res.optimizedTokens },
          saved: res.saved,
          savingsPercent: res.savingsPercent,
          strategies: res.strategies,
          contentType: res.contentType
        }));
      }
      return 0;
    }
    console.error("Usage: token-saver <json-minify|diff|strip-fillers|optimize> [args] [--report --model --keep-eol --out --preset --target-savings --max-tokens]");
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
  getPresetPatterns,
  stripFillers,
  applySemanticCompression,
  compressWhitespace,
  removeDuplicateSentences,
  removeDuplicateParagraphs,
  removeDuplicates,
  detectContentType,
  summarizeLongContent,
  optimizeLogs,
  optimizeDocumentation,
  optimizeCodeComments,
  getCachedResult,
  cacheResult,
  clearCache,
  getCacheStats,
  hasOptimizationPotential,
  optimizeAdvanced,
  main
};
//# sourceMappingURL=chunk-H5HBSS6E.js.map