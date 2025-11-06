/**
 * File Operation Learning Bridge
 * Bridges file operations to learning capture system for automatic lesson extraction
 * 
 * ECP Principles:
 * - Frame: Connect file operations to learning capture automatically
 * - Design: Monitor operations, detect patterns, extract lessons, trigger capture
 * - Plan: Operation detection → Pattern analysis → Lesson extraction → Learning capture
 * - Implement: Automatic integration between file operations and learning system
 * - Review: Validate lessons captured and patterns recognized
 * 
 * Invariants:
 * - All significant file operations trigger learning analysis
 * - Bulk operations (>10 files) automatically captured
 * - Refinement patterns automatically detected
 * - Learning capture maintains system safety
 */

const fs = require('fs');
const path = require('path');

class FileOperationLearningBridge {
  constructor() {
    this.operationHistory = [];
    this.patternDetectors = new Map();
    this.learningSystem = null;
    this.evolutionEngine = null;
    
    // Thresholds
    this.bulkOperationThreshold = 10; // Files
    this.refinementWindow = 300000; // 5 minutes in ms
    
    // Initialize pattern detectors
    this.initializePatternDetectors();
  }

  /**
   * Initialize pattern detectors
   */
  initializePatternDetectors() {
    // Bulk operation detector
    this.patternDetectors.set('bulk_operation', {
      detect: (operations) => this.detectBulkOperation(operations),
      extractLesson: (pattern) => this.extractBulkOperationLesson(pattern)
    });
    
    // Refinement pattern detector
    this.patternDetectors.set('refinement_loop', {
      detect: (operations) => this.detectRefinementPattern(operations),
      extractLesson: (pattern) => this.extractRefinementLesson(pattern)
    });
    
    // Naming pattern detector
    this.patternDetectors.set('naming_quality', {
      detect: (operations) => this.detectNamingPatterns(operations),
      extractLesson: (pattern) => this.extractNamingLesson(pattern)
    });
    
    // Learning opportunity detector
    this.patternDetectors.set('learning_opportunity', {
      detect: (operations) => this.detectLearningOpportunities(operations),
      extractLesson: (pattern) => this.extractLearningOpportunityLesson(pattern)
    });
  }

  /**
   * Set learning system reference
   */
  setLearningSystem(learningSystem) {
    this.learningSystem = learningSystem;
  }

  /**
   * Set evolution engine reference
   */
  setEvolutionEngine(evolutionEngine) {
    this.evolutionEngine = evolutionEngine;
  }

  /**
   * Record file operation
   */
  recordOperation(operation) {
    const record = {
      ...operation,
      timestamp: new Date().toISOString(),
      id: this.generateOperationId()
    };
    
    this.operationHistory.push(record);
    
    // Keep history manageable (last 1000 operations)
    if (this.operationHistory.length > 1000) {
      this.operationHistory = this.operationHistory.slice(-1000);
    }
    
    // Check for patterns and trigger learning
    this.analyzeAndCapture(record);
    
    return record;
  }

  /**
   * Analyze operation and capture lessons
   */
  async analyzeAndCapture(operation) {
    try {
      // Get recent operations for pattern detection
      const recentOperations = this.getRecentOperations(operation.timestamp);
      
      // Detect patterns
      const patterns = this.detectAllPatterns(recentOperations);
      
      // Extract and capture lessons
      for (const pattern of patterns) {
        if (pattern.confidence > 0.7) {
          await this.capturePatternLesson(pattern);
        }
      }
      
      // Check for bulk operation
      if (this.isBulkOperation(recentOperations)) {
        await this.captureBulkOperationLesson(recentOperations);
      }
      
    } catch (error) {
      console.error('[file-operation-learning] Error analyzing operation:', error.message);
    }
  }

  /**
   * Detect all patterns in recent operations
   */
  detectAllPatterns(operations) {
    const patterns = [];
    
    for (const [patternType, detector] of this.patternDetectors) {
      try {
        const detected = detector.detect(operations);
        if (detected) {
          patterns.push({
            type: patternType,
            ...detected,
            confidence: detected.confidence || 0.8
          });
        }
      } catch (error) {
        console.error(`[file-operation-learning] Error detecting ${patternType}:`, error.message);
      }
    }
    
    return patterns;
  }

  /**
   * Detect bulk operation
   */
  detectBulkOperation(operations) {
    const operationGroups = this.groupOperationsByType(operations);
    
    for (const [type, ops] of operationGroups) {
      if (ops.length >= this.bulkOperationThreshold) {
        return {
          type: 'bulk_operation',
          operationType: type,
          count: ops.length,
          files: ops.map(op => op.target || op.source).filter(Boolean),
          confidence: Math.min(ops.length / this.bulkOperationThreshold, 1.0)
        };
      }
    }
    
    return null;
  }

  /**
   * Detect refinement pattern (generate → review → refine)
   */
  detectRefinementPattern(operations) {
    // Look for operations on same files within time window
    const fileGroups = this.groupOperationsByFile(operations);
    
    for (const [file, ops] of fileGroups) {
      if (ops.length >= 2) {
        // Check if operations show refinement (rename → rename, or create → modify)
        const sortedOps = ops.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        
        // Detect refinement: initial operation followed by correction
        if (this.isRefinementSequence(sortedOps)) {
          return {
            type: 'refinement_loop',
            file: file,
            operations: sortedOps,
            initialOperation: sortedOps[0],
            refinedOperation: sortedOps[sortedOps.length - 1],
            refinementCount: sortedOps.length - 1,
            confidence: 0.9
          };
        }
      }
    }
    
    return null;
  }

  /**
   * Check if operation sequence shows refinement
   */
  isRefinementSequence(operations) {
    if (operations.length < 2) return false;
    
    // Pattern: rename → rename (refinement)
    if (operations[0].type === 'rename' && operations[1].type === 'rename') {
      return true;
    }
    
    // Pattern: create → modify (refinement)
    if (operations[0].type === 'create' && operations[1].type === 'modify') {
      return true;
    }
    
    // Pattern: generate → refine (multiple operations on same file)
    if (operations.length >= 2 && operations.every(op => op.type === operations[0].type)) {
      return true;
    }
    
    return false;
  }

  /**
   * Detect naming quality patterns
   */
  detectNamingPatterns(operations) {
    const renameOps = operations.filter(op => op.type === 'rename');
    
    if (renameOps.length === 0) return null;
    
    const patterns = {
      verboseNames: [],
      unclearNames: [],
      goodNames: [],
      refinementNeeded: 0
    };
    
    for (const op of renameOps) {
      const oldName = op.source || '';
      const newName = op.target || '';
      
      // Check for verbose names (>80 chars)
      if (newName.length > 80) {
        patterns.verboseNames.push({ old: oldName, new: newName, length: newName.length });
      }
      
      // Check for unclear patterns (dates, generic terms)
      if (this.isUnclearName(newName)) {
        patterns.unclearNames.push({ old: oldName, new: newName });
      }
      
      // Check for good names (20-60 chars, descriptive)
      if (newName.length >= 20 && newName.length <= 60 && !this.isUnclearName(newName)) {
        patterns.goodNames.push({ old: oldName, new: newName });
      }
      
      // Count refinements
      if (oldName !== newName && oldName.length > 0) {
        patterns.refinementNeeded++;
      }
    }
    
    if (patterns.verboseNames.length > 0 || patterns.unclearNames.length > 0 || patterns.refinementNeeded > 0) {
      return {
        type: 'naming_quality',
        patterns: patterns,
        confidence: 0.85,
        insights: this.extractNamingInsights(patterns)
      };
    }
    
    return null;
  }

  /**
   * Check if name is unclear
   */
  isUnclearName(name) {
    const unclearPatterns = [
      /\d{1,2}_\d{1,2}/, // Date patterns like "10_10"
      /^SUMMARY$/i,
      /^GUIDE$/i,
      /^DOCUMENT$/i,
      /^NOTES$/i
    ];
    
    return unclearPatterns.some(pattern => pattern.test(name));
  }

  /**
   * Extract naming insights
   */
  extractNamingInsights(patterns) {
    const insights = [];
    
    if (patterns.verboseNames.length > 0) {
      insights.push(`Found ${patterns.verboseNames.length} overly verbose names (>80 chars)`);
    }
    
    if (patterns.unclearNames.length > 0) {
      insights.push(`Found ${patterns.unclearNames.length} unclear names (dates, generic terms)`);
    }
    
    if (patterns.refinementNeeded > 0) {
      insights.push(`Refinement needed for ${patterns.refinementNeeded} names`);
    }
    
    if (patterns.goodNames.length > 0) {
      insights.push(`Found ${patterns.goodNames.length} well-named files (20-60 chars, descriptive)`);
    }
    
    return insights;
  }

  /**
   * Detect learning opportunities
   */
  detectLearningOpportunities(operations) {
    const opportunities = [];
    
    // Bulk operation = learning opportunity
    if (operations.length >= this.bulkOperationThreshold) {
      opportunities.push({
        type: 'bulk_operation_learning',
        count: operations.length,
        description: `Bulk operation affecting ${operations.length} files`
      });
    }
    
    // Refinement pattern = learning opportunity
    const refinementPattern = this.detectRefinementPattern(operations);
    if (refinementPattern) {
      opportunities.push({
        type: 'refinement_learning',
        pattern: refinementPattern,
        description: `Refinement pattern detected: ${refinementPattern.refinementCount} refinements`
      });
    }
    
    // Naming patterns = learning opportunity
    const namingPattern = this.detectNamingPatterns(operations);
    if (namingPattern) {
      opportunities.push({
        type: 'naming_learning',
        pattern: namingPattern,
        description: `Naming quality patterns detected`
      });
    }
    
    return opportunities.length > 0 ? {
      type: 'learning_opportunity',
      opportunities: opportunities,
      confidence: 0.9
    } : null;
  }

  /**
   * Capture pattern lesson
   */
  async capturePatternLesson(pattern) {
    try {
      const lesson = this.extractLessonFromPattern(pattern);
      
      if (lesson && this.evolutionEngine) {
        // Use evolution engine's learning capture
        await this.evolutionEngine.captureEvolutionLearning(
          lesson.question || 'File operation pattern detected',
          {
            pattern: pattern,
            lesson: lesson,
            timestamp: new Date().toISOString()
          }
        );
        
        console.log(`[file-operation-learning] Captured lesson: ${lesson.insight}`);
      }
      
      return lesson;
    } catch (error) {
      console.error('[file-operation-learning] Error capturing pattern lesson:', error.message);
      return null;
    }
  }

  /**
   * Extract lesson from pattern
   */
  extractLessonFromPattern(pattern) {
    switch (pattern.type) {
      case 'bulk_operation':
        return this.extractBulkOperationLesson(pattern);
      case 'refinement_loop':
        return this.extractRefinementLesson(pattern);
      case 'naming_quality':
        return this.extractNamingLesson(pattern);
      case 'learning_opportunity':
        return this.extractLearningOpportunityLesson(pattern);
      default:
        return null;
    }
  }

  /**
   * Extract bulk operation lesson
   */
  extractBulkOperationLesson(pattern) {
    return {
      question: `What can we learn from bulk ${pattern.operationType} operation affecting ${pattern.count} files?`,
      insight: `Bulk operations (${pattern.count} files) represent significant system changes that should trigger learning analysis`,
      impact: 'High - bulk operations indicate systematic changes with patterns to learn from',
      learning: [
        `Bulk operations (${pattern.count} files) should automatically trigger learning capture`,
        `Patterns in bulk operations reveal system-wide changes and improvements`,
        `Bulk operation analysis can identify optimization opportunities`
      ],
      pattern: pattern
    };
  }

  /**
   * Extract refinement lesson
   */
  extractRefinementLesson(pattern) {
    return {
      question: `What does the refinement pattern tell us about automated systems?`,
      insight: `Refinement loops (generate → review → refine) are essential for automated systems - first-pass generation often needs refinement`,
      impact: 'High - refinement patterns reveal system improvement opportunities',
      learning: [
        `Automated systems require refinement loops for quality output`,
        `First-pass generation often needs human-guided refinement`,
        `Refinement patterns provide learning data for threshold adjustment`,
        `Optimal balance between automation and refinement improves over time`
      ],
      pattern: pattern
    };
  }

  /**
   * Extract naming lesson
   */
  extractNamingLesson(pattern) {
    const insights = pattern.insights || [];
    
    return {
      question: `What can we learn from naming quality patterns?`,
      insight: `Naming quality analysis reveals optimal thresholds: ${insights.join(', ')}`,
      impact: 'Medium - naming quality affects discoverability and maintainability',
      learning: [
        `Optimal name length: 20-60 characters (balance descriptiveness and readability)`,
        `Refinement needed when names are verbose (>80 chars) or unclear`,
        `Pattern recognition can identify naming quality issues automatically`,
        `Learning from corrections improves future naming generation`
      ],
      pattern: pattern
    };
  }

  /**
   * Extract learning opportunity lesson
   */
  extractLearningOpportunityLesson(pattern) {
    return {
      question: `What learning opportunities were detected in file operations?`,
      insight: `File operations contain learning opportunities: ${pattern.opportunities.map(o => o.description).join(', ')}`,
      impact: 'High - learning opportunities should be automatically captured',
      learning: [
        `File operations should automatically trigger learning analysis`,
        `Bulk operations, refinement patterns, and naming patterns are learning opportunities`,
        `Automatic learning capture from operations enables continuous improvement`,
        `Integration between operations and learning is essential for autonomous evolution`
      ],
      pattern: pattern
    };
  }

  /**
   * Capture bulk operation lesson
   */
  async captureBulkOperationLesson(operations) {
    const pattern = this.detectBulkOperation(operations);
    if (pattern) {
      await this.capturePatternLesson(pattern);
    }
  }

  /**
   * Get recent operations within time window
   */
  getRecentOperations(timestamp, windowMs = this.refinementWindow) {
    const cutoff = new Date(new Date(timestamp).getTime() - windowMs);
    return this.operationHistory.filter(op => new Date(op.timestamp) >= cutoff);
  }

  /**
   * Check if operations represent bulk operation
   */
  isBulkOperation(operations) {
    const grouped = this.groupOperationsByType(operations);
    for (const [type, ops] of grouped) {
      if (ops.length >= this.bulkOperationThreshold) {
        return true;
      }
    }
    return false;
  }

  /**
   * Group operations by type
   */
  groupOperationsByType(operations) {
    const groups = new Map();
    for (const op of operations) {
      const type = op.type || 'unknown';
      if (!groups.has(type)) {
        groups.set(type, []);
      }
      groups.get(type).push(op);
    }
    return groups;
  }

  /**
   * Group operations by file
   */
  groupOperationsByFile(operations) {
    const groups = new Map();
    for (const op of operations) {
      const file = op.target || op.source || op.file || 'unknown';
      if (!groups.has(file)) {
        groups.set(file, []);
      }
      groups.get(file).push(op);
    }
    return groups;
  }

  /**
   * Generate operation ID
   */
  generateOperationId() {
    return `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get operation statistics
   */
  getStatistics() {
    const stats = {
      totalOperations: this.operationHistory.length,
      bulkOperations: 0,
      refinementPatterns: 0,
      namingPatterns: 0,
      learningOpportunities: 0
    };
    
    // Analyze recent operations
    const recentOps = this.getRecentOperations(new Date().toISOString(), 3600000); // Last hour
    
    if (this.isBulkOperation(recentOps)) {
      stats.bulkOperations = 1;
    }
    
    const refinement = this.detectRefinementPattern(recentOps);
    if (refinement) {
      stats.refinementPatterns = 1;
    }
    
    const naming = this.detectNamingPatterns(recentOps);
    if (naming) {
      stats.namingPatterns = 1;
    }
    
    const learning = this.detectLearningOpportunities(recentOps);
    if (learning) {
      stats.learningOpportunities = learning.opportunities.length;
    }
    
    return stats;
  }
}

module.exports = FileOperationLearningBridge;

