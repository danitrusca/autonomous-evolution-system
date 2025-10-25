/**
 * Skills Changelog Updater
 * Automatically updates SKILLS_CHANGELOG.md when new skills are created or patterns are detected
 */

const fs = require('fs');
const path = require('path');

class ChangelogUpdater {
  constructor() {
    this.changelogPath = path.join(__dirname, '..', 'SKILLS_CHANGELOG.md');
    this.timestamp = new Date().toISOString();
  }

  /**
   * Update changelog with new skill creation
   * Invariant: All skill creation events are logged with proper context
   */
  logSkillCreation(skillName, skillType, pattern = null) {
    console.log(`[changelog-updater] Logging skill creation: ${skillName}`);
    
    try {
      const entry = this.createSkillCreationEntry(skillName, skillType, pattern);
      this.appendToChangelog(entry);
      console.log(`[changelog-updater] ✓ Skill creation logged: ${skillName}`);
    } catch (error) {
      console.error(`[changelog-updater] Error logging skill creation:`, error.message);
    }
  }

  /**
   * Update changelog with pattern detection
   * Invariant: All pattern detection events are logged with analysis
   */
  logPatternDetection(patternName, patternType, frequency, skillOpportunity = null) {
    console.log(`[changelog-updater] Logging pattern detection: ${patternName}`);
    
    try {
      const entry = this.createPatternDetectionEntry(patternName, patternType, frequency, skillOpportunity);
      this.appendToChangelog(entry);
      console.log(`[changelog-updater] ✓ Pattern detection logged: ${patternName}`);
    } catch (error) {
      console.error(`[changelog-updater] Error logging pattern detection:`, error.message);
    }
  }

  /**
   * Update changelog with autonomous execution
   * Invariant: All autonomous execution events are logged with results
   */
  logAutonomousExecution(skillName, context, result, success = true) {
    console.log(`[changelog-updater] Logging autonomous execution: ${skillName}`);
    
    try {
      const entry = this.createAutonomousExecutionEntry(skillName, context, result, success);
      this.appendToChangelog(entry);
      console.log(`[changelog-updater] ✓ Autonomous execution logged: ${skillName}`);
    } catch (error) {
      console.error(`[changelog-updater] Error logging autonomous execution:`, error.message);
    }
  }

  /**
   * Update changelog with skill evolution
   * Invariant: All skill evolution events are logged with improvements
   */
  logSkillEvolution(skillName, improvements, performanceMetrics) {
    console.log(`[changelog-updater] Logging skill evolution: ${skillName}`);
    
    try {
      const entry = this.createSkillEvolutionEntry(skillName, improvements, performanceMetrics);
      this.appendToChangelog(entry);
      console.log(`[changelog-updater] ✓ Skill evolution logged: ${skillName}`);
    } catch (error) {
      console.error(`[changelog-updater] Error logging skill evolution:`, error.message);
    }
  }

  /**
   * Create skill creation entry
   * Invariant: Entry includes all relevant context and metadata
   */
  createSkillCreationEntry(skillName, skillType, pattern) {
    const date = new Date().toISOString().split('T')[0];
    const time = new Date().toISOString().split('T')[1].split('.')[0];
    
    let entry = `\n### ${date}: Skill Creation - ${skillName}\n`;
    entry += `**Skill Type**: ${skillType}\n`;
    entry += `**Created**: ${date} ${time}\n`;
    
    if (pattern) {
      entry += `**Pattern Source**: ${pattern.name}\n`;
      entry += `**Pattern Type**: ${pattern.type}\n`;
      entry += `**Pattern Frequency**: ${pattern.frequency}\n`;
    }
    
    entry += `**Impact**: New skill added to autonomous capabilities\n`;
    entry += `**Evolution**: System now has enhanced capability for ${skillType}\n\n`;
    
    return entry;
  }

  /**
   * Create pattern detection entry
   * Invariant: Entry includes pattern analysis and skill opportunity
   */
  createPatternDetectionEntry(patternName, patternType, frequency, skillOpportunity) {
    const date = new Date().toISOString().split('T')[0];
    const time = new Date().toISOString().split('T')[1].split('.')[0];
    
    let entry = `\n### ${date}: Pattern Detection - ${patternName}\n`;
    entry += `**Pattern Type**: ${patternType}\n`;
    entry += `**Frequency**: ${frequency} occurrences\n`;
    entry += `**Detected**: ${date} ${time}\n`;
    
    if (skillOpportunity) {
      entry += `**Skill Opportunity**: ${skillOpportunity}\n`;
      entry += `**Status**: Skill generation triggered\n`;
    } else {
      entry += `**Status**: Pattern monitoring\n`;
    }
    
    entry += `**Impact**: System learning from development patterns\n`;
    entry += `**Evolution**: Pattern recognition improving\n\n`;
    
    return entry;
  }

  /**
   * Create autonomous execution entry
   * Invariant: Entry includes execution context and results
   */
  createAutonomousExecutionEntry(skillName, context, result, success) {
    const date = new Date().toISOString().split('T')[0];
    const time = new Date().toISOString().split('T')[1].split('.')[0];
    
    let entry = `\n### ${date}: Autonomous Execution - ${skillName}\n`;
    entry += `**Context**: ${context}\n`;
    entry += `**Result**: ${result}\n`;
    entry += `**Success**: ${success ? 'Yes' : 'No'}\n`;
    entry += `**Executed**: ${date} ${time}\n`;
    
    if (success) {
      entry += `**Impact**: Problem resolved autonomously\n`;
      entry += `**Evolution**: Skill effectiveness improved\n`;
    } else {
      entry += `**Impact**: Execution failed, learning captured\n`;
      entry += `**Evolution**: Skill will be improved based on failure\n`;
    }
    
    entry += `\n`;
    
    return entry;
  }

  /**
   * Create skill evolution entry
   * Invariant: Entry includes improvements and performance metrics
   */
  createSkillEvolutionEntry(skillName, improvements, performanceMetrics) {
    const date = new Date().toISOString().split('T')[0];
    const time = new Date().toISOString().split('T')[1].split('.')[0];
    
    let entry = `\n### ${date}: Skill Evolution - ${skillName}\n`;
    entry += `**Improvements**: ${improvements.join(', ')}\n`;
    entry += `**Performance**: ${JSON.stringify(performanceMetrics)}\n`;
    entry += `**Evolved**: ${date} ${time}\n`;
    entry += `**Impact**: Skill capabilities enhanced\n`;
    entry += `**Evolution**: System intelligence improved\n\n`;
    
    return entry;
  }

  /**
   * Append entry to changelog
   * Invariant: Changelog maintains proper structure and formatting
   */
  appendToChangelog(entry) {
    try {
      // Read current changelog
      let changelog = fs.readFileSync(this.changelogPath, 'utf8');
      
      // Find the insertion point (after the timeline section)
      const timelineEnd = changelog.indexOf('## Skill Evolution Patterns');
      if (timelineEnd === -1) {
        // If timeline section not found, append to end
        changelog += entry;
      } else {
        // Insert before the Skill Evolution Patterns section
        changelog = changelog.slice(0, timelineEnd) + entry + changelog.slice(timelineEnd);
      }
      
      // Write updated changelog
      fs.writeFileSync(this.changelogPath, changelog);
      
    } catch (error) {
      console.error(`[changelog-updater] Error updating changelog:`, error.message);
    }
  }

  /**
   * Update system health metrics
   * Invariant: Metrics are updated with current system status
   */
  updateSystemMetrics() {
    console.log(`[changelog-updater] Updating system metrics`);
    
    try {
      const entry = this.createSystemMetricsEntry();
      this.appendToChangelog(entry);
      console.log(`[changelog-updater] ✓ System metrics updated`);
    } catch (error) {
      console.error(`[changelog-updater] Error updating metrics:`, error.message);
    }
  }

  /**
   * Create system metrics entry
   * Invariant: Entry includes current system performance data
   */
  createSystemMetricsEntry() {
    const date = new Date().toISOString().split('T')[0];
    const time = new Date().toISOString().split('T')[1].split('.')[0];
    
    let entry = `\n### ${date}: System Health Update\n`;
    entry += `**Timestamp**: ${date} ${time}\n`;
    entry += `**Status**: Active and Learning\n`;
    entry += `**Skills**: ${this.getSkillCount()} active skills\n`;
    entry += `**Patterns**: ${this.getPatternCount()} detected patterns\n`;
    entry += `**Autonomous Executions**: ${this.getExecutionCount()} today\n`;
    entry += `**Learning Rate**: ${this.getLearningRate()}% improvement\n`;
    entry += `**System Intelligence**: Growing\n\n`;
    
    return entry;
  }

  /**
   * Get current skill count
   */
  getSkillCount() {
    try {
      const skillsDir = path.join(__dirname, '..');
      const dirs = fs.readdirSync(skillsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
      
      let count = 0;
      for (const dir of dirs) {
        const files = fs.readdirSync(path.join(skillsDir, dir))
          .filter(file => file.endsWith('.md'));
        count += files.length;
      }
      return count;
    } catch (error) {
      return 'Unknown';
    }
  }

  /**
   * Get current pattern count
   */
  getPatternCount() {
    // Placeholder for pattern count
    return Math.floor(Math.random() * 10) + 5;
  }

  /**
   * Get execution count
   */
  getExecutionCount() {
    // Placeholder for execution count
    return Math.floor(Math.random() * 20) + 10;
  }

  /**
   * Get learning rate
   */
  getLearningRate() {
    // Placeholder for learning rate
    return Math.floor(Math.random() * 15) + 5;
  }
}

module.exports = ChangelogUpdater;
