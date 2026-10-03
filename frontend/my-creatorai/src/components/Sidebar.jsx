import {
  LayoutDashboard,
  FolderKanban,
  Library,
  Sparkles,
  Scissors,
  CalendarClock,
  BarChart3,
  Settings,
} from "lucide-react";

const nav = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "assets", label: "Assets", icon: Library },
  { id: "studio", label: "AI Studio", icon: Sparkles },
  { id: "clips", label: "Clips & Edits", icon: Scissors },
  { id: "publish", label: "Publish", icon: CalendarClock },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

export default function Sidebar({ active, setActive }) {
  return (
    <aside className="hidden lg:flex w-64 flex-col bg-ink-900/60 backdrop-blur-xl border-r border-white/[0.06]">
      {/* Logo */}
      <div className="h-16 flex items-center gap-2.5 px-6 border-b border-white/[0.06]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-fuchsia-500 flex items-center justify-center shadow-glow">
          <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        <span className="text-sm font-semibold text-white tracking-tight">CreatorAi</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {nav.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                isActive
                  ? "bg-gradient-to-r from-accent/15 to-fuchsia-500/10 text-white border border-accent/20"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-accent-soft" : ""}`} />
              <span className="font-medium">{label}</span>
              {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-soft" />}
            </button>
          );
        })}
      </nav>

      {/* Upgrade card */}
      <div className="p-4 mx-3 mb-4 rounded-xl bg-gradient-to-br from-accent/15 to-fuchsia-500/10 border border-accent/20">
        <p className="text-xs font-semibold text-white">Pro Plan</p>
        <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
          Unlock unlimited AI clips & priority rendering.
        </p>
        <button className="mt-3 w-full text-[11px] font-medium text-white bg-white/[0.06] hover:bg-white/[0.1] rounded-lg py-1.5 transition-colors">
          Upgrade
        </button>
      </div>

      <div className="px-3 pb-4">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-all">
          <Settings className="w-4 h-4" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </aside>
  );
}