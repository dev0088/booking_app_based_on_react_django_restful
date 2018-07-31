const devMode = (process.env.NODE_ENV !== 'development');

export default {
  // App Details
  appName: 'BrightEyes',
  // Build Configuration - eg. Debug or Release?
  DEV: devMode,
  assetServer: 'http://localhost:8000'
};
