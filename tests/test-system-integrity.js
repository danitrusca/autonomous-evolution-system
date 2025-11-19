/**
 * Test Script for System Integrity Agent
 * 
 * Demonstrates the System Integrity Agent's capabilities for:
 * - Complexity creep detection
 * - System optimization scanning
 * - Architectural debt identification
 * - Performance bottleneck detection
 * - Code quality analysis
 */

const SystemIntegrityAgent = require('../agents/system-integrity-agent');

async function testSystemIntegrityAgent() {
  console.log('🔍 Testing System Integrity Agent...\n');

  try {
    // Initialize the agent
    const integrityAgent = new SystemIntegrityAgent();

    // Display agent status
    console.log('📊 Agent Status:');
    console.log(JSON.stringify(integrityAgent.getMonitoringStatus(), null, 2));
    console.log('\n');

    // Perform comprehensive system scan
    console.log('🔍 Performing comprehensive system scan...');
    const scanResults = await integrityAgent.performSystemScan();

    // Display scan results summary
    console.log('\n📈 Scan Results Summary:');
    console.log(`- Complexity Issues: ${scanResults.complexity_issues.length}`);
    console.log(`- Optimization Opportunities: ${scanResults.optimization_opportunities.length}`);
    console.log(`- Architectural Debt: ${scanResults.architectural_debt.length}`);
    console.log(`- Performance Bottlenecks: ${scanResults.performance_bottlenecks.length}`);
    console.log(`- Code Quality Issues: ${scanResults.code_quality_issues.length}`);
    console.log(`- Recommendations: ${scanResults.recommendations.length}`);

    // Display detailed results
    if (scanResults.complexity_issues.length > 0) {
      console.log('\n🚨 Complexity Issues Found:');
      scanResults.complexity_issues.forEach((issue, index) => {
        console.log(`  ${index + 1}. ${issue.file}`);
        console.log(`     Issues: ${issue.issues.length}, Severity: ${issue.severity}`);
        issue.issues.forEach(problem => {
          console.log(`     - ${problem.type}: ${problem.metric} (threshold: ${problem.threshold})`);
        });
      });
    }

    if (scanResults.optimization_opportunities.length > 0) {
      console.log('\n⚡ Optimization Opportunities:');
      scanResults.optimization_opportunities.forEach((opt, index) => {
        console.log(`  ${index + 1}. ${opt.file}`);
        opt.optimizations.forEach(optimization => {
          console.log(`     - ${optimization.type}: ${optimization.description}`);
        });
      });
    }

    if (scanResults.performance_bottlenecks.length > 0) {
      console.log('\n🐌 Performance Bottlenecks:');
      scanResults.performance_bottlenecks.forEach((bottleneck, index) => {
        console.log(`  ${index + 1}. ${bottleneck.file}`);
        console.log(`     Type: ${bottleneck.type}, Severity: ${bottleneck.severity}`);
        console.log(`     Recommendation: ${bottleneck.recommendation}`);
      });
    }

    if (scanResults.code_quality_issues.length > 0) {
      console.log('\n📝 Code Quality Issues:');
      scanResults.code_quality_issues.forEach((issue, index) => {
        console.log(`  ${index + 1}. ${issue.file}`);
        console.log(`     Type: ${issue.type}, Severity: ${issue.severity}`);
        console.log(`     Recommendation: ${issue.recommendation}`);
      });
    }

    // Display recommendations
    if (scanResults.recommendations.length > 0) {
      console.log('\n💡 Actionable Recommendations:');
      scanResults.recommendations.forEach((rec, index) => {
        console.log(`  ${index + 1}. ${rec.category.toUpperCase()} (Priority: ${rec.priority})`);
        console.log(`     Description: ${rec.description}`);
        console.log(`     Actions:`);
        rec.actions.forEach(action => {
          console.log(`       - ${action}`);
        });
        if (rec.affected_files) {
          console.log(`     Affected Files: ${rec.affected_files.length}`);
        }
        if (rec.affected_areas) {
          console.log(`     Affected Areas: ${rec.affected_areas.join(', ')}`);
        }
      });
    }

    // Generate monitoring report
    console.log('\n📊 Generating monitoring report...');
    const report = await integrityAgent.generateMonitoringReport();
    console.log('\n📋 Monitoring Report:');
    console.log(JSON.stringify(report, null, 2));

    console.log('\n✅ System Integrity Agent test completed successfully!');
    console.log('\n🎯 Key Benefits:');
    console.log('- Continuous monitoring for complexity creep');
    console.log('- Automatic optimization opportunity detection');
    console.log('- Architectural debt identification');
    console.log('- Performance bottleneck detection');
    console.log('- Actionable recommendations generation');
    console.log('- Historical monitoring data tracking');

  } catch (error) {
    console.error('❌ Error testing System Integrity Agent:', error.message);
    console.error(error.stack);
  }
}

// Run the test
if (require.main === module) {
  testSystemIntegrityAgent();
}

module.exports = testSystemIntegrityAgent;
