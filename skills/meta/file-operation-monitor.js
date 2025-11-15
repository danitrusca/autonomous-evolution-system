/**
 * File Operation Monitor
 * Monitors file system operations and bridges them to learning capture
 * 
 * ECP Principles:
 * - Frame: Monitor file operations for learning opportunities
 * - Design: Watch filesystem, detect operations, record for learning bridge
 * - Plan: Monitor → Detect → Record → Bridge → Learn
 * - Implement: Automatic file operation monitoring and learning integration
 * - Review: Validate operations captured and lessons learned
 * 
 * Invariants:
 * - All significant file operations are monitored
 * - Operations are recorded with full context
 * - Learning bridge is automatically triggered
 * - System maintains performance during monitoring
 */

const fs = require('fs');
const path = require('path');
const FileOperationLearningBridge = require('./file-operation-learning-bridge');
const CodeGenerationLearningBridge = require('./code-generation-learning-bridge');

class FileOperationMonitor {
  constructor(rootPath) {
    this.rootPath = rootPath || process.cwd();
    this.bridge = new FileOperationLearningBridge();
    this.codeGenBridge = new CodeGenerationLearningBridge();
    this.watchedPaths = new Set();
    this.isMonitoring = false;
    
    // Operation tracking
    this.pendingOperations = new Map();
    this.operationTimeout = 1000; // 1 second to batch operations
    
    // Code generation session detection
    this.recentCreates = []; // Track recent file creations
    this.generationSessionWindow = 60000; // 1 minute window for generation sessions
    this.generationSessionTimeout = null;
  }

  /**
   * Start monitoring file operations
   */
  startMonitoring() {
    if (this.isMonitoring) {
      console.log('[file-operation-monitor] Already monitoring');
      return;
    }
    
    console.log('[file-operation-monitor] Starting file operation monitoring');
    
    // Watch root directory recursively
    this.watchDirectory(this.rootPath, true);
    
    this.isMonitoring = true;
    console.log('[file-operation-monitor] File operation monitoring active');
  }

  /**
   * Stop monitoring
   */
  stopMonitoring() {
    this.isMonitoring = false;
    this.watchedPaths.clear();
    console.log('[file-operation-monitor] File operation monitoring stopped');
  }

  /**
   * Watch directory for changes
   */
  watchDirectory(dirPath, recursive = false) {
    if (this.watchedPaths.has(dirPath)) {
      return;
    }
    
    try {
      if (!fs.existsSync(dirPath)) {
        return;
      }
      
      const watcher = fs.watch(dirPath, { recursive }, (eventType, filename) => {
        if (!filename) return;
        
        const fullPath = path.join(dirPath, filename);
        
        // Batch operations to handle rapid changes
        this.batchOperation(eventType, fullPath);
      });
      
      this.watchedPaths.add(dirPath);
      
      if (recursive) {
        // Watch subdirectories
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });
        for (const entry of entries) {
          if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
            this.watchDirectory(path.join(dirPath, entry.name), true);
          }
        }
      }
      
    } catch (error) {
      console.error(`[file-operation-monitor] Error watching ${dirPath}:`, error.message);
    }
  }

  /**
   * Batch operations to handle rapid changes
   */
  batchOperation(eventType, filePath) {
    const key = `${eventType}:${filePath}`;
    
    // Clear existing timeout
    if (this.pendingOperations.has(key)) {
      clearTimeout(this.pendingOperations.get(key));
    }
    
    // Set new timeout
    const timeout = setTimeout(() => {
      this.processOperation(eventType, filePath);
      this.pendingOperations.delete(key);
    }, this.operationTimeout);
    
    this.pendingOperations.set(key, timeout);
  }

  /**
   * Process file operation
   */
  processOperation(eventType, filePath) {
    try {
      const operation = this.determineOperation(eventType, filePath);
      
      if (operation) {
        // Record operation in bridge
        this.bridge.recordOperation(operation);
        
        // Check for code generation session (file creation)
        if (operation.type === 'create') {
          this.trackFileCreation(operation);
        }
        
        console.log(`[file-operation-monitor] ${operation.type}: ${path.basename(filePath)}`);
      }
    } catch (error) {
      console.error('[file-operation-monitor] Error processing operation:', error.message);
    }
  }

  /**
   * Track file creation for code generation session detection
   */
  trackFileCreation(operation) {
    const now = new Date();
    
    // Add to recent creates
    this.recentCreates.push({
      ...operation,
      timestamp: now
    });
    
    // Filter out creates outside the window
    const windowStart = new Date(now.getTime() - this.generationSessionWindow);
    this.recentCreates = this.recentCreates.filter(op => op.timestamp >= windowStart);
    
    // Clear existing timeout
    if (this.generationSessionTimeout) {
      clearTimeout(this.generationSessionTimeout);
    }
    
    // Set timeout to detect generation session
    this.generationSessionTimeout = setTimeout(() => {
      this.detectGenerationSession();
    }, this.generationSessionWindow);
  }

  /**
   * Detect if recent file creations constitute a code generation session
   */
  async detectGenerationSession() {
    if (this.recentCreates.length === 0) return;
    
    // Check if this looks like a code generation session
    // Criteria: Multiple files created within the time window
    if (this.recentCreates.length >= 1) {
      const files = this.recentCreates.map(op => ({
        path: op.file || op.target,
        type: this.detectFileType(op.file || op.target),
        size: this.getFileSize(op.file || op.target)
      }));
      
      // Record as generation session
      await this.codeGenBridge.recordGenerationSession(files, {
        detectedBy: 'file-operation-monitor',
        timestamp: new Date().toISOString()
      });
      
      console.log(`[file-operation-monitor] Code generation session detected: ${files.length} files`);
      
      // Clear recent creates
      this.recentCreates = [];
    }
  }

  /**
   * Detect file type from path
   */
  detectFileType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const typeMap = {
      '.js': 'javascript',
      '.ts': 'typescript',
      '.jsx': 'react',
      '.tsx': 'react-typescript',
      '.json': 'json',
      '.md': 'markdown',
      '.py': 'python',
      '.java': 'java',
      '.go': 'go',
      '.rs': 'rust',
      '.css': 'css',
      '.html': 'html'
    };
    return typeMap[ext] || 'unknown';
  }

  /**
   * Get file size safely
   */
  getFileSize(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        return fs.statSync(filePath).size;
      }
    } catch (error) {
      // Ignore
    }
    return 0;
  }

  /**
   * Determine operation type from filesystem event
   */
  determineOperation(eventType, filePath) {
    const stat = this.getFileStats(filePath);
    const operation = {
      type: null,
      file: filePath,
      timestamp: new Date().toISOString()
    };
    
    switch (eventType) {
      case 'rename':
        // Could be rename, move, create, or delete
        if (stat.exists) {
          // File exists - could be create or rename
          operation.type = 'create';
          operation.target = filePath;
        } else {
          // File doesn't exist - could be delete
          operation.type = 'delete';
          operation.source = filePath;
        }
        break;
        
      case 'change':
        // File modified
        operation.type = 'modify';
        operation.file = filePath;
        break;
        
      default:
        return null;
    }
    
    return operation;
  }

  /**
   * Get file stats safely
   */
  getFileStats(filePath) {
    try {
      const exists = fs.existsSync(filePath);
      if (exists) {
        const stats = fs.statSync(filePath);
        return {
          exists: true,
          isFile: stats.isFile(),
          isDirectory: stats.isDirectory(),
          size: stats.size,
          mtime: stats.mtime
        };
      }
      return { exists: false };
    } catch (error) {
      return { exists: false, error: error.message };
    }
  }

  /**
   * Manually record operation (for operations done outside filesystem watching)
   */
  recordOperation(operation) {
    this.bridge.recordOperation(operation);
  }

  /**
   * Set evolution engine reference
   */
  setEvolutionEngine(evolutionEngine) {
    this.bridge.setEvolutionEngine(evolutionEngine);
    this.codeGenBridge.setEvolutionEngine(evolutionEngine);
  }

  /**
   * Get operation statistics
   */
  getStatistics() {
    return {
      fileOperations: this.bridge.getStatistics(),
      codeGeneration: this.codeGenBridge.getStatistics()
    };
  }

  /**
   * Manually record a code generation session (for external triggers)
   */
  async recordCodeGenerationSession(files, context = {}) {
    return await this.codeGenBridge.recordGenerationSession(files, context);
  }
}

module.exports = FileOperationMonitor;

