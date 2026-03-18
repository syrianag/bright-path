import { ArrowRight, BookOpen, FlaskConical, Clock } from "lucide-react";
import Link from "next/link";
import { quizzes, Quiz } from "@/lib/quiz-data";

const DIFFICULTY_COLORS: Record<Quiz["difficulty"], string> = {
  Easy: "bg-emerald-100 text-emerald-700",
  Medium: "bg-amber-100 text-amber-700",
  Hard: "bg-red-100 text-red-700",
};

export default function QuizListPage() {
  const mathQuizzes = quizzes.filter((q) => q.subject === "Math");
  const scienceQuizzes = quizzes.filter((q) => q.subject === "Science");

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Quizzes</h1>
        <p className="text-gray-500">
          Choose a quiz below. Each question shows an explanation after you answer, so every
          attempt is a learning opportunity.
        </p>
      </div>

      {/* Math section */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <BookOpen className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-900">Mathematics</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {mathQuizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </section>

      {/* Science section */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <FlaskConical className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-900">Science</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {scienceQuizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </section>
    </div>
  );
}

function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <Link
      href={`/associates/quiz/${quiz.id}`}
      className="group flex flex-col rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 p-6 transition-all"
    >
      {/* Subject badge + difficulty */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${
            quiz.subject === "Math"
              ? "bg-blue-100 text-blue-700"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {quiz.subject}
        </span>
        <span
          className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${DIFFICULTY_COLORS[quiz.difficulty]}`}
        >
          {quiz.difficulty}
        </span>
      </div>

      <h3 className="text-lg font-extrabold text-gray-900 mb-2">{quiz.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed flex-1">{quiz.description}</p>

      {/* Meta */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Clock className="h-3.5 w-3.5" />
          <span>{quiz.questions.length} questions</span>
        </div>
        <span className="flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
          Start <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
