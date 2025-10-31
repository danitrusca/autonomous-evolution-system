# Developer Q&A - Common Questions When Working on the Autonomous Evolution System

> **Purpose**: This document captures frequently asked questions and their answers that arise when working on the autonomous evolution system. Use this as a reference when making architectural decisions, adding features, or understanding system behavior.
> 
> **Integration**: This Q&A integrates with the Meta-Learning Agent to track question frequency and suggest relevant answers. The system can learn from these patterns to improve autonomous decision-making.

---

## 🔍 **Quick Index** (Search by Keyword)

**Architecture**: Rule vs Skill vs Agent, Core vs Extension, Harmonic Proportion, Three-Layer Architecture  
**Evolution**: Autonomous Evolution, Pattern Detection, Learning Patterns, Evolution Journal  
**Integration**: Agent Communication, Skill-Agent Integration, Extension Loading, Coordination  
**Principles**: Principles Engine, Decision Making, Quality Gates, ECP Protocol  
**Anti-Patterns**: Over-Engineering, Complexity Explosion, Skill Sprawl, Abstraction Leakage  
**Testing**: Agent Testing, Invariants, Health Checks, Debugging  
**Workflow**: ECP Protocol, Commits, Documentation, Feature Development  

---

## 🏗️ **Architecture & Design Decisions**

### Q: Should this be a Rule, Skill, or Agent?

**Confidence**: ⭐⭐⭐⭐⭐ (High - Core architectural principle)

**A**: Follow this decision tree:

- **Rule**: If it's a **principle, protocol, or invariant** that guides behavior
  - Examples: ECP protocol, quality gates, build-anything framework
  - Lives in: `rules/` directory
  - Characteristics: Static, declarative, principle-based

- **Skill**: If it's a **capability or reusable operation** the system can perform
  - Examples: Code generation, refactoring, testing
  - Lives in: `skills/` directory (`.md` definition + `.js` implementation)
  - Characteristics: Executable, composable, has inputs/outputs

- **Agent**: If it needs **autonomous monitoring, decision-making, or coordination**
  - Examples: System Integrity Agent, Idea Capture Agent, Meta-Learning Agent
  - Lives in: `agents/` directory
  - Characteristics: Active, autonomous, stateful, coordinates with others

**When in doubt**: Start as a Skill. If it needs to monitor or act autonomously, elevate it to an Agent. If it's a guiding principle, make it a Rule.

**Related Patterns**: See [LEARNING_PATTERNS.md](../living/LEARNING_PATTERNS.md) - Pattern 2: ECP-Driven Development  
**See Also**: [CORE_ARCHITECTURE.md](../system/CORE_ARCHITECTURE.md), [AGENT_SYSTEM_OVERVIEW.md](../agents/AGENT_SYSTEM_OVERVIEW.md)

---

### Q: Should this functionality be in Core or an Extension?

**Confidence**: ⭐⭐⭐⭐⭐ (High - Clear distinction)

**A**: Core if it's **essential for system operation**. Extension if it's **optional or domain-specific**.

- **Core** (`autonomous-evolution-engine.js`, `agents/`, `skills/`, `rules/`):
  - Essential for system to function
  - Used by multiple components
  - Fundamental to autonomous evolution
  - Examples: System Integrity Agent, Principles Engine, ECP Protocol

- **Extension** (`extensions/`):
  - Optional functionality
  - Domain-specific (e.g., market intelligence)
  - Can be loaded/unloaded without breaking core
  - Examples: Market Intelligence Extension, Token Saver

**Test**: If removing it breaks core system → Core. If system works without it → Extension.

**Anti-Pattern**: ❌ **Core Creep** - Adding domain-specific functionality to core. Always use extensions for optional features.

**See Also**: [EXTENSION_LOADER.md](../system/EXTENSION_LOADER.md), [EXTENSION_ARCHITECTURE.md](../../EXTENSION_ARCHITECTURE.md)

---

### Q: How do I know when to create a new Agent vs extending an existing one?

**Confidence**: ⭐⭐⭐⭐ (High - Based on Single Responsibility Principle)

**A**: Create a new Agent when:

1. **Distinct responsibility**: Handles a fundamentally different concern
   - Example: Idea Capture vs System Integrity (different domains)

2. **Independent lifecycle**: Can operate and be tested independently
   - Example: Meta-Learning Agent can learn without Idea Capture Agent

3. **Different coordination needs**: Requires different integration points
   - Example: Documentation Updater coordinates with docs, Meta-Orchestrator coordinates with Rules/Skills/Agents

**Extend existing Agent when**:
- Adding capabilities within the same responsibility domain
- Enhancing existing functionality
- The new feature is tightly coupled to existing agent logic

**Anti-Pattern**: ❌ **God Agent** - One agent handling too many responsibilities. Split into focused agents.

**See Also**: [AGENT_DEVELOPMENT_GUIDE.md](../agents/AGENT_DEVELOPMENT_GUIDE.md), [COORDINATION_PATTERNS.md](../agents/COORDINATION_PATTERNS.md)

---

## 🔄 **Evolution & Learning**

### Q: When should I trigger autonomous evolution vs manual changes?

**Confidence**: ⭐⭐⭐⭐ (High - Based on evolution trigger patterns)

**A**: The system triggers evolution automatically when:
- **Pattern detected**: Repetitive success patterns emerge
- **Friction encountered**: System struggles with recurring issues
- **Success amplification**: A pattern proves highly effective
- **Capability gap**: System identifies missing capabilities
- **Performance degradation**: System performance decreases
- **Learning stagnation**: No new learning for extended period
- **System drift**: System drifts from coherence

**Manual intervention needed when**:
- Architectural decisions requiring human judgment
- External requirements change
- Major refactoring needed
- Breaking changes to core protocols

**Related Patterns**: See [LEARNING_PATTERNS.md](../living/LEARNING_PATTERNS.md) - Pattern 1: Autonomous Versioning Learning  
**See Also**: [EVOLUTION_SYSTEM.md](../system/EVOLUTION_SYSTEM.md), [AUTONOMOUS_EVOLUTION_ENGINE.md](../system/AUTONOMOUS_EVOLUTION_ENGINE.md)

---

### Q: How do evolution questions relate to actual implementation?

**Confidence**: ⭐⭐⭐⭐⭐ (High - Core system behavior)

**A**: Evolution questions drive **meta-cognitive reflection**:

1. **Question asked** (e.g., "What capabilities am I missing?")
2. **State assessment** → Identifies gaps/opportunities
3. **Opportunity analysis** → Maps questions to actionable opportunities
4. **Action proposal** → Creates concrete implementation steps
5. **Execution** → Implements the changes
6. **Learning capture** → Records what worked in EVOLUTION_JOURNAL.md

The questions are **trigger mechanisms** - they activate the evolution pipeline, but implementation follows standard ECP protocol.

**Related Patterns**: See [LEARNING_PATTERNS.md](../living/LEARNING_PATTERNS.md) - Pattern 3: Agent Coordination Learning  
**See Also**: [EVOLUTION_JOURNAL.md](../living/EVOLUTION_JOURNAL.md) for specific examples

---

### Q: Should this pattern go into LEARNING_PATTERNS.md or EVOLUTION_JOURNAL.md?

**Confidence**: ⭐⭐⭐⭐⭐ (High - Clear distinction)

**A**: 

- **LEARNING_PATTERNS.md** (`docs/living/LEARNING_PATTERNS.md`):
  - **Generalizable patterns** extracted from specific experiences
  - Reusable solutions to common problems
  - Pattern templates that can be applied broadly
  - Example: "When refactoring complex modules, extract interfaces first"
  - **Confidence scores** indicate pattern reliability
  - **Evolution tracking** shows how patterns improve

- **EVOLUTION_JOURNAL.md** (`docs/living/EVOLUTION_JOURNAL.md`):
  - **Specific evolution events** with timestamps
  - What the system learned in a particular instance
  - Concrete examples of pattern application
  - Example: "2024-01-15 - Refactored user authentication module using interface-first pattern"
  - **Historical record** of system evolution
  - **Learning entries** with outcomes and insights

**Rule of thumb**: If it can be applied to future similar situations → LEARNING_PATTERNS. If it's a specific historical event → EVOLUTION_JOURNAL.

**Anti-Pattern**: ❌ **Pattern Bloat** - Adding every observation as a pattern. Only add patterns with evidence and reusability.

---

## 🔌 **Integration & Coordination**

### Q: How do Agents communicate with each other?

**Confidence**: ⭐⭐⭐⭐ (High - Current implementation, may evolve)

**A**: Through the **Agent Coordinator** and direct method calls:

1. **Direct method calls**: Agents expose public methods
   ```javascript
   const ideaCaptureAgent = new IdeaCaptureAgent();
   const idea = await ideaCaptureAgent.captureUserIdea(input);
   ```

2. **Shared state**: Through Autonomous Evolution Engine
   ```javascript
   // Engine coordinates agents
   await engine.captureIdea(data); // Routes to IdeaCaptureAgent
   ```

3. **Event-based**: Agents emit events that others can listen to
   - Currently implicit through engine coordination
   - Future: Explicit event system for loose coupling

**Best practice**: Access agents through the Engine for coordination benefits.

**Anti-Pattern**: ❌ **Tight Coupling** - Agents calling each other directly without coordination. Always route through Engine.

**Related Patterns**: See [LEARNING_PATTERNS.md](../living/LEARNING_PATTERNS.md) - Pattern 3: Agent Coordination Learning  
**See Also**: [COORDINATION_PATTERNS.md](../agents/COORDINATION_PATTERNS.md)

---

### Q: How do Skills integrate with Agents?

**Confidence**: ⭐⭐⭐⭐⭐ (High - Core architectural pattern)

**A**: Skills are **capabilities** that Agents can **orchestrate**:

- **Skills** provide **what** can be done (operations, transformations)
- **Agents** provide **when** and **why** to do it (autonomous decisions)

Example:
- **Skill**: `code-refactoring-skill.js` - Knows HOW to refactor code
- **Agent**: System Integrity Agent - Knows WHEN refactoring is needed
- **Integration**: Agent detects complexity, calls Skill to refactor

**Pattern**: Agent monitors → detects need → calls Skill → observes results → learns.

**Anti-Pattern**: ❌ **Skill Autonomy** - Skills making autonomous decisions. Skills should be orchestrated by Agents.

**See Also**: [SKILLS_README.md](../skills/README.md), [AGENT_SYSTEM_OVERVIEW.md](../agents/AGENT_SYSTEM_OVERVIEW.md)

---

### Q: How do Extensions integrate with Core System?

**Confidence**: ⭐⭐⭐⭐ (High - Well-defined extension protocol)

**A**: Through the **Extension Loader**:

1. **Discovery**: Extension Loader scans `extensions/` directory
2. **Loading**: Loads extension configuration from `extension-config.json`
3. **Initialization**: Calls extension's `initialize()` method
4. **Registration**: Registers extension with Engine via `getExtension(name)`
5. **Access**: Core system and other components access via `engine.getExtension('extension-name')`

**Key points**:
- Extensions are **optional** - core works without them
- Extensions can access core (one-way dependency)
- Extensions are **sandboxed** - failures don't crash core
- Extensions can expose APIs to other extensions

**Anti-Pattern**: ❌ **Extension Coupling** - Extensions depending on each other. Keep extensions independent.

**See Also**: [EXTENSION_LOADER.md](../system/EXTENSION_LOADER.md), [EXTENSION_ARCHITECTURE.md](../../EXTENSION_ARCHITECTURE.md)

---

## 🎯 **Principles & Decision Making**

### Q: Should I check the Principles Library before making a decision?

**Confidence**: ⭐⭐⭐⭐ (High - Evidence-based decision making)

**A**: Yes, for **architectural or design decisions**. Use Principles Engine:

```javascript
const PrinciplesEngine = require('./agents/principles-engine');
const engine = new PrinciplesEngine();

// Get principles relevant to your decision
const principles = engine.suggestPrinciples(
  'I need to refactor a complex module with many dependencies'
);
```

**When to use**:
- Major architectural changes
- Design pattern selection
- Trade-off decisions (simplicity vs. flexibility)
- Quality gate questions

**When not needed**:
- Trivial implementation details
- Straightforward code fixes
- Obvious technical choices

**Anti-Pattern**: ❌ **Principle Ignorance** - Making major decisions without consulting principles. Always check for high-confidence principles.

**See Also**: [PRINCIPLES_ENGINE.md](../agents/PRINCIPLES_ENGINE.md), [PRINCIPLES_LIBRARY.md](./PRINCIPLES_LIBRARY.md)

---

### Q: How do I know if a change maintains "harmonic proportion"?

**Confidence**: ⭐⭐⭐ (Moderate - Subjective but monitored)

**A**: The **Meta-Orchestrator** monitors this, but you can manually check:

1. **Rules Layer**: Are rules still clear and non-contradictory?
2. **Skills Layer**: Are skills balanced in complexity and coverage?
3. **Agents Layer**: Are agents coordinating without conflicts?
4. **Proportions**: No single layer should dominate (all should be active)

**Red flags**:
- Adding many Skills but no Rules/Agents (Skills dominate)
- Creating many Agents but no Skills (Orchestration without capability)
- Adding Rules without implementing them (Rules dominate)

**Ideal**: Each layer evolves proportionally - rules guide, skills execute, agents coordinate.

**Anti-Pattern**: ❌ **Layer Imbalance** - One layer growing much faster than others. Meta-Orchestrator should detect and warn.

**See Also**: [META_ORCHESTRATOR.md](../agents/META_ORCHESTRATOR.md), [REFLEXIVE_ECOSYSTEM.md](../system/REFLEXIVE_ECOSYSTEM.md)

---

## 📝 **Documentation & Code Organization**

### Q: Where should I document this feature?

**Confidence**: ⭐⭐⭐⭐⭐ (High - Clear documentation structure)

**A**: Follow the documentation structure:

1. **Implementation docs** (`docs/agents/`, `docs/skills/`, `docs/system/`):
   - How it works, API reference, examples
   - One doc per major component

2. **Living docs** (`docs/living/`):
   - Evolution Journal: Specific evolution events
   - Learning Patterns: Generalizable patterns

3. **Reference docs** (`docs/reference/`):
   - Principles Library, Configuration Guide, this Q&A
   - Cross-cutting concerns

4. **Code comments**:
   - JSDoc for public APIs
   - Inline comments for complex logic

**Rule**: If it's a component → component docs. If it's learning → living docs. If it's reference → reference docs.

**Anti-Pattern**: ❌ **Documentation Drift** - Documentation not matching code. Documentation Updater Agent should prevent this.

**See Also**: [DOCUMENTATION_UPDATER.md](../agents/DOCUMENTATION_UPDATER.md), [NAVIGATION.md](../NAVIGATION.md)

---

### Q: When should I update documentation vs when does Documentation Updater Agent handle it?

**Confidence**: ⭐⭐⭐⭐ (High - Clear separation of concerns)

**A**: 

**Documentation Updater Agent handles**:
- Code → documentation sync
- API changes reflected in docs
- Cross-references between docs
- Coverage reports

**You should manually update**:
- Architecture decisions and rationale
- Design patterns and principles
- Evolution journal entries (though system can suggest)
- This Q&A document

**Best practice**: Write good code comments, let agent sync technical docs. Manually document decisions and rationale.

**Anti-Pattern**: ❌ **Automation Overload** - Expecting agent to document everything. Manual documentation needed for decisions and rationale.

**See Also**: [DOCUMENTATION_UPDATER.md](../agents/DOCUMENTATION_UPDATER.md)

---

## 🧪 **Testing & Validation**

### Q: How do I test an Agent?

**Confidence**: ⭐⭐⭐⭐ (High - Standard testing pattern)

**A**: Create a test file in root (e.g., `test-<agent-name>.js`):

```javascript
const Agent = require('./agents/agent-name');
const agent = new Agent();

// Test initialization
console.log('Agent status:', agent.getAgentStatus());

// Test core functionality
const result = await agent.coreMethod(testData);
console.log('Result:', result);

// Verify invariants
assert(result.meetsInvariant(), 'Invariant violated');
```

**Test patterns**:
- Initialization and status
- Core functionality with sample data
- Error handling
- Integration with other agents (if applicable)

**Anti-Pattern**: ❌ **Test Isolation Failure** - Tests requiring full system setup. Test agents independently.

**See Also**: [AGENT_DEVELOPMENT_GUIDE.md](../agents/AGENT_DEVELOPMENT_GUIDE.md)

---

### Q: What are "invariants" and how do I define them?

**Confidence**: ⭐⭐⭐⭐⭐ (High - Core system concept)

**A**: Invariants are **guarantees** that must always hold:

**Format**:
```javascript
/**
 * Invariant: [What must always be true]
 */
```

**Examples**:
- `Invariant: All principles must have confidence 0-1`
- `Invariant: Extensions must not crash core system`
- `Invariant: Agents must report status within 5 seconds`

**Testing**: Check invariants in tests and error handlers. System Integrity Agent monitors them.

**Anti-Pattern**: ❌ **Weak Invariants** - Vague or unverifiable invariants. Make invariants specific and testable.

**See Also**: [SYSTEM_INTEGRITY_AGENT.md](../agents/SYSTEM_INTEGRITY_AGENT.md)

---

## 🚀 **Development Workflow**

### Q: What's the workflow for adding a new feature?

**Confidence**: ⭐⭐⭐⭐⭐ (High - ECP Protocol is core methodology)

**A**: Follow ECP Protocol:

1. **Frame** (`/frame`): Understand what you're building
   - What problem does it solve?
   - Who benefits?
   - What are constraints?

2. **Design** (`/design`): Design the solution
   - Architecture decisions
   - Integration points
   - Dependencies

3. **Plan** (`/plan`): Break into small commits
   - ≤150 LOC per commit
   - Define invariants
   - Success tests
   - Rollback strategy

4. **Implement** (`/implement`): Build it
   - Follow quality gates
   - Add observability
   - Test as you go

5. **Review** (`/review`): Validate and learn
   - Check all requirements met
   - Capture learning in journal
   - Update documentation

**Related Patterns**: See [LEARNING_PATTERNS.md](../living/LEARNING_PATTERNS.md) - Pattern 2: ECP-Driven Development  
**Anti-Pattern**: ❌ **Skip Steps** - Jumping to implementation without Frame/Design/Plan. Always follow ECP protocol.

**See Also**: [ECP Protocol](../../commands/ecp.md), [META_CODING_ARCHITECTURE.md](../system/META_CODING_ARCHITECTURE.md)

---

### Q: When should I commit vs when should the system handle versioning?

**Confidence**: ⭐⭐⭐⭐ (High - Clear separation)

**A**: 

**You commit**:
- Feature implementations
- Bug fixes
- Documentation updates
- Configuration changes

**Autonomous Versioning Agent handles**:
- Semantic versioning based on commit analysis
- Version number updates
- CHANGELOG generation
- Release notes

**Pattern**: You make commits, Agent analyzes and versions.

**Anti-Pattern**: ❌ **Manual Versioning** - Manually updating version numbers. Let Autonomous Versioning Agent handle it.

**See Also**: [AUTONOMOUS_VERSIONING_SYSTEM.md](../agents/AUTONOMOUS_VERSIONING_SYSTEM.md)

---

## 🐛 **Debugging & Troubleshooting**

### Q: How do I debug Agent coordination issues?

**Confidence**: ⭐⭐⭐⭐ (High - Standard debugging approach)

**A**: 

1. **Check Agent Status**:
   ```javascript
   const engine = new AutonomousEvolutionEngine();
   console.log('System Integrity:', engine.getSystemIntegrityStatus());
   console.log('Idea Capture:', engine.getIdeaCaptureStatus());
   ```

2. **Review Logs**: Look for `[autonomous-evolution]` or `[agent-name]` prefixes

3. **Check Dependencies**: Verify all required agents initialized

4. **Test Isolation**: Test each agent independently

5. **Check Extension Config**: Ensure `extension-config.json` is valid

**Anti-Pattern**: ❌ **Debugging Without Isolation** - Testing with full system when issue is in one agent. Always isolate first.

**See Also**: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md), [COORDINATION_PATTERNS.md](../agents/COORDINATION_PATTERNS.md)

---

### Q: How do I know if the system is working correctly?

**Confidence**: ⭐⭐⭐⭐ (High - Standard health check pattern)

**A**: Run system health checks:

```javascript
// System Integrity Scan
await engine.performSystemIntegrityScan();

// Generate reports
await engine.generateSystemIntegrityReport();
const ideaReport = await engine.generateIdeaReport();

// Check evolution status
const status = engine.getEvolutionStatus();
```

**Health indicators**:
- All agents initialized and reporting status
- No complexity issues detected
- Learning patterns being captured
- Evolution history growing
- No error patterns in logs

**Anti-Pattern**: ❌ **Ignoring Health Checks** - Not monitoring system health. Regular health checks prevent issues.

**See Also**: [SYSTEM_INTEGRITY_AGENT.md](../agents/SYSTEM_INTEGRITY_AGENT.md), [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 💡 **Common Patterns & Gotchas**

### Q: Why does my Skill not appear in skill discovery?

**Confidence**: ⭐⭐⭐ (Moderate - Common issue, multiple causes)

**A**: Check:

1. **File location**: Must be in `skills/` directory
2. **Naming**: Should match skill name in metadata
3. **Metadata format**: Must have required fields (name, description, inputs, outputs)
4. **Registration**: Skills are auto-discovered, but check if discovery system is running

**Anti-Pattern**: ❌ **Skill Discovery Failure** - Not checking skill metadata format. Always verify required fields.

**See Also**: [SKILLS_README.md](../skills/README.md)

---

### Q: Why is my Extension not loading?

**Confidence**: ⭐⭐⭐ (Moderate - Common issue, multiple causes)

**A**: Check:

1. **Configuration**: Listed in `extension-config.json`?
2. **Directory structure**: Follows extension structure?
3. **Initialization**: Has `initialize()` method?
4. **Dependencies**: All dependencies installed?
5. **Errors**: Check Extension Loader logs

**Anti-Pattern**: ❌ **Extension Loading Failure** - Not checking extension-config.json. Always verify configuration first.

**See Also**: [EXTENSION_LOADER.md](../system/EXTENSION_LOADER.md)

---

### Q: How do I know if I'm over-engineering?

**Confidence**: ⭐⭐⭐⭐ (High - Based on Simplicity Principle)

**A**: Apply **Simplicity Principle**:

- **Is this the simplest solution?** If not, simplify
- **Can I explain this clearly?** If not, it may be too complex
- **Does this provide clear user value?** If not, remove it
- **Complexity gate**: System tracks complexity - check with System Integrity Agent

**Red flags**:
- Abstraction for abstraction's sake
- Too many layers of indirection
- Hard to explain to someone else
- System Integrity Agent reports high complexity

**Related Patterns**: See [LEARNING_PATTERNS.md](../living/LEARNING_PATTERNS.md) - Pattern 4: Simple Solution Preference  
**See Also**: [system-evolution-addressing-weaknesses.md](../skills/meta/system-evolution-addressing-weaknesses.md)

---

## 🚨 **Anti-Patterns to Avoid**

### ❌ **Complexity Explosion**

**Problem**: System becomes too complex to understand or maintain  
**Symptoms**: 
- Cognitive overload
- Debugging nightmares
- Maintenance burden
- High complexity scores from System Integrity Agent

**Solution**: 
- Apply Simplicity Principle
- Use complexity gates
- Refactor when complexity exceeds thresholds
- Consolidate overlapping functionality

**Related**: [system-evolution-addressing-weaknesses.md](../skills/meta/system-evolution-addressing-weaknesses.md)

---

### ❌ **Over-Engineering Trap**

**Problem**: Perfect in theory but overwhelming in practice  
**Symptoms**:
- Analysis paralysis
- Decision fatigue
- Steep learning curve
- Features that are hard to use

**Solution**:
- Focus on core functionality
- Start simple, add complexity only when needed
- Use user feedback to guide complexity
- Apply "Can I explain this clearly?" test

**Related Patterns**: See [LEARNING_PATTERNS.md](../living/LEARNING_PATTERNS.md) - Pattern 4: Simple Solution Preference

---

### ❌ **Skill Sprawl**

**Problem**: Skills multiply without clear organization or purpose  
**Symptoms**:
- Duplication
- Conflicts
- Obsolescence
- Unclear boundaries

**Solution**:
- Enhanced quality gates with skill consolidation
- Regular skill audits
- Merge overlapping skills
- Clear skill categorization

**Related**: [system-evolution-addressing-weaknesses.md](../skills/meta/system-evolution-addressing-weaknesses.md)

---

### ❌ **Abstraction Leakage**

**Problem**: System behavior becomes unpredictable and untrustworthy  
**Symptoms**:
- Hidden complexity
- Magic behavior
- Debugging difficulty
- Unpredictable outcomes

**Solution**:
- Transparency System with full explainability
- Comprehensive logging
- Clear documentation
- Expose internal state when helpful

**Related**: [system-evolution-addressing-weaknesses.md](../skills/meta/system-evolution-addressing-weaknesses.md)

---

### ❌ **God Agent**

**Problem**: One agent handling too many responsibilities  
**Symptoms**:
- Agent doing everything
- Hard to test
- Tight coupling
- Violates Single Responsibility Principle

**Solution**:
- Split into focused agents
- One responsibility per agent
- Clear agent boundaries
- Agent coordination for complex operations

**Related**: [AGENT_DEVELOPMENT_GUIDE.md](../agents/AGENT_DEVELOPMENT_GUIDE.md)

---

### ❌ **Core Creep**

**Problem**: Adding domain-specific functionality to core  
**Symptoms**:
- Core system bloated with optional features
- Tight coupling to domain-specific code
- Hard to maintain core simplicity

**Solution**:
- Use extensions for optional features
- Keep core essential and minimal
- Domain-specific code goes in extensions
- Core should work without any extensions

**Related**: [EXTENSION_ARCHITECTURE.md](../../EXTENSION_ARCHITECTURE.md)

---

### ❌ **Documentation Drift**

**Problem**: Documentation not matching code  
**Symptoms**:
- Outdated examples
- API docs don't match implementation
- Broken links
- Missing documentation

**Solution**:
- Use Documentation Updater Agent
- Automate documentation sync
- Regular documentation reviews
- Code comments as source of truth

**Related**: [DOCUMENTATION_UPDATER.md](../agents/DOCUMENTATION_UPDATER.md)

---

### ❌ **Principle Ignorance**

**Problem**: Making major decisions without consulting principles  
**Symptoms**:
- Decisions inconsistent with system principles
- Repeating past mistakes
- Missing evidence-based guidance

**Solution**:
- Always check Principles Engine for major decisions
- Review principles library regularly
- Add new principles based on evidence
- Use high-confidence principles to guide decisions

**Related**: [PRINCIPLES_ENGINE.md](../agents/PRINCIPLES_ENGINE.md), [PRINCIPLES_LIBRARY.md](./PRINCIPLES_LIBRARY.md)

---

## 🔮 **Future Evolution**

### Q: How do I propose a new evolution?

**Confidence**: ⭐⭐⭐⭐ (High - Clear evolution pathways)

**A**: 

1. **Capture as Idea**: Use Idea Capture Agent
   ```javascript
   await engine.captureUserIdea('Proposal: Add feature X because...');
   ```

2. **Use /evolve command**: If you have a pattern to generalize
   ```javascript
   await engine.processEvolveCommand(context, problemType, solutionPattern);
   ```

3. **Document in Evolution Journal**: If it's a specific learning event

4. **Let system evolve**: If it's a pattern the system should detect autonomously

**Best**: Start as Idea, let system evaluate and potentially evolve it autonomously.

**Anti-Pattern**: ❌ **Evolution Bypass** - Implementing changes without going through evolution process. Let system learn from changes.

**See Also**: [IDEA_CAPTURE_SYSTEM.md](../agents/IDEA_CAPTURE_SYSTEM.md), [EVOLUTION_SYSTEM.md](../system/EVOLUTION_SYSTEM.md)

---

### Q: How does the system decide what to evolve next?

**Confidence**: ⭐⭐⭐⭐ (High - Based on evolution triggers)

**A**: Through **autonomous evolution triggers**:

1. **Pattern Detection**: Repetitive success patterns
2. **Friction Encountered**: System struggles repeatedly
3. **Success Amplification**: Something works really well
4. **Capability Gap**: Missing functionality identified
5. **Meta-Learning**: System learns how to learn better

The system **prioritizes** based on:
- Impact (transformational > incremental)
- Confidence (high confidence patterns first)
- Friction reduction (eliminate pain points)
- User value (what helps users most)

**Related Patterns**: See [LEARNING_PATTERNS.md](../living/LEARNING_PATTERNS.md) for patterns that drive evolution  
**See Also**: [AUTONOMOUS_EVOLUTION_ENGINE.md](../system/AUTONOMOUS_EVOLUTION_ENGINE.md), [META_LEARNING_AGENT.md](../agents/META_LEARNING_AGENT.md)

---

## 🔗 **Integration with System Learning**

### How This Q&A Integrates with Autonomous Learning

**Meta-Learning Agent Integration**:
- Tracks question frequency to identify common concerns
- Suggests relevant Q&A entries based on context
- Learns from question patterns to improve autonomous decision-making
- Can auto-suggest new Q&A entries when patterns emerge

**Usage Pattern**:
```javascript
// System can suggest relevant Q&A when working on features
const metaLearningAgent = engine.metaLearningAgent;
const relevantQA = await metaLearningAgent.suggestRelevantQA(context);
```

**Evolution**:
- Questions added here inform system evolution
- Answers updated based on new learning
- Anti-patterns prevent future mistakes
- Cross-references connect to living documentation

**Future Enhancement**: Interactive Q&A Agent that proactively suggests relevant answers based on current work context.

---

## 📚 **Additional Resources**

- **System Overview**: [SYSTEM_OVERVIEW.md](../system/SYSTEM_OVERVIEW.md)
- **Agent System**: [AGENT_SYSTEM_OVERVIEW.md](../agents/AGENT_SYSTEM_OVERVIEW.md)
- **Evolution System**: [EVOLUTION_SYSTEM.md](../system/EVOLUTION_SYSTEM.md)
- **Navigation**: [NAVIGATION.md](../NAVIGATION.md)
- **Troubleshooting**: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Learning Patterns**: [LEARNING_PATTERNS.md](../living/LEARNING_PATTERNS.md)
- **Evolution Journal**: [EVOLUTION_JOURNAL.md](../living/EVOLUTION_JOURNAL.md)

---

## 🤔 **Questions to Ask Yourself**

When working on the system, regularly ask:

1. **Architecture**: "Does this maintain the three-layer architecture (Rules/Skills/Agents)?"
2. **Simplicity**: "Is this the simplest solution that works?"
3. **Integration**: "How does this integrate with existing components?"
4. **Learning**: "What can the system learn from this?"
5. **Evolution**: "Does this enable future evolution or lock us into a path?"
6. **User Value**: "Does this provide clear value to users?"
7. **Harmony**: "Does this maintain harmonic proportion across layers?"
8. **Principles**: "Does this align with system principles?"
9. **Anti-Patterns**: "Am I falling into any known anti-patterns?"
10. **Documentation**: "Should I check the Q&A or patterns for guidance?"

---

## 📊 **Confidence Indicator Legend**

- ⭐⭐⭐⭐⭐ (High - 90-100%): Core principles, well-established patterns, definitive answers
- ⭐⭐⭐⭐ (High - 75-89%): Strong patterns, clear guidance, generally reliable
- ⭐⭐⭐ (Moderate - 50-74%): Some uncertainty, context-dependent, evolving understanding

**Note**: Confidence scores help prioritize answers. Higher confidence answers are more reliable for autonomous decision-making.

---

**Last Updated**: This document evolves with the system. New Q&A entries are added as patterns emerge. The Meta-Learning Agent tracks usage to suggest improvements.

**Contribution**: Add your own Q&A entries as you discover them! Cross-reference with LEARNING_PATTERNS.md and EVOLUTION_JOURNAL.md for related examples.
