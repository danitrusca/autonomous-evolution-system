/**
 * Token Optimizer Utility
 * 
 * Provides easy access to token optimization capabilities for agents and system components.
 * This is a singleton that wraps the token optimizer integration.
 */

const path = require('path');
const TokenOptimizerIntegration = require('../standalone_modules/token_saver/integration/token-optimizer-integration.cjs');

class TokenOptimizer {
  constructor() {
    this.integration = new TokenOptimizerIntegration();
    this.initialized = false;
  }

  /**
   * Initialize token optimizer (async)
   * Should be called during system initialization
   */
  async initialize() {
    if (this.initialized) return;
    await this.integration.initialize();
    this.initialized = true;
  }

  /**
   * Check if token optimizer is available
   */
  isAvailable() {
    return this.integration.isAvailable();
  }

  /**
   * Optimize text (sync wrapper for convenience)
   * @param {string} text - Text to optimize
   * @param {Object} options - Optimization options
   * @returns {Object} - Optimized text and metadata
   */
  optimizeText(text, options) {
    return this.integration.optimizeText(text, options);
  }

  /**
   * Optimize context before AI processing
   * @param {string} context - Context to optimize
   * @param {Object} options - Optimization options
   * @returns {Object} - Optimized context and metadata
   */
  optimizeContext(context, options) {
    return this.integration.optimizeContext(context, options);
  }

  /**
   * Minify JSON
   * @param {string} jsonText - JSON to minify
   * @param {Object} options - Minification options
   * @returns {Object} - Minified JSON and metadata
   */
  minifyJSON(jsonText, options) {
    return this.integration.minifyJSON(jsonText, options);
  }

  /**
   * Create diff between two versions
   * @param {string} before - Before text
   * @param {string} after - After text
   * @param {Object} options - Diff options
   * @returns {Object} - Diff and metadata
   */
  createDiff(before, after, options) {
    return this.integration.createDiff(before, after, options);
  }

  /**
   * Estimate tokens in text
   * @param {string} text - Text to estimate
   * @param {Object} options - Estimation options
   * @returns {number} - Estimated token count
   */
  estimateTokens(text, options) {
    return this.integration.estimateTokens(text, options);
  }

  /**
   * Get status
   * @returns {Object} - Status information
   */
  getStatus() {
    return this.integration.getStatus();
  }
}

// Singleton instance
let instance = null;

/**
 * Get token optimizer instance
 * @returns {TokenOptimizer} - Token optimizer instance
 */
function getTokenOptimizer() {
  if (!instance) {
    instance = new TokenOptimizer();
  }
  return instance;
}

module.exports = {
  TokenOptimizer,
  getTokenOptimizer
};

