# BUG PATTERNS
A canonical ontology of all recurring bug types.

This file defines:
- Categories of bugs
- Conceptual descriptions
- Root-cause structures
- Detection cues
- Fix strategies
- Links to real-world instances

This is the conceptual backbone of the Bug Library.

---

## Reading Instructions for Agents

- This file defines the bug ontology (patterns).
- Always start here when analyzing a new bug.
- First: classify the bug under one or more existing patterns.
- If no pattern fits, propose a new pattern stub in the same style.
- Link real incidents from BUG_JOURNAL.md back to these patterns.

---

# System Overview & Vision

## 1. Purpose of the Bug Pattern Library
This library captures the *deep structures* behind software failure.  
While the Bug Journal records individual incidents, this file records the **archetypes** — the reusable templates that describe how bugs behave across languages, frameworks, and projects.

Patterns are:
- Language-agnostic where possible  
- Rooted in real incidents  
- Cleanly separated from instances  
- Designed to be mapped by future AI agents  

This separation mirrors your Autonomous Evolution System:
- **Journal → Incidents**
- **Pattern Archive → Concepts**
- **Principles → Practices**

Together, they form a complete debugging ontology.

---

## 2. Future Vision (Full Agentic Debugger)
The Pattern Library becomes the core reasoning substrate of a future **Agentic Debugger** that can:

- Identify symptoms  
- Hypothesize root causes  
- Query patterns  
- Find similar cases  
- Suggest tests  
- Instrument code  
- Validate fixes  
- Add new instances  
- Refine patterns over time  

This transforms debugging from “hunt and guess” into **ontology-guided reasoning**.

When combined with:
- a relational DB (for structured fields)
- a vector index (for semantic similarity)
- agentic loops (for hypothesis refinement)
- and your Bug Journal (for real examples)

…this library becomes the spine of an **autonomous debugging intelligence system.**

---

# Canonical Categories (Seed)

## 1. Logic Errors
Fundamental reasoning mistakes in conditions, branching, or flow.

### OFF_BY_ONE
**Definition:** Incorrect boundary or loop limit.  
**Symptoms:** Missing last element, extra iteration, empty result.  
**Root Cause:** Misunderstanding inclusive vs exclusive boundaries.  
**Detection Cues:** Slice ranges, `i <=`, fencepost arithmetic, pagination.  
**Fix Strategies:** Explicit tests for 0, 1, N, N+1 counts.  
**Related Instances:** (link from journal)

### WRONG_BRANCH_PATH
### WRONG_BRANCH_PATH
### CASE_NOT_MUTUALLY_EXCLUSIVE

### OVER_NORMALIZATION
**Definition:** Data cleaning or ID normalization logic is too aggressive, destroying distinctiveness.
**Symptoms:** Different entities collapse into one; hash collisions.
**Root Cause:** Assuming a specific URL/data format (e.g. "IDs are always in the path") when exceptions exist.
**Fix Strategies:** Test normalization against all known URL variants, including "Project" URLs, shared links, etc.
**Related Instances:** BUG-2025-11-24-004

### BUNDLED_REFACTOR_RISK
**Definition:** A regression caused by changing code unrelated to the requested fix "while we're at it".
**Symptoms:** A fix for Feature A breaks Feature B.
**Root Cause:** Lack of discipline in separating "Fix" commits from "Refactor" commits.
**Fix Strategies:** Atomic Commits. Fix the title. Verify. Then refactor the ID logic.
**Related Instances:** BUG-2025-11-24-004

---

## 2. State Errors
Problems caused by stale, unsynchronized, or mutated state.

### STALE_STATE
**Definition:** Code uses outdated values, especially in async flows.  
**Symptoms:** UI not updating, handlers referencing old closures.  
**Root Cause:** Closure capture, asynchronous updates, race conditions.  
**Fix Strategies:** Explicit state refresh, stable refs, memoization checks.

### STALE_URL_STATE
**Definition:** URL-derived identity (current thread, route, etc.) is cached or memoized so it no longer tracks the actual URL.  
**Symptoms:** UI selections or actions stay stuck on a previous page after navigation; branching or commands still target the old entity.  
**Root Cause:** Memoizing environment-derived values (like `window.location.href`) with the wrong dependency list, or storing them in state instead of recomputing from the URL.  
**Detection Cues:** `getCurrentThreadIdFromUrl(window.location.href)` (or similar) used inside `useMemo` / `useState` keyed on unrelated deps; any “current X” that should obviously follow `location` but doesn’t.  
**Fix Strategies:** Treat the URL as the single source of truth. Recompute URL-derived identity on render, or track the URL explicitly in dependencies. Avoid caching environment values unless the environment itself is part of the deps.  
**Related Instances:** BUG-2025-11-27-001

### RACE_CONDITION
### MUTATION_WHEN_IMMUTABLE

---

## 3. API / Data Shape Errors

### WRONG_SHAPE_INPUT
**Definition:** Code assumes a field exists when it does not.  
**Symptoms:** undefined access, silent failure, mismatched types.  
**Fix Strategies:** Zod/schema validation; defensive guards.

### MISSING_FIELD
### MISSING_FIELD
### UNVERIFIED_EXTERNAL_DATA

### WRONG_SELECTOR
**Definition:** Selector targets the wrong element or is too generic (structural vs semantic).
**Symptoms:** Scraped data contains unexpected text (e.g. content headings instead of metadata). Different UI surfaces (floating button vs menu) show different values for "the same" field.
**Root Cause:** Assumes standard HTML semantics (like `h1` meaning "page title") apply inside sophisticated SPAs that repurpose structural tags for content. Uses generic tag selectors instead of semantic attributes (`data-testid`, role, aria labels) that better express intent.
**Detection Cues:** Scraped values match visible content headings rather than metadata. Selectors rely on simple tags (`h1`, `div`) without a clear anchoring container or attribute.
**Fix Strategies:** Introduce a Stable Selector Registry for critical scrapes (like conversation titles). Prefer attribute-based selectors and scoped queries (e.g., within ChatGPT's main app container, not the FM overlay). Add tests for selector behavior using mock DOM snapshots.
**Related Instances:** BUG-2025-11-24-002, BUG-2025-11-29-001

---

## 4. Async / Timing

### UNRESOLVED_PROMISE
### MISSING_AWAIT
### TIMEOUT_BEFORE_SIDE_EFFECT

---

# Add more patterns as your journal grows.

## 5. Architecture Errors

### INCOMPLETE_WIRING
**Definition:** A feature is implemented in the "Backend" (SW) but not the "Frontend" (UI).
**Symptoms:** UI behaves as if the feature doesn't exist, despite code being written.
**Root Cause:** Viewing the system as files rather than Flows.
**Fix Strategies:** "Trace the Intent" — follow the user action from click to storage.
**Related Instances:** BUG-2025-11-24-001

### BYPASS_AUTHORITY
**Definition:** UI components mutating state directly instead of requesting action from the Authority (SW).
**Symptoms:** Inconsistent state, invariant violations (e.g. duplicates).
**Fix Strategies:** Enforce "Intents Only" for UI components via linting.
**Related Instances:** BUG-2025-11-24-001

### TIGHT_COUPLING
**Definition:** A core feature is gated on the success of an optional subsystem.
**Symptoms:** Feature A fails because Feature B failed, even though A doesn't need B.
**Root Cause:** Defensive coding checking wrong preconditions.
**Fix Strategies:** Gate actions only on Identity (who am I?), not Content (what do I have?).
**Related Instances:** BUG-2025-11-25-005

### DUPLICATED_LOGIC_DRIFT
**Definition:** The same logical responsibility is implemented in multiple locations (copy-pasted or slightly adapted). Over time, one copy is updated while others are not, leading to divergent behavior and subtle regressions.
**Symptoms:** Similar-but-not-identical functions or code snippets handling the same concept. Bugs that appear only from some entry points (menu vs floating button, keyboard shortcut vs click).
**Root Cause:** A feature is thought of as "small enough" that copy-pasting logic feels acceptable. Later fixes or improvements are applied to only one call site, assuming the others are equivalent. There is no explicit Single Responsibility helper (e.g., `captureConversationTitle`) serving as the canonical place to apply changes.
**Detection Cues:** Similar-but-not-identical functions or code snippets handling the same concept (e.g., two different implementations for "get conversation title"). Bugs that appear only from some entry points (menu vs floating button, keyboard shortcut vs click). Comments like "same as in X but adapted for Y" scattered around.
**Fix Strategies:** Identify logical responsibilities that appear in more than one place and extract shared primitives (helpers, hooks, modules). Enforce helper usage with code review or grep-based checks ("no direct access to title selectors; must call `captureConversationTitle()`"). Add tests that cover behavior across all entry points (e.g., menu Branch and floating Branch), ensuring they use the same logic.
**Related Instances:** BUG-2025-11-29-001

### GLOBAL_VIEW_LOCAL_CONTEXT_COUPLING
**Definition:** A global, cross-context UI component (like FM's thread menu) derives displayed values from the current local context (active GPT/tab), causing the same data to appear differently depending on where it's viewed. This breaks user mental models that expect stable, context-independent views.
**Symptoms:** UI labels/values change when navigating between contexts without user action. Same entity appears different in different tabs/views. Global search/index shows inconsistent results.
**Root Cause:** Mixing global data model with local page context for presentation. Using "current environment" parameters (current GPT, current tab, active page) to compute global labels. Context-aware logic seems defensive but violates cross-context invariant.
**Common Triggers:** Adding "smart" context-matching logic to global views. Trying to be "safe" by only acting when context matches. Not testing multi-context scenarios early.
**Detection Cues:** Presentation functions take "current page/context" as parameter for global views. Ask: "If user views this from different tabs/contexts, will it look the same?"
**Fix Strategies:** Global views use global derivation rules: `getGlobalLabel(item)` with no context parameter. Presentation logic for global data must be deterministic and context-free. Context-aware logic only appropriate for truly local/contextual features.
**Related Instances:** BUG-2025-11-30-001

## 6. Zen / Experience Errors

### ZEN_VIOLATION
**Definition:** A bug that isn't a crash, but breaks the "Calm", "Trust", or "Flow" of the system.
**Sub-types:** NOISY_FAILURE, FALSE_AFFORDANCE, STATE_JUMP.
**Symptoms:** Alerts, disabled buttons for internal reasons, flickering.
**Fix Strategies:** Design for Graceful Degradation. Silent fallbacks.
**Related Instances:** BUG-2025-11-25-005, BUG-2025-11-25-006

### MV3_MESSAGE_RACE
**Definition:** Service Worker unreachable during message passing (normal in MV3).
**Symptoms:** "Receiving end does not exist" errors.
**Root Cause:** Treating async SW lifecycle as stable.
**Fix Strategies:** Retry logic or silent local fallback.
**Related Instances:** BUG-2025-11-25-006

## 7. Build System / Module Management

### LEGACY_JS_TS_DIVERGENCE
**Definition:** Codebase maintains parallel TypeScript and legacy JavaScript modules (e.g., `dom.ts` and `dom.js`). New features added only to TS module work in development but fail in production builds when bundler resolves to JS module.
**Symptoms:** Dev/test environment works fine. Production build fails with "X is not exported". Error only appears at build time, not during development.
**Root Cause:** Module resolution differs between dev and production. Bundler (Rollup/Vite) may prefer `.js` extensions. Developers update TS file, forget to mirror in legacy JS.
**Common Triggers:** Adding new exports to TypeScript modules. Running only dev tests (vitest) that use TS resolution. Not running production build regularly during development.
**Detection Cues:** Search for dual module pairs (`.ts` + `.js` same basename). Check if imports resolve differently in dev vs build. Watch for build-only failures after TS updates.
**Fix Strategies:** Document which module is canonical for each feature. Have deprecation plan for legacy JS modules. Run production build in CI for every change. Consider build-time checks for export parity. Consolidate to single module system when possible.
**Related Instances:** BUG-2025-11-30-002
