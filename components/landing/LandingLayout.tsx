"use client"

import React from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"

interface LandingLayoutProps {
  children: React.ReactNode
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 overflow-hidden flex flex-col font-sans transition-colors duration-200">
      {/* Dynamic Background - Gradient Orbs & Grid */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-15%] w-[50%] h-[50%] bg-gradient-to-br from-indigo-500/15 dark:from-indigo-500/20 to-purple-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-15%] w-[50%] h-[50%] bg-gradient-to-tr from-emerald-500/10 to-blue-600/10 blur-[150px] rounded-full animate-pulse delay-1000" />
        <div className="absolute top-[40%] left-[30%] w-[350px] h-[350px] bg-indigo-500/5 blur-[120px] rounded-full" />
        {/* Fine grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#64748b10_1px,transparent_1px),linear-gradient(to_bottom,#64748b10_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 dark:opacity-30" />
      </div>

      <Navbar />

      <main className="relative z-10 flex-1 flex flex-col">
        {children}
      </main>

      <Footer />
    </div>
  )
}
