import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col bg-slate-950 text-slate-200">
      <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 py-24">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-6xl">
            Learn step by step. <br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Completely free.
            </span>
          </h1>

          <p className="mt-8 mx-auto max-w-2xl text-lg text-slate-400 leading-relaxed">
            A community-driven platform where anyone can create and take
            text-based courses — no videos, no paywalls, just learning.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/courses"
              className="w-full sm:w-auto rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98]"
            >
              Browse courses
            </Link>

            <Link
              to="/register"
              className="w-full sm:w-auto rounded-xl border border-slate-700 bg-slate-900/50 px-8 py-4 font-semibold text-white transition hover:bg-slate-800 hover:border-slate-600"
            >
              Become an author
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <Feature
              title="Step-based learning"
              description="Progress through courses one step at a time, optimized for deep focus and retention."
            />
            <Feature
              title="Text-first approach"
              description="Focus on reading and doing. Supports Markdown, live code snippets, and structured PDFs."
            />
            <Feature
              title="Open Community"
              description="Knowledge should be free. Anyone can publish a course and contribute to the library."
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-900/30 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-bold text-white text-center">
            How it works
          </h2>

          <div className="mt-16 grid gap-12 md:grid-cols-3">
            <Step
              number="1"
              title="Choose a course"
              text="Find a topic you're passionate about from our open library."
            />
            <Step
              number="2"
              title="Learn by doing"
              text="Follow text-based steps at your own pace without distractions."
            />
            <Step
              number="3"
              title="Master the skill"
              text="Track your progress and earn community recognition."
            />
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/5" />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-4xl font-bold text-white">
            Ready to start learning?
          </h2>

          <p className="mt-6 text-lg text-slate-400">
            Join thousands of students exploring free, community-built courses.
          </p>

          <Link
            to="/courses"
            className="mt-10 inline-block rounded-xl bg-white px-10 py-4 font-bold text-slate-950 transition hover:bg-slate-100 hover:scale-105 active:scale-95"
          >
            Explore courses now
          </Link>
        </div>
      </section>
    </div>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition hover:border-indigo-500/50 hover:bg-slate-900">
      <div className="mb-4 h-1 w-12 bg-indigo-500 rounded-full transition-all group-hover:w-20" />
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="mt-4 text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-2xl font-bold mb-6">
        {number}
      </div>
      <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
      <p className="text-slate-400">{text}</p>
    </div>
  );
}

export default Home;
