/**
 * Run Test Organizer
 * Triggers the test-organizer skill to move files
 */

const SkillRunner = require('./skills/skill-runner');

async function run() {
    console.log('Triggering Test Organizer Skill...');
    const runner = new SkillRunner();

    try {
        // Note: SkillRunner expects skill name without extension
        const result = await runner.executeSkill('meta/test-organizer');
        console.log('Skill execution result:', result);
    } catch (err) {
        console.error('Skill execution failed:', err);
    }
}

run();
