"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ThemeToggle"
import navData from "@/content/navigation.json"

const GithubIcon = ({ size = 24, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = navData.navbar || [
    { label: "Templates", url: "/templates" },
    { label: "Articles", url: "/articles" },
    { label: "About", url: "/about" },
  ]
  const cta = navData.navbar_cta || { label: "Build Free Resume", url: "/builder" }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/80 dark:bg-[#030712]/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/60 shadow-sm dark:shadow-lg dark:shadow-black/10"
            : "bg-transparent"
        )}
      >
        <div className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" id="navbar-logo">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center shadow-lg shadow-primary/20 text-white font-bold text-sm tracking-tighter group-hover:shadow-primary/40 transition-shadow">
              RF
            </div>
            <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
              Resume<span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">Forge</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" id="navbar-desktop-nav">
            {navLinks.map((link: any) => (
              <Link
                key={link.url || link.href}
                href={link.url || link.href}
                className={cn(
                  "relative px-4 py-2 rounded-lg text-sm font-semibold transition-colors",
                  isActive(link.url || link.href)
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-900/40"
                )}
              >
                {link.label}
                {isActive(link.url || link.href) && (
                  <motion.div
                    layoutId="navbar-active-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-primary to-indigo-400 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Sun/Moon Theme Toggle */}
            <ThemeToggle />

            <a
              href={navData.footer_github_url || "https://github.com/abdussamadarefi/Resume-Builder"}
              target="_blank"
              rel="noopener noreferrer"
              id="navbar-github-link"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors text-xs font-semibold"
            >
              <GithubIcon size={15} />
              <span>GitHub</span>
            </a>

            <Link
              href={cta.url || "/builder?type=resume"}
              id="navbar-btn-launch"
              className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-indigo-600 hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
            >
              {cta.label || "Build Free Resume"} <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Hamburger & Quick Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle size="sm" />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors"
              id="navbar-mobile-toggle"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-white dark:bg-[#0a0f1a] border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col md:hidden shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <ThemeToggle size="sm" showLabel />
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="flex flex-col gap-2 flex-1">
                {navLinks.map((link: any) => (
                  <Link
                    key={link.url || link.href}
                    href={link.url || link.href}
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                      isActive(link.url || link.href)
                        ? "text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900/40"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800">
                <a
                  href={navData.footer_github_url || "https://github.com/abdussamadarefi/Resume-Builder"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900/40 text-sm font-semibold transition-colors"
                >
                  <GithubIcon size={16} /> Star on GitHub
                </a>
                <Link
                  href={cta.url || "/builder?type=resume"}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-indigo-600 text-white font-bold text-sm rounded-xl shadow-lg"
                >
                  {cta.label || "Build Free Resume"} <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer so content doesn't go under fixed navbar */}
      <div className="h-[72px]" />
    </>
  )
}
