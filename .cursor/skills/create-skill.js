/**
 * Skill Creator CLI Tool
 * Interactive tool for creating new skills
 */

const SkillCreator = require('./meta/skill-creator.js');
const readline = require('readline');

class SkillCreatorCLI {
  constructor() {
    this.skillCreator = new SkillCreator();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  /**
   * Start interactive skill creation
   * Invariant: All created skills maintain ECP principles
   */
  async start() {
    console.log('\n' + '='.repeat(60));
    console.log('SKILL CREATOR - Interactive Skill Creation Tool');
    console.log('='.repeat(60));
    console.log('Create new skills with full ECP compliance and Skills Protocol schema');
    console.log('='.repeat(60));
    
    try {
      const requirements = await this.gatherRequirements();
      const result = this.skillCreator.createSkill(requirements);
      
      if (result.success) {
        console.log('\n' + '='.repeat(60));
        console.log('✓ SKILL CREATED SUCCESSFULLY');
        console.log('='.repeat(60));
        console.log(`Name: ${result.skill.name}`);
        console.log(`Description: ${result.skill.description}`);
        console.log(`Category: ${result.skill.category}`);
        console.log(`Version: ${result.skill.version}`);
        console.log(`File: ${result.skill.filePath}`);
        console.log('='.repeat(60));
      } else {
        console.log('\n' + '='.repeat(60));
        console.log('✗ SKILL CREATION FAILED');
        console.log('='.repeat(60));
        console.log('Errors:');
        result.errors.forEach(error => console.log(`  - ${error}`));
        console.log('='.repeat(60));
      }
      
    } catch (error) {
      console.error('\n[skill-creator] Error:', error.message);
    } finally {
      this.rl.close();
    }
  }

  /**
   * Gather skill requirements interactively
   * Invariant: All required information is collected
   */
  async gatherRequirements() {
    const requirements = {};
    
    // Skill name
    requirements.name = await this.askQuestion('Enter skill name (kebab-case): ');
    
    // Description
    requirements.description = await this.askQuestion('Enter skill description: ');
    
    // Category
    console.log('\nAvailable categories:');
    console.log('  - core: Essential development skills');
    console.log('  - builder: Construction and debugging skills');
    console.log('  - reflection: Learning and optimization skills');
    console.log('  - meta: Skill management and evolution');
    console.log('  - custom: Custom category');
    
    const category = await this.askQuestion('Enter category (default: custom): ');
    requirements.category = category || 'custom';
    
    // Trigger
    requirements.trigger = await this.askQuestion('Enter trigger condition (when to activate): ');
    
    // Invariant
    requirements.invariant = await this.askQuestion('Enter invariant (what this skill guarantees): ');
    
    // Dependencies
    const dependencies = await this.askQuestion('Enter dependencies (comma-separated, default: ecp-protocol): ');
    requirements.dependencies = dependencies ? dependencies.split(',').map(dep => dep.trim()) : ['ecp-protocol'];
    
    // Workflow steps
    console.log('\nEnter workflow steps (press Enter twice to finish):');
    requirements.workflow = [];
    let stepIndex = 1;
    
    while (true) {
      const stepName = await this.askQuestion(`Step ${stepIndex} name: `);
      if (!stepName) break;
      
      const stepDescription = await this.askQuestion(`Step ${stepIndex} description: `);
      
      requirements.workflow.push({
        name: stepName,
        description: stepDescription
      });
      
      stepIndex++;
    }
    
    // Examples
    console.log('\nEnter examples (press Enter twice to finish):');
    requirements.examples = [];
    let exampleIndex = 1;
    
    while (true) {
      const exampleTitle = await this.askQuestion(`Example ${exampleIndex} title: `);
      if (!exampleTitle) break;
      
      const exampleDescription = await this.askQuestion(`Example ${exampleIndex} description: `);
      
      requirements.examples.push({
        title: exampleTitle,
        description: exampleDescription
      });
      
      exampleIndex++;
    }
    
    // Success criteria
    requirements.successCriteria = await this.askQuestion('Enter success criteria: ');
    
    // Observability
    requirements.observability = await this.askQuestion('Enter observability prefix (default: skill name): ');
    
    // Rollback
    requirements.rollback = await this.askQuestion('Enter rollback strategy: ');
    
    return requirements;
  }

  /**
   * Ask a question and return the answer
   * Invariant: Questions are clear and responses are captured
   */
  askQuestion(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  /**
   * Create skill from template
   * Invariant: Template-based creation maintains ECP principles
   */
  async createFromTemplate(templateName) {
    console.log(`\n[skill-creator] Creating skill from template: ${templateName}`);
    
    const templates = {
      'api-skill': {
        name: 'api-handler',
        description: 'Handle API operations with proper error handling and validation',
        category: 'builder',
        trigger: 'When API operations are needed',
        invariant: 'All API operations maintain proper error handling and validation',
        dependencies: ['ecp-protocol', 'validation'],
        workflow: [
          { name: 'Validate', description: 'Validate input parameters' },
          { name: 'Execute', description: 'Execute API operation' },
          { name: 'Handle', description: 'Handle errors and responses' },
          { name: 'Log', description: 'Log operation results' }
        ],
        examples: [{
          title: 'API Call',
          description: '**Request**: API call with parameters\n**Execution**: Validate, execute, handle errors\n**Result**: Proper API response or error handling'
        }],
        successCriteria: 'API operation completed with proper error handling',
        observability: '[api-handler]',
        rollback: 'Revert API state if operation fails'
      },
      
      'debug-skill': {
        name: 'debug-analyzer',
        description: 'Analyze and debug issues with systematic approach',
        category: 'builder',
        trigger: 'When debugging is needed',
        invariant: 'All debugging follows systematic approach with proper logging',
        dependencies: ['ecp-protocol', 'learning-log-writer'],
        workflow: [
          { name: 'Analyze', description: 'Analyze the problem and context' },
          { name: 'Investigate', description: 'Investigate potential causes' },
          { name: 'Test', description: 'Test hypotheses and solutions' },
          { name: 'Resolve', description: 'Resolve the issue' },
          { name: 'Learn', description: 'Capture lessons learned' }
        ],
        examples: [{
          title: 'Error Debugging',
          description: '**Problem**: Application error\n**Analysis**: Investigate error context\n**Resolution**: Fix root cause\n**Learning**: Capture debugging insights'
        }],
        successCriteria: 'Issue resolved with systematic approach',
        observability: '[debug-analyzer]',
        rollback: 'Revert to previous working state if needed'
      },
      
      'optimization-skill': {
        name: 'performance-optimizer',
        description: 'Optimize performance with systematic analysis and improvement',
        category: 'builder',
        trigger: 'When performance optimization is needed',
        invariant: 'All optimizations maintain system stability and quality',
        dependencies: ['ecp-protocol', 'learning-log-writer'],
        workflow: [
          { name: 'Measure', description: 'Measure current performance' },
          { name: 'Analyze', description: 'Analyze bottlenecks and issues' },
          { name: 'Optimize', description: 'Implement optimizations' },
          { name: 'Validate', description: 'Validate performance improvements' },
          { name: 'Monitor', description: 'Monitor ongoing performance' }
        ],
        examples: [{
          title: 'Query Optimization',
          description: '**Issue**: Slow database query\n**Analysis**: Identify bottleneck\n**Optimization**: Improve query performance\n**Result**: Faster query execution'
        }],
        successCriteria: 'Performance improved with measurable results',
        observability: '[performance-optimizer]',
        rollback: 'Revert optimizations if issues arise'
      }
    };
    
    const template = templates[templateName];
    if (!template) {
      console.error(`[skill-creator] Template not found: ${templateName}`);
      return;
    }
    
    const result = this.skillCreator.createSkill(template);
    
    if (result.success) {
      console.log(`\n✓ Skill created from template: ${result.skill.name}`);
    } else {
      console.log(`\n✗ Template creation failed:`, result.errors);
    }
  }
}

// Main execution
const cli = new SkillCreatorCLI();

// Check for template argument
const template = process.argv[2];
if (template) {
  cli.createFromTemplate(template);
} else {
  cli.start();
}
