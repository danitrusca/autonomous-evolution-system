/**
 * External Signal Processor
 * Monitors external development signals for autonomous evolution enhancement
 * Based on Reddit Market Intelligence AI Agent patterns
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

class ExternalSignalProcessor {
  constructor() {
    this.signalsPath = path.join(__dirname, '..', 'signals');
    this.ensureSignalsDirectory();
    this.signalHistory = this.loadSignalHistory();
    this.patterns = new Map();
    this.trends = new Map();
  }

  /**
   * Ensure signals directory exists
   * Invariant: Signals directory must exist for data persistence
   */
  ensureSignalsDirectory() {
    if (!fs.existsSync(this.signalsPath)) {
      fs.mkdirSync(this.signalsPath, { recursive: true });
      console.log('[external-signal-processor] Created signals directory');
    }
  }

  /**
   * Load signal history from persistent storage
   * Invariant: Signal history must be maintained for pattern detection
   */
  loadSignalHistory() {
    const historyPath = path.join(this.signalsPath, 'signal-history.json');
    try {
      if (fs.existsSync(historyPath)) {
        const data = fs.readFileSync(historyPath, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('[external-signal-processor] Error loading signal history:', error.message);
    }
    return {
      signals: [],
      patterns: {},
      trends: {},
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Save signal history to persistent storage
   * Invariant: All signal data must be persisted for analysis
   */
  saveSignalHistory() {
    const historyPath = path.join(this.signalsPath, 'signal-history.json');
    try {
      const data = {
        ...this.signalHistory,
        lastUpdated: new Date().toISOString()
      };
      fs.writeFileSync(historyPath, JSON.stringify(data, null, 2));
      console.log('[external-signal-processor] Signal history saved');
    } catch (error) {
      console.error('[external-signal-processor] Error saving signal history:', error.message);
    }
  }

  /**
   * Process external development signals
   * Invariant: All external signals must be processed and categorized
   */
  async processExternalSignals() {
    console.log('[external-signal-processor] Processing external signals...');
    
    try {
      const signals = await this.collectSignals();
      const processedSignals = await this.processSignals(signals);
      const patterns = this.detectPatterns(processedSignals);
      const trends = this.analyzeTrends(patterns);
      
      // Update signal history
      this.signalHistory.signals.push(...processedSignals);
      this.signalHistory.patterns = { ...this.signalHistory.patterns, ...patterns };
      this.signalHistory.trends = { ...this.signalHistory.trends, ...trends };
      
      // Save updated history
      this.saveSignalHistory();
      
      // Generate insights
      const insights = this.generateInsights(patterns, trends);
      
      console.log(`[external-signal-processor] Processed ${processedSignals.length} signals, detected ${Object.keys(patterns).length} patterns`);
      
      return {
        signals: processedSignals,
        patterns,
        trends,
        insights
      };
      
    } catch (error) {
      console.error('[external-signal-processor] Error processing external signals:', error.message);
      throw error;
    }
  }

  /**
   * Collect signals from external sources
   * Invariant: All signal sources must be monitored consistently
   */
  async collectSignals() {
    const signals = [];
    
    try {
      // GitHub trending repositories
      const githubSignals = await this.collectGitHubSignals();
      signals.push(...githubSignals);
      
      // Stack Overflow trends
      const stackOverflowSignals = await this.collectStackOverflowSignals();
      signals.push(...stackOverflowSignals);
      
      // Developer forum discussions
      const forumSignals = await this.collectForumSignals();
      signals.push(...forumSignals);
      
      // Technology adoption signals
      const adoptionSignals = await this.collectAdoptionSignals();
      signals.push(...adoptionSignals);
      
      console.log(`[external-signal-processor] Collected ${signals.length} signals from external sources`);
      
    } catch (error) {
      console.error('[external-signal-processor] Error collecting signals:', error.message);
    }
    
    return signals;
  }

  /**
   * Collect signals from GitHub trending repositories
   * Invariant: GitHub signals must be relevant to development trends
   */
  async collectGitHubSignals() {
    try {
      // This would integrate with GitHub API in a real implementation
      // For now, we'll simulate the structure
      const githubSignals = [
        {
          source: 'github',
          type: 'trending_repo',
          title: 'New AI framework gaining traction',
          description: 'Repository showing rapid growth in AI development',
          url: 'https://github.com/example/ai-framework',
          stars: 1500,
          language: 'TypeScript',
          category: 'ai_development',
          timestamp: new Date().toISOString(),
          relevance_score: 0.8
        }
      ];
      
      console.log(`[external-signal-processor] Collected ${githubSignals.length} GitHub signals`);
      return githubSignals;
      
    } catch (error) {
      console.error('[external-signal-processor] Error collecting GitHub signals:', error.message);
      return [];
    }
  }

  /**
   * Collect signals from Stack Overflow trends
   * Invariant: Stack Overflow signals must indicate developer pain points
   */
  async collectStackOverflowSignals() {
    try {
      // This would integrate with Stack Overflow API in a real implementation
      const stackOverflowSignals = [
        {
          source: 'stackoverflow',
          type: 'trending_question',
          title: 'How to implement autonomous systems in JavaScript?',
          description: 'Question showing high engagement and developer interest',
          url: 'https://stackoverflow.com/questions/example',
          views: 5000,
          tags: ['javascript', 'autonomous-systems', 'ai'],
          category: 'autonomous_development',
          timestamp: new Date().toISOString(),
          relevance_score: 0.9
        }
      ];
      
      console.log(`[external-signal-processor] Collected ${stackOverflowSignals.length} Stack Overflow signals`);
      return stackOverflowSignals;
      
    } catch (error) {
      console.error('[external-signal-processor] Error collecting Stack Overflow signals:', error.message);
      return [];
    }
  }

  /**
   * Collect signals from developer forums
   * Invariant: Forum signals must capture developer discussions and frustrations
   */
  async collectForumSignals() {
    try {
      const forumSignals = [
        {
          source: 'developer_forum',
          type: 'discussion',
          title: 'Frustration with current AI development tools',
          description: 'Developer expressing need for better AI development workflow',
          url: 'https://forum.example.com/discussion',
          engagement: 'high',
          sentiment: 'frustrated',
          category: 'developer_frustration',
          timestamp: new Date().toISOString(),
          relevance_score: 0.7
        }
      ];
      
      console.log(`[external-signal-processor] Collected ${forumSignals.length} forum signals`);
      return forumSignals;
      
    } catch (error) {
      console.error('[external-signal-processor] Error collecting forum signals:', error.message);
      return [];
    }
  }

  /**
   * Collect technology adoption signals
   * Invariant: Adoption signals must indicate emerging technology trends
   */
  async collectAdoptionSignals() {
    try {
      const adoptionSignals = [
        {
          source: 'technology_adoption',
          type: 'emerging_trend',
          title: 'Rapid adoption of AI-powered development tools',
          description: 'Multiple indicators showing increased AI tool adoption',
          metrics: {
            adoption_rate: 0.3,
            growth_rate: 0.15,
            developer_satisfaction: 0.8
          },
          category: 'ai_adoption',
          timestamp: new Date().toISOString(),
          relevance_score: 0.9
        }
      ];
      
      console.log(`[external-signal-processor] Collected ${adoptionSignals.length} adoption signals`);
      return adoptionSignals;
      
    } catch (error) {
      console.error('[external-signal-processor] Error collecting adoption signals:', error.message);
      return [];
    }
  }

  /**
   * Process collected signals
   * Invariant: All signals must be processed and categorized
   */
  async processSignals(signals) {
    const processedSignals = signals.map(signal => ({
      ...signal,
      processed_at: new Date().toISOString(),
      processed: true,
      analysis: this.analyzeSignal(signal)
    }));
    
    console.log(`[external-signal-processor] Processed ${processedSignals.length} signals`);
    return processedSignals;
  }

  /**
   * Analyze individual signal
   * Invariant: Each signal must be analyzed for relevance and impact
   */
  analyzeSignal(signal) {
    return {
      relevance_score: signal.relevance_score || 0.5,
      impact_potential: this.calculateImpactPotential(signal),
      trend_indicator: this.calculateTrendIndicator(signal),
      category: signal.category,
      keywords: this.extractKeywords(signal),
      sentiment: this.analyzeSentiment(signal)
    };
  }

  /**
   * Calculate impact potential for signal
   * Invariant: Impact potential must be calculated consistently
   */
  calculateImpactPotential(signal) {
    let impact = 0;
    
    // GitHub stars indicate impact
    if (signal.stars) {
      impact += Math.min(signal.stars / 1000, 1) * 0.3;
    }
    
    // Stack Overflow views indicate impact
    if (signal.views) {
      impact += Math.min(signal.views / 10000, 1) * 0.3;
    }
    
    // Engagement level indicates impact
    if (signal.engagement === 'high') {
      impact += 0.2;
    }
    
    // Relevance score contributes to impact
    impact += signal.relevance_score * 0.2;
    
    return Math.min(impact, 1);
  }

  /**
   * Calculate trend indicator for signal
   * Invariant: Trend indicators must be consistent across signal types
   */
  calculateTrendIndicator(signal) {
    let trend = 0;
    
    // Recent signals have higher trend weight
    const signalAge = Date.now() - new Date(signal.timestamp).getTime();
    const ageWeight = Math.max(0, 1 - (signalAge / (7 * 24 * 60 * 60 * 1000))); // 7 days
    trend += ageWeight * 0.4;
    
    // High engagement indicates trend
    if (signal.engagement === 'high') {
      trend += 0.3;
    }
    
    // High relevance indicates trend
    trend += signal.relevance_score * 0.3;
    
    return Math.min(trend, 1);
  }

  /**
   * Extract keywords from signal
   * Invariant: Keywords must be relevant to development trends
   */
  extractKeywords(signal) {
    const text = `${signal.title} ${signal.description}`.toLowerCase();
    const keywords = [];
    
    // Development-related keywords
    const devKeywords = ['ai', 'autonomous', 'development', 'framework', 'tool', 'system', 'automation'];
    devKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        keywords.push(keyword);
      }
    });
    
    return keywords;
  }

  /**
   * Analyze sentiment of signal
   * Invariant: Sentiment analysis must be consistent
   */
  analyzeSentiment(signal) {
    const text = `${signal.title} ${signal.description}`.toLowerCase();
    
    // Simple sentiment analysis
    const positiveWords = ['great', 'amazing', 'excellent', 'love', 'fantastic'];
    const negativeWords = ['frustrated', 'hate', 'terrible', 'awful', 'problem'];
    
    let sentiment = 0;
    positiveWords.forEach(word => {
      if (text.includes(word)) sentiment += 0.2;
    });
    negativeWords.forEach(word => {
      if (text.includes(word)) sentiment -= 0.2;
    });
    
    if (sentiment > 0.1) return 'positive';
    if (sentiment < -0.1) return 'negative';
    return 'neutral';
  }

  /**
   * Detect patterns in processed signals
   * Invariant: Pattern detection must identify meaningful trends
   */
  detectPatterns(signals) {
    const patterns = {};
    
    // Group signals by category
    const categoryGroups = {};
    signals.forEach(signal => {
      if (!categoryGroups[signal.category]) {
        categoryGroups[signal.category] = [];
      }
      categoryGroups[signal.category].push(signal);
    });
    
    // Analyze each category for patterns
    Object.keys(categoryGroups).forEach(category => {
      const categorySignals = categoryGroups[category];
      if (categorySignals.length >= 3) { // Minimum signals for pattern
        patterns[category] = {
          frequency: categorySignals.length,
          avg_relevance: categorySignals.reduce((sum, s) => sum + s.analysis.relevance_score, 0) / categorySignals.length,
          avg_impact: categorySignals.reduce((sum, s) => sum + s.analysis.impact_potential, 0) / categorySignals.length,
          trend_strength: categorySignals.reduce((sum, s) => sum + s.analysis.trend_indicator, 0) / categorySignals.length,
          keywords: this.extractCategoryKeywords(categorySignals),
          sentiment: this.analyzeCategorySentiment(categorySignals)
        };
      }
    });
    
    console.log(`[external-signal-processor] Detected ${Object.keys(patterns).length} patterns`);
    return patterns;
  }

  /**
   * Extract keywords for category
   * Invariant: Category keywords must be representative
   */
  extractCategoryKeywords(categorySignals) {
    const keywordCounts = {};
    categorySignals.forEach(signal => {
      signal.analysis.keywords.forEach(keyword => {
        keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
      });
    });
    
    return Object.keys(keywordCounts)
      .sort((a, b) => keywordCounts[b] - keywordCounts[a])
      .slice(0, 5); // Top 5 keywords
  }

  /**
   * Analyze sentiment for category
   * Invariant: Category sentiment must be representative
   */
  analyzeCategorySentiment(categorySignals) {
    const sentiments = categorySignals.map(s => s.analysis.sentiment);
    const positive = sentiments.filter(s => s === 'positive').length;
    const negative = sentiments.filter(s => s === 'negative').length;
    const neutral = sentiments.filter(s => s === 'neutral').length;
    
    if (positive > negative && positive > neutral) return 'positive';
    if (negative > positive && negative > neutral) return 'negative';
    return 'neutral';
  }

  /**
   * Analyze trends from patterns
   * Invariant: Trend analysis must identify emerging opportunities
   */
  analyzeTrends(patterns) {
    const trends = {};
    
    Object.keys(patterns).forEach(category => {
      const pattern = patterns[category];
      if (pattern.trend_strength > 0.6 && pattern.avg_impact > 0.5) {
        trends[category] = {
          strength: pattern.trend_strength,
          impact: pattern.avg_impact,
          opportunity: this.calculateOpportunity(pattern),
          keywords: pattern.keywords,
          sentiment: pattern.sentiment
        };
      }
    });
    
    console.log(`[external-signal-processor] Identified ${Object.keys(trends).length} trends`);
    return trends;
  }

  /**
   * Calculate opportunity score for trend
   * Invariant: Opportunity calculation must be consistent
   */
  calculateOpportunity(pattern) {
    let opportunity = 0;
    
    // High frequency indicates opportunity
    opportunity += Math.min(pattern.frequency / 10, 1) * 0.3;
    
    // High relevance indicates opportunity
    opportunity += pattern.avg_relevance * 0.3;
    
    // High impact indicates opportunity
    opportunity += pattern.avg_impact * 0.3;
    
    // Positive sentiment indicates opportunity
    if (pattern.sentiment === 'positive') {
      opportunity += 0.1;
    }
    
    return Math.min(opportunity, 1);
  }

  /**
   * Generate insights from patterns and trends
   * Invariant: Insights must be actionable and relevant
   */
  generateInsights(patterns, trends) {
    const insights = [];
    
    // Generate insights from trends
    Object.keys(trends).forEach(category => {
      const trend = trends[category];
      insights.push({
        type: 'trend_opportunity',
        category,
        title: `Emerging trend in ${category}`,
        description: `Strong trend detected with ${(trend.strength * 100).toFixed(1)}% strength and ${(trend.impact * 100).toFixed(1)}% impact potential`,
        opportunity_score: trend.opportunity,
        keywords: trend.keywords,
        sentiment: trend.sentiment,
        actionable: true
      });
    });
    
    // Generate insights from patterns
    Object.keys(patterns).forEach(category => {
      const pattern = patterns[category];
      if (pattern.sentiment === 'negative' && pattern.avg_impact > 0.6) {
        insights.push({
          type: 'problem_opportunity',
          category,
          title: `Problem opportunity in ${category}`,
          description: `High-impact problem detected with ${pattern.frequency} occurrences and ${(pattern.avg_impact * 100).toFixed(1)}% impact`,
          opportunity_score: pattern.avg_impact,
          keywords: pattern.keywords,
          sentiment: pattern.sentiment,
          actionable: true
        });
      }
    });
    
    console.log(`[external-signal-processor] Generated ${insights.length} insights`);
    return insights;
  }

  /**
   * Get signal summary for reporting
   * Invariant: Summary must provide actionable intelligence
   */
  getSignalSummary() {
    return {
      total_signals: this.signalHistory.signals.length,
      active_patterns: Object.keys(this.signalHistory.patterns).length,
      active_trends: Object.keys(this.signalHistory.trends).length,
      last_updated: this.signalHistory.lastUpdated,
      top_categories: this.getTopCategories(),
      top_keywords: this.getTopKeywords(),
      sentiment_distribution: this.getSentimentDistribution()
    };
  }

  /**
   * Get top categories by frequency
   * Invariant: Top categories must be representative
   */
  getTopCategories() {
    const categoryCounts = {};
    this.signalHistory.signals.forEach(signal => {
      categoryCounts[signal.category] = (categoryCounts[signal.category] || 0) + 1;
    });
    
    return Object.keys(categoryCounts)
      .sort((a, b) => categoryCounts[b] - categoryCounts[a])
      .slice(0, 5);
  }

  /**
   * Get top keywords across all signals
   * Invariant: Top keywords must be representative
   */
  getTopKeywords() {
    const keywordCounts = {};
    this.signalHistory.signals.forEach(signal => {
      if (signal.analysis && signal.analysis.keywords) {
        signal.analysis.keywords.forEach(keyword => {
          keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
        });
      }
    });
    
    return Object.keys(keywordCounts)
      .sort((a, b) => keywordCounts[b] - keywordCounts[a])
      .slice(0, 10);
  }

  /**
   * Get sentiment distribution
   * Invariant: Sentiment distribution must be accurate
   */
  getSentimentDistribution() {
    const sentiments = { positive: 0, negative: 0, neutral: 0 };
    this.signalHistory.signals.forEach(signal => {
      if (signal.analysis && signal.analysis.sentiment) {
        sentiments[signal.analysis.sentiment]++;
      }
    });
    
    const total = sentiments.positive + sentiments.negative + sentiments.neutral;
    if (total > 0) {
      return {
        positive: (sentiments.positive / total * 100).toFixed(1) + '%',
        negative: (sentiments.negative / total * 100).toFixed(1) + '%',
        neutral: (sentiments.neutral / total * 100).toFixed(1) + '%'
      };
    }
    
    return { positive: '0%', negative: '0%', neutral: '0%' };
  }
}

module.exports = ExternalSignalProcessor;
