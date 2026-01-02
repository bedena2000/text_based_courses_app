import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 px-6">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-extrabold text-indigo-500 mb-4">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-white mb-2">
          Page not found
        </h2>

        <p className="text-slate-400 mb-8">
          Sorry, the page you are looking for doesn’t exist or was moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 hover:scale-105"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
