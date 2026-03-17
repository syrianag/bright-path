// Example Next.js API route demonstrating config usage and variable manipulation
// File: app/api/associates/route.js

const appConfig = require('../../../config/appConfig');

// Simulated function to count associates (replace with real DB logic)
function countAssociates() {
  // Example: fetch count from DB, here hardcoded for demo
  return 7;
}

/**
 * API handler demonstrating use of config variables
 * - Reads MAX_ASSOCIATES from config
 * - Compares with current count
 * - Controls response based on config
 */
export default function handler(req, res) {
  const currentCount = countAssociates();
  const maxAllowed = appConfig.MAX_ASSOCIATES;

  // Example logic: allow adding if under max
  if (currentCount < maxAllowed) {
    res.status(200).json({
      message: `You can add more associates. (${currentCount}/${maxAllowed})`,
      env: appConfig.NODE_ENV,
      port: appConfig.PORT
    });
  } else {
    res.status(403).json({
      error: 'Associate limit reached',
      currentCount,
      maxAllowed
    });
  }
}

// Comments:
// - All config values come from appConfig.js, which reads process.env
// - Works in Docker, CI, and local environments
// - MAX_ASSOCIATES can be set via Docker Compose, .env, or CI secrets
