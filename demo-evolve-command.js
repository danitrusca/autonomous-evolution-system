/**
 * Demo script for /evolve command
 * Tests the direct system evolution functionality
 */

const AutonomousEvolutionEngine = require('./autonomous-evolution-engine');

async function demoEvolveCommand() {
    console.log('🚀 Starting /evolve command demo...\n');
    
    // Initialize the autonomous evolution engine
    const aes = new AutonomousEvolutionEngine();
    
    // Demo 1: Git submodule setup evolution
    console.log('📋 Demo 1: Git submodule setup evolution');
    console.log('=' .repeat(50));
    
    const gitSubmoduleContext = {
        description: 'Git submodule setup for managing multiple projects in workspace',
        success: true,
        problem: 'Git confusion with untracked files in submodules',
        solution: 'Used git submodule approach with proper .gitignore configuration'
    };
    
    const gitSubmoduleResult = await aes.processEvolveCommand(
        gitSubmoduleContext,
        'repository-management',
        'git-submodule-pattern'
    );
    
    console.log('Evolution Report:');
    console.log(`- Evolution ID: ${gitSubmoduleResult.evolutionId}`);
    console.log(`- Confidence: ${gitSubmoduleResult.humilityAssessment.assessment.confidence.toFixed(3)}`);
    console.log(`- Uncertainty Level: ${gitSubmoduleResult.humilityAssessment.assessment.uncertaintyLevel}`);
    console.log(`- Can Proceed: ${gitSubmoduleResult.evolutionPlan.canProceed}`);
    console.log(`- Steps: ${gitSubmoduleResult.evolutionPlan.steps.length}`);
    console.log(`- Meta Insights: ${gitSubmoduleResult.metaLearningResult.metaInsights.length}`);
    console.log();
    
    // Demo 2: False certainty evolution
    console.log('📋 Demo 2: False certainty evolution');
    console.log('=' .repeat(50));
    
    const falseCertaintyContext = {
        description: 'Eliminating false certainty in problem-solving approach',
        success: true,
        problem: 'System making overconfident assertions without proper uncertainty assessment',
        solution: 'Added epistemic humility and confidence calibration'
    };
    
    const falseCertaintyResult = await aes.processEvolveCommand(
        falseCertaintyContext,
        'epistemic-humility',
        'uncertainty-acknowledgment-pattern'
    );
    
    console.log('Evolution Report:');
    console.log(`- Evolution ID: ${falseCertaintyResult.evolutionId}`);
    console.log(`- Confidence: ${falseCertaintyResult.humilityAssessment.assessment.confidence.toFixed(3)}`);
    console.log(`- Uncertainty Level: ${falseCertaintyResult.humilityAssessment.assessment.uncertaintyLevel}`);
    console.log(`- Can Proceed: ${falseCertaintyResult.evolutionPlan.canProceed}`);
    console.log(`- Steps: ${falseCertaintyResult.evolutionPlan.steps.length}`);
    console.log(`- Meta Insights: ${falseCertaintyResult.metaLearningResult.metaInsights.length}`);
    console.log();
    
    // Demo 3: Meta-learning evolution
    console.log('📋 Demo 3: Meta-learning evolution');
    console.log('=' .repeat(50));
    
    const metaLearningContext = {
        description: 'Learning how to learn more effectively from specific solutions',
        success: true,
        problem: 'System applies fixes reactively but doesn\'t generalize solutions',
        solution: 'Added meta-learning to generalize from specific problem-solving patterns'
    };
    
    const metaLearningResult = await aes.processEvolveCommand(
        metaLearningContext,
        'meta-learning',
        'solution-generalization-pattern'
    );
    
    console.log('Evolution Report:');
    console.log(`- Evolution ID: ${metaLearningResult.evolutionId}`);
    console.log(`- Confidence: ${metaLearningResult.humilityAssessment.assessment.confidence.toFixed(3)}`);
    console.log(`- Uncertainty Level: ${metaLearningResult.humilityAssessment.assessment.uncertaintyLevel}`);
    console.log(`- Can Proceed: ${metaLearningResult.evolutionPlan.canProceed}`);
    console.log(`- Steps: ${metaLearningResult.evolutionPlan.steps.length}`);
    console.log(`- Meta Insights: ${metaLearningResult.metaLearningResult.metaInsights.length}`);
    console.log();
    
    // Show evolution status
    console.log('📊 Evolution Status:');
    console.log('=' .repeat(50));
    const status = aes.getEvolutionStatus();
    console.log(`- Current Phase: ${status.currentPhase}`);
    console.log(`- Evolution History: ${status.evolutionHistory} entries`);
    console.log(`- Meta-Cognitive Active: ${status.metaCognitiveActive}`);
    console.log(`- Self-Assessment Active: ${status.selfAssessmentActive}`);
    console.log(`- Architecture Evolution Active: ${status.architectureEvolutionActive}`);
    console.log();
    
    console.log('✅ /evolve command demo completed!');
    console.log('🎯 System has evolved to handle similar problems more effectively');
    console.log('🧠 Epistemic humility ensures confidence calibration');
    console.log('🔄 Meta-learning enables solution generalization');
}

// Run the demo
if (require.main === module) {
    demoEvolveCommand().catch(console.error);
}

module.exports = demoEvolveCommand;
