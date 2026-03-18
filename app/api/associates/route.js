/**
 * App Router API route: /api/associates
 *
 * GET  — returns current associate count vs. the configured maximum.
 *
 * Config values come from appConfig.js which reads process.env.
 * Works in Docker, CI, and local environments.
 * MAX_ASSOCIATES can be set via Docker Compose, .env, or CI secrets.
 */
import { NextResponse } from 'next/server';
import appConfig from '../../../config/appConfig.js';

/** Replace with a real database query in production. */
function countAssociates() {
  return 7;
}

export async function GET() {
  const currentCount = countAssociates();
  const maxAllowed = appConfig.MAX_ASSOCIATES;

  if (currentCount < maxAllowed) {
    return NextResponse.json(
      {
        message: `You can add more associates. (${currentCount}/${maxAllowed})`,
        env: appConfig.NODE_ENV,
        port: appConfig.PORT,
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { error: 'Associate limit reached', currentCount, maxAllowed },
    { status: 403 }
  );
}
