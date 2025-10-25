# Skills Schema v1

## Skill File Structure

Each skill is a Markdown file with YAML frontmatter:

```yaml
---
name: "ecp-protocol-runner"
description: "Execute the full ECP workflow: Frame → Design → Plan → Implement → Review"
version: "1.0.0"
trigger: "When user requests feature development or complex changes"
invariant: "All code changes follow ECP principles with proper invariants and observability"
dependencies: ["ecp-mode", "macros"]
category: "core"
author: "ECP System"
created: "2025-01-27"
---
```

## Required Fields

- **name**: Unique identifier (kebab-case)
- **description**: Clear explanation of purpose and trigger conditions
- **version**: Semantic versioning (major.minor.patch)
- **trigger**: When this skill should activate
- **invariant**: What this skill guarantees
- **dependencies**: List of other skills or systems required

## Optional Fields

- **category**: Grouping (core, builder, reflection, meta)
- **author**: Creator or maintainer
- **created**: Creation date
- **updated**: Last modification date
- **tags**: Searchable keywords
- **examples**: Usage examples
- **rollback**: How to undo skill effects

## Skill Body

The Markdown body contains:

1. **Purpose**: What this skill accomplishes
2. **Workflow**: Step-by-step process
3. **Success Criteria**: How to verify completion
4. **Observability**: What to log and monitor
5. **Rollback**: How to undo if needed
6. **Examples**: Real usage scenarios

## Integration Points

Skills integrate with:
- **ECP Rules**: Via `.cursor/rules/` system
- **Macros**: Through `/use skill:name` commands
- **Learning**: Via `AUTONOMOUS_EVOLUTION_JOURNAL.md`
- **Composition**: Skills can call other skills

## Validation

Each skill must pass:
- Schema validation (required fields present)
- ECP compliance (invariants, observability, rollback)
- Integration test (can be invoked via macro)
- Performance tracking (execution time, success rate)
