/**
 * Real-Time Autonomous Learning Trigger System
 * 
 * This system automatically detects learning opportunities in real-time
 * and triggers autonomous lesson capture without manual intervention.
 */

const AutonomousLearningSystem = require('./autonomous-learning-optimization');

class RealTimeLearningTrigger {
    constructor() {
        this.learningSystem = new AutonomousLearningSystem();
        this.activeTriggers = new Map();
        this.learningHistory = [];
        this.isActive = true;
        
        this.initializeRealTimeTriggers();
        console.log('🤖 Real-Time Learning Trigger System Initialized');
    }

    initializeRealTimeTriggers() {
        // Critical real-time learning triggers
        this.activeTriggers.set('assumption_detection', {
            pattern: /assumed|assumption|jumped.*conclusions|didn.*t.*verify/i,
            priority: 'critical',
            autoCapture: true,
            context: 'assumption_made_without_verification'
        });

        this.activeTriggers.set('success_claim_detection', {
            pattern: /fixed|solved|should.*work|declared.*success/i,
            priority: 'high',
            autoCapture: true,
            context: 'success_claimed_without_verification'
        });

        this.activeTriggers.set('user_correction_detection', {
            pattern: /you.*re.*right|that.*s.*wrong|incorrect|should.*have.*asked/i,
            priority: 'critical',
            autoCapture: true,
            context: 'user_correction_received'
        });

        this.activeTriggers.set('verification_gap_detection', {
            pattern: /should.*have.*tested|need.*to.*verify|didn.*t.*check/i,
            priority: 'high',
            autoCapture: true,
            context: 'verification_methodology_gap'
        });

        this.activeTriggers.set('learning_opportunity_detection', {
            pattern: /lesson.*learned|important.*lesson|critical.*gap|need.*to.*optimize/i,
            priority: 'critical',
            autoCapture: true,
            context: 'learning_opportunity_identified'
        });
    }

    // Main function to process real-time input and detect learning opportunities
    processInput(input, context = '') {
        if (!this.isActive) return null;

        console.log('🔍 Processing input for learning opportunities...');
        
        const learningOpportunities = [];
        
        // Check all active triggers
        for (const [triggerName, trigger] of this.activeTriggers) {
            if (this.matchesTrigger(input, trigger.pattern) || 
                this.matchesTrigger(context, trigger.pattern)) {
                
                const opportunity = {
                    trigger: triggerName,
                    pattern: trigger.pattern,
                    priority: trigger.priority,
                    context: context,
                    input: input,
                    timestamp: new Date().toISOString(),
                    autoCapture: trigger.autoCapture
                };

                learningOpportunities.push(opportunity);
                
                console.log(`🎯 Learning opportunity detected: ${triggerName} (${trigger.priority})`);
            }
        }

        // Auto-capture if opportunities found
        if (learningOpportunities.length > 0) {
            this.autoCaptureOpportunities(learningOpportunities);
        }

        return learningOpportunities;
    }

    matchesTrigger(text, pattern) {
        if (typeof pattern === 'string') {
            return text.toLowerCase().includes(pattern.toLowerCase());
        } else if (pattern instanceof RegExp) {
            return pattern.test(text);
        }
        return false;
    }

    autoCaptureOpportunities(opportunities) {
        console.log(`🤖 Auto-capturing ${opportunities.length} learning opportunities...`);
        
        opportunities.forEach(opportunity => {
            if (opportunity.autoCapture) {
                // Convert to learning system format
                const learningOpportunity = {
                    trigger: opportunity.trigger,
                    lesson: this.mapTriggerToLesson(opportunity.trigger),
                    priority: opportunity.priority,
                    autonomous: true,
                    context: opportunity.context,
                    userInput: opportunity.input
                };

                // Capture the lesson
                this.learningSystem.autoCaptureLesson(learningOpportunity);
                
                // Add to learning history
                this.learningHistory.push({
                    timestamp: opportunity.timestamp,
                    trigger: opportunity.trigger,
                    lesson: learningOpportunity.lesson,
                    context: opportunity.context
                });
            }
        });
    }

    mapTriggerToLesson(triggerName) {
        const mapping = {
            'assumption_detection': 'assumption_correction_methodology',
            'success_claim_detection': 'verification_before_success_claims',
            'user_correction_detection': 'assumption_correction_methodology',
            'verification_gap_detection': 'proper_debugging_methodology',
            'learning_opportunity_detection': 'autonomous_lesson_capture'
        };
        return mapping[triggerName] || 'autonomous_learning_lesson';
    }

    // Get learning statistics
    getLearningStats() {
        return {
            totalOpportunities: this.learningHistory.length,
            triggersActive: this.activeTriggers.size,
            systemActive: this.isActive,
            recentOpportunities: this.learningHistory.slice(-5)
        };
    }

    // Enable/disable the system
    setActive(active) {
        this.isActive = active;
        console.log(`🤖 Real-Time Learning Trigger System ${active ? 'enabled' : 'disabled'}`);
    }

    // Add new trigger dynamically
    addTrigger(name, pattern, priority = 'medium', autoCapture = true) {
        this.activeTriggers.set(name, {
            pattern: pattern,
            priority: priority,
            autoCapture: autoCapture,
            context: name
        });
        console.log(`✅ Added new learning trigger: ${name}`);
    }

    // Remove trigger
    removeTrigger(name) {
        if (this.activeTriggers.has(name)) {
            this.activeTriggers.delete(name);
            console.log(`❌ Removed learning trigger: ${name}`);
        }
    }
}

// Export for use in other systems
module.exports = RealTimeLearningTrigger;

// Auto-execute if called directly
if (require.main === module) {
    const realTimeLearning = new RealTimeLearningTrigger();
    
    // Test with the current context
    const testInput = "Why did you not automatically save the lesson to the journal? What do you need to optimize to achieve true autonomy?";
    const testContext = "I claimed the problem was fixed without verification, then the user corrected me about assumption-making";
    
    console.log('🧪 Testing Real-Time Learning Trigger...');
    const result = realTimeLearning.processInput(testInput, testContext);
    
    console.log('📊 Learning Statistics:', realTimeLearning.getLearningStats());
    console.log('🎉 Real-Time Learning Trigger Test Complete');
}


