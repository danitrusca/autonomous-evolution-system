/**
 * System Check Agent
 * 
 * Autonomous agent for comprehensive system health monitoring and optimization.
 * Provides continuous health checks, intelligent recommendations, and autonomous learning.
 * 
 * ## Overview
 * 
 * The **System Check Agent** is an autonomous monitoring system that provides comprehensive 
 * health checks, intelligent recommendations, and continuous learning for the Autonomous 
 * Evolution System. It builds upon the existing System Integrity Agent to provide enhanced 
 * monitoring capabilities and autonomous optimization.
 * 
 * ## Key Capabilities
 * 
 * ### 🔍 **Comprehensive Health Monitoring**
 * - **Continuous Monitoring**: Performs health checks every 5 minutes
 * - **Multi-Component Analysis**: Monitors core system, psychological system, documentation, ECP integration, and file structure
 * - **Real-Time Status**: Provides up-to-date system health information
 * - **Historical Tracking**: Maintains health history for trend analysis
 * 
 * ### 🧠 **Intelligent Learning System**
 * - **Pattern Recognition**: Learns from recurring issues and patterns
 * - **Adaptive Recommendations**: Improves recommendations based on historical data
 * - **Autonomous Learning**: Continuously improves without human intervention
 * - **Knowledge Persistence**: Maintains learning data across sessions
 * 
 * ### 💡 **Smart Recommendation Engine**
 * - **Context-Aware Suggestions**: Provides recommendations based on current system state
 * - **Priority-Based Actions**: Categorizes recommendations by priority and impact
 * - **Learning-Enhanced**: Recommendations improve over time based on learning data
 * - **Actionable Insights**: Provides specific, implementable recommendations
 * 
 * ### 📊 **Performance Metrics & Analytics**
 * - **Comprehensive Metrics**: Tracks checks performed, issues detected, recommendations generated
 * - **Learning Analytics**: Monitors learning patterns and insights
 * - **Performance Monitoring**: Tracks agent performance and effectiveness
 * - **Trend Analysis**: Identifies patterns in system health over time
 * 
 * ## Architecture
 * 
 * ### Core Components
 * 
 * ```
 * SystemCheckAgent
 * ├── HealthMonitor
 * │   ├── SystemHealthCheck Integration
 * │   ├── SystemIntegrityAgent Integration
 * │   └── Continuous Monitoring Engine
 * ├── LearningEngine
 * │   ├── Pattern Recognition
 * │   ├── Knowledge Persistence
 * │   └── Adaptive Learning
 * ├── RecommendationEngine
 * │   ├── Context Analysis
 * │   ├── Priority Assessment
 * │   └── Action Generation
 * ├── PerformanceTracker
 * │   ├── Metrics Collection
 * │   ├── Analytics Engine
 * │   └── Trend Analysis
 * └── CoordinationInterface
 *     ├── Agent Coordinator Integration
 *     ├── Status Reporting
 *     └── Command Interface
 * ```
 * 
 * ## Usage Examples
 * 
 * ### Basic Agent Initialization
 * ```javascript
 * const SystemCheckAgent = require('./agents/system-check-agent');
 * const agent = new SystemCheckAgent(); // Automatically starts monitoring
 * ```
 * 
 * ### Get Agent Status
 * ```javascript
 * const status = agent.getAgentStatus();
 * console.log('Agent Status:', status);
 * ```
 * 
 * ### Get Health Report
 * ```javascript
 * const report = await agent.getHealthReport();
 * console.log('Health Report:', report);
 * ```
 * 
 * ## Configuration
 * 
 * ### Monitoring Intervals
 * ```javascript
 * const monitoringConfig = {
 *   healthCheckInterval: 300000,  // 5 minutes
 *   learningUpdateInterval: 600000, // 10 minutes
 *   reportGenerationInterval: 3600000 // 1 hour
 * };
 * ```
 * 
 * ### Learning Thresholds
 * ```javascript
 * const learningConfig = {
 *   patternFrequencyThreshold: 5,  // Minimum occurrences to learn pattern
 *   impactWeights: {
 *     critical: 1.0,
 *     high: 0.8,
 *     medium: 0.6,
 *     low: 0.4
 *   },
 *   learningPersistence: true
 * };
 * ```
 * 
 * ## Integration Points
 * 
 * - **System Health Check**: Uses existing health check infrastructure
 * - **System Integrity Agent**: Collaborates for comprehensive analysis
 * - **Agent Coordinator**: Participates in multi-agent coordination
 * - **Learning System**: Feeds insights into autonomous learning
 * - **Monitoring System**: Provides data to monitoring infrastructure
 * 
 * ## Benefits
 * 
 * ### 🎯 **Proactive System Management**
 * - **Early Issue Detection**: Identifies problems before they become critical
 * - **Continuous Monitoring**: Provides ongoing system health visibility
 * - **Predictive Insights**: Learns patterns to predict future issues
 * 
 * ### 🧠 **Autonomous Learning & Improvement**
 * - **Pattern Recognition**: Automatically learns from system behavior
 * - **Adaptive Recommendations**: Improves suggestions based on experience
 * - **Knowledge Persistence**: Maintains learning across sessions
 * - **Self-Optimization**: Continuously improves monitoring effectiveness
 * 
 * ### 📊 **Data-Driven Decision Making**
 * - **Comprehensive Metrics**: Provides detailed performance analytics
 * - **Trend Analysis**: Identifies long-term system health patterns
 * - **Quantified Insights**: Offers measurable system health indicators
 * - **Historical Context**: Maintains system health history
 * 
 * ### 🤝 **Seamless Integration**
 * - **Multi-Agent Coordination**: Works with other system agents
 * - **Existing System Integration**: Builds upon current health check infrastructure
 * - **Minimal Overhead**: Efficient monitoring with low resource usage
 * - **Easy Configuration**: Simple setup and customization
 * 
 * Follows ECP principles for autonomous system monitoring and evolution.
 */

const fs = require('fs');
const path = require('path');
const SystemHealthCheck = require('../system-health-check');
const SystemIntegrityAgent = require('./system-integrity-agent');

class SystemCheckAgent {
  constructor() {
    this.agentName = 'SystemCheckAgent';
    this.agentVersion = '1.0.0';
    this.status = 'initializing';
    this.healthCheck = new SystemHealthCheck();
    this.systemIntegrityAgent = new SystemIntegrityAgent();
    this.monitoringInterval = null;
    this.healthHistory = [];
    this.learningData = new Map();
    this.recommendations = [];
    this.performanceMetrics = {
      checksPerformed: 0,
      issuesDetected: 0,
      recommendationsGenerated: 0,
      learningInsights: 0
    };
    
    this.initializeAgent();
  }

  /**
   * Initialize the system check agent
   * Invariant: Agent initialization maintains system safety
   */
  async initializeAgent() {
    console.log(`[${this.agentName}] Initializing system check agent v${this.agentVersion}`);
    
    try {
      // Set up monitoring paths
      this.setupMonitoringPaths();
      
      // Initialize learning data
      await this.initializeLearningData();
      
      // Perform initial health check
      await this.performInitialHealthCheck();
      
      // Start continuous monitoring
      this.startContinuousMonitoring();
      
      this.status = 'active';
      console.log(`[${this.agentName}] Agent initialized and monitoring active`);
      
    } catch (error) {
      console.error(`[${this.agentName}] Initialization failed:`, error.message);
      this.status = 'failed';
      throw error;
    }
  }

  /**
   * Set up monitoring paths and directories
   * Invariant: Path setup maintains system safety
   */
  setupMonitoringPaths() {
    this.monitoringPath = path.join(__dirname, '..', 'monitoring');
    this.reportsPath = path.join(__dirname, '..', 'reports');
    this.learningPath = path.join(__dirname, '..', 'learning');
    
    // Ensure directories exist
    [this.monitoringPath, this.reportsPath, this.learningPath].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`[${this.agentName}] Created directory: ${dir}`);
      }
    });
  }

  /**
   * Initialize learning data and patterns
   * Invariant: Learning initialization maintains system safety
   */
  async initializeLearningData() {
    console.log(`[${this.agentName}] Initializing learning data`);
    
    // Load existing learning data if available
    const learningFile = path.join(this.learningPath, 'system-check-learning.json');
    if (fs.existsSync(learningFile)) {
      try {
        const data = JSON.parse(fs.readFileSync(learningFile, 'utf8'));
        this.learningData = new Map(Object.entries(data));
        console.log(`[${this.agentName}] Loaded ${this.learningData.size} learning patterns`);
      } catch (error) {
        console.warn(`[${this.agentName}] Failed to load learning data:`, error.message);
      }
    }
    
    // Initialize default learning patterns
    this.initializeDefaultPatterns();
  }

  /**
   * Initialize default learning patterns
   * Invariant: Pattern initialization maintains system safety
   */
  initializeDefaultPatterns() {
    const defaultPatterns = {
      'high_complexity': {
        frequency: 0,
        impact: 'high',
        resolution: 'refactor',
        learned: false
      },
      'performance_bottleneck': {
        frequency: 0,
        impact: 'medium',
        resolution: 'optimize',
        learned: false
      },
      'missing_documentation': {
        frequency: 0,
        impact: 'low',
        resolution: 'document',
        learned: false
      },
      'unused_imports': {
        frequency: 0,
        impact: 'low',
        resolution: 'cleanup',
        learned: false
      }
    };
    
    for (const [pattern, data] of Object.entries(defaultPatterns)) {
      if (!this.learningData.has(pattern)) {
        this.learningData.set(pattern, data);
      }
    }
  }

  /**
   * Perform initial comprehensive health check
   * Invariant: Initial check maintains system safety
   */
  async performInitialHealthCheck() {
    console.log(`[${this.agentName}] Performing initial health check`);
    
    try {
      // Run comprehensive system health check
      const healthResults = await this.healthCheck.runFullCheck();
      
      // Run system integrity scan
      const integrityResults = await this.systemIntegrityAgent.performSystemScan();
      
      // Combine and analyze results
      const combinedResults = this.combineHealthResults(healthResults, integrityResults);
      
      // Store in health history
      this.healthHistory.push(combinedResults);
      
      // Generate recommendations
      await this.generateRecommendations(combinedResults);
      
      // Update performance metrics
      this.updatePerformanceMetrics(combinedResults);
      
      console.log(`[${this.agentName}] Initial health check completed`);
      console.log(`[${this.agentName}] Overall status: ${combinedResults.overall}`);
      console.log(`[${this.agentName}] Issues detected: ${combinedResults.totalIssues}`);
      console.log(`[${this.agentName}] Recommendations: ${this.recommendations.length}`);
      
      return combinedResults;
      
    } catch (error) {
      console.error(`[${this.agentName}] Initial health check failed:`, error.message);
      throw error;
    }
  }

  /**
   * Start continuous monitoring
   * Invariant: Continuous monitoring maintains system safety
   */
  startContinuousMonitoring() {
    console.log(`[${this.agentName}] Starting continuous monitoring`);
    
    // Monitor every 5 minutes
    this.monitoringInterval = setInterval(async () => {
      try {
        await this.performHealthCheck();
      } catch (error) {
        console.error(`[${this.agentName}] Monitoring error:`, error.message);
      }
    }, 300000); // 5 minutes
    
    console.log(`[${this.agentName}] Continuous monitoring active (5-minute intervals)`);
  }

  /**
   * Perform regular health check
   * Invariant: Health check maintains system safety
   */
  async performHealthCheck() {
    console.log(`[${this.agentName}] Performing scheduled health check`);
    
    try {
      // Run health check
      const healthResults = await this.healthCheck.runFullCheck();
      
      // Run integrity scan
      const integrityResults = await this.systemIntegrityAgent.performSystemScan();
      
      // Combine results
      const combinedResults = this.combineHealthResults(healthResults, integrityResults);
      
      // Store in history
      this.healthHistory.push(combinedResults);
      
      // Analyze for patterns
      await this.analyzeHealthPatterns(combinedResults);
      
      // Generate recommendations
      await this.generateRecommendations(combinedResults);
      
      // Update learning data
      await this.updateLearningData(combinedResults);
      
      // Update metrics
      this.updatePerformanceMetrics(combinedResults);
      
      // Save monitoring data
      await this.saveMonitoringData(combinedResults);
      
      console.log(`[${this.agentName}] Health check completed - Status: ${combinedResults.overall}`);
      
    } catch (error) {
      console.error(`[${this.agentName}] Health check failed:`, error.message);
    }
  }

  /**
   * Combine health check and integrity results
   * Invariant: Result combination maintains system safety
   */
  combineHealthResults(healthResults, integrityResults) {
    const combined = {
      timestamp: new Date().toISOString(),
      overall: healthResults.overall,
      components: {
        ...healthResults.components,
        integrity: {
          status: 'healthy',
          complexity_issues: integrityResults.complexity_issues.length,
          optimization_opportunities: integrityResults.optimization_opportunities.length,
          architectural_debt: integrityResults.architectural_debt.length,
          performance_bottlenecks: integrityResults.performance_bottlenecks.length,
          code_quality_issues: integrityResults.code_quality_issues.length
        }
      },
      totalIssues: this.calculateTotalIssues(healthResults, integrityResults),
      recommendations: [],
      learningInsights: []
    };
    
    return combined;
  }

  /**
   * Calculate total issues across all components
   * Invariant: Issue calculation maintains system safety
   */
  calculateTotalIssues(healthResults, integrityResults) {
    let total = 0;
    
    // Count health check issues
    if (healthResults.issues) {
      total += healthResults.issues.length;
    }
    
    // Count integrity issues
    total += integrityResults.complexity_issues.length;
    total += integrityResults.optimization_opportunities.length;
    total += integrityResults.architectural_debt.length;
    total += integrityResults.performance_bottlenecks.length;
    total += integrityResults.code_quality_issues.length;
    
    return total;
  }

  /**
   * Analyze health patterns for learning
   * Invariant: Pattern analysis maintains system safety
   */
  async analyzeHealthPatterns(results) {
    console.log(`[${this.agentName}] Analyzing health patterns`);
    
    // Analyze complexity patterns
    if (results.components.integrity) {
      const integrity = results.components.integrity;
      
      if (integrity.complexity_issues > 0) {
        this.recordPattern('high_complexity', integrity.complexity_issues);
      }
      
      if (integrity.performance_bottlenecks > 0) {
        this.recordPattern('performance_bottleneck', integrity.performance_bottlenecks);
      }
      
      if (integrity.code_quality_issues > 0) {
        this.recordPattern('missing_documentation', integrity.code_quality_issues);
      }
      
      if (integrity.optimization_opportunities > 0) {
        this.recordPattern('unused_imports', integrity.optimization_opportunities);
      }
    }
  }

  /**
   * Record pattern occurrence for learning
   * Invariant: Pattern recording maintains system safety
   */
  recordPattern(pattern, count) {
    if (this.learningData.has(pattern)) {
      const data = this.learningData.get(pattern);
      data.frequency += count;
      data.lastSeen = new Date().toISOString();
      
      // Mark as learned if frequency is high enough
      if (data.frequency > 5 && !data.learned) {
        data.learned = true;
        console.log(`[${this.agentName}] Pattern learned: ${pattern}`);
      }
      
      this.learningData.set(pattern, data);
    }
  }

  /**
   * Generate intelligent recommendations
   * Invariant: Recommendation generation maintains system safety
   */
  async generateRecommendations(results) {
    console.log(`[${this.agentName}] Generating recommendations`);
    
    const recommendations = [];
    
    // Generate recommendations based on health results
    if (results.components.core && results.components.core.status !== 'healthy') {
      recommendations.push({
        category: 'core_system',
        priority: 'critical',
        description: 'Core system issues detected',
        action: 'Investigate and fix core system problems',
        learned: this.learningData.get('core_system_issues')?.learned || false
      });
    }
    
    // Generate recommendations based on integrity results
    if (results.components.integrity) {
      const integrity = results.components.integrity;
      
      if (integrity.complexity_issues > 10) {
        recommendations.push({
          category: 'complexity',
          priority: 'high',
          description: 'High complexity detected',
          action: 'Refactor complex code to improve maintainability',
          learned: this.learningData.get('high_complexity')?.learned || false
        });
      }
      
      if (integrity.performance_bottlenecks > 5) {
        recommendations.push({
          category: 'performance',
          priority: 'medium',
          description: 'Performance bottlenecks detected',
          action: 'Optimize performance-critical code',
          learned: this.learningData.get('performance_bottleneck')?.learned || false
        });
      }
    }
    
    // Store recommendations
    this.recommendations = recommendations;
    
    console.log(`[${this.agentName}] Generated ${recommendations.length} recommendations`);
  }

  /**
   * Update learning data based on results
   * Invariant: Learning update maintains system safety
   */
  async updateLearningData(results) {
    console.log(`[${this.agentName}] Updating learning data`);
    
    // Save learning data to file
    const learningFile = path.join(this.learningPath, 'system-check-learning.json');
    const learningObject = Object.fromEntries(this.learningData);
    
    try {
      fs.writeFileSync(learningFile, JSON.stringify(learningObject, null, 2));
      console.log(`[${this.agentName}] Learning data saved`);
    } catch (error) {
      console.error(`[${this.agentName}] Failed to save learning data:`, error.message);
    }
  }

  /**
   * Update performance metrics
   * Invariant: Metrics update maintains system safety
   */
  updatePerformanceMetrics(results) {
    this.performanceMetrics.checksPerformed++;
    this.performanceMetrics.issuesDetected += results.totalIssues;
    this.performanceMetrics.recommendationsGenerated += this.recommendations.length;
    this.performanceMetrics.learningInsights = this.learningData.size;
  }

  /**
   * Save monitoring data
   * Invariant: Data saving maintains system safety
   */
  async saveMonitoringData(results) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `system-check-${timestamp}.json`;
    const filepath = path.join(this.monitoringPath, filename);
    
    const monitoringData = {
      ...results,
      agent: {
        name: this.agentName,
        version: this.agentVersion,
        status: this.status
      },
      performance: this.performanceMetrics,
      learning: Object.fromEntries(this.learningData)
    };
    
    try {
      fs.writeFileSync(filepath, JSON.stringify(monitoringData, null, 2));
      console.log(`[${this.agentName}] Monitoring data saved to ${filepath}`);
    } catch (error) {
      console.error(`[${this.agentName}] Failed to save monitoring data:`, error.message);
    }
  }

  /**
   * Get agent status
   * Invariant: Status reporting maintains system safety
   */
  getAgentStatus() {
    return {
      agent: this.agentName,
      version: this.agentVersion,
      status: this.status,
      checksPerformed: this.performanceMetrics.checksPerformed,
      issuesDetected: this.performanceMetrics.issuesDetected,
      recommendationsGenerated: this.performanceMetrics.recommendationsGenerated,
      learningInsights: this.performanceMetrics.learningInsights,
      lastCheck: this.healthHistory.length > 0 ? 
        this.healthHistory[this.healthHistory.length - 1].timestamp : null,
      recommendations: this.recommendations.length,
      learningPatterns: this.learningData.size
    };
  }

  /**
   * Stop monitoring
   * Invariant: Stop operation maintains system safety
   */
  stopMonitoring() {
    console.log(`[${this.agentName}] Stopping monitoring`);
    
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    
    this.status = 'stopped';
    console.log(`[${this.agentName}] Monitoring stopped`);
  }

  /**
   * Get comprehensive health report
   * Invariant: Report generation maintains system safety
   */
  async getHealthReport() {
    const latestHealth = this.healthHistory[this.healthHistory.length - 1];
    
    return {
      agent: this.getAgentStatus(),
      latestHealth: latestHealth,
      healthHistory: this.healthHistory.length,
      recommendations: this.recommendations,
      learningData: Object.fromEntries(this.learningData),
      performance: this.performanceMetrics
    };
  }
}

module.exports = SystemCheckAgent;
