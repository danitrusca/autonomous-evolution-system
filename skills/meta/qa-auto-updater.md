---
name: "qa-auto-updater"
description: "Automatically update the Q&A system based on patterns, lessons, and frequently asked questions"
version: "1.0.0"
trigger: "When patterns are detected, lessons are learned, or questions recur"
invariant: "Q&A updates maintain accuracy, relevance, and proper formatting"
dependencies: ["learning-log-writer", "meta-learning-system", "pattern-detector"]
category: "meta"
author: "ECP System"
created: "2025-01-27"
---

# Q&A Auto-Updater

## Purpose

Automatically update the DEVELOPER_QA.md file based on:
- Patterns detected in evolution journal
- Frequently asked questions from user interactions
- Lessons learned from operations
- New patterns discovered through meta-learning
- Answers that need updating based on new evidence

## Workflow

### 1. Pattern Detection & Question Extraction

**Monitor Sources**:
- Evolution journal entries (lessons, patterns, insights)
- User questions during development sessions
- Repeated clarification requests
- "How does X work?" type questions
- Anti-pattern violations
- Common confusion points

**Extract Questions**:
- Identify question patterns in text: "Why...?", "How...?", "What...?", "Should...?"
- Detect repeated questions (frequency threshold: 2+ occurrences)
- Extract context around questions
- Identify answer patterns in evolution journal

### 2. Answer Generation

**Answer Sources**:
- Evolution journal insights and lessons
- Pattern documentation
- System architecture docs
- Existing Q&A entries (to avoid duplicates)
- Code comments and documentation

**Answer Format**:
- **Confidence**: ⭐⭐⭐⭐⭐ (High), ⭐⭐⭐⭐ (High), ⭐⭐⭐ (Moderate)
- **Answer**: Clear, actionable response
- **Related Patterns**: Links to learning patterns
- **See Also**: Cross-references to related docs
- **Last Updated**: Timestamp

### 3. Automatic Update Process

**Before Updating**:
- Check if question already exists (avoid duplicates)
- Check if answer needs updating (confidence increase, new evidence)
- Validate answer quality (has confidence, is actionable, has sources)

**Update Actions**:
- **New Entry**: Add new Q&A entry to appropriate section
- **Update Entry**: Update existing answer with new information
- **Improve Confidence**: Increase confidence if evidence strengthens
- **Add Cross-References**: Link to related patterns/documents
- **Archive**: Move outdated entries to archive section

**Format Validation**:
- Ensure proper markdown formatting
- Maintain section structure
- Update Quick Index
- Preserve existing entries

### 4. Integration Points

**Evolution Journal**:
- Monitor lessons archive for new Q&A opportunities
- Extract insights that answer common questions
- Track question frequency patterns

**Pattern Detection**:
- When patterns are detected, generate Q&A entries
- When anti-patterns are identified, add prevention Q&A
- When patterns evolve, update related Q&A

**Meta-Learning System**:
- Track question frequency from interactions
- Identify answer effectiveness (questions that keep getting asked)
- Suggest Q&A improvements based on usage

**User Interactions**:
- Detect questions in user input
- Track questions that recur
- Capture answers provided during sessions

### 5. Quality Assurance

**Validation Checks**:
- Answer has confidence indicator
- Answer is actionable and clear
- Answer has source references
- Entry is in correct section
- Cross-references are valid
- Formatting is correct

**Review Triggers**:
- New entry added → validate format and content
- Existing entry updated → check for conflicts
- Confidence changed → verify evidence supports change
- Multiple updates → check for consistency

## Success Criteria

- ✅ Q&A automatically updated from evolution journal patterns
- ✅ Frequently asked questions automatically captured
- ✅ Answers updated when new evidence emerges
- ✅ Duplicate questions prevented
- ✅ Format and structure maintained
- ✅ Cross-references kept accurate

## Observability

Log all Q&A updates with `[qa-auto-updater]` prefix:
- `[qa-auto-updater] Detected: [question pattern]`
- `[qa-auto-updater] Generated: [new Q&A entry]`
- `[qa-auto-updater] Updated: [existing entry]`
- `[qa-auto-updater] Confidence: [confidence change]`

## Rollback

If Q&A update fails:
1. Preserve original Q&A file
2. Log failure for analysis
3. Continue with manual Q&A entries
4. Plan Q&A update improvement

## Examples

### Example 1: Pattern-Based Q&A Entry

**Pattern Detected**: "Why weren't lessons added automatically?"
**Source**: Evolution journal lesson about automatic capture gap
**Generated Q&A**:

```markdown
### Q: Why aren't lessons automatically added to the evolution journal?

**Confidence**: ⭐⭐⭐⭐ (High - Based on recent gap analysis)

**A**: The system **designs** automatic capture mechanisms but doesn't **actually execute** them automatically. There's a disconnect between "automatic" systems existing in code and them actually running autonomously.

**Root Cause**: 
- No active monitoring system watching for completed operations
- No workflow integration hook that fires after operations complete
- Skills exist but aren't actively invoked/monitored

**Solution**: Evolve skills that ensure automatic systems actually run automatically, with active monitoring, workflow integration, and self-execution.

**Related Patterns**: See [Automatic Capture Gap Lesson](../living/EVOLUTION_JOURNAL.md#2025-01-27-automatic-learning-capture-gap-meta-lesson)  
**See Also**: [Learning Log Writer](../skills/reflection/learning-log-writer.md), [Proactive Debugging](../skills/meta/proactive-debugging.md)
```

### Example 2: Update Existing Entry

**Existing Q&A**: "How does the system decide what to evolve next?"
**New Evidence**: Proactive debugging skill evolution shows friction-based evolution
**Update**: Add friction detection to evolution triggers list

### Example 3: Confidence Increase

**Question**: "Should this be a Rule, Skill, or Agent?"
**New Evidence**: Multiple successful applications of decision tree
**Action**: Increase confidence from ⭐⭐⭐⭐ to ⭐⭐⭐⭐⭐

## Integration with Meta-Learning Agent

The Q&A Auto-Updater integrates with the Meta-Learning Agent:

1. **Question Tracking**: Meta-Learning Agent tracks question frequency
2. **Pattern Recognition**: Identifies questions that recur
3. **Answer Effectiveness**: Monitors if answers resolve questions
4. **Auto-Suggestion**: Suggests Q&A updates when patterns emerge

## Continuous Improvement

- **Monitor Usage**: Track which Q&A entries are most accessed
- **Identify Gaps**: Detect questions that aren't answered
- **Improve Answers**: Enhance answers based on feedback
- **Update Confidence**: Adjust confidence as evidence accumulates

---

*Created: 2025-01-27*  
*Inspired by: Automatic Learning Capture Gap + Q&A System Analysis*


## Execution

```javascript executable
const QAAutoUpdater = require('./scripts/update-qa');
const updater = new QAAutoUpdater();
await updater.update();
```
