"use client"
import { DsaTable } from "./dsa-table"
import { Zap, Code, Brain, Sparkles } from "lucide-react"

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950/20 to-slate-950 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 mt-6 relative">
          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full bg-cyan-500/10 blur-xl"></div>
          <div className="absolute top-8 -right-8 h-24 w-24 rounded-full bg-cyan-500/5 blur-xl"></div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20">
              <Sparkles className="h-5 w-5 text-cyan-400" />
            </div>
            <h1 className="text-3xl font-bold text-cyan-300 md:text-4xl">
              <span className="text-glow">Hello Coders</span> 
            </h1>
          </div>
          <p className="mt-2 text-zinc-400 max-w-2xl">
            Track your progress through data structures and algorithms problems. Master the fundamentals and prepare for
            technical interviews.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
          <div className="rounded-xl border border-cyan-700/30 bg-cyan-900/10 p-4 backdrop-blur-sm flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20">
              <Zap className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-cyan-300">Efficient Solutions</h3>
              <p className="text-sm text-zinc-400">Optimize your problem-solving skills</p>
            </div>
          </div>

          <div className="rounded-xl border border-cyan-700/30 bg-cyan-900/10 p-4 backdrop-blur-sm flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20">
              <Code className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-cyan-300">Clean Code</h3>
              <p className="text-sm text-zinc-400">Write maintainable and readable solutions</p>
            </div>
          </div>

          <div className="rounded-xl border border-cyan-700/30 bg-cyan-900/10 p-4 backdrop-blur-sm flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20">
              <Brain className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-cyan-300">Algorithm Mastery</h3>
              <p className="text-sm text-zinc-400">Build a strong foundation in algorithms</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-cyan-600/30 bg-black/60 p-6 backdrop-blur-sm">
          <DsaTable />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
