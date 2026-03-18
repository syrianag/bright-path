"use client";

import { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { getQuizById, Quiz, Question } from "@/lib/quiz-data";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface QuizAttempt {
  quizId: string;
  quizTitle: string;
  subject: string;
  score: number;
  total: number;
  percentage: number;
  completedAt: string;
}

const STORAGE_KEY = "bp_quiz_attempts";

function saveAttempt(attempt: QuizAttempt) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const existing: QuizAttempt[] = raw ? (JSON.parse(raw) as QuizAttempt[]) : [];
    existing.unshift(attempt); // newest first
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // localStorage unavailable (SSR / private mode) — silently ignore
  }
}

// ---------------------------------------------------------------------------
// States
// ---------------------------------------------------------------------------

type Stage = "question" | "explanation" | "results";

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function QuizEnginePage() {
  const { quizId } = useParams<{ quizId: string }>();
  const router = useRouter();

  const quiz: Quiz | undefined = getQuizById(quizId);

  const [stage, setStage] = useState<Stage>("question");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const reset = useCallback(() => {
    setStage("question");
    setCurrentIndex(0);
    setSelectedIndex(null);
    setCorrectCount(0);
  }, []);

  // ── Guard ─────────────────────────────────────────────────────────────────
  if (!quiz) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-xl font-bold text-gray-900 mb-4">Quiz not found.</p>
        <Link
          href="/associates/quiz"
          className="text-sm text-blue-600 hover:underline font-semibold"
        >
          ← Browse all quizzes
        </Link>
      </div>
    );
  }

  const question: Question = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentIndex + (stage === "results" ? 1 : 0)) / totalQuestions) * 100;

  // ── Handlers ──────────────────────────────────────────────────────────────
  function handleSelect(index: number) {
    if (stage !== "question") return;
    setSelectedIndex(index);
    if (index === question.correctIndex) {
      setCorrectCount((c) => c + 1);
    }
    setStage("explanation");
  }

  function handleNext() {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setStage("question");
    } else {
      const attempt: QuizAttempt = {
        quizId: quiz.id,
        quizTitle: quiz.title,
        subject: quiz.subject,
        score: correctCount,
        total: totalQuestions,
        percentage: Math.round((correctCount / totalQuestions) * 100),
        completedAt: new Date().toISOString(),
      };
      saveAttempt(attempt);
      setStage("results");
    }
  }

  // ── Results screen ────────────────────────────────────────────────────────
  if (stage === "results") {
    const pct = Math.round((correctCount / totalQuestions) * 100);
    const passed = pct >= 60;
    return (
      <div className="flex flex-col items-center py-10 text-center space-y-6 max-w-md mx-auto">
        <div
          className={`flex h-24 w-24 items-center justify-center rounded-3xl shadow-xl mb-2 ${
            passed
              ? "bg-emerald-500 text-white shadow-emerald-200"
              : "bg-amber-500 text-white shadow-amber-200"
          }`}
        >
          <Trophy className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">
          {passed ? "Great job! 🎉" : "Keep practising!"}
        </h1>
        <p className="text-gray-500">
          You scored{" "}
          <span className="font-bold text-gray-900">
            {correctCount} / {totalQuestions}
          </span>{" "}
          ({pct}%) on <span className="font-semibold">{quiz.title}</span>.
        </p>

        {/* Score bar */}
        <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              passed ? "bg-emerald-500" : "bg-amber-500"
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center pt-2">
          <button
            onClick={reset}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition"
          >
            <RotateCcw className="h-4 w-4" />
            Retry quiz
          </button>
          <Link
            href="/associates/quiz"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 hover:bg-blue-700 transition"
          >
            Browse quizzes
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/associates/progress"
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-200 hover:bg-emerald-700 transition"
          >
            View progress
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  // ── Question / Explanation screen ─────────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Quizzes
        </button>
        <span>/</span>
        <span className="font-semibold text-gray-900">{quiz.title}</span>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span>{correctCount} correct so far</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        {/* Title + difficulty */}
        <div className="flex items-center gap-2 mb-5">
          <span className="rounded-full bg-blue-100 px-3 py-0.5 text-xs font-semibold text-blue-700">
            {quiz.subject}
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-0.5 text-xs font-semibold text-gray-500">
            {quiz.difficulty}
          </span>
        </div>

        <p className="text-lg font-bold text-gray-900 mb-6 leading-snug">
          {question.question}
        </p>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, idx) => {
            let style =
              "flex items-center gap-4 rounded-xl border px-5 py-3.5 cursor-pointer transition-all text-sm font-medium";

            if (stage === "question") {
              style +=
                " border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50 text-gray-800";
            } else {
              // Explanation stage — colour-code
              if (idx === question.correctIndex) {
                style += " border-emerald-300 bg-emerald-50 text-emerald-800";
              } else if (idx === selectedIndex && idx !== question.correctIndex) {
                style += " border-red-200 bg-red-50 text-red-700";
              } else {
                style += " border-gray-100 bg-gray-50 text-gray-400 cursor-default";
              }
            }

            return (
              <button
                key={idx}
                className={style}
                onClick={() => handleSelect(idx)}
                disabled={stage !== "question"}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 text-left">{option}</span>
                {stage === "explanation" && idx === question.correctIndex && (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                )}
                {stage === "explanation" &&
                  idx === selectedIndex &&
                  idx !== question.correctIndex && (
                    <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                  )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {stage === "explanation" && (
          <div className="mt-6 rounded-2xl bg-gray-50 border border-gray-200 p-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Explanation
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">{question.explanation}</p>
          </div>
        )}

        {/* Next button */}
        {stage === "explanation" && (
          <button
            onClick={handleNext}
            className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-md shadow-blue-200 hover:bg-blue-700 active:bg-blue-800 transition"
          >
            {currentIndex + 1 < totalQuestions ? (
              <>
                Next question <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              <>
                See results <Trophy className="h-4 w-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
