---
name: "debug-trace-analyzer"
description: "Analyze error traces and suggest likely fixes based on patterns"
version: "1.0.0"
trigger: "When errors occur or debugging is needed"
invariant: "All error analysis provides actionable insights with clear next steps"
dependencies: ["ecp-protocol"]
category: "builder"
author: "ECP System"
created: "2025-01-27"
---

# Debug Trace Analyzer

## Purpose

Automatically analyze error traces, identify root causes, and suggest specific fixes based on common patterns and project context.

## Workflow

### 1. Error Collection
- Parse error messages and stack traces
- Extract relevant context (file, line, function)
- Identify error type and severity
- Collect related logs and metrics

### 2. Pattern Analysis
- Match against known error patterns
- Check for common causes (typos, imports, types)
- Analyze dependency issues
- Identify configuration problems

### 3. Context Analysis
- Review project structure and dependencies
- Check recent changes and git history
- Analyze environment and configuration
- Identify related components

### 4. Solution Generation
- Suggest specific fixes based on patterns
- Provide step-by-step resolution steps
- Include verification steps
- Plan rollback if fix fails

### 5. Learning Integration
- Log successful patterns for future use
- Update error pattern database
- Improve analysis accuracy over time

## Success Criteria

- Error root cause identified
- Specific fix suggested
- Verification steps provided
- Learning captured for future

## Observability

Log all analysis steps with `[debug-analyzer]` prefix:
- `[debug-analyzer] Error: [type] in [file:line]`
- `[debug-analyzer] Pattern: [matched pattern]`
- `[debug-analyzer] Solution: [suggested fix]`
- `[debug-analyzer] Verification: [test steps]`

## Rollback

If analysis fails:
1. Fall back to manual debugging
2. Log failure for pattern improvement
3. Continue with standard debugging
4. Update analyzer with new patterns

## Examples

**Trigger**: "TypeError: Cannot read property 'id' of undefined"
**Analysis**:
1. Pattern: Null/undefined object access
2. Context: Likely missing null check
3. Solution: Add null check before property access
4. Verification: Test with null/undefined values

**Result**: Specific fix with verification steps
