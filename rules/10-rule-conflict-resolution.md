# Rule Conflict Resolution

## Purpose

Ensure no two ECP rules contradict each other and maintain system coherence.

## Conflict Detection

**Automatic Scanning**: Before applying any rule change, scan for:
- Contradictory LOC limits (e.g., 150 vs 200)
- Conflicting observability requirements
- Opposing quality gates
- Incompatible rollback strategies

**Conflict Resolution Priority**:
1. **00-ecp-mode.md** (orchestrator) - highest priority
2. **02-ecp-commit-contract.md** (gating) - second priority  
3. **01-ecp-diagnostics.md** (diagnostics) - third priority
4. **08-autonomous-optimization.md** (optimization) - fourth priority
5. **09-build-anything-framework.md** (universal) - lowest priority

## Resolution Process

1. **Detect**: Log `[rule-conflict] detected between [rule1] and [rule2]`
2. **Analyze**: Identify specific contradiction and impact
3. **Resolve**: Apply priority-based resolution
4. **Document**: Record resolution in RULES_CHANGELOG.md
5. **Test**: Verify no remaining conflicts

## Common Conflicts

### LOC Limits
- **Conflict**: 150 LOC vs 200 LOC limits
- **Resolution**: Use 150 LOC (more restrictive)
- **Rationale**: Smaller commits are safer and more reviewable

### Observability Requirements
- **Conflict**: Different log prefix requirements
- **Resolution**: Use most specific prefix (e.g., [component.subcomponent])
- **Rationale**: More specific prefixes provide better debugging

### Quality Gates
- **Conflict**: Different testing requirements
- **Resolution**: Use most comprehensive testing approach
- **Rationale**: Higher quality gates prevent more issues

## Invariants

- No two rules can have contradictory requirements
- Resolution must maintain system functionality
- All conflicts must be logged and documented
- Resolution must be reversible

## Rollback

- Revert to previous rule versions if conflicts cannot be resolved
- Maintain system stability over rule completeness
- Document failed resolutions for future reference
