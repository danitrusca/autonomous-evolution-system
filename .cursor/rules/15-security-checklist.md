# ECP Security Checklist for Teaching App

*Integrated security rules from the Universal .cursorrules template with ECP methodology*

## 🚨 CRITICAL SECURITY RULES 🚨

### **NEVER EXPOSE SECRETS OR TOKENS**
- **NEVER** commit API keys, database URLs, or secrets to version control
- **ALWAYS** use environment variables for sensitive configuration
- **NEVER** log secrets in console or error messages
- **ALWAYS** use .env files locally and proper environment management in production

### **OAuth & Authentication Security**
- **NEVER** redirect OAuth directly to protected pages without proper token handling
- **ALWAYS** use callback pattern: `redirectTo: '/auth/callback'`
- **SUPABASE SPECIFIC**: Uses Implicit Grant (tokens in URL hash), requires client-side handling
- **CORRECT PATTERN**: Client-side callback page with immediate URL hash cleaning

### **Database Security**
- **ALWAYS** implement Row Level Security (RLS) policies in Supabase
- **NEVER** expose database credentials in client-side code
- **ALWAYS** validate and sanitize all user inputs
- **NEVER** use dynamic SQL without parameterized queries

### **Input Validation & Rate Limiting**
- **ALWAYS** validate inputs server-side with structured validation
- **ALWAYS** implement rate limiting on all API endpoints
- **ALWAYS** use parameterized queries (Supabase handles this automatically)
- **NEVER** trust client-side validation alone

## ECP Security Integration

### Frame Phase Security Checks
Before any code generation, verify:
- [ ] No secrets will be exposed in logs or error messages
- [ ] All inputs will be validated server-side
- [ ] Authentication flows follow proper callback patterns
- [ ] Database queries respect RLS policies
- [ ] Rate limiting is implemented on API endpoints

### Design Phase Security Patterns
- [ ] **Data Boundaries**: Clear separation between public and private data
- [ ] **Authentication Flow**: Proper token handling and callback patterns
- [ ] **Input Validation**: Server-side validation with structured error handling
- [ ] **Database Security**: RLS policies and parameterized queries
- [ ] **Rate Limiting**: Protection against abuse and DoS attacks

### Plan Phase Security Commitments
- [ ] **Security-First Implementation**: Security measures implemented before features
- [ ] **Observability**: Security events logged with appropriate prefixes
- [ ] **Rollback Plan**: Security rollback procedures documented
- [ ] **Testing**: Security tests included in commit plan

### Implement Phase Security Enforcement
- [ ] **No Secrets in Logs**: All logs use placeholders for sensitive data
- [ ] **Input Validation**: All user inputs validated with structured validation
- [ ] **Authentication**: Proper callback patterns for OAuth flows
- [ ] **Database**: RLS policies enforced, parameterized queries used
- [ ] **Rate Limiting**: All API endpoints protected

## Project-Specific Security Patterns

### Supabase Security
- **RLS Policies**: Every table must have appropriate RLS policies
- **Auth Integration**: Use Supabase Auth for all authentication
- **Token Handling**: Proper token management in client-side code
- **Database Queries**: Use Supabase client methods (automatically parameterized)

### Next.js Security
- **API Routes**: Server-side validation on all API endpoints
- **Middleware**: Security headers and CORS configuration
- **Environment Variables**: Proper secret management
- **Client-Side**: No sensitive data exposed to browser

### TypeScript Security
- **Type Safety**: Strict typing for all data structures
- **Input Validation**: Typed validation functions
- **Error Handling**: Structured error types
- **API Contracts**: Typed API interfaces

## Security Testing Checklist

### Manual Security Tests
- [ ] **SQL Injection**: Test with `'; DROP TABLE users; --`
- [ ] **XSS Prevention**: Test with `<script>alert('xss')</script>`
- [ ] **Authentication**: Test without proper authentication
- [ ] **Rate Limiting**: Test API endpoint abuse
- [ ] **Input Validation**: Test with special characters and edge cases

### Automated Security Tests
- [ ] **Unit Tests**: Security functions tested
- [ ] **Integration Tests**: Authentication flows tested
- [ ] **E2E Tests**: Complete security workflows tested
- [ ] **Security Scans**: Regular dependency vulnerability scans

## Security Monitoring

### Logging Requirements
- **Security Events**: All security-related events logged with `[security]` prefix
- **Authentication**: Login/logout events logged with `[auth]` prefix
- **Input Validation**: Validation failures logged with `[validation]` prefix
- **Rate Limiting**: Rate limit violations logged with `[rate-limit]` prefix

### Error Handling
- **No Information Disclosure**: Error messages don't reveal system details
- **Structured Errors**: Consistent error format across the application
- **Security Context**: Security events include relevant context
- **Audit Trail**: Security events are auditable

## Emergency Security Response

### Critical Security Issues
1. **Immediate**: Assess impact and implement hotfix
2. **Short-term**: Comprehensive security review
3. **Long-term**: Security architecture improvements

### Security Rollback Procedures
- **Authentication**: Disable affected authentication methods
- **API Endpoints**: Disable compromised endpoints
- **Database**: Restore from secure backup
- **Deployment**: Rollback to last known secure version

## Continuous Security Improvement

### Security Learning Integration
- **Security Patterns**: Capture successful security implementations
- **Vulnerability Analysis**: Learn from security issues
- **Best Practices**: Document security best practices
- **Tool Updates**: Stay current with security tools and libraries

### Security Rule Evolution
- **Pattern Recognition**: Identify common security patterns
- **Rule Optimization**: Improve security rules based on experience
- **Knowledge Capture**: Document security insights in evolution journal
- **System Improvement**: Enhance security capabilities over time
