/**
 * Insight Digest System
 * Automated system for generating development intelligence digests
 * Based on Reddit Market Intelligence AI Agent patterns
 */

const fs = require('fs');
const path = require('path');

class InsightDigestSystem {
  constructor() {
    this.digestPath = path.join(__dirname, '..', 'digests');
    this.ensureDigestDirectory();
    this.digestHistory = this.loadDigestHistory();
    this.digestTemplates = this.loadDigestTemplates();
    this.digestScheduler = this.initializeDigestScheduler();
  }

  /**
   * Ensure digest directory exists
   * Invariant: Digest directory must exist for digest persistence
   */
  ensureDigestDirectory() {
    if (!fs.existsSync(this.digestPath)) {
      fs.mkdirSync(this.digestPath, { recursive: true });
      console.log('[insight-digest] Created digest directory');
    }
  }

  /**
   * Load digest history from persistent storage
   * Invariant: Digest history must be maintained for analysis
   */
  loadDigestHistory() {
    const historyPath = path.join(this.digestPath, 'digest-history.json');
    try {
      if (fs.existsSync(historyPath)) {
        const data = fs.readFileSync(historyPath, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('[insight-digest] Error loading digest history:', error.message);
    }
    return {
      digests: [],
      digest_metrics: {},
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Save digest history to persistent storage
   * Invariant: All digest data must be persisted
   */
  saveDigestHistory() {
    const historyPath = path.join(this.digestPath, 'digest-history.json');
    try {
      const data = {
        ...this.digestHistory,
        lastUpdated: new Date().toISOString()
      };
      fs.writeFileSync(historyPath, JSON.stringify(data, null, 2));
      console.log('[insight-digest] Digest history saved');
    } catch (error) {
      console.error('[insight-digest] Error saving digest history:', error.message);
    }
  }

  /**
   * Load digest templates
   * Invariant: Digest templates must be consistent
   */
  loadDigestTemplates() {
    const templatesPath = path.join(this.digestPath, 'digest-templates.json');
    try {
      if (fs.existsSync(templatesPath)) {
        const data = fs.readFileSync(templatesPath, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('[insight-digest] Error loading digest templates:', error.message);
    }
    
    // Default digest templates
    return {
      executive_summary: {
        title: 'Executive Summary',
        template: '## Executive Summary\n\n{summary}\n\n**Key Insights:**\n{key_insights}\n\n**Action Items:**\n{action_items}'
      },
      market_trends: {
        title: 'Market Trends',
        template: '## Market Trends\n\n{trends_summary}\n\n**Top Categories:**\n{top_categories}\n\n**Trending Keywords:**\n{trending_keywords}'
      },
      opportunities: {
        title: 'Opportunities',
        template: '## Opportunities\n\n{opportunities_summary}\n\n**High Priority:**\n{high_priority}\n\n**Quick Wins:**\n{quick_wins}'
      },
      solutions: {
        title: 'Solution Suggestions',
        template: '## Solution Suggestions\n\n{solutions_summary}\n\n**High Feasibility:**\n{high_feasibility}\n\n**Strategic Plays:**\n{strategic_plays}'
      },
      recommendations: {
        title: 'Recommendations',
        template: '## Recommendations\n\n{recommendations_summary}\n\n**Immediate Actions:**\n{immediate_actions}\n\n**Strategic Considerations:**\n{strategic_considerations}'
      }
    };
  }

  /**
   * Initialize digest scheduler
   * Invariant: Digest scheduler must be consistent
   */
  initializeDigestScheduler() {
    return {
      frequency: 'weekly', // daily, weekly, monthly
      lastGenerated: null,
      nextScheduled: null,
      autoGenerate: true
    };
  }

  /**
   * Generate insight digest
   * Invariant: Digest must be comprehensive and actionable
   */
  async generateInsightDigest(marketIntelligence, trendData, filterData) {
    console.log('[insight-digest] Generating insight digest...');
    
    try {
      const digest = {
        id: this.generateDigestId(),
        timestamp: new Date().toISOString(),
        type: 'weekly_insight_digest',
        sections: {}
      };
      
      // Generate executive summary
      digest.sections.executive_summary = await this.generateExecutiveSummary(marketIntelligence, trendData, filterData);
      
      // Generate market trends section
      digest.sections.market_trends = await this.generateMarketTrendsSection(trendData);
      
      // Generate opportunities section
      digest.sections.opportunities = await this.generateOpportunitiesSection(marketIntelligence);
      
      // Generate solutions section
      digest.sections.solutions = await this.generateSolutionsSection(marketIntelligence);
      
      // Generate recommendations section
      digest.sections.recommendations = await this.generateRecommendationsSection(marketIntelligence, trendData);
      
      // Generate digest metrics (after all sections are populated)
      digest.metrics = this.calculateDigestMetrics(digest);
      
      // Save digest
      await this.saveDigest(digest);
      
      // Update digest history
      this.digestHistory.digests.push(digest);
      this.updateDigestMetrics(digest);
      this.saveDigestHistory();
      
      console.log(`[insight-digest] Generated digest ${digest.id} with ${Object.keys(digest.sections).length} sections`);
      
      return digest;
      
    } catch (error) {
      console.error('[insight-digest] Error generating insight digest:', error.message);
      throw error;
    }
  }

  /**
   * Generate executive summary
   * Invariant: Executive summary must be concise and actionable
   */
  async generateExecutiveSummary(marketIntelligence, trendData, filterData) {
    const summary = {
      title: 'Executive Summary',
      content: this.digestTemplates.executive_summary.template,
      data: {
        summary: this.createExecutiveSummaryText(marketIntelligence, trendData, filterData),
        key_insights: this.extractKeyInsights(marketIntelligence, trendData),
        action_items: this.extractActionItems(marketIntelligence)
      }
    };
    
    // Replace template placeholders
    summary.content = this.replaceTemplatePlaceholders(summary.content, summary.data);
    
    return summary;
  }

  /**
   * Create executive summary text
   * Invariant: Executive summary must be comprehensive
   */
  createExecutiveSummaryText(marketIntelligence, trendData, filterData) {
    const totalSignals = filterData.filter_metrics.total_signals;
    const filteredSignals = filterData.filter_metrics.filtered_count;
    const opportunities = marketIntelligence.opportunities.length;
    const solutions = marketIntelligence.solutions.length;
    const trends = trendData.trends.length;
    
    return `This week's development intelligence digest covers ${totalSignals} signals, with ${filteredSignals} high-quality signals identified. We've detected ${trends} significant trends, identified ${opportunities} market opportunities, and generated ${solutions} solution suggestions. The analysis reveals strong momentum in key development areas with actionable insights for immediate implementation.`;
  }

  /**
   * Extract key insights
   * Invariant: Key insights must be actionable
   */
  extractKeyInsights(marketIntelligence, trendData) {
    const insights = [];
    
    // Market intelligence insights
    if (marketIntelligence.opportunities.length > 0) {
      const highPriorityOpps = marketIntelligence.opportunities.filter(opp => opp.priority === 'high');
      if (highPriorityOpps.length > 0) {
        insights.push(`${highPriorityOpps.length} high-priority market opportunities identified`);
      }
    }
    
    // Trend insights
    if (trendData.trends.length > 0) {
      const strongTrends = trendData.trends.filter(trend => trend.strength > 0.7);
      if (strongTrends.length > 0) {
        insights.push(`${strongTrends.length} strong trends detected with high momentum`);
      }
    }
    
    // Solution insights
    if (marketIntelligence.solutions.length > 0) {
      const highFeasibilitySolutions = marketIntelligence.solutions.filter(sol => sol.feasibility > 0.7);
      if (highFeasibilitySolutions.length > 0) {
        insights.push(`${highFeasibilitySolutions.length} high-feasibility solutions available`);
      }
    }
    
    return insights;
  }

  /**
   * Extract action items
   * Invariant: Action items must be specific and actionable
   */
  extractActionItems(marketIntelligence) {
    const actionItems = [];
    
    // High priority opportunities
    const highPriorityOpps = marketIntelligence.opportunities.filter(opp => opp.priority === 'high');
    highPriorityOpps.forEach(opp => {
      actionItems.push(`Address ${opp.category} opportunity: ${opp.title}`);
    });
    
    // Quick wins
    const quickWins = marketIntelligence.solutions.filter(sol => sol.feasibility > 0.8 && sol.impact_potential > 0.7);
    quickWins.forEach(sol => {
      actionItems.push(`Implement quick win: ${sol.title}`);
    });
    
    return actionItems;
  }

  /**
   * Generate market trends section
   * Invariant: Market trends section must be comprehensive
   */
  async generateMarketTrendsSection(trendData) {
    const section = {
      title: 'Market Trends',
      content: this.digestTemplates.market_trends.template,
      data: {
        trends_summary: this.createTrendsSummary(trendData),
        top_categories: this.extractTopCategories(trendData),
        trending_keywords: this.extractTrendingKeywords(trendData)
      }
    };
    
    // Replace template placeholders
    section.content = this.replaceTemplatePlaceholders(section.content, section.data);
    
    return section;
  }

  /**
   * Create trends summary
   * Invariant: Trends summary must be comprehensive
   */
  createTrendsSummary(trendData) {
    const totalTrends = trendData.trends.length;
    const strongTrends = trendData.trends.filter(trend => trend.strength > 0.7).length;
    const momentum = trendData.momentum.overall_momentum;
    
    return `Analysis of ${totalTrends} trends reveals ${strongTrends} strong trends with overall momentum of ${(momentum * 100).toFixed(1)}%. The trend analysis indicates significant activity in key development areas with strong momentum indicators.`;
  }

  /**
   * Extract top categories
   * Invariant: Top categories must be representative
   */
  extractTopCategories(trendData) {
    const categories = {};
    trendData.trends.forEach(trend => {
      if (trend.category) {
        categories[trend.category] = (categories[trend.category] || 0) + 1;
      }
    });
    
    return Object.keys(categories)
      .sort((a, b) => categories[b] - categories[a])
      .slice(0, 5)
      .map(category => `- ${category}: ${categories[category]} trends`);
  }

  /**
   * Extract trending keywords
   * Invariant: Trending keywords must be representative
   */
  extractTrendingKeywords(trendData) {
    const keywords = {};
    trendData.trends.forEach(trend => {
      if (trend.keyword) {
        keywords[trend.keyword] = (keywords[trend.keyword] || 0) + 1;
      }
    });
    
    return Object.keys(keywords)
      .sort((a, b) => keywords[b] - keywords[a])
      .slice(0, 10)
      .map(keyword => `- "${keyword}": ${keywords[keyword]} occurrences`);
  }

  /**
   * Generate opportunities section
   * Invariant: Opportunities section must be actionable
   */
  async generateOpportunitiesSection(marketIntelligence) {
    const section = {
      title: 'Opportunities',
      content: this.digestTemplates.opportunities.template,
      data: {
        opportunities_summary: this.createOpportunitiesSummary(marketIntelligence),
        high_priority: this.extractHighPriorityOpportunities(marketIntelligence),
        quick_wins: this.extractQuickWins(marketIntelligence)
      }
    };
    
    // Replace template placeholders
    section.content = this.replaceTemplatePlaceholders(section.content, section.data);
    
    return section;
  }

  /**
   * Create opportunities summary
   * Invariant: Opportunities summary must be comprehensive
   */
  createOpportunitiesSummary(marketIntelligence) {
    const totalOpps = marketIntelligence.opportunities.length;
    const highPriorityOpps = marketIntelligence.opportunities.filter(opp => opp.priority === 'high').length;
    const avgScore = marketIntelligence.opportunities.reduce((sum, opp) => sum + opp.opportunity_score, 0) / totalOpps;
    
    return `Identified ${totalOpps} market opportunities with ${highPriorityOpps} high-priority items. Average opportunity score is ${avgScore.toFixed(2)}, indicating strong potential for development initiatives.`;
  }

  /**
   * Extract high priority opportunities
   * Invariant: High priority opportunities must be actionable
   */
  extractHighPriorityOpportunities(marketIntelligence) {
    return marketIntelligence.opportunities
      .filter(opp => opp.priority === 'high')
      .slice(0, 5)
      .map(opp => `- **${opp.title}**: ${opp.description} (Score: ${(opp.opportunity_score * 100).toFixed(1)}%)`);
  }

  /**
   * Extract quick wins
   * Invariant: Quick wins must be actionable
   */
  extractQuickWins(marketIntelligence) {
    return marketIntelligence.solutions
      .filter(sol => sol.feasibility > 0.8 && sol.impact_potential > 0.7)
      .slice(0, 3)
      .map(sol => `- **${sol.title}**: ${sol.description} (Feasibility: ${(sol.feasibility * 100).toFixed(1)}%)`);
  }

  /**
   * Generate solutions section
   * Invariant: Solutions section must be actionable
   */
  async generateSolutionsSection(marketIntelligence) {
    const section = {
      title: 'Solution Suggestions',
      content: this.digestTemplates.solutions.template,
      data: {
        solutions_summary: this.createSolutionsSummary(marketIntelligence),
        high_feasibility: this.extractHighFeasibilitySolutions(marketIntelligence),
        strategic_plays: this.extractStrategicPlays(marketIntelligence)
      }
    };
    
    // Replace template placeholders
    section.content = this.replaceTemplatePlaceholders(section.content, section.data);
    
    return section;
  }

  /**
   * Create solutions summary
   * Invariant: Solutions summary must be comprehensive
   */
  createSolutionsSummary(marketIntelligence) {
    const totalSolutions = marketIntelligence.solutions.length;
    const highFeasibilitySolutions = marketIntelligence.solutions.filter(sol => sol.feasibility > 0.7).length;
    const avgFeasibility = marketIntelligence.solutions.reduce((sum, sol) => sum + sol.feasibility, 0) / totalSolutions;
    
    return `Generated ${totalSolutions} solution suggestions with ${highFeasibilitySolutions} high-feasibility options. Average feasibility score is ${avgFeasibility.toFixed(2)}, indicating strong implementation potential.`;
  }

  /**
   * Extract high feasibility solutions
   * Invariant: High feasibility solutions must be actionable
   */
  extractHighFeasibilitySolutions(marketIntelligence) {
    return marketIntelligence.solutions
      .filter(sol => sol.feasibility > 0.7)
      .slice(0, 5)
      .map(sol => `- **${sol.title}**: ${sol.description} (Feasibility: ${(sol.feasibility * 100).toFixed(1)}%)`);
  }

  /**
   * Extract strategic plays
   * Invariant: Strategic plays must be actionable
   */
  extractStrategicPlays(marketIntelligence) {
    return marketIntelligence.solutions
      .filter(sol => sol.impact_potential > 0.8)
      .slice(0, 3)
      .map(sol => `- **${sol.title}**: ${sol.description} (Impact: ${(sol.impact_potential * 100).toFixed(1)}%)`);
  }

  /**
   * Generate recommendations section
   * Invariant: Recommendations section must be actionable
   */
  async generateRecommendationsSection(marketIntelligence, trendData) {
    const section = {
      title: 'Recommendations',
      content: this.digestTemplates.recommendations.template,
      data: {
        recommendations_summary: this.createRecommendationsSummary(marketIntelligence, trendData),
        immediate_actions: this.extractImmediateActions(marketIntelligence),
        strategic_considerations: this.extractStrategicConsiderations(marketIntelligence, trendData)
      }
    };
    
    // Replace template placeholders
    section.content = this.replaceTemplatePlaceholders(section.content, section.data);
    
    return section;
  }

  /**
   * Create recommendations summary
   * Invariant: Recommendations summary must be comprehensive
   */
  createRecommendationsSummary(marketIntelligence, trendData) {
    const totalOpps = marketIntelligence.opportunities.length;
    const totalSolutions = marketIntelligence.solutions.length;
    const strongTrends = trendData.trends.filter(trend => trend.strength > 0.7).length;
    
    return `Based on analysis of ${totalOpps} opportunities, ${totalSolutions} solutions, and ${strongTrends} strong trends, we recommend immediate action on high-priority items and strategic consideration of long-term plays.`;
  }

  /**
   * Extract immediate actions
   * Invariant: Immediate actions must be actionable
   */
  extractImmediateActions(marketIntelligence) {
    const actions = [];
    
    // High priority opportunities
    const highPriorityOpps = marketIntelligence.opportunities.filter(opp => opp.priority === 'high');
    highPriorityOpps.slice(0, 3).forEach(opp => {
      actions.push(`- Address ${opp.category} opportunity: ${opp.title}`);
    });
    
    // Quick wins
    const quickWins = marketIntelligence.solutions.filter(sol => sol.feasibility > 0.8);
    quickWins.slice(0, 2).forEach(sol => {
      actions.push(`- Implement quick win: ${sol.title}`);
    });
    
    return actions;
  }

  /**
   * Extract strategic considerations
   * Invariant: Strategic considerations must be actionable
   */
  extractStrategicConsiderations(marketIntelligence, trendData) {
    const considerations = [];
    
    // Strategic solutions
    const strategicSolutions = marketIntelligence.solutions.filter(sol => sol.impact_potential > 0.8);
    strategicSolutions.slice(0, 2).forEach(sol => {
      considerations.push(`- Consider strategic play: ${sol.title}`);
    });
    
    // Strong trends
    const strongTrends = trendData.trends.filter(trend => trend.strength > 0.7);
    strongTrends.slice(0, 2).forEach(trend => {
      considerations.push(`- Monitor trend: ${trend.description}`);
    });
    
    return considerations;
  }

  /**
   * Replace template placeholders
   * Invariant: Template replacement must be consistent
   */
  replaceTemplatePlaceholders(template, data) {
    let content = template;
    
    Object.keys(data).forEach(key => {
      const placeholder = `{${key}}`;
      const value = Array.isArray(data[key]) ? data[key].join('\n') : data[key];
      content = content.replace(new RegExp(placeholder, 'g'), value);
    });
    
    return content;
  }

  /**
   * Calculate digest metrics
   * Invariant: Digest metrics must be accurate
   */
  calculateDigestMetrics(digest) {
    const metrics = {
      total_sections: Object.keys(digest.sections).length,
      total_words: this.countWords(digest),
      total_insights: this.countInsights(digest),
      total_actions: this.countActions(digest)
    };
    
    // Calculate digest score after metrics are set
    metrics.digest_score = this.calculateDigestScore(digest, metrics);
    
    return metrics;
  }

  /**
   * Count words in digest
   * Invariant: Word count must be accurate
   */
  countWords(digest) {
    let wordCount = 0;
    Object.values(digest.sections).forEach(section => {
      if (section.content) {
        wordCount += section.content.split(' ').length;
      }
    });
    return wordCount;
  }

  /**
   * Count insights in digest
   * Invariant: Insight count must be accurate
   */
  countInsights(digest) {
    let insightCount = 0;
    Object.values(digest.sections).forEach(section => {
      if (section.data && section.data.key_insights) {
        insightCount += section.data.key_insights.length;
      }
    });
    return insightCount;
  }

  /**
   * Count actions in digest
   * Invariant: Action count must be accurate
   */
  countActions(digest) {
    let actionCount = 0;
    Object.values(digest.sections).forEach(section => {
      if (section.data && section.data.action_items) {
        actionCount += section.data.action_items.length;
      }
      if (section.data && section.data.immediate_actions) {
        actionCount += section.data.immediate_actions.length;
      }
    });
    return actionCount;
  }

  /**
   * Calculate digest score
   * Invariant: Digest score must be representative
   */
  calculateDigestScore(digest, metrics) {
    let score = 0;
    
    // Section completeness (40%)
    score += (Object.keys(digest.sections).length / 5) * 0.4;
    
    // Content quality (30%)
    score += Math.min(metrics.total_words / 1000, 1) * 0.3;
    
    // Actionability (30%)
    score += Math.min(metrics.total_actions / 10, 1) * 0.3;
    
    return Math.min(score, 1);
  }

  /**
   * Update digest metrics
   * Invariant: Digest metrics must be accurate
   */
  updateDigestMetrics(digest) {
    const metrics = this.digestHistory.digest_metrics;
    
    // Update total metrics
    metrics.total_digests = (metrics.total_digests || 0) + 1;
    metrics.total_sections = (metrics.total_sections || 0) + digest.metrics.total_sections;
    metrics.total_words = (metrics.total_words || 0) + digest.metrics.total_words;
    metrics.total_insights = (metrics.total_insights || 0) + digest.metrics.total_insights;
    metrics.total_actions = (metrics.total_actions || 0) + digest.metrics.total_actions;
    
    // Update average metrics
    metrics.avg_sections = metrics.total_sections / metrics.total_digests;
    metrics.avg_words = metrics.total_words / metrics.total_digests;
    metrics.avg_insights = metrics.total_insights / metrics.total_digests;
    metrics.avg_actions = metrics.total_actions / metrics.total_digests;
    
    // Update digest score
    metrics.avg_digest_score = (metrics.avg_digest_score || 0) + digest.metrics.digest_score;
    metrics.avg_digest_score /= metrics.total_digests;
  }

  /**
   * Save digest to file
   * Invariant: Digest must be saved for future reference
   */
  async saveDigest(digest) {
    const digestFile = path.join(this.digestPath, `digest-${digest.id}.json`);
    try {
      fs.writeFileSync(digestFile, JSON.stringify(digest, null, 2));
      console.log(`[insight-digest] Digest ${digest.id} saved to ${digestFile}`);
    } catch (error) {
      console.error('[insight-digest] Error saving digest:', error.message);
    }
  }

  /**
   * Generate digest ID
   * Invariant: Digest ID must be unique
   */
  generateDigestId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `digest-${timestamp}-${random}`;
  }

  /**
   * Get digest summary
   * Invariant: Digest summary must be comprehensive
   */
  getDigestSummary() {
    return {
      total_digests: this.digestHistory.digests.length,
      last_updated: this.digestHistory.lastUpdated,
      digest_metrics: this.digestHistory.digest_metrics,
      recent_digests: this.digestHistory.digests.slice(-5)
    };
  }

  /**
   * Schedule automatic digest generation
   * Invariant: Digest scheduling must be consistent
   */
  scheduleDigestGeneration() {
    if (this.digestScheduler.autoGenerate) {
      const now = new Date();
      const lastGenerated = this.digestScheduler.lastGenerated ? new Date(this.digestScheduler.lastGenerated) : null;
      
      // Check if it's time to generate a new digest
      if (!lastGenerated || this.shouldGenerateDigest(now, lastGenerated)) {
        this.digestScheduler.lastGenerated = now.toISOString();
        this.digestScheduler.nextScheduled = this.calculateNextScheduled(now);
        
        console.log('[insight-digest] Scheduled digest generation');
        return true;
      }
    }
    
    return false;
  }

  /**
   * Check if digest should be generated
   * Invariant: Digest generation timing must be consistent
   */
  shouldGenerateDigest(now, lastGenerated) {
    const frequency = this.digestScheduler.frequency;
    const timeDiff = now.getTime() - lastGenerated.getTime();
    
    switch (frequency) {
      case 'daily':
        return timeDiff >= 24 * 60 * 60 * 1000; // 24 hours
      case 'weekly':
        return timeDiff >= 7 * 24 * 60 * 60 * 1000; // 7 days
      case 'monthly':
        return timeDiff >= 30 * 24 * 60 * 60 * 1000; // 30 days
      default:
        return false;
    }
  }

  /**
   * Calculate next scheduled time
   * Invariant: Next scheduled time must be accurate
   */
  calculateNextScheduled(now) {
    const frequency = this.digestScheduler.frequency;
    const next = new Date(now);
    
    switch (frequency) {
      case 'daily':
        next.setDate(next.getDate() + 1);
        break;
      case 'weekly':
        next.setDate(next.getDate() + 7);
        break;
      case 'monthly':
        next.setMonth(next.getMonth() + 1);
        break;
    }
    
    return next.toISOString();
  }
}

module.exports = InsightDigestSystem;
