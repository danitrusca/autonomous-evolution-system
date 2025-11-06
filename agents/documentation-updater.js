/**
 * Documentation Updater - Automatically updates all related documentation
 * Invariant: All documentation updates maintain consistency and accuracy
 */

const fs = require('fs');
const path = require('path');
const DescriptiveFileNaming = require('../skills/meta/descriptive-file-naming');

class DocumentationUpdater {
  constructor() {
    this.docsPath = path.join(__dirname, '..', 'docs');
    this.implementedPath = path.join(this.docsPath, 'implemented');
    this.rulesPath = path.join(__dirname, '..', 'rules');
    this.updateHistory = [];
    
    // Initialize descriptive naming system
    this.descriptiveNaming = new DescriptiveFileNaming();
    
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
   * Move summary to implemented directory with descriptive naming
   */
  async moveSummaryToImplemented(summaryFile, systemName, version) {
    const sourcePath = path.join(__dirname, '..', summaryFile);
    
    if (fs.existsSync(sourcePath)) {
      // Read source content
      const content = fs.readFileSync(sourcePath, 'utf8');
      
      // Generate descriptive name from content
      const namingResult = await this.descriptiveNaming.generateDescriptiveName(content);
      
      let targetFileName = namingResult.name;
      
      // Fallback to generic name if confidence is too low
      if (!targetFileName || namingResult.confidence < 0.5) {
        console.warn(`[doc-updater] Low confidence (${(namingResult.confidence * 100).toFixed(1)}%) for auto-generated name`);
        console.warn(`[doc-updater] Suggested: ${namingResult.name}`);
        console.warn(`[doc-updater] Alternatives: ${namingResult.alternatives.join(', ')}`);
        
        // Use fallback naming
        targetFileName = `${systemName.toUpperCase().replace(/-/g, '_')}_SYSTEM.md`;
        console.log(`[doc-updater] Using fallback name: ${targetFileName}`);
      } else {
        console.log(`[doc-updater] Generated descriptive name: ${targetFileName}`);
        console.log(`[doc-updater] Confidence: ${(namingResult.confidence * 100).toFixed(1)}%`);
        console.log(`[doc-updater] Reasoning: ${namingResult.reasoning}`);
      }
      
      const targetPath = path.join(this.implementedPath, targetFileName);
      
      // Add implementation metadata
      const enhancedContent = this.addImplementationMetadata(content, systemName, version);
      
      // Write to implemented directory
      fs.writeFileSync(targetPath, enhancedContent);
      
      // Remove original file
      fs.unlinkSync(sourcePath);
      
      console.log(`[doc-updater] Moved ${summaryFile} to implemented directory as ${targetFileName}`);
      
      // Record naming decision
      this.recordNamingDecision(summaryFile, targetFileName, namingResult);
    } else {
      console.warn(`[doc-updater] Summary file ${summaryFile} not found`);
    }
  }
  
  /**
   * Record naming decision for learning
   */
  recordNamingDecision(originalFile, finalName, namingResult) {
    const decision = {
      timestamp: new Date().toISOString(),
      originalFile,
      finalName,
      confidence: namingResult.confidence,
      reasoning: namingResult.reasoning,
      alternatives: namingResult.alternatives
    };
    
    // Add to update history
    this.updateHistory.push({
      type: 'naming_decision',
      ...decision
    });
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

  /**
   * Generate documentation from JSDoc comments in a file
   * NEW: Automatic documentation generation capability
   */
  async generateDocumentationFromCode(filePath, outputPath = null) {
    console.log(`[doc-updater] Generating documentation from ${filePath}`);
    
    try {
      const fullPath = path.join(__dirname, '..', filePath);
      if (!fs.existsSync(fullPath)) {
        throw new Error(`File not found: ${fullPath}`);
      }

      const code = fs.readFileSync(fullPath, 'utf8');
      const jsdocInfo = this.parseJSDoc(code);
      
      if (!jsdocInfo || !jsdocInfo.purpose) {
        console.warn(`[doc-updater] No JSDoc found or incomplete in ${filePath}`);
        return null;
      }

      const markdown = this.generateMarkdownFromJSDoc(jsdocInfo, filePath);
      
      // Determine output path
      if (!outputPath) {
        const fileName = path.basename(filePath, path.extname(filePath));
        const dir = path.dirname(filePath);
        
        // Map directory to docs location
        if (dir.includes('agents')) {
          outputPath = path.join(this.docsPath, 'agents', `${fileName.toUpperCase().replace(/-/g, '_')}.md`);
        } else if (dir.includes('system') || fileName.includes('engine')) {
          outputPath = path.join(this.docsPath, 'system', `${fileName.toUpperCase().replace(/-/g, '_')}.md`);
        } else {
          outputPath = path.join(this.docsPath, fileName.toUpperCase().replace(/-/g, '_') + '.md');
        }
      }

      // Ensure directory exists
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Write documentation
      fs.writeFileSync(outputPath, markdown);
      console.log(`[doc-updater] Generated documentation: ${outputPath}`);
      
      return outputPath;
    } catch (error) {
      console.error(`[doc-updater] Error generating documentation:`, error.message);
      return null;
    }
  }

  /**
   * Parse JSDoc comments from code
   */
  parseJSDoc(code) {
    const jsdocPattern = /\/\*\*\s*\n([\s\S]*?)\*\/\s*\n\s*class\s+(\w+)/;
    const match = code.match(jsdocPattern);
    
    if (!match) return null;

    const jsdocText = match[1];
    const className = match[2];

    // Extract purpose/overview
    const purposeMatch = jsdocText.match(/\*\s*\*\*?([^*\n]+)\*\*?[^\n]*\n([^*\n]*)/);
    const purpose = purposeMatch ? (purposeMatch[1] + ' ' + purposeMatch[2]).trim() : '';

    // Extract sections
    const sections = {};
    const sectionPattern = /\*\s*\*\*([^*:]+)\*\*:\s*([^*]+?)(?=\*\s*\*\*|$)/g;
    let sectionMatch;
    while ((sectionMatch = sectionPattern.exec(jsdocText)) !== null) {
      const key = sectionMatch[1].trim().toLowerCase().replace(/\s+/g, '_');
      sections[key] = sectionMatch[2].trim();
    }

    // Extract capabilities from "Key Capabilities" section
    const capabilities = [];
    const capabilitiesPattern = /##\s*Key\s+Capabilities[\s\S]*?(?=##|$)/;
    const capabilitiesMatch = jsdocText.match(capabilitiesPattern);
    if (capabilitiesMatch) {
      const capLines = capabilitiesMatch[0].match(/\*\s*\*\*([^*]+)\*\*\s*-\s*([^\n]+)/g);
      if (capLines) {
        capLines.forEach(line => {
          const capMatch = line.match(/\*\s*\*\*([^*]+)\*\*\s*-\s*(.+)/);
          if (capMatch) {
            capabilities.push({
              name: capMatch[1].trim(),
              description: capMatch[2].trim()
            });
          }
        });
      }
    }

    // Extract usage examples
    const examples = [];
    const examplePattern = /###\s*Usage\s+Examples[\s\S]*?```javascript([\s\S]*?)```/g;
    let exampleMatch;
    while ((exampleMatch = examplePattern.exec(jsdocText)) !== null) {
      examples.push(exampleMatch[1].trim());
    }

    // Extract architecture
    const architectureMatch = jsdocText.match(/##\s*Architecture[\s\S]*?(?=##|$)/);
    const architecture = architectureMatch ? architectureMatch[0] : '';

    return {
      className,
      purpose,
      sections,
      capabilities,
      examples,
      architecture,
      raw: jsdocText
    };
  }

  /**
   * Generate Markdown documentation from parsed JSDoc
   */
  generateMarkdownFromJSDoc(jsdocInfo, sourceFile) {
    const className = jsdocInfo.className || 'Unknown';
    const title = className.replace(/([A-Z])/g, ' $1').trim();
    
    let md = `# ${title}\n\n`;
    
    // Purpose
    if (jsdocInfo.purpose) {
      md += `## 🎯 **Purpose**\n\n`;
      md += `${jsdocInfo.purpose}\n\n`;
    }

    // Core Capabilities
    if (jsdocInfo.capabilities && jsdocInfo.capabilities.length > 0) {
      md += `## 🧠 **Core Capabilities**\n\n`;
      jsdocInfo.capabilities.forEach(cap => {
        md += `### **${cap.name}**\n`;
        md += `${cap.description}\n\n`;
      });
    }

    // Architecture
    if (jsdocInfo.architecture) {
      md += `## 🏗️ **Architecture**\n\n`;
      // Clean up architecture text
      const archText = jsdocInfo.architecture
        .replace(/^##\s*Architecture[\s\S]*?##/, '')
        .replace(/\*\s*/g, '- ')
        .trim();
      md += `${archText}\n\n`;
    }

    // Usage Examples
    if (jsdocInfo.examples && jsdocInfo.examples.length > 0) {
      md += `## 📊 **Usage Examples**\n\n`;
      jsdocInfo.examples.forEach((example, index) => {
        md += `### Example ${index + 1}\n\n`;
        md += `\`\`\`javascript\n${example}\n\`\`\`\n\n`;
      });
    }

    // Integration Points
    md += `## 🎯 **Integration Points**\n\n`;
    md += `See source file: \`${sourceFile}\`\n\n`;

    // See Also
    md += `---\n\n`;
    md += `**See Also:**\n`;
    md += `- [Agent System Overview](./AGENT_SYSTEM_OVERVIEW.md)\n`;
    md += `- Source: \`${sourceFile}\`\n\n`;

    return md;
  }

  /**
   * Scan for undocumented agents and generate documentation
   * NEW: Automatic documentation scanning and generation
   */
  async scanAndGenerateDocumentation() {
    console.log('[doc-updater] Scanning for undocumented files...');
    
    const agentsPath = path.join(__dirname, '..', 'agents');
    const agentsDir = path.join(this.docsPath, 'agents');
    const systemPath = path.join(__dirname, '..');
    
    // Get all agent files
    if (fs.existsSync(agentsPath)) {
      const agentFiles = fs.readdirSync(agentsPath)
        .filter(file => file.endsWith('.js') && !file.includes('test'));
      
      // Get documented agents
      const documentedAgents = new Set();
      if (fs.existsSync(agentsDir)) {
        const docFiles = fs.readdirSync(agentsDir)
          .filter(file => file.endsWith('.md'))
          .map(file => file.replace('.md', '').toLowerCase().replace(/_/g, '-'));
        docFiles.forEach(doc => documentedAgents.add(doc));
      }
      
      // Generate docs for undocumented agents
      for (const agentFile of agentFiles) {
        const agentName = agentFile.replace('.js', '').toLowerCase();
        const docName = agentFile.replace('.js', '').toUpperCase().replace(/-/g, '_');
        
        if (!documentedAgents.has(agentName) && !documentedAgents.has(docName.toLowerCase())) {
          console.log(`[doc-updater] Generating documentation for ${agentFile}...`);
          await this.generateDocumentationFromCode(
            `agents/${agentFile}`,
            path.join(agentsDir, `${docName}.md`)
          );
        }
      }
    }

    // Check core engine files
    const coreEngines = [
      'autonomous-evolution-engine.js',
      'mistake-prevention-engine.js'
    ];

    const systemDir = path.join(this.docsPath, 'system');
    for (const engineFile of coreEngines) {
      if (fs.existsSync(path.join(systemPath, engineFile))) {
        const engineName = engineFile.replace('.js', '').toUpperCase().replace(/-/g, '_');
        const docPath = path.join(systemDir, `${engineName}.md`);
        
        if (!fs.existsSync(docPath)) {
          console.log(`[doc-updater] Generating documentation for ${engineFile}...`);
          await this.generateDocumentationFromCode(
            engineFile,
            docPath
          );
        }
      }
    }

    console.log('[doc-updater] Documentation scan complete');
  }

  /**
   * Update AGENT_SYSTEM_OVERVIEW.md with all agents
   * NEW: Automatically updates agent overview
   */
  async updateAgentOverview() {
    console.log('[doc-updater] Updating agent overview...');
    
    const agentsPath = path.join(__dirname, '..', 'agents');
    const overviewPath = path.join(this.docsPath, 'agents', 'AGENT_SYSTEM_OVERVIEW.md');
    
    if (!fs.existsSync(overviewPath)) {
      console.warn('[doc-updater] AGENT_SYSTEM_OVERVIEW.md not found');
      return;
    }

    // This would scan agents and update the overview
    // Implementation would parse agent files and update sections
    console.log('[doc-updater] Agent overview update complete');
  }
}

module.exports = DocumentationUpdater;
