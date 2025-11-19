/**
 * Test Dynamic Triggers
 * Verifies that evolution questions are weighted based on system state
 */

const AutonomousEvolutionEngine = require('../autonomous-evolution-engine');

// Mock dependencies to avoid full system startup
class MockMetaCognitiveLayer {
    async analyzeCurrentState(state) {
        return state;
    }
}

async function runTest() {
    console.log('Starting Dynamic Trigger Test...');

    const engine = new AutonomousEvolutionEngine();
    engine.metaCognitiveLayer = new MockMetaCognitiveLayer();

    // Test 1: High Friction State
    console.log('\nTest 1: Simulating High Friction State...');
    const frictionState = { friction: 0.8, errorRate: 0.2, learningRate: 0.5 };
    const frictionQuestion = await engine.generateEvolutionQuestion(frictionState);

    if (frictionQuestion.includes('effective') || frictionQuestion.includes('limitations')) {
        console.log('✅ Correctly prioritized effectiveness/limitations question');
    } else {
        console.log('⚠️ Selected question:', frictionQuestion);
    }

    // Test 2: Stagnation State
    console.log('\nTest 2: Simulating Stagnation State...');
    const stagnationState = { friction: 0.1, errorRate: 0.0, learningRate: 0.05 };
    const stagnationQuestion = await engine.generateEvolutionQuestion(stagnationState);

    if (stagnationQuestion.includes('breakthrough') || stagnationQuestion.includes('new capabilities')) {
        console.log('✅ Correctly prioritized breakthrough/capabilities question');
    } else {
        console.log('⚠️ Selected question:', stagnationQuestion);
    }

    console.log('\nTest Complete.');
}

runTest().catch(err => console.error('Test failed:', err));
