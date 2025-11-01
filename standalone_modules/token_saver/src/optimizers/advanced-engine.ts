/**
 * Advanced Optimization Engine
 * 
 * Combines all optimization strategies intelligently based on content type and target savings.
 * Provides token-aware optimization that stops when target is reached.
 */

import { stripFillers } from "../strip-fillers/engine.js";
import { Preset } from "../strip-fillers/presets.js";
import { applySemanticCompression } from "./semantic-compression.js";
import { compressWhitespace } from "./whitespace-compression.js";
import { removeDuplicates } from "./duplicate-detection.js";
import { detectContentType, ContentType } from "./content-type-detection.js";
import { summarizeLongContent, SummarizationOptions } from "./summarization.js";
import { optimizeLogs, optimizeDocumentation, optimizeCodeComments } from "./context-specific.js";
import { estimateTokensHeuristic } from "../estimators/heuristic.js";
import { getCachedResult, cacheResult, hasOptimizationPotential } from "./cache.js";

export interface AdvancedOptimizationOptions {
  targetSavingsPercent?: number;
  maxTokens?: number;
  preset?: Preset;
  enableSemanticCompression?: boolean;
  enableWhitespaceCompression?: boolean;
  enableDuplicateRemoval?: boolean;
  enableSummarization?: boolean;
  enableContextOptimization?: boolean;
  contentType?: ContentType; // Auto-detect if not provided
}

export interface AdvancedOptimizationResult {
  output: string;
  originalTokens: number;
  optimizedTokens: number;
  saved: number;
  savingsPercent: number;
  strategies: string[];
  contentType: ContentType;
}

/**
 * Optimize content using all available strategies
 */
export function optimizeAdvanced(
  input: string,
  options: AdvancedOptimizationOptions = {}
): AdvancedOptimizationResult {
  // Check cache first
  const cacheKey = JSON.stringify({ input, options });
  const cached = getCachedResult(cacheKey);
  if (cached) {
    return {
      output: cached.output,
      originalTokens: estimateTokensHeuristic(input).tokens,
      optimizedTokens: cached.tokens,
      saved: estimateTokensHeuristic(input).tokens - cached.tokens,
      savingsPercent: estimateTokensHeuristic(input).tokens > 0
        ? ((estimateTokensHeuristic(input).tokens - cached.tokens) / estimateTokensHeuristic(input).tokens) * 100
        : 0,
      strategies: ["cached"],
      contentType: detectContentType(input).type
    };
  }
  
  // Quick check: skip if no optimization potential
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
  const targetTokens = targetSavingsPercent
    ? Math.floor(originalTokens * (1 - targetSavingsPercent / 100))
    : maxTokens || originalTokens;
  
  let result = input;
  const strategies: string[] = [];
  
  // Detect content type if not provided
  const detection = detectContentType(result);
  const contentType = providedContentType || detection.type;
  
  // 1. Context-specific optimization (highest impact for specific types)
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
    
    // Early exit if target reached
    const currentTokens = estimateTokensHeuristic(result).tokens;
    if (currentTokens <= targetTokens) {
      return {
        output: result,
        originalTokens,
        optimizedTokens: currentTokens,
        saved: originalTokens - currentTokens,
        savingsPercent: originalTokens > 0 ? ((originalTokens - currentTokens) / originalTokens) * 100 : 0,
        strategies,
        contentType
      };
    }
  }
  
  // 2. Remove duplicates (high impact, low risk)
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
  
  // 3. Semantic compression
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
  
  // 4. Strip fillers (gradually increase aggressiveness)
  const presets: Preset[] = ["conservative", "standard", "aggressive", "ultra"];
  let presetIndex = presets.indexOf(preset);
  
  for (let i = presetIndex; i < presets.length; i++) {
    const stripResult = stripFillers(result, { preset: presets[i] });
    if (stripResult.meta.changed) {
      result = stripResult.output;
      if (!strategies.includes("strip-fillers")) {
        strategies.push(`strip-fillers-${presets[i]}`);
      } else {
        // Update to more aggressive preset
        const idx = strategies.findIndex(s => s.startsWith("strip-fillers"));
        strategies[idx] = `strip-fillers-${presets[i]}`;
      }
      
      const currentTokens = estimateTokensHeuristic(result).tokens;
      if (currentTokens <= targetTokens) {
        return createResult(result, originalTokens, strategies, contentType);
      }
    }
  }
  
  // 5. Whitespace compression
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
  
  // 6. Summarization (last resort for very long content)
  if (enableSummarization && originalTokens > 10000) {
    const summaryResult = summarizeLongContent(result, {
      maxTokens: targetTokens,
      preserveStructure: true,
      keepFirst: true,
      keepLast: true
    });
    
    if (summaryResult.compressionRatio < 1.0) {
      result = summaryResult.output;
      strategies.push("summarization");
    }
  }
  
  const finalResult = createResult(result, originalTokens, strategies, contentType);
  
  // Cache the result
  cacheResult(cacheKey, finalResult.output, finalResult.optimizedTokens);
  
  return finalResult;
}

function createResult(
  output: string,
  originalTokens: number,
  strategies: string[],
  contentType: ContentType
): AdvancedOptimizationResult {
  const optimizedTokens = estimateTokensHeuristic(output).tokens;
  const saved = originalTokens - optimizedTokens;
  const savingsPercent = originalTokens > 0
    ? (saved / originalTokens) * 100
    : 0;
  
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


