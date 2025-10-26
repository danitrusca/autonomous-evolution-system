/**
 * Psychological Decision Monitor
 * Monitors decision-making patterns and prevents psychological mistakes
 * Invariant: All monitoring respects user privacy and provides clear explanations
 */

class PsychologicalDecisionMonitor {
  constructor() {
    this.decisionHistory = [];
    this.patternDatabase = new Map();
    this.monitoringActive = false;
    this.userConsent = false;
    
    // Initialize decision pattern categories
    this.initializeDecisionPatterns();
  }

  /**
   * Initialize decision pattern categories
   */
  initializeDecisionPatterns() {
    // Decision Quality Patterns
    this.patternDatabase.set('decision_quality', {
      high: {
        indicators: ['thorough_analysis', 'multiple_options_considered', 'validation_steps'],
        description: 'High-quality decision making process'
      },
      medium: {
        indicators: ['some_analysis', 'limited_options', 'basic_validation'],
        description: 'Medium-quality decision making process'
      },
      low: {
        indicators: ['minimal_analysis', 'single_option', 'no_validation'],
        description: 'Low-quality decision making process'
      }
    });

    // Cognitive Load Patterns
    this.patternDatabase.set('cognitive_load', {
      low: {
        indicators: ['simple_context', 'familiar_domain', 'clear_requirements'],
        description: 'Low cognitive load situation'
      },
      medium: {
        indicators: ['moderate_complexity', 'some_uncertainty', 'multiple_factors'],
        description: 'Medium cognitive load situation'
      },
      high: {
        indicators: ['high_complexity', 'high_uncertainty', 'many_factors', 'time_pressure'],
        description: 'High cognitive load situation'
      }
    });

    // Emotional State Patterns
    this.patternDatabase.set('emotional_state', {
      calm: {
        indicators: ['steady_rhythm', 'methodical_approach', 'patient_analysis'],
        description: 'Calm emotional state'
      },
      stressed: {
        indicators: ['rushed_decisions', 'skipped_steps', 'impatience'],
        description: 'Stressed emotional state'
      },
      frustrated: {
        indicators: ['repeated_attempts', 'aggressive_approaches', 'shortcuts'],
        description: 'Frustrated emotional state'
      }
    });

    // Bias Risk Patterns
    this.patternDatabase.set('bias_risk', {
      confirmation_bias: {
        indicators: ['ignoring_contrary_evidence', 'seeking_supporting_info', 'dismissing_warnings'],
        description: 'Risk of confirmation bias'
      },
      anchoring_bias: {
        indicators: ['sticking_to_initial_approach', 'not_considering_alternatives', 'premature_commitment'],
        description: 'Risk of anchoring bias'
      },
      availability_bias: {
        indicators: ['using_familiar_solutions', 'ignoring_less_common_approaches', 'pattern_matching'],
        description: 'Risk of availability bias'
      }
    });
  }

  /**
   * Monitor decision point
   * Invariant: Monitoring respects user privacy and provides clear explanations
   */
  monitorDecision(decision, context) {
    if (!this.userConsent || !this.monitoringActive) {
      return {
        monitored: false,
        reason: 'Psychological monitoring disabled or not consented'
      };
    }

    const psychologicalContext = this.extractPsychologicalContext(context);
    const analysis = this.analyzeDecision(decision, psychologicalContext);
    
    // Store decision for learning
    this.storeDecision(decision, psychologicalContext, analysis);
    
    return {
      monitored: true,
      analysis: analysis,
      recommendations: this.generateRecommendations(analysis),
      riskLevel: this.calculateRiskLevel(analysis)
    };
  }

  /**
   * Analyze decision for psychological patterns
   */
  analyzeDecision(decision, context) {
    return {
      timestamp: new Date().toISOString(),
      decision: this.sanitizeDecision(decision),
      context: this.sanitizeContext(context),
      decisionQuality: this.assessDecisionQuality(decision, context),
      cognitiveLoad: this.assessCognitiveLoad(context),
      emotionalState: this.assessEmotionalState(decision, context),
      biasRisks: this.assessBiasRisks(decision, context),
      stressIndicators: this.identifyStressIndicators(decision, context),
      confidence: this.assessConfidence(decision, context)
    };
  }

  /**
   * Assess decision quality
   */
  assessDecisionQuality(decision, context) {
    let quality = 'low';
    let score = 0;

    // Check for thorough analysis
    if (decision.analysis && decision.analysis.length > 100) score += 1;
    if (decision.alternatives && decision.alternatives.length > 1) score += 1;
    if (decision.validation && decision.validation.steps) score += 1;
    if (decision.considerations && decision.considerations.length > 2) score += 1;

    if (score >= 3) quality = 'high';
    else if (score >= 2) quality = 'medium';

    return {
      level: quality,
      score: score,
      indicators: this.getDecisionQualityIndicators(decision),
      description: this.patternDatabase.get('decision_quality')[quality].description
    };
  }

  /**
   * Assess cognitive load
   */
  assessCognitiveLoad(context) {
    let load = 'low';
    let score = 0;

    // Complexity factors
    if (context.complexity === 'high') score += 2;
    else if (context.complexity === 'medium') score += 1;

    // Uncertainty factors
    if (context.uncertainty === 'high') score += 2;
    else if (context.uncertainty === 'medium') score += 1;

    // Time pressure
    if (context.timePressure === 'high') score += 2;
    else if (context.timePressure === 'medium') score += 1;

    // Recent errors
    if (context.recentErrors > 2) score += 1;

    if (score >= 4) load = 'high';
    else if (score >= 2) load = 'medium';

    return {
      level: load,
      score: score,
      factors: this.getCognitiveLoadFactors(context),
      description: this.patternDatabase.get('cognitive_load')[load].description
    };
  }

  /**
   * Assess emotional state
   */
  assessEmotionalState(decision, context) {
    let state = 'calm';
    let indicators = [];

    // Check for stress indicators
    if (context.timePressure === 'high') {
      state = 'stressed';
      indicators.push('time_pressure');
    }

    if (context.recentErrors > 2) {
      state = 'frustrated';
      indicators.push('repeated_errors');
    }

    if (decision.approach === 'aggressive' || decision.approach === 'rushed') {
      state = 'stressed';
      indicators.push('rushed_approach');
    }

    if (decision.validation === null || decision.validation === undefined) {
      state = 'frustrated';
      indicators.push('skipped_validation');
    }

    return {
      level: state,
      indicators: indicators,
      description: this.patternDatabase.get('emotional_state')[state].description
    };
  }

  /**
   * Assess bias risks
   */
  assessBiasRisks(decision, context) {
    const risks = [];

    // Confirmation bias
    if (decision.ignoresContraryEvidence || decision.seeksSupportingInfo) {
      risks.push({
        type: 'confirmation_bias',
        severity: 'medium',
        description: 'Risk of confirmation bias detected'
      });
    }

    // Anchoring bias
    if (decision.sticksToInitialApproach || !decision.considersAlternatives) {
      risks.push({
        type: 'anchoring_bias',
        severity: 'medium',
        description: 'Risk of anchoring bias detected'
      });
    }

    // Availability bias
    if (decision.usesFamiliarSolutions || decision.ignoresLessCommonApproaches) {
      risks.push({
        type: 'availability_bias',
        severity: 'low',
        description: 'Risk of availability bias detected'
      });
    }

    return risks;
  }

  /**
   * Identify stress indicators
   */
  identifyStressIndicators(decision, context) {
    const indicators = [];

    if (context.recentErrors > 3) indicators.push('error_cascade');
    if (context.timePressure === 'high' && context.complexity === 'high') indicators.push('pressure_build_up');
    if (decision.approach === 'aggressive') indicators.push('aggressive_approach');
    if (decision.validation === null) indicators.push('skipped_validation');

    return indicators;
  }

  /**
   * Assess confidence level
   */
  assessConfidence(decision, context) {
    let confidence = 'medium';
    let score = 0;

    // High confidence indicators
    if (decision.analysis && decision.analysis.length > 200) score += 1;
    if (decision.alternatives && decision.alternatives.length > 2) score += 1;
    if (decision.validation && decision.validation.steps) score += 1;
    if (context.familiarity === 'high') score += 1;

    // Low confidence indicators
    if (context.uncertainty === 'high') score -= 1;
    if (context.recentErrors > 1) score -= 1;
    if (decision.approach === 'tentative') score -= 1;

    if (score >= 2) confidence = 'high';
    else if (score <= -1) confidence = 'low';

    return {
      level: confidence,
      score: score,
      calibration: this.assessConfidenceCalibration(decision, context, confidence)
    };
  }

  /**
   * Assess confidence calibration
   */
  assessConfidenceCalibration(decision, context, confidence) {
    // Simplified calibration assessment
    const expectedAccuracy = this.estimateExpectedAccuracy(decision, context);
    const confidenceLevel = confidence === 'high' ? 0.9 : confidence === 'medium' ? 0.7 : 0.5;
    
    const calibration = Math.abs(confidenceLevel - expectedAccuracy);
    
    return {
      calibration: calibration,
      wellCalibrated: calibration < 0.2,
      overconfident: confidenceLevel > expectedAccuracy + 0.2,
      underconfident: confidenceLevel < expectedAccuracy - 0.2
    };
  }

  /**
   * Generate recommendations based on analysis
   */
  generateRecommendations(analysis) {
    const recommendations = [];

    // Decision quality recommendations
    if (analysis.decisionQuality.level === 'low') {
      recommendations.push({
        type: 'decision_quality',
        priority: 'high',
        description: 'Improve decision quality by conducting thorough analysis',
        actions: [
          'Consider multiple alternatives',
          'Validate assumptions',
          'Document reasoning process'
        ]
      });
    }

    // Cognitive load recommendations
    if (analysis.cognitiveLoad.level === 'high') {
      recommendations.push({
        type: 'cognitive_load',
        priority: 'high',
        description: 'Reduce cognitive load to improve decision quality',
        actions: [
          'Break down complex problems',
          'Take breaks between decisions',
          'Use structured decision frameworks'
        ]
      });
    }

    // Emotional state recommendations
    if (analysis.emotionalState.level === 'stressed' || analysis.emotionalState.level === 'frustrated') {
      recommendations.push({
        type: 'emotional_state',
        priority: 'high',
        description: 'Address emotional state before making important decisions',
        actions: [
          'Take a break',
          'Use systematic approach',
          'Seek input from others'
        ]
      });
    }

    // Bias risk recommendations
    for (const risk of analysis.biasRisks) {
      recommendations.push({
        type: 'bias_prevention',
        priority: risk.severity === 'high' ? 'high' : 'medium',
        description: `Prevent ${risk.type}: ${risk.description}`,
        actions: this.getBiasPreventionActions(risk.type)
      });
    }

    // Confidence calibration recommendations
    if (analysis.confidence.calibration.overconfident) {
      recommendations.push({
        type: 'confidence_calibration',
        priority: 'medium',
        description: 'Reduce overconfidence by validating assumptions',
        actions: [
          'Test assumptions',
          'Seek disconfirming evidence',
          'Consider alternative explanations'
        ]
      });
    }

    if (analysis.confidence.calibration.underconfident) {
      recommendations.push({
        type: 'confidence_calibration',
        priority: 'medium',
        description: 'Increase confidence through better preparation',
        actions: [
          'Gather more information',
          'Practice similar decisions',
          'Build expertise in domain'
        ]
      });
    }

    return recommendations;
  }

  /**
   * Calculate overall risk level
   */
  calculateRiskLevel(analysis) {
    let riskScore = 0;

    // Decision quality risk
    if (analysis.decisionQuality.level === 'low') riskScore += 3;
    else if (analysis.decisionQuality.level === 'medium') riskScore += 1;

    // Cognitive load risk
    if (analysis.cognitiveLoad.level === 'high') riskScore += 2;

    // Emotional state risk
    if (analysis.emotionalState.level === 'frustrated') riskScore += 3;
    else if (analysis.emotionalState.level === 'stressed') riskScore += 2;

    // Bias risk
    riskScore += analysis.biasRisks.length;

    // Stress indicators
    riskScore += analysis.stressIndicators.length;

    if (riskScore >= 6) return 'high';
    if (riskScore >= 3) return 'medium';
    return 'low';
  }

  /**
   * Check if decision should be prevented
   */
  preventDecision(decision, context) {
    const analysis = this.analyzeDecision(decision, context);
    const riskLevel = this.calculateRiskLevel(analysis);

    if (riskLevel === 'high') {
      return {
        blocked: true,
        reason: 'High psychological risk detected',
        analysis: analysis,
        recommendations: this.generateRecommendations(analysis)
      };
    }

    return { blocked: false };
  }

  /**
   * Learn from decision outcomes
   */
  learnFromDecision(decision, context, outcome) {
    const analysis = this.analyzeDecision(decision, context);
    
    // Update pattern effectiveness
    this.updatePatternEffectiveness(analysis, outcome);
    
    // Store learning
    this.storeLearning(analysis, outcome);
  }

  /**
   * Get system status
   */
  getStatus() {
    return {
      monitoringActive: this.monitoringActive,
      userConsent: this.userConsent,
      decisionHistory: this.decisionHistory.length,
      patternDatabase: this.patternDatabase.size,
      active: this.monitoringActive && this.userConsent
    };
  }

  /**
   * Enable monitoring (requires user consent)
   */
  enableMonitoring(consent = true) {
    this.userConsent = consent;
    this.monitoringActive = consent;
    console.log(`[psychological-monitor] Monitoring ${consent ? 'enabled' : 'disabled'}`);
  }

  // Helper methods
  extractPsychologicalContext(context) {
    return {
      complexity: context.complexity || 'medium',
      uncertainty: context.uncertainty || 'medium',
      timePressure: context.timePressure || 'low',
      recentErrors: context.recentErrors || 0,
      familiarity: context.familiarity || 'medium',
      userState: context.userState || 'normal'
    };
  }

  sanitizeDecision(decision) {
    const sanitized = { ...decision };
    delete sanitized.userId;
    delete sanitized.personalData;
    return sanitized;
  }

  sanitizeContext(context) {
    const sanitized = { ...context };
    delete sanitized.userId;
    delete sanitized.personalData;
    delete sanitized.secrets;
    return sanitized;
  }

  getDecisionQualityIndicators(decision) {
    const indicators = [];
    if (decision.analysis && decision.analysis.length > 100) indicators.push('thorough_analysis');
    if (decision.alternatives && decision.alternatives.length > 1) indicators.push('multiple_options_considered');
    if (decision.validation && decision.validation.steps) indicators.push('validation_steps');
    return indicators;
  }

  getCognitiveLoadFactors(context) {
    const factors = [];
    if (context.complexity === 'high') factors.push('high_complexity');
    if (context.uncertainty === 'high') factors.push('high_uncertainty');
    if (context.timePressure === 'high') factors.push('time_pressure');
    if (context.recentErrors > 2) factors.push('recent_errors');
    return factors;
  }

  getBiasPreventionActions(biasType) {
    const actions = {
      confirmation_bias: [
        'Seek disconfirming evidence',
        'Consider alternative explanations',
        'Test assumptions rigorously'
      ],
      anchoring_bias: [
        'Consider multiple approaches',
        'Evaluate alternatives systematically',
        'Avoid premature commitment'
      ],
      availability_bias: [
        'Use systematic evaluation',
        'Consider less common approaches',
        'Avoid pattern matching shortcuts'
      ]
    };
    return actions[biasType] || [];
  }

  estimateExpectedAccuracy(decision, context) {
    // Simplified accuracy estimation
    let accuracy = 0.7; // Base accuracy
    
    if (context.familiarity === 'high') accuracy += 0.1;
    if (context.complexity === 'low') accuracy += 0.1;
    if (decision.validation && decision.validation.steps) accuracy += 0.1;
    
    return Math.min(accuracy, 0.95);
  }

  storeDecision(decision, context, analysis) {
    this.decisionHistory.push({
      decision: this.sanitizeDecision(decision),
      context: this.sanitizeContext(context),
      analysis: analysis,
      timestamp: new Date().toISOString()
    });

    // Keep only last 1000 decisions
    if (this.decisionHistory.length > 1000) {
      this.decisionHistory = this.decisionHistory.slice(-1000);
    }
  }

  updatePatternEffectiveness(analysis, outcome) {
    // Update pattern effectiveness based on outcomes
    // This would be implemented based on follow-up analysis
  }

  storeLearning(analysis, outcome) {
    // Store learning for future pattern recognition
    // This would be implemented based on learning requirements
  }
}

module.exports = PsychologicalDecisionMonitor;
