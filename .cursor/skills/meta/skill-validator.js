/**
 * Skill Validator
 * Validates generated skills against quality gates to prevent skill sprawl
 */

class SkillValidator {
  constructor() {
    this.qualityGates = {
      purposeClarity: true,
      successTest: true,
      rollback: true,
      memento: true,
      ecologyHealth: true
    };
    
    this.validationRules = {
      minDescriptionLength: 20,
      maxDescriptionLength: 200,
      requiredSections: ['Purpose', 'Success Criteria', 'Rollback', 'Observability'],
      maxSkillNameLength: 50,
      minWorkflowSteps: 2,
      maxWorkflowSteps: 10
    };
  }

  /**
   * Validate skill against quality gates
   * Invariant: All skills must pass validation before deployment
   */
  validateSkill(skill) {
    console.log(`[skill-validator] Validating skill: ${skill.name}`);
    
    const validation = {
      valid: true,
      errors: [],
      warnings: [],
      score: 0,
      gates: {}
    };
    
    // Run all validation gates
    validation.gates.purposeClarity = this.validatePurposeClarity(skill);
    validation.gates.successTest = this.validateSuccessTest(skill);
    validation.gates.rollback = this.validateRollback(skill);
    validation.gates.memento = this.validateMemento(skill);
    validation.gates.ecologyHealth = this.validateEcologyHealth(skill);
    
    // Calculate overall validation score
    validation.score = this.calculateValidationScore(validation.gates);
    
    // Determine if skill passes validation
    validation.valid = this.determineValidationResult(validation);
    
    // Log validation results
    this.logValidationResults(skill.name, validation);
    
    return validation;
  }

  /**
   * Validate purpose clarity
   * Invariant: Skill must have clear, specific purpose
   */
  validatePurposeClarity(skill) {
    console.log(`[skill-validator] Validating purpose clarity: ${skill.name}`);
    
    const validation = {
      passed: true,
      errors: [],
      score: 0
    };
    
    // Check description length
    if (!skill.description || skill.description.length < this.validationRules.minDescriptionLength) {
      validation.passed = false;
      validation.errors.push(`Description too short (minimum ${this.validationRules.minDescriptionLength} characters)`);
    }
    
    if (skill.description && skill.description.length > this.validationRules.maxDescriptionLength) {
      validation.warnings.push(`Description too long (maximum ${this.validationRules.maxDescriptionLength} characters)`);
    }
    
    // Check for action words
    const actionWords = ['create', 'generate', 'analyze', 'optimize', 'debug', 'test', 'validate', 'execute'];
    const hasActionWord = actionWords.some(word => skill.description.toLowerCase().includes(word));
    
    if (!hasActionWord) {
      validation.errors.push('Description should include action words (create, generate, analyze, etc.)');
      validation.passed = false;
    }
    
    // Check for specificity
    const vagueWords = ['thing', 'stuff', 'something', 'anything', 'everything'];
    const hasVagueWords = vagueWords.some(word => skill.description.toLowerCase().includes(word));
    
    if (hasVagueWords) {
      validation.errors.push('Description should be specific, avoid vague words');
      validation.passed = false;
    }
    
    // Calculate score
    validation.score = this.calculateGateScore(validation);
    
    return validation;
  }

  /**
   * Validate success test
   * Invariant: Skill must have observable, measurable success criteria
   */
  validateSuccessTest(skill) {
    console.log(`[skill-validator] Validating success test: ${skill.name}`);
    
    const validation = {
      passed: true,
      errors: [],
      score: 0
    };
    
    // Check for success criteria section
    if (!skill.body || !skill.body.includes('## Success Criteria')) {
      validation.passed = false;
      validation.errors.push('Missing Success Criteria section');
    }
    
    // Check for observable language
    const observableWords = ['when', 'then', 'visible', 'observable', 'measurable', 'testable'];
    const hasObservableLanguage = observableWords.some(word => 
      skill.body && skill.body.toLowerCase().includes(word)
    );
    
    if (!hasObservableLanguage) {
      validation.errors.push('Success criteria should use observable language (when, then, visible, etc.)');
      validation.passed = false;
    }
    
    // Check for specific metrics
    const metricWords = ['time', 'count', 'percentage', 'rate', 'speed', 'accuracy'];
    const hasMetrics = metricWords.some(word => 
      skill.body && skill.body.toLowerCase().includes(word)
    );
    
    if (!hasMetrics) {
      validation.warnings.push('Consider adding specific metrics to success criteria');
    }
    
    // Calculate score
    validation.score = this.calculateGateScore(validation);
    
    return validation;
  }

  /**
   * Validate rollback strategy
   * Invariant: Skill must have clear, feasible rollback strategy
   */
  validateRollback(skill) {
    console.log(`[skill-validator] Validating rollback: ${skill.name}`);
    
    const validation = {
      passed: true,
      errors: [],
      score: 0
    };
    
    // Check for rollback section
    if (!skill.body || !skill.body.includes('## Rollback')) {
      validation.passed = false;
      validation.errors.push('Missing Rollback section');
    }
    
    // Check for specific rollback steps
    const rollbackWords = ['revert', 'undo', 'restore', 'rollback', 'backup', 'previous'];
    const hasRollbackWords = rollbackWords.some(word => 
      skill.body && skill.body.toLowerCase().includes(word)
    );
    
    if (!hasRollbackWords) {
      validation.errors.push('Rollback strategy should include specific steps (revert, undo, restore, etc.)');
      validation.passed = false;
    }
    
    // Check for feasibility
    const feasibilityWords = ['if', 'when', 'then', 'step', 'process'];
    const hasFeasibility = feasibilityWords.some(word => 
      skill.body && skill.body.toLowerCase().includes(word)
    );
    
    if (!hasFeasibility) {
      validation.warnings.push('Rollback strategy should be more specific and actionable');
    }
    
    // Calculate score
    validation.score = this.calculateGateScore(validation);
    
    return validation;
  }

  /**
   * Validate memento (embodied reminder)
   * Invariant: Skill must have memorable, actionable reminder
   */
  validateMemento(skill) {
    console.log(`[skill-validator] Validating memento: ${skill.name}`);
    
    const validation = {
      passed: true,
      errors: [],
      score: 0
    };
    
    // Check for memento in skill body
    const mementoPatterns = [
      /memento/i,
      /reminder/i,
      /cue/i,
      /trigger/i,
      /gesture/i,
      /breath/i,
      /posture/i
    ];
    
    const hasMemento = mementoPatterns.some(pattern => 
      skill.body && pattern.test(skill.body)
    );
    
    if (!hasMemento) {
      validation.errors.push('Skill should include a memento (embodied reminder) for state re-entry');
      validation.passed = false;
    }
    
    // Check for embodied language
    const embodiedWords = ['breathe', 'pause', 'feel', 'sense', 'ground', 'center'];
    const hasEmbodiedLanguage = embodiedWords.some(word => 
      skill.body && skill.body.toLowerCase().includes(word)
    );
    
    if (!hasEmbodiedLanguage) {
      validation.warnings.push('Consider adding embodied language to memento');
    }
    
    // Check for conciseness
    const mementoSection = skill.body ? skill.body.match(/## Memento[\s\S]*?(?=##|\Z)/i) : null;
    if (mementoSection && mementoSection[0].length > 200) {
      validation.warnings.push('Memento should be concise and memorable');
    }
    
    // Calculate score
    validation.score = this.calculateGateScore(validation);
    
    return validation;
  }

  /**
   * Validate ecology health
   * Invariant: Skill must integrate well with existing skill ecology
   */
  validateEcologyHealth(skill) {
    console.log(`[skill-validator] Validating ecology health: ${skill.name}`);
    
    const validation = {
      passed: true,
      errors: [],
      score: 0
    };
    
    // Check for naming conflicts
    if (this.checkNamingConflicts(skill.name)) {
      validation.errors.push('Skill name conflicts with existing skill');
      validation.passed = false;
    }
    
    // Check for skill overlap
    if (this.checkSkillOverlap(skill)) {
      validation.warnings.push('Skill may overlap with existing skills');
    }
    
    // Check for proper categorization
    if (!this.validateCategory(skill.category)) {
      validation.errors.push('Invalid or inappropriate category');
      validation.passed = false;
    }
    
    // Check for dependency validity
    if (!this.validateDependencies(skill.dependencies)) {
      validation.errors.push('Invalid or missing dependencies');
      validation.passed = false;
    }
    
    // Calculate score
    validation.score = this.calculateGateScore(validation);
    
    return validation;
  }

  /**
   * Calculate validation score
   * Invariant: Score reflects overall skill quality
   */
  calculateValidationScore(gates) {
    const scores = Object.values(gates).map(gate => gate.score);
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    const maxScore = scores.length * 100;
    
    return Math.round((totalScore / maxScore) * 100);
  }

  /**
   * Determine if skill passes validation
   * Invariant: Only high-quality skills pass validation
   */
  determineValidationResult(validation) {
    // All gates must pass
    const allGatesPassed = Object.values(validation.gates).every(gate => gate.passed);
    
    // Minimum score threshold
    const minScore = 70;
    const scorePassed = validation.score >= minScore;
    
    // No critical errors
    const noCriticalErrors = validation.errors.length === 0;
    
    return allGatesPassed && scorePassed && noCriticalErrors;
  }

  /**
   * Calculate gate score
   * Invariant: Score reflects gate quality
   */
  calculateGateScore(gate) {
    let score = 100;
    
    // Deduct for errors
    score -= gate.errors.length * 20;
    
    // Deduct for warnings
    score -= gate.warnings.length * 5;
    
    return Math.max(0, score);
  }

  /**
   * Check for naming conflicts
   * Invariant: No duplicate skill names allowed
   */
  checkNamingConflicts(skillName) {
    // This would check against existing skills
    // For now, return false (no conflicts)
    return false;
  }

  /**
   * Check for skill overlap
   * Invariant: Skills should have unique purposes
   */
  checkSkillOverlap(skill) {
    // This would check against existing skills
    // For now, return false (no overlap)
    return false;
  }

  /**
   * Validate category
   * Invariant: Category must be valid and appropriate
   */
  validateCategory(category) {
    const validCategories = ['core', 'builder', 'reflection', 'meta', 'autonomous', 'custom'];
    return validCategories.includes(category);
  }

  /**
   * Validate dependencies
   * Invariant: Dependencies must be valid and available
   */
  validateDependencies(dependencies) {
    if (!Array.isArray(dependencies)) {
      return false;
    }
    
    // Check if dependencies are valid
    const validDependencies = ['ecp-protocol', 'learning-log-writer', 'skill-evolution', 'autonomous-skill-learner'];
    return dependencies.every(dep => validDependencies.includes(dep));
  }

  /**
   * Log validation results
   * Invariant: All validation results are logged
   */
  logValidationResults(skillName, validation) {
    console.log(`[skill-validator] Validation results for ${skillName}:`);
    console.log(`  Score: ${validation.score}/100`);
    console.log(`  Valid: ${validation.valid ? 'Yes' : 'No'}`);
    
    if (validation.errors.length > 0) {
      console.log(`  Errors: ${validation.errors.length}`);
      validation.errors.forEach(error => console.log(`    - ${error}`));
    }
    
    if (validation.warnings.length > 0) {
      console.log(`  Warnings: ${validation.warnings.length}`);
      validation.warnings.forEach(warning => console.log(`    - ${warning}`));
    }
  }

  /**
   * Get validation report
   * Invariant: Report includes all validation details
   */
  getValidationReport(skill) {
    const validation = this.validateSkill(skill);
    
    return {
      skillName: skill.name,
      valid: validation.valid,
      score: validation.score,
      gates: validation.gates,
      errors: validation.errors,
      warnings: validation.warnings,
      recommendations: this.generateRecommendations(validation)
    };
  }

  /**
   * Generate improvement recommendations
   * Invariant: Recommendations help improve skill quality
   */
  generateRecommendations(validation) {
    const recommendations = [];
    
    if (!validation.gates.purposeClarity.passed) {
      recommendations.push('Improve purpose clarity with specific, actionable description');
    }
    
    if (!validation.gates.successTest.passed) {
      recommendations.push('Add observable, measurable success criteria');
    }
    
    if (!validation.gates.rollback.passed) {
      recommendations.push('Define clear, feasible rollback strategy');
    }
    
    if (!validation.gates.memento.passed) {
      recommendations.push('Add memorable, embodied reminder for state re-entry');
    }
    
    if (!validation.gates.ecologyHealth.passed) {
      recommendations.push('Ensure skill integrates well with existing ecology');
    }
    
    return recommendations;
  }
}

module.exports = SkillValidator;
