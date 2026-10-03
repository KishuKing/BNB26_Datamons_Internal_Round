import { Search, Bell, LogOut, Command, Plus } from "lucide-react";

export default function TopBar({ user, onLogout }) {
  const initials = (user?.name || "C")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="h-16 flex items-center justify-between gap-4 px-5 lg:px-8 border-b border-white/[0.06] bg-ink-900/40 backdrop-blur-xl sticky top-0 z-20">
      {/* Mobile logo */}
      <div className="lg:hidden text-sm font-semibold text-white">CreatorAi</div>

      {/* Search */}
      <div className="flex-1 max-w-md hidden sm:block">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            placeholder="Search projects, clips, assets…"
            className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-10 pr-16 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/15 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 text-[10px] text-zinc-500 bg-white/[0.05] border border-white/[0.08] rounded-md px-1.5 py-0.5">
            <Command className="w-2.5 h-2.5" />K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative w-9 h-9 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] flex items-center justify-center transition-colors">
          <Bell className="w-4 h-4 text-zinc-400" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
        </button>

        <button className="btn-primary hidden sm:inline-flex py-2 px-3.5 text-xs">
          <Plus className="w-3.5 h-3.5" />
          Create
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2.5 pl-2 ml-1 border-l border-white/[0.06]">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-fuchsia-500 flex items-center justify-center text-xs font-semibold text-white">
            {initials}
          </div>
          <div className="hidden md:block leading-tight">
            <p className="text-xs font-medium text-white">{user?.name || "Creator"}</p>
            <p className="text-[10px] text-zinc-500">{user?.email || ""}</p>
          </div>
          <button
            onClick={onLogout}
            className="w-8 h-8 rounded-lg hover:bg-white/[0.05] flex items-center justify-center text-zinc-500 hover:text-red-400 transition-colors"
            title="Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}