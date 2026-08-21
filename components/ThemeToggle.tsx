"use client"

import React, { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export interface ThemeToggleProps {
  className?: string
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
}

export function ThemeToggle({
  className,
  size = "md",
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-9 h-9 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 border border-slate-300/40 dark:border-slate-700/40 animate-pulse",
          size === "sm" && "w-8 h-8 rounded-lg",
          size === "lg" && "w-10 h-10 rounded-2xl",
          className
        )}
      />
    )
  }

  const isDark = resolvedTheme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  const iconSizes = {
    sm: 15,
    md: 17,
    lg: 19,
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      id="theme-toggle-btn"
      className={cn(
        "relative group flex items-center justify-center gap-2 p-2 rounded-xl transition-all duration-200 select-none",
        "bg-slate-100/90 hover:bg-slate-200/90 dark:bg-slate-900/90 dark:hover:bg-slate-800",
        "border border-slate-300/70 hover:border-slate-400/80 dark:border-slate-800 dark:hover:border-slate-700",
        "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white shadow-sm",
        size === "sm" && "p-1.5 rounded-lg",
        size === "lg" && "p-2.5 rounded-2xl",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex items-center justify-center text-amber-400"
          >
            <Sun size={iconSizes[size]} className="group-hover:rotate-45 transition-transform duration-300" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex items-center justify-center text-indigo-600"
          >
            <Moon size={iconSizes[size]} className="group-hover:-rotate-12 transition-transform duration-300" />
          </motion.div>
        )}
      </AnimatePresence>

      {showLabel && (
        <span className="text-xs font-semibold">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  )
}

export default ThemeToggle
