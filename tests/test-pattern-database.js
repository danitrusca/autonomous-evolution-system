const fs = require('fs');
const path = require('path');
const MetaLearningAgent = require('../agents/meta-learning-agent');

const patternDatabasePath = path.join(__dirname, 'docs', 'PATTERN_DATABASE.md');

function assertInvariant(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function runPatternPersistenceTest() {
    const baselineContent = fs.existsSync(patternDatabasePath)
        ? fs.readFileSync(patternDatabasePath, 'utf8')
        : null;

    try {
        if (fs.existsSync(patternDatabasePath)) {
            fs.unlinkSync(patternDatabasePath);
        }

        const agent = new MetaLearningAgent();
        assertInvariant(agent.patternDatabase.size === 0, 'Pattern database should start empty when file is missing');

        const analysis = {
            problemType: 'unit-test-pattern',
            timestamp: new Date().toISOString(),
            context: { success: true },
            solutionPattern: {
                steps: [{ name: 'Demo Step', description: 'Demonstrate persistence' }],
                decisions: [],
                tools: [],
                errorHandling: [],
                systematic: true,
                adaptive: false,
                verification: true,
                rollback: true,
                complexity: 0.3
            },
            learnableElements: [],
            successFactors: [],
            failurePoints: [],
            generalizablePrinciples: []
        };

        const expectedKey = `${analysis.problemType}_${analysis.timestamp}`;
        agent.updatePatternDatabase(analysis);

        assertInvariant(agent.patternDatabase.has(expectedKey), 'Pattern should be recorded before reload');

        const reloadedAgent = new MetaLearningAgent();
        assertInvariant(reloadedAgent.patternDatabase.has(expectedKey), 'Pattern should persist after reload');
        assertInvariant(
            reloadedAgent.patternDatabase.size >= 1,
            'Reloaded pattern database should contain at least the saved entry'
        );

        console.log('[metaLearning.patterns test] persistence.ok');
    } finally {
        if (baselineContent !== null) {
            fs.writeFileSync(patternDatabasePath, baselineContent, 'utf8');
        } else if (fs.existsSync(patternDatabasePath)) {
            fs.unlinkSync(patternDatabasePath);
        }
    }
}

if (require.main === module) {
    try {
        runPatternPersistenceTest();
        process.exit(0);
    } catch (error) {
        console.error('[metaLearning.patterns test] persistence.fail', error);
        process.exit(1);
    }
}

module.exports = runPatternPersistenceTest;

