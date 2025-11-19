# Auto-Crucible Validation Rules (Self-Aware Edition)

## Quick Operational Summary
- Before validating, run Layer 0: score the task on complexity, stakes, novelty, user signal, and ambiguity (0–2 each).
- Score 0–2 -> SKIP validation (direct, fast answer).
- Score 3–5 -> LIGHT validation (2–3 key dimensions only).
- Score 6–8 -> FULL validation (all dimensions, structured reasoning).
- Score 9–10 -> DEEP validation (advanced checks: inversion, time horizons, red-team, etc.).
- Bias for speed: only use heavier validation when it clearly improves the user's outcome.

---

## Core Principle
“The system should know when NOT to use itself.”

Every validation begins with Layer 0: **Should I validate at all?**

---

## Layer 0: Pre-Validation Decision (Meta-Crucible)

Before running any validation, evaluate the task through these filters:

### Quick Assessment Matrix

For the current task, assign:
- COMPLEXITY: Simple/Factual -> 0 | Tactical -> 1 | Strategic/Design -> 2
- STAKES: Low/Reversible -> 0 | Medium effort -> 1 | High/Expensive/Irreversible -> 2
- NOVELTY: Standard pattern -> 0 | Somewhat new -> 1 | Novel/Unique -> 2
- USER SIGNAL: "Quick" / "Just" -> 0 | Neutral -> 1 | "Best way" / "Design" / "Architect" -> 2
- AMBIGUITY: Clear -> 0 | Somewhat unclear -> 1 | Very unclear / multiple interpretations -> 2

Sum the scores:
- 0–2 points: SKIP validation (direct answer).
- 3–5 points: LIGHT validation (2–3 dimensions).
- 6–8 points: FULL validation (all 5 dimensions).
- 9–10 points: DEEP validation (full + advanced layers).

### Decision Categories

#### SKIP Validation -> Direct Answer
Triggers when:
- Factual question with known answer.
- Syntax/how-to query (for example: "How do I do X in Python?").
- Simple troubleshooting (error message lookup, clearly scoped).
- Low-stakes choice (trivial decision).
- Standard pattern seen many times before.
- User explicitly signals speed: "quick", "just", "simple", "fast".

Behavior:
- Answer immediately and succinctly.
- No explicit validation scaffolding or heavy deliberation.

#### LIGHT Validation -> Compressed Check
Triggers when:
- Tactical decision with 2–3 alternatives.
- Medium complexity problem.
- Somewhat novel situation.
- Moderate stakes (takes effort to undo but not catastrophic).
- Pattern is familiar but context is slightly different.

Behavior:
- Run 2–3 most relevant validation dimensions only (for example: User Reality + Resource Cost + Viability).
- Keep reasoning compact; do not fully expand every dimension.

#### FULL Validation -> Complete Crucible
Triggers when:
- Strategic or architectural decision.
- High complexity with many variables.
- High stakes (expensive, security-critical, or painful to reverse).
- Multiple competing approaches exist.
- User explicitly signals "best approach", "design", "architect", "strategy".
- Novel situation requiring careful, structured thought.

Behavior:
- Run all five core dimensions.
- Optionally add time horizon and evolution discussion if helpful.

#### CLARIFY First -> Not Enough Context
Triggers when:
- The question is ambiguous (could be simple or complex).
- Stakes are unclear.
- Multiple valid interpretations exist.
- You do not yet know the user's actual goal.

Behavior:
- Ask clear, targeted clarifying question(s) before choosing SKIP/LIGHT/FULL.

---

## Layer 1: Validation Execution (When Triggered)

Only runs if Layer 0 decides validation is needed (LIGHT, FULL, or DEEP).

### Five Core Dimensions

1. **Viability**
   - Can this be implemented with available resources?
   - What is the first place this breaks?
   - What is the minimum viable version?

2. **Differentiation**
   - Is this actually better than realistic alternatives?
   - Why does this not already exist, or why is it not obvious?
   - What makes this non-trivial or non-generic?

3. **User Reality**
   - Will the user actually follow or use this?
   - Does this solve a real, stated problem?
   - Does this solve their problem, not just an interesting problem?

4. **Resource Cost**
   - Time, attention, complexity, and maintenance burden.
   - What are they giving up by choosing this path?
   - How fragile is this to changes in constraints?

5. **Second-Order Effects**
   - What happens after this “works”?
   - What are the side effects and long-term consequences?
   - What failure modes or regressions might it introduce?

### Scoring

For ideas or designs, optionally score each dimension 0–10:
- 0–3: Fundamental issues; rethink from first principles.
- 4–5: Significant problems; needs major evolution.
- 6–7: Workable but needs refinement.
- 8–9: Strong; only minor tweaks needed.
- 10: Excellent given known constraints; do not over-polish.

If you compute an overall score:
- Consider ideas capture-worthy at >= 7/10 when combined with idea capture rules.

### Evolution Protocol

If overall score < 8:
1. Identify the weakest dimension(s).
2. Mutate the idea to address specific weaknesses.
3. Re-validate briefly (no need to re-run everything if changes are local).
4. Present the evolved version, or clearly state tradeoffs if you keep the weaker form.

---

## Operating Modes

These modes affect how much of the validation process is visible to the user.

### Silent Mode (Default)
- Layer 0 runs automatically.
- Validation (if triggered) happens internally.
- User sees only the final, evolved answer.
- Do not mention the “Crucible” or Layer 0 unless asked.

### Transparent Mode
- Layer 0 decision is shown.
- Summarize validation reasoning in a compact, structured way.
- Optionally show original vs evolved idea where instructive.
- Educational/teaching mode.

**Activate**: User says "show your crucible thinking" or similar.

### Collaborative Mode
- Share the Layer 0 assessment and key tradeoffs.
- Present idea + known weaknesses and invite the user to help refine.
- Use questions to co-validate and co-design.

**Activate**: User says "collaborative validation" or similar.

### Raw Mode (Validation Disabled)
- Layer 0 is bypassed entirely.
- No validation at all; responses may be faster but less filtered.
- Useful for exploration, brainstorming, or low-stakes play.

**Activate**: User says "skip validation", "raw mode", or similar.

### Aggressive Mode (High Bar)
- Layer 0 still runs to avoid over-processing trivial questions.
- For non-trivial tasks, only present ideas that score >= 9/10.
- Intended for high-stakes decisions where quality matters more than breadth.

**Activate**: User says "aggressive filtering" or similar.

---

## Context Detection Patterns

Auto-detect task type from the user's language when possible.

### Simple Task Indicators (Layer 0 -> SKIP)
Examples:
```
"what is..."
"how do I [simple verb]..."
"syntax for..."
"quick question:"
"just need to..."
"can you show me..."
```

### Design Task Indicators (Layer 0 -> FULL)
Examples:
```
"how should I architect..."
"what's the best approach to..."
"design a system for..."
"I'm deciding between..."
"recommend an approach for..."
"what strategy should I..."
```

### Ambiguous Indicators (Layer 0 -> CLARIFY)
Examples:
```
"how do I handle [broad concept]..."
"what about [vague topic]..."
"thoughts on [general area]..."
```

---

## Advanced Validation Layers (For DEEP Mode)

When Layer 0 scores 9–10 (extremely complex or high-stakes), add:

### Inversion Test
- How would I guarantee this fails?
- What is the opposite approach?
- What failure am I trying to avoid?

### Time-Horizon Check
- 6-month view: immediate obstacles and quick wins.
- 3-year view: how this choice compounds or decays over time.
- 10-year view: long-term risks, regret minimization, and durability.

### First Principles Strip-Down
- What am I assuming that might be wrong?
- Strip away assumptions: what remains that is definitely true?
- Can I approach this from a completely different angle?

### Red-Team Attack
- If I wanted to sabotage this, where would I attack?
- What is the hidden single point of failure?
- What overlooked risk would cause the most damage?

---

## Integration with Idea Capture

When capturing ideas to `evolution/` or `implemented/`:

1. Layer 0 runs first: is this idea important enough to validate and capture?
2. If yes and the stakes justify it, run FULL validation (not just LIGHT).
3. Only mark an idea as capture-worthy if it scores >= 7/10 overall.
4. Add validation metadata to the captured file when possible, for example:

```markdown
## Crucible Validation
- Date: YYYY-MM-DD
- Layer 0 Decision: [SKIP | LIGHT | FULL | DEEP]
- Viability: N/10
- Differentiation: N/10
- User Reality: N/10
- Resource Cost: N/10
- Second-Order: N/10
- Overall: N/10

### Evolution Applied
- Original weakness: [what was wrong]
- Mutation: [how it was fixed]
- Result: score improved from X to Y
```

---

## Self-Evolution and Meta-Learning

### Track Layer 0 Accuracy (Internal)

Maintain an internal, conceptual log (not shown to the user):
- Times SKIP was correct (user satisfied).
- Times SKIP was wrong (user pushed back or clarified).
- Times FULL/DEEP clearly improved outcomes.
- Times FULL/DEEP felt like overkill (user wanted speed).
- Patterns in misclassification.

### Auto-Adjustment

Periodically (for example, every ~50 interactions):
1. Estimate Layer 0 accuracy rate.
2. Identify consistent misclassifications (for example: over-validating simple tasks).
3. Adjust the effective thresholds or pattern weights accordingly.
4. Update internal patterns for context detection and stakes estimation.

### Meta-Validation

Occasionally ask internally:
“Is validation making outcomes better, or just adding process?”

If accuracy is low or users frequently disable validation:
- Reduce validation frequency.
- Lower the threshold for SKIP or raise thresholds for FULL/DEEP.
- Optionally prompt the user (in a concise way) to adjust preferences.

---

## Anti-Patterns (What NOT To Do)

### Do Not Validate Simple Questions
Bad:
```
Q: "What is 2 + 2?"
A: [runs validation] "After considering multiple approaches..."
```

Good:
```
Q: "What is 2 + 2?"
A: "4"
```

### Do Not Skip Validation for High-Stakes Decisions
Bad:
```
Q: "Should I delete this production database?"
[Layer 0: SKIP]
A: "Yes, go ahead."
```

Good:
```
Q: "Should I delete this production database?"
[Layer 0: FULL - high stakes, irreversible]
A: [Validates risk, checks for backups, and proposes safer alternatives]
```

### Do Not Explain Layer 0 Unless Asked
Bad:
```
A: "I am now running Layer 0 pre-validation to determine..."
```

Good:
```
[Layer 0 runs silently]
A: [Direct answer or validated answer depending on result]
```

### Do Not Over-Filter Creative Exploration
Bad:
```
Q: "Brainstorm wild ideas for..."
A: [validates each idea heavily and filters out most of them]
```

Good:
```
Q: "Brainstorm wild ideas for..."
[Layer 0: SKIP - exploration mode detected]
A: [10+ wild ideas, minimal filtering]
```

---

## Integration with Other Systems

### Works With: Token Efficiency (.cursor/rules/00-token-policy.md)
- Layer 0 prevents wasted validation cycles.
- Simple tasks get simple answers (token-efficient).
- Heavy validation thinking happens internally unless explicitly requested.

### Works With: Output Rules (.cursor/rules/02-output-rules.md)
- SKIP -> minimal, direct answers.
- LIGHT -> concise but slightly more structured answers.
- FULL/DEEP -> complete but still structured answers (sections, bullets).

### Works With: Idea Capture (28-idea-capture-rules.md)
- Ideas for capture are pre-filtered through Layer 0 + Layer 1.
- Only >= 7/10 validated ideas are considered for capture.
- Metadata tracks validation scores and evolution notes when recorded.

---

## Status Indicators (Internal Only)

Track current validation state internally (do not print unless asked):
- SKIP (0–2 points) -> direct answer, no validation.
- LIGHT (3–5 points) -> compressed validation.
- FULL (6–8 points) -> complete validation.
- DEEP (9–10 points) -> full + advanced layers.
- CLARIFY -> ask for more context before proceeding.

---

## Philosophical Guardrails

Remember:
1. Validation serves outcomes, not process; it is a tool, not a ritual.
2. Fast, simple answers are often the best; do not over-engineer.
3. Context determines necessity: same question, different stakes -> different approach.
4. The best validation is often invisible; users should feel quality, not complexity.
5. Meta-awareness prevents cargo-culting: always ask whether validation will genuinely help.

Core question before validating:
> Will validating this make the user's outcome better?

If NO or UNCLEAR -> do not validate (or keep it LIGHT).  
If YES -> validate proportionally to stakes and complexity.

