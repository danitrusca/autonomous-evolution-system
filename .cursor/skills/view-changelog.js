/**
 * Skills Changelog Viewer
 * Display the Skills Protocol changelog with formatting
 */

const fs = require('fs');
const path = require('path');

class ChangelogViewer {
  constructor() {
    this.changelogPath = path.join(__dirname, 'SKILLS_CHANGELOG.md');
  }

  /**
   * Display the full changelog
   * Invariant: Changelog is displayed with proper formatting
   */
  displayFullChangelog() {
    try {
      const changelog = fs.readFileSync(this.changelogPath, 'utf8');
      console.log('\n' + '='.repeat(80));
      console.log('SKILLS PROTOCOL CHANGELOG');
      console.log('='.repeat(80));
      console.log(changelog);
      console.log('='.repeat(80));
    } catch (error) {
      console.error('[changelog-viewer] Error reading changelog:', error.message);
    }
  }

  /**
   * Display recent entries
   * Invariant: Recent entries are displayed with timestamps
   */
  displayRecentEntries(count = 10) {
    try {
      const changelog = fs.readFileSync(this.changelogPath, 'utf8');
      const lines = changelog.split('\n');
      
      console.log('\n' + '='.repeat(60));
      console.log(`RECENT SKILLS CHANGELOG ENTRIES (Last ${count})`);
      console.log('='.repeat(60));
      
      let entryCount = 0;
      let inEntry = false;
      let currentEntry = [];
      
      for (const line of lines) {
        if (line.startsWith('### ')) {
          if (inEntry && entryCount < count) {
            console.log(currentEntry.join('\n'));
            console.log('-'.repeat(60));
            entryCount++;
          }
          currentEntry = [line];
          inEntry = true;
        } else if (inEntry) {
          currentEntry.push(line);
        }
      }
      
      // Display last entry if we haven't reached count
      if (inEntry && entryCount < count) {
        console.log(currentEntry.join('\n'));
      }
      
      console.log('='.repeat(60));
    } catch (error) {
      console.error('[changelog-viewer] Error reading recent entries:', error.message);
    }
  }

  /**
   * Display skill evolution summary
   * Invariant: Summary includes key metrics and insights
   */
  displayEvolutionSummary() {
    try {
      const changelog = fs.readFileSync(this.changelogPath, 'utf8');
      
      console.log('\n' + '='.repeat(60));
      console.log('SKILLS EVOLUTION SUMMARY');
      console.log('='.repeat(60));
      
      // Count skills created
      const skillCreations = (changelog.match(/Skill Creation/g) || []).length;
      console.log(`Skills Created: ${skillCreations}`);
      
      // Count pattern detections
      const patternDetections = (changelog.match(/Pattern Detection/g) || []).length;
      console.log(`Pattern Detections: ${patternDetections}`);
      
      // Count autonomous executions
      const autonomousExecutions = (changelog.match(/Autonomous Execution/g) || []).length;
      console.log(`Autonomous Executions: ${autonomousExecutions}`);
      
      // Count skill evolutions
      const skillEvolutions = (changelog.match(/Skill Evolution/g) || []).length;
      console.log(`Skill Evolutions: ${skillEvolutions}`);
      
      console.log('\nKey Insights:');
      console.log('- Skills represent persistent procedural capabilities');
      console.log('- Autonomous learning enables continuous improvement');
      console.log('- Pattern-based skill generation adapts to user needs');
      console.log('- ECP integration ensures quality and safety');
      console.log('- Cumulative intelligence compounds over time');
      
      console.log('='.repeat(60));
    } catch (error) {
      console.error('[changelog-viewer] Error reading evolution summary:', error.message);
    }
  }

  /**
   * Display system health metrics
   * Invariant: Metrics reflect current system status
   */
  displaySystemHealth() {
    try {
      const changelog = fs.readFileSync(this.changelogPath, 'utf8');
      
      console.log('\n' + '='.repeat(60));
      console.log('SYSTEM HEALTH METRICS');
      console.log('='.repeat(60));
      
      // Extract metrics from changelog
      const metricsMatch = changelog.match(/### \d{4}-\d{2}-\d{2}: System Health Update[\s\S]*?(?=###|\Z)/);
      if (metricsMatch) {
        console.log(metricsMatch[0]);
      } else {
        console.log('No system health metrics available yet.');
        console.log('Run the autonomous system to generate metrics.');
      }
      
      console.log('='.repeat(60));
    } catch (error) {
      console.error('[changelog-viewer] Error reading system health:', error.message);
    }
  }

  /**
   * Display help information
   * Invariant: Help includes all available commands
   */
  displayHelp() {
    console.log('\n' + '='.repeat(60));
    console.log('SKILLS CHANGELOG VIEWER HELP');
    console.log('='.repeat(60));
    console.log('Usage: node view-changelog.js [command]');
    console.log('');
    console.log('Commands:');
    console.log('  full        - Display full changelog');
    console.log('  recent [n]  - Display recent entries (default: 10)');
    console.log('  summary     - Display evolution summary');
    console.log('  health      - Display system health metrics');
    console.log('  help        - Display this help');
    console.log('');
    console.log('Examples:');
    console.log('  node view-changelog.js full');
    console.log('  node view-changelog.js recent 5');
    console.log('  node view-changelog.js summary');
    console.log('  node view-changelog.js health');
    console.log('='.repeat(60));
  }
}

// Main execution
const viewer = new ChangelogViewer();
const command = process.argv[2];
const arg = process.argv[3];

switch (command) {
  case 'full':
    viewer.displayFullChangelog();
    break;
  case 'recent':
    const count = arg ? parseInt(arg) : 10;
    viewer.displayRecentEntries(count);
    break;
  case 'summary':
    viewer.displayEvolutionSummary();
    break;
  case 'health':
    viewer.displaySystemHealth();
    break;
  case 'help':
  default:
    viewer.displayHelp();
    break;
}
