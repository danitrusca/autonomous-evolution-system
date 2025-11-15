# Debugger Agent — Quick Usage

## What it is
An on-demand agent that analyzes error traces or linter diagnostics and proposes concrete fixes with verification steps. Aligns with:
- `skills/builder/debug-trace-analyzer.md`
- `skills/meta/proactive-debugging.md`

## How to run
- In Cursor: `/debug trace:"<paste stack trace here>"`
- Or let it use lints: `/debug` (will read workspace lints and analyze)
- To scaffold a debugging test: `/debug trace:"<trace>" --scaffold-test`

## What you get
- Pattern summary (e.g., null/undefined access, module resolution, reference/syntax errors)
- Prioritized fixes (≤3 high-signal actions)
- Verification steps (reproduce, test, lint/typecheck)
- Report saved to `autonomous-evolution-system/reports/debugger/*.json`
- Optional test scaffold saved under `autonomous-evolution-system/tests/debug/`:
  - If Jest/Vitest/Mocha detected (via `package.json`), a `*.test.js`/`*.spec.js` is created
  - Otherwise a standalone `*.repro.js` script is created (run with `node`)

## Example
```
TypeError: Cannot read properties of undefined (reading 'id')
    at doThing (src/feature/file.ts:123:18)
```
Produces:
- Fix: add nullish guards or defaults before `id` access
- Verify: reproduce with null, add unit test, re-run lints
 - Scaffold: `autonomous-evolution-system/tests/debug/file-ts-123.test.js` (if framework detected)


