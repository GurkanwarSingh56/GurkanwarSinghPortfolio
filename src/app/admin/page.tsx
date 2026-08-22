import { Database, Plus } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in">
      <header className="border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-bold font-mono tracking-wider">Mission Control</h1>
        <p className="text-zinc-400 mt-2">Manage the Living Portfolio architecture from this private terminal.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Stats / Shortcuts */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-3 text-indigo-400">
            <Database className="w-5 h-5" />
            <h3 className="font-mono uppercase tracking-widest text-sm font-bold">Projects</h3>
          </div>
          <p className="text-zinc-500 text-sm">Manage case studies and tech stacks.</p>
          <button className="flex items-center gap-2 text-xs font-mono bg-zinc-800 hover:bg-zinc-700 px-3 py-2 rounded text-zinc-300 transition w-full justify-center">
            <Plus className="w-4 h-4" /> New Project
          </button>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-3 text-cyan-400">
            <Database className="w-5 h-5" />
            <h3 className="font-mono uppercase tracking-widest text-sm font-bold">Timeline</h3>
          </div>
          <p className="text-zinc-500 text-sm">Update life milestones and history.</p>
          <button className="flex items-center gap-2 text-xs font-mono bg-zinc-800 hover:bg-zinc-700 px-3 py-2 rounded text-zinc-300 transition w-full justify-center">
            <Plus className="w-4 h-4" /> New Milestone
          </button>
        </div>
      </section>

      <section className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg mt-8">
        <h3 className="font-mono uppercase tracking-widest text-sm font-bold text-zinc-300 border-b border-zinc-800 pb-4 mb-4">System Status</h3>
        <ul className="text-sm space-y-3 font-mono text-zinc-500">
          <li className="flex justify-between items-center">
            <span>Firebase Connection:</span>
            <span className="text-emerald-400">Stable</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Storage Bucket:</span>
            <span className="text-emerald-400">Mounted</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Admin Authentication:</span>
            <span className="text-emerald-400">Secure Session</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
