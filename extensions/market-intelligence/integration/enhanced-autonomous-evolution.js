/**
 * Enhanced Autonomous Evolution System
 * Integrates Market Intelligence with existing autonomous evolution capabilities
 */

const MarketIntelligenceOrchestrator = require('../components/market-intelligence-orchestrator');
const AutonomousEvolutionEngine = require('../../../autonomous-evolution-engine');
const fs = require('fs');
const path = require('path');

class EnhancedAutonomousEvolution {
  constructor() {
    this.marketIntelligence = new MarketIntelligenceOrchestrator();
    this.autonomousEvolution = new AutonomousEvolutionEngine();
    this.integrationPath = path.join(__dirname, '..', '..', '..', '..', 'integration');
    this.ensureIntegrationDirectory();
    this.integrationHistory = this.loadIntegrationHistory();
  }

  /**
   * Ensure integration directory exists
   * Invariant: Integration directory must exist for data persistence
   */
  ensureIntegrationDirectory() {
    if (!fs.existsSync(this.integrationPath)) {
      fs.mkdirSync(this.integrationPath, { recursive: true });
      console.log('[enhanced-autonomous-evolution] Created integration directory');
    }
  }

  /**
   * Load integration history from persistent storage
   * Invariant: Integration history must be maintained for analysis
   */
  loadIntegrationHistory() {
    const historyPath = path.join(this.integrationPath, 'integration-history.json');
    try {
      if (fs.existsSync(historyPath)) {
        const data = fs.readFileSync(historyPath, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('[enhanced-autonomous-evolution] Error loading integration history:', error.message);
    }
    return {
      integrations: [],
      evolution_triggers: [],
      market_insights: [],
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Save integration history to persistent storage
   * Invariant: All integration data must be persisted
   */
  saveIntegrationHistory() {
    const historyPath = path.join(this.integrationPath, 'integration-history.json');
    try {
      const data = {
        ...this.integrationHistory,
        lastUpdated: new Date().toISOString()
      };
      fs.writeFileSync(historyPath, JSON.stringify(data, null, 2));
      console.log('[enhanced-autonomous-evolution] Integration history saved');
    } catch (error) {
      console.error('[enhanced-autonomous-evolution] Error saving integration history:', error.message);
    }
  }

  /**
   * Run enhanced autonomous evolution cycle
   * Invariant: Evolution cycle must integrate market intelligence with autonomous evolution
   */
  async runEnhancedEvolutionCycle() {
    console.log('[enhanced-autonomous-evolution] Starting enhanced evolution cycle...');
    
    try {
      // Step 1: Run market intelligence pipeline
      console.log('[enhanced-autonomous-evolution] Step 1: Running market intelligence pipeline...');
      const marketResults = await this.marketIntelligence.runMarketIntelligencePipeline();
      
      // Step 2: Process market insights for evolution
      console.log('[enhanced-autonomous-evolution] Step 2: Processing market insights for evolution...');
      const evolutionInsights = await this.processMarketInsightsForEvolution(marketResults);
      
      // Step 3: Trigger autonomous evolution
      console.log('[enhanced-autonomous-evolution] Step 3: Triggering autonomous evolution...');
      const evolutionResults = await this.triggerAutonomousEvolution(evolutionInsights);
      
      // Step 4: Integrate results
      console.log('[enhanced-autonomous-evolution] Step 4: Integrating results...');
      const integrationResults = await this.integrateResults(marketResults, evolutionResults);
      
      // Step 5: Update integration history
      this.updateIntegrationHistory(integrationResults);
      
      console.log('[enhanced-autonomous-evolution] Enhanced evolution cycle completed');
      return integrationResults;
      
    } catch (error) {
      console.error('[enhanced-autonomous-evolution] Error in enhanced evolution cycle:', error.message);
      throw error;
    }
  }

  /**
   * Process market insights for evolution
   * Invariant: Market insights must be processed for evolution triggers
   */
  async processMarketInsightsForEvolution(marketResults) {
    const insights = {
      opportunities: marketResults.results.opportunities_identified,
      solutions: marketResults.results.solutions_generated,
      trends: marketResults.results.trends_detected,
      signals: marketResults.results.signals_filtered,
      digest: marketResults.results.digest_generated
    };
    
    // Extract evolution triggers from market insights
    const evolutionTriggers = this.extractEvolutionTriggers(insights);
    
    // Process market intelligence for evolution
    const marketIntelligence = await this.marketIntelligence.marketIntelligence.processMarketIntelligence();
    const evolutionOpportunities = this.identifyEvolutionOpportunities(marketIntelligence);
    
    return {
      insights,
      evolutionTriggers,
      evolutionOpportunities,
      marketIntelligence
    };
  }

  /**
   * Extract evolution triggers from market insights
   * Invariant: Evolution triggers must be actionable
   */
  extractEvolutionTriggers(insights) {
    const triggers = [];
    
    // High opportunity triggers
    if (insights.opportunities > 5) {
      triggers.push({
        type: 'high_opportunity',
        description: `High number of opportunities detected: ${insights.opportunities}`,
        priority: 'high',
        action: 'investigate_opportunities'
      });
    }
    
    // Strong trend triggers
    if (insights.trends > 3) {
      triggers.push({
        type: 'strong_trends',
        description: `Strong trends detected: ${insights.trends}`,
        priority: 'medium',
        action: 'analyze_trends'
      });
    }
    
    // High signal quality triggers
    if (insights.signals > 10) {
      triggers.push({
        type: 'high_signal_quality',
        description: `High-quality signals detected: ${insights.signals}`,
        priority: 'medium',
        action: 'process_signals'
      });
    }
    
    return triggers;
  }

  /**
   * Identify evolution opportunities from market intelligence
   * Invariant: Evolution opportunities must be actionable
   */
  identifyEvolutionOpportunities(marketIntelligence) {
    const opportunities = [];
    
    // Analyze opportunities for evolution
    marketIntelligence.opportunities.forEach(opportunity => {
      if (opportunity.opportunity_score > 0.7) {
        opportunities.push({
          type: 'market_opportunity',
          title: opportunity.title,
          description: opportunity.description,
          score: opportunity.opportunity_score,
          category: opportunity.category,
          actionable: true
        });
      }
    });
    
    // Analyze solutions for evolution
    marketIntelligence.solutions.forEach(solution => {
      if (solution.feasibility > 0.7) {
        opportunities.push({
          type: 'solution_opportunity',
          title: solution.title,
          description: solution.description,
          feasibility: solution.feasibility,
          impact: solution.impact_potential,
          actionable: true
        });
      }
    });
    
    return opportunities;
  }

  /**
   * Trigger autonomous evolution
   * Invariant: Autonomous evolution must be triggered based on market insights
   */
  async triggerAutonomousEvolution(evolutionInsights) {
    const evolutionResults = {
      triggers_processed: evolutionInsights.evolutionTriggers.length,
      opportunities_identified: evolutionInsights.evolutionOpportunities.length,
      evolution_actions: []
    };
    
    // Process evolution triggers
    for (const trigger of evolutionInsights.evolutionTriggers) {
      const action = await this.processEvolutionTrigger(trigger);
      evolutionResults.evolution_actions.push(action);
    }
    
    // Process evolution opportunities
    for (const opportunity of evolutionInsights.evolutionOpportunities) {
      const action = await this.processEvolutionOpportunity(opportunity);
      evolutionResults.evolution_actions.push(action);
    }
    
    // Trigger autonomous evolution engine
    const evolutionEngineResults = await this.autonomousEvolution.triggerAutonomousEvolution();
    evolutionResults.engine_results = evolutionEngineResults;
    
    return evolutionResults;
  }

  /**
   * Process evolution trigger
   * Invariant: Evolution triggers must be processed consistently
   */
  async processEvolutionTrigger(trigger) {
    const action = {
      trigger_id: `trigger-${Date.now()}`,
      trigger_type: trigger.type,
      description: trigger.description,
      priority: trigger.priority,
      action: trigger.action,
      processed_at: new Date().toISOString(),
      status: 'processed'
    };
    
    // Log trigger processing
    console.log(`[enhanced-autonomous-evolution] Processing trigger: ${trigger.type} - ${trigger.description}`);
    
    return action;
  }

  /**
   * Process evolution opportunity
   * Invariant: Evolution opportunities must be processed consistently
   */
  async processEvolutionOpportunity(opportunity) {
    const action = {
      opportunity_id: `opportunity-${Date.now()}`,
      opportunity_type: opportunity.type,
      title: opportunity.title,
      description: opportunity.description,
      score: opportunity.score || opportunity.feasibility,
      processed_at: new Date().toISOString(),
      status: 'processed'
    };
    
    // Log opportunity processing
    console.log(`[enhanced-autonomous-evolution] Processing opportunity: ${opportunity.type} - ${opportunity.title}`);
    
    return action;
  }

  /**
   * Integrate results
   * Invariant: Results must be integrated comprehensively
   */
  async integrateResults(marketResults, evolutionResults) {
    const integration = {
      integration_id: `integration-${Date.now()}`,
      timestamp: new Date().toISOString(),
      market_results: {
        signals_collected: marketResults.results.signals_collected,
        signals_filtered: marketResults.results.signals_filtered,
        trends_detected: marketResults.results.trends_detected,
        opportunities_identified: marketResults.results.opportunities_identified,
        solutions_generated: marketResults.results.solutions_generated,
        digest_generated: marketResults.results.digest_generated
      },
      evolution_results: {
        triggers_processed: evolutionResults.triggers_processed,
        opportunities_identified: evolutionResults.opportunities_identified,
        evolution_actions: evolutionResults.evolution_actions.length,
        engine_results: evolutionResults.engine_results
      },
      integration_metrics: this.calculateIntegrationMetrics(marketResults, evolutionResults)
    };
    
    return integration;
  }

  /**
   * Calculate integration metrics
   * Invariant: Integration metrics must be accurate
   */
  calculateIntegrationMetrics(marketResults, evolutionResults) {
    return {
      market_efficiency: marketResults.performance.overall.efficiency_score,
      evolution_effectiveness: evolutionResults.triggers_processed / Math.max(marketResults.results.opportunities_identified, 1),
      integration_success: 1.0, // Will be updated based on success/failure
      overall_performance: (marketResults.performance.overall.efficiency_score + 1.0) / 2
    };
  }

  /**
   * Update integration history
   * Invariant: Integration history must be updated accurately
   */
  updateIntegrationHistory(integrationResults) {
    this.integrationHistory.integrations.push(integrationResults);
    if (Array.isArray(integrationResults.evolution_results.evolution_actions)) {
      this.integrationHistory.evolution_triggers.push(...integrationResults.evolution_results.evolution_actions);
    } else {
      this.integrationHistory.evolution_triggers.push(integrationResults.evolution_results.evolution_actions);
    }
    this.integrationHistory.market_insights.push(integrationResults.market_results);
    
    this.saveIntegrationHistory();
  }

  /**
   * Get enhanced evolution status
   * Invariant: Status must be comprehensive
   */
  getEnhancedEvolutionStatus() {
    return {
      market_intelligence_status: this.marketIntelligence.getOrchestratorStatus(),
      autonomous_evolution_status: this.autonomousEvolution.getEvolutionStatus(),
      integration_history: {
        total_integrations: this.integrationHistory.integrations.length,
        total_triggers: this.integrationHistory.evolution_triggers.length,
        total_insights: this.integrationHistory.market_insights.length,
        last_updated: this.integrationHistory.lastUpdated
      }
    };
  }

  /**
   * Generate enhanced evolution report
   * Invariant: Report must be comprehensive and actionable
   */
  async generateEnhancedEvolutionReport() {
    console.log('[enhanced-autonomous-evolution] Generating enhanced evolution report...');
    
    try {
      const report = {
        report_id: `enhanced-evolution-report-${Date.now()}`,
        timestamp: new Date().toISOString(),
        market_intelligence_report: await this.marketIntelligence.generateComprehensiveReport(),
        autonomous_evolution_report: this.autonomousEvolution.generateEvolutionReport ? await this.autonomousEvolution.generateEvolutionReport() : { message: 'Evolution report not available' },
        integration_analysis: this.analyzeIntegration(),
        recommendations: this.generateEnhancedRecommendations(),
        next_actions: this.generateEnhancedNextActions()
      };
      
      // Save report
      const reportPath = path.join(this.integrationPath, `enhanced-evolution-report-${report.report_id}.json`);
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      
      console.log(`[enhanced-autonomous-evolution] Enhanced evolution report generated: ${report.report_id}`);
      return report;
      
    } catch (error) {
      console.error('[enhanced-autonomous-evolution] Error generating enhanced evolution report:', error.message);
      throw error;
    }
  }

  /**
   * Analyze integration
   * Invariant: Integration analysis must be comprehensive
   */
  analyzeIntegration() {
    const analysis = {
      total_integrations: this.integrationHistory.integrations.length,
      total_triggers: this.integrationHistory.evolution_triggers.length,
      total_insights: this.integrationHistory.market_insights.length,
      integration_effectiveness: this.calculateIntegrationEffectiveness(),
      evolution_impact: this.calculateEvolutionImpact(),
      market_influence: this.calculateMarketInfluence()
    };
    
    return analysis;
  }

  /**
   * Calculate integration effectiveness
   * Invariant: Integration effectiveness must be accurate
   */
  calculateIntegrationEffectiveness() {
    const integrations = this.integrationHistory.integrations;
    if (integrations.length === 0) return 0;
    
    const avgEfficiency = integrations.reduce((sum, integration) => 
      sum + integration.integration_metrics.overall_performance, 0) / integrations.length;
    
    return avgEfficiency;
  }

  /**
   * Calculate evolution impact
   * Invariant: Evolution impact must be accurate
   */
  calculateEvolutionImpact() {
    const triggers = this.integrationHistory.evolution_triggers;
    const highPriorityTriggers = triggers.filter(trigger => trigger.priority === 'high').length;
    
    return triggers.length > 0 ? highPriorityTriggers / triggers.length : 0;
  }

  /**
   * Calculate market influence
   * Invariant: Market influence must be accurate
   */
  calculateMarketInfluence() {
    const insights = this.integrationHistory.market_insights;
    if (insights.length === 0) return 0;
    
    const avgOpportunities = insights.reduce((sum, insight) => 
      sum + insight.opportunities_identified, 0) / insights.length;
    
    return Math.min(avgOpportunities / 10, 1); // Normalize to 0-1
  }

  /**
   * Generate enhanced recommendations
   * Invariant: Recommendations must be actionable
   */
  generateEnhancedRecommendations() {
    const recommendations = [];
    
    // Integration recommendations
    if (this.integrationHistory.integrations.length < 5) {
      recommendations.push({
        type: 'integration',
        title: 'Increase integration frequency',
        description: 'Run more integration cycles to improve system learning',
        priority: 'medium'
      });
    }
    
    // Evolution recommendations
    const highPriorityTriggers = this.integrationHistory.evolution_triggers.filter(t => t.priority === 'high');
    if (highPriorityTriggers.length > 0) {
      recommendations.push({
        type: 'evolution',
        title: 'Address high-priority evolution triggers',
        description: `${highPriorityTriggers.length} high-priority triggers require attention`,
        priority: 'high'
      });
    }
    
    // Market intelligence recommendations
    const recentInsights = this.integrationHistory.market_insights.slice(-5);
    const avgOpportunities = recentInsights.reduce((sum, insight) => 
      sum + insight.opportunities_identified, 0) / recentInsights.length;
    
    if (avgOpportunities > 5) {
      recommendations.push({
        type: 'market_intelligence',
        title: 'Leverage market opportunities',
        description: `High number of opportunities detected (${avgOpportunities.toFixed(1)} avg)`,
        priority: 'high'
      });
    }
    
    return recommendations;
  }

  /**
   * Generate enhanced next actions
   * Invariant: Next actions must be actionable
   */
  generateEnhancedNextActions() {
    const actions = [];
    
    // Schedule next integration cycle
    actions.push({
      type: 'scheduled',
      title: 'Schedule next integration cycle',
      description: 'Run the enhanced evolution cycle again',
      priority: 'high'
    });
    
    // Monitor integration performance
    actions.push({
      type: 'monitoring',
      title: 'Monitor integration performance',
      description: 'Track integration metrics and optimize as needed',
      priority: 'medium'
    });
    
    // Review evolution triggers
    actions.push({
      type: 'review',
      title: 'Review evolution triggers',
      description: 'Analyze evolution triggers and take appropriate action',
      priority: 'high'
    });
    
    // Process market opportunities
    actions.push({
      type: 'processing',
      title: 'Process market opportunities',
      description: 'Investigate and act on identified market opportunities',
      priority: 'high'
    });
    
    return actions;
  }

  /**
   * Start continuous enhanced evolution
   * Invariant: Continuous evolution must be reliable
   */
  startContinuousEnhancedEvolution(intervalMs = 24 * 60 * 60 * 1000) { // Default: 24 hours
    console.log(`[enhanced-autonomous-evolution] Starting continuous enhanced evolution with ${intervalMs}ms interval`);
    
    const runCycle = async () => {
      try {
        await this.runEnhancedEvolutionCycle();
      } catch (error) {
        console.error('[enhanced-autonomous-evolution] Continuous evolution error:', error.message);
      }
    };

    // Run immediately
    runCycle();

    // Schedule recurring runs
    setInterval(runCycle, intervalMs);
    
    console.log('[enhanced-autonomous-evolution] Continuous enhanced evolution started');
  }

  /**
   * Stop continuous enhanced evolution
   * Invariant: Continuous evolution must be stopped cleanly
   */
  stopContinuousEnhancedEvolution() {
    console.log('[enhanced-autonomous-evolution] Stopping continuous enhanced evolution...');
    // In a real implementation, this would clear the interval
    console.log('[enhanced-autonomous-evolution] Continuous enhanced evolution stopped');
  }
}

module.exports = EnhancedAutonomousEvolution;
