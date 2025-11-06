/**
 * Autonomous Evolution System Configuration
 * Controls timing and behavior of continuous evolution monitoring
 */

module.exports = {
  // Evolution monitoring intervals (in milliseconds)
  intervals: {
    // Check for evolution triggers every 10 minutes
    evolutionCheck: 600000, // 10 minutes
    
    // Periodic evolution even without explicit triggers (every hour)
    periodicEvolution: 3600000, // 1 hour
    
    // System map update interval (every hour)
    mapUpdate: 3600000, // 1 hour
    
    // Q&A auto-updater check (every 30 minutes)
    qaUpdate: 1800000, // 30 minutes
    
    // Learning capture scan (every 15 minutes)
    learningCapture: 900000, // 15 minutes
    
    // File operation monitoring (continuous, batched)
    fileOperationMonitoring: true, // Enable/disable
  },
  
  // Evolution trigger thresholds
  triggers: {
    // Minimum complexity issues to trigger evolution
    complexityThreshold: 1,
    
    // Minimum optimization opportunities to trigger evolution
    optimizationThreshold: 1,
    
    // Minimum friction score to trigger evolution
    frictionThreshold: 0.5,
    
    // Minimum pattern confidence to trigger evolution
    patternConfidenceThreshold: 0.7,
  },
  
  // Evolution behavior settings
  behavior: {
    // Enable continuous evolution monitoring
    continuousMonitoring: true,
    
    // Enable periodic evolution (even without triggers)
    periodicEvolution: true,
    
    // Enable automatic Q&A updates
    autoQAUpdate: true,
    
    // Enable automatic system map updates
    autoMapUpdate: true,
    
    // Enable automatic learning capture
    autoLearningCapture: true,
    
    // Enable verbose logging
    verboseLogging: false,
  },
  
  // Performance settings
  performance: {
    // Maximum concurrent evolution processes
    maxConcurrentEvolutions: 1,
    
    // Evolution timeout (in milliseconds)
    evolutionTimeout: 300000, // 5 minutes
    
    // Maximum evolution history size
    maxHistorySize: 1000,
  },
  
  // Safety settings
  safety: {
    // Require confirmation for high-impact evolutions
    requireConfirmation: false,
    
    // Enable rollback on evolution failure
    enableRollback: true,
    
    // Maximum evolution attempts before pausing
    maxFailedAttempts: 3,
    
    // Pause duration after max failures (in milliseconds)
    pauseDuration: 3600000, // 1 hour
  },
};

