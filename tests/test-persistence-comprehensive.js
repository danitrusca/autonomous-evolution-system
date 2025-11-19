/**
 * Test Persistence Comprehensive
 * Verifies persistence for Patterns, Solution Templates, and Learning Insights
 */

const fs = require('fs');
const path = require('path');
const MetaLearningAgent = require('../agents/meta-learning-agent');

// Setup paths
const DOCS_DIR = path.join(__dirname, 'docs');
const PATTERN_DB_PATH = path.join(DOCS_DIR, 'PATTERN_DATABASE.md');
const TEMPLATES_PATH = path.join(DOCS_DIR, 'SOLUTION_TEMPLATES.md');
const INSIGHTS_PATH = path.join(DOCS_DIR, 'LEARNING_INSIGHTS.md');

// Cleanup function
function cleanup() {
    console.log('Cleaning up test files...');
    [PATTERN_DB_PATH, TEMPLATES_PATH, INSIGHTS_PATH].forEach(file => {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
    });
}

async function runTest() {
    console.log('Starting Comprehensive Persistence Test...');

    // Ensure clean state
    cleanup();
    if (!fs.existsSync(DOCS_DIR)) {
        fs.mkdirSync(DOCS_DIR);
    }

    // 1. Instantiate Agent and Add Data
    console.log('\nStep 1: Instantiating Agent and adding data...');
    const agent1 = new MetaLearningAgent();

    // Add Pattern
    const testPattern = {
        problemType: 'test_problem',
        timestamp: new Date().toISOString(),
        learnableElements: [{ type: 'test', description: 'test element' }],
        successFactors: [],
        failurePoints: [],
        generalizablePrinciples: []
    };
    agent1.updatePatternDatabase(testPattern);

    // Add Template
    const testTemplate = {
        problemType: 'test_problem',
        solutionTemplate: { name: 'Test Template' },
        applicableContexts: [],
        successCriteria: [],
        failureModes: [],
        adaptationPoints: []
    };
    agent1.updateSolutionTemplates(testTemplate);

    // Add Insight
    const testInsight = {
        insight: 'Test Insight',
        description: 'Persistence works',
        confidence: 1.0,
        applicability: 'All'
    };
    agent1.updateLearningInsights([testInsight]);

    console.log('Data added and saved.');

    // 2. Verify Files Exist
    console.log('\nStep 2: Verifying file creation...');
    if (fs.existsSync(PATTERN_DB_PATH)) console.log('✅ Pattern DB created');
    else console.error('❌ Pattern DB missing');

    if (fs.existsSync(TEMPLATES_PATH)) console.log('✅ Templates DB created');
    else console.error('❌ Templates DB missing');

    if (fs.existsSync(INSIGHTS_PATH)) console.log('✅ Insights DB created');
    else console.error('❌ Insights DB missing');

    // 3. Re-instantiate Agent and Verify Data Load
    console.log('\nStep 3: Re-instantiating Agent to verify load...');
    const agent2 = new MetaLearningAgent();

    // Verify Pattern
    const patternKey = `${testPattern.problemType}_${testPattern.timestamp}`;
    if (agent2.patternDatabase.has(patternKey)) {
        console.log('✅ Pattern loaded successfully');
    } else {
        console.error('❌ Pattern failed to load');
    }

    // Verify Template
    if (agent2.solutionTemplates.has('test_problem')) {
        console.log('✅ Template loaded successfully');
    } else {
        console.error('❌ Template failed to load');
    }

    // Verify Insight
    if (agent2.learningInsights.length > 0 && agent2.learningInsights[0].insight === 'Test Insight') {
        console.log('✅ Insight loaded successfully');
    } else {
        console.error('❌ Insight failed to load');
    }

    // Cleanup
    cleanup();
    console.log('\nTest Complete.');
}

runTest().catch(err => console.error('Test failed:', err));
