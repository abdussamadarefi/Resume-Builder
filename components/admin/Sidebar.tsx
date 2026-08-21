"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Layers,
  BookOpen,
  Info,
  ShieldAlert,
  Navigation,
  Palette,
  Flag,
  Settings,
  Users,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string;
}

const mainNav: NavItem[] = [
  { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Templates Registry', href: '/admin/dashboard/templates', icon: Palette, badge: '10' },
  { label: 'Feature Flags', href: '/admin/dashboard/flags', icon: Flag, badge: '6' },
];

const pagesNav: NavItem[] = [
  { label: 'Landing Page', href: '/admin/dashboard/pages/landing', icon: Layers },
  { label: 'Templates Gallery', href: '/admin/dashboard/pages/templates', icon: FileText },
  { label: 'Articles & Guides', href: '/admin/dashboard/pages/articles', icon: BookOpen, badge: '5' },
  { label: 'About Page', href: '/admin/dashboard/pages/about', icon: Info },
  { label: 'Legal Policies', href: '/admin/dashboard/pages/legal', icon: ShieldAlert },
  { label: 'Nav & Footer', href: '/admin/dashboard/pages/navigation', icon: Navigation },
];

const settingsNav: NavItem[] = [
  { label: 'Site Settings', href: '/admin/dashboard/settings', icon: Settings },
  { label: 'Admin Users', href: '/admin/dashboard/settings/admins', icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === '/admin/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800/80 min-h-screen text-slate-700 dark:text-slate-300 transition-colors duration-200">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Sparkles size={16} />
          </div>
          <div>
            <span className="font-heading font-black text-sm text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
              ResumeForge
              <span className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                CMS
              </span>
            </span>
            <p className="text-[11px] text-slate-500">Control Plane</p>
          </div>
        </Link>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Core Sections */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Control Center
          </p>
          {mainNav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  active
                    ? 'bg-blue-500/10 dark:bg-blue-600/15 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold'
                    : 'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-900 dark:hover:text-white text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={16} className={active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Public Pages CMS */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Pages Content CMS
          </p>
          {pagesNav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  active
                    ? 'bg-blue-500/10 dark:bg-blue-600/15 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold'
                    : 'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-900 dark:hover:text-white text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={16} className={active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* System Settings */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            System &amp; Access
          </p>
          {settingsNav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  active
                    ? 'bg-blue-500/10 dark:bg-blue-600/15 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold'
                    : 'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-900 dark:hover:text-white text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={16} className={active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'} />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/60 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition-all border border-slate-200 dark:border-slate-800"
        >
          <span className="flex items-center gap-2">
            <ExternalLink size={13} /> View Live Website
          </span>
          <ChevronRight size={13} className="text-slate-400 dark:text-slate-500" />
        </Link>
      </div>
    </aside>
  );
}
