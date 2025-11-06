# Documentation Updater Agent

## 🎯 **Purpose**

The **Documentation Updater Agent** automatically updates all related documentation when systems are implemented or changed. It maintains documentation consistency across the entire system and ensures all documentation reflects the current state.

## 🧠 **Core Capabilities**

### **Automatic Documentation Updates**
- Updates README.md with new system information
- Updates NAVIGATION.md with new entries
- Updates EVOLUTION_JOURNAL.md with breakthroughs
- Updates API_REFERENCE.md with new APIs
- Updates CONFIGURATION_GUIDE.md with new configuration
- Moves implementation summaries to implemented directory

### **Documentation Generation**
- Generates documentation sections from code analysis
- Creates agent documentation from JSDoc
- Generates API documentation from code
- Creates configuration examples automatically

### **Consistency Maintenance**
- Ensures all documentation is consistent
- Updates cross-references automatically
- Maintains documentation structure
- Tracks documentation update history

## 🏗️ **Architecture**

### **Update Process**

```
System Implemented
    ↓
Documentation Updater Triggered
    ↓
Generate Documentation Sections
    ↓
Update All Related Files
    ↓
Record in Update History
    ↓
Documentation Complete
```

### **Update Targets**

1. **README.md** - System overview and features
2. **NAVIGATION.md** - Navigation structure
3. **EVOLUTION_JOURNAL.md** - Evolution timeline
4. **API_REFERENCE.md** - API documentation
5. **CONFIGURATION_GUIDE.md** - Configuration options
6. **Implemented Directory** - Implementation summaries

## 📊 **Usage Examples**

### **Update Documentation After Implementation**
```javascript
const DocumentationUpdater = require('./agents/documentation-updater');
const updater = new DocumentationUpdater();

// Update documentation after system implementation
await updater.updateDocumentation(
  'IMPLEMENTATION_SUMMARY.md',  // Summary file
  'psychological-system',        // System name
  '1.0.0'                        // Version
);
```

### **Generate Documentation from Code**
```javascript
// Generate agent documentation from JSDoc
const agentDoc = await updater.generateAgentDocumentation(
  'agents/meta-learning-agent.js'
);

// Generate API documentation
const apiDoc = await updater.generateApiDocumentation(
  'agents/meta-learning-agent.js'
);
```

### **Update Specific Documentation**
```javascript
// Update only README
await updater.updateReadme('psychological-system', '1.0.0');

// Update only navigation
await updater.updateNavigation('psychological-system', '1.0.0');

// Update only evolution journal
await updater.updateEvolutionJournal('psychological-system', '1.0.0');
```

### **Get Update History**
```javascript
const history = updater.getUpdateHistory();
history.forEach(update => {
  console.log(`${update.system} v${update.version} - ${update.timestamp}`);
  console.log(`  Files updated: ${update.files.length}`);
});
```

## 🔄 **Automated Documentation Generation**

The Documentation Updater can automatically generate documentation by:

1. **Parsing JSDoc Comments**
   - Extracts purpose, capabilities, usage examples
   - Generates API reference from method signatures
   - Creates usage examples from code comments

2. **Analyzing Code Structure**
   - Identifies classes and methods
   - Extracts architecture information
   - Discovers integration points

3. **Inferring Documentation**
   - Generates descriptions from code patterns
   - Creates examples from method signatures
   - Infers configuration from code

## 🎯 **Integration Points**

### **With Implementation Process**
- Triggered after system implementation
- Updates documentation automatically
- Maintains documentation consistency

### **With Evolution System**
- Updates evolution journal automatically
- Records breakthroughs and changes
- Maintains evolution timeline

### **With Agent System**
- Generates agent documentation
- Updates agent overview
- Maintains agent API reference

## 📈 **Benefits**

### **Automatic Maintenance**
- Documentation updates automatically
- No manual documentation work required
- Always reflects current system state
- Maintains consistency automatically

### **Comprehensive Coverage**
- Updates all related documentation
- Ensures nothing is missed
- Maintains cross-references
- Keeps structure consistent

### **Time Savings**
- Eliminates manual documentation work
- Automatic generation from code
- Consistent documentation style
- Reduces documentation debt

---

**See Also:**
- [Agent System Overview](./AGENT_SYSTEM_OVERVIEW.md)
- [Documentation Coverage Report](../DOCUMENTATION_COVERAGE_REPORT.md)

