"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Palette,
  Layers,
  BookOpen,
  Flag,
  Users,
  Settings,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { useAdminDraftStore } from '@/store/adminDraftStore';

export default function AdminOverviewPage() {
  const { stagedFiles, getStagedArray } = useAdminDraftStore();
  const pendingList = getStagedArray();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900/50 border border-blue-500/20 p-6 md:p-8">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles size={12} /> Custom CMS Control Center
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-black text-white tracking-tight">
            Welcome to ResumeForge CMS
          </h1>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            Manage your entire website content, 10 ATS-optimized templates, career articles, and feature flags. Edits are staged seamlessly and deployed directly to GitHub with zero database friction.
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Templates</span>
            <Palette size={16} className="text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">10</div>
          <p className="text-[11px] text-slate-500">All ATS-ready & enabled</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Career Guides</span>
            <BookOpen size={16} className="text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">5</div>
          <p className="text-[11px] text-slate-500">Published career articles</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Page Modules</span>
            <Layers size={16} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">6</div>
          <p className="text-[11px] text-slate-500">Landing, About, Legal, etc.</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Feature Flags</span>
            <Flag size={16} className="text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">6</div>
          <p className="text-[11px] text-slate-500">AI, PDF, DOCX, CV mode</p>
        </div>
      </div>

      {/* Staged Pending Changes Section */}
      {pendingList.length > 0 && (
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <Clock size={15} />
              <span>{pendingList.length} Unpublished Changes Waiting in Staging</span>
            </div>
            <span className="text-[11px] text-amber-400/80">Click "Push to GitHub" to publish live</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {pendingList.map((item) => (
              <div
                key={item.path}
                className="px-3 py-2 rounded-xl bg-slate-950/60 border border-amber-500/20 text-xs flex items-center justify-between"
              >
                <span className="font-semibold text-slate-200 truncate">{item.label}</span>
                <span className="text-[10px] text-slate-500">{item.path}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Page CMS Quick Access Cards */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
          <Layers size={18} className="text-blue-400" />
          <span>Full-Site Page Content Controllers</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/dashboard/pages/landing"
            className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-blue-500/40 hover:bg-slate-900/80 transition-all group space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                Landing Page CMS
              </span>
              <ArrowRight size={14} className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              10-section toggles & reordering, Hero headlines, Stats counter, Testimonials, FAQs.
            </p>
          </Link>

          <Link
            href="/admin/dashboard/pages/templates"
            className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-blue-500/40 hover:bg-slate-900/80 transition-all group space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                Templates Gallery CMS
              </span>
              <ArrowRight size={14} className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gallery header title, category filter tabs, badges, and template card callouts.
            </p>
          </Link>

          <Link
            href="/admin/dashboard/pages/articles"
            className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-blue-500/40 hover:bg-slate-900/80 transition-all group space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                Articles & Career Guides CMS
              </span>
              <ArrowRight size={14} className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Full Markdown editor for publishing new SEO career guides, categories, and tags.
            </p>
          </Link>

          <Link
            href="/admin/dashboard/pages/about"
            className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-blue-500/40 hover:bg-slate-900/80 transition-all group space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                About Page CMS
              </span>
              <ArrowRight size={14} className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mission statement, 4 Core Values cards, Creator bio & socials, Community banner.
            </p>
          </Link>

          <Link
            href="/admin/dashboard/pages/legal"
            className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-blue-500/40 hover:bg-slate-900/80 transition-all group space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                Legal Policies CMS
              </span>
              <ArrowRight size={14} className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Privacy Policy, Terms of Service, and Cookie Policy clauses, summaries, and dates.
            </p>
          </Link>

          <Link
            href="/admin/dashboard/pages/navigation"
            className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-blue-500/40 hover:bg-slate-900/80 transition-all group space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                Nav & Footer CMS
              </span>
              <ArrowRight size={14} className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Navbar links, CTA button, 4-column footer directories, and copyright notice.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
