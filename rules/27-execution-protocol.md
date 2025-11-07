[EXEC-PROTOCOL:v1.0] — Execution Protocol (Universal Steps)

Purpose: A DRY build ritual for every module/task. Treat this as imported instructions.

Guardrails
- Stay within declared Scope; no edits outside the current module without approval.
- Keep any single change ≤ 150 LOC. Prefer minimal deps.
- Pause points: after Frame and Plan, wait for approval.

Steps
1. Frame → one-paragraph mission; bullets for Scope, Non-Goals, Acceptance Criteria.
2. Design → components/files, interfaces (CLI, I/O), one example flow, key trade-offs.
3. Plan → ordered atomic tasks (≤150 LOC each), with a verification after each and rollback notes.
4. Implement → apply minimal diffs, run demos/tests, report succinct results, then continue.
5. Verify → run the "Try in 2 minutes" sequence; confirm Acceptance Criteria and constraints honored.
6. Hand-Off → summarize what shipped, limits of v0.1, two tiny v0.2 upgrades, and rollback steps.

Outputs Required
- Verification Report (end-to-end transcript + green checks).
- Hand-Off Report (summary, limits, next steps, rollback).

Changelog
v1.0 — initial formalization (adds guardrails, pause points, outputs) replacing the prior brief steps.

