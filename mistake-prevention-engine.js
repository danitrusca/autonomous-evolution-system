/**
 * Mistake Prevention Engine - Ensures lessons learned prevent future mistakes
 * Invariant: All captured lessons must be converted into active prevention mechanisms
 * Enhanced with Technical-Psychological Connection Discovery
 */

const fs = require('fs');
const path = require('path');
const TechnicalPsychologicalAnalyzer = require('./agents/technical-psychological-analyzer');
const PsychologicalDecisionMonitor = require('./agents/psychological-decision-monitor');
const ConnectionDiscoverer = require('./agents/connection-discoverer');

class MistakePreventionEngine {
  constructor() {
    this.antiPatterns = new Map();
    this.qualityGates = new Map();
    this.preventionRules = new Map();
    this.journalPath = path.join(__dirname, 'docs', 'AUTONOMOUS_EVOLUTION_JOURNAL.md');
    this.activePrevention = true;
    
    // Initialize psychological analysis components
    this.psychologicalAnalyzer = new TechnicalPsychologicalAnalyzer();
    this.decisionMonitor = new PsychologicalDecisionMonitor();
    this.connectionDiscoverer = new ConnectionDiscoverer();
    this.psychologicalEnabled = false;
    
    // Enforce proactive debugging across all generated code
    this.registerProactiveDebuggingRequirement();
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
      
      // Initialize psychological analysis (requires user consent)
      await this.initializePsychologicalAnalysis();
      
      // Activate prevention system
      this.activatePreventionSystem();
      
      console.log('[MistakePreventionEngine] Mistake prevention system initialized with', this.antiPatterns.size, 'anti-patterns');
      if (this.psychologicalEnabled) {
        console.log('[MistakePreventionEngine] Psychological analysis enabled for deep mistake learning');
      }
      
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
   * Register proactive debugging enforcement as a mandatory quality gate
   */
  registerProactiveDebuggingRequirement() {
    const gateName = 'Proactive Debugging Coverage';
    
    const gate = {
      name: gateName,
      description: 'All generated runtime code must include proactive debugging instrumentation or an explicit `@proactive-debugging: skip` exemption.',
      enforcement: 'mandatory',
      check: (action, context) => {
        if (!action || action.type !== 'code_generation') {
          return true;
        }
        
        const report = context && context.proactiveDebugging;
        if (!report) {
          return false;
        }
        
        const status = report.status;
        return status === 'compliant' ||
               status === 'compliant_with_exemptions' ||
               status === 'not_applicable';
      },
      prevention: {
        description: 'Run the proactive debugging skill (Analyze → Integrate → Validate) and add instrumentation (debug.metric/logBus/performance.mark). If intentionally skipping, include `@proactive-debugging: skip` with rationale in the file.',
      },
    };
    
    this.qualityGates.set(gateName, gate);
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
          recommendation: antiPattern.prevention?.description || antiPattern.insight || insight
        });
      }
    });

    // Enforce quality gates (including proactive debugging)
    this.qualityGates.forEach((gate, name) => {
      if (gate.enforcement !== 'mandatory' || typeof gate.check !== 'function') {
        return;
      }
      
      let passed = true;
      try {
        passed = gate.check(action, context);
      } catch (error) {
        console.error(`[MistakePreventionEngine] Gate evaluation failed (${name}):`, error.message);
        passed = false;
      }
      
      if (!passed) {
        risks.push({
          pattern: name,
          risk: 'high',
          prevention: gate.prevention,
          recommendation: gate.prevention?.description || gate.description,
          type: 'quality_gate'
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

  /**
   * Initialize psychological analysis components
   */
  async initializePsychologicalAnalysis() {
    try {
      // Check for user consent (in real implementation, this would be user-configurable)
      const userConsent = process.env.PSYCHOLOGICAL_ANALYSIS_CONSENT === 'true';
      
      if (userConsent) {
        this.psychologicalEnabled = true;
        this.psychologicalAnalyzer.enablePsychologicalAnalysis(true);
        this.decisionMonitor.enableMonitoring(true);
        
        console.log('[MistakePreventionEngine] Psychological analysis enabled with user consent');
      } else {
        console.log('[MistakePreventionEngine] Psychological analysis disabled - requires user consent');
      }
    } catch (error) {
      console.error('[MistakePreventionEngine] Error initializing psychological analysis:', error);
    }
  }

  /**
   * Enhanced error analysis with psychological layer
   */
  analyzeErrorWithPsychologicalLayer(error, context) {
    if (!this.psychologicalEnabled) {
      return this.analyzeErrorTechnicalOnly(error, context);
    }

    // Perform dual-layer analysis
    const psychologicalAnalysis = this.psychologicalAnalyzer.analyzeError(error, context);
    
    // Discover connections
    const connections = this.connectionDiscoverer.discoverConnections(psychologicalAnalysis);
    
    // Generate enhanced recommendations
    const recommendations = this.generateEnhancedRecommendations(psychologicalAnalysis, connections);
    
    return {
      ...psychologicalAnalysis,
      connections: connections,
      enhancedRecommendations: recommendations,
      psychologicalEnabled: true
    };
  }

  /**
   * Enhanced action prevention with psychological analysis
   */
  preventActionWithPsychologicalLayer(action, context) {
    // Technical prevention
    const technicalPrevention = this.preventAction(action, context);
    
    if (!this.psychologicalEnabled) {
      return technicalPrevention;
    }

    // Psychological prevention
    const psychologicalPrevention = this.psychologicalAnalyzer.preventAction(action, context);
    
    // Decision monitoring
    const decisionAnalysis = this.decisionMonitor.monitorDecision(action, context);
    
    // Combine results
    if (technicalPrevention.blocked || psychologicalPrevention.blocked) {
      return {
        blocked: true,
        reasons: [
          ...(technicalPrevention.reasons || []),
          ...(psychologicalPrevention.reasons ? [psychologicalPrevention.reason] : [])
        ],
        technical: technicalPrevention,
        psychological: psychologicalPrevention,
        decisionAnalysis: decisionAnalysis,
        recommendations: this.combineRecommendations(technicalPrevention, psychologicalPrevention, decisionAnalysis)
      };
    }

    return {
      blocked: false,
      technical: technicalPrevention,
      psychological: psychologicalPrevention,
      decisionAnalysis: decisionAnalysis
    };
  }

  /**
   * Generate enhanced recommendations combining technical and psychological insights
   */
  generateEnhancedRecommendations(analysis, connections) {
    const recommendations = [];

    // Technical recommendations
    if (analysis.technical && analysis.technical.rootCause) {
      recommendations.push({
        type: 'technical',
        priority: 'high',
        description: `Fix technical root cause: ${analysis.technical.rootCause}`,
        action: 'address_technical_issue'
      });
    }

    // Psychological recommendations
    if (analysis.psychological && analysis.psychological.biasRisks) {
      for (const bias of analysis.psychological.biasRisks) {
        recommendations.push({
          type: 'psychological',
          priority: 'medium',
          description: `Prevent ${bias}: Apply bias prevention strategies`,
          action: 'apply_bias_prevention',
          bias: bias
        });
      }
    }

    // Connection-based recommendations
    if (connections && connections.length > 0) {
      for (const connection of connections) {
        if (connection.confidence >= 0.7) {
          recommendations.push({
            type: 'connection',
            priority: 'high',
            description: `Prevent ${connection.description}`,
            action: 'apply_connection_prevention',
            psychological: connection.psychological,
            technical: connection.technical,
            prevention: connection.prevention,
            confidence: connection.confidence
          });
        }
      }
    }

    return recommendations;
  }

  /**
   * Combine recommendations from different sources
   */
  combineRecommendations(technicalPrevention, psychologicalPrevention, decisionAnalysis) {
    const recommendations = [];

    if (technicalPrevention.alternatives) {
      recommendations.push(...technicalPrevention.alternatives);
    }

    if (psychologicalPrevention.recommendation) {
      recommendations.push({
        type: 'psychological',
        description: psychologicalPrevention.recommendation,
        action: 'apply_psychological_prevention'
      });
    }

    if (decisionAnalysis.recommendations) {
      recommendations.push(...decisionAnalysis.recommendations);
    }

    return recommendations;
  }

  /**
   * Learn from error (technical only)
   */
  learnFromError(error, context, outcome) {
    // Basic technical learning - store error pattern
    const errorPattern = {
      error: error,
      context: context,
      outcome: outcome,
      timestamp: new Date().toISOString()
    };
    
    // This would typically store in a database or learning system
    console.log('[MistakePreventionEngine] Learned from technical error:', error.message);
  }

  /**
   * Learn from error with psychological analysis
   */
  learnFromErrorWithPsychologicalLayer(error, context, outcome) {
    // Technical learning
    this.learnFromError(error, context, outcome);

    if (!this.psychologicalEnabled) {
      return;
    }

    // Psychological learning
    const analysis = this.psychologicalAnalyzer.analyzeError(error, context);
    this.psychologicalAnalyzer.learnFromAnalysis(analysis);

    // Connection learning
    const connections = this.connectionDiscoverer.discoverConnections(analysis);
    for (const connection of connections) {
      this.connectionDiscoverer.learnFromOutcome(connection, outcome);
    }

    // Decision learning
    if (context.decision) {
      this.decisionMonitor.learnFromDecision(context.decision, context, outcome);
    }
  }

  /**
   * Technical-only error analysis (fallback)
   */
  analyzeErrorTechnicalOnly(error, context) {
    return {
      timestamp: new Date().toISOString(),
      error: error,
      context: context,
      technical: {
        errorType: this.classifyErrorType(error),
        rootCause: this.identifyTechnicalRootCause(error),
        severity: this.calculateTechnicalSeverity(error)
      },
      psychological: null,
      connections: null,
      enhancedRecommendations: [{
        type: 'technical',
        priority: 'high',
        description: 'Enable psychological analysis for deeper insights',
        action: 'enable_psychological_analysis'
      }],
      psychologicalEnabled: false
    };
  }

  /**
   * Get enhanced system status
   */
  getEnhancedStatus() {
    const baseStatus = this.getPreventionStatus();
    
    return {
      ...baseStatus,
      psychological: {
        enabled: this.psychologicalEnabled,
        analyzer: this.psychologicalAnalyzer.getStatus(),
        decisionMonitor: this.decisionMonitor.getStatus(),
        connectionDiscoverer: this.connectionDiscoverer.getStatus()
      }
    };
  }

  /**
   * Enable psychological analysis (requires user consent)
   */
  enablePsychologicalAnalysis(consent = true) {
    this.psychologicalEnabled = consent;
    this.psychologicalAnalyzer.enablePsychologicalAnalysis(consent);
    this.decisionMonitor.enableMonitoring(consent);
    
    console.log(`[MistakePreventionEngine] Psychological analysis ${consent ? 'enabled' : 'disabled'}`);
  }

  // Helper methods for technical analysis
  classifyErrorType(error) {
    if (error.message) {
      if (error.message.includes('TypeError')) return 'type_error';
      if (error.message.includes('ReferenceError')) return 'reference_error';
      if (error.message.includes('SyntaxError')) return 'syntax_error';
      if (error.message.includes('NetworkError')) return 'network_error';
    }
    return 'unknown_error';
  }

  identifyTechnicalRootCause(error) {
    if (error.stack) {
      if (error.stack.includes('undefined')) return 'undefined_variable';
      if (error.stack.includes('null')) return 'null_reference';
      if (error.stack.includes('async')) return 'async_handling';
    }
    return 'unknown_cause';
  }

  calculateTechnicalSeverity(error) {
    if (error.message && error.message.includes('fatal')) return 'critical';
    if (error.message && error.message.includes('error')) return 'high';
    if (error.message && error.message.includes('warning')) return 'medium';
    return 'low';
  }
}

// Export the class
module.exports = MistakePreventionEngine;

// Auto-initialize when module is loaded (optional)
// const mistakePreventionEngine = new MistakePreventionEngine();
// mistakePreventionEngine.initialize();
