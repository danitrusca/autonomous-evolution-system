---
name: "skill-creator"
description: "Create new skills from patterns, requirements, or user input with full ECP compliance"
version: "1.0.0"
trigger: "When new skill requirements are identified or patterns suggest skill creation"
invariant: "All created skills maintain ECP principles and are validated before deployment"
dependencies: ["ecp-protocol", "learning-log-writer", "skill-evolution"]
category: "meta"
author: "ECP System"
created: "2025-01-27"
---

# Skill Creator

## Purpose

Create new skills from patterns, requirements, or user input while maintaining full ECP compliance and ensuring all generated skills follow the Skills Protocol schema.

## Workflow

### 1. Skill Requirements Analysis
- Analyze skill requirements and context
- Identify skill type and category
- Determine dependencies and relationships
- Plan skill structure and implementation
- Validate against existing skills for conflicts

### 2. Skill Schema Generation
- Generate YAML frontmatter with proper metadata
- Create skill name, description, and version
- Define trigger conditions and invariants
- Specify dependencies and category
- Add author and creation timestamp

### 3. Skill Body Creation
- Create comprehensive skill documentation
- Define purpose and workflow steps
- Specify success criteria and observability
- Include rollback strategies and examples
- Ensure ECP compliance throughout

### 4. Skill Validation
- Validate against Skills Protocol schema
- Check ECP compliance (invariants, observability, rollback)
- Verify no conflicts with existing skills
- Test skill logic and workflow
- Ensure proper integration points

### 5. Skill Deployment
- Deploy validated skill to appropriate category
- Update skill registry and documentation
- Notify system of new capability
- Monitor initial skill performance
- Trigger skill evolution if needed

## Success Criteria

- Skill created with full ECP compliance
- Skill follows Skills Protocol schema
- Skill validated and deployed successfully
- System capabilities enhanced
- Learning captured for future skill creation

## Observability

Log all skill creation with `[skill-creator]` prefix:
- `[skill-creator] Analyze: [requirements analyzed]`
- `[skill-creator] Generate: [skill generated]`
- `[skill-creator] Validate: [skill tested]`
- `[skill-creator] Deploy: [skill activated]`
- `[skill-creator] Learn: [insight captured]`

## Rollback

If skill creation fails:
1. Revert to previous skill set
2. Log failure for analysis
3. Continue with existing skills
4. Plan alternative skill creation approach

## Examples

**Trigger**: User requests "Create a skill for API testing"
**Analysis**: Identify API testing requirements and patterns
**Generation**: Create "api-tester" skill with comprehensive testing workflow
**Deployment**: Deploy skill and integrate with system
**Result**: New API testing capability available

**Trigger**: Pattern detected for "database migration"
**Analysis**: Identify migration patterns and requirements
**Generation**: Create "db-migrator" skill with migration workflow
**Deployment**: Deploy skill and integrate with system
**Result**: New database migration capability available
