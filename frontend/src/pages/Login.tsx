import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

const loginUser = async (credentials: any) => {
  const { data } = await api.post("/api/auth/login", credentials);
  return data;
};

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);

      navigate("/courses");
    },
    onError: (error: any) => {
      console.error("Login failed:", error.response?.data);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mutation.isError) mutation.reset();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const errorMessage =
    (mutation.error as any)?.response?.data?.message ||
    "Invalid username or password";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <h1 className="mb-2 text-center text-3xl font-extrabold text-slate-900">
          Welcome Back
        </h1>
        <p className="mb-8 text-center text-sm text-slate-500">
          Please enter your details to sign in
        </p>

        {mutation.isError && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 animate-in fade-in slide-in-from-top-2 duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Username
            </label>
            <input
              name="username"
              type="text"
              required
              placeholder="John Doe"
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                mutation.isError
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                  : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20"
              }`}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                mutation.isError
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                  : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20"
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 active:scale-[0.98] disabled:bg-indigo-400"
          >
            {mutation.isPending ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-medium text-indigo-600 hover:underline"
          >
            Create account
          </a>
        </p>
      </div>
    </div>
  );
}
