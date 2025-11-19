/**
 * Test Unified Journal System
 * 
 * Tests the unified EVOLUTION_JOURNAL.md system:
 * - Journal consolidation
 * - Versioning integration
 * - Idea capture integration
 * - Agent coordination
 */

const path = require('path');
const fs = require('fs');

// Import the components
const AutonomousVersioningAgent = require('../agents/autonomous-versioning-agent');
const GitVersioningIntegration = require('../agents/git-versioning-integration');
const IdeaCaptureAgent = require('../agents/idea-capture-agent');

class UnifiedJournalTest {
  constructor() {
    this.testResults = [];
    this.journalPath = path.join(__dirname, 'docs', 'EVOLUTION_JOURNAL.md');
  }

  /**
   * Run all unified journal tests
   * Invariant: All tests are executed safely
   */
  async runAllTests() {
    console.log('🧪 Starting Unified Journal System Tests\n');

    try {
      // Test 1: Journal File Exists
      await this.testJournalExists();

      // Test 2: Journal Structure
      await this.testJournalStructure();

      // Test 3: Versioning Integration
      await this.testVersioningIntegration();

      // Test 4: Idea Capture Integration
      await this.testIdeaCaptureIntegration();

      // Test 5: Content Consolidation
      await this.testContentConsolidation();

      // Test 6: Agent Integration
      await this.testAgentIntegration();

      // Display results
      this.displayTestResults();

    } catch (error) {
      console.error('❌ Test suite failed:', error);
    }
  }

  /**
   * Test journal file exists
   * Invariant: Journal file is always present
   */
  async testJournalExists() {
    console.log('🔍 Testing Journal File Exists...');

    try {
      const exists = fs.existsSync(this.journalPath);
      this.assert(exists, 'EVOLUTION_JOURNAL.md should exist');

      const content = fs.readFileSync(this.journalPath, 'utf8');
      this.assert(content.length > 0, 'Journal should have content');

      this.recordTestResult('Journal File Exists', true, 'Journal file present and has content');

    } catch (error) {
      this.recordTestResult('Journal File Exists', false, error.message);
    }
  }

  /**
   * Test journal structure
   * Invariant: Journal structure is consistent
   */
  async testJournalStructure() {
    console.log('🔍 Testing Journal Structure...');

    try {
      const content = fs.readFileSync(this.journalPath, 'utf8');

      // Check for required sections
      const requiredSections = [
        '# Autonomous Evolution Journal',
        '## Purpose',
        '## Evolution Philosophy',
        '## System Evolution Timeline',
        '## Revolutionary Ideas',
        '## Learning Patterns',
        '## System Architecture Evolution',
        '## Meta-Learning Integration',
        '## Version Integration',
        '## Principles Library'
      ];

      for (const section of requiredSections) {
        this.assert(content.includes(section), `Journal should contain section: ${section}`);
      }

      // Check for version entries
      const versionEntries = content.match(/### v[\d.]+/g);
      this.assert(versionEntries && versionEntries.length > 0, 'Journal should contain version entries');

      this.recordTestResult('Journal Structure', true, 'All required sections present');

    } catch (error) {
      this.recordTestResult('Journal Structure', false, error.message);
    }
  }

  /**
   * Test versioning integration
   * Invariant: Versioning integration is functional
   */
  async testVersioningIntegration() {
    console.log('🔍 Testing Versioning Integration...');

    try {
      const versioningAgent = new AutonomousVersioningAgent();

      // Check if versioning agent has journal update method
      this.assert(typeof versioningAgent.updateEvolutionJournal === 'function',
        'Versioning agent should have updateEvolutionJournal method');

      // Check if versioning agent has journal entry generation method
      this.assert(typeof versioningAgent.generateVersionEntry === 'function',
        'Versioning agent should have generateVersionEntry method');

      this.recordTestResult('Versioning Integration', true, 'Versioning integration methods present');

    } catch (error) {
      this.recordTestResult('Versioning Integration', false, error.message);
    }
  }

  /**
   * Test idea capture integration
   * Invariant: Idea capture integration is functional
   */
  async testIdeaCaptureIntegration() {
    console.log('🔍 Testing Idea Capture Integration...');

    try {
      const ideaAgent = new IdeaCaptureAgent();

      // Check if idea agent has journal update method
      this.assert(typeof ideaAgent.updateEvolutionJournal === 'function',
        'Idea agent should have updateEvolutionJournal method');

      // Check if idea agent has journal entry generation method
      this.assert(typeof ideaAgent.generateIdeaEntry === 'function',
        'Idea agent should have generateIdeaEntry method');

      this.recordTestResult('Idea Capture Integration', true, 'Idea capture integration methods present');

    } catch (error) {
      this.recordTestResult('Idea Capture Integration', false, error.message);
    }
  }

  /**
   * Test content consolidation
   * Invariant: Content consolidation is complete
   */
  async testContentConsolidation() {
    console.log('🔍 Testing Content Consolidation...');

    try {
      const content = fs.readFileSync(this.journalPath, 'utf8');

      // Check for consolidated content from different sources
      const consolidatedContent = [
        'Autonomous Versioning System',  // From versioning implementation
        'True Autonomy Implementation',  // From changes journal
        'Autonomous Evolutionary Path Explorer',  // From idea journal
        'ECP Core System Established',  // From evolution journal
        'Documentation Consolidation'   // From changes journal
      ];

      for (const item of consolidatedContent) {
        this.assert(content.includes(item), `Journal should contain consolidated content: ${item}`);
      }

      // Check that old journal files don't exist
      const oldJournals = [
        'AUTONOMOUS_EVOLUTION_JOURNAL.md',
        'CHANGES_JOURNAL.md',
        'IDEA_JOURNAL.md'
      ];

      for (const oldJournal of oldJournals) {
        const oldPath = path.join(__dirname, 'docs', oldJournal);
        this.assert(!fs.existsSync(oldPath), `Old journal should not exist: ${oldJournal}`);
      }

      this.recordTestResult('Content Consolidation', true, 'Content successfully consolidated');

    } catch (error) {
      this.recordTestResult('Content Consolidation', false, error.message);
    }
  }

  /**
   * Test agent integration
   * Invariant: Agent integration is functional
   */
  async testAgentIntegration() {
    console.log('🔍 Testing Agent Integration...');

    try {
      // Test that agents can be instantiated
      const versioningAgent = new AutonomousVersioningAgent();
      const gitIntegration = new GitVersioningIntegration();
      const ideaAgent = new IdeaCaptureAgent();

      this.assert(versioningAgent !== null, 'Versioning agent should instantiate');
      this.assert(gitIntegration !== null, 'Git integration should instantiate');
      this.assert(ideaAgent !== null, 'Idea agent should instantiate');

      // Test that agents have required methods
      this.assert(typeof versioningAgent.getCurrentVersion === 'function',
        'Versioning agent should have getCurrentVersion method');
      this.assert(typeof gitIntegration.getVersioningStatus === 'function',
        'Git integration should have getVersioningStatus method');
      this.assert(typeof ideaAgent.getAgentStatus === 'function',
        'Idea agent should have getAgentStatus method');

      this.recordTestResult('Agent Integration', true, 'All agents integrate properly');

    } catch (error) {
      this.recordTestResult('Agent Integration', false, error.message);
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

    console.log('\n🎯 Unified Journal System Test Complete!');
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const test = new UnifiedJournalTest();
  test.runAllTests().catch(console.error);
}

module.exports = UnifiedJournalTest;
