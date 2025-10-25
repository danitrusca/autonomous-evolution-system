# ECP Frame Phase Command

## Purpose
Initiates the ECP Frame phase to define problems, constraints, and success criteria before any development work.

## Usage
```
/frame
```

## What It Does
1. **Problem Definition**: Analyzes the current context to identify the core problem
2. **Constraint Analysis**: Identifies technical, time, and resource constraints
3. **Success Criteria**: Defines observable success metrics
4. **Context Gathering**: Collects relevant information from the codebase
5. **Stakeholder Alignment**: Ensures understanding of requirements

## ECP Integration
- **Invariant**: Problem definition must be clear and measurable
- **Success Test**: Observable success criteria defined
- **Rollback**: Can return to previous state if framing fails
- **Observability**: Logs all framing decisions with `[ecp-frame]` prefix

## Output
- Problem statement with clear constraints
- Success criteria that are observable
- Context summary of current system state
- Next steps for Design phase

## Examples
```
/frame
# Analyzes current teaching app context
# Defines problem: "Need user authentication system"
# Identifies constraints: "Must integrate with Supabase"
# Sets success criteria: "Users can login/logout securely"
```

## Quality Gates
- Problem must be clearly defined
- Constraints must be realistic
- Success criteria must be observable
- Context must be comprehensive

## Rollback Strategy
If framing fails:
1. Return to previous state
2. Log failure for analysis
3. Request clarification
4. Retry with more context

## Observability
Logs with `[ecp-frame]` prefix:
- `[ecp-frame] Problem: [problem definition]`
- `[ecp-frame] Constraints: [constraint analysis]`
- `[ecp-frame] Success: [success criteria]`
- `[ecp-frame] Context: [context summary]`
