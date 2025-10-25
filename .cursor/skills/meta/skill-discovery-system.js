/**
 * Skill Discovery System
 * Automatically detects user intent and recommends appropriate skills
 * Based on Claude Skills insights for skill discovery and recommendation
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class SkillDiscoverySystem {
  constructor() {
    this.skillRegistry = new Map();
    this.intentPatterns = new Map();
    this.recommendationEngine = new Map();
    this.loadIntentPatterns();
    this.loadSkillRegistry();
  }

  /**
   * Load intent patterns for automatic skill discovery
   */
  loadIntentPatterns() {
    const patterns = {
      'seo-optimization': {
        keywords: ['seo', 'search', 'optimize', 'ranking', 'keywords', 'meta'],
        context: ['content', 'blog', 'article', 'website'],
        confidence: 0.9,
        skills: ['seo-optimizer', 'content-optimizer', 'keyword-researcher']
      },
      'security-audit': {
        keywords: ['security', 'vulnerability', 'audit', 'hack', 'breach', 'safe'],
        context: ['code', 'application', 'system', 'database'],
        confidence: 0.95,
        skills: ['security-audit', 'vulnerability-scanner', 'security-analyzer']
      },
      'performance-optimization': {
        keywords: ['slow', 'performance', 'optimize', 'speed', 'bottleneck', 'fast'],
        context: ['application', 'website', 'database', 'query'],
        confidence: 0.85,
        skills: ['performance-optimizer', 'query-optimizer', 'speed-analyzer']
      },
      'testing': {
        keywords: ['test', 'testing', 'coverage', 'unit', 'integration', 'quality'],
        context: ['code', 'function', 'feature', 'bug'],
        confidence: 0.8,
        skills: ['test-generator', 'coverage-analyzer', 'quality-checker']
      },
      'debugging': {
        keywords: ['bug', 'error', 'debug', 'fix', 'issue', 'problem'],
        context: ['code', 'application', 'system', 'function'],
        confidence: 0.9,
        skills: ['debug-analyzer', 'error-fixer', 'issue-resolver']
      },
      'refactoring': {
        keywords: ['refactor', 'clean', 'improve', 'optimize', 'restructure'],
        context: ['code', 'function', 'class', 'module'],
        confidence: 0.75,
        skills: ['code-refactor', 'cleanup-optimizer', 'structure-improver']
      },
      'deployment': {
        keywords: ['deploy', 'production', 'release', 'publish', 'launch'],
        context: ['application', 'website', 'service', 'system'],
        confidence: 0.8,
        skills: ['deployment-optimizer', 'production-readiness', 'release-manager']
      },
      'documentation': {
        keywords: ['document', 'docs', 'readme', 'guide', 'explain'],
        context: ['code', 'api', 'function', 'system'],
        confidence: 0.7,
        skills: ['doc-generator', 'api-documenter', 'guide-creator']
      }
    };

    for (const [intent, pattern] of Object.entries(patterns)) {
      this.intentPatterns.set(intent, pattern);
    }
  }

  /**
   * Load skill registry for discovery
   */
  loadSkillRegistry() {
    // This would load from the actual skills directory
    // For now, we'll simulate with common skills
    const skills = [
      {
        name: 'seo-optimizer',
        description: 'Complete SEO optimization workflow',
        category: 'workflow',
        confidence: 0.9,
        triggers: ['seo', 'optimize', 'content']
      },
      {
        name: 'security-audit',
        description: 'Comprehensive security analysis',
        category: 'workflow',
        confidence: 0.95,
        triggers: ['security', 'audit', 'vulnerability']
      },
      {
        name: 'performance-optimizer',
        description: 'Performance analysis and optimization',
        category: 'workflow',
        confidence: 0.85,
        triggers: ['performance', 'slow', 'optimize']
      },
      {
        name: 'test-generator',
        description: 'Complete test suite generation',
        category: 'workflow',
        confidence: 0.8,
        triggers: ['test', 'testing', 'coverage']
      },
      {
        name: 'debug-analyzer',
        description: 'Error analysis and debugging',
        category: 'utility',
        confidence: 0.9,
        triggers: ['bug', 'error', 'debug']
      },
      {
        name: 'code-refactor',
        description: 'Code refactoring and cleanup',
        category: 'utility',
        confidence: 0.75,
        triggers: ['refactor', 'clean', 'improve']
      }
    ];

    for (const skill of skills) {
      this.skillRegistry.set(skill.name, skill);
    }
  }

  /**
   * Analyze user context and detect intent with enhanced context awareness
   */
  analyzeUserIntent(context) {
    const intents = [];
    const contextText = this.extractContextText(context);
    const enhancedContext = this.enhanceContext(context);
    
    for (const [intent, pattern] of this.intentPatterns) {
      const confidence = this.calculateIntentConfidence(contextText, pattern);
      const enhancedConfidence = this.calculateEnhancedConfidence(enhancedContext, pattern);
      const finalConfidence = Math.max(confidence, enhancedConfidence);
      
      if (finalConfidence > 0.5) {
        intents.push({
          intent,
          confidence: finalConfidence,
          pattern,
          matchedKeywords: this.findMatchedKeywords(contextText, pattern.keywords),
          contextFactors: this.analyzeContextFactors(enhancedContext, pattern)
        });
      }
    }
    
    return intents.sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Extract text from context for analysis
   */
  extractContextText(context) {
    if (typeof context === 'string') {
      return context.toLowerCase();
    }
    
    if (typeof context === 'object') {
      return JSON.stringify(context).toLowerCase();
    }
    
    return '';
  }

  /**
   * Calculate confidence for intent detection
   */
  calculateIntentConfidence(contextText, pattern) {
    let confidence = 0;
    let keywordMatches = 0;
    
    // Check keyword matches
    for (const keyword of pattern.keywords) {
      if (contextText.includes(keyword.toLowerCase())) {
        keywordMatches++;
        confidence += 0.2;
      }
    }
    
    // Check context matches
    for (const context of pattern.context) {
      if (contextText.includes(context.toLowerCase())) {
        confidence += 0.1;
      }
    }
    
    // Apply base confidence
    confidence += pattern.confidence * 0.3;
    
    return Math.min(confidence, 1.0);
  }

  /**
   * Find matched keywords
   */
  findMatchedKeywords(contextText, keywords) {
    return keywords.filter(keyword => 
      contextText.includes(keyword.toLowerCase())
    );
  }

  /**
   * Recommend skills based on detected intents
   */
  recommendSkills(intents, maxRecommendations = 3) {
    const recommendations = [];
    
    for (const intent of intents) {
      const intentSkills = this.getSkillsForIntent(intent.intent);
      
      for (const skillName of intentSkills) {
        const skill = this.skillRegistry.get(skillName);
        if (skill) {
          recommendations.push({
            skill,
            intent: intent.intent,
            confidence: intent.confidence * skill.confidence,
            reason: `Detected ${intent.intent} intent with ${Math.round(intent.confidence * 100)}% confidence`
          });
        }
      }
    }
    
    // Remove duplicates and sort by confidence
    const uniqueRecommendations = this.removeDuplicateRecommendations(recommendations);
    return uniqueRecommendations
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, maxRecommendations);
  }

  /**
   * Get skills for specific intent
   */
  getSkillsForIntent(intent) {
    const pattern = this.intentPatterns.get(intent);
    return pattern ? pattern.skills : [];
  }

  /**
   * Remove duplicate skill recommendations
   */
  removeDuplicateRecommendations(recommendations) {
    const seen = new Set();
    return recommendations.filter(rec => {
      if (seen.has(rec.skill.name)) {
        return false;
      }
      seen.add(rec.skill.name);
      return true;
    });
  }

  /**
   * Discover skills automatically based on context
   */
  discoverSkills(context) {
    console.log('[skill-discovery] Analyzing context for skill opportunities...');
    
    // Analyze user intent
    const intents = this.analyzeUserIntent(context);
    console.log(`[skill-discovery] Detected ${intents.length} intents:`, 
      intents.map(i => `${i.intent} (${Math.round(i.confidence * 100)}%)`));
    
    // Get skill recommendations
    const recommendations = this.recommendSkills(intents);
    console.log(`[skill-discovery] Found ${recommendations.length} skill recommendations`);
    
    return {
      intents,
      recommendations,
      context,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Create skill discovery report
   */
  createDiscoveryReport(discovery) {
    const report = {
      timestamp: discovery.timestamp,
      context: discovery.context,
      intents: discovery.intents.map(intent => ({
        intent: intent.intent,
        confidence: Math.round(intent.confidence * 100),
        matchedKeywords: intent.matchedKeywords
      })),
      recommendations: discovery.recommendations.map(rec => ({
        skill: rec.skill.name,
        description: rec.skill.description,
        confidence: Math.round(rec.confidence * 100),
        reason: rec.reason
      }))
    };
    
    return report;
  }

  /**
   * Execute recommended skills automatically
   */
  executeRecommendedSkills(discovery, autoExecute = false) {
    const results = [];
    
    for (const recommendation of discovery.recommendations) {
      if (recommendation.confidence >= 0.8 || autoExecute) {
        console.log(`[skill-discovery] Executing skill: ${recommendation.skill.name}`);
        
        try {
          // This would integrate with the actual skill execution system
          const result = this.executeSkill(recommendation.skill.name, discovery.context);
          results.push({
            skill: recommendation.skill.name,
            success: true,
            result,
            confidence: recommendation.confidence
          });
        } catch (error) {
          console.error(`[skill-discovery] Skill execution failed: ${error.message}`);
          results.push({
            skill: recommendation.skill.name,
            success: false,
            error: error.message,
            confidence: recommendation.confidence
          });
        }
      } else {
        console.log(`[skill-discovery] Skipping skill ${recommendation.skill.name} - confidence too low (${Math.round(recommendation.confidence * 100)}%)`);
      }
    }
    
    return results;
  }

  /**
   * Execute a specific skill
   */
  executeSkill(skillName, context) {
    // This would integrate with the actual skill execution system
    console.log(`[skill-discovery] Executing skill: ${skillName} with context:`, context);
    
    // Simulate skill execution
    return {
      skill: skillName,
      executed: true,
      timestamp: new Date().toISOString(),
      context
    };
  }

  /**
   * Enhance context with additional information
   */
  enhanceContext(context) {
    const enhanced = {
      original: context,
      text: this.extractContextText(context),
      type: this.detectContextType(context),
      complexity: this.assessContextComplexity(context),
      urgency: this.assessUrgency(context),
      domain: this.detectDomain(context),
      patterns: this.extractPatterns(context)
    };
    
    return enhanced;
  }

  /**
   * Calculate enhanced confidence with context factors
   */
  calculateEnhancedConfidence(enhancedContext, pattern) {
    let confidence = 0;
    
    // Base confidence from keyword matching
    confidence += this.calculateIntentConfidence(enhancedContext.text, pattern);
    
    // Context type bonus
    if (pattern.context.includes(enhancedContext.type)) {
      confidence += 0.2;
    }
    
    // Domain alignment bonus
    if (this.isDomainAligned(enhancedContext.domain, pattern)) {
      confidence += 0.15;
    }
    
    // Urgency factor
    if (enhancedContext.urgency === 'high' && pattern.confidence > 0.8) {
      confidence += 0.1;
    }
    
    // Complexity factor
    if (enhancedContext.complexity === 'high' && pattern.skills.length > 1) {
      confidence += 0.1;
    }
    
    return Math.min(confidence, 1.0);
  }

  /**
   * Analyze context factors for better recommendations
   */
  analyzeContextFactors(enhancedContext, pattern) {
    return {
      type: enhancedContext.type,
      complexity: enhancedContext.complexity,
      urgency: enhancedContext.urgency,
      domain: enhancedContext.domain,
      patternAlignment: this.calculatePatternAlignment(enhancedContext, pattern)
    };
  }

  /**
   * Detect context type
   */
  detectContextType(context) {
    if (typeof context === 'string') {
      if (context.includes('error') || context.includes('bug')) return 'error';
      if (context.includes('optimize') || context.includes('improve')) return 'optimization';
      if (context.includes('test') || context.includes('coverage')) return 'testing';
      if (context.includes('deploy') || context.includes('production')) return 'deployment';
      return 'general';
    }
    
    if (typeof context === 'object') {
      if (context.type) return context.type;
      if (context.error) return 'error';
      if (context.optimization) return 'optimization';
      return 'structured';
    }
    
    return 'unknown';
  }

  /**
   * Assess context complexity
   */
  assessContextComplexity(context) {
    const text = this.extractContextText(context);
    const wordCount = text.split(' ').length;
    const sentenceCount = text.split('.').length;
    const technicalTerms = this.countTechnicalTerms(text);
    
    if (wordCount > 100 || technicalTerms > 5) return 'high';
    if (wordCount > 50 || technicalTerms > 2) return 'medium';
    return 'low';
  }

  /**
   * Assess urgency level
   */
  assessUrgency(context) {
    const text = this.extractContextText(context);
    const urgentKeywords = ['urgent', 'critical', 'emergency', 'asap', 'immediately', 'fix now'];
    const urgentFound = urgentKeywords.some(keyword => text.includes(keyword));
    
    if (urgentFound) return 'high';
    if (text.includes('soon') || text.includes('priority')) return 'medium';
    return 'low';
  }

  /**
   * Detect domain from context
   */
  detectDomain(context) {
    const text = this.extractContextText(context);
    const domains = {
      'web': ['html', 'css', 'javascript', 'react', 'vue', 'angular'],
      'backend': ['api', 'server', 'database', 'node', 'python', 'java'],
      'mobile': ['ios', 'android', 'react native', 'flutter'],
      'data': ['sql', 'database', 'analytics', 'ml', 'ai'],
      'devops': ['deploy', 'docker', 'kubernetes', 'ci/cd', 'infrastructure']
    };
    
    for (const [domain, keywords] of Object.entries(domains)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        return domain;
      }
    }
    
    return 'general';
  }

  /**
   * Extract patterns from context
   */
  extractPatterns(context) {
    const text = this.extractContextText(context);
    const patterns = [];
    
    // Code patterns
    if (text.includes('function') || text.includes('class')) patterns.push('code');
    if (text.includes('test') || text.includes('spec')) patterns.push('testing');
    if (text.includes('error') || text.includes('exception')) patterns.push('error');
    if (text.includes('optimize') || text.includes('performance')) patterns.push('optimization');
    
    return patterns;
  }

  /**
   * Count technical terms
   */
  countTechnicalTerms(text) {
    const technicalTerms = [
      'function', 'class', 'method', 'variable', 'array', 'object',
      'api', 'database', 'server', 'client', 'framework', 'library',
      'algorithm', 'data structure', 'pattern', 'architecture'
    ];
    
    return technicalTerms.filter(term => text.includes(term)).length;
  }

  /**
   * Check if domain is aligned with pattern
   */
  isDomainAligned(domain, pattern) {
    const domainKeywords = {
      'web': ['html', 'css', 'javascript', 'frontend'],
      'backend': ['api', 'server', 'database', 'backend'],
      'mobile': ['mobile', 'ios', 'android'],
      'data': ['data', 'analytics', 'database'],
      'devops': ['deploy', 'infrastructure', 'ci/cd']
    };
    
    const domainTerms = domainKeywords[domain] || [];
    return domainTerms.some(term => 
      pattern.keywords.some(keyword => keyword.includes(term))
    );
  }

  /**
   * Calculate pattern alignment
   */
  calculatePatternAlignment(enhancedContext, pattern) {
    let alignment = 0;
    
    // Context type alignment
    if (pattern.context.includes(enhancedContext.type)) {
      alignment += 0.3;
    }
    
    // Domain alignment
    if (this.isDomainAligned(enhancedContext.domain, pattern)) {
      alignment += 0.3;
    }
    
    // Pattern matching
    const patternMatches = enhancedContext.patterns.filter(p => 
      pattern.keywords.some(keyword => keyword.includes(p))
    ).length;
    
    alignment += (patternMatches / enhancedContext.patterns.length) * 0.4;
    
    return Math.min(alignment, 1.0);
  }

  /**
   * Learn from skill discovery patterns with enhanced analysis
   */
  learnFromDiscovery(discovery, results) {
    const learning = {
      timestamp: new Date().toISOString(),
      context: discovery.context,
      intents: discovery.intents,
      recommendations: discovery.recommendations,
      results: results,
      successRate: results.filter(r => r.success).length / results.length,
      averageConfidence: results.reduce((sum, r) => sum + r.confidence, 0) / results.length,
      contextAnalysis: this.analyzeContextLearning(discovery, results),
      patternInsights: this.extractPatternInsights(discovery, results)
    };
    
    console.log(`[skill-discovery] Enhanced learning captured: ${learning.successRate * 100}% success rate, ${Math.round(learning.averageConfidence * 100)}% avg confidence`);
    
    // Save to autonomous evolution journal
    this.saveToEvolutionJournal(learning);
    
    return learning;
  }

  /**
   * Analyze context learning patterns
   */
  analyzeContextLearning(discovery, results) {
    const contextTypes = discovery.intents.map(intent => intent.contextFactors?.type).filter(Boolean);
    const successfulResults = results.filter(r => r.success);
    
    return {
      contextTypes: [...new Set(contextTypes)],
      successByContext: this.calculateSuccessByContext(contextTypes, results),
      contextEffectiveness: this.calculateContextEffectiveness(discovery, results)
    };
  }

  /**
   * Extract pattern insights
   */
  extractPatternInsights(discovery, results) {
    const insights = [];
    
    // High confidence, high success
    const highConfidenceHighSuccess = results.filter(r => r.confidence > 0.8 && r.success);
    if (highConfidenceHighSuccess.length > 0) {
      insights.push({
        type: 'high_confidence_success',
        count: highConfidenceHighSuccess.length,
        message: 'High confidence recommendations are highly successful'
      });
    }
    
    // Low confidence, high success
    const lowConfidenceHighSuccess = results.filter(r => r.confidence < 0.6 && r.success);
    if (lowConfidenceHighSuccess.length > 0) {
      insights.push({
        type: 'low_confidence_success',
        count: lowConfidenceHighSuccess.length,
        message: 'Some low confidence recommendations are successful - consider adjusting confidence thresholds'
      });
    }
    
    return insights;
  }

  /**
   * Calculate success by context
   */
  calculateSuccessByContext(contextTypes, results) {
    const successByContext = {};
    
    for (const contextType of contextTypes) {
      const contextResults = results.filter(r => r.contextType === contextType);
      const successRate = contextResults.length > 0 ? 
        contextResults.filter(r => r.success).length / contextResults.length : 0;
      
      successByContext[contextType] = successRate;
    }
    
    return successByContext;
  }

  /**
   * Calculate context effectiveness
   */
  calculateContextEffectiveness(discovery, results) {
    const totalResults = results.length;
    const successfulResults = results.filter(r => r.success).length;
    
    return {
      overall: totalResults > 0 ? successfulResults / totalResults : 0,
      byIntent: discovery.intents.map(intent => ({
        intent: intent.intent,
        confidence: intent.confidence,
        effectiveness: this.calculateIntentEffectiveness(intent, results)
      }))
    };
  }

  /**
   * Calculate intent effectiveness
   */
  calculateIntentEffectiveness(intent, results) {
    const intentResults = results.filter(r => r.intent === intent.intent);
    return intentResults.length > 0 ? 
      intentResults.filter(r => r.success).length / intentResults.length : 0;
  }

  /**
   * Save to autonomous evolution journal
   */
  saveToEvolutionJournal(learning) {
    const entry = {
      timestamp: learning.timestamp,
      type: 'skill_discovery_learning',
      contextAnalysis: learning.contextAnalysis,
      patternInsights: learning.patternInsights,
      successRate: learning.successRate,
      averageConfidence: learning.averageConfidence
    };
    
    console.log('Saving skill discovery learning:', entry);
  }
}

module.exports = SkillDiscoverySystem;
