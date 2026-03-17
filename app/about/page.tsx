import { BookOpen, Home, Info, Activity, KeyRound } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-200">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-extrabold text-gray-900">BrightPath</p>
              <p className="text-xs font-medium text-gray-400">Support Center</p>
            </div>
          </Link>

          <nav className="flex items-center gap-1 rounded-2xl bg-gray-100 p-1">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm"
            >
              <Info className="h-4 w-4" />
              About
            </Link>
            <Link
              href="/status"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
            >
              <Activity className="h-4 w-4" />
              System Status
            </Link>
            <Link
              href="/troubleshoot"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
            >
              <KeyRound className="h-4 w-4" />
              Troubleshoot
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-24 text-center px-6">
        <span className="inline-block mb-6 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-600">
          About BrightPath
        </span>
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          Empowering Associates<br />to Excel in Math &amp; Science
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-500 leading-relaxed">
          BrightPath Tutoring is dedicated to helping middle and high school Associates build
          confidence and achieve success in mathematics and science through our innovative
          online learning platform.
        </p>
      </section>

      {/* What is BrightPath */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="flex items-start gap-10">
          <div className="shrink-0">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-xl shadow-blue-200">
              <BookOpen className="h-12 w-12" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">What is BrightPath?</h2>
            <p className="text-gray-500 text-base leading-relaxed">
              BrightPath Tutoring is an educational company that specializes in helping middle school and high school
              Associates (students) master challenging subjects like mathematics and science. Our comprehensive
              online platform provides a structured learning environment where Associates can log in, access video
              tutorials, complete interactive quizzes, and monitor their academic progress—all from the comfort of
              their home.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
