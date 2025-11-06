---
name: "adaptive-execution-mode"
description: "Automatically select optimal execution mode (fast vs careful) based on problem characteristics"
version: "1.0.0"
trigger: "When a task needs execution mode selection"
invariant: "Mode selection maintains system safety while optimizing for speed when appropriate"
dependencies: ["skill-composition-system", "meta-learning-system"]
category: "meta"
author: "ECP System"
created: "2025-01-27"
---

# Adaptive Execution Mode

## Purpose

Automatically analyze problem characteristics and select the optimal execution mode (fast/parallel vs careful/sequential) based on complexity, risk, clarity, reversibility, and validation requirements.

## Workflow

### 1. Problem Analysis
- **Complexity Assessment**: Analyze problem complexity (low/medium/high)
- **Risk Assessment**: Evaluate risk level (low/medium/high)
- **Clarity Assessment**: Determine solution clarity (clear/unclear)
- **Reversibility Assessment**: Check if changes are easily reversible
- **Validation Assessment**: Determine if automated validation is available

### 2. Mode Selection
- **Fast Mode**: For low-complexity, low-risk, clear problems
- **Careful Mode**: For high-complexity, high-risk, unclear problems
- **Hybrid Mode**: Run both modes in parallel and compare results
- **Context-Aware**: Consider project context, phase, and constraints

### 3. Execution
- **Fast Mode Execution**: Parallel execution with automated validation
- **Careful Mode Execution**: Sequential execution with validation gates
- **Hybrid Mode Execution**: Both modes in parallel, compare outcomes
- **Monitoring**: Track execution progress and outcomes

### 4. Outcome Evaluation
- **Success Metrics**: Measure success rate, time saved, errors introduced
- **Quality Metrics**: Assess solution quality, maintainability, robustness
- **Learning Capture**: Record which mode worked best for this problem type

### 5. Learning Integration
- **Pattern Recognition**: Identify patterns in successful mode selections
- **Framework Updates**: Update decision framework based on outcomes
- **Predictive Selection**: Improve future mode selection accuracy

## Decision Criteria

### Fast Mode Indicators
- Complexity < 0.3 (low)
- Risk < 0.3 (low)
- Clarity > 0.7 (high)
- Reversibility > 0.7 (high)
- Validation > 0.7 (high)

### Careful Mode Indicators
- Complexity > 0.7 (high)
- Risk > 0.7 (high)
- Clarity < 0.3 (low)
- Reversibility < 0.3 (low)
- Validation < 0.3 (low)

### Hybrid Mode Indicators
- Medium complexity (0.3-0.7)
- Medium risk (0.3-0.7)
- Multiple valid approaches available
- Time allows for comparison

## Success Criteria

- Correct mode selected for problem type
- Execution completes successfully
- Quality maintained or improved
- Learning captured for future decisions
- Decision framework improved

## Integration

- **SkillCompositionSystem**: Uses mode selection for skill execution
- **AgentCoordinator**: Routes tasks based on execution mode
- **MetaLearningSystem**: Learns from mode selection outcomes
- **EvolutionEngine**: Applies mode selection to evolution strategies

## Examples

### Fast Mode Example
```javascript
{
  problem: "Fix typo in error message",
  complexity: 0.1,
  risk: 0.1,
  clarity: 0.9,
  reversibility: 0.9,
  validation: 0.9,
  selectedMode: "fast"
}
```

### Careful Mode Example
```javascript
{
  problem: "Refactor authentication system",
  complexity: 0.9,
  risk: 0.9,
  clarity: 0.3,
  reversibility: 0.2,
  validation: 0.4,
  selectedMode: "careful"
}
```

### Hybrid Mode Example
```javascript
{
  problem: "Optimize database query",
  complexity: 0.5,
  risk: 0.5,
  clarity: 0.6,
  reversibility: 0.7,
  validation: 0.8,
  selectedMode: "hybrid"
}
```

## References

- Rule: `24-speed-vs-quality-decision-framework.md`
- System: `skill-composition-system.js`
- Learning: `meta-learning-system.js`

