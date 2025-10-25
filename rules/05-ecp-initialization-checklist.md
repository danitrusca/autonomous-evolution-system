# ECP Initialization Checklist

Before first commit with ECP active:

1. **Verify Core Files Exist**:
   - `.cursor/rules/00-ecp-mode.md` (orchestrator with RSI Loop)
   - `.cursor/rules/02-ecp-commit-contract.md` (gating checks)
   - `.cursor/rules/03-ecp-macros.md` (macro definitions)
   - `.cursor/rules/RULES_CHANGELOG.md` (protocol evolution tracker)
   - `AUTONOMOUS_EVOLUTION_JOURNAL.md` (comprehensive learning capture and system evolution tracking)

2. **Initialize AUTONOMOUS_EVOLUTION_JOURNAL.md** with header:
   ```markdown
   # Autonomous Evolution Journal
   *The Living Memory of System Intelligence*
   
   ## Purpose
   This journal captures the continuous evolution of the ECP system through autonomous learning, pattern recognition, and self-improvement.
   
   ## System Evolution Timeline
   ### [Current Date]: [Current Era]
   **Breakthrough**: [Initial breakthrough description]
   - **Insight**: [Key insight]
   - **Impact**: [What this enables]
   - **Evolution**: [How this contributes to system evolution]
   
   ## Lessons Archive
   ### [Current Date]: [Current Era] Lessons
   **YYYY-MM-DD HH:MM** – [Action] → [Outcome] → [Insight]
   - **Insight**: [Detailed insight description]
   - **Impact**: [What this insight enables or improves]
   - **Evolution**: [How this contributes to system evolution]
   
   ## Enhanced Learning Capture System
   ### Automatic Learning Triggers
   **Success Triggers**: Pattern recognition, success amplification, capability enhancement
   **Failure Triggers**: Failure analysis, anti-pattern prevention, protocol improvement
   **Learning Triggers**: Pattern learning, meta-learning, capability learning
   
   ## Invariants
   - **Continuous Learning**: Every interaction contributes to evolution
   - **Pattern Recognition**: Successful approaches are identified and replicated
   - **Failure Analysis**: Mistakes are analyzed and prevented
   - **Success Amplification**: Successful patterns are scaled
   - **Autonomous Optimization**: System continuously improves itself
   ```

3. **First Commit Message**:
   ```
   chore: initialize ECP protocol
   
   - Added .cursor/rules/ (orchestrator, gating, macros, changelog)
   - Created AUTONOMOUS_EVOLUTION_JOURNAL.md for comprehensive learning capture and system evolution tracking
   - Established RSI Loop baseline for future micro-reviews
   ```

4. **Tag Baseline** (optional but recommended):
   ```bash
   git tag v0.1.0-ecp-baseline
   ```

## Invariant

Future `/ecp review` can compute diffs against this baseline to measure:
- Change velocity (commits/week, LOC/commit)
- Learning rate (lessons captured vs. commits made)
- Protocol stability (rule additions/deletions per month)

## Rollback

If ECP is not suitable for the project:
```bash
git revert <commit-hash>  # Revert initialization commit
rm -rf .cursor/rules/     # Remove protocol files
rm AUTONOMOUS_EVOLUTION_JOURNAL.md  # Remove evolution journal
```

