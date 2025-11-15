---
name: "proactive-debugging"
description: "Preemptively build debugging features into every feature we create, ensuring observability from day one"
version: "1.0.0"
trigger: "When building new features or when features lack debugging capabilities"
invariant: "All features include debugging capabilities that are zero-overhead when disabled"
dependencies: ["debug-trace-analyzer", "ecp-protocol", "skill-evolution"]
category: "meta"
author: "ECP System"
created: "2025-01-27"
---

# Proactive Debugging

## Purpose

Ensure every feature includes built-in debugging capabilities, observability, and diagnostics from the start—not as an afterthought. Transform debugging from reactive troubleshooting to proactive observability.

## Workflow

### 1. Pre-Implementation: Debug Requirements Analysis

**Frame**: Before implementing any feature, analyze what debugging capabilities it needs.

- **Identify Critical Paths**: What operations need observability?
  - User-facing actions (clicks, inputs, navigation)
  - Background processes (data fetching, processing, syncing)
  - State transitions (state changes, mutations, updates)
  - Error conditions (validation failures, network errors, exceptions)

- **Define Metrics**: What should we measure?
  - Performance: latency, throughput, duration
  - Reliability: error rates, success rates, retry counts
  - Usage: action counts, feature adoption, user paths
  - Resource: memory usage, storage size, network bandwidth

- **Plan Debug UI**: What debug views/panels would help troubleshoot?
  - Metrics dashboard (live counters, percentiles, trends)
  - Event log viewer (filtered, searchable, time-based)
  - State inspector (collapsible, searchable, diff view)
  - Health indicators (status badges, warnings, errors)

- **Design Debug APIs**: What debug hooks/events should be exposed?
  - Event bus integration (log important events)
  - State snapshot APIs (inspect current state)
  - Performance profiling hooks (measure critical paths)
  - Error tracking hooks (capture and report errors)

- **Consider Failure Modes**: What could go wrong? How do we detect it?
  - Silent failures (operations that fail without throwing)
  - Performance degradation (operations that slow down)
  - State corruption (invalid or inconsistent state)
  - Resource leaks (memory, connections, timers)

### 2. During Implementation: Debug Infrastructure Integration

**Design**: Integrate debugging infrastructure alongside feature code.

- **Performance Marks**: Add `performance.mark()` around critical operations
  ```typescript
  performance.mark('feature.operation:start');
  // ... operation
  performance.mark('feature.operation:end');
  debug.metric('feature.operation.ms', measureDuration('feature.operation'));
  ```

- **Metrics Collection**: Integrate with debug SDK (or create project-specific debug layer)
  ```typescript
  debug.metric('feature.action.count', 1);
  debug.metric('feature.latency.ms', latency);
  debug.p50('feature.latency.ms'); // Get percentile
  ```

- **State Snapshots**: Expose state inspection APIs
  ```typescript
  debug.logDiff(convId, 'Feature state changed', hashState(state));
  // Or expose debug API
  export function getFeatureDebugState() {
    return { state, metrics, errors };
  }
  ```

- **Event Logging**: Log important events to debug bus/logs
  ```typescript
  debug.logBus({
    dir: '→',
    ch: 'feature',
    type: 'FEATURE_ACTION',
    meta: { action: 'click', target: 'button' }
  });
  ```

- **Error Boundaries**: Wrap risky operations with error tracking
  ```typescript
  try {
    riskyOperation();
  } catch (error) {
    debug.metric('feature.error.count', 1);
    debug.logBus({
      dir: '→',
      ch: 'feature',
      type: 'FEATURE_ERROR',
      meta: { error: error.message, stack: error.stack }
    });
    throw error;
  }
  ```

- **Health Checks**: Add health indicators for each subsystem
  ```typescript
  export function checkFeatureHealth(): HealthStatus {
    return {
      status: 'healthy',
      metrics: {
        latency: debug.p50('feature.latency.ms'),
        errorRate: calculateErrorRate(),
        uptime: getUptime()
      }
    };
  }
  ```

### 3. Post-Implementation: Debug Validation

**Plan**: Verify debugging capabilities work correctly.

- **Verify Observability**: Can we see what's happening?
  - Test metrics collection (do metrics appear?)
  - Test event logging (do events show in logs?)
  - Test state inspection (can we inspect state?)
  - Test performance marks (are they recorded?)

- **Test Debug UI**: Do debug panels/tools work?
  - Render debug components
  - Test debug panel navigation
  - Verify debug data displays correctly
  - Test debug filters and search

- **Validate Metrics**: Are metrics accurate and useful?
  - Compare metrics to actual behavior
  - Verify percentile calculations
  - Check metric aggregation (sums, averages)
  - Validate metric timestamps

- **Check Performance**: Does debugging add overhead?
  - Measure overhead when debug disabled (should be < 0.2ms)
  - Measure overhead when debug enabled
  - Verify zero-overhead design (no-op methods when disabled)
  - Test ring buffer limits (memory safety)

- **Document Debug Features**: How do developers use these debug tools?
  - Write debug API documentation
  - Create debug UI guide
  - Document debug metrics and their meanings
  - Provide debug troubleshooting examples

### 4. Continuous Evolution: Debug Feature Enhancement

**Review**: Improve debugging capabilities based on usage.

- **Monitor Debug Usage**: What debug features are actually used?
  - Track debug panel views
  - Track debug API calls
  - Track debug metric queries
  - Identify unused debug features

- **Identify Gaps**: What's hard to debug? What's missing?
  - Collect developer feedback
  - Analyze debugging pain points
  - Identify missing observability
  - Plan debug feature additions

- **Refine Metrics**: What metrics aren't useful? What should we add?
  - Remove unused metrics
  - Add missing metrics
  - Improve metric accuracy
  - Optimize metric collection

- **Simplify Debug UI**: Can we make debugging easier?
  - Improve debug UI layout
  - Add keyboard shortcuts
  - Improve search and filtering
  - Add debug presets/profiles

## Success Criteria

- ✅ Every feature has observability built-in
- ✅ Debug capabilities are zero-overhead when disabled
- ✅ Debug features are documented and discoverable
- ✅ Developers can troubleshoot issues without external tools
- ✅ Debug infrastructure evolves with the feature
- ✅ Debug patterns are reusable across features

## Observability

Log all proactive debugging activities with `[proactive-debugging]` prefix:
- `[proactive-debugging] Analyze: [debug requirements identified]`
- `[proactive-debugging] Integrate: [debug infrastructure added]`
- `[proactive-debugging] Validate: [debug capabilities verified]`
- `[proactive-debugging] Evolve: [debug features improved]`

## AES Enforcement

- The Autonomous Evolution System evaluates every code generation session for proactive debugging coverage.
- Mistake Prevention Engine blocks actions when generated runtime files lack instrumentation.
- Use `@proactive-debugging: skip` (with inline rationale) only when instrumentation is truly not applicable.
- Compliance metrics feed into system-wide learning and reporting.

## Integration with Debug SDK

When working with projects that have a debug SDK (like `fractal-messaging/browser-extension`):

1. **Use Existing SDK**: Integrate with project's debug SDK
2. **Extend Patterns**: Apply debug SDK patterns to new features
3. **Create Templates**: Generate code templates with debug hooks pre-wired
4. **Document Patterns**: Capture debug integration patterns for reuse

## Examples

### Example 1: New Feature with Proactive Debugging

**Feature**: Message branch creation

**Debug Requirements**:
- Measure branch creation latency
- Track branch creation success/failure
- Log branch creation events
- Inspect branch state

**Implementation**:
```typescript
// Feature code with debug hooks
export async function createBranch(parentId: string, messageId: string) {
  debug.logBus({
    dir: '→',
    ch: 'content',
    type: 'BRANCH_CREATE_START',
    meta: { parentId, messageId }
  });

  return debug.time('branch.create.ms', async () => {
    try {
      performance.mark('branch.create:start');
      
      const branch = await performBranchCreation(parentId, messageId);
      
      performance.mark('branch.create:end');
      debug.metric('branch.create.success', 1);
      
      debug.logBus({
        dir: '→',
        ch: 'content',
        type: 'BRANCH_CREATE_SUCCESS',
        meta: { branchId: branch.id }
      });
      
      return branch;
    } catch (error) {
      debug.metric('branch.create.error', 1);
      debug.logBus({
        dir: '→',
        ch: 'content',
        type: 'BRANCH_CREATE_ERROR',
        meta: { error: error.message }
      });
      throw error;
    }
  });
}
```

**Debug UI Component** (created alongside feature):
```typescript
export function BranchDebugPanel() {
  const snapshot = debug.snapshot();
  const latency = debug.p50('branch.create.ms');
  const p95 = debug.p95('branch.create.ms');
  
  return (
    <div className="debug-panel">
      <h3>Branch Creation</h3>
      <div>
        <p>Latency (p50): {latency}ms</p>
        <p>Latency (p95): {p95}ms</p>
        <p>Success Rate: {calculateSuccessRate('branch.create')}</p>
      </div>
      {/* More debug info */}
    </div>
  );
}
```

### Example 2: Applying to Existing Feature

**Feature**: Message processing (already exists, needs debug hooks)

**Action**: Add debug hooks without changing feature behavior

```typescript
// Before
function processMessage(message: Message) {
  // ... process message
  updateUI();
}

// After (with proactive debugging)
function processMessage(message: Message) {
  debug.time('message.process.ms', () => {
    debug.logBus({
      dir: '→',
      ch: 'content',
      type: 'MESSAGE_PROCESS_START',
      meta: { messageId: message.id }
    });
    
    try {
      // ... process message (unchanged)
      updateUI();
      
      debug.metric('message.process.success', 1);
      debug.logBus({
        dir: '→',
        ch: 'content',
        type: 'MESSAGE_PROCESS_SUCCESS',
        meta: { messageId: message.id }
      });
    } catch (error) {
      debug.metric('message.process.error', 1);
      debug.logBus({
        dir: '→',
        ch: 'content',
        type: 'MESSAGE_PROCESS_ERROR',
        meta: { messageId: message.id, error: error.message }
      });
      throw error;
    }
  });
}
```

## Rollback

If proactive debugging fails:
1. Disable debug hooks (set `debug.enabled = false`)
2. Remove debug code if causing issues (debug hooks should be safe to remove)
3. Log failure for analysis
4. Continue with feature without debug capabilities
5. Plan debug integration improvement

## Evolution Triggers

This skill should be triggered when:
- Building new features (always apply proactive debugging)
- Features lack debugging capabilities (retrofit debug hooks)
- Debugging is difficult (identify gaps, add missing debug features)
- Debug patterns are identified (standardize and reuse patterns)

## Integration with Other Skills

- **debug-trace-analyzer**: Use for analyzing debug logs and traces
- **skill-evolution**: Evolve debug patterns based on usage
- **ecp-protocol**: Follow ECP workflow for debug feature development
- **friction-based-evolution**: Detect debugging friction, evolve debug capabilities

---

*Created: 2025-01-27*  
*Inspired by: Browser Extension Debug SDK + Autonomous Evolution Engine*

