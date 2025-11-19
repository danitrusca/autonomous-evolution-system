/**
 * Meta-Learning Agent
 * 
 * Learns how to learn more effectively by analyzing patterns
 * in problem-solving approaches and generalizing solutions
 * for similar future problems.
 */

const fs = require('fs');
const path = require('path');

const PATTERN_DB_SCHEMA_VERSION = 1;
const PATTERN_DB_LOG_PREFIX = '[metaLearning.patterns]';
const SOLUTION_TEMPLATES_LOG_PREFIX = '[metaLearning.templates]';
const LEARNING_INSIGHTS_LOG_PREFIX = '[metaLearning.insights]';

class MetaLearningAgent {
    constructor() {
        this.patternDatabasePath = path.join(__dirname, '..', 'docs', 'PATTERN_DATABASE.md');
        this.solutionTemplatesPath = path.join(__dirname, '..', 'docs', 'SOLUTION_TEMPLATES.md');
        this.learningInsightsPath = path.join(__dirname, '..', 'docs', 'LEARNING_INSIGHTS.md');
        
        this.patternDatabase = new Map();
        this.solutionTemplates = new Map();
        this.learningInsights = [];
        
        this.initializeMetaLearning();
    }

    /**
     * Initialize meta-learning system
     */
    initializeMetaLearning() {
        this.loadPatternDatabase();
        this.loadSolutionTemplates();
        this.loadLearningInsights();
    }

    /**
     * Process evolution request and extract learnable patterns
     */
    processEvolution(context, problemType, solutionPattern) {
        const analysis = this.analyzeSolutionPattern(context, problemType, solutionPattern);
        const generalization = this.generalizeSolution(analysis);
        const metaInsights = this.extractMetaInsights(analysis, generalization);
        
        this.updatePatternDatabase(analysis);
        this.updateSolutionTemplates(generalization);
        this.updateLearningInsights(metaInsights);
        
        return {
            analysis,
            generalization,
            metaInsights,
            evolutionPlan: this.createEvolutionPlan(analysis, generalization)
        };
    }

    /**
     * Analyze solution pattern for learnable elements
     */
    analyzeSolutionPattern(context, problemType, solutionPattern) {
        const analysis = {
            problemType,
            solutionPattern,
            context,
            timestamp: new Date().toISOString(),
            learnableElements: [],
            successFactors: [],
            failurePoints: [],
            generalizablePrinciples: []
        };

        // Extract learnable elements
        analysis.learnableElements = this.extractLearnableElements(solutionPattern);
        
        // Identify success factors
        analysis.successFactors = this.identifySuccessFactors(context, solutionPattern);
        
        // Identify potential failure points
        analysis.failurePoints = this.identifyFailurePoints(context, solutionPattern);
        
        // Extract generalizable principles
        analysis.generalizablePrinciples = this.extractGeneralizablePrinciples(analysis);

        return analysis;
    }

    /**
     * Extract learnable elements from solution pattern
     */
    extractLearnableElements(solutionPattern) {
        const elements = [];
        
        // Pattern structure analysis
        if (solutionPattern.steps) {
            elements.push({
                type: 'step_sequence',
                description: 'Sequential step pattern',
                pattern: solutionPattern.steps,
                generalizable: true
            });
        }
        
        // Decision points analysis
        if (solutionPattern.decisions) {
            elements.push({
                type: 'decision_tree',
                description: 'Decision-making pattern',
                pattern: solutionPattern.decisions,
                generalizable: true
            });
        }
        
        // Tool usage analysis
        if (solutionPattern.tools) {
            elements.push({
                type: 'tool_usage',
                description: 'Tool selection and usage pattern',
                pattern: solutionPattern.tools,
                generalizable: true
            });
        }
        
        // Error handling analysis
        if (solutionPattern.errorHandling) {
            elements.push({
                type: 'error_handling',
                description: 'Error handling and recovery pattern',
                pattern: solutionPattern.errorHandling,
                generalizable: true
            });
        }

        return elements;
    }

    /**
     * Identify success factors
     */
    identifySuccessFactors(context, solutionPattern) {
        const factors = [];
        
        if (context.success) {
            factors.push({
                factor: 'Clear problem definition',
                evidence: 'Problem was well-defined and understood',
                confidence: 0.8
            });
        }
        
        if (solutionPattern.systematic) {
            factors.push({
                factor: 'Systematic approach',
                evidence: 'Solution followed a systematic methodology',
                confidence: 0.9
            });
        }
        
        if (solutionPattern.adaptive) {
            factors.push({
                factor: 'Adaptive response',
                evidence: 'Solution adapted to changing conditions',
                confidence: 0.7
            });
        }
        
        if (solutionPattern.verification) {
            factors.push({
                factor: 'Verification and validation',
                evidence: 'Solution included verification steps',
                confidence: 0.8
            });
        }

        return factors;
    }

    /**
     * Identify potential failure points
     */
    identifyFailurePoints(context, solutionPattern) {
        const failurePoints = [];
        
        if (context.uncertainty) {
            failurePoints.push({
                point: 'Uncertainty handling',
                risk: 'High',
                mitigation: 'Add uncertainty acknowledgment and mitigation steps',
                confidence: 0.7
            });
        }
        
        if (solutionPattern.complexity > 0.8) {
            failurePoints.push({
                point: 'High complexity',
                risk: 'Medium',
                mitigation: 'Break down into smaller, manageable steps',
                confidence: 0.6
            });
        }
        
        if (!solutionPattern.rollback) {
            failurePoints.push({
                point: 'No rollback strategy',
                risk: 'High',
                mitigation: 'Always include rollback and recovery steps',
                confidence: 0.9
            });
        }

        return failurePoints;
    }

    /**
     * Extract generalizable principles
     */
    extractGeneralizablePrinciples(analysis) {
        const principles = [];
        
        // Principle: Systematic approach
        if (analysis.successFactors.some(f => f.factor === 'Systematic approach')) {
            principles.push({
                principle: 'Always use systematic approach',
                description: 'Break problems into clear steps with defined inputs/outputs',
                applicability: 'All problem types',
                confidence: 0.9
            });
        }
        
        // Principle: Uncertainty acknowledgment
        if (analysis.failurePoints.some(f => f.point === 'Uncertainty handling')) {
            principles.push({
                principle: 'Acknowledge and handle uncertainty',
                description: 'Always assess confidence levels and provide mitigation strategies',
                applicability: 'All problem types',
                confidence: 0.8
            });
        }
        
        // Principle: Rollback strategy
        if (analysis.failurePoints.some(f => f.point === 'No rollback strategy')) {
            principles.push({
                principle: 'Always include rollback strategy',
                description: 'Every solution must have a clear rollback path',
                applicability: 'All problem types',
                confidence: 0.9
            });
        }
        
        // Principle: Verification and validation
        if (analysis.successFactors.some(f => f.factor === 'Verification and validation')) {
            principles.push({
                principle: 'Include verification steps',
                description: 'Always verify solution works before considering complete',
                applicability: 'All problem types',
                confidence: 0.8
            });
        }

        return principles;
    }

    /**
     * Generalize solution for future use
     */
    generalizeSolution(analysis) {
        const generalization = {
            problemType: analysis.problemType,
            solutionTemplate: this.createSolutionTemplate(analysis),
            applicableContexts: this.identifyApplicableContexts(analysis),
            successCriteria: this.defineSuccessCriteria(analysis),
            failureModes: this.identifyFailureModes(analysis),
            adaptationPoints: this.identifyAdaptationPoints(analysis)
        };

        return generalization;
    }

    /**
     * Create solution template
     */
    createSolutionTemplate(analysis) {
        const template = {
            name: `${analysis.problemType} Solution Template`,
            description: `Generalized solution for ${analysis.problemType} problems`,
            steps: this.createGeneralizedSteps(analysis),
            decisionPoints: this.createGeneralizedDecisions(analysis),
            tools: this.createGeneralizedTools(analysis),
            errorHandling: this.createGeneralizedErrorHandling(analysis),
            verification: this.createGeneralizedVerification(analysis)
        };

        return template;
    }

    /**
     * Create generalized steps
     */
    createGeneralizedSteps(analysis) {
        const steps = [];
        
        // Always start with problem analysis
        steps.push({
            step: 1,
            name: 'Problem Analysis',
            description: 'Analyze the problem context, constraints, and requirements',
            inputs: ['problem_description', 'context', 'constraints'],
            outputs: ['problem_analysis', 'success_criteria'],
            generalizable: true
        });
        
        // Add solution-specific steps from analysis
        if (analysis.learnableElements.some(e => e.type === 'step_sequence')) {
            const stepElement = analysis.learnableElements.find(e => e.type === 'step_sequence');
            steps.push(...stepElement.pattern.map((step, index) => ({
                step: index + 2,
                name: step.name || `Step ${index + 2}`,
                description: step.description || 'Solution step',
                inputs: step.inputs || [],
                outputs: step.outputs || [],
                generalizable: true
            })));
        }
        
        // Always end with verification
        steps.push({
            step: steps.length + 1,
            name: 'Verification',
            description: 'Verify solution works and meets success criteria',
            inputs: ['solution_output', 'success_criteria'],
            outputs: ['verification_result'],
            generalizable: true
        });

        return steps;
    }

    /**
     * Create generalized decisions
     */
    createGeneralizedDecisions(analysis) {
        const decisions = [];
        
        // Decision: Confidence assessment
        decisions.push({
            decision: 'Confidence Assessment',
            description: 'Assess confidence level and uncertainty',
            criteria: ['evidence_strength', 'experience_level', 'context_clarity'],
            options: ['high_confidence', 'medium_confidence', 'low_confidence'],
            generalizable: true
        });
        
        // Decision: Approach selection
        decisions.push({
            decision: 'Approach Selection',
            description: 'Select appropriate solution approach',
            criteria: ['problem_complexity', 'available_tools', 'time_constraints'],
            options: ['systematic', 'iterative', 'experimental'],
            generalizable: true
        });

        return decisions;
    }

    /**
     * Create generalized tools
     */
    createGeneralizedTools(analysis) {
        const tools = [];
        
        // Always include analysis tools
        tools.push({
            tool: 'Problem Analysis',
            description: 'Analyze problem context and requirements',
            generalizable: true
        });
        
        // Always include verification tools
        tools.push({
            tool: 'Solution Verification',
            description: 'Verify solution meets requirements',
            generalizable: true
        });
        
        // Add solution-specific tools
        if (analysis.learnableElements.some(e => e.type === 'tool_usage')) {
            const toolElement = analysis.learnableElements.find(e => e.type === 'tool_usage');
            tools.push(...toolElement.pattern);
        }

        return tools;
    }

    /**
     * Create generalized error handling
     */
    createGeneralizedErrorHandling(analysis) {
        const errorHandling = {
            commonErrors: [],
            mitigationStrategies: [],
            rollbackProcedures: []
        };
        
        // Add common errors from analysis
        analysis.failurePoints.forEach(fp => {
            errorHandling.commonErrors.push({
                error: fp.point,
                risk: fp.risk,
                mitigation: fp.mitigation
            });
        });
        
        // Always include rollback
        errorHandling.rollbackProcedures.push({
            procedure: 'Solution Rollback',
            description: 'Revert to previous working state',
            generalizable: true
        });

        return errorHandling;
    }

    /**
     * Create generalized verification
     */
    createGeneralizedVerification(analysis) {
        const verification = {
            successCriteria: [],
            validationSteps: [],
            metrics: []
        };
        
        // Add success criteria from analysis
        analysis.successFactors.forEach(sf => {
            verification.successCriteria.push({
                criterion: sf.factor,
                description: sf.evidence,
                confidence: sf.confidence
            });
        });
        
        // Always include basic verification
        verification.validationSteps.push({
            step: 'Verify solution works',
            description: 'Test solution functionality',
            generalizable: true
        });

        return verification;
    }

    /**
     * Identify applicable contexts
     */
    identifyApplicableContexts(analysis) {
        const contexts = [analysis.problemType];
        
        // Add similar problem types based on analysis
        if (analysis.generalizablePrinciples.length > 0) {
            contexts.push('Similar problem types with same principles');
        }
        
        return contexts;
    }

    /**
     * Define success criteria
     */
    defineSuccessCriteria(analysis) {
        const criteria = [];
        
        analysis.successFactors.forEach(sf => {
            criteria.push({
                criterion: sf.factor,
                description: sf.evidence,
                measurable: true
            });
        });
        
        return criteria;
    }

    /**
     * Identify failure modes
     */
    identifyFailureModes(analysis) {
        const failureModes = [];
        
        analysis.failurePoints.forEach(fp => {
            failureModes.push({
                mode: fp.point,
                risk: fp.risk,
                mitigation: fp.mitigation
            });
        });
        
        return failureModes;
    }

    /**
     * Identify adaptation points
     */
    identifyAdaptationPoints(analysis) {
        const adaptationPoints = [];
        
        // Always include confidence assessment
        adaptationPoints.push({
            point: 'Confidence Assessment',
            description: 'Assess confidence and adjust approach',
            generalizable: true
        });
        
        // Add solution-specific adaptation points
        if (analysis.learnableElements.some(e => e.type === 'decision_tree')) {
            adaptationPoints.push({
                point: 'Decision Points',
                description: 'Adapt based on decision outcomes',
                generalizable: true
            });
        }

        return adaptationPoints;
    }

    /**
     * Extract meta-insights
     */
    extractMetaInsights(analysis, generalization) {
        const insights = [];
        
        // Insight: Pattern recognition
        insights.push({
            insight: 'Pattern Recognition',
            description: 'System can recognize and generalize solution patterns',
            confidence: 0.8,
            applicability: 'All problem types'
        });
        
        // Insight: Systematic approach
        if (analysis.successFactors.some(f => f.factor === 'Systematic approach')) {
            insights.push({
                insight: 'Systematic Approach Effectiveness',
                description: 'Systematic approaches consistently lead to better outcomes',
                confidence: 0.9,
                applicability: 'All problem types'
            });
        }
        
        // Insight: Uncertainty handling
        if (analysis.failurePoints.some(f => f.point === 'Uncertainty handling')) {
            insights.push({
                insight: 'Uncertainty Acknowledgment',
                description: 'Acknowledging uncertainty leads to better decision-making',
                confidence: 0.7,
                applicability: 'All problem types'
            });
        }

        return insights;
    }

    /**
     * Update pattern database
     */
    updatePatternDatabase(analysis) {
        const patternKey = `${analysis.problemType}_${analysis.timestamp}`;
        this.patternDatabase.set(patternKey, analysis);
        this.savePatternDatabase();
    }

    /**
     * Update solution templates
     */
    updateSolutionTemplates(generalization) {
        const templateKey = generalization.problemType;
        this.solutionTemplates.set(templateKey, generalization);
        this.saveSolutionTemplates();
    }

    /**
     * Update learning insights
     */
    updateLearningInsights(metaInsights) {
        this.learningInsights.push(...metaInsights);
        this.saveLearningInsights();
    }

    /**
     * Create evolution plan
     */
    createEvolutionPlan(analysis, generalization) {
        const plan = {
            problemType: analysis.problemType,
            solutionTemplate: generalization.solutionTemplate,
            implementationSteps: [
                'Update pattern recognition system',
                'Add solution template to knowledge base',
                'Update meta-learning algorithms',
                'Test template with similar problems',
                'Refine based on feedback'
            ],
            successMetrics: [
                'Template reusability',
                'Solution effectiveness',
                'Learning acceleration',
                'Error reduction'
            ]
        };

        return plan;
    }

    /**
     * Load pattern database
     */
    loadPatternDatabase() {
        this.patternDatabase = new Map();
        try {
            if (!fs.existsSync(this.patternDatabasePath)) {
                this.bootstrapPatternDatabaseFile();
                console.log(`${PATTERN_DB_LOG_PREFIX} load.miss reason=missing_file`);
                return;
            }

            const raw = fs.readFileSync(this.patternDatabasePath, 'utf8');
            const payload = this.parsePatternDatabase(raw);
            const patternEntries = Object.entries(payload.patterns || {});
            patternEntries.forEach(([key, value]) => {
                if (value && typeof value === 'object') {
                    this.patternDatabase.set(key, value);
                }
            });

            if (patternEntries.length !== this.patternDatabase.size) {
                console.warn(`${PATTERN_DB_LOG_PREFIX} load.warn reason=non_object_entries dropped=${patternEntries.length - this.patternDatabase.size}`);
            }

            console.log(`${PATTERN_DB_LOG_PREFIX} load.ok count=${this.patternDatabase.size}`);
        } catch (error) {
            this.patternDatabase = new Map();
            console.warn(`${PATTERN_DB_LOG_PREFIX} load.fail message=${error.message}`);
            this.bootstrapPatternDatabaseFile();
        }
    }

    /**
     * Save pattern database
     */
    savePatternDatabase() {
        try {
            const serialized = this.formatPatternDatabase();
            const directory = path.dirname(this.patternDatabasePath);
            fs.mkdirSync(directory, { recursive: true });

            const tempPath = `${this.patternDatabasePath}.tmp`;
            fs.writeFileSync(tempPath, serialized, 'utf8');
            fs.renameSync(tempPath, this.patternDatabasePath);

            console.log(`${PATTERN_DB_LOG_PREFIX} save.ok count=${this.patternDatabase.size}`);
        } catch (error) {
            console.error(`${PATTERN_DB_LOG_PREFIX} save.fail message=${error.message}`);
        }
    }

    /**
     * Load solution templates
     */
    loadSolutionTemplates() {
        this.solutionTemplates = new Map();
        try {
            if (!fs.existsSync(this.solutionTemplatesPath)) {
                this.bootstrapSolutionTemplatesFile();
                console.log(`${SOLUTION_TEMPLATES_LOG_PREFIX} load.miss reason=missing_file`);
                return;
            }

            const raw = fs.readFileSync(this.solutionTemplatesPath, 'utf8');
            const payload = this.parseSolutionTemplates(raw);
            const templateEntries = Object.entries(payload.templates || {});
            templateEntries.forEach(([key, value]) => {
                if (value && typeof value === 'object') {
                    this.solutionTemplates.set(key, value);
                }
            });

            if (templateEntries.length !== this.solutionTemplates.size) {
                console.warn(`${SOLUTION_TEMPLATES_LOG_PREFIX} load.warn reason=non_object_entries dropped=${templateEntries.length - this.solutionTemplates.size}`);
            }

            console.log(`${SOLUTION_TEMPLATES_LOG_PREFIX} load.ok count=${this.solutionTemplates.size}`);
        } catch (error) {
            this.solutionTemplates = new Map();
            console.warn(`${SOLUTION_TEMPLATES_LOG_PREFIX} load.fail message=${error.message}`);
            this.bootstrapSolutionTemplatesFile();
        }
    }

    /**
     * Save solution templates
     */
    saveSolutionTemplates() {
        try {
            const payload = this.buildSolutionTemplatesPayload();
            const jsonBlock = JSON.stringify(payload, null, 2);
            const directory = path.dirname(this.solutionTemplatesPath);
            fs.mkdirSync(directory, { recursive: true });

            const tempPath = `${this.solutionTemplatesPath}.tmp`;
            const content = [
                '# Meta-Learning Solution Templates',
                '> Auto-generated file. Do not edit manually unless you know what you are doing.',
                '',
                '```json',
                jsonBlock,
                '```',
                ''
            ].join('\n');

            fs.writeFileSync(tempPath, content, 'utf8');
            fs.renameSync(tempPath, this.solutionTemplatesPath);

            console.log(`${SOLUTION_TEMPLATES_LOG_PREFIX} save.ok count=${this.solutionTemplates.size}`);
        } catch (error) {
            console.error(`${SOLUTION_TEMPLATES_LOG_PREFIX} save.fail message=${error.message}`);
        }
    }

    /**
     * Load learning insights
     */
    loadLearningInsights() {
        this.learningInsights = [];
        try {
            if (!fs.existsSync(this.learningInsightsPath)) {
                this.bootstrapLearningInsightsFile();
                console.log(`${LEARNING_INSIGHTS_LOG_PREFIX} load.miss reason=missing_file`);
                return;
            }

            const raw = fs.readFileSync(this.learningInsightsPath, 'utf8');
            const payload = this.parseLearningInsights(raw);
            this.learningInsights = Array.isArray(payload.insights) ? payload.insights : [];

            console.log(`${LEARNING_INSIGHTS_LOG_PREFIX} load.ok count=${this.learningInsights.length}`);
        } catch (error) {
            this.learningInsights = [];
            console.warn(`${LEARNING_INSIGHTS_LOG_PREFIX} load.fail message=${error.message}`);
            this.bootstrapLearningInsightsFile();
        }
    }

    /**
     * Save learning insights
     */
    saveLearningInsights() {
        try {
            const payload = this.buildLearningInsightsPayload();
            const jsonBlock = JSON.stringify(payload, null, 2);
            const directory = path.dirname(this.learningInsightsPath);
            fs.mkdirSync(directory, { recursive: true });

            const tempPath = `${this.learningInsightsPath}.tmp`;
            const content = [
                '# Meta-Learning Learning Insights Index',
                '> Auto-generated file. Do not edit manually unless you know what you are doing.',
                '',
                '```json',
                jsonBlock,
                '```',
                ''
            ].join('\n');

            fs.writeFileSync(tempPath, content, 'utf8');
            fs.renameSync(tempPath, this.learningInsightsPath);

            console.log(`${LEARNING_INSIGHTS_LOG_PREFIX} save.ok count=${this.learningInsights.length}`);
        } catch (error) {
            console.error(`${LEARNING_INSIGHTS_LOG_PREFIX} save.fail message=${error.message}`);
        }
    }

    /**
     * Format pattern database as markdown + JSON block
     */
    formatPatternDatabase() {
        const payload = this.buildPatternPayload();
        const jsonBlock = JSON.stringify(payload, null, 2);

        return [
            '# Meta-Learning Pattern Database',
            '> Auto-generated file. Do not edit manually unless you know what you are doing.',
            '',
            '```json',
            jsonBlock,
            '```',
            ''
        ].join('\n');
    }

    /**
     * Parse markdown file containing JSON payload
     */
    parsePatternDatabase(rawContent) {
        const fenceMatch = rawContent.match(/```json\s*([\s\S]*?)```/i);
        if (!fenceMatch) {
            throw new Error('Pattern database missing JSON block');
        }

        const payload = JSON.parse(fenceMatch[1]);
        if (typeof payload !== 'object' || payload === null) {
            throw new Error('Pattern database payload invalid');
        }

        if (payload.schemaVersion !== PATTERN_DB_SCHEMA_VERSION) {
            console.warn(`${PATTERN_DB_LOG_PREFIX} load.version_mismatch expected=${PATTERN_DB_SCHEMA_VERSION} received=${payload.schemaVersion}`);
        }

        if (!payload.patterns || typeof payload.patterns !== 'object') {
            throw new Error('Pattern database missing patterns object');
        }

        return payload;
    }

    /**
     * Parse markdown file containing JSON payload for solution templates
     */
    parseSolutionTemplates(rawContent) {
        const fenceMatch = rawContent.match(/```json\s*([\s\S]*?)```/i);
        if (!fenceMatch) {
            throw new Error('Solution templates missing JSON block');
        }

        const payload = JSON.parse(fenceMatch[1]);
        if (typeof payload !== 'object' || payload === null) {
            throw new Error('Solution templates payload invalid');
        }

        if (payload.schemaVersion !== PATTERN_DB_SCHEMA_VERSION) {
            console.warn(`${SOLUTION_TEMPLATES_LOG_PREFIX} load.version_mismatch expected=${PATTERN_DB_SCHEMA_VERSION} received=${payload.schemaVersion}`);
        }

        if (!payload.templates || typeof payload.templates !== 'object') {
            throw new Error('Solution templates missing templates object');
        }

        return payload;
    }

    /**
     * Parse markdown file containing JSON payload for learning insights
     */
    parseLearningInsights(rawContent) {
        const fenceMatch = rawContent.match(/```json\s*([\s\S]*?)```/i);
        if (!fenceMatch) {
            throw new Error('Learning insights index missing JSON block');
        }

        const payload = JSON.parse(fenceMatch[1]);
        if (typeof payload !== 'object' || payload === null) {
            throw new Error('Learning insights payload invalid');
        }

        if (payload.schemaVersion !== PATTERN_DB_SCHEMA_VERSION) {
            console.warn(`${LEARNING_INSIGHTS_LOG_PREFIX} load.version_mismatch expected=${PATTERN_DB_SCHEMA_VERSION} received=${payload.schemaVersion}`);
        }

        if (!payload.insights || !Array.isArray(payload.insights)) {
            throw new Error('Learning insights payload missing insights array');
        }

        return payload;
    }

    /**
     * Create structured payload for pattern persistence
     */
    buildPatternPayload() {
        const orderedEntries = Array.from(this.patternDatabase.entries()).sort(([a], [b]) => a.localeCompare(b));
        const patterns = orderedEntries.reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

        return {
            schemaVersion: PATTERN_DB_SCHEMA_VERSION,
            lastUpdated: new Date().toISOString(),
            patterns
        };
    }

    /**
     * Create structured payload for solution templates persistence
     */
    buildSolutionTemplatesPayload() {
        const orderedEntries = Array.from(this.solutionTemplates.entries()).sort(([a], [b]) => a.localeCompare(b));
        const templates = orderedEntries.reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

        return {
            schemaVersion: PATTERN_DB_SCHEMA_VERSION,
            lastUpdated: new Date().toISOString(),
            templates
        };
    }

    /**
     * Create structured payload for learning insights index
     */
    buildLearningInsightsPayload() {
        return {
            schemaVersion: PATTERN_DB_SCHEMA_VERSION,
            lastUpdated: new Date().toISOString(),
            insights: this.learningInsights
        };
    }

    /**
     * Ensure pattern database file exists with default structure
     */
    bootstrapPatternDatabaseFile() {
        try {
            if (fs.existsSync(this.patternDatabasePath)) {
                return;
            }
            const directory = path.dirname(this.patternDatabasePath);
            fs.mkdirSync(directory, { recursive: true });
            const emptyPayload = {
                schemaVersion: PATTERN_DB_SCHEMA_VERSION,
                lastUpdated: new Date().toISOString(),
                patterns: {}
            };
            const jsonBlock = JSON.stringify(emptyPayload, null, 2);
            const bootstrapContent = [
                '# Meta-Learning Pattern Database',
                '> Auto-generated file. Do not edit manually unless you know what you are doing.',
                '',
                '```json',
                jsonBlock,
                '```',
                ''
            ].join('\n');
            fs.writeFileSync(this.patternDatabasePath, bootstrapContent, 'utf8');
            console.log(`${PATTERN_DB_LOG_PREFIX} bootstrap.ok`);
        } catch (error) {
            console.error(`${PATTERN_DB_LOG_PREFIX} bootstrap.fail message=${error.message}`);
        }
    }

    /**
     * Ensure solution templates file exists with default structure
     */
    bootstrapSolutionTemplatesFile() {
        try {
            if (fs.existsSync(this.solutionTemplatesPath)) {
                return;
            }
            const directory = path.dirname(this.solutionTemplatesPath);
            fs.mkdirSync(directory, { recursive: true });
            const emptyPayload = {
                schemaVersion: PATTERN_DB_SCHEMA_VERSION,
                lastUpdated: new Date().toISOString(),
                templates: {}
            };
            const jsonBlock = JSON.stringify(emptyPayload, null, 2);
            const bootstrapContent = [
                '# Meta-Learning Solution Templates',
                '> Auto-generated file. Do not edit manually unless you know what you are doing.',
                '',
                '```json',
                jsonBlock,
                '```',
                ''
            ].join('\n');
            fs.writeFileSync(this.solutionTemplatesPath, bootstrapContent, 'utf8');
            console.log(`${SOLUTION_TEMPLATES_LOG_PREFIX} bootstrap.ok`);
        } catch (error) {
            console.error(`${SOLUTION_TEMPLATES_LOG_PREFIX} bootstrap.fail message=${error.message}`);
        }
    }

    /**
     * Ensure learning insights index file exists with default structure
     */
    bootstrapLearningInsightsFile() {
        try {
            if (fs.existsSync(this.learningInsightsPath)) {
                return;
            }
            const directory = path.dirname(this.learningInsightsPath);
            fs.mkdirSync(directory, { recursive: true });
            const emptyPayload = {
                schemaVersion: PATTERN_DB_SCHEMA_VERSION,
                lastUpdated: new Date().toISOString(),
                insights: []
            };
            const jsonBlock = JSON.stringify(emptyPayload, null, 2);
            const bootstrapContent = [
                '# Meta-Learning Learning Insights Index',
                '> Auto-generated file. Do not edit manually unless you know what you are doing.',
                '',
                '```json',
                jsonBlock,
                '```',
                ''
            ].join('\n');
            fs.writeFileSync(this.learningInsightsPath, bootstrapContent, 'utf8');
            console.log(`${LEARNING_INSIGHTS_LOG_PREFIX} bootstrap.ok`);
        } catch (error) {
            console.error(`${LEARNING_INSIGHTS_LOG_PREFIX} bootstrap.fail message=${error.message}`);
        }
    }
}

module.exports = MetaLearningAgent;
