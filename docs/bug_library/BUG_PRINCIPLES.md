# DEBUGGING PRINCIPLES
A collection of universal heuristics, laws, and mental models for debugging.

These principles:
- Prevent repeated mistakes  
- Shape your debugging mindset  
- Feed future agent reasoning  
- Act as constraints for autonomous loops  

This is the “wisdom layer” of the Bug Library.

---

## Reading Instructions for Agents

- This file defines debugging principles (heuristics).
- Use these principles to guide your investigation and fix strategy.
- When suggesting actions, explicitly reference which principles you’re applying.
- If a new principle emerges from repeated bugs, propose it here.

---

## Seed Principles

### 1. Instrumentation Before Guessing
Add logs, guards, or test probes before hypothesizing.  
Reality over imagination.

### 2. Never Trust a Green Test With Weak Assertions
Tests must assert meaningful invariants.  
A passing test proves nothing if it asserts nothing.

### 3. Boundaries Are the Most Common Failure Point
0, 1, N, and N+1 must always be explicitly tested.

### 4. State Goes Stale Faster Than You Think
Especially in async + UI.  
Assume staleness unless proven fresh.

### 5. Every Error Message Contains a Clue
No message is random. Extract all signal before acting.

### 6. When Stuck, Change the Lens
Switch from:
- top-down to bottom-up  
- static to runtime  
- code reading to instrumentation  
- journaling to pattern-matching  

### 7. The First Hypothesis Is Usually Too Local
Widen the frame. Bugs often sit one layer up in the system.

### 8. Fix the Root Pattern, Not Just the Instance
Every bug teaches a reusable lesson.  
Capture it in the Pattern Library.

### 9. Errors Must Be Whispered, Not Shouted
(Zen Principle)  
Internal failures should degrade gracefully.  
Never expose raw errors or disable core affordances due to secondary subsystem failures.

### 10. Identity Before Content
Gate actions on "Who am I?" (Identity/URL), not "What do I have?" (Content/Scraping).  
Identity is stable; content is fragile.

### 11. Atomic Commits: Fix != Refactor
Never bundle a risky refactor (changing how things work) with a cosmetic fix (changing how things look).  
It hides the root cause of regressions.

### 12. Environment-Derived State Is High-Risk
Values derived from the environment (URL, DOM, window size, time, etc.) go stale easily.  
Either recompute them on each render or track the environment explicitly in your dependencies.  
Never assume a memoized URL-derived identity is safe unless the URL (or a location object) itself is part of the dependency set.

### 13. Single Source of Truth for Shared Logic
Any logic that defines a core concept (like "what is the current conversation title?" or "what is the current thread identity?") must live in one canonical helper. All UI surfaces and flows must depend on that helper rather than reimplementing the same logic in multiple places.  
This applies to any feature exposed via multiple entry points (floating buttons + context menus, keyboard shortcuts + UI buttons) and any logic that touches identity (convId, URL-based thread ID), critical scrapes (ChatGPT titles, message content), or invariant transformations (normalization, validation, naming).  
When fixing bugs in cross-surface features, perform a call-site audit to ensure all entry points use the same canonical helper.  
**Example incidents:** BUG-2025-11-24-002, BUG-2025-11-29-001

### 14. Global Views Must Use Context-Free Derivation
When a UI component presents a global, cross-context view (like FM's thread menu showing threads from all GPTs), all derivation logic for displayed labels, sorting, filtering, etc. must be deterministic and independent of the current page context. The same data entity must appear identically regardless of which tab, GPT, or page context the user is viewing from.  
Global views create user mental model of "this is my complete, stable index". Context-dependent presentation breaks that model. Users expect search results, global menus, indexes to be consistent. Context-aware logic in global views causes confusion and trust erosion.  
**Detection questions:** Does this component show data from multiple contexts/projects/tabs? If yes, does any presentation logic depend on "current context"? Would the same item look different if viewed from different places? Does the function signature include parameters like `currentPage`, `activeTab`, `currentProject`?  
**Example incidents:** BUG-2025-11-30-001

### 15. Development Environment Must Mirror Production Module Resolution
When a codebase has multiple module formats or legacy/modern parallel implementations, the development environment (tests, hot reload) must use the same module resolution strategy as the production build. Discrepancies between dev and prod resolution hide export/import errors until build time.  
Fast feedback loops require catching errors in development. Build-time failures are expensive (CI time, deployment blocks). Module resolution mismatches are silent until production build. Developers trust dev tests and may skip builds.  
**Detection questions:** Are there duplicate modules (`.ts` + `.js` with same basename)? Do dev tests pass but production builds fail? Does the test runner use different resolution than the bundler? When was the last time you ran a production build locally?  
**Example incidents:** BUG-2025-11-30-002