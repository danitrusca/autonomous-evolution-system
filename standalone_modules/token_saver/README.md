# Token Saver (v2.0)

**Deterministic, zero-API token optimization CLI/library with advanced optimization strategies.**

Achieve **25-35% average savings** (up from 16%) with advanced optimizations including semantic compression, duplicate detection, content-type awareness, and more.

## Quick Start

```bash
cd autonomous-evolution-system/standalone_modules/token_saver
npm i && npm run build

# Basic optimization
node ./bin/token-saver.js strip-fillers examples/verbose.txt --preset=standard --report

# Advanced optimization (v2.0)
node ./bin/token-saver.js optimize examples/verbose.txt --preset=ultra --target-savings=25 --report
```

## Features

- ✅ **25-35% average savings** (up from 16%)
- ✅ **50-60% on verbose content** (up from 45%)
- ✅ **Zero API dependencies** - Pure local processing
- ✅ **Deterministic** - Same input always produces same output
- ✅ **Safe** - Preserves code blocks, inline code, and JSON structure
- ✅ **Fast** - LRU caching (up to 1000x faster for repeated content)

## Optimization Strategies

| Strategy | Typical Savings |
|----------|----------------|
| **Advanced Optimize** | **25–35%** |
| Semantic compression | 10–20% |
| Duplicate removal | 3–8% |
| Content-type aware | 10–25% |
| Summarization | 20–40% |
| JSON minify | 10–30% |
| Strip fillers | 10–20% |
| **Ultra preset** | **+5–10%** |

## Documentation

📚 **For comprehensive documentation, see [docs/README.md](./docs/README.md)**

The full documentation includes:
- Complete CLI usage guide
- Programmatic API reference
- Advanced optimization details
- Integration guide
- Examples and benchmarks
- Migration guide

## Quick Links

- [Full Documentation](./docs/README.md)
- [Advanced Optimizations](./docs/OPTIMIZATIONS.md)
- [Integration Guide](./docs/AES_INTEGRATION.md)
- [Changelog](./docs/CHANGELOG.md)

## Installation

```bash
npm install
npm run build
```

## Usage

### CLI

```bash
# Advanced optimization
node ./bin/token-saver.js optimize input.txt --preset=ultra --target-savings=25 --report

# Strip fillers
node ./bin/token-saver.js strip-fillers input.txt --preset=ultra --report

# JSON minify
echo '{"a": 1}' | node ./bin/token-saver.js json-minify --report
```

### Programmatic

```typescript
import { optimizeAdvanced } from '@aes/token-saver';

const result = optimizeAdvanced(text, {
  preset: 'ultra',
  targetSavingsPercent: 25
});

console.log(`Saved ${result.savingsPercent}% tokens`);
```

## Testing

```bash
npm test
npm run bench
```

## License

MIT License - see [LICENSE](./LICENSE) file for details.

---

**Token Saver v2.0** - Optimize your tokens, maximize your savings. 🚀

