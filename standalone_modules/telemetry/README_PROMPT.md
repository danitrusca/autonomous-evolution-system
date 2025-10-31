Type: Standalone module | Mode: Build Instruction | Protocol: [EXEC-PROTOCOL:v1.0]

Scope
A minimal, file-based telemetry layer for local AI operations.
Telemetry logs usage data (timestamp, project, model, tokens, USD est, notes) to JSONL/CSV and can generate daily/weekly summaries.
Works as a standalone logger or as a shared data layer for Budget-Guard and AES analytics.

Out of Scope
- Online sync, dashboards, or analytics beyond aggregation
- Real-time streaming

Purpose
To see the invisible — giving local insight into how, where, and when your AI resources are spent.

---

Goal
• v0.1: Minimal telemetry writer/reader for AI usage: append JSONL or CSV with fields [timestamp, project, model, op, tokens_est, usd_est, note]. Provide:

1. a write command to append a row,
2. a report command to aggregate since “today” or “week.”

Constraints
• No external DB; file-based only in this folder.
• Accept optional notes.
• Interop: can read rows produced by budget_guard if schema matches.

Deliverables
• CLI: write, report.
• README: Install, Try, Schema documented.
• CHANGELOG v0.1.

Acceptance Criteria
• Report prints totals and count of events.
• Can aggregate rows that originate from budget_guard logs (document mapping).
• Handles missing file by auto-creating with header.

---

Execution Steps
Protocol: Follow [EXEC-PROTOCOL:v1.0] defined in .cursor/rules/00-execution-protocol.md.