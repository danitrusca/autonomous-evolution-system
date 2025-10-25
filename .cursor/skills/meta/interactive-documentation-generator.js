/**
 * Interactive Documentation Generator
 * Based on Claude Desktop pattern from article analysis
 * 
 * This system transforms overwhelming implementation guides into
 * interactive, digestible workflows that users will actually use.
 */

class InteractiveDocumentationGenerator {
  constructor() {
    this.documentationTemplates = new Map();
    this.interactiveGuides = new Map();
    this.userProgress = new Map();
    this.learningPatterns = [];
  }

  /**
   * Transform a comprehensive guide into interactive documentation
   * @param {Object} guide - The comprehensive implementation guide
   * @param {Object} options - Customization options
   * @returns {string} - Interactive guide ID
   */
  createInteractiveGuide(guide, options = {}) {
    const guideId = `guide_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const interactiveGuide = {
      id: guideId,
      originalGuide: guide,
      phases: this.parsePhases(guide),
      progress: this.initializeProgress(),
      customization: options,
      createdAt: new Date(),
      lastAccessed: new Date()
    };

    this.interactiveGuides.set(guideId, interactiveGuide);
    return guideId;
  }

  /**
   * Parse comprehensive guide into digestible phases
   */
  parsePhases(guide) {
    const phases = [];
    
    // Extract phases from guide structure
    if (guide.phases) {
      for (const phase of guide.phases) {
        phases.push({
          id: phase.id || `phase_${phases.length + 1}`,
          name: phase.name,
          description: phase.description,
          steps: this.parseSteps(phase.steps || []),
          successCriteria: phase.successCriteria || [],
          estimatedTime: phase.estimatedTime || 'unknown',
          prerequisites: phase.prerequisites || [],
          status: 'pending'
        });
      }
    } else {
      // Auto-parse if no explicit phases
      phases.push(...this.autoParsePhases(guide));
    }
    
    return phases;
  }

  /**
   * Auto-parse phases from unstructured guide
   */
  autoParsePhases(guide) {
    const phases = [];
    const content = guide.content || guide.text || '';
    
    // Look for common phase patterns
    const phasePatterns = [
      { name: 'Setup', keywords: ['setup', 'install', 'configure', 'environment'] },
      { name: 'Implementation', keywords: ['implement', 'build', 'create', 'develop'] },
      { name: 'Testing', keywords: ['test', 'validate', 'verify', 'check'] },
      { name: 'Deployment', keywords: ['deploy', 'release', 'publish', 'production'] },
      { name: 'Optimization', keywords: ['optimize', 'improve', 'enhance', 'refine'] }
    ];
    
    for (const pattern of phasePatterns) {
      const relevantContent = this.extractRelevantContent(content, pattern.keywords);
      if (relevantContent.length > 0) {
        phases.push({
          id: `phase_${phases.length + 1}`,
          name: pattern.name,
          description: `Auto-parsed ${pattern.name} phase`,
          steps: this.parseStepsFromContent(relevantContent),
          successCriteria: this.generateSuccessCriteria(pattern.name),
          estimatedTime: this.estimateTime(relevantContent),
          prerequisites: this.extractPrerequisites(relevantContent),
          status: 'pending'
        });
      }
    }
    
    return phases;
  }

  /**
   * Parse steps from phase content
   */
  parseSteps(steps) {
    return steps.map((step, index) => ({
      id: step.id || `step_${index + 1}`,
      title: step.title || step.name || `Step ${index + 1}`,
      description: step.description || step.content,
      instructions: step.instructions || [],
      code: step.code || null,
      prompts: step.prompts || [],
      checklist: step.checklist || [],
      resources: step.resources || [],
      estimatedTime: step.estimatedTime || 'unknown',
      difficulty: step.difficulty || 'medium',
      status: 'pending',
      completedAt: null,
      notes: []
    }));
  }

  /**
   * Parse steps from unstructured content
   */
  parseStepsFromContent(content) {
    const steps = [];
    const lines = content.split('\n');
    let currentStep = null;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Detect step headers
      if (trimmedLine.match(/^\d+\./) || trimmedLine.match(/^Step \d+/i) || trimmedLine.match(/^###/)) {
        if (currentStep) {
          steps.push(currentStep);
        }
        currentStep = {
          id: `step_${steps.length + 1}`,
          title: trimmedLine.replace(/^\d+\.\s*/, '').replace(/^Step \d+:\s*/i, '').replace(/^###\s*/, ''),
          description: '',
          instructions: [],
          code: null,
          prompts: [],
          checklist: [],
          resources: [],
          estimatedTime: 'unknown',
          difficulty: 'medium',
          status: 'pending',
          completedAt: null,
          notes: []
        };
      } else if (currentStep && trimmedLine) {
        // Add content to current step
        if (trimmedLine.startsWith('```')) {
          currentStep.code = trimmedLine;
        } else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
          currentStep.instructions.push(trimmedLine.substring(2));
        } else {
          currentStep.description += (currentStep.description ? '\n' : '') + trimmedLine;
        }
      }
    }
    
    if (currentStep) {
      steps.push(currentStep);
    }
    
    return steps;
  }

  /**
   * Initialize progress tracking
   */
  initializeProgress() {
    return {
      currentPhase: 0,
      currentStep: 0,
      completedPhases: [],
      completedSteps: [],
      totalTimeSpent: 0,
      lastActivity: new Date(),
      bookmarks: [],
      notes: []
    };
  }

  /**
   * Get interactive guide for user
   */
  getInteractiveGuide(guideId, userId = 'default') {
    const guide = this.interactiveGuides.get(guideId);
    if (!guide) {
      throw new Error(`Guide ${guideId} not found`);
    }
    
    // Update last accessed
    guide.lastAccessed = new Date();
    
    // Get or create user progress
    const progressKey = `${guideId}_${userId}`;
    let progress = this.userProgress.get(progressKey);
    if (!progress) {
      progress = this.initializeProgress();
      this.userProgress.set(progressKey, progress);
    }
    
    return {
      guide,
      progress,
      currentPhase: this.getCurrentPhase(guide, progress),
      nextSteps: this.getNextSteps(guide, progress),
      recommendations: this.getRecommendations(guide, progress)
    };
  }

  /**
   * Get current phase for user
   */
  getCurrentPhase(guide, progress) {
    const currentPhaseIndex = progress.currentPhase;
    const phase = guide.phases[currentPhaseIndex];
    
    if (!phase) {
      return null;
    }
    
    return {
      ...phase,
      progress: this.calculatePhaseProgress(phase, progress),
      nextStep: this.getNextStepInPhase(phase, progress)
    };
  }

  /**
   * Get next steps for user
   */
  getNextSteps(guide, progress) {
    const nextSteps = [];
    
    // Get current phase steps
    const currentPhase = guide.phases[progress.currentPhase];
    if (currentPhase) {
      const currentStepIndex = progress.currentStep;
      const remainingSteps = currentPhase.steps.slice(currentStepIndex);
      
      for (const step of remainingSteps.slice(0, 3)) { // Next 3 steps
        nextSteps.push({
          ...step,
          isReady: this.isStepReady(step, progress),
          estimatedTime: this.estimateStepTime(step)
        });
      }
    }
    
    return nextSteps;
  }

  /**
   * Get personalized recommendations
   */
  getRecommendations(guide, progress) {
    const recommendations = [];
    
    // Based on progress patterns
    if (progress.totalTimeSpent > 0) {
      const averageStepTime = progress.totalTimeSpent / (progress.completedSteps.length || 1);
      if (averageStepTime > 30) { // More than 30 minutes per step
        recommendations.push({
          type: 'time_optimization',
          message: 'Consider breaking down complex steps into smaller tasks',
          priority: 'medium'
        });
      }
    }
    
    // Based on completion patterns
    if (progress.completedSteps.length > 0) {
      const completionRate = progress.completedSteps.length / this.getTotalSteps(guide);
      if (completionRate < 0.3) {
        recommendations.push({
          type: 'motivation',
          message: 'You\'re making good progress! Consider setting smaller daily goals',
          priority: 'low'
        });
      }
    }
    
    // Based on difficulty patterns
    const difficultSteps = this.getDifficultSteps(guide, progress);
    if (difficultSteps.length > 0) {
      recommendations.push({
        type: 'difficulty_support',
        message: `${difficultSteps.length} challenging steps ahead - consider seeking help or breaking them down`,
        priority: 'high',
        steps: difficultSteps
      });
    }
    
    return recommendations;
  }

  /**
   * Mark step as completed
   */
  markStepCompleted(guideId, userId, phaseIndex, stepIndex, notes = []) {
    const progressKey = `${guideId}_${userId}`;
    const progress = this.userProgress.get(progressKey);
    
    if (!progress) {
      throw new Error(`Progress not found for user ${userId}`);
    }
    
    const stepKey = `${phaseIndex}_${stepIndex}`;
    if (!progress.completedSteps.includes(stepKey)) {
      progress.completedSteps.push(stepKey);
      progress.lastActivity = new Date();
      
      // Update phase progress
      if (phaseIndex === progress.currentPhase) {
        progress.currentStep = stepIndex + 1;
        
        // Check if phase is complete
        const phase = this.interactiveGuides.get(guideId).phases[phaseIndex];
        if (progress.currentStep >= phase.steps.length) {
          progress.completedPhases.push(phaseIndex);
          progress.currentPhase = phaseIndex + 1;
          progress.currentStep = 0;
        }
      }
    }
    
    // Save notes
    if (notes.length > 0) {
      progress.notes.push({
        stepKey,
        timestamp: new Date(),
        notes
      });
    }
    
    // Capture learning
    this.captureStepLearning(guideId, phaseIndex, stepIndex, notes);
  }

  /**
   * Capture learning from step completion
   */
  captureStepLearning(guideId, phaseIndex, stepIndex, notes) {
    const learning = {
      guideId,
      phaseIndex,
      stepIndex,
      timestamp: new Date(),
      patterns: [],
      insights: [],
      improvements: []
    };
    
    // Extract patterns from notes
    for (const note of notes) {
      if (note.includes('difficult') || note.includes('challenging')) {
        learning.patterns.push({
          type: 'difficulty_pattern',
          step: `${phaseIndex}_${stepIndex}`,
          insight: 'Step was challenging'
        });
      }
      
      if (note.includes('easy') || note.includes('simple')) {
        learning.patterns.push({
          type: 'ease_pattern',
          step: `${phaseIndex}_${stepIndex}`,
          insight: 'Step was straightforward'
        });
      }
    }
    
    this.learningPatterns.push(learning);
    
    // Save to autonomous evolution journal
    this.saveToEvolutionJournal(learning);
  }

  /**
   * Save learning to autonomous evolution journal
   */
  saveToEvolutionJournal(learning) {
    const entry = {
      timestamp: learning.timestamp,
      type: 'interactive_documentation_learning',
      guideId: learning.guideId,
      patterns: learning.patterns,
      insights: learning.insights,
      improvements: learning.improvements
    };
    
    console.log('Saving interactive documentation learning:', entry);
  }

  /**
   * Generate progress report
   */
  generateProgressReport(guideId, userId) {
    const guide = this.interactiveGuides.get(guideId);
    const progress = this.userProgress.get(`${guideId}_${userId}`);
    
    if (!guide || !progress) {
      return null;
    }
    
    const totalSteps = this.getTotalSteps(guide);
    const completedSteps = progress.completedSteps.length;
    const completionRate = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
    
    const totalPhases = guide.phases.length;
    const completedPhases = progress.completedPhases.length;
    const phaseCompletionRate = totalPhases > 0 ? (completedPhases / totalPhases) * 100 : 0;
    
    return {
      guideId,
      userId,
      completionRate: Math.round(completionRate),
      phaseCompletionRate: Math.round(phaseCompletionRate),
      totalSteps,
      completedSteps,
      totalPhases,
      completedPhases,
      currentPhase: progress.currentPhase,
      currentStep: progress.currentStep,
      timeSpent: progress.totalTimeSpent,
      lastActivity: progress.lastActivity,
      recommendations: this.getRecommendations(guide, progress)
    };
  }

  /**
   * Helper methods
   */
  getTotalSteps(guide) {
    return guide.phases.reduce((total, phase) => total + phase.steps.length, 0);
  }

  calculatePhaseProgress(phase, progress) {
    const completedInPhase = progress.completedSteps.filter(step => 
      step.startsWith(`${progress.currentPhase}_`)
    ).length;
    
    return phase.steps.length > 0 ? (completedInPhase / phase.steps.length) * 100 : 0;
  }

  getNextStepInPhase(phase, progress) {
    const currentStepIndex = progress.currentStep;
    return phase.steps[currentStepIndex] || null;
  }

  isStepReady(step, progress) {
    // Check prerequisites
    if (step.prerequisites && step.prerequisites.length > 0) {
      for (const prereq of step.prerequisites) {
        if (!progress.completedSteps.includes(prereq)) {
          return false;
        }
      }
    }
    
    return true;
  }

  estimateStepTime(step) {
    // Simple estimation based on step characteristics
    if (step.estimatedTime !== 'unknown') {
      return step.estimatedTime;
    }
    
    const instructionCount = step.instructions.length;
    const hasCode = step.code !== null;
    const difficulty = step.difficulty;
    
    let baseTime = 5; // 5 minutes base
    baseTime += instructionCount * 2; // 2 minutes per instruction
    if (hasCode) baseTime += 10; // 10 minutes for code
    
    if (difficulty === 'easy') baseTime *= 0.5;
    if (difficulty === 'hard') baseTime *= 2;
    
    return `${Math.round(baseTime)} minutes`;
  }

  getDifficultSteps(guide, progress) {
    return guide.phases
      .flatMap((phase, phaseIndex) => 
        phase.steps.map((step, stepIndex) => ({
          ...step,
          phaseIndex,
          stepIndex,
          key: `${phaseIndex}_${stepIndex}`
        }))
      )
      .filter(step => 
        step.difficulty === 'hard' && 
        !progress.completedSteps.includes(step.key)
      );
  }

  extractRelevantContent(content, keywords) {
    const lines = content.split('\n');
    const relevantLines = [];
    
    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      if (keywords.some(keyword => lowerLine.includes(keyword))) {
        relevantLines.push(line);
      }
    }
    
    return relevantLines;
  }

  generateSuccessCriteria(phaseName) {
    const criteriaMap = {
      'Setup': ['Environment configured', 'Dependencies installed', 'Configuration complete'],
      'Implementation': ['Code written', 'Tests passing', 'Documentation updated'],
      'Testing': ['All tests passing', 'Coverage targets met', 'Performance validated'],
      'Deployment': ['Successfully deployed', 'Health checks passing', 'Monitoring active'],
      'Optimization': ['Performance improved', 'Bottlenecks resolved', 'Metrics optimized']
    };
    
    return criteriaMap[phaseName] || ['Phase completed successfully'];
  }

  estimateTime(content) {
    const lines = content.length;
    if (lines < 100) return '5-10 minutes';
    if (lines < 500) return '15-30 minutes';
    if (lines < 1000) return '30-60 minutes';
    return '1-2 hours';
  }

  extractPrerequisites(content) {
    const prerequisites = [];
    const lines = content.split('\n');
    
    for (const line of lines) {
      if (line.toLowerCase().includes('prerequisite') || line.toLowerCase().includes('requires')) {
        prerequisites.push(line.trim());
      }
    }
    
    return prerequisites;
  }
}

module.exports = InteractiveDocumentationGenerator;
