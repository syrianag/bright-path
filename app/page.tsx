import { BookOpen, Home, Info, Activity, KeyRound, ArrowRight, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-blue-100">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-200">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-gray-900">BrightPath</p>
              <p className="text-xs font-medium text-gray-400">Support Center</p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex items-center gap-1 rounded-2xl bg-gray-100 p-1">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 shadow-sm"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
            >
              <Info className="h-4 w-4" />
              About
            </Link>
            <Link
              href="/status"
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
            >
              <Activity className="h-4 w-4" />
              System Status
            </Link>
            <Link
              href="/troubleshoot"
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
            >
              <KeyRound className="h-4 w-4" />
              Troubleshoot
            </Link>
            <Link
              href="/associates/login"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              <GraduationCap className="h-4 w-4" />
              Associates
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-col items-center justify-center px-6 py-36 text-center">
        {/* Icon */}
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-2xl shadow-blue-300 mb-10">
          <BookOpen className="h-12 w-12" />
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          BrightPath Support Center
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-lg text-gray-500 mb-12 leading-relaxed">
          Need help with our tutoring platform? Check system status, troubleshoot issues, or
          learn more about how BrightPath helps middle and high school Associates excel in
          math and science.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/status"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors"
          >
            <Activity className="h-4 w-4" />
            System Status
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/troubleshoot"
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <KeyRound className="h-4 w-4" />
            Troubleshoot
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/associates/login"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors"
          >
            <GraduationCap className="h-4 w-4" />
            Associates Portal
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
