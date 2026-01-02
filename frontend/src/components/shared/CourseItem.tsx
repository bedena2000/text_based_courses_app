import { useNavigate } from "react-router-dom";

// Match this to your backend response structure
interface CourseItemProps {
  course: {
    id: number | string;
    title: string;
    description: string;
    level: string;
    tags?: string[];
    instructor?: {
      username: string;
    };
    // If your backend sends a count of steps, use it here
    stepsCount?: number;
  };
}

export default function CourseItem({ course }: CourseItemProps) {
  const navigate = useNavigate();

  // Safely get the instructor name or fallback to "Anonymous"
  const instructorName = course.instructor?.username || "Anonymous";

  // This is likely where the crash was happening: charAt(0) on undefined
  const avatarLetter = instructorName.charAt(0).toUpperCase();

  return (
    <div
      onClick={() => navigate(`/courses/${course.id}`)}
      className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 hover:bg-slate-900 transition-all cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Header: Level & Steps */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-slate-800 text-slate-400">
            {course.level}
          </span>
          <span className="text-[10px] font-bold text-slate-500">
            {course.stepsCount || 0} STEPS
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors mb-2">
          {course.title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed mb-6">
          {course.description}
        </p>
      </div>

      <div>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {course.tags?.map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer: Instructor Info */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-800/50">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-lg">
            {avatarLetter}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              Instructor
            </span>
            <span className="text-sm text-slate-300 font-medium">
              {instructorName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
