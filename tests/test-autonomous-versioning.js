/**
 * Test Autonomous Versioning System
 * 
 * Tests the autonomous versioning system integration:
 * - AutonomousVersioningAgent functionality
 * - GitVersioningIntegration
 * - Agent Coordinator integration
 * - ECP compliance
 */

const path = require('path');
const fs = require('fs');

// Import the versioning components
const AutonomousVersioningAgent = require('../agents/autonomous-versioning-agent');
const GitVersioningIntegration = require('../agents/git-versioning-integration');
const AgentCoordinator = require('../agents/agent-coordinator');

class AutonomousVersioningTest {
  constructor() {
    this.testResults = [];
    this.versioningAgent = new AutonomousVersioningAgent();
    this.gitIntegration = new GitVersioningIntegration();
    this.agentCoordinator = new AgentCoordinator();
  }

  /**
   * Run all versioning tests
   * Invariant: All tests are executed safely
   */
  async runAllTests() {
    console.log('🧪 Starting Autonomous Versioning System Tests\n');

    try {
      // Test 1: Versioning Agent Basic Functionality
      await this.testVersioningAgent();

      // Test 2: Git Integration
      await this.testGitIntegration();

      // Test 3: Agent Coordinator Integration
      await this.testAgentCoordinatorIntegration();

      // Test 4: ECP Compliance
      await this.testECPCompliance();

      // Test 5: Pattern Detection
      await this.testPatternDetection();

      // Test 6: Version Calculation
      await this.testVersionCalculation();

      // Test 7: Rollback Capabilities
      await this.testRollbackCapabilities();

      // Display results
      this.displayTestResults();

    } catch (error) {
      console.error('❌ Test suite failed:', error);
    }
  }

  /**
   * Test versioning agent basic functionality
   * Invariant: Agent functionality is consistent
   */
  async testVersioningAgent() {
    console.log('🔍 Testing Versioning Agent...');

    try {
      // Test current version retrieval
      const currentVersion = this.versioningAgent.getCurrentVersion();
      this.assert(currentVersion !== null, 'Current version should not be null');
      this.assert(this.isValidSemanticVersion(currentVersion), 'Current version should be valid semantic version');

      // Test version history
      const versionHistory = this.versioningAgent.getVersionHistory();
      this.assert(Array.isArray(versionHistory), 'Version history should be an array');

      // Test versioning rules loading
      const rules = this.versioningAgent.versioningRules;
      this.assert(rules.major !== undefined, 'Major version rules should be defined');
      this.assert(rules.minor !== undefined, 'Minor version rules should be defined');
      this.assert(rules.patch !== undefined, 'Patch version rules should be defined');

      this.recordTestResult('Versioning Agent', true, 'Basic functionality working');

    } catch (error) {
      this.recordTestResult('Versioning Agent', false, error.message);
    }
  }

  /**
   * Test Git integration
   * Invariant: Git integration is safe
   */
  async testGitIntegration() {
    console.log('🔍 Testing Git Integration...');

    try {
      // Test Git integration initialization
      const status = this.gitIntegration.getVersioningStatus();
      this.assert(typeof status === 'object', 'Versioning status should be an object');
      this.assert('enabled' in status, 'Status should include enabled flag');
      this.assert('autoVersioning' in status, 'Status should include autoVersioning flag');

      // Test statistics
      const stats = this.gitIntegration.getVersioningStatistics();
      this.assert(typeof stats === 'object', 'Statistics should be an object');
      this.assert('totalVersions' in stats, 'Statistics should include totalVersions');

      this.recordTestResult('Git Integration', true, 'Git integration working');

    } catch (error) {
      this.recordTestResult('Git Integration', false, error.message);
    }
  }

  /**
   * Test agent coordinator integration
   * Invariant: Coordinator integration is safe
   */
  async testAgentCoordinatorIntegration() {
    console.log('🔍 Testing Agent Coordinator Integration...');

    try {
      // Test versioning statistics access
      const stats = this.agentCoordinator.getVersioningStatistics();
      this.assert(typeof stats === 'object', 'Versioning statistics should be accessible');

      // Test agent registration
      const agents = this.agentCoordinator.agents;
      this.assert(agents.has('git-versioning'), 'Git versioning agent should be registered');

      this.recordTestResult('Agent Coordinator Integration', true, 'Integration working');

    } catch (error) {
      this.recordTestResult('Agent Coordinator Integration', false, error.message);
    }
  }

  /**
   * Test ECP compliance
   * Invariant: ECP principles are followed
   */
  async testECPCompliance() {
    console.log('🔍 Testing ECP Compliance...');

    try {
      // Test invariants are defined
      const agentCode = fs.readFileSync(path.join(__dirname, 'agents', 'autonomous-versioning-agent.js'), 'utf8');
      const invariantCount = (agentCode.match(/Invariant:/g) || []).length;
      this.assert(invariantCount > 0, 'Agent should have invariants defined');

      // Test observability
      const logCount = (agentCode.match(/console\.log/g) || []).length;
      this.assert(logCount > 0, 'Agent should have logging for observability');

      // Test rollback capabilities
      const rollbackCount = (agentCode.match(/rollback|revert/i) || []).length;
      this.assert(rollbackCount > 0, 'Agent should have rollback capabilities');

      this.recordTestResult('ECP Compliance', true, 'ECP principles followed');

    } catch (error) {
      this.recordTestResult('ECP Compliance', false, error.message);
    }
  }

  /**
   * Test pattern detection
   * Invariant: Pattern detection is consistent
   */
  async testPatternDetection() {
    console.log('🔍 Testing Pattern Detection...');

    try {
      // Test major version patterns
      const majorPatterns = this.versioningAgent.versioningRules.major.triggers;
      this.assert(Array.isArray(majorPatterns), 'Major patterns should be an array');
      this.assert(majorPatterns.length > 0, 'Major patterns should not be empty');

      // Test minor version patterns
      const minorPatterns = this.versioningAgent.versioningRules.minor.triggers;
      this.assert(Array.isArray(minorPatterns), 'Minor patterns should be an array');
      this.assert(minorPatterns.length > 0, 'Minor patterns should not be empty');

      // Test patch version patterns
      const patchPatterns = this.versioningAgent.versioningRules.patch.triggers;
      this.assert(Array.isArray(patchPatterns), 'Patch patterns should be an array');
      this.assert(patchPatterns.length > 0, 'Patch patterns should not be empty');

      this.recordTestResult('Pattern Detection', true, 'Pattern detection working');

    } catch (error) {
      this.recordTestResult('Pattern Detection', false, error.message);
    }
  }

  /**
   * Test version calculation
   * Invariant: Version calculation is consistent
   */
  async testVersionCalculation() {
    console.log('🔍 Testing Version Calculation...');

    try {
      // Test major version increment
      const majorVersion = this.versioningAgent.calculateNewVersion('major');
      this.assert(this.isValidSemanticVersion(majorVersion), 'Major version should be valid');

      // Test minor version increment
      const minorVersion = this.versioningAgent.calculateNewVersion('minor');
      this.assert(this.isValidSemanticVersion(minorVersion), 'Minor version should be valid');

      // Test patch version increment
      const patchVersion = this.versioningAgent.calculateNewVersion('patch');
      this.assert(this.isValidSemanticVersion(patchVersion), 'Patch version should be valid');

      this.recordTestResult('Version Calculation', true, 'Version calculation working');

    } catch (error) {
      this.recordTestResult('Version Calculation', false, error.message);
    }
  }

  /**
   * Test rollback capabilities
   * Invariant: Rollback is safe
   */
  async testRollbackCapabilities() {
    console.log('🔍 Testing Rollback Capabilities...');

    try {
      // Test that rollback methods exist
      const agentCode = fs.readFileSync(path.join(__dirname, 'agents', 'autonomous-versioning-agent.js'), 'utf8');
      const hasRollback = agentCode.includes('rollback') || agentCode.includes('revert');
      this.assert(hasRollback, 'Agent should have rollback capabilities');

      // Test error handling
      const hasErrorHandling = agentCode.includes('try') && agentCode.includes('catch');
      this.assert(hasErrorHandling, 'Agent should have error handling');

      this.recordTestResult('Rollback Capabilities', true, 'Rollback capabilities present');

    } catch (error) {
      this.recordTestResult('Rollback Capabilities', false, error.message);
    }
  }

  /**
   * Assert condition and record result
   * Invariant: Assertions are consistent
   */
  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  /**
   * Record test result
   * Invariant: Test results are always recorded
   */
  recordTestResult(testName, passed, message) {
    this.testResults.push({
      test: testName,
      passed,
      message,
      timestamp: new Date().toISOString()
    });

    const status = passed ? '✅' : '❌';
    console.log(`${status} ${testName}: ${message}`);
  }

  /**
   * Check if version is valid semantic version
   * Invariant: Version validation is consistent
   */
  isValidSemanticVersion(version) {
    const semverRegex = /^\d+\.\d+\.\d+$/;
    return semverRegex.test(version);
  }

  /**
   * Display test results
   * Invariant: Results are always displayed
   */
  displayTestResults() {
    console.log('\n📊 Test Results Summary:');
    console.log('========================');

    const passed = this.testResults.filter(r => r.passed).length;
    const total = this.testResults.length;

    console.log(`Total Tests: ${total}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${total - passed}`);
    console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%`);

    if (total - passed > 0) {
      console.log('\n❌ Failed Tests:');
      this.testResults
        .filter(r => !r.passed)
        .forEach(r => console.log(`  - ${r.test}: ${r.message}`));
    }

    console.log('\n🎯 Autonomous Versioning System Test Complete!');
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const test = new AutonomousVersioningTest();
  test.runAllTests().catch(console.error);
}

module.exports = AutonomousVersioningTest;
