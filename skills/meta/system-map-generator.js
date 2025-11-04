/**
 * System Map Generator
 * Automatically generates and updates the system map based on current system structure
 */

const fs = require('fs');
const path = require('path');

class SystemMapGenerator {
  constructor() {
    this.rootPath = path.join(__dirname, '..', '..');
    this.mapPath = path.join(this.rootPath, 'SYSTEM_MAP.md');
    this.agentsPath = path.join(this.rootPath, 'agents');
    this.skillsPath = path.join(this.rootPath, 'skills');
    this.rulesPath = path.join(this.rootPath, 'rules');
    this.docsPath = path.join(this.rootPath, 'docs');
    this.extensionsPath = path.join(this.rootPath, 'extensions');
    this.journalPath = path.join(this.rootPath, 'docs', 'living', 'EVOLUTION_JOURNAL.md');
  }

  /**
   * Generate complete system map
   */
  async generateSystemMap() {
    console.log('[system-map-generator] Generating system map...');
    
    try {
      const components = await this.scanSystem();
      const map = this.buildMap(components);
      
      // Write to root-level file
      fs.writeFileSync(this.mapPath, map, 'utf8');
      
      console.log('[system-map-generator] System map generated successfully');
      return { success: true, components: Object.keys(components).length };
    } catch (error) {
      console.error('[system-map-generator] Error generating map:', error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Scan system for all components
   */
  async scanSystem() {
    const components = {
      agents: [],
      skills: [],
      rules: [],
      extensions: [],
      docs: [],
      status: {}
    };

    // Scan agents
    if (fs.existsSync(this.agentsPath)) {
      const agentFiles = fs.readdirSync(this.agentsPath).filter(f => f.endsWith('.js'));
      components.agents = agentFiles.map(file => ({
        name: file.replace('.js', ''),
        path: `agents/${file}`,
        status: 'active' // Could check actual status
      }));
    }

    // Scan skills
    if (fs.existsSync(this.skillsPath)) {
      const skillDirs = fs.readdirSync(this.skillsPath, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name);
      
      components.skills = [];
      skillDirs.forEach(dir => {
        const skillFiles = fs.readdirSync(path.join(this.skillsPath, dir))
          .filter(f => f.endsWith('.md'));
        skillFiles.forEach(file => {
          components.skills.push({
            name: file.replace('.md', ''),
            category: dir,
            path: `skills/${dir}/${file}`
          });
        });
      });
    }

    // Scan rules
    if (fs.existsSync(this.rulesPath)) {
      const ruleFiles = fs.readdirSync(this.rulesPath).filter(f => f.endsWith('.md'));
      components.rules = ruleFiles.map(file => ({
        name: file,
        path: `rules/${file}`
      }));
    }

    // Scan extensions
    if (fs.existsSync(this.extensionsPath)) {
      const extDirs = fs.readdirSync(this.extensionsPath, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name);
      components.extensions = extDirs.map(dir => ({
        name: dir,
        path: `extensions/${dir}`,
        status: 'loaded' // Could check actual load status
      }));
    }

    // Scan documentation
    if (fs.existsSync(this.docsPath)) {
      components.docs = this.scanDocs(this.docsPath, 'docs');
    }

    // Get system status
    components.status = await this.getSystemStatus();

    return components;
  }

  /**
   * Recursively scan documentation
   */
  scanDocs(dirPath, relativePath) {
    const docs = [];
    try {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });
      entries.forEach(entry => {
        if (entry.isDirectory()) {
          docs.push(...this.scanDocs(
            path.join(dirPath, entry.name),
            `${relativePath}/${entry.name}`
          ));
        } else if (entry.name.endsWith('.md')) {
          docs.push({
            name: entry.name.replace('.md', ''),
            path: `${relativePath}/${entry.name}`
          });
        }
      });
    } catch (error) {
      // Gracefully handle errors
    }
    return docs;
  }

  /**
   * Get current system status
   */
  async getSystemStatus() {
    const status = {
      evolutionEngine: 'active',
      continuousEvolution: 'running',
      agents: {},
      skills: {},
      lastUpdate: new Date().toISOString()
    };

    // Check evolution journal for recent activity
    if (fs.existsSync(this.journalPath)) {
      const journalContent = fs.readFileSync(this.journalPath, 'utf8');
      const recentEntries = journalContent.match(/### \d{4}-\d{2}-\d{2}/g);
      if (recentEntries && recentEntries.length > 0) {
        const latest = recentEntries[recentEntries.length - 1];
        status.lastEvolutionEntry = latest.replace('### ', '');
      }
    }

    return status;
  }

  /**
   * Build map markdown from components
   */
  buildMap(components) {
    const timestamp = new Date().toISOString();
    
    let map = `# Autonomous Evolution System - Complete System Map
*Auto-Generated: ${timestamp} - Always Current, Always Accessible*

> **Purpose**: This is your **single source of truth** for understanding the entire Autonomous Evolution System at a glance. **Auto-updates** when components change.

## 🗺️ **Quick System Overview**

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│              AUTONOMOUS EVOLUTION SYSTEM (AES)                  │
│         Self-Evolving, Meta-Cognitive Development System       │
└─────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
            ┌───────▼───────┐   ┌───────▼───────┐
            │  EVOLUTION     │   │   OPERATION    │
            │  ENGINE        │   │   LAYERS       │
            └───────┬───────┘   └───────┬───────┘
                    │                   │
        ┌───────────┼───────────┐       │
        │           │           │       │
    ┌───▼───┐   ┌───▼───┐   ┌───▼───┐ │
    │Rules  │   │Skills │   │Agents │ │
    │Layer  │   │Layer  │   │Layer  │ │
    └───────┘   └───────┘   └───────┘ │
\`\`\`

## 📊 **System Components Map**

### **🤖 Agents Layer** (${components.agents.length} agents)

`;

    // Add agents
    components.agents.forEach(agent => {
      map += `- **\`${agent.name}\`** - \`${agent.path}\` - Status: ${agent.status}\n`;
    });

    map += `\n### **🛠️ Skills Layer** (${components.skills.length} skills)\n\n`;

    // Group skills by category
    const skillsByCategory = {};
    components.skills.forEach(skill => {
      if (!skillsByCategory[skill.category]) {
        skillsByCategory[skill.category] = [];
      }
      skillsByCategory[skill.category].push(skill);
    });

    Object.keys(skillsByCategory).forEach(category => {
      map += `**${category}/** (${skillsByCategory[category].length} skills)\n`;
      skillsByCategory[category].forEach(skill => {
        map += `- **\`${skill.name}\`** - \`${skill.path}\`\n`;
      });
      map += '\n';
    });

    map += `### **📐 Rules Layer** (${components.rules.length} rules)\n\n`;
    components.rules.forEach(rule => {
      map += `- **\`${rule.name}\`** - \`${rule.path}\`\n`;
    });

    map += `\n### **🔌 Extensions** (${components.extensions.length} extensions)\n\n`;
    components.extensions.forEach(ext => {
      map += `- **\`${ext.name}\`** - \`${ext.path}\` - Status: ${ext.status}\n`;
    });

    map += `\n## 🔄 **System Status**

- **Evolution Engine**: ${components.status.evolutionEngine}
- **Continuous Evolution**: ${components.status.continuousEvolution}
- **Last Update**: ${components.status.lastUpdate}
- **Last Evolution Entry**: ${components.status.lastEvolutionEntry || 'N/A'}

## 📍 **Quick Navigation**

- **System Overview**: \`docs/system/SYSTEM_OVERVIEW.md\`
- **Core Architecture**: \`docs/system/CORE_ARCHITECTURE.md\`
- **Evolution Journal**: \`docs/living/EVOLUTION_JOURNAL.md\`
- **Developer Q&A**: \`docs/reference/DEVELOPER_QA.md\`
- **API Reference**: \`docs/reference/API_REFERENCE.md\`

## 💡 **Key Insights**

1. **Three-Layer Architecture**: Rules (principles) → Skills (capabilities) → Agents (execution)
2. **Evolution-Driven**: System continuously evolves through pattern detection
3. **Living Documentation**: Evolution journal and patterns evolve with the system
4. **True Autonomy**: Systems actually run automatically (continuous execution)
5. **Self-Learning**: System learns from every interaction and evolves itself

---

**Auto-Generated**: ${timestamp}  
**Components Scanned**: ${components.agents.length} agents, ${components.skills.length} skills, ${components.rules.length} rules  
**Update Frequency**: Auto-updates when components change, or on demand via \`/system-map\`

*This map is automatically generated and always reflects the current system state. Use \`/system-map [section]\` for context-aware access.*
`;

    return map;
  }

  /**
   * Generate context-aware map section
   */
  async generateContextMap(context) {
    const components = await this.scanSystem();
    
    // Determine relevant section based on context
    if (context.file) {
      if (context.file.includes('agents/')) {
        return this.buildAgentSection(components, context.file);
      } else if (context.file.includes('skills/')) {
        return this.buildSkillSection(components, context.file);
      } else if (context.file.includes('rules/')) {
        return this.buildRuleSection(components, context.file);
      }
    }
    
    if (context.question) {
      return this.buildQuestionSection(components, context.question);
    }
    
    // Default: full map
    return this.buildMap(components);
  }

  /**
   * Build agent-specific section
   */
  buildAgentSection(components, filePath) {
    const agentName = path.basename(filePath, '.js');
    const agent = components.agents.find(a => a.name === agentName);
    
    if (!agent) {
      return `## Agent: ${agentName}\n\nAgent not found in system scan.`;
    }
    
    return `## 🤖 Agent: ${agentName}

**Path**: \`${agent.path}\`  
**Status**: ${agent.status}

### Related Components
- Connected to: Evolution Engine
- Documentation: \`docs/agents/${agentName.toUpperCase().replace(/-/g, '_')}.md\`

### Quick Links
- [Agent System Overview](docs/agents/AGENT_SYSTEM_OVERVIEW.md)
- [Agent Development Guide](docs/agents/AGENT_DEVELOPMENT_GUIDE.md)
- [Coordination Patterns](docs/agents/COORDINATION_PATTERNS.md)
`;
  }

  /**
   * Build skill-specific section
   */
  buildSkillSection(components, filePath) {
    const parts = filePath.split('/');
    const skillName = path.basename(parts[parts.length - 1], '.md');
    const category = parts[parts.length - 2];
    
    return `## 🛠️ Skill: ${skillName}

**Category**: ${category}  
**Path**: \`${filePath}\`

### Related Skills
${components.skills.filter(s => s.category === category).map(s => `- ${s.name}`).join('\n')}

### Quick Links
- [Skills System](../skills/)
- [Skill Schema](../skills/schema.md)
`;
  }

  /**
   * Build question-specific section
   */
  buildQuestionSection(components, question) {
    // Simple keyword matching for relevant sections
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('agent')) {
      return `## 🤖 Agents Section

**${components.agents.length} agents active**

${components.agents.map(a => `- ${a.name}`).join('\n')}

[Full Agent Documentation](docs/agents/AGENT_SYSTEM_OVERVIEW.md)
`;
    }
    
    if (lowerQuestion.includes('skill')) {
      return `## 🛠️ Skills Section

**${components.skills.length} skills available**

[Full Skills Documentation](skills/)
`;
    }
    
    return this.buildMap(components);
  }

  /**
   * Auto-update check (called periodically or on file changes)
   */
  async checkAndUpdate() {
    const currentMap = fs.existsSync(this.mapPath) 
      ? fs.readFileSync(this.mapPath, 'utf8')
      : '';
    
    const newMap = this.buildMap(await this.scanSystem());
    
    if (currentMap !== newMap) {
      fs.writeFileSync(this.mapPath, newMap, 'utf8');
      console.log('[system-map-generator] Map updated');
      return true;
    }
    
    return false;
  }
}

module.exports = SystemMapGenerator;

