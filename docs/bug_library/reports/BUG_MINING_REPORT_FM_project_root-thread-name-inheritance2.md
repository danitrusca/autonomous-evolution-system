# Bug Mining Report — Fractal Messaging — Root Thread Name Inheritance (v2)

- **Date:** 2025-11-29
- **Project:** Fractal Messaging (FM)
- **Scope / Theme:** Root thread name inheritance regressions (post–selector fix)
- **Source Material:** 
  - Antigravity / Gemini walkthrough of fix (centralized `captureConversationTitle`)
  - FM Lessons Learned v1 :contentReference[oaicite:0]{index=0}
  - BUG_PATTERNS.md :contentReference[oaicite:1]{index=1}
  - BUG_PRINCIPLES.md :contentReference[oaicite:2]{index=2}
  - BUG_JOURNAL.md :contentReference[oaicite:3]{index=3}
- **Prepared By:** BUG_ARCHIVE_MINER_AGENT

---

## 1. BUG_JOURNAL additions

### BUG-2025-11-29-001 — Duplicated Title Capture Logic Causing Wrong Root Names

- **Date (approx):** 2025-11-29  
- **Project / Area:** Fractal Messaging / Root Thread Name Inheritance  
- **Stack / Context:** TypeScript, DOM scraping, Chrome extension (MV3), React UI  

- **Symptom(s):**
  - The **first** root thread created for a ChatGPT conversation had the correct title (true conversation title).
  - Subsequent root threads (for other conversations) often inherited **headings from inside the conversation content** instead of the real ChatGPT conversation title.
  - In the FM menu, titles were truncated, making it hard to see the full wrong value at a glance; deeper inspection revealed that the stored title text came from content headings.

- **What broke:**
  - The Root Thread Name Inheritance feature was only **reliably correct for the first root**; later roots violated the expectation “root display name == ChatGPT conversation title or `Root Thread N` fallback.”

- **Likely root cause:**
  1. **Duplicated logic:**  
     - There were two different implementations of the “capture ChatGPT conversation title” logic:
       - In `branch.js` (floating Branch button).
       - In `ThreadContextMenu.tsx` (menu Branch button).
     - The menu implementation carried an **older, buggy selector set**, so even after the main logic was fixed once, the duplicated logic in the menu reintroduced wrong behavior.
  2. **Over-generic selectors:**  
     - The duplicated logic used a generic `h1`-style selector when the “proper” ChatGPT title selectors failed.
     - In ChatGPT, `h1` is used for **user content headings**, not the conversation title metadata, so this generic fallback grabbed content headings instead of the actual title.

- **Trigger:**
  - Implementing Root Thread Name Inheritance and fixing the original selector bug **only in one code path**, leaving the other path with copy-pasted, divergent logic.
  - Relying on a generic `h1` fallback after specific data-attribute selectors, instead of falling back to `document.title` or a well-defined “no title” state.

- **Category:**
  - `WRONG_SELECTOR` (existing pattern) :contentReference[oaicite:4]{index=4}  
  - `DUPLICATED_LOGIC_DRIFT` (proposed new pattern, see below)

- **Recovery / Fix attempt(s):**
  - Previous fix (2025-11-24) corrected selectors in one path and added a better fallback to `document.title`, but did not remove generic structural selectors or unify logic across call sites.
  - Current fix:
    - Extracted a single `captureConversationTitle` helper into `src/content/dom.ts` (and `dom.js`) as the **only source of truth** for title capture.
    - Removed the generic `h1` selector; the helper now:
      - First uses specific semantic selectors (e.g. `data-testid="conversation-title"`).
      - Then falls back to `document.title` if no trusted element is found.
    - Updated **both** `branch.js` and `ThreadContextMenu.tsx` to call the shared helper.
    - Added `src/content/dom.test.ts` to cover the new behavior (selector priority, `document.title` fallback).
    - Reverified manually:
      - Branching in three different ChatGPT conversations yields three correctly named roots or the `Root Thread N` fallback.
      - Re-branching in the same conversation reuses the existing root (id + label).

- **Related patterns:**
  - `WRONG_SELECTOR` — selector targets structural `h1` rather than semantic metadata. :contentReference[oaicite:5]{index=5}  
  - `DUPLICATED_LOGIC_DRIFT` — same logical responsibility implemented in multiple places that diverge over time.

- **Psychological / workflow notes (optional):**
  - Relief after the *first* selector fix likely reduced suspicion toward remaining call sites (“we already fixed the title capture bug”).
  - The mental model focused on **files** (“fix the title code over here”) rather than **flows & responsibilities** (“every way we Branch must use the same title-capture primitive”).

- **Prevention (short):**
  - Centralize all DOM scraping for conversation titles into a single helper and enforce its use wherever titles are needed.
  - Avoid generic structural selectors like `h1` in complex SPAs; prefer attribute-based selectors and controlled fallbacks (`document.title`, then explicit `"Root Thread N"`).
  - When fixing a bug in a cross-surface feature, perform a **call-site audit** to ensure all entry points are updated.

---

## 2. BUG_PATTERNS additions_or_links

### PATTERN: WRONG_SELECTOR

- **Status:** existing :contentReference[oaicite:6]{index=6}  
- **Description:**
  - Selector targets the wrong element or is too generic (structural vs semantic), leading to unexpected or misleading data (e.g., headings instead of metadata).
- **Root-cause structure:**
  - Assumes standard HTML semantics (like `h1` meaning “page title”) apply inside sophisticated SPAs that repurpose structural tags for content.
  - Uses generic tag selectors instead of **semantic attributes** (`data-testid`, role, aria labels) that better express intent.
- **Detection cues:**
  - Scraped values match visible content headings rather than metadata.
  - Different UI surfaces (floating button vs menu) show different values for “the same” field.
  - Selectors rely on simple tags (`h1`, `div`) without a clear anchoring container or attribute.
- **Fix strategies:**
  - Introduce a **Stable Selector Registry** for critical scrapes (like conversation titles).
  - Prefer attribute-based selectors and scoped queries (e.g., within ChatGPT’s main app container, not the FM overlay).
  - Add tests for selector behavior using mock DOM snapshots.
- **Related incidents:**
  - `BUG-2025-11-24-002 — Wrong ChatGPT Title Selector` :contentReference[oaicite:7]{index=7}  
  - `BUG-2025-11-29-001 — Duplicated Title Capture Logic Causing Wrong Root Names`

---

### PATTERN: DUPLICATED_LOGIC_DRIFT

- **Status:** new  
- **Description:**
  - The same logical responsibility is implemented in multiple locations (copy-pasted or slightly adapted). Over time, one copy is updated while others are not, leading to divergent behavior and subtle regressions.
- **Root-cause structure:**
  - A feature is thought of as “small enough” that copy-pasting logic feels acceptable.
  - Later fixes or improvements are applied to only one call site, assuming the others are equivalent.
  - There is no explicit **Single Responsibility helper** (e.g., `captureConversationTitle`) serving as the canonical place to apply changes.
- **Detection cues:**
  - Similar-but-not-identical functions or code snippets handling the same concept (e.g., two different implementations for “get conversation title”).
  - Bugs that appear only from some entry points (menu vs floating button, keyboard shortcut vs click).
  - Comments like “same as in X but adapted for Y” scattered around.
- **Fix strategies:**
  - Identify logical responsibilities that appear in more than one place and extract **shared primitives** (helpers, hooks, modules).
  - Enforce helper usage with code review or grep-based checks (“no direct access to title selectors; must call `captureConversationTitle()`”).
  - Add tests that cover behavior **across all entry points** (e.g., menu Branch and floating Branch), ensuring they use the same logic.
- **Related incidents:**
  - `BUG-2025-11-29-001 — Duplicated Title Capture Logic Causing Wrong Root Names`

---

## 3. BUG_PRINCIPLES additions

### PRINCIPLE: Single Source of Truth for Shared Logic

- **Description:**
  - Any logic that defines a core concept (like “what is the current conversation title?” or “what is the current thread identity?”) must live in **one canonical helper**. All UI surfaces and flows must depend on that helper rather than reimplementing the same logic in multiple places.
- **When it applies:**
  - Any time a feature is exposed via multiple entry points:
    - Floating buttons + context menus.
    - Keyboard shortcuts + UI buttons.
    - Multiple panels/components triggering the same behavior (e.g., Branch, Save, Attach).
  - Any logic that touches:
    - Identity (convId, URL-based thread ID).
    - Critical scrapes (ChatGPT titles, message content).
    - Invariant transformations (normalization, validation, naming).
- **Example incidents:**
  - `BUG-2025-11-24-002 — Wrong ChatGPT Title Selector` (fixed in one place) :contentReference[oaicite:8]{index=8}  
  - `BUG-2025-11-29-001 — Duplicated Title Capture Logic Causing Wrong Root Names`
- **Implications for AES / agents:**
  - Debug agents should explicitly ask:
    - “Where does this logic live canonically?”
    - “Is there more than one implementation of this responsibility?”
  - When proposing a fix, agents should:
    - Prefer extracting or updating a shared helper.
    - Surface a reminder to update all call sites and tests.
  - FM_DEBUG_AGENT should treat “multiple implementations of the same DOM scrape / identity resolution” as a **risk hotspot** to inspect first.

---

## 4. Workflow Antipatterns & Guardrails (AES Notes)

### 4.1 Workflow Antipatterns

- **COPY_PASTE_LOGIC_FOR_SHARED_BEHAVIOR**
  - **Description:**  
    - Implementing the same behavior multiple times (copy-paste or “slightly adapted”) across different UI surfaces instead of factoring out a shared helper.
  - **Consequences:**  
    - Fixes apply only to some paths; others remain buggy.
    - Users experience inconsistent behavior depending on where they click.
    - Future agent work becomes confusing because “the feature half works.”
  - **Example incidents:**  
    - `BUG-2025-11-29-001` — Root naming correct for floating Branch but incorrect for menu Branch due to divergent title capture logic.

- **FILE-FIRST FIXING (vs Flow-First)**
  - **Description:**  
    - Thinking “I’ll fix `branch.js`” instead of “I’ll fix the Branch **flow**,” leading to partial fixes that ignore other entry points like menus, shortcuts, or panels.
  - **Consequences:**  
    - Repeated regressions in the same feature.
    - Confusion about whether a bug is truly fixed.
  - **Example incidents:**  
    - Original selector fix applied only to one call site; menu logic remained stale.

### 4.2 Guardrails & Micro-Protocols

- **Guardrail: Helper-First Refactors**
  - When a bug touches shared behavior (identity, scraping, naming), the agent must:
    - Locate or create a **canonical helper**.
    - Apply fixes there.
    - Replace all direct, duplicated logic in other files with calls to the helper.

- **Guardrail: Entry-Point Checklist**
  - For every feature with multiple surfaces (e.g. Branch, Save, Attach):
    - Maintain a small checklist of all entry points:
      - Floating button
      - Thread context menu
      - Keyboard shortcuts
      - Any dev-only triggers
    - Before calling a fix “done,” verify behavior via **each** entry point.

- **Guardrail: No Structural Tag Fallbacks in Complex SPAs**
  - Prohibit generic “fallback to `h1`” selectors for critical metadata in ChatGPT.
  - Only allow:
    - Attribute-based selectors (`data-testid`, roles).
    - Controlled fallbacks (`document.title` → explicit fallback label).

---

## 5. Integration Notes (for Doc-Editing Agent)

- **Section 1 → `BUG_JOURNAL.md`**
  - Append a new entry:
    - `BUG-2025-11-29-001 — Duplicated Title Capture Logic Causing Wrong Root Names`
  - Follow the existing schema exactly. :contentReference[oaicite:9]{index=9}  

- **Section 2 → `BUG_PATTERNS.md`**
  - Under the **WRONG_SELECTOR** pattern:
    - Add a bullet in “Related incidents” referencing `BUG-2025-11-29-001`.
  - Add a **new pattern** block for `DUPLICATED_LOGIC_DRIFT` in the appropriate category (likely Architecture or Logic), following the style of existing patterns. :contentReference[oaicite:10]{index=10}  

- **Section 3 → `BUG_PRINCIPLES.md`**
  - Append a new principle:
    - `Single Source of Truth for Shared Logic` with the provided description and examples. :contentReference[oaicite:11]{index=11}  

- **Section 4 → (optional) AES / process docs**
  - Mirror the **COPY_PASTE_LOGIC_FOR_SHARED_BEHAVIOR** antipattern and guardrails into:
    - `DEBUG_AGENT.md` / `FM_DEBUG_AGENT.md` (as a risk checklist item).
    - Any AES workflow docs that describe how agents should approach multi-surface features.

- **Idempotence notes:**
  - If this report is re-applied:
    - Check if `BUG-2025-11-29-001` already exists in `BUG_JOURNAL.md` and skip if so.
    - Check if `DUPLICATED_LOGIC_DRIFT` already exists in `BUG_PATTERNS.md`.
    - Check if the principle name `Single Source of Truth for Shared Logic` already exists in `BUG_PRINCIPLES.md` before appending.
