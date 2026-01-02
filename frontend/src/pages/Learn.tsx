import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/axios";

const fetchCourseForLearning = async (courseId: string) => {
  const { data } = await api.get(`/api/courses/${courseId}`);
  return data;
};

export default function Learn() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeStepIndex, setActiveStepIndex] = useState(
    location.state?.initialStep ?? 0
  );

  const {
    data: course,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["learn-course", courseId],
    queryFn: () => fetchCourseForLearning(courseId!),
    enabled: !!courseId,
  });

  useEffect(() => {
    if (location.state?.initialStep !== undefined) {
      setActiveStepIndex(location.state.initialStep);
    }
  }, [location.state]);

  if (isLoading)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-500"></div>
      </div>
    );

  if (isError || !course)
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-10">
        <p className="text-xl font-bold mb-4">Course not found</p>
        <button
          onClick={() => navigate("/courses")}
          className="px-6 py-2 bg-slate-900 border border-slate-800 rounded-xl text-indigo-400"
        >
          Back to Library
        </button>
      </div>
    );

  const currentStep = course.steps?.[activeStepIndex];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200">
      {/* --- SIDEBAR: SYLLABUS --- */}
      <aside className="w-80 border-r border-slate-800 bg-slate-900/50 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800">
          <button
            onClick={() => navigate(`/courses/${courseId}`)}
            className="text-xs text-slate-500 hover:text-white mb-4 transition flex items-center gap-2"
          >
            ← Back to Overview
          </button>
          <h2 className="font-bold text-white text-lg truncate leading-tight">
            {course.title}
          </h2>
          <div className="mt-4 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
            <span>Progress</span>
            <span>
              {course.steps?.length > 0
                ? Math.round(
                    ((activeStepIndex + 1) / course.steps.length) * 100
                  )
                : 0}
              %
            </span>
          </div>
          <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all duration-500 ease-out"
              style={{
                width: `${
                  course.steps?.length > 0
                    ? ((activeStepIndex + 1) / course.steps.length) * 100
                    : 0
                }%`,
              }}
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          {course.steps?.map((step: any, idx: number) => (
            <button
              key={step.id}
              onClick={() => setActiveStepIndex(idx)}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all border ${
                activeStepIndex === idx
                  ? "bg-indigo-600/10 border-indigo-500/50 text-white shadow-lg shadow-indigo-500/5"
                  : "border-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <span
                className={`flex-shrink-0 h-6 w-6 rounded-lg border text-[10px] flex items-center justify-center font-bold ${
                  activeStepIndex === idx
                    ? "border-indigo-400 bg-indigo-500/10 text-indigo-400"
                    : "border-slate-800 bg-slate-900 text-slate-600"
                }`}
              >
                {idx + 1}
              </span>
              <span className="text-sm font-medium text-left truncate">
                {step.title}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* --- CONTENT AREA --- */}
      <main className="flex-1 overflow-y-auto bg-slate-950 relative">
        <div className="max-w-3xl mx-auto py-16 px-8 md:px-12">
          {currentStep ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <header className="mb-12">
                <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                  <span className="w-8 h-[1px] bg-indigo-500/50"></span>
                  Module {activeStepIndex + 1}
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  {currentStep.title}
                </h1>
              </header>

              <div className="space-y-10">
                {/* FIX: We check for both 'contentBlocks' and 'content_blocks' 
                  because Sequelize 'underscored: true' often converts 
                  the attribute name to camelCase in the JSON response.
                */}
                {(currentStep.contentBlocks || currentStep.content_blocks)?.map(
                  (block: any, bIdx: number) => (
                    <div key={bIdx}>
                      {block.type === "text" ? (
                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed whitespace-pre-wrap font-serif">
                          {block.content}
                        </p>
                      ) : (
                        <div className="rounded-2xl border border-slate-800 bg-[#0d1117] p-6 shadow-2xl overflow-hidden group">
                          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
                            <div className="flex gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40"></div>
                              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40"></div>
                              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                              Code Block
                            </span>
                          </div>
                          <pre className="font-mono text-sm text-indigo-300 overflow-x-auto leading-6">
                            <code>{block.content}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>

              {/* NAV BUTTONS */}
              <div className="mt-20 pt-10 border-t border-slate-800 flex justify-between items-center">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => {
                    setActiveStepIndex(activeStepIndex - 1);
                    document.querySelector("main")?.scrollTo(0, 0);
                  }}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                    activeStepIndex === 0
                      ? "opacity-0 pointer-events-none"
                      : "text-slate-500 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  ← Previous Module
                </button>

                {activeStepIndex < course.steps.length - 1 ? (
                  <button
                    onClick={() => {
                      setActiveStepIndex(activeStepIndex + 1);
                      document.querySelector("main")?.scrollTo(0, 0);
                    }}
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/courses")}
                    className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
                  >
                    Complete Course
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-600">
              Select a module to begin.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
