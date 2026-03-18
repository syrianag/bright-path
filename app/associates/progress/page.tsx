"use client";

import { useEffect, useState } from "react";
import { BarChart2, Trophy, Clock, CalendarDays, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import type { QuizAttempt } from "../quiz/[quizId]/page";

const STORAGE_KEY = "bp_quiz_attempts";

function loadAttempts(): QuizAttempt[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as QuizAttempt[]) : [];
  } catch {
    return [];
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function scoreColor(pct: number): string {
  if (pct >= 80) return "text-emerald-600";
  if (pct >= 60) return "text-amber-600";
  return "text-red-500";
}

function scoreBg(pct: number): string {
  if (pct >= 80) return "bg-emerald-50 border-emerald-200";
  if (pct >= 60) return "bg-amber-50 border-amber-200";
  return "bg-red-50 border-red-200";
}

export default function ProgressPage() {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setAttempts(loadAttempts());
    setMounted(true);
  }, []);

  // ── Aggregate stats ────────────────────────────────────────────────────────
  const totalAttempts = attempts.length;
  const avgScore =
    totalAttempts > 0
      ? Math.round(attempts.reduce((s, a) => s + a.percentage, 0) / totalAttempts)
      : 0;
  const bestScore =
    totalAttempts > 0 ? Math.max(...attempts.map((a) => a.percentage)) : 0;

  // Unique quizzes attempted
  const uniqueQuizzes = new Set(attempts.map((a) => a.quizId)).size;

  // ── Loading skeleton ───────────────────────────────────────────────────────
  if (!mounted) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-48 bg-gray-200 rounded-xl" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 rounded-2xl bg-gray-100" />
          ))}
        </div>
        <div className="h-64 rounded-2xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Your Progress</h1>
        <p className="text-gray-500">
          Every quiz attempt is tracked here. Keep going to improve your scores!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          icon={<BarChart2 className="h-5 w-5 text-blue-600" />}
          label="Attempts"
          value={String(totalAttempts)}
          bg="bg-blue-50"
        />
        <StatCard
          icon={<BookOpen className="h-5 w-5 text-violet-600" />}
          label="Unique quizzes"
          value={String(uniqueQuizzes)}
          bg="bg-violet-50"
        />
        <StatCard
          icon={<Trophy className="h-5 w-5 text-amber-500" />}
          label="Best score"
          value={totalAttempts > 0 ? `${bestScore}%` : "—"}
          bg="bg-amber-50"
        />
        <StatCard
          icon={<Clock className="h-5 w-5 text-emerald-600" />}
          label="Avg. score"
          value={totalAttempts > 0 ? `${avgScore}%` : "—"}
          bg="bg-emerald-50"
        />
      </div>

      {/* Attempts list */}
      {totalAttempts === 0 ? (
        <EmptyState />
      ) : (
        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-4">Attempt History</h2>
          <div className="space-y-3">
            {attempts.map((attempt, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 rounded-2xl border px-5 py-4 ${scoreBg(attempt.percentage)}`}
              >
                {/* Score circle */}
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ${scoreColor(attempt.percentage)}`}
                >
                  <span className="text-base font-extrabold">{attempt.percentage}%</span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{attempt.quizTitle}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {attempt.subject} &middot; {attempt.score}/{attempt.total} correct
                  </p>
                </div>

                {/* Date */}
                <div className="hidden sm:flex flex-col items-end text-right shrink-0">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {formatDate(attempt.completedAt)}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{formatTime(attempt.completedAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="flex justify-center pt-2">
        <Link
          href="/associates/quiz"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-200 hover:bg-blue-700 transition"
        >
          Take a quiz
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatCard({
  icon,
  label,
  value,
  bg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  bg: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-2 rounded-2xl ${bg} border border-white px-4 py-5 text-center`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
        {icon}
      </div>
      <p className="text-2xl font-extrabold text-gray-900">{value}</p>
      <p className="text-xs font-medium text-gray-500">{label}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white border border-dashed border-gray-200 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gray-100 mb-5">
        <BarChart2 className="h-8 w-8 text-gray-400" />
      </div>
      <p className="text-lg font-bold text-gray-700 mb-2">No attempts yet</p>
      <p className="text-sm text-gray-400 mb-6 max-w-xs">
        Complete your first quiz and your scores will appear here automatically.
      </p>
      <Link
        href="/associates/quiz"
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 hover:bg-blue-700 transition"
      >
        Browse quizzes <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
