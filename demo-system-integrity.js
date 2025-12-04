/**
 * Demo Script for System Integrity Agent
 * 
 * Demonstrates the complete System Integrity Agent integration with
 * the Autonomous Evolution System for continuous monitoring and optimization.
 */

const AutonomousEvolutionEngine = require('./autonomous-evolution-engine');

async function demonstrateSystemIntegrity() {
  console.log('🔍 System Integrity Agent Demo');
  console.log('================================\n');
  
  try {
    // Initialize the autonomous evolution engine with system integrity
    console.log('🚀 Initializing Autonomous Evolution Engine with System Integrity Agent...');
    const evolutionEngine = new AutonomousEvolutionEngine();
    
    // Initialize extensions
    await evolutionEngine.initializeExtensions();
    
    // Display system integrity status
    console.log('\n📊 System Integrity Status:');
    const integrityStatus = evolutionEngine.getSystemIntegrityStatus();
    console.log(JSON.stringify(integrityStatus, null, 2));
    
    // Perform comprehensive system integrity scan
    console.log('\n🔍 Performing comprehensive system integrity scan...');
    const scanResults = await evolutionEngine.performSystemIntegrityScan();
    
    // Display scan results
    console.log('\n📈 System Integrity Scan Results:');
    console.log(`- Complexity Issues: ${scanResults.complexity_issues.length}`);
    console.log(`- Optimization Opportunities: ${scanResults.optimization_opportunities.length}`);
    console.log(`- Architectural Debt: ${scanResults.architectural_debt.length}`);
    console.log(`- Performance Bottlenecks: ${scanResults.performance_bottlenecks.length}`);
    console.log(`- Code Quality Issues: ${scanResults.code_quality_issues.length}`);
    console.log(`- Recommendations: ${scanResults.recommendations.length}`);
    
    // Display detailed findings
    if (scanResults.complexity_issues.length > 0) {
      console.log('\n🚨 Complexity Issues Detected:');
      scanResults.complexity_issues.slice(0, 3).forEach((issue, index) => {
        console.log(`  ${index + 1}. ${issue.file}`);
        console.log(`     Severity: ${issue.severity}`);
        console.log(`     Issues: ${issue.issues.length}`);
        issue.issues.slice(0, 2).forEach(problem => {
          console.log(`       - ${problem.type}: ${problem.metric} (threshold: ${problem.threshold})`);
        });
      });
      if (scanResults.complexity_issues.length > 3) {
        console.log(`     ... and ${scanResults.complexity_issues.length - 3} more`);
      }
    }
    
    if (scanResults.optimization_opportunities.length > 0) {
      console.log('\n⚡ Optimization Opportunities:');
      scanResults.optimization_opportunities.slice(0, 3).forEach((opt, index) => {
        console.log(`  ${index + 1}. ${opt.file}`);
        opt.optimizations.slice(0, 2).forEach(optimization => {
          console.log(`       - ${optimization.type}: ${optimization.description}`);
        });
      });
      if (scanResults.optimization_opportunities.length > 3) {
        console.log(`     ... and ${scanResults.optimization_opportunities.length - 3} more`);
      }
    }
    
    if (scanResults.performance_bottlenecks.length > 0) {
      console.log('\n🐌 Performance Bottlenecks:');
      scanResults.performance_bottlenecks.slice(0, 3).forEach((bottleneck, index) => {
        console.log(`  ${index + 1}. ${bottleneck.file}`);
        console.log(`       Type: ${bottleneck.type}`);
        console.log(`       Severity: ${bottleneck.severity}`);
        console.log(`       Recommendation: ${bottleneck.recommendation}`);
      });
      if (scanResults.performance_bottlenecks.length > 3) {
        console.log(`     ... and ${scanResults.performance_bottlenecks.length - 3} more`);
      }
    }
    
    // Display actionable recommendations
    if (scanResults.recommendations.length > 0) {
      console.log('\n💡 Actionable Recommendations:');
      scanResults.recommendations.forEach((rec, index) => {
        console.log(`  ${index + 1}. ${rec.category.toUpperCase()} (Priority: ${rec.priority})`);
        console.log(`     Description: ${rec.description}`);
        console.log(`     Actions:`);
        rec.actions.slice(0, 3).forEach(action => {
          console.log(`       - ${action}`);
        });
        if (rec.actions.length > 3) {
          console.log(`       ... and ${rec.actions.length - 3} more actions`);
        }
        if (rec.affected_files) {
          console.log(`     Affected Files: ${rec.affected_files.length}`);
        }
        if (rec.affected_areas) {
          console.log(`     Affected Areas: ${rec.affected_areas.join(', ')}`);
        }
      });
    }
    
    // Generate comprehensive system integrity report
    console.log('\n📋 Generating comprehensive system integrity report...');
    const integrityReport = await evolutionEngine.generateSystemIntegrityReport();
    
    console.log('\n📊 System Integrity Report:');
    console.log(`- Total Issues: ${integrityReport.summary.total_issues}`);
    console.log(`- Complexity Issues: ${integrityReport.summary.complexity_issues}`);
    console.log(`- Optimization Opportunities: ${integrityReport.summary.optimization_opportunities}`);
    console.log(`- Architectural Debt: ${integrityReport.summary.architectural_debt}`);
    console.log(`- Performance Bottlenecks: ${integrityReport.summary.performance_bottlenecks}`);
    console.log(`- Code Quality Issues: ${integrityReport.summary.code_quality_issues}`);
    console.log(`- Monitoring History: ${integrityReport.monitoring_history} scans`);
    
    // Demonstrate autonomous evolution integration
    console.log('\n🔄 Demonstrating autonomous evolution integration...');
    
    // Trigger autonomous evolution with system integrity insights
    console.log('🎯 Triggering autonomous evolution with system integrity insights...');
    const evolutionResults = await evolutionEngine.triggerAutonomousEvolution();
    
    console.log('\n🧠 Evolution Results:');
    console.log(`- Evolution Questions Asked: ${evolutionResults.evolution_questions ? evolutionResults.evolution_questions.length : 0}`);
    console.log(`- Patterns Detected: ${evolutionResults.patterns_detected ? evolutionResults.patterns_detected.length : 0}`);
    console.log(`- Evolution Actions: ${evolutionResults.evolution_actions ? evolutionResults.evolution_actions.length : 0}`);
    console.log(`- Learning Insights: ${evolutionResults.learning_insights ? evolutionResults.learning_insights.length : 0}`);
    
    // Display evolution insights
    if (evolutionResults.learning_insights && evolutionResults.learning_insights.length > 0) {
      console.log('\n💡 Key Learning Insights:');
      evolutionResults.learning_insights.slice(0, 3).forEach((insight, index) => {
        console.log(`  ${index + 1}. ${insight.insight}`);
        console.log(`     Confidence: ${insight.confidence}`);
        console.log(`     Impact: ${insight.impact}`);
      });
    }
    
    // Display evolution actions
    if (evolutionResults.evolution_actions && evolutionResults.evolution_actions.length > 0) {
      console.log('\n🚀 Evolution Actions:');
      evolutionResults.evolution_actions.slice(0, 3).forEach((action, index) => {
        console.log(`  ${index + 1}. ${action.action}`);
        console.log(`     Priority: ${action.priority}`);
        console.log(`     Impact: ${action.impact}`);
      });
    }
    
    console.log('\n✅ System Integrity Agent Demo Completed Successfully!');
    console.log('\n🎯 Key Capabilities Demonstrated:');
    console.log('- Continuous complexity creep monitoring');
    console.log('- Automatic optimization opportunity detection');
    console.log('- Architectural debt identification');
    console.log('- Performance bottleneck detection');
    console.log('- Code quality analysis');
    console.log('- Actionable recommendation generation');
    console.log('- Integration with autonomous evolution system');
    console.log('- Historical monitoring data tracking');
    console.log('- Autonomous system improvement triggers');
    
    console.log('\n🔮 System Benefits:');
    console.log('- Prevents complexity creep before it becomes unmanageable');
    console.log('- Continuously identifies optimization opportunities');
    console.log('- Maintains system architectural integrity');
    console.log('- Ensures optimal performance');
    console.log('- Drives autonomous system evolution');
    console.log('- Provides actionable insights for improvement');
    
  } catch (error) {
    console.error('❌ Error in System Integrity Agent demo:', error.message);
    console.error(error.stack);
  }
}

// Run the demo
if (require.main === module) {
  demonstrateSystemIntegrity();
}

module.exports = demonstrateSystemIntegrity;
