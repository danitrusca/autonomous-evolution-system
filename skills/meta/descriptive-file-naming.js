/**
 * Descriptive File Naming System
 * Automatically generates descriptive, semantic file names based on content analysis
 * 
 * ECP Principles:
 * - Frame: Analyze content to extract core purpose and generate descriptive name
 * - Design: Parse content structure, identify key concepts, apply naming conventions
 * - Plan: Content analysis → Concept extraction → Name generation → Validation
 * - Implement: Generate names that immediately convey file purpose
 * - Review: Validate name clarity and adherence to conventions
 * 
 * Invariants:
 * - Generated names must be immediately understandable
 * - Names follow consistent pattern: <CORE_CAPABILITY>_<SYSTEM_TYPE>
 * - Names avoid generic terms (SUMMARY, IMPLEMENTATION, etc.)
 * - Names prioritize semantic clarity over brevity
 */

const fs = require('fs');
const path = require('path');

class DescriptiveFileNaming {
  constructor() {
    this.namingPatterns = {
      system: '_SYSTEM',
      framework: '_FRAMEWORK',
      analyzer: '_ANALYZER',
      monitor: '_MONITOR',
      updater: '_UPDATER',
      generator: '_GENERATOR',
      integrator: '_INTEGRATOR',
      orchestrator: '_ORCHESTRATOR',
      detector: '_DETECTOR',
      engine: '_ENGINE',
      agent: '_AGENT',
      skill: '_SKILL'
    };
    
    this.genericTerms = [
      'IMPLEMENTATION',
      'SUMMARY',
      'DOCUMENT',
      'FILE',
      'NOTES',
      'INFO',
      'DATA',
      'CONTENT'
    ];
    
    this.namingHistory = [];
  }

  /**
   * Generate descriptive name from file content
   * @param {string} filePath - Path to file or file content
   * @param {object} options - Naming options
   * @returns {object} - Generated name with metadata
   */
  async generateDescriptiveName(filePath, options = {}) {
    try {
      // Read content if file path provided
      let content = '';
      if (fs.existsSync(filePath)) {
        content = fs.readFileSync(filePath, 'utf8');
      } else {
        content = filePath; // Assume it's content string
      }
      
      // Extract metadata and key concepts
      const analysis = this.analyzeContent(content);
      
      // Generate name based on analysis
      const generatedName = this.constructName(analysis, options);
      
      // Validate and refine
      const refinedName = this.validateAndRefine(generatedName, analysis);
      
      // Store in history
      this.namingHistory.push({
        originalPath: filePath,
        generatedName: refinedName,
        analysis,
        timestamp: new Date().toISOString()
      });
      
      return {
        name: refinedName,
        confidence: analysis.confidence,
        reasoning: analysis.reasoning,
        alternatives: this.generateAlternatives(analysis),
        metadata: analysis.metadata
      };
      
    } catch (error) {
      console.error('[descriptive-naming] Error generating name:', error.message);
      return {
        name: null,
        error: error.message
      };
    }
  }

  /**
   * Analyze file content to extract naming information
   * @param {string} content - File content
   * @returns {object} - Analysis results
   */
  analyzeContent(content) {
    const analysis = {
      title: '',
      subtitle: '',
      purpose: '',
      systemType: '',
      coreCapability: '',
      keyFeatures: [],
      confidence: 0,
      reasoning: '',
      metadata: {}
    };
    
    // Extract title (first heading)
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) {
      analysis.title = titleMatch[1].trim();
    }
    
    // Extract subtitle or overview
    const overviewMatch = content.match(/##\s+.*?(Overview|Purpose|Mission|Goal).*?\n+([\s\S]+?)(?=\n##|\n---|\n\n#|$)/i);
    if (overviewMatch) {
      analysis.purpose = overviewMatch[2].trim().substring(0, 500);
    }
    
    // Detect system type from content
    analysis.systemType = this.detectSystemType(content);
    
    // Extract core capability
    analysis.coreCapability = this.extractCoreCapability(content, analysis.title, analysis.purpose);
    
    // Extract key features
    analysis.keyFeatures = this.extractKeyFeatures(content);
    
    // Calculate confidence
    analysis.confidence = this.calculateConfidence(analysis);
    
    // Generate reasoning
    analysis.reasoning = this.generateReasoning(analysis);
    
    return analysis;
  }

  /**
   * Detect system type from content
   * @param {string} content - File content
   * @returns {string} - System type
   */
  detectSystemType(content) {
    const lowerContent = content.toLowerCase();
    
    // Check for explicit system type mentions
    const typeIndicators = [
      { keywords: ['test', 'testing', 'test suite', 'assertions'], type: 'FRAMEWORK' },
      { keywords: ['monitor', 'monitoring', 'watch', 'tracking'], type: 'MONITOR' },
      { keywords: ['analyze', 'analyzer', 'analysis'], type: 'ANALYZER' },
      { keywords: ['update', 'updater', 'updating'], type: 'UPDATER' },
      { keywords: ['generate', 'generator', 'generation'], type: 'GENERATOR' },
      { keywords: ['integrate', 'integration', 'integrator'], type: 'INTEGRATOR' },
      { keywords: ['orchestrate', 'orchestrator', 'coordination'], type: 'ORCHESTRATOR' },
      { keywords: ['detect', 'detector', 'detection'], type: 'DETECTOR' },
      { keywords: ['engine', 'processor', 'executor'], type: 'ENGINE' },
      { keywords: ['agent', 'autonomous agent'], type: 'AGENT' },
      { keywords: ['skill', 'capability'], type: 'SKILL' },
      { keywords: ['system', 'framework', 'architecture'], type: 'SYSTEM' }
    ];
    
    for (const indicator of typeIndicators) {
      for (const keyword of indicator.keywords) {
        if (lowerContent.includes(keyword)) {
          return indicator.type;
        }
      }
    }
    
    return 'SYSTEM'; // Default
  }

  /**
   * Extract core capability from content
   * @param {string} content - File content
   * @param {string} title - Document title
   * @param {string} purpose - Document purpose
   * @returns {string} - Core capability
   */
  extractCoreCapability(content, title, purpose) {
    // Remove generic terms from title
    let capability = title;
    
    // Remove "Implementation Summary" and similar
    capability = capability.replace(/\s*-\s*Implementation\s+Summary/i, '');
    capability = capability.replace(/Implementation\s+Summary\s*-?\s*/i, '');
    
    // Remove generic terms
    for (const term of this.genericTerms) {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      capability = capability.replace(regex, '');
    }
    
    // Extract key concepts from purpose if title is too generic
    if (capability.length < 10 && purpose) {
      const conceptMatch = purpose.match(/(?:implement|built|created|system for)\s+(.+?)(?:\.|,|\n)/i);
      if (conceptMatch) {
        capability = conceptMatch[1];
      }
    }
    
    // Clean up
    capability = capability.trim();
    capability = capability.replace(/\s+/g, '_');
    capability = capability.replace(/[^A-Z0-9_]/gi, '');
    capability = capability.toUpperCase();
    
    return capability;
  }

  /**
   * Extract key features from content
   * @param {string} content - File content
   * @returns {Array} - Key features
   */
  extractKeyFeatures(content) {
    const features = [];
    
    // Look for feature sections
    const featureMatches = content.matchAll(/(?:###|##)\s+(?:\d+\.\s+)?(.+?)(?:\n|$)/g);
    
    for (const match of featureMatches) {
      const feature = match[1].trim();
      if (feature.length > 5 && feature.length < 100) {
        features.push(feature);
      }
    }
    
    return features.slice(0, 5); // Top 5 features
  }

  /**
   * Construct name from analysis
   * @param {object} analysis - Content analysis
   * @param {object} options - Naming options
   * @returns {string} - Generated name
   */
  constructName(analysis, options = {}) {
    let name = '';
    
    // Start with core capability
    if (analysis.coreCapability) {
      name = analysis.coreCapability;
    } else {
      // Fallback to title-based name
      name = analysis.title
        .replace(/\s+/g, '_')
        .replace(/[^A-Z0-9_]/gi, '')
        .toUpperCase();
    }
    
    // Add system type if not already present
    const typeExists = Object.values(this.namingPatterns).some(
      pattern => name.includes(pattern.replace('_', ''))
    );
    
    if (!typeExists && analysis.systemType) {
      const suffix = this.namingPatterns[analysis.systemType.toLowerCase()] || '_SYSTEM';
      if (!name.endsWith(suffix)) {
        name += suffix;
      }
    }
    
    // Ensure .md extension
    if (!name.endsWith('.md')) {
      name += '.md';
    }
    
    return name;
  }

  /**
   * Validate and refine generated name
   * @param {string} name - Generated name
   * @param {object} analysis - Content analysis
   * @returns {string} - Refined name
   */
  validateAndRefine(name, analysis) {
    let refined = name;
    
    // Check for generic terms
    for (const term of this.genericTerms) {
      if (refined.includes(term)) {
        console.log(`[descriptive-naming] Warning: Name contains generic term: ${term}`);
      }
    }
    
    // Ensure minimum length (excluding .md)
    const nameWithoutExt = refined.replace('.md', '');
    if (nameWithoutExt.length < 10) {
      console.log('[descriptive-naming] Warning: Name may be too short');
    }
    
    // Ensure underscores instead of spaces
    refined = refined.replace(/\s+/g, '_');
    
    // Remove duplicate underscores
    refined = refined.replace(/_+/g, '_');
    
    // Remove leading/trailing underscores
    refined = refined.replace(/^_+|_+$/g, '');
    
    // Ensure uppercase
    refined = refined.toUpperCase();
    
    return refined;
  }

  /**
   * Generate alternative names
   * @param {object} analysis - Content analysis
   * @returns {Array} - Alternative names
   */
  generateAlternatives(analysis) {
    const alternatives = [];
    
    // Alternative 1: Use first key feature
    if (analysis.keyFeatures.length > 0) {
      const alt1 = this.constructName({
        ...analysis,
        coreCapability: analysis.keyFeatures[0]
          .replace(/\s+/g, '_')
          .replace(/[^A-Z0-9_]/gi, '')
          .toUpperCase()
      });
      alternatives.push(alt1);
    }
    
    // Alternative 2: Combine multiple features
    if (analysis.keyFeatures.length > 1) {
      const combined = analysis.keyFeatures.slice(0, 2)
        .map(f => f.split(' ')[0])
        .join('_')
        .replace(/[^A-Z0-9_]/gi, '')
        .toUpperCase();
      const alt2 = this.constructName({
        ...analysis,
        coreCapability: combined
      });
      alternatives.push(alt2);
    }
    
    // Alternative 3: Use purpose-based extraction
    if (analysis.purpose) {
      const purposeWords = analysis.purpose
        .split(' ')
        .filter(w => w.length > 4)
        .slice(0, 3)
        .join('_')
        .replace(/[^A-Z0-9_]/gi, '')
        .toUpperCase();
      if (purposeWords) {
        const alt3 = this.constructName({
          ...analysis,
          coreCapability: purposeWords
        });
        alternatives.push(alt3);
      }
    }
    
    return [...new Set(alternatives)].slice(0, 3); // Unique, max 3
  }

  /**
   * Calculate confidence score
   * @param {object} analysis - Content analysis
   * @returns {number} - Confidence (0-1)
   */
  calculateConfidence(analysis) {
    let confidence = 0;
    
    if (analysis.title) confidence += 0.2;
    if (analysis.purpose) confidence += 0.2;
    if (analysis.coreCapability && analysis.coreCapability.length > 5) confidence += 0.3;
    if (analysis.systemType !== 'SYSTEM') confidence += 0.2; // Specific type detected
    if (analysis.keyFeatures.length >= 3) confidence += 0.1;
    
    return Math.min(confidence, 1.0);
  }

  /**
   * Generate reasoning for name choice
   * @param {object} analysis - Content analysis
   * @returns {string} - Reasoning
   */
  generateReasoning(analysis) {
    const reasons = [];
    
    if (analysis.coreCapability) {
      reasons.push(`Core capability: ${analysis.coreCapability}`);
    }
    
    if (analysis.systemType) {
      reasons.push(`System type: ${analysis.systemType}`);
    }
    
    if (analysis.keyFeatures.length > 0) {
      reasons.push(`Key features: ${analysis.keyFeatures.slice(0, 2).join(', ')}`);
    }
    
    return reasons.join('; ');
  }

  /**
   * Suggest name for existing file
   * @param {string} currentName - Current file name
   * @param {string} filePath - Path to file
   * @returns {object} - Suggestion with comparison
   */
  async suggestRename(currentName, filePath) {
    const suggestion = await this.generateDescriptiveName(filePath);
    
    return {
      current: currentName,
      suggested: suggestion.name,
      confidence: suggestion.confidence,
      reasoning: suggestion.reasoning,
      shouldRename: suggestion.name !== currentName && suggestion.confidence > 0.7,
      alternatives: suggestion.alternatives
    };
  }

  /**
   * Get naming history
   * @returns {Array} - Naming history
   */
  getNamingHistory() {
    return this.namingHistory;
  }

  /**
   * Export naming patterns for learning
   * @returns {object} - Patterns and statistics
   */
  exportPatterns() {
    return {
      patterns: this.namingPatterns,
      genericTerms: this.genericTerms,
      historyCount: this.namingHistory.length,
      averageConfidence: this.namingHistory.reduce((sum, h) => sum + (h.analysis.confidence || 0), 0) / Math.max(this.namingHistory.length, 1)
    };
  }
}

module.exports = DescriptiveFileNaming;

