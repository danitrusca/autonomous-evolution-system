# Rule 25: Descriptive File Naming

## Purpose
Ensure all files have immediately understandable names that convey their core purpose and function.

## Philosophy
> "A file name should answer the question 'What does this do?' before you open it."

## Naming Pattern

### Standard Format
```
<CORE_CAPABILITY>_<SYSTEM_TYPE>.md
```

**Examples:**
- ✅ `CONTINUOUS_EVOLUTION_MONITORING_SYSTEM.md`
- ✅ `TECHNICAL_PSYCHOLOGICAL_ERROR_ANALYZER.md`
- ✅ `AUTONOMOUS_GIT_VERSIONING_SYSTEM.md`
- ❌ `IMPLEMENTATION_SUMMARY.md`
- ❌ `SYSTEM_NOTES.md`
- ❌ `OPTIMIZATION_2024_11.md`

## System Types

Use specific, semantic suffixes:

| Type | When to Use | Example |
|------|-------------|---------|
| `_SYSTEM` | Complex, multi-component architecture | `UNIFIED_EVOLUTION_JOURNAL_SYSTEM` |
| `_FRAMEWORK` | Testing, structural, or foundational systems | `COMPREHENSIVE_TEST_FRAMEWORK` |
| `_ANALYZER` | Systems that analyze and extract insights | `TECHNICAL_PSYCHOLOGICAL_ERROR_ANALYZER` |
| `_MONITOR` | Systems that track and observe | `DECISION_PATTERN_MONITOR` |
| `_UPDATER` | Systems that modify or update | `AUTOMATIC_DOCUMENTATION_UPDATER` |
| `_GENERATOR` | Systems that create or generate | `SYSTEM_MAP_GENERATOR` |
| `_INTEGRATOR` | Systems that connect components | `CROSS_SESSION_LEARNING_INTEGRATOR` |
| `_ORCHESTRATOR` | Systems that coordinate | `META_AGENT_ORCHESTRATOR` |
| `_DETECTOR` | Systems that identify patterns | `FRICTION_PATTERN_DETECTOR` |
| `_ENGINE` | Systems that execute or process | `AUTONOMOUS_EVOLUTION_ENGINE` |

## Anti-Patterns

### Generic Terms to Avoid
- ❌ `IMPLEMENTATION`
- ❌ `SUMMARY`
- ❌ `DOCUMENT`
- ❌ `NOTES`
- ❌ `INFO`
- ❌ `FILE`
- ❌ `DATA`
- ❌ `CONTENT`

### Date-Based Names
- ❌ `OPTIMIZATION_2024_11.md` - What optimization?
- ✅ `CONTINUOUS_EVOLUTION_MONITORING_SYSTEM.md` - Clear purpose

### Ambiguous Names
- ❌ `SYSTEM_UPDATE.md` - Which system? What update?
- ✅ `AUTOMATIC_DOCUMENTATION_UPDATER.md` - Specific and clear

## Core Capability Extraction

The `<CORE_CAPABILITY>` should answer: **"What is the primary function?"**

### Extraction Method:
1. **Identify the main feature**: What does this system do?
2. **Extract key verbs/nouns**: `MONITOR`, `ANALYZE`, `UPDATE`, `GENERATE`
3. **Add context**: `CONTINUOUS_EVOLUTION`, `TECHNICAL_PSYCHOLOGICAL`, `AUTONOMOUS_GIT`
4. **Combine**: `CONTINUOUS_EVOLUTION_MONITORING`

### Examples:

| Original Title | Core Capability | System Type | Final Name |
|----------------|-----------------|-------------|------------|
| "Autonomous Evolution System Optimization" | `CONTINUOUS_EVOLUTION_MONITORING` | `SYSTEM` | `CONTINUOUS_EVOLUTION_MONITORING_SYSTEM.md` |
| "Test Suite Summary" | `COMPREHENSIVE_TEST` | `FRAMEWORK` | `COMPREHENSIVE_TEST_FRAMEWORK.md` |
| "Psychological System" | `TECHNICAL_PSYCHOLOGICAL_ERROR` | `ANALYZER` | `TECHNICAL_PSYCHOLOGICAL_ERROR_ANALYZER.md` |

## Implementation

### Automatic Naming
Use `descriptive-file-naming.js` skill:

```javascript
const DescriptiveFileNaming = require('./skills/meta/descriptive-file-naming');
const naming = new DescriptiveFileNaming();

// Generate name from content
const result = await naming.generateDescriptiveName(filePath);
console.log('Suggested name:', result.name);
console.log('Confidence:', result.confidence);
console.log('Alternatives:', result.alternatives);
```

### Manual Naming Checklist

When creating a new file, ask:

1. ✅ **Does the name describe WHAT it does?**
2. ✅ **Does it use a specific SYSTEM_TYPE?**
3. ✅ **Does it avoid generic terms?**
4. ✅ **Would someone unfamiliar understand it?**
5. ✅ **Is it between 20-60 characters?**

## Quality Gates

### Before Committing
- [ ] Run descriptive naming analysis
- [ ] Check against anti-patterns
- [ ] Verify name matches content
- [ ] Ensure consistency with existing files

### During Code Review
- [ ] Question generic names
- [ ] Suggest improvements
- [ ] Update documentation references

## Learning Integration

The system learns from naming patterns:
- Tracks successful renames
- Identifies common patterns
- Suggests improvements
- Updates conventions based on usage

## Observability

### Metrics to Track
- **Naming clarity score**: Based on name length, specificity, semantic meaning
- **Rename frequency**: How often files need renaming
- **Search effectiveness**: Can files be found by purpose?
- **Consistency score**: How well names match conventions

### Success Criteria
- 95% of files use descriptive names
- Average clarity score > 0.8
- Less than 5% rename rate
- Search success rate > 90%

## Evolution

This rule evolves based on:
- Naming pattern effectiveness
- User feedback on file discoverability
- Analysis of search patterns
- Cross-project consistency

## References

- **Skill**: `skills/meta/descriptive-file-naming.js`
- **Agent**: `agents/documentation-updater.js` (integrates naming)
- **Examples**: `docs/implemented/` (all files follow this pattern)

---

**Invariant**: Every file name must immediately convey its purpose without requiring the file to be opened.

**Observability**: Track naming clarity scores and rename frequency to measure rule effectiveness.

**Evolution**: Rule adapts based on successful naming patterns and user feedback.

