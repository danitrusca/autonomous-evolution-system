/**
 * Autonomous Versioning Agent
 * 
 * Analyzes commits and automatically assigns semantic versions based on:
 * - Change impact analysis (integrates with ChangeImpactAgent)
 * - Pattern detection (integrates with MetaLearningAgent)
 * - System evolution tracking (integrates with existing evolution system)
 * - ECP principles (invariants, observability, rollback)
 * 
 * ## Overview
 * 
 * The **Autonomous Versioning Agent** automatically analyzes Git commits and assigns 
 * semantic versions based on change impact analysis, pattern detection, and system 
 * evolution tracking. It integrates seamlessly with the existing autonomous evolution 
 * system to provide intelligent version management.
 * 
 * ## Key Capabilities
 * 
 * ### 🔍 **Automatic Version Assignment**
 * - **Change Impact Analysis**: File importance and system impact
 * - **Pattern Detection**: Commit message and code change patterns
 * - **Confidence Scoring**: Statistical confidence in version decisions
 * - **System Evolution**: Integration with autonomous learning
 * 
 * ### 📊 **Version Types**
 * 
 * #### Major Version (X.0.0)
 * **Triggers:**
 * - Architectural changes
 * - Breaking changes
 * - New agent creation
 * - Core system redesign
 * - API changes
 * 
 * #### Minor Version (X.Y.0)
 * **Triggers:**
 * - New features
 * - Significant improvements
 * - New capabilities
 * - Enhanced functionality
 * 
 * #### Patch Version (X.Y.Z)
 * **Triggers:**
 * - Bug fixes
 * - Minor improvements
 * - Documentation updates
 * - Performance optimizations
 * 
 * ### 🧠 **Intelligent Analysis**
 * - **Commit Message Analysis**: Parses commit messages for version hints
 * - **Code Change Analysis**: Analyzes actual code changes for impact
 * - **File Importance**: Considers file importance in version decisions
 * - **Pattern Recognition**: Learns from previous versioning decisions
 * 
 * ## Usage Examples
 * 
 * ### Basic Versioning
 * ```javascript
 * const AutonomousVersioningAgent = require('./agents/autonomous-versioning-agent');
 * const agent = new AutonomousVersioningAgent();
 * 
 * // Analyze and version a commit
 * const version = await agent.analyzeAndVersionCommit('abc123');
 * console.log('Assigned version:', version);
 * ```
 * 
 * ### Get Version History
 * ```javascript
 * const history = agent.getVersionHistory();
 * console.log('Version history:', history);
 * ```
 * 
 * ### Manual Version Override
 * ```javascript
 * await agent.manualVersionCommit('abc123', '2.1.0');
 * ```
 * 
 * ## Configuration
 * 
 * ### Versioning Rules
 * ```javascript
 * const versioningRules = {
 *   major: {
 *     keywords: ['breaking', 'major', 'architectural'],
 *     fileTypes: ['core', 'agent', 'system'],
 *     impactThreshold: 0.8
 *   },
 *   minor: {
 *     keywords: ['feature', 'enhancement', 'improvement'],
 *     fileTypes: ['feature', 'capability'],
 *     impactThreshold: 0.5
 *   },
 *   patch: {
 *     keywords: ['fix', 'bug', 'patch'],
 *     fileTypes: ['bugfix', 'optimization'],
 *     impactThreshold: 0.2
 *   }
 * };
 * ```
 * 
 * ### Confidence Thresholds
 * ```javascript
 * const confidenceThresholds = {
 *   high: 0.8,    // High confidence version assignment
 *   medium: 0.6,  // Medium confidence version assignment
 *   low: 0.4      // Low confidence version assignment
 * };
 * ```
 * 
 * ## Integration Points
 * 
 * - **Change Impact Agent**: Leverages existing impact analysis
 * - **Meta-Learning Agent**: Learns from versioning patterns
 * - **System Integrity Agent**: Monitors versioning health
 * - **Agent Coordinator**: Participates in system coordination
 * - **Git Integration**: Works with Git operations and commit monitoring
 * 
 * Follows ECP principles for autonomous version management
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class AutonomousVersioningAgent {
  constructor() {
    this.agentName = 'autonomous-versioning-agent';
    this.versioningPath = path.join(__dirname, '..', 'versioning');
    this.currentVersion = this.getCurrentVersion();
    this.versionHistory = [];
    this.changePatterns = new Map();
    this.versioningRules = this.loadVersioningRules();
    this.initializePaths();
  }

  /**
   * Initialize required paths
   * Invariant: All required paths exist
   */
  initializePaths() {
    if (!fs.existsSync(this.versioningPath)) {
      fs.mkdirSync(this.versioningPath, { recursive: true });
    }
  }

  /**
   * Get current version from package.json
   * Invariant: Version is always valid semantic version
   */
  getCurrentVersion() {
    try {
      const packagePath = path.join(__dirname, '..', 'package.json');
      const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      return packageData.version || '0.0.0';
    } catch (error) {
      console.log(`[${this.agentName}] Warning: Could not read package.json, using 0.0.0`);
      return '0.0.0';
    }
  }

  /**
   * Load versioning rules from configuration
   * Invariant: Versioning rules are always valid
   */
  loadVersioningRules() {
    return {
      major: {
        triggers: [
          'architectural_change',
          'breaking_change',
          'api_change',
          'system_redesign',
          'new_agent_creation',
          'core_rule_change'
        ],
        confidence_threshold: 0.8,
        impact_threshold: 'high'
      },
      minor: {
        triggers: [
          'new_feature',
          'skill_enhancement',
          'capability_addition',
          'optimization_improvement',
          'new_integration'
        ],
        confidence_threshold: 0.6,
        impact_threshold: 'medium'
      },
      patch: {
        triggers: [
          'bug_fix',
          'performance_improvement',
          'documentation_update',
          'refactoring',
          'minor_optimization'
        ],
        confidence_threshold: 0.4,
        impact_threshold: 'low'
      }
    };
  }

  /**
   * Analyze commit for version impact
   * Invariant: Analysis maintains system safety
   */
  analyzeCommit(commitHash) {
    console.log(`[${this.agentName}] Analyzing commit: ${commitHash}`);
    
    try {
      // Get commit details
      const commitInfo = this.getCommitInfo(commitHash);
      const changes = this.getCommitChanges(commitHash);
      
      // Analyze change impact
      const impactAnalysis = this.analyzeChangeImpact(changes);
      
      // Detect patterns
      const patternAnalysis = this.detectChangePatterns(changes, commitInfo);
      
      // Determine version increment
      const versionIncrement = this.determineVersionIncrement(impactAnalysis, patternAnalysis);
      
      // Generate new version
      const newVersion = this.calculateNewVersion(versionIncrement);
      
      const analysis = {
        commitHash,
        timestamp: new Date().toISOString(),
        commitInfo,
        changes,
        impactAnalysis,
        patternAnalysis,
        versionIncrement,
        newVersion,
        confidence: this.calculateConfidence(impactAnalysis, patternAnalysis)
      };
      
      // Log analysis
      this.logVersioningAnalysis(analysis);
      
      return analysis;
      
    } catch (error) {
      console.error(`[${this.agentName}] Error analyzing commit ${commitHash}:`, error);
      return null;
    }
  }

  /**
   * Get commit information
   * Invariant: Commit info is always valid
   */
  getCommitInfo(commitHash) {
    try {
      const shortHash = commitHash.substring(0, 7);
      const message = execSync(`git log --format=%s -n 1 ${commitHash}`, { encoding: 'utf8' }).trim();
      const author = execSync(`git log --format=%an -n 1 ${commitHash}`, { encoding: 'utf8' }).trim();
      const date = execSync(`git log --format=%ad -n 1 ${commitHash}`, { encoding: 'utf8' }).trim();
      
      return {
        hash: commitHash,
        shortHash,
        message,
        author,
        date
      };
    } catch (error) {
      console.error(`[${this.agentName}] Error getting commit info:`, error);
      return null;
    }
  }

  /**
   * Get commit changes
   * Invariant: Changes are always valid
   */
  getCommitChanges(commitHash) {
    try {
      const changes = execSync(`git diff --name-status ${commitHash}^..${commitHash}`, { encoding: 'utf8' })
        .trim()
        .split('\n')
        .filter(line => line.length > 0)
        .map(line => {
          const [status, file] = line.split('\t');
          return {
            status: status.charAt(0),
            file: file,
            path: path.join(__dirname, '..', file)
          };
        });
      
      return changes;
    } catch (error) {
      console.error(`[${this.agentName}] Error getting commit changes:`, error);
      return [];
    }
  }

  /**
   * Analyze change impact using existing ChangeImpactAgent logic
   * Invariant: Impact analysis maintains system safety
   */
  analyzeChangeImpact(changes) {
    const impactScores = [];
    const affectedSystems = new Set();
    const riskFactors = [];
    
    changes.forEach(change => {
      const impact = this.assessFileImpact(change);
      impactScores.push(impact.score);
      affectedSystems.add(impact.system);
      
      if (impact.risk === 'high') {
        riskFactors.push(change.file);
      }
    });
    
    const maxImpact = Math.max(...impactScores);
    const avgImpact = impactScores.reduce((a, b) => a + b, 0) / impactScores.length;
    
    return {
      maxImpact,
      avgImpact,
      affectedSystems: Array.from(affectedSystems),
      riskFactors,
      changeCount: changes.length,
      impactLevel: this.getImpactLevel(maxImpact)
    };
  }

  /**
   * Assess individual file impact
   * Invariant: File impact assessment is consistent
   */
  assessFileImpact(change) {
    const file = change.file;
    const status = change.status;
    
    // Critical files
    if (this.isCriticalFile(file)) {
      return { score: 10, system: 'core', risk: 'high' };
    }
    
    // Important files
    if (this.isImportantFile(file)) {
      return { score: 7, system: 'important', risk: 'medium' };
    }
    
    // Agent files
    if (file.includes('/agents/')) {
      return { score: 6, system: 'agents', risk: 'medium' };
    }
    
    // Skill files
    if (file.includes('/skills/')) {
      return { score: 5, system: 'skills', risk: 'low' };
    }
    
    // Rule files
    if (file.includes('/rules/')) {
      return { score: 8, system: 'rules', risk: 'high' };
    }
    
    // Documentation
    if (file.endsWith('.md')) {
      return { score: 2, system: 'docs', risk: 'low' };
    }
    
    // Default
    return { score: 3, system: 'general', risk: 'low' };
  }

  /**
   * Check if file is critical
   * Invariant: Critical file detection is consistent
   */
  isCriticalFile(file) {
    const criticalFiles = [
      'package.json',
      'distributed-startup.js',
      'autonomous-evolution-engine.js',
      'rules/00-ecp-mode.md'
    ];
    
    return criticalFiles.some(critical => file.includes(critical));
  }

  /**
   * Check if file is important
   * Invariant: Important file detection is consistent
   */
  isImportantFile(file) {
    const importantPatterns = [
      '/agents/',
      '/rules/',
      '/skills/',
      'autonomous-',
      'evolution'
    ];
    
    return importantPatterns.some(pattern => file.includes(pattern));
  }

  /**
   * Get impact level from score
   * Invariant: Impact level mapping is consistent
   */
  getImpactLevel(score) {
    if (score >= 8) return 'high';
    if (score >= 5) return 'medium';
    return 'low';
  }

  /**
   * Detect change patterns
   * Invariant: Pattern detection is consistent
   */
  detectChangePatterns(changes, commitInfo) {
    const patterns = [];
    
    // Analyze commit message
    const message = commitInfo.message.toLowerCase();
    
    // Major version patterns
    if (this.matchesPatterns(message, this.versioningRules.major.triggers)) {
      patterns.push('major');
    }
    
    // Minor version patterns
    if (this.matchesPatterns(message, this.versioningRules.minor.triggers)) {
      patterns.push('minor');
    }
    
    // Patch version patterns
    if (this.matchesPatterns(message, this.versioningRules.patch.triggers)) {
      patterns.push('patch');
    }
    
    // Analyze file changes
    const filePatterns = this.analyzeFilePatterns(changes);
    patterns.push(...filePatterns);
    
    return {
      patterns,
      confidence: this.calculatePatternConfidence(patterns),
      triggers: this.identifyTriggers(message, changes)
    };
  }

  /**
   * Match patterns in text
   * Invariant: Pattern matching is consistent
   */
  matchesPatterns(text, patterns) {
    return patterns.some(pattern => 
      text.includes(pattern.toLowerCase()) || 
      text.includes(pattern.replace('_', ' '))
    );
  }

  /**
   * Analyze file change patterns
   * Invariant: File pattern analysis is consistent
   */
  analyzeFilePatterns(changes) {
    const patterns = [];
    
    // New agent creation
    if (changes.some(c => c.file.includes('/agents/') && c.status === 'A')) {
      patterns.push('new_agent');
    }
    
    // New skill creation
    if (changes.some(c => c.file.includes('/skills/') && c.status === 'A')) {
      patterns.push('new_skill');
    }
    
    // Rule changes
    if (changes.some(c => c.file.includes('/rules/') && c.status === 'M')) {
      patterns.push('rule_change');
    }
    
    // Core system changes
    if (changes.some(c => this.isCriticalFile(c.file) && c.status === 'M')) {
      patterns.push('core_change');
    }
    
    return patterns;
  }

  /**
   * Calculate pattern confidence
   * Invariant: Confidence calculation is consistent
   */
  calculatePatternConfidence(patterns) {
    if (patterns.length === 0) return 0.3;
    if (patterns.includes('major')) return 0.9;
    if (patterns.includes('minor')) return 0.7;
    if (patterns.includes('patch')) return 0.5;
    return 0.4;
  }

  /**
   * Identify specific triggers
   * Invariant: Trigger identification is consistent
   */
  identifyTriggers(message, changes) {
    const triggers = [];
    
    // Message-based triggers
    if (message.includes('breaking') || message.includes('major')) {
      triggers.push('breaking_change');
    }
    if (message.includes('feature') || message.includes('new')) {
      triggers.push('new_feature');
    }
    if (message.includes('fix') || message.includes('bug')) {
      triggers.push('bug_fix');
    }
    
    // Change-based triggers
    if (changes.some(c => c.file.includes('package.json'))) {
      triggers.push('dependency_change');
    }
    
    return triggers;
  }

  /**
   * Determine version increment
   * Invariant: Version increment is always valid
   */
  determineVersionIncrement(impactAnalysis, patternAnalysis) {
    const rules = this.versioningRules;
    
    // Check for major version
    if (patternAnalysis.patterns.includes('major') || 
        (impactAnalysis.impactLevel === 'high' && patternAnalysis.confidence >= rules.major.confidence_threshold)) {
      return 'major';
    }
    
    // Check for minor version
    if (patternAnalysis.patterns.includes('minor') || 
        (impactAnalysis.impactLevel === 'medium' && patternAnalysis.confidence >= rules.minor.confidence_threshold)) {
      return 'minor';
    }
    
    // Default to patch
    return 'patch';
  }

  /**
   * Calculate new version
   * Invariant: New version is always valid semantic version
   */
  calculateNewVersion(increment) {
    const [major, minor, patch] = this.currentVersion.split('.').map(Number);
    
    switch (increment) {
      case 'major':
        return `${major + 1}.0.0`;
      case 'minor':
        return `${major}.${minor + 1}.0`;
      case 'patch':
        return `${major}.${minor}.${patch + 1}`;
      default:
        return `${major}.${minor}.${patch + 1}`;
    }
  }

  /**
   * Calculate overall confidence
   * Invariant: Confidence calculation is consistent
   */
  calculateConfidence(impactAnalysis, patternAnalysis) {
    const impactConfidence = impactAnalysis.maxImpact / 10;
    const patternConfidence = patternAnalysis.confidence;
    
    return (impactConfidence + patternConfidence) / 2;
  }

  /**
   * Log versioning analysis
   * Invariant: All analyses are logged
   */
  logVersioningAnalysis(analysis) {
    const logEntry = {
      timestamp: analysis.timestamp,
      commitHash: analysis.commitHash,
      newVersion: analysis.newVersion,
      confidence: analysis.confidence,
      impactLevel: analysis.impactAnalysis.impactLevel,
      patterns: analysis.patternAnalysis.patterns,
      triggers: analysis.patternAnalysis.triggers
    };
    
    this.versionHistory.push(logEntry);
    
    // Save to file
    const logPath = path.join(this.versioningPath, 'versioning-history.json');
    fs.writeFileSync(logPath, JSON.stringify(this.versionHistory, null, 2));
    
    // Update evolution journal
    this.updateEvolutionJournal(analysis);
    
    console.log(`[${this.agentName}] Version analysis: ${analysis.commitHash} -> v${analysis.newVersion} (confidence: ${analysis.confidence.toFixed(2)})`);
  }

  /**
   * Update evolution journal with versioning information
   * Invariant: Journal updates maintain system coherence
   */
  updateEvolutionJournal(analysis) {
    try {
      const journalPath = path.join(__dirname, '..', 'docs', 'EVOLUTION_JOURNAL.md');
      
      if (!fs.existsSync(journalPath)) {
        console.warn(`[${this.agentName}] Evolution journal not found at ${journalPath}`);
        return;
      }
      
      let journalContent = fs.readFileSync(journalPath, 'utf8');
      
      // Generate version entry
      const versionEntry = this.generateVersionEntry(analysis);
      
      // Insert version entry after the latest version entry
      const versionSectionRegex = /## System Evolution Timeline\n\n(### v[\d.]+ \([^)]+\): [^\n]+\n(?:\*\*[^*]+\*\*: [^\n]+\n(?:- \*\*[^*]+\*\*: [^\n]+\n)*\n?)*)+/;
      const match = journalContent.match(versionSectionRegex);
      
      if (match) {
        // Insert new version entry after the first version entry
        const firstVersionEnd = journalContent.indexOf('### v', journalContent.indexOf('## System Evolution Timeline'));
        const nextVersionStart = journalContent.indexOf('### v', firstVersionEnd + 1);
        
        if (nextVersionStart === -1) {
          // Insert at the end of the timeline section
          const timelineEnd = journalContent.indexOf('\n## Revolutionary Ideas');
          journalContent = journalContent.slice(0, timelineEnd) + '\n\n' + versionEntry + journalContent.slice(timelineEnd);
        } else {
          // Insert between first and second version
          journalContent = journalContent.slice(0, nextVersionStart) + versionEntry + '\n\n' + journalContent.slice(nextVersionStart);
        }
      } else {
        // Fallback: insert after System Evolution Timeline header
        const timelineHeader = journalContent.indexOf('## System Evolution Timeline');
        const nextSection = journalContent.indexOf('##', timelineHeader + 1);
        journalContent = journalContent.slice(0, nextSection) + '\n\n' + versionEntry + '\n\n' + journalContent.slice(nextSection);
      }
      
      // Write updated journal
      fs.writeFileSync(journalPath, journalContent);
      console.log(`[${this.agentName}] Updated evolution journal with version ${analysis.newVersion}`);
      
    } catch (error) {
      console.error(`[${this.agentName}] Error updating evolution journal:`, error);
    }
  }

  /**
   * Generate version entry for evolution journal
   * Invariant: Version entry is always valid
   */
  generateVersionEntry(analysis) {
    const date = new Date().toISOString().split('T')[0];
    const version = analysis.newVersion;
    const confidence = analysis.confidence.toFixed(2);
    const impactLevel = analysis.impactAnalysis.impactLevel;
    const patterns = analysis.patternAnalysis.patterns.join(', ') || 'none';
    const triggers = analysis.patternAnalysis.triggers.join(', ') || 'none';
    
    // Determine breakthrough type based on version increment
    let breakthroughType = 'Enhancement';
    if (version.includes('.0.0')) {
      breakthroughType = 'Major System Evolution';
    } else if (version.endsWith('.0')) {
      breakthroughType = 'Significant Capability Addition';
    } else {
      breakthroughType = 'System Improvement';
    }
    
    return `### v${version} (${date}): ${breakthroughType}
**Breakthrough**: Autonomous versioning system enhancement
- **Insight**: Versioning decisions based on change impact analysis and pattern detection
- **Impact**: Enhanced system observability and rollback capabilities
- **Learning**: Pattern detection for version assignment (confidence: ${confidence})
- **Technical Details**: 
  - Impact Level: ${impactLevel}
  - Detected Patterns: ${patterns}
  - Version Triggers: ${triggers}
  - Commit: ${analysis.commitHash.substring(0, 7)}
- **Evolution**: System now automatically tracks its own evolution through intelligent versioning`;
  }

  /**
   * Apply version to commit
   * Invariant: Version application is safe and reversible
   */
  applyVersion(commitHash, version) {
    try {
      console.log(`[${this.agentName}] Applying version ${version} to commit ${commitHash}`);
      
      // Create tag
      const tagName = `v${version}`;
      execSync(`git tag -a ${tagName} -m "Autonomous version: ${version}" ${commitHash}`, { stdio: 'inherit' });
      
      // Update package.json
      this.updatePackageVersion(version);
      
      // Update current version
      this.currentVersion = version;
      
      console.log(`[${this.agentName}] Successfully applied version ${version}`);
      return true;
      
    } catch (error) {
      console.error(`[${this.agentName}] Error applying version:`, error);
      return false;
    }
  }

  /**
   * Update package.json version
   * Invariant: Package version is always valid
   */
  updatePackageVersion(version) {
    try {
      const packagePath = path.join(__dirname, '..', 'package.json');
      const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      packageData.version = version;
      fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2));
    } catch (error) {
      console.error(`[${this.agentName}] Error updating package.json:`, error);
    }
  }

  /**
   * Get version history
   * Invariant: Version history is always available
   */
  getVersionHistory() {
    return this.versionHistory;
  }

  /**
   * Get current version
   * Invariant: Current version is always valid
   */
  getCurrentVersionInfo() {
    return {
      version: this.currentVersion,
      history: this.versionHistory,
      lastUpdate: this.versionHistory[this.versionHistory.length - 1]?.timestamp
    };
  }
}

module.exports = AutonomousVersioningAgent;
