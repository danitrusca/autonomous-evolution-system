# Psychological Decision Monitor

## 🎯 **Purpose**

The **Psychological Decision Monitor** monitors decision-making patterns and prevents psychological mistakes. It analyzes decisions for cognitive biases, emotional states, stress indicators, and decision quality to prevent mistakes at their psychological source.

## 🧠 **Core Capabilities**

### **Decision Monitoring**
- Monitors all decisions in real-time
- Analyzes decision quality (thorough analysis, multiple options, validation)
- Assesses cognitive load (complexity, uncertainty, time pressure)
- Evaluates emotional state (calm, stressed, frustrated)

### **Bias Detection**
- Detects confirmation bias (ignoring contrary evidence, seeking supporting info)
- Identifies anchoring bias (sticking to initial approach, not considering alternatives)
- Recognizes availability bias (using familiar solutions, ignoring alternatives)
- Flags overconfidence (not testing, assuming correctness)

### **Stress Identification**
- Identifies stress indicators (time pressure, repeated errors, rushed approach)
- Detects frustration cascade (making more errors due to emotional state)
- Monitors decision quality degradation under stress
- Suggests breaks when stress detected

### **Recommendations**
- Generates recommendations to prevent psychological mistakes
- Suggests validation steps when quality is low
- Recommends alternatives when bias detected
- Proposes breaks when stress is high

## 🏗️ **Architecture**

### **Decision Analysis Structure**

```javascript
{
  timestamp: string,
  decision: object,              // Sanitized decision
  context: object,               // Sanitized context
  decisionQuality: {
    level: 'high' | 'medium' | 'low',
    score: number,
    indicators: string[],
    description: string
  },
  cognitiveLoad: {
    level: 'low' | 'medium' | 'high',
    score: number,
    factors: string[],
    description: string
  },
  emotionalState: {
    level: 'calm' | 'stressed' | 'frustrated',
    indicators: string[],
    description: string
  },
  biasRisks: [
    {
      type: string,
      severity: 'low' | 'medium' | 'high',
      description: string
    }
  ],
  stressIndicators: string[],
  confidence: number
}
```

## 📊 **Usage Examples**

### **Monitor Decision**
```javascript
const PsychologicalDecisionMonitor = require('./agents/psychological-decision-monitor');
const monitor = new PsychologicalDecisionMonitor();

// Enable monitoring (requires user consent)
monitor.enableMonitoring(userConsent);

// Monitor a decision
const result = monitor.monitorDecision(
  {
    action: 'Refactor complex module',
    approach: 'aggressive',
    alternatives: [],
    validation: null
  },
  {
    complexity: 'high',
    uncertainty: 'medium',
    timePressure: 'high',
    recentErrors: 2
  }
);

console.log('Risk Level:', result.riskLevel);
console.log('Recommendations:', result.recommendations);
console.log('Analysis:', result.analysis);
```

### **Learn from Decision Outcome**
```javascript
// Learn from decision outcome
monitor.learnFromDecision(
  decision,
  context,
  {
    success: false,
    error: 'Module broke after refactoring',
    outcome: 'failure'
  }
);
```

## 🎯 **Integration Points**

### **With Decision-Making Systems**
- Monitors all decisions automatically
- Provides real-time feedback on decision quality
- Prevents psychological mistakes proactively

### **With Connection Discoverer**
- Feeds decision patterns to connection discovery
- Identifies psychological-technical connections
- Learns from decision outcomes

### **With Mistake Prevention Engine**
- Provides psychological layer for mistake prevention
- Prevents mistakes at their psychological source
- Enhances mistake prevention with bias detection

## 📈 **Benefits**

### **Prevents Psychological Mistakes**
- Detects biases before they cause errors
- Identifies stress and frustration early
- Prevents low-quality decisions
- Reduces mistakes from psychological factors

### **Improves Decision Quality**
- Encourages thorough analysis
- Promotes consideration of alternatives
- Requires validation steps
- Enhances decision-making process

### **Protects User Well-being**
- Detects stress and frustration
- Suggests breaks when needed
- Prevents frustration cascade
- Maintains healthy decision-making environment

---

**See Also:**
- [Agent System Overview](./AGENT_SYSTEM_OVERVIEW.md)
- [Connection Discoverer](./CONNECTION_DISCOVERER.md)
- [Technical Psychological Analyzer](./TECHNICAL_PSYCHOLOGICAL_ANALYZER.md)

