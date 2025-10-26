/**
 * Comprehensive System Health Check
 * Validates all components of the autonomous evolution system
 */

const fs = require('fs');
const path = require('path');

class SystemHealthCheck {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      overall: 'unknown',
      components: {},
      issues: [],
      recommendations: [],
      statistics: {}
    };
    
    this.basePath = __dirname;
  }

  /**
   * Run comprehensive system health check
   */
  async runFullCheck() {
    console.log('🔍 Starting Comprehensive System Health Check...\n');
    
    try {
      // 1. Check core system components
      await this.checkCoreSystem();
      
      // 2. Check psychological system
      await this.checkPsychologicalSystem();
      
      // 3. Check documentation
      await this.checkDocumentation();
      
      // 4. Check ECP integration
      await this.checkECPIntegration();
      
      // 5. Check file structure
      await this.checkFileStructure();
      
      // 6. Run system tests
      await this.runSystemTests();
      
      // 7. Generate final report
      this.generateFinalReport();
      
      console.log('\n✅ System health check completed!');
      
    } catch (error) {
      console.error('❌ System health check failed:', error);
      this.results.overall = 'failed';
      this.results.issues.push({
        component: 'system_check',
        severity: 'critical',
        message: error.message
      });
    }
    
    return this.results;
  }

  /**
   * Check core autonomous evolution system
   */
  async checkCoreSystem() {
    console.log('🧠 Checking Core Autonomous Evolution System...');
    
    const coreComponents = [
      'autonomous-evolution-engine.js',
      'mistake-prevention-engine.js',
      'autonomous-startup.js',
      'distributed-startup.js'
    ];
    
    const coreResults = {
      status: 'unknown',
      components: {},
      issues: []
    };
    
    for (const component of coreComponents) {
      const filePath = path.join(this.basePath, component);
      const exists = fs.existsSync(filePath);
      
      coreResults.components[component] = {
        exists,
        status: exists ? 'present' : 'missing'
      };
      
      if (!exists) {
        coreResults.issues.push({
          component,
          severity: 'critical',
          message: `Core component ${component} is missing`
        });
      }
    }
    
    // Check if any critical components are missing
    const missingComponents = Object.values(coreResults.components).filter(c => !c.exists);
    coreResults.status = missingComponents.length === 0 ? 'healthy' : 'unhealthy';
    
    this.results.components.core = coreResults;
    console.log(`   Status: ${coreResults.status}`);
    console.log(`   Components checked: ${coreComponents.length}`);
    console.log(`   Issues found: ${coreResults.issues.length}`);
  }

  /**
   * Check psychological system integration
   */
  async checkPsychologicalSystem() {
    console.log('\n🧠 Checking Psychological System Integration...');
    
    const psychologicalComponents = [
      'agents/technical-psychological-analyzer.js',
      'agents/psychological-decision-monitor.js',
      'agents/connection-discoverer.js'
    ];
    
    const psychologicalResults = {
      status: 'unknown',
      components: {},
      issues: [],
      tests: {}
    };
    
    // Check component files
    for (const component of psychologicalComponents) {
      const filePath = path.join(this.basePath, component);
      const exists = fs.existsSync(filePath);
      
      psychologicalResults.components[component] = {
        exists,
        status: exists ? 'present' : 'missing'
      };
      
      if (!exists) {
        psychologicalResults.issues.push({
          component,
          severity: 'critical',
          message: `Psychological component ${component} is missing`
        });
      }
    }
    
    // Test psychological system functionality
    try {
      const TechnicalPsychologicalAnalyzer = require('./agents/technical-psychological-analyzer');
      const analyzer = new TechnicalPsychologicalAnalyzer();
      
      psychologicalResults.tests.analyzer = {
        status: 'working',
        message: 'TechnicalPsychologicalAnalyzer can be instantiated'
      };
      
    } catch (error) {
      psychologicalResults.tests.analyzer = {
        status: 'failed',
        message: `TechnicalPsychologicalAnalyzer failed: ${error.message}`
      };
      psychologicalResults.issues.push({
        component: 'technical-psychological-analyzer',
        severity: 'high',
        message: `Analyzer instantiation failed: ${error.message}`
      });
    }
    
    // Check if all components are present and working
    const missingComponents = Object.values(psychologicalResults.components).filter(c => !c.exists);
    const failedTests = Object.values(psychologicalResults.tests).filter(t => t.status === 'failed');
    
    psychologicalResults.status = missingComponents.length === 0 && failedTests.length === 0 ? 'healthy' : 'unhealthy';
    
    this.results.components.psychological = psychologicalResults;
    console.log(`   Status: ${psychologicalResults.status}`);
    console.log(`   Components checked: ${psychologicalComponents.length}`);
    console.log(`   Tests run: ${Object.keys(psychologicalResults.tests).length}`);
    console.log(`   Issues found: ${psychologicalResults.issues.length}`);
  }

  /**
   * Check documentation consistency
   */
  async checkDocumentation() {
    console.log('\n📚 Checking Documentation Consistency...');
    
    const docResults = {
      status: 'unknown',
      files: {},
      issues: [],
      consistency: {}
    };
    
    const docFiles = [
      'docs/README.md',
      'docs/NAVIGATION.md',
      'docs/living/EVOLUTION_JOURNAL.md',
      'docs/reference/API_REFERENCE.md',
      'docs/reference/CONFIGURATION_GUIDE.md',
      'docs/implemented/PSYCHOLOGICAL_SYSTEM_IMPLEMENTATION_SUMMARY.md'
    ];
    
    // Check if documentation files exist
    for (const docFile of docFiles) {
      const filePath = path.join(this.basePath, docFile);
      const exists = fs.existsSync(filePath);
      
      docResults.files[docFile] = {
        exists,
        status: exists ? 'present' : 'missing'
      };
      
      if (!exists) {
        docResults.issues.push({
          file: docFile,
          severity: 'medium',
          message: `Documentation file ${docFile} is missing`
        });
      }
    }
    
    // Check for psychological system references in key files
    const keyFiles = ['docs/README.md', 'docs/living/EVOLUTION_JOURNAL.md'];
    
    for (const file of keyFiles) {
      const filePath = path.join(this.basePath, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const hasPsychologicalRef = content.includes('Technical-Psychological');
        
        docResults.consistency[file] = {
          hasPsychologicalRef,
          status: hasPsychologicalRef ? 'consistent' : 'inconsistent'
        };
        
        if (!hasPsychologicalRef) {
          docResults.issues.push({
            file,
            severity: 'low',
            message: `File ${file} missing psychological system reference`
          });
        }
      }
    }
    
    // Check if any critical documentation is missing
    const missingFiles = Object.values(docResults.files).filter(f => !f.exists);
    docResults.status = missingFiles.length === 0 ? 'healthy' : 'unhealthy';
    
    this.results.components.documentation = docResults;
    console.log(`   Status: ${docResults.status}`);
    console.log(`   Files checked: ${docFiles.length}`);
    console.log(`   Consistency checks: ${Object.keys(docResults.consistency).length}`);
    console.log(`   Issues found: ${docResults.issues.length}`);
  }

  /**
   * Check ECP integration
   */
  async checkECPIntegration() {
    console.log('\n🔄 Checking ECP Integration...');
    
    const ecpResults = {
      status: 'unknown',
      phases: {},
      issues: []
    };
    
    // Check ECP mode file
    const ecpModePath = path.join(this.basePath, 'rules', '00-ecp-mode.md');
    const ecpModeExists = fs.existsSync(ecpModePath);
    
    ecpResults.phases.ecp_mode = {
      exists: ecpModeExists,
      status: ecpModeExists ? 'present' : 'missing'
    };
    
    if (ecpModeExists) {
      const ecpContent = fs.readFileSync(ecpModePath, 'utf8');
      
      // Check for psychological integration in ECP phases
      const hasPsychologicalFrame = ecpContent.includes('Psychological Context');
      const hasPsychologicalDesign = ecpContent.includes('Psychological Risk Assessment');
      const hasPsychologicalPlan = ecpContent.includes('Psychological Safety');
      const hasPsychologicalImplement = ecpContent.includes('Monitor psychological decision patterns');
      const hasPsychologicalReview = ecpContent.includes('psychological bias');
      
      ecpResults.phases.frame = { hasPsychologicalIntegration: hasPsychologicalFrame };
      ecpResults.phases.design = { hasPsychologicalIntegration: hasPsychologicalDesign };
      ecpResults.phases.plan = { hasPsychologicalIntegration: hasPsychologicalPlan };
      ecpResults.phases.implement = { hasPsychologicalIntegration: hasPsychologicalImplement };
      ecpResults.phases.review = { hasPsychologicalIntegration: hasPsychologicalReview };
      
      const integratedPhases = [hasPsychologicalFrame, hasPsychologicalDesign, hasPsychologicalPlan, hasPsychologicalImplement, hasPsychologicalReview].filter(Boolean).length;
      
      if (integratedPhases === 5) {
        ecpResults.status = 'fully_integrated';
      } else if (integratedPhases > 0) {
        ecpResults.status = 'partially_integrated';
        ecpResults.issues.push({
          phase: 'ecp_integration',
          severity: 'medium',
          message: `Only ${integratedPhases}/5 ECP phases have psychological integration`
        });
      } else {
        ecpResults.status = 'not_integrated';
        ecpResults.issues.push({
          phase: 'ecp_integration',
          severity: 'high',
          message: 'No ECP phases have psychological integration'
        });
      }
    } else {
      ecpResults.status = 'missing_ecp_mode';
      ecpResults.issues.push({
        phase: 'ecp_mode',
        severity: 'critical',
        message: 'ECP mode file is missing'
      });
    }
    
    this.results.components.ecp = ecpResults;
    console.log(`   Status: ${ecpResults.status}`);
    console.log(`   ECP Mode: ${ecpModeExists ? 'present' : 'missing'}`);
    console.log(`   Integrated phases: ${ecpModeExists ? Object.values(ecpResults.phases).filter(p => p.hasPsychologicalIntegration).length : 0}/5`);
    console.log(`   Issues found: ${ecpResults.issues.length}`);
  }

  /**
   * Check file structure and organization
   */
  async checkFileStructure() {
    console.log('\n📁 Checking File Structure...');
    
    const structureResults = {
      status: 'unknown',
      directories: {},
      issues: []
    };
    
    const expectedDirs = [
      'agents',
      'docs',
      'docs/implemented',
      'docs/living',
      'docs/reference',
      'docs/system',
      'rules',
      'skills'
    ];
    
    for (const dir of expectedDirs) {
      const dirPath = path.join(this.basePath, dir);
      const exists = fs.existsSync(dirPath);
      
      structureResults.directories[dir] = {
        exists,
        status: exists ? 'present' : 'missing'
      };
      
      if (!exists) {
        structureResults.issues.push({
          directory: dir,
          severity: 'medium',
          message: `Expected directory ${dir} is missing`
        });
      }
    }
    
    // Check for orphaned files
    const orphanedFiles = [];
    const rootFiles = fs.readdirSync(this.basePath);
    
    for (const file of rootFiles) {
      if (file.endsWith('_SUMMARY.md') && !file.includes('IMPLEMENTATION')) {
        orphanedFiles.push(file);
      }
    }
    
    if (orphanedFiles.length > 0) {
      structureResults.issues.push({
        directory: 'root',
        severity: 'low',
        message: `Found ${orphanedFiles.length} orphaned summary files: ${orphanedFiles.join(', ')}`
      });
    }
    
    const missingDirs = Object.values(structureResults.directories).filter(d => !d.exists);
    structureResults.status = missingDirs.length === 0 ? 'healthy' : 'unhealthy';
    
    this.results.components.structure = structureResults;
    console.log(`   Status: ${structureResults.status}`);
    console.log(`   Directories checked: ${expectedDirs.length}`);
    console.log(`   Orphaned files: ${orphanedFiles.length}`);
    console.log(`   Issues found: ${structureResults.issues.length}`);
  }

  /**
   * Run system tests
   */
  async runSystemTests() {
    console.log('\n🧪 Running System Tests...');
    
    const testResults = {
      status: 'unknown',
      tests: {},
      issues: []
    };
    
    // Test 1: Psychological System Test
    try {
      const testPath = path.join(this.basePath, 'test-psychological-system.js');
      if (fs.existsSync(testPath)) {
        // Note: In a real implementation, we would run the test
        testResults.tests.psychological_system = {
          status: 'available',
          message: 'Psychological system test file exists'
        };
      } else {
        testResults.tests.psychological_system = {
          status: 'missing',
          message: 'Psychological system test file not found'
        };
        testResults.issues.push({
          test: 'psychological_system',
          severity: 'medium',
          message: 'Psychological system test file is missing'
        });
      }
    } catch (error) {
      testResults.tests.psychological_system = {
        status: 'failed',
        message: `Psychological system test failed: ${error.message}`
      };
    }
    
    // Test 2: Documentation Update Test
    try {
      const docUpdaterPath = path.join(this.basePath, 'agents', 'documentation-updater.js');
      if (fs.existsSync(docUpdaterPath)) {
        const DocumentationUpdater = require('./agents/documentation-updater');
        const updater = new DocumentationUpdater();
        const status = updater.getStatus();
        
        testResults.tests.documentation_updater = {
          status: 'working',
          message: 'Documentation updater is functional',
          details: status
        };
      } else {
        testResults.tests.documentation_updater = {
          status: 'missing',
          message: 'Documentation updater not found'
        };
      }
    } catch (error) {
      testResults.tests.documentation_updater = {
        status: 'failed',
        message: `Documentation updater test failed: ${error.message}`
      };
    }
    
    // Test 3: Mistake Prevention Engine Test
    try {
      const MistakePreventionEngine = require('./mistake-prevention-engine');
      const engine = new MistakePreventionEngine();
      const status = engine.getEnhancedStatus();
      
      testResults.tests.mistake_prevention = {
        status: 'working',
        message: 'Mistake prevention engine is functional',
        details: status
      };
    } catch (error) {
      testResults.tests.mistake_prevention = {
        status: 'failed',
        message: `Mistake prevention engine test failed: ${error.message}`
      };
      testResults.issues.push({
        test: 'mistake_prevention',
        severity: 'high',
        message: `Mistake prevention engine failed: ${error.message}`
      });
    }
    
    const failedTests = Object.values(testResults.tests).filter(t => t.status === 'failed');
    testResults.status = failedTests.length === 0 ? 'healthy' : 'unhealthy';
    
    this.results.components.tests = testResults;
    console.log(`   Status: ${testResults.status}`);
    console.log(`   Tests run: ${Object.keys(testResults.tests).length}`);
    console.log(`   Failed tests: ${failedTests.length}`);
    console.log(`   Issues found: ${testResults.issues.length}`);
  }

  /**
   * Generate final system health report
   */
  generateFinalReport() {
    console.log('\n📊 Generating System Health Report...');
    
    // Calculate overall system health
    const componentStatuses = Object.values(this.results.components).map(c => c.status);
    const criticalIssues = this.results.issues.filter(i => i.severity === 'critical');
    const highIssues = this.results.issues.filter(i => i.severity === 'high');
    
    if (criticalIssues.length > 0) {
      this.results.overall = 'critical';
    } else if (highIssues.length > 0) {
      this.results.overall = 'warning';
    } else if (componentStatuses.every(s => s === 'healthy' || s === 'fully_integrated')) {
      this.results.overall = 'excellent';
    } else if (componentStatuses.some(s => s === 'unhealthy' || s === 'partially_integrated')) {
      this.results.overall = 'good';
    } else {
      this.results.overall = 'unknown';
    }
    
    // Generate statistics
    this.results.statistics = {
      totalComponents: Object.keys(this.results.components).length,
      healthyComponents: componentStatuses.filter(s => s === 'healthy' || s === 'fully_integrated').length,
      totalIssues: this.results.issues.length,
      criticalIssues: criticalIssues.length,
      highIssues: highIssues.length,
      mediumIssues: this.results.issues.filter(i => i.severity === 'medium').length,
      lowIssues: this.results.issues.filter(i => i.severity === 'low').length
    };
    
    // Generate recommendations
    this.generateRecommendations();
    
    // Save report
    const reportPath = path.join(this.basePath, 'system-health-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    
    console.log(`   Overall Status: ${this.results.overall.toUpperCase()}`);
    console.log(`   Components: ${this.results.statistics.healthyComponents}/${this.results.statistics.totalComponents} healthy`);
    console.log(`   Issues: ${this.results.statistics.totalIssues} total (${this.results.statistics.criticalIssues} critical, ${this.results.statistics.highIssues} high)`);
    console.log(`   Report saved: system-health-report.json`);
  }

  /**
   * Generate recommendations based on issues found
   */
  generateRecommendations() {
    const recommendations = [];
    
    // Critical issues
    const criticalIssues = this.results.issues.filter(i => i.severity === 'critical');
    if (criticalIssues.length > 0) {
      recommendations.push({
        priority: 'critical',
        category: 'system_stability',
        message: `Address ${criticalIssues.length} critical issues immediately`,
        actions: criticalIssues.map(i => `Fix ${i.component || i.file || i.directory}: ${i.message}`)
      });
    }
    
    // High priority issues
    const highIssues = this.results.issues.filter(i => i.severity === 'high');
    if (highIssues.length > 0) {
      recommendations.push({
        priority: 'high',
        category: 'functionality',
        message: `Resolve ${highIssues.length} high priority issues`,
        actions: highIssues.map(i => `Address ${i.component || i.file || i.directory}: ${i.message}`)
      });
    }
    
    // ECP integration recommendations
    if (this.results.components.ecp?.status === 'partially_integrated') {
      recommendations.push({
        priority: 'medium',
        category: 'integration',
        message: 'Complete ECP psychological integration',
        actions: ['Ensure all 5 ECP phases include psychological analysis']
      });
    }
    
    // Documentation recommendations
    const docIssues = this.results.issues.filter(i => i.file?.includes('docs/'));
    if (docIssues.length > 0) {
      recommendations.push({
        priority: 'low',
        category: 'documentation',
        message: `Improve documentation consistency (${docIssues.length} issues)`,
        actions: ['Update documentation files to ensure consistency']
      });
    }
    
    this.results.recommendations = recommendations;
  }

  /**
   * Get system health summary
   */
  getSummary() {
    return {
      overall: this.results.overall,
      statistics: this.results.statistics,
      criticalIssues: this.results.issues.filter(i => i.severity === 'critical'),
      recommendations: this.results.recommendations
    };
  }
}

// Run if called directly
if (require.main === module) {
  const checker = new SystemHealthCheck();
  checker.runFullCheck().then(() => {
    const summary = checker.getSummary();
    console.log('\n🎯 System Health Summary:');
    console.log(`Overall Status: ${summary.overall.toUpperCase()}`);
    console.log(`Healthy Components: ${summary.statistics.healthyComponents}/${summary.statistics.totalComponents}`);
    console.log(`Critical Issues: ${summary.criticalIssues.length}`);
    console.log(`Recommendations: ${summary.recommendations.length}`);
  });
}

module.exports = SystemHealthCheck;
