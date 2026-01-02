import { NavLink, useNavigate } from "react-router-dom";

const links = [
  { title: "All Courses", path: "/courses", icon: "📚" },
  { title: "My Courses", path: "/my-courses", icon: "🎯" },
  { title: "Profile", path: "/profile", icon: "👤" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Redirecting to login using navigate is cleaner than window.location.href
    navigate("/login");
  };

  return (
    <aside className="sticky top-0 h-screen w-64 shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col z-40">
      {/* Header */}
      <div className="px-6 py-8">
        <h2 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Learning
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200
              ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="text-base">{link.icon}</span>
            <span>{link.title}</span>
          </NavLink>
        ))}

        <div className="my-4 border-t border-slate-800 mx-2" />

        {/* CREATE COURSE SECTION */}
        <NavLink
          to="/create-course"
          className={({ isActive }) =>
            `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 border-2
            ${
              isActive
                ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                : "border-dashed border-slate-700 text-slate-400 hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/5"
            }`
          }
        >
          <span className="text-lg">+</span>
          <span>Create Course</span>
        </NavLink>
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/30">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all"
        >
          <span>🚪</span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
