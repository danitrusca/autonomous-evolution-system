/**
 * Ecology Health Monitor
 * Monitors skill ecology health to prevent sprawl and maintain quality
 */

class EcologyHealthMonitor {
  constructor() {
    this.healthThresholds = {
      minQualityScore: 70,
      maxSkillCount: 100,
      minUtilizationRate: 0.1,
      maxConflictCount: 5,
      maxOverlapCount: 10
    };
    
    this.healthMetrics = {
      skillCount: 0,
      averageQuality: 0,
      utilizationRate: 0,
      conflictCount: 0,
      overlapCount: 0,
      coherenceScore: 0
    };
  }

  /**
   * Monitor ecology health
   * Invariant: Ecology maintains high quality and coherence
   */
  monitorEcologyHealth(skills) {
    console.log('[ecology-monitor] Monitoring ecology health');
    
    try {
      // Analyze current ecology
      const analysis = this.analyzeEcology(skills);
      
      // Calculate health metrics
      const metrics = this.calculateHealthMetrics(analysis);
      
      // Check for sprawl
      const sprawlCheck = this.checkForSprawl(metrics);
      
      // Assess quality
      const qualityCheck = this.assessQuality(metrics);
      
      // Generate recommendations
      const recommendations = this.generateRecommendations(metrics, sprawlCheck, qualityCheck);
      
      // Log health status
      this.logHealthStatus(metrics, recommendations);
      
      return {
        healthy: this.isEcologyHealthy(metrics),
        metrics,
        recommendations,
        analysis
      };
      
    } catch (error) {
      console.error('[ecology-monitor] Error monitoring ecology:', error.message);
      return { healthy: false, error: error.message };
    }
  }

  /**
   * Analyze current ecology
   * Invariant: Analysis provides comprehensive ecology overview
   */
  analyzeEcology(skills) {
    console.log('[ecology-monitor] Analyzing ecology');
    
    const analysis = {
      totalSkills: skills.length,
      categories: {},
      qualityDistribution: {},
      utilizationDistribution: {},
      conflicts: [],
      overlaps: []
    };
    
    // Analyze by category
    skills.forEach(skill => {
      const category = skill.category || 'uncategorized';
      if (!analysis.categories[category]) {
        analysis.categories[category] = [];
      }
      analysis.categories[category].push(skill);
    });
    
    // Analyze quality distribution
    const qualityScores = skills.map(skill => skill.qualityScore || 0);
    analysis.qualityDistribution = this.calculateDistribution(qualityScores);
    
    // Analyze utilization
    const utilizationRates = skills.map(skill => skill.utilizationRate || 0);
    analysis.utilizationDistribution = this.calculateDistribution(utilizationRates);
    
    // Detect conflicts
    analysis.conflicts = this.detectConflicts(skills);
    
    // Detect overlaps
    analysis.overlaps = this.detectOverlaps(skills);
    
    return analysis;
  }

  /**
   * Calculate health metrics
   * Invariant: Metrics reflect ecology health accurately
   */
  calculateHealthMetrics(analysis) {
    console.log('[ecology-monitor] Calculating health metrics');
    
    const metrics = {
      skillCount: analysis.totalSkills,
      averageQuality: this.calculateAverageQuality(analysis),
      utilizationRate: this.calculateAverageUtilization(analysis),
      conflictCount: analysis.conflicts.length,
      overlapCount: analysis.overlaps.length,
      coherenceScore: this.calculateCoherenceScore(analysis)
    };
    
    return metrics;
  }

  /**
   * Check for skill sprawl
   * Invariant: Sprawl detection prevents ecology degradation
   */
  checkForSprawl(metrics) {
    console.log('[ecology-monitor] Checking for sprawl');
    
    const sprawl = {
      detected: false,
      issues: [],
      severity: 'low'
    };
    
    // Check skill count
    if (metrics.skillCount > this.healthThresholds.maxSkillCount) {
      sprawl.detected = true;
      sprawl.issues.push(`Too many skills: ${metrics.skillCount} > ${this.healthThresholds.maxSkillCount}`);
      sprawl.severity = 'high';
    }
    
    // Check quality
    if (metrics.averageQuality < this.healthThresholds.minQualityScore) {
      sprawl.detected = true;
      sprawl.issues.push(`Low average quality: ${metrics.averageQuality} < ${this.healthThresholds.minQualityScore}`);
      sprawl.severity = 'high';
    }
    
    // Check conflicts
    if (metrics.conflictCount > this.healthThresholds.maxConflictCount) {
      sprawl.detected = true;
      sprawl.issues.push(`Too many conflicts: ${metrics.conflictCount} > ${this.healthThresholds.maxConflictCount}`);
      sprawl.severity = 'medium';
    }
    
    // Check overlaps
    if (metrics.overlapCount > this.healthThresholds.maxOverlapCount) {
      sprawl.detected = true;
      sprawl.issues.push(`Too many overlaps: ${metrics.overlapCount} > ${this.healthThresholds.maxOverlapCount}`);
      sprawl.severity = 'medium';
    }
    
    return sprawl;
  }

  /**
   * Assess quality
   * Invariant: Quality assessment ensures high standards
   */
  assessQuality(metrics) {
    console.log('[ecology-monitor] Assessing quality');
    
    const quality = {
      score: metrics.averageQuality,
      status: 'good',
      issues: []
    };
    
    if (metrics.averageQuality >= 90) {
      quality.status = 'excellent';
    } else if (metrics.averageQuality >= 80) {
      quality.status = 'good';
    } else if (metrics.averageQuality >= 70) {
      quality.status = 'fair';
    } else {
      quality.status = 'poor';
      quality.issues.push('Quality below acceptable threshold');
    }
    
    return quality;
  }

  /**
   * Generate recommendations
   * Invariant: Recommendations improve ecology health
   */
  generateRecommendations(metrics, sprawlCheck, qualityCheck) {
    console.log('[ecology-monitor] Generating recommendations');
    
    const recommendations = [];
    
    // Sprawl recommendations
    if (sprawlCheck.detected) {
      if (sprawlCheck.severity === 'high') {
        recommendations.push('CRITICAL: Implement immediate sprawl prevention measures');
      } else if (sprawlCheck.severity === 'medium') {
        recommendations.push('WARNING: Monitor sprawl and implement prevention measures');
      }
      
      sprawlCheck.issues.forEach(issue => {
        recommendations.push(`Address: ${issue}`);
      });
    }
    
    // Quality recommendations
    if (qualityCheck.status === 'poor') {
      recommendations.push('CRITICAL: Improve skill quality immediately');
    } else if (qualityCheck.status === 'fair') {
      recommendations.push('WARNING: Skill quality needs improvement');
    }
    
    // General recommendations
    if (metrics.skillCount > 50) {
      recommendations.push('Consider skill consolidation to reduce complexity');
    }
    
    if (metrics.conflictCount > 0) {
      recommendations.push('Resolve skill conflicts to improve coherence');
    }
    
    if (metrics.overlapCount > 5) {
      recommendations.push('Review skill overlaps and consider consolidation');
    }
    
    return recommendations;
  }

  /**
   * Check if ecology is healthy
   * Invariant: Health check ensures ecology quality
   */
  isEcologyHealthy(metrics) {
    return (
      metrics.skillCount <= this.healthThresholds.maxSkillCount &&
      metrics.averageQuality >= this.healthThresholds.minQualityScore &&
      metrics.conflictCount <= this.healthThresholds.maxConflictCount &&
      metrics.overlapCount <= this.healthThresholds.maxOverlapCount
    );
  }

  /**
   * Calculate average quality
   * Invariant: Quality calculation is accurate
   */
  calculateAverageQuality(analysis) {
    const qualityScores = analysis.qualityDistribution.values || [0];
    return qualityScores.reduce((sum, score) => sum + score, 0) / qualityScores.length;
  }

  /**
   * Calculate average utilization
   * Invariant: Utilization calculation is accurate
   */
  calculateAverageUtilization(analysis) {
    const utilizationRates = analysis.utilizationDistribution.values || [0];
    return utilizationRates.reduce((sum, rate) => sum + rate, 0) / utilizationRates.length;
  }

  /**
   * Calculate coherence score
   * Invariant: Coherence reflects system integration
   */
  calculateCoherenceScore(analysis) {
    let score = 100;
    
    // Deduct for conflicts
    score -= analysis.conflicts.length * 10;
    
    // Deduct for overlaps
    score -= analysis.overlaps.length * 5;
    
    // Deduct for category imbalance
    const categoryCount = Object.keys(analysis.categories).length;
    if (categoryCount > 10) {
      score -= 20; // Too many categories
    }
    
    return Math.max(0, score);
  }

  /**
   * Detect skill conflicts
   * Invariant: Conflict detection prevents system issues
   */
  detectConflicts(skills) {
    const conflicts = [];
    
    for (let i = 0; i < skills.length; i++) {
      for (let j = i + 1; j < skills.length; j++) {
        const skill1 = skills[i];
        const skill2 = skills[j];
        
        // Check for naming conflicts
        if (skill1.name === skill2.name) {
          conflicts.push({
            type: 'naming',
            skills: [skill1.name, skill2.name],
            severity: 'high'
          });
        }
        
        // Check for functional conflicts
        if (this.hasFunctionalConflict(skill1, skill2)) {
          conflicts.push({
            type: 'functional',
            skills: [skill1.name, skill2.name],
            severity: 'medium'
          });
        }
      }
    }
    
    return conflicts;
  }

  /**
   * Detect skill overlaps
   * Invariant: Overlap detection prevents redundancy
   */
  detectOverlaps(skills) {
    const overlaps = [];
    
    for (let i = 0; i < skills.length; i++) {
      for (let j = i + 1; j < skills.length; j++) {
        const skill1 = skills[i];
        const skill2 = skills[j];
        
        // Check for description overlap
        if (this.hasDescriptionOverlap(skill1, skill2)) {
          overlaps.push({
            type: 'description',
            skills: [skill1.name, skill2.name],
            severity: 'low'
          });
        }
        
        // Check for purpose overlap
        if (this.hasPurposeOverlap(skill1, skill2)) {
          overlaps.push({
            type: 'purpose',
            skills: [skill1.name, skill2.name],
            severity: 'medium'
          });
        }
      }
    }
    
    return overlaps;
  }

  /**
   * Check for functional conflict
   * Invariant: Conflict detection is accurate
   */
  hasFunctionalConflict(skill1, skill2) {
    // Check if skills have conflicting purposes
    const conflictingPurposes = [
      ['create', 'destroy'],
      ['add', 'remove'],
      ['enable', 'disable'],
      ['start', 'stop']
    ];
    
    return conflictingPurposes.some(([p1, p2]) => 
      skill1.description.includes(p1) && skill2.description.includes(p2)
    );
  }

  /**
   * Check for description overlap
   * Invariant: Overlap detection is accurate
   */
  hasDescriptionOverlap(skill1, skill2) {
    const words1 = skill1.description.toLowerCase().split(/\s+/);
    const words2 = skill2.description.toLowerCase().split(/\s+/);
    
    const commonWords = words1.filter(word => words2.includes(word));
    const overlapRatio = commonWords.length / Math.min(words1.length, words2.length);
    
    return overlapRatio > 0.5;
  }

  /**
   * Check for purpose overlap
   * Invariant: Purpose overlap detection is accurate
   */
  hasPurposeOverlap(skill1, skill2) {
    const purposeWords = ['analyze', 'optimize', 'debug', 'test', 'validate'];
    
    const skill1Purposes = purposeWords.filter(word => 
      skill1.description.toLowerCase().includes(word)
    );
    
    const skill2Purposes = purposeWords.filter(word => 
      skill2.description.toLowerCase().includes(word)
    );
    
    const commonPurposes = skill1Purposes.filter(purpose => 
      skill2Purposes.includes(purpose)
    );
    
    return commonPurposes.length > 0;
  }

  /**
   * Calculate distribution
   * Invariant: Distribution calculation is accurate
   */
  calculateDistribution(values) {
    if (values.length === 0) return { values: [], mean: 0, std: 0 };
    
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    const std = Math.sqrt(variance);
    
    return { values, mean, std };
  }

  /**
   * Log health status
   * Invariant: Health status is logged clearly
   */
  logHealthStatus(metrics, recommendations) {
    console.log('[ecology-monitor] Ecology Health Status:');
    console.log(`  Skill Count: ${metrics.skillCount}`);
    console.log(`  Average Quality: ${metrics.averageQuality.toFixed(1)}`);
    console.log(`  Utilization Rate: ${metrics.utilizationRate.toFixed(2)}`);
    console.log(`  Conflicts: ${metrics.conflictCount}`);
    console.log(`  Overlaps: ${metrics.overlapCount}`);
    console.log(`  Coherence Score: ${metrics.coherenceScore}`);
    
    if (recommendations.length > 0) {
      console.log('  Recommendations:');
      recommendations.forEach(rec => console.log(`    - ${rec}`));
    }
  }
}

module.exports = EcologyHealthMonitor;
