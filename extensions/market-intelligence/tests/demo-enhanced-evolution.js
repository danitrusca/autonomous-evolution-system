/**
 * Demo Enhanced Autonomous Evolution System
 * Demonstrates the complete enhanced autonomous evolution system
 */

const EnhancedAutonomousEvolution = require('../integration/enhanced-autonomous-evolution');

async function demoEnhancedAutonomousEvolution() {
  console.log('🚀 Enhanced Autonomous Evolution System Demo');
  console.log('=' .repeat(80));
  
  try {
    // Initialize the enhanced system
    const enhancedSystem = new EnhancedAutonomousEvolution();
    
    // Run enhanced evolution cycle
    console.log('\n📊 Running Enhanced Evolution Cycle...');
    const evolutionResults = await enhancedSystem.runEnhancedEvolutionCycle();
    
    // Display evolution results
    console.log('\n✅ Enhanced Evolution Results:');
    console.log(`   Integration ID: ${evolutionResults.integration_id}`);
    console.log(`   Timestamp: ${evolutionResults.timestamp}`);
    console.log(`   Market Signals: ${evolutionResults.market_results.signals_collected} collected, ${evolutionResults.market_results.signals_filtered} filtered`);
    console.log(`   Trends Detected: ${evolutionResults.market_results.trends_detected}`);
    console.log(`   Opportunities: ${evolutionResults.market_results.opportunities_identified}`);
    console.log(`   Solutions: ${evolutionResults.market_results.solutions_generated}`);
    console.log(`   Evolution Triggers: ${evolutionResults.evolution_results.triggers_processed}`);
    console.log(`   Evolution Actions: ${evolutionResults.evolution_results.evolution_actions}`);
    
    // Display integration metrics
    console.log('\n📈 Integration Metrics:');
    console.log(`   Market Efficiency: ${(evolutionResults.integration_metrics.market_efficiency * 100).toFixed(1)}%`);
    console.log(`   Evolution Effectiveness: ${(evolutionResults.integration_metrics.evolution_effectiveness * 100).toFixed(1)}%`);
    console.log(`   Integration Success: ${(evolutionResults.integration_metrics.integration_success * 100).toFixed(1)}%`);
    console.log(`   Overall Performance: ${(evolutionResults.integration_metrics.overall_performance * 100).toFixed(1)}%`);
    
    // Get enhanced evolution status
    console.log('\n🔍 Enhanced Evolution Status:');
    const status = enhancedSystem.getEnhancedEvolutionStatus();
    console.log(`   Market Intelligence Running: ${status.market_intelligence_status.isRunning}`);
    console.log(`   Integration Count: ${status.integration_history.total_integrations}`);
    console.log(`   Evolution Triggers: ${status.integration_history.total_triggers}`);
    console.log(`   Market Insights: ${status.integration_history.total_insights}`);
    
    // Generate enhanced evolution report
    console.log('\n📋 Generating Enhanced Evolution Report...');
    const report = await enhancedSystem.generateEnhancedEvolutionReport();
    console.log(`   Report ID: ${report.report_id}`);
    console.log(`   Report Generated: ${report.timestamp}`);
    
    // Display integration analysis
    console.log('\n📊 Integration Analysis:');
    console.log(`   Total Integrations: ${report.integration_analysis.total_integrations}`);
    console.log(`   Total Triggers: ${report.integration_analysis.total_triggers}`);
    console.log(`   Total Insights: ${report.integration_analysis.total_insights}`);
    console.log(`   Integration Effectiveness: ${(report.integration_analysis.integration_effectiveness * 100).toFixed(1)}%`);
    console.log(`   Evolution Impact: ${(report.integration_analysis.evolution_impact * 100).toFixed(1)}%`);
    console.log(`   Market Influence: ${(report.integration_analysis.market_influence * 100).toFixed(1)}%`);
    
    // Display recommendations
    if (report.recommendations.length > 0) {
      console.log('\n💡 Enhanced Recommendations:');
      report.recommendations.forEach((rec, index) => {
        console.log(`   ${index + 1}. ${rec.title} (${rec.priority} priority)`);
        console.log(`      ${rec.description}`);
      });
    }
    
    // Display next actions
    if (report.next_actions.length > 0) {
      console.log('\n🎯 Enhanced Next Actions:');
      report.next_actions.forEach((action, index) => {
        console.log(`   ${index + 1}. ${action.title} (${action.priority} priority)`);
        console.log(`      ${action.description}`);
      });
    }
    
    // Demonstrate continuous evolution
    console.log('\n🔄 Starting Continuous Enhanced Evolution...');
    enhancedSystem.startContinuousEnhancedEvolution(5000); // 5 seconds for demo
    
    // Wait a bit to show continuous evolution
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Stop continuous evolution
    console.log('\n⏹️ Stopping Continuous Enhanced Evolution...');
    enhancedSystem.stopContinuousEnhancedEvolution();
    
    console.log('\n✅ Enhanced Autonomous Evolution System Demo Completed Successfully!');
    console.log('=' .repeat(80));
    
    return evolutionResults;
    
  } catch (error) {
    console.error('\n❌ Enhanced Autonomous Evolution System Demo Failed:');
    console.error(`   Error: ${error.message}`);
    console.error(`   Stack: ${error.stack}`);
    console.log('=' .repeat(80));
    throw error;
  }
}

// Run the demo if this file is executed directly
if (require.main === module) {
  demoEnhancedAutonomousEvolution()
    .then(() => {
      console.log('\n🎉 Demo completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Demo failed:', error.message);
      process.exit(1);
    });
}

module.exports = demoEnhancedAutonomousEvolution;
