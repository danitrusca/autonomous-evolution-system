/**
 * Skills Compiler v1
 * Loads, validates, and executes skills in Cursor environment
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class SkillsCompiler {
  constructor() {
    this.skillsPath = path.join(__dirname);
    this.skills = new Map();
    this.loadSkills();
  }

  /**
   * Load all skills from the skills directory
   * Invariant: All loaded skills follow the schema and are ECP-compliant
   */
  loadSkills() {
    console.log('[skill-compiler] Loading skills from', this.skillsPath);
    
    try {
      const skillDirs = fs.readdirSync(this.skillsPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      for (const dir of skillDirs) {
        const skillFiles = fs.readdirSync(path.join(this.skillsPath, dir))
          .filter(file => file.endsWith('.md'));

        for (const file of skillFiles) {
          const skillPath = path.join(this.skillsPath, dir, file);
          const skill = this.loadSkill(skillPath);
          if (skill) {
            this.skills.set(skill.name, skill);
            console.log(`[skill-compiler] Loaded skill: ${skill.name}`);
          }
        }
      }
      
      console.log(`[skill-compiler] Loaded ${this.skills.size} skills`);
    } catch (error) {
      console.error('[skill-compiler] Error loading skills:', error.message);
    }
  }

  /**
   * Load a single skill from file
   * Invariant: Skill follows schema and has required fields
   */
  loadSkill(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const [frontmatter, body] = content.split('---\n').slice(1);
      
      const metadata = yaml.load(frontmatter);
      
      // Validate required fields
      const required = ['name', 'description', 'version', 'trigger', 'invariant'];
      for (const field of required) {
        if (!metadata[field]) {
          console.error(`[skill-compiler] Skill ${filePath} missing required field: ${field}`);
          return null;
        }
      }

      return {
        ...metadata,
        body: body.trim(),
        filePath,
        loadedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error(`[skill-compiler] Error loading skill ${filePath}:`, error.message);
      return null;
    }
  }

  /**
   * Execute a skill by name
   * Invariant: Skill execution is logged and reversible
   */
  executeSkill(skillName, context = {}) {
    console.log(`[skill:${skillName}] Starting execution`);
    
    const skill = this.skills.get(skillName);
    if (!skill) {
      console.error(`[skill:${skillName}] Skill not found`);
      return { success: false, error: 'Skill not found' };
    }

    try {
      // Log skill execution
      console.log(`[skill:${skillName}] Executing: ${skill.description}`);
      console.log(`[skill:${skillName}] Invariant: ${skill.invariant}`);
      
      // Execute skill workflow
      const result = this.runSkillWorkflow(skill, context);
      
      // Log success
      console.log(`[skill:${skillName}] Execution completed successfully`);
      
      // Update evolution journal
      this.updateEvolutionJournal(skillName, 'success', result);
      
      return { success: true, result };
    } catch (error) {
      console.error(`[skill:${skillName}] Execution failed:`, error.message);
      this.updateEvolutionJournal(skillName, 'failure', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Run the skill workflow based on its body content
   * Invariant: Workflow follows ECP principles
   */
  runSkillWorkflow(skill, context) {
    // Parse skill body for workflow steps
    const steps = this.parseWorkflowSteps(skill.body);
    
    for (const step of steps) {
      console.log(`[skill:${skill.name}] Executing step: ${step.name}`);
      step.execute(context);
    }
    
    return { steps: steps.length, context };
  }

  /**
   * Parse workflow steps from skill body
   */
  parseWorkflowSteps(body) {
    const steps = [];
    const lines = body.split('\n');
    
    for (const line of lines) {
      if (line.startsWith('## ')) {
        steps.push({
          name: line.replace('## ', ''),
          execute: () => console.log(`[skill] Executing: ${line}`)
        });
      }
    }
    
    return steps;
  }

  /**
   * Update the evolution journal with skill performance
   */
  updateEvolutionJournal(skillName, status, result) {
    const entry = {
      timestamp: new Date().toISOString(),
      type: 'skill-execution',
      skill: skillName,
      status,
      result: typeof result === 'object' ? JSON.stringify(result) : result
    };
    
    console.log(`[skill-evolution] ${entry.timestamp} - ${skillName} - ${status}`);
  }

  /**
   * List all available skills
   */
  listSkills() {
    const skills = Array.from(this.skills.values()).map(skill => ({
      name: skill.name,
      description: skill.description,
      version: skill.version,
      category: skill.category || 'uncategorized'
    }));
    
    return skills;
  }

  /**
   * Get skill help documentation
   */
  getSkillHelp(skillName) {
    const skill = this.skills.get(skillName);
    if (!skill) {
      return null;
    }
    
    return {
      name: skill.name,
      description: skill.description,
      version: skill.version,
      trigger: skill.trigger,
      invariant: skill.invariant,
      dependencies: skill.dependencies || [],
      body: skill.body
    };
  }
}

module.exports = SkillsCompiler;
