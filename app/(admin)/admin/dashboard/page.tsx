"use client";

import React from 'react';
import Link from 'next/link';
import {
  Palette,
  Layers,
  BookOpen,
  Flag,
  ArrowRight,
  Sparkles,
  Clock,
  FileText,
  Info,
  ShieldAlert,
  Navigation,
} from 'lucide-react';
import { useAdminDraftStore } from '@/store/adminDraftStore';

const kpis = [
  { label: 'Templates', value: '10', sub: 'All ATS-ready & enabled', icon: Palette, color: 'text-blue-600 dark:text-blue-400' },
  { label: 'Career Guides', value: '5', sub: 'Published career articles', icon: BookOpen, color: 'text-purple-600 dark:text-purple-400' },
  { label: 'Page Modules', value: '6', sub: 'Landing, About, Legal, etc.', icon: Layers, color: 'text-emerald-600 dark:text-emerald-400' },
  { label: 'Feature Flags', value: '6', sub: 'AI, PDF, DOCX, CV mode', icon: Flag, color: 'text-amber-600 dark:text-amber-400' },
];

const pageControllers = [
  {
    href: '/admin/dashboard/pages/landing',
    title: 'Landing Page CMS',
    description: '10-section toggles & reordering, Hero headlines, Stats counter, Testimonials, FAQs.',
    icon: Layers,
  },
  {
    href: '/admin/dashboard/pages/templates',
    title: 'Templates Gallery CMS',
    description: 'Gallery header title, category filter tabs, badges, and template card callouts.',
    icon: FileText,
  },
  {
    href: '/admin/dashboard/pages/articles',
    title: 'Articles & Career Guides CMS',
    description: 'Full Markdown editor for publishing new SEO career guides, categories, and tags.',
    icon: BookOpen,
  },
  {
    href: '/admin/dashboard/pages/about',
    title: 'About Page CMS',
    description: 'Mission statement, 4 Core Values cards, Creator bio & socials, Community banner.',
    icon: Info,
  },
  {
    href: '/admin/dashboard/pages/legal',
    title: 'Legal Policies CMS',
    description: 'Privacy Policy, Terms of Service, and Cookie Policy clauses, summaries, and dates.',
    icon: ShieldAlert,
  },
  {
    href: '/admin/dashboard/pages/navigation',
    title: 'Nav & Footer CMS',
    description: 'Navbar links, CTA button, 4-column footer directories, and copyright notice.',
    icon: Navigation,
  },
];

export default function AdminOverviewPage() {
  const { getStagedArray } = useAdminDraftStore();
  const pendingList = getStagedArray();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-950/60 dark:via-indigo-950/40 dark:to-slate-900/80 border border-blue-400/30 dark:border-blue-500/20 p-6 md:p-8 text-white shadow-lg shadow-blue-500/10">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 dark:bg-blue-500/10 border border-white/30 dark:border-blue-500/20 text-white dark:text-blue-400 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles size={12} /> Custom CMS Control Center
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-black tracking-tight text-white">
            Welcome to ResumeForge CMS
          </h1>
          <p className="text-blue-50 dark:text-slate-300 text-xs md:text-sm leading-relaxed font-normal">
            Manage your entire website content, 10 ATS-optimized templates, career articles, and feature flags. Edits are staged seamlessly and deployed directly to GitHub with zero database friction.
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-2 shadow-sm dark:shadow-none">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span className="text-xs font-bold">{kpi.label}</span>
                <Icon size={16} className={kpi.color} />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{kpi.value}</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{kpi.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Staged Pending Changes Section */}
      {pendingList.length > 0 && (
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-bold">
              <Clock size={15} />
              <span>{pendingList.length} Unpublished Changes Waiting in Staging</span>
            </div>
            <span className="text-[11px] text-amber-700/80 dark:text-amber-400/80 font-medium">Click "Push to GitHub" to publish live</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {pendingList.map((item) => (
              <div
                key={item.path}
                className="px-3 py-2 rounded-xl bg-white dark:bg-slate-950/60 border border-amber-500/30 text-xs flex items-center justify-between shadow-sm dark:shadow-none"
              >
                <span className="font-semibold text-slate-900 dark:text-slate-200 truncate">{item.label}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">{item.path}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Page CMS Quick Access Cards */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Layers size={18} className="text-blue-600 dark:text-blue-400" />
          <span>Full-Site Page Content Controllers</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pageControllers.map((ctrl) => (
            <Link
              key={ctrl.href}
              href={ctrl.href}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 hover:border-blue-500/40 hover:bg-blue-50/50 dark:hover:bg-slate-900/80 transition-all group space-y-3 shadow-sm dark:shadow-none"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {ctrl.title}
                </span>
                <ArrowRight size={14} className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {ctrl.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
