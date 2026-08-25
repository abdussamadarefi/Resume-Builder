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
      <Navbar />

      <main className="relative z-10 flex-1 flex flex-col">
        {children}
      </main>

      <Footer />
    </div>
  )
}
