"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ComponentType<any>;
}

export interface TabBarProps {
  tabs: TabItem[];
  active?: string;
  activeTab?: string;
  onChange: (tabId: any) => void;
  className?: string;
}

export function TabBar({ tabs, active, activeTab, onChange, className }: TabBarProps) {
  const currentActive = active || activeTab;

  return (
    <div className={cn('flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800/80 pb-3', className)}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentActive === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm dark:shadow-none',
              isActive
                ? 'bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-900 dark:hover:text-white'
            )}
          >
            {Icon && <Icon size={14} className={isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'} />}
            <span>{tab.label}</span>
            {typeof tab.count === 'number' && (
              <span
                className={cn(
                  'text-[10px] px-1.5 py-0.2 rounded-full font-bold',
                  isActive ? 'bg-blue-500/20 text-blue-700 dark:text-blue-300' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
