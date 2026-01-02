type CourseSearchProps = {
  value: string;
  selectedTags: string[];
  availableTags: string[];
  onChange: (value: string) => void;
  onTagToggle: (tag: string) => void;
};

export default function CourseSearch({
  value,
  selectedTags,
  availableTags,
  onChange,
  onTagToggle,
}: CourseSearchProps) {
  return (
    <div className="space-y-6">
      {/* Search Input Container */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search courses, topics, or authors..."
          className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-11 pr-4 py-4 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-inner"
        />
      </div>

      {/* Tags Filter Section */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold px-1">
          Filter by topic
        </span>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => {
            const isActive = selectedTags.includes(tag);

            return (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-200 
                  ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 border-transparent"
                      : "bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-600 hover:text-slate-200"
                  }`}
              >
                {isActive && <span className="mr-1.5">✓</span>}
                {tag}
              </button>
            );
          })}

          {selectedTags.length > 0 && (
            <button
              onClick={() => {
                // Logic to clear all tags would go here
              }}
              className="px-3 py-2 text-xs font-medium text-slate-500 hover:text-indigo-400 transition"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
