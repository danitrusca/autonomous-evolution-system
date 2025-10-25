# Skills Protocol v1
*Persistent procedural capabilities for Cursor*

## Overview

Skills are persistent, callable procedures that transform Cursor from episodic prompting to cumulative apprenticeship. Each skill embodies a specific capability that can be invoked, composed, and evolved.

## Architecture

```
/skills/
├── core/           # Essential development skills
├── builder/        # Construction and debugging skills  
├── reflection/     # Learning and optimization skills
└── meta/          # Skill management and evolution
```

## Skill Schema

Each skill follows this structure:

```yaml
---
name: "Skill Name"
description: "What this skill does and when to use it"
version: "1.0.0"
trigger: "When to activate this skill"
invariant: "What this skill guarantees"
dependencies: []
---
```

## Integration with ECP

Skills maintain ECP principles:
- **Invariants**: Each skill declares what it guarantees
- **Observability**: All skill execution logged with `[skill:name]` prefix
- **Rollback**: Skills include rollback strategies
- **Learning**: Skill performance captured in evolution journal

## Usage

Invoke skills via Cursor macros:
- `/use skill:name` - Execute specific skill
- `/list skills` - Show available skills
- `/skill help:name` - Show skill documentation

## Evolution

Skills evolve through:
- Performance tracking in `AUTONOMOUS_EVOLUTION_JOURNAL.md`
- Pattern detection and optimization
- User feedback and iteration
- Cross-skill learning and composition
