import { cookies } from "next/headers";
import { ClipboardList, BarChart2, BookOpen, ArrowRight, Trophy } from "lucide-react";
import Link from "next/link";
import { verifySession, COOKIE_NAME } from "@/lib/session";
import { quizzes } from "@/lib/quiz-data";

export default async function AssociatesDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value ?? "";
  const session = token ? await verifySession(token) : null;

  const totalQuizzes = quizzes.length;
  const mathQuizzes = quizzes.filter((q) => q.subject === "Math").length;
  const scienceQuizzes = quizzes.filter((q) => q.subject === "Science").length;

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-10 text-white shadow-xl shadow-blue-200">
        <p className="text-sm font-semibold tracking-wide uppercase text-blue-100 mb-2">
          Welcome back
        </p>
        <h1 className="text-3xl font-extrabold mb-3">
          {session ? session.name : "Associate"} 👋
        </h1>
        <p className="text-blue-100 max-w-md leading-relaxed">
          Ready to learn? Take a quiz to sharpen your skills or check your progress
          to see how far you&apos;ve come.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<ClipboardList className="h-6 w-6 text-blue-600" />}
          label="Total Quizzes"
          value={String(totalQuizzes)}
          bg="bg-blue-50"
        />
        <StatCard
          icon={<BookOpen className="h-6 w-6 text-violet-600" />}
          label="Math Quizzes"
          value={String(mathQuizzes)}
          bg="bg-violet-50"
        />
        <StatCard
          icon={<Trophy className="h-6 w-6 text-amber-500" />}
          label="Science Quizzes"
          value={String(scienceQuizzes)}
          bg="bg-amber-50"
        />
      </div>

      {/* Action cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quizzes CTA */}
        <Link
          href="/associates/quiz"
          className="group flex flex-col justify-between rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 p-7 transition-all"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 mb-5">
            <ClipboardList className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-2">Take a Quiz</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              Test your knowledge across Math and Science with our curated quiz bank. Each
              question includes a detailed explanation.
            </p>
            <span className="flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
              Browse quizzes <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>

        {/* Progress CTA */}
        <Link
          href="/associates/progress"
          className="group flex flex-col justify-between rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 p-7 transition-all"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 mb-5">
            <BarChart2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-2">Track Progress</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              Review your completed quizzes, scores, and trends over time to identify
              where to focus your studies.
            </p>
            <span className="flex items-center gap-1 text-sm font-semibold text-emerald-600 group-hover:gap-2 transition-all">
              View progress <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
      </div>

      {/* Recent quizzes list */}
      <section>
        <h2 className="text-lg font-extrabold text-gray-900 mb-4">Available Quizzes</h2>
        <div className="space-y-3">
          {quizzes.map((quiz) => (
            <Link
              key={quiz.id}
              href={`/associates/quiz/${quiz.id}`}
              className="flex items-center justify-between rounded-2xl bg-white border border-gray-100 px-5 py-4 shadow-sm hover:border-blue-200 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-extrabold ${
                    quiz.subject === "Math"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {quiz.subject === "Math" ? "M" : "S"}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{quiz.title}</p>
                  <p className="text-xs text-gray-400">
                    {quiz.subject} · {quiz.difficulty} · {quiz.questions.length} questions
                  </p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
            </Link>
          ))}
        </div>
      </section>
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
    <div className={`flex items-center gap-4 rounded-2xl ${bg} border border-white px-5 py-5`}>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-extrabold text-gray-900">{value}</p>
        <p className="text-xs font-medium text-gray-500">{label}</p>
      </div>
    </div>
  );
}
