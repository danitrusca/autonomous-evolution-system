/**
 * Changelog Agent
 * Automatically updates the system-wide CHANGE_LOG.md and SYSTEM_HIGHLIGHTS.md with every change
 * Invariant: All significant system changes are chronologically recorded
 * Highlights: Revolutionary and Major changes are added to SYSTEM_HIGHLIGHTS.md
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ChangelogAgent {
  constructor() {
    this.agentName = 'changelog-agent';
    this.rootPath = path.join(__dirname, '..');
    this.changelogPath = path.join(this.rootPath, 'docs', 'logs&reports', 'CHANGE_LOG.md');
    this.highlightsPath = path.join(this.rootPath, 'docs', 'logs&reports', 'SYSTEM_HIGHLIGHTS.md');
    this.changeHistory = [];
  }

  /**
   * Add entry to changelog from git commit
   * Invariant: Commit metadata is preserved accurately
   */
  async addCommitEntry(commitHash = 'HEAD') {
    console.log(`[${this.agentName}] Adding commit entry: ${commitHash}`);
    
    try {
      // Get commit information
      const commitInfo = this.getCommitInfo(commitHash);
      
      if (!commitInfo) {
        console.log(`[${this.agentName}] No commit info found`);
        return { success: false, reason: 'no_commit_info' };
      }

      // Parse commit message for type and details
      const entry = this.parseCommitToEntry(commitInfo);
      
      // Add to changelog
      await this.insertEntry(entry);
      
      // Add to highlights if Revolutionary or Major
      if (entry.impact === 'Revolutionary' || entry.impact === 'Major') {
        await this.insertHighlight(entry);
        console.log(`[${this.agentName}] Highlights updated for ${entry.impact} change`);
      }
      
      console.log(`[${this.agentName}] Changelog updated successfully`);
      return { success: true, entry };
      
    } catch (error) {
      console.error(`[${this.agentName}] Error updating changelog:`, error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get commit information from git
   */
  getCommitInfo(commitHash) {
    try {
      const format = '--format=%H%n%an%n%ae%n%ai%n%s%n%b';
      const output = execSync(`git log -1 ${format} ${commitHash}`, {
        cwd: this.rootPath,
        encoding: 'utf8'
      });
      
      const lines = output.trim().split('\n');
      
      // Get changed files
      const filesChanged = execSync(`git diff-tree --no-commit-id --name-only -r ${commitHash}`, {
        cwd: this.rootPath,
        encoding: 'utf8'
      }).trim().split('\n').filter(Boolean);
      
      // Get stats
      const stats = execSync(`git diff-tree --no-commit-id --numstat -r ${commitHash}`, {
        cwd: this.rootPath,
        encoding: 'utf8'
      });
      
      return {
        hash: lines[0],
        author: lines[1],
        email: lines[2],
        date: lines[3],
        subject: lines[4],
        body: lines.slice(5).join('\n'),
        filesChanged,
        stats
      };
      
    } catch (error) {
      console.error(`[${this.agentName}] Error getting commit info:`, error.message);
      return null;
    }
  }

  /**
   * Parse commit information into changelog entry
   */
  parseCommitToEntry(commitInfo) {
    // Extract type from commit message (feat:, fix:, refactor:, docs:, etc.)
    const typeMatch = commitInfo.subject.match(/^(feat|fix|refactor|docs|style|test|chore|perf)(\(.+\))?:/i);
    const type = typeMatch ? this.mapCommitType(typeMatch[1]) : 'Enhancement';
    
    // Remove type prefix from subject
    const title = commitInfo.subject.replace(/^(feat|fix|refactor|docs|style|test|chore|perf)(\(.+\))?:\s*/i, '');
    
    // Determine impact level
    const impact = this.determineImpact(commitInfo);
    
    // Extract date and time
    const date = new Date(commitInfo.date);
    const dateStr = date.toISOString().split('T')[0];
    const timeStr = date.toTimeString().split(' ')[0].substring(0, 5);
    
    // Parse body for additional details
    const changes = this.extractChanges(commitInfo.body, commitInfo.filesChanged);
    const benefit = this.extractBenefit(commitInfo.body);
    const learning = this.extractLearning(commitInfo.body);
    
    return {
      date: dateStr,
      time: timeStr,
      title,
      type,
      impact,
      commit: commitInfo.hash.substring(0, 7),
      changes,
      benefit,
      learning,
      filesChanged: commitInfo.filesChanged.length
    };
  }

  /**
   * Map conventional commit types to changelog types
   */
  mapCommitType(commitType) {
    const typeMap = {
      'feat': 'Feature',
      'fix': 'Bugfix',
      'refactor': 'Refactor',
      'docs': 'Documentation',
      'style': 'Enhancement',
      'test': 'Enhancement',
      'chore': 'Configuration',
      'perf': 'Enhancement'
    };
    return typeMap[commitType.toLowerCase()] || 'Enhancement';
  }

  /**
   * Determine impact level from commit
   */
  determineImpact(commitInfo) {
    const body = commitInfo.body.toLowerCase();
    const subject = commitInfo.subject.toLowerCase();
    
    // Revolutionary keywords
    if (body.includes('breakthrough') || body.includes('revolutionary') || 
        subject.includes('major') || body.includes('major feature')) {
      return 'Revolutionary';
    }
    
    // Major keywords
    if (subject.includes('feat') || body.includes('significant') || 
        commitInfo.filesChanged.length > 10) {
      return 'Major';
    }
    
    // Minor keywords
    if (subject.includes('fix') || subject.includes('chore')) {
      return 'Minor';
    }
    
    return 'Enhancement';
  }

  /**
   * Extract changes list from commit body
   */
  extractChanges(body, filesChanged) {
    const changes = [];
    
    // Look for bullet points in body
    const lines = body.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        changes.push(trimmed.substring(1).trim());
      }
    }
    
    // If no explicit changes, list files
    if (changes.length === 0 && filesChanged.length > 0) {
      if (filesChanged.length <= 5) {
        changes.push(...filesChanged.map(f => `Modified \`${f}\``));
      } else {
        changes.push(`Modified ${filesChanged.length} files`);
      }
    }
    
    return changes;
  }

  /**
   * Extract benefit statement from commit body
   */
  extractBenefit(body) {
    // Look for "Benefit:", "Reasoning:", "Why:", etc.
    const benefitMatch = body.match(/(?:benefit|reasoning|why):\s*(.+?)(?:\n\n|$)/is);
    if (benefitMatch) {
      return benefitMatch[1].trim();
    }
    return null;
  }

  /**
   * Extract learning from commit body
   */
  extractLearning(body) {
    // Look for "Learning:", "Insight:", "Lesson:", etc.
    const learningMatch = body.match(/(?:learning|insight|lesson):\s*(.+?)(?:\n\n|$)/is);
    if (learningMatch) {
      return learningMatch[1].trim();
    }
    return null;
  }

  /**
   * Insert entry into changelog
   * Invariant: Chronological order is maintained
   */
  async insertEntry(entry) {
    // Read current changelog
    let changelog = fs.existsSync(this.changelogPath) 
      ? fs.readFileSync(this.changelogPath, 'utf8')
      : this.createEmptyChangelog();
    
    // Find insertion point (after date header or create new date section)
    const dateHeader = `## ${entry.date}`;
    
    let insertionPoint;
    if (changelog.includes(dateHeader)) {
      // Insert after existing date header
      insertionPoint = changelog.indexOf(dateHeader);
      // Find the next line after the date header
      insertionPoint = changelog.indexOf('\n', insertionPoint) + 1;
    } else {
      // Create new date section
      // Find where to insert (chronological order)
      const formatSectionMatch = changelog.match(/## Format Guide/);
      if (formatSectionMatch) {
        insertionPoint = formatSectionMatch.index;
      } else {
        // Insert after header
        const headerEnd = changelog.indexOf('---', 200);
        insertionPoint = headerEnd + 4;
      }
      
      // Add new date header
      const dateSection = `\n${dateHeader}\n\n`;
      changelog = changelog.slice(0, insertionPoint) + dateSection + changelog.slice(insertionPoint);
      insertionPoint += dateSection.length;
    }
    
    // Format entry
    const entryText = this.formatEntry(entry);
    
    // Insert entry
    changelog = changelog.slice(0, insertionPoint) + entryText + '\n' + changelog.slice(insertionPoint);
    
    // Update statistics
    changelog = this.updateStatistics(changelog);
    
    // Write back
    fs.writeFileSync(this.changelogPath, changelog, 'utf8');
  }

  /**
   * Format entry as markdown
   */
  formatEntry(entry) {
    let text = `### ${entry.title}\n`;
    text += `**Type**: ${entry.type}  \n`;
    text += `**Commit**: \`${entry.commit}\`  \n`;
    text += `**Impact**: ${entry.impact}  \n\n`;
    
    if (entry.changes.length > 0) {
      text += `**Changes**:\n`;
      entry.changes.forEach(change => {
        text += `- ${change}\n`;
      });
      text += '\n';
    }
    
    if (entry.benefit) {
      text += `**Benefit**: ${entry.benefit}\n\n`;
    }
    
    if (entry.learning) {
      text += `**Learning**: ${entry.learning}\n\n`;
    }
    
    text += `**Files Changed**: ${entry.filesChanged}\n`;
    text += `\n---\n`;
    
    return text;
  }

  /**
   * Update statistics in changelog
   */
  updateStatistics(changelog) {
    // Count entries (look for ### headers that aren't section headers)
    const entryMatches = changelog.match(/^### [^#\n]/gm);
    const entryCount = entryMatches ? entryMatches.length : 0;
    
    // Update last updated time
    const now = new Date().toISOString();
    
    // Replace statistics section
    changelog = changelog.replace(
      /\*\*Total Entries\*\*: \d+/,
      `**Total Entries**: ${entryCount}`
    );
    
    changelog = changelog.replace(
      /\*\*Last Updated\*\*: .+/,
      `**Last Updated**: ${now}`
    );
    
    return changelog;
  }

  /**
   * Create empty changelog template
   */
  createEmptyChangelog() {
    return `# System Change Log
*Auto-Generated Chronological History of All System Changes*

> **Purpose**: This is the **complete chronological record** of all system changes, updates, and evolution. Auto-updates with every commit and system change.

---

## Statistics

**Total Entries**: 0  
**Last Updated**: ${new Date().toISOString()}  
**Update Frequency**: Real-time with every system change  

---

*This change log is automatically generated and maintained.*
`;
  }

  /**
   * Add manual entry (for non-commit changes)
   */
  async addManualEntry(entry) {
    console.log(`[${this.agentName}] Adding manual entry: ${entry.title}`);
    
    const now = new Date();
    const fullEntry = {
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().split(' ')[0].substring(0, 5),
      ...entry,
      commit: entry.commit || 'manual',
      impact: entry.impact || 'Enhancement'
    };
    
    await this.insertEntry(fullEntry);
    
    // Add to highlights if Revolutionary or Major
    if (this.isHighlightWorthy(fullEntry)) {
      await this.insertHighlight(fullEntry);
    }
    
    return { success: true, entry: fullEntry };
  }

  /**
   * Get recent entries
   */
  getRecentEntries(count = 10) {
    if (!fs.existsSync(this.changelogPath)) {
      return [];
    }
    
    const changelog = fs.readFileSync(this.changelogPath, 'utf8');
    const entries = [];
    
    const entryRegex = /^### (.+?)$/gm;
    let match;
    
    while ((match = entryRegex.exec(changelog)) !== null && entries.length < count) {
      const title = match[1];
      // Skip section headers
      if (!title.includes('Format Guide') && !title.includes('Change Categories')) {
        entries.push({ title });
      }
    }
    
    return entries;
  }

  /**
   * Check if entry is highlight-worthy
   * Invariant: Only Revolutionary and Major changes go to highlights
   */
  isHighlightWorthy(entry) {
    return entry.impact === 'Revolutionary' || entry.impact === 'Major';
  }

  /**
   * Insert entry into SYSTEM_HIGHLIGHTS.md
   * Invariant: Narrative style, inspiring format, chronological order
   */
  async insertHighlight(entry) {
    if (!this.isHighlightWorthy(entry)) {
      return; // Only Revolutionary and Major changes
    }

    // Read current highlights
    let highlights = fs.existsSync(this.highlightsPath) 
      ? fs.readFileSync(this.highlightsPath, 'utf8')
      : this.createEmptyHighlights();
    
    // Find insertion point (after date header or create new date section)
    const dateHeader = `## ${entry.date}`;
    
    let insertionPoint;
    if (highlights.includes(dateHeader)) {
      // Insert after existing date header
      insertionPoint = highlights.indexOf(dateHeader);
      // Find the end of the date header line
      insertionPoint = highlights.indexOf('\n', insertionPoint) + 1;
      // Skip blank line if present
      if (highlights[insertionPoint] === '\n') {
        insertionPoint++;
      }
    } else {
      // Create new date section - find where to insert chronologically
      // Parse all date sections to find insertion point
      const dateSectionRegex = /## (\d{4}-\d{2}-\d{2})/g;
      const dates = [];
      let match;
      
      while ((match = dateSectionRegex.exec(highlights)) !== null) {
        dates.push({ date: match[1], index: match.index });
      }
      
      // Sort dates (newest first, which is how highlights are organized)
      dates.sort((a, b) => b.date.localeCompare(a.date));
      
      // Find where to insert (after the first date that's <= entry.date)
      let insertAfterIndex = -1;
      for (let i = 0; i < dates.length; i++) {
        if (dates[i].date <= entry.date) {
          insertAfterIndex = dates[i].index;
          break;
        }
      }
      
      if (insertAfterIndex >= 0) {
        // Insert after this date section
        // Find the end of this section (before next ## or before "## Philosophy" or similar)
        let sectionEnd = highlights.indexOf('\n## ', insertAfterIndex + 10);
        if (sectionEnd < 0) {
          sectionEnd = highlights.indexOf('\n## Philosophy', insertAfterIndex);
        }
        if (sectionEnd < 0) {
          sectionEnd = highlights.indexOf('\n## What Makes', insertAfterIndex);
        }
        if (sectionEnd < 0) {
          sectionEnd = highlights.indexOf('\n## Current State', insertAfterIndex);
        }
        if (sectionEnd < 0) {
          sectionEnd = highlights.indexOf('\n## Looking Forward', insertAfterIndex);
        }
        
        if (sectionEnd > insertAfterIndex) {
          insertionPoint = sectionEnd;
        } else {
          // Find end of section by looking for next separator
          const nextSeparator = highlights.indexOf('\n---\n', insertAfterIndex);
          if (nextSeparator > insertAfterIndex) {
            insertionPoint = nextSeparator;
          } else {
            insertionPoint = insertAfterIndex + 20; // Fallback
          }
        }
      } else {
        // Insert at the beginning (newest date)
        const headerEnd = highlights.indexOf('---', 200);
        insertionPoint = headerEnd + 4;
      }
      
      // Add new date header
      const dateSection = `\n${dateHeader}\n\n`;
      highlights = highlights.slice(0, insertionPoint) + dateSection + highlights.slice(insertionPoint);
      insertionPoint += dateSection.length;
    }
    
    // Format highlight entry (narrative style)
    const highlightText = this.formatHighlight(entry);
    
    // Insert highlight
    highlights = highlights.slice(0, insertionPoint) + highlightText + '\n' + highlights.slice(insertionPoint);
    
    // Update last updated timestamp
    highlights = this.updateHighlightsTimestamp(highlights);
    
    // Write back
    fs.writeFileSync(this.highlightsPath, highlights, 'utf8');
    console.log(`[${this.agentName}] Highlight added: ${entry.title}`);
  }

  /**
   * Format highlight entry in narrative style
   * Invariant: Beautiful, inspiring, human-readable format
   */
  formatHighlight(entry) {
    let text = `### ${entry.title}\n\n`;
    
    // Create narrative description from benefit and learning
    const narrative = this.createNarrative(entry);
    text += narrative + '\n\n';
    
    // Add impact statement
    if (entry.benefit) {
      text += `**Impact**: ${entry.benefit}\n\n`;
    } else if (entry.impact === 'Revolutionary') {
      text += `**Impact**: A breakthrough that fundamentally changes how the system operates.\n\n`;
    } else {
      text += `**Impact**: A significant enhancement that improves system capabilities.\n\n`;
    }
    
    text += '---\n';
    
    return text;
  }

  /**
   * Create narrative description from entry
   * Invariant: Inspiring, story-like format
   */
  createNarrative(entry) {
    // Start with impact-based opening
    let narrative = '';
    
    if (entry.impact === 'Revolutionary') {
      narrative = 'The system achieved a breakthrough: ';
    } else if (entry.impact === 'Major') {
      narrative = 'The system evolved: ';
    }
    
    // Build narrative from learning, benefit, or title
    if (entry.learning) {
      // Use learning as primary narrative
      narrative += entry.learning;
      
      // Add benefit as additional context if available
      if (entry.benefit && entry.benefit !== entry.learning) {
        narrative += ` ${entry.benefit}`;
      }
    } else if (entry.benefit) {
      // Use benefit as narrative
      narrative += entry.benefit;
    } else {
      // Generate from title and changes
      const keyConcept = entry.title.split(' - ')[0] || entry.title;
      narrative += `Implemented ${keyConcept.toLowerCase()}.`;
      
      // Add first change as context if available
      if (entry.changes.length > 0) {
        const firstChange = entry.changes[0];
        // Clean up change text (remove "Modified" prefix, etc.)
        const cleanChange = firstChange.replace(/^Modified\s+/, '').replace(/^Created\s+/, '');
        narrative += ` ${cleanChange}`;
      }
    }
    
    return narrative;
  }

  /**
   * Update last updated timestamp in highlights
   */
  updateHighlightsTimestamp(highlights) {
    const now = new Date().toISOString().split('T')[0];
    highlights = highlights.replace(
      /\*\*Last Updated\*\*: \d{4}-\d{2}-\d{2}/,
      `**Last Updated**: ${now}`
    );
    return highlights;
  }

  /**
   * Create empty highlights template
   */
  createEmptyHighlights() {
    return `# System Highlights
*A Chronicle of Breakthroughs and Beautiful Evolution*

> This is your **jar of awesome**—a curated collection of the major features and breakthroughs that define this system's journey. Not a technical log, but a story of growth, learning, and transformation.

---

**Last Updated**: ${new Date().toISOString().split('T')[0]}

---

*This document is manually curated to preserve the narrative quality and inspirational value. For complete technical details, see \`docs/logs&reports/CHANGE_LOG.md\`.*
`;
  }
}

module.exports = ChangelogAgent;

// CLI usage
if (require.main === module) {
  const agent = new ChangelogAgent();
  
  const args = process.argv.slice(2);
  const command = args[0] || 'add';
  
  if (command === 'add') {
    const commitHash = args[1] || 'HEAD';
    agent.addCommitEntry(commitHash).then(result => {
      if (result.success) {
        console.log('✅ Changelog updated successfully');
      } else {
        console.log('❌ Failed to update changelog:', result.reason || result.error);
      }
    });
  } else if (command === 'recent') {
    const count = parseInt(args[1]) || 10;
    const entries = agent.getRecentEntries(count);
    console.log(`\n📝 Recent ${entries.length} entries:\n`);
    entries.forEach(entry => {
      console.log(`  • ${entry.title}`);
    });
  } else {
    console.log('Usage: node changelog-agent.js [add|recent] [commit-hash|count]');
  }
}

