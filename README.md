# Autonomous Evolution System - Self-Learning AI Development Partner

System that transforms AI assistants from reactive tools into proactive, self-learning, continuously evolving development partners. Features autonomous versioning, evidence-based principles, living documentation, and cross-session learning capabilities.

## Key Features
- True Autonomy - Operates without manual intervention
- Cross-Session Learning - Knowledge persists across AI sessions
- Pattern Recognition - Success patterns automatically replicated
- Living Documentation - Self-maintaining evolution journal
- Meta-Learning - Learns how to learn more effectively
- Autonomous Versioning - Automatic semantic versioning system
- Principles Library - Evidence-based decision making framework

## Architecture
- Rules Layer - ECP (Epistemic Coding Protocol) principles and quality gates
- Skills Layer - Autonomous capabilities and workflows
- Agents Layer - Coordinated execution and monitoring
- Utilities Layer - Optional utility modules (token optimization, budget guard, etc.)

## Standalone Modules

The system includes optional standalone modules that can be used independently or integrated:

### Token Optimizer (`standalone_modules/token_saver`)
- **Purpose**: Reduce token usage by 10-90% for AI processing
- **Standalone**: Works as independent CLI tool
- **Integrated**: Automatically available to agents when built
- **Features**: JSON minification, text optimization, diff generation
- **See**: `standalone_modules/token_saver/INTEGRATION.md` for details

To enable token optimization:
```bash
cd standalone_modules/token_saver
npm install && npm run build
```

The system will automatically detect and use it when available.
