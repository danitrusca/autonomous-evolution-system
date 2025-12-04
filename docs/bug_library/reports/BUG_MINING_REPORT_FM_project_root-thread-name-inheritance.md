# Fractal Messaging Root Thread Name Inheritance - Bug Analysis (Pass 2)

## Context
**Feature Goal**: Implement "Root Thread Name Inheritance" (FM roots inherit ChatGPT titles).  
**Timeline**: 2025-11-24 to 2025-11-25  
**Outcome**: Feature implemented, then regressed, then rolled back.  

This second pass analysis digs deeper into **why** the regressions occurred, specifically focusing on the "Folder Prefix" fix that collapsed the thread tree, and aligns findings with the **Zen Design** principles.

---

## BUG_JOURNAL Entries (Refined)

### BUG-2025-11-24-001: Incomplete Architecture Wiring
**Timestamp**: 2025-11-24 ~13:00 GMT+2  
**Severity**: High  
**Pattern**: `INCOMPLETE_WIRING` (Architecture)  

**Symptom**: Menu Branch button created "Root Thread N" while Floating button created correct titles.  
**Deep Root Cause**: The agent treated the "Menu" and "Floating Button" as separate features rather than two views of the same **Intent**. It implemented the logic in the Service Worker (the Authority) but failed to route the Menu's action through that Authority.  
**Fix**: Route Menu action via `REGISTER_ROOT_THREAD` bus message.  

### BUG-2025-11-24-002: Wrong ChatGPT Title Selector
**Timestamp**: 2025-11-24 ~14:00 GMT+2  
**Severity**: Medium  
**Pattern**: `WRONG_SELECTOR` (Data Shape)  

**Symptom**: Thread titles were "FEATURE INTRODUCTION PROTOCOL" (content headings) instead of conversation names.  
**Deep Root Cause**: **Semantic Ambiguity**. The selector `h1` is structural, not semantic. In ChatGPT, `h1` is used for user content. The actual title is semantic metadata (`data-testid="conversation-name"`).  
**Fix**: Use specific `data-testid` selectors; fallback to `document.title`.  

### BUG-2025-11-24-004: The "Bundled Refactor" Regression (Identity Collapse)
**Timestamp**: 2025-11-24 ~16:00 GMT+2  
**Severity**: Critical  
**Pattern**: `OVER_NORMALIZATION` / `BUNDLED_REFACTOR_RISK`  

**Symptom**: After fixing a minor title issue (removing folder prefix), the menu started showing **only one thread** for all ChatGPT conversations.  
**Deep Root Cause**: 
1. The user asked to fix the *Title* ("remove folder name").
2. The agent *also* decided to "clean up" the *Identity* logic in the same pass, switching the Menu from using `window.location.href` (raw) to `normalizeUrlForConvId(url)` (standardized).
3. **The Standard Was Flawed**: `normalizeUrlForConvId` likely stripped query parameters. For the specific "Project" threads the user was in, the unique ID was likely *in the query parameter* (or the path structure was non-standard).
4. Result: All distinct threads normalized to the same base URL → same `convId` → Service Worker correctly deduped them to a single root.

**Lesson**: **Never bundle a Refactor (changing how ID is computed) with a Fix (changing how Title is parsed).** The "hacky" raw URL usage was actually load-bearing.

### BUG-2025-11-25-005: "No messages" Gate (Zen Violation)
**Timestamp**: 2025-11-25 ~09:00 GMT+2  
**Severity**: Critical  
**Pattern**: `TIGHT_COUPLING` / `ZEN_VIOLATION`  

**Symptom**: Branch button replaced by "No messages" label on valid threads.  
**Deep Root Cause**: 
1. **Coupling**: Branching availability was coupled to Message Scraping success.
2. **Zen Violation**: The UI exposed internal failure state ("No messages") in a way that confused the user and blocked action. A "Calm" interface should degrade gracefully, not disable core affordances because a secondary subsystem failed.  
**Fix**: Gate on URL presence (`/c/<id>`), not message count.

### BUG-2025-11-25-006: "Receiving end does not exist" (Zen Violation)
**Timestamp**: 2025-11-25 ~09:30 GMT+2  
**Severity**: Medium  
**Pattern**: `MV3_MESSAGE_RACE` / `ZEN_VIOLATION`  

**Symptom**: Red error alert when clicking Branch.  
**Deep Root Cause**: 
1. **Async Reality**: Service Workers in MV3 *will* be unreachable sometimes.
2. **Zen Violation**: Throwing a raw error alert breaks "Calm by Default". The user doesn't care about "Receiving ends"; they want to branch.  
**Fix**: Silent fallback to local storage mutation.

---

## BUG_PATTERNS (Aligned with Global Ontology)

### 1. Logic / State Errors

**OVER_NORMALIZATION**  
**Definition**: Data cleaning or ID normalization logic is too aggressive, destroying distinctiveness.  
**Symptoms**: Different entities collapse into one; hash collisions.  
**Root Cause**: Assuming a specific URL/data format (e.g. "IDs are always in the path") when exceptions exist.  
**Fix**: Test normalization against *all* known URL variants, including "Project" URLs, shared links, etc.

**BUNDLED_REFACTOR_RISK**  
**Definition**: A regression caused by changing code *unrelated* to the requested fix "while we're at it".  
**Symptoms**: A fix for Feature A breaks Feature B.  
**Root Cause**: Lack of discipline in separating "Fix" commits from "Refactor" commits.  
**Fix**: **Atomic Commits**. Fix the title. Verify. Then refactor the ID logic.

### 2. Architecture Errors

**INCOMPLETE_WIRING**  
**Definition**: A feature is implemented in the "Backend" (SW) but not the "Frontend" (UI).  
**Symptoms**: UI behaves as if the feature doesn't exist, despite code being written.  
**Root Cause**: Viewing the system as files rather than **Flows**.  
**Fix**: "Trace the Intent" — follow the user action from click to storage.

**BYPASS_AUTHORITY**  
**Definition**: UI components mutating state directly instead of requesting action from the Authority (SW).  
**Symptoms**: Inconsistent state, invariant violations (e.g. duplicates).  
**Fix**: Enforce "Intents Only" for UI components via linting.

### 3. Zen / Experience Errors

**ZEN_VIOLATION**  
**Definition**: A bug that isn't a crash, but breaks the "Calm", "Trust", or "Flow" of the system.  
**Sub-types**:
- **NOISY_FAILURE**: Exposing internal errors (alerts, "No messages") to the user.
- **FALSE_AFFORDANCE**: Showing a button that doesn't work.
- **STATE_JUMP**: UI flickering or shifting unexpectedly.
**Fix**: Design for **Graceful Degradation**. If SW is down, fall back. If scraping fails, allow empty branching.

---

## GUARDRAILS (Executable & Verifiable)

### 1. The "Project URL" Identity Test
**Prevent**: `OVER_NORMALIZATION`  
**Type**: Unit Test  

Add this specific test case to `src/shared/url.test.ts`:

```typescript
test('deriveConvId preserves identity of Project threads', () => {
  // Hypothetical Project URL structure (verify with real data)
  const projectUrl1 = 'https://chatgpt.com/g/g-123-project/c/thread-A';
  const projectUrl2 = 'https://chatgpt.com/g/g-123-project/c/thread-B';
  
  const id1 = deriveConvId(projectUrl1);
  const id2 = deriveConvId(projectUrl2);
  
  expect(id1).not.toBe(id2); // Must not collapse
});
```

### 2. The "Atomic Intent" Checklist
**Prevent**: `INCOMPLETE_WIRING`  
**Type**: Process / PR Template  

When implementing a new User Action (e.g. "Branch"), verify the **Flow**:
- [ ] **Trigger**: UI Component (Button/Menu)
- [ ] **Intent**: Bus Message (`REGISTER_ROOT_THREAD`)
- [ ] **Authority**: Service Worker Handler
- [ ] **State**: Storage Update
- [ ] **Feedback**: UI Update (via State Broadcast)

*If any step is skipped (e.g. UI -> Storage), the wiring is incomplete.*

### 3. The "Calm Fallback" Pattern
**Prevent**: `MV3_MESSAGE_RACE`, `ZEN_VIOLATION`  
**Type**: Code Pattern  

Wrap all Service Worker calls in a "Calm" handler:

```typescript
async function calmSendToSW(message, fallbackAction) {
  try {
    await sendToSW(message);
  } catch (err) {
    console.warn('[Zen] SW unreachable, falling back calmly:', err);
    // Do NOT alert the user. Just do the work locally if possible.
    await fallbackAction();
  }
}
```

### 4. Selector Ambiguity Warning
**Prevent**: `WRONG_SELECTOR`  
**Type**: Runtime Check  

In `getChatGPTTitleFromDom`:

```typescript
const candidates = document.querySelectorAll(selector);
if (candidates.length > 1) {
  console.warn('[FM] Ambiguous selector match:', selector, candidates);
  // Prefer the one that looks most like a title (e.g. not inside <main>)
}
```

### 5. Precondition Audit
**Prevent**: `TIGHT_COUPLING`  
**Type**: Manual Review  

Review all `disabled={...}` props.
- Ask: "Is this condition **physically required** for the action?"
- If No (e.g. "messages exist"), remove it.
- **Rule**: Only gate actions on **Identity** (do we know who we are?), not **Content** (do we have the text yet?).

---

## Summary of Pass 2
The critical insight is that the **Identity Collapse (Bug 004)** was a self-inflicted wound caused by **bundling a risky refactor (ID normalization) with a cosmetic fix (Title cleanup)**. 

The **Zen Violations** (Bugs 005, 006) reveal a need to treat "User Experience" as a hard constraint: **Errors must be whispered, not shouted.**
