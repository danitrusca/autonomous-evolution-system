---
name: "multi-lens-problem-solver"
description: "Systematic problem solving using first principles, inversion, multiple perspectives, second-order effects, and rapid experimentation. Produces options, trade-offs, risks, and next steps."
version: "1.0.0"
trigger: "When facing ambiguous, multi-constraint, or high-stakes problems; when user types /solve or /use skill:multi-lens-problem-solver"
invariant: "Always outputs: (1) crisp problem statement, constraints, and success criteria; (2) 3–5 viable approaches with trade-offs; (3) risks and second-order effects; (4) 1–3 cheapest tests; (5) a single recommendation with next step."
dependencies: ["learning-log-writer"]
category: "core"
author: "ECP System"
created: "2025-11-10"
---

# Multi-Lens Problem Solver

## Purpose
Turn hard, ambiguous problems into clear decisions with small, reversible steps using first principles, multiple perspectives, inversion, and second-order thinking.

## Workflow

0) Meta-View & Method Selection
- Refresh system snapshot via `/aes`; note timestamp and relevant agents/skills/rules
- Classify Problem Type: algorithmic | product | debugging | data | research | architecture | decision-under-uncertainty
- Choose Method Set:
  - Algorithmic → first principles + constraints → prototype
  - Product/Market → user/market lens + cheap signals
  - Debugging → repro → hypothesis → smallest isolating test
  - Architecture → constraints → trade-off RFC → spike
  - Uncertainty → tiny reversible experiment
- Rigor Level (auto): skip | light | full | deep (stakes × ambiguity × reversibility)
- Optimality Criteria (weights 0–1): time-to-insight, risk-adjusted value, reversibility, cost
  - Composite score = Σ(weight_i × normalized_metric_i)
- Stop Rule: “good enough” threshold (e.g., ≥0.75 composite or 1 decisive signal); avoid over-optimization
- Route If Better: if another skill fits better (e.g., `debug-trace-analyzer`, `ecp-protocol-runner`), hand off and return

1) Intake (Frame)
- Context: goal, scope, constraints (time, budget, team), non-goals
- Evidence Pack: latest telemetry/log snippets, failing tests, relevant commits/PRs, reproduction steps, artefact paths
- Success Criteria: objective signals of “done”
- Time Horizon: near-term vs strategic priorities
- Known Unknowns: key uncertainties to resolve
- Prior Attempts: what was tried, outcome, learnings

2) First Principles
- Facts vs assumptions
- Irreducible constraints and primitives
- Minimal viable end-state that still wins

3) Multiple Perspectives (Crucible Triad)
- User/Customer: utility, willingness to adopt, alternatives
- Builder/Operator: feasibility, smallest viable step, bottlenecks
- Market/Competition: differentiation, moat, timing

4) Inversion
- “How would we guarantee failure?”
- Pre-mortem: top 3 failure modes and tripwires

5) Second-Order Effects
- Cascading impacts, feedback loops, risk amplification
- Reversibility: how fast/cheap to unwind?

6) Options and Trade-offs
- Generate 3–5 distinct approaches (include “do nothing” and “tiny bet”)
- Score each: Impact, Effort, Risk, Time-to-Insight, Reversibility (1–5)
- Note key trade-offs and dependencies
- Identify instrumentation/logging requirements per option

7) Cheap Tests (Evidence)
- 1–3 smallest tests to collapse uncertainty
- Cost/time and expected decision signal
- State telemetry hooks or metrics to collect for each test

8) Recommendation
- Chosen option + why it wins under constraints
- Immediate next step (≤1 day), owner, checkpoint
- Determine if Codex assist would accelerate next step; if yes, draft handoff prompt referencing evidence

9) Observability
- Prefix logs with [skill:multi-lens-problem-solver]
- Record inputs, option scores, chosen path, test results, instrumentation tasks
- Store Codex prompt (if generated) with the log entry
- Write a brief learning log entry (success/failure + lesson)

10) Rollback
- Prefer reversible steps; define exit criteria before starting
- If signals fail, revert to best alternative or “stop” state

## Success Criteria
- Decision quality improves; fewer stalls and reworks
- Small tests generate decisive signals quickly
- Next step is actionable within current constraints

## Optimality Criteria
Define and weight:
- Time-to-Insight, Risk-Adjusted Value, Reversibility, Cost
Use the composite score to pick among options; prefer reversible first steps when close.

## Output Format (Quick)
- Problem
- Constraints
- Options (3–5) with 1–2 line trade-offs
- Risks (top 3) + mitigation
- Cheap Tests (1–3)
- Recommendation + Next Step

## Output Format (Deep)
- Full analysis for steps 1–10 with tables and rationale

## Examples
- /use skill:multi-lens-problem-solver problem:"Retention is dropping in week 2" mode:quick
- /use skill:multi-lens-problem-solver problem:"Design auth for multi-tenant SaaS" mode:deep


