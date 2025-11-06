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

class FileOperationMonitor {
  constructor(rootPath) {
    this.rootPath = rootPath || process.cwd();
    this.bridge = new FileOperationLearningBridge();
    this.watchedPaths = new Set();
    this.isMonitoring = false;
    
    // Operation tracking
    this.pendingOperations = new Map();
    this.operationTimeout = 1000; // 1 second to batch operations
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
        
        console.log(`[file-operation-monitor] ${operation.type}: ${path.basename(filePath)}`);
      }
    } catch (error) {
      console.error('[file-operation-monitor] Error processing operation:', error.message);
    }
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
  }

  /**
   * Get operation statistics
   */
  getStatistics() {
    return this.bridge.getStatistics();
  }
}

module.exports = FileOperationMonitor;

