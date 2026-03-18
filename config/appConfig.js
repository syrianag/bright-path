// config/appConfig.js
// Centralized configuration module for BrightPath Tutoring
// Reads environment variables and exports a structured config object

const appConfig = {
  PORT: process.env.PORT || 3000, // Default to 3000 if not set
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || '', // Should be set in env or CI
  MAX_ASSOCIATES: parseInt(process.env.MAX_ASSOCIATES, 10) || 10 // Default to 10
};

export default appConfig;
