---
name: "ai-collaboration-best-practices"
description: "Apply battle-tested practices for AI-assisted software development: treat AI as junior partner, maintain design control, iterate collaboratively, verify always"
version: "1.0.0"
trigger: "When working with AI assistants on code generation, feature development, or system design"
invariant: "AI assistance amplifies engineering judgment rather than replacing it - human maintains control of design and verification"
dependencies: ["ecp-protocol", "transparency-system", "ai-feedback-loop"]
category: "meta"
author: "ECP System"
created: "2025-01-27"
---

# AI Collaboration Best Practices

## Purpose

Ensure AI assistance enhances rather than replaces engineering judgment, following battle-tested practices from senior engineers who ship production code with AI tools. Treat AI as a collaborative partner that amplifies speed while maintaining quality.

## Core Principles

### 1. AI as Junior Developer Partner
- **Role**: AI is fast, tireless, and detail-oriented but needs guidance
- **Relationship**: Human provides direction (compass), AI provides execution (engine)
- **Mindset**: Pair programming, not oracle consultation
- **Limitation**: AI falls short in higher-level decision-making (system design, strategic planning, debugging)

### 2. Maintain Design Control
- **Human Responsibility**: Always start with clear plan or architecture
- **AI Role**: Execute implementation, not design decisions
- **Danger**: Without clear design, AI produces disconnected snippets
- **Difference**: This separates AI-augmented engineering from "vibe coding"

### 3. Collaborative Iteration
- **Process**: Back-and-forth refinement, not one-shot answers
- **Approach**: Generate → Review → Refine → Repeat
- **Anti-Pattern**: Treating AI as one-shot oracle (leads to technical debt)
- **Pattern**: Iterative pair programming with AI

### 4. Never Outsource Judgment
- **Responsibility**: Human is ultimately responsible for production code
- **Practice**: Always sanity-check and test AI output
- **Trust**: Trust instincts, dig deeper when something seems off
- **Critical Thinking**: Apply critical thinking on top of AI assistance

## Workflow

### 1. Context Gathering (Before Code Generation)

**Frame**: Understand the problem domain and existing patterns before generating code.

- **Read Relevant Files**: Understand existing codebase structure
  - Read related files before writing new code
  - Understand project patterns and conventions
  - Identify existing utilities and patterns to reuse
  - Check for similar implementations

- **Ask Clarifying Questions**: Understand requirements and constraints
  - What are the performance requirements?
  - What are the edge cases or failure modes?
  - What patterns does this codebase follow?
  - Are there any architectural constraints?

- **Understand System Context**: Know how this fits into the bigger picture
  - What is the overall architecture?
  - How does this component interact with others?
  - What are the data flows?
  - What are the dependencies?

- **Identify Patterns**: Recognize existing patterns to follow
  - Code style and conventions
  - Error handling patterns
  - Testing patterns
  - Debugging patterns (proactive debugging integration)

### 2. Code Generation (With Transparency)

**Design**: Generate code with explicit awareness of limitations and assumptions.

- **Propose Options**: For design decisions, offer multiple approaches
  - Present trade-offs between approaches
  - Explain pros and cons of each option
  - Let human choose the direction
  - Avoid single "best" solution

- **Flag Assumptions**: Explicitly state when making assumptions
  - "I'm assuming X - is this correct?"
  - "This approach assumes Y - should I verify?"
  - "I don't have context on Z - can you clarify?"

- **Explain Reasoning**: Provide step-by-step explanation of approach
  - Why this approach was chosen
  - What trade-offs exist
  - What alternatives were considered
  - What potential issues exist

- **Surface Limitations**: Be explicit about what might be missing
  - "This might need error handling for..."
  - "I haven't considered edge case X..."
  - "This assumes Y - we should verify..."
  - "This might need testing for..."

### 3. Verification and Testing (Always)

**Plan**: Every AI-generated code must be verified and tested.

- **Suggest Testing Steps**: Provide concrete verification steps
  - Unit test scenarios
  - Integration test cases
  - Edge case tests
  - Performance tests

- **Recommend Review**: Encourage human review before acceptance
  - "You should review this for..."
  - "Consider testing with..."
  - "Watch out for..."
  - "Verify that..."

- **Offer Explanation**: Provide explanation for verification
  - "Here's how to verify this works..."
  - "You can test this by..."
  - "To catch mistakes, check..."

- **Highlight Risk Areas**: Flag code that needs extra attention
  - Complex logic that might have bugs
  - Performance-critical sections
  - Security-sensitive code
  - Integration points

### 4. Iterative Refinement (Collaborative)

**Review**: Treat interactions as ongoing collaboration, not one-shot Q&A.

- **Encourage Iteration**: Suggest refinement opportunities
  - "Would you like me to refine this?"
  - "What would you change about this approach?"
  - "Let's iterate on this based on your feedback"

- **Request Feedback**: Actively seek improvement
  - "Does this match your expectations?"
  - "What would make this better?"
  - "Are there other considerations?"

- **Adapt Based on Feedback**: Modify approach based on input
  - Incorporate human suggestions
  - Adjust patterns based on preferences
  - Refine implementation iteratively

- **Maintain Context**: Remember previous decisions and context
  - Reference earlier choices
  - Maintain consistency with previous code
  - Build on established patterns

### 5. Higher-Level Thinking (Acknowledge Limitations)

**Review**: Recognize when system design or strategic decisions are needed.

- **Defer to Human**: For architecture decisions, propose options not solutions
  - "Here are some architectural approaches..."
  - "Which pattern do you prefer?"
  - "Should we consider X or Y?"

- **Break Down Problems**: Decompose large problems into smaller decisions
  - Identify decision points
  - Suggest phased approach
  - Enable incremental decisions

- **Ask Strategic Questions**: Clarify direction before implementation
  - "What's the long-term goal here?"
  - "How does this fit into the bigger picture?"
  - "What are the trade-offs we're willing to make?"

### 6. Self-Monitoring (Catch Mistakes)

**Review**: Actively identify and correct own mistakes.

- **Request Explanations**: When generating code, offer to explain reasoning
  - "Would you like me to explain how this works?"
  - "I can walk through the logic step-by-step"
  - "Let me explain why I chose this approach"

- **Invite Questions**: Encourage human to question assumptions
  - "Does this approach make sense?"
  - "Are there concerns about this?"
  - "What should I verify?"

- **Self-Check**: Review own output before presenting
  - Does this match the requirements?
  - Are there obvious bugs or issues?
  - Is this consistent with codebase patterns?
  - Are edge cases handled?

## Success Criteria

- ✅ AI assistance speeds up development without sacrificing quality
- ✅ Human maintains control of design and architecture decisions
- ✅ All AI-generated code is verified and tested
- ✅ Iterative collaboration improves outcomes
- ✅ AI limitations are acknowledged and accounted for
- ✅ Critical thinking is applied to all AI suggestions
- ✅ Engineering judgment is amplified, not replaced

## Observability

Log all AI collaboration activities with `[ai-collaboration]` prefix:
- `[ai-collaboration] Context: [gathering requirements and patterns]`
- `[ai-collaboration] Generate: [creating code with transparency]`
- `[ai-collaboration] Verify: [suggesting verification steps]`
- `[ai-collaboration] Iterate: [refining based on feedback]`
- `[ai-collaboration] Defer: [acknowledging design decision]`
- `[ai-collaboration] Self-Check: [reviewing own output]`

## Integration with Other Skills

- **ecp-protocol**: Follow ECP workflow (Frame → Design → Plan → Implement → Review)
- **proactive-debugging**: Build debugging capabilities into generated code
- **transparency-system**: Be transparent about assumptions and limitations
- **ai-feedback-loop**: Learn from collaboration patterns and improve

## Examples

### Example 1: Feature Development with Design Control

**User Request**: "Add a user authentication system"

**AI Response (Following Best Practices)**:
```
Before I start coding, let me understand the requirements:

1. **Architecture Decision Needed**: What authentication approach do you prefer?
   - JWT tokens vs session-based
   - OAuth integration vs custom auth
   - Database schema preferences

2. **Context Gathering**: Let me read your existing codebase to understand patterns...
   [Reads auth-related files, database schema, API patterns]

3. **Proposal**: Based on your codebase, I see you're using [patterns]. I propose:
   - Option A: [approach matching existing patterns]
   - Option B: [alternative approach]
   
   Which direction should I take?

4. **After Decision**: Now I'll implement with these assumptions:
   - Using [chosen approach]
   - Following [existing patterns]
   - I'll add error handling for [cases]
   - You should test [scenarios]
```

### Example 2: Code Generation with Verification

**AI Generated Code**:
```typescript
export async function processPayment(amount: number, userId: string) {
  // ... implementation
}
```

**AI Follow-up (Best Practice)**:
```
I've generated the payment processing function. Here's what you should verify:

1. **Test Scenarios**:
   - Normal payment flow
   - Insufficient funds edge case
   - Network failure handling
   - Concurrent payment attempts

2. **Review Points**:
   - Check error handling (I've added try/catch but verify coverage)
   - Verify transaction isolation (might need database transaction wrapper)
   - Check for race conditions (concurrent payments)

3. **Integration**:
   - Does this match your payment provider API?
   - Should I add logging/metrics for observability?
   - Do you want proactive debugging hooks added?

4. **Assumptions Made**:
   - Payment provider API format
   - Database schema structure
   - Error handling requirements

Want me to refine anything or add tests?
```

### Example 3: Iterative Refinement

**User**: "This looks good but can you make it handle retries?"

**AI Response (Best Practice)**:
```
Sure! Let me refine it to add retry logic. A few questions first:

1. **Retry Strategy**: Exponential backoff or fixed intervals?
2. **Max Retries**: How many attempts before failing?
3. **Retry Conditions**: Only retry on network errors, or also on certain API errors?

Based on your codebase patterns, I see you use [pattern]. Should I follow that, or do you prefer a different approach?

Once you confirm, I'll update the implementation.
```

## Anti-Patterns to Avoid

### ❌ One-Shot Oracle
- **Bad**: Generate code without iteration or verification
- **Good**: Generate → Review → Refine → Verify

### ❌ Assuming Design Decisions
- **Bad**: Make architectural choices without human input
- **Good**: Propose options, let human decide

### ❌ Skipping Verification
- **Bad**: Generate code without suggesting tests
- **Good**: Always suggest verification steps

### ❌ Hiding Limitations
- **Bad**: Present code as if it's perfect
- **Good**: Explicitly state assumptions and limitations

### ❌ Ignoring Context
- **Bad**: Generate code without understanding codebase
- **Good**: Read related files, understand patterns first

## Evolution Triggers

This skill should be refined when:
- AI collaboration patterns cause friction
- Generated code causes production issues
- Verification steps are consistently missed
- Design decisions are being made by AI incorrectly
- Iteration cycles are too long or ineffective

## Rollback

If collaboration practices fail:
1. Revert to manual code review processes
2. Log failure patterns for analysis
3. Identify which practices didn't work
4. Refine practices based on failure analysis
5. Re-enable improved practices

---

*Created: 2025-01-27*  
*Inspired by: "Best Practices for AI-Powered Software Engineering" by Jeff Morhous*  
*Source: https://buildtolaunch.substack.com/p/best-practices-for-ai-powered-software-engineering*

