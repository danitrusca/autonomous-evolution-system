# Bug Mining Report — Fractal Messaging — Project Prefix Removal

**Report ID:** BUG_MINING_REPORT_FM_project-prefix-removal  
**Date:** 2025-11-30  
**Theme:** Project prefix removal in FM thread titles (menu + Dock)  
**Time Window:** 2025-11-29 to 2025-11-30  
**Stack:** Browser extension (TS/React), Cursor (ChatGPT 5.1/Codex), Antigravity (Gemini)  
**Miner:** BUG_ARCHIVE_MINER_AGENT

---

## 1. BUG_JOURNAL Additions

### BUG-2025-11-30-001: Context-Dependent Label Instability

**ID:** BUG-2025-11-30-001  
**Title:** FM thread labels changed depending on active GPT context  
**Date Observed:** 2025-11-30  
**Component:** ThreadContextMenu, Dock breadcrumb, labelHelper  
**Severity:** High (violated core FM invariant)

**Symptoms:**
- Thread labels in FM menu appeared differently when viewing from different GPT contexts
- Same thread showed "Feature X" in one GPT, "Fractal Messaging - Feature X" in another
- FM's global thread view became context-dependent, breaking user mental model

**Root Cause:**
- Initial implementation used `captureProjectName()` to get current GPT name from DOM
- Label helper (`getMenuLabel`) only stripped prefix if stored title started with current GPT name
- Logic: `if (title.startsWith(currentGPT + " - ")) strip()` 
- This made labels dependent on which ChatGPT tab/GPT was active

**Trigger:**
- User creates thread in "Fractal Messaging" GPT → stored as "Fractal Messaging - Feature X"
- User switches to different GPT or "New Chat" → `captureProjectName()` returns "ChatGPT"
- Prefix check fails → full title displayed
- Result: Same thread shows different labels in different contexts

**Technical Details:**
- Files: `dom.ts` (captureProjectName), `labelHelper.ts` (getMenuLabel), `ThreadContextMenu.tsx`, `Dock.tsx`
- The context-aware logic seemed "safe" (only strip when matching) but violated FM's GPT-agnostic design
- FM is explicitly a global, cross-GPT view, not a per-GPT sidebar

**Recovery:**
1. Identified mismatch between implementation and FM's core invariant
2. Simplified to GPT-agnostic rule: always strip before first " - " separator
3. Removed `projectName` parameter and `captureProjectName()` dependency
4. Made `getMenuLabel(title)` context-free
5. Verified labels stable across GPT contexts

**Category:** CONTEXT_DEPENDENT_UI, PLAN_IMPLEMENTATION_DRIFT  
**Related Patterns:** GLOBAL_VIEW_LOCAL_CONTEXT_COUPLING  
**Fixed:** Yes (2025-11-30)  
**Test Coverage:** labelHelper.test.ts

**Psychology/Workflow Notes:**
- Plan assumed "match current GPT" was safer than "always strip first hyphen"
- Didn't test cross-GPT behavior early enough
- Context-dependent logic felt defensive but violated deeper architectural truth

---

### BUG-2025-11-30-002: Production Build Module Resolution Mismatch

**ID:** BUG-2025-11-30-002  
**Title:** Vite build failed - captureProjectName not exported from dom.js  
**Date Observed:** 2025-11-30  
**Component:** Build pipeline, module exports (dom.js vs dom.ts)  
**Severity:** Medium (blocked production build)

**Symptoms:**
- `npm run build` failed with error: `"captureProjectName" is not exported by "src/content/dom.js"`
- TypeScript development worked fine (imported from `dom.ts`)
- Production build (Rollup/Vite) resolved imports to legacy `dom.js` instead

**Root Cause:**
- Codebase has dual DOM modules: `dom.ts` (TypeScript) and `dom.js` (legacy JS)
- New helper `captureProjectName()` added to `dom.ts` with export
- Production build uses Rollup which resolved imports to `dom.js` (the JS file)
- `dom.js` didn't have the new helper, causing build-time export error

**Trigger:**
- Added `captureProjectName` export to TypeScript module only
- Ran `npm run build` for production bundle
- Vite/Rollup preferred `.js` extension over `.ts` in module resolution

**Technical Details:**
- Import in components: `import { captureProjectName } from '../dom'`
- Dev (vitest): resolved to `dom.ts` (works)
- Build (rollup): resolved to `dom.js` (missing export)
- Required mirroring the helper in both files

**Recovery:**
1. Identified dual-module issue (TS dev vs JS production)
2. Added equivalent `captureProjectName()` implementation to `dom.js`
3. Included same selectors and default fallback logic
4. Build succeeded after parity established

**Category:** BUILD_MODULE_RESOLUTION, DUAL_MODULE_DRIFT  
**Related Patterns:** LEGACY_JS_TS_DIVERGENCE  
**Fixed:** Yes (2025-11-30)  
**Test Coverage:** Build system (implicit)

**Psychology/Workflow Notes:**
- Easy to add features to TS file and forget legacy JS counterpart
- Dev tests (vitest) hide this because they use TS module
- Only caught at production build time

---

## 2. BUG_PATTERNS Additions/Links

### GLOBAL_VIEW_LOCAL_CONTEXT_COUPLING (New Pattern)

**Pattern ID:** GLOBAL_VIEW_LOCAL_CONTEXT_COUPLING  
**Category:** Architecture / UX Invariant Violation  
**Frequency:** Rare but high-impact when occurs

**Description:**
A global, cross-context UI component (like FM's thread menu) derives displayed values from the current local context (active GPT/tab), causing the same data to appear differently depending on where it's viewed. This breaks user mental models that expect stable, context-independent views.

**Canonical Example:**
- FM thread menu shows different labels for same thread when viewed from different GPTs
- Label logic: `getMenuLabel(title, currentGPTName)` - depends on current page context
- User expectation: FM is GPT-agnostic, shows same threads consistently

**Symptoms:**
- UI labels/values change when navigating between contexts without user action
- Same entity appears different in different tabs/views
- Global search/index shows inconsistent results

**Root Cause:**
- Mixing global data model with local page context for presentation
- Using "current environment" parameters (current GPT, current tab, active page) to compute global labels
- Context-aware logic seems defensive but violates cross-context invariant

**Common Triggers:**
- Adding "smart" context-matching logic to global views
- Trying to be "safe" by only acting when context matches
- Not testing multi-context scenarios early

**Anti-Patterns:**
- `function getGlobalLabel(item, currentContext)` where current context affects output for global view
- Storing global data but computing presentation from page environment
- Defensive "only when matching" checks that create context dependence

**Correct Patterns:**
- Global views use global derivation rules: `getGlobalLabel(item)` with no context parameter
- Presentation logic for global data must be deterministic and context-free
- Context-aware logic only appropriate for truly local/contextual features

**Detection:**
- Ask: "If user views this from different tabs/contexts, will it look the same?"
- Test: Open same data in multiple contexts, verify consistent appearance
- Check: Does presentation function take "current page/context" as parameter?

**Prevention:**
- Document which views are "global" vs "local" in architecture
- Flag presentation functions that take environment context for global features
- Always test cross-context behavior for global views

**Related Bugs:**
- BUG-2025-11-30-001 (FM thread labels)

---

### LEGACY_JS_TS_DIVERGENCE (New Pattern)

**Pattern ID:** LEGACY_JS_TS_DIVERGENCE  
**Category:** Build System / Module Management  
**Frequency:** Medium in codebases with incremental TypeScript migration

**Description:**
Codebase maintains parallel TypeScript and legacy JavaScript modules (e.g., `dom.ts` and `dom.js`). New features added only to TS module work in development but fail in production builds when bundler resolves to JS module.

**Canonical Example:**
- Add export to `dom.ts`: `export function newHelper() {...}`
- Dev tests (vitest) import from TS → works
- Production build (Rollup) resolves to `dom.js` → missing export error

**Symptoms:**
- Dev/test environment works fine
- Production build fails with "X is not exported"
- Error only appears at build time, not during development

**Root Cause:**
- Module resolution differs between dev and production
- Bundler (Rollup/Vite) may prefer `.js` extensions
- Developers update TS file, forget to mirror in legacy JS

**Common Triggers:**
- Adding new exports to TypeScript modules
- Running only dev tests (vitest) that use TS resolution
- Not running production build regularly during development

**Anti-Patterns:**
- Maintaining dual modules without clear ownership/deprecation plan
- Adding features only to TS without checking JS counterpart
- Not running `npm run build` until late in development

**Correct Patterns:**
- Document which module is canonical for each feature
- Have deprecation plan for legacy JS modules
- Run production build in CI for every change
- Consider build-time checks for export parity

**Detection:**
- Search for dual module pairs (`.ts` + `.js` same basename)
- Check if imports resolve differently in dev vs build
- Watch for build-only failures after TS updates

**Prevention:**
- Consolidate to single module system when possible
- If dual modules required, automate parity checks
- Make production build part of standard dev workflow
- Document which file is canonical in comments/README

**Related Bugs:**
- BUG-2025-11-30-002 (captureProjectName export)

---

## 3. BUG_PRINCIPLES Additions

### BP-GLOBAL-001: Global Views Must Use Context-Free Derivation

**Principle:** Global Views Must Use Context-Free Derivation  
**Domain:** Architecture, UX Design  
**Severity:** High

**Statement:**
When a UI component presents a global, cross-context view (like FM's thread menu showing threads from all GPTs), all derivation logic for displayed labels, sorting, filtering, etc. must be deterministic and independent of the current page context. The same data entity must appear identically regardless of which tab, GPT, or page context the user is viewing from.

**Rationale:**
- Global views create user mental model of "this is my complete, stable index"
- Context-dependent presentation breaks that model
- Users expect search results, global menus, indexes to be consistent
- Context-aware logic in global views causes confusion and trust erosion

**Examples:**

**✓ Good:**
```typescript
// Global thread menu label - no context parameter
function getMenuLabel(storedTitle: string): string {
  const separatorIndex = storedTitle.indexOf(' - ');
  return separatorIndex > 0 
    ? storedTitle.slice(separatorIndex + 3).trim() 
    : storedTitle;
}
```

**✗ Bad:**
```typescript
// Global menu label depends on current page context
function getMenuLabel(storedTitle: string, currentGPT: string): string {
  if (storedTitle.startsWith(currentGPT + ' - ')) {
    return storedTitle.slice(currentGPT.length + 3).trim();
  }
  return storedTitle;
}
```

**Detection Questions:**
1. Does this component show data from multiple contexts/projects/tabs?
2. If yes, does any presentation logic depend on "current context"?
3. Would the same item look different if viewed from different places?
4. Does the function signature include parameters like `currentPage`, `activeTab`, `currentProject`?

**Enforcement:**
- Code review: Flag presentation functions with context parameters for global views
- Testing: Always test global views from multiple contexts
- Architecture: Document which views are "global" vs "contextual"

**Related Patterns:**
- GLOBAL_VIEW_LOCAL_CONTEXT_COUPLING

**Related Bugs:**
- BUG-2025-11-30-001

---

### BP-BUILD-001: Development Environment Must Mirror Production Module Resolution

**Principle:** Development Environment Must Mirror Production Module Resolution  
**Domain:** Build System, Testing  
**Severity:** Medium

**Statement:**
When a codebase has multiple module formats or legacy/modern parallel implementations, the development environment (tests, hot reload) must use the same module resolution strategy as the production build. Discrepancies between dev and prod resolution hide export/import errors until build time.

**Rationale:**
- Fast feedback loops require catching errors in development
- Build-time failures are expensive (CI time, deployment blocks)
- Module resolution mismatches are silent until production build
- Developers trust dev tests and may skip builds

**Examples:**

**✓ Good:**
- Single canonical module per feature
- Dev and prod use same bundler/resolver
- CI runs full production build for every PR
- Tests import using same paths as production code

**✗ Bad:**
- `dom.ts` for dev/tests, `dom.js` for production
- Vitest resolves to `.ts`, Rollup resolves to `.js`
- Only running `npm test`, skipping `npm run build`
- Discovering missing exports at deployment time

**Detection Questions:**
1. Are there duplicate modules (`.ts` + `.js` with same basename)?
2. Do dev tests pass but production builds fail?
3. Does the test runner use different resolution than the bundler?
4. When was the last time you ran a production build locally?

**Enforcement:**
- Run `npm run build` (or equivalent) in pre-commit hook
- CI must run production build, not just tests
- Document module resolution strategy
- Consider automated parity checks for dual modules

**Related Patterns:**
- LEGACY_JS_TS_DIVERGENCE

**Related Bugs:**
- BUG-2025-11-30-002

---

## 4. Workflow Antipatterns & Guardrails (AES Notes)

### Antipattern: Over-Defensive Context Matching

**Context:**
When implementing global features, adding context-matching logic that seems "safe" (e.g., "only strip prefix if it matches current GPT") but actually introduces context-dependence that violates the feature's global nature.

**Manifestation:**
- "Let's be safe and only act when we're sure it matches"
- Implementing `if (currentContext matches) then simplify` 
- Feeling clever about avoiding false positives
- Not testing from multiple contexts early

**Why It Happens:**
- Defensive programming instinct
- Fear of false positives (stripping wrong things)
- Not fully internalizing "global view" invariant
- Plan constraint (match current GPT) seemed safer than invariant (always global)

**Harm:**
- Global views become context-dependent
- User mental model breaks
- "Same" data looks different in different places
- Violates core architectural principle

**Guardrail:**
**Before implementing global feature:** Ask explicitly:
1. Is this view global (cross-context) or local (context-specific)?
2. If global, does ANY presentation logic depend on current page/tab/context?
3. If yes to #2, STOP - redesign to be context-free
4. Test: Open same data from 2-3 different contexts, verify identical appearance

---

### Antipattern: Trusting AI Plan Over Project Invariants

**Context:**
AI agent (Gemini/Antigravity) produces detailed plan that seems thorough and safe, but plan constraints subtly conflict with deeper project architectural invariants not fully loaded into agent context.

**Manifestation:**
- Plan looks complete and well-reasoned
- Implementer (Cursor) follows plan faithfully
- Feature works but violates core system invariant
- Bug discovered only when testing cross-context behavior

**Why It Happens:**
- AI planning agent didn't have full architectural context
- Project invariants not explicitly stated in provided docs
- Plan constraints ("only strip when matching") seemed reasonable
- Implementer trusted plan without sanity-checking against architecture

**Harm:**
- Wasted implementation time
- Feature needs rework
- User-facing bug if not caught pre-release
- Erosion of trust in AI-generated plans

**Guardrail:**
**Before implementing AI-generated plan:**
1. Read the canonical invariants document (e.g., FM_CANONICAL_INVARIANTS.md)
2. Check: Do ANY plan constraints conflict with system invariants?
3. For global features: Verify plan doesn't introduce context-dependence
4. If conflict found: Go back to planning agent, provide invariants, ask for revised plan
5. Don't blindly implement a plan that "feels wrong" architecturally

---

### Antipattern: Skipping Production Build During Development

**Context:**
Running only `npm test` during development, not running `npm run build` until attempting deployment. Module resolution differences between test env and production build hide export/import errors.

**Manifestation:**
- "Tests pass, ship it"
- Discovering build failures only in CI or at deployment
- Module resolution errors that weren't visible in tests
- Emergency fixes blocking releases

**Why It Happens:**
- Build is slower than tests
- Tests give green checkmark = false sense of completion
- Muscle memory of "test → commit → push"
- Don't realize dev and prod resolve differently

**Harm:**
- CI failures block deployment
- Emergency fixes under pressure
- False confidence from green tests
- Wasted time debugging build-only issues

**Guardrail:**
1. Make `npm run build` part of your regular dev workflow
2. Run build at least once before considering feature "done"
3. Add pre-push hook that runs production build
4. CI should run both tests AND production build
5. If build is slow, investigate why and optimize

---

## 5. Integration Notes (for Doc-Editing Agent)

### BUG_JOURNAL.md
- Append both bug entries (BUG-2025-11-30-001, BUG-2025-11-30-002)
- Use chronological ordering
- Cross-reference to patterns and principles

### BUG_PATTERNS.md
- Add two new patterns:
  - GLOBAL_VIEW_LOCAL_CONTEXT_COUPLING
  - LEGACY_JS_TS_DIVERGENCE
- Place in appropriate categories:
  - GLOBAL_VIEW under "Architecture / UX Patterns"
  - LEGACY_JS_TS under "Build System / Module Patterns"

### BUG_PRINCIPLES.md
- Add two new principles:
  - BP-GLOBAL-001: Global Views Must Use Context-Free Derivation
  - BP-BUILD-001: Development Environment Must Mirror Production Module Resolution
- Ensure principle IDs are sequential and don't conflict with existing

### WORKFLOW_ANTIPATTERNS.md (if exists, or create)
- Add three antipatterns:
  - Over-Defensive Context Matching
  - Trusting AI Plan Over Project Invariants
  - Skipping Production Build During Development
- Include guardrails for each

### Cross-References
- Link BUG-2025-11-30-001 to GLOBAL_VIEW_LOCAL_CONTEXT_COUPLING pattern
- Link BUG-2025-11-30-002 to LEGACY_JS_TS_DIVERGENCE pattern
- Reference both principles in LESSONS_LEARNED.md if appropriate

---

## Summary Statistics

- **Bugs Mined:** 2
- **New Patterns:** 2
- **New Principles:** 2
- **Workflow Antipatterns:** 3
- **Severity Distribution:** 1 High, 1 Medium
- **All Fixed:** Yes
- **Test Coverage Added:** Yes (labelHelper.test.ts)

---

**End of Report**

