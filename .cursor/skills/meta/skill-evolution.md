---
name: "skill-evolution"
description: "Monitor skill performance and trigger optimization based on usage patterns"
version: "1.0.0"
trigger: "When skill performance patterns are detected or optimization is requested"
invariant: "Skill evolution maintains ECP principles while improving effectiveness"
dependencies: ["learning-log-writer", "ecp-protocol"]
category: "meta"
author: "ECP System"
created: "2025-01-27"
---

# Skill Evolution

## Purpose

Monitor skill performance, detect patterns, and trigger optimization to continuously improve the skill ecosystem.

## Workflow

### 1. Performance Monitoring
- Track skill execution success rates
- Monitor execution times and efficiency
- Identify usage patterns and trends
- Detect skill composition opportunities

### 2. Pattern Analysis
- Analyze skill performance data
- Identify optimization opportunities
- Detect skill interaction patterns
- Find composition possibilities

### 3. Optimization Planning
- Design skill improvements
- Plan skill composition strategies
- Identify new skill opportunities
- Update skill dependencies

### 4. Implementation
- Update skill definitions
- Improve skill workflows
- Create new composite skills
- Update skill documentation

### 5. Validation
- Test optimized skills
- Verify performance improvements
- Validate skill interactions
- Update evolution journal

## Success Criteria

- Skill performance improved
- New patterns identified
- Optimization implemented
- System effectiveness enhanced

## Observability

Log all evolution activities with `[skill-evolution]` prefix:
- `[skill-evolution] Analysis: [pattern detected]`
- `[skill-evolution] Optimization: [improvement planned]`
- `[skill-evolution] Implementation: [changes made]`
- `[skill-evolution] Validation: [results verified]`

## Rollback

If evolution fails:
1. Revert to previous skill versions
2. Log failure for analysis
3. Continue with existing skills
4. Plan alternative optimization

## Examples

**Trigger**: Skill execution time > 5 seconds consistently
**Analysis**: Identify bottlenecks and optimization opportunities
**Optimization**: Streamline workflow, improve efficiency
**Result**: Faster skill execution with maintained quality
