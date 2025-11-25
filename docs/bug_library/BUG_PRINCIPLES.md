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
