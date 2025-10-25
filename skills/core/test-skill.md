---
name: "test-skill"
description: "Test skill to verify the Skills system is working correctly"
version: "1.0.0"
trigger: "When testing the Skills system or demonstrating capabilities"
invariant: "Test skill execution provides clear feedback about system status"
dependencies: []
category: "core"
author: "ECP System"
created: "2025-01-27"
---

# Test Skill

## Purpose

Verify that the Skills system is working correctly and demonstrate basic skill execution capabilities.

## Workflow

### 1. System Check
- Verify skill compiler is loaded
- Check skill dependencies
- Validate ECP integration
- Test observability logging

### 2. Execution Test
- Run basic workflow steps
- Test skill composition
- Verify learning integration
- Check rollback capabilities

### 3. Feedback Generation
- Provide clear success/failure status
- Include system health information
- Suggest next steps if needed
- Log performance metrics

## Success Criteria

- Skill executes without errors
- All system components verified
- Clear feedback provided
- Performance logged

## Observability

Log all test activities with `[test-skill]` prefix:
- `[test-skill] System: [component status]`
- `[test-skill] Execution: [step completed]`
- `[test-skill] Result: [success/failure]`
- `[test-skill] Performance: [metrics]`

## Rollback

If test fails:
1. Log failure details
2. Continue with standard operation
3. Report system issues
4. Plan system improvements

## Examples

**Trigger**: `/use skill:test-skill`
**Execution**: 
1. Check skill compiler status
2. Verify ECP integration
3. Test observability
4. Report results

**Result**: Clear system status and verification of Skills infrastructure
