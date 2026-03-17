import { BookOpen, Activity, KeyRound } from "lucide-react";
import Link from "next/link";
import TroubleshootTool from "../../src/components/TroubleshootTool";

export default function TroubleshootPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f1f5f9" }}>
      {/* Navbar */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-200">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-extrabold text-gray-900">BrightPath</p>
              <p className="text-xs font-medium text-gray-400">Support Center</p>
            </div>
          </Link>

          {/* Nav tabs */}
          <nav className="flex items-center gap-1 rounded-2xl bg-gray-100 p-1">
            <Link
              href="/status"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
            >
              <Activity className="h-4 w-4" />
              System Status
            </Link>
            <Link
              href="/troubleshoot"
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm"
            >
              <KeyRound className="h-4 w-4" />
              Troubleshoot
            </Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 mx-auto w-full max-w-2xl px-4 py-10">
        <TroubleshootTool />
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-400">
        © 2026 BrightPath Tutoring — Support Center
      </footer>
    </div>
  );
}
