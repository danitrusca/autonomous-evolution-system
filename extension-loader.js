/**
 * Extension Loader
 * Loads and manages extensions for the autonomous evolution system
 */

const fs = require('fs');
const path = require('path');

class ExtensionLoader {
  constructor() {
    this.extensionsPath = path.join(__dirname, 'extensions');
    this.loadedExtensions = new Map();
    this.extensionConfig = this.loadExtensionConfig();
  }

  /**
   * Load extension configuration
   * Invariant: Extension configuration must be valid
   */
  loadExtensionConfig() {
    const configPath = path.join(__dirname, 'extension-config.json');
    try {
      if (fs.existsSync(configPath)) {
        const data = fs.readFileSync(configPath, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('[extension-loader] Error loading extension config:', error.message);
    }
    
    // Default configuration
    return {
      enabled: [],
      disabled: [],
      autoLoad: false
    };
  }

  /**
   * Save extension configuration
   * Invariant: Extension configuration must be persisted
   */
  saveExtensionConfig() {
    const configPath = path.join(__dirname, 'extension-config.json');
    try {
      fs.writeFileSync(configPath, JSON.stringify(this.extensionConfig, null, 2));
      console.log('[extension-loader] Extension configuration saved');
    } catch (error) {
      console.error('[extension-loader] Error saving extension config:', error.message);
    }
  }

  /**
   * Discover available extensions
   * Invariant: All extensions must be discovered
   */
  discoverExtensions() {
    const extensions = [];
    
    if (!fs.existsSync(this.extensionsPath)) {
      console.log('[extension-loader] No extensions directory found');
      return extensions;
    }
    
    const extensionDirs = fs.readdirSync(this.extensionsPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    extensionDirs.forEach(extensionName => {
      const extensionPath = path.join(this.extensionsPath, extensionName);
      const packagePath = path.join(extensionPath, 'package.json');
      const readmePath = path.join(extensionPath, 'README.md');
      
      const extension = {
        name: extensionName,
        path: extensionPath,
        hasPackage: fs.existsSync(packagePath),
        hasReadme: fs.existsSync(readmePath),
        enabled: this.extensionConfig.enabled.includes(extensionName),
        disabled: this.extensionConfig.disabled.includes(extensionName)
      };
      
      extensions.push(extension);
    });
    
    console.log(`[extension-loader] Discovered ${extensions.length} extensions`);
    return extensions;
  }

  /**
   * Load a specific extension
   * Invariant: Extension must be loaded safely
   */
  async loadExtension(extensionName) {
    try {
      const extensionPath = path.join(this.extensionsPath, extensionName);
      
      // Check if extension exists
      if (!fs.existsSync(extensionPath)) {
        throw new Error(`Extension ${extensionName} not found`);
      }
      
      // Load extension main module
      const mainModulePath = path.join(extensionPath, 'index.js');
      if (fs.existsSync(mainModulePath)) {
        const ExtensionClass = require(mainModulePath);
        const extension = new ExtensionClass();
        
        this.loadedExtensions.set(extensionName, {
          instance: extension,
          path: extensionPath,
          loadedAt: new Date().toISOString(),
          status: 'loaded'
        });
        
        console.log(`[extension-loader] Loaded extension: ${extensionName}`);
        return extension;
      }
      
      // Try to load integration module
      const integrationPath = path.join(extensionPath, 'integration');
      if (fs.existsSync(integrationPath)) {
        const integrationFiles = fs.readdirSync(integrationPath)
          .filter(file => file.endsWith('.js'));
        
        if (integrationFiles.length > 0) {
          const integrationFile = integrationFiles[0];
          const IntegrationClass = require(path.join(integrationPath, integrationFile));
          const extension = new IntegrationClass();
          
          this.loadedExtensions.set(extensionName, {
            instance: extension,
            path: extensionPath,
            loadedAt: new Date().toISOString(),
            status: 'loaded'
          });
          
          console.log(`[extension-loader] Loaded extension: ${extensionName} (integration)`);
          return extension;
        }
      }
      
      throw new Error(`No main module found for extension ${extensionName}`);
      
    } catch (error) {
      console.error(`[extension-loader] Error loading extension ${extensionName}:`, error.message);
      this.loadedExtensions.set(extensionName, {
        instance: null,
        path: path.join(this.extensionsPath, extensionName),
        loadedAt: new Date().toISOString(),
        status: 'error',
        error: error.message
      });
      throw error;
    }
  }

  /**
   * Unload a specific extension
   * Invariant: Extension must be unloaded safely
   */
  unloadExtension(extensionName) {
    if (this.loadedExtensions.has(extensionName)) {
      const extension = this.loadedExtensions.get(extensionName);
      
      // Call cleanup if available
      if (extension.instance && typeof extension.instance.cleanup === 'function') {
        try {
          extension.instance.cleanup();
        } catch (error) {
          console.error(`[extension-loader] Error cleaning up extension ${extensionName}:`, error.message);
        }
      }
      
      this.loadedExtensions.delete(extensionName);
      console.log(`[extension-loader] Unloaded extension: ${extensionName}`);
    }
  }

  /**
   * Load all enabled extensions
   * Invariant: All enabled extensions must be loaded
   */
  async loadEnabledExtensions() {
    const extensions = this.discoverExtensions();
    const enabledExtensions = extensions.filter(ext => ext.enabled);
    
    console.log(`[extension-loader] Loading ${enabledExtensions.length} enabled extensions`);
    
    for (const extension of enabledExtensions) {
      try {
        await this.loadExtension(extension.name);
      } catch (error) {
        console.error(`[extension-loader] Failed to load extension ${extension.name}:`, error.message);
      }
    }
    
    return this.loadedExtensions;
  }

  /**
   * Enable an extension
   * Invariant: Extension must be enabled safely
   */
  enableExtension(extensionName) {
    if (!this.extensionConfig.enabled.includes(extensionName)) {
      this.extensionConfig.enabled.push(extensionName);
    }
    
    if (this.extensionConfig.disabled.includes(extensionName)) {
      this.extensionConfig.disabled = this.extensionConfig.disabled.filter(name => name !== extensionName);
    }
    
    this.saveExtensionConfig();
    console.log(`[extension-loader] Enabled extension: ${extensionName}`);
  }

  /**
   * Disable an extension
   * Invariant: Extension must be disabled safely
   */
  disableExtension(extensionName) {
    if (this.extensionConfig.enabled.includes(extensionName)) {
      this.extensionConfig.enabled = this.extensionConfig.enabled.filter(name => name !== extensionName);
    }
    
    if (!this.extensionConfig.disabled.includes(extensionName)) {
      this.extensionConfig.disabled.push(extensionName);
    }
    
    // Unload if currently loaded
    this.unloadExtension(extensionName);
    
    this.saveExtensionConfig();
    console.log(`[extension-loader] Disabled extension: ${extensionName}`);
  }

  /**
   * Get loaded extensions
   * Invariant: Extension status must be accurate
   */
  getLoadedExtensions() {
    const extensions = [];
    
    this.loadedExtensions.forEach((extension, name) => {
      extensions.push({
        name,
        path: extension.path,
        loadedAt: extension.loadedAt,
        status: extension.status,
        error: extension.error
      });
    });
    
    return extensions;
  }

  /**
   * Get extension status
   * Invariant: Extension status must be comprehensive
   */
  getExtensionStatus() {
    const discovered = this.discoverExtensions();
    const loaded = this.getLoadedExtensions();
    
    return {
      total: discovered.length,
      enabled: discovered.filter(ext => ext.enabled).length,
      disabled: discovered.filter(ext => ext.disabled).length,
      loaded: loaded.length,
      errors: loaded.filter(ext => ext.status === 'error').length,
      extensions: discovered.map(ext => ({
        name: ext.name,
        enabled: ext.enabled,
        disabled: ext.disabled,
        loaded: loaded.some(loadedExt => loadedExt.name === ext.name),
        hasPackage: ext.hasPackage,
        hasReadme: ext.hasReadme
      }))
    };
  }

  /**
   * Initialize extensions
   * Invariant: Extensions must be initialized safely
   */
  async initializeExtensions() {
    console.log('[extension-loader] Initializing extensions...');
    
    try {
      await this.loadEnabledExtensions();
      
      // Initialize each loaded extension
      this.loadedExtensions.forEach((extension, name) => {
        if (extension.instance && typeof extension.instance.initialize === 'function') {
          try {
            extension.instance.initialize();
            console.log(`[extension-loader] Initialized extension: ${name}`);
          } catch (error) {
            console.error(`[extension-loader] Error initializing extension ${name}:`, error.message);
          }
        }
      });
      
      console.log(`[extension-loader] Extensions initialized: ${this.loadedExtensions.size} loaded`);
      
    } catch (error) {
      console.error('[extension-loader] Error initializing extensions:', error.message);
      throw error;
    }
  }

  /**
   * Cleanup extensions
   * Invariant: Extensions must be cleaned up safely
   */
  async cleanupExtensions() {
    console.log('[extension-loader] Cleaning up extensions...');
    
    this.loadedExtensions.forEach((extension, name) => {
      if (extension.instance && typeof extension.instance.cleanup === 'function') {
        try {
          extension.instance.cleanup();
          console.log(`[extension-loader] Cleaned up extension: ${name}`);
        } catch (error) {
          console.error(`[extension-loader] Error cleaning up extension ${name}:`, error.message);
        }
      }
    });
    
    this.loadedExtensions.clear();
    console.log('[extension-loader] Extensions cleanup completed');
  }
}

module.exports = ExtensionLoader;
