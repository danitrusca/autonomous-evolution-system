# Universal Development Guidelines

*Universal AI-assisted development best practices to maintain technical understanding while leveraging AI effectively.*

## 🎯 Universal Core Principles

### 1. Understand Before Implementing
- **Never copy-paste AI code without understanding it**
- **Ask AI to explain complex logic and algorithms**
- **Test edge cases that AI might not consider**
- **Document the "why" behind technical choices**

### 2. Maintain Architectural Control
- **Keep components focused on single responsibilities**
- **Extract common logic into utility functions**
- **Use consistent patterns for API calls and caching**
- **Follow the established error handling patterns**

### 3. Security First
- **Validate all inputs server-side**
- **Never trust client-side validation alone**
- **Use parameterized queries**
- **Implement rate limiting on all API endpoints**

## 🏗️ Universal Code Organization Patterns

### File Structure
```
lib/
├── constants.ts          # All configuration and magic numbers
├── error-handler.ts      # Centralized error handling
├── validation.ts         # Input validation utilities
├── rate-limiter.ts       # API rate limiting
├── api.ts               # Data fetching functions
└── types.ts             # TypeScript type definitions
```

### Component Patterns
```typescript
// Good: Focused, single responsibility
export function DataCard({ data }: { data: DataType }) {
  // Component logic here
}

// Bad: Mixed concerns
export function DataCardWithAuthAndValidation({ data }: { data: DataType }) {
  // Too many responsibilities
}
```

### API Patterns
```typescript
// Good: Consistent error handling
export async function fetchData(): Promise<DataType[]> {
  try {
    const { data, error } = await database
      .from('table')
      .select('id, name')
      .order('name', { ascending: true })
      .limit(API_CONFIG.MAX_ROWS);

    if (error) {
      logError(new DatabaseError(error.message), 'fetchData');
      throw error;
    }

    return data ?? [];
  } catch (err) {
    logError(normalizeError(err), 'fetchData');
    throw err;
  }
}
```

## 🧪 Universal Testing Strategy

### Unit Tests
- **Test business logic, not implementation details**
- **Mock external dependencies**
- **Test error conditions and edge cases**

### E2E Tests
- **Test complete user workflows**
- **Test authentication flows**
- **Test form validation**
- **Test error handling**

### Security Tests
- **Test SQL injection attempts**
- **Test rate limiting**
- **Test authentication requirements**
- **Test input validation**

## 🔍 Universal Code Review Checklist

### Before Submitting Code
- [ ] Can you explain how the code works to someone else?
- [ ] Are all inputs validated server-side?
- [ ] Are errors handled consistently?
- [ ] Are there any hardcoded values that should be in constants?
- [ ] Are there any security vulnerabilities?
- [ ] Are there any performance issues?
- [ ] Is the code testable and tested?

### AI-Generated Code Review
- [ ] Do you understand every line of code?
- [ ] Are there any edge cases not handled?
- [ ] Is the error handling appropriate?
- [ ] Are there any security issues?
- [ ] Is the code following established patterns?

## 🚀 Universal Deployment Checklist

### Pre-Deployment
- [ ] All environment variables are set correctly
- [ ] Database migrations are tested
- [ ] All tests are passing
- [ ] Security headers are configured
- [ ] Rate limiting is enabled
- [ ] Error handling is working
- [ ] Logging is configured

### Post-Deployment
- [ ] Health checks are passing
- [ ] Error rates are within acceptable limits
- [ ] Performance metrics are good
- [ ] Security scans are clean

## 📚 Universal Learning Resources

### Understanding the Codebase
1. **Start with constants** - Understand the configuration
2. **Read error handling** - Learn error handling patterns
3. **Study API layer** - Understand data flow
4. **Review middleware** - Learn security implementation

### Skill Development Exercises
1. **Debug without AI**: Try to fix bugs without asking AI first
2. **Refactor old code**: Improve existing code with fresh understanding
3. **Write tests**: Practice writing tests for existing functionality
4. **Performance optimization**: Identify and fix performance issues

### Staying Current
- **Read framework documentation** regularly
- **Follow database updates** and security advisories
- **Practice TypeScript** advanced features
- **Learn about web security** best practices

## 🚨 Universal Common Pitfalls to Avoid

### AI-Assisted Development Pitfalls
- **Copy-pasting without understanding**
- **Not testing edge cases**
- **Ignoring error handling**
- **Not considering security implications**
- **Creating technical debt**

### Security Pitfalls
- **Trusting client-side validation**
- **Not implementing rate limiting**
- **Exposing sensitive data in errors**
- **Not sanitizing inputs**
- **Missing security headers**

### Performance Pitfalls
- **N+1 query problems**
- **Not implementing caching**
- **Loading too much data**
- **Not optimizing images**
- **Missing error boundaries**

## 🔄 Universal Continuous Improvement

### Weekly Reviews
- **Review recent AI interactions** - What did you learn?
- **Identify knowledge gaps** - What don't you understand?
- **Practice debugging** - Try to solve problems without AI
- **Update documentation** - Keep guidelines current

### Monthly Assessments
- **Code quality review** - Are you maintaining standards?
- **Security audit** - Are there any vulnerabilities?
- **Performance review** - Are there optimization opportunities?
- **Skill assessment** - What new skills have you developed?

## 💡 Universal Best Practices Summary

1. **Always understand the code** before using it
2. **Test thoroughly** - including edge cases and error conditions
3. **Security first** - validate inputs, implement rate limiting, use security headers
4. **Follow established patterns** - consistency is key
5. **Document decisions** - explain the "why" behind technical choices
6. **Regular learning** - don't just copy code, understand the concepts
7. **Continuous improvement** - always look for ways to do better

Remember: The goal is to use AI as a powerful assistant while maintaining your technical understanding and building maintainable, secure, and performant applications.
