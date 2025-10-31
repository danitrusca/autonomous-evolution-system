---
name: "recursive-code-evolution-loop"
description: "Refines working code through recursive second-thought passes to elevate elegance, readability, composability, and observability"
version: "0.1.0"
trigger: "After successful implementation, on commits to app/components/lib/types/sql paths, or manually via /use skill:recursive-code-evolution-loop"
invariant: "Never exceed 150 LOC touched per file per pass. Only apply diffs, never full rewrites. Behavior must remain identical. All edits are observable and reversible. Elegance > cleverness > speed."
dependencies: ["ecp-protocol-runner"]
category: "core"
author: "ECP System"
created: "2025-01-27"
---

# Recursive Code Evolution Loop (RCEL)

## Purpose

Transform working, verified code into artful, maintainable code through 1–3 recursive refinement passes. Each pass proposes small, high-leverage deltas that improve elegance, readability, composability, observability, and Kairos (felt rightness), applies minimal diffs, re-verifies correctness, and stops when elegance score ≥ 8.5 or no material leverage remains.

## Workflow

### 1. Initialization
- Compute baseline elegance score using elegance-score heuristic
- Log initial state and refinement goals
- Set up refinement parameters (max passes: 3, score threshold: 8.5, LOC cap: 150/file)

### 2. Analysis Phase
- Run static scan for complexity, cohesion, naming clarity, duplication, SQL rollback parity
- Run style scan through lenses: elegance, readability, composability, observability, kairos
- Identify refinement opportunities

### 3. Delta Proposal
- Propose 3–5 elegant deltas based on scan results
- Ensure each delta respects LOC cap (≤150 LOC/file)
- Prioritize high-leverage improvements
- Validate delta feasibility and impact

### 4. Apply Minimal Diffs
- Generate minimal diffs (diff-only strategy, no full rewrites)
- Apply patches to codebase
- Ensure all changes are observable and reversible
- Maintain behavior equivalence

### 5. Verification
- Run typecheck (npm/pnpm/yarn typecheck)
- Run test suite (npm/pnpm/yarn test)
- Compute new elegance score
- Calculate elegance delta gain
- Verify behavior remains identical

### 6. Commit & Track
- Commit changes with elegance score delta in message
- Track refinement progress
- Log pass completion with metrics

### 7. Stop Condition Check
- Stop if elegance score ≥ 8.5 (threshold reached)
- Stop if delta gain ≤ 0.2 (plateau reached)
- Continue to next pass if improvement continues
- Maximum 3 passes total

### 8. Post-Processing
- Write summary to PLAN_PASSES/RCEL_Summary.md
- Document elegance improvements
- Record passes run and final state

## Success Criteria

- Elegance score improved (baseline → final)
- All tests and typechecks pass
- Behavior remains identical
- LOC limits respected (≤150/file per pass)
- Refinement plateau reached or threshold achieved
- All changes are observable and reversible

## Observability

Log all RCEL activities with `[rcel]` prefix:
- `[rcel] Init: Elegance score ${score_before}`
- `[rcel] Pass ${n}: Analyzing code structure`
- `[rcel] Pass ${n}: Proposed ${count} deltas`
- `[rcel] Pass ${n}: Patch applied successfully`
- `[rcel] Pass ${n}: Verified (types ✓, tests ✓)`
- `[rcel] Pass ${n}: Elegance ${prev} → ${current} (Δ ${delta})`
- `[rcel] Stop: ${reason} (score: ${final_score})`

## Rollback

If RCEL refinement fails:
1. Revert to state before current pass
2. Log failure reason in evolution journal
3. Continue with existing code (still functional)
4. Analyze failure for refinement system improvement
5. Document lessons learned

## Refinement Lenses

- **Elegance**: Simplify, clarify, and express intent cleanly
- **Readability**: Names, spacing, rhythm, and cognitive flow
- **Composability**: Structure modules for reuse and graceful scaling
- **Observability**: Add logs/tests that reveal behavior under stress
- **Kairos**: Adjust rhythm; remove dissonance; feel when to stop

## Examples

**Trigger**: Successful implementation of user authentication feature
**Initial State**: Functional code with elegance score 6.2
**Pass 1**: 
- Extracted pure helper functions (+1)
- Improved naming clarity (+1)
- Reduced nesting levels (+1)
- Score: 6.2 → 7.5 (Δ 1.3)

**Pass 2**:
- Enhanced observability with strategic logging (+1)
- Clarified module boundaries (+1)
- Score: 7.5 → 8.2 (Δ 0.7)

**Pass 3**:
- Minor rhythm adjustments (+0.3)
- Score: 8.2 → 8.5 (Δ 0.3, threshold reached)

**Result**: Artful, maintainable authentication system with elegance score 8.5, all tests passing, behavior identical

**Trigger**: Manual invocation `/use skill:recursive-code-evolution-loop` on component library
**Execution**: Analyzes all components, proposes cross-cutting improvements, applies minimal diffs, verifies, commits with elegance delta
**Result**: Improved component composability and readability while maintaining all existing functionality

