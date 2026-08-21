"use client";

import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StatusAlertProps {
  type?: 'success' | 'error' | 'info' | 'warning';
  message: string | React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const typeMap = {
  success: {
    bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400',
    icon: CheckCircle2,
  },
  error: {
    bg: 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-400',
    icon: AlertCircle,
  },
  warning: {
    bg: 'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-400',
    icon: AlertTriangle,
  },
  info: {
    bg: 'bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-400',
    icon: Info,
  },
};

export function StatusAlert({
  type = 'info',
  message,
  onClose,
  className,
}: StatusAlertProps) {
  if (!message) return null;

  const config = typeMap[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'p-3.5 rounded-xl border flex items-start justify-between gap-2.5 text-xs shadow-sm font-medium',
        config.bg,
        className
      )}
    >
      <div className="flex items-start gap-2.5 flex-1">
        <Icon size={15} className="flex-shrink-0 mt-0.5" />
        <div className="flex-1 leading-relaxed">{message}</div>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-current opacity-70 hover:opacity-100 p-0.5 transition-opacity"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
