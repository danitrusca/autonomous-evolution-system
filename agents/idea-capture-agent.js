/**
 * Idea Capture Agent
 * 
 * Automatically captures, categorizes, and preserves all future potential ideas,
 * insights, and opportunities to prevent knowledge loss and enable continuous innovation.
 * 
 * ## Overview
 * 
 * The **Idea Capture Agent** is an autonomous knowledge management system that automatically 
 * captures, categorizes, and preserves all future potential ideas, insights, and opportunities. 
 * It prevents knowledge loss and enables continuous innovation by maintaining a comprehensive 
 * repository of ideas from various sources.
 * 
 * ## Key Capabilities
 * 
 * ### 🧠 **Automatic Idea Capture**
 * - **User Input Ideas**: Captures ideas from user suggestions and requests
 * - **System Analysis Ideas**: Identifies insights from system analysis and monitoring
 * - **Pattern Detection Ideas**: Captures patterns and insights from system behavior
 * - **External Signal Ideas**: Integrates ideas from market intelligence and external sources
 * - **Collaboration Ideas**: Captures ideas from team discussions and feedback
 * 
 * ### 🏷️ **Intelligent Categorization**
 * - **System Evolution**: Ideas for system evolution and improvement
 * - **Architecture**: Architectural improvements and patterns
 * - **Optimization**: Performance and efficiency optimizations
 * - **Features**: New features and capabilities
 * - **Integration**: Integration opportunities and connections
 * - **Automation**: Automation and autonomous capabilities
 * - **Learning**: Learning and knowledge management
 * - **User Experience**: User experience improvements
 * - **Security**: Security and safety enhancements
 * - **Scalability**: Scalability and performance improvements
 * - **Monitoring**: Monitoring and observability
 * - **Testing**: Testing and quality assurance
 * - **Documentation**: Documentation and knowledge sharing
 * - **Collaboration**: Collaboration and team improvements
 * - **Innovation**: Innovative and breakthrough ideas
 * 
 * ### 📊 **Smart Prioritization**
 * - **Critical**: Immediate implementation required
 * - **High**: High priority for next iteration
 * - **Medium**: Medium priority for future consideration
 * - **Low**: Low priority, keep for reference
 * - **Experimental**: Experimental or research ideas
 * 
 * ## Usage Examples
 * 
 * ### Basic Idea Capture
 * ```javascript
 * const IdeaCaptureAgent = require('./agents/idea-capture-agent');
 * const agent = new IdeaCaptureAgent();
 * 
 * // Capture an idea
 * await agent.captureIdea({
 *   content: 'Implement real-time collaboration features',
 *   category: 'features',
 *   priority: 'high',
 *   source: 'user_input'
 * });
 * ```
 * 
 * ### Search Ideas
 * ```javascript
 * // Search ideas by category
 * const ideas = await agent.searchIdeas({
 *   category: 'optimization',
 *   priority: 'high'
 * });
 * ```
 * 
 * ### Get Idea Statistics
 * ```javascript
 * const stats = agent.getIdeaStatistics();
 * console.log('Total ideas:', stats.totalIdeas);
 * console.log('By category:', stats.byCategory);
 * ```
 * 
 * ## Configuration
 * 
 * ### Idea Categories
 * ```javascript
 * const categories = {
 *   'system_evolution': 'Ideas for system evolution and improvement',
 *   'architecture': 'Architectural improvements and patterns',
 *   'optimization': 'Performance and efficiency optimizations',
 *   'features': 'New features and capabilities',
 *   'integration': 'Integration opportunities and connections'
 * };
 * ```
 * 
 * ### Priority Levels
 * ```javascript
 * const priorities = {
 *   'critical': 'Immediate implementation required',
 *   'high': 'High priority for next iteration',
 *   'medium': 'Medium priority for future consideration',
 *   'low': 'Low priority, keep for reference',
 *   'experimental': 'Experimental or research ideas'
 * };
 * ```
 * 
 * ## Integration Points
 * 
 * - **System Evolution**: Feeds ideas into system evolution process
 * - **Agent Coordinator**: Participates in multi-agent coordination
 * - **Learning System**: Captures learning insights and patterns
 * - **Change Impact Agent**: Provides ideas for change analysis
 * - **Meta-Learning Agent**: Contributes to meta-learning processes
 * 
 * Follows ECP principles for autonomous knowledge management
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class IdeaCaptureAgent {
  constructor() {
    this.agentName = 'IdeaCaptureAgent';
    this.ideasPath = path.join(__dirname, '..', 'ideas');
    this.categoriesPath = path.join(__dirname, '..', 'ideas', 'categories');
    this.prioritiesPath = path.join(__dirname, '..', 'ideas', 'priorities');
    this.evolutionPath = path.join(__dirname, '..', 'ideas', 'evolution');
    this.ideaCounter = 0;
    this.ideaCategories = {
      'system_evolution': 'Ideas for system evolution and improvement',
      'architecture': 'Architectural improvements and patterns',
      'optimization': 'Performance and efficiency optimizations',
      'features': 'New features and capabilities',
      'integration': 'Integration opportunities and connections',
      'automation': 'Automation and autonomous capabilities',
      'learning': 'Learning and knowledge management',
      'user_experience': 'User experience improvements',
      'security': 'Security and safety enhancements',
      'scalability': 'Scalability and performance improvements',
      'monitoring': 'Monitoring and observability',
      'testing': 'Testing and quality assurance',
      'documentation': 'Documentation and knowledge sharing',
      'collaboration': 'Collaboration and team improvements',
      'innovation': 'Innovative and breakthrough ideas'
    };
    this.priorityLevels = {
      'critical': 'Immediate implementation required',
      'high': 'High priority for next iteration',
      'medium': 'Medium priority for future consideration',
      'low': 'Low priority, keep for reference',
      'experimental': 'Experimental or research ideas'
    };
    this.ideaSources = {
      'user_input': 'Direct user suggestions and requests',
      'system_analysis': 'System analysis and monitoring',
      'pattern_detection': 'Pattern recognition and insights',
      'evolution_trigger': 'Autonomous evolution triggers',
      'external_signal': 'External market intelligence signals',
      'collaboration': 'Team collaboration and discussions',
      'research': 'Research and exploration findings',
      'feedback': 'User feedback and suggestions',
      'optimization': 'Optimization opportunities',
      'innovation': 'Innovative breakthroughs and discoveries'
    };
    this.ideaStatuses = {
      'captured': 'Idea has been captured and stored',
      'categorized': 'Idea has been categorized and prioritized',
      'analyzed': 'Idea has been analyzed for feasibility',
      'planned': 'Idea has been planned for implementation',
      'implemented': 'Idea has been implemented',
      'rejected': 'Idea has been rejected or deemed not viable',
      'evolved': 'Idea has evolved into something else',
      'archived': 'Idea has been archived for future reference'
    };
    this.ideaHistory = [];
    this.initializePaths();
  }

  initializePaths() {
    // Ensure all idea storage directories exist
    [this.ideasPath, this.categoriesPath, this.prioritiesPath, this.evolutionPath].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  /**
   * Main idea capture method - captures ideas from various sources
   */
  async captureIdea(ideaData) {
    console.log('[idea-capture] Capturing new idea...');
    
    try {
      // Generate unique idea ID
      const ideaId = this.generateIdeaId();
      
      // Create comprehensive idea record
      const idea = {
        id: ideaId,
        timestamp: new Date().toISOString(),
        title: ideaData.title || 'Untitled Idea',
        description: ideaData.description || '',
        content: ideaData.content || '',
        source: ideaData.source || 'unknown',
        category: await this.categorizeIdea(ideaData),
        priority: await this.prioritizeIdea(ideaData),
        status: 'captured',
        tags: await this.extractTags(ideaData),
        metadata: {
          author: ideaData.author || 'system',
          context: ideaData.context || '',
          related_ideas: [],
          evolution_potential: await this.assessEvolutionPotential(ideaData),
          implementation_complexity: await this.assessImplementationComplexity(ideaData),
          impact_potential: await this.assessImpactPotential(ideaData)
        },
        relationships: {
          parent_ideas: [],
          child_ideas: [],
          related_ideas: [],
          conflicting_ideas: []
        },
        evolution: {
          original_idea: ideaData,
          evolution_history: [],
          current_state: 'captured',
          future_potential: []
        }
      };

      // Store idea
      await this.storeIdea(idea);
      
      // Update idea history
      this.ideaHistory.push(idea);
      
      // Trigger idea analysis
      await this.analyzeIdea(idea);
      
      // Update IDEA_JOURNAL
      await this.updateIdeaJournal(idea);
      
      // Update unified evolution journal
      await this.updateEvolutionJournal(idea);
      
      console.log(`[idea-capture] Idea captured: ${ideaId} - ${idea.title}`);
      
      return idea;
    } catch (error) {
      console.error('[idea-capture] Error capturing idea:', error.message);
      throw error;
    }
  }

  /**
   * Capture idea from user input
   */
  async captureUserIdea(userInput, context = {}) {
    const ideaData = {
      title: this.extractTitle(userInput),
      description: userInput,
      content: userInput,
      source: 'user_input',
      author: context.author || 'user',
      context: context.context || '',
      timestamp: new Date().toISOString()
    };
    
    return await this.captureIdea(ideaData);
  }

  /**
   * Capture idea from system analysis
   */
  async captureSystemIdea(analysisData, context = {}) {
    const ideaData = {
      title: `System Analysis: ${analysisData.type}`,
      description: analysisData.description || 'System analysis insight',
      content: analysisData.content || JSON.stringify(analysisData, null, 2),
      source: 'system_analysis',
      author: 'system',
      context: context.context || 'system_analysis',
      metadata: analysisData.metadata || {}
    };
    
    return await this.captureIdea(ideaData);
  }

  /**
   * Capture idea from pattern detection
   */
  async capturePatternIdea(patternData, context = {}) {
    const ideaData = {
      title: `Pattern Detected: ${patternData.pattern_name}`,
      description: patternData.description || 'Pattern detection insight',
      content: patternData.content || JSON.stringify(patternData, null, 2),
      source: 'pattern_detection',
      author: 'system',
      context: context.context || 'pattern_detection',
      metadata: patternData.metadata || {}
    };
    
    return await this.captureIdea(ideaData);
  }

  /**
   * Capture idea from external signals
   */
  async captureExternalIdea(signalData, context = {}) {
    const ideaData = {
      title: `External Signal: ${signalData.signal_type}`,
      description: signalData.description || 'External signal insight',
      content: signalData.content || JSON.stringify(signalData, null, 2),
      source: 'external_signal',
      author: 'system',
      context: context.context || 'external_signal',
      metadata: signalData.metadata || {}
    };
    
    return await this.captureIdea(ideaData);
  }

  /**
   * Categorize idea automatically
   */
  async categorizeIdea(ideaData) {
    const content = `${ideaData.title} ${ideaData.description} ${ideaData.content}`.toLowerCase();
    
    // Simple keyword-based categorization
    const categoryScores = {};
    
    for (const [category, description] of Object.entries(this.ideaCategories)) {
      let score = 0;
      
      // Check for category-specific keywords
      const keywords = this.getCategoryKeywords(category);
      for (const keyword of keywords) {
        if (content.includes(keyword)) {
          score += 1;
        }
      }
      
      categoryScores[category] = score;
    }
    
    // Return category with highest score, or default to 'innovation'
    const bestCategory = Object.entries(categoryScores)
      .sort(([,a], [,b]) => b - a)[0][0];
    
    return bestCategory || 'innovation';
  }

  /**
   * Prioritize idea automatically
   */
  async prioritizeIdea(ideaData) {
    let priority = 'medium';
    
    // Check for priority indicators
    const content = `${ideaData.title} ${ideaData.description}`.toLowerCase();
    
    if (content.includes('critical') || content.includes('urgent') || content.includes('immediate')) {
      priority = 'critical';
    } else if (content.includes('important') || content.includes('high priority') || content.includes('asap')) {
      priority = 'high';
    } else if (content.includes('low priority') || content.includes('maybe') || content.includes('someday')) {
      priority = 'low';
    } else if (content.includes('experimental') || content.includes('research') || content.includes('explore')) {
      priority = 'experimental';
    }
    
    return priority;
  }

  /**
   * Extract tags from idea content
   */
  async extractTags(ideaData) {
    const content = `${ideaData.title} ${ideaData.description} ${ideaData.content}`.toLowerCase();
    const tags = [];
    
    // Common technology tags
    const techTags = ['javascript', 'nodejs', 'react', 'ai', 'ml', 'database', 'api', 'frontend', 'backend', 'mobile', 'web'];
    for (const tag of techTags) {
      if (content.includes(tag)) {
        tags.push(tag);
      }
    }
    
    // Common concept tags
    const conceptTags = ['optimization', 'performance', 'security', 'scalability', 'automation', 'monitoring', 'testing', 'documentation'];
    for (const tag of conceptTags) {
      if (content.includes(tag)) {
        tags.push(tag);
      }
    }
    
    return [...new Set(tags)]; // Remove duplicates
  }

  /**
   * Assess evolution potential of idea
   */
  async assessEvolutionPotential(ideaData) {
    const content = `${ideaData.title} ${ideaData.description}`.toLowerCase();
    let potential = 'medium';
    
    if (content.includes('breakthrough') || content.includes('revolutionary') || content.includes('game-changing')) {
      potential = 'high';
    } else if (content.includes('incremental') || content.includes('small improvement') || content.includes('minor')) {
      potential = 'low';
    }
    
    return potential;
  }

  /**
   * Assess implementation complexity
   */
  async assessImplementationComplexity(ideaData) {
    const content = `${ideaData.title} ${ideaData.description}`.toLowerCase();
    let complexity = 'medium';
    
    if (content.includes('simple') || content.includes('easy') || content.includes('quick')) {
      complexity = 'low';
    } else if (content.includes('complex') || content.includes('difficult') || content.includes('challenging')) {
      complexity = 'high';
    }
    
    return complexity;
  }

  /**
   * Assess impact potential
   */
  async assessImpactPotential(ideaData) {
    const content = `${ideaData.title} ${ideaData.description}`.toLowerCase();
    let impact = 'medium';
    
    if (content.includes('major impact') || content.includes('significant') || content.includes('transformative')) {
      impact = 'high';
    } else if (content.includes('minor') || content.includes('small') || content.includes('incremental')) {
      impact = 'low';
    }
    
    return impact;
  }

  /**
   * Analyze captured idea
   */
  async analyzeIdea(idea) {
    console.log(`[idea-capture] Analyzing idea: ${idea.id}`);
    
    try {
      // Find related ideas
      const relatedIdeas = await this.findRelatedIdeas(idea);
      idea.relationships.related_ideas = relatedIdeas;
      
      // Find conflicting ideas
      const conflictingIdeas = await this.findConflictingIdeas(idea);
      idea.relationships.conflicting_ideas = conflictingIdeas;
      
      // Update idea with analysis results
      await this.updateIdea(idea);
      
      // Trigger idea evolution if high potential
      if (idea.metadata.evolution_potential === 'high') {
        await this.triggerIdeaEvolution(idea);
      }
      
      console.log(`[idea-capture] Idea analysis complete: ${idea.id}`);
      
    } catch (error) {
      console.error(`[idea-capture] Error analyzing idea ${idea.id}:`, error.message);
    }
  }

  /**
   * Find related ideas
   */
  async findRelatedIdeas(idea) {
    const relatedIdeas = [];
    
    // Search for ideas with similar tags
    for (const tag of idea.tags) {
      const ideasWithTag = await this.searchIdeasByTag(tag);
      relatedIdeas.push(...ideasWithTag.filter(id => id !== idea.id));
    }
    
    // Search for ideas in same category
    const ideasInCategory = await this.searchIdeasByCategory(idea.category);
    relatedIdeas.push(...ideasInCategory.filter(id => id !== idea.id));
    
    return [...new Set(relatedIdeas)]; // Remove duplicates
  }

  /**
   * Find conflicting ideas
   */
  async findConflictingIdeas(idea) {
    // This is a simplified implementation
    // In a real system, this would use more sophisticated conflict detection
    return [];
  }

  /**
   * Trigger idea evolution
   */
  async triggerIdeaEvolution(idea) {
    console.log(`[idea-capture] Triggering evolution for idea: ${idea.id}`);
    
    // Create evolution record
    const evolution = {
      timestamp: new Date().toISOString(),
      trigger: 'high_evolution_potential',
      action: 'evolution_triggered',
      details: 'Idea has high evolution potential, triggering evolution process'
    };
    
    idea.evolution.evolution_history.push(evolution);
    idea.evolution.current_state = 'evolving';
    
    // Update idea
    await this.updateIdea(idea);
  }

  /**
   * Store idea persistently
   */
  async storeIdea(idea) {
    const ideaFile = path.join(this.ideasPath, `${idea.id}.json`);
    fs.writeFileSync(ideaFile, JSON.stringify(idea, null, 2));
    
    // Update category index
    await this.updateCategoryIndex(idea);
    
    // Update priority index
    await this.updatePriorityIndex(idea);
    
    // Update evolution index
    await this.updateEvolutionIndex(idea);
  }

  /**
   * Update idea
   */
  async updateIdea(idea) {
    const ideaFile = path.join(this.ideasPath, `${idea.id}.json`);
    fs.writeFileSync(ideaFile, JSON.stringify(idea, null, 2));
  }

  /**
   * Update category index
   */
  async updateCategoryIndex(idea) {
    const categoryFile = path.join(this.categoriesPath, `${idea.category}.json`);
    let categoryIdeas = [];
    
    if (fs.existsSync(categoryFile)) {
      categoryIdeas = JSON.parse(fs.readFileSync(categoryFile, 'utf8'));
    }
    
    if (!categoryIdeas.includes(idea.id)) {
      categoryIdeas.push(idea.id);
      fs.writeFileSync(categoryFile, JSON.stringify(categoryIdeas, null, 2));
    }
  }

  /**
   * Update priority index
   */
  async updatePriorityIndex(idea) {
    const priorityFile = path.join(this.prioritiesPath, `${idea.priority}.json`);
    let priorityIdeas = [];
    
    if (fs.existsSync(priorityFile)) {
      priorityIdeas = JSON.parse(fs.readFileSync(priorityFile, 'utf8'));
    }
    
    if (!priorityIdeas.includes(idea.id)) {
      priorityIdeas.push(idea.id);
      fs.writeFileSync(priorityFile, JSON.stringify(priorityIdeas, null, 2));
    }
  }

  /**
   * Update evolution index
   */
  async updateEvolutionIndex(idea) {
    const evolutionFile = path.join(this.evolutionPath, `${idea.id}.json`);
    fs.writeFileSync(evolutionFile, JSON.stringify(idea.evolution, null, 2));
  }

  /**
   * Search ideas by tag
   */
  async searchIdeasByTag(tag) {
    const ideas = await this.getAllIdeas();
    return ideas.filter(idea => idea.tags.includes(tag)).map(idea => idea.id);
  }

  /**
   * Search ideas by category
   */
  async searchIdeasByCategory(category) {
    const categoryFile = path.join(this.categoriesPath, `${category}.json`);
    if (fs.existsSync(categoryFile)) {
      return JSON.parse(fs.readFileSync(categoryFile, 'utf8'));
    }
    return [];
  }

  /**
   * Get all ideas
   */
  async getAllIdeas() {
    const ideas = [];
    const ideaFiles = fs.readdirSync(this.ideasPath).filter(file => file.endsWith('.json'));
    
    for (const file of ideaFiles) {
      try {
        const idea = JSON.parse(fs.readFileSync(path.join(this.ideasPath, file), 'utf8'));
        ideas.push(idea);
      } catch (error) {
        console.error(`[idea-capture] Error reading idea file ${file}:`, error.message);
      }
    }
    
    return ideas;
  }

  /**
   * Search ideas
   */
  async searchIdeas(query, filters = {}) {
    const ideas = await this.getAllIdeas();
    let results = ideas;
    
    // Apply text search
    if (query) {
      const searchTerms = query.toLowerCase().split(' ');
      results = results.filter(idea => {
        const searchText = `${idea.title} ${idea.description} ${idea.content}`.toLowerCase();
        return searchTerms.every(term => searchText.includes(term));
      });
    }
    
    // Apply filters
    if (filters.category) {
      results = results.filter(idea => idea.category === filters.category);
    }
    
    if (filters.priority) {
      results = results.filter(idea => idea.priority === filters.priority);
    }
    
    if (filters.status) {
      results = results.filter(idea => idea.status === filters.status);
    }
    
    if (filters.tags && filters.tags.length > 0) {
      results = results.filter(idea => 
        filters.tags.some(tag => idea.tags.includes(tag))
      );
    }
    
    return results;
  }

  /**
   * Get idea by ID
   */
  async getIdea(ideaId) {
    const ideaFile = path.join(this.ideasPath, `${ideaId}.json`);
    if (fs.existsSync(ideaFile)) {
      return JSON.parse(fs.readFileSync(ideaFile, 'utf8'));
    }
    return null;
  }

  /**
   * Generate unique idea ID
   */
  generateIdeaId() {
    this.ideaCounter++;
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `idea_${timestamp}_${this.ideaCounter}_${random}`;
  }

  /**
   * Extract title from content
   */
  extractTitle(content) {
    const lines = content.split('\n');
    const firstLine = lines[0].trim();
    
    if (firstLine.length > 0 && firstLine.length < 100) {
      return firstLine;
    }
    
    return `Idea ${this.ideaCounter + 1}`;
  }

  /**
   * Get category keywords
   */
  getCategoryKeywords(category) {
    const keywordMap = {
      'system_evolution': ['evolution', 'improve', 'enhance', 'upgrade', 'advance'],
      'architecture': ['architecture', 'design', 'structure', 'pattern', 'framework'],
      'optimization': ['optimize', 'performance', 'speed', 'efficiency', 'faster'],
      'features': ['feature', 'functionality', 'capability', 'tool', 'function'],
      'integration': ['integrate', 'connect', 'combine', 'merge', 'link'],
      'automation': ['automate', 'automatic', 'autonomous', 'self', 'auto'],
      'learning': ['learn', 'knowledge', 'intelligence', 'smart', 'ai'],
      'user_experience': ['user', 'experience', 'interface', 'ui', 'ux'],
      'security': ['security', 'safe', 'secure', 'protect', 'defense'],
      'scalability': ['scale', 'scalable', 'grow', 'expand', 'capacity'],
      'monitoring': ['monitor', 'track', 'observe', 'watch', 'surveillance'],
      'testing': ['test', 'testing', 'quality', 'verify', 'validate'],
      'documentation': ['document', 'docs', 'guide', 'manual', 'tutorial'],
      'collaboration': ['collaborate', 'team', 'work', 'together', 'cooperation'],
      'innovation': ['innovate', 'new', 'creative', 'breakthrough', 'discovery']
    };
    
    return keywordMap[category] || [];
  }

  /**
   * Generate idea capture report
   */
  async generateIdeaReport() {
    const ideas = await this.getAllIdeas();
    
    const report = {
      timestamp: new Date().toISOString(),
      total_ideas: ideas.length,
      categories: {},
      priorities: {},
      statuses: {},
      sources: {},
      recent_ideas: ideas.slice(-10),
      top_tags: this.getTopTags(ideas),
      evolution_potential: this.getEvolutionPotential(ideas)
    };
    
    // Categorize by category
    for (const idea of ideas) {
      report.categories[idea.category] = (report.categories[idea.category] || 0) + 1;
      report.priorities[idea.priority] = (report.priorities[idea.priority] || 0) + 1;
      report.statuses[idea.status] = (report.statuses[idea.status] || 0) + 1;
      report.sources[idea.source] = (report.sources[idea.source] || 0) + 1;
    }
    
    return report;
  }

  /**
   * Generate IDEA_JOURNAL entry for a specific idea
   */
  async generateIdeaJournalEntry(idea) {
    const entry = `### ${new Date().toISOString().split('T')[0]}: ${idea.title}

**ID**: \`${idea.id}\`
**Status**: ${idea.status}
**Priority**: ${idea.priority}
**Category**: ${idea.category}
**Evolution Potential**: ${idea.metadata.evolution_potential}
**Impact Potential**: ${idea.metadata.impact_potential}
**Implementation Complexity**: ${idea.metadata.implementation_complexity}

**The Idea**: ${idea.description}

**Detailed Concept**:
${idea.content}

**Revolutionary Potential**:
- **Autonomous Capability**: ${idea.metadata.evolution_potential === 'high' ? 'High potential for autonomous implementation' : 'Medium potential for autonomous implementation'}
- **System Impact**: ${idea.metadata.impact_potential === 'high' ? 'High impact on system capabilities' : 'Medium impact on system capabilities'}
- **Implementation Feasibility**: ${idea.metadata.implementation_complexity === 'low' ? 'Low complexity - easily implementable' : idea.metadata.implementation_complexity === 'medium' ? 'Medium complexity - requires planning' : 'High complexity - requires significant resources'}

**Tags**: ${idea.tags.join(', ')}

**Source**: ${idea.source}

**Context**: ${idea.metadata.context || 'No specific context provided'}

**Evolution History**:
${idea.evolution.evolution_history.map(ev => `- ${ev.timestamp}: ${ev.action} - ${ev.details}`).join('\n')}

**Related Ideas**: ${idea.relationships.related_ideas.length > 0 ? idea.relationships.related_ideas.join(', ') : 'None identified'}

**Conflicting Ideas**: ${idea.relationships.conflicting_ideas.length > 0 ? idea.relationships.conflicting_ideas.join(', ') : 'None identified'}

---

`;

    return entry;
  }

  /**
   * Update IDEA_JOURNAL with new idea
   */
  async updateIdeaJournal(idea) {
    const journalPath = path.join(__dirname, '..', 'docs', 'IDEA_JOURNAL.md');
    const entry = await this.generateIdeaJournalEntry(idea);
    
    try {
      // Read current journal
      let journalContent = '';
      if (fs.existsSync(journalPath)) {
        journalContent = fs.readFileSync(journalPath, 'utf8');
      }
      
      // Find the insertion point (after "## Revolutionary Ideas")
      const insertionPoint = journalContent.indexOf('## Revolutionary Ideas');
      if (insertionPoint !== -1) {
        const afterHeader = journalContent.indexOf('\n', insertionPoint) + 1;
        const beforeContent = journalContent.substring(0, afterHeader);
        const afterContent = journalContent.substring(afterHeader);
        
        // Insert new entry
        journalContent = beforeContent + entry + afterContent;
      } else {
        // If no "Revolutionary Ideas" section, append to end
        journalContent += '\n' + entry;
      }
      
      // Write updated journal
      fs.writeFileSync(journalPath, journalContent);
      console.log(`[idea-capture] Updated IDEA_JOURNAL with idea: ${idea.id}`);
      
    } catch (error) {
      console.error('[idea-capture] Error updating IDEA_JOURNAL:', error.message);
    }
  }

  /**
   * Get top tags
   */
  getTopTags(ideas) {
    const tagCounts = {};
    
    for (const idea of ideas) {
      for (const tag of idea.tags) {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      }
    }
    
    return Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));
  }

  /**
   * Get evolution potential
   */
  getEvolutionPotential(ideas) {
    const potential = { high: 0, medium: 0, low: 0 };
    
    for (const idea of ideas) {
      potential[idea.metadata.evolution_potential]++;
    }
    
    return potential;
  }

  /**
   * Update unified evolution journal with idea
   * Invariant: Journal updates maintain system coherence
   */
  async updateEvolutionJournal(idea) {
    try {
      const journalPath = path.join(__dirname, '..', 'docs', 'EVOLUTION_JOURNAL.md');
      
      if (!fs.existsSync(journalPath)) {
        console.warn(`[${this.agentName}] Evolution journal not found at ${journalPath}`);
        return;
      }
      
      let journalContent = fs.readFileSync(journalPath, 'utf8');
      
      // Generate idea entry
      const ideaEntry = this.generateIdeaEntry(idea);
      
      // Insert idea entry in the Revolutionary Ideas section
      const ideasSectionRegex = /## Revolutionary Ideas\n\n(### [^\n]+\n(?:\*\*[^*]+\*\*: [^\n]+\n)*[^#]*)+/;
      const match = journalContent.match(ideasSectionRegex);
      
      if (match) {
        // Insert new idea entry after the first idea
        const firstIdeaEnd = journalContent.indexOf('### ', journalContent.indexOf('## Revolutionary Ideas'));
        const nextIdeaStart = journalContent.indexOf('### ', firstIdeaEnd + 1);
        
        if (nextIdeaStart === -1) {
          // Insert at the end of the ideas section
          const ideasEnd = journalContent.indexOf('\n## Learning Patterns');
          journalContent = journalContent.slice(0, ideasEnd) + '\n\n' + ideaEntry + journalContent.slice(ideasEnd);
        } else {
          // Insert between first and second idea
          journalContent = journalContent.slice(0, nextIdeaStart) + ideaEntry + '\n\n' + journalContent.slice(nextIdeaStart);
        }
      } else {
        // Fallback: insert after Revolutionary Ideas header
        const ideasHeader = journalContent.indexOf('## Revolutionary Ideas');
        const nextSection = journalContent.indexOf('##', ideasHeader + 1);
        journalContent = journalContent.slice(0, nextSection) + '\n\n' + ideaEntry + '\n\n' + journalContent.slice(nextSection);
      }
      
      // Write updated journal
      fs.writeFileSync(journalPath, journalContent);
      console.log(`[${this.agentName}] Updated evolution journal with idea ${idea.id}`);
      
    } catch (error) {
      console.error(`[${this.agentName}] Error updating evolution journal:`, error);
    }
  }

  /**
   * Generate idea entry for evolution journal
   * Invariant: Idea entry is always valid
   */
  generateIdeaEntry(idea) {
    const date = new Date(idea.timestamp).toISOString().split('T')[0];
    const title = idea.title || 'Untitled Idea';
    const description = idea.description || idea.content || '';
    const category = idea.category || 'general';
    const priority = idea.priority || 'medium';
    const evolutionPotential = idea.metadata?.evolution_potential || 'medium';
    const impactPotential = idea.metadata?.impact_potential || 'medium';
    const implementationComplexity = idea.metadata?.implementation_complexity || 'medium';
    
    return `### Idea ${this.ideaCounter}: ${title}
**ID**: \`${idea.id}\`
**Status**: ${idea.status}
**Priority**: ${priority}
**Category**: ${category}
**Evolution Potential**: ${evolutionPotential}
**Impact Potential**: ${impactPotential}
**Implementation Complexity**: ${implementationComplexity}

**The Idea**: ${description}

**Revolutionary Potential**:
- **Autonomous Capability**: ${evolutionPotential} potential for autonomous implementation
- **System Impact**: ${impactPotential} impact on system capabilities
- **Implementation Feasibility**: ${implementationComplexity} complexity - requires planning

**Tags**: ${idea.tags?.join(', ') || 'none'}
**Source**: ${idea.source}
**Context**: ${idea.metadata?.context || 'general'}

**Evolution History**:
- **${date}**: Captured and analyzed
- **Future**: Potential for implementation and evolution`;
  }

  /**
   * Get agent status
   */
  getAgentStatus() {
    return {
      agent_name: this.agentName,
      ideas_captured: this.ideaCounter,
      categories_available: Object.keys(this.ideaCategories).length,
      priorities_available: Object.keys(this.priorityLevels).length,
      sources_available: Object.keys(this.ideaSources).length,
      statuses_available: Object.keys(this.ideaStatuses).length
    };
  }
}

module.exports = IdeaCaptureAgent;
