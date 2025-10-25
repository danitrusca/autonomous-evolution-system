# ECP Macros (type these commands in chat)

- /quick → Quick Mode template (≤50 LOC, simple fixes)
- /frame → inserts Frame template.
- /design → inserts Design template.
- /plan → lists commits with invariants.
- /implement → executes only current commit scope.
- /review → runs the Challenge Block.
- /emergency → Emergency Mode (direct implement + post-commit review required)
- /diag-net → generates the server HEAD probe + `/api/db-check` route and a `scripts/net-diagnose.ts`.
- /ecp review → runs Daily Micro-Review (scans last 10 commits + AUTONOMOUS_EVOLUTION_JOURNAL.md, emits Micro-Review Card with friction patterns).
- /ecp audit → runs Weekly Deep Audit (dry-run by default; compresses lessons into 3 protocol upgrades + CHANGELOG entry).
- /optimize-prompt → optimize my prompt and respond to the optimized prompt
- /healthcheck → prints "[macro] healthcheck ok"

## Skills Macros

- /use skill:name → Execute specific skill by name
- /list skills → Show all available skills with descriptions
- /skill help:name → Show detailed skill documentation
- /skill status → Show skill system health and performance
- /skill evolve → Trigger skill optimization based on usage patterns
- /create-skill → Interactively create new skills
- /skill health → Show skill ecology health and coherence
- /skill friction → Show detected friction patterns and suggestions

Cursor: When user types one of these commands, respond with the corresponding template or code, respecting LOC and invariants.
