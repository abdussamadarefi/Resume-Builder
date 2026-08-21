"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: React.ComponentType<any>;
  iconColor?: string;
  badge?: string | React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Card({
  title,
  subtitle,
  icon: Icon,
  iconColor = 'text-blue-600 dark:text-blue-400',
  badge,
  action,
  children,
  className,
}: CardProps) {
  const hasHeader = title || Icon || badge || action;

  return (
    <div
      className={cn(
        'bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-sm dark:shadow-none transition-colors duration-200',
        className
      )}
    >
      {hasHeader && (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {Icon && <Icon size={16} className={iconColor} />}
            {title && <h2 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h2>}
            {badge && (
              typeof badge === 'string' ? (
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  {badge}
                </span>
              ) : badge
            )}
          </div>

          {action && <div className="flex items-center gap-2">{action}</div>}
        </div>
      )}

      {subtitle && <p className="text-xs text-slate-600 dark:text-slate-400 -mt-2">{subtitle}</p>}

      {children}
    </div>
  );
}
