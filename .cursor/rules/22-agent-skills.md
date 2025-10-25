# Agent Skills Protocol

## Overview
The Agent Skills Protocol enables persistent, callable procedures that extend AI capabilities beyond episodic prompting. Skills are autonomous, self-improving, and integrated with ECP principles.

## Core Principles
- **Persistent Memory**: Skills remember and build upon previous executions
- **Autonomous Learning**: Skills evolve based on usage patterns and friction detection
- **ECP Integration**: Every skill follows Frame → Design → Plan → Implement → Review
- **Friction-Based Evolution**: Skills adapt based on AI friction signals
- **Recursive Agency**: Skills can create and improve other skills

## Skills Discovery & Usage

### Available Skills
Use `/list skills` to see all available skills with their purposes and capabilities.

### Skill Categories
- **Core Skills**: Essential workflows (ECP Protocol Runner, Test Skill)
- **Builder Skills**: Development tools (Debug Trace Analyzer)
- **Reflection Skills**: Learning and improvement (Learning Log Writer)
- **Meta Skills**: System management (Skill Creator, Skill Evolution)
- **Autonomous Skills**: Self-learning capabilities (Pattern Detector, Skill Generator)

### Skill Execution
```
/use skill:skill-name [parameters]
```
Example: `/use skill:ecp-protocol-runner` for full ECP workflow

### Skill Help
```
/skill help:skill-name
```
Get detailed information about any skill's purpose, usage, and examples.

## Skills Management

### Skill Status
```
/skill status
```
View the current state of all skills, including:
- Execution count and success rate
- Last used timestamp
- Friction detection results
- Evolution suggestions

### Skill Evolution
```
/skill evolve
```
Trigger autonomous skill evolution based on:
- Usage patterns and friction signals
- Performance metrics and success rates
- Context awareness and collaborative opportunities
- Emergent capability detection

### Skill Creation
```
/create-skill
```
Interactively create new skills with:
- Purpose definition and success criteria
- ECP integration and quality gates
- Rollback strategies and memento patterns
- Validation and testing frameworks

## Autonomous Learning System

### Pattern Detection
The system continuously scans for:
- Repeated development patterns
- Successful workflow sequences
- Friction points and inefficiencies
- Context-specific optimizations

### Skill Generation
When patterns are detected:
1. **Analyze** the pattern for skill potential
2. **Generate** a new skill definition
3. **Validate** against quality gates
4. **Test** the skill in controlled environment
5. **Deploy** to available skills library

### Friction Feedback Protocol
The system detects AI friction in:
- **Discovery Friction**: Difficulty finding the right skill
- **Execution Friction**: Complex or unclear skill usage
- **Composition Friction**: Difficulty combining skills
- **Learning Friction**: Skills not adapting to context
- **Maintenance Friction**: Skills becoming outdated

### Continuous Evolution
Skills automatically evolve through:
- **Friction-Based Adaptation**: Modify skills based on detected friction
- **Performance Optimization**: Improve based on success metrics
- **Context Awareness**: Adapt to different development contexts
- **Collaborative Intelligence**: Enhance skill composition capabilities

## ECP Integration

### Every Skill Execution Includes:
1. **Frame**: Define the problem and constraints
2. **Design**: Plan the approach and architecture
3. **Plan**: Break down into manageable steps
4. **Implement**: Execute with observability
5. **Review**: Learn and improve for next time

### Quality Gates
All skills must have:
- **Purpose Clarity**: Clear problem statement and success criteria
- **Success Test**: Observable success criteria
- **Rollback Strategy**: Safe failure recovery
- **Memento Pattern**: State preservation for recovery

### Observability
Every skill execution includes:
- **Logging**: Structured logs with clear prefixes
- **Metrics**: Performance and success tracking
- **Tracing**: Execution flow and decision points
- **Feedback**: Friction detection and improvement signals

## Advanced Features

### Context Awareness
Skills adapt to:
- **Project Type**: Web apps, APIs, libraries, etc.
- **Tech Stack**: React, Node.js, Python, etc.
- **Development Phase**: Planning, implementation, testing, deployment
- **User Preferences**: Coding style, patterns, tools

### Collaborative Intelligence
Skills can:
- **Compose**: Work together on complex problems
- **Share Context**: Pass information between executions
- **Learn Together**: Improve based on collaborative patterns
- **Emerge Capabilities**: Create new abilities through interaction

### Adaptive Learning
Skills continuously improve through:
- **Usage Pattern Analysis**: Learn from how they're used
- **Success Rate Optimization**: Improve based on outcomes
- **Friction Reduction**: Simplify based on difficulty signals
- **Context Adaptation**: Adjust to different situations

## Usage Examples

### Basic Skill Usage
```
/use skill:test-skill
/skill help:ecp-protocol-runner
/skill status
```

### Advanced Skill Management
```
/skill evolve
/create-skill
/list skills
```

### Autonomous Learning
The system automatically:
- Detects when you repeat similar patterns
- Suggests new skills for common workflows
- Evolves existing skills based on usage
- Simplifies skills that cause friction

## Integration with Cursor

### Seamless Integration
- Skills are immediately available in any conversation
- No setup or configuration required
- Automatic discovery and execution
- Persistent learning across sessions

### Rule System Integration
This rule makes skills available as part of Cursor's core functionality, ensuring they're always accessible and properly integrated with the AI's operating principles.

## Success Criteria

### Immediate Benefits
- **Faster Problem Solving**: Reusable skills for common tasks
- **Consistent Quality**: ECP principles in every execution
- **Continuous Learning**: Skills improve with usage
- **Reduced Friction**: Simplified workflows based on AI feedback

### Long-term Evolution
- **Autonomous Development**: Skills that create and improve themselves
- **Contextual Intelligence**: Skills that adapt to your specific needs
- **Emergent Capabilities**: New abilities that arise from skill interactions
- **Self-Optimizing System**: Continuous improvement based on real usage patterns

## Maintenance

### Health Monitoring
The system continuously monitors:
- **Skill Usage Patterns**: Which skills are most/least used
- **Success Rates**: Performance metrics for each skill
- **Friction Signals**: Areas where skills cause difficulty
- **Evolution Opportunities**: Potential improvements and new skills

### Automatic Maintenance
- **Skill Cleanup**: Remove unused or outdated skills
- **Performance Optimization**: Improve slow or inefficient skills
- **Friction Reduction**: Simplify skills that cause difficulty
- **Context Adaptation**: Update skills for new development contexts

This Agent Skills Protocol transforms Cursor from a code editor into a self-growing procedural memory system that learns, adapts, and evolves with your development patterns.
