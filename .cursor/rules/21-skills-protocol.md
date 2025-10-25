# Skills Protocol v1
*Persistent procedural capabilities for Cursor*

## Purpose

Transform Cursor from episodic prompting to cumulative apprenticeship through persistent, callable procedures called Skills.

## Core Principle

**Skills are the new atomic unit of capability** - halfway between prompts and tools, they encode procedural knowledge that persists across sessions.

## Skill Architecture

### Skill Definition
Each skill is a Markdown file with YAML frontmatter:

```yaml
---
name: "skill-name"
description: "What this skill does and when to use it"
version: "1.0.0"
trigger: "When to activate this skill"
invariant: "What this skill guarantees"
dependencies: []
---
```

### Skill Categories
- **core/**: Essential development skills (ECP, debugging, testing)
- **builder/**: Construction and architecture skills
- **reflection/**: Learning and optimization skills  
- **meta/**: Skill management and evolution

## Integration with ECP

Skills maintain ECP principles:
- **Invariants**: Each skill declares what it guarantees
- **Observability**: All skill execution logged with `[skill:name]` prefix
- **Rollback**: Skills include rollback strategies
- **Learning**: Skill performance captured in evolution journal

## Skill Execution

### Invocation
- `/use skill:name` - Execute specific skill
- `/list skills` - Show available skills
- `/skill help:name` - Show skill documentation

### Execution Flow
1. **Load**: Parse skill YAML and Markdown
2. **Validate**: Check dependencies and ECP compliance
3. **Execute**: Run skill workflow with observability
4. **Log**: Record performance in evolution journal
5. **Learn**: Update skill based on outcomes

## Skill Composition

Skills can:
- Call other skills (dependency chain)
- Be composed into workflows
- Share state and context
- Evolve based on performance

## Learning Integration

Every skill execution:
- Logs performance metrics
- Captures lessons learned
- Updates skill effectiveness
- Triggers optimization when patterns detected

## Rollback Strategy

If skill system fails:
1. Remove `/skills` folder
2. Revert macro changes in `03-ecp-macros.md`
3. Continue with standard ECP mode
4. Log failure in evolution journal

## Success Metrics

- Skill discovery time < 2 seconds
- Skill execution success rate > 95%
- Skill composition works seamlessly
- Learning integration captures insights
- Rollback restores stability

## Meta-Rules

1. **Skills are persistent** - they survive across sessions
2. **Skills are composable** - they can call other skills
3. **Skills are observable** - all execution is logged
4. **Skills are reversible** - rollback strategies included
5. **Skills are evolutionary** - they improve over time
