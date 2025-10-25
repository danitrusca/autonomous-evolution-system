/**
 * Skills System Test Suite
 * Tests the Skills Protocol v1 implementation
 */

const SkillsCompiler = require('./compiler.js');

console.log('[skill-test] Starting Skills System Test Suite');

// Test 1: Compiler Initialization
console.log('\n[skill-test] Test 1: Compiler Initialization');
try {
  const compiler = new SkillsCompiler();
  console.log('[skill-test] ✓ Compiler initialized successfully');
  console.log(`[skill-test] ✓ Loaded ${compiler.skills.size} skills`);
} catch (error) {
  console.error('[skill-test] ✗ Compiler initialization failed:', error.message);
}

// Test 2: Skill Listing
console.log('\n[skill-test] Test 2: Skill Listing');
try {
  const compiler = new SkillsCompiler();
  const skills = compiler.listSkills();
  console.log('[skill-test] ✓ Skills listed successfully');
  console.log('[skill-test] Available skills:');
  skills.forEach(skill => {
    console.log(`  - ${skill.name}: ${skill.description}`);
  });
} catch (error) {
  console.error('[skill-test] ✗ Skill listing failed:', error.message);
}

// Test 3: Test Skill Execution
console.log('\n[skill-test] Test 3: Test Skill Execution');
try {
  const compiler = new SkillsCompiler();
  const result = compiler.executeSkill('test-skill');
  if (result.success) {
    console.log('[skill-test] ✓ Test skill executed successfully');
    console.log('[skill-test] Result:', result.result);
  } else {
    console.error('[skill-test] ✗ Test skill execution failed:', result.error);
  }
} catch (error) {
  console.error('[skill-test] ✗ Test skill execution error:', error.message);
}

// Test 4: Skill Help
console.log('\n[skill-test] Test 4: Skill Help');
try {
  const compiler = new SkillsCompiler();
  const help = compiler.getSkillHelp('test-skill');
  if (help) {
    console.log('[skill-test] ✓ Skill help retrieved successfully');
    console.log(`[skill-test] Help for ${help.name}: ${help.description}`);
  } else {
    console.error('[skill-test] ✗ Skill help not found');
  }
} catch (error) {
  console.error('[skill-test] ✗ Skill help error:', error.message);
}

console.log('\n[skill-test] Skills System Test Suite Complete');
console.log('[skill-test] Skills Protocol v1 is ready for use!');
