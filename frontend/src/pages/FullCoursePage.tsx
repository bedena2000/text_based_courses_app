import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import api from "../utils/axios";

// --- Types ---
type Block = {
  id: string;
  type: "text" | "code";
  content: string;
};

type Step = {
  id: string;
  title: string;
  blocks: Block[];
};

const publishCourseContent = async ({
  courseId,
  steps,
}: {
  courseId: string;
  steps: Step[];
}) => {
  const { data } = await api.post(`/api/courses/${courseId}/publish`, {
    steps,
  });
  return data;
};

export default function FullCoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [steps, setSteps] = useState<Step[]>([]);
  const [activeStepId, setActiveStepId] = useState<string | null>(null);

  // New state for the custom modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeStep = steps.find((s) => s.id === activeStepId) || null;

  const canPublish =
    steps.length > 0 &&
    steps.some(
      (s) =>
        s.title.trim() !== "" || s.blocks.some((b) => b.content.trim() !== "")
    );

  const publishMutation = useMutation({
    mutationFn: publishCourseContent,
    onSuccess: () => {
      setIsModalOpen(true);
    },
    onError: (error: any) => {
      console.error(error.response?.data?.message || "Failed to publish.");
    },
  });

  const handlePublish = () => {
    if (!courseId || !canPublish) return;
    publishMutation.mutate({
      courseId,
      steps: steps.map((s, index) => ({ ...s, order: index })),
    });
  };

  const addStep = () => {
    const newId = Date.now().toString();
    const newStep: Step = {
      id: newId,
      title: "",
      blocks: [
        {
          id: Math.random().toString(36).substr(2, 9),
          type: "text",
          content: "",
        },
      ],
    };
    setSteps([...steps, newStep]);
    setActiveStepId(newId);
  };

  const addBlock = (type: "text" | "code") => {
    if (!activeStepId) return;
    const newBlock: Block = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: "",
    };
    setSteps(
      steps.map((s) =>
        s.id === activeStepId ? { ...s, blocks: [...s.blocks, newBlock] } : s
      )
    );
  };

  const updateBlock = (blockId: string, content: string) => {
    setSteps(
      steps.map((s) =>
        s.id === activeStepId
          ? {
              ...s,
              blocks: s.blocks.map((b) =>
                b.id === blockId ? { ...b, content } : b
              ),
            }
          : s
      )
    );
  };

  const deleteBlock = (blockId: string) => {
    setSteps(
      steps.map((s) =>
        s.id === activeStepId
          ? { ...s, blocks: s.blocks.filter((b) => b.id !== blockId) }
          : s
      )
    );
  };

  return (
    <div className="h-screen w-full bg-slate-950 flex flex-col p-4 overflow-hidden text-slate-200 relative">
      {/* SUCCESS MODAL OVERLAY */}
      {isModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-6">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-sm w-full shadow-2xl text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              🚀
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Course Published!
            </h2>
            <p className="text-slate-400 mb-8 text-sm">
              Your content is now live and saved to the database. Great job,
              instructor!
            </p>
            <button
              onClick={() => navigate("/courses")}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-500/20"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex items-center justify-between mb-4 px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/courses")}
            className="text-slate-400 hover:text-white transition"
          >
            ← Exit
          </button>
          <div className="h-6 w-px bg-slate-800" />
          <h1 className="font-bold text-xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Course Editor
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {!canPublish && (
            <span className="text-[10px] font-bold text-amber-500/70 uppercase tracking-widest animate-pulse">
              Add a step to enable publishing
            </span>
          )}
          <button
            onClick={handlePublish}
            disabled={!canPublish || publishMutation.isPending}
            className={`px-6 py-2 rounded-xl font-bold transition flex items-center gap-2 shadow-lg 
              ${
                canPublish
                  ? "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20 text-white"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed shadow-none"
              }`}
          >
            {publishMutation.isPending ? "Publishing..." : "Publish Course"}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-slate-900/40 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2 px-2">
            Course Map
          </label>
          {steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveStepId(s.id)}
              className={`p-4 rounded-xl text-left transition-all duration-200 ${
                activeStepId === s.id
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-slate-900/50 border border-slate-800 text-slate-400 hover:border-slate-600"
              }`}
            >
              <div className="text-[10px] opacity-50 font-bold mb-1">
                STEP {i + 1}
              </div>
              <div className="text-sm font-bold truncate">
                {s.title || "Untitled Step"}
              </div>
            </button>
          ))}
          <button
            onClick={addStep}
            className="mt-4 p-4 border-2 border-dashed border-slate-800 rounded-xl text-slate-500 hover:text-indigo-400 hover:border-indigo-400/50 transition-all font-bold text-sm"
          >
            + Add New Step
          </button>
        </aside>

        {/* Editor Area */}
        <main className="flex-1 bg-slate-900/20 border border-slate-800 rounded-2xl overflow-y-auto custom-scrollbar">
          {activeStep ? (
            <div className="max-w-3xl mx-auto p-12 py-20">
              <input
                type="text"
                value={activeStep.title}
                onChange={(e) =>
                  setSteps(
                    steps.map((s) =>
                      s.id === activeStepId
                        ? { ...s, title: e.target.value }
                        : s
                    )
                  )
                }
                className="w-full bg-transparent text-5xl font-black outline-none placeholder-slate-800 mb-12"
                placeholder="Step Title..."
              />
              <div className="space-y-10">
                {activeStep.blocks.map((block) => (
                  <div key={block.id} className="group relative">
                    {block.type === "text" ? (
                      <textarea
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                        placeholder="Start writing..."
                        className="w-full bg-transparent text-xl leading-relaxed outline-none resize-none text-slate-300"
                        rows={Math.max(3, block.content.split("\n").length)}
                      />
                    ) : (
                      <div className="rounded-2xl border border-slate-800 bg-[#0d1117] p-6 shadow-2xl">
                        <textarea
                          value={block.content}
                          onChange={(e) =>
                            updateBlock(block.id, e.target.value)
                          }
                          placeholder="// Code here..."
                          className="w-full bg-transparent outline-none resize-none font-mono text-sm text-emerald-400"
                          rows={Math.max(6, block.content.split("\n").length)}
                        />
                      </div>
                    )}
                    <button
                      onClick={() => deleteBlock(block.id)}
                      className="absolute -right-12 top-0 p-2 opacity-0 group-hover:opacity-100 text-slate-700 hover:text-red-500 transition-all"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-16 pt-10 border-t border-slate-900 flex items-center justify-center gap-6">
                <button
                  onClick={() => addBlock("text")}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="h-12 w-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-indigo-500 transition-all">
                    <span className="text-slate-400 group-hover:text-indigo-400 text-lg">
                      T
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 uppercase">
                    Text
                  </span>
                </button>
                <button
                  onClick={() => addBlock("code")}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="h-12 w-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-indigo-500 transition-all">
                    <span className="text-slate-400 group-hover:text-indigo-400 text-lg">
                      {"<>"}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 uppercase">
                    Code
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-600">
              <div className="text-6xl mb-4">✍️</div>
              <p className="text-lg font-medium">
                Click "+ Add New Step" to start building your course.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
