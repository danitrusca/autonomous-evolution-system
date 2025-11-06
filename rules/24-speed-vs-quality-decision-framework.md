# Speed vs Quality Decision Framework

**Based on Cursor 2.0 Insights**

## Purpose

This framework guides when to use fast/parallel execution modes versus careful/sequential execution modes. Inspired by Cursor 2.0's discovery that fast models can break things **faster** when direction is wrong.

## Core Principle

**Speed and quality are trade-offs, not absolutes.** The right choice depends on problem characteristics, risk level, and context.

---

## Decision Matrix

### Use Fast/Parallel Approach When:

✅ **Quick fixes and repetitive tasks**
- Well-defined problems with clear solutions
- Low complexity changes
- Standard refactoring patterns
- Bug fixes with obvious causes

✅ **Well-defined refactoring**
- Code style improvements
- Dependency updates
- Simple structural changes
- Automated transformations

✅ **Low-risk changes**
- Non-critical code paths
- Isolated components
- Easy rollback scenarios
- Well-tested areas

✅ **Clear success criteria**
- Binary pass/fail outcomes
- Objective quality metrics
- Automated validation available
- No subjective judgment needed

✅ **Exploratory/experimental work**
- Prototyping
- Proof of concepts
- Learning exercises
- Non-production code

### Use Careful/Sequential Approach When:

⚠️ **Architectural decisions**
- System design changes
- Major refactoring
- Technology stack decisions
- Integration patterns

⚠️ **Complex logic flows**
- Multi-step algorithms
- State management
- Concurrency handling
- Error recovery logic

⚠️ **Systematic problems**
- Cross-cutting concerns
- Performance optimization
- Security hardening
- Data migration

⚠️ **High-risk changes**
- Production-critical code
- User-facing features
- Data integrity requirements
- Security-sensitive areas

⚠️ **Context-dependent decisions**
- Business logic
- User experience
- Domain-specific rules
- Regulatory compliance

⚠️ **Requires deep thinking**
- Novel problems
- Research needed
- Multiple stakeholders
- Long-term implications

---

## Execution Mode Selection

### Fast Mode Characteristics
- **Speed**: 4x faster execution
- **Parallelism**: Multiple approaches simultaneously
- **Risk**: Higher chance of errors
- **Recovery**: Easy rollback expected
- **Validation**: Automated checks sufficient

### Careful Mode Characteristics
- **Speed**: Standard execution time
- **Parallelism**: Sequential with validation gates
- **Risk**: Lower chance of errors
- **Recovery**: Complex rollback procedures
- **Validation**: Human review recommended

---

## Decision Algorithm

```javascript
function selectExecutionMode(problem) {
  const factors = {
    complexity: assessComplexity(problem),
    risk: assessRisk(problem),
    clarity: assessClarity(problem),
    reversibility: assessReversibility(problem),
    validation: assessValidation(problem)
  };

  // Fast mode indicators
  const fastModeScore = 
    (factors.complexity < 0.3 ? 1 : 0) +
    (factors.risk < 0.3 ? 1 : 0) +
    (factors.clarity > 0.7 ? 1 : 0) +
    (factors.reversibility > 0.7 ? 1 : 0) +
    (factors.validation > 0.7 ? 1 : 0);

  // Careful mode indicators
  const carefulModeScore =
    (factors.complexity > 0.7 ? 1 : 0) +
    (factors.risk > 0.7 ? 1 : 0) +
    (factors.clarity < 0.3 ? 1 : 0) +
    (factors.reversibility < 0.3 ? 1 : 0) +
    (factors.validation < 0.3 ? 1 : 0);

  if (fastModeScore >= 4) return 'fast';
  if (carefulModeScore >= 3) return 'careful';
  
  // Default to careful for safety
  return 'careful';
}
```

---

## Hybrid Approach

For many problems, use **parallel comparison**:
1. Run fast approach in parallel with careful approach
2. Compare results
3. Select best solution based on evaluation criteria
4. Learn which approach worked better for future decisions

---

## Learning and Adaptation

### Track Effectiveness
- Monitor success rates by mode
- Track error rates and recovery time
- Measure time saved vs. errors introduced
- Learn which problem types work best with which mode

### Adapt Decision Framework
- Update decision criteria based on outcomes
- Refine complexity/risk assessment
- Improve mode selection accuracy
- Build problem type → mode mappings

---

## Common Mistakes to Avoid

❌ **Always using fast mode** - Leads to breaking things faster
❌ **Always using careful mode** - Misses speed benefits
❌ **Ignoring context** - Same problem type may need different modes in different contexts
❌ **Not learning from outcomes** - Missing opportunity to improve decision accuracy
❌ **No rollback plan** - Even fast mode needs escape hatches

---

## Examples

### Fast Mode Example
**Problem**: Fix typo in error message
- Low complexity ✓
- Low risk ✓
- Clear solution ✓
- Easy rollback ✓
- **Decision**: Fast mode

### Careful Mode Example
**Problem**: Refactor authentication system
- High complexity ✓
- High risk ✓
- Multiple considerations ✓
- Complex rollback ✓
- **Decision**: Careful mode

### Hybrid Example
**Problem**: Optimize database query
- Medium complexity
- Medium risk
- Multiple approaches possible
- **Decision**: Run both fast optimization and careful analysis in parallel, compare results

---

## Integration Points

- **SkillCompositionSystem**: Use mode selection for skill execution
- **AgentCoordinator**: Route tasks to appropriate agents based on mode
- **MetaLearningSystem**: Learn which mode works for which problem types
- **EvolutionEngine**: Apply mode selection to evolution strategies

---

## References

- Cursor 2.0 Insights: Speed vs Quality trade-offs
- Related: `autonomous-evolution-system/skills/meta/adaptive-execution-mode.md`
- Related: `autonomous-evolution-system/skills/meta/skill-composition-system.js`

