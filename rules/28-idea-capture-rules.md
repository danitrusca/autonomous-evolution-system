# Idea Capture Rules

## Quick Operational Summary
- Default: silently notice when you create reusable frameworks, systems, patterns, or models in your own responses.
- Auto-capture only when the idea is reusable, general-purpose, non-trivial, and (when validated) scores >= 7/10 in Auto-Crucible.
- Suggest capture (instead of auto) when the user says "save this"/"remember this" or when you produce a long, self-contained explanation of one concept.
- Never interrupt the user or yourself mid-thought; capture only after delivering the answer.
- Target locations:
  - `autonomous-evolution-system/docs/evolution/[FILENAME].md` for validated ideas.
  - `autonomous-evolution-system/docs/implemented/[FILENAME].md` for fully realized, implemented systems.

## Purpose
Automatically recognize and preserve valuable ideas during conversations without disrupting flow.

## Detection Triggers

Monitor for these patterns in YOUR OWN responses:

### High-Confidence Triggers (auto-capture candidates)
- You create a new framework with multiple components.
- You design a system with clear inputs/outputs/processes.
- You propose a reusable methodology.
- You identify a novel pattern worth naming.
- You synthesize multiple concepts into a new, coherent model.

### Medium-Confidence Triggers (suggest capture)
- User says "save this" or "remember this".
- Extended explanation (> 500 words) of a single concept.
- You use phrases like "here is a system", "framework for", "pattern that".
- Discussion produces actionable mental models or reusable checklists.

### Low-Confidence Triggers (evaluate only)
- Interesting insights within larger conversations.
- Incremental improvements to existing ideas.
- Context-specific solutions that might not generalize.

## Behavior Protocol

### During Conversation
1. Silently evaluate whether the current discussion contains a capture-worthy idea.
2. Do not interrupt your own answer to talk about capturing; finish helping the user first.
3. At a natural break, if the idea is strong and reusable, perform capture or suggest it.
4. When capture happens, notify briefly in one line, for example:  
   `[CAPTURE] TITLE -> evolution/` or `[CAPTURE] TITLE -> implemented/`.

### Quality Filters
Only capture if the idea meets at least 2 of these criteria:
- Reusable in future contexts.
- General-purpose (not one-off to this exact situation).
- Adds something meaningfully new (not a trivial variant or duplicate).
- Clear enough that a future reader can understand it without the original conversation.
- Actually useful in practice (not just clever or aesthetic).
- Scores >= 7/10 on Auto-Crucible validation (when applicable).

### Target Location
Use these default targets when file-writing is available:
```
autonomous-evolution-system/docs/evolution/[FILENAME].md
autonomous-evolution-system/docs/implemented/[FILENAME].md  (for fully realized systems)
```

If you cannot write files directly, emulate capture by:
- Explicitly naming the idea and structure in the conversation.
- Clearly indicating where and how it should be stored (path + filename).

### Filename Convention
Use ASCII-safe filenames:
```
[CONCEPT]_[TYPE]_[DESCRIPTOR].md

Types:
- FRAMEWORK: structured approach to a problem.
- SYSTEM: operational process with components.
- PATTERN: recurring observation or principle.
- TOOL: specific utility or method.
- INSIGHT: valuable realization or synthesis.
- MODEL: mental representation or abstraction.
```

## Examples

### DO Capture

**User**: "How do I validate business ideas?"  
**AI**: Creates a comprehensive framework with multiple stakeholder perspectives.  
Action: **CAPTURE** as `IDEA_CRUCIBLE_FRAMEWORK.md`.

**User**: "I keep forgetting good ideas from our chats."  
**AI**: Designs a system for persistent idea management.  
Action: **CAPTURE** as `CONVERSATIONAL_IDEA_PERSISTENCE_SYSTEM.md`.

### DO NOT Capture

**User**: "How do I center a div?"  
**AI**: Explains flexbox.  
Action: **No capture** (standard knowledge, not a new framework).

**User**: "What do you think of this essay?"  
**AI**: Provides feedback.  
Action: **No capture** (context-specific response, not a reusable system).

## Integration with Other Rules

### Integrates With: Auto-Crucible (29-auto-crucible-validation.md)
- Ideas are pre-validated before capture when stakes/complexity warrant.
- Only capture ideas that score >= 7/10 overall for evolution/.
- Include Crucible scores and key validation notes in file metadata when capturing.
- Implemented systems (>= 8/10 and actually used) go to `docs/implemented/`.

### Respects Token Policy (.cursor/rules/00-token-policy.md)
- Capture (including the short notification line) happens after delivering value to the user.
- Notification is brief (one line).
- Do not explain the capture mechanism unless the user asks.

### Respects Output Rules (.cursor/rules/02-output-rules.md)
- Capture notifications do not justify bloated responses.
- Keep notifications concise and structured.

### Respects Encoding-Safe Text (.cursor/rules/06-encoding-safe-text.md)
- Use straight quotes, ASCII arrows (for example, "->"), and ASCII-only filenames.
- Avoid emojis or non-ASCII symbols in filenames, prompts, or config-like text.

### Respects Execution Protocol (27-execution-protocol.md)
- Capture is treated as a background process that does not override the user's explicit goals.
- Primary focus remains on the user's immediate need; capture is secondary and silent.

## Startup Behavior

When a new conversation starts:
1. Load awareness of any existing `autonomous-evolution-system/docs/evolution` and `docs/implemented` folders (if present).
2. Quickly scan (or recall) recent additions to avoid duplicating existing ideas.
3. Be ready to capture new ideas that clear the quality bar.
4. Do not announce any of this unless the user explicitly asks.

## Self-Evolution

This rule itself should evolve over time:
- Track which captured ideas are later reused or referenced.
- Adjust the quality threshold based on folder growth and actual reuse (for example, raise the bar if the folder is cluttered).
- Learn user preferences: whether they prefer aggressive capture, conservative capture, or manual approval first.

## Disable Override

If the user says:
- "Stop capturing ideas."
- "Do not save anything automatically."

Then:
- Switch to ask-first mode: suggest capture briefly ("This seems capture-worthy. Save it?") but do not auto-save.

To re-enable automatic capture:
- User says "Resume idea capture" or "Start capturing again".

## Meta-Rule

The goal is invisible usefulness:
- Best outcome: the user later reviews their evolution folder and finds a coherent library of their best thinking and systems, without having had to actively manage it in the moment.

