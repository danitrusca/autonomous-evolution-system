/**
 * Market Intelligence System
 * Integrates external signals with internal patterns for development intelligence
 * Based on Reddit Market Intelligence AI Agent patterns
 */

const ExternalSignalProcessor = require('./external-signal-processor');
const fs = require('fs');
const path = require('path');

class MarketIntelligenceSystem {
  constructor() {
    this.externalProcessor = new ExternalSignalProcessor();
    this.intelligencePath = path.join(__dirname, '..', 'intelligence');
    this.ensureIntelligenceDirectory();
    this.intelligenceHistory = this.loadIntelligenceHistory();
    this.opportunities = new Map();
    this.solutions = new Map();
  }

  /**
   * Ensure intelligence directory exists
   * Invariant: Intelligence directory must exist for data persistence
   */
  ensureIntelligenceDirectory() {
    if (!fs.existsSync(this.intelligencePath)) {
      fs.mkdirSync(this.intelligencePath, { recursive: true });
      console.log('[market-intelligence] Created intelligence directory');
    }
  }

  /**
   * Load intelligence history from persistent storage
   * Invariant: Intelligence history must be maintained for analysis
   */
  loadIntelligenceHistory() {
    const historyPath = path.join(this.intelligencePath, 'intelligence-history.json');
    try {
      if (fs.existsSync(historyPath)) {
        const data = fs.readFileSync(historyPath, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('[market-intelligence] Error loading intelligence history:', error.message);
    }
    return {
      opportunities: [],
      solutions: [],
      insights: [],
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Save intelligence history to persistent storage
   * Invariant: All intelligence data must be persisted
   */
  saveIntelligenceHistory() {
    const historyPath = path.join(this.intelligencePath, 'intelligence-history.json');
    try {
      const data = {
        ...this.intelligenceHistory,
        lastUpdated: new Date().toISOString()
      };
      fs.writeFileSync(historyPath, JSON.stringify(data, null, 2));
      console.log('[market-intelligence] Intelligence history saved');
    } catch (error) {
      console.error('[market-intelligence] Error saving intelligence history:', error.message);
    }
  }

  /**
   * Process market intelligence
   * Invariant: Market intelligence must combine external and internal signals
   */
  async processMarketIntelligence() {
    console.log('[market-intelligence] Processing market intelligence...');
    
    try {
      // Get external signals
      const externalData = await this.externalProcessor.processExternalSignals();
      
      // Analyze opportunities
      const opportunities = this.analyzeOpportunities(externalData);
      
      // Generate solution suggestions
      const solutions = this.generateSolutionSuggestions(opportunities);
      
      // Create intelligence insights
      const insights = this.createIntelligenceInsights(opportunities, solutions);
      
      // Update intelligence history
      this.intelligenceHistory.opportunities.push(...opportunities);
      this.intelligenceHistory.solutions.push(...solutions);
      this.intelligenceHistory.insights.push(...insights);
      
      // Save updated history
      this.saveIntelligenceHistory();
      
      console.log(`[market-intelligence] Processed ${opportunities.length} opportunities, ${solutions.length} solutions, ${insights.length} insights`);
      
      return {
        opportunities,
        solutions,
        insights,
        external_signals: externalData
      };
      
    } catch (error) {
      console.error('[market-intelligence] Error processing market intelligence:', error.message);
      throw error;
    }
  }

  /**
   * Analyze opportunities from external signals
   * Invariant: Opportunities must be actionable and relevant
   */
  analyzeOpportunities(externalData) {
    const opportunities = [];
    
    // Analyze trend opportunities
    Object.keys(externalData.trends).forEach(category => {
      const trend = externalData.trends[category];
      if (trend.opportunity > 0.7) {
        opportunities.push({
          type: 'trend_opportunity',
          category,
          title: `Capitalize on ${category} trend`,
          description: `Strong trend detected with ${(trend.strength * 100).toFixed(1)}% strength and ${(trend.impact * 100).toFixed(1)}% impact`,
          opportunity_score: trend.opportunity,
          keywords: trend.keywords,
          sentiment: trend.sentiment,
          actionable: true,
          priority: 'high',
          timestamp: new Date().toISOString()
        });
      }
    });
    
    // Analyze problem opportunities
    Object.keys(externalData.patterns).forEach(category => {
      const pattern = externalData.patterns[category];
      if (pattern.sentiment === 'negative' && pattern.avg_impact > 0.6) {
        opportunities.push({
          type: 'problem_opportunity',
          category,
          title: `Solve ${category} problem`,
          description: `High-impact problem detected with ${pattern.frequency} occurrences and ${(pattern.avg_impact * 100).toFixed(1)}% impact`,
          opportunity_score: pattern.avg_impact,
          keywords: pattern.keywords,
          sentiment: pattern.sentiment,
          actionable: true,
          priority: 'high',
          timestamp: new Date().toISOString()
        });
      }
    });
    
    // Analyze gap opportunities
    const gapOpportunities = this.analyzeGapOpportunities(externalData);
    opportunities.push(...gapOpportunities);
    
    console.log(`[market-intelligence] Analyzed ${opportunities.length} opportunities`);
    return opportunities;
  }

  /**
   * Analyze gap opportunities
   * Invariant: Gap opportunities must identify unmet needs
   */
  analyzeGapOpportunities(externalData) {
    const gapOpportunities = [];
    
    // Look for high-frequency problems with low solution availability
    Object.keys(externalData.patterns).forEach(category => {
      const pattern = externalData.patterns[category];
      if (pattern.frequency > 5 && pattern.avg_impact > 0.7 && pattern.sentiment === 'negative') {
        gapOpportunities.push({
          type: 'gap_opportunity',
          category,
          title: `Address ${category} gap`,
          description: `High-frequency problem with limited solutions available`,
          opportunity_score: pattern.avg_impact,
          keywords: pattern.keywords,
          sentiment: pattern.sentiment,
          actionable: true,
          priority: 'medium',
          timestamp: new Date().toISOString()
        });
      }
    });
    
    return gapOpportunities;
  }

  /**
   * Generate solution suggestions based on opportunities
   * Invariant: Solution suggestions must be feasible and relevant
   */
  generateSolutionSuggestions(opportunities) {
    const solutions = [];
    
    opportunities.forEach(opportunity => {
      const solution = this.generateSolutionForOpportunity(opportunity);
      if (solution) {
        solutions.push(solution);
      }
    });
    
    console.log(`[market-intelligence] Generated ${solutions.length} solution suggestions`);
    return solutions;
  }

  /**
   * Generate solution for specific opportunity
   * Invariant: Solutions must address the specific opportunity
   */
  generateSolutionForOpportunity(opportunity) {
    const solution = {
      opportunity_id: opportunity.category,
      type: opportunity.type,
      title: this.generateSolutionTitle(opportunity),
      description: this.generateSolutionDescription(opportunity),
      approach: this.generateSolutionApproach(opportunity),
      feasibility: this.assessFeasibility(opportunity),
      impact_potential: opportunity.opportunity_score,
      keywords: opportunity.keywords,
      priority: opportunity.priority,
      timestamp: new Date().toISOString()
    };
    
    return solution;
  }

  /**
   * Generate solution title
   * Invariant: Solution titles must be clear and actionable
   */
  generateSolutionTitle(opportunity) {
    const titles = {
      trend_opportunity: `Build ${opportunity.category} solution`,
      problem_opportunity: `Solve ${opportunity.category} problem`,
      gap_opportunity: `Fill ${opportunity.category} gap`
    };
    
    return titles[opportunity.type] || `Address ${opportunity.category} opportunity`;
  }

  /**
   * Generate solution description
   * Invariant: Solution descriptions must be specific and actionable
   */
  generateSolutionDescription(opportunity) {
    const descriptions = {
      trend_opportunity: `Develop a solution that leverages the emerging ${opportunity.category} trend with ${opportunity.keywords.join(', ')} capabilities`,
      problem_opportunity: `Create a solution that addresses the ${opportunity.category} problem affecting ${opportunity.keywords.join(', ')} development`,
      gap_opportunity: `Build a solution that fills the gap in ${opportunity.category} for ${opportunity.keywords.join(', ')} needs`
    };
    
    return descriptions[opportunity.type] || `Develop a solution for ${opportunity.category}`;
  }

  /**
   * Generate solution approach
   * Invariant: Solution approaches must be technically feasible
   */
  generateSolutionApproach(opportunity) {
    const approaches = {
      trend_opportunity: `Leverage existing frameworks and tools to build a ${opportunity.category} solution that capitalizes on the trend`,
      problem_opportunity: `Identify the root cause of the ${opportunity.category} problem and develop a targeted solution`,
      gap_opportunity: `Research existing solutions and build a better alternative for ${opportunity.category}`
    };
    
    return approaches[opportunity.type] || `Develop a comprehensive solution for ${opportunity.category}`;
  }

  /**
   * Assess solution feasibility
   * Invariant: Feasibility assessment must be realistic
   */
  assessFeasibility(opportunity) {
    let feasibility = 0.5; // Base feasibility
    
    // High opportunity score increases feasibility
    feasibility += opportunity.opportunity_score * 0.3;
    
    // Positive sentiment increases feasibility
    if (opportunity.sentiment === 'positive') {
      feasibility += 0.2;
    }
    
    // More keywords indicate better understanding
    feasibility += Math.min(opportunity.keywords.length / 10, 0.1);
    
    return Math.min(feasibility, 1);
  }

  /**
   * Create intelligence insights
   * Invariant: Insights must be actionable and relevant
   */
  createIntelligenceInsights(opportunities, solutions) {
    const insights = [];
    
    // Create insights from opportunities
    opportunities.forEach(opportunity => {
      insights.push({
        type: 'opportunity_insight',
        title: `Market opportunity in ${opportunity.category}`,
        description: opportunity.description,
        actionable: true,
        priority: opportunity.priority,
        timestamp: new Date().toISOString()
      });
    });
    
    // Create insights from solutions
    solutions.forEach(solution => {
      insights.push({
        type: 'solution_insight',
        title: `Solution approach for ${solution.opportunity_id}`,
        description: solution.description,
        actionable: true,
        priority: solution.priority,
        timestamp: new Date().toISOString()
      });
    });
    
    // Create strategic insights
    const strategicInsights = this.generateStrategicInsights(opportunities, solutions);
    insights.push(...strategicInsights);
    
    console.log(`[market-intelligence] Created ${insights.length} intelligence insights`);
    return insights;
  }

  /**
   * Generate strategic insights
   * Invariant: Strategic insights must provide high-level guidance
   */
  generateStrategicInsights(opportunities, solutions) {
    const strategicInsights = [];
    
    // Analyze opportunity distribution
    const opportunityTypes = {};
    opportunities.forEach(opp => {
      opportunityTypes[opp.type] = (opportunityTypes[opp.type] || 0) + 1;
    });
    
    // Generate strategic insights based on distribution
    Object.keys(opportunityTypes).forEach(type => {
      if (opportunityTypes[type] > 2) {
        strategicInsights.push({
          type: 'strategic_insight',
          title: `Focus on ${type} opportunities`,
          description: `Multiple ${type} opportunities detected - consider prioritizing this area`,
          actionable: true,
          priority: 'high',
          timestamp: new Date().toISOString()
        });
      }
    });
    
    // Analyze solution feasibility
    const highFeasibilitySolutions = solutions.filter(s => s.feasibility > 0.7);
    if (highFeasibilitySolutions.length > 0) {
      strategicInsights.push({
        type: 'strategic_insight',
        title: 'High-feasibility solutions available',
        description: `${highFeasibilitySolutions.length} solutions with high feasibility identified`,
        actionable: true,
        priority: 'high',
        timestamp: new Date().toISOString()
      });
    }
    
    return strategicInsights;
  }

  /**
   * Get market intelligence summary
   * Invariant: Summary must provide actionable intelligence
   */
  getMarketIntelligenceSummary() {
    return {
      total_opportunities: this.intelligenceHistory.opportunities.length,
      total_solutions: this.intelligenceHistory.solutions.length,
      total_insights: this.intelligenceHistory.insights.length,
      last_updated: this.intelligenceHistory.lastUpdated,
      top_opportunities: this.getTopOpportunities(),
      top_solutions: this.getTopSolutions(),
      strategic_insights: this.getStrategicInsights()
    };
  }

  /**
   * Get top opportunities by score
   * Invariant: Top opportunities must be representative
   */
  getTopOpportunities() {
    return this.intelligenceHistory.opportunities
      .sort((a, b) => b.opportunity_score - a.opportunity_score)
      .slice(0, 5);
  }

  /**
   * Get top solutions by feasibility
   * Invariant: Top solutions must be representative
   */
  getTopSolutions() {
    return this.intelligenceHistory.solutions
      .sort((a, b) => b.feasibility - a.feasibility)
      .slice(0, 5);
  }

  /**
   * Get strategic insights
   * Invariant: Strategic insights must be actionable
   */
  getStrategicInsights() {
    return this.intelligenceHistory.insights
      .filter(insight => insight.type === 'strategic_insight')
      .slice(0, 3);
  }

  /**
   * Generate market intelligence report
   * Invariant: Report must be comprehensive and actionable
   */
  generateMarketIntelligenceReport() {
    const summary = this.getMarketIntelligenceSummary();
    const externalSummary = this.externalProcessor.getSignalSummary();
    
    return {
      report_date: new Date().toISOString(),
      executive_summary: {
        total_signals: externalSummary.total_signals,
        active_opportunities: summary.total_opportunities,
        actionable_solutions: summary.total_solutions,
        strategic_insights: summary.total_insights
      },
      market_trends: {
        top_categories: externalSummary.top_categories,
        sentiment_distribution: externalSummary.sentiment_distribution,
        trend_strength: this.calculateTrendStrength()
      },
      opportunities: {
        high_priority: this.getHighPriorityOpportunities(),
        emerging_trends: this.getEmergingTrends(),
        problem_areas: this.getProblemAreas()
      },
      solutions: {
        high_feasibility: this.getHighFeasibilitySolutions(),
        quick_wins: this.getQuickWins(),
        strategic_plays: this.getStrategicPlays()
      },
      recommendations: this.generateRecommendations()
    };
  }

  /**
   * Calculate overall trend strength
   * Invariant: Trend strength must be representative
   */
  calculateTrendStrength() {
    const opportunities = this.intelligenceHistory.opportunities;
    if (opportunities.length === 0) return 0;
    
    const avgScore = opportunities.reduce((sum, opp) => sum + opp.opportunity_score, 0) / opportunities.length;
    return (avgScore * 100).toFixed(1) + '%';
  }

  /**
   * Get high priority opportunities
   * Invariant: High priority opportunities must be actionable
   */
  getHighPriorityOpportunities() {
    return this.intelligenceHistory.opportunities
      .filter(opp => opp.priority === 'high')
      .sort((a, b) => b.opportunity_score - a.opportunity_score)
      .slice(0, 3);
  }

  /**
   * Get emerging trends
   * Invariant: Emerging trends must be recent and relevant
   */
  getEmergingTrends() {
    const recentOpportunities = this.intelligenceHistory.opportunities.filter(opp => {
      const oppDate = new Date(opp.timestamp);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return oppDate > weekAgo;
    });
    
    return recentOpportunities
      .filter(opp => opp.type === 'trend_opportunity')
      .sort((a, b) => b.opportunity_score - a.opportunity_score)
      .slice(0, 3);
  }

  /**
   * Get problem areas
   * Invariant: Problem areas must be actionable
   */
  getProblemAreas() {
    return this.intelligenceHistory.opportunities
      .filter(opp => opp.type === 'problem_opportunity')
      .sort((a, b) => b.opportunity_score - a.opportunity_score)
      .slice(0, 3);
  }

  /**
   * Get high feasibility solutions
   * Invariant: High feasibility solutions must be actionable
   */
  getHighFeasibilitySolutions() {
    return this.intelligenceHistory.solutions
      .filter(sol => sol.feasibility > 0.7)
      .sort((a, b) => b.feasibility - a.feasibility)
      .slice(0, 3);
  }

  /**
   * Get quick wins
   * Invariant: Quick wins must be high feasibility and high impact
   */
  getQuickWins() {
    return this.intelligenceHistory.solutions
      .filter(sol => sol.feasibility > 0.8 && sol.impact_potential > 0.7)
      .sort((a, b) => b.feasibility - a.feasibility)
      .slice(0, 3);
  }

  /**
   * Get strategic plays
   * Invariant: Strategic plays must be high impact
   */
  getStrategicPlays() {
    return this.intelligenceHistory.solutions
      .filter(sol => sol.impact_potential > 0.8)
      .sort((a, b) => b.impact_potential - a.impact_potential)
      .slice(0, 3);
  }

  /**
   * Generate recommendations
   * Invariant: Recommendations must be actionable and prioritized
   */
  generateRecommendations() {
    const recommendations = [];
    
    // High priority opportunities
    const highPriorityOpps = this.getHighPriorityOpportunities();
    if (highPriorityOpps.length > 0) {
      recommendations.push({
        type: 'immediate_action',
        title: 'Address high-priority opportunities',
        description: `${highPriorityOpps.length} high-priority opportunities require immediate attention`,
        priority: 'high'
      });
    }
    
    // Quick wins
    const quickWins = this.getQuickWins();
    if (quickWins.length > 0) {
      recommendations.push({
        type: 'quick_win',
        title: 'Pursue quick wins',
        description: `${quickWins.length} high-feasibility solutions available for quick implementation`,
        priority: 'medium'
      });
    }
    
    // Strategic plays
    const strategicPlays = this.getStrategicPlays();
    if (strategicPlays.length > 0) {
      recommendations.push({
        type: 'strategic_play',
        title: 'Consider strategic plays',
        description: `${strategicPlays.length} high-impact solutions available for strategic implementation`,
        priority: 'medium'
      });
    }
    
    return recommendations;
  }
}

module.exports = MarketIntelligenceSystem;
