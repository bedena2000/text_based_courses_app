import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

// Types for our data
type CourseLevel = "beginner" | "intermediate" | "advanced";

interface CourseData {
  title: string;
  description: string;
  level: CourseLevel;
}

const createCourseRequest = async (courseData: CourseData) => {
  const { data } = await api.post("/api/courses", courseData);
  return data;
};

export default function CreateCourse() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CourseData>({
    title: "",
    description: "",
    level: "beginner",
  });

  const mutation = useMutation({
    mutationFn: createCourseRequest,
    onSuccess: (response) => {
      if (response && response.id) {
        navigate(`/instructor/courses/${response.id}`);
      }
    },
    onError: (error) => {
      console.error("Failed to create course:", error);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Create a New <span className="text-indigo-500">Course</span>
          </h1>
          <p className="mt-3 text-slate-400 text-lg">
            Share your knowledge with the community.
          </p>
        </div>

        {/* Error Message */}
        {mutation.isError && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            {(mutation.error as any)?.response?.data?.message ||
              "Something went wrong. Please check your connection."}
          </div>
        )}

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="space-y-8 bg-slate-900/50 border border-slate-800 p-8 rounded-2xl shadow-xl"
        >
          {/* Course Title */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Course Title
            </label>
            <input
              name="title"
              type="text"
              required
              placeholder="e.g. Advanced JavaScript Patterns"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Course Level Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Difficulty Level
            </label>
            <div className="grid grid-cols-3 gap-4">
              {(["beginner", "intermediate", "advanced"] as CourseLevel[]).map(
                (lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setFormData({ ...formData, level: lvl })}
                    className={`py-3 rounded-xl border font-bold capitalize transition-all ${
                      formData.level === lvl
                        ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                        : "bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-600"
                    }`}
                  >
                    {lvl}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Course Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Description
            </label>
            <textarea
              name="description"
              required
              rows={5}
              placeholder="What makes this course special?"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="button"
              disabled={mutation.isPending}
              onClick={() => navigate("/courses")}
              className="px-6 py-3 rounded-xl border border-slate-700 text-slate-400 font-medium hover:bg-slate-800 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
            >
              {mutation.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Course"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
