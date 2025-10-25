Diagnose-Before-Code

# ECP Diagnostics (D-before-C)

Purpose: Before writing or refactoring code, run a minimal diagnosis to prove where the failure lives (UI wiring, browser/CORS, server/Node, or remote service).

## Quick Map (pick the branch that fails)

0) Git setup verification
   - Run `git status` to verify working directory and repository state.
   - If not in project directory, navigate to correct path before git operations.
   - If lock file exists, remove `.git/index.lock` before proceeding.

1) UI wiring
   - DevTools → Network: button click must create a request.
   - If no entry: log `[ui-click]` before the call; fix handler.

2) Browser→Remote (CORS / extensions)
   - If request row shows `(failed)` or “CORS” with 0 B transferred, test in a private window with extensions off.
   - If LAN URL differs, add both origins to remote CORS allow-list.

3) Server/Node connectivity (undici “fetch failed”)
   - Add a **server route** that HEADs `https://<service>/health`.
   - If HEAD fails, treat as network/TLS/VPN/proxy issue, not app logic.

4) Remote service / auth / RLS
   - If HTTP status returns with JSON error, fix the service (schema/policy/keys).

## Minimal Commit Pattern

- Commit A: `/api/db-check` server probe (HEAD health → simple SELECT).
- Commit B: `/api/<resource>` thin proxies to unblock UI (server-hop).
- Commit C: README “CORS & Connectivity Checklist” with actionable steps.

Each commit ≤150 LOC, logs prefixed by concern, e.g. `[db-check]`, `[api-schools]`.

## Invariants

- Never change schema in diagnostics commits.
- Never leak secrets in logs.
- Every diagnostic returns `{ ok:boolean, kind:string, ... }`.

## Rollback

- Revert added API routes; UI falls back to direct client calls.

## Autonomous Integration

When diagnostic patterns are detected (repeated failures, performance issues, security vulnerabilities), automatically trigger autonomous optimization:

- **Pattern Detection**: Log `[diagnostic] pattern detected: [type]` when same issue occurs 3+ times
- **Autonomous Trigger**: Log `[autonomous] optimization triggered for [pattern]` 
- **Optimization Action**: Apply relevant optimization from 08-autonomous-optimization.md
- **Learning Capture**: Record pattern and solution in `AUTONOMOUS_EVOLUTION_JOURNAL.md`

**Integration Flow**: Diagnostic → Pattern Recognition → Autonomous Optimization → Learning Capture