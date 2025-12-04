/**
 * Demo Autonomous Versioning System
 * 
 * Demonstrates the autonomous versioning system capabilities:
 * - Version analysis
 * - Pattern detection
 * - Git integration
 * - Statistics and monitoring
 */

const path = require('path');
const AutonomousVersioningAgent = require('./agents/autonomous-versioning-agent');
const GitVersioningIntegration = require('./agents/git-versioning-integration');

class AutonomousVersioningDemo {
  constructor() {
    this.versioningAgent = new AutonomousVersioningAgent();
    this.gitIntegration = new GitVersioningIntegration();
  }

  /**
   * Run the demo
   * Invariant: Demo runs safely
   */
  async runDemo() {
    console.log('🚀 Autonomous Versioning System Demo\n');
    
    try {
      // Demo 1: Show current system status
      await this.demoSystemStatus();
      
      // Demo 2: Show versioning rules
      await this.demoVersioningRules();
      
      // Demo 3: Show pattern detection
      await this.demoPatternDetection();
      
      // Demo 4: Show version calculation
      await this.demoVersionCalculation();
      
      // Demo 5: Show Git integration
      await this.demoGitIntegration();
      
      // Demo 6: Show statistics
      await this.demoStatistics();
      
      console.log('\n🎯 Demo Complete! Autonomous Versioning System is ready.');
      
    } catch (error) {
      console.error('❌ Demo failed:', error);
    }
  }

  /**
   * Demo system status
   * Invariant: Status is always accurate
   */
  async demoSystemStatus() {
    console.log('📊 System Status:');
    console.log('================');
    
    const currentVersion = this.versioningAgent.getCurrentVersion();
    const versionHistory = this.versioningAgent.getVersionHistory();
    
    console.log(`Current Version: ${currentVersion}`);
    console.log(`Version History Entries: ${versionHistory.length}`);
    console.log(`Git Integration: ${this.gitIntegration.getVersioningStatus().enabled ? 'Enabled' : 'Disabled'}`);
    console.log(`Auto-versioning: ${this.gitIntegration.getVersioningStatus().autoVersioning ? 'Enabled' : 'Disabled'}`);
    console.log('');
  }

  /**
   * Demo versioning rules
   * Invariant: Rules are always valid
   */
  async demoVersioningRules() {
    console.log('📋 Versioning Rules:');
    console.log('===================');
    
    const rules = this.versioningAgent.versioningRules;
    
    console.log('Major Version Triggers:');
    rules.major.triggers.forEach(trigger => {
      console.log(`  - ${trigger}`);
    });
    
    console.log('\nMinor Version Triggers:');
    rules.minor.triggers.forEach(trigger => {
      console.log(`  - ${trigger}`);
    });
    
    console.log('\nPatch Version Triggers:');
    rules.patch.triggers.forEach(trigger => {
      console.log(`  - ${trigger}`);
    });
    
    console.log('');
  }

  /**
   * Demo pattern detection
   * Invariant: Pattern detection is consistent
   */
  async demoPatternDetection() {
    console.log('🔍 Pattern Detection Demo:');
    console.log('==========================');
    
    const testMessages = [
      'feat: add new autonomous agent system',
      'fix: resolve versioning bug in agent coordinator',
      'docs: update autonomous versioning documentation',
      'refactor: improve pattern detection algorithm',
      'BREAKING CHANGE: redesign agent architecture'
    ];
    
    testMessages.forEach(message => {
      const patterns = this.detectPatternsInMessage(message);
      console.log(`Message: "${message}"`);
      console.log(`Detected Patterns: ${patterns.join(', ') || 'None'}`);
      console.log('');
    });
  }

  /**
   * Detect patterns in message
   * Invariant: Pattern detection is consistent
   */
  detectPatternsInMessage(message) {
    const patterns = [];
    const rules = this.versioningAgent.versioningRules;
    
    // Check major patterns
    if (this.matchesPatterns(message, rules.major.triggers)) {
      patterns.push('major');
    }
    
    // Check minor patterns
    if (this.matchesPatterns(message, rules.minor.triggers)) {
      patterns.push('minor');
    }
    
    // Check patch patterns
    if (this.matchesPatterns(message, rules.patch.triggers)) {
      patterns.push('patch');
    }
    
    return patterns;
  }

  /**
   * Match patterns in text
   * Invariant: Pattern matching is consistent
   */
  matchesPatterns(text, patterns) {
    return patterns.some(pattern => 
      text.toLowerCase().includes(pattern.toLowerCase()) || 
      text.toLowerCase().includes(pattern.replace('_', ' '))
    );
  }

  /**
   * Demo version calculation
   * Invariant: Version calculation is consistent
   */
  async demoVersionCalculation() {
    console.log('🧮 Version Calculation Demo:');
    console.log('============================');
    
    const currentVersion = this.versioningAgent.getCurrentVersion();
    console.log(`Current Version: ${currentVersion}`);
    
    const majorVersion = this.versioningAgent.calculateNewVersion('major');
    const minorVersion = this.versioningAgent.calculateNewVersion('minor');
    const patchVersion = this.versioningAgent.calculateNewVersion('patch');
    
    console.log(`Major Increment: ${currentVersion} → ${majorVersion}`);
    console.log(`Minor Increment: ${currentVersion} → ${minorVersion}`);
    console.log(`Patch Increment: ${currentVersion} → ${patchVersion}`);
    console.log('');
  }

  /**
   * Demo Git integration
   * Invariant: Git integration is safe
   */
  async demoGitIntegration() {
    console.log('🔗 Git Integration Demo:');
    console.log('========================');
    
    const status = this.gitIntegration.getVersioningStatus();
    console.log(`Git Repository: ${status.enabled ? 'Detected' : 'Not Found'}`);
    console.log(`Auto-versioning: ${status.autoVersioning ? 'Enabled' : 'Disabled'}`);
    console.log(`Versioning Threshold: ${status.threshold}`);
    console.log(`Current Version: ${status.currentVersion}`);
    console.log('');
  }

  /**
   * Demo statistics
   * Invariant: Statistics are always accurate
   */
  async demoStatistics() {
    console.log('📈 Versioning Statistics:');
    console.log('=========================');
    
    const stats = this.gitIntegration.getVersioningStatistics();
    
    console.log(`Total Versions: ${stats.totalVersions}`);
    console.log(`Major Versions: ${stats.majorVersions}`);
    console.log(`Minor Versions: ${stats.minorVersions}`);
    console.log(`Patch Versions: ${stats.patchVersions}`);
    console.log(`Average Confidence: ${stats.averageConfidence.toFixed(2)}`);
    console.log(`Last Version: ${stats.lastVersion}`);
    console.log('');
  }
}

// Run demo if this file is executed directly
if (require.main === module) {
  const demo = new AutonomousVersioningDemo();
  demo.runDemo().catch(console.error);
}

module.exports = AutonomousVersioningDemo;
