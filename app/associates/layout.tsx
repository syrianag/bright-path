import { cookies } from "next/headers";
import { BookOpen, LayoutDashboard, ClipboardList, BarChart2 } from "lucide-react";
import Link from "next/link";
import { verifySession, COOKIE_NAME } from "@/lib/session";
import LogoutButton from "../../src/components/LogoutButton";

export default async function AssociatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read session to display user's name in the nav.
  // Middleware already guarantees a valid cookie exists for every route
  // under /associates except /associates/login.
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value ?? "";
  const session = token ? await verifySession(token) : null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-blue-100">
      {/* Top nav */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          {/* Brand */}
          <Link href="/associates/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-200">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-extrabold text-gray-900">BrightPath</p>
              <p className="text-xs font-medium text-gray-400">Associates Portal</p>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="flex items-center gap-1 rounded-2xl bg-gray-100 p-1">
            <Link
              href="/associates/dashboard"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-800 hover:bg-white transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/associates/quiz"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-800 hover:bg-white transition-colors"
            >
              <ClipboardList className="h-4 w-4" />
              Quizzes
            </Link>
            <Link
              href="/associates/progress"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-800 hover:bg-white transition-colors"
            >
              <BarChart2 className="h-4 w-4" />
              Progress
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {session && (
              <span className="hidden sm:block text-sm font-medium text-gray-600">
                👋 {session.name}
              </span>
            )}
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-10">{children}</main>

      <footer className="py-5 text-center text-xs text-gray-400">
        © 2026 BrightPath Tutoring — Associates Portal
      </footer>
    </div>
  );
}
