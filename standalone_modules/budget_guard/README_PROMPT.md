Type: Standalone module | Mode: Build Instruction | Protocol: [EXEC-PROTOCOL:v1.0]

Scope
A lightweight CLI and library for monitoring and limiting AI token spend.
Budget-Guard estimates prompt cost, checks daily/weekly caps, logs usage, and enforces soft/hard limits through exit codes.
It’s designed to run before any AI call — as a preflight check in local scripts, Cursor builds, or AES workflows.

Out of Scope
- Real tokenization or per-model pricing (heuristic only in v0.1)
- Cloud dashboards or persistent databases

Purpose
To bring financial awareness into every AI loop — without needing an external service.

---

Goal
• v0.1: CLI that (a) estimates cost from input size, (b) checks soft/hard caps (daily or weekly), (c) returns allow/warn/block with exit codes, (d) logs a CSV row, (e) prints a short report.

Constraints
• Heuristic token estimate (chars/4) is fine for v0.1.
• No provider-specific tokenizers yet.
• Config lives in this folder only.
• Exit codes: 0=allow, 3=warn, 13=block.

Deliverables
• CLI with three subcommands: preflight, log, report.
• Config file example in this folder.
• Demo: run preflight on a sample prompt and show JSON decision.
• README: Install, Try in 2 minutes, Exit codes.
• CHANGELOG v0.1.

Acceptance Criteria
• “Try in 2 minutes” shows a warn/block when I reduce caps.
• CSV log is created with a header and one appended row per run.
• Report prints totals for “today” or “week.”

---

Execution Steps
Protocol: Follow [EXEC-PROTOCOL:v1.0] defined in .cursor/rules/00-execution-protocol.md.