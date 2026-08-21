"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import PublishButton from './PublishButton';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LogOut, User, Globe, ChevronRight } from 'lucide-react';

export default function TopBar() {
  const pathname = usePathname();
  const router = useRouter();

  // Generate readable breadcrumbs
  const segments = pathname
    .replace('/admin/dashboard', '')
    .split('/')
    .filter(Boolean);

  const getBreadcrumbLabel = (seg: string) => {
    switch (seg) {
      case 'pages':
        return 'Pages CMS';
      case 'landing':
        return 'Landing Page';
      case 'templates':
        return 'Templates';
      case 'articles':
        return 'Articles & Guides';
      case 'about':
        return 'About Page';
      case 'legal':
        return 'Legal Policies';
      case 'navigation':
        return 'Navigation & Footer';
      case 'flags':
        return 'Feature Flags';
      case 'settings':
        return 'Settings';
      case 'admins':
        return 'Admin Users';
      default:
        return seg.charAt(0).toUpperCase() + seg.slice(1);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <header className="h-16 px-6 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between sticky top-0 z-40 transition-colors duration-200">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs">
        <span className="font-semibold text-slate-500">Dashboard</span>
        {segments.map((seg, idx) => (
          <React.Fragment key={seg}>
            <ChevronRight size={12} className="text-slate-400 dark:text-slate-600" />
            <span
              className={
                idx === segments.length - 1
                  ? 'font-bold text-slate-900 dark:text-white'
                  : 'text-slate-500'
              }
            >
              {getBreadcrumbLabel(seg)}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Sun/Moon Theme Toggle */}
        <ThemeToggle size="sm" />

        {/* Publish to GitHub Button */}
        <PublishButton />

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

        {/* User Pill & Logout */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 text-xs">
            <div className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-[10px]">
              A
            </div>
            <span className="font-medium hidden sm:inline">Admin</span>
          </div>

          <button
            onClick={handleLogout}
            title="Log out"
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all text-xs"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
