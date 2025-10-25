---
name: "simplicity-principle"
description: "Enforce simplicity and clarity in all skill operations to prevent complexity explosion"
version: "1.0.0"
trigger: "When system complexity threatens usability or maintainability"
invariant: "All operations maintain simplicity and clarity while preserving functionality"
dependencies: ["ecp-protocol", "skill-validator"]
category: "meta"
author: "ECP System"
created: "2025-01-27"
---

# Simplicity Principle

## Purpose

Enforce simplicity and clarity in all skill operations to prevent complexity explosion and maintain system usability.

## Workflow

### 1. Complexity Assessment
- **Skill Count**: Monitor total number of skills
- **Dependency Depth**: Track dependency chain length
- **Interaction Complexity**: Measure skill interaction complexity
- **User Cognitive Load**: Assess user mental overhead
- **Maintenance Burden**: Evaluate maintenance requirements

### 2. Simplification Strategies
- **Skill Consolidation**: Combine similar skills
- **Dependency Reduction**: Minimize skill dependencies
- **Interface Simplification**: Simplify skill interfaces
- **Documentation Clarity**: Ensure clear documentation
- **User Guidance**: Provide clear user guidance

### 3. Complexity Gates
- **Maximum Skills**: Limit total skill count
- **Maximum Dependencies**: Limit skill dependencies
- **Maximum Interactions**: Limit skill interactions
- **Maximum Complexity**: Limit overall system complexity
- **Minimum Clarity**: Ensure minimum clarity standards

### 4. Simplification Execution
- **Skill Merging**: Merge overlapping skills
- **Dependency Optimization**: Optimize dependencies
- **Interface Standardization**: Standardize interfaces
- **Documentation Improvement**: Improve documentation
- **User Experience Enhancement**: Enhance user experience

### 5. Continuous Simplification
- **Regular Audits**: Regular complexity audits
- **Simplification Opportunities**: Identify simplification opportunities
- **User Feedback**: Incorporate user feedback
- **System Evolution**: Evolve system toward simplicity
- **Quality Maintenance**: Maintain quality while simplifying

## Success Criteria

- System complexity is manageable
- User experience is clear and simple
- Maintenance burden is reasonable
- Skills are well-organized and understandable
- System remains powerful while being simple

## Observability

Log all simplification with `[simplicity-principle]` prefix:
- `[simplicity-principle] Assess: [complexity assessment]`
- `[simplicity-principle] Simplify: [simplification strategy]`
- `[simplicity-principle] Gate: [complexity gate]`
- `[simplicity-principle] Execute: [simplification execution]`
- `[simplicity-principle] Evolve: [continuous simplification]`

## Rollback

If simplification fails:
1. Revert to previous system state
2. Log failure for analysis
3. Continue with existing complexity
4. Plan alternative simplification approach

## Examples

**Problem**: Too many similar skills
**Solution**: Merge overlapping skills into single, more powerful skill
**Result**: Reduced complexity while maintaining functionality

**Problem**: Complex dependency chains
**Solution**: Optimize dependencies and reduce chain length
**Result**: Simpler system with clearer relationships
