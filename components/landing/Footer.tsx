"use client"

import React from "react"
import Link from "next/link"
import { Mail, Heart } from "lucide-react"

const GithubIcon = ({ size = 24, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Resume Builder", href: "/builder?type=resume" },
      { label: "CV Builder", href: "/builder?type=cv" },
      { label: "Templates", href: "/templates" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Articles", href: "/articles" },
      { label: "Resume Writing Guide", href: "/articles/how-to-write-resume-2025" },
      { label: "ATS Tips", href: "/articles/ats-friendly-resume-tips" },
      { label: "Student Guide", href: "/articles/first-resume-guide-students" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-slate-800/60 mt-auto">
      {/* Animated gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="w-full max-w-7xl mx-auto px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center text-white font-bold text-xs tracking-tighter shadow-lg shadow-primary/20">
                RF
              </div>
              <span className="font-heading font-extrabold text-lg tracking-tight text-white">
                Resume<span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">Forge</span>
              </span>
            </Link>
            <p className="text-slate-500 text-xs leading-relaxed mb-6 max-w-[220px]">
              A privacy-first, zero-cost resume & CV builder. All data stays in your browser. Free and open source.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/abdussamadarefi/Resume-Builder"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-github-icon"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all"
                aria-label="GitHub"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href="mailto:abdussamadarefi@gmail.com"
                id="footer-email-icon"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-slate-500 hover:text-white transition-colors font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-slate-900 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-600 font-medium">
            © {new Date().getFullYear()} ResumeForge. Zero auth. Zero cost. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-600 font-medium flex items-center gap-1">
            Made with <Heart size={10} className="text-rose-500 fill-rose-500" /> by{" "}
            <a
              href="https://github.com/abdussamadarefi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Abdus Samad Arefi
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
