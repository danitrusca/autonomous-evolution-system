/**
 * Verify Skill Migration
 * Tests the execution of migrated skills using SkillRunner
 */

const SkillRunner = require('./skills/skill-runner');
const path = require('path');

async function runVerification() {
    console.log('Starting Skill Migration Verification...');

    const runner = new SkillRunner(path.join(__dirname, 'skills'));

    // Test 1: System Map Generator
    console.log('\nTest 1: System Map Generator');
    try {
        const result = await runner.executeSkill('system-map-generator');
        if (result.executed && result.output && result.output.includes('Simulation: JS executed')) {
            console.log('✅ System Map Generator executed successfully (Simulation)');
        } else {
            console.log('⚠️ System Map Generator execution result:', result);
        }
    } catch (err) {
        console.error('❌ System Map Generator failed:', err);
    }

    // Test 2: QA Auto Updater
    console.log('\nTest 2: QA Auto Updater');
    try {
        const result = await runner.executeSkill('qa-auto-updater');
        if (result.executed && result.output && result.output.includes('Simulation: JS executed')) {
            console.log('✅ QA Auto Updater executed successfully (Simulation)');
        } else {
            console.log('⚠️ QA Auto Updater execution result:', result);
        }
    } catch (err) {
        console.error('❌ QA Auto Updater failed:', err);
    }

    // Test 3: Autonomous Executor
    console.log('\nTest 3: Autonomous Executor');
    try {
        const result = await runner.executeSkill('autonomous-executor');
        if (result.executed && result.output && result.output.includes('Simulation: JS executed')) {
            console.log('✅ Autonomous Executor executed successfully (Simulation)');
        } else {
            console.log('⚠️ Autonomous Executor execution result:', result);
        }
    } catch (err) {
        console.error('❌ Autonomous Executor failed:', err);
    }

    console.log('\nVerification Complete.');
}

runVerification().catch(err => console.error('Verification failed:', err));
