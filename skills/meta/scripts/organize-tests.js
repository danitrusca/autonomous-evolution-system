/**
 * Test Organizer Implementation
 * Moves test files to tests/ and updates require paths
 */
const fs = require('fs');
const path = require('path');

class TestOrganizer {
    constructor(rootPath) {
        this.rootPath = rootPath || path.join(__dirname, '..', '..', '..');
        this.testsDir = path.join(this.rootPath, 'tests');
    }

    async organize() {
        console.log('[TestOrganizer] Scanning for test files...');

        if (!fs.existsSync(this.testsDir)) {
            fs.mkdirSync(this.testsDir);
        }

        const files = fs.readdirSync(this.rootPath);
        const testFiles = files.filter(f =>
            (f.startsWith('test-') || f.startsWith('verify-')) &&
            f.endsWith('.js')
        );

        console.log(`[TestOrganizer] Found ${testFiles.length} test files to move.`);

        let movedCount = 0;
        for (const file of testFiles) {
            await this.moveFile(file);
            movedCount++;
        }

        return { success: true, moved: movedCount };
    }

    async moveFile(filename) {
        const sourcePath = path.join(this.rootPath, filename);
        const destPath = path.join(this.testsDir, filename);

        console.log(`[TestOrganizer] Moving ${filename}...`);

        let content = fs.readFileSync(sourcePath, 'utf8');

        // Update require paths
        // 1. Update relative paths starting with ./ to ../
        content = content.replace(/require\(['"]\.\//g, "require('../");

        // 2. Update relative paths starting with ../ to ../../
        // Note: We need to be careful not to double-update if we just did ./ -> ../
        // But since we're moving one level deeper, existing ../ becomes ../../
        // The regex above handles ./ -> ../. 
        // If we have require('../foo'), it means it was already looking up. 
        // Now it needs to look up one more level: require('../../foo')

        // Let's do a more robust replacement strategy
        content = content.replace(/require\(['"]([^'"]+)['"]\)/g, (match, importPath) => {
            if (importPath.startsWith('.')) {
                // It's a relative path
                return `require('../${importPath}')`.replace('/./', '/');
            }
            return match;
        });

        // Fix any double slashes or weird paths if needed, 
        // but require('.././foo') resolves to require('../foo') usually.
        // Let's clean up require('.././') to require('../')
        content = content.replace(/require\(['"]\.\.\/\.\//g, "require('../");

        fs.writeFileSync(destPath, content);
        fs.unlinkSync(sourcePath);
        console.log(`[TestOrganizer] Moved and updated ${filename}`);
    }
}

module.exports = TestOrganizer;
