/**
 * Long Content Summarization
 * 
 * Summarizes very long content by extracting key information while removing redundancy.
 * Used when content exceeds token limits.
 */

import { estimateTokensHeuristic } from "../estimators/heuristic.js";

export interface SummarizationResult {
  output: string;
  originalTokens: number;
  summarizedTokens: number;
  compressionRatio: number;
}

export interface SummarizationOptions {
  maxTokens?: number;
  preserveStructure?: boolean;
  keepFirst?: boolean;
  keepLast?: boolean;
  minSentenceLength?: number;
}

/**
 * Summarize long content by extracting key sentences
 */
export function summarizeLongContent(
  input: string,
  options: SummarizationOptions = {}
): SummarizationResult {
  const {
    maxTokens = 5000,
    preserveStructure = true,
    keepFirst = true,
    keepLast = true,
    minSentenceLength = 20
  } = options;
  
  const originalTokens = estimateTokensHeuristic(input).tokens;
  
  // If already under limit, return as-is
  if (originalTokens <= maxTokens) {
    return {
      output: input,
      originalTokens,
      summarizedTokens: originalTokens,
      compressionRatio: 1.0
    };
  }
  
  // Split into paragraphs
  const paragraphs = input.split(/\n\s*\n/);
  const summarized: string[] = [];
  
  // Keep first paragraph if requested
  if (keepFirst && paragraphs.length > 0) {
    summarized.push(paragraphs[0]);
  }
  
  // Process middle paragraphs
  const middleParagraphs = keepFirst && keepLast && paragraphs.length > 2
    ? paragraphs.slice(1, -1)
    : keepFirst
    ? paragraphs.slice(1)
    : keepLast && paragraphs.length > 1
    ? paragraphs.slice(0, -1)
    : paragraphs;
  
  for (const paragraph of middleParagraphs) {
    const summary = summarizeParagraph(paragraph, minSentenceLength);
    if (summary.trim().length > 0) {
      summarized.push(summary);
    }
  }
  
  // Keep last paragraph if requested
  if (keepLast && paragraphs.length > 1) {
    const lastIdx = keepFirst ? paragraphs.length - 1 : paragraphs.length - 1;
    summarized.push(paragraphs[lastIdx]);
  }
  
  let output = preserveStructure
    ? summarized.join("\n\n")
    : summarized.join(" ");
  
  // If still too long, apply more aggressive compression
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

function summarizeParagraph(paragraph: string, minLength: number): string {
  // Split into sentences
  const sentences = paragraph.split(/([.!?]+[\s\n])/);
  const keySentences: string[] = [];
  
  for (let i = 0; i < sentences.length; i += 2) {
    const sentence = sentences[i];
    const punctuation = sentences[i + 1] || "";
    
    if (!sentence || sentence.trim().length < minLength) {
      continue;
    }
    
    // Score sentence importance
    const score = scoreSentence(sentence);
    
    // Keep high-scoring sentences
    if (score > 0.3) {
      keySentences.push(sentence + punctuation);
    }
  }
  
  // If no key sentences found, return first and last
  if (keySentences.length === 0 && sentences.length >= 2) {
    const first = sentences[0];
    const last = sentences[sentences.length - 2];
    if (first && last) {
      return first + (sentences[1] || "") + " ... " + last + (sentences[sentences.length - 1] || "");
    }
  }
  
  return keySentences.join(" ");
}

function scoreSentence(sentence: string): number {
  let score = 0;
  const lower = sentence.toLowerCase();
  
  // Keywords that indicate importance
  const importantKeywords = [
    "important", "essential", "critical", "key", "main", "primary",
    "however", "therefore", "consequently", "thus", "moreover",
    "example", "note", "warning", "error", "result", "conclusion"
  ];
  
  for (const keyword of importantKeywords) {
    if (lower.includes(keyword)) {
      score += 0.1;
    }
  }
  
  // Longer sentences often contain more information
  score += Math.min(0.2, sentence.length / 200);
  
  // Sentences with numbers or specific data
  if (/\d+/.test(sentence)) {
    score += 0.1;
  }
  
  // Sentences starting with capital letters (likely proper nouns or important concepts)
  if (/^[A-Z]/.test(sentence.trim())) {
    score += 0.05;
  }
  
  return Math.min(1.0, score);
}

function aggressiveCompress(text: string, maxTokens: number): string {
  // Remove all filler words aggressively
  const compressed = text
    .replace(/\b(the|a|an|and|or|but|in|on|at|to|for|of|with|by)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
  
  const tokens = estimateTokensHeuristic(compressed).tokens;
  
  if (tokens <= maxTokens) {
    return compressed;
  }
  
  // If still too long, truncate and add ellipsis
  const ratio = maxTokens / tokens;
  const targetLength = Math.floor(text.length * ratio * 0.9); // 90% to be safe
  return text.substring(0, targetLength) + "...";
}

