/**
 * Documentation Updater
 * 
 * Automatically updates documentation to fix common issues
 */

const fs = require('fs');
const path = require('path');

class DocumentationUpdater {
  constructor() {
    this.docsPath = path.join(__dirname, 'docs');
    this.updates = [];
  }

  /**
   * Run all documentation updates
   */
  async runAllUpdates() {
    console.log('🔄 Starting Documentation Updates\n');
    
    try {
      // Update 1: Fix README.md references
      await this.updateReadmeReferences();
      
      // Update 2: Add v1.1.0 features to README.md
      await this.addV1FeaturesToReadme();
      
      // Update 3: Standardize version references
      await this.standardizeVersions();
      
      // Update 4: Create missing agent documentation
      await this.createMissingAgentDocs();
      
      // Display results
      this.displayResults();
      
    } catch (error) {
      console.error('❌ Documentation update failed:', error);
    }
  }

  /**
   * Update README.md references to new journal path
   */
  async updateReadmeReferences() {
    console.log('🔄 Updating README.md references...');
    
    try {
      const readmePath = path.join(this.docsPath, 'README.md');
      let content = fs.readFileSync(readmePath, 'utf8');
      
      // Replace old journal references
      const replacements = [
        { from: 'AUTONOMOUS_EVOLUTION_JOURNAL_LIVING.md', to: 'EVOLUTION_JOURNAL.md' },
        { from: 'docs/AUTONOMOUS_EVOLUTION_JOURNAL_LIVING.md', to: 'docs/living/EVOLUTION_JOURNAL.md' },
        { from: 'docs/AUTONOMOUS_EVOLUTION_JOURNAL', to: 'docs/living/EVOLUTION_JOURNAL.md' },
        { from: 'this.journalPath = path.join(__dirname, \'docs\', \'AUTONOMOUS_EVOLUTION_JOURNAL_LIVING.md\');', to: 'this.journalPath = path.join(__dirname, \'docs\', \'living\', \'EVOLUTION_JOURNAL.md\');' },
        { from: 'path.join(currentDir, \'docs\', \'AUTONOMOUS_EVOLUTION_JOURNAL_LIVING.md\')', to: 'path.join(currentDir, \'docs\', \'living\', \'EVOLUTION_JOURNAL.md\')' },
        { from: 'path.join(aesFolder, \'docs\', \'AUTONOMOUS_EVOLUTION_JOURNAL_LIVING.md\')', to: 'path.join(aesFolder, \'docs\', \'living\', \'EVOLUTION_JOURNAL.md\')' },
        { from: '\'docs/AUTONOMOUS_EVOLUTION_JOURNAL_LIVING.md\'', to: '\'docs/living/EVOLUTION_JOURNAL.md\'' },
        { from: 'docs/AUTONOMOUS_EVOLUTION_JOURNAL_LIVING.md', to: 'docs/living/EVOLUTION_JOURNAL.md' }
      ];
      
      let updated = false;
      for (const { from, to } of replacements) {
        if (content.includes(from)) {
          content = content.replace(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), to);
          updated = true;
        }
      }
      
      if (updated) {
        fs.writeFileSync(readmePath, content, 'utf8');
        this.updates.push('Updated README.md journal references');
        console.log('✅ README.md references updated');
      } else {
        console.log('ℹ️  No README.md references to update');
      }
      
    } catch (error) {
      console.error('❌ Error updating README.md references:', error.message);
    }
  }

  /**
   * Add v1.1.0 features to README.md
   */
  async addV1FeaturesToReadme() {
    console.log('🔄 Adding v1.1.0 features to README.md...');
    
    try {
      const readmePath = path.join(this.docsPath, 'README.md');
      let content = fs.readFileSync(readmePath, 'utf8');
      
      // Check if v1.1.0 features are already present
      if (content.includes('v1.1.0') && content.includes('Autonomous Versioning System')) {
        console.log('ℹ️  v1.1.0 features already present in README.md');
        return;
      }
      
      // Find the system capabilities section and add v1.1.0 features
      const capabilitiesSection = '### **What This System Achieves:**';
      const v1Features = `
- ✅ **Autonomous Versioning** - Automatic commit analysis and semantic versioning
- ✅ **Principles Library** - Evidence-based decision making framework
- ✅ **Unified Documentation** - Organized documentation system
- ✅ **Living Learning** - Extracted learning patterns and evolution tracking`;
      
      if (content.includes(capabilitiesSection)) {
        content = content.replace(capabilitiesSection, capabilitiesSection + v1Features);
        fs.writeFileSync(readmePath, content, 'utf8');
        this.updates.push('Added v1.1.0 features to README.md');
        console.log('✅ v1.1.0 features added to README.md');
      } else {
        console.log('ℹ️  Could not find capabilities section in README.md');
      }
      
    } catch (error) {
      console.error('❌ Error adding v1.1.0 features:', error.message);
    }
  }

  /**
   * Standardize version references
   */
  async standardizeVersions() {
    console.log('🔄 Standardizing version references...');
    
    try {
      const filesToUpdate = [
        'system/SYSTEM_OVERVIEW.md',
        'living/EVOLUTION_JOURNAL.md'
      ];
      
      for (const file of filesToUpdate) {
        const filePath = path.join(this.docsPath, file);
        if (fs.existsSync(filePath)) {
          let content = fs.readFileSync(filePath, 'utf8');
          
          // Standardize to v1.1.0
          if (content.includes('v1.0.0') && !content.includes('v1.1.0')) {
            content = content.replace(/v1\.0\.0/g, 'v1.1.0');
            fs.writeFileSync(filePath, content, 'utf8');
            this.updates.push(`Standardized versions in ${file}`);
            console.log(`✅ Standardized versions in ${file}`);
          }
        }
      }
      
    } catch (error) {
      console.error('❌ Error standardizing versions:', error.message);
    }
  }

  /**
   * Create missing agent documentation
   */
  async createMissingAgentDocs() {
    console.log('🔄 Creating missing agent documentation...');
    
    try {
      const agentsPath = path.join(__dirname, 'agents');
      const docsAgentsPath = path.join(this.docsPath, 'agents');
      
      if (!fs.existsSync(agentsPath)) {
        console.log('ℹ️  No agents directory found');
        return;
      }
      
      const agentFiles = fs.readdirSync(agentsPath)
        .filter(file => file.endsWith('.js') && !file.includes('test'))
        .map(file => file.replace('.js', '.md'));
      
      for (const agentFile of agentFiles) {
        const docFileName = agentFile.toUpperCase().replace('.JS', '.md');
        const docPath = path.join(docsAgentsPath, docFileName);
        
        if (!fs.existsSync(docPath)) {
          const agentName = agentFile.replace('.md', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          
          const docContent = `# ${agentName}

## Overview

The **${agentName}** is an autonomous agent in the Autonomous Evolution System.

## Key Capabilities

### Core Functionality
- [To be documented based on agent implementation]

### Integration
- [To be documented based on agent integration]

## Configuration

### Default Settings
- [To be documented based on agent configuration]

### Customization
- [To be documented based on agent customization options]

## API Reference

### Methods
- [To be documented based on agent methods]

### Events
- [To be documented based on agent events]

## Usage Examples

### Basic Usage
\`\`\`javascript
const ${agentFile.replace('.md', '')} = require('./agents/${agentFile.replace('.md', '')}');
const agent = new ${agentFile.replace('.md', '')}();
\`\`\`

### Advanced Usage
\`\`\`javascript
// Advanced usage examples
\`\`\`

## Troubleshooting

### Common Issues
- [To be documented based on common issues]

### Error Handling
- [To be documented based on error handling]

---

**This agent documentation is automatically generated and needs to be completed with specific implementation details.**
`;
          
          fs.writeFileSync(docPath, docContent, 'utf8');
          this.updates.push(`Created documentation for ${agentName}`);
          console.log(`✅ Created documentation for ${agentName}`);
        }
      }
      
    } catch (error) {
      console.error('❌ Error creating agent documentation:', error.message);
    }
  }

  /**
   * Display results
   */
  displayResults() {
    console.log('\n📊 Documentation Update Results:');
    console.log('=================================');
    
    if (this.updates.length > 0) {
      console.log('\n✅ Updates Applied:');
      this.updates.forEach(update => {
        console.log(`  ✅ ${update}`);
      });
    } else {
      console.log('\nℹ️  No updates were needed');
    }
    
    console.log(`\n📈 Summary:`);
    console.log(`  Updates Applied: ${this.updates.length}`);
    console.log(`  Status: ${this.updates.length > 0 ? 'Updated' : 'Up to date'}`);
  }
}

// Run updates if this file is executed directly
if (require.main === module) {
  const updater = new DocumentationUpdater();
  updater.runAllUpdates().catch(console.error);
}

module.exports = DocumentationUpdater;
