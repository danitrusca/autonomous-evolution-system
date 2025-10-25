---
name: "ecology-health-monitor"
description: "Monitor skill ecology health to prevent sprawl and maintain quality"
version: "1.0.0"
trigger: "When skills are created, modified, or system health is checked"
invariant: "Ecology maintains high quality and prevents skill sprawl through continuous monitoring"
dependencies: ["skill-validator", "skill-creator", "skill-evolution"]
category: "meta"
author: "ECP System"
created: "2025-01-27"
---

# Ecology Health Monitor

## Purpose

Monitor the health of the skill ecology to prevent skill sprawl, maintain quality, and ensure the system remains coherent and effective over time.

## Workflow

### 1. Ecology Analysis
- Analyze current skill population
- Identify skill clusters and patterns
- Detect potential overlaps and conflicts
- Assess skill utilization and effectiveness
- Monitor skill quality trends

### 2. Health Metrics
- **Skill Count**: Total number of skills
- **Quality Score**: Average skill quality
- **Utilization Rate**: How often skills are used
- **Conflict Count**: Number of skill conflicts
- **Overlap Count**: Number of skill overlaps
- **Ecology Coherence**: Overall system coherence

### 3. Sprawl Prevention
- Detect skill sprawl patterns
- Identify low-quality or unused skills
- Flag skills that don't meet standards
- Suggest skill consolidation opportunities
- Prevent duplicate or redundant skills

### 4. Quality Maintenance
- Monitor skill quality over time
- Identify skills that need improvement
- Track skill evolution and learning
- Ensure skills maintain ECP compliance
- Validate skill effectiveness

### 5. Ecology Optimization
- Suggest skill improvements
- Recommend skill consolidation
- Identify missing capabilities
- Plan skill evolution strategies
- Optimize skill relationships

## Success Criteria

- Ecology health maintained
- Skill sprawl prevented
- Quality standards upheld
- System coherence preserved
- Continuous improvement enabled

## Observability

Log all ecology monitoring with `[ecology-monitor]` prefix:
- `[ecology-monitor] Analysis: [ecology analysis]`
- `[ecology-monitor] Health: [health metrics]`
- `[ecology-monitor] Sprawl: [sprawl prevention]`
- `[ecology-monitor] Quality: [quality maintenance]`
- `[ecology-monitor] Optimize: [ecology optimization]`

## Rollback

If ecology health degrades:
1. Identify problematic skills
2. Suggest improvements or removal
3. Implement quality gates
4. Restore ecology coherence
5. Prevent future degradation

## Examples

**Healthy Ecology**: Skills are focused, high-quality, and well-utilized
**Unhealthy Ecology**: Skills are scattered, low-quality, or unused
**Result**: Continuous monitoring maintains ecology health
