import { NextRequest, NextResponse } from "next/server";
import { verifySession, COOKIE_NAME } from "@/lib/session";

/**
 * Auth guard for the /associates/** routes.
 * Unauthenticated requests are redirected to /associates/login.
 * The login page itself is always accessible.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect the associates section
  if (!pathname.startsWith("/associates")) {
    return NextResponse.next();
  }

  // Allow the login page through regardless
  if (pathname === "/associates/login") {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(COOKIE_NAME);

  if (!cookie?.value) {
    const loginUrl = new URL("/associates/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const session = await verifySession(cookie.value);
  if (!session) {
    const loginUrl = new URL("/associates/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/associates/:path*"],
};
