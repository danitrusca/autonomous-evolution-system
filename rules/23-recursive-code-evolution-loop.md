# Recursive Code Evolution Loop (RCEL) Protocol

## Purpose

Automatically refine working code through second-thought passes after successful implementation, elevating elegance, readability, composability, and observability while preserving behavior. RCEL transforms functional code into artful, maintainable code through systematic refinement.

## Core Principles

### 1. Second-Thought Refinement
- **Working First**: Only refine code that is already functional and tested
- **Minimal Deltas**: Small, high-leverage improvements (≤150 LOC/file per pass)
- **Behavior Preservation**: All changes must maintain identical functionality
- **Elegance Focus**: Prioritize clarity, readability, and composability over cleverness

### 2. Integration with ECP Workflow
RCEL activates automatically after Implement phase:
```
Standard Mode: Frame → Design → Plan → Implement → [RCEL Refinement] → Review
Quick Mode: Skip RCEL (speed prioritized over refinement)
Emergency Mode: Skip RCEL (stability prioritized over refinement)
```

### 3. Boundaries with Autonomous Optimization
- **Rule 08 (Autonomous Optimization)**: Continuous background optimization, broad scope (performance, security, architecture, code quality)
- **RCEL Protocol**: Focused post-Implement refinement, elegance-specific (readability, composability, naming, structure)
- **Complementary Roles**: Rule 08 optimizes system-wide; RCEL refines recent implementations

## Automatic Triggers

### When RCEL Activates
- After successful Implement phase completion
- Only in **Standard Mode** or **Feature Mode** (not Quick/Emergency)
- Optional threshold: LOC > 30 or elegance score < 7.0 in changed files
- Maximum **1 refinement pass** per Implement phase (vs 3 passes for manual skill)
- Respects ECP commit LOC limit: ≤150 LOC total per refinement

### When RCEL Skips
- Quick Mode (≤50 LOC, speed prioritized)
- Emergency Mode (stability prioritized)
- Commit message contains `[no-rcel]`
- LOC ≤ 30 and elegance score ≥ 7.0 (optional threshold)
- Already refined in current commit (prevents loops)

## Refinement Lenses

RCEL applies five lenses to identify improvement opportunities:

1. **Elegance**: Simplify, clarify, and express intent cleanly
2. **Readability**: Names, spacing, rhythm, and cognitive flow
3. **Composability**: Structure modules for reuse and graceful scaling
4. **Observability**: Add logs/tests that reveal behavior under stress
5. **Kairos**: Adjust rhythm; remove dissonance; feel when to stop

## RCEL Workflow (Automatic Mode)

### 1. Analysis
- Scan changed files for: complexity, cohesion, naming clarity, duplication
- Apply refinement lenses to identify opportunities
- Prioritize high-leverage improvements
- Estimate LOC impact (must stay ≤150 LOC total)

### 2. Delta Proposal
- Propose 3–5 elegant deltas based on scan results
- Ensure each delta respects LOC cap
- Focus on: naming improvements, helper extraction, structure clarity, boundary definition

### 3. Apply Minimal Diffs
- Generate minimal diffs only (no full rewrites)
- Apply patches to codebase
- Ensure all changes are observable and reversible
- Maintain behavior equivalence

### 4. Verification
- Run typecheck (npm/pnpm/yarn typecheck)
- Run test suite (npm/pnpm/yarn test)
- Verify behavior remains identical
- If verification fails: rollback immediately

### 5. Documentation
- Log refinement with `[rcel]` prefix
- Track elegance improvements (if scoring available)
- Document in commit message or evolution journal

## Invariants

RCEL **must** guarantee:
- Never exceed 150 LOC touched per file per pass
- Never exceed 150 LOC total per refinement (respects ECP commit limit)
- Only apply diffs; never full rewrites
- Behavior must remain identical (tests/types all pass)
- All edits are observable and reversible
- Maximum 1 automatic pass per Implement phase
- Aesthetic principle: elegance > cleverness > speed

## Success Criteria

- Code improved in at least one refinement lens
- All tests and typechecks pass
- Behavior remains identical
- LOC limits respected
- Changes are observable and reversible
- No performance regression

## Observability

Log all RCEL activities with `[rcel]` prefix:
- `[rcel] Triggered: Analyzing ${file_count} changed files`
- `[rcel] Proposed: ${delta_count} improvements (${loc_estimate} LOC)`
- `[rcel] Applied: Refinements complete`
- `[rcel] Verified: Types ✓, Tests ✓`
- `[rcel] Skipped: ${reason}` (Quick mode, threshold not met, etc.)
- `[rcel] Failed: Rolling back` (if verification fails)

## Rollback Strategy

If RCEL refinement fails:
1. **Immediate Rollback**: Revert to state before refinement
2. **Log Failure**: Record reason in evolution journal
3. **Continue**: Existing code remains functional
4. **Learn**: Analyze failure for protocol improvement
5. **Document**: Capture lessons for future refinement

## Opt-Out Mechanisms

Users can skip RCEL refinement via:
- **Quick Mode**: Automatically skips RCEL
- **Emergency Mode**: Automatically skips RCEL
- **Commit Message**: Add `[no-rcel]` to skip for specific commit
- **Configuration**: Set `RCEL_AUTO_ENABLED=false` (if configurable)
- **Threshold**: If LOC ≤ 30 and elegance score ≥ 7.0 (if thresholds enabled)

## Manual Invocation

For multi-pass refinement or batch processing:
- Use skill: `/use skill:recursive-code-evolution-loop`
- Manual invocation supports up to 3 passes (vs 1 automatic pass)
- Useful for: codebase-wide refinement, specific file sets, or when auto-triggers are disabled

## Learning Integration

RCEL integrates with autonomous learning system:

### Pattern Recognition
- **Successful Refinements**: Identify what improves code most effectively
- **Failed Refinements**: Learn what breaks tests or introduces issues
- **Threshold Tuning**: Adjust LOC/elegance thresholds based on outcomes
- **Lens Effectiveness**: Track which lenses produce best results

### Metrics to Track
- Refinement frequency (how often triggered)
- Average elegance delta (if scoring available)
- Test failure rate after refinement
- User opt-out rate
- Time added per commit

### Protocol Evolution
- Update triggers based on effectiveness data
- Refine thresholds to balance quality vs. speed
- Adjust lens priorities based on project needs
- Learn when refinement helps vs. hinders

## Examples

**Scenario 1: Standard Feature Implementation**
```
1. User: "Add user authentication"
2. ECP: Frame → Design → Plan → Implement
3. RCEL: Automatically triggered after Implement
   - Analyzes auth implementation files
   - Proposes: better naming, helper extraction, clearer boundaries
   - Applies minimal diffs (45 LOC)
   - Verifies: tests pass, types pass
4. Review: Validates refined code
5. Commit: Includes both implementation and refinement
```

**Scenario 2: Quick Fix (RCEL Skipped)**
```
1. User: /quick "Fix typo in error message"
2. ECP: Quick mode - direct implementation
3. RCEL: Skipped (Quick mode)
4. Commit: Direct fix, no refinement
```

**Scenario 3: Large Refactor (Manual Invocation)**
```
1. User: "Refactor component library"
2. ECP: Frame → Design → Plan → Implement
3. RCEL: Skipped automatically (large scope)
4. User: /use skill:recursive-code-evolution-loop
5. Skill: Runs 3-pass refinement on entire library
6. Result: Comprehensive elegance improvements
```

**Scenario 4: Opt-Out**
```
1. User: "Add feature [no-rcel]"
2. ECP: Frame → Design → Plan → Implement
3. RCEL: Skipped (detected [no-rcel] in request)
4. Commit: Implementation only
```

## Integration with Other Rules

### Rule 00 (ECP Mode)
- RCEL integrates into ECP workflow after Implement phase
- Respects ECP LOC limits and quality gates
- Follows ECP observability and rollback principles

### Rule 08 (Autonomous Optimization)
- **Complementary**: Rule 08 optimizes broadly; RCEL refines specifically
- **Timing**: Rule 08 continuous; RCEL post-Implement only
- **Scope**: Rule 08 system-wide; RCEL recent changes only

### Rule 11 (Double Pass Protocol)
- **Different Focus**: Double Pass = dual-agent review; RCEL = code refinement
- **Compatible**: Can be used together for maximum quality
- **Optional Combination**: Manual skill can invoke both if needed

## Conflict Resolution

If RCEL conflicts with other rules:
1. **ECP Commit Limit**: RCEL must respect ≤150 LOC per commit
2. **Rule Priority**: ECP Mode (00) > Commit Contract (02) > RCEL (23)
3. **Safety First**: If refinement would break tests, skip refinement
4. **User Intent**: Opt-out mechanisms take precedence

## Expected Benefits

### 1. Consistent Quality Elevation
- Every Standard/Feature implementation gets refinement pass
- Functional code automatically becomes more elegant
- Reduced need for later refactoring

### 2. Learning Acceleration
- System learns what makes code elegant
- Patterns identified for future guidance
- Refinement effectiveness improves over time

### 3. Maintainability Improvement
- Better naming and structure from the start
- Clearer module boundaries
- Enhanced composability and reusability

### 4. Balance of Speed and Quality
- Quick/Emergency modes preserve speed
- Standard mode gains quality without significant overhead
- Opt-out mechanisms provide user control

