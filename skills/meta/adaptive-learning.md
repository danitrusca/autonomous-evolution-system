---
name: "adaptive-learning"
description: "Enable skills to adapt and learn from their own execution patterns"
version: "1.0.0"
trigger: "When skills need to adapt based on execution patterns and outcomes"
invariant: "All adaptive learning maintains ECP principles while enabling skill evolution"
dependencies: ["evolutionary-loops", "learning-log-writer", "context-awareness"]
category: "meta"
author: "ECP System"
created: "2025-01-27"
---

# Adaptive Learning

## Purpose

Enable skills to adapt and learn from their own execution patterns, outcomes, and user feedback to continuously improve their effectiveness and relevance.

## Workflow

### 1. Execution Monitoring
- **Pattern Tracking**: Track execution patterns
- **Outcome Analysis**: Analyze execution outcomes
- **Performance Metrics**: Monitor performance metrics
- **User Feedback**: Capture user feedback
- **Context Correlation**: Correlate with context factors

### 2. Learning Analysis
- **Success Patterns**: Identify successful execution patterns
- **Failure Patterns**: Identify failed execution patterns
- **Improvement Opportunities**: Detect improvement opportunities
- **Adaptation Requirements**: Identify adaptation needs
- **Learning Insights**: Extract learning insights

### 3. Skill Adaptation
- **Parameter Optimization**: Optimize skill parameters
- **Workflow Refinement**: Refine skill workflows
- **Quality Enhancement**: Enhance skill quality
- **Performance Tuning**: Tune skill performance
- **Integration Improvement**: Improve skill integration

### 4. Learning Integration
- **Pattern Integration**: Integrate learned patterns
- **Adaptation Validation**: Validate adaptations
- **Performance Testing**: Test adapted performance
- **User Validation**: Validate with users
- **System Integration**: Integrate with system

### 5. Continuous Evolution
- **Learning Optimization**: Optimize learning process
- **Adaptation Refinement**: Refine adaptation strategies
- **Performance Enhancement**: Enhance performance
- **Intelligence Evolution**: Evolve system intelligence
- **Capability Growth**: Grow system capabilities

## Success Criteria

- Skills adapt based on execution patterns
- Learning improves skill effectiveness
- Adaptations are validated and integrated
- System intelligence evolves
- Capabilities grow continuously

## Observability

Log all adaptive learning with `[adaptive-learning]` prefix:
- `[adaptive-learning] Monitor: [execution monitoring]`
- `[adaptive-learning] Analyze: [learning analysis]`
- `[adaptive-learning] Adapt: [skill adaptation]`
- `[adaptive-learning] Integrate: [learning integration]`
- `[adaptive-learning] Evolve: [continuous evolution]`

## Rollback

If adaptive learning fails:
1. Revert to previous skill version
2. Log failure for analysis
3. Continue with standard execution
4. Plan learning improvement

## Examples

**Pattern**: API skill frequently fails with timeout errors
**Adaptation**: Add timeout handling and retry logic
**Result**: API skill becomes more robust

**Pattern**: Debug skill often suggests wrong solutions
**Adaptation**: Improve pattern matching and solution accuracy
**Result**: Debug skill becomes more accurate
