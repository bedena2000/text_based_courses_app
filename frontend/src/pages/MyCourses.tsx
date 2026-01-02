import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/axios";

const fetchMyCreatedCourses = async () => {
  const { data } = await api.get('/api/courses/my-courses');

  return data;
};

export default function MyCourses() {
  const {
    data: myCourses,
    isLoading,
  } = useQuery({
    queryKey: ["my-created-courses"],
    queryFn: fetchMyCreatedCourses,
  });

  if (isLoading)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-500"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* --- HEADER --- */}
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              My <span className="text-indigo-500">Workspace</span>
            </h1>
            <p className="mt-3 text-slate-400 text-lg">
              Manage and view the courses you have authored.
            </p>
          </div>
          <Link
            to="/create-course"
            className="hidden md:block bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition shadow-lg shadow-indigo-500/20"
          >
            + Create New Course
          </Link>
        </div>

        {/* --- COURSES GRID --- */}
        {myCourses && myCourses.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {myCourses.map((course: any) => (
              <div
                key={course.id}
                className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-6 transition hover:border-indigo-500/50 hover:bg-slate-900/80 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${
                        course.is_published
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {course.is_published ? "Published" : "Draft"}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">
                      {course.level}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-400 line-clamp-2 mb-6 leading-relaxed">
                    {course.description || "No description provided."}
                  </p>
                </div>

                <div className="mt-4 pt-6 border-t border-slate-800/50 flex gap-3">
                  <Link
                    to={`/courses/${course.id}`}
                    className="flex-1 text-center bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold py-3 rounded-xl transition"
                  >
                    View Public Page
                  </Link>
                  <Link
                    to={`/instructor/courses/${course.id}`}
                    className="flex-1 text-center bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold py-3 rounded-xl transition shadow-lg shadow-indigo-500/10"
                  >
                    Edit Content
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* --- EMPTY STATE --- */
          <div className="mt-20 flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-slate-800 rounded-3xl">
            <div className="h-16 w-16 bg-slate-900 rounded-2xl flex items-center justify-center text-slate-600 mb-6 font-bold text-2xl">
              ?
            </div>
            <h2 className="text-2xl font-bold text-white">
              No courses created yet
            </h2>
            <p className="text-slate-500 mt-2 max-w-sm">
              You haven't authored any courses. Start sharing your knowledge
              with the world!
            </p>
            <Link
              to="/create-course"
              className="mt-8 bg-white text-slate-950 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition"
            >
              Create Your First Course
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
