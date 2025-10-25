/**
 * Workflow Skill Enhancer
 * Transforms basic skills into complete, specialized workflows
 * Based on Claude Skills insights for workflow-focused capabilities
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class WorkflowSkillEnhancer {
  constructor() {
    this.workflowTemplates = new Map();
    this.specializedWorkflows = new Map();
    this.loadWorkflowTemplates();
  }

  /**
   * Load workflow templates for common development patterns
   */
  loadWorkflowTemplates() {
    const templates = {
      'seo-optimizer': {
        name: 'SEO Content Optimizer',
        description: 'Complete SEO optimization workflow',
        steps: [
          'analyze-content',
          'research-keywords', 
          'optimize-headings',
          'optimize-meta',
          'add-alt-text',
          'build-internal-links',
          'preserve-voice'
        ],
        triggers: ['content-optimization', 'seo-need'],
        confidence: 0.9
      },
      'security-audit': {
        name: 'Security Audit Workflow',
        description: 'Comprehensive security analysis and fixes',
        steps: [
          'scan-vulnerabilities',
          'analyze-dependencies',
          'check-authentication',
          'validate-inputs',
          'test-authorization',
          'generate-report'
        ],
        triggers: ['security-concern', 'vulnerability-detected'],
        confidence: 0.95
      },
      'performance-optimizer': {
        name: 'Performance Optimization Workflow',
        description: 'Complete performance analysis and optimization',
        steps: [
          'profile-performance',
          'identify-bottlenecks',
          'optimize-queries',
          'implement-caching',
          'optimize-assets',
          'measure-improvements'
        ],
        triggers: ['performance-issue', 'slow-application'],
        confidence: 0.85
      },
      'test-generator': {
        name: 'Test Suite Generator',
        description: 'Complete test suite generation and validation',
        steps: [
          'analyze-code',
          'identify-test-cases',
          'generate-unit-tests',
          'create-integration-tests',
          'add-edge-cases',
          'validate-coverage'
        ],
        triggers: ['testing-needed', 'new-code'],
        confidence: 0.8
      }
    };

    for (const [key, template] of Object.entries(templates)) {
      this.workflowTemplates.set(key, template);
    }
  }

  /**
   * Create specialized workflow skill from template
   */
  createWorkflowSkill(templateKey, customizations = {}) {
    const template = this.workflowTemplates.get(templateKey);
    if (!template) {
      throw new Error(`Workflow template ${templateKey} not found`);
    }

    const workflowSkill = {
      ...template,
      ...customizations,
      type: 'workflow',
      created: new Date().toISOString(),
      version: '1.0.0',
      autonomous: true
    };

    // Generate the complete workflow skill content
    const skillContent = this.generateWorkflowSkillContent(workflowSkill);
    
    return {
      skill: workflowSkill,
      content: skillContent
    };
  }

  /**
   * Generate complete workflow skill content
   */
  generateWorkflowSkillContent(workflow) {
    const timestamp = new Date().toISOString();
    
    return `---
name: "${workflow.name}"
description: "${workflow.description}"
version: "${workflow.version}"
trigger: "When ${workflow.triggers.join(' or ')} patterns are detected"
invariant: "All workflow steps maintain ECP principles and system safety"
dependencies: ["autonomous-skill-system", "ecp-integration"]
category: "workflow"
type: "specialized"
author: "Autonomous System"
created: "${timestamp}"
confidence: ${workflow.confidence}
autonomous: true
---

# ${workflow.name}

## Purpose

${workflow.description} - A complete, specialized workflow that executes multiple related tasks automatically.

## Workflow Steps

${workflow.steps.map((step, index) => `### ${index + 1}. ${this.formatStepName(step)}

**Purpose**: ${this.getStepDescription(step)}
**Execution**: ${this.getStepExecution(step)}
**Success Criteria**: ${this.getStepSuccessCriteria(step)}
**Observability**: Log with \`[${workflow.name}]\` prefix`).join('\n\n')}

## Complete Workflow Execution

### 1. Workflow Initialization
- Detect trigger conditions
- Validate system state
- Initialize workflow context
- Set up observability

### 2. Sequential Step Execution
${workflow.steps.map((step, index) => `- **Step ${index + 1}**: ${this.formatStepName(step)}`).join('\n')}

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

Log all execution with \`[${workflow.name}]\` prefix:
- \`[${workflow.name}] Workflow: [workflow initiated]\`
- \`[${workflow.name}] Step: [step execution]\`
- \`[${workflow.name}] Result: [step result]\`
- \`[${workflow.name}] Complete: [workflow completed]\`

## Rollback

If any step fails:
1. Revert to previous state
2. Log failure for analysis
3. Continue with manual operation
4. Plan workflow improvement

## Examples

**Trigger**: ${workflow.triggers[0]}
**Execution**: Complete ${workflow.name.toLowerCase()} workflow
**Result**: ${workflow.description.toLowerCase()} completed automatically

## Autonomous Execution

This workflow can be executed autonomously when:
- Trigger conditions are detected
- Confidence threshold is met (${workflow.confidence})
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
      'measure-improvements': 'Measure and validate performance improvements',
      'analyze-code': 'Analyze code structure and complexity',
      'identify-test-cases': 'Identify critical test cases and scenarios',
      'generate-unit-tests': 'Generate comprehensive unit tests',
      'create-integration-tests': 'Create integration test suites',
      'add-edge-cases': 'Add edge case and error condition tests',
      'validate-coverage': 'Validate test coverage and completeness'
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
   * Detect workflow opportunities in current context
   */
  detectWorkflowOpportunities(context) {
    const opportunities = [];
    
    for (const [key, template] of this.workflowTemplates) {
      for (const trigger of template.triggers) {
        if (this.contextMatchesTrigger(context, trigger)) {
          opportunities.push({
            template: key,
            confidence: template.confidence,
            trigger: trigger,
            description: template.description
          });
        }
      }
    }
    
    return opportunities.sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Check if context matches trigger
   */
  contextMatchesTrigger(context, trigger) {
    const contextText = JSON.stringify(context).toLowerCase();
    return contextText.includes(trigger.toLowerCase());
  }

  /**
   * Create workflow skill from opportunity
   */
  createWorkflowFromOpportunity(opportunity, customizations = {}) {
    return this.createWorkflowSkill(opportunity.template, {
      ...customizations,
      confidence: opportunity.confidence,
      detectedTrigger: opportunity.trigger
    });
  }
}

module.exports = WorkflowSkillEnhancer;
