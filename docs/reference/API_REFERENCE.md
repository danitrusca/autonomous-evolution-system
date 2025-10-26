# API Reference - Agent Interfaces and Methods

## 🎯 **Overview**

This document provides a comprehensive reference for all agent interfaces, methods, and system APIs in the Autonomous Evolution System.

---

## 🤖 **Core Agents**

### Agent Coordinator
**File**: `agents/agent-coordinator.js`  
**Purpose**: Central orchestration of all agents

#### **Constructor**
```javascript
new AgentCoordinator()
```

#### **Methods**
- `start()`: Start all agents
- `stop()`: Stop all agents
- `getAgentStatus(agentName)`: Get status of specific agent
- `getAllAgentStatus()`: Get status of all agents
- `monitorAgentHealth()`: Monitor health of all agents
- `getVersioningStatistics()`: Get versioning statistics
- `manualVersionCommit()`: Trigger manual version commit

### System Integrity Agent
**File**: `agents/system-integrity-agent.js`  
**Purpose**: System monitoring and optimization

#### **Constructor**
```javascript
new SystemIntegrityAgent()
```

#### **Methods**
- `scanForComplexity()`: Scan for complexity issues
- `scanForOptimization()`: Scan for optimization opportunities
- `scanForArchitecturalDebt()`: Scan for architectural debt
- `scanForPerformanceBottlenecks()`: Scan for performance issues
- `generateReport()`: Generate comprehensive system report
- `getAgentStatus()`: Get agent status

### Idea Capture Agent
**File**: `agents/idea-capture-agent.js`  
**Purpose**: Idea capture and management

#### **Constructor**
```javascript
new IdeaCaptureAgent()
```

#### **Methods**
- `captureIdea(idea)`: Capture a new idea
- `categorizeIdea(idea)`: Categorize an idea
- `prioritizeIdea(idea)`: Prioritize an idea
- `getIdeasByCategory(category)`: Get ideas by category
- `getIdeasByPriority(priority)`: Get ideas by priority
- `updateEvolutionJournal(idea)`: Update evolution journal
- `generateIdeaEntry(idea)`: Generate journal entry
- `getAgentStatus()`: Get agent status

### Autonomous Versioning Agent
**File**: `agents/autonomous-versioning-agent.js`  
**Purpose**: Automatic versioning and tagging

#### **Constructor**
```javascript
new AutonomousVersioningAgent()
```

#### **Methods**
- `analyzeCommit(commit)`: Analyze a commit for versioning
- `calculateVersion(currentVersion, analysis)`: Calculate new version
- `assignVersion(commit)`: Assign version to commit
- `getCurrentVersion()`: Get current system version
- `updateEvolutionJournal(analysis)`: Update evolution journal
- `generateVersionEntry(analysis)`: Generate journal entry
- `logVersioningAnalysis(analysis)`: Log versioning analysis

### Git Versioning Integration
**File**: `agents/git-versioning-integration.js`  
**Purpose**: Git operations and version tagging

#### **Constructor**
```javascript
new GitVersioningIntegration()
```

#### **Methods**
- `monitorCommits()`: Monitor Git commits
- `createVersionTag(version)`: Create version tag
- `updatePackageJson(version)`: Update package.json version
- `getVersioningStatus()`: Get versioning status
- `getCommitHistory()`: Get commit history

---

## 🛠️ **Skills System**

### Skills Directory
**Location**: `skills/`  
**Purpose**: Autonomous capabilities and workflows

#### **Skill Structure**
```javascript
{
  name: "skill-name",
  description: "Skill description",
  execute: async (context) => { /* implementation */ },
  validate: (context) => { /* validation */ },
  dependencies: ["other-skill"]
}
```

#### **Core Skills**
- **Pattern Detection**: Detect and replicate successful patterns
- **Skill Generation**: Generate new skills autonomously
- **Friction Detection**: Detect and resolve friction points
- **Meta-Learning**: Learn how to learn more effectively
- **Autonomous Optimization**: Optimize system performance

---

## 📚 **Principles Engine**

### Principles Engine
**File**: `agents/principles-engine.js`  
**Purpose**: Access to principles library for decision making

#### **Constructor**
```javascript
new PrinciplesEngine()
```

#### **Methods**
- `loadPrinciples()`: Load principles from journal
- `getPrinciple(name)`: Get specific principle
- `getAllPrinciples()`: Get all principles
- `getPrinciplesByConfidence(minConfidence)`: Filter by confidence
- `getPrinciplesForApplication(pattern)`: Filter by application
- `suggestPrinciples(scenario)`: Suggest principles for scenario
- `getStatistics()`: Get principle statistics
- `reload()`: Reload principles from journal

---

## 🔧 **Configuration**

### System Configuration
**File**: `package.json`  
**Purpose**: System configuration and dependencies

#### **Key Configuration**
```json
{
  "name": "autonomous-evolution-system",
  "version": "1.1.0",
  "description": "Autonomous Evolution System",
  "main": "autonomous-evolution-engine.js",
  "scripts": {
    "start": "node autonomous-evolution-engine.js",
    "test": "node test-*.js"
  }
}
```

### Agent Configuration
**File**: `extension-config.json`  
**Purpose**: Agent and extension configuration

#### **Configuration Structure**
```json
{
  "agents": {
    "system-integrity": {
      "enabled": true,
      "interval": 300000
    },
    "idea-capture": {
      "enabled": true,
      "interval": 60000
    }
  }
}
```

---

## 📊 **Monitoring and Health**

### Health Check Endpoints
- `GET /health`: Overall system health
- `GET /health/agents`: Agent health status
- `GET /health/versioning`: Versioning system health
- `GET /health/ideas`: Idea capture system health

### Metrics Collection
- **System Metrics**: Performance, complexity, quality
- **Agent Metrics**: Status, activity, effectiveness
- **Learning Metrics**: Pattern recognition, meta-learning
- **Evolution Metrics**: Growth, adaptation, improvement

---

## 🔄 **Event System**

### Event Types
- **Agent Events**: Agent start, stop, error, status change
- **System Events**: Health check, optimization, evolution
- **Learning Events**: Pattern detection, skill generation
- **Version Events**: Version assignment, tagging, journal update

### Event Handlers
```javascript
// Example event handler
system.on('agent:started', (agentName) => {
  console.log(`Agent ${agentName} started`);
});

system.on('version:assigned', (version, commit) => {
  console.log(`Version ${version} assigned to commit ${commit}`);
});
```

---

## 🧪 **Testing**

### Test Files
- `test-unified-journal.js`: Test unified journal system
- `test-principles-engine.js`: Test principles engine
- `test-autonomous-versioning.js`: Test versioning system
- `test-system-integrity.js`: Test system integrity agent

### Test Commands
```bash
# Run all tests
npm test

# Run specific test
node test-unified-journal.js
node test-principles-engine.js
node test-autonomous-versioning.js
```

---

## 📝 **Error Handling**

### Error Types
- **Agent Errors**: Agent-specific errors and failures
- **System Errors**: System-wide errors and issues
- **Configuration Errors**: Configuration and setup errors
- **Integration Errors**: External system integration errors

### Error Handling Patterns
```javascript
try {
  await agent.execute();
} catch (error) {
  console.error(`Agent error: ${error.message}`);
  // Handle error appropriately
}
```

---

## 🔐 **Security**

### Security Considerations
- **Input Validation**: All inputs are validated
- **Access Control**: Agent access is controlled
- **Data Protection**: Sensitive data is protected
- **Audit Logging**: All actions are logged

### Security Best Practices
- Validate all inputs
- Sanitize data before processing
- Use secure communication protocols
- Implement proper access controls
- Regular security audits

---

## 📈 **Performance**

### Performance Optimization
- **Async Operations**: Use async/await for I/O operations
- **Caching**: Cache frequently accessed data
- **Lazy Loading**: Load resources only when needed
- **Resource Management**: Properly manage system resources

### Performance Monitoring
- **Response Times**: Monitor agent response times
- **Memory Usage**: Track memory consumption
- **CPU Usage**: Monitor CPU utilization
- **I/O Performance**: Track I/O operations

---

**This API reference provides comprehensive documentation for all system interfaces, enabling developers to understand and work with the Autonomous Evolution System effectively.**
