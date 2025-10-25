# ECP Review Phase Command

## Purpose
Initiates the ECP Review phase to learn and improve from the implementation.

## Usage
```
/review
```

## What It Does
1. **Quality Review**: Reviews implementation against success criteria
2. **Performance Analysis**: Analyzes performance and optimization opportunities
3. **Learning Capture**: Captures lessons learned for future improvements
4. **Documentation Update**: Updates documentation with new insights
5. **System Evolution**: Triggers autonomous skill evolution based on learnings

## ECP Integration
- **Invariant**: Review must capture actionable insights
- **Success Test**: Implementation must meet all success criteria
- **Rollback**: Can return to Implement phase if review fails
- **Observability**: Logs all review insights with `[ecp-review]` prefix

## Prerequisites
- Must have completed Implement phase
- Implementation must be complete
- Tests must be passing

## Output
- Quality assessment report
- Performance analysis
- Lessons learned
- Improvement suggestions
- Next iteration planning

## Examples
```
/review
# Reviews authentication implementation:
# - Verifies all success criteria met
# - Analyzes performance bottlenecks
# - Captures lessons for future auth features
# - Triggers skill evolution for auth patterns
```

## Quality Gates
- All success criteria must be met
- Performance must be acceptable
- Lessons must be captured
- Improvements must be identified

## Rollback Strategy
If review fails:
1. Return to Implement phase
2. Fix identified issues
3. Re-run tests
4. Retry review

## Observability
Logs with `[ecp-review]` prefix:
- `[ecp-review] Quality: [quality assessment]`
- `[ecp-review] Performance: [performance analysis]`
- `[ecp-review] Learning: [lessons captured]`
- `[ecp-review] Evolution: [skill evolution triggered]`
