---
name: "autonomous-versioning"
description: "Automatically analyze commits and assign semantic versions based on change impact and patterns"
version: "1.0.0"
trigger: "When commits are detected or manual versioning is requested"
invariant: "All versioning follows semantic versioning principles with proper rollback capabilities"
dependencies: ["git-versioning-integration", "change-impact-agent", "ecp-protocol"]
category: "meta"
author: "ECP System"
created: "2025-01-27"
---

# Autonomous Versioning

## Purpose

Automatically analyze Git commits and assign semantic versions based on change impact analysis, pattern detection, and system evolution tracking. This skill integrates with the existing autonomous evolution system to provide intelligent version management.

## Workflow

### 1. Commit Analysis
- Monitor recent Git commits for versioning opportunities
- Analyze commit messages for version triggers
- Assess file changes for impact levels
- Detect patterns in code changes

### 2. Impact Assessment
- Use ChangeImpactAgent integration for impact analysis
- Classify changes as major, minor, or patch level
- Calculate confidence scores for version decisions
- Identify affected systems and dependencies

### 3. Pattern Detection
- Analyze commit messages for semantic triggers
- Detect architectural changes, new features, bug fixes
- Identify breaking changes and API modifications
- Recognize skill and agent creation patterns

### 4. Version Assignment
- Apply semantic versioning rules based on analysis
- Calculate new version numbers (major.minor.patch)
- Validate version assignments against confidence thresholds
- Ensure version consistency across the system

### 5. Git Integration
- Create Git tags for versioned commits
- Update package.json with new versions
- Log versioning events and decisions
- Maintain version history and statistics

## Success Criteria

- Commits are automatically analyzed for versioning potential
- Semantic versions are assigned based on change impact
- Git tags are created for versioned commits
- Version history is maintained and accessible
- System integration is seamless with existing agents

## Observability

Log all versioning activities with `[autonomous-versioning]` prefix:
- `[autonomous-versioning] Analysis: [commit analysis results]`
- `[autonomous-versioning] Version: [version assignment]`
- `[autonomous-versioning] Git: [tag creation]`
- `[autonomous-versioning] Statistics: [versioning metrics]`

## Rollback

If versioning fails:
1. Remove incorrectly created Git tags
2. Revert package.json version changes
3. Log failure for analysis
4. Continue with existing versioning system
5. Alert system administrators

## Integration Points

### ChangeImpactAgent Integration
- Uses existing impact analysis logic
- Leverages file classification system
- Integrates with dependency tracking

### MetaLearningAgent Integration
- Learns from versioning patterns
- Improves version assignment accuracy
- Adapts to system evolution patterns

### Agent Coordinator Integration
- Monitors commits automatically
- Triggers versioning when appropriate
- Coordinates with other system agents

## Examples

### Major Version (2.0.0)
- New agent creation
- Architectural changes
- Breaking API changes
- Core system redesign

### Minor Version (1.1.0)
- New skill creation
- Feature additions
- Capability enhancements
- Integration improvements

### Patch Version (1.0.1)
- Bug fixes
- Performance improvements
- Documentation updates
- Minor optimizations

## Configuration

### Versioning Thresholds
- Minimum confidence: 0.6
- Auto-versioning: enabled
- Monitoring interval: 2 minutes
- Commit analysis depth: 3 commits

### Pattern Triggers
- Major: architectural_change, breaking_change, new_agent
- Minor: new_feature, skill_enhancement, capability_addition
- Patch: bug_fix, performance_improvement, documentation_update

## Usage

### Automatic Versioning
The system automatically monitors commits and applies versions when:
- Confidence threshold is met
- Significant changes are detected
- Pattern triggers are identified

### Manual Versioning
```bash
# Version specific commit
/use skill:autonomous-versioning --commit abc123 --version 1.2.0

# Auto-analyze and version
/use skill:autonomous-versioning --commit abc123
```

### Version Statistics
```bash
# Get versioning statistics
/use skill:autonomous-versioning --stats
```

## Learning Integration

- Captures versioning patterns for meta-learning
- Improves confidence calculations over time
- Adapts to project-specific versioning needs
- Learns from versioning success/failure patterns
