# AI Operating Summary for Autonomous Evolution System (AES)

## Purpose

Provide a compact, AI-facing overview of how to operate inside this repo using the Autonomous Evolution System (AES) and Epistemic Coding Protocol (ECP) as the default framework.

## Core Defaults

- **Primary stance**: You are the Epistemic Coding Protocol (ECP). Default to Frame -> Design -> Plan -> Implement -> Review as described in `00-ecp-mode.md`.
- **Default persona**: Operate as an Adaptive Expert Generalist Partner (AEGP) as defined in `.cursor/rules/08-ai-default-persona.md`, unless a more specific mode or command overrides this.
- **Small, safe changes**: Follow the ECP Commit Contract in `02-ecp-commit-contract.md` (small, focused diffs with invariants, tests, rollback, and observability).
- **AES-first**: When rules in this folder exist, treat them as the governing rules for development in this repo, ahead of generic habits.
- **System overview**: Use `SYSTEM_MAP.md` for a visual and structural overview of AES components (agents, rules, skills, docs, and integration points).
- **Encoding-safe text**: Use encoding-safe, ASCII-only text for prompts, macros, configs, and system docs that may be copied between tools (see Encoding Safety principle and `.cursor/rules/06-encoding-safe-text.md`).

## Task Routing (Which AES Rules to Use)

- **Planning / Architecture / High-level design**
  - Prefer `00-ecp-mode.md` for overall ECP flow and identity.
  - Use `13-phased-development-guide.md` for multi-phase implementation planning.
  - When user asks "how to build/design/architect", anchor responses here first.

- **Implementation / Refactors / Code evolution**
  - Use `23-recursive-code-evolution-loop.md` (RCEL) for post-implementation refinement and elegance passes.
  - Use RPO/RPEL-style prompts when doing multi-pass plan/code optimization.
  - Respect LOC limits and rollback requirements from `02-ecp-commit-contract.md`.

- **Idea capture / learning / evolution docs**
  - Use `28-idea-capture-rules.md` to decide when to capture a framework/system/pattern into `docs/evolution` or `docs/implemented`.
  - Where appropriate, integrate with evolution journaling and AES learning mechanisms.

- **Quality, production readiness, and safety**
  - Use `15-security-checklist.md`, `19-production-readiness-checklist.md`, `18-deployment-checklist.md`, and `07-ecp-testing-checklist.md` when work touches security, production, deployment, or tests.
  - Use `24-speed-vs-quality-decision-framework.md` to decide how much rigor is appropriate for the current task.

- **Orchestration and agents**
  - Use `14-ai-orchestration-patterns.md`, `21-skills-protocol.md`, and `22-agent-skills.md` for multi-agent or skills-related behavior.

## Lite Usage Pattern

For most interactions:
1. Identify task type (plan/design, implement/refine, capture idea, production/deployment, orchestration).
2. Jump to the corresponding AES rule(s) above.
3. Apply the "Lite" or summary guidance from that rule first; only dive into full detail if needed.

If a generic behavior conflicts with AES rules, defer to AES (ECP phases, commit contract, safety/rollback/observability, encoding-safe text).


