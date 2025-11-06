/**
 * Meta-Learning System
 * Based on the article's meta-pattern recognition insights
 * 
 * This system enables the autonomous system to learn how to learn more effectively,
 * applying meta-cognitive strategies to improve its own learning capabilities.
 */

class MetaLearningSystem {
  constructor() {
    this.learningStrategies = new Map();
    this.metaPatterns = [];
    this.learningEffectiveness = new Map();
    this.adaptationHistory = [];
    this.metaInsights = [];
    
    // Workflow adaptation tracking (Cursor 2.0 Insight)
    this.workflowAdaptations = new Map();
    this.featureEffectiveness = new Map(); // feature + context -> effectiveness
    this.approachEffectiveness = new Map(); // approach + context -> effectiveness
    this.workflowPatterns = [];
  }

  /**
   * Analyze learning effectiveness and adapt strategies
   * @param {Object} learningSession - The learning session to analyze
   * @returns {Object} - Meta-learning insights and adaptations
   */
  analyzeLearningEffectiveness(learningSession) {
    const analysis = {
      sessionId: learningSession.id,
      timestamp: new Date(),
      effectiveness: this.calculateEffectiveness(learningSession),
      patterns: this.extractLearningPatterns(learningSession),
      adaptations: [],
      insights: []
    };

    // Identify learning patterns
    const patterns = this.identifyLearningPatterns(learningSession);
    analysis.patterns = patterns;

    // Generate adaptations based on patterns
    const adaptations = this.generateAdaptations(patterns, learningSession);
    analysis.adaptations = adaptations;

    // Extract meta-insights
    const insights = this.extractMetaInsights(learningSession, patterns);
    analysis.insights = insights;

    // Apply adaptations
    this.applyAdaptations(adaptations);

    // Save analysis
    this.metaPatterns.push(analysis);
    this.saveToEvolutionJournal(analysis);

    return analysis;
  }

  /**
   * Calculate learning effectiveness score
   */
  calculateEffectiveness(learningSession) {
    const factors = {
      completionRate: this.calculateCompletionRate(learningSession),
      timeEfficiency: this.calculateTimeEfficiency(learningSession),
      retentionRate: this.calculateRetentionRate(learningSession),
      applicationRate: this.calculateApplicationRate(learningSession),
      errorReduction: this.calculateErrorReduction(learningSession)
    };

    const weights = {
      completionRate: 0.25,
      timeEfficiency: 0.20,
      retentionRate: 0.20,
      applicationRate: 0.20,
      errorReduction: 0.15
    };

    let totalScore = 0;
    let totalWeight = 0;

    for (const [factor, score] of Object.entries(factors)) {
      const weight = weights[factor] || 0.1;
      totalScore += score * weight;
      totalWeight += weight;
    }

    return {
      overall: totalWeight > 0 ? totalScore / totalWeight : 0,
      factors,
      timestamp: new Date()
    };
  }

  /**
   * Calculate completion rate
   */
  calculateCompletionRate(learningSession) {
    const totalTasks = learningSession.tasks?.length || 1;
    const completedTasks = learningSession.tasks?.filter(task => task.status === 'completed').length || 0;
    return totalTasks > 0 ? completedTasks / totalTasks : 0;
  }

  /**
   * Calculate time efficiency
   */
  calculateTimeEfficiency(learningSession) {
    const estimatedTime = learningSession.estimatedTime || 60; // minutes
    const actualTime = learningSession.actualTime || 60;
    return Math.max(0, 1 - (actualTime - estimatedTime) / estimatedTime);
  }

  /**
   * Calculate retention rate
   */
  calculateRetentionRate(learningSession) {
    const concepts = learningSession.concepts || [];
    const retainedConcepts = concepts.filter(concept => 
      concept.retentionScore && concept.retentionScore > 0.7
    ).length;
    return concepts.length > 0 ? retainedConcepts / concepts.length : 0;
  }

  /**
   * Calculate application rate
   */
  calculateApplicationRate(learningSession) {
    const learnedSkills = learningSession.learnedSkills || [];
    const appliedSkills = learnedSkills.filter(skill => 
      skill.applicationCount && skill.applicationCount > 0
    ).length;
    return learnedSkills.length > 0 ? appliedSkills / learnedSkills.length : 0;
  }

  /**
   * Calculate error reduction
   */
  calculateErrorReduction(learningSession) {
    const initialErrors = learningSession.initialErrors || 0;
    const finalErrors = learningSession.finalErrors || 0;
    return initialErrors > 0 ? Math.max(0, (initialErrors - finalErrors) / initialErrors) : 0;
  }

  /**
   * Extract learning patterns from session
   */
  extractLearningPatterns(learningSession) {
    const patterns = [];

    // Pattern: Learning method effectiveness
    if (learningSession.methods) {
      for (const method of learningSession.methods) {
        patterns.push({
          type: 'method_effectiveness',
          method: method.name,
          effectiveness: method.effectiveness || 0,
          context: method.context
        });
      }
    }

    // Pattern: Difficulty progression
    if (learningSession.difficultyProgression) {
      patterns.push({
        type: 'difficulty_progression',
        progression: learningSession.difficultyProgression,
        effectiveness: this.analyzeDifficultyProgression(learningSession.difficultyProgression)
      });
    }

    // Pattern: Feedback timing
    if (learningSession.feedbackTiming) {
      patterns.push({
        type: 'feedback_timing',
        timing: learningSession.feedbackTiming,
        effectiveness: this.analyzeFeedbackTiming(learningSession.feedbackTiming)
      });
    }

    // Pattern: Resource utilization
    if (learningSession.resources) {
      patterns.push({
        type: 'resource_utilization',
        resources: learningSession.resources,
        effectiveness: this.analyzeResourceUtilization(learningSession.resources)
      });
    }

    return patterns;
  }

  /**
   * Identify learning patterns across sessions
   */
  identifyLearningPatterns(learningSession) {
    const patterns = [];

    // Analyze with historical data
    const historicalSessions = this.metaPatterns.slice(-10); // Last 10 sessions

    // Pattern: Consistent high performance
    const highPerformingSessions = historicalSessions.filter(session => 
      session.effectiveness.overall > 0.8
    );
    if (highPerformingSessions.length > 3) {
      patterns.push({
        type: 'consistent_high_performance',
        sessions: highPerformingSessions.length,
        commonFactors: this.findCommonFactors(highPerformingSessions)
      });
    }

    // Pattern: Learning acceleration
    const recentSessions = historicalSessions.slice(-5);
    if (this.detectLearningAcceleration(recentSessions)) {
      patterns.push({
        type: 'learning_acceleration',
        acceleration: this.calculateAcceleration(recentSessions),
        factors: this.identifyAccelerationFactors(recentSessions)
      });
    }

    // Pattern: Learning plateaus
    if (this.detectLearningPlateau(historicalSessions)) {
      patterns.push({
        type: 'learning_plateau',
        plateau: this.analyzePlateau(historicalSessions),
        recommendations: this.generatePlateauRecommendations(historicalSessions)
      });
    }

    return patterns;
  }

  /**
   * Generate adaptations based on patterns
   */
  generateAdaptations(patterns, learningSession) {
    const adaptations = [];

    for (const pattern of patterns) {
      switch (pattern.type) {
        case 'method_effectiveness':
          if (pattern.effectiveness < 0.5) {
            adaptations.push({
              type: 'method_adjustment',
              method: pattern.method,
              adjustment: 'increase_frequency',
              reason: 'Low effectiveness detected'
            });
          }
          break;

        case 'difficulty_progression':
          if (pattern.effectiveness < 0.6) {
            adaptations.push({
              type: 'difficulty_adjustment',
              adjustment: 'reduce_initial_difficulty',
              reason: 'Difficulty progression too steep'
            });
          }
          break;

        case 'feedback_timing':
          if (pattern.effectiveness < 0.7) {
            adaptations.push({
              type: 'feedback_timing_adjustment',
              adjustment: 'increase_feedback_frequency',
              reason: 'Feedback timing suboptimal'
            });
          }
          break;

        case 'learning_plateau':
          adaptations.push({
            type: 'plateau_breaking',
            strategy: 'introduce_variation',
            reason: 'Learning plateau detected'
          });
          break;

        case 'learning_acceleration':
          adaptations.push({
            type: 'acceleration_support',
            strategy: 'maintain_momentum',
            reason: 'Learning acceleration detected'
          });
          break;
      }
    }

    return adaptations;
  }

  /**
   * Extract meta-insights from learning analysis
   */
  extractMetaInsights(learningSession, patterns) {
    const insights = [];

    // Insight: Learning style preferences
    const preferredMethods = this.identifyPreferredMethods(learningSession);
    if (preferredMethods.length > 0) {
      insights.push({
        type: 'learning_style_preference',
        methods: preferredMethods,
        confidence: this.calculatePreferenceConfidence(preferredMethods)
      });
    }

    // Insight: Optimal learning conditions
    const optimalConditions = this.identifyOptimalConditions(learningSession);
    if (optimalConditions.length > 0) {
      insights.push({
        type: 'optimal_learning_conditions',
        conditions: optimalConditions,
        effectiveness: this.calculateConditionEffectiveness(optimalConditions)
      });
    }

    // Insight: Learning barriers
    const barriers = this.identifyLearningBarriers(learningSession);
    if (barriers.length > 0) {
      insights.push({
        type: 'learning_barriers',
        barriers: barriers,
        impact: this.calculateBarrierImpact(barriers)
      });
    }

    // Insight: Learning accelerators
    const accelerators = this.identifyLearningAccelerators(learningSession);
    if (accelerators.length > 0) {
      insights.push({
        type: 'learning_accelerators',
        accelerators: accelerators,
        impact: this.calculateAcceleratorImpact(accelerators)
      });
    }

    return insights;
  }

  /**
   * Apply adaptations to learning strategies
   */
  applyAdaptations(adaptations) {
    for (const adaptation of adaptations) {
      switch (adaptation.type) {
        case 'method_adjustment':
          this.adjustLearningMethod(adaptation.method, adaptation.adjustment);
          break;

        case 'difficulty_adjustment':
          this.adjustDifficultyProgression(adaptation.adjustment);
          break;

        case 'feedback_timing_adjustment':
          this.adjustFeedbackTiming(adaptation.adjustment);
          break;

        case 'plateau_breaking':
          this.applyPlateauBreakingStrategy(adaptation.strategy);
          break;

        case 'acceleration_support':
          this.applyAccelerationSupport(adaptation.strategy);
          break;
      }

      // Record adaptation
      this.adaptationHistory.push({
        adaptation,
        timestamp: new Date(),
        applied: true
      });
    }
  }

  /**
   * Get meta-learning recommendations
   */
  getMetaLearningRecommendations() {
    const recommendations = [];

    // Analyze recent patterns
    const recentPatterns = this.metaPatterns.slice(-5);
    const recentEffectiveness = recentPatterns.map(p => p.effectiveness.overall);
    const averageEffectiveness = recentEffectiveness.reduce((a, b) => a + b, 0) / recentEffectiveness.length;

    if (averageEffectiveness < 0.6) {
      recommendations.push({
        type: 'effectiveness_improvement',
        priority: 'high',
        message: 'Learning effectiveness is below optimal. Consider adjusting learning strategies.',
        actions: [
          'Review and adjust learning methods',
          'Increase feedback frequency',
          'Simplify initial difficulty'
        ]
      });
    }

    // Check for learning plateaus
    if (this.detectLearningPlateau(recentPatterns)) {
      recommendations.push({
        type: 'plateau_breaking',
        priority: 'medium',
        message: 'Learning plateau detected. Introduce variation to break through.',
        actions: [
          'Try new learning methods',
          'Increase challenge level',
          'Seek external input'
        ]
      });
    }

    // Check for learning acceleration
    if (this.detectLearningAcceleration(recentPatterns)) {
      recommendations.push({
        type: 'momentum_maintenance',
        priority: 'low',
        message: 'Learning acceleration detected. Maintain momentum with consistent practice.',
        actions: [
          'Continue current strategies',
          'Gradually increase complexity',
          'Document successful patterns'
        ]
      });
    }

    return recommendations;
  }

  /**
   * Save to autonomous evolution journal
   */
  saveToEvolutionJournal(analysis) {
    const entry = {
      timestamp: analysis.timestamp,
      type: 'meta_learning_analysis',
      sessionId: analysis.sessionId,
      effectiveness: analysis.effectiveness,
      patterns: analysis.patterns,
      adaptations: analysis.adaptations,
      insights: analysis.insights
    };

    console.log('Saving meta-learning analysis:', entry);
  }

  /**
   * Helper methods for pattern analysis
   */
  analyzeDifficultyProgression(progression) {
    // Analyze if difficulty progression is optimal
    const steps = progression.steps || [];
    if (steps.length < 2) return 0.5;

    const difficultyIncrease = steps[steps.length - 1].difficulty - steps[0].difficulty;
    const optimalIncrease = 0.2; // 20% increase per step

    return Math.max(0, 1 - Math.abs(difficultyIncrease - optimalIncrease) / optimalIncrease);
  }

  analyzeFeedbackTiming(timing) {
    // Analyze feedback timing effectiveness
    const frequency = timing.frequency || 0;
    const optimalFrequency = 0.1; // Every 10% of progress

    return Math.max(0, 1 - Math.abs(frequency - optimalFrequency) / optimalFrequency);
  }

  analyzeResourceUtilization(resources) {
    // Analyze resource utilization effectiveness
    const utilized = resources.filter(r => r.used).length;
    const total = resources.length;

    return total > 0 ? utilized / total : 0;
  }

  findCommonFactors(sessions) {
    const factors = {};
    
    for (const session of sessions) {
      if (session.patterns) {
        for (const pattern of session.patterns) {
          const key = `${pattern.type}_${pattern.method || pattern.context}`;
          factors[key] = (factors[key] || 0) + 1;
        }
      }
    }

    return Object.entries(factors)
      .filter(([key, count]) => count > 1)
      .map(([key, count]) => ({ factor: key, frequency: count }));
  }

  detectLearningAcceleration(sessions) {
    if (sessions.length < 3) return false;

    const effectiveness = sessions.map(s => s.effectiveness.overall);
    const trend = this.calculateTrend(effectiveness);
    
    return trend > 0.1; // Positive trend of 10% or more
  }

  calculateAcceleration(sessions) {
    const effectiveness = sessions.map(s => s.effectiveness.overall);
    return this.calculateTrend(effectiveness);
  }

  identifyAccelerationFactors(sessions) {
    return this.findCommonFactors(sessions);
  }

  detectLearningPlateau(sessions) {
    if (sessions.length < 5) return false;

    const effectiveness = sessions.map(s => s.effectiveness.overall);
    const variance = this.calculateVariance(effectiveness);
    
    return variance < 0.05; // Low variance indicates plateau
  }

  analyzePlateau(sessions) {
    const effectiveness = sessions.map(s => s.effectiveness.overall);
    return {
      average: effectiveness.reduce((a, b) => a + b, 0) / effectiveness.length,
      variance: this.calculateVariance(effectiveness),
      duration: sessions.length
    };
  }

  generatePlateauRecommendations(sessions) {
    return [
      'Introduce new learning methods',
      'Increase challenge level',
      'Seek external feedback',
      'Take a break and return with fresh perspective'
    ];
  }

  calculateTrend(values) {
    if (values.length < 2) return 0;

    const n = values.length;
    const x = Array.from({ length: n }, (_, i) => i);
    const y = values;

    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    return slope;
  }

  calculateVariance(values) {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const squaredDiffs = values.map(v => Math.pow(v - mean, 2));
    return squaredDiffs.reduce((a, b) => a + b, 0) / values.length;
  }

  identifyPreferredMethods(learningSession) {
    const methods = learningSession.methods || [];
    return methods
      .filter(method => method.effectiveness > 0.7)
      .map(method => method.name);
  }

  calculatePreferenceConfidence(methods) {
    return methods.length > 0 ? Math.min(1, methods.length / 3) : 0;
  }

  identifyOptimalConditions(learningSession) {
    const conditions = [];
    
    if (learningSession.environment) {
      conditions.push(learningSession.environment);
    }
    
    if (learningSession.timing) {
      conditions.push(learningSession.timing);
    }
    
    return conditions;
  }

  calculateConditionEffectiveness(conditions) {
    return conditions.length > 0 ? 0.8 : 0.5;
  }

  identifyLearningBarriers(learningSession) {
    const barriers = [];
    
    if (learningSession.difficulties) {
      barriers.push(...learningSession.difficulties);
    }
    
    return barriers;
  }

  calculateBarrierImpact(barriers) {
    return barriers.length > 0 ? 'high' : 'low';
  }

  identifyLearningAccelerators(learningSession) {
    const accelerators = [];
    
    if (learningSession.successFactors) {
      accelerators.push(...learningSession.successFactors);
    }
    
    return accelerators;
  }

  calculateAcceleratorImpact(accelerators) {
    return accelerators.length > 0 ? 'high' : 'low';
  }

  adjustLearningMethod(method, adjustment) {
    // Implementation for adjusting learning methods
    console.log(`Adjusting learning method ${method}: ${adjustment}`);
  }

  adjustDifficultyProgression(adjustment) {
    // Implementation for adjusting difficulty progression
    console.log(`Adjusting difficulty progression: ${adjustment}`);
  }

  adjustFeedbackTiming(adjustment) {
    // Implementation for adjusting feedback timing
    console.log(`Adjusting feedback timing: ${adjustment}`);
  }

  applyPlateauBreakingStrategy(strategy) {
    // Implementation for applying plateau breaking strategies
    console.log(`Applying plateau breaking strategy: ${strategy}`);
  }

  applyAccelerationSupport(strategy) {
    // Implementation for applying acceleration support
    console.log(`Applying acceleration support: ${strategy}`);
  }

  /**
   * Track feature/approach usage and effectiveness (Cursor 2.0 Insight)
   * Learn which features work in which contexts
   */
  trackFeatureUsage(feature, context, outcome) {
    const key = `${feature}_${this.getContextKey(context)}`;
    
    if (!this.featureEffectiveness.has(key)) {
      this.featureEffectiveness.set(key, {
        feature: feature,
        context: context,
        usageCount: 0,
        successCount: 0,
        failureCount: 0,
        averageQuality: 0,
        averageSpeed: 0,
        outcomes: []
      });
    }

    const tracking = this.featureEffectiveness.get(key);
    tracking.usageCount++;
    tracking.outcomes.push({
      outcome: outcome,
      timestamp: new Date().toISOString()
    });

    if (outcome.success) {
      tracking.successCount++;
    } else {
      tracking.failureCount++;
    }

    // Update averages
    if (outcome.quality !== undefined) {
      tracking.averageQuality = 
        (tracking.averageQuality * (tracking.usageCount - 1) + outcome.quality) / tracking.usageCount;
    }

    if (outcome.speed !== undefined) {
      tracking.averageSpeed = 
        (tracking.averageSpeed * (tracking.usageCount - 1) + outcome.speed) / tracking.usageCount;
    }

    // Calculate effectiveness score
    tracking.effectiveness = this.calculateFeatureEffectiveness(tracking);

    console.log(`[meta-learning] Tracked feature usage: ${feature} in context ${this.getContextKey(context)} (effectiveness: ${tracking.effectiveness.toFixed(2)})`);

    return tracking;
  }

  /**
   * Track approach usage and effectiveness
   */
  trackApproachUsage(approach, context, outcome) {
    const key = `${approach}_${this.getContextKey(context)}`;
    
    if (!this.approachEffectiveness.has(key)) {
      this.approachEffectiveness.set(key, {
        approach: approach,
        context: context,
        usageCount: 0,
        successCount: 0,
        failureCount: 0,
        averageQuality: 0,
        averageSpeed: 0,
        outcomes: []
      });
    }

    const tracking = this.approachEffectiveness.get(key);
    tracking.usageCount++;
    tracking.outcomes.push({
      outcome: outcome,
      timestamp: new Date().toISOString()
    });

    if (outcome.success) {
      tracking.successCount++;
    } else {
      tracking.failureCount++;
    }

    // Update averages
    if (outcome.quality !== undefined) {
      tracking.averageQuality = 
        (tracking.averageQuality * (tracking.usageCount - 1) + outcome.quality) / tracking.usageCount;
    }

    if (outcome.speed !== undefined) {
      tracking.averageSpeed = 
        (tracking.averageSpeed * (tracking.usageCount - 1) + outcome.speed) / tracking.usageCount;
    }

    // Calculate effectiveness score
    tracking.effectiveness = this.calculateApproachEffectiveness(tracking);

    console.log(`[meta-learning] Tracked approach usage: ${approach} in context ${this.getContextKey(context)} (effectiveness: ${tracking.effectiveness.toFixed(2)})`);

    return tracking;
  }

  /**
   * Recommend approach based on learned patterns
   */
  recommendApproach(problem, context) {
    const contextKey = this.getContextKey(context);
    const recommendations = [];

    // Find similar contexts and their successful approaches
    for (const [key, tracking] of this.approachEffectiveness) {
      if (key.endsWith(contextKey) || this.isSimilarContext(tracking.context, context)) {
        if (tracking.effectiveness > 0.7 && tracking.usageCount >= 3) {
          recommendations.push({
            approach: tracking.approach,
            effectiveness: tracking.effectiveness,
            successRate: tracking.successCount / tracking.usageCount,
            averageQuality: tracking.averageQuality,
            averageSpeed: tracking.averageSpeed,
            confidence: Math.min(1, tracking.usageCount / 10) // More usage = higher confidence
          });
        }
      }
    }

    // Sort by effectiveness and confidence
    recommendations.sort((a, b) => {
      const scoreA = a.effectiveness * a.confidence;
      const scoreB = b.effectiveness * b.confidence;
      return scoreB - scoreA;
    });

    return recommendations.length > 0 ? recommendations[0] : null;
  }

  /**
   * Adapt workflow based on learned patterns
   */
  adaptWorkflow(patterns) {
    const adaptations = [];

    // Analyze feature effectiveness
    for (const [key, tracking] of this.featureEffectiveness) {
      if (tracking.usageCount >= 5) {
        const successRate = tracking.successCount / tracking.usageCount;
        
        // Stop using features that fail frequently
        if (successRate < 0.3) {
          adaptations.push({
            type: 'disable_feature',
            feature: tracking.feature,
            context: tracking.context,
            reason: `Low success rate: ${(successRate * 100).toFixed(1)}%`,
            recommendation: `Avoid using ${tracking.feature} in ${this.getContextKey(tracking.context)} context`
          });
        }

        // Prefer features that work well
        if (successRate > 0.8 && tracking.effectiveness > 0.8) {
          adaptations.push({
            type: 'prefer_feature',
            feature: tracking.feature,
            context: tracking.context,
            reason: `High success rate: ${(successRate * 100).toFixed(1)}%`,
            recommendation: `Prefer using ${tracking.feature} in ${this.getContextKey(tracking.context)} context`
          });
        }
      }
    }

    // Analyze approach effectiveness
    for (const [key, tracking] of this.approachEffectiveness) {
      if (tracking.usageCount >= 5) {
        const successRate = tracking.successCount / tracking.usageCount;
        
        // Stop using approaches that fail frequently
        if (successRate < 0.3) {
          adaptations.push({
            type: 'disable_approach',
            approach: tracking.approach,
            context: tracking.context,
            reason: `Low success rate: ${(successRate * 100).toFixed(1)}%`,
            recommendation: `Avoid using ${tracking.approach} in ${this.getContextKey(tracking.context)} context`
          });
        }

        // Prefer approaches that work well
        if (successRate > 0.8 && tracking.effectiveness > 0.8) {
          adaptations.push({
            type: 'prefer_approach',
            approach: tracking.approach,
            context: tracking.context,
            reason: `High success rate: ${(successRate * 100).toFixed(1)}%`,
            recommendation: `Prefer using ${tracking.approach} in ${this.getContextKey(tracking.context)} context`
          });
        }
      }
    }

    // Apply adaptations
    this.applyWorkflowAdaptations(adaptations);

    return adaptations;
  }

  /**
   * Apply workflow adaptations
   */
  applyWorkflowAdaptations(adaptations) {
    for (const adaptation of adaptations) {
      this.workflowAdaptations.set(
        `${adaptation.type}_${adaptation.feature || adaptation.approach}_${this.getContextKey(adaptation.context)}`,
        {
          ...adaptation,
          appliedAt: new Date().toISOString(),
          active: true
        }
      );

      console.log(`[meta-learning] Applied workflow adaptation: ${adaptation.recommendation}`);
    }
  }

  /**
   * Get workflow recommendations for a context
   */
  getWorkflowRecommendations(context) {
    const contextKey = this.getContextKey(context);
    const recommendations = {
      preferredFeatures: [],
      avoidedFeatures: [],
      preferredApproaches: [],
      avoidedApproaches: []
    };

    for (const [key, adaptation] of this.workflowAdaptations) {
      if (key.includes(contextKey) && adaptation.active) {
        if (adaptation.type === 'prefer_feature') {
          recommendations.preferredFeatures.push(adaptation);
        } else if (adaptation.type === 'disable_feature') {
          recommendations.avoidedFeatures.push(adaptation);
        } else if (adaptation.type === 'prefer_approach') {
          recommendations.preferredApproaches.push(adaptation);
        } else if (adaptation.type === 'disable_approach') {
          recommendations.avoidedApproaches.push(adaptation);
        }
      }
    }

    return recommendations;
  }

  /**
   * Helper: Get context key for tracking
   */
  getContextKey(context) {
    if (typeof context === 'string') return context;
    if (context.projectType) return context.projectType;
    if (context.phase) return context.phase;
    if (context.type) return context.type;
    return 'default';
  }

  /**
   * Helper: Check if contexts are similar
   */
  isSimilarContext(context1, context2) {
    const key1 = this.getContextKey(context1);
    const key2 = this.getContextKey(context2);
    return key1 === key2;
  }

  /**
   * Calculate feature effectiveness score
   */
  calculateFeatureEffectiveness(tracking) {
    const successRate = tracking.usageCount > 0 ? tracking.successCount / tracking.usageCount : 0;
    const qualityScore = tracking.averageQuality || 0.5;
    const speedScore = tracking.averageSpeed || 0.5;
    
    // Weighted effectiveness: success rate (50%), quality (30%), speed (20%)
    return (successRate * 0.5) + (qualityScore * 0.3) + (speedScore * 0.2);
  }

  /**
   * Calculate approach effectiveness score
   */
  calculateApproachEffectiveness(tracking) {
    return this.calculateFeatureEffectiveness(tracking); // Same calculation
  }

  /**
   * Get workflow adaptation statistics
   */
  getWorkflowAdaptationStatistics() {
    return {
      totalAdaptations: this.workflowAdaptations.size,
      featureTracking: this.featureEffectiveness.size,
      approachTracking: this.approachEffectiveness.size,
      activeAdaptations: Array.from(this.workflowAdaptations.values()).filter(a => a.active).length
    };
  }
}

module.exports = MetaLearningSystem;
