/**
 * RCEL (Recursive Code Evolution Loop) Test Suite
 * Tests both the RCEL skill and rule for proper structure and integration
 */

const fs = require('fs');
const path = require('path');

console.log('[rcel-test] Starting RCEL Test Suite\n');

let testsPassed = 0;
let testsFailed = 0;

function test(name, fn) {
  try {
    const result = fn();
    if (result === true || (result && result.passed !== false)) {
      console.log(`[rcel-test] ✓ ${name}`);
      testsPassed++;
      return true;
    } else {
      console.log(`[rcel-test] ✗ ${name}: ${result.error || 'Failed'}`);
      testsFailed++;
      return false;
    }
  } catch (error) {
    console.log(`[rcel-test] ✗ ${name}: ${error.message}`);
    testsFailed++;
    return false;
  }
}

// Test 1: RCEL Skill File Exists
test('RCEL skill file exists', () => {
  const skillPath = path.join(__dirname, 'skills', 'core', 'recursive-code-evolution-loop.md');
  if (fs.existsSync(skillPath)) {
    return true;
  }
  return { passed: false, error: 'Skill file not found' };
});

// Test 2: RCEL Rule File Exists
test('RCEL rule file exists', () => {
  const rulePath = path.join(__dirname, 'rules', '23-recursive-code-evolution-loop.md');
  if (fs.existsSync(rulePath)) {
    return true;
  }
  return { passed: false, error: 'Rule file not found' };
});

// Test 3: Elegance Score Helper Exists
test('Elegance score helper exists', () => {
  const helperPath = path.join(__dirname, 'skills', 'reflection', 'elegance-score.md');
  if (fs.existsSync(helperPath)) {
    return true;
  }
  return { passed: false, error: 'Elegance score helper not found' };
});

// Test 4: Skill Has YAML Frontmatter
test('RCEL skill has valid YAML frontmatter', () => {
  const skillPath = path.join(__dirname, 'skills', 'core', 'recursive-code-evolution-loop.md');
  const content = fs.readFileSync(skillPath, 'utf8');
  
  const hasFrontmatter = content.startsWith('---');
  const hasName = content.includes('name: "recursive-code-evolution-loop"');
  const hasDescription = content.includes('description:');
  const hasVersion = content.includes('version:');
  const hasTrigger = content.includes('trigger:');
  const hasInvariant = content.includes('invariant:');
  
  if (hasFrontmatter && hasName && hasDescription && hasVersion && hasTrigger && hasInvariant) {
    return true;
  }
  return { passed: false, error: 'Missing required frontmatter fields' };
});

// Test 5: Skill Has Required Sections
test('RCEL skill has required sections', () => {
  const skillPath = path.join(__dirname, 'skills', 'core', 'recursive-code-evolution-loop.md');
  const content = fs.readFileSync(skillPath, 'utf8');
  
  const requiredSections = [
    '## Purpose',
    '## Workflow',
    '## Success Criteria',
    '## Observability',
    '## Rollback',
    '## Examples'
  ];
  
  const missing = requiredSections.filter(section => !content.includes(section));
  if (missing.length === 0) {
    return true;
  }
  return { passed: false, error: `Missing sections: ${missing.join(', ')}` };
});

// Test 6: Rule Has Core Structure
test('RCEL rule has core structure', () => {
  const rulePath = path.join(__dirname, 'rules', '23-recursive-code-evolution-loop.md');
  const content = fs.readFileSync(rulePath, 'utf8');
  
  const requiredSections = [
    '## Purpose',
    '## Core Principles',
    '## Automatic Triggers',
    '## Refinement Lenses',
    '## RCEL Workflow',
    '## Invariants',
    '## Success Criteria',
    '## Observability',
    '## Rollback Strategy',
    '## Opt-Out Mechanisms'
  ];
  
  const missing = requiredSections.filter(section => !content.includes(section));
  if (missing.length === 0) {
    return true;
  }
  return { passed: false, error: `Missing sections: ${missing.join(', ')}` };
});

// Test 7: Rule Defines Integration with ECP
test('RCEL rule defines ECP integration', () => {
  const rulePath = path.join(__dirname, 'rules', '23-recursive-code-evolution-loop.md');
  const content = fs.readFileSync(rulePath, 'utf8');
  
  const hasIntegration = content.includes('Integration with ECP Workflow') ||
                        content.includes('Frame → Design → Plan → Implement');
  const hasModeHandling = content.includes('Standard Mode') && 
                         content.includes('Quick Mode') &&
                         content.includes('Emergency Mode');
  
  if (hasIntegration && hasModeHandling) {
    return true;
  }
  return { passed: false, error: 'Missing ECP integration or mode handling' };
});

// Test 8: Rule Defines Boundaries with Rule 08
test('RCEL rule defines boundaries with Rule 08', () => {
  const rulePath = path.join(__dirname, 'rules', '23-recursive-code-evolution-loop.md');
  const content = fs.readFileSync(rulePath, 'utf8');
  
  const hasBoundaries = content.includes('Boundaries with Autonomous Optimization') ||
                       content.includes('Rule 08');
  const hasComplementary = content.includes('Complementary') || 
                          content.includes('different scope');
  
  if (hasBoundaries || hasComplementary) {
    return true;
  }
  return { passed: false, error: 'Missing boundaries definition with Rule 08' };
});

// Test 9: Both Have LOC Limits
test('Both skill and rule define LOC limits', () => {
  const skillPath = path.join(__dirname, 'skills', 'core', 'recursive-code-evolution-loop.md');
  const rulePath = path.join(__dirname, 'rules', '23-recursive-code-evolution-loop.md');
  
  const skillContent = fs.readFileSync(skillPath, 'utf8');
  const ruleContent = fs.readFileSync(rulePath, 'utf8');
  
  const skillHasLOC = skillContent.includes('150 LOC') || skillContent.includes('≤150 LOC');
  const ruleHasLOC = ruleContent.includes('150 LOC') || ruleContent.includes('≤150 LOC');
  
  if (skillHasLOC && ruleHasLOC) {
    return true;
  }
  return { passed: false, error: 'Missing LOC limit definitions' };
});

// Test 10: Both Define Refinement Lenses
test('Both skill and rule define refinement lenses', () => {
  const skillPath = path.join(__dirname, 'skills', 'core', 'recursive-code-evolution-loop.md');
  const rulePath = path.join(__dirname, 'rules', '23-recursive-code-evolution-loop.md');
  
  const skillContent = fs.readFileSync(skillPath, 'utf8');
  const ruleContent = fs.readFileSync(rulePath, 'utf8');
  
  const lenses = ['elegance', 'readability', 'composability', 'observability', 'kairos'];
  const skillHasLenses = lenses.every(lens => 
    skillContent.toLowerCase().includes(lens)
  );
  const ruleHasLenses = lenses.every(lens => 
    ruleContent.toLowerCase().includes(lens)
  );
  
  if (skillHasLenses && ruleHasLenses) {
    return true;
  }
  return { passed: false, error: 'Missing refinement lenses definition' };
});

// Test 11: Rule Has Opt-Out Mechanisms
test('RCEL rule defines opt-out mechanisms', () => {
  const rulePath = path.join(__dirname, 'rules', '23-recursive-code-evolution-loop.md');
  const content = fs.readFileSync(rulePath, 'utf8');
  
  const hasOptOut = content.includes('Opt-Out') || content.includes('opt-out');
  const hasNoRcel = content.includes('[no-rcel]');
  const hasQuickMode = content.includes('Quick Mode') && content.includes('Skip');
  
  if (hasOptOut && hasNoRcel && hasQuickMode) {
    return true;
  }
  return { passed: false, error: 'Missing opt-out mechanisms' };
});

// Test 12: Rule Has Learning Integration
test('RCEL rule has learning integration section', () => {
  const rulePath = path.join(__dirname, 'rules', '23-recursive-code-evolution-loop.md');
  const content = fs.readFileSync(rulePath, 'utf8');
  
  const hasLearning = content.includes('Learning Integration') ||
                     content.includes('Pattern Recognition') ||
                     content.includes('Metrics to Track');
  
  if (hasLearning) {
    return true;
  }
  return { passed: false, error: 'Missing learning integration section' };
});

// Test 13: Changelog Updated
test('RULES_CHANGELOG.md documents RCEL', () => {
  const changelogPath = path.join(__dirname, 'rules', 'RULES_CHANGELOG.md');
  const content = fs.readFileSync(changelogPath, 'utf8');
  
  const hasRCEL = content.includes('Recursive Code Evolution Loop') ||
                  content.includes('RCEL') ||
                  content.includes('23-recursive-code-evolution-loop');
  
  if (hasRCEL) {
    return true;
  }
  return { passed: false, error: 'RULES_CHANGELOG.md does not document RCEL' };
});

// Test 14: Skill YAML Frontmatter Structure
test('RCEL skill has valid YAML frontmatter structure', () => {
  const skillPath = path.join(__dirname, 'skills', 'core', 'recursive-code-evolution-loop.md');
  const content = fs.readFileSync(skillPath, 'utf8');
  
  // Check for proper YAML frontmatter delimiters
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (!frontmatterMatch) {
    return { passed: false, error: 'No YAML frontmatter found' };
  }
  
  // Extract and check key fields are present
  const frontmatter = frontmatterMatch[1];
  const hasName = frontmatter.includes('name:');
  const hasVersion = frontmatter.includes('version:');
  const hasCategory = frontmatter.includes('category:');
  const hasTrigger = frontmatter.includes('trigger:');
  const hasInvariant = frontmatter.includes('invariant:');
  
  if (hasName && hasVersion && hasCategory && hasTrigger && hasInvariant) {
    return true;
  }
  return { passed: false, error: 'Missing required YAML fields in frontmatter' };
});

// Summary
console.log('\n[rcel-test] Test Summary');
console.log(`[rcel-test] ✓ Passed: ${testsPassed}`);
console.log(`[rcel-test] ✗ Failed: ${testsFailed}`);
console.log(`[rcel-test] Total: ${testsPassed + testsFailed}`);

if (testsFailed === 0) {
  console.log('\n[rcel-test] ✓ All tests passed! RCEL is ready to use.');
  process.exit(0);
} else {
  console.log('\n[rcel-test] ✗ Some tests failed. Please review the errors above.');
  process.exit(1);
}

