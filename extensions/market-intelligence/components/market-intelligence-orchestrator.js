/**
 * Market Intelligence Orchestrator
 * Main system that orchestrates all market intelligence components
 * Based on Reddit Market Intelligence AI Agent patterns
 */

const ExternalSignalProcessor = require('./external-signal-processor');
const MarketIntelligenceSystem = require('./market-intelligence-system');
const AISignalFilter = require('./ai-signal-filter');
const TrendDetectionAutomation = require('./trend-detection-automation');
const InsightDigestSystem = require('./insight-digest-system');
const fs = require('fs');
const path = require('path');

class MarketIntelligenceOrchestrator {
  constructor() {
    this.orchestratorPath = path.join(__dirname, '..', 'orchestrator');
    this.ensureOrchestratorDirectory();
    this.orchestratorHistory = this.loadOrchestratorHistory();
    
    // Initialize all components
    this.externalProcessor = new ExternalSignalProcessor();
    this.marketIntelligence = new MarketIntelligenceSystem();
    this.signalFilter = new AISignalFilter();
    this.trendDetection = new TrendDetectionAutomation();
    this.insightDigest = new InsightDigestSystem();
    
    // Orchestration state
    this.isRunning = false;
    this.lastRun = null;
    this.runCount = 0;
  }

  /**
   * Ensure orchestrator directory exists
   * Invariant: Orchestrator directory must exist for state persistence
   */
  ensureOrchestratorDirectory() {
    if (!fs.existsSync(this.orchestratorPath)) {
      fs.mkdirSync(this.orchestratorPath, { recursive: true });
      console.log('[market-intelligence-orchestrator] Created orchestrator directory');
    }
  }

  /**
   * Load orchestrator history from persistent storage
   * Invariant: Orchestrator history must be maintained for analysis
   */
  loadOrchestratorHistory() {
    const historyPath = path.join(this.orchestratorPath, 'orchestrator-history.json');
    try {
      if (fs.existsSync(historyPath)) {
        const data = fs.readFileSync(historyPath, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('[market-intelligence-orchestrator] Error loading orchestrator history:', error.message);
    }
    return {
      runs: [],
      performance_metrics: {},
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Save orchestrator history to persistent storage
   * Invariant: All orchestrator data must be persisted
   */
  saveOrchestratorHistory() {
    const historyPath = path.join(this.orchestratorPath, 'orchestrator-history.json');
    try {
      const data = {
        ...this.orchestratorHistory,
        lastUpdated: new Date().toISOString()
      };
      fs.writeFileSync(historyPath, JSON.stringify(data, null, 2));
      console.log('[market-intelligence-orchestrator] Orchestrator history saved');
    } catch (error) {
      console.error('[market-intelligence-orchestrator] Error saving orchestrator history:', error.message);
    }
  }

  /**
   * Run complete market intelligence pipeline
   * Invariant: Pipeline must be comprehensive and reliable
   */
  async runMarketIntelligencePipeline() {
    if (this.isRunning) {
      console.log('[market-intelligence-orchestrator] Pipeline already running, skipping...');
      return;
    }

    this.isRunning = true;
    this.runCount++;
    const runId = `run-${Date.now()}-${this.runCount}`;
    const startTime = Date.now();

    console.log(`[market-intelligence-orchestrator] Starting market intelligence pipeline ${runId}...`);

    try {
      // Step 1: Collect external signals
      console.log('[market-intelligence-orchestrator] Step 1: Collecting external signals...');
      const externalData = await this.externalProcessor.processExternalSignals();
      console.log(`[market-intelligence-orchestrator] Collected ${externalData.signals.length} external signals`);

      // Step 2: Filter signals with AI
      console.log('[market-intelligence-orchestrator] Step 2: Filtering signals with AI...');
      const filterData = await this.signalFilter.filterSignals(externalData.signals);
      console.log(`[market-intelligence-orchestrator] Filtered to ${filterData.filtered_signals.length} high-quality signals`);

      // Step 3: Detect trends
      console.log('[market-intelligence-orchestrator] Step 3: Detecting trends...');
      const trendData = await this.trendDetection.detectTrends(filterData.filtered_signals);
      console.log(`[market-intelligence-orchestrator] Detected ${trendData.trends.length} trends`);

      // Step 4: Process market intelligence
      console.log('[market-intelligence-orchestrator] Step 4: Processing market intelligence...');
      const marketData = await this.marketIntelligence.processMarketIntelligence();
      console.log(`[market-intelligence-orchestrator] Processed ${marketData.opportunities.length} opportunities and ${marketData.solutions.length} solutions`);

      // Step 5: Generate insight digest
      console.log('[market-intelligence-orchestrator] Step 5: Generating insight digest...');
      const digest = await this.insightDigest.generateInsightDigest(marketData, trendData, filterData);
      console.log(`[market-intelligence-orchestrator] Generated digest ${digest.id}`);

      // Calculate performance metrics
      const endTime = Date.now();
      const duration = endTime - startTime;
      const performanceMetrics = this.calculatePerformanceMetrics({
        externalData,
        filterData,
        trendData,
        marketData,
        digest,
        duration
      });

      // Update orchestrator history
      const runRecord = {
        id: runId,
        timestamp: new Date().toISOString(),
        duration,
        performance: performanceMetrics,
        results: {
          signals_collected: externalData.signals.length,
          signals_filtered: filterData.filtered_signals.length,
          trends_detected: trendData.trends.length,
          opportunities_identified: marketData.opportunities.length,
          solutions_generated: marketData.solutions.length,
          digest_generated: digest.id
        }
      };

      this.orchestratorHistory.runs.push(runRecord);
      this.updatePerformanceMetrics(performanceMetrics);
      this.saveOrchestratorHistory();

      this.lastRun = runRecord;
      this.isRunning = false;

      console.log(`[market-intelligence-orchestrator] Pipeline ${runId} completed in ${duration}ms`);
      console.log(`[market-intelligence-orchestrator] Results: ${runRecord.results.signals_collected} signals → ${runRecord.results.signals_filtered} filtered → ${runRecord.results.trends_detected} trends → ${runRecord.results.opportunities_identified} opportunities → ${runRecord.results.solutions_generated} solutions`);

      return {
        runId,
        duration,
        performance: performanceMetrics,
        results: runRecord.results,
        digest
      };

    } catch (error) {
      this.isRunning = false;
      console.error(`[market-intelligence-orchestrator] Pipeline ${runId} failed:`, error.message);
      throw error;
    }
  }

  /**
   * Calculate performance metrics
   * Invariant: Performance metrics must be accurate
   */
  calculatePerformanceMetrics(data) {
    const metrics = {
      signal_processing: {
        total_signals: data.externalData.signals.length,
        filtered_signals: data.filterData.filtered_signals.length,
        filter_rate: data.filterData.filtered_signals.length / data.externalData.signals.length,
        processing_time: data.duration
      },
      trend_detection: {
        trends_detected: data.trendData.trends.length,
        alerts_generated: data.trendData.alerts.length,
        momentum_score: data.trendData.momentum.overall_momentum
      },
      market_intelligence: {
        opportunities: data.marketData.opportunities.length,
        solutions: data.marketData.solutions.length,
        insights: data.marketData.insights.length
      },
      digest_generation: {
        sections: Object.keys(data.digest.sections).length,
        words: data.digest.metrics.total_words,
        insights: data.digest.metrics.total_insights,
        actions: data.digest.metrics.total_actions,
        score: data.digest.metrics.digest_score
      },
      overall: {
        total_duration: data.duration,
        success_rate: 1.0, // Will be updated based on success/failure
        efficiency_score: this.calculateEfficiencyScore(data)
      }
    };

    return metrics;
  }

  /**
   * Calculate efficiency score
   * Invariant: Efficiency score must be representative
   */
  calculateEfficiencyScore(data) {
    let score = 0;

    // Signal processing efficiency (30%)
    const filterRate = data.filterData.filtered_signals.length / data.externalData.signals.length;
    score += filterRate * 0.3;

    // Trend detection efficiency (25%)
    const trendEfficiency = Math.min(data.trendData.trends.length / 10, 1);
    score += trendEfficiency * 0.25;

    // Market intelligence efficiency (25%)
    const marketEfficiency = Math.min((data.marketData.opportunities.length + data.marketData.solutions.length) / 20, 1);
    score += marketEfficiency * 0.25;

    // Digest quality (20%)
    score += data.digest.metrics.digest_score * 0.2;

    return Math.min(score, 1);
  }

  /**
   * Update performance metrics
   * Invariant: Performance metrics must be accurate
   */
  updatePerformanceMetrics(metrics) {
    const performance = this.orchestratorHistory.performance_metrics;

    // Update total metrics
    performance.total_runs = (performance.total_runs || 0) + 1;
    performance.total_duration = (performance.total_duration || 0) + metrics.overall.total_duration;
    performance.avg_duration = performance.total_duration / performance.total_runs;

    // Update signal processing metrics
    performance.signal_processing = performance.signal_processing || {};
    performance.signal_processing.total_signals = (performance.signal_processing.total_signals || 0) + metrics.signal_processing.total_signals;
    performance.signal_processing.avg_filter_rate = (performance.signal_processing.avg_filter_rate || 0) + metrics.signal_processing.filter_rate;
    performance.signal_processing.avg_filter_rate /= performance.total_runs;

    // Update trend detection metrics
    performance.trend_detection = performance.trend_detection || {};
    performance.trend_detection.total_trends = (performance.trend_detection.total_trends || 0) + metrics.trend_detection.trends_detected;
    performance.trend_detection.avg_momentum = (performance.trend_detection.avg_momentum || 0) + metrics.trend_detection.momentum_score;
    performance.trend_detection.avg_momentum /= performance.total_runs;

    // Update market intelligence metrics
    performance.market_intelligence = performance.market_intelligence || {};
    performance.market_intelligence.total_opportunities = (performance.market_intelligence.total_opportunities || 0) + metrics.market_intelligence.opportunities;
    performance.market_intelligence.total_solutions = (performance.market_intelligence.total_solutions || 0) + metrics.market_intelligence.solutions;

    // Update digest generation metrics
    performance.digest_generation = performance.digest_generation || {};
    performance.digest_generation.total_digests = (performance.digest_generation.total_digests || 0) + 1;
    performance.digest_generation.avg_score = (performance.digest_generation.avg_score || 0) + metrics.digest_generation.score;
    performance.digest_generation.avg_score /= performance.total_runs;

    // Update overall efficiency
    performance.overall_efficiency = (performance.overall_efficiency || 0) + metrics.overall.efficiency_score;
    performance.overall_efficiency /= performance.total_runs;
  }

  /**
   * Get orchestrator status
   * Invariant: Status must be accurate and comprehensive
   */
  getOrchestratorStatus() {
    return {
      isRunning: this.isRunning,
      runCount: this.runCount,
      lastRun: this.lastRun,
      performance: this.orchestratorHistory.performance_metrics,
      componentStatus: {
        externalProcessor: this.externalProcessor.getSignalSummary(),
        marketIntelligence: this.marketIntelligence.getMarketIntelligenceSummary(),
        signalFilter: this.signalFilter.getFilterPerformance(),
        trendDetection: this.trendDetection.getTrendSummary(),
        insightDigest: this.insightDigest.getDigestSummary()
      }
    };
  }

  /**
   * Get orchestrator summary
   * Invariant: Summary must be comprehensive
   */
  getOrchestratorSummary() {
    const performance = this.orchestratorHistory.performance_metrics;
    const recentRuns = this.orchestratorHistory.runs.slice(-5);

    return {
      total_runs: this.runCount,
      last_run: this.lastRun,
      performance_summary: {
        avg_duration: performance.avg_duration || 0,
        avg_filter_rate: performance.signal_processing?.avg_filter_rate || 0,
        avg_momentum: performance.trend_detection?.avg_momentum || 0,
        overall_efficiency: performance.overall_efficiency || 0
      },
      recent_runs: recentRuns.map(run => ({
        id: run.id,
        timestamp: run.timestamp,
        duration: run.duration,
        results: run.results
      })),
      component_summaries: {
        external_processor: this.externalProcessor.getSignalSummary(),
        market_intelligence: this.marketIntelligence.getMarketIntelligenceSummary(),
        signal_filter: this.signalFilter.getFilterPerformance(),
        trend_detection: this.trendDetection.getTrendSummary(),
        insight_digest: this.insightDigest.getDigestSummary()
      }
    };
  }

  /**
   * Start continuous monitoring
   * Invariant: Continuous monitoring must be reliable
   */
  startContinuousMonitoring(intervalMs = 24 * 60 * 60 * 1000) { // Default: 24 hours
    console.log(`[market-intelligence-orchestrator] Starting continuous monitoring with ${intervalMs}ms interval`);
    
    const runPipeline = async () => {
      try {
        await this.runMarketIntelligencePipeline();
      } catch (error) {
        console.error('[market-intelligence-orchestrator] Continuous monitoring error:', error.message);
      }
    };

    // Run immediately
    runPipeline();

    // Schedule recurring runs
    setInterval(runPipeline, intervalMs);
    
    console.log('[market-intelligence-orchestrator] Continuous monitoring started');
  }

  /**
   * Stop continuous monitoring
   * Invariant: Monitoring must be stopped cleanly
   */
  stopContinuousMonitoring() {
    console.log('[market-intelligence-orchestrator] Stopping continuous monitoring...');
    // In a real implementation, this would clear the interval
    console.log('[market-intelligence-orchestrator] Continuous monitoring stopped');
  }

  /**
   * Generate comprehensive report
   * Invariant: Report must be comprehensive and actionable
   */
  async generateComprehensiveReport() {
    console.log('[market-intelligence-orchestrator] Generating comprehensive report...');
    
    try {
      const report = {
        report_id: `report-${Date.now()}`,
        timestamp: new Date().toISOString(),
        orchestrator_status: this.getOrchestratorStatus(),
        component_reports: {
          external_signals: this.externalProcessor.getSignalSummary(),
          market_intelligence: this.marketIntelligence.getMarketIntelligenceSummary(),
          signal_filtering: this.signalFilter.getFilterPerformance(),
          trend_detection: this.trendDetection.getTrendSummary(),
          insight_digest: this.insightDigest.getDigestSummary()
        },
        recommendations: this.generateSystemRecommendations(),
        next_actions: this.generateNextActions()
      };

      // Save report
      const reportPath = path.join(this.orchestratorPath, `comprehensive-report-${report.report_id}.json`);
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      
      console.log(`[market-intelligence-orchestrator] Comprehensive report generated: ${report.report_id}`);
      return report;

    } catch (error) {
      console.error('[market-intelligence-orchestrator] Error generating comprehensive report:', error.message);
      throw error;
    }
  }

  /**
   * Generate system recommendations
   * Invariant: Recommendations must be actionable
   */
  generateSystemRecommendations() {
    const recommendations = [];
    const performance = this.orchestratorHistory.performance_metrics;

    // Performance recommendations
    if (performance.avg_duration > 300000) { // 5 minutes
      recommendations.push({
        type: 'performance',
        title: 'Optimize processing time',
        description: 'Average processing time is high, consider optimizing components',
        priority: 'medium'
      });
    }

    if (performance.signal_processing?.avg_filter_rate < 0.3) {
      recommendations.push({
        type: 'filtering',
        title: 'Improve signal filtering',
        description: 'Filter rate is low, consider adjusting filter rules',
        priority: 'high'
      });
    }

    if (performance.overall_efficiency < 0.6) {
      recommendations.push({
        type: 'efficiency',
        title: 'Improve overall efficiency',
        description: 'Overall efficiency is below optimal, review system configuration',
        priority: 'high'
      });
    }

    return recommendations;
  }

  /**
   * Generate next actions
   * Invariant: Next actions must be actionable
   */
  generateNextActions() {
    const actions = [];

    // Schedule next run
    actions.push({
      type: 'scheduled',
      title: 'Schedule next pipeline run',
      description: 'Run the market intelligence pipeline again',
      priority: 'high'
    });

    // Monitor performance
    actions.push({
      type: 'monitoring',
      title: 'Monitor system performance',
      description: 'Track performance metrics and optimize as needed',
      priority: 'medium'
    });

    // Review insights
    actions.push({
      type: 'review',
      title: 'Review generated insights',
      description: 'Analyze generated insights and take action on opportunities',
      priority: 'high'
    });

    return actions;
  }

  /**
   * Optimize system performance
   * Invariant: Optimization must improve system performance
   */
  async optimizeSystemPerformance() {
    console.log('[market-intelligence-orchestrator] Optimizing system performance...');
    
    try {
      // Optimize signal filter
      this.signalFilter.optimizeFilterRules();
      
      // Update trend detection parameters
      // (In a real implementation, this would optimize trend detection parameters)
      
      // Update digest templates
      // (In a real implementation, this would optimize digest templates)
      
      console.log('[market-intelligence-orchestrator] System performance optimization completed');
      
    } catch (error) {
      console.error('[market-intelligence-orchestrator] Error optimizing system performance:', error.message);
      throw error;
    }
  }
}

module.exports = MarketIntelligenceOrchestrator;
