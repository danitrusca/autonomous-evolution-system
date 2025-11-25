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
