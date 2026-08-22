import { ReactNode } from "react";
import Link from "next/link";
import { Lock, LayoutDashboard, FolderKanban, Clock, Users, BookOpen, Award, Settings } from "lucide-react";

// In a real implementation, this would read from cookies/session
const isAuthenticated = true;

export default function AdminLayout({ children }: { children: ReactNode }) {
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        <div className="flex flex-col items-center space-y-4">
          <Lock className="w-12 h-12 text-red-500" />
          <h1 className="text-xl font-bold font-mono text-red-400 uppercase tracking-widest">Unauthorized Access</h1>
          <p className="text-sm text-zinc-500">You do not have clearance for the CMS.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-zinc-950 text-white">
      {/* Sidebar Skeleton */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/50 p-6 flex flex-col gap-6">
        <div className="flex items-center gap-3 text-cyan-400">
          <Lock className="w-6 h-6" />
          <span className="font-bold font-mono tracking-widest uppercase">Admin CMS</span>
        </div>
        
        <nav className="flex flex-col gap-2 mt-4 text-sm font-mono">
          <Link href="/admin" className="flex items-center gap-3 p-3 rounded hover:bg-zinc-800 transition">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 p-3 rounded hover:bg-zinc-800 transition">
            <FolderKanban className="w-4 h-4" /> Projects
          </Link>
          <Link href="/admin/timeline" className="flex items-center gap-3 p-3 rounded hover:bg-zinc-800 transition">
            <Clock className="w-4 h-4" /> Timeline
          </Link>
          <Link href="/admin/leadership" className="flex items-center gap-3 p-3 rounded hover:bg-zinc-800 transition">
            <Users className="w-4 h-4" /> Leadership
          </Link>
          <Link href="/admin/teaching" className="flex items-center gap-3 p-3 rounded hover:bg-zinc-800 transition">
            <BookOpen className="w-4 h-4" /> Teaching
          </Link>
          <Link href="/admin/certificates" className="flex items-center gap-3 p-3 rounded hover:bg-zinc-800 transition">
            <Award className="w-4 h-4" /> Certificates
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 p-3 rounded hover:bg-zinc-800 transition mt-8 border border-zinc-700">
            <Settings className="w-4 h-4" /> Site Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
