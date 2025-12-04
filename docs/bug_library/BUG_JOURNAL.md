# BUG JOURNAL
Chronological record of all bug incidents across projects.  
Each entry is a concrete, real-world bug with a consistent schema.

Use this file to:
- Capture bugs as they occur
- Build historical awareness
- Feed examples into future agents

---

## Reading Instructions for Agents

- This file contains chronological bug incidents.
- Use it to find concrete examples similar to the current problem.
- Do NOT treat these as patterns; they are instances.
- Always cross-reference entries here with patterns from BUG_PATTERNS.md.
- After solving a new bug, propose a new journal entry in this schema.

---

## BUG-YYYY-MM-DD-NNN: <short title>
**Date:**  
**Project:**  
**Stack / Language:**  
**Symptoms:**  
**Root Cause:**  
**Category:**  
**Fix Summary:**  
**Code Snippet (optional):**  
**Related Patterns:**  
**Psychological State:**  
**Prevention:**  

---

# Seed Entry Example

## BUG-2025-11-16-001: Off-by-one in pagination
**Date:** 2025-11-16  
**Project:** Fractal Messaging Extension  
**Stack:** TypeScript / React  
**Symptoms:** Last item in list not shown.  
**Root Cause:** `<` instead of `<=` in slice range.  
**Category:** logic/off-by-one  
**Fix Summary:** Adjusted slice boundary.  
**Related Patterns:** OFF_BY_ONE, PAGINATION_BOUNDARY  
**Psychology:** Rushed; trusted mental model instead of verifying boundary cases.  
**Prevention:** Always test 0, 1, N, N+1 list sizes.

---

## BUG-2025-11-24-001: Incomplete Architecture Wiring
**Date:** 2025-11-24
**Project:** Fractal Messaging
**Stack / Language:** TypeScript / React / Chrome Extension (MV3)
**Symptoms:** Menu Branch button created "Root Thread N" while Floating button created correct titles.
**Root Cause:** The agent treated the "Menu" and "Floating Button" as separate features rather than two views of the same Intent. It implemented the logic in the Service Worker (the Authority) but failed to route the Menu's action through that Authority.
**Category:** architecture/incomplete-wiring
**Fix Summary:** Route Menu action via REGISTER_ROOT_THREAD bus message.
**Related Patterns:** INCOMPLETE_WIRING, BYPASS_AUTHORITY
**Psychological State:** Tunnel vision on file-level changes rather than flow-level intent.
**Prevention:** Use an "Atomic Intent Checklist" for multi-surface features.

## BUG-2025-11-24-002: Wrong ChatGPT Title Selector
**Date:** 2025-11-24
**Project:** Fractal Messaging
**Stack / Language:** TypeScript / DOM
**Symptoms:** Thread titles were "FEATURE INTRODUCTION PROTOCOL" (content headings) instead of conversation names.
**Root Cause:** Semantic Ambiguity. The selector h1 is structural, not semantic. In ChatGPT, h1 is used for user content. The actual title is semantic metadata (data-testid="conversation-name").
**Category:** data-shape/wrong-selector
**Fix Summary:** Use specific data-testid selectors; fallback to document.title.
**Related Patterns:** WRONG_SELECTOR
**Psychological State:** Assumed standard HTML semantics (h1 = title) applied to a complex SPA.
**Prevention:** Use a Stable Selector Registry and warn on ambiguous matches.

## BUG-2025-11-24-004: The "Bundled Refactor" Regression (Identity Collapse)
**Date:** 2025-11-24
**Project:** Fractal Messaging
**Stack / Language:** TypeScript / URL
**Symptoms:** After fixing a minor title issue (removing folder prefix), the menu started showing only one thread for all ChatGPT conversations.
**Root Cause:** Bundled Refactor Risk. The agent bundled a risky refactor (changing ID normalization logic) with a cosmetic fix (Title cleanup). The new normalization stripped query params required for identity in Project URLs.
**Category:** logic/over-normalization
**Fix Summary:** Reverted the ID normalization change while keeping the title fix.
**Related Patterns:** OVER_NORMALIZATION, BUNDLED_REFACTOR_RISK
**Psychological State:** "While I'm at it" syndrome — trying to clean up code that wasn't broken.
**Prevention:** Enforce Atomic Commits: Fix != Refactor. Test identity preservation explicitly.

## BUG-2025-11-25-005: "No messages" Gate (Zen Violation)
**Date:** 2025-11-25
**Project:** Fractal Messaging
**Stack / Language:** TypeScript / React
**Symptoms:** Branch button replaced by "No messages" label on valid threads.
**Root Cause:** Tight Coupling. Branching availability was coupled to Message Scraping success. When scraping failed, the core branching feature was disabled.
**Category:** architecture/tight-coupling
**Fix Summary:** Gate branching on URL presence (/c/<id>), not message count.
**Related Patterns:** TIGHT_COUPLING, ZEN_VIOLATION
**Psychological State:** Defensive coding gone wrong — gating features on unnecessary preconditions.
**Prevention:** Audit preconditions: Only gate actions on Identity, not Content.

## BUG-2025-11-25-006: "Receiving end does not exist" (Zen Violation)
**Date:** 2025-11-25
**Project:** Fractal Messaging
**Stack / Language:** TypeScript / Chrome Extension (MV3)
**Symptoms:** Red error alert when clicking Branch.
**Root Cause:** MV3 Message Race. Service Workers in MV3 will be unreachable sometimes. Throwing a raw error alert breaks "Calm by Default".
**Category:** async/mv3-race
**Fix Summary:** Silent fallback to local storage mutation.
**Related Patterns:** MV3_MESSAGE_RACE, ZEN_VIOLATION
**Psychological State:** Treating async failure as an exception rather than a normal state.
**Prevention:** Use a "Calm Fallback" pattern for all SW communication.

## BUG-2025-11-27-001: Stuck Selection After Branch (Stale URL State)
**Date:** 2025-11-27  
**Project:** Fractal Messaging  
**Stack / Language:** TypeScript / React / Chrome Extension (MV3)  
**Symptoms:** After clicking Branch in Chat A (creating a root for that conversation) and then navigating to Chat B, the Leaf menu still treated Chat A as the active thread. The Branch action refused to create a new root for Chat B, as if the previous thread were still selected.
**Root Cause:** The thread identity derived from the ChatGPT URL was computed via `getCurrentThreadIdFromUrl(window.location.href)` inside a `useMemo` whose dependency list was `[threadId]`. When navigating between chats, the memo did not update with the new URL, leaving `currentThreadId` stuck on the previous conversation. The UI's notion of "current thread" desynchronized from the actual URL.
**Category:** state/stale-url  
**Fix Summary:** Removed memoization for `currentThreadId` and `normalizedPropThreadId` in `ThreadContextMenu.tsx` and recomputed them directly on render so they always reflect the current `window.location.href` and props. The resolved thread id now tracks the current ChatGPT conversation URL instead of a stale memoized value.
**Related Patterns:** STALE_URL_STATE, STALE_STATE, ZEN_VIOLATION  
**Psychological State:** Relief after fixing the previous Branch regression; less suspicion toward a "small" memoization change. Trusted the helper function but did not scrutinize the dependency list, assuming URL-based identity would "just work."
**Prevention:** For FM, treat the ChatGPT URL as the single source of truth for thread identity. Avoid memoizing URL-derived values unless the URL (or an explicit `location` object) is part of the dependency list. Consider any memoization or state for environment-derived values (URL, DOM, window) as high-risk and subject to explicit review.

## BUG-2025-11-29-001: Duplicated Title Capture Logic Causing Wrong Root Names
**Date:** 2025-11-29  
**Project:** Fractal Messaging  
**Stack / Language:** TypeScript, DOM scraping, Chrome extension (MV3), React UI  
**Symptoms:** The first root thread created for a ChatGPT conversation had the correct title (true conversation title). Subsequent root threads (for other conversations) often inherited headings from inside the conversation content instead of the real ChatGPT conversation title. In the FM menu, titles were truncated, making it hard to see the full wrong value at a glance; deeper inspection revealed that the stored title text came from content headings.
**Root Cause:** Duplicated logic: There were two different implementations of the "capture ChatGPT conversation title" logic—one in `branch.js` (floating Branch button) and one in `ThreadContextMenu.tsx` (menu Branch button). The menu implementation carried an older, buggy selector set, so even after the main logic was fixed once, the duplicated logic in the menu reintroduced wrong behavior. Over-generic selectors: The duplicated logic used a generic `h1`-style selector when the "proper" ChatGPT title selectors failed. In ChatGPT, `h1` is used for user content headings, not the conversation title metadata, so this generic fallback grabbed content headings instead of the actual title.
**Category:** data-shape/wrong-selector, architecture/duplicated-logic-drift  
**Fix Summary:** Extracted a single `captureConversationTitle` helper into `src/content/dom.ts` (and `dom.js`) as the only source of truth for title capture. Removed the generic `h1` selector; the helper now first uses specific semantic selectors (e.g. `data-testid="conversation-title"`), then falls back to `document.title` if no trusted element is found. Updated both `branch.js` and `ThreadContextMenu.tsx` to call the shared helper. Added `src/content/dom.test.ts` to cover the new behavior.
**Related Patterns:** WRONG_SELECTOR, DUPLICATED_LOGIC_DRIFT  
**Psychological State:** Relief after the first selector fix likely reduced suspicion toward remaining call sites ("we already fixed the title capture bug"). The mental model focused on files ("fix the title code over here") rather than flows & responsibilities ("every way we Branch must use the same title-capture primitive").
**Prevention:** Centralize all DOM scraping for conversation titles into a single helper and enforce its use wherever titles are needed. Avoid generic structural selectors like `h1` in complex SPAs; prefer attribute-based selectors and controlled fallbacks (`document.title`, then explicit `"Root Thread N"`). When fixing a bug in a cross-surface feature, perform a call-site audit to ensure all entry points are updated.

## BUG-2025-11-30-001: Context-Dependent Label Instability
**Date:** 2025-11-30  
**Project:** Fractal Messaging  
**Stack / Language:** TypeScript / React / Chrome Extension (MV3)  
**Symptoms:** Thread labels in FM menu appeared differently when viewing from different GPT contexts. Same thread showed "Feature X" in one GPT, "Fractal Messaging - Feature X" in another. FM's global thread view became context-dependent, breaking user mental model.
**Root Cause:** Initial implementation used `captureProjectName()` to get current GPT name from DOM. Label helper (`getMenuLabel`) only stripped prefix if stored title started with current GPT name. Logic: `if (title.startsWith(currentGPT + " - ")) strip()`. This made labels dependent on which ChatGPT tab/GPT was active. The context-aware logic seemed "safe" (only strip when matching) but violated FM's GPT-agnostic design. FM is explicitly a global, cross-GPT view, not a per-GPT sidebar.
**Category:** architecture/context-dependent-ui, architecture/plan-implementation-drift  
**Fix Summary:** Identified mismatch between implementation and FM's core invariant. Simplified to GPT-agnostic rule: always strip before first " - " separator. Removed `projectName` parameter and `captureProjectName()` dependency. Made `getMenuLabel(title)` context-free. Verified labels stable across GPT contexts.
**Related Patterns:** GLOBAL_VIEW_LOCAL_CONTEXT_COUPLING  
**Psychological State:** Plan assumed "match current GPT" was safer than "always strip first hyphen". Didn't test cross-GPT behavior early enough. Context-dependent logic felt defensive but violated deeper architectural truth.
**Prevention:** Before implementing global feature: Ask explicitly if this view is global (cross-context) or local (context-specific). If global, ensure NO presentation logic depends on current page/tab/context. Test: Open same data from 2-3 different contexts, verify identical appearance.

## BUG-2025-11-30-002: Production Build Module Resolution Mismatch
**Date:** 2025-11-30  
**Project:** Fractal Messaging  
**Stack / Language:** TypeScript / JavaScript / Vite / Rollup  
**Symptoms:** `npm run build` failed with error: `"captureProjectName" is not exported by "src/content/dom.js"`. TypeScript development worked fine (imported from `dom.ts`). Production build (Rollup/Vite) resolved imports to legacy `dom.js` instead.
**Root Cause:** Codebase has dual DOM modules: `dom.ts` (TypeScript) and `dom.js` (legacy JS). New helper `captureProjectName()` added to `dom.ts` with export. Production build uses Rollup which resolved imports to `dom.js` (the JS file). `dom.js` didn't have the new helper, causing build-time export error. Module resolution differs between dev (vitest resolves to `.ts`) and production (rollup resolves to `.js`).
**Category:** build/module-resolution, build/dual-module-drift  
**Fix Summary:** Identified dual-module issue (TS dev vs JS production). Added equivalent `captureProjectName()` implementation to `dom.js`. Included same selectors and default fallback logic. Build succeeded after parity established.
**Related Patterns:** LEGACY_JS_TS_DIVERGENCE  
**Psychological State:** Easy to add features to TS file and forget legacy JS counterpart. Dev tests (vitest) hide this because they use TS module. Only caught at production build time.
**Prevention:** Make `npm run build` part of your regular dev workflow. Run build at least once before considering feature "done". Add pre-push hook that runs production build. CI should run both tests AND production build. If dual modules required, automate parity checks or document which file is canonical.