# Connection Discoverer

## 🎯 **Purpose**

The **Connection Discoverer** discovers patterns connecting technical errors to psychological root causes. It identifies connections between cognitive biases, decision-making patterns, and technical errors, enabling "never repeat the same mistake twice" learning at a deep psychological level.

## 🧠 **Core Capabilities**

### **Connection Discovery**
- Analyzes error patterns for psychological roots
- Discovers connections between biases and technical errors
- Identifies recurring psychological-technical patterns
- Builds connection database through learning

### **Pattern Recognition**
- Recognizes psychological patterns in errors
- Matches technical manifestations to psychological causes
- Identifies prevention strategies automatically
- Tracks pattern confidence through occurrences

### **Learning System**
- Learns from error analysis
- Builds confidence through pattern occurrences
- Refines connection patterns over time
- Provides actionable prevention strategies

## 🏗️ **Architecture**

### **Connection Pattern Structure**

```javascript
{
  patternId: string,
  psychological: string,        // e.g., 'confirmation_bias'
  technical: string,            // e.g., 'ignoring_error_messages'
  description: string,
  confidence: number,           // 0-1, increases with occurrences
  occurrences: number,          // Number of times pattern observed
  evidence: object[],           // Evidence of connection
  prevention: string,           // Prevention strategy
  timestamp: string
}
```

### **Known Connection Patterns**

The system includes pre-defined patterns for:
- **Confirmation Bias** → Technical errors (ignoring errors, skipping validation)
- **Anchoring Bias** → Technical errors (sticking to approach, not considering alternatives)
- **Availability Heuristic** → Technical errors (using familiar wrong solutions)
- **Rush to Solution** → Technical errors (skipping analysis, not reading errors)
- **Overconfidence** → Technical errors (not testing, assuming correctness)
- **Context Switching Error** → Technical errors (using old patterns in new frameworks)
- **Frustration Cascade** → Technical errors (making more errors due to emotional state)

## 📊 **Usage Examples**

### **Discover Connections from Error Analysis**
```javascript
const ConnectionDiscoverer = require('./agents/connection-discoverer');
const discoverer = new ConnectionDiscoverer();

// Analyze error for connections
const errorAnalysis = {
  psychological: {
    biasRisks: ['confirmation_bias'],
    decisionPatterns: ['rush_to_solution'],
    emotionalState: 'frustrated'
  },
  technical: {
    errorType: 'ignoring_error_messages',
    rootCause: 'skipped_validation_steps',
    severity: 'high'
  },
  context: {
    recentErrors: 3
  }
};

const connections = discoverer.discoverConnections(errorAnalysis);
connections.forEach(conn => {
  console.log(`${conn.psychological} → ${conn.technical}`);
  console.log(`  Confidence: ${conn.confidence}`);
  console.log(`  Prevention: ${conn.prevention}`);
});
```

### **Get Pattern Statistics**
```javascript
const stats = discoverer.getPatternStatistics();
console.log('Total patterns:', stats.totalPatterns);
console.log('High-confidence patterns:', stats.highConfidencePatterns);
console.log('Most common patterns:', stats.mostCommonPatterns);
```

### **Get Connection Insights**
```javascript
const insights = discoverer.getConnectionInsights();
console.log('Top psychological factors:', insights.topPsychologicalFactors);
console.log('Top technical manifestations:', insights.topTechnicalManifestations);
console.log('Prevention recommendations:', insights.preventionRecommendations);
```

## 🎯 **Integration Points**

### **With Technical-Psychological Analyzer**
- Receives error analysis with psychological and technical layers
- Discovers connections from dual-layer analysis
- Feeds insights back to analyzer

### **With Mistake Prevention Engine**
- Provides prevention strategies based on discovered connections
- Informs prevention rules with psychological insights
- Enables psychological-level mistake prevention

### **With Learning Systems**
- Learns from every error analysis
- Builds pattern database through experience
- Improves connection discovery over time

## 📈 **Benefits**

### **Deep Learning**
- Learns at psychological level, not just surface patterns
- Identifies root causes of errors
- Enables "never repeat the same mistake twice" learning
- Provides actionable prevention strategies

### **Pattern Recognition**
- Recognizes recurring psychological-technical patterns
- Builds confidence through pattern occurrences
- Identifies connections automatically
- Learns from every error

### **Prevention**
- Provides specific prevention strategies
- Informs mistake prevention with psychological insights
- Prevents errors at their psychological source
- Enables proactive error prevention

---

**See Also:**
- [Agent System Overview](./AGENT_SYSTEM_OVERVIEW.md)
- [Technical Psychological Analyzer](./TECHNICAL_PSYCHOLOGICAL_ANALYZER.md)
- [Psychological Decision Monitor](./PSYCHOLOGICAL_DECISION_MONITOR.md)

