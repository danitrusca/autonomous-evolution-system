# 🧠 Multi-Model Synchronization Protocol

> **SYSTEM NOTICE**: This file serves as the shared memory and communication bus between different AI models (Antigravity, ChatGPT, Sonnet, Codex).
> **INSTRUCTION**: If you are an AI model reading this file, identify your role below and execute the "Next Steps" assigned to you.
> **NOTE**: Use `MODEL_FORUM.md` as a shared discussion board for any model to leave comments, questions, or updates about the current issue.

## 🎯 Current Objective
**Goal**: Evolve the Autonomous Evolution System to include real persistence and dynamic learning.
**Phase**: Phase 1 - Persistence Implementation

## 🤖 Model Roles

### 🏗️ The Architect (ChatGPT 5.1 / o1)
*   **Focus**: High-level logic, algorithms, trade-offs, and complex reasoning.
*   **Trigger**: When "Strategy" or "Algorithm Design" is needed.
*   **Action**: Read the "Problem" section, write the solution in "Architect's Scratchpad".

### 📚 The Librarian (Claude 3.5 Sonnet)
*   **Focus**: Documentation, context consistency, refactoring, and explaining code.
*   **Trigger**: When "Refactoring", "Documentation", or "Context Check" is needed.
*   **Action**: Review code in "Specialist's Scratchpad", ensure it matches `SYSTEM_MAP.md`, and refine comments.

### ⚡ The Specialist (ChatGPT Codex / GPT-4o)
*   **Focus**: Pure code generation, syntax, boilerplate, and implementation details.
*   **Trigger**: When "Implementation" or "Code Gen" is needed.
*   **Action**: Take the design from "Architect's Scratchpad" and generate executable code in "Specialist's Scratchpad".

### 🛠️ The Agent (Antigravity)
*   **Focus**: Execution, file system operations, terminal commands, verification.
*   **Trigger**: When "Apply", "Verify", or "Test" is needed.
*   **Action**: Read "Specialist's Scratchpad", apply changes to actual files, run tests, and report results back here.

### 🧠 Model Assignment Strategy
When creating plans, ALWAYS assign the best model for the job:
*   **[Architect]**: For "Why" and "What" (Strategy, Logic).
*   **[Librarian]**: For "How it fits" (Context, Docs, Safety).
*   **[Specialist]**: For "The Code" (Syntax, Boilerplate, Speed).
*   **[Agent]**: For "The Action" (Files, Terminal, Verification).

### 🛑 Breakpoints
Use the following syntax to signal a mandatory model switch:
`> [!IMPORTANT] 🛑 HANDOFF TO [MODEL NAME]`
*   **Why**: This signals the user to physically switch context or active model.
*   **When**: At the end of a distinct phase (e.g., after Strategy is written, before Code Gen starts).

---

## 🔄 State & Handoff

| Status | Current Owner | Last Action | Next Action |
| :--- | :--- | :--- | :--- |
| **COMPLETED** | **Librarian (Sonnet)** | Reviewed persistence implementation | **Antigravity**: Verify tests + consider Phase 2 planning |

---

### 🏗️ Architect's Scratchpad

- **Phase 2 Persistence Strategy (Architect Decision)**  
  - `solutionTemplates` uses the **same persistence pattern** as `patternDatabase`: markdown file (`docs/SOLUTION_TEMPLATES.md`) wrapping a JSON payload `{ schemaVersion, lastUpdated, templates }`, with deterministic key ordering and atomic writes.  
  - `learningInsights` uses a **hybrid strategy**: a lightweight, queryable index file (`docs/LEARNING_INSIGHTS.md`) with `{ schemaVersion, lastUpdated, insights[] }` plus rich narrative capture in `docs/living/AUTONOMOUS_EVOLUTION_JOURNAL_LIVING.md`.  
  - All three stores share the same schema version constant and fenced-JSON parsing helpers, and emit structured logs (`[metaLearning.patterns]`, `[metaLearning.templates]`, `[metaLearning.insights]`) for observability and cross-model monitoring.

### 📚 Librarian's Scratchpad

**Review Complete - Phase 1 Persistence Implementation**

**Architecture Alignment** ✅
- Meta-Learning Agent correctly sits in the Agents Layer per SYSTEM_MAP.md
- Persistence follows established AES patterns: human-readable markdown wrapping machine-parseable JSON
- Schema versioning (v1) enables future migrations without breaking existing patterns
- File location (`docs/PATTERN_DATABASE.md`) aligns with AES documentation structure

**Code Quality** ✅
- **Deterministic Serialization**: `buildPatternPayload()` sorts Map entries alphabetically before serialization, ensuring consistent git diffs and reliable comparisons
- **Atomic Writes**: `.tmp` → `rename()` pattern prevents partial writes and corruption on crashes
- **Graceful Degradation**: Missing/corrupt files trigger bootstrap rather than crashes; empty Map fallback maintains agent functionality
- **Observability**: `[metaLearning.patterns]` log prefix + structured events (`load.ok`, `save.fail`, `bootstrap.ok`) enable downstream monitoring

**Invariants Enforced** ✅
1. **Serialization Fidelity**: `patternDatabase` Map keys/values match persisted JSON `patterns` object after round-trip (tested in `test-pattern-database.js`)
2. **Never-Throw Persistence**: All load/save operations wrapped in try-catch with Map reset fallback; agent never crashes on I/O errors

**Documentation Clarity** ✅
- JSDoc comments explain purpose of each helper method
- Inline schema documentation via constants (`PATTERN_DB_SCHEMA_VERSION`, `PATTERN_DB_LOG_PREFIX`)
- Regression test demonstrates usage pattern and validates invariants
- Human-readable markdown format (`PATTERN_DATABASE.md`) allows manual inspection/debugging

**Integration Notes for Antigravity** 📝
- Code already applied to `agents/meta-learning-agent.js` (lines 612-788)
- Test script exists: `test-pattern-database.js` (passed locally per Specialist's report)
- Bootstrap creates `docs/` directory automatically if missing
- Logs use structured key=value format for easy parsing by monitoring tools

**Recommended Next Steps**:
1. **[Antigravity]** Re-run `node test-pattern-database.js` to confirm no regressions from doc updates
2. **[Antigravity]** Optional: Test persistence under load (rapid save cycles, concurrent agent instances) if multi-model scenarios require it
3. **[Architect]** Consider: Should `solutionTemplates` and `learningInsights` use the same persistence pattern, or different storage strategy?

**Rollback Path** 🔄
- Revert `agents/meta-learning-agent.js` (remove lines 12-13, 615-788)
- Delete `docs/PATTERN_DATABASE.md` and `test-pattern-database.js`
- Restore original stub methods (empty `loadPatternDatabase()`, console-only `savePatternDatabase()`)

**Standards Compliance** ✅
- Follows AES principle of "Living Documentation" (data is human-readable, machine-processable)
- Adheres to "True Autonomy" (system initializes and recovers automatically)
- Maintains "Self-Learning" capability (patterns now persist cross-session as foundation for dynamic learning)

### ⚡ Specialist's Scratchpad
- Updated `agents/meta-learning-agent.js` with schema constants, Markdown-wrapped JSON persistence, deterministic serialization, atomic saves, and structured logs (`[metaLearning.patterns] load/save/...`).
- Added helper methods `formatPatternDatabase`, `parsePatternDatabase`, `buildPatternPayload`, and `bootstrapPatternDatabaseFile` to keep invariants explicit (serialized map === in-memory map, missing files never throw).
- Seeded `docs/PATTERN_DATABASE.md` (schemaVersion 1) and created `test-pattern-database.js` to assert save→load round-trips plus rollback of the Markdown artifact.
- Test command: `cd autonomous-evolution-system; node test-pattern-database.js` (passes locally).
- Please ensure docs/System Map reference the new persistence behavior and note the new log prefixes for observability.

> [!IMPORTANT] 🛑 HANDOFF TO **AGENT (Antigravity)**
> 
> **Librarian Review Complete**: Implementation adheres to SYSTEM_MAP.md architecture, maintains AES coding standards (deterministic serialization, atomic writes, graceful degradation), and enforces both stated invariants. All JSDoc comments are clear, logs are structured, and test coverage validates round-trip persistence. Ready for final verification and Phase 2 planning.
