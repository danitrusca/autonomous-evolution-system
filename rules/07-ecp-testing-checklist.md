# ECP Testing Checklist

## Quick Mode Verification
- [ ] Goal states user-visible outcome
- [ ] Success test is observable ("When I X, I see Y")
- [ ] Rollback plan names specific files
- [ ] LOC budget ≤50 lines
- [ ] Single concern addressed

## Emergency Mode Verification
- [ ] Direct implementation with post-commit review
- [ ] Critical issue identified
- [ ] Time-sensitive constraint stated
- [ ] Rollback plan documented
- [ ] Post-implementation review scheduled

## Invariant
Testing checklist ensures Quick/Emergency modes maintain ECP quality gates while respecting time constraints.

## Rollback
Delete this file if testing checklist becomes obsolete.

## General
- [ ] Consult Mode Selection Guide
- [ ] Run /ecp review after ≥3 commits
- [ ] Log friction in AUTONOMOUS_EVOLUTION_JOURNAL_LIVING.md (≤140 chars)