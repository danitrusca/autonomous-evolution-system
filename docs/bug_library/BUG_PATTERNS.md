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
### CASE_NOT_MUTUALLY_EXCLUSIVE

---

## 2. State Errors
Problems caused by stale, unsynchronized, or mutated state.

### STALE_STATE
**Definition:** Code uses outdated values, especially in async flows.  
**Symptoms:** UI not updating, handlers referencing old closures.  
**Root Cause:** Closure capture, asynchronous updates, race conditions.  
**Fix Strategies:** Explicit state refresh, stable refs, memoization checks.

### RACE_CONDITION
### MUTATION_WHEN_IMMUTABLE

---

## 3. API / Data Shape Errors

### WRONG_SHAPE_INPUT
**Definition:** Code assumes a field exists when it does not.  
**Symptoms:** undefined access, silent failure, mismatched types.  
**Fix Strategies:** Zod/schema validation; defensive guards.

### MISSING_FIELD
### UNVERIFIED_EXTERNAL_DATA

---

## 4. Async / Timing

### UNRESOLVED_PROMISE
### MISSING_AWAIT
### TIMEOUT_BEFORE_SIDE_EFFECT

---

# Add more patterns as your journal grows.
