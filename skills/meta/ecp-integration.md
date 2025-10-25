---
name: "ecp-integration"
description: "Integrate ECP protocol into every skill execution for systematic development"
version: "1.0.0"
trigger: "When any skill is executed, ECP protocol is automatically applied"
invariant: "All skill execution follows ECP principles with Frame → Design → Plan → Implement"
dependencies: ["ecp-protocol", "skill-creator", "skill-validator"]
category: "meta"
author: "ECP System"
created: "2025-01-27"
---

# ECP Integration

## Purpose

Integrate the Epistemic Coding Protocol (ECP) into every skill execution, ensuring all skills follow the systematic Frame → Design → Plan → Implement workflow.

## Workflow

### 1. Frame Integration
- **Automatic Frame**: Every skill execution starts with Frame
- **Goal Definition**: Clear user-visible outcome
- **Constraints**: LOC, deps, security, performance
- **Success Test**: Observable behavior
- **Rollback**: Files/commits to revert

### 2. Design Integration
- **Dependency Graph**: Skill relationships and dependencies
- **Data Boundaries**: What each skill owns
- **Invariants**: Truths that hold
- **Failure Modes**: What breaks and how to observe
- **Log Prefixes**: Component-specific logging

### 3. Plan Integration
- **Commit Planning**: Split work into reviewable chunks
- **Intention Definition**: Clear commit intentions
- **Invariant Declaration**: What each commit guarantees
- **Testing Approach**: How to verify success
- **Observability**: What to log and monitor

### 4. Implement Integration
- **Code Generation**: Only required files for current intention
- **Boundary Maintenance**: Keep code within defined boundaries
- **Comment Reasoning**: Why, not what
- **Logging**: Clear prefixes for observability
- **ECP Compliance**: Follow all ECP principles

### 5. Review Integration
- **Challenge Block**: Run systematic review
- **Invariant Verification**: Check what was guaranteed
- **Observability Check**: Ensure proper logging
- **Rollback Verification**: Confirm rollback plan
- **Learning Capture**: Document lessons learned

## Success Criteria

- All skills execute with ECP protocol
- Frame → Design → Plan → Implement workflow
- Invariants declared and verified
- Observability implemented
- Learning captured

## Observability

Log all ECP integration with `[ecp-integration]` prefix:
- `[ecp-integration] Frame: [goal defined]`
- `[ecp-integration] Design: [invariant declared]`
- `[ecp-integration] Plan: [commits planned]`
- `[ecp-integration] Implement: [code generated]`
- `[ecp-integration] Review: [challenge block]`

## Rollback

If ECP integration fails:
1. Revert to previous skill state
2. Log failure for analysis
3. Continue with standard execution
4. Plan ECP integration improvement

## Examples

**Skill Execution**: Any skill runs
**ECP Integration**: Frame → Design → Plan → Implement
**Result**: Systematic, high-quality skill execution

**Autonomous Learning**: System learns from ECP execution
**Evolution**: Skills improve through ECP feedback
**Result**: Self-improving skill ecosystem
