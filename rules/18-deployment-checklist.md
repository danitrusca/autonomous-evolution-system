# Universal Deployment Checklist

*Universal deployment practices based on AI Vibe Coding Management principles*

## 🚀 Universal Pre-Deployment Checklist

### Environment Configuration
- [ ] **Environment Variables**
  - [ ] All required environment variables are set correctly
  - [ ] No development environment variables in production
  - [ ] Database connection strings are secure
  - [ ] API keys and secrets are properly configured
  - [ ] `NODE_ENV` is set to `production`

### Security Configuration
- [ ] **Security Headers**
  - [ ] X-Frame-Options: DENY
  - [ ] X-Content-Type-Options: nosniff
  - [ ] Referrer-Policy: strict-origin-when-cross-origin
  - [ ] X-XSS-Protection: 1; mode=block
  - [ ] Content-Security-Policy headers (if applicable)

- [ ] **CORS Configuration**
  - [ ] CORS is configured for production domain only
  - [ ] No wildcard origins in production
  - [ ] Proper preflight request handling

- [ ] **Rate Limiting**
  - [ ] Rate limiting is enabled on all API endpoints
  - [ ] Rate limits are appropriate for production load
  - [ ] Rate limit headers are properly set

### Database & Infrastructure
- [ ] **Database Configuration**
  - [ ] Database is properly configured
  - [ ] RLS (Row Level Security) policies are enabled
  - [ ] Database backups are configured
  - [ ] Connection limits are appropriate

- [ ] **SSL/HTTPS**
  - [ ] HTTPS is enforced in production
  - [ ] SSL certificates are valid and not expired
  - [ ] HTTP to HTTPS redirects are working

### Testing & Quality Assurance
- [ ] **Automated Tests**
  - [ ] All unit tests are passing
  - [ ] All E2E tests are passing
  - [ ] Type checking is passing
  - [ ] Linting is passing

- [ ] **Manual Testing**
  - [ ] Core functionality works as expected
  - [ ] Error handling works correctly
  - [ ] Security measures are functioning
  - [ ] Performance is acceptable

### Performance & Monitoring
- [ ] **Performance Optimization**
  - [ ] Images are optimized
  - [ ] Code splitting is implemented
  - [ ] Caching is configured
  - [ ] Database queries are optimized

- [ ] **Monitoring Setup**
  - [ ] Error tracking is configured
  - [ ] Performance monitoring is active
  - [ ] Logging is properly configured
  - [ ] Health checks are working

## 🔧 Universal Deployment Process

### 1. Pre-Deployment Validation
```bash
# Run all tests
npm run test
npm run test:e2e
npm run type-check
npm run lint

# Check environment variables
npm run env:check

# Verify security configuration
npm run security:check
```

### 2. Database Migration
```bash
# Run database migrations
npm run db:migrate

# Verify database schema
npm run db:verify

# Check RLS policies
npm run db:check-rls
```

### 3. Build and Deploy
```bash
# Build for production
npm run build

# Deploy to production
npm run deploy

# Verify deployment
npm run health:check
```

### 4. Post-Deployment Verification
```bash
# Check all endpoints
npm run test:smoke

# Verify security headers
npm run security:verify

# Check performance
npm run performance:check
```

## 🛡️ Universal Security Checklist

### Authentication & Authorization
- [ ] **Authentication Flow**
  - [ ] Login/logout functionality works
  - [ ] Password reset works
  - [ ] OAuth providers are configured
  - [ ] Session management is secure

- [ ] **Authorization**
  - [ ] Role-based access control is working
  - [ ] Protected routes are secure
  - [ ] API endpoints require authentication
  - [ ] User permissions are enforced

### Data Protection
- [ ] **Input Validation**
  - [ ] All inputs are validated server-side
  - [ ] SQL injection protection is active
  - [ ] XSS protection is working
  - [ ] File upload restrictions are in place

- [ ] **Data Encryption**
  - [ ] Sensitive data is encrypted
  - [ ] Database connections are secure
  - [ ] API communications are encrypted
  - [ ] File storage is secure

## 📊 Universal Performance Checklist

### Frontend Performance
- [ ] **Loading Performance**
  - [ ] First Contentful Paint < 1.5s
  - [ ] Largest Contentful Paint < 2.5s
  - [ ] Cumulative Layout Shift < 0.1
  - [ ] First Input Delay < 100ms

- [ ] **Resource Optimization**
  - [ ] Images are optimized
  - [ ] CSS/JS is minified
  - [ ] Unused code is removed
  - [ ] Caching is configured

### Backend Performance
- [ ] **API Performance**
  - [ ] Response times < 200ms
  - [ ] Database queries are optimized
  - [ ] Rate limiting is working
  - [ ] Error handling is efficient

- [ ] **Database Performance**
  - [ ] Queries are indexed
  - [ ] Connection pooling is configured
  - [ ] Query timeouts are set
  - [ ] Database monitoring is active

## 🔍 Universal Monitoring & Alerting

### Error Monitoring
- [ ] **Error Tracking**
  - [ ] All errors are logged
  - [ ] Error alerts are configured
  - [ ] Error rates are monitored
  - [ ] Critical errors are escalated

### Performance Monitoring
- [ ] **Performance Metrics**
  - [ ] Response times are tracked
  - [ ] Database performance is monitored
  - [ ] Memory usage is tracked
  - [ ] CPU usage is monitored

### Security Monitoring
- [ ] **Security Alerts**
  - [ ] Failed login attempts are tracked
  - [ ] Suspicious activity is flagged
  - [ ] Security events are logged
  - [ ] Security alerts are configured

## 🚨 Universal Rollback Procedures

### Emergency Rollback
1. **Immediate Actions**
   - [ ] Identify the issue
   - [ ] Assess impact
   - [ ] Activate rollback procedure
   - [ ] Notify stakeholders

2. **Rollback Process**
   - [ ] Revert to last known good version
   - [ ] Restore database from backup
   - [ ] Verify system stability
   - [ ] Monitor for issues

3. **Post-Rollback**
   - [ ] Document the incident
   - [ ] Analyze root cause
   - [ ] Implement prevention measures
   - [ ] Update procedures

### Planned Rollback
1. **Preparation**
   - [ ] Test rollback procedure
   - [ ] Prepare rollback plan
   - [ ] Notify team
   - [ ] Schedule rollback window

2. **Execution**
   - [ ] Execute rollback plan
   - [ ] Verify functionality
   - [ ] Monitor system
   - [ ] Document results

## 📈 Universal Post-Deployment Monitoring

### Health Checks
- [ ] **System Health**
  - [ ] All services are running
  - [ ] Database is accessible
  - [ ] API endpoints are responding
  - [ ] Error rates are normal

### User Experience
- [ ] **User Monitoring**
  - [ ] User flows are working
  - [ ] Performance is acceptable
  - [ ] Errors are minimal
  - [ ] User feedback is positive

### Business Metrics
- [ ] **Business Impact**
  - [ ] Key metrics are tracking
  - [ ] Business goals are met
  - [ ] User engagement is normal
  - [ ] Revenue impact is positive

## 🔄 Universal Continuous Improvement

### Deployment Optimization
- [ ] **Process Improvement**
  - [ ] Deployment time is optimized
  - [ ] Rollback time is minimized
  - [ ] Error rates are reduced
  - [ ] Success rate is improved

### Monitoring Enhancement
- [ ] **Monitoring Improvement**
  - [ ] Alert accuracy is improved
  - [ ] Response time is reduced
  - [ ] Coverage is expanded
  - [ ] Automation is increased

Remember: This checklist should be customized for your specific technology stack and deployment environment. The goal is to ensure reliable, secure, and performant deployments.
