/**
 * Skill Runner
 * 
 * Executes skills defined in markdown files.
 * Parses the markdown to find executable code blocks or linked scripts.
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

class SkillRunner {
    constructor(skillsDir) {
        this.skillsDir = skillsDir || path.join(__dirname, '..', 'skills');
    }

    /**
     * Execute a skill by name
     * @param {string} skillName - Name of the skill (filename without extension)
     * @param {object} context - Context to pass to the skill
     * @returns {Promise<object>} Execution result
     */
    async executeSkill(skillName, context = {}) {
        console.log(`[SkillRunner] Executing skill: ${skillName}`);

        const skillPath = this.findSkillPath(skillName);
        if (!skillPath) {
            throw new Error(`Skill ${skillName} not found`);
        }

        const content = fs.readFileSync(skillPath, 'utf8');
        const executableBlock = this.extractExecutableBlock(content);

        if (!executableBlock) {
            console.log(`[SkillRunner] No executable block found for ${skillName}. Treating as manual/process skill.`);
            return { executed: false, type: 'manual', content: content };
        }

        return this.runCodeBlock(executableBlock, context);
    }

    findSkillPath(skillName) {
        // Search recursively in skills directory
        const searchDir = (dir) => {
            const files = fs.readdirSync(dir);
            for (const file of files) {
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);

                if (stat.isDirectory()) {
                    const result = searchDir(filePath);
                    if (result) return result;
                } else if (file === `${skillName}.md`) {
                    return filePath;
                }
            }
            return null;
        };

        return searchDir(this.skillsDir);
    }

    extractExecutableBlock(content) {
        // Look for ```javascript executable or ```bash executable blocks
        const jsMatch = content.match(/```javascript executable\n([\s\S]*?)\n```/);
        if (jsMatch) return { type: 'javascript', code: jsMatch[1] };

        const bashMatch = content.match(/```bash executable\n([\s\S]*?)\n```/);
        if (bashMatch) return { type: 'bash', code: bashMatch[1] };

        return null;
    }

    async runCodeBlock(block, context) {
        if (block.type === 'javascript') {
            // For safety in this demo, we'll just log what would run
            // In a real system, this would use vm2 or similar sandbox
            console.log('[SkillRunner] Would execute JavaScript:', block.code);
            return { executed: true, type: 'javascript', output: 'Simulation: JS executed' };
        }

        if (block.type === 'bash') {
            console.log('[SkillRunner] Would execute Bash:', block.code);
            return { executed: true, type: 'bash', output: 'Simulation: Bash executed' };
        }
    }
}

module.exports = SkillRunner;
