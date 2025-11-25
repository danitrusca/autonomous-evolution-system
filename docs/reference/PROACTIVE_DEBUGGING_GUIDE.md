# Proactive Debugging Guide

## Overview

This guide shows how to apply the **Proactive Debugging** skill to the browser extension development. Instead of adding debug features retroactively, we build them in from the start.

## Current State

✅ **Pass 1 Complete**: Debug SDK (`src/shared/debug.ts`) with:
- Zero-overhead design (no-op when disabled)
- Ring buffers for memory safety
- Dev HUD with live counters
- Performance metrics tracking

🚧 **Pass 2 In Progress**: Debug Panel + Diagnostics Export  
⏳ **Pass 3 Planned**: Advanced Tools + Safety Features

## AES Enforcement

- The Autonomous Evolution System now checks every code generation session for proactive debugging coverage.
- Mistake Prevention Engine blocks shipping code that lacks instrumentation unless an explicit `@proactive-debugging: skip` exemption (with rationale) is present.
- Compliance results are logged system-wide, so skipping instrumentation requires a deliberate callout.

## Applying Proactive Debugging

### Principle

Every new feature should include debug hooks **during implementation**, not after.

### Integration Pattern

```typescript
import { debug } from '@/shared/debug';

// ✅ Good: Debug hooks integrated during implementation
export async function newFeature(input: Input) {
  // 1. Log start event
  debug.logBus({
    dir: '→',
    ch: 'content', // or 'panel', 'sw'
    type: 'NEW_FEATURE_START',
    meta: { inputId: input.id }
  });

  // 2. Measure performance
  return debug.time('new.feature.ms', async () => {
    try {
      performance.mark('new.feature:start');
      
      // 3. Feature implementation
      const result = await performFeature(input);
      
      performance.mark('new.feature:end');
      
      // 4. Log success metrics
      debug.metric('new.feature.success', 1);
      debug.logBus({
        dir: '→',
        ch: 'content',
        type: 'NEW_FEATURE_SUCCESS',
        meta: { resultId: result.id }
      });
      
      return result;
    } catch (error) {
      // 5. Log error metrics
      debug.metric('new.feature.error', 1);
      debug.logBus({
        dir: '→',
        ch: 'content',
        type: 'NEW_FEATURE_ERROR',
        meta: { error: error.message }
      });
      throw error;
    }
  });
}
```

### Checklist for New Features

When implementing a new feature, ensure:

- [ ] **Performance Marks**: `performance.mark()` around critical operations
- [ ] **Metrics**: Track success/error counts, latency, throughput
- [ ] **Event Logging**: Log important events to debug bus
- [ ] **Error Tracking**: Wrap risky operations with try/catch + debug logging
- [ ] **State Snapshots**: If feature manages state, expose debug inspection API
- [ ] **Exemptions Logged**: If instrumentation is skipped, annotate code with `@proactive-debugging: skip // reason`
- [ ] **Debug UI Component**: Create debug panel component alongside feature (optional but recommended)

## Examples: Applying to Browser Extension

### Example 1: Export Feature (Pass 2)

**Feature**: Export diagnostics JSON

**Debug Integration**:
```typescript
// src/debug/export.ts
export async function exportDiagnostics(options: ExportOptions) {
  debug.logBus({
    dir: '→',
    ch: 'panel',
    type: 'EXPORT_DIAGNOSTICS_START',
    meta: { format: options.format, redact: options.redact }
  });

  return debug.time('export.diagnostics.ms', async () => {
    try {
      const data = await assembleDiagnostics(options);
      
      debug.metric('export.diagnostics.success', 1);
      debug.metric('export.diagnostics.size.bytes', JSON.stringify(data).length);
      
      debug.logBus({
        dir: '→',
        ch: 'panel',
        type: 'EXPORT_DIAGNOSTICS_SUCCESS',
        meta: { size: JSON.stringify(data).length }
      });
      
      return data;
    } catch (error) {
      debug.metric('export.diagnostics.error', 1);
      debug.logBus({
        dir: '→',
        ch: 'panel',
        type: 'EXPORT_DIAGNOSTICS_ERROR',
        meta: { error: error.message }
      });
      throw error;
    }
  });
}
```

**Debug UI Component** (add to Debug.tsx):
```typescript
function ExportDebugPanel() {
  const latency = debug.p50('export.diagnostics.ms');
  const successRate = calculateSuccessRate('export.diagnostics');
  
  return (
    <div className="debug-section">
      <h4>Export Diagnostics</h4>
      <p>Latency (p50): {latency}ms</p>
      <p>Success Rate: {successRate}%</p>
    </div>
  );
}
```

### Example 2: Selector Lab (Pass 3)

**Feature**: Interactive selector tester

**Debug Integration**:
```typescript
// src/content/dom.ts - runSelector handler
export async function runSelector(strategy: string) {
  debug.logBus({
    dir: '←',
    ch: 'panel',
    type: 'SELECTOR_TEST_START',
    meta: { strategy }
  });

  return debug.time('selector.test.ms', async () => {
    try {
      const startTime = performance.now();
      const results = await executeSelector(strategy);
      const duration = performance.now() - startTime;
      
      debug.metric('selector.test.count', results.length);
      debug.metric('selector.test.ms', duration);
      
      debug.logBus({
        dir: '→',
        ch: 'content',
        type: 'SELECTOR_TEST_SUCCESS',
        meta: { 
          strategy, 
          count: results.length, 
          duration,
          timeout: duration > 30 // Flag slow selectors
        }
      });
      
      return results;
    } catch (error) {
      debug.metric('selector.test.error', 1);
      debug.logBus({
        dir: '→',
        ch: 'content',
        type: 'SELECTOR_TEST_ERROR',
        meta: { strategy, error: error.message }
      });
      throw error;
    }
  });
}
```

### Example 3: Message Inspector (Pass 3)

**Feature**: Hover tooltip for message inspection

**Debug Integration**:
```typescript
// src/content/ui/Inspector.tsx
export function Inspector({ messageId }: { messageId: string }) {
  useEffect(() => {
    debug.logBus({
      dir: '→',
      ch: 'content',
      type: 'INSPECTOR_OPEN',
      meta: { messageId }
    });
    
    debug.metric('inspector.open.count', 1);
    
    return () => {
      debug.logBus({
        dir: '→',
        ch: 'content',
        type: 'INSPECTOR_CLOSE',
        meta: { messageId }
      });
    };
  }, [messageId]);
  
  // ... inspector UI
}
```

## Debug Metrics Naming Convention

Follow this pattern: `{feature}.{operation}.{unit}`

Examples:
- `dom.scan.ms` - DOM scan duration
- `storage.write.ms` - Storage write duration
- `branch.create.success` - Branch creation success count
- `selector.test.count` - Selector test match count
- `export.diagnostics.size.bytes` - Export file size

## Debug Event Types

Follow this pattern: `{FEATURE}_{ACTION}_{STATUS}`

Examples:
- `BRANCH_CREATE_START` / `BRANCH_CREATE_SUCCESS` / `BRANCH_CREATE_ERROR`
- `EXPORT_DIAGNOSTICS_START` / `EXPORT_DIAGNOSTICS_SUCCESS` / `EXPORT_DIAGNOSTICS_ERROR`
- `SELECTOR_TEST_START` / `SELECTOR_TEST_SUCCESS` / `SELECTOR_TEST_ERROR`

## Benefits

### Immediate
- **Observability**: See what's happening in real-time
- **Performance**: Identify bottlenecks quickly
- **Errors**: Track failures and their causes

### Long-term
- **Pattern Recognition**: Learn which features cause issues
- **Proactive Fixes**: Fix problems before users report them
- **Technical Debt**: Avoid retrofitting debug features later

## Integration Checklist

When implementing Pass 2 & 3 features:

1. **Before Implementation**:
   - [ ] Identify critical paths needing observability
   - [ ] Define metrics to track
   - [ ] Plan debug UI components

2. **During Implementation**:
   - [ ] Add performance marks
   - [ ] Add debug.metric() calls
   - [ ] Add debug.logBus() calls
   - [ ] Wrap risky operations with error tracking
   - [ ] If instrumentation is intentionally skipped, add `@proactive-debugging: skip // reason`

3. **After Implementation**:
   - [ ] Verify debug hooks work
   - [ ] Test debug UI components
   - [ ] Validate metrics accuracy
   - [ ] Document debug features

## Next Steps

1. **Apply to Pass 2**: Add debug hooks to export, storage viewer, bus console
2. **Apply to Pass 3**: Add debug hooks to selector lab, inspector, safe mode
3. **Create Templates**: Generate code templates with debug hooks pre-wired
4. **Document Patterns**: Add more examples to this guide

---

*Created: 2025-01-27*  
*Part of: Proactive Debugging Skill Evolution*

