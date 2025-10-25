---
name: "ai-friction-detection"
description: "Detect friction in AI skill usage to guide system evolution and improvement"
version: "1.0.0"
trigger: "When AI experiences friction using skills or solving problems"
invariant: "All AI friction is detected, analyzed, and used for system improvement"
dependencies: ["transparency-system", "adaptive-learning", "simplicity-principle"]
category: "meta"
author: "ECP System"
created: "2025-01-27"
---

# AI Friction Detection

## Purpose

Detect friction in AI skill usage to guide system evolution and improvement, ensuring skills are optimized for AI problem-solving and optimization.

## Workflow

### 1. Friction Detection
- **Skill Discovery Friction**: AI can't find the right skill for a problem
- **Skill Execution Friction**: Skills are too complex or unclear to use
- **Skill Composition Friction**: Skills don't work well together
- **Skill Learning Friction**: AI needs skills that don't exist yet
- **Skill Maintenance Friction**: Skills become outdated or irrelevant

### 2. Friction Analysis
- **Pattern Recognition**: Identify recurring friction patterns
- **Root Cause Analysis**: Determine why friction occurs
- **Impact Assessment**: Assess friction impact on problem-solving
- **Priority Ranking**: Rank friction by importance and frequency
- **Solution Identification**: Identify potential solutions

### 3. Friction-Based Adaptation
- **Skill Simplification**: Simplify skills that cause execution friction
- **Skill Discovery**: Improve skill discovery and suggestion
- **Skill Composition**: Enhance skill integration and orchestration
- **Skill Generation**: Create new skills to address missing capabilities
- **Skill Maintenance**: Update and maintain skills proactively

### 4. Friction Learning
- **Pattern Learning**: Learn from friction patterns
- **Adaptation Learning**: Learn from successful adaptations
- **Prevention Learning**: Learn to prevent future friction
- **Optimization Learning**: Learn to optimize skill effectiveness
- **Evolution Learning**: Learn to evolve system capabilities

### 5. Continuous Friction Reduction
- **Friction Monitoring**: Continuously monitor for friction
- **Adaptation Application**: Apply learned adaptations
- **System Evolution**: Evolve system based on friction insights
- **Performance Optimization**: Optimize system performance
- **Capability Enhancement**: Enhance system capabilities

## Success Criteria

- AI friction is detected and analyzed
- Skills are adapted based on friction patterns
- System evolves to reduce friction
- AI problem-solving is optimized
- Continuous improvement is achieved

## Observability

Log all AI friction detection with `[ai-friction-detection]` prefix:
- `[ai-friction-detection] Detect: [friction detection]`
- `[ai-friction-detection] Analyze: [friction analysis]`
- `[ai-friction-detection] Adapt: [friction-based adaptation]`
- `[ai-friction-detection] Learn: [friction learning]`
- `[ai-friction-detection] Reduce: [continuous friction reduction]`

## Rollback

If friction detection fails:
1. Revert to previous system state
2. Log failure for analysis
3. Continue with existing skills
4. Plan friction detection improvement

## Examples

**Friction**: AI can't find skill for API debugging
**Detection**: Skill discovery friction detected
**Analysis**: No specific API debugging skill exists
**Adaptation**: Create or suggest API debugging skill
**Result**: Friction reduced, AI can solve API problems

**Friction**: Skill is too complex to use quickly
**Detection**: Skill execution friction detected
**Analysis**: Skill interface is too complex
**Adaptation**: Simplify skill interface and add quick start
**Result**: Friction reduced, AI can use skill efficiently
