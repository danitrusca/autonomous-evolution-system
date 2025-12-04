export { main } from './cli.js';

interface JsonMinifyOptions {
    keepEol?: boolean;
    maxBytes?: number;
}
interface TransformResult {
    output: string;
    meta: {
        changed: boolean;
        preserved: {
            codeBlocks: number;
            inline: number;
            json: boolean;
        };
    };
}
declare function jsonMinify(input: string, opts?: JsonMinifyOptions): TransformResult;

interface DiffOptions {
    keepEol?: boolean;
}
declare function unifiedDiff(beforeName: string, before: string, afterName: string, after: string, opts?: DiffOptions): string;

type Preset = "conservative" | "standard" | "aggressive" | "ultra";
declare function getPresetPatterns(preset: Preset): Array<[RegExp, string]>;

interface StripOptions {
    preset?: Preset;
    keepEol?: boolean;
}
interface StripResult {
    output: string;
    meta: {
        changed: boolean;
        preserved: {
            codeBlocks: number;
            inline: number;
            json: boolean;
        };
    };
}
declare function stripFillers(input: string, opts?: StripOptions): StripResult;

interface EstimateOptions {
    model?: string;
    diffHeuristicBump?: boolean;
}
declare function estimateTokensHeuristic(text: string, opts?: EstimateOptions): {
    readonly chars: number;
    readonly tokens: number;
    readonly model: string;
    readonly note: string | undefined;
};

/**
 * Semantic Compression
 *
 * Replaces verbose phrases with concise equivalents while preserving meaning.
 * This provides significant token savings on formal or verbose text.
 */
interface SemanticCompressionResult {
    output: string;
    replacements: number;
}
declare function applySemanticCompression(input: string): SemanticCompressionResult;

/**
 * Whitespace Compression
 *
 * Intelligently compresses whitespace while preserving readability and code structure.
 * Protects code blocks and inline code from compression.
 */
interface WhitespaceCompressionResult {
    output: string;
    compressed: boolean;
}
/**
 * Compress whitespace while protecting code blocks and inline code
 */
declare function compressWhitespace(input: string, protectCode?: boolean): WhitespaceCompressionResult;

/**
 * Duplicate Detection and Removal
 *
 * Identifies and removes duplicate sentences and paragraphs while preserving structure.
 * Useful for verbose text with repeated explanations.
 */
interface DuplicateDetectionResult {
    output: string;
    duplicatesRemoved: number;
}
/**
 * Remove duplicate sentences while preserving document structure
 */
declare function removeDuplicateSentences(input: string): DuplicateDetectionResult;
/**
 * Remove duplicate paragraphs
 */
declare function removeDuplicateParagraphs(input: string): DuplicateDetectionResult;
/**
 * Remove both duplicate sentences and paragraphs
 */
declare function removeDuplicates(input: string): DuplicateDetectionResult;

/**
 * Content Type Detection
 *
 * Detects the type of content to apply appropriate optimization strategies.
 */
type ContentType = "code" | "prose" | "log" | "json" | "documentation" | "mixed";
interface ContentTypeDetectionResult {
    type: ContentType;
    confidence: number;
    features: {
        codePercent: number;
        prosePercent: number;
        jsonPercent: number;
        logPatterns: number;
        docPatterns: number;
    };
}
/**
 * Detect content type based on patterns and structure
 */
declare function detectContentType(input: string): ContentTypeDetectionResult;

/**
 * Long Content Summarization
 *
 * Summarizes very long content by extracting key information while removing redundancy.
 * Used when content exceeds token limits.
 */
interface SummarizationResult {
    output: string;
    originalTokens: number;
    summarizedTokens: number;
    compressionRatio: number;
}
interface SummarizationOptions {
    maxTokens?: number;
    preserveStructure?: boolean;
    keepFirst?: boolean;
    keepLast?: boolean;
    minSentenceLength?: number;
}
/**
 * Summarize long content by extracting key sentences
 */
declare function summarizeLongContent(input: string, options?: SummarizationOptions): SummarizationResult;

/**
 * Context-Specific Optimizers
 *
 * Specialized optimizers for different content types:
 * - Log optimization
 * - Documentation optimization
 * - Code comment optimization
 */
interface ContextOptimizationResult {
    output: string;
    originalTokens: number;
    optimizedTokens: number;
    savingsPercent: number;
}
/**
 * Optimize log files by removing timestamps and compressing repeated patterns
 */
declare function optimizeLogs(logText: string): ContextOptimizationResult;
/**
 * Optimize documentation by removing redundant explanations
 */
declare function optimizeDocumentation(docText: string): ContextOptimizationResult;
/**
 * Optimize code comments by removing obvious comments
 */
declare function optimizeCodeComments(codeText: string): ContextOptimizationResult;

/**
 * Advanced Optimization Engine
 *
 * Combines all optimization strategies intelligently based on content type and target savings.
 * Provides token-aware optimization that stops when target is reached.
 */

interface AdvancedOptimizationOptions {
    targetSavingsPercent?: number;
    maxTokens?: number;
    preset?: Preset;
    enableSemanticCompression?: boolean;
    enableWhitespaceCompression?: boolean;
    enableDuplicateRemoval?: boolean;
    enableSummarization?: boolean;
    enableContextOptimization?: boolean;
    contentType?: ContentType;
}
interface AdvancedOptimizationResult {
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
declare function optimizeAdvanced(input: string, options?: AdvancedOptimizationOptions): AdvancedOptimizationResult;

/**
 * Performance Cache
 *
 * LRU cache for optimization results to avoid redundant processing.
 */
interface CacheEntry {
    output: string;
    tokens: number;
    timestamp: number;
}
/**
 * Get cached optimization result
 */
declare function getCachedResult(input: string): CacheEntry | null;
/**
 * Cache optimization result
 */
declare function cacheResult(input: string, output: string, tokens: number): void;
/**
 * Clear the cache
 */
declare function clearCache(): void;
/**
 * Get cache statistics
 */
declare function getCacheStats(): {
    size: number;
    maxSize: number;
};
/**
 * Check if content has optimization potential (quick heuristic)
 * Used for early exit to avoid unnecessary processing
 */
declare function hasOptimizationPotential(text: string): boolean;

export { type AdvancedOptimizationOptions, type AdvancedOptimizationResult, type ContentType, type ContentTypeDetectionResult, type ContextOptimizationResult, type DiffOptions, type DuplicateDetectionResult, type EstimateOptions, type JsonMinifyOptions, type Preset, type SemanticCompressionResult, type StripOptions, type StripResult, type SummarizationOptions, type SummarizationResult, type TransformResult, type WhitespaceCompressionResult, applySemanticCompression, cacheResult, clearCache, compressWhitespace, detectContentType, estimateTokensHeuristic, getCacheStats, getCachedResult, getPresetPatterns, hasOptimizationPotential, jsonMinify, optimizeAdvanced, optimizeCodeComments, optimizeDocumentation, optimizeLogs, removeDuplicateParagraphs, removeDuplicateSentences, removeDuplicates, stripFillers, summarizeLongContent, unifiedDiff };
