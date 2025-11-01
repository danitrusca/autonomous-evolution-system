# Token Saver (v2.0)

**Deterministic, zero-API token optimization CLI/library with advanced optimization strategies.**

Achieve **25-35% average savings** (up from 16%) with advanced optimizations including semantic compression, duplicate detection, content-type awareness, and more. Peaks of **50-60%** on verbose content.

---

## Table of Contents

- [Quick Start](#quick-start)
- [Features](#features)
- [Installation](#installation)
- [CLI Usage](#cli-usage)
- [Programmatic API](#programmatic-api)
- [Advanced Optimizations](#advanced-optimizations)
- [Integration](#integration)
- [Examples](#examples)
- [Benchmarks](#benchmarks)
- [Performance](#performance)
- [Migration Guide](#migration-guide)
- [Testing](#testing)

---

## Quick Start

Try Token Saver in 2 minutes:

```bash
cd autonomous-evolution-system/standalone_modules/token_saver
npm i && npm run build

# Basic optimization
echo '{"a": 1, "b": [1,2] }' | node ./bin/token-saver.js json-minify --report
node ./bin/token-saver.js strip-fillers examples/verbose.txt --preset=standard --report

# Advanced optimization (v2.0)
node ./bin/token-saver.js optimize examples/verbose.txt --preset=ultra --target-savings=25 --report
```

---

## Features

### Core Capabilities

- ✅ **Zero API Dependencies** - Pure local processing, no external calls
- ✅ **Deterministic** - Same input always produces same output
- ✅ **Safe** - Preserves code blocks, inline code, and JSON structure
- ✅ **Fast** - LRU caching for repeated content (up to 1000x faster)
- ✅ **Flexible** - Works standalone or integrated into systems

### Optimization Strategies

| Strategy | Typical Savings | Implementation |
|----------|----------------|----------------|
| **Advanced Optimize** | **25–35%** | All strategies combined |
| Diff-only | 50–90% | Auto-enforced for code edits |
| Semantic compression | 10–20% | Verbose phrase replacement |
| Duplicate removal | 3–8% | Sentence/paragraph dedup |
| Content-type aware | 10–25% | Log/doc/code optimization |
| Summarization | 20–40% | Long content extraction |
| JSON minify | 10–30% | Automatic on large blocks |
| Strip fillers | 10–20% | Conservative preset |
| **Ultra preset** | **+5–10%** | **20+ additional patterns** |
| Budget gate | Prevents overruns | token-sentry.mjs |

---

## Installation

### Prerequisites

- Node.js 14+ (ESM support)
- npm or yarn

### Setup

```bash
# Clone or navigate to token_saver directory
cd autonomous-evolution-system/standalone_modules/token_saver

# Install dependencies
npm install

# Build the project
npm run build
```

### Verify Installation

```bash
# Check version
node ./bin/token-saver.js --version

# Run tests
npm test

# Run benchmarks
npm run bench
```

---

## CLI Usage

### Commands

#### 1. JSON Minification

```bash
# From stdin
echo '{"a": 1, "b": [1,2] }' | node ./bin/token-saver.js json-minify --report

# From file
node ./bin/token-saver.js json-minify input.json --out=output.json --report

# Keep line endings
node ./bin/token-saver.js json-minify input.json --keep-eol
```

#### 2. Diff Generation

```bash
# Generate unified diff
node ./bin/token-saver.js diff before.txt after.txt --report

# Output to file
node ./bin/token-saver.js diff before.txt after.txt --out=changes.diff
```

#### 3. Strip Fillers

```bash
# Conservative (default)
node ./bin/token-saver.js strip-fillers input.txt --preset=conservative --report

# Standard
node ./bin/token-saver.js strip-fillers input.txt --preset=standard --report

# Aggressive
node ./bin/token-saver.js strip-fillers input.txt --preset=aggressive --report

# Ultra (v2.0) - Maximum savings
node ./bin/token-saver.js strip-fillers input.txt --preset=ultra --report
```

#### 4. Advanced Optimization (v2.0)

```bash
# Basic advanced optimization
node ./bin/token-saver.js optimize input.txt --report

# With target savings percentage
node ./bin/token-saver.js optimize input.txt --target-savings=25 --report

# With max tokens limit
node ./bin/token-saver.js optimize input.txt --max-tokens=3000 --report

# Disable specific optimizations
node ./bin/token-saver.js optimize input.txt --no-duplicates --no-summarization

# Custom preset
node ./bin/token-saver.js optimize input.txt --preset=ultra --target-savings=30 --report
```

### CLI Options

| Option | Description | Example |
|--------|-------------|---------|
| `--preset` | Optimization preset | `--preset=ultra` |
| `--target-savings` | Target savings percentage | `--target-savings=25` |
| `--max-tokens` | Maximum tokens limit | `--max-tokens=3000` |
| `--report` | Show optimization report | `--report` |
| `--keep-eol` | Preserve line endings | `--keep-eol` |
| `--out` | Output file path | `--out=output.txt` |
| `--no-semantic` | Disable semantic compression | `--no-semantic` |
| `--no-whitespace` | Disable whitespace compression | `--no-whitespace` |
| `--no-duplicates` | Disable duplicate removal | `--no-duplicates` |
| `--no-summarization` | Disable summarization | `--no-summarization` |
| `--no-context` | Disable context optimization | `--no-context` |

---

## Programmatic API

### Basic Usage

```typescript
import { 
  optimizeAdvanced,
  stripFillers,
  jsonMinify,
  unifiedDiff,
  estimateTokensHeuristic
} from '@aes/token-saver';

// Advanced optimization (recommended)
const result = optimizeAdvanced(text, {
  preset: 'ultra',
  targetSavingsPercent: 25,
  enableSemanticCompression: true,
  enableWhitespaceCompression: true,
  enableDuplicateRemoval: true,
  enableSummarization: true,
  enableContextOptimization: true
});

console.log(`Saved ${result.savingsPercent}% tokens`);
console.log(`Strategies: ${result.strategies.join(', ')}`);
console.log(`Content type: ${result.contentType}`);
```

### API Reference

#### `optimizeAdvanced(input, options?)`

Advanced optimization combining all strategies.

**Parameters:**
- `input: string` - Text to optimize
- `options?: AdvancedOptimizationOptions` - Optimization options

**Returns:**
```typescript
{
  output: string;
  originalTokens: number;
  optimizedTokens: number;
  saved: number;
  savingsPercent: number;
  strategies: string[];
  contentType: 'code' | 'prose' | 'log' | 'json' | 'documentation' | 'mixed';
}
```

**Options:**
```typescript
{
  preset?: 'conservative' | 'standard' | 'aggressive' | 'ultra';
  targetSavingsPercent?: number;
  maxTokens?: number;
  enableSemanticCompression?: boolean;
  enableWhitespaceCompression?: boolean;
  enableDuplicateRemoval?: boolean;
  enableSummarization?: boolean;
  enableContextOptimization?: boolean;
  contentType?: ContentType;
}
```

#### `stripFillers(input, options?)`

Remove filler words and phrases.

**Parameters:**
- `input: string` - Text to process
- `options?: { preset?: Preset; keepEol?: boolean }`

**Returns:**
```typescript
{
  output: string;
  meta: {
    changed: boolean;
    preserved: {
      codeBlocks: number;
      inline: number;
      json: boolean;
    };
  };
}
```

#### `jsonMinify(input, options?)`

Minify JSON by removing whitespace.

**Parameters:**
- `input: string` - JSON text
- `options?: { keepEol?: boolean; maxBytes?: number }`

**Returns:**
```typescript
{
  output: string;
  meta: {
    changed: boolean;
    preserved: {
      codeBlocks: number;
      inline: number;
      json: boolean;
    };
  };
}
```

#### `unifiedDiff(beforeName, before, afterName, after, options?)`

Generate unified diff between two versions.

**Parameters:**
- `beforeName: string` - Name for "before" file
- `before: string` - Before content
- `afterName: string` - Name for "after" file
- `after: string` - After content
- `options?: { keepEol?: boolean }`

**Returns:** `string` - Unified diff format

#### `estimateTokensHeuristic(text, options?)`

Estimate token count using heuristics.

**Parameters:**
- `text: string` - Text to estimate
- `options?: { model?: string; diffHeuristicBump?: boolean }`

**Returns:**
```typescript
{
  chars: number;
  tokens: number;
  model: string;
  note?: string;
}
```

---

## Advanced Optimizations

Token Saver v2.0 introduces advanced optimization strategies that achieve **25-35% average savings**.

### 1. Ultra Preset

Ultra aggressive preset with 29 filler patterns (20+ additional patterns).

**Examples:**
- "what I mean is" → removed
- "the thing is" → removed
- "you know" → removed
- "at this point in time" → "now"
- "prior to" → "before"

**Savings:** +5-10% over aggressive preset

**Usage:**
```bash
node ./bin/token-saver.js strip-fillers input.txt --preset=ultra
```

### 2. Semantic Compression

Replaces verbose phrases with concise equivalents while preserving meaning.

**Examples:**
- "perform an analysis of" → "analyze"
- "have the ability to" → "can"
- "at this point in time" → "now"
- "by means of" → "via"
- "for the purpose of" → "for"
- "in a timely manner" → "quickly"

**Savings:** +10-20% on formal/verbose text

**Status:** Enabled by default in advanced mode

### 3. Smart Whitespace Compression

Intelligently compresses whitespace while preserving code structure.

**Features:**
- Protects code blocks and inline code
- Removes excessive newlines (max 2 consecutive)
- Compresses multiple spaces/tabs
- Preserves document structure

**Savings:** +2-5%

**Status:** Enabled by default

### 4. Duplicate Detection & Removal

Identifies and removes duplicate sentences/paragraphs.

**Features:**
- Sentence-level deduplication
- Paragraph-level deduplication
- Preserves document structure
- Normalizes for comparison

**Savings:** +3-8% on verbose content

**Status:** Enabled by default

### 5. Content-Type Detection

Automatically detects content type and applies appropriate optimizations.

**Types:**
- `code` - Programming code
- `prose` - Natural language text
- `log` - Log files
- `json` - JSON data
- `documentation` - Documentation files
- `mixed` - Mixed content

**Benefits:** Better optimization for specific content types

**Status:** Automatic in advanced mode

### 6. Long Content Summarization

Summarizes very long content (>10K tokens) by extracting key information.

**Features:**
- Sentence scoring based on importance
- Preserves structure (first/last paragraphs)
- Configurable compression ratio
- Intelligent extraction

**Savings:** +20-40% on long content

**Status:** Enabled for content >10K tokens

### 7. Context-Specific Optimizers

Specialized optimizers for different content types.

#### Log Optimization
- Removes timestamps (various formats)
- Compresses repeated error messages
- Removes log level prefixes
- **Savings:** 35-50% on logs

#### Documentation Optimization
- Removes "As mentioned above/below" references
- Compresses repeated examples
- Removes redundant "Note:" sections
- **Savings:** 25-35% on documentation

#### Code Comment Optimization
- Removes obvious/redundant comments
- Preserves important comments
- Cleans up comment formatting
- **Savings:** 10-25% on code with comments

### 8. Token-Aware Optimization

Stops optimization when target savings/tokens reached.

**Features:**
- `targetSavingsPercent`: Stop when savings % reached
- `maxTokens`: Stop when token limit reached
- Early exit for efficiency
- Incremental strategy application

**Status:** Available in advanced mode

### 9. Performance Optimizations

#### Caching
- LRU cache for optimization results
- 1000 entries, 1 hour TTL
- Up to 1000x faster for repeated content
- Automatic cache invalidation

#### Early Exit
- Quick heuristic to skip unoptimizable content
- Detects common filler words
- Checks for verbose phrases
- Identifies duplicate sentences

### Strategy Order

Optimizations are applied in this order for maximum effectiveness:

1. **Context-specific optimization** (if content type detected)
2. **Duplicate removal** (high impact, low risk)
3. **Semantic compression** (meaningful reductions)
4. **Strip fillers** (gradually increasing aggressiveness)
5. **Whitespace compression** (final cleanup)
6. **Summarization** (last resort for very long content)

Each step checks if target savings/tokens reached and exits early if so.

### Expected Savings

| Content Type | v1.0 | v2.0 | Improvement |
|--------------|------|------|-------------|
| Verbose prose | 16% | 45-60% | +29-44% |
| Mixed content | 16% | 25-35% | +9-19% |
| Formal text | 16% | 30-40% | +14-24% |
| Documentation | 16% | 25-35% | +9-19% |
| Logs | 16% | 35-50% | +19-34% |

---

## Integration

### Autonomous Evolution System Integration

Token Saver integrates seamlessly with the Autonomous Evolution System while maintaining standalone functionality.

#### Architecture

```
autonomous-evolution-system/
├── standalone_modules/
│   └── token_saver/
│       ├── integration/
│       │   └── token-optimizer-integration.cjs  (CommonJS wrapper)
│       ├── src/                                (ESM source)
│       ├── dist/                               (ESM build)
│       └── bin/                                (CLI - standalone)
└── utils/
    └── token-optimizer.js                      (System utility)
```

#### Usage in Agents

```javascript
const { getTokenOptimizer } = require('../utils/token-optimizer.js');
const optimizer = getTokenOptimizer();

// Optimize context before AI processing
const result = optimizer.optimizeContext(largeContext, {
  preset: 'ultra',
  targetSavingsPercent: 25
});

console.log(`Saved ${result.savingsPercent}% tokens`);
console.log(`Strategies: ${result.strategies.join(', ')}`);
// Use result.optimized for AI processing
```

#### Automatic Loading

The token optimizer is automatically loaded during system initialization:
- Loaded in `distributed-startup.js` during `loadAESComponents()`
- Gracefully handles cases where `token_saver` is not built
- System continues normally if token optimizer is unavailable

#### Integration Points

- ✅ System initialization (`distributed-startup.js`)
- ✅ System Integrity Agent (monitoring reports)
- ✅ Available via utility module for all agents
- ✅ Automatic detection and graceful degradation

See [AES_INTEGRATION.md](./AES_INTEGRATION.md) for detailed integration documentation.

---

## Examples

### Example 1: Verbose Prose

**Input:**
```
It is important to note that basically, at this point in time, 
we have the ability to perform an analysis of the situation. 
The thing is, what I mean is that basically we can actually 
analyze it. You know, I mean, it's basically obvious that 
we can do this analysis.
```

**Output (with advanced optimization):**
```
We can analyze the situation. We can analyze it. We can do this analysis.
```

**Savings:** ~60% tokens

### Example 2: Formal Documentation

**Input:**
```
It is essential to note that the system has the capacity to 
perform operations in a timely manner. Prior to executing the 
function, it is necessary to ensure that all prerequisites 
have been met. Subsequent to the execution, the system will 
provide feedback.
```

**Output:**
```
The system can perform operations quickly. Before executing 
the function, must ensure all prerequisites are met. After 
execution, the system will provide feedback.
```

**Savings:** ~35% tokens

### Example 3: Code with Comments

**Input:**
```javascript
// This function sets the value of x to 5
function setX() {
  x = 5; // Set x to 5
}

// This function returns true
function getTrue() {
  return true; // Return true
}
```

**Output:**
```javascript
function setX() {
  x = 5;
}

function getTrue() {
  return true;
}
```

**Savings:** ~25% tokens

---

## Benchmarks

### Running Benchmarks

```bash
# Run benchmarks
npm run bench

# Save and track historical savings
npm run bench:save

# Generate report
npm run bench:report
```

### Sample Output

```
File                Mode           Saved%   Tokens_Before  Tokens_After  Notes
verbose.txt         strip-fillers   22.4%   1040           808           standard
large.json          json-minify     31.8%   2850           1945          safe
diff-example        diff            68.1%   412            132           patchable
─────────────────────────────────────────────────────────────────────────────
TOTAL (avg)                        40.8%
```

### Benchmark Results

Results are saved to `benchmarks/results/summary.json` and can be viewed in:
- Markdown: `benchmarks/reports/latest-report.md`
- HTML Dashboard: `benchmarks/reports/index.html`

### Guarantees

- ≥20% reduction on verbose prose
- JSON/inline-code invariants preserved
- Diff output always patchable

---

## Performance

### Caching

- **LRU Cache**: 1000 entries, 1 hour TTL
- **Speed**: Up to 1000x faster for repeated content
- **Memory**: Limited to ~1000 entries

### Early Exit

- Quick heuristic to skip unoptimizable content
- Reduces processing time for clean text
- Detects optimization potential before processing

### Processing Speed

- **Small files** (<1KB): <1ms
- **Medium files** (1-100KB): 1-10ms
- **Large files** (100KB-1MB): 10-100ms
- **Very large files** (>1MB): 100ms-1s

---

## Migration Guide

### From Basic to Advanced

```typescript
// Before (still works)
const result = stripFillers(text, { preset: 'standard' });

// After (with all optimizations)
const result = optimizeAdvanced(text, { preset: 'ultra' });
```

### Gradual Migration

You can enable optimizations gradually:

```typescript
// Start with just semantic compression
const result = optimizeAdvanced(text, {
  enableSemanticCompression: true,
  enableWhitespaceCompression: false,
  enableDuplicateRemoval: false
});

// Then add more as needed
const result = optimizeAdvanced(text, {
  enableSemanticCompression: true,
  enableWhitespaceCompression: true,
  enableDuplicateRemoval: true
});
```

### Backward Compatibility

All existing functionality remains unchanged:
- ✅ `strip-fillers` command works as before
- ✅ `json-minify` command works as before
- ✅ `diff` command works as before
- ✅ Existing presets (`conservative`, `standard`, `aggressive`) unchanged
- ✅ New `ultra` preset added
- ✅ Integration layer gracefully degrades if advanced features unavailable

---

## Testing

### Run Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test tests/advanced-optimization.spec.ts

# Run in watch mode
npm run test:watch
```

### Test Coverage

- ✅ Advanced optimization strategies
- ✅ Semantic compression
- ✅ Whitespace compression
- ✅ Duplicate detection
- ✅ Content-type detection
- ✅ Code block preservation
- ✅ Backward compatibility

### Benchmarks

```bash
# Run benchmarks
npm run bench

# Save results
npm run bench:save

# Generate report
npm run bench:report
```

---

## Contributing

### Development Setup

```bash
# Install dependencies
npm install

# Build in watch mode
npm run dev

# Run tests
npm test

# Type check
npm run typecheck
```

### Project Structure

```
token_saver/
├── src/
│   ├── optimizers/        # Advanced optimization strategies
│   ├── strip-fillers/     # Filler word removal
│   ├── estimators/        # Token estimation
│   └── utils/             # Utilities
├── tests/                  # Test suite
├── benchmarks/            # Benchmark suite
├── docs/                   # Documentation
└── integration/            # Integration layer
```

---

## License

MIT License - see [LICENSE](../LICENSE) file for details.

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

### v2.0.0 Highlights

- Added ultra preset with 20+ new patterns
- Added semantic compression
- Added whitespace compression
- Added duplicate detection
- Added content-type detection
- Added summarization for long content
- Added context-specific optimizers
- Added token-aware optimization
- Added performance caching
- Improved average savings from 16% to 25-35%

---

## Support

For issues, questions, or contributions:
- Check existing documentation in `docs/` folder
- Review test files for usage examples
- See integration guide for system integration

---

**Token Saver v2.0** - Optimize your tokens, maximize your savings. 🚀
