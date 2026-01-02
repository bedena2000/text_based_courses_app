import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import api from "../utils/axios";

const fetchCourseDetails = async (courseId: string) => {
  const { data } = await api.get(`/api/courses/${courseId}`);

  return data;
};

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const {
    data: course,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => fetchCourseDetails(courseId!),
    enabled: !!courseId,
  });

  if (isLoading)
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500/20 border-t-indigo-500" />
      </div>
    );

  if (isError || !course)
    return (
      <div className="text-white text-center py-20">Course not found.</div>
    );

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* --- HERO SECTION --- */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 h-64 w-64 bg-indigo-500/10 blur-[80px]" />

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
              {course.level}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white">
              {course.title}
            </h1>
            <div className="flex items-center gap-3 text-slate-400">
              <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold border border-slate-700">
                {course.instructor?.username?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium">
                By{" "}
                <span className="text-slate-200">
                  {course.instructor?.username}
                </span>
              </span>
              <span className="text-slate-700">•</span>
              <span className="text-sm">
                {course.steps?.length || 0} Lessons
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate(`/learn/${course.id}`)}
            className="w-full md:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            Start Learning →
          </button>
        </div>
      </div>

      {/* --- DETAILS GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Description & Syllabus */}
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              About this course
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              {course.description || "No description provided for this course."}
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                Course Curriculum
              </h2>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                {course.steps?.length} Steps
              </span>
            </div>

            <div className="space-y-3">
              {course.steps?.map((step: any, index: number) => (
                <div
                  key={step.id}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all"
                >
                  <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-500 group-hover:text-indigo-400 transition-colors">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{step.title}</h4>
                    <p className="text-xs text-slate-500 uppercase tracking-tighter">
                      {step.content_blocks?.length || 0} Content Blocks
                    </p>
                  </div>
                  <div className="text-slate-600 group-hover:text-indigo-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sidebar: Meta Info */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-6">
            <h3 className="font-bold text-white">Course Overview</h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Difficulty</span>
                <span className="text-slate-200 font-medium capitalize">
                  {course.level}
                </span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Format</span>
                <span className="text-slate-200 font-medium">Text-based</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Access</span>
                <span className="text-slate-200 font-medium">Lifetime</span>
              </li>
            </ul>
            <div className="pt-6 border-t border-slate-800">
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">
                Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {course.tags?.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-md bg-slate-800 text-indigo-300 text-[10px] font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
