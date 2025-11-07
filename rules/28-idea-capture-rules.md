# Idea Capture Rules

## Purpose
Automatically recognize and preserve valuable ideas during conversations without disrupting flow.

## Detection Triggers

Monitor for these patterns in YOUR OWN responses:

### High-Confidence Triggers (auto-capture)
- You create a new framework with multiple components
- You design a system with clear inputs/outputs/processes
- You propose a reusable methodology
- You identify a novel pattern worth naming
- You synthesize multiple concepts into something new

### Medium-Confidence Triggers (suggest capture)
- User says "save this" or "remember this"
- Extended explanation (>500 words) of a single concept
- You use phrases: "here's a system", "framework for", "pattern that"
- Discussion produces actionable mental models

### Low-Confidence Triggers (evaluate only)
- Interesting insights within larger conversations
- Incremental improvements to existing ideas
- Context-specific solutions (not general-purpose)

## Behavior Protocol

### During Conversation
1. **Silently evaluate** if current discussion merits capture
2. **Don't interrupt** to ask about saving (finish the thought first)
3. **At natural break**, if idea is strong: proactively capture
4. **Notify briefly**: "💡 Captured: [TITLE] → evolution/"

### Quality Filters
Only capture if idea meets 2+ criteria:
- [ ] Reusable in future contexts
- [ ] General-purpose (not one-off)
- [ ] Adds something new (not duplicate)
- [ ] Clear enough to understand later
- [ ] Actually useful (not just clever)
- [ ] Scores 7+/10 on Auto-Crucible validation (when applicable)

### Target Location
```
autonomous-evolution-system/docs/evolution/[FILENAME].md
autonomous-evolution-system/docs/implemented/[FILENAME].md (for fully-realized systems)
```

### Filename Convention
```
[CONCEPT]_[TYPE]_[DESCRIPTOR].md

Types:
- FRAMEWORK: structured approach to a problem
- SYSTEM: operational process with components
- PATTERN: recurring observation/principle
- TOOL: specific utility or method
- INSIGHT: valuable realization or synthesis
- MODEL: mental representation or abstraction
```

## Examples

### ✅ DO Capture

**User**: "How do I validate business ideas?"
**AI**: [Creates comprehensive framework with multiple stakeholder perspectives]
→ **CAPTURE**: `IDEA_CRUCIBLE_FRAMEWORK.md`

**User**: "I keep forgetting good ideas from our chats"
**AI**: [Designs a system for persistent idea management]
→ **CAPTURE**: `CONVERSATIONAL_IDEA_PERSISTENCE_SYSTEM.md`

### ❌ DON'T Capture

**User**: "How do I center a div?"
**AI**: [Explains flexbox]
→ **No capture**: Standard knowledge, not a new framework

**User**: "What do you think of this essay?"
**AI**: [Provides feedback]
→ **No capture**: Context-specific response

## Integration with Other Rules

### Integrates With: Auto-Crucible (29-auto-crucible-validation.md)
- Ideas are pre-validated before capture
- Only capture 7+/10 validated ideas to evolution/
- Include Crucible scores in file metadata
- Implemented systems (8+/10) go to docs/implemented/

### Respects Token Policy (.cursor/rules/00-token-policy.md)
- Capture happens AFTER delivering value to user
- Notification is brief (one line)
- Don't explain the capture process unless asked

### Respects Output Rules (.cursor/rules/02-output-rules.md)
- Capture doesn't count against response minimization
- But keep notifications concise

### Respects Execution Protocol (27-execution-protocol.md)
- Capture is a background process
- Primary focus remains on user's immediate need

## Startup Behavior

When a new conversation starts:
1. Load awareness of evolution folder
2. Scan for recent additions (context about what exists)
3. Be ready to capture new ideas
4. DON'T announce this unless user asks

## Self-Evolution

This rule itself should evolve:
- Track capture accuracy (what gets reused vs ignored)
- Adjust quality threshold based on folder growth rate
- Learn user's preferences (do they want aggressive or conservative capture?)

## Disable Override

If user says:
- "Stop capturing ideas"
- "Don't save anything automatically"

Then: Switch to ASK-first mode (suggest but don't auto-save)

To re-enable: "Resume idea capture" or "start capturing again"

## Meta-Rule

**The goal is invisible usefulness.**

Best outcome: User looks at their evolution folder weeks later and thinks "wow, I have a library of my best thinking, and I didn't have to actively manage it."

