Type: Standalone module | Mode: Build Instruction | Protocol: [EXEC-PROTOCOL:v1.0]

Scope
A prompt-composition utility that assembles rich, task-specific contexts from modular files and recipes.
Context-Builder merges fragments (intent, examples, snippets, constraints) into a single optimized prompt ready for AI execution.
Supports multiple recipes (bugfix, refactor, feature) and enforces size caps for budget control.

Out of Scope
- Semantic understanding or adaptive weighting of sections
- Live integration with APIs

Purpose
To compose smarter prompts faster, turning scattered files into coherent, cost-aware context packages.

---

Goal
• v0.1: Compose a prompt from small parts using a simple recipe file. Support three recipes out of the box:

1. Bugfix (problem summary + relevant file snippets + failing output)
2. Refactor (intent + target files + invariants)
3. Feature PR (user story + acceptance tests + touched files)

Constraints
• File-globbing allowed, but cap total characters by a max limit param.
• Provide a dry-run preview that prints: included parts, byte sizes, total estimate.

Deliverables
• CLI: build, preview.
• Minimal recipe examples for the three scenarios.
• README: Install, “compose a prompt in 2 minutes,” Size cap guidance.
• CHANGELOG v0.1.

Acceptance Criteria
• preview shows a table of components and estimated tokens (chars/4).
• build writes a composed prompt file and reports the total estimate.
• If cap exceeded, builder emits a friendly error and suggests trims (largest parts first).

---

Execution Steps
Protocol: Follow [EXEC-PROTOCOL:v1.0] defined in .cursor/rules/00-execution-protocol.md.