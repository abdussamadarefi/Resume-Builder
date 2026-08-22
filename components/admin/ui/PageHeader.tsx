"use client";

import React from 'react';
import { Save, CheckCircle2 } from 'lucide-react';

export interface PageHeaderProps {
  icon?: React.ComponentType<any>;
  iconColor?: string;
  title: string;
  description: string;
  onStage?: () => void;
  saved?: boolean;
  stageLabel?: string;
  stageButtonText?: string;
  savedLabel?: string;
  disabled?: boolean;
  actions?: React.ReactNode;
  headerRight?: React.ReactNode;
}

export function PageHeader({
  icon: Icon,
  iconColor = 'text-blue-600 dark:text-blue-400',
  title,
  description,
  onStage,
  saved = false,
  stageLabel = 'Stage Changes',
  stageButtonText,
  savedLabel = 'Staged in Draft!',
  disabled = false,
  actions,
  headerRight,
}: PageHeaderProps) {
  const currentStageLabel = stageButtonText || stageLabel;
  const rightContent = headerRight || actions;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          {Icon && <Icon className={iconColor} size={20} />}
          <span>{title}</span>
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{description}</p>
      </div>

      <div className="flex items-center gap-3">
        {rightContent}

        {onStage && (
          <button
            type="button"
            onClick={onStage}
            disabled={disabled}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {saved ? (
              <>
                <CheckCircle2 size={14} className="text-emerald-300" />
                <span>{savedLabel}</span>
              </>
            ) : (
              <>
                <Save size={14} />
                <span>{currentStageLabel}</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
