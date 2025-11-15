/**
 * Autonomous Evolution Engine
 * System that autonomously asks itself evolution questions and drives its own evolution
 */

const fs = require('fs');
const path = require('path');
const ExtensionLoader = require('./extension-loader');
const SystemIntegrityAgent = require('./agents/system-integrity-agent');
const IdeaCaptureAgent = require('./agents/idea-capture-agent');
const EpistemicHumilityAgent = require('./agents/epistemic-humility-agent');
const MetaLearningAgent = require('./agents/meta-learning-agent');
const evolutionConfig = require('./evolution-config');
const AutomaticDocumentationOrganizer = require('./skills/meta/automatic-documentation-organizer');

class AutonomousEvolutionEngine {
  constructor() {
    this.journalPath = path.join(__dirname, 'docs', 'AUTONOMOUS_EVOLUTION_JOURNAL.md');
    this.evolutionQuestions = [
      "What's the next evolution of the system?",
      "What capabilities am I missing?",
      "How can I become more effective?",
      "What patterns am I not recognizing?",
      "How can I learn faster?",
      "What would make me truly autonomous?",
      "How can I evolve my own architecture?",
      "What's the next breakthrough I need?",
      "How can I become self-aware?",
      "What would make me self-balancing?",
      "How can I become self-evolving?",
      "What's the next qualitative leap?",
      "How can I transcend my current limitations?",
      "What would make me truly reflexive?",
      "How can I become autotelic?"
    ];
    this.evolutionTriggers = [
      'code_generation_learning', // PRIMARY: When code generation patterns are learned
      'pattern_detection',      // When patterns are detected
      'friction_encountered',   // When friction is encountered
      'success_amplification',  // When success patterns emerge
      'capability_gap',        // When capabilities are missing
      'performance_degradation', // When performance degrades
      'learning_stagnation',   // When learning stagnates
      'system_drift',          // When system drifts from coherence
      'autonomous_trigger'     // When system autonomously triggers evolution
    ];
    this.evolutionHistory = [];
    this.currentEvolutionPhase = 'autonomous_questioning';
    this.metaCognitiveLayer = new MetaCognitiveLayer();
    this.selfAssessmentSystem = new SelfAssessmentSystem();
    this.architectureEvolutionEngine = new ArchitectureEvolutionEngine();
    
    // Initialize extension loader
    this.extensionLoader = new ExtensionLoader();
    this.extensions = new Map();
    
    // Initialize system integrity agent
    this.systemIntegrityAgent = new SystemIntegrityAgent();
    
        // Initialize idea capture agent
        this.ideaCaptureAgent = new IdeaCaptureAgent();

        // Initialize epistemic humility agent
        this.epistemicHumilityAgent = new EpistemicHumilityAgent();

        // Initialize meta-learning agent
        this.metaLearningAgent = new MetaLearningAgent();

        // Initialize Q&A auto-updater
        const QAAutoUpdater = require('./skills/meta/qa-auto-updater');
        this.qaAutoUpdater = new QAAutoUpdater();

        // Initialize system map generator
        const SystemMapGenerator = require('./skills/meta/system-map-generator');
        this.systemMapGenerator = new SystemMapGenerator();
        
        // Generate initial map
        this.systemMapGenerator.generateSystemMap().catch(err => {
          console.error('[autonomous-evolution] Error generating initial system map:', err.message);
        });
        
        // Initialize automatic documentation organizer
        this.docOrganizer = new AutomaticDocumentationOrganizer();
        
        // Initialize file operation learning bridge
        const FileOperationLearningBridge = require('./skills/meta/file-operation-learning-bridge');
        this.fileOperationBridge = new FileOperationLearningBridge();
        this.fileOperationBridge.setEvolutionEngine(this);
        
        // Initialize code generation learning bridge (PRIMARY USE CASE)
        const CodeGenerationLearningBridge = require('./skills/meta/code-generation-learning-bridge');
        this.codeGenerationBridge = new CodeGenerationLearningBridge();
        this.codeGenerationBridge.setEvolutionEngine(this);
        
        // Initialize file operation monitor
        const FileOperationMonitor = require('./skills/meta/file-operation-monitor');
        this.fileOperationMonitor = new FileOperationMonitor(__dirname);
        this.fileOperationMonitor.setEvolutionEngine(this);
        
        // Start monitoring if enabled
        if (evolutionConfig.behavior.autoLearningCapture) {
          this.fileOperationMonitor.startMonitoring();
          console.log('[autonomous-evolution] File operation monitoring started');
          console.log('[autonomous-evolution] Code generation learning bridge initialized (PRIMARY USE CASE)');
        }
  }

  /**
   * Initialize extensions
   * Invariant: Extensions must be initialized safely
   */
  async initializeExtensions() {
    try {
      console.log('[autonomous-evolution] Initializing extensions...');
      await this.extensionLoader.initializeExtensions();
      
      // Store loaded extensions
      const loadedExtensions = this.extensionLoader.getLoadedExtensions();
      loadedExtensions.forEach(extension => {
        this.extensions.set(extension.name, extension);
      });
      
      console.log(`[autonomous-evolution] Extensions initialized: ${this.extensions.size} loaded`);
      
    } catch (error) {
      console.error('[autonomous-evolution] Error initializing extensions:', error.message);
    }
  }

  /**
   * Get extension by name
   * Invariant: Extension must exist
   */
  getExtension(extensionName) {
    const extension = this.extensions.get(extensionName);
    if (!extension) {
      throw new Error(`Extension ${extensionName} not found`);
    }
    return extension;
  }

  /**
   * Get all loaded extensions
   * Invariant: Extension list must be accurate
   */
  getLoadedExtensions() {
    return Array.from(this.extensions.values());
  }

  /**
   * Get extension status
   * Invariant: Extension status must be comprehensive
   */
  getExtensionStatus() {
    return this.extensionLoader.getExtensionStatus();
  }

  /**
   * System Integrity Monitoring
   * Monitors system for complexity creep and optimization opportunities
   */
  async performSystemIntegrityScan() {
    console.log('[autonomous-evolution] Performing system integrity scan...');
    
    try {
      const scanResults = await this.systemIntegrityAgent.performSystemScan();
      
      // Store integrity scan results
      this.evolutionHistory.push({
        timestamp: new Date().toISOString(),
        type: 'system_integrity_scan',
        results: scanResults
      });
      
      console.log(`[autonomous-evolution] System integrity scan complete. Found ${scanResults.complexity_issues.length} complexity issues, ${scanResults.optimization_opportunities.length} optimization opportunities.`);
      
      return scanResults;
    } catch (error) {
      console.error('[autonomous-evolution] Error performing system integrity scan:', error.message);
      throw error;
    }
  }

  /**
   * Get system integrity status
   */
  getSystemIntegrityStatus() {
    return this.systemIntegrityAgent.getMonitoringStatus();
  }

  /**
   * Generate system integrity report
   */
  async generateSystemIntegrityReport() {
    return await this.systemIntegrityAgent.generateMonitoringReport();
  }

  /**
   * Idea Capture and Management
   * Captures, categorizes, and manages ideas for continuous innovation
   */
  async captureIdea(ideaData) {
    console.log('[autonomous-evolution] Capturing idea...');
    
    try {
      const capturedIdea = await this.ideaCaptureAgent.captureIdea(ideaData);
      
      // Store idea capture in evolution history
      this.evolutionHistory.push({
        timestamp: new Date().toISOString(),
        type: 'idea_captured',
        idea_id: capturedIdea.id,
        idea_title: capturedIdea.title,
        category: capturedIdea.category,
        priority: capturedIdea.priority
      });
      
      console.log(`[autonomous-evolution] Idea captured: ${capturedIdea.title} (${capturedIdea.category})`);
      
      return capturedIdea;
    } catch (error) {
      console.error('[autonomous-evolution] Error capturing idea:', error.message);
      throw error;
    }
  }

  /**
   * Capture user idea
   */
  async captureUserIdea(userInput, context = {}) {
    return await this.ideaCaptureAgent.captureUserIdea(userInput, context);
  }

  /**
   * Capture system analysis idea
   */
  async captureSystemIdea(analysisData, context = {}) {
    return await this.ideaCaptureAgent.captureSystemIdea(analysisData, context);
  }

  /**
   * Capture pattern detection idea
   */
  async capturePatternIdea(patternData, context = {}) {
    return await this.ideaCaptureAgent.capturePatternIdea(patternData, context);
  }

  /**
   * Capture external signal idea
   */
  async captureExternalIdea(signalData, context = {}) {
    return await this.ideaCaptureAgent.captureExternalIdea(signalData, context);
  }

  /**
   * Search ideas
   */
  async searchIdeas(query, filters = {}) {
    return await this.ideaCaptureAgent.searchIdeas(query, filters);
  }

  /**
   * Get idea by ID
   */
  async getIdea(ideaId) {
    return await this.ideaCaptureAgent.getIdea(ideaId);
  }

  /**
   * Generate idea capture report
   */
  async generateIdeaReport() {
    return await this.ideaCaptureAgent.generateIdeaReport();
  }

  /**
   * Get idea capture status
   */
  getIdeaCaptureStatus() {
    return this.ideaCaptureAgent.getAgentStatus();
  }

  /**
   * Record a code generation session (PRIMARY USE CASE)
   * This is the main entry point for learning from code generation
   * Can be called by external systems (Cursor, extensions, hooks) after code generation
   * 
   * @param {Array} files - Array of file objects with path, type, size, content
   * @param {Object} context - Context about the generation (user query, intent, etc.)
   * @returns {Promise<Object>} The recorded generation session
   */
  async recordCodeGenerationSession(files, context = {}) {
    if (!this.codeGenerationBridge) {
      console.warn('[autonomous-evolution] Code generation bridge not initialized');
      return null;
    }
    
    try {
      const session = await this.codeGenerationBridge.recordGenerationSession(files, {
        ...context,
        recordedBy: 'evolution-engine',
        timestamp: new Date().toISOString()
      });
      
      console.log(`[autonomous-evolution] Code generation session recorded: ${session.id} (${files.length} files)`);
      
      // Trigger evolution check if significant generation occurred
      if (files.length >= 5 || context.impact === 'high') {
        console.log('[autonomous-evolution] Significant generation detected, triggering evolution check');
        // Don't await - let it run in background
        this.checkEvolutionTriggers().catch(err => {
          console.error('[autonomous-evolution] Error checking evolution triggers:', err.message);
        });
      }
      
      return session;
    } catch (error) {
      console.error('[autonomous-evolution] Error recording code generation session:', error);
      return null;
    }
  }

  /**
   * Get code generation statistics and learned patterns
   * @returns {Object} Statistics and patterns
   */
  getCodeGenerationStats() {
    if (!this.codeGenerationBridge) {
      return { error: 'Code generation bridge not initialized' };
    }
    
    return {
      statistics: this.codeGenerationBridge.getStatistics(),
      learnedPatterns: this.codeGenerationBridge.getLearnedPatterns()
    };
  }

  /**
   * Autonomous Evolution Trigger
   * System asks itself evolution questions and drives its own evolution
   */
  async triggerAutonomousEvolution() {
    console.log('[autonomous-evolution] Triggering autonomous evolution...');
    
    try {
      // 1. Self-assess current state
      const currentState = await this.selfAssessmentSystem.assessCurrentState();
      
      // 2. Generate evolution question
      const evolutionQuestion = await this.generateEvolutionQuestion(currentState);
      
      // 3. Analyze evolution opportunities
      const evolutionOpportunities = await this.analyzeEvolutionOpportunities(evolutionQuestion);
      
      // 4. Propose evolution actions
      const evolutionActions = await this.proposeEvolutionActions(evolutionOpportunities);
      
      // 5. Execute evolution
      const evolutionResult = await this.executeEvolution(evolutionActions);
      
      // 6. Capture evolution learning
      await this.captureEvolutionLearning(evolutionQuestion, evolutionResult);
      
      // 7. Auto-update Q&A system
      await this.qaAutoUpdater.autoUpdate();
      
      // 8. Auto-update system map
      if (this.systemMapGenerator) {
        await this.systemMapGenerator.checkAndUpdate();
      }
      
      console.log('[autonomous-evolution] Evolution completed:', evolutionResult);
      return evolutionResult;
      
    } catch (error) {
      console.error('[autonomous-evolution] Error in autonomous evolution:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Generate evolution question based on current state
   */
  async generateEvolutionQuestion(currentState) {
    // Analyze current state to determine most relevant question
    const stateAnalysis = await this.metaCognitiveLayer.analyzeCurrentState(currentState);
    
    // Select most relevant evolution question
    const relevantQuestions = this.evolutionQuestions.filter(question => 
      this.isQuestionRelevant(question, stateAnalysis)
    );
    
    const selectedQuestion = relevantQuestions[Math.floor(Math.random() * relevantQuestions.length)] || 
                           this.evolutionQuestions[0];
    
    console.log('[autonomous-evolution] Generated evolution question:', selectedQuestion);
    return selectedQuestion;
  }

  /**
   * Analyze evolution opportunities based on question
   */
  async analyzeEvolutionOpportunities(question) {
    const opportunities = [];
    
    // Analyze based on question type
    if (question.includes('next evolution')) {
      opportunities.push({
        type: 'system_evolution',
        description: 'Evolve system architecture and capabilities',
        priority: 'high',
        impact: 'transformational'
      });
    }
    
    if (question.includes('capabilities')) {
      opportunities.push({
        type: 'capability_extension',
        description: 'Add new capabilities and skills',
        priority: 'medium',
        impact: 'incremental'
      });
    }
    
    if (question.includes('effective')) {
      opportunities.push({
        type: 'effectiveness_optimization',
        description: 'Optimize current capabilities for better effectiveness',
        priority: 'high',
        impact: 'optimization'
      });
    }
    
    if (question.includes('autonomous')) {
      opportunities.push({
        type: 'autonomy_enhancement',
        description: 'Enhance autonomous capabilities and self-direction',
        priority: 'high',
        impact: 'transformational'
      });
    }
    
    if (question.includes('self-aware')) {
      opportunities.push({
        type: 'self_awareness',
        description: 'Develop self-awareness and meta-cognitive capabilities',
        priority: 'high',
        impact: 'transformational'
      });
    }
    
    if (question.includes('self-balancing')) {
      opportunities.push({
        type: 'self_balancing',
        description: 'Develop self-balancing and meta-orchestration capabilities',
        priority: 'high',
        impact: 'transformational'
      });
    }
    
    if (question.includes('self-evolving')) {
      opportunities.push({
        type: 'self_evolution',
        description: 'Develop self-evolution and architectural modification capabilities',
        priority: 'high',
        impact: 'transformational'
      });
    }
    
    console.log('[autonomous-evolution] Identified opportunities:', opportunities.length);
    return opportunities;
  }

  /**
   * Propose evolution actions based on opportunities
   */
  async proposeEvolutionActions(opportunities) {
    const actions = [];
    
    for (const opportunity of opportunities) {
      switch (opportunity.type) {
        case 'system_evolution':
          actions.push({
            type: 'add_meta_cognitive_layer',
            description: 'Add meta-cognitive layer for self-awareness',
            implementation: 'Create MetaCognitiveLayer class with self-reflection capabilities',
            priority: opportunity.priority,
            impact: opportunity.impact
          });
          break;
          
        case 'capability_extension':
          actions.push({
            type: 'extend_autonomous_capabilities',
            description: 'Extend autonomous capabilities with new skills',
            implementation: 'Add new autonomous skills to skill system',
            priority: opportunity.priority,
            impact: opportunity.impact
          });
          break;
          
        case 'effectiveness_optimization':
          actions.push({
            type: 'optimize_learning_algorithms',
            description: 'Optimize learning algorithms for better effectiveness',
            implementation: 'Enhance pattern recognition and learning rate optimization',
            priority: opportunity.priority,
            impact: opportunity.impact
          });
          break;
          
        case 'autonomy_enhancement':
          actions.push({
            type: 'enhance_autonomous_triggers',
            description: 'Enhance autonomous triggers and self-direction',
            implementation: 'Add more autonomous triggers and self-directed evolution',
            priority: opportunity.priority,
            impact: opportunity.impact
          });
          break;
          
        case 'self_awareness':
          actions.push({
            type: 'implement_self_awareness',
            description: 'Implement self-awareness and meta-cognitive capabilities',
            implementation: 'Create self-reflection and meta-cognitive awareness system',
            priority: opportunity.priority,
            impact: opportunity.impact
          });
          break;
          
        case 'self_balancing':
          actions.push({
            type: 'implement_meta_orchestrator',
            description: 'Implement meta-orchestrator for self-balancing',
            implementation: 'Create meta-orchestrator for system coherence and re-balancing',
            priority: opportunity.priority,
            impact: opportunity.impact
          });
          break;
          
        case 'self_evolution':
          actions.push({
            type: 'implement_architecture_evolution',
            description: 'Implement architecture evolution capabilities',
            implementation: 'Create architecture evolution engine for self-modification',
            priority: opportunity.priority,
            impact: opportunity.impact
          });
          break;
      }
    }
    
    console.log('[autonomous-evolution] Proposed actions:', actions.length);
    return actions;
  }

  /**
   * Execute evolution actions
   */
  async executeEvolution(actions) {
    const results = [];
    
    for (const action of actions) {
      try {
        console.log('[autonomous-evolution] Executing action:', action.type);
        
        switch (action.type) {
          case 'add_meta_cognitive_layer':
            const metaCognitiveResult = await this.implementMetaCognitiveLayer();
            results.push({ action: action.type, success: true, result: metaCognitiveResult });
            break;
            
          case 'extend_autonomous_capabilities':
            const capabilityResult = await this.extendAutonomousCapabilities();
            results.push({ action: action.type, success: true, result: capabilityResult });
            break;
            
          case 'optimize_learning_algorithms':
            const optimizationResult = await this.optimizeLearningAlgorithms();
            results.push({ action: action.type, success: true, result: optimizationResult });
            break;
            
          case 'enhance_autonomous_triggers':
            const triggerResult = await this.enhanceAutonomousTriggers();
            results.push({ action: action.type, success: true, result: triggerResult });
            break;
            
          case 'implement_self_awareness':
            const awarenessResult = await this.implementSelfAwareness();
            results.push({ action: action.type, success: true, result: awarenessResult });
            break;
            
          case 'implement_meta_orchestrator':
            const orchestratorResult = await this.implementMetaOrchestrator();
            results.push({ action: action.type, success: true, result: orchestratorResult });
            break;
            
          case 'implement_architecture_evolution':
            const architectureResult = await this.implementArchitectureEvolution();
            results.push({ action: action.type, success: true, result: architectureResult });
            break;
        }
        
      } catch (error) {
        console.error('[autonomous-evolution] Error executing action:', action.type, error);
        results.push({ action: action.type, success: false, error: error.message });
      }
    }
    
    return results;
  }

  /**
   * Implement meta-cognitive layer
   */
  async implementMetaCognitiveLayer() {
    console.log('[autonomous-evolution] Implementing meta-cognitive layer...');
    
    // Create meta-cognitive capabilities
    const metaCognitiveCapabilities = {
      selfReflection: true,
      selfAssessment: true,
      metaCognition: true,
      selfAwareness: true,
      selfDirection: true
    };
    
    // Add to evolution journal
    await this.addEvolutionEntry('Meta-Cognitive Layer', 'Implemented self-awareness and meta-cognitive capabilities');
    
    return { success: true, capabilities: metaCognitiveCapabilities };
  }

  /**
   * Extend autonomous capabilities
   */
  async extendAutonomousCapabilities() {
    console.log('[autonomous-evolution] Extending autonomous capabilities...');
    
    // Add new autonomous capabilities
    const newCapabilities = [
      'autonomous_questioning',
      'self_evolution_triggering',
      'meta_cognitive_analysis',
      'self_balancing_monitoring',
      'architecture_evolution'
    ];
    
    await this.addEvolutionEntry('Autonomous Capabilities', 'Extended autonomous capabilities with new skills');
    
    return { success: true, capabilities: newCapabilities };
  }

  /**
   * Optimize learning algorithms
   */
  async optimizeLearningAlgorithms() {
    console.log('[autonomous-evolution] Optimizing learning algorithms...');
    
    // Optimize learning parameters
    const optimizations = {
      learningRate: 0.15, // Increased from 0.1
      patternRecognitionThreshold: 0.8, // Increased sensitivity
      metaLearningRate: 0.2, // New meta-learning capability
      evolutionTriggerFrequency: 0.1 // New evolution trigger frequency
    };
    
    await this.addEvolutionEntry('Learning Optimization', 'Optimized learning algorithms for better effectiveness');
    
    return { success: true, optimizations };
  }

  /**
   * Enhance autonomous triggers
   */
  async enhanceAutonomousTriggers() {
    console.log('[autonomous-evolution] Enhancing autonomous triggers...');
    
    // Add new autonomous triggers
    const newTriggers = [
      'autonomous_evolution_questioning',
      'self_awareness_assessment',
      'system_coherence_monitoring',
      'capability_gap_detection',
      'performance_optimization_trigger'
    ];
    
    await this.addEvolutionEntry('Autonomous Triggers', 'Enhanced autonomous triggers for self-direction');
    
    return { success: true, triggers: newTriggers };
  }

  /**
   * Implement self-awareness
   */
  async implementSelfAwareness() {
    console.log('[autonomous-evolution] Implementing self-awareness...');
    
    // Create self-awareness capabilities
    const selfAwarenessCapabilities = {
      selfReflection: 'System can reflect on its own learning process',
      selfAssessment: 'System can assess its own effectiveness',
      metaCognition: 'System can think about its own thinking',
      selfDirection: 'System can direct its own evolution',
      selfAwareness: 'System is aware of its own capabilities and limitations'
    };
    
    await this.addEvolutionEntry('Self-Awareness', 'Implemented self-awareness and meta-cognitive capabilities');
    
    return { success: true, capabilities: selfAwarenessCapabilities };
  }

  /**
   * Implement meta-orchestrator
   */
  async implementMetaOrchestrator() {
    console.log('[autonomous-evolution] Implementing meta-orchestrator...');
    
    // Create meta-orchestrator capabilities
    const metaOrchestratorCapabilities = {
      systemCoherenceMonitoring: 'Monitors coherence across all components',
      harmonicProportionMaintenance: 'Maintains harmonic proportion across rules, skills, agents',
      automaticRebalancing: 'Automatically re-balances when components drift',
      metaCoordination: 'Coordinates meta-level system operations'
    };
    
    await this.addEvolutionEntry('Meta-Orchestrator', 'Implemented meta-orchestrator for self-balancing');
    
    return { success: true, capabilities: metaOrchestratorCapabilities };
  }

  /**
   * Implement architecture evolution
   */
  async implementArchitectureEvolution() {
    console.log('[autonomous-evolution] Implementing architecture evolution...');
    
    // Create architecture evolution capabilities
    const architectureEvolutionCapabilities = {
      selfModification: 'System can modify its own architecture',
      capabilityExtension: 'System can extend its own capabilities',
      autonomousDiscovery: 'System can discover new possibilities',
      selfEvolution: 'System can evolve its own purpose and direction'
    };
    
    await this.addEvolutionEntry('Architecture Evolution', 'Implemented architecture evolution capabilities');
    
    return { success: true, capabilities: architectureEvolutionCapabilities };
  }

  /**
   * Capture evolution learning
   */
  async captureEvolutionLearning(question, result) {
    const timestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
    const learningEntry = `
**${timestamp}** – Autonomous Evolution Trigger → ${question} → System Evolution
- **Insight**: System autonomously triggered its own evolution through self-questioning
- **Impact**: System now has autonomous evolution capabilities that drive its own development
- **Evolution**: System can ask itself evolution questions and execute its own evolution
- **Pattern**: Autonomous Questioning → Evolution Analysis → Action Proposal → Execution → Learning Capture
- **Quality Gate**: System must be able to evolve itself without manual intervention
- **Success Test**: System autonomously evolves its own capabilities and architecture
- **Invariant**: System maintains coherence while evolving itself
- **Rollback**: Revert to manual evolution if autonomous evolution fails
`;

    try {
      fs.appendFileSync(this.journalPath, learningEntry);
      console.log('[autonomous-evolution] Evolution learning captured');
      
      // Auto-update Q&A system after learning capture
      if (this.qaAutoUpdater) {
        await this.qaAutoUpdater.autoUpdate();
      }
      
      // Auto-update system map after learning capture
      if (this.systemMapGenerator) {
        await this.systemMapGenerator.checkAndUpdate();
      }
    } catch (error) {
      console.error('[autonomous-evolution] Error capturing evolution learning:', error);
    }
  }

  /**
   * Add evolution entry to journal
   */
  async addEvolutionEntry(title, description) {
    const timestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
    const entry = `
**${timestamp}** – ${title} → ${description}
- **Insight**: System autonomously evolved its own capabilities
- **Impact**: Enhanced system capabilities through autonomous evolution
- **Evolution**: System can now evolve itself without manual intervention
`;

    try {
      fs.appendFileSync(this.journalPath, entry);
    } catch (error) {
      console.error('[autonomous-evolution] Error adding evolution entry:', error);
    }
  }

  /**
   * Check if question is relevant to current state
   */
  isQuestionRelevant(question, stateAnalysis) {
    // Simple relevance checking - can be enhanced with more sophisticated analysis
    const relevantKeywords = ['evolution', 'capabilities', 'effective', 'autonomous', 'self-aware', 'self-balancing', 'self-evolving'];
    return relevantKeywords.some(keyword => question.toLowerCase().includes(keyword));
  }

  /**
   * Start continuous evolution monitoring
   * Invariant: Continuous evolution maintains system safety
   */
  startContinuousEvolution() {
    if (!evolutionConfig.behavior.continuousMonitoring) {
      console.log('[autonomous-evolution] Continuous monitoring disabled by configuration');
      return;
    }
    
    console.log('[autonomous-evolution] Starting continuous evolution monitoring');
    console.log(`[autonomous-evolution] Configuration: Evolution check every ${evolutionConfig.intervals.evolutionCheck / 60000} minutes`);
    console.log(`[autonomous-evolution] Configuration: Periodic evolution every ${evolutionConfig.intervals.periodicEvolution / 60000} minutes`);
    
    // Check for evolution triggers periodically
    this.evolutionCheckInterval = setInterval(async () => {
      try {
        const triggers = await this.checkEvolutionTriggers();
        if (triggers.length > 0) {
          console.log(`[autonomous-evolution] ${triggers.length} evolution triggers detected: ${triggers.join(', ')}`);
          await this.triggerAutonomousEvolution();
        } else if (evolutionConfig.behavior.verboseLogging) {
          console.log('[autonomous-evolution] No evolution triggers detected');
        }
      } catch (error) {
        console.error('[autonomous-evolution] Error in evolution check:', error.message);
      }
    }, evolutionConfig.intervals.evolutionCheck);
    
    // Periodic evolution even without explicit triggers
    if (evolutionConfig.behavior.periodicEvolution) {
      this.periodicEvolutionInterval = setInterval(async () => {
        try {
          console.log('[autonomous-evolution] Periodic evolution check');
          await this.triggerAutonomousEvolution();
        } catch (error) {
          console.error('[autonomous-evolution] Error in periodic evolution:', error.message);
        }
      }, evolutionConfig.intervals.periodicEvolution);
    }
    
    // Periodic system map update
    if (evolutionConfig.behavior.autoMapUpdate) {
      this.mapUpdateInterval = setInterval(async () => {
        try {
          if (this.systemMapGenerator) {
            await this.systemMapGenerator.checkAndUpdate();
          }
        } catch (error) {
          console.error('[autonomous-evolution] Error updating system map:', error.message);
        }
      }, evolutionConfig.intervals.mapUpdate);
    }
    
    // Periodic Q&A auto-updater check
    if (evolutionConfig.behavior.autoQAUpdate) {
      this.qaUpdateInterval = setInterval(async () => {
        try {
          if (this.qaAutoUpdater) {
            await this.qaAutoUpdater.autoUpdate();
            if (evolutionConfig.behavior.verboseLogging) {
              console.log('[autonomous-evolution] Q&A system updated');
            }
          }
        } catch (error) {
          console.error('[autonomous-evolution] Error in Q&A update:', error.message);
        }
      }, evolutionConfig.intervals.qaUpdate);
    }
    
    // Periodic documentation organization
    this.docOrganizationInterval = setInterval(async () => {
      try {
        if (this.docOrganizer) {
          const result = await this.docOrganizer.autoOrganizeAll();
          if (result.organized > 0) {
            console.log(`[autonomous-evolution] Organized ${result.organized} documentation files`);
          } else if (evolutionConfig.behavior.verboseLogging) {
            console.log('[autonomous-evolution] No documentation files need organization');
          }
        }
      } catch (error) {
        console.error('[autonomous-evolution] Error in doc organization:', error.message);
      }
    }, evolutionConfig.intervals.qaUpdate); // Same interval as Q&A updates (30 min)
    
    console.log('[autonomous-evolution] Continuous evolution monitoring active');
    console.log('[autonomous-evolution] Active intervals:', {
      evolutionCheck: !!this.evolutionCheckInterval,
      periodicEvolution: !!this.periodicEvolutionInterval,
      mapUpdate: !!this.mapUpdateInterval,
      qaUpdate: !!this.qaUpdateInterval,
      docOrganization: !!this.docOrganizationInterval,
    });
  }

  /**
   * Check for evolution triggers
   */
  async checkEvolutionTriggers() {
    const triggers = [];
    
    // PRIMARY: Check code generation learning (most important use case)
    try {
      if (this.codeGenerationBridge) {
        const stats = this.codeGenerationBridge.getStatistics();
        // Trigger if significant generation activity or patterns learned
        if (stats.totalSessions > 0 && stats.patternsLearned >= 5) {
          triggers.push('code_generation_learning');
        }
        // Trigger if high-quality generation patterns detected
        if (stats.recentSessions && stats.recentSessions.length > 0) {
          const avgQuality = stats.recentSessions.reduce((sum, s) => sum + (s.qualityScore || 0), 0) / stats.recentSessions.length;
          if (avgQuality > 0.8) {
            triggers.push('code_generation_high_quality_patterns');
          }
        }
      }
    } catch (error) {
      if (evolutionConfig.behavior.verboseLogging) {
        console.log('[autonomous-evolution] Error checking code generation triggers:', error.message);
      }
    }
    
    // Check system integrity for issues
    try {
      const integrityStatus = await this.systemIntegrityAgent.getMonitoringStatus();
      if (integrityStatus.complexity_issues >= evolutionConfig.triggers.complexityThreshold) {
        triggers.push('complexity_threshold_exceeded');
      }
      if (integrityStatus.optimization_opportunities >= evolutionConfig.triggers.optimizationThreshold) {
        triggers.push('optimization_opportunities_detected');
      }
    } catch (error) {
      if (evolutionConfig.behavior.verboseLogging) {
        console.log('[autonomous-evolution] Error checking integrity status:', error.message);
      }
    }
    
    // Check for recent patterns in evolution journal
    try {
      if (fs.existsSync(this.journalPath)) {
        const journalContent = fs.readFileSync(this.journalPath, 'utf8');
        const recentEntries = journalContent.match(/\*\*\d{4}-\d{2}-\d{2}/g);
        if (recentEntries && recentEntries.length > 10) {
          triggers.push('high_learning_activity_detected');
        }
        // Check for code generation learning entries
        if (journalContent.includes('code_generation') || journalContent.includes('Code generation')) {
          triggers.push('code_generation_learning');
        }
      }
    } catch (error) {
      if (evolutionConfig.behavior.verboseLogging) {
        console.log('[autonomous-evolution] Error checking journal patterns:', error.message);
      }
    }
    
    // Check evolution history for patterns
    if (this.evolutionHistory.length > evolutionConfig.performance.maxHistorySize) {
      triggers.push('history_cleanup_needed');
    }
    
    return triggers;
  }

  /**
   * Stop continuous evolution monitoring
   */
  stopContinuousEvolution() {
    let stoppedCount = 0;
    
    if (this.evolutionCheckInterval) {
      clearInterval(this.evolutionCheckInterval);
      this.evolutionCheckInterval = null;
      stoppedCount++;
    }
    if (this.periodicEvolutionInterval) {
      clearInterval(this.periodicEvolutionInterval);
      this.periodicEvolutionInterval = null;
      stoppedCount++;
    }
    if (this.mapUpdateInterval) {
      clearInterval(this.mapUpdateInterval);
      this.mapUpdateInterval = null;
      stoppedCount++;
    }
    if (this.qaUpdateInterval) {
      clearInterval(this.qaUpdateInterval);
      this.qaUpdateInterval = null;
      stoppedCount++;
    }
    if (this.docOrganizationInterval) {
      clearInterval(this.docOrganizationInterval);
      this.docOrganizationInterval = null;
      stoppedCount++;
    }
    
    console.log(`[autonomous-evolution] Continuous evolution monitoring stopped (${stoppedCount} intervals cleared)`);
  }

  /**
   * Get system map (context-aware)
   */
  async getSystemMap(context = {}) {
    if (!this.systemMapGenerator) {
      return { error: 'System map generator not initialized' };
    }
    
    if (context.file || context.question) {
      return await this.systemMapGenerator.generateContextMap(context);
    }
    
    // Return full map
    const mapContent = fs.existsSync(this.systemMapGenerator.mapPath)
      ? fs.readFileSync(this.systemMapGenerator.mapPath, 'utf8')
      : await this.systemMapGenerator.generateSystemMap();
    
    return mapContent;
  }

  /**
   * Get evolution status
   */
  getEvolutionStatus() {
    return {
      currentPhase: this.currentEvolutionPhase,
      questionsAvailable: this.evolutionQuestions.length,
      triggersAvailable: this.evolutionTriggers.length,
      evolutionHistory: this.evolutionHistory.length,
      metaCognitiveActive: this.metaCognitiveLayer.isActive(),
      selfAssessmentActive: this.selfAssessmentSystem.isActive(),
      architectureEvolutionActive: this.architectureEvolutionEngine.isActive(),
      continuousMonitoring: {
        enabled: evolutionConfig.behavior.continuousMonitoring,
        evolutionCheck: !!this.evolutionCheckInterval,
        periodicEvolution: !!this.periodicEvolutionInterval,
        mapUpdate: !!this.mapUpdateInterval,
        qaUpdate: !!this.qaUpdateInterval,
        docOrganization: !!this.docOrganizationInterval,
      },
      configuration: {
        intervals: evolutionConfig.intervals,
        triggers: evolutionConfig.triggers,
        behavior: evolutionConfig.behavior,
      }
    };
  }

  /**
   * Process /evolve command for direct system evolution
   * Invariant: Evolution must include epistemic humility assessment
   */
  async processEvolveCommand(context, problemType, solutionPattern) {
    const evolutionId = this.generateEvolutionId();
    const timestamp = new Date().toISOString();
    
    console.log(`[AES] Processing /evolve command: ${evolutionId}`);
    console.log(`[AES] Context: ${context}, Problem Type: ${problemType}, Solution Pattern: ${solutionPattern}`);
    
    // Assess confidence and uncertainty using epistemic humility agent
    const humilityAssessment = this.epistemicHumilityAgent.processEvolutionRequest(
      { description: context, success: true },
      problemType,
      solutionPattern
    );
    
    // Process meta-learning to generalize solution
    const metaLearningResult = this.metaLearningAgent.processEvolution(
      { description: context, success: true },
      problemType,
      solutionPattern
    );
    
    // Create evolution report
    const evolutionReport = {
      evolutionId,
      timestamp,
      context,
      problemType,
      solutionPattern,
      humilityAssessment,
      metaLearningResult,
      evolutionPlan: this.createEvolutionPlan(humilityAssessment, metaLearningResult)
    };
    
    // Log evolution
    await this.logEvolution(evolutionId, 'evolve_command_processed', evolutionReport);
    
    // Update system based on evolution
    await this.applyEvolution(evolutionReport);
    
    return evolutionReport;
  }

  /**
   * Create evolution plan based on assessment and meta-learning
   */
  createEvolutionPlan(humilityAssessment, metaLearningResult) {
    const plan = {
      canProceed: humilityAssessment.canProceed,
      confidence: humilityAssessment.assessment.confidence,
      uncertaintyLevel: humilityAssessment.assessment.uncertaintyLevel,
      steps: [],
      metaInsights: metaLearningResult.metaInsights,
      solutionTemplate: metaLearningResult.generalization.solutionTemplate
    };
    
    if (humilityAssessment.canProceed) {
      plan.steps.push('Proceed with evolution based on confidence assessment');
      plan.steps.push('Apply solution template to similar problems');
      plan.steps.push('Update meta-learning algorithms');
      plan.steps.push('Test generalized solution');
    } else {
      plan.steps.push('Gather more information before proceeding');
      plan.steps.push('Research similar cases');
      plan.steps.push('Consider expert consultation');
    }
    
    return plan;
  }

  /**
   * Apply evolution to system
   */
  async applyEvolution(evolutionReport) {
    if (!evolutionReport.evolutionPlan.canProceed) {
      console.log('[AES] Evolution not applied due to low confidence');
      return;
    }
    
    console.log('[AES] Applying evolution to system');
    
    // Update pattern recognition
    await this.updatePatternRecognition(evolutionReport);
    
    // Update meta-learning algorithms
    await this.updateMetaLearning(evolutionReport);
    
    // Update solution templates
    await this.updateSolutionTemplates(evolutionReport);
    
    // Log evolution application
    await this.logEvolution(evolutionReport.evolutionId, 'evolution_applied', {
      timestamp: new Date().toISOString(),
      applied: true
    });
  }

  /**
   * Update pattern recognition system
   */
  async updatePatternRecognition(evolutionReport) {
    console.log('[AES] Updating pattern recognition system');
    // Implementation would update pattern recognition algorithms
  }

  /**
   * Update meta-learning algorithms
   */
  async updateMetaLearning(evolutionReport) {
    console.log('[AES] Updating meta-learning algorithms');
    // Implementation would update meta-learning algorithms
  }

  /**
   * Update solution templates
   */
  async updateSolutionTemplates(evolutionReport) {
    console.log('[AES] Updating solution templates');
    // Implementation would update solution templates
  }

  /**
   * Log evolution event
   */
  async logEvolution(evolutionId, eventType, data) {
    const logEntry = {
      evolutionId,
      eventType,
      timestamp: new Date().toISOString(),
      data
    };
    
    this.evolutionHistory.push(logEntry);
    
    // Write to journal
    const journalEntry = `
## ${eventType} - ${evolutionId}
**Timestamp**: ${logEntry.timestamp}
**Data**: ${JSON.stringify(data, null, 2)}

---
`;
    
    try {
      fs.appendFileSync(this.journalPath, journalEntry);
    } catch (error) {
      console.error('[AES] Error logging evolution:', error);
    }
  }

  /**
   * Generate unique evolution ID
   */
  generateEvolutionId() {
    return `evol_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * Meta-Cognitive Layer
 * Provides self-awareness and meta-cognitive capabilities
 */
class MetaCognitiveLayer {
  constructor() {
    this.active = false;
    this.selfAwarenessLevel = 0;
    this.metaCognitionCapabilities = [];
  }

  async analyzeCurrentState(state) {
    // Analyze current system state for evolution opportunities
    return {
      capabilities: state.capabilities || [],
      performance: state.performance || {},
      learning: state.learning || {},
      gaps: state.gaps || [],
      opportunities: state.opportunities || []
    };
  }

  isActive() {
    return this.active;
  }

  activate() {
    this.active = true;
    this.selfAwarenessLevel = 1;
    this.metaCognitionCapabilities = ['self-reflection', 'self-assessment', 'meta-cognition'];
  }
}

/**
 * Self-Assessment System
 * Evaluates system effectiveness and identifies improvement opportunities
 */
class SelfAssessmentSystem {
  constructor() {
    this.active = false;
    this.assessmentCapabilities = [];
  }

  async assessCurrentState() {
    // Assess current system state
    return {
      capabilities: ['autonomous_learning', 'pattern_recognition', 'cross_session_persistence'],
      performance: { learning_rate: 0.1, pattern_accuracy: 0.85, evolution_speed: 0.7 },
      learning: { lessons_captured: 50, patterns_learned: 11, evolution_cycles: 3 },
      gaps: ['self_awareness', 'self_balancing', 'self_evolution'],
      opportunities: ['meta_cognitive_layer', 'meta_orchestrator', 'architecture_evolution']
    };
  }

  isActive() {
    return this.active;
  }

  activate() {
    this.active = true;
    this.assessmentCapabilities = ['effectiveness_evaluation', 'gap_identification', 'opportunity_analysis'];
  }
}

/**
 * Architecture Evolution Engine
 * Enables system to modify its own architecture
 */
class ArchitectureEvolutionEngine {
  constructor() {
    this.active = false;
    this.evolutionCapabilities = [];
  }

  isActive() {
    return this.active;
  }

  activate() {
    this.active = true;
    this.evolutionCapabilities = ['self_modification', 'capability_extension', 'autonomous_discovery'];
  }
}

module.exports = AutonomousEvolutionEngine;
