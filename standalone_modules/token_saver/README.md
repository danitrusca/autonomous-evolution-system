# Token Saver (v0.1)

Deterministic, zero-API token optimization CLI/library.

Try in 2 minutes:

```bash
cd autonomous-evolution-system/standalone_modules/token_saver
npm i && npm run build
echo '{"a": 1, "b": [1,2] }' | node ./bin/token-saver.js json-minify --report
node ./bin/token-saver.js diff ../../../../scripts/../autonomous-evolution-system/standalone_modules/token_saver/examples/before.txt ../../../../scripts/../autonomous-evolution-system/standalone_modules/token_saver/examples/after.txt
node ./bin/token-saver.js strip-fillers examples/verbose.txt --preset=standard --report
```

## High-Impact Token Strategies (Built-in)

| Strategy           | Typical Savings   | Implementation               |
| ------------------ | ----------------- | ---------------------------- |
| Diff-only          | 50–90%            | auto-enforced for code edits |
| Context pruning    | 30–70%            | automatic summarization      |
| Structured answers | 20–40%            | rule enforced                |
| JSON minify        | 10–30%            | automatic on large blocks    |
| Strip fillers      | 10–20%            | conservative preset          |
| Budget gate        | prevents overruns | token-sentry.mjs             |

Example run (verbose.txt): shows before/after token counts and % saved via token-sentry report.

## Benchmark & Regression Suite

Run benchmarks:

```bash
npm run bench
```

Save and track historical savings:

```bash
npm run bench:save
```

Outputs table and aggregates in `benchmarks/results/summary.json`.

Guarantees:

- ≥20% reduction on verbose prose
- JSON/inline-code invariants preserved
- Diff output always patchable

Sample output:

```
File                Mode           Saved%   Tokens_Before  Tokens_After  Notes
verbose.txt         strip-fillers   22.4%   1040           808           standard
large.json          json-minify     31.8%   2850           1945          safe
diff-example        diff            68.1%   412            132           patchable
─────────────────────────────────────────────────────────────────────────────
TOTAL (avg)                        40.8%
```

## Token Optimization Dashboard

Generate reports after benchmark runs:

```bash
npm run bench:save
npm run bench:report
```

View results:

- Markdown: benchmarks/reports/latest-report.md
- HTML Dashboard: benchmarks/reports/index.html

Example ASCII trend:

```
2025-10-30 ▓▓▓▓▓▓▓▓▓▓▓▓ 42%
2025-11-06 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 48%
```

Ideal for project changelogs, documentation, or Substack updates.

## Automated Weekly Report

Run manually:

```bash
npm run report:weekly
```

Output file:

```
autonomous-evolution-system/standalone_modules/token_saver/weekly_token_report.md
```

Schedule example (cron):

```
0 10 * * MON npm run report:weekly
```
