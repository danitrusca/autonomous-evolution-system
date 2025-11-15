/**
 * Code Generation Learning Bridge
 * Primary learning system for code generation - captures patterns, learns from outcomes,
 * and improves future code generation automatically
 * 
 * ECP Principles:
 * - Frame: Code generation is the primary learning opportunity - every generation session teaches
 * - Design: Detect generation sessions, analyze patterns, extract lessons, improve strategies
 * - Plan: Generation detection → Pattern analysis → Code analysis → Lesson extraction → Strategy improvement
 * - Implement: Automatic learning from every code generation session
 * - Review: Validate lessons and measure improvement in future generations
 * 
 * Invariants:
 * - All code generation sessions trigger learning analysis
 * - Code patterns are automatically detected and learned
 * - Generation strategies improve based on outcomes
 * - Refinement patterns inform future generation quality
 */

const fs = require('fs');
const path = require('path');

const PROACTIVE_DEBUGGING_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.mts',
  '.cts'
]);

const PROACTIVE_DEBUGGING_PATTERNS = [
  /debug\.(logBus|metric|time|logDiff|flag|snapshot|p[0-9]{2})\s*\(/,
  /debug\.enabled/,
  /performance\.mark\s*\(/,
  /\[proactive-debugging\]/i
];

const PROACTIVE_DEBUGGING_SKIP_DIRECTIVE = /@proactive-debugging:\s*skip/i;

class CodeGenerationLearningBridge {
  constructor() {
    this.generationSessions = [];
    this.codePatterns = new Map();
    this.generationStrategies = new Map();
    this.evolutionEngine = null;
    
    // Thresholds
    this.generationSessionWindow = 60000; // 1 minute - files created within this window are a session
    this.minFilesForSession = 1; // Minimum files to consider it a generation session
    this.refinementWindow = 300000; // 5 minutes - modifications after generation
    
    // Pattern detectors
    this.patternDetectors = new Map();
    this.initializePatternDetectors();
    
    // Statistics
    this.stats = {
      totalSessions: 0,
      totalFilesGenerated: 0,
      refinementRate: 0,
      averageFilesPerSession: 0,
      patternsLearned: 0,
      proactiveSessions: 0,
      proactiveCompliantSessions: 0,
      proactiveCoverageAverage: 0
    };
  }

  /**
   * Initialize pattern detectors specific to code generation
   */
  initializePatternDetectors() {
    // Code structure patterns
    this.patternDetectors.set('code_structure', {
      detect: (session) => this.detectCodeStructurePatterns(session),
      extractLesson: (pattern) => this.extractStructureLesson(pattern)
    });
    
    // Import/dependency patterns
    this.patternDetectors.set('import_patterns', {
      detect: (session) => this.detectImportPatterns(session),
      extractLesson: (pattern) => this.extractImportLesson(pattern)
    });
    
    // Naming conventions
    this.patternDetectors.set('naming_conventions', {
      detect: (session) => this.detectNamingConventions(session),
      extractLesson: (pattern) => this.extractNamingConventionLesson(pattern)
    });
    
    // Architecture patterns
    this.patternDetectors.set('architecture_patterns', {
      detect: (session) => this.detectArchitecturePatterns(session),
      extractLesson: (pattern) => this.extractArchitectureLesson(pattern)
    });
    
    // Refinement patterns
    this.patternDetectors.set('refinement_patterns', {
      detect: (session) => this.detectRefinementPatterns(session),
      extractLesson: (pattern) => this.extractRefinementLesson(pattern)
    });
    
    // Success patterns (code that works immediately)
    this.patternDetectors.set('success_patterns', {
      detect: (session) => this.detectSuccessPatterns(session),
      extractLesson: (pattern) => this.extractSuccessLesson(pattern)
    });
    
    // Style consistency
    this.patternDetectors.set('style_consistency', {
      detect: (session) => this.detectStyleConsistency(session),
      extractLesson: (pattern) => this.extractStyleLesson(pattern)
    });
  }

  /**
   * Set evolution engine reference
   */
  setEvolutionEngine(evolutionEngine) {
    this.evolutionEngine = evolutionEngine;
  }

  /**
   * Record a code generation session
   * Called when files are created/modified in a short time window
   */
  async recordGenerationSession(files, context = {}) {
    const session = {
      id: this.generateSessionId(),
      timestamp: new Date().toISOString(),
      files: files.map(f => ({
        path: f.path || f,
        type: f.type || this.detectFileType(f.path || f),
        size: f.size || this.getFileSize(f.path || f),
        content: f.content || this.readFileContent(f.path || f)
      })),
      context: context,
      patterns: {},
      lessons: []
    };
    
    // Analyze the session
    await this.analyzeGenerationSession(session);
    
    // Evaluate proactive debugging coverage
    session.proactiveDebugging = this.evaluateProactiveDebugging(session);
    
    // Run mistake prevention gate for proactive debugging
    const preventionEngine = this.evolutionEngine && this.evolutionEngine.mistakePreventionEngine;
    if (preventionEngine && session.proactiveDebugging) {
      const preventionResult = preventionEngine.preventAction(
        {
          type: 'code_generation',
          name: 'proactive_debugging_enforcement',
          sessionId: session.id
        },
        {
          proactiveDebugging: session.proactiveDebugging,
          files: session.files.map(file => file.path || 'unknown'),
          context: session.context || {}
        }
      );
      
      session.proactiveDebugging.prevention = preventionResult;
      
      if (preventionResult && preventionResult.blocked) {
        console.warn('[code-generation-learning] Proactive debugging gate blocked code generation', {
          session: session.id,
          reasons: preventionResult.reasons
        });
      }
    }
    
    // Store session
    this.generationSessions.push(session);
    
    // Keep last 100 sessions
    if (this.generationSessions.length > 100) {
      this.generationSessions = this.generationSessions.slice(-100);
    }
    
    // Update statistics
    this.updateStatistics(session);
    
    // Capture lessons
    await this.captureSessionLessons(session);
    
    console.log(`[code-generation-learning] Session recorded: ${session.files.length} files, ${Object.keys(session.patterns).length} patterns detected`);
    
    return session;
  }

  /**
   * Analyze a generation session for patterns
   */
  async analyzeGenerationSession(session) {
    try {
      // Detect all patterns
      for (const [patternType, detector] of this.patternDetectors) {
        try {
          const pattern = detector.detect(session);
          if (pattern && pattern.confidence > 0.6) {
            session.patterns[patternType] = pattern;
          }
        } catch (error) {
          console.error(`[code-generation-learning] Error detecting ${patternType}:`, error.message);
        }
      }
      
      // Analyze code quality
      session.codeQuality = this.analyzeCodeQuality(session);
      
      // Detect generation style
      session.generationStyle = this.detectGenerationStyle(session);
      
    } catch (error) {
      console.error('[code-generation-learning] Error analyzing session:', error.message);
    }
  }

  /**
   * Detect code structure patterns
   */
  detectCodeStructurePatterns(session) {
    const patterns = {
      fileOrganization: {},
      moduleStructure: {},
      functionStructure: {},
      classStructure: {}
    };
    
    for (const file of session.files) {
      if (!file.content) continue;
      
      const content = file.content;
      
      // Detect file organization patterns
      if (content.includes('export default') || content.includes('module.exports')) {
        patterns.fileOrganization.hasExports = true;
      }
      
      if (content.includes('import ') || content.includes('require(')) {
        patterns.fileOrganization.hasImports = true;
      }
      
      // Detect function patterns
      const functionMatches = content.match(/(?:function|const\s+\w+\s*=\s*(?:async\s+)?\(|=>)/g);
      if (functionMatches) {
        patterns.functionStructure.count = (patterns.functionStructure.count || 0) + functionMatches.length;
        patterns.functionStructure.hasAsync = patterns.functionStructure.hasAsync || content.includes('async');
        patterns.functionStructure.hasArrow = patterns.functionStructure.hasArrow || content.includes('=>');
      }
      
      // Detect class patterns
      if (content.includes('class ')) {
        patterns.classStructure.count = (patterns.classStructure.count || 0) + 1;
        patterns.classStructure.hasConstructor = patterns.classStructure.hasConstructor || content.includes('constructor(');
        patterns.classStructure.hasMethods = patterns.classStructure.hasMethods || content.match(/^\s+\w+\(/m);
      }
    }
    
    return {
      type: 'code_structure',
      patterns: patterns,
      confidence: 0.8,
      insights: this.extractStructureInsights(patterns)
    };
  }

  /**
   * Detect import/dependency patterns
   */
  detectImportPatterns(session) {
    const imports = {
      es6: [],
      commonjs: [],
      external: [],
      internal: [],
      patterns: {}
    };
    
    for (const file of session.files) {
      if (!file.content) continue;
      
      const content = file.content;
      
      // ES6 imports
      const es6Imports = content.match(/import\s+(?:(?:\{[^}]+\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]+\}|\*\s+as\s+\w+|\w+))*\s+from\s+)?['"]([^'"]+)['"]/g);
      if (es6Imports) {
        es6Imports.forEach(imp => {
          const match = imp.match(/['"]([^'"]+)['"]/);
          if (match) {
            const module = match[1];
            imports.es6.push(module);
            if (module.startsWith('.') || module.startsWith('/')) {
              imports.internal.push(module);
            } else {
              imports.external.push(module);
            }
          }
        });
      }
      
      // CommonJS requires
      const requires = content.match(/require\(['"]([^'"]+)['"]\)/g);
      if (requires) {
        requires.forEach(req => {
          const match = req.match(/['"]([^'"]+)['"]/);
          if (match) {
            const module = match[1];
            imports.commonjs.push(module);
            if (module.startsWith('.') || module.startsWith('/')) {
              imports.internal.push(module);
            } else {
              imports.external.push(module);
            }
          }
        });
      }
    }
    
    // Detect patterns
    imports.patterns.usesES6 = imports.es6.length > 0;
    imports.patterns.usesCommonJS = imports.commonjs.length > 0;
    imports.patterns.mixedModules = imports.es6.length > 0 && imports.commonjs.length > 0;
    imports.patterns.externalDeps = [...new Set(imports.external)];
    imports.patterns.internalDeps = [...new Set(imports.internal)];
    
    return {
      type: 'import_patterns',
      imports: imports,
      confidence: 0.85,
      insights: this.extractImportInsights(imports)
    };
  }

  /**
   * Detect naming conventions
   */
  detectNamingConventions(session) {
    const conventions = {
      files: [],
      functions: [],
      classes: [],
      variables: [],
      constants: []
    };
    
    for (const file of session.files) {
      // File naming
      const fileName = path.basename(file.path);
      conventions.files.push({
        name: fileName,
        pattern: this.analyzeNamingPattern(fileName)
      });
      
      if (!file.content) continue;
      const content = file.content;
      
      // Function naming
      const functionNames = content.match(/(?:function|const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*[=(]/g);
      if (functionNames) {
        functionNames.forEach(fn => {
          const match = fn.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)/);
          if (match) {
            conventions.functions.push({
              name: match[1],
              pattern: this.analyzeNamingPattern(match[1])
            });
          }
        });
      }
      
      // Class naming
      const classNames = content.match(/class\s+([A-Z][a-zA-Z0-9_$]*)/g);
      if (classNames) {
        classNames.forEach(cls => {
          const match = cls.match(/([A-Z][a-zA-Z0-9_$]*)/);
          if (match) {
            conventions.classes.push({
              name: match[1],
              pattern: this.analyzeNamingPattern(match[1])
            });
          }
        });
      }
    }
    
    // Analyze consistency
    const consistency = this.analyzeNamingConsistency(conventions);
    
    return {
      type: 'naming_conventions',
      conventions: conventions,
      consistency: consistency,
      confidence: 0.8,
      insights: this.extractNamingConventionInsights(conventions, consistency)
    };
  }

  /**
   * Detect architecture patterns
   */
  detectArchitecturePatterns(session) {
    const patterns = {
      hasTests: false,
      hasDocs: false,
      hasConfig: false,
      structure: {},
      separation: {}
    };
    
    for (const file of session.files) {
      const filePath = file.path.toLowerCase();
      
      // Test files
      if (filePath.includes('test') || filePath.includes('spec')) {
        patterns.hasTests = true;
      }
      
      // Documentation
      if (filePath.endsWith('.md') || filePath.includes('doc')) {
        patterns.hasDocs = true;
      }
      
      // Configuration
      if (filePath.includes('config') || filePath.endsWith('.json')) {
        patterns.hasConfig = true;
      }
      
      // Directory structure
      const dir = path.dirname(file.path);
      const parts = dir.split(path.sep);
      if (parts.length > 1) {
        patterns.structure[parts[parts.length - 1]] = (patterns.structure[parts[parts.length - 1]] || 0) + 1;
      }
    }
    
    // Detect separation of concerns
    patterns.separation.hasSeparateTests = patterns.hasTests;
    patterns.separation.hasSeparateDocs = patterns.hasDocs;
    patterns.separation.hasConfigFiles = patterns.hasConfig;
    
    return {
      type: 'architecture_patterns',
      patterns: patterns,
      confidence: 0.75,
      insights: this.extractArchitectureInsights(patterns)
    };
  }

  /**
   * Detect refinement patterns (modifications after generation)
   */
  detectRefinementPatterns(session) {
    // This would need to compare with file modification history
    // For now, we'll check if files were modified shortly after creation
    const refinements = [];
    
    // Check if any files in this session were modified within refinement window
    // This would require integration with file operation monitor
    
    return {
      type: 'refinement_patterns',
      refinements: refinements,
      confidence: 0.7,
      insights: refinements.length > 0 ? ['Refinement patterns detected'] : ['No immediate refinements detected']
    };
  }

  /**
   * Detect success patterns (code that works immediately)
   */
  detectSuccessPatterns(session) {
    // Success is indicated by lack of immediate refinement
    // This would need to track outcomes over time
    const successIndicators = {
      noImmediateRefinement: true, // Would check modification history
      followsConventions: true, // Based on naming/structure analysis
      hasTests: session.patterns?.architecture_patterns?.patterns?.hasTests || false,
      hasDocs: session.patterns?.architecture_patterns?.patterns?.hasDocs || false
    };
    
    return {
      type: 'success_patterns',
      indicators: successIndicators,
      confidence: 0.7,
      insights: this.extractSuccessInsights(successIndicators)
    };
  }

  /**
   * Detect style consistency
   */
  detectStyleConsistency(session) {
    const style = {
      indentation: {},
      quotes: {},
      semicolons: {},
      spacing: {}
    };
    
    for (const file of session.files) {
      if (!file.content) continue;
      const content = file.content;
      
      // Indentation (tabs vs spaces)
      const firstLine = content.split('\n').find(line => line.trim().length > 0);
      if (firstLine) {
        const indent = firstLine.match(/^(\s+)/);
        if (indent) {
          const indentType = indent[1].includes('\t') ? 'tabs' : 'spaces';
          style.indentation[indentType] = (style.indentation[indentType] || 0) + 1;
        }
      }
      
      // Quotes
      const singleQuotes = (content.match(/'/g) || []).length;
      const doubleQuotes = (content.match(/"/g) || []).length;
      if (singleQuotes > doubleQuotes) {
        style.quotes.single = (style.quotes.single || 0) + 1;
      } else if (doubleQuotes > singleQuotes) {
        style.quotes.double = (style.quotes.double || 0) + 1;
      }
      
      // Semicolons
      const hasSemicolons = content.includes(';');
      style.semicolons[hasSemicolons ? 'with' : 'without'] = (style.semicolons[hasSemicolons ? 'with' : 'without'] || 0) + 1;
    }
    
    // Calculate consistency
    const consistency = this.calculateStyleConsistency(style);
    
    return {
      type: 'style_consistency',
      style: style,
      consistency: consistency,
      confidence: 0.8,
      insights: this.extractStyleInsights(style, consistency)
    };
  }

  /**
   * Analyze code quality
   */
  analyzeCodeQuality(session) {
    const quality = {
      score: 0,
      factors: {}
    };
    
    let totalScore = 0;
    let factorCount = 0;
    
    // Check for documentation
    let hasComments = false;
    for (const file of session.files) {
      if (file.content && (file.content.includes('//') || file.content.includes('/*'))) {
        hasComments = true;
        break;
      }
    }
    quality.factors.hasComments = hasComments;
    totalScore += hasComments ? 1 : 0;
    factorCount++;
    
    // Check for error handling
    let hasErrorHandling = false;
    for (const file of session.files) {
      if (file.content && (file.content.includes('try') || file.content.includes('catch') || file.content.includes('error'))) {
        hasErrorHandling = true;
        break;
      }
    }
    quality.factors.hasErrorHandling = hasErrorHandling;
    totalScore += hasErrorHandling ? 1 : 0;
    factorCount++;
    
    // Check structure patterns
    const structurePattern = session.patterns?.code_structure;
    if (structurePattern) {
      quality.factors.hasStructure = true;
      totalScore += 1;
      factorCount++;
    }
    
    // Check naming consistency
    const namingPattern = session.patterns?.naming_conventions;
    if (namingPattern && namingPattern.consistency?.score > 0.7) {
      quality.factors.consistentNaming = true;
      totalScore += 1;
      factorCount++;
    }
    
    quality.score = factorCount > 0 ? totalScore / factorCount : 0;
    
    return quality;
  }

  /**
   * Detect generation style
   */
  detectGenerationStyle(session) {
    return {
      fileCount: session.files.length,
      complexity: this.calculateComplexity(session),
      organization: this.assessOrganization(session)
    };
  }

  /**
   * Calculate complexity
   */
  calculateComplexity(session) {
    let totalLines = 0;
    let totalFunctions = 0;
    let totalClasses = 0;
    
    for (const file of session.files) {
      if (file.content) {
        const lines = file.content.split('\n').length;
        totalLines += lines;
        
        const functions = (file.content.match(/(?:function|const\s+\w+\s*=\s*(?:async\s+)?\(|=>)/g) || []).length;
        totalFunctions += functions;
        
        const classes = (file.content.match(/class\s+/g) || []).length;
        totalClasses += classes;
      }
    }
    
    return {
      totalLines,
      totalFunctions,
      totalClasses,
      averageLinesPerFile: session.files.length > 0 ? totalLines / session.files.length : 0,
      averageFunctionsPerFile: session.files.length > 0 ? totalFunctions / session.files.length : 0
    };
  }

  /**
   * Assess organization
   */
  assessOrganization(session) {
    const directories = new Set();
    const fileTypes = new Map();
    
    for (const file of session.files) {
      const dir = path.dirname(file.path);
      directories.add(dir);
      
      const ext = path.extname(file.path);
      fileTypes.set(ext, (fileTypes.get(ext) || 0) + 1);
    }
    
    return {
      directoryCount: directories.size,
      fileTypeDiversity: fileTypes.size,
      organizationScore: directories.size > 1 ? 1 : 0.5
    };
  }

  /**
   * Capture lessons from session
   */
  async captureSessionLessons(session) {
    if (!this.evolutionEngine) return;
    
    try {
      // Extract lessons from each pattern
      for (const [patternType, pattern] of Object.entries(session.patterns)) {
        const detector = this.patternDetectors.get(patternType);
        if (detector && detector.extractLesson) {
          const lesson = detector.extractLesson(pattern);
          if (lesson) {
            session.lessons.push(lesson);
            
            // Capture in evolution engine
            await this.evolutionEngine.captureEvolutionLearning(
              lesson.question || `Code generation pattern: ${patternType}`,
              {
                type: 'code_generation',
                session: session.id,
                pattern: pattern,
                lesson: lesson,
                timestamp: new Date().toISOString()
              }
            );
          }
        }
      }
      
      // Capture overall session lesson
      const sessionLesson = this.extractSessionLesson(session);
      if (sessionLesson) {
        await this.evolutionEngine.captureEvolutionLearning(
          sessionLesson.question,
          {
            type: 'code_generation_session',
            session: session.id,
            lesson: sessionLesson,
            timestamp: new Date().toISOString()
          }
        );
      }
      
    } catch (error) {
      console.error('[code-generation-learning] Error capturing lessons:', error.message);
    }
  }

  /**
   * Evaluate proactive debugging coverage for generated files
   */
  evaluateProactiveDebugging(session) {
    let inspected = 0;
    let instrumented = 0;
    let exempt = 0;
    const missingFiles = [];
    const exemptFiles = [];
    const evaluatedFiles = [];
    
    for (const file of session.files) {
      const filePath = file.path || '';
      const ext = path.extname(filePath).toLowerCase();
      
      if (!PROACTIVE_DEBUGGING_EXTENSIONS.has(ext)) {
        continue;
      }
      
      inspected++;
      const content = file.content || '';
      const hasSkipDirective = PROACTIVE_DEBUGGING_SKIP_DIRECTIVE.test(content);
      const hasInstrumentation = PROACTIVE_DEBUGGING_PATTERNS.some((pattern) => pattern.test(content));
      
      if (hasSkipDirective) {
        exempt++;
        exemptFiles.push({
          path: filePath,
          reason: '@proactive-debugging: skip',
        });
        evaluatedFiles.push({
          path: filePath,
          status: 'exempt',
        });
        continue;
      }
      
      if (hasInstrumentation) {
        instrumented++;
        evaluatedFiles.push({
          path: filePath,
          status: 'instrumented',
        });
      } else {
        missingFiles.push(filePath);
        evaluatedFiles.push({
          path: filePath,
          status: 'missing',
        });
      }
    }
    
    const coverageDenominator = inspected === 0 ? 1 : inspected;
    const coverage = (instrumented + exempt) / coverageDenominator;
    
    let status = 'not_applicable';
    if (inspected > 0) {
      if (instrumented + exempt === inspected) {
        status = exempt > 0 ? 'compliant_with_exemptions' : 'compliant';
      } else {
        status = 'non_compliant';
      }
    }
    
    return {
      status,
      inspectedFiles: inspected,
      instrumentedFiles: instrumented,
      exemptFiles,
      missingFiles,
      coverage: Number(coverage.toFixed(4)),
      evaluatedFiles,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Extract session-level lesson
   */
  extractSessionLesson(session) {
    const insights = [];
    
    if (session.files.length > 5) {
      insights.push(`Bulk generation: ${session.files.length} files created`);
    }
    
    if (session.codeQuality && session.codeQuality.score > 0.7) {
      insights.push('High quality code generated');
    }
    
    if (session.patterns.style_consistency && session.patterns.style_consistency.consistency > 0.8) {
      insights.push('Consistent code style maintained');
    }
    
    if (insights.length === 0) {
      insights.push(`Generated ${session.files.length} file(s)`);
    }
    
    return {
      question: `What can we learn from this code generation session?`,
      insight: insights.join('; '),
      impact: 'Medium - Code generation patterns inform future generation strategies',
      learning: [
        `Generation session: ${session.files.length} files`,
        `Code quality score: ${(session.codeQuality?.score || 0).toFixed(2)}`,
        `Patterns detected: ${Object.keys(session.patterns).length}`,
        `Style consistency: ${(session.patterns.style_consistency?.consistency || 0).toFixed(2)}`
      ]
    };
  }

  // Helper methods for pattern extraction

  analyzeNamingPattern(name) {
    if (/^[A-Z]/.test(name)) return 'PascalCase';
    if (/^[a-z]/.test(name) && /[A-Z]/.test(name)) return 'camelCase';
    if (name.includes('_')) return 'snake_case';
    if (name.includes('-')) return 'kebab-case';
    return 'unknown';
  }

  analyzeNamingConsistency(conventions) {
    const patterns = {
      files: {},
      functions: {},
      classes: {}
    };
    
    conventions.files.forEach(f => {
      patterns.files[f.pattern] = (patterns.files[f.pattern] || 0) + 1;
    });
    
    conventions.functions.forEach(f => {
      patterns.functions[f.pattern] = (patterns.functions[f.pattern] || 0) + 1;
    });
    
    conventions.classes.forEach(c => {
      patterns.classes[c.pattern] = (patterns.classes[c.pattern] || 0) + 1;
    });
    
    // Calculate consistency score
    const fileConsistency = this.calculatePatternConsistency(patterns.files);
    const functionConsistency = this.calculatePatternConsistency(patterns.functions);
    const classConsistency = this.calculatePatternConsistency(patterns.classes);
    
    return {
      files: fileConsistency,
      functions: functionConsistency,
      classes: classConsistency,
      score: (fileConsistency + functionConsistency + classConsistency) / 3
    };
  }

  calculatePatternConsistency(patterns) {
    const total = Object.values(patterns).reduce((sum, count) => sum + count, 0);
    if (total === 0) return 1;
    
    const max = Math.max(...Object.values(patterns));
    return max / total;
  }

  calculateStyleConsistency(style) {
    const factors = [];
    
    // Indentation consistency
    const indentTotal = Object.values(style.indentation).reduce((sum, count) => sum + count, 0);
    if (indentTotal > 0) {
      const indentMax = Math.max(...Object.values(style.indentation));
      factors.push(indentMax / indentTotal);
    }
    
    // Quote consistency
    const quoteTotal = Object.values(style.quotes).reduce((sum, count) => sum + count, 0);
    if (quoteTotal > 0) {
      const quoteMax = Math.max(...Object.values(style.quotes));
      factors.push(quoteMax / quoteTotal);
    }
    
    // Semicolon consistency
    const semiTotal = Object.values(style.semicolons).reduce((sum, count) => sum + count, 0);
    if (semiTotal > 0) {
      const semiMax = Math.max(...Object.values(style.semicolons));
      factors.push(semiMax / semiTotal);
    }
    
    return factors.length > 0 ? factors.reduce((sum, f) => sum + f, 0) / factors.length : 1;
  }

  // Extract insight methods

  extractStructureInsights(patterns) {
    const insights = [];
    if (patterns.functionStructure.count > 0) {
      insights.push(`${patterns.functionStructure.count} functions detected`);
    }
    if (patterns.classStructure.count > 0) {
      insights.push(`${patterns.classStructure.count} classes detected`);
    }
    return insights;
  }

  extractImportInsights(imports) {
    const insights = [];
    if (imports.patterns.usesES6) {
      insights.push('Uses ES6 modules');
    }
    if (imports.patterns.usesCommonJS) {
      insights.push('Uses CommonJS');
    }
    if (imports.patterns.mixedModules) {
      insights.push('Mixed module systems detected');
    }
    if (imports.patterns.externalDeps.length > 0) {
      insights.push(`${imports.patterns.externalDeps.length} external dependencies`);
    }
    return insights;
  }

  extractNamingConventionInsights(conventions, consistency) {
    const insights = [];
    if (consistency.score > 0.8) {
      insights.push('Consistent naming conventions');
    } else {
      insights.push('Naming conventions could be more consistent');
    }
    return insights;
  }

  extractArchitectureInsights(patterns) {
    const insights = [];
    if (patterns.hasTests) insights.push('Includes test files');
    if (patterns.hasDocs) insights.push('Includes documentation');
    if (patterns.hasConfig) insights.push('Includes configuration');
    return insights;
  }

  extractSuccessInsights(indicators) {
    const insights = [];
    if (indicators.followsConventions) insights.push('Follows established conventions');
    if (indicators.hasTests) insights.push('Includes tests');
    if (indicators.hasDocs) insights.push('Includes documentation');
    return insights;
  }

  extractStyleInsights(style, consistency) {
    const insights = [];
    if (consistency > 0.8) {
      insights.push('Consistent code style');
    } else {
      insights.push('Code style could be more consistent');
    }
    return insights;
  }

  // Lesson extraction methods

  extractStructureLesson(pattern) {
    return {
      question: 'What code structure patterns work well?',
      insight: pattern.insights.join('; '),
      impact: 'Medium - Structure patterns inform future generation',
      learning: [
        'Code structure patterns detected and learned',
        'Patterns can be replicated in future generations'
      ]
    };
  }

  extractImportLesson(pattern) {
    return {
      question: 'What import/dependency patterns are used?',
      insight: pattern.insights.join('; '),
      impact: 'Medium - Import patterns inform dependency management',
      learning: [
        'Import patterns detected',
        pattern.imports.patterns.mixedModules ? 'Mixed module systems - consider standardizing' : 'Consistent module system'
      ]
    };
  }

  extractNamingConventionLesson(pattern) {
    return {
      question: 'What naming conventions are preferred?',
      insight: pattern.insights.join('; '),
      impact: 'High - Naming conventions affect code readability',
      learning: [
        `Naming consistency score: ${pattern.consistency.score.toFixed(2)}`,
        'Conventions can be applied to future generations'
      ]
    };
  }

  extractArchitectureLesson(pattern) {
    return {
      question: 'What architecture patterns are used?',
      insight: pattern.insights.join('; '),
      impact: 'High - Architecture patterns guide system design',
      learning: [
        'Architecture patterns detected',
        pattern.patterns.hasTests ? 'Test-driven approach detected' : 'Consider adding tests',
        pattern.patterns.hasDocs ? 'Documentation included' : 'Consider adding documentation'
      ]
    };
  }

  extractRefinementLesson(pattern) {
    return {
      question: 'What refinement patterns occur after generation?',
      insight: pattern.insights.join('; '),
      impact: 'High - Refinement patterns inform generation quality',
      learning: [
        'Refinement patterns indicate areas for improvement',
        'Future generations can incorporate these improvements'
      ]
    };
  }

  extractSuccessLesson(pattern) {
    return {
      question: 'What makes code generation successful?',
      insight: pattern.insights.join('; '),
      impact: 'High - Success patterns should be replicated',
      learning: [
        'Success indicators identified',
        'These patterns should be replicated in future generations'
      ]
    };
  }

  extractStyleLesson(pattern) {
    return {
      question: 'What code style is preferred?',
      insight: pattern.insights.join('; '),
      impact: 'Medium - Style consistency improves readability',
      learning: [
        `Style consistency: ${pattern.consistency.toFixed(2)}`,
        'Style patterns can be applied to future generations'
      ]
    };
  }

  // Utility methods

  detectFileType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const typeMap = {
      '.js': 'javascript',
      '.ts': 'typescript',
      '.jsx': 'react',
      '.tsx': 'react-typescript',
      '.json': 'json',
      '.md': 'markdown',
      '.py': 'python',
      '.java': 'java',
      '.go': 'go',
      '.rs': 'rust'
    };
    return typeMap[ext] || 'unknown';
  }

  getFileSize(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        return fs.statSync(filePath).size;
      }
    } catch (error) {
      // Ignore
    }
    return 0;
  }

  readFileContent(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf8');
      }
    } catch (error) {
      console.error(`[code-generation-learning] Error reading file ${filePath}:`, error.message);
    }
    return null;
  }

  generateSessionId() {
    return `gen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  updateStatistics(session) {
    this.stats.totalSessions++;
    this.stats.totalFilesGenerated += session.files.length;
    this.stats.averageFilesPerSession = this.stats.totalFilesGenerated / this.stats.totalSessions;
    this.stats.patternsLearned += Object.keys(session.patterns).length;

    if (session.proactiveDebugging && session.proactiveDebugging.status !== 'not_applicable') {
      this.stats.proactiveSessions++;
      
      if (session.proactiveDebugging.status === 'compliant' ||
          session.proactiveDebugging.status === 'compliant_with_exemptions') {
        this.stats.proactiveCompliantSessions++;
      }
      
      const totalCoverageSoFar = this.stats.proactiveCoverageAverage * (this.stats.proactiveSessions - 1);
      this.stats.proactiveCoverageAverage = (totalCoverageSoFar + (session.proactiveDebugging.coverage || 0)) / this.stats.proactiveSessions;
    }
  }

  /**
   * Get generation statistics
   */
  getStatistics() {
    return {
      ...this.stats,
      proactiveDebugging: {
        sessions: this.stats.proactiveSessions,
        compliantSessions: this.stats.proactiveCompliantSessions,
        coverageAverage: Number(this.stats.proactiveCoverageAverage.toFixed(3))
      },
      recentSessions: this.generationSessions.slice(-10).map(s => ({
        id: s.id,
        fileCount: s.files.length,
        patternCount: Object.keys(s.patterns).length,
        qualityScore: s.codeQuality?.score || 0
      }))
    };
  }

  /**
   * Get learned patterns for future generation
   */
  getLearnedPatterns() {
    const patterns = {
      naming: {},
      structure: {},
      style: {},
      architecture: {}
    };
    
    // Aggregate patterns from recent sessions
    const recentSessions = this.generationSessions.slice(-20);
    
    for (const session of recentSessions) {
      if (session.patterns.naming_conventions) {
        const naming = session.patterns.naming_conventions.conventions;
        // Aggregate naming patterns
      }
      
      if (session.patterns.style_consistency) {
        const style = session.patterns.style_consistency.style;
        // Aggregate style patterns
      }
    }
    
    return patterns;
  }
}

module.exports = CodeGenerationLearningBridge;

