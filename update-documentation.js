/**
 * Update Documentation Script
 * Automatically updates all related documentation after system implementation
 */

const DocumentationUpdater = require('./agents/documentation-updater');

async function updateDocumentation() {
  console.log('📚 Starting automatic documentation update...\n');
  
  try {
    const updater = new DocumentationUpdater();
    
    // Update documentation for the psychological system
    await updater.updateDocumentation(
      'PSYCHOLOGICAL_SYSTEM_SUMMARY.md',
      'psychological-system',
      '1.0.0'
    );
    
    console.log('\n✅ Documentation update completed successfully!');
    console.log('\nUpdated files:');
    console.log('- docs/implemented/PSYCHOLOGICAL_SYSTEM_IMPLEMENTATION_SUMMARY.md');
    console.log('- docs/README.md');
    console.log('- docs/NAVIGATION.md');
    console.log('- docs/living/EVOLUTION_JOURNAL.md');
    console.log('- docs/reference/API_REFERENCE.md');
    console.log('- docs/reference/CONFIGURATION_GUIDE.md');
    
    // Show update history
    const history = updater.getUpdateHistory();
    console.log(`\n📊 Total updates: ${history.length}`);
    
  } catch (error) {
    console.error('❌ Documentation update failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  updateDocumentation();
}

module.exports = updateDocumentation;
