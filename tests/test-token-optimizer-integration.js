/**
 * Test Token Optimizer Integration
 * 
 * Verifies that token_saver integration works correctly while maintaining
 * standalone functionality.
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Token Optimizer Integration\n');
console.log('='.repeat(60));

// Test 1: Standalone CLI functionality
console.log('\n📋 Test 1: Standalone CLI Functionality');
console.log('-'.repeat(60));
try {
  const tokenSaverBin = path.join(__dirname, 'standalone_modules', 'token_saver', 'bin', 'token-saver.js');
  if (fs.existsSync(tokenSaverBin)) {
    console.log('✅ CLI binary exists:', tokenSaverBin);
  } else {
    console.log('❌ CLI binary not found');
  }
} catch (error) {
  console.log('❌ Error checking CLI:', error.message);
}

// Test 2: Integration module exists
console.log('\n📋 Test 2: Integration Module');
console.log('-'.repeat(60));
try {
  const integrationPath = path.join(__dirname, 'standalone_modules', 'token_saver', 'integration', 'token-optimizer-integration.cjs');
  if (fs.existsSync(integrationPath)) {
    console.log('✅ Integration module exists:', integrationPath);
  } else {
    console.log('❌ Integration module not found');
  }
} catch (error) {
  console.log('❌ Error checking integration module:', error.message);
}

// Test 3: Utility module exists
console.log('\n📋 Test 3: Utility Module');
console.log('-'.repeat(60));
try {
  const utilityPath = path.join(__dirname, 'utils', 'token-optimizer.js');
  if (fs.existsSync(utilityPath)) {
    console.log('✅ Utility module exists:', utilityPath);
  } else {
    console.log('❌ Utility module not found');
  }
} catch (error) {
  console.log('❌ Error checking utility module:', error.message);
}

// Test 4: Load integration module
console.log('\n📋 Test 4: Load Integration Module');
console.log('-'.repeat(60));
try {
  const TokenOptimizerIntegration = require('../standalone_modules/token_saver/integration/token-optimizer-integration.cjs');
  const integration = new TokenOptimizerIntegration();
  console.log('✅ Integration module loaded successfully');
  console.log('   Status:', integration.getStatus());
} catch (error) {
  console.log('❌ Error loading integration module:', error.message);
}

// Test 5: Load utility module
console.log('\n📋 Test 5: Load Utility Module');
console.log('-'.repeat(60));
try {
  const { getTokenOptimizer } = require('../utils/token-optimizer.js');
  const optimizer = getTokenOptimizer();
  console.log('✅ Utility module loaded successfully');
  console.log('   Status:', optimizer.getStatus());
} catch (error) {
  console.log('❌ Error loading utility module:', error.message);
}

// Test 6: Initialize token optimizer (async)
console.log('\n📋 Test 6: Initialize Token Optimizer');
console.log('-'.repeat(60));
(async () => {
  try {
    const { getTokenOptimizer } = require('../utils/token-optimizer.js');
    const optimizer = getTokenOptimizer();
    await optimizer.initialize();
    const status = optimizer.getStatus();
    console.log('✅ Token optimizer initialized');
    console.log('   Available:', status.available ? 'Yes' : 'No');
    console.log('   Initialized:', status.initialized ? 'Yes' : 'No');

    if (!status.available) {
      console.log('   ℹ️  Token saver not built - this is OK, system will work without it');
    }
  } catch (error) {
    console.log('❌ Error initializing token optimizer:', error.message);
  }

  // Test 7: Test optimization functions (if available)
  console.log('\n📋 Test 7: Test Optimization Functions');
  console.log('-'.repeat(60));
  try {
    const { getTokenOptimizer } = require('../utils/token-optimizer.js');
    const optimizer = getTokenOptimizer();

    const testText = 'This is basically a very simple test that contains actually quite verbose language in fact.';
    const result = optimizer.optimizeText(testText, { preset: 'conservative' });

    console.log('✅ Optimization function called successfully');
    console.log('   Original tokens:', result.originalTokens);
    console.log('   Optimized tokens:', result.optimizedTokens);
    console.log('   Savings:', result.savingsPercent.toFixed(1) + '%');
    console.log('   Available:', result.available ? 'Yes' : 'No (using fallback)');
  } catch (error) {
    console.log('❌ Error testing optimization:', error.message);
  }

  // Test 8: Test token estimation
  console.log('\n📋 Test 8: Test Token Estimation');
  console.log('-'.repeat(60));
  try {
    const { getTokenOptimizer } = require('../utils/token-optimizer.js');
    const optimizer = getTokenOptimizer();

    const testText = 'Hello, this is a test string for token estimation.';
    const tokens = optimizer.estimateTokens(testText);

    console.log('✅ Token estimation works');
    console.log('   Text length:', testText.length, 'characters');
    console.log('   Estimated tokens:', tokens);
  } catch (error) {
    console.log('❌ Error testing token estimation:', error.message);
  }

  // Test 9: System Integration Check
  console.log('\n📋 Test 9: System Integration Check');
  console.log('-'.repeat(60));
  try {
    // Check if distributed-startup.js has integration
    const startupPath = path.join(__dirname, 'distributed-startup.js');
    const startupContent = fs.readFileSync(startupPath, 'utf8');

    if (startupContent.includes('tokenOptimizer')) {
      console.log('✅ Token optimizer integrated in distributed-startup.js');
    } else {
      console.log('⚠️  Token optimizer not found in distributed-startup.js');
    }

    // Check if system-integrity-agent.js has integration
    const agentPath = path.join(__dirname, 'agents', 'system-integrity-agent.js');
    const agentContent = fs.readFileSync(agentPath, 'utf8');

    if (agentContent.includes('tokenOptimizer')) {
      console.log('✅ Token optimizer integrated in system-integrity-agent.js');
    } else {
      console.log('⚠️  Token optimizer not found in system-integrity-agent.js');
    }
  } catch (error) {
    console.log('❌ Error checking system integration:', error.message);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Integration tests completed!\n');
})();

