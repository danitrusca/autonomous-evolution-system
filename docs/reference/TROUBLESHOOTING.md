# Troubleshooting Guide - Common Issues and Solutions

## 🎯 **Overview**

This guide provides solutions for common issues encountered when working with the Autonomous Evolution System.

---

## 🚨 **Common Issues**

### 1. Agent Startup Issues

#### **Problem**: Agents fail to start
**Symptoms**:
- Error messages during agent initialization
- Agents not responding to status checks
- System not functioning properly

**Solutions**:
1. **Check Dependencies**:
   ```bash
   npm install
   ```

2. **Verify Configuration**:
   ```bash
   node -e "console.log(require('./extension-config.json'))"
   ```

3. **Check File Permissions**:
   ```bash
   ls -la agents/
   chmod +x agents/*.js
   ```

4. **Review Logs**:
   ```bash
   tail -f logs/system.log
   ```

#### **Problem**: Agent Coordinator not starting
**Symptoms**:
- "Agent Coordinator failed to start" error
- No agents are running
- System appears unresponsive

**Solutions**:
1. **Check Agent Files**:
   ```bash
   ls -la agents/
   ```

2. **Verify Agent Imports**:
   ```javascript
   // Check if all agent files exist and are properly exported
   const agents = [
     './system-integrity-agent',
     './idea-capture-agent',
     './autonomous-versioning-agent'
   ];
   ```

3. **Test Individual Agents**:
   ```bash
   node agents/system-integrity-agent.js
   ```

### 2. Journal System Issues

#### **Problem**: Evolution Journal not updating
**Symptoms**:
- Journal entries not appearing
- "Failed to update journal" errors
- Missing version entries

**Solutions**:
1. **Check Journal File**:
   ```bash
   ls -la docs/living/EVOLUTION_JOURNAL.md
   ```

2. **Verify File Permissions**:
   ```bash
   chmod 664 docs/living/EVOLUTION_JOURNAL.md
   ```

3. **Check Journal Structure**:
   ```bash
   node -e "const fs = require('fs'); const content = fs.readFileSync('docs/living/EVOLUTION_JOURNAL.md', 'utf8'); console.log(content.includes('## System Evolution Timeline'));"
   ```

4. **Test Journal Update**:
   ```bash
   node test-unified-journal.js
   ```

#### **Problem**: Principles Library not loading
**Symptoms**:
- Principles engine returns empty results
- "No principles found" errors
- Decision making not working

**Solutions**:
1. **Check Principles File**:
   ```bash
   ls -la docs/reference/PRINCIPLES_LIBRARY.md
   ```

2. **Verify Principles Format**:
   ```bash
   grep -n "#### Principle" docs/reference/PRINCIPLES_LIBRARY.md
   ```

3. **Test Principles Engine**:
   ```bash
   node test-principles-engine.js
   ```

### 3. Versioning System Issues

#### **Problem**: Automatic versioning not working
**Symptoms**:
- Commits not getting versioned
- Version tags not created
- Package.json not updated

**Solutions**:
1. **Check Git Repository**:
   ```bash
   git status
   git log --oneline -5
   ```

2. **Verify Git Configuration**:
   ```bash
   git config --list
   ```

3. **Test Versioning Agent**:
   ```bash
   node test-autonomous-versioning.js
   ```

4. **Check Commit Message Format**:
   ```bash
   git log --oneline -1
   # Should follow conventional commit format
   ```

#### **Problem**: Version calculation errors
**Symptoms**:
- Incorrect version numbers
- "Invalid version" errors
- Version conflicts

**Solutions**:
1. **Check Current Version**:
   ```bash
   node -e "console.log(require('./package.json').version)"
   ```

2. **Verify Version Format**:
   ```bash
   node -e "const semver = require('semver'); console.log(semver.valid('1.0.0'));"
   ```

3. **Reset Version**:
   ```bash
   npm version 1.0.0 --no-git-tag-version
   ```

### 4. System Integrity Issues

#### **Problem**: System integrity scans failing
**Symptoms**:
- "System integrity scan failed" errors
- No optimization recommendations
- Performance issues not detected

**Solutions**:
1. **Check System Integrity Agent**:
   ```bash
   node test-system-integrity.js
   ```

2. **Verify File Access**:
   ```bash
   ls -la .
   ```

3. **Check Complexity Thresholds**:
   ```javascript
   // Verify configuration in system-integrity-agent.js
   const config = {
     complexityThreshold: 500,
     cyclomaticComplexityThreshold: 10
   };
   ```

4. **Run Manual Scan**:
   ```bash
   node -e "const agent = require('./agents/system-integrity-agent'); new agent().scanForComplexity();"
   ```

### 5. Idea Capture Issues

#### **Problem**: Ideas not being captured
**Symptoms**:
- Ideas not appearing in journal
- "Failed to capture idea" errors
- Categorization not working

**Solutions**:
1. **Check Idea Capture Agent**:
   ```bash
   node -e "const agent = require('./agents/idea-capture-agent'); new agent().getAgentStatus();"
   ```

2. **Verify Idea Format**:
   ```javascript
   const idea = {
     content: "Test idea",
    category: "system-evolution",
    priority: "medium"
  };
  ```

3. **Test Idea Capture**:
   ```bash
   node -e "const agent = require('./agents/idea-capture-agent'); new agent().captureIdea({content: 'Test idea', category: 'test', priority: 'low'});"
   ```

---

## 🔧 **Diagnostic Commands**

### System Health Check
```bash
# Check overall system health
node -e "const coordinator = require('./agents/agent-coordinator'); new coordinator().getAllAgentStatus();"
```

### Agent Status Check
```bash
# Check specific agent status
node -e "const agent = require('./agents/system-integrity-agent'); console.log(new agent().getAgentStatus());"
```

### Journal Health Check
```bash
# Check journal system health
node test-unified-journal.js
```

### Versioning Health Check
```bash
# Check versioning system health
node test-autonomous-versioning.js
```

### Principles Engine Check
```bash
# Check principles engine health
node test-principles-engine.js
```

---

## 📊 **Performance Issues**

### High Memory Usage
**Symptoms**:
- System running slowly
- Memory usage increasing over time
- Out of memory errors

**Solutions**:
1. **Check Memory Usage**:
   ```bash
   node -e "console.log(process.memoryUsage());"
   ```

2. **Monitor Agent Intervals**:
   ```javascript
   // Reduce agent intervals if too frequent
   const config = {
     interval: 600000 // 10 minutes instead of 5
   };
   ```

3. **Clear Caches**:
   ```bash
   # Clear any cached data
   rm -rf cache/
   ```

### Slow Performance
**Symptoms**:
- System responding slowly
- Long execution times
- Timeout errors

**Solutions**:
1. **Check System Load**:
   ```bash
   top
   ```

2. **Optimize Agent Intervals**:
   ```javascript
   // Adjust intervals based on system capacity
   const config = {
     systemIntegrity: { interval: 600000 },
     ideaCapture: { interval: 300000 },
     versioning: { interval: 120000 }
   };
   ```

3. **Check File System**:
   ```bash
   df -h
   ```

---

## 🔐 **Security Issues**

### Permission Errors
**Symptoms**:
- "Permission denied" errors
- Files not accessible
- Agents can't write to files

**Solutions**:
1. **Check File Permissions**:
   ```bash
   ls -la docs/
   chmod 664 docs/living/EVOLUTION_JOURNAL.md
   ```

2. **Check Directory Permissions**:
   ```bash
   ls -la .
   chmod 755 .
   ```

3. **Run as Correct User**:
   ```bash
   whoami
   sudo chown -R $USER:$USER .
   ```

### Access Control Issues
**Symptoms**:
- Unauthorized access attempts
- Security warnings
- Access denied errors

**Solutions**:
1. **Check Configuration**:
   ```javascript
   const securityConfig = {
     inputValidation: true,
     accessControl: true
   };
   ```

2. **Review Logs**:
   ```bash
   grep -i "security" logs/system.log
   ```

3. **Update Security Settings**:
   ```bash
   # Update security configuration
   node -e "console.log('Security check passed');"
   ```

---

## 📝 **Log Analysis**

### Common Log Patterns
```bash
# Check for errors
grep -i "error" logs/system.log

# Check for warnings
grep -i "warn" logs/system.log

# Check agent activity
grep -i "agent" logs/system.log

# Check versioning activity
grep -i "version" logs/system.log
```

### Log Rotation
```bash
# Set up log rotation
sudo logrotate -f /etc/logrotate.d/autonomous-evolution-system
```

---

## 🚀 **Recovery Procedures**

### System Recovery
1. **Stop All Agents**:
   ```bash
   pkill -f "node.*agent"
   ```

2. **Backup Current State**:
   ```bash
   cp -r . ../backup-$(date +%Y%m%d)
   ```

3. **Reset Configuration**:
   ```bash
   git checkout HEAD -- extension-config.json
   ```

4. **Restart System**:
   ```bash
   npm start
   ```

### Data Recovery
1. **Restore from Git**:
   ```bash
   git checkout HEAD -- docs/living/EVOLUTION_JOURNAL.md
   ```

2. **Restore from Backup**:
   ```bash
   cp ../backup-*/docs/living/EVOLUTION_JOURNAL.md docs/living/
   ```

3. **Verify Data Integrity**:
   ```bash
   node test-unified-journal.js
   ```

---

## 📞 **Support and Resources**

### Getting Help
1. **Check Documentation**:
   - [System Overview](../system/SYSTEM_OVERVIEW.md)
   - [API Reference](./API_REFERENCE.md)
   - [Configuration Guide](./CONFIGURATION_GUIDE.md)

2. **Review Logs**:
   ```bash
   tail -f logs/system.log
   ```

3. **Run Diagnostics**:
   ```bash
   node test-*.js
   ```

### Reporting Issues
When reporting issues, include:
- System configuration
- Error messages
- Log files
- Steps to reproduce
- Expected vs actual behavior

---

**This troubleshooting guide provides comprehensive solutions for common issues and helps maintain system health and performance.**
