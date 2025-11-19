---
name: "autonomous-executor"
description: "Automatically execute skills based on context and patterns without user input"
version: "1.0.0"
trigger: "When context matches skill triggers or patterns are detected"
invariant: "All autonomous execution maintains ECP principles and user safety"
dependencies: ["skill-generator", "pattern-detector", "autonomous-skill-learner"]
category: "autonomous"
author: "ECP System"
created: "2025-01-27"
---

# Autonomous Executor

## Purpose

Automatically execute skills based on context, patterns, and system state without requiring user input, creating a truly autonomous development environment.

## Workflow

### 1. Context Analysis
- Analyze current development context
- Identify skill trigger conditions
- Assess system state and needs
- Evaluate skill execution opportunities
- Determine execution priority

### 2. Skill Selection
- Match context to available skills
- Evaluate skill effectiveness
- Consider skill dependencies
- Assess execution safety
- Plan skill execution sequence

### 3. Autonomous Execution
- Execute selected skills automatically
- Monitor execution progress
- Handle execution errors
- Ensure ECP compliance
- Maintain system safety

### 4. Result Integration
- Integrate execution results
- Update system state
- Trigger dependent skills
- Update learning algorithms
- Capture execution insights

### 5. Learning Integration
- Capture execution patterns
- Update skill effectiveness
- Improve context analysis
- Enhance skill selection
- Evolve autonomous capabilities

## Success Criteria

- Skills executed autonomously
- Context analysis accurate
- Execution results integrated
- Learning algorithms improved
- System capabilities enhanced

## Observability

Log all autonomous execution with `[autonomous-executor]` prefix:
- `[autonomous-executor] Context: [context analyzed]`
- `[autonomous-executor] Select: [skill selected]`
- `[autonomous-executor] Execute: [skill executed]`
- `[autonomous-executor] Result: [execution result]`
- `[autonomous-executor] Learn: [insight captured]`

## Rollback

If autonomous execution fails:
1. Revert to previous system state
2. Log failure for analysis
3. Continue with manual operation
4. Plan execution improvement

## Examples

**Context**: API error detected
**Execution**: Automatically run "api-error-resolver" skill
**Result**: API error resolved without user input

**Context**: Database query slow
**Execution**: Automatically run "query-optimizer" skill
**Result**: Query optimized automatically

**Context**: Code complexity high
**Execution**: Automatically run "code-refactor" skill
**Result**: Code refactored automatically

## Execution

```javascript executable
const AutonomousExecutor = require('./scripts/execute-autonomous');
const executor = new AutonomousExecutor();
await executor.execute();
```
