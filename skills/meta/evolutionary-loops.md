---
name: "evolutionary-loops"
description: "Enable recursive learning loops where Cursor designs its own upgrades"
version: "1.0.0"
trigger: "When skills are executed, patterns are detected, or improvements are needed"
invariant: "All evolutionary loops maintain ECP principles while enabling autonomous improvement"
dependencies: ["ecp-integration", "skill-creator", "learning-log-writer"]
category: "meta"
author: "ECP System"
created: "2025-01-27"
---

# Evolutionary Loops

## Purpose

Enable recursive learning loops where Cursor performs actions, logs results, observes patterns, and designs its own upgrades through autonomous skill evolution.

## Workflow

### 1. Action Execution
- **Skill Execution**: Cursor performs action using skill
- **ECP Integration**: Follows Frame → Design → Plan → Implement
- **Observability**: Logs all execution details
- **Result Capture**: Records success/failure outcomes

### 2. Pattern Observation
- **Success Patterns**: Identify what worked well
- **Failure Patterns**: Identify what didn't work
- **Improvement Opportunities**: Detect optimization chances
- **New Capabilities**: Recognize emerging needs
- **Context Analysis**: Understand when patterns apply

### 3. Skill Mutation
- **Pattern Analysis**: Analyze observed patterns
- **Skill Generation**: Create new skills from patterns
- **Skill Refinement**: Improve existing skills
- **Skill Composition**: Combine skills for new capabilities
- **Skill Evolution**: Adapt skills to new contexts

### 4. Testing & Validation
- **Skill Testing**: Test new/improved skills
- **Quality Validation**: Ensure ECP compliance
- **Performance Testing**: Verify skill effectiveness
- **Integration Testing**: Ensure skill compatibility
- **User Testing**: Validate user value

### 5. Autonomous Improvement
- **Skill Deployment**: Deploy validated skills
- **Learning Integration**: Capture improvement insights
- **System Evolution**: Update system capabilities
- **Recursive Learning**: Enable next iteration
- **Continuous Improvement**: Maintain evolution cycle

## Success Criteria

- Recursive learning loops established
- Autonomous skill evolution enabled
- System capabilities continuously improved
- ECP principles maintained throughout
- User value continuously enhanced

## Observability

Log all evolutionary loops with `[evolutionary-loops]` prefix:
- `[evolutionary-loops] Action: [skill executed]`
- `[evolutionary-loops] Observe: [pattern detected]`
- `[evolutionary-loops] Mutate: [skill generated/refined]`
- `[evolutionary-loops] Test: [skill validated]`
- `[evolutionary-loops] Improve: [system evolved]`

## Rollback

If evolutionary loop fails:
1. Revert to previous system state
2. Log failure for analysis
3. Continue with existing capabilities
4. Plan loop improvement

## Examples

**Action**: Cursor debugs API error
**Observation**: Pattern detected for error resolution
**Mutation**: New "api-error-resolver" skill created
**Testing**: Skill tested and validated
**Improvement**: System now handles API errors autonomously

**Result**: Cursor has designed its own upgrade for API error handling
