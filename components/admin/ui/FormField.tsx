"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export interface FormFieldProps {
  label?: string;
  labelSub?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  className?: string;
  inputClassName?: string;
  mono?: boolean;
  bold?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export function FormField({
  label,
  labelSub,
  value,
  onChange,
  type = 'text',
  placeholder,
  multiline = false,
  rows = 3,
  className,
  inputClassName,
  mono = false,
  bold = false,
  required = false,
  disabled = false,
}: FormFieldProps) {
  const baseInputStyles = cn(
    'w-full px-3.5 py-2.5 bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm dark:shadow-none',
    mono && 'font-mono text-slate-800 dark:text-slate-300',
    bold && 'font-bold',
    multiline && 'leading-relaxed',
    inputClassName
  );

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            {label}
            {required && <span className="text-rose-500 ml-1">*</span>}
          </label>
          {labelSub && <span className="text-[10px] text-slate-500">{labelSub}</span>}
        </div>
      )}

      {multiline ? (
        <textarea
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={baseInputStyles}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={baseInputStyles}
        />
      )}
    </div>
  );
}
