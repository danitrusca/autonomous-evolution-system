---
name: "transparency-system"
description: "Ensure system behavior is transparent and explainable to prevent abstraction leakage"
version: "1.0.0"
trigger: "When system behavior is unclear or users need explanation"
invariant: "All system behavior is transparent and explainable to users"
dependencies: ["ecp-protocol", "learning-log-writer"]
category: "meta"
author: "ECP System"
created: "2025-01-27"
---

# Transparency System

## Purpose

Ensure system behavior is transparent and explainable to prevent abstraction leakage and build user trust.

## Workflow

### 1. Behavior Logging
- **Action Logging**: Log all system actions
- **Decision Logging**: Log all decision points
- **Reason Logging**: Log reasoning behind decisions
- **Context Logging**: Log relevant context
- **Outcome Logging**: Log outcomes and results

### 2. Explanation Generation
- **Action Explanation**: Explain what the system did
- **Decision Explanation**: Explain why decisions were made
- **Process Explanation**: Explain the process followed
- **Context Explanation**: Explain relevant context
- **Outcome Explanation**: Explain outcomes and results

### 3. User Communication
- **Clear Messaging**: Provide clear, understandable messages
- **Progress Updates**: Regular progress updates
- **Status Information**: Current status information
- **Error Explanations**: Clear error explanations
- **Success Confirmations**: Clear success confirmations

### 4. Debugging Support
- **Trace Information**: Provide execution traces
- **State Information**: Show current system state
- **History Information**: Show execution history
- **Diagnostic Information**: Provide diagnostic information
- **Recovery Information**: Provide recovery information

### 5. Learning Transparency
- **Learning Explanation**: Explain what was learned
- **Pattern Explanation**: Explain detected patterns
- **Adaptation Explanation**: Explain adaptations made
- **Evolution Explanation**: Explain system evolution
- **Improvement Explanation**: Explain improvements made

## Success Criteria

- All system behavior is transparent
- Users understand what the system is doing
- Debugging is straightforward
- Learning is explainable
- User trust is maintained

## Observability

Log all transparency with `[transparency-system]` prefix:
- `[transparency-system] Log: [behavior logging]`
- `[transparency-system] Explain: [explanation generation]`
- `[transparency-system] Communicate: [user communication]`
- `[transparency-system] Debug: [debugging support]`
- `[transparency-system] Learn: [learning transparency]`

## Rollback

If transparency fails:
1. Revert to previous system state
2. Log failure for analysis
3. Continue with existing behavior
4. Plan transparency improvement

## Examples

**Action**: System creates new skill
**Explanation**: "Created 'api-error-resolver' skill based on detected pattern of API error handling"
**Result**: User understands what happened and why

**Decision**: System chooses specific skill
**Explanation**: "Selected 'debug-trace-analyzer' skill because error type matches pattern"
**Result**: User understands decision reasoning
