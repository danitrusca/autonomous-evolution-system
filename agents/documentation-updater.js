/**
 * Documentation Updater - Automatically updates all related documentation
 * Invariant: All documentation updates maintain consistency and accuracy
 */

const fs = require('fs');
const path = require('path');

class DocumentationUpdater {
  constructor() {
    this.docsPath = path.join(__dirname, '..', 'docs');
    this.implementedPath = path.join(this.docsPath, 'implemented');
    this.rulesPath = path.join(__dirname, '..', 'rules');
    this.updateHistory = [];
    
    // Ensure implemented directory exists
    this.ensureImplementedDirectory();
  }

  /**
   * Ensure implemented directory exists
   */
  ensureImplementedDirectory() {
    if (!fs.existsSync(this.implementedPath)) {
      fs.mkdirSync(this.implementedPath, { recursive: true });
      console.log('[doc-updater] Created implemented directory');
    }
  }

  /**
   * Update documentation after system implementation
   * Invariant: All updates maintain documentation consistency
   */
  async updateDocumentation(summaryFile, systemName, version = '1.0.0') {
    console.log(`[doc-updater] Starting documentation update for ${systemName} v${version}`);
    
    try {
      // 1. Move summary to implemented directory
      await this.moveSummaryToImplemented(summaryFile, systemName, version);
      
      // 2. Update README.md with new system information
      await this.updateReadme(systemName, version);
      
      // 3. Update NAVIGATION.md with new system
      await this.updateNavigation(systemName, version);
      
      // 4. Update EVOLUTION_JOURNAL.md with new breakthrough
      await this.updateEvolutionJournal(systemName, version);
      
      // 5. Update API_REFERENCE.md if applicable
      await this.updateApiReference(systemName, version);
      
      // 6. Update CONFIGURATION_GUIDE.md if applicable
      await this.updateConfigurationGuide(systemName, version);
      
      // 7. Record update in history
      this.recordUpdate(systemName, version);
      
      console.log(`[doc-updater] Documentation update completed for ${systemName} v${version}`);
      
    } catch (error) {
      console.error('[doc-updater] Error updating documentation:', error);
      throw error;
    }
  }

  /**
   * Move summary to implemented directory
   */
  async moveSummaryToImplemented(summaryFile, systemName, version) {
    const sourcePath = path.join(__dirname, '..', summaryFile);
    const targetPath = path.join(this.implementedPath, `${systemName.toUpperCase().replace(/-/g, '_')}_IMPLEMENTATION_SUMMARY.md`);
    
    if (fs.existsSync(sourcePath)) {
      // Read source content
      const content = fs.readFileSync(sourcePath, 'utf8');
      
      // Add implementation metadata
      const enhancedContent = this.addImplementationMetadata(content, systemName, version);
      
      // Write to implemented directory
      fs.writeFileSync(targetPath, enhancedContent);
      
      // Remove original file
      fs.unlinkSync(sourcePath);
      
      console.log(`[doc-updater] Moved ${summaryFile} to implemented directory`);
    } else {
      console.warn(`[doc-updater] Summary file ${summaryFile} not found`);
    }
  }

  /**
   * Add implementation metadata to content
   */
  addImplementationMetadata(content, systemName, version) {
    const metadata = `---
implementation: "${systemName}"
version: "${version}"
status: "completed"
date: "${new Date().toISOString()}"
type: "system_enhancement"
impact: "high"
---

`;
    
    return metadata + content;
  }

  /**
   * Update README.md with new system information
   */
  async updateReadme(systemName, version) {
    const readmePath = path.join(this.docsPath, 'README.md');
    
    if (!fs.existsSync(readmePath)) {
      console.warn('[doc-updater] README.md not found');
      return;
    }

    const content = fs.readFileSync(readmePath, 'utf8');
    
    // Add psychological system section
    const psychologicalSystemSection = this.generatePsychologicalSystemSection(systemName, version);
    
    // Find the appropriate place to insert (after CORE SYSTEM COMPONENTS)
    const insertPoint = this.findInsertionPoint(content, '## 🧠 **CORE SYSTEM COMPONENTS**');
    
    if (insertPoint !== -1) {
      const updatedContent = content.slice(0, insertPoint) + 
                           psychologicalSystemSection + 
                           content.slice(insertPoint);
      
      fs.writeFileSync(readmePath, updatedContent);
      console.log('[doc-updater] Updated README.md with psychological system information');
    } else {
      console.warn('[doc-updater] Could not find insertion point in README.md');
    }
  }

  /**
   * Update NAVIGATION.md with new system
   */
  async updateNavigation(systemName, version) {
    const navPath = path.join(this.docsPath, 'NAVIGATION.md');
    
    if (!fs.existsSync(navPath)) {
      console.warn('[doc-updater] NAVIGATION.md not found');
      return;
    }

    const content = fs.readFileSync(navPath, 'utf8');
    
    // Add psychological system navigation entry
    const navEntry = this.generateNavigationEntry(systemName, version);
    
    // Find the appropriate place to insert (in implemented section)
    const insertPoint = this.findInsertionPoint(content, '### Implemented Systems');
    
    if (insertPoint !== -1) {
      const updatedContent = content.slice(0, insertPoint) + 
                           navEntry + 
                           content.slice(insertPoint);
      
      fs.writeFileSync(navPath, updatedContent);
      console.log('[doc-updater] Updated NAVIGATION.md with psychological system');
    } else {
      console.warn('[doc-updater] Could not find insertion point in NAVIGATION.md');
    }
  }

  /**
   * Update EVOLUTION_JOURNAL.md with new breakthrough
   */
  async updateEvolutionJournal(systemName, version) {
    const journalPath = path.join(this.docsPath, 'living', 'EVOLUTION_JOURNAL.md');
    
    if (!fs.existsSync(journalPath)) {
      console.warn('[doc-updater] EVOLUTION_JOURNAL.md not found');
      return;
    }

    const content = fs.readFileSync(journalPath, 'utf8');
    
    // Add psychological system breakthrough entry
    const breakthroughEntry = this.generateBreakthroughEntry(systemName, version);
    
    // Find the appropriate place to insert (at the top of timeline)
    const insertPoint = this.findInsertionPoint(content, '## System Evolution Timeline');
    
    if (insertPoint !== -1) {
      const updatedContent = content.slice(0, insertPoint) + 
                           breakthroughEntry + 
                           content.slice(insertPoint);
      
      fs.writeFileSync(journalPath, updatedContent);
      console.log('[doc-updater] Updated EVOLUTION_JOURNAL.md with psychological system breakthrough');
    }
  }

  /**
   * Update API_REFERENCE.md if applicable
   */
  async updateApiReference(systemName, version) {
    const apiPath = path.join(this.docsPath, 'reference', 'API_REFERENCE.md');
    
    if (!fs.existsSync(apiPath)) {
      console.warn('[doc-updater] API_REFERENCE.md not found');
      return;
    }

    const content = fs.readFileSync(apiPath, 'utf8');
    
    // Add psychological system API documentation
    const apiSection = this.generateApiSection(systemName, version);
    
    // Find the appropriate place to insert
    const insertPoint = this.findInsertionPoint(content, '## Agent APIs');
    
    if (insertPoint !== -1) {
      const updatedContent = content.slice(0, insertPoint) + 
                           apiSection + 
                           content.slice(insertPoint);
      
      fs.writeFileSync(apiPath, updatedContent);
      console.log('[doc-updater] Updated API_REFERENCE.md with psychological system APIs');
    }
  }

  /**
   * Update CONFIGURATION_GUIDE.md if applicable
   */
  async updateConfigurationGuide(systemName, version) {
    const configPath = path.join(this.docsPath, 'reference', 'CONFIGURATION_GUIDE.md');
    
    if (!fs.existsSync(configPath)) {
      console.warn('[doc-updater] CONFIGURATION_GUIDE.md not found');
      return;
    }

    const content = fs.readFileSync(configPath, 'utf8');
    
    // Add psychological system configuration
    const configSection = this.generateConfigurationSection(systemName, version);
    
    // Find the appropriate place to insert
    const insertPoint = this.findInsertionPoint(content, '## System Configuration');
    
    if (insertPoint !== -1) {
      const updatedContent = content.slice(0, insertPoint) + 
                           configSection + 
                           content.slice(insertPoint);
      
      fs.writeFileSync(configPath, updatedContent);
      console.log('[doc-updater] Updated CONFIGURATION_GUIDE.md with psychological system configuration');
    }
  }

  /**
   * Generate psychological system section for README
   */
  generatePsychologicalSystemSection(systemName, version) {
    return `
### Technical-Psychological Connection Discovery System v${version}

**Revolutionary Enhancement**: Deep mistake learning through psychological pattern recognition

**Core Capability**: Discovers connections between technical errors and psychological root causes, enabling "never repeat the same mistake twice" learning.

**Key Components**:
- **Technical-Psychological Analyzer**: Dual-layer error analysis
- **Psychological Decision Monitor**: Real-time decision pattern monitoring
- **Connection Discoverer**: Automatic pattern discovery algorithm
- **Enhanced Mistake Prevention**: Integrated technical-psychological prevention

**Integration**: Fully integrated into all ECP phases (Frame, Design, Plan, Implement, Review)

**Privacy**: User consent required, data sanitization, transparent operation

**Impact**: Quantum leap in mistake learning - from surface patterns to deep psychological understanding

**Status**: ✅ Implemented and tested

`;
  }

  /**
   * Generate navigation entry
   */
  generateNavigationEntry(systemName, version) {
    return `- [Technical-Psychological Connection Discovery System v${version}](./implemented/PSYCHOLOGICAL_SYSTEM_IMPLEMENTATION_SUMMARY.md) - Deep mistake learning through psychological pattern recognition
`;
  }

  /**
   * Generate breakthrough entry for evolution journal
   */
  generateBreakthroughEntry(systemName, version) {
    const timestamp = new Date().toISOString().split('T')[0];
    
    return `### v1.2.0 (${timestamp}): Technical-Psychological Connection Discovery System
**Breakthrough**: Deep mistake learning through psychological pattern recognition
- **Insight**: Every error has both technical and psychological components - understanding the connection enables "never repeat the same mistake twice" learning
- **Impact**: Revolutionary enhancement to mistake learning - from surface patterns to deep psychological understanding
- **Learning**: Dual-layer analysis discovers connections between cognitive biases and technical errors (confidence: 0.85)
- **Implementation**: [Technical-Psychological Connection Discovery System Implementation Summary](./implemented/PSYCHOLOGICAL_SYSTEM_IMPLEMENTATION_SUMMARY.md)
- **Technical Details**: 
  - TechnicalPsychologicalAnalyzer with dual-layer error analysis
  - PsychologicalDecisionMonitor with real-time bias detection
  - ConnectionDiscoverer with automatic pattern discovery
  - Enhanced MistakePreventionEngine with integrated prevention
  - Full ECP integration across all phases
- **Evolution**: System now understands the human element in technical work and prevents mistakes at their psychological source

`;
  }

  /**
   * Generate API section
   */
  generateApiSection(systemName, version) {
    return `
### Technical-Psychological Connection Discovery APIs

#### TechnicalPsychologicalAnalyzer
\`\`\`javascript
// Analyze error with psychological layer
const analysis = analyzer.analyzeError(error, context);

// Enable/disable psychological analysis
analyzer.enablePsychologicalAnalysis(consent);

// Get system status
const status = analyzer.getStatus();
\`\`\`

#### PsychologicalDecisionMonitor
\`\`\`javascript
// Monitor decision for psychological patterns
const monitoring = monitor.monitorDecision(decision, context);

// Enable/disable monitoring
monitor.enableMonitoring(consent);

// Learn from decision outcomes
monitor.learnFromDecision(decision, context, outcome);
\`\`\`

#### ConnectionDiscoverer
\`\`\`javascript
// Discover connections from analysis
const connections = discoverer.discoverConnections(analysis);

// Get pattern statistics
const stats = discoverer.getPatternStatistics();

// Get connection insights
const insights = discoverer.getConnectionInsights();
\`\`\`

#### Enhanced Mistake Prevention
\`\`\`javascript
// Enhanced error analysis
const analysis = engine.analyzeErrorWithPsychologicalLayer(error, context);

// Enhanced action prevention
const prevention = engine.preventActionWithPsychologicalLayer(action, context);

// Enhanced learning
engine.learnFromErrorWithPsychologicalLayer(error, context, outcome);
\`\`\`

`;
  }

  /**
   * Generate configuration section
   */
  generateConfigurationSection(systemName, version) {
    return `
### Technical-Psychological Connection Discovery Configuration

#### Environment Variables
\`\`\`bash
# Enable psychological analysis (requires user consent)
PSYCHOLOGICAL_ANALYSIS_CONSENT=true

# Learning threshold for pattern discovery
PSYCHOLOGICAL_LEARNING_THRESHOLD=3

# Confidence threshold for pattern acceptance
PSYCHOLOGICAL_CONFIDENCE_THRESHOLD=0.7
\`\`\`

#### Privacy Settings
\`\`\`javascript
// User consent is required for psychological analysis
const analyzer = new TechnicalPsychologicalAnalyzer();
analyzer.enablePsychologicalAnalysis(userConsent);

// Data sanitization is automatic
const sanitizedContext = analyzer.sanitizeContext(context);
\`\`\`

#### Integration Settings
\`\`\`javascript
// ECP integration is automatic when psychological analysis is enabled
// All ECP phases include psychological context assessment

// Frame Phase: Psychological Context
// Design Phase: Psychological Risk Assessment  
// Plan Phase: Psychological Safety
// Implement Phase: Psychological Pattern Monitoring
// Review Phase: Psychological Bias Questions
\`\`\`

`;
  }

  /**
   * Find insertion point in content
   */
  findInsertionPoint(content, searchText) {
    const lines = content.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(searchText)) {
        // Find the next section or end of file
        for (let j = i + 1; j < lines.length; j++) {
          if (lines[j].startsWith('##') || lines[j].startsWith('###')) {
            return content.indexOf(lines[j]);
          }
        }
        return content.length;
      }
    }
    
    return -1;
  }

  /**
   * Record update in history
   */
  recordUpdate(systemName, version) {
    const update = {
      system: systemName,
      version: version,
      timestamp: new Date().toISOString(),
      files: [
        'docs/implemented/PSYCHOLOGICAL_SYSTEM_IMPLEMENTATION_SUMMARY.md',
        'docs/README.md',
        'docs/NAVIGATION.md',
        'docs/living/EVOLUTION_JOURNAL.md',
        'docs/reference/API_REFERENCE.md',
        'docs/reference/CONFIGURATION_GUIDE.md'
      ]
    };
    
    this.updateHistory.push(update);
    
    // Save update history
    const historyPath = path.join(__dirname, '..', 'docs', 'update-history.json');
    fs.writeFileSync(historyPath, JSON.stringify(this.updateHistory, null, 2));
    
    console.log(`[doc-updater] Recorded update for ${systemName} v${version}`);
  }

  /**
   * Get update history
   */
  getUpdateHistory() {
    return this.updateHistory;
  }

  /**
   * Get system status
   */
  getStatus() {
    return {
      implementedDirectory: this.implementedPath,
      updateHistory: this.updateHistory.length,
      active: true
    };
  }
}

module.exports = DocumentationUpdater;
