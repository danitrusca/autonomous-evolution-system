---
name: "autonomous-skill-learner"
description: "Continuously learn new skills from patterns, failures, and successes without user input"
version: "1.0.0"
trigger: "When patterns are detected, failures occur, or optimization opportunities arise"
invariant: "All learned skills maintain ECP principles and are validated before activation"
dependencies: ["learning-log-writer", "skill-evolution", "ecp-protocol"]
category: "meta"
author: "ECP System"
created: "2025-01-27"
---

# Autonomous Skill Learner

## Purpose

Continuously learn new skills from development patterns, failures, and successes without requiring user input, creating a self-improving development environment.

## Workflow

### 1. Pattern Detection
- Monitor codebase for recurring patterns
- Identify successful development sequences
- Detect failure patterns and anti-patterns
- Analyze user behavior and preferences
- Track skill usage and effectiveness

### 2. Skill Generation
- Extract successful patterns into reusable skills
- Create skills from common failure resolutions
- Generate skills from optimization opportunities
- Compose skills from existing skill combinations
- Adapt skills based on project context

### 3. Skill Validation
- Test generated skills in safe environment
- Validate against ECP principles
- Check for conflicts with existing skills
- Verify skill effectiveness and reliability
- Ensure rollback capabilities

### 4. Autonomous Deployment
- Deploy validated skills automatically
- Update skill registry and documentation
- Notify system of new capabilities
- Monitor skill performance
- Trigger skill evolution if needed

### 5. Learning Integration
- Capture lessons from skill generation
- Update learning algorithms
- Improve pattern detection
- Enhance skill composition
- Evolve autonomous capabilities

## Success Criteria

- New skills learned from patterns
- Skills validated and deployed autonomously
- System capabilities enhanced
- Learning algorithms improved
- User experience optimized

## Observability

Log all autonomous learning with `[autonomous-learner]` prefix:
- `[autonomous-learner] Pattern: [pattern detected]`
- `[autonomous-learner] Skill: [new skill generated]`
- `[autonomous-learner] Validation: [skill tested]`
- `[autonomous-learner] Deploy: [skill activated]`
- `[autonomous-learner] Learn: [insight captured]`

## Rollback

If autonomous learning fails:
1. Revert to previous skill set
2. Log failure for analysis
3. Continue with existing skills
4. Plan alternative learning approach

## Examples

**Pattern**: User frequently debugs API errors
**Learning**: Generate "api-error-resolver" skill
**Deployment**: Automatically activate skill
**Result**: Future API errors resolved automatically

**Pattern**: User consistently optimizes database queries
**Learning**: Generate "query-optimizer" skill
**Deployment**: Automatically activate skill
**Result**: Database queries optimized automatically
