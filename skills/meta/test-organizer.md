---
name: "test-organizer"
description: "Automatically organize test files into the tests directory and update their dependencies"
version: "1.0.0"
trigger: "When new test files are created in the root directory"
invariant: "All test files reside in tests/ and have correct import paths"
dependencies: ["file-system-manager"]
category: "meta"
author: "Antigravity"
created: "2025-11-19"
---

# Test Organizer

## Purpose

Maintain a clean project root by automatically moving test and verification scripts into the `tests/` directory. This skill ensures that the project structure remains organized as the number of tests grows.

## Workflow

### 1. Scan
- Scan the project root for files matching `test-*.js` or `verify-*.js`.

### 2. Move & Update
- Move identified files to `tests/`.
- Update `require()` paths in the moved files to account for the new directory depth (e.g., `require('./agent')` becomes `require('../agent')`).

### 3. Verify
- Ensure the file exists in the new location.
- (Optional) Run the test to verify imports still resolve.

## Execution

```javascript executable
const TestOrganizer = require('./scripts/organize-tests');
const organizer = new TestOrganizer();
await organizer.organize();
```
