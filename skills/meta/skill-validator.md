---
name: "skill-validator"
description: "Validate generated skills against quality gates to prevent skill sprawl and maintain ecology health"
version: "1.0.0"
trigger: "When new skills are generated or existing skills are modified"
invariant: "All skills must pass validation gates before deployment to maintain ecology quality"
dependencies: ["skill-creator", "ecp-protocol"]
category: "meta"
author: "ECP System"
created: "2025-01-27"
---

# Skill Validator

## Purpose

Validate generated skills against quality gates to prevent skill sprawl and maintain a clean, high-quality skill ecology. Ensures every skill meets minimum standards before deployment.

## Workflow

### 1. Purpose Clarity Validation
- Verify skill has clear, specific purpose
- Check description is actionable and focused
- Ensure skill addresses a real need
- Validate skill scope is appropriate
- Confirm skill adds unique value

### 2. Success Test Validation
- Verify observable success criteria
- Check success test is measurable
- Ensure success test is realistic
- Validate success test is achievable
- Confirm success test is meaningful

### 3. Rollback Validation
- Verify rollback strategy exists
- Check rollback is clearly defined
- Ensure rollback is feasible
- Validate rollback restores stability
- Confirm rollback is tested

### 4. Memento Validation
- Verify skill has embodied reminder
- Check memento is memorable and actionable
- Ensure memento connects to skill purpose
- Validate memento aids skill execution
- Confirm memento is concise

### 5. Ecology Health Check
- Check for skill conflicts or overlaps
- Verify skill adds unique value
- Ensure skill integrates well with existing skills
- Validate skill follows naming conventions
- Confirm skill maintains system coherence

## Success Criteria

- All validation gates passed
- Skill meets quality standards
- No conflicts with existing skills
- Ecology health maintained
- Skill ready for deployment

## Observability

Log all validation with `[skill-validator]` prefix:
- `[skill-validator] Purpose: [clarity check]`
- `[skill-validator] Success: [test validation]`
- `[skill-validator] Rollback: [strategy check]`
- `[skill-validator] Memento: [reminder validation]`
- `[skill-validator] Ecology: [health check]`

## Rollback

If validation fails:
1. Reject skill deployment
2. Log validation failures
3. Suggest improvements
4. Return to skill creator for revision
5. Maintain ecology quality

## Examples

**Valid Skill**: Clear purpose, observable success, rollback strategy, memorable memento
**Invalid Skill**: Vague purpose, unclear success, no rollback, no memento
**Result**: Only high-quality skills enter the ecology
