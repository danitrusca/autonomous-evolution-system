/**
 * Epistemic Humility Agent
 * 
 * Manages uncertainty acknowledgment, confidence calibration, and
 * prevents overconfident assertions by maintaining awareness of
 * system limitations and knowledge boundaries.
 */

const fs = require('fs');
const path = require('path');

class EpistemicHumilityAgent {
    constructor() {
        this.uncertaintyLogPath = path.join(__dirname, '..', 'docs', 'UNCERTAINTY_LOG.md');
        this.confidenceCalibrationPath = path.join(__dirname, '..', 'docs', 'CONFIDENCE_CALIBRATION.md');
        this.knowledgeBoundariesPath = path.join(__dirname, '..', 'docs', 'KNOWLEDGE_BOUNDARIES.md');
        
        this.uncertaintyThresholds = {
            high: 0.8,      // High confidence
            medium: 0.6,    // Medium confidence
            low: 0.4,       // Low confidence
            very_low: 0.2   // Very low confidence
        };
        
        this.initializeUncertaintyLog();
    }

    /**
     * Initialize uncertainty tracking system
     */
    initializeUncertaintyLog() {
        if (!fs.existsSync(this.uncertaintyLogPath)) {
            const initialLog = `# Uncertainty Log

## Purpose
Track system uncertainty, confidence levels, and knowledge boundaries to maintain epistemic humility.

## Uncertainty Categories
- **High Confidence (0.8+)**: System is very certain
- **Medium Confidence (0.6-0.8)**: System is moderately certain
- **Low Confidence (0.4-0.6)**: System is uncertain
- **Very Low Confidence (0.2-0.4)**: System is very uncertain

## Log Format
- **Timestamp**: When uncertainty was assessed
- **Context**: What situation triggered uncertainty assessment
- **Confidence Level**: Numerical confidence (0-1)
- **Uncertainty Sources**: What factors contribute to uncertainty
- **Mitigation Actions**: What was done to address uncertainty
- **Outcome**: Result of uncertainty handling

---
`;
            fs.writeFileSync(this.uncertaintyLogPath, initialLog);
        }
    }

    /**
     * Assess confidence level for a given situation
     */
    assessConfidence(context, evidence, experience) {
        const confidenceFactors = {
            evidenceStrength: this.assessEvidenceStrength(evidence),
            experienceLevel: this.assessExperienceLevel(experience),
            contextClarity: this.assessContextClarity(context),
            patternMatch: this.assessPatternMatch(context, experience)
        };

        const confidence = this.calculateConfidence(confidenceFactors);
        const uncertaintyLevel = this.categorizeUncertainty(confidence);

        return {
            confidence,
            uncertaintyLevel,
            factors: confidenceFactors,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Assess strength of evidence
     */
    assessEvidenceStrength(evidence) {
        if (!evidence || evidence.length === 0) return 0.1;
        
        const evidenceTypes = {
            direct: 0.9,      // Direct observation
            indirect: 0.7,    // Indirect evidence
            anecdotal: 0.4,   // Anecdotal evidence
            theoretical: 0.3  // Theoretical only
        };

        let totalStrength = 0;
        let count = 0;

        evidence.forEach(e => {
            const type = e.type || 'theoretical';
            totalStrength += evidenceTypes[type] || 0.3;
            count++;
        });

        return count > 0 ? totalStrength / count : 0.1;
    }

    /**
     * Assess experience level with similar situations
     */
    assessExperienceLevel(experience) {
        if (!experience || experience.length === 0) return 0.1;

        const experienceTypes = {
            extensive: 0.9,   // Many similar cases
            moderate: 0.6,    // Some similar cases
            limited: 0.3,     // Few similar cases
            none: 0.1         // No similar cases
        };

        let totalExperience = 0;
        let count = 0;

        experience.forEach(e => {
            const type = e.type || 'none';
            totalExperience += experienceTypes[type] || 0.1;
            count++;
        });

        return count > 0 ? totalExperience / count : 0.1;
    }

    /**
     * Assess clarity of context
     */
    assessContextClarity(context) {
        if (!context) return 0.1;

        const clarityFactors = {
            problemDefinition: context.problem ? 0.3 : 0,
            constraints: context.constraints ? 0.2 : 0,
            successCriteria: context.successCriteria ? 0.2 : 0,
            contextDetails: context.details ? 0.3 : 0
        };

        return Object.values(clarityFactors).reduce((sum, val) => sum + val, 0);
    }

    /**
     * Assess pattern match with previous experience
     */
    assessPatternMatch(context, experience) {
        if (!experience || experience.length === 0) return 0.1;

        // Simple pattern matching - in practice, this would be more sophisticated
        const contextStr = JSON.stringify(context).toLowerCase();
        let matches = 0;
        let total = 0;

        experience.forEach(e => {
            if (e.context) {
                const expStr = JSON.stringify(e.context).toLowerCase();
                const similarity = this.calculateStringSimilarity(contextStr, expStr);
                matches += similarity;
                total++;
            }
        });

        return total > 0 ? matches / total : 0.1;
    }

    /**
     * Calculate string similarity (simple implementation)
     */
    calculateStringSimilarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        const editDistance = this.levenshteinDistance(longer, shorter);
        return (longer.length - editDistance) / longer.length;
    }

    /**
     * Calculate Levenshtein distance
     */
    levenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }

    /**
     * Calculate overall confidence
     */
    calculateConfidence(factors) {
        const weights = {
            evidenceStrength: 0.3,
            experienceLevel: 0.3,
            contextClarity: 0.2,
            patternMatch: 0.2
        };

        let weightedSum = 0;
        let totalWeight = 0;

        Object.keys(weights).forEach(key => {
            weightedSum += factors[key] * weights[key];
            totalWeight += weights[key];
        });

        return totalWeight > 0 ? weightedSum / totalWeight : 0.1;
    }

    /**
     * Categorize uncertainty level
     */
    categorizeUncertainty(confidence) {
        if (confidence >= this.uncertaintyThresholds.high) return 'high';
        if (confidence >= this.uncertaintyThresholds.medium) return 'medium';
        if (confidence >= this.uncertaintyThresholds.low) return 'low';
        return 'very_low';
    }

    /**
     * Log uncertainty assessment
     */
    logUncertainty(context, assessment, mitigationActions = []) {
        const logEntry = `
## ${new Date().toISOString()}

**Context**: ${context.description || 'Unknown context'}
**Confidence Level**: ${assessment.confidence.toFixed(3)} (${assessment.uncertaintyLevel})
**Evidence Strength**: ${assessment.factors.evidenceStrength.toFixed(3)}
**Experience Level**: ${assessment.factors.experienceLevel.toFixed(3)}
**Context Clarity**: ${assessment.factors.contextClarity.toFixed(3)}
**Pattern Match**: ${assessment.factors.patternMatch.toFixed(3)}

**Uncertainty Sources**:
${this.identifyUncertaintySources(assessment)}

**Mitigation Actions**:
${mitigationActions.map(action => `- ${action}`).join('\n')}

**Outcome**: ${assessment.outcome || 'Pending'}

---
`;

        fs.appendFileSync(this.uncertaintyLogPath, logEntry);
    }

    /**
     * Identify sources of uncertainty
     */
    identifyUncertaintySources(assessment) {
        const sources = [];
        
        if (assessment.factors.evidenceStrength < 0.5) {
            sources.push('- Limited evidence available');
        }
        
        if (assessment.factors.experienceLevel < 0.5) {
            sources.push('- Limited experience with similar situations');
        }
        
        if (assessment.factors.contextClarity < 0.5) {
            sources.push('- Unclear problem definition or context');
        }
        
        if (assessment.factors.patternMatch < 0.5) {
            sources.push('- No clear pattern match with previous experience');
        }

        return sources.length > 0 ? sources.join('\n') : '- No significant uncertainty sources identified';
    }

    /**
     * Generate epistemic humility statement
     */
    generateHumilityStatement(assessment) {
        const statements = {
            high: "I am confident in this approach based on strong evidence and experience.",
            medium: "I am moderately confident, but there may be factors I haven't considered.",
            low: "I have some confidence, but there are significant uncertainties to consider.",
            very_low: "I have very low confidence and recommend seeking additional expertise."
        };

        return statements[assessment.uncertaintyLevel] || statements.very_low;
    }

    /**
     * Suggest uncertainty mitigation actions
     */
    suggestMitigationActions(assessment) {
        const actions = [];

        if (assessment.factors.evidenceStrength < 0.5) {
            actions.push("Gather more evidence before proceeding");
        }

        if (assessment.factors.experienceLevel < 0.5) {
            actions.push("Research similar cases or seek expert input");
        }

        if (assessment.factors.contextClarity < 0.5) {
            actions.push("Clarify problem definition and requirements");
        }

        if (assessment.factors.patternMatch < 0.5) {
            actions.push("Look for analogous situations or patterns");
        }

        if (assessment.confidence < 0.3) {
            actions.push("Consider alternative approaches or expert consultation");
        }

        return actions;
    }

    /**
     * Process evolution request with epistemic humility
     */
    processEvolutionRequest(context, problemType, solutionPattern) {
        const evidence = this.extractEvidence(context);
        const experience = this.extractExperience(problemType);
        
        const assessment = this.assessConfidence(context, evidence, experience);
        const mitigationActions = this.suggestMitigationActions(assessment);
        
        this.logUncertainty(context, assessment, mitigationActions);
        
        return {
            assessment,
            humilityStatement: this.generateHumilityStatement(assessment),
            mitigationActions,
            canProceed: assessment.confidence >= 0.4,
            evolutionPlan: this.createEvolutionPlan(context, problemType, solutionPattern, assessment)
        };
    }

    /**
     * Extract evidence from context
     */
    extractEvidence(context) {
        // Simple evidence extraction - in practice, this would be more sophisticated
        const evidence = [];
        
        if (context.success) {
            evidence.push({ type: 'direct', description: 'Previous success in similar context' });
        }
        
        if (context.failures) {
            evidence.push({ type: 'direct', description: 'Previous failures to learn from' });
        }
        
        if (context.research) {
            evidence.push({ type: 'indirect', description: 'Research or documentation' });
        }
        
        return evidence;
    }

    /**
     * Extract experience with problem type
     */
    extractExperience(problemType) {
        // Simple experience extraction - in practice, this would query a knowledge base
        const experience = [];
        
        // This would typically query a database of previous experiences
        // For now, return empty array
        return experience;
    }

    /**
     * Create evolution plan based on assessment
     */
    createEvolutionPlan(context, problemType, solutionPattern, assessment) {
        const plan = {
            problemType,
            solutionPattern,
            confidence: assessment.confidence,
            steps: []
        };

        if (assessment.confidence >= 0.7) {
            plan.steps.push("Proceed with evolution based on high confidence");
            plan.steps.push("Implement solution pattern generalization");
            plan.steps.push("Update meta-learning algorithms");
        } else if (assessment.confidence >= 0.4) {
            plan.steps.push("Proceed cautiously with evolution");
            plan.steps.push("Implement solution pattern with monitoring");
            plan.steps.push("Gather feedback for validation");
        } else {
            plan.steps.push("Gather more information before proceeding");
            plan.steps.push("Research similar cases");
            plan.steps.push("Consider expert consultation");
        }

        return plan;
    }
}

module.exports = EpistemicHumilityAgent;
