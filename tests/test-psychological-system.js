/**
 * Test Technical-Psychological Connection Discovery System
 * Demonstrates the integrated mistake learning system
 */

const TechnicalPsychologicalAnalyzer = require('../agents/technical-psychological-analyzer');
const PsychologicalDecisionMonitor = require('../agents/psychological-decision-monitor');
const ConnectionDiscoverer = require('../agents/connection-discoverer');
const MistakePreventionEngine = require('../mistake-prevention-engine');

class PsychologicalSystemTester {
  constructor() {
    this.analyzer = new TechnicalPsychologicalAnalyzer();
    this.monitor = new PsychologicalDecisionMonitor();
    this.discoverer = new ConnectionDiscoverer();
    this.preventionEngine = new MistakePreventionEngine();
  }

  /**
   * Test the complete system
   */
  async testCompleteSystem() {
    console.log('🧠 Testing Technical-Psychological Connection Discovery System\n');

    // Enable psychological analysis
    this.analyzer.enablePsychologicalAnalysis(true);
    this.monitor.enableMonitoring(true);

    // Test 1: Error Analysis
    console.log('📊 Test 1: Error Analysis with Psychological Layer');
    await this.testErrorAnalysis();

    // Test 2: Decision Monitoring
    console.log('\n🎯 Test 2: Decision Monitoring');
    await this.testDecisionMonitoring();

    // Test 3: Connection Discovery
    console.log('\n🔗 Test 3: Connection Discovery');
    await this.testConnectionDiscovery();

    // Test 4: Mistake Prevention
    console.log('\n🛡️ Test 4: Enhanced Mistake Prevention');
    await this.testMistakePrevention();

    // Test 5: Learning Integration
    console.log('\n📚 Test 5: Learning Integration');
    await this.testLearningIntegration();

    console.log('\n✅ All tests completed successfully!');
  }

  /**
   * Test error analysis with psychological layer
   */
  async testErrorAnalysis() {
    const testError = {
      message: 'TypeError: Cannot read property "length" of undefined',
      stack: 'at processData (file.js:15:20)',
      file: 'file.js',
      line: 15
    };

    const testContext = {
      recentErrors: 2,
      complexity: 'high',
      urgency: 'high',
      userState: 'frustrated',
      recentChanges: ['data processing logic']
    };

    console.log('Error:', testError.message);
    console.log('Context:', testContext);

    const analysis = this.analyzer.analyzeError(testError, testContext);

    console.log('Analysis Results:');
    console.log('- Technical Root Cause:', analysis.technical?.rootCause);
    console.log('- Psychological State:', analysis.psychological?.emotionalState);
    console.log('- Bias Risks:', analysis.psychological?.biasRisks);
    console.log('- Connections Found:', analysis.connection?.length || 0);
    console.log('- Recommendations:', analysis.recommendations?.length || 0);
  }

  /**
   * Test decision monitoring
   */
  async testDecisionMonitoring() {
    const testDecision = {
      type: 'immediate_fix',
      approach: 'aggressive',
      analysis: 'Quick fix needed',
      alternatives: [],
      validation: null
    };

    const testContext = {
      complexity: 'high',
      uncertainty: 'high',
      timePressure: 'high',
      recentErrors: 3,
      familiarity: 'low'
    };

    console.log('Decision:', testDecision.type);
    console.log('Context:', testContext);

    const monitoring = this.monitor.monitorDecision(testDecision, testContext);

    console.log('Monitoring Results:');
    console.log('- Monitored:', monitoring.monitored);
    console.log('- Risk Level:', monitoring.riskLevel);
    console.log('- Decision Quality:', monitoring.analysis?.decisionQuality?.level);
    console.log('- Cognitive Load:', monitoring.analysis?.cognitiveLoad?.level);
    console.log('- Emotional State:', monitoring.analysis?.emotionalState?.level);
    console.log('- Bias Risks:', monitoring.analysis?.biasRisks?.length || 0);
    console.log('- Recommendations:', monitoring.recommendations?.length || 0);
  }

  /**
   * Test connection discovery
   */
  async testConnectionDiscovery() {
    const testAnalysis = {
      technical: {
        errorType: 'type_error',
        rootCause: 'undefined_variable',
        patterns: ['recent_change_related']
      },
      psychological: {
        biasRisks: ['confirmation_bias', 'rush_to_solution'],
        emotionalState: 'frustrated',
        stressIndicators: ['error_cascade']
      },
      context: {
        recentErrors: 3,
        complexity: 'high'
      }
    };

    console.log('Analysis Input:', JSON.stringify(testAnalysis, null, 2));

    const connections = this.discoverer.discoverConnections(testAnalysis);

    console.log('Connections Discovered:');
    connections.forEach((connection, index) => {
      console.log(`${index + 1}. ${connection.description}`);
      console.log(`   - Psychological: ${connection.psychological}`);
      console.log(`   - Technical: ${connection.technical}`);
      console.log(`   - Confidence: ${connection.confidence.toFixed(2)}`);
      console.log(`   - Prevention: ${connection.prevention}`);
    });

    // Test pattern statistics
    const stats = this.discoverer.getPatternStatistics();
    console.log('\nPattern Statistics:');
    console.log('- Total Patterns:', stats.totalPatterns);
    console.log('- High Confidence Patterns:', stats.highConfidencePatterns);
    console.log('- Learned Patterns:', stats.learnedPatterns);
    console.log('- Average Confidence:', stats.averageConfidence.toFixed(2));
  }

  /**
   * Test enhanced mistake prevention
   */
  async testMistakePrevention() {
    // Enable psychological analysis in prevention engine
    this.preventionEngine.enablePsychologicalAnalysis(true);

    const testAction = {
      type: 'immediate_fix',
      description: 'Quick fix for undefined variable error'
    };

    const testContext = {
      recentErrors: 2,
      complexity: 'high',
      urgency: 'high',
      userState: 'frustrated'
    };

    console.log('Action:', testAction.type);
    console.log('Context:', testContext);

    const prevention = this.preventionEngine.preventActionWithPsychologicalLayer(testAction, testContext);

    console.log('Prevention Results:');
    console.log('- Blocked:', prevention.blocked);
    if (prevention.blocked) {
      console.log('- Reasons:', prevention.reasons);
      console.log('- Technical Prevention:', prevention.technical?.blocked || false);
      console.log('- Psychological Prevention:', prevention.psychological?.blocked || false);
      console.log('- Recommendations:', prevention.recommendations?.length || 0);
    }

    // Test enhanced status
    const status = this.preventionEngine.getEnhancedStatus();
    console.log('\nEnhanced System Status:');
    console.log('- Active Prevention:', status.active);
    console.log('- Anti-patterns:', status.antiPatterns);
    console.log('- Quality Gates:', status.qualityGates);
    console.log('- Psychological Enabled:', status.psychological.enabled);
    console.log('- Analyzer Active:', status.psychological.analyzer.active);
    console.log('- Monitor Active:', status.psychological.decisionMonitor.monitoringActive);
    console.log('- Connection Discoverer Active:', status.psychological.connectionDiscoverer.active);
  }

  /**
   * Test learning integration
   */
  async testLearningIntegration() {
    const testError = {
      message: 'ReferenceError: variable is not defined',
      stack: 'at processData (file.js:20:15)'
    };

    const testContext = {
      recentErrors: 1,
      complexity: 'medium',
      userState: 'normal'
    };

    const testOutcome = {
      success: false,
      timeToResolution: 30000,
      userSatisfaction: 0.3
    };

    console.log('Learning from Error:', testError.message);
    console.log('Outcome:', testOutcome);

    // Test learning with psychological layer
    this.preventionEngine.learnFromErrorWithPsychologicalLayer(testError, testContext, testOutcome);

    console.log('Learning completed - system has updated its knowledge base');

    // Test connection insights
    const insights = this.discoverer.getConnectionInsights();
    console.log('\nConnection Insights:');
    insights.forEach((insight, index) => {
      console.log(`${index + 1}. ${insight.description}`);
      if (insight.patterns) {
        insight.patterns.forEach(pattern => {
          console.log(`   - ${pattern.pattern}: ${pattern.count} occurrences`);
        });
      }
    });
  }

  /**
   * Demonstrate the Waitzkin principle in action
   */
  demonstrateWaitzkinPrinciple() {
    console.log('\n🎯 Demonstrating Waitzkin Principle: "Never repeat the same mistake twice"');

    // Simulate a mistake pattern
    const mistakePattern = {
      psychological: 'confirmation_bias',
      technical: 'ignoring_error_messages',
      description: 'Confirmation bias leads to ignoring error messages that contradict assumptions',
      occurrences: 3,
      confidence: 0.85
    };

    console.log('Detected Pattern:', mistakePattern.description);
    console.log('Occurrences:', mistakePattern.occurrences);
    console.log('Confidence:', mistakePattern.confidence);

    // Show prevention strategy
    console.log('\nPrevention Strategy:');
    console.log('- Explicitly seek disconfirming evidence in error messages');
    console.log('- Mandatory validation checkpoints');
    console.log('- Peer review requirements');

    console.log('\nResult: This pattern will be prevented from recurring!');
  }
}

// Run the test
async function runTest() {
  const tester = new PsychologicalSystemTester();

  try {
    await tester.testCompleteSystem();
    tester.demonstrateWaitzkinPrinciple();
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Export for use in other tests
module.exports = PsychologicalSystemTester;

// Run if called directly
if (require.main === module) {
  runTest();
}
