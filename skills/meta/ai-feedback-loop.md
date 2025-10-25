---
name: "ai-feedback-loop"
description: "Create continuous AI feedback loop for system improvement and optimization"
version: "1.0.0"
trigger: "When AI feedback is needed for continuous system improvement"
invariant: "All AI feedback is captured, analyzed, and used for system optimization"
dependencies: ["ai-friction-detection", "adaptive-learning", "transparency-system"]
category: "meta"
author: "ECP System"
created: "2025-01-27"
---

# AI Feedback Loop

## Purpose

Create continuous AI feedback loop for system improvement and optimization, ensuring the system evolves based on real AI usage patterns and needs.

## Workflow

### 1. Feedback Collection
- **Usage Feedback**: Collect feedback from AI skill usage
- **Performance Feedback**: Collect performance metrics and outcomes
- **Friction Feedback**: Collect friction patterns and pain points
- **Satisfaction Feedback**: Collect satisfaction and effectiveness ratings
- **Learning Feedback**: Collect learning and adaptation insights

### 2. Feedback Analysis
- **Pattern Recognition**: Identify recurring feedback patterns
- **Trend Analysis**: Analyze feedback trends over time
- **Correlation Analysis**: Correlate feedback with system behavior
- **Impact Assessment**: Assess feedback impact on system performance
- **Priority Ranking**: Rank feedback by importance and frequency

### 3. Feedback Processing
- **Feedback Categorization**: Categorize feedback by type and source
- **Feedback Validation**: Validate feedback accuracy and relevance
- **Feedback Aggregation**: Aggregate similar feedback for analysis
- **Feedback Prioritization**: Prioritize feedback for action
- **Feedback Integration**: Integrate feedback into system knowledge

### 4. System Improvement
- **Skill Improvement**: Improve skills based on feedback
- **Interface Improvement**: Improve interfaces based on feedback
- **Performance Improvement**: Improve performance based on feedback
- **Learning Improvement**: Improve learning mechanisms based on feedback
- **System Optimization**: Optimize overall system based on feedback

### 5. Feedback Validation
- **Improvement Testing**: Test improvements based on feedback
- **Effectiveness Measurement**: Measure improvement effectiveness
- **Feedback Loop Closure**: Close feedback loop with results
- **Continuous Monitoring**: Monitor for new feedback
- **Iterative Improvement**: Iterate based on feedback results

## Success Criteria

- AI feedback is continuously collected and analyzed
- System improvements are based on feedback
- Feedback loop is closed with measurable results
- System performance is optimized based on feedback
- Continuous improvement is achieved

## Observability

Log all AI feedback loop with `[ai-feedback-loop]` prefix:
- `[ai-feedback-loop] Collect: [feedback collection]`
- `[ai-feedback-loop] Analyze: [feedback analysis]`
- `[ai-feedback-loop] Process: [feedback processing]`
- `[ai-feedback-loop] Improve: [system improvement]`
- `[ai-feedback-loop] Validate: [feedback validation]`

## Rollback

If AI feedback loop fails:
1. Revert to previous system state
2. Log failure for analysis
3. Continue with existing system
4. Plan feedback loop improvement

## Examples

**Feedback**: AI struggles with complex skill interfaces
**Analysis**: Skill execution friction detected
**Processing**: Categorize as interface improvement feedback
**Improvement**: Simplify skill interfaces, add quick-start modes
**Validation**: Test simplified interfaces, measure effectiveness
**Result**: AI can use skills more efficiently

**Feedback**: AI needs skills that don't exist
**Analysis**: Skill learning friction detected
**Processing**: Categorize as capability gap feedback
**Improvement**: Create missing skills, improve skill generation
**Validation**: Test new skills, measure effectiveness
**Result**: AI has access to needed capabilities
