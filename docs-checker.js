/**
 * Documentation Freshness Checker
 * 
 * Automatically checks if documentation is up to date with current system state
 */

const fs = require('fs');
const path = require('path');

class DocumentationChecker {
  constructor() {
    this.docsPath = path.join(__dirname, 'docs');
    this.issues = [];
    this.recommendations = [];
  }

  /**
   * Run all documentation checks
   */
  async runAllChecks() {
    console.log('🔍 Starting Documentation Freshness Checks\n');
    
    try {
      // Check 1: README.md freshness
      await this.checkReadmeFreshness();
      
      // Check 2: File references
      await this.checkFileReferences();
      
      // Check 3: Version consistency
      await this.checkVersionConsistency();
      
      // Check 4: Missing documentation
      await this.checkMissingDocumentation();
      
      // Check 5: Outdated content
      await this.checkOutdatedContent();
      
      // Display results
      this.displayResults();
      
    } catch (error) {
      console.error('❌ Documentation check failed:', error);
    }
  }

  /**
   * Check README.md freshness
   */
  async checkReadmeFreshness() {
    console.log('🔍 Checking README.md freshness...');
    
    try {
      const readmePath = path.join(this.docsPath, 'README.md');
      const readmeContent = fs.readFileSync(readmePath, 'utf8');
      
      // Check for outdated references
      const outdatedRefs = [
        'AUTONOMOUS_EVOLUTION_JOURNAL.md',
        'docs/AUTONOMOUS_EVOLUTION_JOURNAL.md',
        'docs/AUTONOMOUS_EVOLUTION_JOURNAL'
      ];
      
      for (const ref of outdatedRefs) {
        if (readmeContent.includes(ref)) {
          this.issues.push({
            type: 'outdated_reference',
            file: 'README.md',
            issue: `References old journal path: ${ref}`,
            fix: `Update to: docs/living/EVOLUTION_JOURNAL.md`
          });
        }
      }
      
      // Check for missing new features
      const missingFeatures = [
        'v1.1.0',
        'Autonomous Versioning System',
        'Principles Library',
        'docs/living/EVOLUTION_JOURNAL.md'
      ];
      
      for (const feature of missingFeatures) {
        if (!readmeContent.includes(feature)) {
          this.issues.push({
            type: 'missing_feature',
            file: 'README.md',
            issue: `Missing reference to: ${feature}`,
            fix: `Add documentation for ${feature}`
          });
        }
      }
      
      console.log('✅ README.md freshness check complete');
      
    } catch (error) {
      this.issues.push({
        type: 'error',
        file: 'README.md',
        issue: `Error reading README.md: ${error.message}`,
        fix: 'Check file permissions and content'
      });
    }
  }

  /**
   * Check file references
   */
  async checkFileReferences() {
    console.log('🔍 Checking file references...');
    
    try {
      const filesToCheck = [
        'README.md',
        'system/SYSTEM_OVERVIEW.md',
        'reference/API_REFERENCE.md',
        'reference/CONFIGURATION_GUIDE.md'
      ];
      
      for (const file of filesToCheck) {
        const filePath = path.join(this.docsPath, file);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          
          // Check for broken internal links
          const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
          let match;
          
          while ((match = linkPattern.exec(content)) !== null) {
            const [, linkText, linkPath] = match;
            
            // Skip external links
            if (linkPath.startsWith('http') || linkPath.startsWith('#')) {
              continue;
            }
            
            // Check if linked file exists
            const fullPath = path.resolve(path.dirname(filePath), linkPath);
            if (!fs.existsSync(fullPath)) {
              this.issues.push({
                type: 'broken_link',
                file: file,
                issue: `Broken link: ${linkText} -> ${linkPath}`,
                fix: `Fix or remove broken link to ${linkPath}`
              });
            }
          }
        }
      }
      
      console.log('✅ File references check complete');
      
    } catch (error) {
      this.issues.push({
        type: 'error',
        file: 'file_references',
        issue: `Error checking file references: ${error.message}`,
        fix: 'Check file system access'
      });
    }
  }

  /**
   * Check version consistency
   */
  async checkVersionConsistency() {
    console.log('🔍 Checking version consistency...');
    
    try {
      // Get version from package.json
      const packageJsonPath = path.join(__dirname, 'package.json');
      let packageVersion = 'unknown';
      
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        packageVersion = packageJson.version;
      }
      
      // Check version references in documentation
      const filesToCheck = [
        'README.md',
        'system/SYSTEM_OVERVIEW.md',
        'living/EVOLUTION_JOURNAL.md'
      ];
      
      for (const file of filesToCheck) {
        const filePath = path.join(this.docsPath, file);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          
          // Check for version references
          const versionPattern = /v?\d+\.\d+\.\d+/g;
          const versions = content.match(versionPattern);
          
          if (versions) {
            const uniqueVersions = [...new Set(versions)];
            if (uniqueVersions.length > 1) {
              this.issues.push({
                type: 'version_inconsistency',
                file: file,
                issue: `Multiple versions found: ${uniqueVersions.join(', ')}`,
                fix: `Standardize on version ${packageVersion}`
              });
            }
          }
        }
      }
      
      console.log('✅ Version consistency check complete');
      
    } catch (error) {
      this.issues.push({
        type: 'error',
        file: 'version_consistency',
        issue: `Error checking version consistency: ${error.message}`,
        fix: 'Check package.json and documentation files'
      });
    }
  }

  /**
   * Check for missing documentation
   */
  async checkMissingDocumentation() {
    console.log('🔍 Checking for missing documentation...');
    
    try {
      // Check if all agents have documentation
      const agentsPath = path.join(__dirname, 'agents');
      const docsAgentsPath = path.join(this.docsPath, 'agents');
      
      if (fs.existsSync(agentsPath)) {
        const agentFiles = fs.readdirSync(agentsPath)
          .filter(file => file.endsWith('.js') && !file.includes('test'))
          .map(file => file.replace('.js', '.md'));
        
        for (const agentFile of agentFiles) {
          const docPath = path.join(docsAgentsPath, agentFile.toUpperCase().replace('.JS', '.md'));
          if (!fs.existsSync(docPath)) {
            this.issues.push({
              type: 'missing_documentation',
              file: `agents/${agentFile}`,
              issue: `Missing documentation for agent: ${agentFile}`,
              fix: `Create documentation file: docs/agents/${agentFile.toUpperCase().replace('.JS', '.md')}`
            });
          }
        }
      }
      
      // Check if all skills have documentation
      const skillsPath = path.join(__dirname, 'skills');
      if (fs.existsSync(skillsPath)) {
        const skillFiles = fs.readdirSync(skillsPath)
          .filter(file => file.endsWith('.md'));
        
        for (const skillFile of skillFiles) {
          // Check if skill is referenced in documentation
          const skillName = skillFile.replace('.md', '');
          const readmePath = path.join(this.docsPath, 'README.md');
          const readmeContent = fs.readFileSync(readmePath, 'utf8');
          
          if (!readmeContent.includes(skillName)) {
            this.recommendations.push({
              type: 'missing_reference',
              file: `skills/${skillFile}`,
              issue: `Skill not referenced in main documentation: ${skillName}`,
              fix: `Add reference to ${skillName} in appropriate documentation`
            });
          }
        }
      }
      
      console.log('✅ Missing documentation check complete');
      
    } catch (error) {
      this.issues.push({
        type: 'error',
        file: 'missing_documentation',
        issue: `Error checking missing documentation: ${error.message}`,
        fix: 'Check file system access'
      });
    }
  }

  /**
   * Check for outdated content
   */
  async checkOutdatedContent() {
    console.log('🔍 Checking for outdated content...');
    
    try {
      const filesToCheck = [
        'README.md',
        'system/SYSTEM_OVERVIEW.md',
        'reference/API_REFERENCE.md'
      ];
      
      for (const file of filesToCheck) {
        const filePath = path.join(this.docsPath, file);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          
          // Check for outdated patterns
          const outdatedPatterns = [
            { pattern: /TODO|FIXME|XXX/i, message: 'Contains TODO/FIXME comments' },
            { pattern: /placeholder|example/i, message: 'Contains placeholder text' },
            { pattern: /\[.*\]\(#\)/g, message: 'Contains empty links' }
          ];
          
          for (const { pattern, message } of outdatedPatterns) {
            if (pattern.test(content)) {
              this.recommendations.push({
                type: 'outdated_content',
                file: file,
                issue: message,
                fix: 'Review and update content'
              });
            }
          }
        }
      }
      
      console.log('✅ Outdated content check complete');
      
    } catch (error) {
      this.issues.push({
        type: 'error',
        file: 'outdated_content',
        issue: `Error checking outdated content: ${error.message}`,
        fix: 'Check file system access'
      });
    }
  }

  /**
   * Display results
   */
  displayResults() {
    console.log('\n📊 Documentation Check Results:');
    console.log('===============================');
    
    const criticalIssues = this.issues.filter(i => i.type === 'error' || i.type === 'broken_link');
    const warnings = this.issues.filter(i => i.type !== 'error' && i.type !== 'broken_link');
    
    if (criticalIssues.length > 0) {
      console.log('\n🚨 Critical Issues:');
      criticalIssues.forEach(issue => {
        console.log(`  ❌ ${issue.file}: ${issue.issue}`);
        console.log(`     Fix: ${issue.fix}`);
      });
    }
    
    if (warnings.length > 0) {
      console.log('\n⚠️  Warnings:');
      warnings.forEach(issue => {
        console.log(`  ⚠️  ${issue.file}: ${issue.issue}`);
        console.log(`     Fix: ${issue.fix}`);
      });
    }
    
    if (this.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      this.recommendations.forEach(rec => {
        console.log(`  💡 ${rec.file}: ${rec.issue}`);
        console.log(`     Suggestion: ${rec.fix}`);
      });
    }
    
    if (criticalIssues.length === 0 && warnings.length === 0 && this.recommendations.length === 0) {
      console.log('\n✅ All documentation checks passed!');
    }
    
    console.log(`\n📈 Summary:`);
    console.log(`  Critical Issues: ${criticalIssues.length}`);
    console.log(`  Warnings: ${warnings.length}`);
    console.log(`  Recommendations: ${this.recommendations.length}`);
    console.log(`  Total Issues: ${this.issues.length + this.recommendations.length}`);
  }
}

// Run checks if this file is executed directly
if (require.main === module) {
  const checker = new DocumentationChecker();
  checker.runAllChecks().catch(console.error);
}

module.exports = DocumentationChecker;
