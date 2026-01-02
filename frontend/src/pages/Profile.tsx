import { useState, useEffect } from "react";
import axios from "axios";
import api from "../utils/axios";

export default function Profile() {
  const [user, setUser] = useState({
    username: "",
    bio: "",
    joined: "",
  });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await api.get("/api/auth/me");

        const userData = data.data;
        setUser({
          username: userData.username,
          bio: userData.bio || "",
          joined: new Date(userData.createdAt).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          }),
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchUserData();
  }, [token]);

  const handleUpdate = (field: string, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put("/api/auth/update", {
        username: user.username,
        bio: user.bio,
      });
      alert("Profile updated successfully!");
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-slate-950 p-20 text-white">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-20">
      <div className="max-w-4xl mx-auto px-4 pt-10">
        {/* --- HEADER / AVATAR SECTION --- */}
        <div className="relative mb-8 p-8 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden">
          <div className="absolute top-0 right-0 h-32 w-32 bg-indigo-600/10 blur-[50px] rounded-full" />
          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-indigo-500/20 uppercase">
              {user.username.charAt(0)}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-extrabold text-white">
                {user.username}
              </h1>
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300">
                  Joined {user.joined}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- SETTINGS FORM --- */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="px-8 py-6 border-b border-slate-800">
            <h2 className="text-xl font-bold text-white">Profile Settings</h2>
            <p className="text-sm text-slate-500">
              Update your public information.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Username
              </label>
              <input
                type="text"
                value={user.username}
                onChange={(e) => handleUpdate("username", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 transition shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Bio
              </label>
              <textarea
                rows={4}
                value={user.bio}
                onChange={(e) => handleUpdate("bio", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 transition resize-none shadow-inner"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="pt-4 flex justify-end gap-4 border-t border-slate-800/50">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-2 rounded-xl font-bold transition shadow-lg shadow-indigo-500/20 active:scale-95"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
