# Skills Documentation
*Comprehensive documentation for the Skills Protocol system*

## Overview

The Skills Protocol transforms Cursor from episodic prompting to cumulative apprenticeship through persistent, callable procedures. Each skill embodies a specific capability that can be invoked, composed, and evolved.

## Documentation Structure

### 📚 **Core Documentation**
- [Skills Protocol Overview](README.md) - This file
- [Schema Reference](reference/schema.md) - Skill file structure and validation
- [Quick Reference](reference/quick-reference.md) - Immediate usage commands

### 🧠 **Autonomous Learning Documentation**
- [Autonomous Examples](autonomous/autonomous-examples.md) - How autonomous skills work
- [Pattern Detection](autonomous/pattern-detection.md) - Detecting learning patterns
- [Skill Generator](autonomous/skill-generator.md) - Creating skills automatically

### 🔧 **Meta Skills Documentation**
- [Advanced Intelligence Evolution](meta/advanced-intelligence-evolution.md) - Beyond recursive agency
- [Friction Feedback System](meta/friction-feedback-complete.md) - AI friction detection
- [Recursive Agency System](meta/recursive-agency-system.md) - Self-modifying capabilities
- [System Evolution](meta/system-evolution-addressing-weaknesses.md) - Addressing system weaknesses

### 🏗️ **Builder Skills Documentation**
- [Debug Trace Analyzer](builder/debug-trace-analyzer.md) - Error analysis and debugging

### 🔍 **Reflection Skills Documentation**
- [Learning Log Writer](reflection/learning-log-writer.md) - Capturing learning patterns

### 📖 **Examples Documentation**
- [Skill Creator Examples](examples/skill-creator-examples.md) - Real-world skill creation

## Architecture

**Actual Skills Location:**
```
/skills/
├── core/           # Essential development skills
├── builder/        # Construction and debugging skills  
├── reflection/     # Learning and optimization skills
├── meta/          # Skill management and evolution
└── autonomous/    # Self-learning and adaptation
```

**Documentation Location:**
```
/docs/skills/       # This folder - documentation only
├── reference/      # Core reference materials
├── autonomous/     # Autonomous learning documentation
├── meta/          # Meta-skills documentation
├── builder/       # Builder skills documentation
├── reflection/    # Reflection skills documentation
└── examples/      # Examples and tutorials
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
- Performance tracking in `AUTONOMOUS_EVOLUTION_JOURNAL_LIVING.md`
- Pattern detection and optimization
- User feedback and iteration
- Cross-skill learning and composition

## Quick Start

1. **Discover Skills**: `/list skills`
2. **Execute Skills**: `/use skill:skill-name`
3. **Get Help**: `/skill help:skill-name`
4. **Check Status**: `/skill status`
5. **Trigger Evolution**: `/skill evolve`

---

*The Skills Protocol represents the next evolution in AI-assisted development - from episodic problem-solving to cumulative learning and autonomous improvement.*
