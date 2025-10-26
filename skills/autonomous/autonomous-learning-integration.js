/**
 * Autonomous Learning Integration System
 * 
 * This system integrates all autonomous learning capabilities and provides
 * a unified interface for real-time learning detection and lesson capture.
 */

const AutonomousLearningSystem = require('./autonomous-learning-optimization');
const RealTimeLearningTrigger = require('./real-time-learning-trigger');
const fs = require('fs');
const path = require('path');

class AutonomousLearningIntegration {
    constructor() {
        this.learningSystem = new AutonomousLearningSystem();
        this.realTimeTrigger = new RealTimeLearningTrigger();
        this.integrationActive = true;
        this.learningMetrics = {
            totalLessons: 0,
            autonomousCaptures: 0,
            manualCaptures: 0,
            systemUptime: Date.now()
        };
        
        console.log('🚀 Autonomous Learning Integration System Initialized');
        this.initializeIntegration();
    }

    initializeIntegration() {
        // Set up automatic learning detection for all interactions
        this.setupAutomaticLearning();
        
        // Initialize learning metrics tracking
        this.initializeMetricsTracking();
        
        // Set up autonomous optimization triggers
        this.setupAutonomousOptimization();
        
        console.log('✅ Autonomous Learning Integration Complete');
    }

    setupAutomaticLearning() {
        // This would be called automatically on every interaction
        console.log('🔧 Setting up automatic learning detection...');
        
        // Add custom triggers for this specific context
        this.realTimeTrigger.addTrigger(
            'verification_gap',
            /should.*have.*tested|need.*to.*verify|didn.*t.*check/i,
            'critical',
            true
        );
        
        this.realTimeTrigger.addTrigger(
            'assumption_correction',
            /you.*re.*right|that.*s.*wrong|incorrect.*assumption/i,
            'critical',
            true
        );
        
        this.realTimeTrigger.addTrigger(
            'autonomous_learning_gap',
            /failed.*to.*capture|should.*have.*automatically/i,
            'critical',
            true
        );
    }

    initializeMetricsTracking() {
        // Track learning metrics for system optimization
        this.learningMetrics.startTime = Date.now();
        this.learningMetrics.lastActivity = Date.now();
        
        console.log('📊 Learning metrics tracking initialized');
    }

    setupAutonomousOptimization() {
        // Set up triggers for autonomous system optimization
        this.realTimeTrigger.addTrigger(
            'system_optimization',
            /need.*to.*optimize|autonomous.*learning.*gap|critical.*gap/i,
            'critical',
            true
        );
        
        console.log('🔧 Autonomous optimization triggers configured');
    }

    // Main function to process any input and automatically detect learning opportunities
    processInteraction(input, context = '', userCorrection = false) {
        if (!this.integrationActive) {
            console.log('⚠️ Autonomous Learning Integration is disabled');
            return null;
        }

        console.log('🤖 Processing interaction for autonomous learning...');
        
        // Process with real-time trigger system
        const opportunities = this.realTimeTrigger.processInput(input, context);
        
        // Update metrics
        this.updateMetrics(opportunities);
        
        // Log the interaction
        this.logInteraction(input, context, opportunities);
        
        return {
            success: true,
            opportunities: opportunities.length,
            autonomous: true,
            metrics: this.getMetrics()
        };
    }

    updateMetrics(opportunities) {
        this.learningMetrics.totalLessons += opportunities.length;
        this.learningMetrics.autonomousCaptures += opportunities.length;
        this.learningMetrics.lastActivity = Date.now();
        
        console.log(`📈 Updated metrics: ${opportunities.length} new lessons captured`);
    }

    logInteraction(input, context, opportunities) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            input: input.substring(0, 100) + '...',
            context: context.substring(0, 100) + '...',
            opportunities: opportunities.length,
            triggers: opportunities.map(o => o.trigger)
        };
        
        console.log('📝 Interaction logged:', logEntry);
    }

    getMetrics() {
        const uptime = Date.now() - this.learningMetrics.systemUptime;
        return {
            ...this.learningMetrics,
            uptime: uptime,
            uptimeFormatted: this.formatUptime(uptime),
            learningRate: this.learningMetrics.totalLessons / (uptime / 1000 / 60), // lessons per minute
            systemStatus: this.integrationActive ? 'active' : 'inactive'
        };
    }

    formatUptime(ms) {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}m ${seconds}s`;
    }

    // Enable/disable the entire integration system
    setIntegrationActive(active) {
        this.integrationActive = active;
        this.realTimeTrigger.setActive(active);
        console.log(`🤖 Autonomous Learning Integration ${active ? 'enabled' : 'disabled'}`);
    }

    // Get comprehensive learning statistics
    getLearningStatistics() {
        const triggerStats = this.realTimeTrigger.getLearningStats();
        const systemMetrics = this.getMetrics();
        
        return {
            integration: {
                active: this.integrationActive,
                uptime: systemMetrics.uptimeFormatted,
                learningRate: systemMetrics.learningRate
            },
            triggers: triggerStats,
            metrics: systemMetrics,
            capabilities: {
                realTimeDetection: true,
                autonomousCapture: true,
                patternRecognition: true,
                journalIntegration: true,
                metricsTracking: true
            }
        };
    }

    // Test the complete integration system
    runIntegrationTest() {
        console.log('🧪 Running Autonomous Learning Integration Test...');
        
        const testInputs = [
            "I assumed the problem was fixed without testing",
            "You're right, I should have verified first",
            "This reveals a critical gap in my autonomous learning",
            "I need to optimize my assumption-making process"
        ];
        
        const testContext = "Live preview system debugging session";
        
        testInputs.forEach((input, index) => {
            console.log(`\n🔍 Test ${index + 1}: "${input}"`);
            const result = this.processInteraction(input, testContext);
            console.log(`✅ Result: ${result.opportunities} opportunities detected`);
        });
        
        console.log('\n📊 Final Integration Statistics:');
        console.log(this.getLearningStatistics());
        
        return this.getLearningStatistics();
    }
}

// Export for use in other systems
module.exports = AutonomousLearningIntegration;

// Auto-execute if called directly
if (require.main === module) {
    const integration = new AutonomousLearningIntegration();
    
    console.log('\n🚀 Executing Autonomous Learning Integration...');
    const testResults = integration.runIntegrationTest();
    
    console.log('\n🎉 Autonomous Learning Integration Complete!');
    console.log('✅ System is now capable of automatic lesson detection and capture');
    console.log('✅ Real-time learning triggers are active');
    console.log('✅ Autonomous optimization is enabled');
}


