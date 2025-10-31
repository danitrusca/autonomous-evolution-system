# Technical-Psychological Analyzer

## 🎯 **Purpose**

The **Technical-Psychological Analyzer** analyzes technical errors with a dual-layer approach: technical error analysis and psychological root cause analysis. It discovers connections between technical errors and psychological patterns to enable deep mistake learning.

## 🧠 **Core Capabilities**

### **Dual-Layer Error Analysis**
- Analyzes technical errors (error type, root cause, severity, patterns)
- Analyzes psychological factors (biases, decision patterns, emotional state, stress)
- Connects technical errors to psychological root causes
- Provides comprehensive error understanding

### **Psychological Pattern Recognition**
- Recognizes cognitive biases (confirmation, anchoring, availability, overconfidence)
- Identifies decision-making patterns (rush to solution, systematic approach)
- Detects emotional states (calm, stressed, frustrated)
- Identifies stress indicators (time pressure, repeated errors)

### **Connection Discovery**
- Discovers connections between psychological patterns and technical errors
- Identifies prevention strategies based on psychological insights
- Builds knowledge base of psychological-technical connections
- Enables "never repeat the same mistake twice" learning

### **Privacy Protection**
- Requires user consent for psychological analysis
- Sanitizes context data automatically
- Respects user privacy preferences
- Transparent about data usage

## 🏗️ **Architecture**

### **Error Analysis Structure**

```javascript
{
  technical: {
    errorType: string,
    rootCause: string,
    severity: 'low' | 'medium' | 'high' | 'critical',
    patterns: string[],
    context: object
  },
  psychological: {
    biasRisks: string[],
    decisionPatterns: string[],
    emotionalState: string,
    stressIndicators: string[],
    cognitiveLoad: number
  },
  connections: [
    {
      psychological: string,
      technical: string,
      confidence: number,
      prevention: string
    }
  ],
  recommendations: string[]
}
```

## 📊 **Usage Examples**

### **Analyze Error with Psychological Layer**
```javascript
const TechnicalPsychologicalAnalyzer = require('./agents/technical-psychological-analyzer');
const analyzer = new TechnicalPsychologicalAnalyzer();

// Enable psychological analysis (requires user consent)
analyzer.enablePsychologicalAnalysis(userConsent);

// Analyze error
const error = {
  type: 'TypeError',
  message: 'Cannot read property of undefined',
  context: {
    file: 'module.js',
    function: 'processData',
    recentChanges: ['Added new feature']
  }
};

const analysis = analyzer.analyzeError(error, {
  timePressure: 'high',
  recentErrors: 3,
  emotionalState: 'frustrated'
});

console.log('Technical Analysis:', analysis.technical);
console.log('Psychological Analysis:', analysis.psychological);
console.log('Connections:', analysis.connections);
console.log('Recommendations:', analysis.recommendations);
```

### **Sanitize Context**
```javascript
// Automatically sanitizes context for privacy
const sanitizedContext = analyzer.sanitizeContext(context);
```

## 🎯 **Integration Points**

### **With Connection Discoverer**
- Feeds error analysis to connection discovery
- Provides dual-layer analysis for connections
- Receives connection insights for learning

### **With Mistake Prevention Engine**
- Provides psychological layer for mistake prevention
- Enhances prevention with psychological insights
- Prevents errors at their psychological source

### **With Learning Systems**
- Feeds error patterns to learning systems
- Enables deep mistake learning
- Builds psychological-technical knowledge base

## 📈 **Benefits**

### **Deep Error Understanding**
- Understands errors at both technical and psychological levels
- Discovers root causes beyond surface symptoms
- Provides comprehensive error analysis
- Enables true error learning

### **Prevents Recurrence**
- Identifies psychological patterns that lead to errors
- Provides prevention strategies
- Prevents errors at their source
- Enables "never repeat the same mistake twice" learning

### **Privacy-Aware**
- Requires user consent
- Sanitizes data automatically
- Respects privacy preferences
- Transparent about operations

---

**See Also:**
- [Agent System Overview](./AGENT_SYSTEM_OVERVIEW.md)
- [Connection Discoverer](./CONNECTION_DISCOVERER.md)
- [Psychological Decision Monitor](./PSYCHOLOGICAL_DECISION_MONITOR.md)

