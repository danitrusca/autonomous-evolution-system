# ECP Commit Contract

This file defines the gating checks referenced by 00-ecp-mode.md. If any fail, Cursor must refuse to code and return to Frame.

Cursor must produce these sections **before** code:

1) Frame
- Goal (user-visible), Constraints, Success Test, Rollback.

2) Design First
- Dependency graph, Data boundaries, Invariants, Failure modes, Observability plan.

3) Plan (reviewable chunks, ≤150 LOC)
- For each: Intention, Files, Invariant, Test delta, Observability note.

4) Implement (one intention only)
- Logs with clear prefixes; no mixed concerns.

5) Self-Review (Challenge Block)
- Why this pattern vs 2 alternatives? Failure story? Debug strategy? Rollback clarity?

Refusal Rule: If Cursor cannot state the invariant + success test, it must **not** generate code and instead ask precise questions.
