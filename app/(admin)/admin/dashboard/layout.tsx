import React from 'react';
import Sidebar from '@/components/admin/Sidebar';
import TopBar from '@/components/admin/TopBar';

export const metadata = {
  title: 'ResumeForge CMS Admin Dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex font-sans antialiased selection:bg-blue-500/30 selection:text-blue-300 transition-colors duration-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
