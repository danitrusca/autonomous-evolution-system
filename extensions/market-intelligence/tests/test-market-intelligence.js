/**
 * Test Market Intelligence System
 * Demonstrates the complete market intelligence pipeline
 */

const MarketIntelligenceOrchestrator = require('../components/market-intelligence-orchestrator');

async function testMarketIntelligenceSystem() {
  console.log('🚀 Starting Market Intelligence System Test');
  console.log('=' .repeat(60));
  
  try {
    // Initialize the orchestrator
    const orchestrator = new MarketIntelligenceOrchestrator();
    
    // Run the complete pipeline
    console.log('\n📊 Running Market Intelligence Pipeline...');
    const results = await orchestrator.runMarketIntelligencePipeline();
    
    // Display results
    console.log('\n✅ Pipeline Results:');
    console.log(`   Run ID: ${results.runId}`);
    console.log(`   Duration: ${results.duration}ms`);
    console.log(`   Signals Collected: ${results.results.signals_collected}`);
    console.log(`   Signals Filtered: ${results.results.signals_filtered}`);
    console.log(`   Trends Detected: ${results.results.trends_detected}`);
    console.log(`   Opportunities: ${results.results.opportunities_identified}`);
    console.log(`   Solutions: ${results.results.solutions_generated}`);
    console.log(`   Digest: ${results.results.digest_generated}`);
    
    // Display performance metrics
    console.log('\n📈 Performance Metrics:');
    console.log(`   Signal Processing: ${(results.performance.signal_processing.filter_rate * 100).toFixed(1)}% filter rate`);
    console.log(`   Trend Detection: ${results.performance.trend_detection.trends_detected} trends, ${(results.performance.trend_detection.momentum_score * 100).toFixed(1)}% momentum`);
    console.log(`   Market Intelligence: ${results.performance.market_intelligence.opportunities} opportunities, ${results.performance.market_intelligence.solutions} solutions`);
    console.log(`   Digest Generation: ${results.performance.digest_generation.sections} sections, ${results.performance.digest_generation.words} words`);
    console.log(`   Overall Efficiency: ${(results.performance.overall.efficiency_score * 100).toFixed(1)}%`);
    
    // Get orchestrator status
    console.log('\n🔍 System Status:');
    const status = orchestrator.getOrchestratorStatus();
    console.log(`   Running: ${status.isRunning}`);
    console.log(`   Run Count: ${status.runCount}`);
    console.log(`   Last Run: ${status.lastRun ? status.lastRun.timestamp : 'None'}`);
    
    // Generate comprehensive report
    console.log('\n📋 Generating Comprehensive Report...');
    const report = await orchestrator.generateComprehensiveReport();
    console.log(`   Report ID: ${report.report_id}`);
    console.log(`   Report Generated: ${report.timestamp}`);
    
    // Display system recommendations
    if (report.recommendations.length > 0) {
      console.log('\n💡 System Recommendations:');
      report.recommendations.forEach((rec, index) => {
        console.log(`   ${index + 1}. ${rec.title} (${rec.priority} priority)`);
        console.log(`      ${rec.description}`);
      });
    }
    
    // Display next actions
    if (report.next_actions.length > 0) {
      console.log('\n🎯 Next Actions:');
      report.next_actions.forEach((action, index) => {
        console.log(`   ${index + 1}. ${action.title} (${action.priority} priority)`);
        console.log(`      ${action.description}`);
      });
    }
    
    console.log('\n✅ Market Intelligence System Test Completed Successfully!');
    console.log('=' .repeat(60));
    
    return results;
    
  } catch (error) {
    console.error('\n❌ Market Intelligence System Test Failed:');
    console.error(`   Error: ${error.message}`);
    console.error(`   Stack: ${error.stack}`);
    console.log('=' .repeat(60));
    throw error;
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testMarketIntelligenceSystem()
    .then(() => {
      console.log('\n🎉 Test completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Test failed:', error.message);
      process.exit(1);
    });
}

module.exports = testMarketIntelligenceSystem;
