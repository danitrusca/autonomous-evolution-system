---
name: "system-map-generator"
description: "Automatically generate and update the system map based on current system structure and state"
version: "1.0.0"
trigger: "When system components change, on demand, or periodically"
invariant: "System map always reflects current system state and structure"
dependencies: ["learning-log-writer", "meta-learning-system"]
category: "meta"
author: "ECP System"
created: "2025-01-27"
---

# System Map Generator

## Purpose

Automatically generate and maintain an always-current, comprehensive system map that's accessible from anywhere, showing the complete system structure, relationships, and current state at a glance.

## Workflow

### 1. System Scanning

**Scan Sources**:
- File system structure (directories, files)
- Agent registry (all agents and their status)
- Skills registry (all skills and their categories)
- Rules system (all rules and their purposes)
- Extensions (loaded extensions and their status)
- Documentation structure (all docs and their relationships)
- Evolution journal (current state, recent changes)

**Extract Information**:
- Component locations
- Component relationships
- Component status (active/inactive, running/stopped)
- Recent changes
- Dependencies
- Integration points

### 2. Map Generation

**Generate Sections**:
- **System Overview**: High-level architecture diagram
- **Component Map**: All components with locations and purposes
- **Data Flow Map**: How data moves through the system
- **Relationship Map**: Component dependencies and connections
- **Status Map**: Current state of all components
- **Navigation Map**: Quick links to all documentation
- **Evolution Map**: Recent changes and evolution path

**Format**:
- Markdown format for easy reading
- ASCII diagrams for visual representation
- Links to detailed documentation
- Status indicators (✅ running, ⚠️ warning, ❌ stopped)

### 3. Auto-Update Triggers

**When to Update**:
- System component added/removed
- Agent status changes
- Skill created/modified
- Extension loaded/unloaded
- Documentation updated
- Evolution journal entry added
- Periodic check (every hour)

**Update Process**:
- Scan current state
- Compare with previous map
- Update changed sections
- Preserve user customizations
- Generate diff summary

### 4. Context-Aware Display

**Context Detection**:
- Current file being edited
- Current component being worked on
- Question being asked
- Error being debugged
- Feature being developed

**Relevant Section Display**:
- Show relevant component section
- Highlight related components
- Show affected relationships
- Display relevant navigation links
- Show recent changes affecting context

### 5. Integration Points

**AI Workflow Integration**:
- Auto-show map when context needed
- Show relevant section based on task
- Update map automatically after changes
- Provide map access via `/system-map` command

**Access Methods**:
- Root-level file: `SYSTEM_MAP.md`
- Command: `/system-map [section]`
- Context-aware: Auto-display when relevant
- API: Programmatic access for tools

## Success Criteria

- ✅ Map always reflects current system state
- ✅ Updates automatically when components change
- ✅ Accessible from anywhere (root file + command)
- ✅ Context-aware display of relevant sections
- ✅ Comprehensive coverage of entire system
- ✅ Fast generation (< 5 seconds)
- ✅ Accurate component relationships

## Observability

Log all map generation with `[system-map-generator]` prefix:
- `[system-map-generator] Scanning: [components scanned]`
- `[system-map-generator] Generated: [sections generated]`
- `[system-map-generator] Updated: [sections updated]`
- `[system-map-generator] Context: [relevant section displayed]`

## Rollback

If map generation fails:
1. Preserve previous map
2. Log failure for analysis
3. Continue with existing map
4. Plan map generation improvement

## Examples

### Example 1: Auto-Update After Component Change

**Trigger**: New agent created (`agents/new-agent.js`)
**Action**: 
- Scan system for new agent
- Detect relationships (which agents it connects to)
- Update component map
- Update relationship map
- Update navigation links
- Generate updated `SYSTEM_MAP.md`

### Example 2: Context-Aware Display

**Context**: User editing `agents/idea-capture-agent.js`
**Display**:
- Show Agent Layer section
- Highlight Idea Capture Agent
- Show connected components (Evolution Engine, Idea Journal)
- Show related documentation links
- Show recent changes affecting this agent

### Example 3: On-Demand Generation

**Command**: `/system-map agents`
**Action**:
- Generate/update full map
- Extract Agents section
- Display with current status
- Show relationships
- Provide navigation links

---

*Created: 2025-01-27*  
*Goal: Make system map 10/10 useful*


## Execution

```javascript executable
const SystemMapGenerator = require('./scripts/generate-system-map');
const generator = new SystemMapGenerator();
await generator.generate();
```
