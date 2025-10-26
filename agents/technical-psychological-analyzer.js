/**
 * Technical-Psychological Connection Analyzer
 * Discovers connections between technical errors and psychological root causes
 * Invariant: All analysis maintains user privacy and explainability
 */

const fs = require('fs');
const path = require('path');

class TechnicalPsychologicalAnalyzer {
  constructor() {
    this.psychologicalPatterns = new Map();
    this.connectionDatabase = new Map();
    this.analysisHistory = [];
    this.userConsent = false;
    
    // Initialize psychological pattern categories
    this.initializePsychologicalPatterns();
  }

  /**
   * Initialize psychological pattern categories
   */
  initializePsychologicalPatterns() {
    // Cognitive Biases
    this.psychologicalPatterns.set('confirmation_bias', {
      name: 'Confirmation Bias',
      description: 'Tendency to search for information that confirms existing beliefs',
      technicalManifestations: [
        'ignoring_error_messages',
        'skipping_validation_steps',
        'dismissing_warning_signals'
      ],
      preventionStrategies: [
        'explicitly_seek_disconfirming_evidence',
        'mandatory_validation_checks',
        'peer_review_requirements'
      ]
    });

    this.psychologicalPatterns.set('anchoring_bias', {
      name: 'Anchoring Bias',
      description: 'Over-reliance on first piece of information encountered',
      technicalManifestations: [
        'sticking_to_initial_approach',
        'not_considering_alternatives',
        'premature_optimization'
      ],
      preventionStrategies: [
        'consider_multiple_approaches',
        'explicit_alternative_evaluation',
        'structured_decision_making'
      ]
    });

    this.psychologicalPatterns.set('availability_heuristic', {
      name: 'Availability Heuristic',
      description: 'Overestimating probability based on easily recalled examples',
      technicalManifestations: [
        'using_familiar_but_wrong_solutions',
        'ignoring_less_common_but_correct_approaches',
        'pattern_matching_to_recent_experiences'
      ],
      preventionStrategies: [
        'systematic_solution_evaluation',
        'documented_decision_criteria',
        'historical_pattern_analysis'
      ]
    });

    // Decision-Making Patterns
    this.psychologicalPatterns.set('rush_to_solution', {
      name: 'Rush to Solution',
      description: 'Jumping to solutions without proper analysis',
      technicalManifestations: [
        'skipping_error_analysis',
        'not_reading_full_error_messages',
        'immediate_code_changes_without_understanding'
      ],
      preventionStrategies: [
        'mandatory_analysis_phase',
        'structured_debugging_protocol',
        'pause_before_action_requirements'
      ]
    });

    this.psychologicalPatterns.set('overconfidence', {
      name: 'Overconfidence',
      description: 'Overestimating own abilities and knowledge',
      technicalManifestations: [
        'not_testing_edge_cases',
        'skipping_documentation_review',
        'assuming_code_correctness'
      ],
      preventionStrategies: [
        'mandatory_testing_requirements',
        'peer_review_processes',
        'confidence_calibration_checks'
      ]
    });

    this.psychologicalPatterns.set('context_switching_error', {
      name: 'Context Switching Error',
      description: 'Applying wrong patterns to new contexts',
      technicalManifestations: [
        'using_old_patterns_in_new_frameworks',
        'applying_domain_specific_solutions_wrongly',
        'mixing_different_paradigms_incorrectly'
      ],
      preventionStrategies: [
        'context_awareness_checks',
        'pattern_validation_against_context',
        'explicit_context_documentation'
      ]
    });

    // Emotional Factors
    this.psychologicalPatterns.set('frustration_cascade', {
      name: 'Frustration Cascade',
      description: 'Emotional state leading to more errors',
      technicalManifestations: [
        'making_more_errors_due_to_emotional_state',
        'skipping_proper_procedures',
        'aggressive_debugging_approaches'
      ],
      preventionStrategies: [
        'emotional_state_monitoring',
        'break_requirements',
        'systematic_approach_enforcement'
      ]
    });

    this.psychologicalPatterns.set('impatience', {
      name: 'Impatience',
      description: 'Not following proper procedures due to time pressure',
      technicalManifestations: [
        'skipping_proper_debugging_procedures',
        'not_reading_documentation',
        'quick_fixes_without_understanding'
      ],
      preventionStrategies: [
        'time_allocation_requirements',
        'procedure_compliance_checks',
        'quality_gate_enforcement'
      ]
    });

    this.psychologicalPatterns.set('perfectionism', {
      name: 'Perfectionism',
      description: 'Over-engineering simple solutions',
      technicalManifestations: [
        'over_engineering_simple_solutions',
        'endless_refactoring',
        'analysis_paralysis'
      ],
      preventionStrategies: [
        'simplicity_requirements',
        'time_boxing',
        'good_enough_criteria'
      ]
    });
  }

  /**
   * Analyze error with dual-layer approach
   * Invariant: Analysis maintains user privacy and explainability
   */
  analyzeError(error, context) {
    if (!this.userConsent) {
      console.log('[psychological-analyzer] Psychological analysis requires user consent');
      return this.analyzeTechnicalOnly(error, context);
    }

    const analysis = {
      timestamp: new Date().toISOString(),
      error: error,
      context: this.sanitizeContext(context),
      technical: this.analyzeTechnicalRootCause(error, context),
      psychological: this.analyzePsychologicalRootCause(error, context),
      connection: null,
      recommendations: []
    };

    // Find connection between technical and psychological causes
    analysis.connection = this.findTechnicalPsychologicalConnection(
      analysis.technical, 
      analysis.psychological
    );

    // Generate recommendations
    analysis.recommendations = this.generateRecommendations(analysis);

    // Store analysis for learning
    this.storeAnalysis(analysis);

    return analysis;
  }

  /**
   * Analyze technical root cause
   */
  analyzeTechnicalRootCause(error, context) {
    return {
      errorType: this.classifyErrorType(error),
      rootCause: this.identifyTechnicalRootCause(error),
      patterns: this.findTechnicalPatterns(error, context),
      severity: this.calculateTechnicalSeverity(error),
      context: this.extractTechnicalContext(error, context)
    };
  }

  /**
   * Analyze psychological root cause
   */
  analyzePsychologicalRootCause(error, context) {
    const psychologicalContext = this.extractPsychologicalContext(context);
    
    return {
      cognitiveLoad: this.assessCognitiveLoad(psychologicalContext),
      emotionalState: this.assessEmotionalState(psychologicalContext),
      decisionPatterns: this.analyzeDecisionPatterns(error, psychologicalContext),
      biasRisks: this.assessBiasRisks(error, psychologicalContext),
      stressIndicators: this.identifyStressIndicators(psychologicalContext)
    };
  }

  /**
   * Find connection between technical and psychological causes
   */
  findTechnicalPsychologicalConnection(technical, psychological) {
    const connections = [];

    // Check each psychological pattern for technical manifestations
    for (const [patternId, pattern] of this.psychologicalPatterns) {
      const technicalManifestations = pattern.technicalManifestations;
      
      for (const manifestation of technicalManifestations) {
        if (this.technicalManifestationMatches(technical, manifestation)) {
          connections.push({
            psychologicalPattern: patternId,
            technicalManifestation: manifestation,
            confidence: this.calculateConnectionConfidence(technical, psychological, patternId),
            description: `${pattern.name} led to ${manifestation.replace(/_/g, ' ')}`
          });
        }
      }
    }

    return connections;
  }

  /**
   * Generate recommendations based on analysis
   */
  generateRecommendations(analysis) {
    const recommendations = [];

    // Technical recommendations
    if (analysis.technical.rootCause) {
      recommendations.push({
        type: 'technical',
        priority: 'high',
        description: `Fix technical root cause: ${analysis.technical.rootCause}`,
        action: 'address_technical_issue'
      });
    }

    // Psychological recommendations
    if (analysis.connection && analysis.connection.length > 0) {
      for (const connection of analysis.connection) {
        const pattern = this.psychologicalPatterns.get(connection.psychologicalPattern);
        if (pattern) {
          recommendations.push({
            type: 'psychological',
            priority: 'medium',
            description: `Prevent ${pattern.name}: ${connection.description}`,
            action: 'apply_psychological_prevention',
            strategies: pattern.preventionStrategies
          });
        }
      }
    }

    // Connection-based recommendations
    if (analysis.connection && analysis.connection.length > 0) {
      recommendations.push({
        type: 'connection',
        priority: 'high',
        description: 'Address both technical and psychological root causes',
        action: 'dual_layer_prevention',
        technical: analysis.technical.rootCause,
        psychological: analysis.connection.map(c => c.psychologicalPattern)
      });
    }

    return recommendations;
  }

  /**
   * Check if action should be prevented based on psychological analysis
   */
  preventAction(action, context) {
    if (!this.userConsent) {
      return { blocked: false, reason: 'Psychological analysis disabled' };
    }

    const psychologicalContext = this.extractPsychologicalContext(context);
    const riskAssessment = this.assessPsychologicalRisk(action, psychologicalContext);

    if (riskAssessment.highRisk) {
      return {
        blocked: true,
        reason: `High psychological risk: ${riskAssessment.pattern}`,
        recommendation: riskAssessment.recommendation,
        technicalAlternative: this.suggestTechnicalAlternative(action, context)
      };
    }

    return { blocked: false };
  }

  /**
   * Assess psychological risk of action
   */
  assessPsychologicalRisk(action, context) {
    const risks = [];

    // Check for rush-to-solution pattern
    if (this.detectRushToSolution(action, context)) {
      risks.push({
        pattern: 'rush_to_solution',
        severity: 'high',
        recommendation: 'Take time to analyze before acting'
      });
    }

    // Check for overconfidence pattern
    if (this.detectOverconfidence(action, context)) {
      risks.push({
        pattern: 'overconfidence',
        severity: 'medium',
        recommendation: 'Verify assumptions and test thoroughly'
      });
    }

    // Check for frustration cascade
    if (this.detectFrustrationCascade(context)) {
      risks.push({
        pattern: 'frustration_cascade',
        severity: 'high',
        recommendation: 'Take a break and approach systematically'
      });
    }

    const highRisk = risks.filter(r => r.severity === 'high');
    
    return {
      highRisk: highRisk.length > 0,
      risks: risks,
      pattern: highRisk.length > 0 ? highRisk[0].pattern : null,
      recommendation: highRisk.length > 0 ? highRisk[0].recommendation : null
    };
  }

  /**
   * Learn from analysis patterns
   */
  learnFromAnalysis(analysis) {
    if (analysis.connection && analysis.connection.length > 0) {
      for (const connection of analysis.connection) {
        this.updateConnectionDatabase(connection, analysis);
      }
    }

    // Update psychological pattern effectiveness
    this.updatePatternEffectiveness(analysis);
  }

  /**
   * Update connection database with new patterns
   */
  updateConnectionDatabase(connection, analysis) {
    const key = `${connection.psychologicalPattern}_${connection.technicalManifestation}`;
    
    if (!this.connectionDatabase.has(key)) {
      this.connectionDatabase.set(key, {
        pattern: connection.psychologicalPattern,
        manifestation: connection.technicalManifestation,
        occurrences: 0,
        successRate: 0,
        preventionStrategies: []
      });
    }

    const entry = this.connectionDatabase.get(key);
    entry.occurrences++;
    
    // Update success rate based on whether prevention worked
    if (analysis.recommendations.some(r => r.type === 'psychological')) {
      entry.successRate = (entry.successRate * (entry.occurrences - 1) + 1) / entry.occurrences;
    }

    this.connectionDatabase.set(key, entry);
  }

  /**
   * Get system status
   */
  getStatus() {
    return {
      userConsent: this.userConsent,
      psychologicalPatterns: this.psychologicalPatterns.size,
      connectionDatabase: this.connectionDatabase.size,
      analysisHistory: this.analysisHistory.length,
      active: this.userConsent
    };
  }

  /**
   * Enable psychological analysis (requires user consent)
   */
  enablePsychologicalAnalysis(consent = true) {
    this.userConsent = consent;
    console.log(`[psychological-analyzer] Psychological analysis ${consent ? 'enabled' : 'disabled'}`);
  }

  // Helper methods
  analyzeTechnicalOnly(error, context) {
    return {
      timestamp: new Date().toISOString(),
      error: error,
      context: this.sanitizeContext(context),
      technical: this.analyzeTechnicalRootCause(error, context),
      psychological: null,
      connection: null,
      recommendations: [{
        type: 'technical',
        priority: 'high',
        description: 'Enable psychological analysis for deeper insights',
        action: 'enable_psychological_analysis'
      }]
    };
  }

  sanitizeContext(context) {
    // Remove sensitive information while preserving analysis-relevant data
    const sanitized = { ...context };
    delete sanitized.userId;
    delete sanitized.personalData;
    delete sanitized.secrets;
    return sanitized;
  }

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
    // Simplified technical root cause identification
    if (error.stack) {
      if (error.stack.includes('undefined')) return 'undefined_variable';
      if (error.stack.includes('null')) return 'null_reference';
      if (error.stack.includes('async')) return 'async_handling';
    }
    return 'unknown_cause';
  }

  findTechnicalPatterns(error, context) {
    const patterns = [];
    if (context.recentChanges && context.recentChanges.length > 0) {
      patterns.push('recent_change_related');
    }
    if (context.dependencies && context.dependencies.length > 0) {
      patterns.push('dependency_related');
    }
    return patterns;
  }

  calculateTechnicalSeverity(error) {
    if (error.message && error.message.includes('fatal')) return 'critical';
    if (error.message && error.message.includes('error')) return 'high';
    if (error.message && error.message.includes('warning')) return 'medium';
    return 'low';
  }

  extractTechnicalContext(error, context) {
    return {
      file: error.file || context.file,
      line: error.line || context.line,
      function: error.function || context.function,
      stack: error.stack
    };
  }

  extractPsychologicalContext(context) {
    return {
      timeOfDay: new Date().getHours(),
      recentErrors: context.recentErrors || 0,
      complexity: context.complexity || 'medium',
      urgency: context.urgency || 'normal',
      userState: context.userState || 'normal'
    };
  }

  assessCognitiveLoad(context) {
    let load = 'normal';
    if (context.complexity === 'high') load = 'high';
    if (context.recentErrors > 3) load = 'high';
    if (context.urgency === 'high') load = 'high';
    return load;
  }

  assessEmotionalState(context) {
    let state = 'normal';
    if (context.recentErrors > 2) state = 'frustrated';
    if (context.urgency === 'high') state = 'stressed';
    if (context.userState === 'tired') state = 'fatigued';
    return state;
  }

  analyzeDecisionPatterns(error, context) {
    const patterns = [];
    if (context.recentErrors > 1) patterns.push('repeated_errors');
    if (context.complexity === 'high' && context.urgency === 'high') patterns.push('high_pressure_decision');
    return patterns;
  }

  assessBiasRisks(error, context) {
    const risks = [];
    if (context.recentErrors > 2) risks.push('confirmation_bias');
    if (context.urgency === 'high') risks.push('rush_to_solution');
    if (context.complexity === 'low' && context.userState === 'confident') risks.push('overconfidence');
    return risks;
  }

  identifyStressIndicators(context) {
    const indicators = [];
    if (context.recentErrors > 3) indicators.push('error_cascade');
    if (context.urgency === 'high' && context.complexity === 'high') indicators.push('pressure_build_up');
    return indicators;
  }

  technicalManifestationMatches(technical, manifestation) {
    // Simplified matching logic
    const technicalString = JSON.stringify(technical).toLowerCase();
    const manifestationString = manifestation.replace(/_/g, ' ');
    return technicalString.includes(manifestationString);
  }

  calculateConnectionConfidence(technical, psychological, patternId) {
    // Simplified confidence calculation
    let confidence = 0.5;
    if (psychological.biasRisks.includes(patternId)) confidence += 0.3;
    if (psychological.stressIndicators.length > 0) confidence += 0.2;
    return Math.min(confidence, 1.0);
  }

  detectRushToSolution(action, context) {
    return context.urgency === 'high' && action.type === 'immediate_fix';
  }

  detectOverconfidence(action, context) {
    return context.userState === 'confident' && action.type === 'skip_validation';
  }

  detectFrustrationCascade(context) {
    return context.recentErrors > 2 && context.emotionalState === 'frustrated';
  }

  suggestTechnicalAlternative(action, context) {
    return {
      action: 'systematic_analysis',
      description: 'Follow structured debugging approach',
      steps: [
        '1. Read full error message',
        '2. Check recent changes',
        '3. Verify assumptions',
        '4. Test incrementally'
      ]
    };
  }

  storeAnalysis(analysis) {
    this.analysisHistory.push(analysis);
    
    // Keep only last 1000 analyses
    if (this.analysisHistory.length > 1000) {
      this.analysisHistory = this.analysisHistory.slice(-1000);
    }
  }

  updatePatternEffectiveness(analysis) {
    // Update pattern effectiveness based on outcomes
    // This would be implemented based on follow-up analysis
  }
}

module.exports = TechnicalPsychologicalAnalyzer;
