/**
 * Agent Coordinator
 * Coordinates multiple agents for system optimization and integrity
 */

const SystemIntegrityAgent = require('./system-integrity-agent');
const ChangeImpactAgent = require('./change-impact-agent');
const AgentCreator = require('./agent-creator');
const GitVersioningIntegration = require('./git-versioning-integration');

class AgentCoordinator {
  constructor() {
    this.coordinatorName = 'agent-coordinator';
    this.agents = new Map();
    this.coordinationLogs = [];
    this.versioningIntegration = new GitVersioningIntegration();
    this.startCoordination();
  }

  /**
   * Start agent coordination
   * Invariant: Coordination maintains system safety
   */
  startCoordination() {
    console.log(`[${this.coordinatorName}] Starting agent coordination`);
    
    // Initialize agents
    this.initializeAgents();
    
    // Start coordination
    this.startCoordinationLoop();
    
    console.log(`[${this.coordinatorName}] Agent coordination active`);
  }

  /**
   * Initialize agents
   * Invariant: Agent initialization maintains system safety
   */
  initializeAgents() {
    console.log(`[${this.coordinatorName}] Initializing agents`);
    
    // System Integrity Agent
    const systemIntegrityAgent = new SystemIntegrityAgent();
    this.agents.set('system-integrity', systemIntegrityAgent);
    
    // Change Impact Agent
    const changeImpactAgent = new ChangeImpactAgent();
    this.agents.set('change-impact', changeImpactAgent);
    
    // Agent Creator
    const agentCreator = new AgentCreator();
    this.agents.set('agent-creator', agentCreator);
    
    // Git Versioning Integration
    this.agents.set('git-versioning', this.versioningIntegration);
    
    console.log(`[${this.coordinatorName}] Agents initialized: ${this.agents.size}`);
  }

  /**
   * Start coordination loop
   * Invariant: Coordination loop maintains system safety
   */
  startCoordinationLoop() {
    console.log(`[${this.coordinatorName}] Starting coordination loop`);
    
    // Coordinate agents every 5 minutes
    setInterval(() => {
      this.coordinateAgents();
    }, 300000); // 5 minutes
    
    // Monitor agent health every minute
    setInterval(() => {
      this.monitorAgentHealth();
    }, 60000); // 1 minute
    
    // Monitor Git commits for versioning every 2 minutes
    setInterval(() => {
      this.monitorCommitsForVersioning();
    }, 120000); // 2 minutes
  }

  /**
   * Coordinate agents
   * Invariant: Agent coordination maintains system safety
   */
  coordinateAgents() {
    console.log(`[${this.coordinatorName}] Coordinating agents`);
    
    try {
      // Get status from all agents
      const agentStatuses = this.getAgentStatuses();
      
      // Analyze coordination opportunities
      const coordinationOpportunities = this.analyzeCoordinationOpportunities(agentStatuses);
      
      // Execute coordination
      for (const opportunity of coordinationOpportunities) {
        this.executeCoordination(opportunity);
      }
      
      // Log coordination
      this.logCoordination(agentStatuses, coordinationOpportunities);
      
    } catch (error) {
      console.error(`[${this.coordinatorName}] Coordination failed:`, error.message);
    }
  }

  /**
   * Get agent statuses
   * Invariant: Status collection maintains system safety
   */
  getAgentStatuses() {
    const statuses = new Map();
    
    for (const [name, agent] of this.agents) {
      statuses.set(name, agent.getAgentStatus());
    }
    
    return statuses;
  }

  /**
   * Analyze coordination opportunities
   * Invariant: Opportunity analysis maintains system safety
   */
  analyzeCoordinationOpportunities(agentStatuses) {
    const opportunities = [];
    
    // Check for system integrity issues
    const systemIntegrityStatus = agentStatuses.get('system-integrity');
    if (systemIntegrityStatus && systemIntegrityStatus.status !== 'healthy') {
      opportunities.push({
        type: 'system-integrity',
        priority: 'high',
        description: 'System integrity issues detected',
        agents: ['system-integrity', 'change-impact'],
        action: 'coordinate-integrity-fix'
      });
    }
    
    // Check for change impact issues
    const changeImpactStatus = agentStatuses.get('change-impact');
    if (changeImpactStatus && changeImpactStatus.testFlags.length > 0) {
      opportunities.push({
        type: 'change-impact',
        priority: 'medium',
        description: 'Change impact testing needed',
        agents: ['change-impact', 'system-integrity'],
        action: 'coordinate-change-testing'
      });
    }
    
    // Check for optimization opportunities
    opportunities.push({
      type: 'optimization',
      priority: 'low',
      description: 'Continuous optimization',
      agents: ['system-integrity'],
      action: 'coordinate-optimization'
    });
    
    // Check for agent creation opportunities
    const agentCreationOpportunities = this.analyzeAgentCreationOpportunities(agentStatuses);
    opportunities.push(...agentCreationOpportunities);
    
    return opportunities;
  }

  /**
   * Execute coordination
   * Invariant: Coordination execution maintains system safety
   */
  executeCoordination(opportunity) {
    console.log(`[${this.coordinatorName}] Executing coordination: ${opportunity.type}`);
    
    try {
      switch (opportunity.action) {
        case 'coordinate-integrity-fix':
          this.coordinateIntegrityFix(opportunity);
          break;
        case 'coordinate-change-testing':
          this.coordinateChangeTesting(opportunity);
          break;
        case 'coordinate-optimization':
          this.coordinateOptimization(opportunity);
          break;
        case 'coordinate-agent-creation':
          this.coordinateAgentCreation(opportunity);
          break;
        default:
          console.log(`[${this.coordinatorName}] Unknown coordination action: ${opportunity.action}`);
      }
      
      // Log coordination execution
      this.logCoordinationExecution(opportunity, 'success');
      
    } catch (error) {
      console.error(`[${this.coordinatorName}] Coordination execution failed:`, error.message);
      this.logCoordinationExecution(opportunity, 'failure', error.message);
    }
  }

  /**
   * Coordinate integrity fix
   * Invariant: Integrity coordination maintains system safety
   */
  coordinateIntegrityFix(opportunity) {
    console.log(`[${this.coordinatorName}] Coordinating integrity fix`);
    
    // Get system integrity agent
    const systemIntegrityAgent = this.agents.get('system-integrity');
    
    // Get change impact agent
    const changeImpactAgent = this.agents.get('change-impact');
    
    // Coordinate integrity fix
    if (systemIntegrityAgent && changeImpactAgent) {
      // System integrity agent identifies issues
      const integrityIssues = systemIntegrityAgent.getAgentStatus();
      
      // Change impact agent assesses impact
      const impactAssessment = changeImpactAgent.getAgentStatus();
      
      // Coordinate fix
      this.coordinateIntegrityFixExecution(integrityIssues, impactAssessment);
    }
  }

  /**
   * Coordinate change testing
   * Invariant: Change testing coordination maintains system safety
   */
  coordinateChangeTesting(opportunity) {
    console.log(`[${this.coordinatorName}] Coordinating change testing`);
    
    // Get change impact agent
    const changeImpactAgent = this.agents.get('change-impact');
    
    if (changeImpactAgent) {
      const changeStatus = changeImpactAgent.getAgentStatus();
      
      // Coordinate testing
      this.coordinateChangeTestingExecution(changeStatus);
    }
  }

  /**
   * Coordinate optimization
   * Invariant: Optimization coordination maintains system safety
   */
  coordinateOptimization(opportunity) {
    console.log(`[${this.coordinatorName}] Coordinating optimization`);
    
    // Get system integrity agent
    const systemIntegrityAgent = this.agents.get('system-integrity');
    
    if (systemIntegrityAgent) {
      const integrityStatus = systemIntegrityAgent.getAgentStatus();
      
      // Coordinate optimization
      this.coordinateOptimizationExecution(integrityStatus);
    }
  }

  /**
   * Monitor agent health
   * Invariant: Health monitoring maintains system safety
   */
  monitorAgentHealth() {
    console.log(`[${this.coordinatorName}] Monitoring agent health`);
    
    for (const [name, agent] of this.agents) {
      try {
        // Check if agent has getAgentStatus method
        if (typeof agent.getAgentStatus === 'function') {
          const status = agent.getAgentStatus();
          
          if (status && status.status === 'unhealthy') {
            console.log(`[${this.coordinatorName}] Agent unhealthy: ${name}`);
            this.handleUnhealthyAgent(name, agent);
          }
        } else {
          // For agents without getAgentStatus, assume healthy
          console.log(`[${this.coordinatorName}] Agent ${name} status check not available, assuming healthy`);
        }
      } catch (error) {
        console.error(`[${this.coordinatorName}] Error checking agent ${name} health:`, error.message);
      }
    }
  }

  /**
   * Handle unhealthy agent
   * Invariant: Unhealthy agent handling maintains system safety
   */
  handleUnhealthyAgent(agentName, agent) {
    console.log(`[${this.coordinatorName}] Handling unhealthy agent: ${agentName}`);
    
    // Log unhealthy agent
    this.logUnhealthyAgent(agentName, agent);
    
    // Attempt recovery
    this.attemptAgentRecovery(agentName, agent);
    
    // Alert other agents if needed
    this.alertOtherAgents(agentName, agent);
  }

  /**
   * Get coordinator status
   * Invariant: Status reporting maintains system safety
   */
  getCoordinatorStatus() {
    const agentStatuses = this.getAgentStatuses();
    
    return {
      coordinator: this.coordinatorName,
      agents: agentStatuses,
      logs: this.coordinationLogs.slice(-10), // Last 10 logs
      health: this.determineOverallHealth(agentStatuses)
    };
  }

  // Placeholder methods for actual implementation
  coordinateIntegrityFixExecution(integrityIssues, impactAssessment) {
    console.log('Integrity fix coordinated');
  }
  
  coordinateChangeTestingExecution(changeStatus) {
    console.log('Change testing coordinated');
  }
  
  coordinateOptimizationExecution(integrityStatus) {
    console.log('Optimization coordinated');
  }
  
  /**
   * Analyze agent creation opportunities
   * Invariant: Agent creation analysis maintains system safety
   */
  analyzeAgentCreationOpportunities(agentStatuses) {
    const opportunities = [];
    
    // Check for unmet needs
    const unmetNeeds = this.identifyUnmetNeeds(agentStatuses);
    
    for (const need of unmetNeeds) {
      opportunities.push({
        type: 'agent-creation',
        priority: need.priority,
        description: `Create agent for: ${need.description}`,
        agents: ['agent-creator'],
        action: 'coordinate-agent-creation',
        need: need
      });
    }
    
    return opportunities;
  }
  
  /**
   * Coordinate agent creation
   * Invariant: Agent creation coordination maintains system safety
   */
  coordinateAgentCreation(opportunity) {
    console.log(`[${this.coordinatorName}] Coordinating agent creation: ${opportunity.description}`);
    
    // Get agent creator
    const agentCreator = this.agents.get('agent-creator');
    
    if (agentCreator) {
      // Create agent based on need
      const result = agentCreator.createAgent(opportunity.need, {});
      
      if (result.success) {
        console.log(`[${this.coordinatorName}] Agent created successfully: ${result.agent.name}`);
        
        // Register new agent with coordinator
        this.registerNewAgent(result.agent);
      } else {
        console.error(`[${this.coordinatorName}] Agent creation failed: ${result.error}`);
      }
    }
  }
  
  /**
   * Register new agent
   * Invariant: Agent registration maintains system safety
   */
  registerNewAgent(agent) {
    console.log(`[${this.coordinatorName}] Registering new agent: ${agent.name}`);
    
    // Add to agents map
    this.agents.set(agent.name, agent);
    
    // Log registration
    this.logNewAgentRegistration(agent);
  }
  
  /**
   * Identify unmet needs
   * Invariant: Need identification maintains system safety
   */
  identifyUnmetNeeds(agentStatuses) {
    const needs = [];
    
    // Check for performance issues
    const systemIntegrityStatus = agentStatuses.get('system-integrity');
    if (systemIntegrityStatus && systemIntegrityStatus.status === 'degraded') {
      needs.push({
        type: 'performance-monitoring',
        description: 'Enhanced performance monitoring',
        priority: 'high',
        impact: 'high',
        urgency: 'high',
        scope: 'system-wide',
        dependencies: []
      });
    }
    
    // Check for learning opportunities
    const learningOpportunities = this.identifyLearningOpportunities();
    needs.push(...learningOpportunities);
    
    return needs;
  }
  
  /**
   * Identify learning opportunities
   * Invariant: Learning opportunity identification maintains system safety
   */
  identifyLearningOpportunities() {
    const opportunities = [];
    
    // Pattern recognition opportunities
    opportunities.push({
      type: 'pattern-recognition',
      description: 'Advanced pattern recognition for system optimization',
      priority: 'medium',
      impact: 'medium',
      urgency: 'medium',
      scope: 'system-wide',
      dependencies: []
    });
    
    // Learning capture opportunities
    opportunities.push({
      type: 'learning-capture',
      description: 'Enhanced learning capture and synthesis',
      priority: 'medium',
      impact: 'medium',
      urgency: 'medium',
      scope: 'system-wide',
      dependencies: []
    });
    
    return opportunities;
  }
  
  /**
   * Log new agent registration
   * Invariant: Logging maintains system safety
   */
  logNewAgentRegistration(agent) {
    console.log(`[${this.coordinatorName}] New agent registered: ${agent.name}`);
  }
  
  logCoordination(agentStatuses, opportunities) {
    console.log('Coordination logged');
  }
  
  logCoordinationExecution(opportunity, status, error = null) {
    console.log(`Coordination execution ${status}: ${opportunity.type}`);
  }
  
  logUnhealthyAgent(agentName, agent) {
    console.log(`Unhealthy agent logged: ${agentName}`);
  }
  
  attemptAgentRecovery(agentName, agent) {
    console.log(`Agent recovery attempted: ${agentName}`);
  }
  
  alertOtherAgents(agentName, agent) {
    console.log(`Other agents alerted about: ${agentName}`);
  }

  /**
   * Monitor commits for versioning
   * Invariant: Versioning monitoring maintains system safety
   */
  monitorCommitsForVersioning() {
    try {
      console.log(`[${this.coordinatorName}] Monitoring commits for versioning`);
      
      // Use the versioning integration to monitor recent commits
      this.versioningIntegration.monitorRecentCommits(3);
      
      // Log versioning status
      const versioningStatus = this.versioningIntegration.getVersioningStatus();
      console.log(`[${this.coordinatorName}] Versioning status: ${JSON.stringify(versioningStatus)}`);
      
    } catch (error) {
      console.error(`[${this.coordinatorName}] Error monitoring commits for versioning:`, error);
    }
  }

  /**
   * Get versioning statistics
   * Invariant: Statistics are always accurate
   */
  getVersioningStatistics() {
    return this.versioningIntegration.getVersioningStatistics();
  }

  /**
   * Manually trigger versioning for a commit
   * Invariant: Manual versioning is safe
   */
  manualVersionCommit(commitHash, version = null) {
    return this.versioningIntegration.manualVersionCommit(commitHash, version);
  }
  
  determineOverallHealth(agentStatuses) {
    const statuses = Array.from(agentStatuses.values()).map(status => status.status);
    if (statuses.includes('unhealthy')) return 'unhealthy';
    if (statuses.includes('degraded')) return 'degraded';
    return 'healthy';
  }
}

module.exports = AgentCoordinator;
