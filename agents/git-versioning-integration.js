/**
 * Git Versioning Integration
 * 
 * Integrates autonomous versioning with Git operations:
 * - Monitors Git commits for versioning opportunities
 * - Automatically applies semantic versions to commits
 * - Integrates with existing agent coordination system
 * - Follows ECP principles for safe version management
 * 
 * This module bridges the autonomous versioning agent with Git operations
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const AutonomousVersioningAgent = require('./autonomous-versioning-agent');

class GitVersioningIntegration {
  constructor() {
    this.integrationName = 'git-versioning-integration';
    this.versioningAgent = new AutonomousVersioningAgent();
    this.gitPath = path.join(__dirname, '..');
    this.versioningEnabled = true;
    this.autoVersioning = true;
    this.versioningThreshold = 0.6; // Minimum confidence for auto-versioning
    this.initializeGitIntegration();
  }

  /**
   * Initialize Git integration
   * Invariant: Git integration is properly configured
   */
  initializeGitIntegration() {
    try {
      // Check if we're in a Git repository
      execSync('git rev-parse --git-dir', { cwd: this.gitPath, stdio: 'pipe' });
      console.log(`[${this.integrationName}] Git integration initialized`);
    } catch (error) {
      console.error(`[${this.integrationName}] Not in a Git repository:`, error.message);
      this.versioningEnabled = false;
    }
  }

  /**
   * Monitor recent commits for versioning
   * Invariant: Commit monitoring is safe and reversible
   */
  monitorRecentCommits(commitCount = 5) {
    if (!this.versioningEnabled) {
      console.log(`[${this.integrationName}] Versioning disabled - not in Git repository`);
      return;
    }

    try {
      console.log(`[${this.integrationName}] Monitoring last ${commitCount} commits for versioning opportunities`);
      
      // Get recent commits
      const commits = this.getRecentCommits(commitCount);
      
      // Analyze each commit
      for (const commit of commits) {
        this.analyzeCommitForVersioning(commit);
      }
      
    } catch (error) {
      console.error(`[${this.integrationName}] Error monitoring commits:`, error);
    }
  }

  /**
   * Get recent commits
   * Invariant: Commit retrieval is safe
   */
  getRecentCommits(count) {
    try {
      const commits = execSync(`git log --oneline -n ${count}`, { 
        cwd: this.gitPath, 
        encoding: 'utf8' 
      }).trim().split('\n');
      
      return commits.map(line => {
        const [hash, ...messageParts] = line.split(' ');
        return {
          hash,
          message: messageParts.join(' ')
        };
      });
    } catch (error) {
      console.error(`[${this.integrationName}] Error getting recent commits:`, error);
      return [];
    }
  }

  /**
   * Analyze commit for versioning
   * Invariant: Analysis is safe and doesn't modify Git state
   */
  analyzeCommitForVersioning(commit) {
    try {
      // Check if commit already has a version tag
      if (this.hasVersionTag(commit.hash)) {
        console.log(`[${this.integrationName}] Commit ${commit.hash} already has version tag`);
        return;
      }

      // Analyze commit with versioning agent
      const analysis = this.versioningAgent.analyzeCommit(commit.hash);
      
      if (!analysis) {
        console.log(`[${this.integrationName}] Could not analyze commit ${commit.hash}`);
        return;
      }

      // Check if versioning is warranted
      if (this.shouldVersionCommit(analysis)) {
        this.applyVersionToCommit(analysis);
      } else {
        console.log(`[${this.integrationName}] Commit ${commit.hash} does not meet versioning criteria (confidence: ${analysis.confidence.toFixed(2)})`);
      }

    } catch (error) {
      console.error(`[${this.integrationName}] Error analyzing commit ${commit.hash}:`, error);
    }
  }

  /**
   * Check if commit has version tag
   * Invariant: Tag checking is safe
   */
  hasVersionTag(commitHash) {
    try {
      const tags = execSync(`git tag --points-at ${commitHash}`, { 
        cwd: this.gitPath, 
        encoding: 'utf8' 
      }).trim();
      
      return tags.length > 0 && tags.includes('v');
    } catch (error) {
      return false;
    }
  }

  /**
   * Determine if commit should be versioned
   * Invariant: Decision criteria are consistent
   */
  shouldVersionCommit(analysis) {
    // Check confidence threshold
    if (analysis.confidence < this.versioningThreshold) {
      return false;
    }

    // Check if auto-versioning is enabled
    if (!this.autoVersioning) {
      return false;
    }

    // Check for significant changes
    if (analysis.impactAnalysis.impactLevel === 'low' && 
        analysis.patternAnalysis.patterns.length === 0) {
      return false;
    }

    return true;
  }

  /**
   * Apply version to commit
   * Invariant: Version application is safe and reversible
   */
  applyVersionToCommit(analysis) {
    try {
      console.log(`[${this.integrationName}] Applying version ${analysis.newVersion} to commit ${analysis.commitHash}`);
      
      // Apply version using versioning agent
      const success = this.versioningAgent.applyVersion(analysis.commitHash, analysis.newVersion);
      
      if (success) {
        console.log(`[${this.integrationName}] Successfully versioned commit ${analysis.commitHash} as v${analysis.newVersion}`);
        
        // Log versioning event
        this.logVersioningEvent(analysis);
        
        // Trigger related agents if needed
        this.triggerRelatedAgents(analysis);
      } else {
        console.error(`[${this.integrationName}] Failed to apply version to commit ${analysis.commitHash}`);
      }
      
    } catch (error) {
      console.error(`[${this.integrationName}] Error applying version:`, error);
    }
  }

  /**
   * Log versioning event
   * Invariant: All versioning events are logged
   */
  logVersioningEvent(analysis) {
    const event = {
      timestamp: new Date().toISOString(),
      type: 'version_applied',
      commitHash: analysis.commitHash,
      version: analysis.newVersion,
      confidence: analysis.confidence,
      impactLevel: analysis.impactAnalysis.impactLevel,
      patterns: analysis.patternAnalysis.patterns,
      triggers: analysis.patternAnalysis.triggers
    };

    // Save to versioning log
    const logPath = path.join(__dirname, '..', 'versioning', 'versioning-events.json');
    let events = [];
    
    try {
      if (fs.existsSync(logPath)) {
        events = JSON.parse(fs.readFileSync(logPath, 'utf8'));
      }
    } catch (error) {
      console.warn(`[${this.integrationName}] Could not read existing events log:`, error);
    }
    
    events.push(event);
    fs.writeFileSync(logPath, JSON.stringify(events, null, 2));
  }

  /**
   * Trigger related agents
   * Invariant: Agent triggering is safe
   */
  triggerRelatedAgents(analysis) {
    // This would integrate with the existing agent coordinator
    // For now, we'll just log the trigger
    console.log(`[${this.integrationName}] Triggering related agents for version ${analysis.newVersion}`);
    
    // In a full implementation, this would:
    // 1. Notify the agent coordinator
    // 2. Trigger system integrity checks
    // 3. Update learning systems
    // 4. Notify other monitoring agents
  }

  /**
   * Get versioning status
   * Invariant: Status is always accurate
   */
  getVersioningStatus() {
    return {
      enabled: this.versioningEnabled,
      autoVersioning: this.autoVersioning,
      threshold: this.versioningThreshold,
      currentVersion: this.versioningAgent.getCurrentVersion(),
      versionHistory: this.versioningAgent.getVersionHistory()
    };
  }

  /**
   * Enable/disable auto-versioning
   * Invariant: State changes are logged
   */
  setAutoVersioning(enabled) {
    this.autoVersioning = enabled;
    console.log(`[${this.integrationName}] Auto-versioning ${enabled ? 'enabled' : 'disabled'}`);
  }

  /**
   * Set versioning threshold
   * Invariant: Threshold is always valid
   */
  setVersioningThreshold(threshold) {
    if (threshold >= 0 && threshold <= 1) {
      this.versioningThreshold = threshold;
      console.log(`[${this.integrationName}] Versioning threshold set to ${threshold}`);
    } else {
      console.error(`[${this.integrationName}] Invalid threshold: ${threshold}. Must be between 0 and 1.`);
    }
  }

  /**
   * Manually version a specific commit
   * Invariant: Manual versioning is safe
   */
  manualVersionCommit(commitHash, version = null) {
    try {
      console.log(`[${this.integrationName}] Manual versioning requested for commit ${commitHash}`);
      
      if (version) {
        // Use specified version
        const success = this.versioningAgent.applyVersion(commitHash, version);
        if (success) {
          console.log(`[${this.integrationName}] Successfully applied manual version ${version}`);
        }
      } else {
        // Analyze and auto-version
        this.analyzeCommitForVersioning({ hash: commitHash, message: '' });
      }
      
    } catch (error) {
      console.error(`[${this.integrationName}] Error in manual versioning:`, error);
    }
  }

  /**
   * Get versioning statistics
   * Invariant: Statistics are always accurate
   */
  getVersioningStatistics() {
    const history = this.versioningAgent.getVersionHistory();
    
    const stats = {
      totalVersions: history.length,
      majorVersions: history.filter(v => v.newVersion.includes('.0.0')).length,
      minorVersions: history.filter(v => !v.newVersion.includes('.0.0') && v.newVersion.endsWith('.0')).length,
      patchVersions: history.filter(v => !v.newVersion.endsWith('.0')).length,
      averageConfidence: history.length > 0 ? 
        history.reduce((sum, v) => sum + v.confidence, 0) / history.length : 0,
      lastVersion: history[history.length - 1]?.newVersion || 'none'
    };
    
    return stats;
  }
}

module.exports = GitVersioningIntegration;
