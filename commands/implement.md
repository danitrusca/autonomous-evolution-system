# ECP Implement Phase Command

## Purpose
Initiates the ECP Implement phase to execute the planned implementation with observability.

## Usage
```
/implement
```

## What It Does
1. **Code Generation**: Generates code following the planned architecture
2. **Quality Assurance**: Ensures code meets quality standards
3. **Testing**: Implements tests as planned
4. **Documentation**: Creates necessary documentation
5. **Integration**: Integrates components into the system

## ECP Integration
- **Invariant**: Implementation must follow ECP principles
- **Success Test**: Code must pass all tests and quality gates
- **Rollback**: Can revert to previous state if implementation fails
- **Observability**: Logs all implementation steps with `[ecp-implement]` prefix

## Prerequisites
- Must have completed Plan phase
- Tasks and dependencies must be defined
- Testing strategy must be clear

## Output
- Implemented code following architecture
- Comprehensive tests
- Documentation
- Integration verification
- Next steps for Review phase

## Examples
```
/implement
# Implements authentication system:
# - Creates Supabase Auth configuration
# - Builds login/logout components
# - Adds middleware for route protection
# - Writes comprehensive tests
```

## Quality Gates
- Code must follow coding standards
- All tests must pass
- Documentation must be complete
- Integration must be verified

## Rollback Strategy
If implementation fails:
1. Revert to previous commit
2. Log failure for analysis
3. Fix issues identified
4. Retry implementation

## Observability
Logs with `[ecp-implement]` prefix:
- `[ecp-implement] Code: [code generation]`
- `[ecp-implement] Tests: [test implementation]`
- `[ecp-implement] Quality: [quality verification]`
- `[ecp-implement] Integration: [integration verification]`
