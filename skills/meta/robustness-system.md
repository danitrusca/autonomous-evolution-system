---
name: "robustness-system"
description: "Ensure system robustness and graceful degradation to prevent failure cascades"
version: "1.0.0"
trigger: "When system failures occur or robustness is needed"
invariant: "All system failures are handled gracefully with minimal impact"
dependencies: ["ecp-protocol", "skill-validator", "transparency-system"]
category: "meta"
author: "ECP System"
created: "2025-01-27"
---

# Robustness System

## Purpose

Ensure system robustness and graceful degradation to prevent failure cascades and maintain system stability.

## Workflow

### 1. Failure Detection
- **Error Monitoring**: Monitor for errors and failures
- **Performance Monitoring**: Monitor system performance
- **Dependency Monitoring**: Monitor skill dependencies
- **Resource Monitoring**: Monitor system resources
- **User Impact Monitoring**: Monitor user impact

### 2. Failure Analysis
- **Root Cause Analysis**: Identify root causes of failures
- **Impact Assessment**: Assess failure impact
- **Cascade Prevention**: Prevent failure cascades
- **Recovery Planning**: Plan recovery strategies
- **Prevention Planning**: Plan prevention strategies

### 3. Graceful Degradation
- **Fallback Mechanisms**: Implement fallback mechanisms
- **Service Reduction**: Reduce services gracefully
- **User Notification**: Notify users of issues
- **Recovery Procedures**: Implement recovery procedures
- **System Isolation**: Isolate failing components

### 4. Recovery Procedures
- **Automatic Recovery**: Attempt automatic recovery
- **Manual Recovery**: Provide manual recovery options
- **System Restart**: Restart system components
- **Data Recovery**: Recover lost data
- **State Restoration**: Restore system state

### 5. Prevention Measures
- **Proactive Monitoring**: Proactive system monitoring
- **Predictive Analysis**: Predict potential failures
- **Preventive Maintenance**: Regular preventive maintenance
- **System Hardening**: Harden system against failures
- **Continuous Improvement**: Continuously improve robustness

## Success Criteria

- System failures are handled gracefully
- Failure cascades are prevented
- System stability is maintained
- User impact is minimized
- Recovery is fast and effective

## Observability

Log all robustness with `[robustness-system]` prefix:
- `[robustness-system] Detect: [failure detection]`
- `[robustness-system] Analyze: [failure analysis]`
- `[robustness-system] Degrade: [graceful degradation]`
- `[robustness-system] Recover: [recovery procedures]`
- `[robustness-system] Prevent: [prevention measures]`

## Rollback

If robustness fails:
1. Implement emergency procedures
2. Log failure for analysis
3. Continue with degraded functionality
4. Plan robustness improvement

## Examples

**Failure**: Skill execution fails
**Response**: Fall back to manual execution, notify user, attempt recovery
**Result**: System continues functioning with reduced capability

**Failure**: Dependency unavailable
**Response**: Use alternative dependency or skip dependent operation
**Result**: System continues functioning without cascading failures
