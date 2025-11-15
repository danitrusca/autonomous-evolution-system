/**
 * Debugger Agent
 * 
 * Purpose: Provide on-demand debugging assistance by analyzing error traces,
 * identifying likely root causes, and proposing concrete fixes with
 * verification steps. Integrates conceptually with:
 *  - skills/builder/debug-trace-analyzer.md
 *  - skills/meta/proactive-debugging.md
 * 
 * Notes:
 * - This implementation is self-contained and safe to run in any Node.js context.
 * - It does not require external services; outputs structured JSON reports.
 * - Designed to be invoked on demand (e.g., via `/debug` Cursor command).
 */

const fs = require('fs');
const path = require('path');

class DebuggerAgent {
  constructor() {
    this.agentName = 'debugger-agent';
    this.agentVersion = '1.0.0';
    this.status = 'idle';
    this.lastAnalysis = null;
    this.reportsPath = path.join(__dirname, '..', 'reports', 'debugger');
    this.ensureReportsPath();
  }

  ensureReportsPath() {
    if (!fs.existsSync(this.reportsPath)) {
      fs.mkdirSync(this.reportsPath, { recursive: true });
    }
  }

  /**
   * Analyze a raw error trace string and return a structured analysis.
   * Invariant: Never throws; always returns a safe object.
   * @param {string} trace
   * @param {{ contextFiles?: string[], hint?: string }} options
   */
  analyzeTrace(trace, options = {}) {
    this.status = 'analyzing';
    const startedAt = new Date().toISOString();

    const parsed = this.parseTrace(trace || '');
    const patterns = this.matchPatterns(parsed);
    const suggestions = this.generateSuggestions(patterns, parsed);
    const verification = this.generateVerificationSteps(patterns, parsed);

    const analysis = {
      agent: { name: this.agentName, version: this.agentVersion },
      startedAt: startedAt,
      finishedAt: new Date().toISOString(),
      input: {
        kind: 'trace',
        size: typeof trace === 'string' ? trace.length : 0,
        sample: (trace || '').slice(0, 500)
      },
      parsed,
      patterns,
      suggestions,
      verification,
      confidence: this.estimateConfidence(patterns),
      notes: options.hint ? [`hint: ${options.hint}`] : []
    };

    this.lastAnalysis = analysis;
    this.status = 'idle';
    this.persistReport(analysis);
    return analysis;
  }

  /**
   * Convenience: Analyze a linter diagnostics array and produce suggestions.
   * @param {Array<{filePath:string, message:string, ruleId?:string, severity?:number, line?:number, column?:number}>} lints
   */
  analyzeLints(lints = []) {
    this.status = 'analyzing';
    const startedAt = new Date().toISOString();

    const normalized = lints.map((d, i) => ({
      index: i,
      file: d.filePath || 'unknown',
      message: d.message || '',
      ruleId: d.ruleId || null,
      severity: d.severity || 1,
      line: d.line || null,
      column: d.column || null
    }));

    const patterns = this.matchLintPatterns(normalized);
    const suggestions = this.generateLintSuggestions(patterns, normalized);
    const verification = this.generateLintVerificationSteps(patterns, normalized);

    const analysis = {
      agent: { name: this.agentName, version: this.agentVersion },
      startedAt: startedAt,
      finishedAt: new Date().toISOString(),
      input: {
        kind: 'lints',
        count: normalized.length
      },
      parsed: { lints: normalized },
      patterns,
      suggestions,
      verification,
      confidence: this.estimateConfidence(patterns),
      notes: ['Derived from linter diagnostics']
    };

    this.lastAnalysis = analysis;
    this.status = 'idle';
    this.persistReport(analysis);
    return analysis;
  }

  /**
   * Optionally scaffold a minimal debugging test from a trace.
   * Creates either a framework test (Jest/Vitest/Mocha) or a standalone repro script.
   * Returns the created file path.
   * @param {string} trace
   */
  scaffoldTestFromTrace(trace) {
    const parsed = this.parseTrace(trace || '');
    const topFrame = parsed.frames.find(f => f && f.file && !String(f.file).includes('node_modules')) || {};
    const framework = this.detectTestFramework();
    const testDir = path.join(__dirname, '..', 'tests', 'debug');
    if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true });
    const baseSlug = this.safeSlug((topFrame.file ? path.basename(topFrame.file) : 'trace') + '-' + (topFrame.line || 'line'));
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    if (framework === 'jest' || framework === 'vitest') {
      const filename = path.join(testDir, `${baseSlug}.${framework === 'jest' ? 'test' : 'spec'}.js`);
      fs.writeFileSync(filename, this.renderJestVitestTest(framework, parsed, topFrame));
      return filename;
    }
    if (framework === 'mocha') {
      const filename = path.join(testDir, `${baseSlug}.spec.js`);
      fs.writeFileSync(filename, this.renderMochaTest(parsed, topFrame));
      return filename;
    }
    // Fallback to a standalone reproduction script
    const filename = path.join(testDir, `${baseSlug}.repro.js`);
    fs.writeFileSync(filename, this.renderStandaloneRepro(parsed, topFrame));
    return filename;
  }

  detectTestFramework() {
    const pkg = this.findNearestPackageJson();
    if (!pkg) return null;
    const has = (dep) => Boolean(pkg.dependencies?.[dep] || pkg.devDependencies?.[dep]);
    if (has('jest')) return 'jest';
    if (has('vitest')) return 'vitest';
    if (has('mocha')) return 'mocha';
    return null;
  }

  findNearestPackageJson() {
    // Try a few ancestor levels; safe, synchronous, and side-effect free.
    const candidates = [
      path.join(__dirname, '..', '..', 'package.json'),
      path.join(__dirname, '..', '..', '..', 'package.json'),
      path.join(__dirname, '..', '..', '..', '..', 'package.json')
    ];
    for (const candidate of candidates) {
      try {
        if (fs.existsSync(candidate)) {
          const raw = fs.readFileSync(candidate, 'utf8');
          return JSON.parse(raw);
        }
      } catch {
        // ignore and continue
      }
    }
    return null;
  }

  safeSlug(name) {
    return String(name || 'trace').toLowerCase().replace(/[^a-z0-9\-_.]+/g, '-').replace(/-+/g, '-');
  }

  renderJestVitestTest(framework, parsed, topFrame) {
    const runnerImport = framework === 'vitest' ? "import { describe, it, expect } from 'vitest';" : "";
    const header = framework === 'vitest' ? runnerImport : '';
    const common = `
${header}
// Minimal debugging test scaffold generated by debugger-agent
// Adjust imports/paths and flesh out the reproduction.

describe('Debug Repro: ${this.escapeForTemplate(topFrame.file || 'unknown')}:${topFrame.line || '?'}', () => {
  it('should not throw when executing the suspected code path', async () => {
    // TODO: Import the unit under test and create a reproduction
    // Example:
    // const { doThing } = require('<path-to-module>');
    // const result = await doThing(/* inputs that previously caused failure */);
    // expect(result).toBeDefined();
    expect(true).toBe(true);
  });
});
`;
    // For Jest in CommonJS projects, keep it generic without ESM imports
    if (framework === 'jest') {
      return common.replace("import { describe, it, expect } from 'vitest';\n", '');
    }
    return common;
  }

  renderMochaTest(parsed, topFrame) {
    return `
// Minimal debugging test scaffold generated by debugger-agent
// Run with: npx mocha autonomous-evolution-system/tests/debug/*.spec.js
const assert = require('assert');

describe('Debug Repro: ${this.escapeForTemplate(topFrame.file || 'unknown')}:${topFrame.line || '?'}', () => {
  it('should not throw when executing the suspected code path', async () => {
    // TODO: Import the unit under test and create a reproduction
    // Example:
    // const { doThing } = require('<path-to-module>');
    // const result = await doThing(/* inputs that previously caused failure */);
    // assert.ok(result);
    assert.ok(true);
  });
});
`;
  }

  renderStandaloneRepro(parsed, topFrame) {
    return `
// Standalone reproduction script generated by debugger-agent
// Run with: node ${this.safeSlug(path.basename(topFrame.file || 'trace'))}.repro.js
// Exit code 0 = pass; non-zero = failure.
(async function main() {
  try {
    // TODO: Import the unit under test and create a reproduction
    // Example:
    // const { doThing } = require('<path-to-module>');
    // const result = await doThing(/* inputs that previously caused failure */);
    // if (!result) throw new Error('Expected a result');
    console.log('Reproduction placeholder — implement scenario based on stack frame: ${this.escapeForTemplate(topFrame.file || 'unknown')}:${topFrame.line || '?'}');
    process.exit(0);
  } catch (err) {
    console.error('[repro] failure:', err && err.stack || err);
    process.exit(1);
  }
})();
`;
  }

  escapeForTemplate(str) {
    return String(str).replace(/`/g, '\\`');
  }

  /**
   * Parse a stack trace to extract error type, message, and stack frames.
   * @param {string} trace
   */
  parseTrace(trace) {
    const lines = (trace || '').split(/\r?\n/).map(l => l.trim());
    const first = lines.find(l => l.length > 0) || '';
    const typeMatch = first.match(/^([A-Za-z0-9_$]+):\s*(.+)$/);
    const errorType = typeMatch ? typeMatch[1] : (first.split(':')[0] || 'Error');
    const message = typeMatch ? typeMatch[2] : first.replace(/^([A-Za-z0-9_$]+):\s*/, '');

    const frames = lines
      .filter(l => l.startsWith('at '))
      .map(l => {
        const m = l.match(/^at\s+(.*?)\s+\((.*?):(\d+):(\d+)\)$/) || l.match(/^at\s+(.*?):(\d+):(\d+)$/);
        if (!m) {
          return { raw: l };
        }
        if (m.length === 5) {
          return {
            fn: m[1],
            file: m[2],
            line: Number(m[3]),
            column: Number(m[4])
          };
        }
        return {
          fn: null,
          file: m[1],
          line: Number(m[2]),
          column: Number(m[3])
        };
      });

    return {
      rawLines: lines.slice(0, 100),
      errorType,
      message,
      frames
    };
  }

  /**
   * Identify common error patterns from a parsed trace.
   * @param {{errorType:string, message:string, frames:any[]}} parsed
   */
  matchPatterns(parsed) {
    const patterns = [];
    const msg = (parsed.message || '').toLowerCase();

    if (/cannot read (property|properties) '?.+?'? of undefined/.test(msg) || /undefined/.test(msg)) {
      patterns.push({
        id: 'null-undefined-access',
        likelihood: 0.9,
        rationale: 'Message indicates property access on undefined'
      });
    }
    if (/cannot read (property|properties) '?.+?'? of null/.test(msg) || /null/.test(msg)) {
      patterns.push({
        id: 'null-access',
        likelihood: 0.85,
        rationale: 'Message indicates property access on null'
      });
    }
    if (/module not found|cannot find module/.test(msg)) {
      patterns.push({
        id: 'module-resolution-failure',
        likelihood: 0.9,
        rationale: 'Cannot find module indicates path or dependency issue'
      });
    }
    if (/typeerror/.test(parsed.errorType.toLowerCase())) {
      patterns.push({
        id: 'type-error',
        likelihood: 0.7,
        rationale: 'Generic TypeError'
      });
    }
    if (/referenceerror/.test(parsed.errorType.toLowerCase()) || /is not defined/.test(msg)) {
      patterns.push({
        id: 'reference-error',
        likelihood: 0.8,
        rationale: 'Undeclared or out-of-scope identifier'
      });
    }
    if (/syntaxerror/.test(parsed.errorType.toLowerCase())) {
      patterns.push({
        id: 'syntax-error',
        likelihood: 0.95,
        rationale: 'SyntaxError in code'
      });
    }

    // Add frame-based pattern
    const topFrame = parsed.frames.find(f => f && f.file && !String(f.file).includes('node_modules'));
    if (topFrame && /\.tsx?$|\.jsx?$/.test(topFrame.file || '')) {
      patterns.push({
        id: 'application-code-top-frame',
        likelihood: 0.6,
        rationale: `Top frame in ${topFrame.file}:${topFrame.line}`
      });
    }

    return patterns;
  }

  /**
   * Identify lint-derived patterns.
   */
  matchLintPatterns(lints) {
    const patterns = [];
    if (!Array.isArray(lints) || lints.length === 0) return patterns;

    const byRule = lints.reduce((acc, l) => {
      const key = l.ruleId || 'unknown';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    for (const [ruleId, count] of Object.entries(byRule)) {
      patterns.push({
        id: `lint:${ruleId}`,
        occurrences: count,
        likelihood: Math.min(0.95, 0.5 + count * 0.05),
        rationale: `Observed ${count} occurrences for ${ruleId}`
      });
    }
    return patterns;
  }

  /**
   * Map matched patterns to concrete suggestions.
   */
  generateSuggestions(patterns, parsed) {
    const suggestions = [];
    const add = (title, steps, impact = 'medium') => {
      suggestions.push({ title, steps, impact });
    };

    if (patterns.find(p => p.id === 'null-undefined-access' || p.id === 'null-access')) {
      add(
        'Guard against null/undefined before property access',
        [
          'Add nullish checks before accessing properties (e.g., optional chaining or explicit guards).',
          'Validate upstream inputs that may be missing or late.',
          'Add defensive defaults where appropriate.'
        ],
        'high'
      );
    }
    if (patterns.find(p => p.id === 'module-resolution-failure')) {
      add(
        'Fix module resolution',
        [
          'Verify dependency installed and correct version in package.json.',
          'Check import path casing and relative vs absolute path correctness.',
          'Clear build cache and reinstall dependencies.'
        ],
        'high'
      );
    }
    if (patterns.find(p => p.id === 'reference-error')) {
      add(
        'Resolve identifier scope/definition',
        [
          'Define the missing identifier or import it from the correct module.',
          'Check conditional compilation or feature flags that gate definition.',
          'Ensure variable is declared in the scope used.'
        ]
      );
    }
    if (patterns.find(p => p.id === 'syntax-error')) {
      add(
        'Correct syntax error',
        [
          'Open the file/line from the top stack frame.',
          'Fix the syntax issue (unclosed bracket, invalid token, etc.).',
          'Run linter/formatter to catch related issues.'
        ],
        'high'
      );
    }

    // Contextual suggestion for top frame
    const topFrame = parsed.frames.find(f => f && f.file && !String(f.file).includes('node_modules'));
    if (topFrame) {
      add(
        `Inspect top frame ${topFrame.file}:${topFrame.line}`,
        [
          'Open the file at the indicated line and inspect nearby code paths.',
          'Add temporary logging/guards around the failing line.',
          'Reproduce to confirm fix.'
        ],
        'medium'
      );
    }

    return suggestions;
  }

  generateLintSuggestions(patterns, lints) {
    const suggestions = [];
    const add = (title, steps, impact = 'medium') => {
      suggestions.push({ title, steps, impact });
    };

    const has = (prefix) => patterns.some(p => String(p.id || '').startsWith(prefix));
    if (has('lint:no-undef')) {
      add('Fix undefined variables', ['Declare variables or import from correct module.', 'Enable TypeScript types or JSDoc to catch scope issues earlier.']);
    }
    if (has('lint:no-unused-vars')) {
      add('Remove unused variables', ['Delete unused bindings or prefix with underscore if intentional.', 'Confirm tree-shaking and build configuration.'], 'low');
    }
    if (has('lint:@typescript-eslint/no-explicit-any')) {
      add('Eliminate implicit any usage', ['Introduce precise types and avoid leaking any.', 'Use generics or discriminated unions for clarity.']);
    }
    if (lints.length) {
      add('Address top lint errors first', ['Sort by severity and fix high-severity rules.', 'Run lints pre-commit to prevent regressions.'], 'medium');
    }
    return suggestions;
  }

  generateVerificationSteps(patterns, parsed) {
    const steps = [];
    steps.push('Create a minimal reproduction to validate the fix quickly.');
    steps.push('Add a test (or script) that fails before the fix and passes after.');
    if (patterns.some(p => p.id.includes('module'))) {
      steps.push('Run a clean install and rebuild to verify module resolution.');
    }
    steps.push('Re-run lints and type checks to ensure no regressions.');
    return steps;
  }

  generateLintVerificationSteps(patterns, lints) {
    const steps = [];
    steps.push('Run the linter and confirm all targeted rules are resolved.');
    steps.push('Run type checks (if applicable) to ensure consistency.');
    steps.push('Execute affected tests or add targeted tests where missing.');
    return steps;
  }

  estimateConfidence(patterns) {
    if (!patterns || patterns.length === 0) return 0.4;
    const avg = patterns.reduce((s, p) => s + (p.likelihood || 0.6), 0) / patterns.length;
    return Math.max(0.4, Math.min(0.95, avg));
    }

  persistReport(analysis) {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const file = path.join(this.reportsPath, `debugger-report-${timestamp}.json`);
      fs.writeFileSync(file, JSON.stringify(analysis, null, 2));
    } catch {
      // Swallow persist errors; debugging should not fail due to I/O
    }
  }

  /**
   * Get current agent status
   */
  getAgentStatus() {
    return {
      agent: this.agentName,
      version: this.agentVersion,
      status: this.status,
      lastAnalysisKind: this.lastAnalysis ? this.lastAnalysis.input?.kind : null,
      lastConfidence: this.lastAnalysis ? this.lastAnalysis.confidence : null,
      lastStartedAt: this.lastAnalysis ? this.lastAnalysis.startedAt : null
    };
  }
}

module.exports = DebuggerAgent;


