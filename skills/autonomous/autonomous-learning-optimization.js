/**
 * Autonomous Learning Optimization System
 * 
 * This system automatically detects learning opportunities and captures lessons
 * without manual intervention, addressing the critical gap identified in
 * the verification methodology lesson.
 */

const fs = require('fs');
const path = require('path');

class AutonomousLearningSystem {
    constructor() {
        this.learningTriggers = new Map();
        this.patternRecognition = new Map();
        this.lessonCapture = new Map();
        this.journalPath = path.join(__dirname, '../../docs/AUTONOMOUS_EVOLUTION_JOURNAL_LIVING.md');
        
        this.initializeLearningTriggers();
        this.initializePatternRecognition();
        this.initializeLessonCapture();
    }

    initializeLearningTriggers() {
        // Critical learning triggers that should be automatically detected
        this.learningTriggers.set('assumption_without_verification', {
            pattern: /claimed.*fixed.*without.*testing|assumed.*success.*without.*verification/i,
            lesson: 'verification_before_success_claims',
            priority: 'critical',
            autonomous: true
        });

        this.learningTriggers.set('user_correction_received', {
            pattern: /user.*corrected|user.*called.*out|assumption.*wrong/i,
            lesson: 'assumption_correction_methodology',
            priority: 'high',
            autonomous: true
        });

        this.learningTriggers.set('debugging_methodology_failure', {
            pattern: /jumped.*conclusions|didn.*t.*investigate|should.*have.*asked/i,
            lesson: 'proper_debugging_methodology',
            priority: 'high',
            autonomous: true
        });

        this.learningTriggers.set('success_claim_without_testing', {
            pattern: /declared.*fixed|problem.*solved|should.*work/i,
            lesson: 'test_before_success_claims',
            priority: 'critical',
            autonomous: true
        });

        this.learningTriggers.set('lesson_capture_failure', {
            pattern: /should.*have.*automatically.*captured|failed.*to.*capture.*lesson/i,
            lesson: 'autonomous_lesson_capture',
            priority: 'critical',
            autonomous: true
        });
    }

    initializePatternRecognition() {
        // Pattern recognition for autonomous learning opportunities
        this.patternRecognition.set('assumption_patterns', [
            'assumed', 'assumption', 'jumped to conclusions', 'didn\'t verify',
            'claimed fixed', 'declared solved', 'should work', 'must be fixed'
        ]);

        this.patternRecognition.set('verification_patterns', [
            'test first', 'verify before', 'check if', 'confirm that',
            'validate', 'should have asked', 'need to test'
        ]);

        this.patternRecognition.set('learning_opportunity_patterns', [
            'lesson learned', 'important lesson', 'critical gap',
            'should have', 'need to optimize', 'autonomous learning'
        ]);

        this.patternRecognition.set('user_correction_patterns', [
            'you\'re right', 'that\'s wrong', 'incorrect assumption',
            'should have asked', 'didn\'t verify', 'jumped to conclusions'
        ]);
    }

    initializeLessonCapture() {
        // Automatic lesson capture templates
        this.lessonCapture.set('verification_methodology', {
            title: 'Verification Before Success Claims',
            pattern: 'assumption_without_verification',
            template: `**{date}** – {title} → {source}
- **Source**: {context}
- **Insight**: {insight}
- **Impact**: {impact}
- **Evolution**: {evolution}
- **Pattern**: {pattern}
- **Quality Gate**: {quality_gate}
- **Success Test**: {success_test}
- **Invariant**: {invariant}
- **Rollback**: {rollback}
- **Autonomous Optimization**: {autonomous_optimization}`,
            autonomous: true
        });

        this.lessonCapture.set('debugging_methodology', {
            title: 'Proper Debugging Methodology',
            pattern: 'debugging_methodology_failure',
            template: `**{date}** – {title} → {source}
- **Source**: {context}
- **Insight**: {insight}
- **Impact**: {impact}
- **Evolution**: {evolution}
- **Pattern**: {pattern}
- **Quality Gate**: {quality_gate}
- **Success Test**: {success_test}
- **Invariant**: {invariant}
- **Rollback**: {rollback}
- **Autonomous Optimization**: {autonomous_optimization}`,
            autonomous: true
        });
    }

    // Main autonomous learning detection function
    detectLearningOpportunity(context, userInput = '') {
        const learningOpportunities = [];
        
        // Check all learning triggers
        for (const [triggerName, trigger] of this.learningTriggers) {
            if (this.matchesPattern(context, trigger.pattern) || 
                this.matchesPattern(userInput, trigger.pattern)) {
                
                learningOpportunities.push({
                    trigger: triggerName,
                    lesson: trigger.lesson,
                    priority: trigger.priority,
                    autonomous: trigger.autonomous,
                    context: context,
                    userInput: userInput
                });
            }
        }

        return learningOpportunities;
    }

    matchesPattern(text, pattern) {
        if (typeof pattern === 'string') {
            return text.toLowerCase().includes(pattern.toLowerCase());
        } else if (pattern instanceof RegExp) {
            return pattern.test(text);
        }
        return false;
    }

    // Automatically capture lessons when opportunities are detected
    autoCaptureLesson(opportunity) {
        const timestamp = new Date().toISOString().split('T')[0];
        const time = new Date().toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        const lessonData = this.generateLessonData(opportunity, timestamp, time);
        const journalEntry = this.formatJournalEntry(lessonData);
        
        // Automatically append to journal
        this.appendToJournal(journalEntry);
        
        console.log(`🤖 Autonomous Learning: Captured lesson "${opportunity.lesson}"`);
        return journalEntry;
    }

    generateLessonData(opportunity, timestamp, time) {
        const baseData = {
            date: `${timestamp} ${time}`,
            title: this.getLessonTitle(opportunity.lesson),
            source: 'Autonomous Learning Detection',
            context: opportunity.context,
            insight: this.generateInsight(opportunity),
            impact: this.generateImpact(opportunity),
            evolution: this.generateEvolution(opportunity),
            pattern: this.generatePattern(opportunity),
            quality_gate: this.generateQualityGate(opportunity),
            success_test: this.generateSuccessTest(opportunity),
            invariant: this.generateInvariant(opportunity),
            rollback: this.generateRollback(opportunity),
            autonomous_optimization: this.generateAutonomousOptimization(opportunity)
        };

        return baseData;
    }

    getLessonTitle(lessonType) {
        const titles = {
            'verification_before_success_claims': 'Verification Before Success Claims',
            'assumption_correction_methodology': 'Assumption Correction Methodology',
            'proper_debugging_methodology': 'Proper Debugging Methodology',
            'test_before_success_claims': 'Test Before Success Claims',
            'autonomous_lesson_capture': 'Autonomous Lesson Capture'
        };
        return titles[lessonType] || 'Autonomous Learning Lesson';
    }

    generateInsight(opportunity) {
        const insights = {
            'verification_before_success_claims': 'Never claim success without verification; always test before declaring problems solved',
            'assumption_correction_methodology': 'User corrections reveal critical gaps in assumption-making processes',
            'proper_debugging_methodology': 'Proper debugging requires investigation before conclusion-jumping',
            'test_before_success_claims': 'All success claims must be backed by actual testing and verification',
            'autonomous_lesson_capture': 'System must automatically capture lessons without manual intervention'
        };
        return insights[opportunity.lesson] || 'Autonomous learning opportunity detected';
    }

    generateImpact(opportunity) {
        return `Enhanced autonomous learning system with automatic detection of ${opportunity.lesson} patterns`;
    }

    generateEvolution(opportunity) {
        return `System now automatically detects and captures ${opportunity.lesson} lessons without manual intervention`;
    }

    generatePattern(opportunity) {
        return `Autonomous Learning Detection → Pattern Recognition → Lesson Capture → Journal Update → System Evolution`;
    }

    generateQualityGate(opportunity) {
        return `All learning opportunities must be automatically detected and captured without manual intervention`;
    }

    generateSuccessTest(opportunity) {
        return `System automatically captures ${opportunity.lesson} lessons and applies them to improve future performance`;
    }

    generateInvariant(opportunity) {
        return `Autonomous learning system maintains continuous improvement through automatic lesson capture`;
    }

    generateRollback(opportunity) {
        return `Revert to manual lesson capture if autonomous learning fails to detect critical opportunities`;
    }

    generateAutonomousOptimization(opportunity) {
        return `System must continuously improve its ability to detect and capture ${opportunity.lesson} patterns automatically`;
    }

    formatJournalEntry(lessonData) {
        const template = this.lessonCapture.get('verification_methodology').template;
        
        return template
            .replace(/{date}/g, lessonData.date)
            .replace(/{title}/g, lessonData.title)
            .replace(/{source}/g, lessonData.source)
            .replace(/{context}/g, lessonData.context)
            .replace(/{insight}/g, lessonData.insight)
            .replace(/{impact}/g, lessonData.impact)
            .replace(/{evolution}/g, lessonData.evolution)
            .replace(/{pattern}/g, lessonData.pattern)
            .replace(/{quality_gate}/g, lessonData.quality_gate)
            .replace(/{success_test}/g, lessonData.success_test)
            .replace(/{invariant}/g, lessonData.invariant)
            .replace(/{rollback}/g, lessonData.rollback)
            .replace(/{autonomous_optimization}/g, lessonData.autonomous_optimization);
    }

    appendToJournal(journalEntry) {
        try {
            const journalContent = fs.readFileSync(this.journalPath, 'utf8');
            const updatedContent = journalContent + '\n\n' + journalEntry;
            fs.writeFileSync(this.journalPath, updatedContent, 'utf8');
            console.log('✅ Autonomous lesson captured in journal');
        } catch (error) {
            console.error('❌ Failed to append to journal:', error.message);
        }
    }

    // Main execution function for autonomous learning
    executeAutonomousLearning(context, userInput = '') {
        console.log('🤖 Executing Autonomous Learning Optimization...');
        
        // Detect learning opportunities
        const opportunities = this.detectLearningOpportunity(context, userInput);
        
        if (opportunities.length > 0) {
            console.log(`🎯 Detected ${opportunities.length} learning opportunities`);
            
            // Capture each opportunity
            opportunities.forEach(opportunity => {
                if (opportunity.autonomous) {
                    this.autoCaptureLesson(opportunity);
                }
            });
            
            return {
                success: true,
                opportunities: opportunities.length,
                lessons: opportunities.map(o => o.lesson)
            };
        } else {
            console.log('ℹ️ No learning opportunities detected');
            return {
                success: false,
                opportunities: 0,
                lessons: []
            };
        }
    }
}

// Export for use in other systems
module.exports = AutonomousLearningSystem;

// Auto-execute if called directly
if (require.main === module) {
    const autonomousLearning = new AutonomousLearningSystem();
    
    // Test with the verification lesson context
    const context = "I claimed the problem was fixed without verification, then the user corrected me about assumption-making";
    const userInput = "Why did you not automatically save the lesson to the journal? What do you need to optimize to achieve true autonomy?";
    
    const result = autonomousLearning.executeAutonomousLearning(context, userInput);
    console.log('🎉 Autonomous Learning Execution Complete:', result);
}


