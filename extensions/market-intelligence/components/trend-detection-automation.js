/**
 * Trend Detection Automation
 * Automated system for detecting and analyzing development trends
 * Based on Reddit Market Intelligence AI Agent patterns
 */

const fs = require('fs');
const path = require('path');

class TrendDetectionAutomation {
  constructor() {
    this.trendsPath = path.join(__dirname, '..', 'trends');
    this.ensureTrendsDirectory();
    this.trendHistory = this.loadTrendHistory();
    this.trendModels = this.initializeTrendModels();
    this.trendAlerts = [];
  }

  /**
   * Ensure trends directory exists
   * Invariant: Trends directory must exist for trend persistence
   */
  ensureTrendsDirectory() {
    if (!fs.existsSync(this.trendsPath)) {
      fs.mkdirSync(this.trendsPath, { recursive: true });
      console.log('[trend-detection] Created trends directory');
    }
  }

  /**
   * Load trend history from persistent storage
   * Invariant: Trend history must be maintained for analysis
   */
  loadTrendHistory() {
    const historyPath = path.join(this.trendsPath, 'trend-history.json');
    try {
      if (fs.existsSync(historyPath)) {
        const data = fs.readFileSync(historyPath, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('[trend-detection] Error loading trend history:', error.message);
    }
    return {
      trends: [],
      trend_analysis: {},
      trend_alerts: [],
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Save trend history to persistent storage
   * Invariant: All trend data must be persisted
   */
  saveTrendHistory() {
    const historyPath = path.join(this.trendsPath, 'trend-history.json');
    try {
      const data = {
        ...this.trendHistory,
        lastUpdated: new Date().toISOString()
      };
      fs.writeFileSync(historyPath, JSON.stringify(data, null, 2));
      console.log('[trend-detection] Trend history saved');
    } catch (error) {
      console.error('[trend-detection] Error saving trend history:', error.message);
    }
  }

  /**
   * Initialize trend detection models
   * Invariant: Trend models must be consistent and effective
   */
  initializeTrendModels() {
    return {
      trend_analyzer: new TrendAnalyzer(),
      pattern_detector: new PatternDetector(),
      momentum_calculator: new MomentumCalculator(),
      correlation_analyzer: new CorrelationAnalyzer(),
      prediction_engine: new PredictionEngine()
    };
  }

  /**
   * Detect trends from filtered signals
   * Invariant: All trends must be detected and analyzed
   */
  async detectTrends(filteredSignals) {
    console.log('[trend-detection] Detecting trends from filtered signals...');
    
    try {
      const trendAnalysis = await this.analyzeTrends(filteredSignals);
      const trendPatterns = this.detectTrendPatterns(trendAnalysis);
      const trendMomentum = this.calculateTrendMomentum(trendPatterns);
      const trendCorrelations = this.analyzeTrendCorrelations(trendPatterns);
      const trendPredictions = this.generateTrendPredictions(trendPatterns);
      
      // Create trend alerts
      const trendAlerts = this.generateTrendAlerts(trendPatterns, trendMomentum);
      
      // Update trend history
      this.trendHistory.trends.push(...trendPatterns);
      this.trendHistory.trend_analysis = trendAnalysis;
      this.trendHistory.trend_alerts.push(...trendAlerts);
      
      // Save updated history
      this.saveTrendHistory();
      
      console.log(`[trend-detection] Detected ${trendPatterns.length} trends, ${trendAlerts.length} alerts`);
      
      return {
        trends: trendPatterns,
        analysis: trendAnalysis,
        momentum: trendMomentum,
        correlations: trendCorrelations,
        predictions: trendPredictions,
        alerts: trendAlerts
      };
      
    } catch (error) {
      console.error('[trend-detection] Error detecting trends:', error.message);
      throw error;
    }
  }

  /**
   * Analyze trends from signals
   * Invariant: Trend analysis must be comprehensive
   */
  async analyzeTrends(signals) {
    const analysis = {
      total_signals: signals.length,
      category_distribution: this.analyzeCategoryDistribution(signals),
      temporal_patterns: this.analyzeTemporalPatterns(signals),
      sentiment_analysis: this.analyzeSentimentTrends(signals),
      keyword_analysis: this.analyzeKeywordTrends(signals),
      impact_analysis: this.analyzeImpactTrends(signals)
    };
    
    console.log('[trend-detection] Trend analysis completed');
    return analysis;
  }

  /**
   * Analyze category distribution
   * Invariant: Category distribution must be accurate
   */
  analyzeCategoryDistribution(signals) {
    const distribution = {};
    signals.forEach(signal => {
      const category = signal.category || 'other';
      distribution[category] = (distribution[category] || 0) + 1;
    });
    
    // Calculate percentages
    const total = signals.length;
    Object.keys(distribution).forEach(category => {
      distribution[category] = {
        count: distribution[category],
        percentage: (distribution[category] / total * 100).toFixed(1)
      };
    });
    
    return distribution;
  }

  /**
   * Analyze temporal patterns
   * Invariant: Temporal patterns must be accurate
   */
  analyzeTemporalPatterns(signals) {
    const patterns = {
      hourly_distribution: {},
      daily_distribution: {},
      weekly_distribution: {}
    };
    
    signals.forEach(signal => {
      const date = new Date(signal.timestamp);
      const hour = date.getHours();
      const day = date.getDay();
      const week = Math.floor(date.getTime() / (7 * 24 * 60 * 60 * 1000));
      
      patterns.hourly_distribution[hour] = (patterns.hourly_distribution[hour] || 0) + 1;
      patterns.daily_distribution[day] = (patterns.daily_distribution[day] || 0) + 1;
      patterns.weekly_distribution[week] = (patterns.weekly_distribution[week] || 0) + 1;
    });
    
    return patterns;
  }

  /**
   * Analyze sentiment trends
   * Invariant: Sentiment trends must be representative
   */
  analyzeSentimentTrends(signals) {
    const sentimentCounts = { positive: 0, negative: 0, neutral: 0 };
    const sentimentTrends = { positive: [], negative: [], neutral: [] };
    
    signals.forEach(signal => {
      if (signal.ai_analysis && signal.ai_analysis.sentiment) {
        const sentiment = signal.ai_analysis.sentiment.sentiment;
        sentimentCounts[sentiment]++;
        sentimentTrends[sentiment].push({
          timestamp: signal.timestamp,
          score: signal.ai_analysis.sentiment.score
        });
      }
    });
    
    return {
      counts: sentimentCounts,
      trends: sentimentTrends,
      distribution: this.calculateSentimentDistribution(sentimentCounts)
    };
  }

  /**
   * Calculate sentiment distribution
   * Invariant: Sentiment distribution must be accurate
   */
  calculateSentimentDistribution(sentimentCounts) {
    const total = sentimentCounts.positive + sentimentCounts.negative + sentimentCounts.neutral;
    if (total === 0) return { positive: '0%', negative: '0%', neutral: '0%' };
    
    return {
      positive: (sentimentCounts.positive / total * 100).toFixed(1) + '%',
      negative: (sentimentCounts.negative / total * 100).toFixed(1) + '%',
      neutral: (sentimentCounts.neutral / total * 100).toFixed(1) + '%'
    };
  }

  /**
   * Analyze keyword trends
   * Invariant: Keyword trends must be representative
   */
  analyzeKeywordTrends(signals) {
    const keywordCounts = {};
    const keywordTrends = {};
    
    signals.forEach(signal => {
      if (signal.ai_analysis && signal.ai_analysis.keywords) {
        signal.ai_analysis.keywords.forEach(keyword => {
          keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
          if (!keywordTrends[keyword]) {
            keywordTrends[keyword] = [];
          }
          keywordTrends[keyword].push({
            timestamp: signal.timestamp,
            signal_id: signal.id || signal.title
          });
        });
      }
    });
    
    // Sort keywords by frequency
    const sortedKeywords = Object.keys(keywordCounts)
      .sort((a, b) => keywordCounts[b] - keywordCounts[a])
      .slice(0, 10);
    
    return {
      top_keywords: sortedKeywords,
      keyword_counts: keywordCounts,
      keyword_trends: keywordTrends
    };
  }

  /**
   * Analyze impact trends
   * Invariant: Impact trends must be representative
   */
  analyzeImpactTrends(signals) {
    const impactScores = signals.map(signal => {
      if (signal.ai_analysis && signal.ai_analysis.impact) {
        return {
          score: signal.ai_analysis.impact.score,
          timestamp: signal.timestamp,
          category: signal.category
        };
      }
      return null;
    }).filter(score => score !== null);
    
    const avgImpact = impactScores.reduce((sum, score) => sum + score.score, 0) / impactScores.length;
    const impactTrend = this.calculateImpactTrend(impactScores);
    
    return {
      average_impact: avgImpact,
      impact_trend: impactTrend,
      high_impact_signals: impactScores.filter(score => score.score > 0.8).length
    };
  }

  /**
   * Calculate impact trend
   * Invariant: Impact trend must be accurate
   */
  calculateImpactTrend(impactScores) {
    if (impactScores.length < 2) return 'stable';
    
    const recent = impactScores.slice(-5); // Last 5 signals
    const older = impactScores.slice(0, -5);
    
    if (recent.length === 0 || older.length === 0) return 'stable';
    
    const recentAvg = recent.reduce((sum, score) => sum + score.score, 0) / recent.length;
    const olderAvg = older.reduce((sum, score) => sum + score.score, 0) / older.length;
    
    const change = (recentAvg - olderAvg) / olderAvg;
    
    if (change > 0.1) return 'increasing';
    if (change < -0.1) return 'decreasing';
    return 'stable';
  }

  /**
   * Detect trend patterns
   * Invariant: Trend patterns must be meaningful
   */
  detectTrendPatterns(analysis) {
    const patterns = [];
    
    // Category trend patterns
    Object.keys(analysis.category_distribution).forEach(category => {
      const distribution = analysis.category_distribution[category];
      if (distribution.percentage > 20) { // More than 20% of signals
        patterns.push({
          type: 'category_trend',
          category,
          strength: distribution.percentage / 100,
          description: `${category} represents ${distribution.percentage}% of signals`,
          confidence: 0.8
        });
      }
    });
    
    // Keyword trend patterns
    analysis.keyword_analysis.top_keywords.forEach(keyword => {
      const count = analysis.keyword_analysis.keyword_counts[keyword];
      if (count > 3) { // Appears in more than 3 signals
        patterns.push({
          type: 'keyword_trend',
          keyword,
          strength: count / analysis.total_signals,
          description: `"${keyword}" appears in ${count} signals`,
          confidence: 0.7
        });
      }
    });
    
    // Sentiment trend patterns
    if (analysis.sentiment_analysis.distribution.positive > 60) {
      patterns.push({
        type: 'sentiment_trend',
        sentiment: 'positive',
        strength: parseFloat(analysis.sentiment_analysis.distribution.positive) / 100,
        description: `Positive sentiment dominates at ${analysis.sentiment_analysis.distribution.positive}`,
        confidence: 0.9
      });
    }
    
    // Impact trend patterns
    if (analysis.impact_analysis.impact_trend === 'increasing') {
      patterns.push({
        type: 'impact_trend',
        direction: 'increasing',
        strength: analysis.impact_analysis.average_impact,
        description: `Impact trend is increasing with average score ${analysis.impact_analysis.average_impact.toFixed(2)}`,
        confidence: 0.8
      });
    }
    
    console.log(`[trend-detection] Detected ${patterns.length} trend patterns`);
    return patterns;
  }

  /**
   * Calculate trend momentum
   * Invariant: Trend momentum must be accurate
   */
  calculateTrendMomentum(patterns) {
    const momentum = {
      overall_momentum: 0,
      category_momentum: {},
      keyword_momentum: {},
      sentiment_momentum: 0,
      impact_momentum: 0
    };
    
    patterns.forEach(pattern => {
      switch (pattern.type) {
        case 'category_trend':
          momentum.category_momentum[pattern.category] = pattern.strength;
          momentum.overall_momentum += pattern.strength * 0.3;
          break;
        case 'keyword_trend':
          momentum.keyword_momentum[pattern.keyword] = pattern.strength;
          momentum.overall_momentum += pattern.strength * 0.2;
          break;
        case 'sentiment_trend':
          momentum.sentiment_momentum = pattern.strength;
          momentum.overall_momentum += pattern.strength * 0.2;
          break;
        case 'impact_trend':
          momentum.impact_momentum = pattern.strength;
          momentum.overall_momentum += pattern.strength * 0.3;
          break;
      }
    });
    
    return momentum;
  }

  /**
   * Analyze trend correlations
   * Invariant: Trend correlations must be meaningful
   */
  analyzeTrendCorrelations(patterns) {
    const correlations = [];
    
    // Find correlations between different trend types
    const categoryTrends = patterns.filter(p => p.type === 'category_trend');
    const keywordTrends = patterns.filter(p => p.type === 'keyword_trend');
    
    categoryTrends.forEach(categoryTrend => {
      keywordTrends.forEach(keywordTrend => {
        const correlation = this.calculateCorrelation(categoryTrend, keywordTrend);
        if (correlation > 0.5) {
          correlations.push({
            type: 'category_keyword_correlation',
            category: categoryTrend.category,
            keyword: keywordTrend.keyword,
            correlation,
            description: `Strong correlation between ${categoryTrend.category} and "${keywordTrend.keyword}"`
          });
        }
      });
    });
    
    return correlations;
  }

  /**
   * Calculate correlation between trends
   * Invariant: Correlation calculation must be consistent
   */
  calculateCorrelation(trend1, trend2) {
    // Simple correlation based on strength similarity
    const strengthDiff = Math.abs(trend1.strength - trend2.strength);
    return 1 - strengthDiff; // Higher similarity = higher correlation
  }

  /**
   * Generate trend predictions
   * Invariant: Trend predictions must be based on historical data
   */
  generateTrendPredictions(patterns) {
    const predictions = [];
    
    patterns.forEach(pattern => {
      const prediction = this.predictTrendFuture(pattern);
      if (prediction) {
        predictions.push(prediction);
      }
    });
    
    return predictions;
  }

  /**
   * Predict future trend
   * Invariant: Predictions must be based on trend strength and momentum
   */
  predictTrendFuture(pattern) {
    const momentum = pattern.strength * pattern.confidence;
    
    if (momentum > 0.7) {
      return {
        trend: pattern,
        prediction: 'strong_continuation',
        confidence: momentum,
        description: `${pattern.type} trend likely to continue strongly`
      };
    } else if (momentum > 0.5) {
      return {
        trend: pattern,
        prediction: 'moderate_continuation',
        confidence: momentum,
        description: `${pattern.type} trend likely to continue moderately`
      };
    } else if (momentum > 0.3) {
      return {
        trend: pattern,
        prediction: 'weak_continuation',
        confidence: momentum,
        description: `${pattern.type} trend may continue weakly`
      };
    }
    
    return null;
  }

  /**
   * Generate trend alerts
   * Invariant: Trend alerts must be actionable
   */
  generateTrendAlerts(patterns, momentum) {
    const alerts = [];
    
    // High momentum alerts
    if (momentum.overall_momentum > 0.8) {
      alerts.push({
        type: 'high_momentum_alert',
        priority: 'high',
        title: 'High trend momentum detected',
        description: `Overall trend momentum is ${(momentum.overall_momentum * 100).toFixed(1)}% - strong trends detected`,
        actionable: true,
        timestamp: new Date().toISOString()
      });
    }
    
    // Category alerts
    Object.keys(momentum.category_momentum).forEach(category => {
      if (momentum.category_momentum[category] > 0.7) {
        alerts.push({
          type: 'category_alert',
          priority: 'medium',
          title: `Strong ${category} trend`,
          description: `${category} category shows strong momentum at ${(momentum.category_momentum[category] * 100).toFixed(1)}%`,
          actionable: true,
          timestamp: new Date().toISOString()
        });
      }
    });
    
    // Keyword alerts
    Object.keys(momentum.keyword_momentum).forEach(keyword => {
      if (momentum.keyword_momentum[keyword] > 0.6) {
        alerts.push({
          type: 'keyword_alert',
          priority: 'medium',
          title: `Trending keyword: ${keyword}`,
          description: `"${keyword}" shows strong momentum at ${(momentum.keyword_momentum[keyword] * 100).toFixed(1)}%`,
          actionable: true,
          timestamp: new Date().toISOString()
        });
      }
    });
    
    // Sentiment alerts
    if (momentum.sentiment_momentum > 0.8) {
      alerts.push({
        type: 'sentiment_alert',
        priority: 'high',
        title: 'Strong sentiment trend',
        description: `Sentiment momentum is ${(momentum.sentiment_momentum * 100).toFixed(1)}% - significant sentiment shift detected`,
        actionable: true,
        timestamp: new Date().toISOString()
      });
    }
    
    // Impact alerts
    if (momentum.impact_momentum > 0.7) {
      alerts.push({
        type: 'impact_alert',
        priority: 'high',
        title: 'High impact trend',
        description: `Impact momentum is ${(momentum.impact_momentum * 100).toFixed(1)}% - high impact signals detected`,
        actionable: true,
        timestamp: new Date().toISOString()
      });
    }
    
    return alerts;
  }

  /**
   * Get trend summary
   * Invariant: Trend summary must be comprehensive
   */
  getTrendSummary() {
    return {
      total_trends: this.trendHistory.trends.length,
      active_alerts: this.trendHistory.trend_alerts.length,
      last_updated: this.trendHistory.lastUpdated,
      trend_categories: this.getTrendCategories(),
      top_keywords: this.getTopKeywords(),
      momentum_summary: this.getMomentumSummary()
    };
  }

  /**
   * Get trend categories
   * Invariant: Trend categories must be representative
   */
  getTrendCategories() {
    const categories = {};
    this.trendHistory.trends.forEach(trend => {
      if (trend.category) {
        categories[trend.category] = (categories[trend.category] || 0) + 1;
      }
    });
    
    return Object.keys(categories)
      .sort((a, b) => categories[b] - categories[a])
      .slice(0, 5);
  }

  /**
   * Get top keywords
   * Invariant: Top keywords must be representative
   */
  getTopKeywords() {
    const keywordCounts = {};
    this.trendHistory.trends.forEach(trend => {
      if (trend.keyword) {
        keywordCounts[trend.keyword] = (keywordCounts[trend.keyword] || 0) + 1;
      }
    });
    
    return Object.keys(keywordCounts)
      .sort((a, b) => keywordCounts[b] - keywordCounts[a])
      .slice(0, 10);
  }

  /**
   * Get momentum summary
   * Invariant: Momentum summary must be accurate
   */
  getMomentumSummary() {
    const recentTrends = this.trendHistory.trends.slice(-10); // Last 10 trends
    if (recentTrends.length === 0) return { overall: 0, categories: {}, keywords: {} };
    
    const overallMomentum = recentTrends.reduce((sum, trend) => sum + (trend.strength || 0), 0) / recentTrends.length;
    
    return {
      overall: overallMomentum,
      categories: this.getCategoryMomentum(recentTrends),
      keywords: this.getKeywordMomentum(recentTrends)
    };
  }

  /**
   * Get category momentum
   * Invariant: Category momentum must be accurate
   */
  getCategoryMomentum(trends) {
    const categoryMomentum = {};
    trends.forEach(trend => {
      if (trend.category) {
        categoryMomentum[trend.category] = (categoryMomentum[trend.category] || 0) + (trend.strength || 0);
      }
    });
    
    return categoryMomentum;
  }

  /**
   * Get keyword momentum
   * Invariant: Keyword momentum must be accurate
   */
  getKeywordMomentum(trends) {
    const keywordMomentum = {};
    trends.forEach(trend => {
      if (trend.keyword) {
        keywordMomentum[trend.keyword] = (keywordMomentum[trend.keyword] || 0) + (trend.strength || 0);
      }
    });
    
    return keywordMomentum;
  }
}

/**
 * Trend Analyzer
 * Analyzes individual trends
 */
class TrendAnalyzer {
  analyze(trend) {
    return {
      strength: trend.strength || 0,
      direction: this.getTrendDirection(trend),
      velocity: this.calculateTrendVelocity(trend),
      acceleration: this.calculateTrendAcceleration(trend)
    };
  }
  
  getTrendDirection(trend) {
    if (trend.strength > 0.7) return 'strong';
    if (trend.strength > 0.4) return 'moderate';
    return 'weak';
  }
  
  calculateTrendVelocity(trend) {
    // Simple velocity calculation based on strength
    return trend.strength * 0.8;
  }
  
  calculateTrendAcceleration(trend) {
    // Simple acceleration calculation
    return trend.strength * 0.6;
  }
}

/**
 * Pattern Detector
 * Detects patterns in trends
 */
class PatternDetector {
  detect(trends) {
    const patterns = [];
    
    // Detect recurring patterns
    const recurringPatterns = this.detectRecurringPatterns(trends);
    patterns.push(...recurringPatterns);
    
    // Detect seasonal patterns
    const seasonalPatterns = this.detectSeasonalPatterns(trends);
    patterns.push(...seasonalPatterns);
    
    return patterns;
  }
  
  detectRecurringPatterns(trends) {
    const patterns = [];
    const trendTypes = {};
    
    trends.forEach(trend => {
      trendTypes[trend.type] = (trendTypes[trend.type] || 0) + 1;
    });
    
    Object.keys(trendTypes).forEach(type => {
      if (trendTypes[type] > 3) {
        patterns.push({
          type: 'recurring_pattern',
          pattern_type: type,
          frequency: trendTypes[type],
          description: `${type} pattern appears ${trendTypes[type]} times`
        });
      }
    });
    
    return patterns;
  }
  
  detectSeasonalPatterns(trends) {
    const patterns = [];
    const monthlyDistribution = {};
    
    trends.forEach(trend => {
      const month = new Date(trend.timestamp).getMonth();
      monthlyDistribution[month] = (monthlyDistribution[month] || 0) + 1;
    });
    
    // Detect seasonal variations
    const maxMonth = Object.keys(monthlyDistribution).reduce((a, b) => 
      monthlyDistribution[a] > monthlyDistribution[b] ? a : b
    );
    
    if (monthlyDistribution[maxMonth] > 3) {
      patterns.push({
        type: 'seasonal_pattern',
        peak_month: maxMonth,
        frequency: monthlyDistribution[maxMonth],
        description: `Peak activity in month ${maxMonth}`
      });
    }
    
    return patterns;
  }
}

/**
 * Momentum Calculator
 * Calculates trend momentum
 */
class MomentumCalculator {
  calculate(trends) {
    const momentum = {
      overall: 0,
      categories: {},
      keywords: {}
    };
    
    trends.forEach(trend => {
      momentum.overall += trend.strength || 0;
      
      if (trend.category) {
        momentum.categories[trend.category] = (momentum.categories[trend.category] || 0) + (trend.strength || 0);
      }
      
      if (trend.keyword) {
        momentum.keywords[trend.keyword] = (momentum.keywords[trend.keyword] || 0) + (trend.strength || 0);
      }
    });
    
    momentum.overall /= trends.length;
    
    return momentum;
  }
}

/**
 * Correlation Analyzer
 * Analyzes correlations between trends
 */
class CorrelationAnalyzer {
  analyze(trends) {
    const correlations = [];
    
    for (let i = 0; i < trends.length; i++) {
      for (let j = i + 1; j < trends.length; j++) {
        const correlation = this.calculateCorrelation(trends[i], trends[j]);
        if (correlation > 0.5) {
          correlations.push({
            trend1: trends[i],
            trend2: trends[j],
            correlation,
            description: `Strong correlation between ${trends[i].type} and ${trends[j].type}`
          });
        }
      }
    }
    
    return correlations;
  }
  
  calculateCorrelation(trend1, trend2) {
    const strengthDiff = Math.abs(trend1.strength - trend2.strength);
    return 1 - strengthDiff;
  }
}

/**
 * Prediction Engine
 * Generates trend predictions
 */
class PredictionEngine {
  predict(trends) {
    const predictions = [];
    
    trends.forEach(trend => {
      const prediction = this.predictTrend(trend);
      if (prediction) {
        predictions.push(prediction);
      }
    });
    
    return predictions;
  }
  
  predictTrend(trend) {
    const momentum = trend.strength * (trend.confidence || 0.5);
    
    if (momentum > 0.7) {
      return {
        trend,
        prediction: 'strong_continuation',
        confidence: momentum,
        description: 'Trend likely to continue strongly'
      };
    } else if (momentum > 0.5) {
      return {
        trend,
        prediction: 'moderate_continuation',
        confidence: momentum,
        description: 'Trend likely to continue moderately'
      };
    }
    
    return null;
  }
}

module.exports = TrendDetectionAutomation;
