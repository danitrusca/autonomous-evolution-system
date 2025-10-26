/**
 * System Integrity Agent
 * 
 * Monitors the autonomous evolution system for:
 * - Complexity creep detection
 * - System optimization opportunities
 * - Architectural debt identification
 * - Performance bottlenecks
 * - Code quality degradation
 * 
 * Follows ECP principles for autonomous system monitoring
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class SystemIntegrityAgent {
  constructor() {
    this.agentName = 'SystemIntegrityAgent';
    this.monitoringPath = path.join(__dirname, '..', 'monitoring');
    this.reportsPath = path.join(__dirname, '..', 'reports');
    this.complexityThresholds = {
      maxFileSize: 500, // lines
      maxFunctionLength: 50, // lines
      maxCyclomaticComplexity: 10,
      maxDependencies: 15,
      maxNestingDepth: 4
    };
    this.optimizationPatterns = [
      'duplicate_code',
      'unused_imports',
      'long_parameter_lists',
      'large_classes',
      'deep_inheritance',
      'circular_dependencies',
      'performance_anti_patterns'
    ];
    this.monitoringHistory = [];
    this.initializePaths();
  }

  initializePaths() {
    // Ensure monitoring and reports directories exist
    [this.monitoringPath, this.reportsPath].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  /**
   * Main monitoring method - scans entire system for integrity issues
   */
  async performSystemScan() {
    console.log('[system-integrity] Starting comprehensive system scan...');
    
    const scanResults = {
      timestamp: new Date().toISOString(),
      complexity_issues: await this.detectComplexityCreep(),
      optimization_opportunities: await this.scanForOptimizations(),
      architectural_debt: await this.identifyArchitecturalDebt(),
      performance_bottlenecks: await this.detectPerformanceBottlenecks(),
      code_quality_issues: await this.analyzeCodeQuality(),
      recommendations: []
    };

    // Generate actionable recommendations
    scanResults.recommendations = await this.generateRecommendations(scanResults);
    
    // Store monitoring history
    this.monitoringHistory.push(scanResults);
    await this.saveMonitoringData(scanResults);
    
    console.log(`[system-integrity] Scan complete. Found ${scanResults.complexity_issues.length} complexity issues, ${scanResults.optimization_opportunities.length} optimization opportunities.`);
    
    return scanResults;
  }

  /**
   * Detect complexity creep across the system
   */
  async detectComplexityCreep() {
    console.log('[system-integrity] Detecting complexity creep...');
    
    const complexityIssues = [];
    const files = await this.getAllCodeFiles();
    
    for (const file of files) {
      const analysis = await this.analyzeFileComplexity(file);
      if (analysis.issues.length > 0) {
        complexityIssues.push({
          file: file,
          issues: analysis.issues,
          metrics: analysis.metrics,
          severity: this.calculateSeverity(analysis.issues)
        });
      }
    }
    
    return complexityIssues;
  }

  /**
   * Scan for system optimization opportunities
   */
  async scanForOptimizations() {
    console.log('[system-integrity] Scanning for optimization opportunities...');
    
    const optimizations = [];
    const files = await this.getAllCodeFiles();
    
    for (const file of files) {
      const fileOptimizations = await this.analyzeFileForOptimizations(file);
      if (fileOptimizations.length > 0) {
        optimizations.push({
          file: file,
          optimizations: fileOptimizations
        });
      }
    }
    
    return optimizations;
  }

  /**
   * Identify architectural debt
   */
  async identifyArchitecturalDebt() {
    console.log('[system-integrity] Identifying architectural debt...');
    
    const debtIssues = [];
    
    // Check for circular dependencies
    const circularDeps = await this.detectCircularDependencies();
    if (circularDeps.length > 0) {
      debtIssues.push({
        type: 'circular_dependencies',
        description: 'Circular dependency chains detected',
        files: circularDeps,
        severity: 'high'
      });
    }
    
    // Check for violation of separation of concerns
    const concernViolations = await this.detectConcernViolations();
    if (concernViolations.length > 0) {
      debtIssues.push({
        type: 'separation_of_concerns',
        description: 'Files mixing multiple concerns detected',
        files: concernViolations,
        severity: 'medium'
      });
    }
    
    // Check for missing abstractions
    const missingAbstractions = await this.detectMissingAbstractions();
    if (missingAbstractions.length > 0) {
      debtIssues.push({
        type: 'missing_abstractions',
        description: 'Repeated patterns that could be abstracted',
        patterns: missingAbstractions,
        severity: 'medium'
      });
    }
    
    return debtIssues;
  }

  /**
   * Detect performance bottlenecks
   */
  async detectPerformanceBottlenecks() {
    console.log('[system-integrity] Detecting performance bottlenecks...');
    
    const bottlenecks = [];
    const files = await this.getAllCodeFiles();
    
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      
      // Check for synchronous file operations
      if (content.includes('fs.readFileSync') || content.includes('fs.writeFileSync')) {
        bottlenecks.push({
          file: file,
          type: 'synchronous_io',
          description: 'Synchronous file operations detected',
          severity: 'medium',
          recommendation: 'Consider using async/await with fs.promises'
        });
      }
      
      // Check for blocking operations
      if (content.includes('execSync') || content.includes('spawnSync')) {
        bottlenecks.push({
          file: file,
          type: 'blocking_operations',
          description: 'Blocking operations detected',
          severity: 'high',
          recommendation: 'Consider using async alternatives'
        });
      }
      
      // Check for inefficient loops
      const inefficientLoops = this.detectInefficientLoops(content);
      if (inefficientLoops.length > 0) {
        bottlenecks.push({
          file: file,
          type: 'inefficient_loops',
          description: 'Potentially inefficient loops detected',
          patterns: inefficientLoops,
          severity: 'low',
          recommendation: 'Review loop efficiency and consider optimization'
        });
      }
    }
    
    return bottlenecks;
  }

  /**
   * Analyze code quality metrics
   */
  async analyzeCodeQuality() {
    console.log('[system-integrity] Analyzing code quality...');
    
    const qualityIssues = [];
    const files = await this.getAllCodeFiles();
    
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      const lines = content.split('\n');
      
      // Check for long files
      if (lines.length > this.complexityThresholds.maxFileSize) {
        qualityIssues.push({
          file: file,
          type: 'file_too_large',
          metric: lines.length,
          threshold: this.complexityThresholds.maxFileSize,
          severity: 'medium',
          recommendation: 'Consider breaking into smaller modules'
        });
      }
      
      // Check for missing documentation
      if (!content.includes('/**') && !content.includes('//')) {
        qualityIssues.push({
          file: file,
          type: 'missing_documentation',
          severity: 'low',
          recommendation: 'Add documentation for better maintainability'
        });
      }
      
      // Check for error handling
      if (content.includes('throw new Error') && !content.includes('try {')) {
        qualityIssues.push({
          file: file,
          type: 'missing_error_handling',
          severity: 'medium',
          recommendation: 'Add proper error handling with try-catch blocks'
        });
      }
    }
    
    return qualityIssues;
  }

  /**
   * Generate actionable recommendations based on scan results
   */
  async generateRecommendations(scanResults) {
    const recommendations = [];
    
    // Complexity recommendations
    if (scanResults.complexity_issues.length > 0) {
      recommendations.push({
        category: 'complexity_reduction',
        priority: 'high',
        description: 'Refactor complex files to improve maintainability',
        actions: [
          'Break large files into smaller modules',
          'Extract complex functions into separate utilities',
          'Reduce cyclomatic complexity through refactoring'
        ],
        affected_files: scanResults.complexity_issues.map(issue => issue.file)
      });
    }
    
    // Optimization recommendations
    if (scanResults.optimization_opportunities.length > 0) {
      recommendations.push({
        category: 'performance_optimization',
        priority: 'medium',
        description: 'Implement performance optimizations',
        actions: [
          'Remove duplicate code',
          'Optimize inefficient algorithms',
          'Implement caching where appropriate'
        ],
        affected_files: scanResults.optimization_opportunities.map(opt => opt.file)
      });
    }
    
    // Architectural recommendations
    if (scanResults.architectural_debt.length > 0) {
      recommendations.push({
        category: 'architectural_improvement',
        priority: 'high',
        description: 'Address architectural debt',
        actions: [
          'Resolve circular dependencies',
          'Improve separation of concerns',
          'Create missing abstractions'
        ],
        affected_areas: scanResults.architectural_debt.map(debt => debt.type)
      });
    }
    
    return recommendations;
  }

  /**
   * Get all code files in the system
   */
  async getAllCodeFiles() {
    const codeExtensions = ['.js', '.ts', '.jsx', '.tsx'];
    const files = [];
    
    const scanDirectory = (dir) => {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          scanDirectory(fullPath);
        } else if (stat.isFile() && codeExtensions.includes(path.extname(item))) {
          files.push(fullPath);
        }
      }
    };
    
    scanDirectory(__dirname + '/..');
    return files;
  }

  /**
   * Analyze file complexity
   */
  async analyzeFileComplexity(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const issues = [];
    const metrics = {
      lines: lines.length,
      functions: (content.match(/function\s+\w+/g) || []).length,
      classes: (content.match(/class\s+\w+/g) || []).length,
      imports: (content.match(/require\(/g) || []).length,
      cyclomaticComplexity: this.calculateCyclomaticComplexity(content)
    };
    
    // Check file size
    if (lines.length > this.complexityThresholds.maxFileSize) {
      issues.push({
        type: 'file_too_large',
        metric: lines.length,
        threshold: this.complexityThresholds.maxFileSize
      });
    }
    
    // Check cyclomatic complexity
    if (metrics.cyclomaticComplexity > this.complexityThresholds.maxCyclomaticComplexity) {
      issues.push({
        type: 'high_complexity',
        metric: metrics.cyclomaticComplexity,
        threshold: this.complexityThresholds.maxCyclomaticComplexity
      });
    }
    
    // Check dependency count
    if (metrics.imports > this.complexityThresholds.maxDependencies) {
      issues.push({
        type: 'too_many_dependencies',
        metric: metrics.imports,
        threshold: this.complexityThresholds.maxDependencies
      });
    }
    
    return { issues, metrics };
  }

  /**
   * Analyze file for optimization opportunities
   */
  async analyzeFileForOptimizations(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const optimizations = [];
    
    // Check for duplicate code patterns
    const duplicatePatterns = this.detectDuplicateCode(content);
    if (duplicatePatterns.length > 0) {
      optimizations.push({
        type: 'duplicate_code',
        description: 'Duplicate code patterns detected',
        patterns: duplicatePatterns,
        recommendation: 'Extract common functionality into reusable functions'
      });
    }
    
    // Check for unused imports
    const unusedImports = this.detectUnusedImports(content);
    if (unusedImports.length > 0) {
      optimizations.push({
        type: 'unused_imports',
        description: 'Unused imports detected',
        imports: unusedImports,
        recommendation: 'Remove unused imports to reduce bundle size'
      });
    }
    
    // Check for inefficient patterns
    const inefficientPatterns = this.detectInefficientPatterns(content);
    if (inefficientPatterns.length > 0) {
      optimizations.push({
        type: 'inefficient_patterns',
        description: 'Inefficient code patterns detected',
        patterns: inefficientPatterns,
        recommendation: 'Optimize algorithms and data structures'
      });
    }
    
    return optimizations;
  }

  /**
   * Calculate cyclomatic complexity
   */
  calculateCyclomaticComplexity(content) {
    const complexityKeywords = [
      'if', 'else', 'while', 'for', 'switch', 'case', 'catch', '&&', '||'
    ];
    
    let complexity = 1; // Base complexity
    for (const keyword of complexityKeywords) {
      const matches = content.match(new RegExp(`\\b${keyword}\\b`, 'g'));
      if (matches) {
        complexity += matches.length;
      }
    }
    
    // Handle ternary operator separately
    const ternaryMatches = content.match(/\?/g);
    if (ternaryMatches) {
      complexity += ternaryMatches.length;
    }
    
    return complexity;
  }

  /**
   * Detect duplicate code patterns
   */
  detectDuplicateCode(content) {
    const lines = content.split('\n');
    const patterns = new Map();
    const duplicates = [];
    
    for (let i = 0; i < lines.length - 2; i++) {
      const pattern = lines.slice(i, i + 3).join('\n');
      if (patterns.has(pattern)) {
        duplicates.push({
          pattern: pattern,
          firstOccurrence: patterns.get(pattern),
          duplicateOccurrence: i
        });
      } else {
        patterns.set(pattern, i);
      }
    }
    
    return duplicates;
  }

  /**
   * Detect unused imports
   */
  detectUnusedImports(content) {
    const imports = content.match(/require\(['"][^'"]+['"]\)/g) || [];
    const unused = [];
    
    for (const importStatement of imports) {
      const moduleName = importStatement.match(/require\(['"]([^'"]+)['"]\)/)[1];
      const variableName = this.extractVariableName(importStatement);
      
      if (variableName && !content.includes(variableName + '.')) {
        unused.push({
          import: importStatement,
          module: moduleName,
          variable: variableName
        });
      }
    }
    
    return unused;
  }

  /**
   * Extract variable name from require statement
   */
  extractVariableName(requireStatement) {
    const match = requireStatement.match(/const\s+(\w+)\s*=\s*require/);
    return match ? match[1] : null;
  }

  /**
   * Detect inefficient patterns
   */
  detectInefficientPatterns(content) {
    const patterns = [];
    
    // Check for nested loops
    if (content.includes('for') && content.includes('for')) {
      patterns.push('nested_loops');
    }
    
    // Check for synchronous operations in async context
    if (content.includes('async') && content.includes('Sync')) {
      patterns.push('sync_in_async');
    }
    
    // Check for potential memory leaks
    if (content.includes('setInterval') && !content.includes('clearInterval')) {
      patterns.push('potential_memory_leak');
    }
    
    return patterns;
  }

  /**
   * Detect circular dependencies
   */
  async detectCircularDependencies() {
    // Simplified circular dependency detection
    // In a real implementation, this would build a dependency graph
    return [];
  }

  /**
   * Detect separation of concerns violations
   */
  async detectConcernViolations() {
    // Simplified concern violation detection
    return [];
  }

  /**
   * Detect missing abstractions
   */
  async detectMissingAbstractions() {
    // Simplified missing abstraction detection
    return [];
  }

  /**
   * Detect inefficient loops
   */
  detectInefficientLoops(content) {
    const patterns = [];
    
    // Check for O(n²) patterns
    if (content.includes('for') && content.includes('indexOf')) {
      patterns.push('nested_search');
    }
    
    return patterns;
  }

  /**
   * Calculate severity based on issues
   */
  calculateSeverity(issues) {
    const highSeverityCount = issues.filter(issue => 
      issue.type === 'file_too_large' || issue.type === 'high_complexity'
    ).length;
    
    if (highSeverityCount > 0) return 'high';
    if (issues.length > 3) return 'medium';
    return 'low';
  }

  /**
   * Save monitoring data
   */
  async saveMonitoringData(scanResults) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `system-integrity-scan-${timestamp}.json`;
    const filepath = path.join(this.reportsPath, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(scanResults, null, 2));
    console.log(`[system-integrity] Scan results saved to ${filepath}`);
  }

  /**
   * Generate monitoring report
   */
  async generateMonitoringReport() {
    const latestScan = this.monitoringHistory[this.monitoringHistory.length - 1];
    if (!latestScan) {
      return { message: 'No monitoring data available' };
    }
    
    return {
      timestamp: latestScan.timestamp,
      summary: {
        total_issues: latestScan.complexity_issues.length + 
                     latestScan.optimization_opportunities.length +
                     latestScan.architectural_debt.length +
                     latestScan.performance_bottlenecks.length +
                     latestScan.code_quality_issues.length,
        complexity_issues: latestScan.complexity_issues.length,
        optimization_opportunities: latestScan.optimization_opportunities.length,
        architectural_debt: latestScan.architectural_debt.length,
        performance_bottlenecks: latestScan.performance_bottlenecks.length,
        code_quality_issues: latestScan.code_quality_issues.length
      },
      recommendations: latestScan.recommendations,
      monitoring_history: this.monitoringHistory.length
    };
  }

  /**
   * Get monitoring status
   */
  getMonitoringStatus() {
    return {
      agent_name: this.agentName,
      monitoring_active: true,
      scans_performed: this.monitoringHistory.length,
      last_scan: this.monitoringHistory.length > 0 ? 
        this.monitoringHistory[this.monitoringHistory.length - 1].timestamp : null,
      thresholds: this.complexityThresholds,
      optimization_patterns: this.optimizationPatterns
    };
  }
}

module.exports = SystemIntegrityAgent;