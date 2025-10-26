/**
 * AI Signal Filter
 * AI-powered filtering and analysis of external development signals
 * Based on Reddit Market Intelligence AI Agent patterns
 */

const fs = require('fs');
const path = require('path');

class AISignalFilter {
  constructor() {
    this.filterPath = path.join(__dirname, '..', 'filters');
    this.ensureFilterDirectory();
    this.filterHistory = this.loadFilterHistory();
    this.filterRules = this.loadFilterRules();
    this.aiModels = this.initializeAIModels();
  }

  /**
   * Ensure filter directory exists
   * Invariant: Filter directory must exist for filter persistence
   */
  ensureFilterDirectory() {
    if (!fs.existsSync(this.filterPath)) {
      fs.mkdirSync(this.filterPath, { recursive: true });
      console.log('[ai-signal-filter] Created filter directory');
    }
  }

  /**
   * Load filter history from persistent storage
   * Invariant: Filter history must be maintained for learning
   */
  loadFilterHistory() {
    const historyPath = path.join(this.filterPath, 'filter-history.json');
    try {
      if (fs.existsSync(historyPath)) {
        const data = fs.readFileSync(historyPath, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('[ai-signal-filter] Error loading filter history:', error.message);
    }
    return {
      filtered_signals: [],
      filter_performance: {},
      learning_patterns: {},
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Load filter rules from configuration
   * Invariant: Filter rules must be consistent and effective
   */
  loadFilterRules() {
    const rulesPath = path.join(this.filterPath, 'filter-rules.json');
    try {
      if (fs.existsSync(rulesPath)) {
        const data = fs.readFileSync(rulesPath, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('[ai-signal-filter] Error loading filter rules:', error.message);
    }
    
    // Default filter rules
    return {
      relevance_threshold: 0.6,
      impact_threshold: 0.5,
      trend_threshold: 0.7,
      sentiment_weights: {
        positive: 1.2,
        neutral: 1.0,
        negative: 0.8
      },
      category_weights: {
        ai_development: 1.5,
        autonomous_systems: 1.4,
        developer_tools: 1.3,
        automation: 1.2,
        framework: 1.1,
        other: 1.0
      },
      keyword_weights: {
        'ai': 1.3,
        'autonomous': 1.4,
        'automation': 1.2,
        'framework': 1.1,
        'tool': 1.1,
        'system': 1.1
      }
    };
  }

  /**
   * Initialize AI models for signal processing
   * Invariant: AI models must be consistent and effective
   */
  initializeAIModels() {
    return {
      relevance_classifier: new RelevanceClassifier(),
      impact_predictor: new ImpactPredictor(),
      trend_analyzer: new TrendAnalyzer(),
      sentiment_analyzer: new SentimentAnalyzer(),
      category_classifier: new CategoryClassifier()
    };
  }

  /**
   * Filter signals using AI-powered analysis
   * Invariant: All signals must be processed through AI filtering
   */
  async filterSignals(signals) {
    console.log('[ai-signal-filter] Filtering signals with AI...');
    
    try {
      const filteredSignals = [];
      const filterMetrics = {
        total_signals: signals.length,
        filtered_count: 0,
        relevance_filtered: 0,
        impact_filtered: 0,
        trend_filtered: 0,
        sentiment_filtered: 0
      };
      
      for (const signal of signals) {
        const filterResult = await this.filterSignal(signal);
        
        if (filterResult.passed) {
          filteredSignals.push({
            ...signal,
            filter_score: filterResult.score,
            filter_reasons: filterResult.reasons,
            ai_analysis: filterResult.analysis
          });
          filterMetrics.filtered_count++;
        } else {
          filterMetrics[`${filterResult.primary_reason}_filtered`]++;
        }
      }
      
      // Update filter performance
      this.updateFilterPerformance(filterMetrics);
      
      // Save filter history
      this.filterHistory.filtered_signals.push(...filteredSignals);
      this.saveFilterHistory();
      
      console.log(`[ai-signal-filter] Filtered ${filteredSignals.length} signals from ${signals.length} total`);
      
      return {
        filtered_signals: filteredSignals,
        filter_metrics: filterMetrics,
        filter_performance: this.getFilterPerformance()
      };
      
    } catch (error) {
      console.error('[ai-signal-filter] Error filtering signals:', error.message);
      throw error;
    }
  }

  /**
   * Filter individual signal using AI analysis
   * Invariant: Each signal must be analyzed consistently
   */
  async filterSignal(signal) {
    const analysis = await this.analyzeSignal(signal);
    const score = this.calculateFilterScore(analysis);
    const reasons = this.getFilterReasons(analysis);
    const primaryReason = this.getPrimaryFilterReason(reasons);
    
    return {
      passed: score >= this.filterRules.relevance_threshold,
      score,
      reasons,
      primary_reason: primaryReason,
      analysis
    };
  }

  /**
   * Analyze signal using AI models
   * Invariant: Analysis must be comprehensive and consistent
   */
  async analyzeSignal(signal) {
    const analysis = {
      relevance: await this.aiModels.relevance_classifier.classify(signal),
      impact: await this.aiModels.impact_predictor.predict(signal),
      trend: await this.aiModels.trend_analyzer.analyze(signal),
      sentiment: await this.aiModels.sentiment_analyzer.analyze(signal),
      category: await this.aiModels.category_classifier.classify(signal)
    };
    
    return analysis;
  }

  /**
   * Calculate filter score based on analysis
   * Invariant: Filter score must be consistent and fair
   */
  calculateFilterScore(analysis) {
    let score = 0;
    
    // Relevance weight (40%)
    score += analysis.relevance.score * 0.4;
    
    // Impact weight (30%)
    score += analysis.impact.score * 0.3;
    
    // Trend weight (20%)
    score += analysis.trend.score * 0.2;
    
    // Sentiment weight (10%)
    score += analysis.sentiment.score * 0.1;
    
    // Apply category weight
    const categoryWeight = this.filterRules.category_weights[analysis.category.category] || 1.0;
    score *= categoryWeight;
    
    // Apply sentiment weight
    const sentimentWeight = this.filterRules.sentiment_weights[analysis.sentiment.sentiment] || 1.0;
    score *= sentimentWeight;
    
    return Math.min(score, 1);
  }

  /**
   * Get filter reasons for signal
   * Invariant: Filter reasons must be clear and actionable
   */
  getFilterReasons(analysis) {
    const reasons = [];
    
    if (analysis.relevance.score < this.filterRules.relevance_threshold) {
      reasons.push('low_relevance');
    }
    
    if (analysis.impact.score < this.filterRules.impact_threshold) {
      reasons.push('low_impact');
    }
    
    if (analysis.trend.score < this.filterRules.trend_threshold) {
      reasons.push('weak_trend');
    }
    
    if (analysis.sentiment.sentiment === 'negative' && analysis.sentiment.score < 0.3) {
      reasons.push('negative_sentiment');
    }
    
    return reasons;
  }

  /**
   * Get primary filter reason
   * Invariant: Primary reason must be the most significant factor
   */
  getPrimaryFilterReason(reasons) {
    if (reasons.includes('low_relevance')) return 'relevance';
    if (reasons.includes('low_impact')) return 'impact';
    if (reasons.includes('weak_trend')) return 'trend';
    if (reasons.includes('negative_sentiment')) return 'sentiment';
    return 'passed';
  }

  /**
   * Update filter performance metrics
   * Invariant: Performance metrics must be accurate
   */
  updateFilterPerformance(metrics) {
    const performance = this.filterHistory.filter_performance;
    
    // Update total metrics
    performance.total_signals = (performance.total_signals || 0) + metrics.total_signals;
    performance.filtered_signals = (performance.filtered_signals || 0) + metrics.filtered_count;
    
    // Update filter reason metrics
    performance.relevance_filtered = (performance.relevance_filtered || 0) + metrics.relevance_filtered;
    performance.impact_filtered = (performance.impact_filtered || 0) + metrics.impact_filtered;
    performance.trend_filtered = (performance.trend_filtered || 0) + metrics.trend_filtered;
    performance.sentiment_filtered = (performance.sentiment_filtered || 0) + metrics.sentiment_filtered;
    
    // Calculate filter rate
    performance.filter_rate = performance.filtered_signals / performance.total_signals;
    
    // Update learning patterns
    this.updateLearningPatterns(metrics);
  }

  /**
   * Update learning patterns from filter performance
   * Invariant: Learning patterns must improve filter effectiveness
   */
  updateLearningPatterns(metrics) {
    const patterns = this.filterHistory.learning_patterns;
    
    // Track filter effectiveness by reason
    const reasons = ['relevance', 'impact', 'trend', 'sentiment'];
    reasons.forEach(reason => {
      const key = `${reason}_effectiveness`;
      const current = patterns[key] || 0.5;
      const newValue = metrics[`${reason}_filtered`] / metrics.total_signals;
      patterns[key] = (current + newValue) / 2; // Moving average
    });
    
    // Track overall filter performance
    patterns.overall_effectiveness = patterns.overall_effectiveness || 0.5;
    const newEffectiveness = metrics.filtered_count / metrics.total_signals;
    patterns.overall_effectiveness = (patterns.overall_effectiveness + newEffectiveness) / 2;
  }

  /**
   * Save filter history to persistent storage
   * Invariant: Filter history must be persisted for learning
   */
  saveFilterHistory() {
    const historyPath = path.join(this.filterPath, 'filter-history.json');
    try {
      const data = {
        ...this.filterHistory,
        lastUpdated: new Date().toISOString()
      };
      fs.writeFileSync(historyPath, JSON.stringify(data, null, 2));
      console.log('[ai-signal-filter] Filter history saved');
    } catch (error) {
      console.error('[ai-signal-filter] Error saving filter history:', error.message);
    }
  }

  /**
   * Get filter performance metrics
   * Invariant: Performance metrics must be accurate and actionable
   */
  getFilterPerformance() {
    const performance = this.filterHistory.filter_performance;
    const patterns = this.filterHistory.learning_patterns;
    
    return {
      total_signals: performance.total_signals || 0,
      filtered_signals: performance.filtered_signals || 0,
      filter_rate: performance.filter_rate || 0,
      effectiveness_by_reason: {
        relevance: patterns.relevance_effectiveness || 0,
        impact: patterns.impact_effectiveness || 0,
        trend: patterns.trend_effectiveness || 0,
        sentiment: patterns.sentiment_effectiveness || 0
      },
      overall_effectiveness: patterns.overall_effectiveness || 0,
      learning_improvement: this.calculateLearningImprovement()
    };
  }

  /**
   * Calculate learning improvement over time
   * Invariant: Learning improvement must be measurable
   */
  calculateLearningImprovement() {
    const patterns = this.filterHistory.learning_patterns;
    const effectiveness = patterns.overall_effectiveness || 0;
    
    // Simple improvement calculation
    if (effectiveness > 0.7) return 'high';
    if (effectiveness > 0.5) return 'medium';
    return 'low';
  }

  /**
   * Optimize filter rules based on performance
   * Invariant: Rule optimization must improve filter effectiveness
   */
  optimizeFilterRules() {
    const performance = this.getFilterPerformance();
    const effectiveness = performance.effectiveness_by_reason;
    
    // Adjust thresholds based on effectiveness
    if (effectiveness.relevance < 0.5) {
      this.filterRules.relevance_threshold *= 0.9; // Lower threshold
    } else if (effectiveness.relevance > 0.8) {
      this.filterRules.relevance_threshold *= 1.1; // Raise threshold
    }
    
    if (effectiveness.impact < 0.5) {
      this.filterRules.impact_threshold *= 0.9;
    } else if (effectiveness.impact > 0.8) {
      this.filterRules.impact_threshold *= 1.1;
    }
    
    if (effectiveness.trend < 0.5) {
      this.filterRules.trend_threshold *= 0.9;
    } else if (effectiveness.trend > 0.8) {
      this.filterRules.trend_threshold *= 1.1;
    }
    
    // Save optimized rules
    this.saveFilterRules();
    
    console.log('[ai-signal-filter] Filter rules optimized based on performance');
  }

  /**
   * Save filter rules to persistent storage
   * Invariant: Filter rules must be persisted for consistency
   */
  saveFilterRules() {
    const rulesPath = path.join(this.filterPath, 'filter-rules.json');
    try {
      fs.writeFileSync(rulesPath, JSON.stringify(this.filterRules, null, 2));
      console.log('[ai-signal-filter] Filter rules saved');
    } catch (error) {
      console.error('[ai-signal-filter] Error saving filter rules:', error.message);
    }
  }

  /**
   * Generate filter insights
   * Invariant: Filter insights must be actionable
   */
  generateFilterInsights() {
    const performance = this.getFilterPerformance();
    const insights = [];
    
    // Effectiveness insights
    if (performance.overall_effectiveness > 0.8) {
      insights.push({
        type: 'effectiveness_insight',
        title: 'High filter effectiveness',
        description: `Filter is performing well with ${(performance.overall_effectiveness * 100).toFixed(1)}% effectiveness`,
        actionable: true
      });
    } else if (performance.overall_effectiveness < 0.5) {
      insights.push({
        type: 'effectiveness_insight',
        title: 'Low filter effectiveness',
        description: `Filter effectiveness is low at ${(performance.overall_effectiveness * 100).toFixed(1)}% - consider rule optimization`,
        actionable: true
      });
    }
    
    // Reason-specific insights
    Object.keys(performance.effectiveness_by_reason).forEach(reason => {
      const effectiveness = performance.effectiveness_by_reason[reason];
      if (effectiveness < 0.4) {
        insights.push({
          type: 'reason_insight',
          title: `Low ${reason} effectiveness`,
          description: `${reason} filtering is underperforming at ${(effectiveness * 100).toFixed(1)}%`,
          actionable: true
        });
      }
    });
    
    return insights;
  }
}

/**
 * Relevance Classifier
 * AI model for classifying signal relevance
 */
class RelevanceClassifier {
  async classify(signal) {
    // Simulate AI classification
    const relevanceScore = this.calculateRelevanceScore(signal);
    return {
      score: relevanceScore,
      confidence: 0.85,
      factors: this.getRelevanceFactors(signal)
    };
  }
  
  calculateRelevanceScore(signal) {
    let score = 0.5; // Base score
    
    // Title relevance
    if (signal.title) {
      const titleKeywords = ['ai', 'autonomous', 'development', 'framework', 'tool'];
      const titleScore = titleKeywords.filter(keyword => 
        signal.title.toLowerCase().includes(keyword)
      ).length / titleKeywords.length;
      score += titleScore * 0.3;
    }
    
    // Description relevance
    if (signal.description) {
      const descKeywords = ['development', 'programming', 'software', 'system'];
      const descScore = descKeywords.filter(keyword => 
        signal.description.toLowerCase().includes(keyword)
      ).length / descKeywords.length;
      score += descScore * 0.2;
    }
    
    // Category relevance
    if (signal.category) {
      const relevantCategories = ['ai_development', 'autonomous_systems', 'developer_tools'];
      if (relevantCategories.includes(signal.category)) {
        score += 0.2;
      }
    }
    
    return Math.min(score, 1);
  }
  
  getRelevanceFactors(signal) {
    const factors = [];
    if (signal.title) factors.push('title_relevance');
    if (signal.description) factors.push('description_relevance');
    if (signal.category) factors.push('category_relevance');
    return factors;
  }
}

/**
 * Impact Predictor
 * AI model for predicting signal impact
 */
class ImpactPredictor {
  async predict(signal) {
    const impactScore = this.calculateImpactScore(signal);
    return {
      score: impactScore,
      confidence: 0.80,
      factors: this.getImpactFactors(signal)
    };
  }
  
  calculateImpactScore(signal) {
    let score = 0.5; // Base score
    
    // GitHub stars indicate impact
    if (signal.stars) {
      score += Math.min(signal.stars / 1000, 1) * 0.3;
    }
    
    // Stack Overflow views indicate impact
    if (signal.views) {
      score += Math.min(signal.views / 10000, 1) * 0.3;
    }
    
    // Engagement level indicates impact
    if (signal.engagement === 'high') {
      score += 0.2;
    }
    
    // Relevance score contributes to impact
    if (signal.relevance_score) {
      score += signal.relevance_score * 0.2;
    }
    
    return Math.min(score, 1);
  }
  
  getImpactFactors(signal) {
    const factors = [];
    if (signal.stars) factors.push('github_stars');
    if (signal.views) factors.push('stackoverflow_views');
    if (signal.engagement) factors.push('engagement_level');
    return factors;
  }
}

/**
 * Trend Analyzer
 * AI model for analyzing signal trends
 */
class TrendAnalyzer {
  async analyze(signal) {
    const trendScore = this.calculateTrendScore(signal);
    return {
      score: trendScore,
      confidence: 0.75,
      factors: this.getTrendFactors(signal)
    };
  }
  
  calculateTrendScore(signal) {
    let score = 0.5; // Base score
    
    // Recent signals have higher trend weight
    const signalAge = Date.now() - new Date(signal.timestamp).getTime();
    const ageWeight = Math.max(0, 1 - (signalAge / (7 * 24 * 60 * 60 * 1000))); // 7 days
    score += ageWeight * 0.4;
    
    // High engagement indicates trend
    if (signal.engagement === 'high') {
      score += 0.3;
    }
    
    // High relevance indicates trend
    if (signal.relevance_score) {
      score += signal.relevance_score * 0.3;
    }
    
    return Math.min(score, 1);
  }
  
  getTrendFactors(signal) {
    const factors = [];
    if (signal.timestamp) factors.push('recency');
    if (signal.engagement) factors.push('engagement_level');
    if (signal.relevance_score) factors.push('relevance_score');
    return factors;
  }
}

/**
 * Sentiment Analyzer
 * AI model for analyzing signal sentiment
 */
class SentimentAnalyzer {
  async analyze(signal) {
    const sentiment = this.analyzeSentiment(signal);
    return {
      sentiment: sentiment.sentiment,
      score: sentiment.score,
      confidence: 0.70,
      factors: sentiment.factors
    };
  }
  
  analyzeSentiment(signal) {
    const text = `${signal.title || ''} ${signal.description || ''}`.toLowerCase();
    
    // Simple sentiment analysis
    const positiveWords = ['great', 'amazing', 'excellent', 'love', 'fantastic', 'awesome'];
    const negativeWords = ['frustrated', 'hate', 'terrible', 'awful', 'problem', 'issue'];
    
    let score = 0;
    let factors = [];
    
    positiveWords.forEach(word => {
      if (text.includes(word)) {
        score += 0.2;
        factors.push(`positive_${word}`);
      }
    });
    
    negativeWords.forEach(word => {
      if (text.includes(word)) {
        score -= 0.2;
        factors.push(`negative_${word}`);
      }
    });
    
    let sentiment = 'neutral';
    if (score > 0.1) sentiment = 'positive';
    else if (score < -0.1) sentiment = 'negative';
    
    return { sentiment, score: Math.abs(score), factors };
  }
}

/**
 * Category Classifier
 * AI model for classifying signal categories
 */
class CategoryClassifier {
  async classify(signal) {
    const category = this.classifyCategory(signal);
    return {
      category: category.category,
      confidence: category.confidence,
      factors: category.factors
    };
  }
  
  classifyCategory(signal) {
    const text = `${signal.title || ''} ${signal.description || ''}`.toLowerCase();
    const factors = [];
    
    // AI development keywords
    if (text.includes('ai') || text.includes('artificial intelligence')) {
      factors.push('ai_keywords');
      return { category: 'ai_development', confidence: 0.9, factors };
    }
    
    // Autonomous systems keywords
    if (text.includes('autonomous') || text.includes('automation')) {
      factors.push('autonomous_keywords');
      return { category: 'autonomous_systems', confidence: 0.8, factors };
    }
    
    // Developer tools keywords
    if (text.includes('tool') || text.includes('framework') || text.includes('library')) {
      factors.push('tool_keywords');
      return { category: 'developer_tools', confidence: 0.7, factors };
    }
    
    // Default category
    return { category: 'other', confidence: 0.5, factors };
  }
}

module.exports = AISignalFilter;
