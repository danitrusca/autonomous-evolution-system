/**
 * Setup Script for Changelog Git Hook
 * Installs post-commit hook to automatically update CHANGE_LOG.md
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootPath = path.join(__dirname, '..');
const gitHooksSource = path.join(__dirname, '.git-hooks', 'post-commit');
const gitHooksDest = path.join(rootPath, '.git', 'hooks', 'post-commit');

console.log('📦 Setting up automatic changelog system...\n');

// Step 1: Check if git repository exists
console.log('1️⃣ Checking git repository...');
if (!fs.existsSync(path.join(rootPath, '.git'))) {
  console.error('❌ Error: Not a git repository');
  process.exit(1);
}
console.log('✅ Git repository found\n');

// Step 2: Create .git/hooks directory if it doesn't exist
console.log('2️⃣ Checking hooks directory...');
const hooksDir = path.join(rootPath, '.git', 'hooks');
if (!fs.existsSync(hooksDir)) {
  fs.mkdirSync(hooksDir, { recursive: true });
  console.log('✅ Created hooks directory');
} else {
  console.log('✅ Hooks directory exists');
}
console.log('');

// Step 3: Copy post-commit hook
console.log('3️⃣ Installing post-commit hook...');
if (fs.existsSync(gitHooksDest)) {
  console.log('⚠️  Post-commit hook already exists');
  console.log('   Creating backup...');
  fs.copyFileSync(gitHooksDest, `${gitHooksDest}.backup`);
  console.log('   ✅ Backup created: post-commit.backup');
}

fs.copyFileSync(gitHooksSource, gitHooksDest);

// Make executable (Unix/Mac)
if (process.platform !== 'win32') {
  try {
    execSync(`chmod +x "${gitHooksDest}"`);
    console.log('✅ Hook installed and made executable\n');
  } catch (error) {
    console.log('⚠️  Could not make hook executable');
    console.log('   Run manually: chmod +x .git/hooks/post-commit\n');
  }
} else {
  console.log('✅ Hook installed (Windows)\n');
}

// Step 4: Test the changelog agent
console.log('4️⃣ Testing changelog agent...');
const ChangelogAgent = require('./agents/changelog-agent.js');
const agent = new ChangelogAgent();

console.log('✅ Changelog agent loaded successfully\n');

// Step 5: Show recent entries
console.log('5️⃣ Recent changelog entries:');
const recentEntries = agent.getRecentEntries(5);
if (recentEntries.length > 0) {
  recentEntries.forEach(entry => {
    console.log(`   • ${entry.title}`);
  });
} else {
  console.log('   (No entries yet - changelog will be populated with next commit)');
}
console.log('');

// Step 6: Summary
console.log('✅ Setup complete!\n');
console.log('📝 How it works:');
console.log('   • Every git commit automatically updates docs/logs&reports/CHANGE_LOG.md');
console.log('   • Commit messages are parsed for type, impact, and details');
console.log('   • Changelog maintains chronological order');
console.log('   • Manual entries can be added via: node agents/changelog-agent.js add\n');

console.log('🚀 Test it:');
console.log('   • Make a commit with: git commit -m "feat: your change"');
console.log('   • Check: cat docs/logs&reports/CHANGE_LOG.md');
console.log('   • View recent: node agents/changelog-agent.js recent\n');

console.log('💡 Commit message format:');
console.log('   feat: New feature');
console.log('   fix: Bug fix');
console.log('   refactor: Code restructuring');
console.log('   docs: Documentation update');
console.log('   \n   Add details with bullet points for better changelog entries!\n');

