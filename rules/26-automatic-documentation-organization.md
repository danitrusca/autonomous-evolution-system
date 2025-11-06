# Rule 26: Automatic Documentation Organization

## Purpose
Ensure all documentation files are automatically organized into the appropriate `docs/` folders with descriptive names.

## Philosophy
> "Documentation should organize itself. Find it by purpose, not by accident."

## Automatic Organization

### Process Flow

```
New Documentation File Created
    ↓
Detect File Type (*.md, not README.md)
    ↓
Generate Descriptive Name
    ↓
Analyze Content & Determine Destination
    ↓
Move to Appropriate docs/ Folder
    ↓
Log Organization Decision
```

## Documentation Folder Structure

### Standard Folders

| Folder | Purpose | File Types |
|--------|---------|------------|
| `docs/implemented/` | Completed implementation summaries | `*_SYSTEM.md`, `*_FRAMEWORK.md`, `*_ANALYZER.md` |
| `docs/evolution/` | Evolution reports and analyses | `*_EVOLUTION_REPORT.md`, `*_ANALYSIS.md` |
| `docs/reference/` | Reference documentation | `*_GUIDE.md`, `*_REFERENCE.md`, `API_*.md` |
| `docs/system/` | System architecture docs | `SYSTEM_*.md`, `ARCHITECTURE_*.md` |
| `docs/agents/` | Agent documentation | Agent-specific docs |
| `docs/skills/` | Skill documentation | Skill-specific docs |
| `docs/living/` | Living documents | `*_JOURNAL.md`, `*_LOG.md`, `CHANGELOG.md` |

### Destination Logic

**Implementation Summaries** → `docs/implemented/`
- Files ending with: `_SYSTEM`, `_FRAMEWORK`, `_ANALYZER`, `_ENGINE`, `_MONITOR`
- Content contains: "implementation", "summary", "completed"

**Evolution Reports** → `docs/evolution/`
- Files containing: "evolution", "report", "analysis", "breakthrough"
- Content describes: system evolution, meta-cognitive improvements

**Reference Docs** → `docs/reference/`
- Files containing: "guide", "reference", "api", "configuration", "testing"
- Content provides: how-to, API docs, configuration guides

**Living Documents** → `docs/living/`
- Files containing: "journal", "log", "changelog", "history"
- Content is: continuously updated, time-series

**Default** → `docs/reference/`
- When no clear match is found

## Integration

### Automatic Trigger Points

1. **On File Creation**: Detect new `.md` files in root
2. **On File Save**: Check if documentation needs reorganization
3. **On Commit**: Pre-commit hook validates organization
4. **Periodic Scan**: Check for unorganized files every hour

### Manual Trigger

```javascript
const AutoDocOrganizer = require('./skills/meta/automatic-documentation-organizer');
const organizer = new AutoDocOrganizer();

// Organize specific file
await organizer.organizeDocumentationFile('./MY_DOC.md');

// Auto-organize all unorganized files
await organizer.autoOrganizeAll();
```

## File Naming Integration

The organizer integrates with **Rule 25: Descriptive File Naming**:

1. Analyze file content
2. Generate descriptive name (if confidence > 50%)
3. Determine destination folder
4. Move with descriptive name

**Example**:
```
Root: EVOLUTION_COMPLETE.md
    ↓
Analyze: "Evolution report about autonomous file naming"
    ↓
Generate: AUTONOMOUS_FILE_NAMING_EVOLUTION_REPORT.md
    ↓
Destination: docs/evolution/
    ↓
Result: docs/evolution/AUTONOMOUS_FILE_NAMING_EVOLUTION_REPORT.md
```

## Exceptions

### Files That Stay at Root

- `README.md` - Project entry point
- `package.json` - Project configuration
- `LICENSE` - License file
- `.gitignore` - Git configuration

### Files That Stay in Place

- Files already in correct `docs/` location
- Files with special location requirements
- Configuration files

## Quality Gates

### Before Organization
- [ ] File is markdown (*.md)
- [ ] File is not README.md
- [ ] File is documentation (not code/config)
- [ ] Destination folder determined with confidence

### After Organization
- [ ] File in appropriate docs/ folder
- [ ] File has descriptive name
- [ ] Original content preserved
- [ ] Organization logged for learning

## Observability

### Metrics to Track
- **Organization Rate**: Files organized vs. total docs
- **Destination Accuracy**: Correct folder placement rate
- **Naming Quality**: Descriptive name confidence scores
- **Time to Organize**: How quickly files are organized

### Success Criteria
- 100% of docs in docs/ hierarchy
- 95% correct folder placement
- 90% descriptive name confidence
- <1 hour from creation to organization

## Learning Integration

The system learns from organization patterns:
- Track successful organizations
- Identify common file types
- Improve destination detection
- Adapt patterns based on usage

## Evolution

This rule evolves based on:
- New documentation types
- Folder structure changes
- User feedback on organization
- Cross-project consistency needs

## References

- **Skill**: `skills/meta/automatic-documentation-organizer.js`
- **Related Rule**: Rule 25 (Descriptive File Naming)
- **Integration**: `agents/documentation-updater.js`

---

**Invariant**: All documentation files are automatically organized into the appropriate docs/ hierarchy with descriptive names.

**Observability**: Track organization metrics to measure effectiveness and adapt patterns.

**Evolution**: System learns optimal organization patterns from successful placements.

