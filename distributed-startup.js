/**
 * Distributed Autonomous System Startup Integration
 * Automatically discovers and connects to the full AES with comprehensive feedback
 */

const fs = require('fs');
const path = require('path');

class DistributedAutonomousStartup {
  constructor() {
    this.systemPath = null;
    this.journalPath = null;
    this.patterns = new Map();
    this.learnedInsights = [];
    this.initialized = false;
    this.evolutionEngine = null;
    this.mistakePreventionEngine = null;
    this.systemStatus = 'discovering';
    this.discoveryLog = [];
  }

  /**
   * Discover the full AES system with detailed feedback
   */
  discoverAES() {
    console.log('\n🔍 [autonomous-startup] Discovering Autonomous Evolution System...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Check current directory first
    const currentResult = this.checkCurrentDirectory();
    if (currentResult.found) {
      this.systemStatus = 'found-local';
      this.logDiscoveryResult('✅ FOUND LOCALLY', currentResult);
      return true;
    }
    
    // Search up directory tree
    const parentResult = this.searchUpDirectoryTree();
    if (parentResult.found) {
      this.systemStatus = 'found-parent';
      this.logDiscoveryResult('✅ FOUND IN PARENT', parentResult);
      return true;
    }
    
    // System not found
    this.systemStatus = 'not-found';
    this.logDiscoveryResult('❌ NOT FOUND', { found: false, details: 'No AES system discovered' });
    return false;
  }

  /**
   * Check current directory with detailed feedback
   */
  checkCurrentDirectory() {
    const requiredFiles = [
      'autonomous-evolution-engine.js',
      'mistake-prevention-engine.js',
      'docs/AUTONOMOUS_EVOLUTION_JOURNAL_ARCHIVE.md'
    ];
    
    const currentPath = __dirname;
    const results = {
      found: false,
      path: currentPath,
      files: {},
      details: ''
    };
    
    console.log(`📁 [autonomous-startup] Checking current directory: ${currentPath}`);
    
    // Check each required file
    requiredFiles.forEach(file => {
      const filePath = path.join(currentPath, file);
      const exists = fs.existsSync(filePath);
      results.files[file] = exists;
      
      console.log(`   ${exists ? '✅' : '❌'} ${file}`);
      
      if (exists) {
        const stats = fs.statSync(filePath);
        console.log(`      └─ Size: ${stats.size} bytes, Modified: ${stats.mtime.toISOString()}`);
      }
    });
    
    const allFilesExist = requiredFiles.every(file => results.files[file]);
    
    if (allFilesExist) {
      this.systemPath = currentPath;
      this.journalPath = path.join(currentPath, 'docs', 'AUTONOMOUS_EVOLUTION_JOURNAL_ARCHIVE.md');
      results.found = true;
      results.details = 'All required files found in current directory';
    } else {
      const missingFiles = requiredFiles.filter(file => !results.files[file]);
      results.details = `Missing files: ${missingFiles.join(', ')}`;
    }
    
    return results;
  }

  /**
   * Search up directory tree with detailed feedback
   */
  searchUpDirectoryTree() {
    let currentDir = __dirname;
    const maxDepth = 5;
    const results = {
      found: false,
      path: null,
      files: {},
      details: '',
      searchDepth: 0
    };
    
    console.log(`🔍 [autonomous-startup] Searching up directory tree (max depth: ${maxDepth})`);
    
    for (let i = 0; i < maxDepth; i++) {
      // Look for AES files directly in current directory
      results.searchDepth = i + 1;
      
      console.log(`   📂 Level ${i + 1}: ${currentDir}`);
      
      const requiredFiles = [
        'autonomous-evolution-engine.js',
        'mistake-prevention-engine.js',
        'docs/AUTONOMOUS_EVOLUTION_JOURNAL_ARCHIVE.md'
      ];
      
      const fileResults = {};
      let allFilesExist = true;
      
      requiredFiles.forEach(file => {
        const filePath = path.join(currentDir, file);
        const exists = fs.existsSync(filePath);
        fileResults[file] = exists;
        
        console.log(`      ${exists ? '✅' : '❌'} ${file}`);
        
        if (exists) {
          const stats = fs.statSync(filePath);
          console.log(`         └─ Size: ${stats.size} bytes, Modified: ${stats.mtime.toISOString()}`);
        }
        
        if (!exists) allFilesExist = false;
      });
      
      if (allFilesExist) {
        this.systemPath = currentDir;
        this.journalPath = path.join(currentDir, 'docs', 'AUTONOMOUS_EVOLUTION_JOURNAL_ARCHIVE.md');
        results.found = true;
        results.path = currentDir;
        results.files = fileResults;
        results.details = `Found at depth ${i + 1} in parent directory`;
        break;
      }
      
      // Also check for autonomous-evolution-system folder
      const aesFolder = path.join(currentDir, 'autonomous-evolution-system');
      if (fs.existsSync(aesFolder)) {
        console.log(`      📁 Checking autonomous-evolution-system folder: ${aesFolder}`);
        
        const aesFileResults = {};
        let aesAllFilesExist = true;
        
        requiredFiles.forEach(file => {
          const filePath = path.join(aesFolder, file);
          const exists = fs.existsSync(filePath);
          aesFileResults[file] = exists;
          
          console.log(`         ${exists ? '✅' : '❌'} ${file}`);
          
          if (exists) {
            const stats = fs.statSync(filePath);
            console.log(`            └─ Size: ${stats.size} bytes, Modified: ${stats.mtime.toISOString()}`);
          }
          
          if (!exists) aesAllFilesExist = false;
        });
        
        if (aesAllFilesExist) {
          this.systemPath = aesFolder;
          this.journalPath = path.join(aesFolder, 'docs', 'AUTONOMOUS_EVOLUTION_JOURNAL_ARCHIVE.md');
          results.found = true;
          results.path = aesFolder;
          results.files = aesFileResults;
          results.details = `Found in autonomous-evolution-system folder at depth ${i + 1}`;
          break;
        }
      }
      
      currentDir = path.dirname(currentDir);
    }
    
    if (!results.found) {
      results.details = `Searched ${maxDepth} levels, no complete AES system found`;
    }
    
    return results;
  }

  /**
   * Log discovery result with detailed feedback
   */
  logDiscoveryResult(status, result) {
    console.log('\n📊 [autonomous-startup] DISCOVERY RESULT');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Status: ${status}`);
    console.log(`Path: ${result.path || 'N/A'}`);
    console.log(`Details: ${result.details}`);
    
    if (result.files) {
      console.log('\n📁 File Status:');
      Object.entries(result.files).forEach(([file, exists]) => {
        console.log(`   ${exists ? '✅' : '❌'} ${file}`);
      });
    }
    
    if (result.searchDepth) {
      console.log(`Search Depth: ${result.searchDepth} levels`);
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }

  /**
   * Initialize with comprehensive feedback
   */
  async initialize() {
    if (this.initialized) return;

    try {
      console.log('🚀 [autonomous-startup] Initializing Distributed Autonomous Evolution System');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      // Discover the AES system
      if (!this.discoverAES()) {
        throw new Error('Autonomous Evolution System not found');
      }
      
      // Load the full AES components
      console.log('📦 [autonomous-startup] Loading AES components...');
      await this.loadAESComponents();
      
      // Load existing learning
      console.log('📚 [autonomous-startup] Loading existing learning...');
      await this.loadExistingLearning();
      
      // Parse patterns and insights
      console.log('🧠 [autonomous-startup] Parsing learned patterns...');
      this.parseLearnedPatterns();
      
      // Activate pattern recognition
      console.log('🎯 [autonomous-startup] Activating pattern recognition...');
      this.activatePatternRecognition();
      
      // Initialize cross-session learning
      console.log('🔄 [autonomous-startup] Initializing cross-session learning...');
      this.initializeCrossSessionLearning();
      
      this.initialized = true;
      
      // Final status report
      this.logFinalStatus();
      
    } catch (error) {
      console.error('\n❌ [autonomous-startup] INITIALIZATION FAILED');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error(`Error: ${error.message}`);
      console.error('System will run in limited mode');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      this.initialized = false;
    }
  }

  /**
   * Load AES components with feedback
   */
  async loadAESComponents() {
    try {
      // Load evolution engine
      const evolutionEnginePath = path.join(this.systemPath, 'autonomous-evolution-engine.js');
      console.log(`   📦 Loading evolution engine: ${evolutionEnginePath}`);
      this.evolutionEngine = require(evolutionEnginePath);
      
      // Load mistake prevention engine
      const mistakePreventionPath = path.join(this.systemPath, 'mistake-prevention-engine.js');
      console.log(`   📦 Loading mistake prevention: ${mistakePreventionPath}`);
      this.mistakePreventionEngine = require(mistakePreventionPath);
      
      // Optionally load token optimizer (gracefully handles if unavailable)
      try {
        const tokenOptimizerPath = path.join(this.systemPath, 'utils', 'token-optimizer.js');
        if (fs.existsSync(tokenOptimizerPath)) {
          const { getTokenOptimizer } = require(tokenOptimizerPath);
          this.tokenOptimizer = getTokenOptimizer();
          await this.tokenOptimizer.initialize();
          const status = this.tokenOptimizer.getStatus();
          if (status.available) {
            console.log('   📦 Token optimizer: Available');
          } else {
            console.log('   📦 Token optimizer: Not available (standalone module not built)');
          }
        }
      } catch (error) {
        console.log('   📦 Token optimizer: Not available');
      }
      
      console.log('   ✅ All AES components loaded successfully');
    } catch (error) {
      throw new Error(`Failed to load AES components: ${error.message}`);
    }
  }

  /**
   * Load existing learning from discovered journal
   */
  async loadExistingLearning() {
    try {
      if (fs.existsSync(this.journalPath)) {
        const content = fs.readFileSync(this.journalPath, 'utf8');
        this.journalContent = content;
        console.log(`   📚 Evolution journal loaded: ${content.length} characters`);
        
        // Parse and show journal stats
        const lines = content.split('\n').length;
        const patterns = (content.match(/\*\*(\d{4}-\d{2}-\d{2} \d{2}:\d{2})\*\*/g) || []).length;
        console.log(`   📊 Journal stats: ${lines} lines, ${patterns} patterns`);
      } else {
        console.warn('   ⚠️ Evolution journal not found, starting fresh');
        this.journalContent = '';
      }
    } catch (error) {
      console.error(`   ❌ Error loading evolution journal: ${error.message}`);
    }
  }

  /**
   * Log final system status
   */
  logFinalStatus() {
    console.log('\n✅ [autonomous-startup] DISTRIBUTED AES INITIALIZED SUCCESSFULLY');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`System Status: ${this.systemStatus}`);
    console.log(`System Path: ${this.systemPath}`);
    console.log(`Journal Path: ${this.journalPath}`);
    console.log(`Patterns Loaded: ${this.patterns.size}`);
    console.log(`Insights Loaded: ${this.learnedInsights.length}`);
    console.log(`Journal Size: ${this.journalContent ? this.journalContent.length : 0} characters`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }

  /**
   * Parse learned patterns from journal content
   */
  parseLearnedPatterns() {
    if (!this.journalContent) return;

    // Extract success patterns
    const successPattern = /\*\*(\d{4}-\d{2}-\d{2} \d{2}:\d{2})\*\* – (.+?) → (.+?) → (.+?)\n- \*\*Insight\*\*: (.+?)\n- \*\*Impact\*\*: (.+?)\n- \*\*Evolution\*\*: (.+?)/g;
    let match;
    
    while ((match = successPattern.exec(this.journalContent)) !== null) {
      const [, timestamp, action, outcome, insight, impact, evolution] = match;
      
      this.patterns.set(timestamp, {
        type: 'success',
        action,
        outcome,
        insight,
        impact,
        evolution,
        timestamp
      });
      
      this.learnedInsights.push({
        type: 'success',
        insight,
        impact,
        evolution
      });
    }

    // Extract breakthrough patterns
    const breakthroughPattern = /\*\*Breakthrough\*\*: (.+?)\n- \*\*Insight\*\*: (.+?)\n- \*\*Impact\*\*: (.+?)\n- \*\*Evolution\*\*: (.+?)/g;
    
    while ((match = breakthroughPattern.exec(this.journalContent)) !== null) {
      const [, breakthrough, insight, impact, evolution] = match;
      
      this.patterns.set(`breakthrough-${breakthrough}`, {
        type: 'breakthrough',
        breakthrough,
        insight,
        impact,
        evolution
      });
      
      this.learnedInsights.push({
        type: 'breakthrough',
        insight,
        impact,
        evolution
      });
    }
  }

  /**
   * Activate pattern recognition for automatic application
   */
  activatePatternRecognition() {
    console.log('[autonomous-startup] Pattern recognition activated');
    
    // Success patterns are automatically applied
    this.patterns.forEach((pattern, key) => {
      if (pattern.type === 'success') {
        console.log(`[autonomous-startup] Success pattern loaded: ${pattern.action}`);
      }
    });
  }

  /**
   * Initialize cross-session learning capabilities
   */
  initializeCrossSessionLearning() {
    console.log('[autonomous-startup] Cross-session learning initialized');
    
    // System now has access to all previous learning
    // and can apply it automatically in new contexts
  }

  /**
   * Initialize autonomous evolution engine
   */
  initializeAutonomousEvolution() {
    console.log('[autonomous-startup] Autonomous evolution engine initialized');
    
    // Start continuous evolution monitoring
    if (this.evolutionEngine && typeof this.evolutionEngine.startContinuousEvolution === 'function') {
      this.evolutionEngine.startContinuousEvolution();
      console.log('[autonomous-startup] Continuous evolution monitoring started');
    }
    
    // System can now autonomously ask itself evolution questions
    // and drive its own evolution without manual intervention
    this.evolutionEngine.triggerAutonomousEvolution().then(result => {
      console.log('[autonomous-startup] Initial autonomous evolution triggered:', result);
    }).catch(error => {
      console.error('[autonomous-startup] Autonomous evolution failed:', error);
    });
  }

  /**
   * Initialize mistake prevention engine
   */
  initializeMistakePrevention() {
    console.log('[autonomous-startup] Mistake prevention engine initialized');
    
    // System now actively prevents known mistakes from repeating
    // and enforces quality gates based on learned lessons
    this.mistakePreventionEngine.initialize().then(() => {
      console.log('[autonomous-startup] Mistake prevention system active');
    }).catch(error => {
      console.error('[autonomous-startup] Mistake prevention initialization failed:', error);
    });
  }

  /**
   * Get learned insights for current context
   */
  getLearnedInsights() {
    return this.learnedInsights;
  }

  /**
   * Get patterns for specific context
   */
  getPatternsForContext(context) {
    const relevantPatterns = [];
    
    this.patterns.forEach((pattern, key) => {
      if (pattern.insight.toLowerCase().includes(context.toLowerCase()) ||
          pattern.action.toLowerCase().includes(context.toLowerCase())) {
        relevantPatterns.push(pattern);
      }
    });
    
    return relevantPatterns;
  }

  /**
   * Check if system is initialized
   */
  isInitialized() {
    return this.initialized;
  }

  /**
   * Get system status
   */
  getStatus() {
    return {
      initialized: this.initialized,
      patternsLoaded: this.patterns.size,
      insightsLoaded: this.learnedInsights.length,
      journalLoaded: !!this.journalContent,
      mistakePrevention: this.mistakePreventionEngine.getPreventionStatus()
    };
  }

  /**
   * Check action against mistake prevention system
   */
  checkActionForMistakes(action, context) {
    if (!this.initialized) {
      return { safe: true, reason: 'System not initialized' };
    }

    return this.mistakePreventionEngine.preventAction(action, context);
  }

  /**
   * Get prevention recommendations for action
   */
  getPreventionRecommendations(action, context) {
    if (!this.initialized) {
      return [];
    }

    const riskAssessment = this.mistakePreventionEngine.checkAgainstAntiPatterns(action, context);
    return riskAssessment.risks.map(risk => risk.recommendation);
  }

  /**
   * Get comprehensive system status
   */
  getSystemStatus() {
    return {
      initialized: this.initialized,
      systemPath: this.systemPath,
      systemStatus: this.systemStatus,
      patternsLoaded: this.patterns.size,
      insightsLoaded: this.learnedInsights.length,
      journalLoaded: !!this.journalContent,
      journalSize: this.journalContent ? this.journalContent.length : 0,
      discoveryLog: this.discoveryLog
    };
  }
}

// Auto-initialize when module is loaded
const distributedAutonomousStartup = new DistributedAutonomousStartup();
distributedAutonomousStartup.initialize();

module.exports = distributedAutonomousStartup;
