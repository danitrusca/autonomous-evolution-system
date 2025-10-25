---
name: "ecp-protocol-runner"
description: "Execute the full ECP workflow: Frame → Design → Plan → Implement → Review"
version: "1.0.0"
trigger: "When user requests feature development or complex changes"
invariant: "All code changes follow ECP principles with proper invariants and observability"
dependencies: ["ecp-mode", "macros"]
category: "core"
author: "ECP System"
created: "2025-01-27"
---

# ECP Protocol Runner

## Purpose

Execute the complete Epistemic Coding Protocol workflow to ensure all code changes follow ECP principles with proper architecture, invariants, and observability.

## Workflow

### 1. Frame
- Define the problem precisely before touching code
- Identify user-visible outcome
- Set constraints (LOC, deps, security, perf)
- Define observable success test
- Plan rollback strategy

### 2. Design
- Think in systems, not files
- Map dependency graph
- Define data boundaries
- Declare invariants
- Identify failure modes
- Set log prefixes

### 3. Plan
- Split work into reviewable chunks (≤150 LOC each)
- Define commit intentions
- Specify invariants per commit
- Plan testing approach
- Set observability requirements

### 4. Implement
- Generate only required files for current intention
- Keep code within defined boundaries
- Add meaningful comments for reasoning
- Include console logs with clear prefixes
- Follow ECP security rules

### 5. Review
- Run Challenge Block
- Verify invariants
- Check observability
- Confirm rollback plan
- Document lessons learned

## Success Criteria

- All phases completed with proper documentation
- Code follows ECP principles
- Invariants declared and verified
- Observability implemented
- Rollback plan defined

## Observability

Log all ECP phases with `[ecp-protocol]` prefix:
- `[ecp-protocol] Frame: [goal]`
- `[ecp-protocol] Design: [invariant]`
- `[ecp-protocol] Plan: [commits]`
- `[ecp-protocol] Implement: [files]`
- `[ecp-protocol] Review: [status]`

## Rollback

If ECP workflow fails:
1. Revert to previous stable state
2. Log failure in evolution journal
3. Continue with standard development
4. Analyze failure for protocol improvement

## Examples

**Trigger**: User says "Add user authentication"
**Execution**: 
1. Frame the authentication requirements
2. Design the auth system architecture
3. Plan the implementation steps
4. Implement with proper security
5. Review for vulnerabilities

**Result**: Secure, observable authentication system following ECP principles
