/**
 * Principles Engine
 * 
 * Provides access to the principles library for autonomous decision making
 * Integrates with the EVOLUTION_JOURNAL.md principles library
 */

const fs = require('fs');
const path = require('path');

class PrinciplesEngine {
  constructor() {
    this.principles = new Map();
    this.journalPath = path.join(__dirname, '..', 'docs', 'EVOLUTION_JOURNAL.md');
    this.loadPrinciples();
  }

  /**
   * Load principles from the journal
   * Invariant: Principles are always loaded from the journal
   */
  loadPrinciples() {
    try {
      const content = fs.readFileSync(this.journalPath, 'utf8');
      this.parsePrinciples(content);
    } catch (error) {
      console.error('[principles-engine] Failed to load principles:', error.message);
    }
  }

  /**
   * Parse principles from journal content
   * Invariant: Principles are parsed consistently
   */
  parsePrinciples(content) {
    const principleRegex = /#### Principle \d+: ([^\n]+)\n\*\*Definition\*\*: ([^\n]+)\n\*\*Source\*\*: ([^\n]+)\n\*\*Evidence\*\*: ([^\n]+)\n\*\*Application\*\*: ([^\n]+)\n\*\*Confidence\*\*: ([\d.]+)/g;
    
    let match;
    while ((match = principleRegex.exec(content)) !== null) {
      const [, name, definition, source, evidence, application, confidence] = match;
      
      this.principles.set(name, {
        definition,
        source,
        evidence,
        application,
        confidence: parseFloat(confidence),
        lastUpdated: new Date().toISOString()
      });
    }
  }

  /**
   * Get a principle by name
   * Invariant: Returns principle if exists, null otherwise
   */
  getPrinciple(name) {
    return this.principles.get(name) || null;
  }

  /**
   * Get all principles
   * Invariant: Returns all loaded principles
   */
  getAllPrinciples() {
    return Array.from(this.principles.entries()).map(([name, data]) => ({
      name,
      ...data
    }));
  }

  /**
   * Get principles by confidence level
   * Invariant: Returns principles meeting confidence threshold
   */
  getPrinciplesByConfidence(minConfidence = 0.8) {
    return this.getAllPrinciples().filter(p => p.confidence >= minConfidence);
  }

  /**
   * Get principles for a specific application area
   * Invariant: Returns principles matching application pattern
   */
  getPrinciplesForApplication(applicationPattern) {
    return this.getAllPrinciples().filter(p => 
      p.application.toLowerCase().includes(applicationPattern.toLowerCase())
    );
  }

  /**
   * Suggest principles for a decision scenario
   * Invariant: Returns relevant principles for the scenario
   */
  suggestPrinciples(scenario) {
    const suggestions = [];
    
    // Simple keyword matching for now
    const keywords = scenario.toLowerCase().split(' ');
    
    for (const [name, principle] of this.principles) {
      const relevance = this.calculateRelevance(principle, keywords);
      if (relevance > 0.3) {
        suggestions.push({
          principle: name,
          relevance,
          confidence: principle.confidence,
          definition: principle.definition,
          application: principle.application
        });
      }
    }
    
    return suggestions.sort((a, b) => b.relevance - a.relevance);
  }

  /**
   * Calculate relevance score for a principle
   * Invariant: Returns relevance score between 0 and 1
   */
  calculateRelevance(principle, keywords) {
    let score = 0;
    const text = `${principle.definition} ${principle.application}`.toLowerCase();
    
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        score += 0.1;
      }
    }
    
    return Math.min(score, 1.0);
  }

  /**
   * Get principle statistics
   * Invariant: Returns accurate statistics
   */
  getStatistics() {
    const principles = this.getAllPrinciples();
    
    return {
      totalPrinciples: principles.length,
      averageConfidence: principles.reduce((sum, p) => sum + p.confidence, 0) / principles.length,
      highConfidencePrinciples: principles.filter(p => p.confidence >= 0.9).length,
      recentPrinciples: principles.filter(p => 
        new Date(p.lastUpdated) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).length
    };
  }

  /**
   * Reload principles from journal
   * Invariant: Principles are refreshed from source
   */
  reload() {
    this.principles.clear();
    this.loadPrinciples();
  }
}

module.exports = PrinciplesEngine;
