import { NextRequest, NextResponse } from "next/server";
import { signSession, COOKIE_NAME, MAX_AGE } from "@/lib/session";

/**
 * Demo account list.
 *
 * PRODUCTION NOTE: Replace this with a database lookup and bcrypt password
 * verification. Never store plain-text passwords in production code.
 */
const DEMO_ACCOUNTS = [
  { id: 1, email: "demo@brightpath.com", password: "brightpath2026", name: "Demo Associate" },
  { id: 2, email: "alex@brightpath.com", password: "learn2026", name: "Alex Johnson" },
  { id: 3, email: "sam@brightpath.com", password: "learn2026", name: "Sam Williams" },
] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { email?: string; password?: string };
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const account = DEMO_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    );

    if (!account) {
      // Intentionally vague to prevent user enumeration
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const token = await signSession({
      id: account.id,
      email: account.email,
      name: account.name,
      iat: Date.now(),
    });

    const response = NextResponse.json({
      success: true,
      name: account.name,
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: MAX_AGE,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
