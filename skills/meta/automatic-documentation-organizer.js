/**
 * Automatic Documentation Organizer
 * Automatically detects and moves documentation files to appropriate docs/ folders
 * 
 * ECP Principles:
 * - Frame: Organize documentation files by type and purpose
 * - Design: Pattern matching, file analysis, destination determination
 * - Plan: Detect docs → Determine type → Calculate destination → Move file
 * - Implement: Automatic organization with descriptive naming
 * - Review: Validate organization maintains documentation structure
 * 
 * Invariants:
 * - Documentation files are always in docs/ hierarchy
 * - Files maintain descriptive names
 * - Organization preserves content and metadata
 * - System learns from organization patterns
 */

const fs = require('fs');
const path = require('path');
const DescriptiveFileNaming = require('./descriptive-file-naming');

class AutomaticDocumentationOrganizer {
  constructor() {
    this.docsPath = path.join(__dirname, '..', '..', 'docs');
    this.rootPath = path.join(__dirname, '..', '..');
    this.descriptiveNaming = new DescriptiveFileNaming();
    
    // Documentation folder structure
    this.docsFolders = {
      implemented: 'docs/implemented',      // Completed implementation summaries
      evolution: 'docs/evolution',          // Evolution reports and analyses
      reference: 'docs/reference',          // Reference documentation
      system: 'docs/system',                // System architecture docs
      agents: 'docs/agents',                // Agent documentation
      skills: 'docs/skills',                // Skill documentation
      living: 'docs/living'                 // Living documents (journals, logs)
    };
    
    // Patterns for detecting document types
    this.documentPatterns = {
      implemented: [
        /implementation/i,
        /summary/i,
        /_system\.md$/i,
        /_framework\.md$/i,
        /_analyzer\.md$/i,
        /_engine\.md$/i
      ],
      evolution: [
        /evolution/i,
        /report/i,
        /analysis/i,
        /breakthrough/i,
        /journey/i
      ],
      reference: [
        /guide/i,
        /reference/i,
        /api/i,
        /configuration/i,
        /testing/i
      ],
      living: [
        /journal/i,
        /log/i,
        /changelog/i,
        /history/i
      ]
    };
    
    this.organizationHistory = [];
  }

  /**
   * Automatically organize a documentation file
   * @param {string} filePath - Path to file (relative or absolute)
   * @returns {object} - Organization result
   */
  async organizeDocumentationFile(filePath) {
    try {
      // Resolve full path
      const fullPath = path.isAbsolute(filePath) 
        ? filePath 
        : path.join(this.rootPath, filePath);
      
      if (!fs.existsSync(fullPath)) {
        return { success: false, error: 'File not found' };
      }
      
      // Check if it's a documentation file
      const fileName = path.basename(fullPath);
      if (!this.isDocumentationFile(fileName, fullPath)) {
        return { 
          success: false, 
          skipped: true, 
          reason: 'Not a documentation file' 
        };
      }
      
      // Read content
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Generate descriptive name if needed
      const namingResult = await this.descriptiveNaming.generateDescriptiveName(content);
      const descriptiveName = namingResult.confidence > 0.5 
        ? namingResult.name 
        : fileName;
      
      // Determine destination folder
      const destinationFolder = this.determineDestinationFolder(
        descriptiveName, 
        content, 
        filePath
      );
      
      // Build destination path
      const destinationPath = path.join(
        this.rootPath, 
        destinationFolder, 
        descriptiveName
      );
      
      // Check if already in correct location
      if (fullPath === destinationPath) {
        return {
          success: true,
          alreadyOrganized: true,
          location: destinationFolder
        };
      }
      
      // Ensure destination directory exists
      const destDir = path.dirname(destinationPath);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      
      // Move file
      fs.renameSync(fullPath, destinationPath);
      
      // Record organization
      const organization = {
        timestamp: new Date().toISOString(),
        originalPath: filePath,
        originalName: fileName,
        newName: descriptiveName,
        destination: destinationFolder,
        namingConfidence: namingResult.confidence,
        reasoning: this.generateOrganizationReasoning(
          fileName, 
          descriptiveName, 
          destinationFolder
        )
      };
      
      this.organizationHistory.push(organization);
      
      console.log(`[doc-organizer] Organized: ${fileName} → ${destinationFolder}/${descriptiveName}`);
      console.log(`[doc-organizer] Naming confidence: ${(namingResult.confidence * 100).toFixed(1)}%`);
      
      return {
        success: true,
        organization
      };
      
    } catch (error) {
      console.error('[doc-organizer] Error organizing file:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Check if file is a documentation file
   * @param {string} fileName - File name
   * @param {string} filePath - Full file path
   * @returns {boolean}
   */
  isDocumentationFile(fileName, filePath) {
    // Must be markdown
    if (!fileName.endsWith('.md')) {
      return false;
    }
    
    // Exclude README files (stay at root)
    if (fileName === 'README.md') {
      return false;
    }
    
    // Check if in root directory (needs organization)
    const fileDir = path.dirname(filePath);
    const isInRoot = fileDir === this.rootPath;
    
    // Check if already in docs/
    const relPath = path.relative(this.rootPath, filePath);
    const isInDocs = relPath.startsWith('docs');
    
    // Only organize files in root or that need reorganization
    return isInRoot || (!isInDocs && fileName.includes('SUMMARY') || fileName.includes('REPORT'));
  }

  /**
   * Determine destination folder based on file content
   * @param {string} fileName - File name
   * @param {string} content - File content
   * @param {string} originalPath - Original file path
   * @returns {string} - Destination folder
   */
  determineDestinationFolder(fileName, content, originalPath) {
    const lowerFileName = fileName.toLowerCase();
    const lowerContent = content.toLowerCase();
    
    // Check each pattern type
    for (const [folderType, patterns] of Object.entries(this.documentPatterns)) {
      for (const pattern of patterns) {
        // Check file name
        if (pattern.test(fileName)) {
          return this.docsFolders[folderType];
        }
        
        // Check content (first 1000 chars)
        const contentSample = lowerContent.substring(0, 1000);
        if (typeof pattern === 'object' && pattern.test && pattern.test(contentSample)) {
          return this.docsFolders[folderType];
        }
      }
    }
    
    // Special detection for implementation summaries
    if (lowerFileName.includes('_system') || 
        lowerFileName.includes('_framework') ||
        lowerFileName.includes('_analyzer') ||
        lowerFileName.includes('_engine') ||
        lowerFileName.includes('_monitor')) {
      return this.docsFolders.implemented;
    }
    
    // Evolution reports
    if (lowerFileName.includes('evolution') || 
        lowerFileName.includes('report')) {
      return this.docsFolders.evolution;
    }
    
    // Default to reference
    return this.docsFolders.reference;
  }

  /**
   * Generate reasoning for organization decision
   * @param {string} originalName - Original file name
   * @param {string} newName - New file name
   * @param {string} destination - Destination folder
   * @returns {string}
   */
  generateOrganizationReasoning(originalName, newName, destination) {
    const reasons = [];
    
    if (originalName !== newName) {
      reasons.push(`Renamed for clarity: ${originalName} → ${newName}`);
    }
    
    reasons.push(`Destination: ${destination} (based on content analysis)`);
    
    return reasons.join('; ');
  }

  /**
   * Scan root directory for unorganized documentation
   * @returns {Array} - List of files that need organization
   */
  async scanForUnorganizedDocs() {
    const unorganized = [];
    
    try {
      const files = fs.readdirSync(this.rootPath);
      
      for (const file of files) {
        if (file.endsWith('.md') && file !== 'README.md') {
          const fullPath = path.join(this.rootPath, file);
          if (this.isDocumentationFile(file, fullPath)) {
            unorganized.push(file);
          }
        }
      }
      
    } catch (error) {
      console.error('[doc-organizer] Error scanning for unorganized docs:', error.message);
    }
    
    return unorganized;
  }

  /**
   * Auto-organize all unorganized documentation files
   * @returns {object} - Organization results
   */
  async autoOrganizeAll() {
    console.log('[doc-organizer] Scanning for unorganized documentation...');
    
    const unorganized = await this.scanForUnorganizedDocs();
    
    if (unorganized.length === 0) {
      console.log('[doc-organizer] No unorganized files found');
      return { success: true, organized: 0, files: [] };
    }
    
    console.log(`[doc-organizer] Found ${unorganized.length} unorganized files`);
    
    const results = [];
    for (const file of unorganized) {
      const result = await this.organizeDocumentationFile(file);
      if (result.success && !result.skipped && !result.alreadyOrganized) {
        results.push(result.organization);
      }
    }
    
    console.log(`[doc-organizer] Organized ${results.length} files`);
    
    return {
      success: true,
      organized: results.length,
      files: results
    };
  }

  /**
   * Get organization history
   * @returns {Array}
   */
  getOrganizationHistory() {
    return this.organizationHistory;
  }

  /**
   * Export organization patterns for learning
   * @returns {object}
   */
  exportPatterns() {
    return {
      folders: this.docsFolders,
      patterns: this.documentPatterns,
      historyCount: this.organizationHistory.length,
      mostCommonDestination: this.getMostCommonDestination()
    };
  }

  /**
   * Get most common destination folder
   * @returns {string}
   */
  getMostCommonDestination() {
    if (this.organizationHistory.length === 0) {
      return 'none';
    }
    
    const counts = {};
    for (const org of this.organizationHistory) {
      counts[org.destination] = (counts[org.destination] || 0) + 1;
    }
    
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])[0][0];
  }
}

module.exports = AutomaticDocumentationOrganizer;

