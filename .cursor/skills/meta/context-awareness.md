---
name: "context-awareness"
description: "Enhanced context awareness for skills to adapt to different development scenarios"
version: "1.0.0"
trigger: "When skills need to adapt to different contexts or scenarios"
invariant: "All skills maintain context awareness and adapt appropriately"
dependencies: ["ecp-integration", "learning-log-writer"]
category: "meta"
author: "ECP System"
created: "2025-01-27"
---

# Context Awareness

## Purpose

Enable skills to be context-aware and adapt to different development scenarios, project types, and user preferences for more intelligent and relevant skill execution.

## Workflow

### 1. Context Detection
- **Project Type**: Identify project type (web, mobile, API, etc.)
- **Technology Stack**: Detect frameworks and tools in use
- **Development Phase**: Identify current development phase
- **User Preferences**: Learn from user behavior patterns
- **Environmental Factors**: Consider team size, deadlines, complexity

### 2. Context Analysis
- **Relevance Scoring**: Score skills based on context relevance
- **Adaptation Requirements**: Identify how skills need to adapt
- **Resource Constraints**: Consider available resources and time
- **Quality Requirements**: Adjust quality gates based on context
- **Integration Needs**: Determine integration requirements

### 3. Skill Adaptation
- **Parameter Adjustment**: Modify skill parameters for context
- **Workflow Customization**: Adapt workflow steps for context
- **Quality Calibration**: Adjust quality gates for context
- **Resource Allocation**: Optimize resource usage for context
- **Integration Optimization**: Optimize for context integration

### 4. Context Learning
- **Pattern Recognition**: Learn from context patterns
- **Adaptation Success**: Track adaptation effectiveness
- **User Feedback**: Incorporate user feedback on adaptations
- **Context Evolution**: Adapt to changing contexts
- **Learning Integration**: Capture context learning insights

### 5. Continuous Improvement
- **Context Optimization**: Improve context detection
- **Adaptation Refinement**: Refine adaptation strategies
- **Learning Enhancement**: Improve context learning
- **Integration Evolution**: Evolve context integration
- **System Intelligence**: Enhance overall system intelligence

## Success Criteria

- Skills adapt appropriately to context
- Context detection is accurate
- Adaptation improves skill effectiveness
- Learning captures context insights
- System intelligence enhanced

## Observability

Log all context awareness with `[context-awareness]` prefix:
- `[context-awareness] Detect: [context identified]`
- `[context-awareness] Analyze: [context analysis]`
- `[context-awareness] Adapt: [skill adapted]`
- `[context-awareness] Learn: [context learning]`
- `[context-awareness] Improve: [system enhancement]`

## Rollback

If context awareness fails:
1. Revert to default skill behavior
2. Log failure for analysis
3. Continue with standard execution
4. Plan context awareness improvement

## Examples

**Context**: Web development project with React
**Adaptation**: API skills focus on REST endpoints, UI skills focus on React components
**Result**: Skills optimized for React development context

**Context**: Mobile development with tight deadlines
**Adaptation**: Skills prioritize speed over perfection, focus on MVP features
**Result**: Skills optimized for rapid mobile development
