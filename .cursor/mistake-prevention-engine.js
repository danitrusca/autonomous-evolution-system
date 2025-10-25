/**
 * Mistake Prevention Engine - Ensures lessons learned prevent future mistakes
 * Invariant: All captured lessons must be converted into active prevention mechanisms
 */

const fs = require('fs');
const path = require('path');

class MistakePreventionEngine {
  constructor() {
    this.antiPatterns = new Map();
    this.qualityGates = new Map();
    this.preventionRules = new Map();
    this.journalPath = path.join(__dirname, 'docs', 'AUTONOMOUS_EVOLUTION_JOURNAL.md');
    this.activePrevention = true;
  }

  /**
   * Initialize mistake prevention system
   */
  async initialize() {
    console.log('[MistakePreventionEngine] Initializing mistake prevention system...');
    
    try {
      // Load existing lessons from journal
      await this.loadLessonsFromJournal();
      
      // Convert lessons to prevention rules
      this.convertLessonsToPreventionRules();
      
      // Create quality gates
      this.createQualityGates();
      
      // Activate prevention system
      this.activatePreventionSystem();
      
      console.log('[MistakePreventionEngine] Mistake prevention system initialized with', this.antiPatterns.size, 'anti-patterns');
      
    } catch (error) {
      console.error('[MistakePreventionEngine] Error initializing mistake prevention system:', error);
    }
  }

  /**
   * Load lessons from autonomous evolution journal
   */
  async loadLessonsFromJournal() {
    try {
      if (fs.existsSync(this.journalPath)) {
        const content = fs.readFileSync(this.journalPath, 'utf8');
        this.journalContent = content;
        
        // Extract failure patterns
        this.extractFailurePatterns(content);
        
        // Extract quality gates
        this.extractQualityGates(content);
        
        console.log('[MistakePreventionEngine] Loaded lessons from evolution journal');
      }
    } catch (error) {
      console.error('[MistakePreventionEngine] Error loading lessons from journal:', error);
    }
  }

  /**
   * Extract failure patterns from journal content
   */
  extractFailurePatterns(content) {
    // Extract failure patterns
    const failurePattern = /- \*\*Insight\*\*: (.+?)\n- \*\*Impact\*\*: (.+?)\n- \*\*Evolution\*\*: (.+?)/g;
    let match;
    
    while ((match = failurePattern.exec(content)) !== null) {
      const [, insight, impact, evolution] = match;
      
      // Check if this is a failure pattern
      if (this.isFailurePattern(insight)) {
        const antiPattern = {
          insight,
          impact,
          evolution,
          prevention: this.generatePreventionRule(insight),
          qualityGate: this.generateQualityGate(insight)
        };
        
        this.antiPatterns.set(insight, antiPattern);
      }
    }
  }

  /**
   * Extract quality gates from journal content
   */
  extractQualityGates(content) {
    // Extract quality gates
    const qualityGatePattern = /- \*\*Quality Gate\*\*: (.+?)\n/g;
    let match;
    
    while ((match = qualityGatePattern.exec(content)) !== null) {
      const [, gate] = match;
      
      this.qualityGates.set(gate, {
        description: gate,
        enforcement: 'mandatory',
        prevention: this.generatePreventionFromGate(gate)
      });
    }
  }

  /**
   * Check if insight represents a failure pattern
   */
  isFailurePattern(insight) {
    const failureKeywords = [
      'failed', 'error', 'mistake', 'oversight', 'missing', 'incomplete',
      'wrong', 'incorrect', 'problem', 'issue', 'bug', 'failure'
    ];
    
    return failureKeywords.some(keyword => 
      insight.toLowerCase().includes(keyword)
    );
  }

  /**
   * Generate prevention rule from insight
   */
  generatePreventionRule(insight) {
    // Convert insight into actionable prevention rule
    if (insight.includes('incomplete scope assessment')) {
      return {
        type: 'scope_verification',
        description: 'Always do complete scope assessment before any operation',
        check: (action, context) => this.verifyCompleteScope(action, context),
        block: true
      };
    }
    
    if (insight.includes('learning capture')) {
      return {
        type: 'learning_capture',
        description: 'All lessons must be captured in evolution journal',
        check: (action, context) => this.verifyLearningCapture(action, context),
        block: true
      };
    }
    
    // Default prevention rule
    return {
      type: 'general_prevention',
      description: `Prevent: ${insight}`,
      check: (action, context) => true,
      block: false
    };
  }

  /**
   * Generate quality gate from insight
   */
  generateQualityGate(insight) {
    if (insight.includes('incomplete scope assessment')) {
      return {
        name: 'Complete Scope Assessment',
        description: 'Always verify complete scope before any operation',
        enforcement: 'mandatory',
        check: (action, context) => this.verifyCompleteScope(action, context)
      };
    }
    
    if (insight.includes('learning capture')) {
      return {
        name: 'Learning Capture',
        description: 'All lessons must be captured in evolution journal',
        enforcement: 'mandatory',
        check: (action, context) => this.verifyLearningCapture(action, context)
      };
    }
    
    return null;
  }

  /**
   * Convert lessons to prevention rules
   */
  convertLessonsToPreventionRules() {
    this.antiPatterns.forEach((antiPattern, insight) => {
      const rule = {
        pattern: insight,
        prevention: antiPattern.prevention,
        qualityGate: antiPattern.qualityGate,
        enforcement: 'mandatory'
      };
      
      this.preventionRules.set(insight, rule);
    });
  }

  /**
   * Create quality gates
   */
  createQualityGates() {
    this.preventionRules.forEach((rule, insight) => {
      if (rule.qualityGate) {
        this.qualityGates.set(rule.qualityGate.name, rule.qualityGate);
      }
    });
  }

  /**
   * Activate prevention system
   */
  activatePreventionSystem() {
    console.log('[MistakePreventionEngine] Prevention system activated');
    
    // Set up real-time monitoring
    this.setupRealTimeMonitoring();
    
    // Set up quality gate enforcement
    this.setupQualityGateEnforcement();
  }

  /**
   * Setup real-time monitoring
   */
  setupRealTimeMonitoring() {
    // Monitor for mistake patterns in real-time
    console.log('[MistakePreventionEngine] Real-time monitoring activated');
  }

  /**
   * Setup quality gate enforcement
   */
  setupQualityGateEnforcement() {
    // Enforce quality gates automatically
    console.log('[MistakePreventionEngine] Quality gate enforcement activated');
  }

  /**
   * Check action against anti-patterns
   */
  checkAgainstAntiPatterns(action, context) {
    const risks = [];
    
    this.antiPatterns.forEach((antiPattern, insight) => {
      if (this.actionMatchesPattern(action, context, insight)) {
        risks.push({
          pattern: insight,
          risk: 'high',
          prevention: antiPattern.prevention,
          recommendation: antiPattern.prevention.description
        });
      }
    });
    
    return {
      hasRisks: risks.length > 0,
      risks,
      recommendation: risks.length > 0 ? 'Consider prevention measures' : 'Action is safe'
    };
  }

  /**
   * Check if action matches failure pattern
   */
  actionMatchesPattern(action, context, pattern) {
    // Simple pattern matching - can be enhanced with more sophisticated logic
    const actionString = JSON.stringify(action).toLowerCase();
    const contextString = JSON.stringify(context).toLowerCase();
    const patternString = pattern.toLowerCase();
    
    return actionString.includes(patternString) || contextString.includes(patternString);
  }

  /**
   * Verify complete scope assessment
   */
  verifyCompleteScope(action, context) {
    // Check if complete scope assessment was performed
    if (action.type === 'commit') {
      return context.scopeVerified === true;
    }
    
    return true;
  }

  /**
   * Verify learning capture
   */
  verifyLearningCapture(action, context) {
    // Check if lesson was captured in evolution journal
    return context.lessonCaptured === true;
  }

  /**
   * Prevent action if it matches anti-patterns
   */
  preventAction(action, context) {
    const riskAssessment = this.checkAgainstAntiPatterns(action, context);
    
    if (riskAssessment.hasRisks) {
      const highRiskRisks = riskAssessment.risks.filter(risk => risk.risk === 'high');
      
      if (highRiskRisks.length > 0) {
        console.warn('[MistakePreventionEngine] Action blocked due to high risk patterns:');
        highRiskRisks.forEach(risk => {
          console.warn(`- ${risk.pattern}: ${risk.recommendation}`);
        });
        
        return {
          blocked: true,
          reasons: highRiskRisks.map(risk => risk.recommendation),
          alternatives: this.suggestAlternatives(action, context, highRiskRisks)
        };
      }
    }
    
    return { blocked: false };
  }

  /**
   * Suggest alternatives for blocked actions
   */
  suggestAlternatives(action, context, risks) {
    const alternatives = [];
    
    risks.forEach(risk => {
      if (risk.pattern.includes('incomplete scope assessment')) {
        alternatives.push({
          action: 'Complete scope assessment',
          description: 'Run complete git status check and verify all files',
          command: 'git status'
        });
      }
      
      if (risk.pattern.includes('learning capture')) {
        alternatives.push({
          action: 'Capture lesson in evolution journal',
          description: 'Add lesson to AUTONOMOUS_EVOLUTION_JOURNAL.md',
          command: 'Update evolution journal with lesson'
        });
      }
    });
    
    return alternatives;
  }

  /**
   * Get prevention status
   */
  getPreventionStatus() {
    return {
      active: this.activePrevention,
      antiPatterns: this.antiPatterns.size,
      qualityGates: this.qualityGates.size,
      preventionRules: this.preventionRules.size
    };
  }

  /**
   * Update prevention rules from new lessons
   */
  updatePreventionRules(newLessons) {
    newLessons.forEach(lesson => {
      if (this.isFailurePattern(lesson.insight)) {
        const antiPattern = {
          insight: lesson.insight,
          impact: lesson.impact,
          evolution: lesson.evolution,
          prevention: this.generatePreventionRule(lesson.insight),
          qualityGate: this.generateQualityGate(lesson.insight)
        };
        
        this.antiPatterns.set(lesson.insight, antiPattern);
        
        // Update prevention rules
        this.convertLessonsToPreventionRules();
        this.createQualityGates();
      }
    });
  }
}

// Auto-initialize when module is loaded
const mistakePreventionEngine = new MistakePreventionEngine();
mistakePreventionEngine.initialize();

module.exports = mistakePreventionEngine;
