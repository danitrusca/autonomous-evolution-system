---
name: "learning-log-writer"
description: "Automatically capture and structure lessons learned from development activities"
version: "1.0.0"
trigger: "After successful operations, code changes, or system optimizations"
invariant: "All lessons are captured in structured format for future reference and system improvement"
dependencies: ["ecp-protocol"]
category: "reflection"
author: "ECP System"
created: "2025-01-27"
---

# Learning Log Writer

## Purpose

Automatically capture lessons learned from development activities and structure them for future reference and system improvement.

## Workflow

### 1. Lesson Detection
- Monitor successful operations
- Identify key insights and patterns
- Extract actionable learnings
- Capture context and outcomes

### 2. Lesson Structuring
- Format with timestamp and context
- Categorize by type (security, performance, architecture)
- Include before/after states
- Add verification steps

### 3. Integration
- Append to AUTONOMOUS_EVOLUTION_JOURNAL_LIVING.md
- Update relevant skill documentation
- Trigger skill optimization if needed
- Cross-reference related lessons

### 4. Pattern Analysis
- Identify recurring themes
- Detect improvement opportunities
- Suggest protocol enhancements
- Plan systematic optimizations

### 5. Knowledge Synthesis
- Connect related lessons
- Build cumulative understanding
- Update system knowledge base
- Improve future decision-making

## Success Criteria

- Lesson captured with full context
- Structured for future reference
- Integrated with evolution journal
- Triggers optimization when appropriate

## Observability

Log all learning activities with `[learning-log]` prefix:
- `[learning-log] Captured: [lesson type]`
- `[learning-log] Context: [situation]`
- `[learning-log] Insight: [key learning]`
- `[learning-log] Integration: [where stored]`

## Rollback

If learning capture fails:
1. Continue with operation
2. Log failure for system improvement
3. Manual lesson capture if critical
4. Update learning system

## Examples

**Trigger**: Successful ECP protocol execution
**Capture**:
- What worked well in the process
- What could be improved
- New patterns discovered
- System optimization opportunities

**Result**: Structured lesson in evolution journal with actionable insights