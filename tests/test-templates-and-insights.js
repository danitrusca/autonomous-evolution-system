const fs = require('fs');
const path = require('path');
const MetaLearningAgent = require('../agents/meta-learning-agent');

const templatesPath = path.join(__dirname, 'docs', 'SOLUTION_TEMPLATES.md');
const insightsPath = path.join(__dirname, 'docs', 'LEARNING_INSIGHTS.md');

function assertInvariant(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function backupFile(filePath) {
    return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : null;
}

function restoreFile(filePath, baselineContent) {
    if (baselineContent !== null) {
        fs.writeFileSync(filePath, baselineContent, 'utf8');
    } else if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}

function runTemplatesAndInsightsPersistenceTest() {
    const baselineTemplates = backupFile(templatesPath);
    const baselineInsights = backupFile(insightsPath);

    try {
        if (fs.existsSync(templatesPath)) fs.unlinkSync(templatesPath);
        if (fs.existsSync(insightsPath)) fs.unlinkSync(insightsPath);

        const agent = new MetaLearningAgent();

        assertInvariant(agent.solutionTemplates.size === 0, 'Solution templates should start empty when file is missing');
        assertInvariant(agent.learningInsights.length === 0, 'Learning insights should start empty when file is missing');

        const generalization = {
            problemType: 'unit-test-template',
            solutionTemplate: { name: 'Unit Test Template' },
            applicableContexts: [],
            successCriteria: [],
            failureModes: [],
            adaptationPoints: []
        };

        const metaInsights = [
            {
                insight: 'Test Insight',
                description: 'Verifies learningInsights persistence',
                confidence: 1,
                applicability: 'tests'
            }
        ];

        agent.updateSolutionTemplates(generalization);
        agent.updateLearningInsights(metaInsights);

        const reloaded = new MetaLearningAgent();

        assertInvariant(
            reloaded.solutionTemplates.has('unit-test-template'),
            'Solution templates should persist after reload'
        );

        assertInvariant(
            reloaded.learningInsights.some(i => i.insight === 'Test Insight'),
            'Learning insights should persist after reload'
        );

        console.log('[metaLearning.templates+insights test] persistence.ok');
    } finally {
        restoreFile(templatesPath, baselineTemplates);
        restoreFile(insightsPath, baselineInsights);
    }
}

if (require.main === module) {
    try {
        runTemplatesAndInsightsPersistenceTest();
        process.exit(0);
    } catch (error) {
        console.error('[metaLearning.templates+insights test] persistence.fail', error);
        process.exit(1);
    }
}

module.exports = runTemplatesAndInsightsPersistenceTest;


