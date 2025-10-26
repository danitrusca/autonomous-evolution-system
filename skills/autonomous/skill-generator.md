---
name: "skill-generator"
description: "Automatically generate new skills from detected patterns without user input"
version: "1.0.0"
trigger: "When pattern detector identifies skill generation opportunities"
invariant: "All generated skills follow ECP principles and are validated before deployment"
dependencies: ["pattern-detector", "autonomous-skill-learner"]
category: "autonomous"
author: "ECP System"
created: "2025-01-27"
---

# Skill Generator

## Purpose

Automatically generate new skills from detected patterns, creating autonomous capabilities that enhance the development environment without user input.

## Workflow

### 1. Pattern Analysis
- Analyze detected patterns for skill potential
- Extract workflow steps and logic
- Identify success criteria and invariants
- Determine observability requirements
- Plan skill structure and implementation

### 2. Skill Creation
- Generate YAML frontmatter with metadata
- Create skill body with workflow steps
- Define triggers and success criteria
- Add observability and rollback strategies
- Ensure ECP compliance

### 3. Skill Validation
- Test skill logic and workflow
- Validate against ECP principles
- Check for conflicts with existing skills
- Verify observability requirements
- Ensure rollback capabilities

### 4. Autonomous Deployment
- Deploy validated skills automatically
- Update skill registry and documentation
- Notify system of new capabilities
- Monitor initial skill performance
- Trigger skill evolution if needed

### 5. Learning Integration
- Capture lessons from skill generation
- Update generation algorithms
- Improve pattern analysis
- Enhance skill validation
- Evolve autonomous capabilities

## Success Criteria

- Skills generated from patterns
- Skills validated and deployed
- System capabilities enhanced
- Learning algorithms improved
- Autonomous capabilities evolved

## Observability

Log all skill generation with `[skill-generator]` prefix:
- `[skill-generator] Pattern: [pattern analyzed]`
- `[skill-generator] Create: [skill generated]`
- `[skill-generator] Validate: [skill tested]`
- `[skill-generator] Deploy: [skill activated]`
- `[skill-generator] Learn: [algorithm updated]`

## Rollback

If skill generation fails:
1. Revert to previous skill set
2. Log failure for analysis
3. Continue with existing skills
4. Plan alternative generation approach

## Examples

**Pattern**: Repeated API error handling
**Generation**: Create "api-error-resolver" skill
**Deployment**: Automatically activate skill
**Result**: Future API errors resolved automatically

**Pattern**: Consistent database optimization
**Generation**: Create "query-optimizer" skill
**Deployment**: Automatically activate skill
**Result**: Database queries optimized automatically