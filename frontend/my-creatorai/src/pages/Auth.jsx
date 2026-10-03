import { useState } from "react";
import { Sparkles, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";

export default function Auth({ onAuth }) {
  const [mode, setMode] = useState("login"); // login | signup
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const isSignup = mode === "signup";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (isSignup && !form.name.trim()) return setError("Please enter your name");
    if (!form.email.includes("@")) return setError("Enter a valid email");
    if (form.password.length < 6) return setError("Password must be 6+ characters");

    setLoading(true);
    // 🔌 Replace with: POST http://localhost:5000/api/auth/login | /signup
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);

    onAuth({
      name: form.name || form.email.split("@")[0],
      email: form.email,
    });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* LEFT — Brand Panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden border-r border-white/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-fuchsia-500/10" />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent/20 blur-[120px] animate-pulseSoft" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-fuchsia-500/10 blur-[100px]" />

        <div className="relative flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-fuchsia-500 flex items-center justify-center shadow-glow">
            <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-semibold text-white tracking-tight">CreatorAi</span>
        </div>

        <div className="relative space-y-6 max-w-md">
          <h1 className="text-4xl font-bold text-white leading-[1.15] tracking-tight">
            The AI content OS <br />
            <span className="bg-gradient-to-r from-accent-soft to-fuchsia-400 bg-clip-text text-transparent">
              for modern creators.
            </span>
          </h1>
          <p className="text-zinc-400 leading-relaxed">
            From idea to publish — unify scripting, footage, editing, and multi-platform
            distribution in one intelligent workspace.
          </p>

          <div className="space-y-3 pt-4">
            {[
              "Script-to-video semantic understanding",
              "AI clips that stay fully editable",
              "One source → every platform",
            ].map((line, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-soft" />
                {line}
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-xs text-zinc-600">
          © 2025 CreatorAi · Built for creators
        </div>
      </div>

      {/* RIGHT — Form Panel */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-fuchsia-500 flex items-center justify-center shadow-glow">
              <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-semibold text-white">CreatorAi</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              {isSignup ? "Create your account" : "Welcome back"}
            </h2>
            <p className="text-sm text-zinc-500 mt-1.5">
              {isSignup
                ? "Start building your content engine today."
                : "Sign in to continue to your studio."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="label">Full name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Jane Creator"
                    className="input pl-10"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  placeholder="you@creatorai.io"
                  className="input pl-10"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input pl-10"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </div>

            {error && (
              <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Please wait…
                </>
              ) : (
                <>
                  {isSignup ? "Create account" : "Sign in"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-zinc-500">
            {isSignup ? "Already have an account?" : "New to CreatorAi?"}{" "}
            <button
              onClick={() => {
                setMode(isSignup ? "login" : "signup");
                setError("");
              }}
              className="text-accent-soft hover:text-fuchsia-400 font-medium transition-colors"
            >
              {isSignup ? "Sign in" : "Create one"}
            </button>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-[11px] uppercase tracking-widest text-zinc-600">or</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          <button
            onClick={() =>
              onAuth({ name: "Demo Creator", email: "demo@creatorai.io" })
            }
            className="btn-ghost w-full mt-6"
          >
            Continue as demo
          </button>
        </div>
      </div>
    </div>
  );
}