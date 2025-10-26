# ECP Plan Phase Command

## Purpose
Initiates the ECP Plan phase to break down implementation into manageable steps.

## Usage
```
/plan
```

## What It Does
1. **Task Breakdown**: Breaks implementation into small, manageable tasks
2. **Dependency Mapping**: Identifies task dependencies and order
3. **Resource Allocation**: Plans time and effort for each task
4. **Risk Mitigation**: Plans for potential issues and solutions
5. **Testing Strategy**: Plans testing approach for each component

## ECP Integration
- **Invariant**: Plan must be executable and testable
- **Success Test**: Each task must have clear completion criteria
- **Rollback**: Can return to Design phase if planning fails
- **Observability**: Logs all planning decisions with `[ecp-plan]` prefix

## Prerequisites
- Must have completed Design phase
- Architecture and approach must be defined
- Technology choices must be made

## Output
- Detailed task breakdown
- Implementation timeline
- Dependency graph
- Testing strategy
- Next steps for Implement phase

## Examples
```
/plan
# Breaks down auth implementation:
# 1. Set up Supabase Auth
# 2. Create login/logout components
# 3. Add middleware for protection
# 4. Write tests for each component
```

## Quality Gates
- Tasks must be small and focused
- Dependencies must be clear
- Timeline must be realistic
- Testing must be comprehensive

## Rollback Strategy
If planning fails:
1. Return to Design phase
2. Simplify architecture
3. Reduce scope if needed
4. Retry with simpler plan

## Observability
Logs with `[ecp-plan]` prefix:
- `[ecp-plan] Tasks: [task breakdown]`
- `[ecp-plan] Dependencies: [dependency map]`
- `[ecp-plan] Timeline: [implementation schedule]`
- `[ecp-plan] Testing: [testing strategy]`
