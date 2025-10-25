/**
 * AI Friction Detection System
 * Detects friction in AI skill usage to guide system evolution
 */

class AIFrictionDetection {
  constructor() {
    this.frictionPatterns = new Map();
    this.frictionHistory = [];
    this.adaptationHistory = [];
    this.learningRate = 0.1;
  }

  /**
   * Detect friction in AI skill usage
   * Invariant: All AI friction is detected and analyzed
   */
  detectAIFriction(context, skill, result) {
    console.log('[ai-friction-detection] Detecting AI friction');
    
    try {
      // Detect different types of friction
      const friction = {
        skillDiscovery: this.detectSkillDiscoveryFriction(context),
        skillExecution: this.detectSkillExecutionFriction(skill, result),
        skillComposition: this.detectSkillCompositionFriction(context),
        skillLearning: this.detectSkillLearningFriction(context),
        skillMaintenance: this.detectSkillMaintenanceFriction(skill)
      };
      
      // Analyze friction patterns
      const analysis = this.analyzeFrictionPatterns(friction);
      
      // Adapt based on friction
      const adaptation = this.adaptBasedOnFriction(friction, analysis);
      
      // Learn from friction
      const learning = this.learnFromFriction(friction, analysis, adaptation);
      
      // Log friction detection
      this.logFrictionDetection(friction, analysis, adaptation, learning);
      
      return {
        success: true,
        friction,
        analysis,
        adaptation,
        learning
      };
      
    } catch (error) {
      console.error('[ai-friction-detection] Friction detection failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Detect skill discovery friction
   * Invariant: Discovery friction is accurately detected
   */
  detectSkillDiscoveryFriction(context) {
    const friction = {
      detected: false,
      type: 'skill_discovery',
      severity: 'low',
      patterns: [],
      solutions: []
    };
    
    // Check if AI is struggling to find the right skill
    if (context.skillSearchAttempts > 3) {
      friction.detected = true;
      friction.severity = 'high';
      friction.patterns.push('multiple_search_attempts');
      friction.solutions.push('improve_skill_discovery');
    }
    
    // Check if AI is using suboptimal skills
    if (context.skillMismatch) {
      friction.detected = true;
      friction.severity = 'medium';
      friction.patterns.push('skill_mismatch');
      friction.solutions.push('improve_skill_suggestion');
    }
    
    return friction;
  }

  /**
   * Detect skill execution friction
   * Invariant: Execution friction is accurately detected
   */
  detectSkillExecutionFriction(skill, result) {
    const friction = {
      detected: false,
      type: 'skill_execution',
      severity: 'low',
      patterns: [],
      solutions: []
    };
    
    // Check if skill execution failed
    if (result && result.success === false) {
      friction.detected = true;
      friction.severity = 'high';
      friction.patterns.push('execution_failure');
      friction.solutions.push('fix_skill_execution');
    }
    
    // Check if skill is too complex
    if (skill && skill.complexity > 0.8) {
      friction.detected = true;
      friction.severity = 'medium';
      friction.patterns.push('high_complexity');
      friction.solutions.push('simplify_skill');
    }
    
    // Check if skill execution is slow
    if (result && result.executionTime > 5000) {
      friction.detected = true;
      friction.severity = 'medium';
      friction.patterns.push('slow_execution');
      friction.solutions.push('optimize_skill_performance');
    }
    
    return friction;
  }

  /**
   * Detect skill composition friction
   * Invariant: Composition friction is accurately detected
   */
  detectSkillCompositionFriction(context) {
    const friction = {
      detected: false,
      type: 'skill_composition',
      severity: 'low',
      patterns: [],
      solutions: []
    };
    
    // Check if skills don't work well together
    if (context.skillConflicts && context.skillConflicts.length > 0) {
      friction.detected = true;
      friction.severity = 'high';
      friction.patterns.push('skill_conflicts');
      friction.solutions.push('resolve_skill_conflicts');
    }
    
    // Check if skill orchestration is complex
    if (context.skillOrchestrationComplexity > 0.7) {
      friction.detected = true;
      friction.severity = 'medium';
      friction.patterns.push('complex_orchestration');
      friction.solutions.push('simplify_skill_orchestration');
    }
    
    return friction;
  }

  /**
   * Detect skill learning friction
   * Invariant: Learning friction is accurately detected
   */
  detectSkillLearningFriction(context) {
    const friction = {
      detected: false,
      type: 'skill_learning',
      severity: 'low',
      patterns: [],
      solutions: []
    };
    
    // Check if AI needs skills that don't exist
    if (context.missingSkills && context.missingSkills.length > 0) {
      friction.detected = true;
      friction.severity = 'high';
      friction.patterns.push('missing_skills');
      friction.solutions.push('create_missing_skills');
    }
    
    // Check if skill learning is slow
    if (context.skillLearningTime > 10000) {
      friction.detected = true;
      friction.severity = 'medium';
      friction.patterns.push('slow_learning');
      friction.solutions.push('improve_skill_learning');
    }
    
    return friction;
  }

  /**
   * Detect skill maintenance friction
   * Invariant: Maintenance friction is accurately detected
   */
  detectSkillMaintenanceFriction(skill) {
    const friction = {
      detected: false,
      type: 'skill_maintenance',
      severity: 'low',
      patterns: [],
      solutions: []
    };
    
    // Check if skill is outdated
    if (skill && skill.lastUpdated && this.isSkillOutdated(skill)) {
      friction.detected = true;
      friction.severity = 'medium';
      friction.patterns.push('outdated_skill');
      friction.solutions.push('update_skill');
    }
    
    // Check if skill is no longer relevant
    if (skill && skill.relevance < 0.3) {
      friction.detected = true;
      friction.severity = 'high';
      friction.patterns.push('irrelevant_skill');
      friction.solutions.push('remove_or_redesign_skill');
    }
    
    return friction;
  }

  /**
   * Analyze friction patterns
   * Invariant: Friction patterns are accurately analyzed
   */
  analyzeFrictionPatterns(friction) {
    console.log('[ai-friction-detection] Analyzing friction patterns');
    
    const analysis = {
      totalFriction: 0,
      highSeverityFriction: 0,
      patterns: [],
      rootCauses: [],
      priorities: [],
      solutions: []
    };
    
    // Count total friction
    Object.values(friction).forEach(f => {
      if (f.detected) {
        analysis.totalFriction++;
        if (f.severity === 'high') {
          analysis.highSeverityFriction++;
        }
        analysis.patterns.push(...f.patterns);
        analysis.solutions.push(...f.solutions);
      }
    });
    
    // Identify root causes
    analysis.rootCauses = this.identifyRootCauses(friction);
    
    // Prioritize friction
    analysis.priorities = this.prioritizeFriction(friction);
    
    return analysis;
  }

  /**
   * Adapt based on friction
   * Invariant: Adaptations are based on friction analysis
   */
  adaptBasedOnFriction(friction, analysis) {
    console.log('[ai-friction-detection] Adapting based on friction');
    
    const adaptations = [];
    
    // Adapt to skill discovery friction
    if (friction.skillDiscovery.detected) {
      adaptations.push({
        type: 'skill_discovery',
        action: 'improve_skill_suggestion',
        priority: 'high'
      });
    }
    
    // Adapt to skill execution friction
    if (friction.skillExecution.detected) {
      adaptations.push({
        type: 'skill_execution',
        action: 'simplify_skill_interface',
        priority: 'high'
      });
    }
    
    // Adapt to skill composition friction
    if (friction.skillComposition.detected) {
      adaptations.push({
        type: 'skill_composition',
        action: 'improve_skill_integration',
        priority: 'medium'
      });
    }
    
    // Adapt to skill learning friction
    if (friction.skillLearning.detected) {
      adaptations.push({
        type: 'skill_learning',
        action: 'create_missing_skills',
        priority: 'high'
      });
    }
    
    // Adapt to skill maintenance friction
    if (friction.skillMaintenance.detected) {
      adaptations.push({
        type: 'skill_maintenance',
        action: 'update_outdated_skills',
        priority: 'medium'
      });
    }
    
    return adaptations;
  }

  /**
   * Learn from friction
   * Invariant: Learning is based on friction patterns
   */
  learnFromFriction(friction, analysis, adaptation) {
    console.log('[ai-friction-detection] Learning from friction');
    
    const learning = {
      patterns: [],
      insights: [],
      improvements: [],
      evolution: []
    };
    
    // Learn from friction patterns
    learning.patterns = this.extractLearningPatterns(friction);
    
    // Generate insights
    learning.insights = this.generateInsights(friction, analysis);
    
    // Identify improvements
    learning.improvements = this.identifyImprovements(adaptation);
    
    // Plan evolution
    learning.evolution = this.planEvolution(learning);
    
    return learning;
  }

  /**
   * Identify root causes
   * Invariant: Root causes are accurately identified
   */
  identifyRootCauses(friction) {
    const rootCauses = [];
    
    if (friction.skillDiscovery.detected) {
      rootCauses.push('poor_skill_organization');
    }
    
    if (friction.skillExecution.detected) {
      rootCauses.push('complex_skill_interfaces');
    }
    
    if (friction.skillComposition.detected) {
      rootCauses.push('poor_skill_integration');
    }
    
    if (friction.skillLearning.detected) {
      rootCauses.push('insufficient_skill_coverage');
    }
    
    if (friction.skillMaintenance.detected) {
      rootCauses.push('poor_skill_maintenance');
    }
    
    return rootCauses;
  }

  /**
   * Prioritize friction
   * Invariant: Friction is prioritized by impact
   */
  prioritizeFriction(friction) {
    const priorities = [];
    
    Object.entries(friction).forEach(([type, f]) => {
      if (f.detected) {
        priorities.push({
          type,
          severity: f.severity,
          priority: f.severity === 'high' ? 1 : f.severity === 'medium' ? 2 : 3
        });
      }
    });
    
    return priorities.sort((a, b) => a.priority - b.priority);
  }

  /**
   * Extract learning patterns
   * Invariant: Learning patterns are accurately extracted
   */
  extractLearningPatterns(friction) {
    const patterns = [];
    
    Object.values(friction).forEach(f => {
      if (f.detected) {
        patterns.push({
          type: f.type,
          patterns: f.patterns,
          frequency: 1,
          confidence: 0.8
        });
      }
    });
    
    return patterns;
  }

  /**
   * Generate insights
   * Invariant: Insights are based on friction analysis
   */
  generateInsights(friction, analysis) {
    const insights = [];
    
    if (analysis.totalFriction > 3) {
      insights.push('High friction detected - system needs simplification');
    }
    
    if (analysis.highSeverityFriction > 0) {
      insights.push('Critical friction detected - immediate action needed');
    }
    
    if (analysis.patterns.length > 5) {
      insights.push('Multiple friction patterns - comprehensive solution needed');
    }
    
    return insights;
  }

  /**
   * Identify improvements
   * Invariant: Improvements are based on adaptations
   */
  identifyImprovements(adaptation) {
    return adaptation.map(adapt => ({
      type: adapt.type,
      improvement: adapt.action,
      priority: adapt.priority
    }));
  }

  /**
   * Plan evolution
   * Invariant: Evolution is planned based on learning
   */
  planEvolution(learning) {
    return {
      shortTerm: learning.improvements.filter(imp => imp.priority === 'high'),
      mediumTerm: learning.improvements.filter(imp => imp.priority === 'medium'),
      longTerm: learning.improvements.filter(imp => imp.priority === 'low')
    };
  }

  /**
   * Check if skill is outdated
   * Invariant: Outdated skills are accurately identified
   */
  isSkillOutdated(skill) {
    const daysSinceUpdate = (Date.now() - new Date(skill.lastUpdated).getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceUpdate > 30; // Skills older than 30 days are considered outdated
  }

  /**
   * Log friction detection
   * Invariant: Friction detection is logged comprehensively
   */
  logFrictionDetection(friction, analysis, adaptation, learning) {
    console.log('[ai-friction-detection] Friction detection completed');
    console.log(`[ai-friction-detection] Total friction: ${analysis.totalFriction}`);
    console.log(`[ai-friction-detection] High severity: ${analysis.highSeverityFriction}`);
    console.log(`[ai-friction-detection] Adaptations: ${adaptation.length}`);
    console.log(`[ai-friction-detection] Learning patterns: ${learning.patterns.length}`);
  }
}

module.exports = AIFrictionDetection;
