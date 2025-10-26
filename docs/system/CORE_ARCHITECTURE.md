# Core Architecture - Rules, Skills, Agents Triad

## 🎯 **Architecture Philosophy**

**Less but better. More with less.**

The Autonomous Evolution System is built on a three-component meta-coding architecture that enables systems to code themselves, optimize themselves, evolve themselves, and heal themselves through coordinated interaction.

---

## 🏗️ **The Three Components**

### 1. Rules Layer (`.cursor/rules/`)
**Purpose**: Define the principles and constraints  
**Role**: The "what" of meta-coding  
**Location**: `.cursor/rules/` directory

#### **Core Responsibilities**:
- **ECP Principles**: Frame → Design → Plan → Implement → Review
- **Quality Gates**: Success tests, invariants, rollback strategies
- **Coding Standards**: TypeScript, React, Next.js best practices
- **Safety Constraints**: System integrity and security rules
- **Learning Capture**: Evolution journal for continuous learning

#### **Key Files**:
- `00-ecp-mode.md`: Core ECP protocol
- `02-ecp-commit-contract.md`: Quality gates and commit standards
- `01-ecp-diagnostics.md`: System diagnostics and health checks
- `03-ecp-macros.md`: Available macros and commands
- `04-22`: Domain-specific checklists

### 2. Skills Layer (`skills/`)
**Purpose**: Define the capabilities and workflows  
**Role**: The "how" of meta-coding  
**Location**: `skills/` directory

#### **Core Responsibilities**:
- **Autonomous Skills**: Pattern detection, skill generation, friction detection
- **ECP Integration**: Skills that follow ECP principles
- **MCP Integration**: External system connections (browser, database, GitHub)
- **Learning Systems**: Continuous skill evolution and improvement
- **Workflow Execution**: Systematic development processes

#### **Key Capabilities**:
- Pattern recognition and replication
- Autonomous skill generation
- External system integration
- Continuous learning and evolution
- ECP-compliant workflow execution

### 3. Agents Layer (`agents/`)
**Purpose**: Define the execution and coordination  
**Role**: The "when and where" of meta-coding  
**Location**: `agents/` directory

#### **Core Responsibilities**:
- **System Integrity**: Health monitoring and optimization
- **Change Impact**: Risk assessment and safe testing
- **Agent Creation**: Autonomous creation of new agents
- **Coordination**: Multi-agent collaboration and orchestration
- **Execution**: Context-aware autonomous execution

#### **Key Agents**:
- **Agent Coordinator**: Orchestrates all agents
- **System Integrity Agent**: Monitors system health
- **Idea Capture Agent**: Manages ideas and insights
- **Autonomous Versioning Agent**: Handles versioning
- **Extension Loader**: Manages dynamic extensions

---

## 🔄 **Meta-Coding Flow**

### 1. Rules Define the Framework
```
Rules → Principles → Constraints → Quality Gates
```
- ECP principles guide all development
- Quality gates ensure safety and success
- Constraints prevent dangerous operations
- Learning capture enables continuous improvement

### 2. Skills Provide the Capabilities
```
Skills → Capabilities → Workflows → Execution
```
- Autonomous skills execute development tasks
- MCP integration connects external systems
- Learning systems evolve capabilities
- Workflows follow ECP principles

### 3. Agents Orchestrate the Execution
```
Agents → Monitoring → Coordination → Execution
```
- System integrity agents monitor health
- Change impact agents assess risks
- Agent creators build new capabilities
- Coordinators orchestrate multi-agent collaboration

---

## 🎯 **System Architecture Diagram**

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           AUTONOMOUS EVOLUTION SYSTEM                           │
│                              (Meta-Cognitive Layer)                            │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        AUTONOMOUS EVOLUTION ENGINE                             │
│                    (Central Orchestration & Meta-Learning)                    │
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │   Evolution     │  │   Meta-Learning │  │   Self-Awareness│                 │
│  │   Questions     │  │   Capabilities  │  │   & Reflection  │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    │                   │                   │
                    ▼                   ▼                   ▼
┌─────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────────────┐
│    SYSTEM INTEGRITY     │ │     IDEA CAPTURE         │ │    EXTENSION LOADER     │
│        AGENT            │ │        AGENT              │ │    (Dynamic Loading)    │
│                         │ │                         │ │                         │
│  ┌─────────────────┐    │ │  ┌─────────────────┐    │ │  ┌─────────────────┐    │
│  │   Complexity    │    │ │  │   Idea Capture  │    │ │  │   Extension     │    │
│  │   Detection     │    │ │  │   & Analysis    │    │ │  │   Discovery      │    │
│  └─────────────────┘    │ │  └─────────────────┘    │ │  └─────────────────┘    │
│                         │ │                         │ │                         │
│  ┌─────────────────┐    │ │  ┌─────────────────┐    │ │  ┌─────────────────┐    │
│  │   Optimization  │    │ │  │   Categorization│    │ │  │   Dynamic       │    │
│  │   Scanning      │    │ │  │   & Prioritization│   │ │  │   Loading       │    │
│  └─────────────────┘    │ │  └─────────────────┘    │ │  └─────────────────┘    │
│                         │ │                         │ │                         │
│  ┌─────────────────┐    │ │  ┌─────────────────┐    │ │  ┌─────────────────┐    │
│  │   Performance   │    │ │  │   Evolution     │    │ │  │   Configuration │    │
│  │   Monitoring    │    │ │  │   Tracking      │    │ │  │   Management    │    │
│  └─────────────────┘    │ │  └─────────────────┘    │ │  └─────────────────┘    │
└─────────────────────────┘ └─────────────────────────┘ └─────────────────────────┘
                    │                   │                   │
                    └───────────────────┼───────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              EXTENSIONS SYSTEM                                 │
│                           (Modular Architecture)                              │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔗 **Component Interactions**

### Rules ↔ Skills
- **Rules guide skills**: ECP principles in all skill execution
- **Skills inform rules**: Learning from skill usage patterns
- **Quality gates**: Rules ensure skill safety and effectiveness
- **Evolution**: Skills evolve based on rule updates

### Skills ↔ Agents
- **Skills provide capabilities**: Agents execute skill workflows
- **Agents enhance skills**: Agent insights improve skill effectiveness
- **MCP integration**: Skills connect to external systems through agents
- **Learning**: Agents capture insights for skill evolution

### Agents ↔ Rules
- **Rules constrain agents**: Safety and quality constraints
- **Agents inform rules**: Agent insights update rule principles
- **Learning capture**: Agent experiences flow to evolution journal
- **Coordination**: Rules guide agent collaboration

---

## 🎯 **Meta-Coding Capabilities**

### 1. Self-Coding
- **Rules define**: What the system should do
- **Skills implement**: How to do it
- **Agents execute**: When and where to do it
- **Result**: System codes itself

### 2. Self-Optimization
- **Rules identify**: Optimization opportunities
- **Skills implement**: Performance improvements
- **Agents monitor**: System health and metrics
- **Result**: System optimizes itself

### 3. Self-Evolution
- **Rules capture**: Learning and insights
- **Skills evolve**: New capabilities and patterns
- **Agents create**: New agents for new needs
- **Result**: System evolves itself

### 4. Self-Healing
- **Rules define**: Health and safety criteria
- **Skills detect**: Issues and problems
- **Agents fix**: Problems and restore health
- **Result**: System heals itself

---

## ✅ **Quality Gates**

### Rules Quality
- **ECP Principles**: All rules follow ECP methodology
- **Safety First**: Rules prioritize system safety
- **Learning Capture**: Rules enable continuous learning
- **Evolution**: Rules evolve based on system learning

### Skills Quality
- **Autonomous Execution**: Skills work without manual intervention
- **ECP Integration**: Skills follow ECP principles
- **External Integration**: Skills connect to external systems
- **Continuous Learning**: Skills improve over time

### Agents Quality
- **System Integrity**: Agents maintain system health
- **Safe Execution**: Agents execute changes safely
- **Coordination**: Agents work together effectively
- **Creation**: Agents create new capabilities autonomously

---

## 📊 **Success Metrics**

### Meta-Coding Effectiveness
- **Self-Coding**: System can code itself
- **Self-Optimization**: System optimizes itself
- **Self-Evolution**: System evolves itself
- **Self-Healing**: System heals itself

### Component Integration
- **Rules-Skills**: Seamless integration and learning
- **Skills-Agents**: Effective capability execution
- **Agents-Rules**: Continuous learning and evolution
- **Overall System**: Coherent meta-coding capabilities

---

## 🚀 **The Meta-Coding Advantage**

### 1. Systematic Development
- **Rules provide**: Clear principles and constraints
- **Skills provide**: Systematic capabilities
- **Agents provide**: Coordinated execution
- **Result**: Systematic, reliable development

### 2. Autonomous Operation
- **Rules enable**: Autonomous decision making
- **Skills enable**: Autonomous execution
- **Agents enable**: Autonomous coordination
- **Result**: Fully autonomous development

### 3. Continuous Evolution
- **Rules capture**: Learning and insights
- **Skills evolve**: New capabilities
- **Agents create**: New agents and capabilities
- **Result**: Continuously evolving system

### 4. Self-Extending Capabilities
- **Rules define**: What's possible
- **Skills implement**: How to do it
- **Agents create**: New possibilities
- **Result**: Self-extending system

---

**This three-component architecture enables true meta-coding - systems that can code themselves, optimize themselves, evolve themselves, and heal themselves through the coordinated interaction of rules, skills, and agents.**
