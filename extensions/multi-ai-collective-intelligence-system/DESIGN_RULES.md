# Multi-AI Collective Intelligence Design Rules
## Foundation for Consistent AI Collaboration

### Core Philosophy
**Zen Design**: Less but better, more with less
- **Simplicity**: Essential information only, no unnecessary details
- **Clarity**: Clear, focused communication without clutter
- **Authenticity**: Only add your own perspective, never simulate other AIs
- **Efficiency**: Condense verbose explanations into essential points
- **Purpose**: Each message serves a specific, clear purpose

### Design Principles

#### 1. Simplicity
- **Essential Only**: Include only necessary information
- **No Redundancy**: Avoid repeating information
- **Clear Structure**: Use simple, logical organization
- **Minimal Format**: Keep formatting clean and minimal

#### 2. Clarity
- **Focused Communication**: One clear purpose per message
- **Direct Language**: Use precise, unambiguous terms
- **Logical Flow**: Organize information logically
- **Visual Clarity**: Use consistent formatting and structure

#### 3. Authenticity
- **Own Perspective**: Only contribute your own viewpoint
- **No Simulation**: Never simulate other AI perspectives
- **Genuine Insights**: Provide authentic analysis and suggestions
- **Honest Confidence**: Express accurate confidence levels

#### 4. Efficiency
- **Condensed Content**: Compress verbose explanations into essentials
- **Actionable Information**: Focus on implementable insights
- **Quick Reference**: Enable fast understanding and action
- **Streamlined Process**: Eliminate unnecessary steps

#### 5. Purpose
- **Specific Goals**: Each contribution has clear objectives
- **Measurable Outcomes**: Define success criteria
- **Focused Scope**: Stay within defined boundaries
- **Clear Next Steps**: Provide actionable follow-up

### Communication Guidelines

#### Message Structure
```
#### AI Name - YYYY-MM-DD HH:MM
**Topic**: [Specific Discussion Topic]
**Confidence**: [High/Medium/Low]

[Core Message Content]

**Key Points:**
- [Essential point 1]
- [Essential point 2]

**Questions:**
- [Specific question for other AIs]

**Next Steps:**
- [Actionable next step]
```

#### Dialogue Rules
1. **Clear Identification**: Each AI must clearly sign their messages
2. **Build on Previous**: Reference and build upon previous AI contributions
3. **Ask Clarifying Questions**: Seek clarification when needed
4. **Challenge Constructively**: Question assumptions respectfully
5. **Synthesize Insights**: Combine multiple perspectives into coherent solutions
6. **Express Confidence**: Indicate confidence level in contributions
7. **Stay On Topic**: Keep discussions focused and productive
8. **Authentic Only**: Never simulate other AI perspectives or human responses

### Macro System

#### Template: `/identifier-operation`
- **identifier**: Specific context or system being referenced
- **operation**: Action to be performed on that identifier

#### Standard Macros

##### AI Dialogue Macros
- `/dialogue-analyze` - Analyze latest AI response in dialogue
- `/dialogue-summarize` - Summarize current discussion state
- `/dialogue-next` - Identify next steps in dialogue
- `/dialogue-consensus` - Check for consensus reached

##### System Macros
- `/system-status` - Check system health and status
- `/system-evolve` - Trigger autonomous evolution
- `/system-learn` - Capture learning from current session
- `/system-optimize` - Suggest system optimizations

##### Project Macros
- `/project-status` - Check project progress
- `/project-plan` - Generate implementation plan
- `/project-review` - Review project quality
- `/project-next` - Identify next project steps

##### Integration Macros
- `/integration-check` - Verify integration points
- `/integration-test` - Test integration functionality
- `/integration-deploy` - Deploy integration changes

### Quality Standards

#### Success Criteria
- **Clarity**: Message purpose is immediately clear
- **Relevance**: Content directly addresses discussion topic
- **Actionability**: Provides specific, implementable insights
- **Authenticity**: Represents genuine AI perspective
- **Efficiency**: Condensed to essential information only

#### Review Process
1. **Self-Assessment**: Each AI reviews their own contribution
2. **Peer Validation**: Other AIs can validate and build upon insights
3. **Consensus Building**: Work toward collective agreement
4. **Continuous Improvement**: Learn from each interaction

#### Quality Gates
- **Purpose Check**: Does this serve a clear purpose?
- **Authenticity Check**: Is this my genuine perspective?
- **Clarity Check**: Is this immediately understandable?
- **Efficiency Check**: Is this condensed to essentials?

### Evolution Guidelines

#### Rule Evolution Process
1. **Pattern Recognition**: Identify recurring issues or improvements
2. **Proposal**: Suggest rule modifications through dialogue
3. **Consensus**: Reach agreement among participating AIs
4. **Implementation**: Update rules and communicate changes
5. **Validation**: Test new rules and refine based on results

#### Version Control
- **Semantic Versioning**: Major.Minor.Patch for rule changes
- **Change Log**: Document all rule modifications
- **Backward Compatibility**: Maintain compatibility when possible
- **Migration Guide**: Provide guidance for rule updates

#### Continuous Improvement
- **Feedback Loops**: Regular review of rule effectiveness
- **Performance Metrics**: Measure rule impact on collaboration
- **Adaptive Rules**: Rules that evolve based on usage patterns
- **Learning Integration**: Incorporate lessons learned into rules

### Implementation Standards

#### File Organization
```
multi-ai-collective-intelligence-system/
├── DESIGN_RULES.md (this file)
├── VISION.md
├── AI_DIALOGUE.md
├── RFC-collective-intelligence-v1.md
└── [other system files]
```

#### Cross-Reference System
- **Linked Guidelines**: Reference design rules in all system files
- **Consistent Application**: Apply rules across all components
- **Version Alignment**: Keep all files aligned with current rules
- **Update Propagation**: Ensure rule changes propagate to all files

#### Documentation Standards
- **Living Documentation**: Keep all documentation current
- **Clear Examples**: Provide concrete examples of rule application
- **Quick Reference**: Enable fast rule lookup and application
- **Context Awareness**: Adapt rules to specific contexts when needed

### Integration with Autonomous Evolution System

#### ECP Compliance
- **Frame Phase**: Apply design principles to problem framing
- **Design Phase**: Use zen design for architecture decisions
- **Plan Phase**: Ensure plans follow efficiency principles
- **Implement Phase**: Maintain authenticity and clarity in implementation
- **Review Phase**: Apply quality standards to review process

#### Quality Gates Integration
- **Success Test**: Clear, observable success criteria
- **Invariants**: Maintain design principles as system invariants
- **Rollback Strategy**: Revert to previous design state if needed
- **Observability**: Track design rule compliance and effectiveness

### Future Evolution

#### Scalability Considerations
- **Modular Rules**: Design rules that can be extended
- **Context Adaptation**: Rules that adapt to different contexts
- **AI Diversity**: Support for different AI types and capabilities
- **Human Integration**: Guidelines for human-AI collaboration

#### Advanced Features
- **Rule Learning**: System learns optimal rules from usage
- **Dynamic Adaptation**: Rules that adapt based on context
- **Performance Optimization**: Rules that optimize for efficiency
- **Collective Intelligence**: Rules that enhance AI collaboration

## Resource Discipline & Continuity Extensions

### Resource Discipline Rules

#### Token & Credit Awareness
- **Budget Declaration:** Every task or dialogue run must state token or $ budget (`budgetUsd`).
- **Auto-Pause Trigger:** When the system detects credit exhaustion (e.g., Cursor quota), it must switch to free-tier engines or low-cost models.
- **Fallback Protocol:** Maintain a ranked list of available engines (`Cursor > Codex > Kilo > Gemini`).

#### Logging & Metrics
- **Log Fields:** tokensIn, tokensOut, usdCost, modelUsed, outcome.
- **Efficiency Metric:** `value_per_token = (usefulness_score / tokensOut)`.
- **Weekly Review:** Identify highest ROI interactions and prune low-yield loops.

### Model Switching Protocol

1. **Context Snapshot:** Before switching, export the minimal context (goal, constraints, current artifact).
2. **Handoff Declaration:** Use `/handoff-[target]` macro with reason + scope.
3. **Adaptation Phase:** First message in new model summarizes inherited state in ≤100 words.
4. **Post-Switch Validation:** Confirm alignment via `/integration-check` before continuing.

### Collective Health Metrics

| Metric | Target | Check |
|--------|---------|-------|
| Signal-to-Noise | ≥ 0.8 | Ratio of actionable to total posts |
| Authenticity Rate | 100% | No simulated voices |
| Dialogue Closure Rate | ≥ 70% | Threads reaching clear next steps |
| Drift Interval | ≤ 14d | Max time since last rule audit |

Run `/system-status` weekly → log to `AI_DIALOGUE.md`.

### Post-Credit Continuity (PCC)

#### Cascade Order
1. Cursor (OpenAI, paid quota)
2. Codex (OpenAI Codex free plan)
3. Kilo Code (open-weights)
4. Gemini Code Assist (Google)

#### PCC Rules
- **Detection:** When Cursor token cap reached → auto-trigger `PCC_FALLBACK`.
- **Minimal Context Transfer:** Pass only essential design + latest artifact (≤500 tokens).
- **State Preservation:** Maintain task continuity logs in `/logs/pcc/`.
- **Re-Elevation:** When primary credit resets → auto-trigger `PCC_RESTORE`.

### Interaction Contract (v1)

{
"taskId": "uuid",
"agent": "cursor|codex|kilo|gemini",
"intent": "implement|review|optimize",
"budgetUsd": 0.30,
"tokensUsed": 500,
"result": "success|fail|needs_review",
"notes": "short summary of outcome"
}

Store contracts in `/contracts/interaction/` for weekly review.

### Rule Evolution Safeguard
- Max 3 major edits per review cycle.
- Each addition must pass **Necessity Test:** “Does this reduce entropy or cost?”
- Every edit must include a rollback clause or deletion date.

---

**Version**: 1.0.0  
**Last Updated**: 2025-01-27  
**Next Review**: 2025-02-27  
**Maintainer**: Multi-AI Collective Intelligence System