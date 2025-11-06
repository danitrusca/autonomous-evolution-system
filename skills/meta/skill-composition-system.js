/**
 * Skill Composition System
 * Enables complex multi-step workflows by composing multiple skills
 * Based on Claude Skills insights for skill composition and workflow orchestration
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class SkillCompositionSystem {
  constructor() {
    this.compositionTemplates = new Map();
    this.skillDependencies = new Map();
    this.executionGraph = new Map();
    this.loadCompositionTemplates();
  }

  /**
   * Load composition templates for common workflow patterns
   */
  loadCompositionTemplates() {
    const templates = {
      'full-stack-development': {
        name: 'Full Stack Development Workflow',
        description: 'Complete full-stack development from design to deployment',
        skills: [
          { name: 'architecture-designer', phase: 'design', parallel: false },
          { name: 'database-designer', phase: 'design', parallel: true },
          { name: 'api-designer', phase: 'design', parallel: true },
          { name: 'frontend-builder', phase: 'implement', parallel: false },
          { name: 'backend-builder', phase: 'implement', parallel: true },
          { name: 'test-generator', phase: 'test', parallel: false },
          { name: 'security-audit', phase: 'security', parallel: false },
          { name: 'performance-optimizer', phase: 'optimize', parallel: false },
          { name: 'deployment-optimizer', phase: 'deploy', parallel: false }
        ],
        phases: ['design', 'implement', 'test', 'security', 'optimize', 'deploy'],
        dependencies: this.createDependencyGraph([
          ['architecture-designer', 'database-designer'],
          ['architecture-designer', 'api-designer'],
          ['database-designer', 'backend-builder'],
          ['api-designer', 'frontend-builder'],
          ['api-designer', 'backend-builder'],
          ['frontend-builder', 'test-generator'],
          ['backend-builder', 'test-generator'],
          ['test-generator', 'security-audit'],
          ['security-audit', 'performance-optimizer'],
          ['performance-optimizer', 'deployment-optimizer']
        ])
      },
      'content-optimization': {
        name: 'Content Optimization Workflow',
        description: 'Complete content optimization for SEO and engagement',
        skills: [
          { name: 'content-analyzer', phase: 'analyze', parallel: false },
          { name: 'keyword-researcher', phase: 'research', parallel: false },
          { name: 'seo-optimizer', phase: 'optimize', parallel: false },
          { name: 'readability-checker', phase: 'quality', parallel: false },
          { name: 'engagement-optimizer', phase: 'engagement', parallel: false },
          { name: 'performance-analyzer', phase: 'performance', parallel: false }
        ],
        phases: ['analyze', 'research', 'optimize', 'quality', 'engagement', 'performance'],
        dependencies: this.createDependencyGraph([
          ['content-analyzer', 'keyword-researcher'],
          ['keyword-researcher', 'seo-optimizer'],
          ['seo-optimizer', 'readability-checker'],
          ['readability-checker', 'engagement-optimizer'],
          ['engagement-optimizer', 'performance-analyzer']
        ])
      },
      'security-hardening': {
        name: 'Security Hardening Workflow',
        description: 'Comprehensive security analysis and hardening',
        skills: [
          { name: 'vulnerability-scanner', phase: 'scan', parallel: false },
          { name: 'dependency-audit', phase: 'audit', parallel: true },
          { name: 'authentication-checker', phase: 'auth', parallel: true },
          { name: 'authorization-validator', phase: 'auth', parallel: true },
          { name: 'input-validator', phase: 'validation', parallel: false },
          { name: 'encryption-checker', phase: 'crypto', parallel: false },
          { name: 'security-report-generator', phase: 'report', parallel: false }
        ],
        phases: ['scan', 'audit', 'auth', 'validation', 'crypto', 'report'],
        dependencies: this.createDependencyGraph([
          ['vulnerability-scanner', 'dependency-audit'],
          ['vulnerability-scanner', 'authentication-checker'],
          ['vulnerability-scanner', 'authorization-validator'],
          ['dependency-audit', 'input-validator'],
          ['authentication-checker', 'input-validator'],
          ['authorization-validator', 'input-validator'],
          ['input-validator', 'encryption-checker'],
          ['encryption-checker', 'security-report-generator']
        ])
      }
    };

    for (const [key, template] of Object.entries(templates)) {
      this.compositionTemplates.set(key, template);
    }
  }

  /**
   * Create dependency graph from skill relationships
   */
  createDependencyGraph(relationships) {
    const graph = new Map();
    
    for (const [from, to] of relationships) {
      if (!graph.has(from)) {
        graph.set(from, []);
      }
      graph.get(from).push(to);
    }
    
    return graph;
  }

  /**
   * Compose skills into a complex workflow
   */
  composeSkills(templateKey, customizations = {}) {
    const template = this.compositionTemplates.get(templateKey);
    if (!template) {
      throw new Error(`Composition template ${templateKey} not found`);
    }

    const composition = {
      ...template,
      ...customizations,
      id: `composition-${Date.now()}`,
      created: new Date().toISOString(),
      status: 'created'
    };

    return composition;
  }

  /**
   * Execute skill composition with proper orchestration
   */
  async executeComposition(composition, context = {}) {
    console.log(`[skill-composition] Executing composition: ${composition.name}`);
    
    const execution = {
      compositionId: composition.id,
      startTime: new Date().toISOString(),
      status: 'running',
      results: new Map(),
      errors: new Map(),
      phase: 'initialization'
    };

    try {
      // Execute phases sequentially
      for (const phase of composition.phases) {
        console.log(`[skill-composition] Executing phase: ${phase}`);
        execution.phase = phase;
        
        const phaseSkills = composition.skills.filter(skill => skill.phase === phase);
        const phaseResults = await this.executePhase(phaseSkills, context, execution);
        
        execution.results.set(phase, phaseResults);
        
        // Check for phase failures
        const phaseErrors = phaseResults.filter(result => !result.success);
        if (phaseErrors.length > 0) {
          console.error(`[skill-composition] Phase ${phase} failed with ${phaseErrors.length} errors`);
          execution.errors.set(phase, phaseErrors);
          
          // Decide whether to continue or abort
          if (this.shouldAbortOnPhaseFailure(phase, composition)) {
            throw new Error(`Critical phase ${phase} failed, aborting composition`);
          }
        }
      }
      
      execution.status = 'completed';
      execution.endTime = new Date().toISOString();
      
      console.log(`[skill-composition] Composition completed successfully`);
      
    } catch (error) {
      execution.status = 'failed';
      execution.endTime = new Date().toISOString();
      execution.error = error.message;
      
      console.error(`[skill-composition] Composition failed: ${error.message}`);
    }
    
    return execution;
  }

  /**
   * Execute a phase with parallel and sequential skill execution
   */
  async executePhase(phaseSkills, context, execution) {
    const results = [];
    
    // Group skills by parallel execution
    const parallelGroups = this.groupSkillsByParallel(phaseSkills);
    
    for (const group of parallelGroups) {
      if (group.length === 1) {
        // Sequential execution
        const result = await this.executeSkill(group[0], context, execution);
        results.push(result);
      } else {
        // Parallel execution
        const parallelResults = await Promise.all(
          group.map(skill => this.executeSkill(skill, context, execution))
        );
        results.push(...parallelResults);
      }
    }
    
    return results;
  }

  /**
   * Compare multiple solutions to the same problem (Cursor 2.0 Insight)
   * Runs the same problem through different approaches and selects the best
   * 
   * @param {Object} problem - The problem to solve
   * @param {Array} approaches - Array of approach configurations
   * @param {Object} context - Execution context
   * @returns {Object} - Best solution with comparison data
   */
  async compareSolutions(problem, approaches, context = {}) {
    console.log(`[skill-composition] Comparing ${approaches.length} solutions for problem: ${problem.description || problem.id}`);
    
    const comparison = {
      problemId: problem.id || `problem-${Date.now()}`,
      problem: problem,
      approaches: approaches,
      startTime: new Date().toISOString(),
      results: [],
      bestSolution: null,
      comparisonMetrics: {}
    };

    try {
      // Execute all approaches in parallel
      const solutionResults = await Promise.all(
        approaches.map(async (approach, index) => {
          const isolatedContext = this.isolateContext(context, approach.id || `approach-${index}`);
          
          const result = {
            approachId: approach.id || `approach-${index}`,
            approach: approach,
            startTime: new Date().toISOString(),
            context: isolatedContext
          };

          try {
            // Execute the approach
            const executionResult = await this.executeApproach(problem, approach, isolatedContext);
            
            result.endTime = new Date().toISOString();
            result.duration = new Date(result.endTime) - new Date(result.startTime);
            result.success = true;
            result.solution = executionResult;
            
            // Evaluate the solution
            result.evaluation = await this.evaluateSolution(executionResult, problem, approach);
            
          } catch (error) {
            result.endTime = new Date().toISOString();
            result.duration = new Date(result.endTime) - new Date(result.startTime);
            result.success = false;
            result.error = error.message;
            result.evaluation = {
              quality: 0,
              speed: 0,
              maintainability: 0,
              overall: 0
            };
          }

          return result;
        })
      );

      comparison.results = solutionResults;
      comparison.endTime = new Date().toISOString();
      comparison.duration = new Date(comparison.endTime) - new Date(comparison.startTime);

      // Select best solution based on evaluation criteria
      comparison.bestSolution = this.selectBestSolution(solutionResults, problem);
      
      // Generate comparison metrics
      comparison.comparisonMetrics = this.generateComparisonMetrics(solutionResults);

      console.log(`[skill-composition] Solution comparison completed. Best: ${comparison.bestSolution.approachId} (score: ${comparison.bestSolution.evaluation.overall.toFixed(2)})`);

    } catch (error) {
      comparison.error = error.message;
      comparison.status = 'failed';
      console.error(`[skill-composition] Solution comparison failed: ${error.message}`);
    }

    return comparison;
  }

  /**
   * Execute a single approach to solve a problem
   */
  async executeApproach(problem, approach, context) {
    // This would integrate with actual skill execution
    // For now, simulate execution
    return {
      approachId: approach.id,
      solution: `Solution using ${approach.name || approach.id}`,
      artifacts: approach.artifacts || [],
      metadata: {
        skills: approach.skills || [],
        strategy: approach.strategy || 'default'
      }
    };
  }

  /**
   * Evaluate a solution based on multiple criteria
   */
  async evaluateSolution(solution, problem, approach) {
    // Evaluation criteria (can be customized)
    const criteria = {
      quality: this.evaluateQuality(solution, problem),
      speed: this.evaluateSpeed(solution, approach),
      maintainability: this.evaluateMaintainability(solution, approach),
      completeness: this.evaluateCompleteness(solution, problem),
      robustness: this.evaluateRobustness(solution, problem)
    };

    // Weighted overall score
    const weights = {
      quality: 0.30,
      speed: 0.15,
      maintainability: 0.25,
      completeness: 0.20,
      robustness: 0.10
    };

    const overall = Object.entries(criteria).reduce((sum, [key, value]) => {
      return sum + (value * (weights[key] || 0.1));
    }, 0);

    return {
      ...criteria,
      overall: overall,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Select the best solution from comparison results
   */
  selectBestSolution(results, problem) {
    // Filter successful results
    const successfulResults = results.filter(r => r.success);
    
    if (successfulResults.length === 0) {
      // If all failed, return the one with least error impact
      return results.reduce((best, current) => {
        return (!best || (current.evaluation?.overall || 0) > (best.evaluation?.overall || 0)) 
          ? current 
          : best;
      }, null);
    }

    // Select based on overall evaluation score
    return successfulResults.reduce((best, current) => {
      const bestScore = best.evaluation?.overall || 0;
      const currentScore = current.evaluation?.overall || 0;
      return currentScore > bestScore ? current : best;
    });
  }

  /**
   * Generate comparison metrics across all solutions
   */
  generateComparisonMetrics(results) {
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    const metrics = {
      totalApproaches: results.length,
      successfulCount: successful.length,
      failedCount: failed.length,
      successRate: results.length > 0 ? successful.length / results.length : 0,
      averageDuration: successful.length > 0
        ? successful.reduce((sum, r) => sum + (r.duration || 0), 0) / successful.length
        : 0,
      averageQuality: successful.length > 0
        ? successful.reduce((sum, r) => sum + (r.evaluation?.quality || 0), 0) / successful.length
        : 0,
      averageOverall: successful.length > 0
        ? successful.reduce((sum, r) => sum + (r.evaluation?.overall || 0), 0) / successful.length
        : 0,
      scoreRange: {
        min: successful.length > 0
          ? Math.min(...successful.map(r => r.evaluation?.overall || 0))
          : 0,
        max: successful.length > 0
          ? Math.max(...successful.map(r => r.evaluation?.overall || 0))
          : 0
      }
    };

    return metrics;
  }

  /**
   * Isolate context for parallel execution (prevents context pollution)
   */
  isolateContext(context, sessionId) {
    // Deep clone context to prevent interference
    return {
      ...JSON.parse(JSON.stringify(context)),
      sessionId: sessionId,
      isolated: true,
      timestamp: new Date().toISOString()
    };
  }

  // Evaluation helper methods
  evaluateQuality(solution, problem) {
    // Placeholder: would analyze solution quality
    return 0.8; // Default quality score
  }

  evaluateSpeed(solution, approach) {
    // Placeholder: would analyze execution speed
    return 0.7; // Default speed score
  }

  evaluateMaintainability(solution, approach) {
    // Placeholder: would analyze code maintainability
    return 0.75; // Default maintainability score
  }

  evaluateCompleteness(solution, problem) {
    // Placeholder: would check if solution addresses all requirements
    return 0.85; // Default completeness score
  }

  evaluateRobustness(solution, problem) {
    // Placeholder: would analyze error handling and edge cases
    return 0.7; // Default robustness score
  }

  /**
   * Group skills by parallel execution capability
   */
  groupSkillsByParallel(skills) {
    const groups = [];
    let currentGroup = [];
    
    for (const skill of skills) {
      if (skill.parallel) {
        currentGroup.push(skill);
      } else {
        if (currentGroup.length > 0) {
          groups.push([...currentGroup]);
          currentGroup = [];
        }
        groups.push([skill]);
      }
    }
    
    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }
    
    return groups;
  }

  /**
   * Execute a single skill
   */
  async executeSkill(skill, context, execution) {
    console.log(`[skill-composition] Executing skill: ${skill.name}`);
    
    try {
      // This would integrate with the actual skill execution system
      const result = {
        skill: skill.name,
        phase: skill.phase,
        startTime: new Date().toISOString(),
        success: true,
        result: `Skill ${skill.name} executed successfully`,
        context
      };
      
      result.endTime = new Date().toISOString();
      result.duration = new Date(result.endTime) - new Date(result.startTime);
      
      console.log(`[skill-composition] Skill ${skill.name} completed in ${result.duration}ms`);
      
      return result;
      
    } catch (error) {
      console.error(`[skill-composition] Skill ${skill.name} failed: ${error.message}`);
      
      return {
        skill: skill.name,
        phase: skill.phase,
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        success: false,
        error: error.message,
        context
      };
    }
  }

  /**
   * Determine if composition should abort on phase failure
   */
  shouldAbortOnPhaseFailure(phase, composition) {
    const criticalPhases = ['design', 'security', 'deploy'];
    return criticalPhases.includes(phase);
  }

  /**
   * Create skill composition from user requirements
   */
  createCompositionFromRequirements(requirements) {
    const composition = {
      name: requirements.name || 'Custom Workflow',
      description: requirements.description || 'Custom skill composition',
      skills: [],
      phases: [],
      dependencies: new Map(),
      id: `custom-${Date.now()}`,
      created: new Date().toISOString(),
      status: 'created'
    };
    
    // Analyze requirements and suggest skills
    const suggestedSkills = this.analyzeRequirements(requirements);
    composition.skills = suggestedSkills;
    
    // Create phases based on skill dependencies
    composition.phases = this.createPhasesFromSkills(suggestedSkills);
    
    return composition;
  }

  /**
   * Analyze requirements and suggest appropriate skills
   */
  analyzeRequirements(requirements) {
    const skills = [];
    const context = requirements.context || '';
    const goals = requirements.goals || [];
    
    // Map requirements to skills
    for (const goal of goals) {
      const goalSkills = this.mapGoalToSkills(goal, context);
      skills.push(...goalSkills);
    }
    
    // Remove duplicates
    const uniqueSkills = this.removeDuplicateSkills(skills);
    
    return uniqueSkills;
  }

  /**
   * Map goals to appropriate skills
   */
  mapGoalToSkills(goal, context) {
    const goalMappings = {
      'seo': ['seo-optimizer', 'keyword-researcher', 'content-analyzer'],
      'security': ['security-audit', 'vulnerability-scanner', 'authentication-checker'],
      'performance': ['performance-optimizer', 'query-optimizer', 'speed-analyzer'],
      'testing': ['test-generator', 'coverage-analyzer', 'quality-checker'],
      'deployment': ['deployment-optimizer', 'production-readiness', 'release-manager']
    };
    
    const goalText = goal.toLowerCase();
    const skills = [];
    
    for (const [keyword, skillList] of Object.entries(goalMappings)) {
      if (goalText.includes(keyword)) {
        skills.push(...skillList.map(name => ({ name, phase: 'auto', parallel: false })));
      }
    }
    
    return skills;
  }

  /**
   * Remove duplicate skills
   */
  removeDuplicateSkills(skills) {
    const seen = new Set();
    return skills.filter(skill => {
      if (seen.has(skill.name)) {
        return false;
      }
      seen.add(skill.name);
      return true;
    });
  }

  /**
   * Create phases from skills
   */
  createPhasesFromSkills(skills) {
    const phases = ['analyze', 'design', 'implement', 'test', 'optimize', 'deploy'];
    return phases.filter(phase => 
      skills.some(skill => skill.phase === phase)
    );
  }

  /**
   * Generate composition report
   */
  generateCompositionReport(execution) {
    const report = {
      compositionId: execution.compositionId,
      name: execution.composition?.name || 'Unknown',
      status: execution.status,
      startTime: execution.startTime,
      endTime: execution.endTime,
      duration: execution.endTime ? 
        new Date(execution.endTime) - new Date(execution.startTime) : null,
      phases: Array.from(execution.results.entries()).map(([phase, results]) => ({
        phase,
        skillCount: results.length,
        successCount: results.filter(r => r.success).length,
        errorCount: results.filter(r => !r.success).length,
        results
      })),
      totalSkills: Array.from(execution.results.values()).flat().length,
      successfulSkills: Array.from(execution.results.values()).flat().filter(r => r.success).length,
      failedSkills: Array.from(execution.results.values()).flat().filter(r => !r.success).length,
      successRate: execution.results.size > 0 ? 
        Array.from(execution.results.values()).flat().filter(r => r.success).length / 
        Array.from(execution.results.values()).flat().length : 0
    };
    
    return report;
  }

  /**
   * Learn from composition execution
   */
  learnFromComposition(execution) {
    const learning = {
      timestamp: new Date().toISOString(),
      compositionId: execution.compositionId,
      successRate: execution.results.size > 0 ? 
        Array.from(execution.results.values()).flat().filter(r => r.success).length / 
        Array.from(execution.results.values()).flat().length : 0,
      phasePerformance: Array.from(execution.results.entries()).map(([phase, results]) => ({
        phase,
        successRate: results.filter(r => r.success).length / results.length,
        averageDuration: results.reduce((sum, r) => sum + (r.duration || 0), 0) / results.length
      })),
      errors: Array.from(execution.errors.entries()).map(([phase, errors]) => ({
        phase,
        errorCount: errors.length,
        errorTypes: [...new Set(errors.map(e => e.error))]
      }))
    };
    
    console.log(`[skill-composition] Learning captured: ${Math.round(learning.successRate * 100)}% success rate`);
    
    return learning;
  }
}

module.exports = SkillCompositionSystem;
