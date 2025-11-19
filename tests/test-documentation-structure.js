/**
 * Test Documentation Structure
 * 
 * Tests the new organized documentation structure
 */

const fs = require('fs');
const path = require('path');

class DocumentationStructureTest {
  constructor() {
    this.testResults = [];
    this.docsPath = path.join(__dirname, 'docs');
  }

  /**
   * Run all documentation structure tests
   */
  async runAllTests() {
    console.log('🧪 Starting Documentation Structure Tests\n');
    
    try {
      // Test 1: Folder Structure
      await this.testFolderStructure();
      
      // Test 2: Core System Documentation
      await this.testCoreSystemDocs();
      
      // Test 3: Agent Documentation
      await this.testAgentDocs();
      
      // Test 4: Reference Documentation
      await this.testReferenceDocs();
      
      // Test 5: Living Documentation
      await this.testLivingDocs();
      
      // Test 6: Navigation Links
      await this.testNavigationLinks();
      
      // Display results
      this.displayTestResults();
      
    } catch (error) {
      console.error('❌ Test suite failed:', error);
    }
  }

  /**
   * Test folder structure
   */
  async testFolderStructure() {
    console.log('🔍 Testing Folder Structure...');
    
    try {
      const requiredFolders = [
        'system',
        'agents',
        'reference',
        'living',
        'implemented'
      ];
      
      for (const folder of requiredFolders) {
        const folderPath = path.join(this.docsPath, folder);
        this.assert(fs.existsSync(folderPath), `Folder should exist: ${folder}`);
      }
      
      this.recordTestResult('Folder Structure', true, 'All required folders present');
      
    } catch (error) {
      this.recordTestResult('Folder Structure', false, error.message);
    }
  }

  /**
   * Test core system documentation
   */
  async testCoreSystemDocs() {
    console.log('🔍 Testing Core System Documentation...');
    
    try {
      const systemPath = path.join(this.docsPath, 'system');
      const requiredFiles = [
        'SYSTEM_OVERVIEW.md',
        'CORE_ARCHITECTURE.md',
        'EVOLUTION_SYSTEM.md'
      ];
      
      for (const file of requiredFiles) {
        const filePath = path.join(systemPath, file);
        this.assert(fs.existsSync(filePath), `System file should exist: ${file}`);
        
        const content = fs.readFileSync(filePath, 'utf8');
        this.assert(content.length > 0, `System file should have content: ${file}`);
      }
      
      this.recordTestResult('Core System Documentation', true, 'All core system files present and have content');
      
    } catch (error) {
      this.recordTestResult('Core System Documentation', false, error.message);
    }
  }

  /**
   * Test agent documentation
   */
  async testAgentDocs() {
    console.log('🔍 Testing Agent Documentation...');
    
    try {
      const agentsPath = path.join(this.docsPath, 'agents');
      const requiredFiles = [
        'IDEA_CAPTURE_SYSTEM.md',
        'SYSTEM_INTEGRITY_AGENT.md',
        'AUTONOMOUS_VERSIONING_SYSTEM.md'
      ];
      
      for (const file of requiredFiles) {
        const filePath = path.join(agentsPath, file);
        this.assert(fs.existsSync(filePath), `Agent file should exist: ${file}`);
        
        const content = fs.readFileSync(filePath, 'utf8');
        this.assert(content.length > 0, `Agent file should have content: ${file}`);
      }
      
      this.recordTestResult('Agent Documentation', true, 'All agent files present and have content');
      
    } catch (error) {
      this.recordTestResult('Agent Documentation', false, error.message);
    }
  }

  /**
   * Test reference documentation
   */
  async testReferenceDocs() {
    console.log('🔍 Testing Reference Documentation...');
    
    try {
      const referencePath = path.join(this.docsPath, 'reference');
      const requiredFiles = [
        'API_REFERENCE.md',
        'CONFIGURATION_GUIDE.md',
        'TROUBLESHOOTING.md',
        'PRINCIPLES_LIBRARY.md'
      ];
      
      for (const file of requiredFiles) {
        const filePath = path.join(referencePath, file);
        this.assert(fs.existsSync(filePath), `Reference file should exist: ${file}`);
        
        const content = fs.readFileSync(filePath, 'utf8');
        this.assert(content.length > 0, `Reference file should have content: ${file}`);
      }
      
      this.recordTestResult('Reference Documentation', true, 'All reference files present and have content');
      
    } catch (error) {
      this.recordTestResult('Reference Documentation', false, error.message);
    }
  }

  /**
   * Test living documentation
   */
  async testLivingDocs() {
    console.log('🔍 Testing Living Documentation...');
    
    try {
      const livingPath = path.join(this.docsPath, 'living');
      const requiredFiles = [
        'EVOLUTION_JOURNAL.md'
      ];
      
      for (const file of requiredFiles) {
        const filePath = path.join(livingPath, file);
        this.assert(fs.existsSync(filePath), `Living file should exist: ${file}`);
        
        const content = fs.readFileSync(filePath, 'utf8');
        this.assert(content.length > 0, `Living file should have content: ${file}`);
      }
      
      this.recordTestResult('Living Documentation', true, 'All living files present and have content');
      
    } catch (error) {
      this.recordTestResult('Living Documentation', false, error.message);
    }
  }

  /**
   * Test navigation links
   */
  async testNavigationLinks() {
    console.log('🔍 Testing Navigation Links...');
    
    try {
      const readmePath = path.join(this.docsPath, 'README.md');
      const readmeContent = fs.readFileSync(readmePath, 'utf8');
      
      // Check for navigation links
      const navigationLinks = [
        'SYSTEM_OVERVIEW.md',
        'CORE_ARCHITECTURE.md',
        'EVOLUTION_SYSTEM.md',
        'API_REFERENCE.md',
        'CONFIGURATION_GUIDE.md',
        'TROUBLESHOOTING.md',
        'PRINCIPLES_LIBRARY.md',
        'EVOLUTION_JOURNAL.md'
      ];
      
      for (const link of navigationLinks) {
        this.assert(readmeContent.includes(link), `README should contain navigation link: ${link}`);
      }
      
      this.recordTestResult('Navigation Links', true, 'All navigation links present in README');
      
    } catch (error) {
      this.recordTestResult('Navigation Links', false, error.message);
    }
  }

  /**
   * Assert condition and record result
   */
  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  /**
   * Record test result
   */
  recordTestResult(testName, passed, message) {
    this.testResults.push({
      test: testName,
      passed,
      message,
      timestamp: new Date().toISOString()
    });
    
    const status = passed ? '✅' : '❌';
    console.log(`${status} ${testName}: ${message}`);
  }

  /**
   * Display test results
   */
  displayTestResults() {
    console.log('\n📊 Test Results Summary:');
    console.log('========================');
    
    const passed = this.testResults.filter(r => r.passed).length;
    const total = this.testResults.length;
    
    console.log(`Total Tests: ${total}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${total - passed}`);
    console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%`);
    
    if (total - passed > 0) {
      console.log('\n❌ Failed Tests:');
      this.testResults
        .filter(r => !r.passed)
        .forEach(r => console.log(`  - ${r.test}: ${r.message}`));
    }
    
    console.log('\n🎯 Documentation Structure Test Complete!');
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const test = new DocumentationStructureTest();
  test.runAllTests().catch(console.error);
}

module.exports = DocumentationStructureTest;
