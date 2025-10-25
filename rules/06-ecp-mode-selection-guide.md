# ECP Mode Selection Guide

Choose mode based on task complexity:

## 🚀 Quick Mode (≤50 LOC)
**Use for:**
- Simple fixes, typos, single-file changes
- Adding console.log statements
- Minor UI text updates
- Configuration tweaks

**Template:**
```
/quick
Goal: [What user sees]
Success Test: [When I X, I see Y]
Rollback: [revert file1, file2]
```

## 🎯 Standard Mode (≤150 LOC)
**Use for:**
- Features, refactors, multi-file changes
- New components or functions
- Database schema changes
- API integrations

**Template:**
```
/frame → /design → /plan → /implement
```

## 🚨 Emergency Mode (unlimited LOC)
**Use for:**
- Hotfixes, critical bugs
- Production issues
- Security patches
- Time-sensitive fixes

**Template:**
```
/emergency
[Direct implementation with post-commit review]
```

## Decision Matrix

| Task Type | LOC | Files | Time | Mode |
|-----------|-----|-------|------|------|
| Typo fix | <10 | 1 | <5min | Quick |
| Add log | <20 | 1 | <10min | Quick |
| New feature | 50-150 | 2-5 | 30-60min | Standard |
| Refactor | 100-300 | 3-10 | 1-2hrs | Standard |
| Hotfix | Any | Any | <30min | Emergency |

## Invariant

Mode selection reduces cognitive load while maintaining appropriate quality gates for task complexity.

## Rollback

If wrong mode selected:
- Quick → Standard: Add Design phase
- Standard → Quick: Simplify to 3 fields
- Emergency → Standard: Add Frame/Design/Plan
