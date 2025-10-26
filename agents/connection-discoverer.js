/**
 * Technical-Psychological Connection Discoverer
 * Discovers patterns connecting technical errors to psychological root causes
 * Invariant: All connections are explainable and based on evidence
 */

class ConnectionDiscoverer {
  constructor() {
    this.connectionDatabase = new Map();
    this.patternHistory = [];
    this.learningThreshold = 3; // Minimum occurrences to establish pattern
    this.confidenceThreshold = 0.7; // Minimum confidence for pattern acceptance
    
    // Initialize connection patterns
    this.initializeConnectionPatterns();
  }

  /**
   * Initialize known connection patterns
   */
  initializeConnectionPatterns() {
    // Confirmation Bias → Technical Errors
    this.connectionDatabase.set('confirmation_bias_technical', {
      psychological: 'confirmation_bias',
      technical: 'ignoring_error_messages',
      description: 'Confirmation bias leads to ignoring error messages that contradict assumptions',
      evidence: [],
      confidence: 0.0,
      occurrences: 0,
      prevention: 'Explicitly seek disconfirming evidence in error messages'
    });

    this.connectionDatabase.set('confirmation_bias_validation', {
      psychological: 'confirmation_bias',
      technical: 'skipping_validation_steps',
      description: 'Confirmation bias leads to skipping validation steps',
      evidence: [],
      confidence: 0.0,
      occurrences: 0,
      prevention: 'Mandatory validation checkpoints'
    });

    // Anchoring Bias → Technical Errors
    this.connectionDatabase.set('anchoring_bias_approach', {
      psychological: 'anchoring_bias',
      technical: 'sticking_to_initial_approach',
      description: 'Anchoring bias leads to sticking to initial approach even when it fails',
      evidence: [],
      confidence: 0.0,
      occurrences: 0,
      prevention: 'Consider multiple approaches explicitly'
    });

    this.connectionDatabase.set('anchoring_bias_alternatives', {
      psychological: 'anchoring_bias',
      technical: 'not_considering_alternatives',
      description: 'Anchoring bias leads to not considering alternative solutions',
      evidence: [],
      confidence: 0.0,
      occurrences: 0,
      prevention: 'Structured alternative evaluation process'
    });

    // Rush to Solution → Technical Errors
    this.connectionDatabase.set('rush_to_solution_analysis', {
      psychological: 'rush_to_solution',
      technical: 'skipping_error_analysis',
      description: 'Rush to solution leads to skipping proper error analysis',
      evidence: [],
      confidence: 0.0,
      occurrences: 0,
      prevention: 'Mandatory analysis phase before action'
    });

    this.connectionDatabase.set('rush_to_solution_understanding', {
      psychological: 'rush_to_solution',
      technical: 'not_reading_full_error_messages',
      description: 'Rush to solution leads to not reading full error messages',
      evidence: [],
      confidence: 0.0,
      occurrences: 0,
      prevention: 'Structured error message reading protocol'
    });

    // Overconfidence → Technical Errors
    this.connectionDatabase.set('overconfidence_testing', {
      psychological: 'overconfidence',
      technical: 'not_testing_edge_cases',
      description: 'Overconfidence leads to not testing edge cases',
      evidence: [],
      confidence: 0.0,
      occurrences: 0,
      prevention: 'Mandatory edge case testing requirements'
    });

    this.connectionDatabase.set('overconfidence_assumptions', {
      psychological: 'overconfidence',
      technical: 'assuming_code_correctness',
      description: 'Overconfidence leads to assuming code correctness without verification',
      evidence: [],
      confidence: 0.0,
      occurrences: 0,
      prevention: 'Explicit assumption validation process'
    });

    // Context Switching Error → Technical Errors
    this.connectionDatabase.set('context_switching_patterns', {
      psychological: 'context_switching_error',
      technical: 'using_old_patterns_in_new_frameworks',
      description: 'Context switching error leads to using old patterns in new frameworks',
      evidence: [],
      confidence: 0.0,
      occurrences: 0,
      prevention: 'Context-aware pattern validation'
    });

    // Frustration Cascade → Technical Errors
    this.connectionDatabase.set('frustration_cascade_errors', {
      psychological: 'frustration_cascade',
      technical: 'making_more_errors_due_to_emotional_state',
      description: 'Frustration cascade leads to making more errors due to emotional state',
      evidence: [],
      confidence: 0.0,
      occurrences: 0,
      prevention: 'Emotional state monitoring and break requirements'
    });
  }

  /**
   * Discover connections from error analysis
   * Invariant: All connections are based on evidence and explainable
   */
  discoverConnections(errorAnalysis) {
    const connections = [];

    // Check each psychological pattern for technical manifestations
    for (const [patternId, pattern] of this.connectionDatabase) {
      const connection = this.analyzeConnection(errorAnalysis, pattern);
      if (connection) {
        connections.push(connection);
      }
    }

    // Store connections for learning
    this.storeConnections(connections);

    return connections;
  }

  /**
   * Analyze connection between error analysis and pattern
   */
  analyzeConnection(errorAnalysis, pattern) {
    // Check if psychological pattern matches
    const psychologicalMatch = this.checkPsychologicalMatch(errorAnalysis.psychological, pattern.psychological);
    if (!psychologicalMatch) return null;

    // Check if technical manifestation matches
    const technicalMatch = this.checkTechnicalMatch(errorAnalysis.technical, pattern.technical);
    if (!technicalMatch) return null;

    // Calculate connection confidence
    const confidence = this.calculateConnectionConfidence(errorAnalysis, pattern);

    if (confidence < this.confidenceThreshold) return null;

    return {
      patternId: pattern.psychological + '_' + pattern.technical,
      psychological: pattern.psychological,
      technical: pattern.technical,
      description: pattern.description,
      confidence: confidence,
      evidence: this.extractEvidence(errorAnalysis, pattern),
      prevention: pattern.prevention,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Check if psychological pattern matches
   */
  checkPsychologicalMatch(psychological, pattern) {
    if (!psychological || !pattern) return false;

    // Direct match
    if (psychological.biasRisks && psychological.biasRisks.includes(pattern)) return true;
    if (psychological.decisionPatterns && psychological.decisionPatterns.includes(pattern)) return true;
    if (psychological.emotionalState && psychological.emotionalState === pattern) return true;

    // Pattern matching
    const psychologicalString = JSON.stringify(psychological).toLowerCase();
    const patternString = pattern.replace(/_/g, ' ');
    
    return psychologicalString.includes(patternString);
  }

  /**
   * Check if technical manifestation matches
   */
  checkTechnicalMatch(technical, pattern) {
    if (!technical || !pattern) return false;

    // Direct match
    if (technical.errorType && technical.errorType.includes(pattern)) return true;
    if (technical.rootCause && technical.rootCause.includes(pattern)) return true;
    if (technical.patterns && technical.patterns.includes(pattern)) return true;

    // Pattern matching
    const technicalString = JSON.stringify(technical).toLowerCase();
    const patternString = pattern.replace(/_/g, ' ');
    
    return technicalString.includes(patternString);
  }

  /**
   * Calculate connection confidence
   */
  calculateConnectionConfidence(errorAnalysis, pattern) {
    let confidence = 0.5; // Base confidence

    // Psychological factors
    if (errorAnalysis.psychological.biasRisks && errorAnalysis.psychological.biasRisks.includes(pattern.psychological)) {
      confidence += 0.3;
    }

    if (errorAnalysis.psychological.stressIndicators && errorAnalysis.psychological.stressIndicators.length > 0) {
      confidence += 0.1;
    }

    if (errorAnalysis.psychological.emotionalState === 'frustrated' || errorAnalysis.psychological.emotionalState === 'stressed') {
      confidence += 0.1;
    }

    // Technical factors
    if (errorAnalysis.technical.severity === 'high' || errorAnalysis.technical.severity === 'critical') {
      confidence += 0.1;
    }

    if (errorAnalysis.technical.patterns && errorAnalysis.technical.patterns.length > 0) {
      confidence += 0.1;
    }

    // Context factors
    if (errorAnalysis.context && errorAnalysis.context.recentErrors > 1) {
      confidence += 0.1;
    }

    return Math.min(confidence, 1.0);
  }

  /**
   * Extract evidence for connection
   */
  extractEvidence(errorAnalysis, pattern) {
    const evidence = [];

    // Psychological evidence
    if (errorAnalysis.psychological.biasRisks && errorAnalysis.psychological.biasRisks.includes(pattern.psychological)) {
      evidence.push({
        type: 'psychological',
        description: `Bias risk detected: ${pattern.psychological}`,
        confidence: 0.8
      });
    }

    if (errorAnalysis.psychological.emotionalState) {
      evidence.push({
        type: 'emotional',
        description: `Emotional state: ${errorAnalysis.psychological.emotionalState}`,
        confidence: 0.6
      });
    }

    // Technical evidence
    if (errorAnalysis.technical.errorType) {
      evidence.push({
        type: 'technical',
        description: `Error type: ${errorAnalysis.technical.errorType}`,
        confidence: 0.7
      });
    }

    if (errorAnalysis.technical.rootCause) {
      evidence.push({
        type: 'technical',
        description: `Root cause: ${errorAnalysis.technical.rootCause}`,
        confidence: 0.8
      });
    }

    // Context evidence
    if (errorAnalysis.context && errorAnalysis.context.recentErrors > 0) {
      evidence.push({
        type: 'context',
        description: `Recent errors: ${errorAnalysis.context.recentErrors}`,
        confidence: 0.5
      });
    }

    return evidence;
  }

  /**
   * Store connections for learning
   */
  storeConnections(connections) {
    for (const connection of connections) {
      const patternId = connection.patternId;
      
      if (!this.connectionDatabase.has(patternId)) {
        this.connectionDatabase.set(patternId, {
          psychological: connection.psychological,
          technical: connection.technical,
          description: connection.description,
          evidence: [],
          confidence: 0.0,
          occurrences: 0,
          prevention: connection.prevention
        });
      }

      const pattern = this.connectionDatabase.get(patternId);
      pattern.occurrences++;
      pattern.evidence.push(...connection.evidence);
      
      // Update confidence based on occurrences
      pattern.confidence = this.calculatePatternConfidence(pattern);
      
      this.connectionDatabase.set(patternId, pattern);
    }

    // Store in pattern history
    this.patternHistory.push({
      connections: connections,
      timestamp: new Date().toISOString()
    });

    // Keep only last 1000 pattern records
    if (this.patternHistory.length > 1000) {
      this.patternHistory = this.patternHistory.slice(-1000);
    }
  }

  /**
   * Calculate pattern confidence based on occurrences and evidence
   */
  calculatePatternConfidence(pattern) {
    let confidence = 0.5; // Base confidence

    // Increase confidence with occurrences
    if (pattern.occurrences >= this.learningThreshold) {
      confidence += 0.3;
    }

    // Increase confidence with evidence quality
    const highConfidenceEvidence = pattern.evidence.filter(e => e.confidence > 0.7);
    if (highConfidenceEvidence.length > 0) {
      confidence += 0.2;
    }

    return Math.min(confidence, 1.0);
  }

  /**
   * Learn from connection outcomes
   */
  learnFromOutcome(connection, outcome) {
    const patternId = connection.patternId;
    
    if (this.connectionDatabase.has(patternId)) {
      const pattern = this.connectionDatabase.get(patternId);
      
      // Update pattern based on outcome
      if (outcome.success) {
        pattern.confidence = Math.min(pattern.confidence + 0.1, 1.0);
      } else {
        pattern.confidence = Math.max(pattern.confidence - 0.1, 0.0);
      }
      
      this.connectionDatabase.set(patternId, pattern);
    }
  }

  /**
   * Get connection recommendations
   */
  getConnectionRecommendations(errorAnalysis) {
    const connections = this.discoverConnections(errorAnalysis);
    const recommendations = [];

    for (const connection of connections) {
      if (connection.confidence >= this.confidenceThreshold) {
        recommendations.push({
          type: 'connection_prevention',
          priority: 'high',
          description: `Prevent ${connection.description}`,
          psychological: connection.psychological,
          technical: connection.technical,
          prevention: connection.prevention,
          confidence: connection.confidence
        });
      }
    }

    return recommendations;
  }

  /**
   * Get pattern statistics
   */
  getPatternStatistics() {
    const stats = {
      totalPatterns: this.connectionDatabase.size,
      highConfidencePatterns: 0,
      learnedPatterns: 0,
      totalOccurrences: 0,
      averageConfidence: 0
    };

    let totalConfidence = 0;

    for (const [patternId, pattern] of this.connectionDatabase) {
      stats.totalOccurrences += pattern.occurrences;
      totalConfidence += pattern.confidence;

      if (pattern.confidence >= this.confidenceThreshold) {
        stats.highConfidencePatterns++;
      }

      if (pattern.occurrences >= this.learningThreshold) {
        stats.learnedPatterns++;
      }
    }

    if (this.connectionDatabase.size > 0) {
      stats.averageConfidence = totalConfidence / this.connectionDatabase.size;
    }

    return stats;
  }

  /**
   * Get connection insights
   */
  getConnectionInsights() {
    const insights = [];

    // Most common psychological patterns
    const psychologicalCounts = new Map();
    for (const [patternId, pattern] of this.connectionDatabase) {
      const psych = pattern.psychological;
      psychologicalCounts.set(psych, (psychologicalCounts.get(psych) || 0) + pattern.occurrences);
    }

    const topPsychological = Array.from(psychologicalCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    insights.push({
      type: 'most_common_psychological',
      description: 'Most common psychological patterns leading to technical errors',
      patterns: topPsychological.map(([pattern, count]) => ({ pattern, count }))
    });

    // Most common technical manifestations
    const technicalCounts = new Map();
    for (const [patternId, pattern] of this.connectionDatabase) {
      const tech = pattern.technical;
      technicalCounts.set(tech, (technicalCounts.get(tech) || 0) + pattern.occurrences);
    }

    const topTechnical = Array.from(technicalCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    insights.push({
      type: 'most_common_technical',
      description: 'Most common technical manifestations of psychological patterns',
      patterns: topTechnical.map(([pattern, count]) => ({ pattern, count }))
    });

    // High confidence connections
    const highConfidenceConnections = Array.from(this.connectionDatabase.entries())
      .filter(([patternId, pattern]) => pattern.confidence >= this.confidenceThreshold)
      .sort((a, b) => b[1].confidence - a[1].confidence)
      .slice(0, 5);

    insights.push({
      type: 'high_confidence_connections',
      description: 'High confidence technical-psychological connections',
      connections: highConfidenceConnections.map(([patternId, pattern]) => ({
        patternId,
        psychological: pattern.psychological,
        technical: pattern.technical,
        confidence: pattern.confidence,
        occurrences: pattern.occurrences
      }))
    });

    return insights;
  }

  /**
   * Export connection database for analysis
   */
  exportConnectionDatabase() {
    const exportData = {
      timestamp: new Date().toISOString(),
      patterns: Array.from(this.connectionDatabase.entries()).map(([patternId, pattern]) => ({
        patternId,
        psychological: pattern.psychological,
        technical: pattern.technical,
        description: pattern.description,
        confidence: pattern.confidence,
        occurrences: pattern.occurrences,
        evidence: pattern.evidence,
        prevention: pattern.prevention
      })),
      statistics: this.getPatternStatistics(),
      insights: this.getConnectionInsights()
    };

    return exportData;
  }

  /**
   * Get system status
   */
  getStatus() {
    return {
      connectionDatabase: this.connectionDatabase.size,
      patternHistory: this.patternHistory.length,
      learningThreshold: this.learningThreshold,
      confidenceThreshold: this.confidenceThreshold,
      active: true
    };
  }
}

module.exports = ConnectionDiscoverer;
