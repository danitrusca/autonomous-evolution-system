# 🧠 Automatic Idea Capture System

## What This Does

Your AI assistant now **automatically detects and saves valuable ideas** to your evolution folder as they emerge in conversations, without you having to ask.

## How It Works

### 1. **Passive Detection**
The AI monitors conversations for:
- New frameworks or systems you create together
- Reusable patterns and methodologies  
- Significant insights worth preserving
- Mental models that could apply to future problems

### 2. **Quality Filtering**
Not everything gets saved. Only ideas that are:
- ✅ Reusable (general-purpose)
- ✅ Novel (adds something new)
- ✅ Clear (understandable later)
- ✅ Useful (actually applicable)

### 3. **Automatic Capture**
When a strong idea emerges, the AI:
- Structures it with proper metadata
- Generates a descriptive filename
- Saves to `autonomous-evolution-system/docs/evolution/`
- Notifies you briefly: `💡 Captured: [TITLE]`

## Files Created

Two new files enable this:

### `.cursor/commands/capture-idea.md`
- Command you can invoke: `/capture-idea` or "save this idea"
- Defines the capture process and format
- Explains when auto-triggering should happen

### `.cursor/rules/04-idea-capture-rules.md`
- Runs automatically in background
- Sets detection triggers and quality filters
- Maintains invisible usefulness philosophy

## Usage

### Automatic Mode (Default)
Just have normal conversations. When you create something valuable, you'll see:

```
💡 Idea captured: Cognitive Debt Pattern
📁 Saved to: evolution/COGNITIVE_DEBT_PATTERN.md
🎯 Type: Pattern | Strength: 8/10
```

### Manual Mode
Say any of these:
- "Capture this idea"
- "Save this to evolution"
- "/capture-idea"
- "This is worth keeping"

### Ask-First Mode
If you want to approve each capture:

Say: **"Ask before capturing ideas"**

Then you'll get: 
> "This seems worth capturing. Save to evolution folder?"

### Disable Completely
Say: **"Stop capturing ideas"**

To re-enable: **"Resume idea capture"**

## What Gets Captured

### ✅ YES - Capture These

**Frameworks**: Multi-part systems for solving problems
- Example: "The Idea Crucible Framework"

**Patterns**: Recurring principles you could apply elsewhere
- Example: "The Multiplicative Filter Pattern"

**Systems**: Operational processes with clear steps
- Example: "Temporal Validation System"

**Tools**: Specific methods or utilities
- Example: "Red Team Stress Test"

**Insights**: Valuable syntheses or realizations
- Example: "Why Binary Debates Miss Blind Spots"

### ❌ NO - Don't Capture These

- Standard knowledge or common practices
- Context-specific solutions (one-off fixes)
- Explanations of existing concepts
- Feedback on specific content
- Troubleshooting steps

## File Format

All captured ideas use this structure:

```markdown
# [TITLE]

## Genesis
- Date: YYYY-MM-DD
- Context: What triggered this
- Related to: Other concepts

## Core Concept
[2-3 sentences: what and why]

## The Idea
[Detailed explanation]

## Implementation
[How to use this]

## Evolution Potential
- Could combine with: [...]
- Could extend to: [...]

## Meta
- Strength: N/10
- Type: [Framework/Pattern/System/Tool/Insight]
- Status: [Seed/Testing/Validated]
```

## Filename Convention

Format: `[CONCEPT]_[TYPE]_[DESCRIPTOR].md`

Examples:
- `IDEA_CRUCIBLE_FRAMEWORK.md`
- `TEMPORAL_VALIDATION_SYSTEM.md`
- `COGNITIVE_DEBT_PATTERN.md`
- `RED_TEAM_STRESS_TEST_TOOL.md`

## Integration with Idea Crucible

Strong ideas can be run through your Idea Crucible before capture:

- **Score < 6/10**: Skip or save to `/seeds` subfolder
- **Score 6-8/10**: Save with status "Testing"
- **Score 8+/10**: Save with status "Validated"

## View Your Collection

At any time, ask:
- "Show me my evolution folder"
- "What ideas have we captured?"
- "List recent additions to evolution/"

## Maintenance

The AI will help keep your library healthy:

**Monthly**: 
> "Which evolution files haven't been used in 90 days?"

**When folder grows large**:
> "Should we organize evolution/ into subcategories?"

**Quality check**:
> "Run my recent captures through the Idea Crucible"

## Philosophy

> **The best idea capture system is the one you forget is running.**

You should be able to focus on creating and thinking, while your best insights automatically accumulate into a personal knowledge library.

Weeks from now, you'll look at your evolution folder and see a curated collection of your strongest thinking—without having to actively manage it.

## Troubleshooting

**Too many captures?**
- Say: "Be more selective with captures"
- Raise quality threshold: "Only capture 8+/10 ideas"

**Too few captures?**
- Say: "Capture more liberally"
- Lower threshold: "Capture interesting ideas even if not perfect"

**Wrong folder location?**
- Say: "Change evolution folder to [PATH]"

**Want to review before auto-save?**
- Say: "Ask before capturing" (switches to suggestion mode)

## Next Level

Want to go deeper? Try:

1. **Create specialized capture rules** for specific domains
2. **Set up idea clustering** to find emergent themes
3. **Build a citation system** to link related ideas
4. **Generate periodic insight reports** from your collection
5. **Create an idea recommendation engine** that suggests relevant concepts

---

**Status**: 🟢 Active

The system is now monitoring your conversations. Create something valuable, and it'll be there when you need it later.

