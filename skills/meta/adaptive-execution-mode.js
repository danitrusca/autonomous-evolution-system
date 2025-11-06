/**
 * Adaptive Execution Mode Skill
 * Automatically selects optimal execution mode based on problem characteristics
 * Based on Cursor 2.0 speed vs quality insights
 */

const MetaLearningSystem = require('./meta-learning-system');

class AdaptiveExecutionMode {
  constructor() {
    this.modeSelectionHistory = [];
    this.learningSystem = new MetaLearningSystem();
    this.decisionFramework = this.loadDecisionFramework();
  }

  /**
   * Load decision framework from rule
   */
  loadDecisionFramework() {
    return {
      fastModeThreshold: 4, // Score >= 4 for fast mode
      carefulModeThreshold: 3, // Score >= 3 for careful mode
      weights: {
        complexity: 0.20,
        risk: 0.25,
        clarity: 0.20,
        reversibility: 0.15,
        validation: 0.20
      }
    };
  }

  /**
   * Select execution mode for a problem
   */
  async selectExecutionMode(problem, context = {}) {
    console.log(`[adaptive-execution-mode] Analyzing problem: ${problem.id || problem.description}`);

    // Analyze problem characteristics
    const analysis = await this.analyzeProblem(problem, context);

    // Calculate mode scores
    const scores = this.calculateModeScores(analysis);

    // Select mode
    const selectedMode = this.selectMode(scores, analysis);

    // Record selection
    const selection = {
      problemId: problem.id || `problem-${Date.now()}`,
      problem: problem,
      analysis: analysis,
      scores: scores,
      selectedMode: selectedMode,
      timestamp: new Date().toISOString(),
      context: context
    };

    this.modeSelectionHistory.push(selection);
    this.learnFromSelection(selection);

    console.log(`[adaptive-execution-mode] Selected mode: ${selectedMode} (fast: ${scores.fast}, careful: ${scores.careful})`);

    return {
      mode: selectedMode,
      analysis: analysis,
      scores: scores,
      confidence: this.calculateConfidence(scores, analysis),
      recommendation: this.generateRecommendation(selectedMode, analysis)
    };
  }

  /**
   * Analyze problem characteristics
   */
  async analyzeProblem(problem, context) {
    return {
      complexity: this.assessComplexity(problem, context),
      risk: this.assessRisk(problem, context),
      clarity: this.assessClarity(problem, context),
      reversibility: this.assessReversibility(problem, context),
      validation: this.assessValidation(problem, context)
    };
  }

  /**
   * Assess problem complexity (0-1 scale)
   */
  assessComplexity(problem, context) {
    // Factors: lines of code, dependencies, algorithms, integrations
    let complexity = 0.5; // Default medium

    if (problem.complexity) {
      return problem.complexity;
    }

    // Heuristics
    if (problem.type === 'bug-fix' || problem.type === 'typo') {
      complexity = 0.1;
    } else if (problem.type === 'refactor' || problem.type === 'optimization') {
      complexity = 0.5;
    } else if (problem.type === 'architecture' || problem.type === 'migration') {
      complexity = 0.9;
    }

    // Adjust based on context
    if (context.projectPhase === 'prototype' || context.projectPhase === 'experimental') {
      complexity *= 0.7; // Lower complexity for experimental work
    }

    return Math.min(1, Math.max(0, complexity));
  }

  /**
   * Assess risk level (0-1 scale)
   */
  assessRisk(problem, context) {
    let risk = 0.5; // Default medium

    if (problem.risk) {
      return problem.risk;
    }

    // Heuristics
    if (problem.area === 'production' || problem.area === 'critical') {
      risk = 0.9;
    } else if (problem.area === 'test' || problem.area === 'development') {
      risk = 0.2;
    }

    // Adjust based on context
    if (context.hasTests && context.testCoverage > 0.8) {
      risk *= 0.7; // Lower risk with good test coverage
    }

    return Math.min(1, Math.max(0, risk));
  }

  /**
   * Assess solution clarity (0-1 scale)
   */
  assessClarity(problem, context) {
    let clarity = 0.5; // Default medium

    if (problem.clarity) {
      return problem.clarity;
    }

    // Heuristics
    if (problem.solution && problem.solution.length > 0) {
      clarity = 0.9; // Clear solution provided
    } else if (problem.description && problem.description.length > 50) {
      clarity = 0.7; // Detailed description
    } else {
      clarity = 0.3; // Vague problem
    }

    return Math.min(1, Math.max(0, clarity));
  }

  /**
   * Assess reversibility (0-1 scale)
   */
  assessReversibility(problem, context) {
    let reversibility = 0.5; // Default medium

    if (problem.reversibility) {
      return problem.reversibility;
    }

    // Heuristics
    if (context.hasVersionControl && context.canRollback) {
      reversibility = 0.9;
    } else if (problem.type === 'read-only' || problem.type === 'analysis') {
      reversibility = 1.0; // No changes needed
    } else if (problem.type === 'data-migration' || problem.type === 'schema-change') {
      reversibility = 0.2; // Hard to reverse
    }

    return Math.min(1, Math.max(0, reversibility));
  }

  /**
   * Assess validation availability (0-1 scale)
   */
  assessValidation(problem, context) {
    let validation = 0.5; // Default medium

    if (problem.validation) {
      return problem.validation;
    }

    // Heuristics
    if (context.hasAutomatedTests) {
      validation = 0.9;
    } else if (context.hasLinting && context.hasTypeChecking) {
      validation = 0.7;
    } else if (context.hasManualReview) {
      validation = 0.5;
    } else {
      validation = 0.2;
    }

    return Math.min(1, Math.max(0, validation));
  }

  /**
   * Calculate mode scores
   */
  calculateModeScores(analysis) {
    // Fast mode indicators (higher is better for fast mode)
    const fastModeScore = 
      (analysis.complexity < 0.3 ? 1 : 0) +
      (analysis.risk < 0.3 ? 1 : 0) +
      (analysis.clarity > 0.7 ? 1 : 0) +
      (analysis.reversibility > 0.7 ? 1 : 0) +
      (analysis.validation > 0.7 ? 1 : 0);

    // Careful mode indicators (higher is better for careful mode)
    const carefulModeScore =
      (analysis.complexity > 0.7 ? 1 : 0) +
      (analysis.risk > 0.7 ? 1 : 0) +
      (analysis.clarity < 0.3 ? 1 : 0) +
      (analysis.reversibility < 0.3 ? 1 : 0) +
      (analysis.validation < 0.3 ? 1 : 0);

    // Weighted scores
    const weightedFast = 
      (analysis.complexity < 0.3 ? this.decisionFramework.weights.complexity : 0) +
      (analysis.risk < 0.3 ? this.decisionFramework.weights.risk : 0) +
      (analysis.clarity > 0.7 ? this.decisionFramework.weights.clarity : 0) +
      (analysis.reversibility > 0.7 ? this.decisionFramework.weights.reversibility : 0) +
      (analysis.validation > 0.7 ? this.decisionFramework.weights.validation : 0);

    const weightedCareful =
      (analysis.complexity > 0.7 ? this.decisionFramework.weights.complexity : 0) +
      (analysis.risk > 0.7 ? this.decisionFramework.weights.risk : 0) +
      (analysis.clarity < 0.3 ? this.decisionFramework.weights.clarity : 0) +
      (analysis.reversibility < 0.3 ? this.decisionFramework.weights.reversibility : 0) +
      (analysis.validation < 0.3 ? this.decisionFramework.weights.validation : 0);

    return {
      fast: fastModeScore,
      careful: carefulModeScore,
      weightedFast: weightedFast,
      weightedCareful: weightedCareful
    };
  }

  /**
   * Select execution mode based on scores
   */
  selectMode(scores, analysis) {
    // Clear fast mode
    if (scores.fast >= this.decisionFramework.fastModeThreshold) {
      return 'fast';
    }

    // Clear careful mode
    if (scores.careful >= this.decisionFramework.carefulModeThreshold) {
      return 'careful';
    }

    // Hybrid mode for medium complexity
    if (analysis.complexity >= 0.3 && analysis.complexity <= 0.7 &&
        analysis.risk >= 0.3 && analysis.risk <= 0.7) {
      return 'hybrid';
    }

    // Default to careful for safety
    return 'careful';
  }

  /**
   * Calculate confidence in mode selection
   */
  calculateConfidence(scores, analysis) {
    const scoreDifference = Math.abs(scores.fast - scores.careful);
    const maxScore = Math.max(scores.fast, scores.careful);
    
    if (maxScore === 0) return 0.5; // No clear preference
    
    return Math.min(1, 0.5 + (scoreDifference / maxScore) * 0.5);
  }

  /**
   * Generate recommendation based on selected mode
   */
  generateRecommendation(mode, analysis) {
    const recommendations = {
      fast: [
        'Execute in parallel mode for speed',
        'Use automated validation',
        'Monitor for quick rollback if needed',
        'Capture learning for future similar problems'
      ],
      careful: [
        'Execute sequentially with validation gates',
        'Consider human review for critical steps',
        'Plan rollback strategy before execution',
        'Document decisions and rationale'
      ],
      hybrid: [
        'Run both fast and careful approaches in parallel',
        'Compare results and select best solution',
        'Learn which approach works better for this problem type',
        'Use comparison to improve future mode selection'
      ]
    };

    return recommendations[mode] || [];
  }

  /**
   * Learn from mode selection outcomes
   */
  async learnFromSelection(selection) {
    // This would integrate with MetaLearningSystem to learn patterns
    // For now, just log the selection
    console.log(`[adaptive-execution-mode] Learning from selection: ${selection.selectedMode}`);
    
    // Track selection patterns
    this.updateSelectionPatterns(selection);
  }

  /**
   * Update selection patterns for learning
   */
  updateSelectionPatterns(selection) {
    // This would update learning patterns
    // Could be used to improve future mode selection
  }

  /**
   * Get mode selection statistics
   */
  getSelectionStatistics() {
    const total = this.modeSelectionHistory.length;
    if (total === 0) return null;

    const modeCounts = {
      fast: 0,
      careful: 0,
      hybrid: 0
    };

    this.modeSelectionHistory.forEach(selection => {
      modeCounts[selection.selectedMode] = (modeCounts[selection.selectedMode] || 0) + 1;
    });

    return {
      total: total,
      fast: modeCounts.fast,
      careful: modeCounts.careful,
      hybrid: modeCounts.hybrid,
      fastPercentage: (modeCounts.fast / total) * 100,
      carefulPercentage: (modeCounts.careful / total) * 100,
      hybridPercentage: (modeCounts.hybrid / total) * 100
    };
  }
}

module.exports = AdaptiveExecutionMode;

