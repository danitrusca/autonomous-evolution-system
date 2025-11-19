/**
 * Test Script for Idea Capture Agent
 * 
 * Demonstrates the Idea Capture Agent's capabilities for:
 * - Automatic idea capture from various sources
 * - Intelligent categorization and prioritization
 * - Persistent storage and retrieval
 * - Idea analysis and evolution tracking
 */

const IdeaCaptureAgent = require('../agents/idea-capture-agent');

async function testIdeaCaptureAgent() {
  console.log('💡 Testing Idea Capture Agent...\n');

  try {
    // Initialize the agent
    const ideaAgent = new IdeaCaptureAgent();

    // Display agent status
    console.log('📊 Agent Status:');
    console.log(JSON.stringify(ideaAgent.getAgentStatus(), null, 2));
    console.log('\n');

    // Test 1: Capture user ideas
    console.log('🧠 Test 1: Capturing User Ideas...');
    const userIdeas = [
      {
        title: 'AI-Powered Code Review System',
        description: 'Create an AI system that automatically reviews code for quality, security, and best practices',
        content: 'This would help developers catch issues early and maintain high code quality standards.',
        author: 'developer',
        context: 'code_quality_improvement'
      },
      {
        title: 'Autonomous System Health Monitoring',
        description: 'Implement continuous monitoring that automatically detects and fixes system issues',
        content: 'This would prevent downtime and ensure system reliability.',
        author: 'system_admin',
        context: 'reliability_improvement'
      },
      {
        title: 'Smart Documentation Generator',
        description: 'AI-powered system that automatically generates and maintains documentation',
        content: 'This would keep documentation up-to-date and comprehensive.',
        author: 'technical_writer',
        context: 'documentation_automation'
      }
    ];

    for (const ideaData of userIdeas) {
      const capturedIdea = await ideaAgent.captureUserIdea(ideaData.description, {
        author: ideaData.author,
        context: ideaData.context
      });
      console.log(`  ✅ Captured: ${capturedIdea.title} (${capturedIdea.category}, ${capturedIdea.priority})`);
    }

    // Test 2: Capture system analysis ideas
    console.log('\n🔍 Test 2: Capturing System Analysis Ideas...');
    const systemAnalysisIdeas = [
      {
        type: 'performance_bottleneck',
        description: 'Database query optimization needed',
        content: 'Slow queries detected in user authentication system',
        metadata: { query_time: '2.5s', threshold: '1s' }
      },
      {
        type: 'security_vulnerability',
        description: 'Potential XSS vulnerability in user input handling',
        content: 'User input not properly sanitized in comment system',
        metadata: { severity: 'medium', component: 'comment_system' }
      },
      {
        type: 'scalability_issue',
        description: 'Memory usage growing linearly with user count',
        content: 'Need to implement caching and optimization strategies',
        metadata: { current_users: 10000, memory_per_user: '1MB' }
      }
    ];

    for (const analysisData of systemAnalysisIdeas) {
      const capturedIdea = await ideaAgent.captureSystemIdea(analysisData, {
        context: 'system_analysis'
      });
      console.log(`  ✅ Captured: ${capturedIdea.title} (${capturedIdea.category}, ${capturedIdea.priority})`);
    }

    // Test 3: Capture pattern detection ideas
    console.log('\n🔍 Test 3: Capturing Pattern Detection Ideas...');
    const patternIdeas = [
      {
        pattern_name: 'Microservices Communication Pattern',
        description: 'Common pattern for service-to-service communication',
        content: 'Standardized approach for inter-service communication using message queues',
        metadata: { frequency: 'high', complexity: 'medium' }
      },
      {
        pattern_name: 'Error Handling Strategy',
        description: 'Consistent error handling across all services',
        content: 'Standardized error response format and logging strategy',
        metadata: { frequency: 'high', complexity: 'low' }
      }
    ];

    for (const patternData of patternIdeas) {
      const capturedIdea = await ideaAgent.capturePatternIdea(patternData, {
        context: 'pattern_detection'
      });
      console.log(`  ✅ Captured: ${capturedIdea.title} (${capturedIdea.category}, ${capturedIdea.priority})`);
    }

    // Test 4: Capture external signal ideas
    console.log('\n📡 Test 4: Capturing External Signal Ideas...');
    const externalSignalIdeas = [
      {
        signal_type: 'market_trend',
        description: 'AI-powered development tools gaining traction',
        content: 'Market research shows increasing adoption of AI in software development',
        metadata: { source: 'market_research', confidence: 'high' }
      },
      {
        signal_type: 'technology_advancement',
        description: 'New JavaScript features for better performance',
        content: 'Latest JavaScript features offer significant performance improvements',
        metadata: { source: 'tech_news', confidence: 'medium' }
      }
    ];

    for (const signalData of externalSignalIdeas) {
      const capturedIdea = await ideaAgent.captureExternalIdea(signalData, {
        context: 'external_signal'
      });
      console.log(`  ✅ Captured: ${capturedIdea.title} (${capturedIdea.category}, ${capturedIdea.priority})`);
    }

    // Test 5: Search and retrieve ideas
    console.log('\n🔍 Test 5: Searching and Retrieving Ideas...');

    // Search by category
    const systemIdeas = await ideaAgent.searchIdeas('', { category: 'system_evolution' });
    console.log(`  📊 System Evolution Ideas: ${systemIdeas.length}`);

    // Search by priority
    const highPriorityIdeas = await ideaAgent.searchIdeas('', { priority: 'high' });
    console.log(`  🔥 High Priority Ideas: ${highPriorityIdeas.length}`);

    // Search by text
    const aiIdeas = await ideaAgent.searchIdeas('AI');
    console.log(`  🤖 AI-related Ideas: ${aiIdeas.length}`);

    // Search by tags
    const optimizationIdeas = await ideaAgent.searchIdeas('', { tags: ['optimization'] });
    console.log(`  ⚡ Optimization Ideas: ${optimizationIdeas.length}`);

    // Test 6: Generate comprehensive report
    console.log('\n📊 Test 6: Generating Idea Capture Report...');
    const report = await ideaAgent.generateIdeaReport();

    console.log('\n📈 Idea Capture Report:');
    console.log(`- Total Ideas: ${report.total_ideas}`);
    console.log(`- Categories: ${Object.keys(report.categories).length}`);
    console.log(`- Priorities: ${Object.keys(report.priorities).length}`);
    console.log(`- Sources: ${Object.keys(report.sources).length}`);

    console.log('\n📊 Ideas by Category:');
    for (const [category, count] of Object.entries(report.categories)) {
      console.log(`  - ${category}: ${count}`);
    }

    console.log('\n🔥 Ideas by Priority:');
    for (const [priority, count] of Object.entries(report.priorities)) {
      console.log(`  - ${priority}: ${count}`);
    }

    console.log('\n📡 Ideas by Source:');
    for (const [source, count] of Object.entries(report.sources)) {
      console.log(`  - ${source}: ${count}`);
    }

    console.log('\n🏷️ Top Tags:');
    report.top_tags.forEach(({ tag, count }) => {
      console.log(`  - ${tag}: ${count}`);
    });

    console.log('\n🚀 Evolution Potential:');
    console.log(`  - High: ${report.evolution_potential.high}`);
    console.log(`  - Medium: ${report.evolution_potential.medium}`);
    console.log(`  - Low: ${report.evolution_potential.low}`);

    // Test 7: Display recent ideas
    console.log('\n🕒 Recent Ideas:');
    report.recent_ideas.slice(0, 5).forEach((idea, index) => {
      console.log(`  ${index + 1}. ${idea.title}`);
      console.log(`     Category: ${idea.category}, Priority: ${idea.priority}`);
      console.log(`     Tags: ${idea.tags.join(', ')}`);
      console.log(`     Source: ${idea.source}`);
    });

    console.log('\n✅ Idea Capture Agent test completed successfully!');
    console.log('\n🎯 Key Capabilities Demonstrated:');
    console.log('- Automatic idea capture from multiple sources');
    console.log('- Intelligent categorization and prioritization');
    console.log('- Persistent storage and retrieval');
    console.log('- Advanced search and filtering');
    console.log('- Idea analysis and evolution tracking');
    console.log('- Comprehensive reporting and analytics');

    console.log('\n🔮 System Benefits:');
    console.log('- Prevents loss of valuable ideas and insights');
    console.log('- Enables continuous innovation and improvement');
    console.log('- Provides organized knowledge management');
    console.log('- Supports data-driven decision making');
    console.log('- Facilitates idea evolution and development');

  } catch (error) {
    console.error('❌ Error testing Idea Capture Agent:', error.message);
    console.error(error.stack);
  }
}

// Run the test
if (require.main === module) {
  testIdeaCaptureAgent();
}

module.exports = testIdeaCaptureAgent;
