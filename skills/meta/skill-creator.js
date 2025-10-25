/**
 * Skill Creator Implementation
 * Creates new skills from patterns, requirements, or user input
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const SkillValidator = require('./skill-validator.js');

class SkillCreator {
  constructor() {
    this.skillsPath = path.join(__dirname, '..');
    this.schemaPath = path.join(__dirname, '..', 'schema.md');
    this.changelogUpdater = require('../autonomous/changelog-updater.js');
    this.validator = new SkillValidator();
  }

  /**
   * Create a new skill from requirements
   * Invariant: All created skills maintain ECP principles and follow schema
   */
  createSkill(requirements) {
    console.log(`[skill-creator] Creating skill from requirements: ${requirements.name}`);
    
    try {
      // Analyze requirements
      const analysis = this.analyzeRequirements(requirements);
      
      // Generate skill schema
      const schema = this.generateSkillSchema(analysis);
      
      // Create skill body
      const body = this.createSkillBody(analysis);
      
      // Create skill object for validation
      const skill = { ...schema, body };
      
      // Validate skill with quality gates
      const validation = this.validator.validateSkill(skill);
      
      if (validation.valid) {
        // Deploy skill
        const deployedSkill = this.deploySkill(schema, body, analysis);
        
        // Log creation
        this.changelogUpdater.logSkillCreation(deployedSkill.name, 'skill-creator', analysis);
        
        console.log(`[skill-creator] ✓ Skill created successfully: ${deployedSkill.name}`);
        console.log(`[skill-creator] Quality Score: ${validation.score}/100`);
        return { success: true, skill: deployedSkill, validation };
      } else {
        console.error(`[skill-creator] ✗ Skill validation failed:`, validation.errors);
        console.log(`[skill-creator] Quality Score: ${validation.score}/100`);
        console.log(`[skill-creator] Recommendations:`, validation.recommendations);
        return { success: false, errors: validation.errors, validation };
      }
      
    } catch (error) {
      console.error(`[skill-creator] Error creating skill:`, error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Analyze skill requirements
   * Invariant: Analysis includes all necessary information for skill creation
   */
  analyzeRequirements(requirements) {
    console.log(`[skill-creator] Analyzing requirements for: ${requirements.name}`);
    
    const analysis = {
      name: requirements.name || this.generateSkillName(requirements.description),
      description: requirements.description,
      type: requirements.type || 'general',
      category: requirements.category || 'custom',
      trigger: requirements.trigger || 'When user requests this functionality',
      invariant: requirements.invariant || 'All operations maintain ECP principles',
      dependencies: requirements.dependencies || ['ecp-protocol'],
      workflow: requirements.workflow || this.generateDefaultWorkflow(requirements),
      examples: requirements.examples || [],
      successCriteria: requirements.successCriteria || 'Task completed successfully',
      observability: requirements.observability || `[${requirements.name}]`,
      rollback: requirements.rollback || 'Revert to previous state if needed'
    };
    
    console.log(`[skill-creator] Analysis complete: ${analysis.name}`);
    return analysis;
  }

  /**
   * Generate skill schema (YAML frontmatter)
   * Invariant: Schema follows Skills Protocol specification
   */
  generateSkillSchema(analysis) {
    console.log(`[skill-creator] Generating schema for: ${analysis.name}`);
    
    const schema = {
      name: analysis.name,
      description: analysis.description,
      version: "1.0.0",
      trigger: analysis.trigger,
      invariant: analysis.invariant,
      dependencies: analysis.dependencies,
      category: analysis.category,
      author: "Skill Creator",
      created: new Date().toISOString()
    };
    
    console.log(`[skill-creator] Schema generated: ${schema.name}`);
    return schema;
  }

  /**
   * Create skill body (Markdown content)
   * Invariant: Body includes all required sections and ECP compliance
   */
  createSkillBody(analysis) {
    console.log(`[skill-creator] Creating body for: ${analysis.name}`);
    
    let body = `# ${analysis.name}\n\n`;
    
    // Purpose section
    body += `## Purpose\n\n`;
    body += `${analysis.description}\n\n`;
    
    // Workflow section
    body += `## Workflow\n\n`;
    for (const [index, step] of analysis.workflow.entries()) {
      body += `### ${index + 1}. ${step.name}\n`;
      body += `${step.description}\n\n`;
    }
    
    // Success Criteria section
    body += `## Success Criteria\n\n`;
    body += `${analysis.successCriteria}\n\n`;
    
    // Observability section
    body += `## Observability\n\n`;
    body += `Log all operations with \`${analysis.observability}\` prefix:\n`;
    for (const log of analysis.workflow) {
      body += `- \`${analysis.observability} ${log.name}: [${log.description}]\`\n`;
    }
    body += `\n`;
    
    // Rollback section
    body += `## Rollback\n\n`;
    body += `${analysis.rollback}\n\n`;
    
    // Examples section
    if (analysis.examples.length > 0) {
      body += `## Examples\n\n`;
      for (const example of analysis.examples) {
        body += `**${example.title}**:\n`;
        body += `${example.description}\n\n`;
      }
    }
    
    console.log(`[skill-creator] Body created: ${analysis.name}`);
    return body;
  }

  /**
   * Validate skill against schema and ECP principles
   * Invariant: Validation ensures skill quality and compliance
   */
  validateSkill(schema, body) {
    console.log(`[skill-creator] Validating skill: ${schema.name}`);
    
    const validation = {
      valid: true,
      errors: []
    };
    
    // Check required schema fields
    const requiredFields = ['name', 'description', 'version', 'trigger', 'invariant'];
    for (const field of requiredFields) {
      if (!schema[field]) {
        validation.valid = false;
        validation.errors.push(`Missing required field: ${field}`);
      }
    }
    
    // Check ECP compliance
    if (!schema.invariant || schema.invariant === '') {
      validation.valid = false;
      validation.errors.push('Missing invariant (ECP requirement)');
    }
    
    if (!body.includes('## Observability')) {
      validation.valid = false;
      validation.errors.push('Missing observability section (ECP requirement)');
    }
    
    if (!body.includes('## Rollback')) {
      validation.valid = false;
      validation.errors.push('Missing rollback section (ECP requirement)');
    }
    
    // Check for conflicts with existing skills
    if (this.skillExists(schema.name)) {
      validation.valid = false;
      validation.errors.push(`Skill ${schema.name} already exists`);
    }
    
    console.log(`[skill-creator] Validation ${validation.valid ? 'passed' : 'failed'}: ${schema.name}`);
    return validation;
  }

  /**
   * Deploy skill to appropriate location
   * Invariant: Deployment maintains system integrity
   */
  deploySkill(schema, body, analysis) {
    console.log(`[skill-creator] Deploying skill: ${schema.name}`);
    
    try {
      // Determine skill directory
      const skillDir = path.join(this.skillsPath, analysis.category);
      
      // Create directory if it doesn't exist
      if (!fs.existsSync(skillDir)) {
        fs.mkdirSync(skillDir, { recursive: true });
      }
      
      // Create skill file
      const skillPath = path.join(skillDir, `${schema.name}.md`);
      const skillContent = this.formatSkillContent(schema, body);
      
      // Write skill file
      fs.writeFileSync(skillPath, skillContent);
      
      // Load skill to verify
      const skill = this.loadSkill(skillPath);
      
      console.log(`[skill-creator] ✓ Skill deployed: ${schema.name}`);
      return skill;
      
    } catch (error) {
      console.error(`[skill-creator] Deployment error:`, error.message);
      throw error;
    }
  }

  /**
   * Format skill content with YAML frontmatter
   * Invariant: Format follows Skills Protocol specification
   */
  formatSkillContent(schema, body) {
    const yamlContent = yaml.dump(schema, { 
      lineWidth: -1,
      noRefs: true,
      sortKeys: false
    });
    
    return `---\n${yamlContent}---\n\n${body}`;
  }

  /**
   * Load skill from file
   * Invariant: Skill loading maintains system integrity
   */
  loadSkill(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const [frontmatter, body] = content.split('---\n').slice(1);
      
      const metadata = yaml.load(frontmatter);
      
      return {
        ...metadata,
        body: body.trim(),
        filePath,
        loadedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error(`[skill-creator] Error loading skill:`, error.message);
      return null;
    }
  }

  /**
   * Check if skill already exists
   * Invariant: Conflict detection prevents skill duplication
   */
  skillExists(skillName) {
    try {
      const skillDirs = fs.readdirSync(this.skillsPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      for (const dir of skillDirs) {
        const skillFiles = fs.readdirSync(path.join(this.skillsPath, dir))
          .filter(file => file.endsWith('.md'));

        for (const file of skillFiles) {
          if (file === `${skillName}.md`) {
            return true;
          }
        }
      }
      
      return false;
    } catch (error) {
      console.error(`[skill-creator] Error checking skill existence:`, error.message);
      return false;
    }
  }

  /**
   * Generate skill name from description
   * Invariant: Generated name is unique and descriptive
   */
  generateSkillName(description) {
    const words = description.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 0);
    
    return words.slice(0, 3).join('-');
  }

  /**
   * Generate default workflow from requirements
   * Invariant: Workflow follows ECP principles
   */
  generateDefaultWorkflow(requirements) {
    return [
      {
        name: 'Analyze',
        description: 'Analyze requirements and context'
      },
      {
        name: 'Execute',
        description: 'Execute the main functionality'
      },
      {
        name: 'Validate',
        description: 'Validate results and success criteria'
      },
      {
        name: 'Learn',
        description: 'Capture lessons and insights'
      }
    ];
  }

  /**
   * Create skill from pattern
   * Invariant: Pattern-based creation maintains ECP principles
   */
  createSkillFromPattern(pattern) {
    console.log(`[skill-creator] Creating skill from pattern: ${pattern.name}`);
    
    const requirements = {
      name: pattern.skillOpportunity,
      description: `Autonomously generated skill for ${pattern.description}`,
      type: pattern.type,
      category: 'autonomous',
      trigger: `When ${pattern.type} patterns are detected`,
      invariant: 'All operations maintain ECP principles and system safety',
      dependencies: ['autonomous-skill-learner'],
      workflow: this.generatePatternWorkflow(pattern),
      examples: [{
        title: 'Pattern Example',
        description: `**Pattern**: ${pattern.description}\n**Execution**: Automatically resolve ${pattern.type}\n**Result**: System improved without user input`
      }]
    };
    
    return this.createSkill(requirements);
  }

  /**
   * Generate workflow from pattern
   * Invariant: Workflow addresses pattern requirements
   */
  generatePatternWorkflow(pattern) {
    return [
      {
        name: 'Pattern Recognition',
        description: `Detect ${pattern.type} patterns`
      },
      {
        name: 'Context Analysis',
        description: 'Analyze context and requirements'
      },
      {
        name: 'Autonomous Execution',
        description: 'Execute resolution automatically'
      },
      {
        name: 'Result Integration',
        description: 'Integrate results into system'
      },
      {
        name: 'Learning Integration',
        description: 'Capture execution insights'
      }
    ];
  }
}

module.exports = SkillCreator;
