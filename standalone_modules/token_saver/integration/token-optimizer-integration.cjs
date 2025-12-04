/**
 * Token Optimizer Integration
 * 
 * CommonJS wrapper for the ESM token_saver module, enabling integration
 * with the autonomous evolution system while maintaining standalone functionality.
 * 
 * This integration provides:
 * - Token optimization for context/prompts before AI processing
 * - Response optimization for journals/logs
 * - Token estimation utilities
 * - Optional integration (gracefully degrades if token_saver unavailable)
 * 
 * Note: Uses .cjs extension to ensure CommonJS in ESM package
 */

const fs = require('fs');
const path = require('path');

class TokenOptimizerIntegration {
  constructor() {
    this.tokenSaverPath = path.join(__dirname, '..');
    this.tokenSaverAvailable = false;
    this.tokenSaver = null;
    this.initialized = false;
  }

  /**
   * Initialize token optimizer integration
   * Invariant: Must gracefully handle missing token_saver
   */
  async initialize() {
    if (this.initialized) return;

    try {
      // Check if token_saver is built
      const distPath = path.join(this.tokenSaverPath, 'dist', 'index.js');
      if (!fs.existsSync(distPath)) {
        console.log('[token-optimizer] Token saver not built, skipping integration');
        return;
      }

      // Dynamically import ESM module (requires Node 14+)
      // Use file:// URL for absolute path resolution
      const fileUrl = path.isAbsolute(distPath) 
        ? `file://${distPath.replace(/\\/g, '/')}`
        : distPath;
      
      this.tokenSaver = await import(fileUrl);
      this.tokenSaverAvailable = true;
      this.initialized = true;
      
      console.log('[token-optimizer] Token optimizer integration initialized');
    } catch (error) {
      console.log('[token-optimizer] Token saver not available:', error.message);
      console.log('[token-optimizer] System will continue without token optimization');
      this.tokenSaverAvailable = false;
      this.initialized = true;
    }
  }

  /**
   * Check if token optimizer is available
   */
  isAvailable() {
    return this.tokenSaverAvailable;
  }

  /**
   * Optimize text using strip-fillers (removes verbose fillers)
   * @param {string} text - Text to optimize
   * @param {Object} options - Options for optimization
   * @returns {Object} - Optimized text and metadata
   */
  optimizeText(text, options = {}) {
    if (!this.tokenSaverAvailable) {
      return {
        optimized: text,
        originalTokens: this.estimateTokens(text),
        optimizedTokens: this.estimateTokens(text),
        saved: 0,
        savingsPercent: 0,
        available: false
      };
    }

    try {
      const preset = options.preset || 'conservative';
      const result = this.tokenSaver.stripFillers(text, { preset, keepEol: options.keepEol || false });
      const originalTokens = this.estimateTokens(text);
      const optimizedTokens = this.estimateTokens(result.output);
      const saved = Math.max(0, originalTokens - optimizedTokens);
      const savingsPercent = originalTokens > 0 ? (saved / originalTokens) * 100 : 0;

      return {
        optimized: result.output,
        originalTokens,
        optimizedTokens,
        saved,
        savingsPercent: Math.round(savingsPercent * 100) / 100,
        available: true,
        metadata: result.meta
      };
    } catch (error) {
      console.error('[token-optimizer] Error optimizing text:', error.message);
      return {
        optimized: text,
        originalTokens: this.estimateTokens(text),
        optimizedTokens: this.estimateTokens(text),
        saved: 0,
        savingsPercent: 0,
        available: false,
        error: error.message
      };
    }
  }

  /**
   * Minify JSON content
   * @param {string} jsonText - JSON text to minify
   * @param {Object} options - Options for minification
   * @returns {Object} - Minified JSON and metadata
   */
  minifyJSON(jsonText, options = {}) {
    if (!this.tokenSaverAvailable) {
      return {
        optimized: jsonText,
        originalTokens: this.estimateTokens(jsonText),
        optimizedTokens: this.estimateTokens(jsonText),
        saved: 0,
        savingsPercent: 0,
        available: false
      };
    }

    try {
      const result = this.tokenSaver.jsonMinify(jsonText, { 
        keepEol: options.keepEol || false 
      });
      const originalTokens = this.estimateTokens(jsonText);
      const optimizedTokens = this.estimateTokens(result.output);
      const saved = Math.max(0, originalTokens - optimizedTokens);
      const savingsPercent = originalTokens > 0 ? (saved / originalTokens) * 100 : 0;

      return {
        optimized: result.output,
        originalTokens,
        optimizedTokens,
        saved,
        savingsPercent: Math.round(savingsPercent * 100) / 100,
        available: true
      };
    } catch (error) {
      console.error('[token-optimizer] Error minifying JSON:', error.message);
      return {
        optimized: jsonText,
        originalTokens: this.estimateTokens(jsonText),
        optimizedTokens: this.estimateTokens(jsonText),
        saved: 0,
        savingsPercent: 0,
        available: false,
        error: error.message
      };
    }
  }

  /**
   * Create diff between two text versions
   * @param {string} before - Before text
   * @param {string} after - After text
   * @param {Object} options - Options for diff
   * @returns {Object} - Diff and metadata
   */
  createDiff(before, after, options = {}) {
    if (!this.tokenSaverAvailable) {
      return {
        diff: `--- before\n+++ after\n${after}`,
        beforeTokens: this.estimateTokens(before),
        afterTokens: this.estimateTokens(after),
        diffTokens: this.estimateTokens(after),
        saved: 0,
        savingsPercent: 0,
        available: false
      };
    }

    try {
      const diff = this.tokenSaver.unifiedDiff('before', before, 'after', after, {
        keepEol: options.keepEol || false
      });
      const beforeTokens = this.estimateTokens(before, { diffHeuristicBump: true });
      const afterTokens = this.estimateTokens(after, { diffHeuristicBump: true });
      const diffTokens = this.estimateTokens(diff);
      const saved = Math.max(0, (beforeTokens + afterTokens) - diffTokens);
      const savingsPercent = (beforeTokens + afterTokens) > 0 
        ? (saved / (beforeTokens + afterTokens)) * 100 
        : 0;

      return {
        diff,
        beforeTokens,
        afterTokens,
        diffTokens,
        saved,
        savingsPercent: Math.round(savingsPercent * 100) / 100,
        available: true
      };
    } catch (error) {
      console.error('[token-optimizer] Error creating diff:', error.message);
      return {
        diff: `--- before\n+++ after\n${after}`,
        beforeTokens: this.estimateTokens(before),
        afterTokens: this.estimateTokens(after),
        diffTokens: this.estimateTokens(after),
        saved: 0,
        savingsPercent: 0,
        available: false,
        error: error.message
      };
    }
  }

  /**
   * Estimate tokens in text (heuristic fallback if token_saver unavailable)
   * @param {string} text - Text to estimate
   * @param {Object} options - Estimation options
   * @returns {number} - Estimated token count
   */
  estimateTokens(text, options = {}) {
    if (!text) return 0;

    if (this.tokenSaverAvailable && this.tokenSaver.estimateTokensHeuristic) {
      try {
        return this.tokenSaver.estimateTokensHeuristic(text, options).tokens;
      } catch (error) {
        // Fall back to simple heuristic
      }
    }

    // Simple heuristic fallback: ~4 characters per token
    const charCount = text.length;
    const bump = options.diffHeuristicBump ? 1.2 : 1.0;
    return Math.ceil((charCount / 4) * bump);
  }

  /**
   * Optimize context before sending to AI
   * Automatically applies appropriate optimization strategy
   * @param {string} context - Context text to optimize
   * @param {Object} options - Optimization options
   * @returns {Object} - Optimized context and metadata
   */
  optimizeContext(context, options = {}) {
    if (!context || context.length === 0) {
      return {
        optimized: context,
        originalTokens: 0,
        optimizedTokens: 0,
        saved: 0,
        savingsPercent: 0,
        strategy: 'none',
        available: this.tokenSaverAvailable
      };
    }

    // Use advanced optimization if available
    if (this.tokenSaverAvailable && this.tokenSaver.optimizeAdvanced) {
      try {
        const advancedOptions = {
          preset: options.preset || 'standard',
          targetSavingsPercent: options.targetSavingsPercent,
          maxTokens: options.maxTokens,
          enableSemanticCompression: options.enableSemanticCompression !== false,
          enableWhitespaceCompression: options.enableWhitespaceCompression !== false,
          enableDuplicateRemoval: options.enableDuplicateRemoval !== false,
          enableSummarization: options.enableSummarization !== false,
          enableContextOptimization: options.enableContextOptimization !== false,
        };
        
        const result = this.tokenSaver.optimizeAdvanced(context, advancedOptions);
        return {
          optimized: result.output,
          originalTokens: result.originalTokens,
          optimizedTokens: result.optimizedTokens,
          saved: result.saved,
          savingsPercent: result.savingsPercent,
          strategy: result.strategies.join(','),
          strategies: result.strategies,
          contentType: result.contentType,
          available: true
        };
      } catch (error) {
        // Fall back to basic optimization
        console.error('[token-optimizer] Advanced optimization failed, using fallback:', error.message);
      }
    }

    // Try JSON minification first if it looks like JSON
    if (options.tryJSON !== false && this.looksLikeJSON(context)) {
      const jsonResult = this.minifyJSON(context, options);
      if (jsonResult.available && jsonResult.savingsPercent > 5) {
        return {
          ...jsonResult,
          strategy: 'json-minify'
        };
      }
    }

    // Use strip-fillers for general text
    const textResult = this.optimizeText(context, options);
    return {
      ...textResult,
      strategy: 'strip-fillers'
    };
  }

  /**
   * Check if text looks like JSON
   * @param {string} text - Text to check
   * @returns {boolean} - True if text looks like JSON
   */
  looksLikeJSON(text) {
    const trimmed = text.trim();
    return (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
           (trimmed.startsWith('[') && trimmed.endsWith(']'));
  }

  /**
   * Get integration status
   * @returns {Object} - Integration status
   */
  getStatus() {
    return {
      initialized: this.initialized,
      available: this.tokenSaverAvailable,
      path: this.tokenSaverPath
    };
  }

  /**
   * Cleanup integration
   */
  cleanup() {
    this.tokenSaver = null;
    this.tokenSaverAvailable = false;
    this.initialized = false;
  }
}

module.exports = TokenOptimizerIntegration;

