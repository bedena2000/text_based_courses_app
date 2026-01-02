import CourseSearch from "../components/ui/CourseSearch";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { setSearch, toggleTag } from "../store/courseFilterReducer";
import CourseItem from "../components/shared/CourseItem";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/axios";

const fetchAllCourses = async () => {
  const { data } = await api.get("/api/courses");
  return data;
};

export default function Courses() {
  const dispatch = useDispatch<AppDispatch>();
  const { search, selectedTags } = useSelector(
    (state: RootState) => state.courseFilter
  );

  // 2. Fetch real data using React Query
  const {
    data: courses = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allPublishedCourses"],
    queryFn: fetchAllCourses,
  });

  // 3. Extract tags from real database objects (if tags exist in your DB schema)
  // Note: If you haven't added a 'tags' column to your Course model yet,
  // this will return an empty array.
  const availableTags = Array.from(
    new Set(courses.flatMap((c: any) => c.tags || []))
  ).sort() as string[];

  // 4. Filtering logic remains the same, but uses 'courses' from API
  const filteredCourses = courses.filter((course: any) => {
    const matchesSearch =
      search === "" ||
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => (course.tags || []).includes(tag));

    return matchesSearch && matchesTags;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
        <p className="text-xl font-bold text-white mb-2">Connection Error</p>
        <p>Could not fetch courses from the server.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-20">
      {/* --- HERO HEADER --- */}
      <div className="relative border-b border-slate-800 bg-slate-900/40 px-6 py-16 mb-10 overflow-hidden">
        <div className="absolute top-0 right-0 h-64 w-64 bg-indigo-600/10 blur-[100px]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                Explore{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Courses
                </span>
              </h1>
              <p className="mt-4 text-lg text-slate-400 max-w-2xl leading-relaxed">
                Unlock your potential with community-driven, text-based
                technical guides.
              </p>
            </div>

            <div className="hidden lg:flex gap-10 border-l border-slate-800 pl-10">
              <div>
                <p className="text-3xl font-bold text-white font-mono">
                  {courses.length}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">
                  Live Courses
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white font-mono">
                  {availableTags.length}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">
                  Topics
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* --- STICKY FILTER BAR --- */}
        <div className="sticky top-6 z-30 mb-12 backdrop-blur-xl">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-1 shadow-2xl">
            <CourseSearch
              value={search}
              selectedTags={selectedTags}
              availableTags={availableTags}
              onChange={(value) => dispatch(setSearch(value))}
              onTagToggle={(tag) => dispatch(toggleTag(tag))}
            />
          </div>
        </div>

        {/* --- RESULTS INFO --- */}
        <div className="mb-8 flex items-center justify-between border-b border-slate-800 pb-4">
          <p className="text-sm text-slate-500">
            Found{" "}
            <span className="text-indigo-400 font-bold">
              {filteredCourses.length}
            </span>{" "}
            published paths
          </p>
        </div>

        {/* --- COURSE GRID --- */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course: any) => (
              <CourseItem key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="mt-32 flex flex-col items-center justify-center text-center">
            <div className="h-20 w-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 text-slate-700">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">No matches found</h2>
            <button
              onClick={() => dispatch(setSearch(""))}
              className="mt-8 px-6 py-2 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400 font-semibold hover:bg-slate-800 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
