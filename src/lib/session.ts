/**
 * Session utilities for BrightPath Associates portal.
 * Uses the Web Crypto API (available in Node 18+, Edge Runtime, and browser),
 * so this module works in Next.js middleware, server components, and API routes.
 */

export interface AssociateSession {
  id: number;
  email: string;
  name: string;
  /** Issued-at timestamp (ms) */
  iat: number;
}

const COOKIE_NAME = "bp_associate_session";
/** Max session age: 24 hours in seconds */
const MAX_AGE = 60 * 60 * 24;

// ---------------------------------------------------------------------------
// Crypto helpers
// ---------------------------------------------------------------------------

function getSecret(): string {
  return process.env.SESSION_SECRET ?? "brightpath-dev-secret-2026";
}

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function uint8ToBase64(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64ToUint8(b64: string): Uint8Array<ArrayBuffer> {
  const padded = b64.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Serialize and sign session data into a compact token string. */
export async function signSession(data: AssociateSession): Promise<string> {
  const payload = uint8ToBase64(
    new TextEncoder().encode(JSON.stringify(data))
  );
  const key = await importKey(getSecret());
  const sigBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );
  const sig = uint8ToBase64(new Uint8Array(sigBuffer));
  return `${payload}.${sig}`;
}

/** Verify and deserialize a session token.  Returns null if invalid/tampered. */
export async function verifySession(
  token: string
): Promise<AssociateSession | null> {
  try {
    const dotIndex = token.lastIndexOf(".");
    if (dotIndex === -1) return null;
    const payload = token.slice(0, dotIndex);
    const sig = token.slice(dotIndex + 1);

    const key = await importKey(getSecret());
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      base64ToUint8(sig),
      new TextEncoder().encode(payload)
    );
    if (!valid) return null;

    const data: AssociateSession = JSON.parse(
      new TextDecoder().decode(base64ToUint8(payload))
    );

    // Reject expired sessions
    if (Date.now() - data.iat > MAX_AGE * 1000) return null;

    return data;
  } catch {
    return null;
  }
}

export { COOKIE_NAME, MAX_AGE };
