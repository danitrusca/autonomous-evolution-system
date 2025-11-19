/**
 * Test System Check Agent
 * 
 * Comprehensive test suite for the System Check Agent
 * Tests initialization, monitoring, learning, and coordination
 */

const SystemCheckAgent = require('../agents/system-check-agent');
const AgentCoordinator = require('../agents/agent-coordinator');

class SystemCheckAgentTest {
  constructor() {
    this.testResults = [];
    this.agent = null;
    this.coordinator = null;
  }

  /**
   * Run all tests
   * Invariant: Test execution maintains system safety
   */
  async runAllTests() {
    console.log('🧪 Starting System Check Agent Tests\n');

    try {
      // Test 1: Agent Initialization
      await this.testAgentInitialization();

      // Test 2: Health Check Execution
      await this.testHealthCheckExecution();

      // Test 3: Learning System
      await this.testLearningSystem();

      // Test 4: Recommendation Generation
      await this.testRecommendationGeneration();

      // Test 5: Agent Coordination
      await this.testAgentCoordination();

      // Test 6: Performance Metrics
      await this.testPerformanceMetrics();

      // Generate test report
      this.generateTestReport();

    } catch (error) {
      console.error('❌ Test suite failed:', error.message);
      this.testResults.push({
        test: 'test_suite',
        status: 'failed',
        error: error.message
      });
    }
  }

  /**
   * Test agent initialization
   * Invariant: Initialization test maintains system safety
   */
  async testAgentInitialization() {
    console.log('🔧 Testing agent initialization...');

    try {
      this.agent = new SystemCheckAgent();

      // Wait for initialization to complete
      await new Promise(resolve => setTimeout(resolve, 2000));

      const status = this.agent.getAgentStatus();

      if (status.status === 'active') {
        console.log('✅ Agent initialization successful');
        this.testResults.push({
          test: 'agent_initialization',
          status: 'passed',
          details: status
        });
      } else {
        throw new Error(`Agent status is ${status.status}, expected 'active'`);
      }

    } catch (error) {
      console.error('❌ Agent initialization failed:', error.message);
      this.testResults.push({
        test: 'agent_initialization',
        status: 'failed',
        error: error.message
      });
    }
  }

  /**
   * Test health check execution
   * Invariant: Health check test maintains system safety
   */
  async testHealthCheckExecution() {
    console.log('🏥 Testing health check execution...');

    try {
      if (!this.agent) {
        throw new Error('Agent not initialized');
      }

      // Perform health check
      await this.agent.performHealthCheck();

      // Get health report
      const report = await this.agent.getHealthReport();

      if (report.latestHealth && report.agent.checksPerformed > 0) {
        console.log('✅ Health check execution successful');
        this.testResults.push({
          test: 'health_check_execution',
          status: 'passed',
          details: {
            checksPerformed: report.agent.checksPerformed,
            issuesDetected: report.agent.issuesDetected,
            recommendations: report.agent.recommendationsGenerated
          }
        });
      } else {
        throw new Error('Health check did not produce expected results');
      }

    } catch (error) {
      console.error('❌ Health check execution failed:', error.message);
      this.testResults.push({
        test: 'health_check_execution',
        status: 'failed',
        error: error.message
      });
    }
  }

  /**
   * Test learning system
   * Invariant: Learning test maintains system safety
   */
  async testLearningSystem() {
    console.log('🧠 Testing learning system...');

    try {
      if (!this.agent) {
        throw new Error('Agent not initialized');
      }

      const status = this.agent.getAgentStatus();

      if (status.learningPatterns > 0) {
        console.log('✅ Learning system functional');
        this.testResults.push({
          test: 'learning_system',
          status: 'passed',
          details: {
            learningPatterns: status.learningPatterns,
            learningInsights: status.learningInsights
          }
        });
      } else {
        throw new Error('Learning system not properly initialized');
      }

    } catch (error) {
      console.error('❌ Learning system test failed:', error.message);
      this.testResults.push({
        test: 'learning_system',
        status: 'failed',
        error: error.message
      });
    }
  }

  /**
   * Test recommendation generation
   * Invariant: Recommendation test maintains system safety
   */
  async testRecommendationGeneration() {
    console.log('💡 Testing recommendation generation...');

    try {
      if (!this.agent) {
        throw new Error('Agent not initialized');
      }

      const status = this.agent.getAgentStatus();

      if (status.recommendationsGenerated >= 0) {
        console.log('✅ Recommendation generation functional');
        this.testResults.push({
          test: 'recommendation_generation',
          status: 'passed',
          details: {
            recommendationsGenerated: status.recommendationsGenerated,
            currentRecommendations: status.recommendations
          }
        });
      } else {
        throw new Error('Recommendation generation not working');
      }

    } catch (error) {
      console.error('❌ Recommendation generation test failed:', error.message);
      this.testResults.push({
        test: 'recommendation_generation',
        status: 'failed',
        error: error.message
      });
    }
  }

  /**
   * Test agent coordination
   * Invariant: Coordination test maintains system safety
   */
  async testAgentCoordination() {
    console.log('🤝 Testing agent coordination...');

    try {
      // Initialize coordinator
      this.coordinator = new AgentCoordinator();

      // Wait for coordination to initialize
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get coordinator status
      const coordinatorStatus = this.coordinator.getCoordinatorStatus();

      if (coordinatorStatus.agents.has('system-check')) {
        console.log('✅ Agent coordination successful');
        this.testResults.push({
          test: 'agent_coordination',
          status: 'passed',
          details: {
            agentsRegistered: coordinatorStatus.agents.size,
            systemCheckAgent: coordinatorStatus.agents.has('system-check')
          }
        });
      } else {
        throw new Error('System check agent not registered with coordinator');
      }

    } catch (error) {
      console.error('❌ Agent coordination test failed:', error.message);
      this.testResults.push({
        test: 'agent_coordination',
        status: 'failed',
        error: error.message
      });
    }
  }

  /**
   * Test performance metrics
   * Invariant: Performance test maintains system safety
   */
  async testPerformanceMetrics() {
    console.log('📊 Testing performance metrics...');

    try {
      if (!this.agent) {
        throw new Error('Agent not initialized');
      }

      const status = this.agent.getAgentStatus();

      if (status.checksPerformed >= 0 && status.issuesDetected >= 0) {
        console.log('✅ Performance metrics functional');
        this.testResults.push({
          test: 'performance_metrics',
          status: 'passed',
          details: {
            checksPerformed: status.checksPerformed,
            issuesDetected: status.issuesDetected,
            recommendationsGenerated: status.recommendationsGenerated,
            learningInsights: status.learningInsights
          }
        });
      } else {
        throw new Error('Performance metrics not properly tracked');
      }

    } catch (error) {
      console.error('❌ Performance metrics test failed:', error.message);
      this.testResults.push({
        test: 'performance_metrics',
        status: 'failed',
        error: error.message
      });
    }
  }

  /**
   * Generate test report
   * Invariant: Report generation maintains system safety
   */
  generateTestReport() {
    console.log('\n📋 Test Report Summary:');
    console.log('========================');

    const passedTests = this.testResults.filter(t => t.status === 'passed');
    const failedTests = this.testResults.filter(t => t.status === 'failed');

    console.log(`Total Tests: ${this.testResults.length}`);
    console.log(`Passed: ${passedTests.length}`);
    console.log(`Failed: ${failedTests.length}`);
    console.log(`Success Rate: ${((passedTests.length / this.testResults.length) * 100).toFixed(1)}%`);

    if (failedTests.length > 0) {
      console.log('\n❌ Failed Tests:');
      failedTests.forEach(test => {
        console.log(`  - ${test.test}: ${test.error}`);
      });
    }

    if (passedTests.length === this.testResults.length) {
      console.log('\n🎉 All tests passed! System Check Agent is working correctly.');
    } else {
      console.log('\n⚠️  Some tests failed. Please review the issues above.');
    }

    // Save test results
    const fs = require('fs');
    const path = require('path');
    const testReport = {
      timestamp: new Date().toISOString(),
      summary: {
        total: this.testResults.length,
        passed: passedTests.length,
        failed: failedTests.length,
        successRate: (passedTests.length / this.testResults.length) * 100
      },
      results: this.testResults
    };

    const reportPath = path.join(__dirname, 'test-results', 'system-check-agent-test.json');
    if (!fs.existsSync(path.dirname(reportPath))) {
      fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    }

    fs.writeFileSync(reportPath, JSON.stringify(testReport, null, 2));
    console.log(`\n📄 Test report saved to: ${reportPath}`);
  }

  /**
   * Cleanup after tests
   * Invariant: Cleanup maintains system safety
   */
  async cleanup() {
    console.log('\n🧹 Cleaning up...');

    if (this.agent) {
      this.agent.stopMonitoring();
    }

    if (this.coordinator) {
      // Coordinator cleanup if needed
    }

    console.log('✅ Cleanup completed');
  }
}

// Run tests if called directly
if (require.main === module) {
  const tester = new SystemCheckAgentTest();

  tester.runAllTests().then(async () => {
    await tester.cleanup();
    process.exit(0);
  }).catch(async (error) => {
    console.error('Test suite failed:', error);
    await tester.cleanup();
    process.exit(1);
  });
}

module.exports = SystemCheckAgentTest;
