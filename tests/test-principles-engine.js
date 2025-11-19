/**
 * Test Principles Engine
 * 
 * Tests the principles engine functionality
 */

const PrinciplesEngine = require('../agents/principles-engine');

class PrinciplesEngineTest {
  constructor() {
    this.testResults = [];
    this.engine = new PrinciplesEngine();
  }

  /**
   * Run all principles engine tests
   */
  async runAllTests() {
    console.log('🧪 Starting Principles Engine Tests\n');

    try {
      // Test 1: Engine Initialization
      await this.testEngineInitialization();

      // Test 2: Principle Loading
      await this.testPrincipleLoading();

      // Test 3: Principle Retrieval
      await this.testPrincipleRetrieval();

      // Test 4: Principle Filtering
      await this.testPrincipleFiltering();

      // Test 5: Principle Suggestions
      await this.testPrincipleSuggestions();

      // Test 6: Statistics
      await this.testStatistics();

      // Display results
      this.displayTestResults();

    } catch (error) {
      console.error('❌ Test suite failed:', error);
    }
  }

  /**
   * Test engine initialization
   */
  async testEngineInitialization() {
    console.log('🔍 Testing Engine Initialization...');

    try {
      this.assert(this.engine !== null, 'Engine should initialize');
      this.assert(typeof this.engine.getPrinciple === 'function', 'Engine should have getPrinciple method');
      this.assert(typeof this.engine.getAllPrinciples === 'function', 'Engine should have getAllPrinciples method');

      this.recordTestResult('Engine Initialization', true, 'Engine initialized successfully');

    } catch (error) {
      this.recordTestResult('Engine Initialization', false, error.message);
    }
  }

  /**
   * Test principle loading
   */
  async testPrincipleLoading() {
    console.log('🔍 Testing Principle Loading...');

    try {
      const allPrinciples = this.engine.getAllPrinciples();
      this.assert(allPrinciples.length > 0, 'Should load principles from journal');

      // Check for specific principles we know should exist
      const principleNames = allPrinciples.map(p => p.name);
      this.assert(principleNames.includes('Simplicity First'), 'Should load Simplicity First principle');
      this.assert(principleNames.includes('Git as Source of Truth'), 'Should load Git as Source of Truth principle');

      this.recordTestResult('Principle Loading', true, `Loaded ${allPrinciples.length} principles`);

    } catch (error) {
      this.recordTestResult('Principle Loading', false, error.message);
    }
  }

  /**
   * Test principle retrieval
   */
  async testPrincipleRetrieval() {
    console.log('🔍 Testing Principle Retrieval...');

    try {
      const principle = this.engine.getPrinciple('Simplicity First');
      this.assert(principle !== null, 'Should retrieve Simplicity First principle');
      this.assert(principle.definition.includes('simplest approach'), 'Should have correct definition');
      this.assert(principle.confidence > 0, 'Should have confidence level');

      const nonExistent = this.engine.getPrinciple('Non Existent Principle');
      this.assert(nonExistent === null, 'Should return null for non-existent principle');

      this.recordTestResult('Principle Retrieval', true, 'Principle retrieval working correctly');

    } catch (error) {
      this.recordTestResult('Principle Retrieval', false, error.message);
    }
  }

  /**
   * Test principle filtering
   */
  async testPrincipleFiltering() {
    console.log('🔍 Testing Principle Filtering...');

    try {
      const highConfidence = this.engine.getPrinciplesByConfidence(0.9);
      this.assert(highConfidence.length > 0, 'Should have high confidence principles');

      const allPrinciples = this.engine.getAllPrinciples();
      this.assert(highConfidence.length <= allPrinciples.length, 'High confidence subset should be smaller or equal');

      const systemPrinciples = this.engine.getPrinciplesForApplication('system');
      this.assert(systemPrinciples.length > 0, 'Should find system-related principles');

      this.recordTestResult('Principle Filtering', true, 'Principle filtering working correctly');

    } catch (error) {
      this.recordTestResult('Principle Filtering', false, error.message);
    }
  }

  /**
   * Test principle suggestions
   */
  async testPrincipleSuggestions() {
    console.log('🔍 Testing Principle Suggestions...');

    try {
      const suggestions = this.engine.suggestPrinciples('simple approach design');
      this.assert(suggestions.length > 0, 'Should provide suggestions for simple approach');

      const simplicitySuggestion = suggestions.find(s => s.principle === 'Simplicity First');
      this.assert(simplicitySuggestion !== undefined, 'Should suggest Simplicity First for simple approach');

      const gitSuggestions = this.engine.suggestPrinciples('data recovery git');
      this.assert(gitSuggestions.length > 0, 'Should provide suggestions for git-related scenario');

      this.recordTestResult('Principle Suggestions', true, 'Principle suggestions working correctly');

    } catch (error) {
      this.recordTestResult('Principle Suggestions', false, error.message);
    }
  }

  /**
   * Test statistics
   */
  async testStatistics() {
    console.log('🔍 Testing Statistics...');

    try {
      const stats = this.engine.getStatistics();
      this.assert(stats.totalPrinciples > 0, 'Should have total principles count');
      this.assert(stats.averageConfidence > 0, 'Should have average confidence');
      this.assert(stats.highConfidencePrinciples >= 0, 'Should have high confidence count');

      this.recordTestResult('Statistics', true, `Statistics: ${stats.totalPrinciples} principles, avg confidence ${stats.averageConfidence.toFixed(2)}`);

    } catch (error) {
      this.recordTestResult('Statistics', false, error.message);
    }
  }

  /**
   * Assert condition and record result
   */
  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  /**
   * Record test result
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

    console.log('\n🎯 Principles Engine Test Complete!');
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const test = new PrinciplesEngineTest();
  test.runAllTests().catch(console.error);
}

module.exports = PrinciplesEngineTest;
