import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import {
  ArrowUpRight,
  Play,
  FileText,
  Lightbulb,
  Video,
  Scissors,
  CalendarClock,
  CheckCircle2,
  TrendingUp,
  Clock,
  Sparkles,
} from "lucide-react";

const stats = [
  { label: "Total Views", value: "184.2K", delta: "+12.4%", icon: TrendingUp, tone: "text-emerald-400" },
  { label: "Clips Generated", value: "326", delta: "+24", icon: Scissors, tone: "text-accent-soft" },
  { label: "Watch Time", value: "9.4K hrs", delta: "+8.1%", icon: Clock, tone: "text-fuchsia-400" },
  { label: "Published", value: "48", delta: "+5", icon: CheckCircle2, tone: "text-sky-400" },
];

const pipeline = [
  { stage: "Ideas", count: 12, icon: Lightbulb, color: "from-amber-400 to-orange-500" },
  { stage: "Scripts", count: 7, icon: FileText, color: "from-sky-400 to-blue-500" },
  { stage: "Recording", count: 4, icon: Video, color: "from-rose-400 to-pink-500" },
  { stage: "Editing", count: 6, icon: Scissors, color: "from-accent to-fuchsia-500" },
  { stage: "Scheduled", count: 9, icon: CalendarClock, color: "from-emerald-400 to-teal-500" },
];

const projects = [
  { title: "AI Tools Tier List 2025", platform: "YouTube", status: "editing", progress: 72, thumb: "from-accent/40 to-fuchsia-500/30" },
  { title: "How I Edit 10x Faster", platform: "TikTok", status: "scheduled", progress: 100, thumb: "from-emerald-400/40 to-teal-500/30" },
  { title: "Creator Economy Deep Dive", platform: "LinkedIn", status: "script", progress: 35, thumb: "from-sky-400/40 to-blue-500/30" },
  { title: "Behind the Scenes Vlog #12", platform: "Instagram", status: "recording", progress: 20, thumb: "from-rose-400/40 to-pink-500/30" },
];

const activity = [
  { text: "AI generated 6 clips from “Podcast Ep. 42”", time: "12m ago", icon: Scissors },
  { text: "Hook variations ready for “AI Tools Tier List”", time: "1h ago", icon: Sparkles },
  { text: "Published to TikTok — “How I Edit 10x Faster”", time: "3h ago", icon: CheckCircle2 },
  { text: "New script draft: “Creator Economy Deep Dive”", time: "Yesterday", icon: FileText },
];

const chartBars = [40, 62, 48, 78, 55, 88, 70, 92, 64, 84, 58, 96];

export default function Dashboard({ user, onLogout }) {
  const [active, setActive] = useState("overview");

  return (
    <div className="min-h-screen flex">
      <Sidebar active={active} setActive={setActive} />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar user={user} onLogout={onLogout} />

        <main className="flex-1 p-5 lg:p-8 overflow-x-hidden">
          {/* Greeting */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-semibold text-white tracking-tight">
                Good to see you, {user?.name?.split(" ")[0] || "Creator"} 👋
              </h1>
              <p className="text-sm text-zinc-500 mt-1.5">
                Here's what's happening across your content pipeline today.
              </p>
            </div>
            <button className="btn-primary self-start sm:self-auto">
              <Sparkles className="w-4 h-4" />
              New Content
            </button>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map(({ label, value, delta, icon: Icon, tone }) => (
              <div key={label} className="card p-5 hover:border-white/[0.12] transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center">
                    <Icon className={`w-4 h-4 ${tone}`} />
                  </div>
                  <span className={`text-xs font-medium ${tone} flex items-center gap-0.5`}>
                    <ArrowUpRight className="w-3 h-3" />
                    {delta}
                  </span>
                </div>
                <p className="text-2xl font-semibold text-white tracking-tight">{value}</p>
                <p className="text-xs text-zinc-500 mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Main grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Pipeline */}
            <div className="card p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-semibold text-white">Content Pipeline</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Live view across all stages</p>
                </div>
                <button className="text-xs text-accent-soft hover:text-fuchsia-400 transition-colors">
                  View all →
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {pipeline.map(({ stage, count, icon: Icon, color }) => (
                  <div
                    key={stage}
                    className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-4 hover:bg-white/[0.04] transition-colors cursor-pointer"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xl font-semibold text-white">{count}</p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">{stage}</p>
                  </div>
                ))}
              </div>

              {/* Mini chart */}
              <div className="mt-8">
                <div className="flex items-baseline justify-between mb-4">
                  <p className="text-xs text-zinc-500">Performance · last 12 weeks</p>
                  <p className="text-xs text-emerald-400 font-medium">+18.6% growth</p>
                </div>
                <div className="flex items-end gap-1.5 h-24">
                  {chartBars.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-accent/30 to-accent-soft/80 hover:from-accent/50 hover:to-fuchsia-400 transition-all cursor-pointer"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Activity feed */}
            <div className="card p-6">
              <h2 className="text-base font-semibold text-white mb-5">Recent Activity</h2>
              <div className="space-y-4">
                {activity.map(({ text, time, icon: Icon }, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-accent-soft" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-zinc-300 leading-relaxed">{text}</p>
                      <p className="text-[11px] text-zinc-600 mt-0.5">{time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-white">Active Projects</h2>
                <p className="text-xs text-zinc-500 mt-0.5">Your content in progress</p>
              </div>
              <button className="btn-ghost text-xs py-2 px-3">View all</button>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {projects.map((p) => (
                <div
                  key={p.title}
                  className="group rounded-xl border border-white/[0.05] bg-white/[0.02] overflow-hidden hover:border-accent/40 transition-all cursor-pointer"
                >
                  <div className={`relative h-32 bg-gradient-to-br ${p.thumb} flex items-center justify-center`}>
                    <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-medium text-white truncate">{p.title}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[11px] text-zinc-500">{p.platform}</span>
                      <span className="text-[10px] uppercase tracking-wider text-accent-soft font-medium px-2 py-0.5 rounded-full bg-accent/10">
                        {p.status}
                      </span>
                    </div>
                    <div className="mt-3 h-1 bg-white/[0.05] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-fuchsia-500 rounded-full"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}