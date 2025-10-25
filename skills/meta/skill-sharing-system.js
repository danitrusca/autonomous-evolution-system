/**
 * Skill Sharing System
 * Enables skill sharing, templating, and community knowledge
 * Based on Claude Skills insights for skill portability and sharing
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class SkillSharingSystem {
  constructor() {
    this.skillTemplates = new Map();
    this.sharedSkills = new Map();
    this.communitySkills = new Map();
    this.loadSkillTemplates();
    this.loadSharedSkills();
  }

  /**
   * Load skill templates for common patterns
   */
  loadSkillTemplates() {
    const templates = {
      'seo-optimizer-template': {
        name: 'SEO Optimizer Template',
        description: 'Template for creating SEO optimization skills',
        category: 'workflow',
        template: {
          name: '{{skillName}}',
          description: '{{description}}',
          version: '1.0.0',
          trigger: 'When {{triggerConditions}} patterns are detected',
          invariant: 'All operations maintain ECP principles and system safety',
          dependencies: ['autonomous-skill-system', 'ecp-integration'],
          category: 'workflow',
          type: 'specialized',
          author: '{{author}}',
          created: '{{timestamp}}',
          confidence: '{{confidence}}',
          autonomous: true
        },
        workflow: {
          steps: [
            'analyze-content',
            'research-keywords',
            'optimize-headings',
            'optimize-meta',
            'add-alt-text',
            'build-internal-links',
            'preserve-voice'
          ],
          phases: ['analyze', 'research', 'optimize', 'quality', 'finalize']
        },
        customization: {
          skillName: 'SEO Content Optimizer',
          description: 'Complete SEO optimization workflow',
          triggerConditions: 'content optimization or SEO need',
          author: 'User',
          confidence: 0.9
        }
      },
      'security-audit-template': {
        name: 'Security Audit Template',
        description: 'Template for creating security audit skills',
        category: 'workflow',
        template: {
          name: '{{skillName}}',
          description: '{{description}}',
          version: '1.0.0',
          trigger: 'When {{triggerConditions}} patterns are detected',
          invariant: 'All operations maintain ECP principles and system safety',
          dependencies: ['autonomous-skill-system', 'ecp-integration'],
          category: 'workflow',
          type: 'specialized',
          author: '{{author}}',
          created: '{{timestamp}}',
          confidence: '{{confidence}}',
          autonomous: true
        },
        workflow: {
          steps: [
            'scan-vulnerabilities',
            'analyze-dependencies',
            'check-authentication',
            'validate-inputs',
            'test-authorization',
            'generate-report'
          ],
          phases: ['scan', 'audit', 'auth', 'validation', 'report']
        },
        customization: {
          skillName: 'Security Audit Workflow',
          description: 'Comprehensive security analysis and fixes',
          triggerConditions: 'security concern or vulnerability detected',
          author: 'User',
          confidence: 0.95
        }
      },
      'performance-optimizer-template': {
        name: 'Performance Optimizer Template',
        description: 'Template for creating performance optimization skills',
        category: 'workflow',
        template: {
          name: '{{skillName}}',
          description: '{{description}}',
          version: '1.0.0',
          trigger: 'When {{triggerConditions}} patterns are detected',
          invariant: 'All operations maintain ECP principles and system safety',
          dependencies: ['autonomous-skill-system', 'ecp-integration'],
          category: 'workflow',
          type: 'specialized',
          author: '{{author}}',
          created: '{{timestamp}}',
          confidence: '{{confidence}}',
          autonomous: true
        },
        workflow: {
          steps: [
            'profile-performance',
            'identify-bottlenecks',
            'optimize-queries',
            'implement-caching',
            'optimize-assets',
            'measure-improvements'
          ],
          phases: ['profile', 'analyze', 'optimize', 'implement', 'measure']
        },
        customization: {
          skillName: 'Performance Optimization Workflow',
          description: 'Complete performance analysis and optimization',
          triggerConditions: 'performance issue or slow application',
          author: 'User',
          confidence: 0.85
        }
      }
    };

    for (const [key, template] of Object.entries(templates)) {
      this.skillTemplates.set(key, template);
    }
  }

  /**
   * Load shared skills from community
   */
  loadSharedSkills() {
    // This would load from a shared skills repository
    const sharedSkills = [
      {
        id: 'community-seo-optimizer',
        name: 'Community SEO Optimizer',
        description: 'Community-contributed SEO optimization skill',
        author: 'Community',
        version: '1.2.0',
        downloads: 150,
        rating: 4.8,
        category: 'workflow',
        tags: ['seo', 'optimization', 'content', 'marketing'],
        source: 'community',
        lastUpdated: '2025-01-24T10:00:00Z'
      },
      {
        id: 'community-security-audit',
        name: 'Community Security Audit',
        description: 'Community-contributed security audit skill',
        author: 'SecurityExpert',
        version: '2.1.0',
        downloads: 89,
        rating: 4.9,
        category: 'workflow',
        tags: ['security', 'audit', 'vulnerability', 'safety'],
        source: 'community',
        lastUpdated: '2025-01-23T15:30:00Z'
      }
    ];

    for (const skill of sharedSkills) {
      this.sharedSkills.set(skill.id, skill);
    }
  }

  /**
   * Create skill from template
   */
  createSkillFromTemplate(templateKey, customizations = {}) {
    const template = this.skillTemplates.get(templateKey);
    if (!template) {
      throw new Error(`Template ${templateKey} not found`);
    }

    const skillData = this.applyCustomizations(template, customizations);
    const skillContent = this.generateSkillContent(skillData);
    
    return {
      skill: skillData,
      content: skillContent,
      template: templateKey,
      customizations
    };
  }

  /**
   * Apply customizations to template
   */
  applyCustomizations(template, customizations) {
    const skillData = JSON.parse(JSON.stringify(template.template));
    const workflow = template.workflow;
    
    // Apply customizations
    for (const [key, value] of Object.entries(customizations)) {
      if (skillData[key] !== undefined) {
        skillData[key] = value;
      }
    }
    
    // Add timestamp
    skillData.created = new Date().toISOString();
    
    return {
      ...skillData,
      workflow,
      template: templateKey
    };
  }

  /**
   * Generate skill content from template
   */
  generateSkillContent(skillData) {
    const timestamp = new Date().toISOString();
    
    return `---
name: "${skillData.name}"
description: "${skillData.description}"
version: "${skillData.version}"
trigger: "${skillData.trigger}"
invariant: "${skillData.invariant}"
dependencies: ${JSON.stringify(skillData.dependencies)}
category: "${skillData.category}"
type: "${skillData.type}"
author: "${skillData.author}"
created: "${skillData.created}"
confidence: ${skillData.confidence}
autonomous: ${skillData.autonomous}
---

# ${skillData.name}

## Purpose

${skillData.description} - A complete, specialized workflow created from template.

## Workflow Steps

${skillData.workflow.steps.map((step, index) => `### ${index + 1}. ${this.formatStepName(step)}

**Purpose**: ${this.getStepDescription(step)}
**Execution**: ${this.getStepExecution(step)}
**Success Criteria**: ${this.getStepSuccessCriteria(step)}
**Observability**: Log with \`[${skillData.name}]\` prefix`).join('\n\n')}

## Complete Workflow Execution

### 1. Workflow Initialization
- Detect trigger conditions
- Validate system state
- Initialize workflow context
- Set up observability

### 2. Sequential Step Execution
${skillData.workflow.steps.map((step, index) => `- **Step ${index + 1}**: ${this.formatStepName(step)}`).join('\n')}

### 3. Workflow Completion
- Validate all steps completed successfully
- Generate comprehensive report
- Capture lessons learned
- Update system learning

## Success Criteria

- All workflow steps completed successfully
- System state improved
- Comprehensive report generated
- Lessons captured for future optimization

## Observability

Log all execution with \`[${skillData.name}]\` prefix:
- \`[${skillData.name}] Workflow: [workflow initiated]\`
- \`[${skillData.name}] Step: [step execution]\`
- \`[${skillData.name}] Result: [step result]\`
- \`[${skillData.name}] Complete: [workflow completed]\`

## Rollback

If any step fails:
1. Revert to previous state
2. Log failure for analysis
3. Continue with manual operation
4. Plan workflow improvement

## Examples

**Trigger**: ${skillData.trigger}
**Execution**: Complete ${skillData.name.toLowerCase()} workflow
**Result**: ${skillData.description.toLowerCase()} completed automatically

## Template Information

- **Template**: ${skillData.template}
- **Created**: ${skillData.created}
- **Author**: ${skillData.author}
- **Version**: ${skillData.version}

## Autonomous Execution

This workflow can be executed autonomously when:
- Trigger conditions are detected
- Confidence threshold is met (${skillData.confidence})
- System health is good
- Appropriate context is present

## Learning Integration

- Captures execution patterns
- Learns from failures
- Optimizes step sequences
- Improves trigger detection
`;
  }

  /**
   * Format step name for display
   */
  formatStepName(step) {
    return step.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  /**
   * Get step description
   */
  getStepDescription(step) {
    const descriptions = {
      'analyze-content': 'Analyze content structure, quality, and SEO potential',
      'research-keywords': 'Research high-intent keywords and search volume',
      'optimize-headings': 'Optimize heading structure for SEO and readability',
      'optimize-meta': 'Optimize meta titles and descriptions',
      'add-alt-text': 'Add descriptive alt text to images',
      'build-internal-links': 'Build strategic internal linking structure',
      'preserve-voice': 'Ensure content maintains original voice and tone',
      'scan-vulnerabilities': 'Scan for security vulnerabilities and weaknesses',
      'analyze-dependencies': 'Analyze dependency security and updates',
      'check-authentication': 'Verify authentication mechanisms',
      'validate-inputs': 'Validate all input handling for security',
      'test-authorization': 'Test authorization and access controls',
      'generate-report': 'Generate comprehensive security report',
      'profile-performance': 'Profile application performance metrics',
      'identify-bottlenecks': 'Identify performance bottlenecks and issues',
      'optimize-queries': 'Optimize database queries and operations',
      'implement-caching': 'Implement appropriate caching strategies',
      'optimize-assets': 'Optimize static assets and resources',
      'measure-improvements': 'Measure and validate performance improvements'
    };
    
    return descriptions[step] || `Execute ${step} operation`;
  }

  /**
   * Get step execution details
   */
  getStepExecution(step) {
    return `Execute ${step} with full observability and error handling`;
  }

  /**
   * Get step success criteria
   */
  getStepSuccessCriteria(step) {
    return `Step completed successfully with measurable improvement`;
  }

  /**
   * Share skill with community
   */
  shareSkill(skill, sharingOptions = {}) {
    const sharedSkill = {
      id: `shared-${Date.now()}`,
      name: skill.name,
      description: skill.description,
      author: sharingOptions.author || 'Anonymous',
      version: skill.version || '1.0.0',
      category: skill.category || 'workflow',
      tags: sharingOptions.tags || [],
      source: 'user-shared',
      created: new Date().toISOString(),
      downloads: 0,
      rating: 0,
      downloads: 0,
      rating: 0,
      lastUpdated: new Date().toISOString()
    };
    
    this.sharedSkills.set(sharedSkill.id, sharedSkill);
    
    console.log(`[skill-sharing] Skill shared: ${sharedSkill.name} (${sharedSkill.id})`);
    
    return sharedSkill;
  }

  /**
   * Download skill from community
   */
  downloadSkill(skillId, customizations = {}) {
    const sharedSkill = this.sharedSkills.get(skillId);
    if (!sharedSkill) {
      throw new Error(`Shared skill ${skillId} not found`);
    }
    
    // Increment download count
    sharedSkill.downloads++;
    
    // Apply customizations if provided
    const customizedSkill = {
      ...sharedSkill,
      ...customizations,
      id: `downloaded-${Date.now()}`,
      source: 'downloaded',
      downloaded: new Date().toISOString()
    };
    
    console.log(`[skill-sharing] Skill downloaded: ${customizedSkill.name} (${customizedSkill.id})`);
    
    return customizedSkill;
  }

  /**
   * Search community skills
   */
  searchCommunitySkills(query, filters = {}) {
    const results = [];
    
    for (const [id, skill] of this.sharedSkills) {
      if (this.matchesSearchQuery(skill, query) && this.matchesFilters(skill, filters)) {
        results.push(skill);
      }
    }
    
    return results.sort((a, b) => {
      // Sort by rating, then downloads
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return b.downloads - a.downloads;
    });
  }

  /**
   * Check if skill matches search query
   */
  matchesSearchQuery(skill, query) {
    if (!query) return true;
    
    const searchText = `${skill.name} ${skill.description} ${skill.tags.join(' ')}`.toLowerCase();
    return searchText.includes(query.toLowerCase());
  }

  /**
   * Check if skill matches filters
   */
  matchesFilters(skill, filters) {
    if (filters.category && skill.category !== filters.category) {
      return false;
    }
    
    if (filters.minRating && skill.rating < filters.minRating) {
      return false;
    }
    
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => 
        skill.tags.includes(tag)
      );
      if (!hasMatchingTag) {
        return false;
      }
    }
    
    return true;
  }

  /**
   * Create skill package for sharing
   */
  createSkillPackage(skill, options = {}) {
    const package = {
      metadata: {
        name: skill.name,
        description: skill.description,
        version: skill.version,
        author: skill.author,
        created: skill.created,
        category: skill.category,
        tags: skill.tags || []
      },
      skill: skill,
      content: options.includeContent ? skill.content : undefined,
      dependencies: skill.dependencies || [],
      installation: {
        instructions: 'Copy to skills directory and run skill compiler',
        requirements: skill.dependencies || []
      }
    };
    
    return package;
  }

  /**
   * Install skill package
   */
  installSkillPackage(package, targetPath) {
    try {
      // Create skill file
      const skillPath = path.join(targetPath, `${package.metadata.name.toLowerCase().replace(/\s+/g, '-')}.md`);
      const skillContent = package.content || this.generateSkillContent(package.skill);
      
      fs.writeFileSync(skillPath, skillContent);
      
      console.log(`[skill-sharing] Skill installed: ${package.metadata.name} at ${skillPath}`);
      
      return {
        success: true,
        skillPath,
        skill: package.skill
      };
      
    } catch (error) {
      console.error(`[skill-sharing] Installation failed: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Generate sharing report
   */
  generateSharingReport() {
    const report = {
      timestamp: new Date().toISOString(),
      templates: {
        total: this.skillTemplates.size,
        categories: this.getTemplateCategories()
      },
      sharedSkills: {
        total: this.sharedSkills.size,
        categories: this.getSharedSkillCategories(),
        topSkills: this.getTopSharedSkills(5)
      },
      community: {
        totalDownloads: Array.from(this.sharedSkills.values()).reduce((sum, skill) => sum + skill.downloads, 0),
        averageRating: this.getAverageRating(),
        mostPopular: this.getMostPopularSkills(3)
      }
    };
    
    return report;
  }

  /**
   * Get template categories
   */
  getTemplateCategories() {
    const categories = new Map();
    for (const template of this.skillTemplates.values()) {
      categories.set(template.category, (categories.get(template.category) || 0) + 1);
    }
    return Object.fromEntries(categories);
  }

  /**
   * Get shared skill categories
   */
  getSharedSkillCategories() {
    const categories = new Map();
    for (const skill of this.sharedSkills.values()) {
      categories.set(skill.category, (categories.get(skill.category) || 0) + 1);
    }
    return Object.fromEntries(categories);
  }

  /**
   * Get top shared skills
   */
  getTopSharedSkills(limit) {
    return Array.from(this.sharedSkills.values())
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, limit);
  }

  /**
   * Get average rating
   */
  getAverageRating() {
    const skills = Array.from(this.sharedSkills.values());
    if (skills.length === 0) return 0;
    
    const totalRating = skills.reduce((sum, skill) => sum + skill.rating, 0);
    return totalRating / skills.length;
  }

  /**
   * Get most popular skills
   */
  getMostPopularSkills(limit) {
    return Array.from(this.sharedSkills.values())
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }
}

module.exports = SkillSharingSystem;
