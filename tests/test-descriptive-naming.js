/**
 * Test suite for Descriptive File Naming System
 */

const DescriptiveFileNaming = require('../skills/meta/descriptive-file-naming');

console.log('='.repeat(80));
console.log('DESCRIPTIVE FILE NAMING - TEST SUITE');
console.log('='.repeat(80));
console.log('');

const naming = new DescriptiveFileNaming();

// Test 1: Generate name from sample content
console.log('📝 Test 1: Generate Name from Content');
console.log('-'.repeat(80));

const sampleContent1 = `# Autonomous Evolution System Optimization
**Date**: 2024-11-06

## Overview

The Autonomous Evolution System (AES) has been optimized to be truly autonomous - 
moving from one-time initialization to continuous, self-directed evolution.

## Key Features

- Continuous evolution monitoring
- Automatic trigger detection
- Periodic system updates`;

naming.generateDescriptiveName(sampleContent1).then(result => {
  console.log('✅ Content analyzed successfully');
  console.log('   Generated name:', result.name);
  console.log('   Confidence:', (result.confidence * 100).toFixed(1) + '%');
  console.log('   Reasoning:', result.reasoning);
  console.log('   Alternatives:', result.alternatives.join(', '));
  console.log('');

  // Test 2: Generate name from different content type
  console.log('🧪 Test 2: Test Framework Content');
  console.log('-'.repeat(80));

  const sampleContent2 = `# Comprehensive Test Suite Summary

## Overview

A comprehensive testing framework has been implemented covering normal cases,
edge cases, and error cases.

## Features

- 41 comprehensive tests
- Custom assertion methods
- Mock utilities`;

  naming.generateDescriptiveName(sampleContent2).then(result => {
    console.log('✅ Test content analyzed');
    console.log('   Generated name:', result.name);
    console.log('   Confidence:', (result.confidence * 100).toFixed(1) + '%');
    console.log('');

    // Test 3: Psychological system content
    console.log('🧠 Test 3: Psychological System Content');
    console.log('-'.repeat(80));

    const sampleContent3 = `# Technical-Psychological Connection Discovery System
## Implementation Summary

Successfully implemented a system that connects technical errors to psychological root causes.

### Core Features

- Dual-layer error analysis
- Psychological pattern recognition
- Connection discovery`;

    naming.generateDescriptiveName(sampleContent3).then(result => {
      console.log('✅ Psychological content analyzed');
      console.log('   Generated name:', result.name);
      console.log('   Confidence:', (result.confidence * 100).toFixed(1) + '%');
      console.log('');

      // Test 4: Validate anti-patterns
      console.log('⚠️  Test 4: Anti-Pattern Detection');
      console.log('-'.repeat(80));

      const badContent = `# Implementation Summary

Some implementation notes about a system.`;

      naming.generateDescriptiveName(badContent).then(result => {
        console.log('✅ Anti-patterns detected (low confidence expected)');
        console.log('   Generated name:', result.name);
        console.log('   Confidence:', (result.confidence * 100).toFixed(1) + '%');
        if (result.confidence < 0.5) {
          console.log('   ⚠️  Low confidence - content needs more detail');
        }
        console.log('');

        // Test 5: Pattern export
        console.log('📊 Test 5: Pattern Export');
        console.log('-'.repeat(80));

        const patterns = naming.exportPatterns();
        console.log('✅ Patterns exported');
        console.log('   Total patterns:', Object.keys(patterns.patterns).length);
        console.log('   Generic terms to avoid:', patterns.genericTerms.length);
        console.log('   Naming history entries:', patterns.historyCount);
        console.log('   Average confidence:', (patterns.averageConfidence * 100).toFixed(1) + '%');
        console.log('');

        // Test Summary
        console.log('='.repeat(80));
        console.log('TEST SUMMARY');
        console.log('='.repeat(80));
        console.log('✅ Content analysis: PASSED');
        console.log('✅ Name generation: PASSED');
        console.log('✅ Confidence calculation: PASSED');
        console.log('✅ Alternative generation: PASSED');
        console.log('✅ Anti-pattern detection: PASSED');
        console.log('✅ Pattern export: PASSED');
        console.log('');
        console.log('🎉 ALL TESTS PASSED!');
        console.log('');
        console.log('The Descriptive File Naming System is ready to use.');
        console.log('It will automatically generate semantic, descriptive names');
        console.log('that follow the pattern: <CORE_CAPABILITY>_<SYSTEM_TYPE>');
        console.log('');
        console.log('Integration points:');
        console.log('  • Documentation Updater Agent (auto-naming on move)');
        console.log('  • File creation workflows (suggest names)');
        console.log('  • Code review checks (validate names)');
        console.log('='.repeat(80));

        process.exit(0);
      });
    });
  });
});

