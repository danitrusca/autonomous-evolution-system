---
name: "pattern-detector"
description: "Continuously scan codebase and user behavior to detect patterns for skill generation"
version: "1.0.0"
trigger: "Continuously running in background to detect patterns"
invariant: "All detected patterns are validated and categorized before skill generation"
dependencies: ["autonomous-skill-learner"]
category: "autonomous"
author: "ECP System"
created: "2025-01-27"
---

# Pattern Detector

## Purpose

Continuously scan the codebase, user behavior, and development patterns to identify opportunities for autonomous skill generation.

## Workflow

### 1. Codebase Scanning
- Monitor file changes and git commits
- Track function usage and patterns
- Identify repeated code structures
- Detect common error patterns
- Analyze performance bottlenecks

### 2. User Behavior Analysis
- Track user commands and preferences
- Monitor skill usage patterns
- Identify workflow preferences
- Detect optimization opportunities
- Analyze success/failure patterns

### 3. Pattern Categorization
- **Success Patterns**: Repeated successful sequences
- **Failure Patterns**: Common error resolutions
- **Optimization Patterns**: Performance improvements
- **Workflow Patterns**: User behavior sequences
- **Integration Patterns**: System interaction patterns

### 4. Skill Opportunity Detection
- Identify patterns suitable for skill generation
- Assess pattern frequency and impact
- Evaluate skill generation feasibility
- Prioritize high-impact opportunities
- Plan skill generation approach

### 5. Learning Integration
- Update pattern recognition algorithms
- Improve detection accuracy
- Enhance categorization
- Optimize scanning performance
- Evolve detection capabilities

## Success Criteria

- Patterns detected and categorized
- Skill opportunities identified
- Learning algorithms improved
- Detection accuracy enhanced
- System capabilities expanded

## Observability

Log all pattern detection with `[pattern-detector]` prefix:
- `[pattern-detector] Scan: [codebase/user behavior]`
- `[pattern-detector] Pattern: [pattern type]`
- `[pattern-detector] Category: [pattern category]`
- `[pattern-detector] Opportunity: [skill opportunity]`
- `[pattern-detector] Learn: [algorithm update]`

## Rollback

If pattern detection fails:
1. Continue with existing patterns
2. Log failure for analysis
3. Maintain current skill set
4. Plan detection improvement

## Examples

**Codebase Pattern**: Repeated API error handling
**Detection**: "api-error-handler" pattern detected
**Opportunity**: Generate "api-error-resolver" skill
**Result**: Automatic API error resolution

**User Behavior Pattern**: Frequent database optimization
**Detection**: "query-optimization" pattern detected
**Opportunity**: Generate "query-optimizer" skill
**Result**: Automatic query optimization