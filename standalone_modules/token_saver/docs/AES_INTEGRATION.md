# Token Saver Integration

This document describes how `token_saver` is integrated into the Autonomous Evolution System while maintaining standalone functionality.

## Integration Architecture

```
autonomous-evolution-system/
├── standalone_modules/
│   └── token_saver/
│       ├── integration/
│       │   └── token-optimizer-integration.cjs  (CommonJS wrapper)
│       ├── src/                                (ESM source)
│       ├── dist/                               (ESM build)
│       ├── bin/                                (CLI - standalone)
│       └── package.json                        (Standalone package)
└── utils/
    └── token-optimizer.js                      (System utility)
```

**Note**: The integration module uses `.cjs` extension to ensure CommonJS compatibility within the ESM package structure.

## Standalone Usage

`token_saver` remains fully functional as a standalone CLI tool:

```bash
# Navigate to token_saver directory
cd autonomous-evolution-system/standalone_modules/token_saver

# Install and build
npm i && npm run build

# Use CLI commands
echo '{"a": 1, "b": [1,2] }' | node ./bin/token-saver.js json-minify --report
node ./bin/token-saver.js diff before.txt after.txt
node ./bin/token-saver.js strip-fillers verbose.txt --preset=standard --report
```

## System Integration

### 1. Integration Module

The integration module (`integration/token-optimizer-integration.js`) provides:
- CommonJS wrapper for ESM `token_saver`
- Graceful degradation if `token_saver` is unavailable
- Unified API for token optimization operations

### 2. System Utility

The system utility (`utils/token-optimizer.js`) provides:
- Singleton access to token optimizer
- Easy integration for agents and system components
- Automatic initialization during system startup

### 3. Automatic Loading

The token optimizer is automatically loaded during system initialization:
- Loaded in `distributed-startup.js` during `loadAESComponents()`
- Gracefully handles cases where `token_saver` is not built
- System continues normally if token optimizer is unavailable

### 4. Agent Integration

Agents can use token optimization:

```javascript
const { getTokenOptimizer } = require('../utils/token-optimizer.js');
const optimizer = getTokenOptimizer();

// Optimize context before AI processing
const result = optimizer.optimizeContext(largeContext, {
  preset: 'conservative',
  tryJSON: true
});

console.log(`Saved ${result.savingsPercent}% tokens`);
// Use result.optimized for AI processing
```

## Usage Examples

### In System Integrity Agent

The System Integrity Agent uses token optimization for:
- Large JSON report minification
- Optimizing verbose monitoring output
- Token estimation for report metrics

### Optimize Context Before AI

```javascript
const { getTokenOptimizer } = require('./utils/token-optimizer.js');
const optimizer = getTokenOptimizer();

// Automatically applies best strategy
const optimized = optimizer.optimizeContext(contextText);
if (optimized.available && optimized.savingsPercent > 10) {
  // Use optimized.optimized for AI processing
  processWithAI(optimized.optimized);
}
```

### Minify JSON Output

```javascript
const optimizer = getTokenOptimizer();
const jsonText = JSON.stringify(largeData, null, 2);
const minified = optimizer.minifyJSON(jsonText);
// minified.optimized contains minified JSON
```

### Create Optimized Diffs

```javascript
const optimizer = getTokenOptimizer();
const diff = optimizer.createDiff(oldVersion, newVersion);
// diff.diff contains unified diff format
// Typically saves 50-90% tokens compared to full content
```

## Configuration

### Build Requirements

For token optimizer to be available in the system:
1. Navigate to `standalone_modules/token_saver`
2. Run `npm install && npm run build`
3. System will automatically detect and use it

### Optional Usage

The system works perfectly fine without token optimizer:
- All integrations check `isAvailable()` before use
- Graceful fallback to original content if unavailable
- No system failures if token_saver is not built

## Benefits

1. **Cost Savings**: Reduce token usage by 10-90% depending on content type
2. **Performance**: Smaller payloads = faster AI processing
3. **Budget Control**: Stay within token budgets more effectively
4. **Standalone**: Still usable as independent CLI tool
5. **Optional**: System works with or without it

## Integration Points

- ✅ System initialization (`distributed-startup.js`)
- ✅ System Integrity Agent (monitoring reports)
- ✅ Available via utility module for all agents
- ✅ Automatic detection and graceful degradation

## Future Enhancements

Potential integration points:
- Context builder optimization
- Journal/log file optimization
- Response processing optimization
- Budget guard integration
- Telemetry data optimization

