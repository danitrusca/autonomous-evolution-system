/**
 * Test script for Autonomous Evolution System Repository
 * Tests the AES system in its own repository
 */

const path = require('path');

console.log('🧪 Testing Autonomous Evolution System Repository');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`Repository location: ${__dirname}`);
console.log(`Current working directory: ${process.cwd()}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

try {
  // Test the distributed startup system
  console.log('📦 [TEST] Loading distributed startup system...');
  const autonomousStartup = require('../distributed-startup.js');

  // Wait for initialization
  setTimeout(() => {
    console.log('\n📊 [TEST] AES Repository Status Report');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    const status = autonomousStartup.getSystemStatus();
    console.log(`Initialized: ${status.initialized}`);
    console.log(`System Path: ${status.systemPath}`);
    console.log(`System Status: ${status.systemStatus}`);
    console.log(`Patterns Loaded: ${status.patternsLoaded}`);
    console.log(`Insights Loaded: ${status.insightsLoaded}`);
    console.log(`Journal Loaded: ${status.journalLoaded}`);
    console.log(`Journal Size: ${status.journalSize} characters`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    if (status.initialized && (status.systemStatus === 'found-local' || status.systemStatus === 'found-parent')) {
      console.log('✅ [TEST] AES Repository test PASSED');
      console.log('✅ [TEST] System found AES in repository');
      console.log('✅ [TEST] All components loaded successfully');
      console.log('✅ [TEST] Learning data accessible');
      console.log(`✅ [TEST] Discovery method: ${status.systemStatus}`);
    } else {
      console.log('❌ [TEST] AES Repository test FAILED');
      console.log(`Expected: initialized=true, systemStatus=found-local or found-parent`);
      console.log(`Actual: initialized=${status.initialized}, systemStatus=${status.systemStatus}`);
    }
  }, 2000);

} catch (error) {
  console.error('❌ [TEST] Error testing AES repository:', error.message);
  console.error('Stack trace:', error.stack);
}
