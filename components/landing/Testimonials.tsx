"use client"

import React from "react"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Computer Science Student, Stanford",
    quote: "ResumeForge helped me land my first internship at a Fortune 500. The ATS-friendly templates made all the difference — I got callbacks from 4 out of 5 applications.",
    avatar: "SC",
    accentColor: "#3b82f6",
  },
  {
    name: "Marcus Williams",
    role: "Senior Software Engineer",
    quote: "I've used paid resume builders before, but ResumeForge's privacy-first approach won me over. No account needed, no data stored anywhere — just clean, professional output.",
    avatar: "MW",
    accentColor: "#10b981",
  },
  {
    name: "Dr. Priya Patel",
    role: "Postdoctoral Researcher, MIT",
    quote: "The academic CV templates are a game-changer for researchers. Publications, grants, teaching — everything is properly formatted for academic hiring committees.",
    avatar: "PP",
    accentColor: "#8b5cf6",
  },
  {
    name: "James Rodriguez",
    role: "Career Changer, Ex-Marketing → UX",
    quote: "Switching careers was daunting, but ResumeForge's templates let me highlight transferable skills beautifully. The real-time preview saved me hours of formatting.",
    avatar: "JR",
    accentColor: "#e11d48",
  },
  {
    name: "Amina Hassan",
    role: "MBA Graduate, Wharton",
    quote: "The Executive template perfectly captured my consulting and leadership experience. PDF export quality is exceptional — truly print-ready documents.",
    avatar: "AH",
    accentColor: "#f59e0b",
  },
  {
    name: "David Kim",
    role: "Fresh Graduate, UC Berkeley",
    quote: "As a student with limited experience, the Compact template helped me present what I had in the best light. Being completely free made it even better.",
    avatar: "DK",
    accentColor: "#06b6d4",
  },
]

export default function Testimonials() {
  return (
    <section className="relative z-10 w-full py-20 md:py-32 border-t border-slate-900/60" id="testimonials">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
            Success Stories
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-white tracking-tight">
            Trusted by Students &{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
              Professionals
            </span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            From first resumes to career pivots — see how ResumeForge helps people tell their professional story.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative p-6 rounded-3xl bg-slate-900/30 border border-slate-800/60 hover:border-slate-700/60 transition-all hover:bg-slate-900/50 h-full flex flex-col">
                {/* Quote icon */}
                <div className="mb-4">
                  <Quote size={20} style={{ color: testimonial.accentColor }} className="opacity-40" />
                </div>

                {/* Quote text */}
                <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-800/60">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: testimonial.accentColor + "30", color: testimonial.accentColor }}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{testimonial.name}</div>
                    <div className="text-[11px] text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
