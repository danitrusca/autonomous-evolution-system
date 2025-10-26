# ECP Design Phase Command

## Purpose
Initiates the ECP Design phase to plan architecture and approach after problem framing.

## Usage
```
/design
```

## What It Does
1. **Architecture Planning**: Designs the technical approach and system architecture
2. **Technology Selection**: Chooses appropriate technologies and patterns
3. **Integration Planning**: Plans how components will work together
4. **Risk Assessment**: Identifies potential risks and mitigation strategies
5. **Dependency Analysis**: Maps out dependencies and relationships

## ECP Integration
- **Invariant**: Architecture must be feasible and maintainable
- **Success Test**: Design must be implementable within constraints
- **Rollback**: Can return to Frame phase if design fails
- **Observability**: Logs all design decisions with `[ecp-design]` prefix

## Prerequisites
- Must have completed Frame phase
- Problem and constraints must be defined
- Success criteria must be clear

## Output
- Technical architecture diagram
- Technology stack decisions
- Integration patterns
- Risk mitigation strategies
- Next steps for Plan phase

## Examples
```
/design
# Designs authentication architecture
# Chooses Supabase Auth + Next.js middleware
# Plans JWT token handling
# Identifies security risks and mitigations
```

## Quality Gates
- Architecture must be feasible
- Technology choices must be justified
- Integration patterns must be clear
- Risks must be identified and mitigated

## Rollback Strategy
If design fails:
1. Return to Frame phase
2. Re-analyze problem and constraints
3. Consider alternative approaches
4. Retry with different architecture

## Observability
Logs with `[ecp-design]` prefix:
- `[ecp-design] Architecture: [system design]`
- `[ecp-design] Technology: [tech choices]`
- `[ecp-design] Integration: [integration patterns]`
- `[ecp-design] Risks: [risk assessment]`
