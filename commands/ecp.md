# ECP Full Workflow Command

## Purpose
Executes the complete ECP workflow: Frame → Design → Plan → Implement → Review.

## Usage
```
/ecp
```

## What It Does
1. **Frame Phase**: Defines problem, constraints, and success criteria
2. **Design Phase**: Plans architecture and approach
3. **Plan Phase**: Breaks down into manageable tasks
4. **Implement Phase**: Executes implementation with quality gates
5. **Review Phase**: Learns and improves for next iteration

## ECP Integration
- **Invariant**: Each phase must complete successfully before next
- **Success Test**: Final implementation must meet all success criteria
- **Rollback**: Can return to any previous phase if needed
- **Observability**: Logs all phases with `[ecp-workflow]` prefix

## Prerequisites
- Clear understanding of what needs to be built
- Access to codebase and development environment
- Autonomous skills system must be available

## Output
- Complete implementation following ECP principles
- Comprehensive testing and documentation
- Lessons learned and improvement suggestions
- Autonomous skill evolution triggered

## Examples
```
/ecp
# Executes full ECP workflow for new feature:
# 1. Frames the problem and constraints
# 2. Designs the architecture
# 3. Plans the implementation
# 4. Implements with quality gates
# 5. Reviews and learns for next time
```

## Quality Gates
- Each phase must meet its success criteria
- Implementation must follow ECP principles
- All tests must pass
- Documentation must be complete

## Rollback Strategy
If any phase fails:
1. Return to previous successful phase
2. Analyze failure cause
3. Adjust approach if needed
4. Retry from that phase

## Observability
Logs with `[ecp-workflow]` prefix:
- `[ecp-workflow] Frame: [problem definition]`
- `[ecp-workflow] Design: [architecture planning]`
- `[ecp-workflow] Plan: [task breakdown]`
- `[ecp-workflow] Implement: [code execution]`
- `[ecp-workflow] Review: [learning capture]`
