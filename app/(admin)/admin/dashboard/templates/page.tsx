"use client";

import React, { useState } from 'react';
import { useAdminDraftStore } from '@/store/adminDraftStore';
import { PageHeader } from '@/components/admin/ui';
import { Palette, Eye, EyeOff, Star } from 'lucide-react';
import templatesDefault from '@/content/templates.json';

export default function TemplatesRegistryCMS() {
  const { stageFile, stagedFiles } = useAdminDraftStore();

  const [templates, setTemplates] = useState(() => {
    if (stagedFiles['content/templates.json']) {
      try {
        return JSON.parse(stagedFiles['content/templates.json'].content);
      } catch { }
    }
    return templatesDefault;
  });

  const [saved, setSaved] = useState(false);

  const handleStage = () => {
    stageFile('content/templates.json', JSON.stringify(templates, null, 2), `Templates Registry (10 Templates)`);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggleTemplate = (id: string) => {
    setTemplates(
      templates.map((t: any) =>
        t.id === id ? { ...t, enabled: !t.enabled } : t
      )
    );
  };

  const toggleFeatured = (id: string) => {
    setTemplates(
      templates.map((t: any) =>
        t.id === id ? { ...t, featured: !t.featured } : t
      )
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Palette}
        iconColor="text-blue-600 dark:text-blue-400"
        title="Templates Registry Manager (10 Templates)"
        description="Enable or disable templates, toggle Featured / New status pills, customize ATS ratings and descriptions."
        onStage={handleStage}
        saved={saved}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((tpl: any, idx: number) => (
          <div
            key={tpl.id}
            className={`p-5 rounded-2xl border transition-all space-y-4 shadow-sm dark:shadow-none ${
              tpl.enabled
                ? 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80'
                : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/40 opacity-60'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-sm"
                  style={{ backgroundColor: tpl.accent_color || '#3b82f6' }}
                >
                  {tpl.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{tpl.name}</span>
                    <span className="text-[10px] font-mono text-slate-500">({tpl.id})</span>
                  </div>
                  <span className="text-[10px] text-slate-600 dark:text-slate-400">
                    Category: {tpl.category} • Mode: {tpl.doc_type}
                  </span>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleFeatured(tpl.id)}
                  title={tpl.featured ? 'Featured Template' : 'Mark as Featured'}
                  className={`p-1.5 rounded-lg border text-xs transition-colors ${
                    tpl.featured
                      ? 'bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400'
                      : 'bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <Star size={13} />
                </button>

                <button
                  type="button"
                  onClick={() => toggleTemplate(tpl.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                    tpl.enabled
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {tpl.enabled ? <Eye size={12} /> : <EyeOff size={12} />}
                  <span>{tpl.enabled ? 'Enabled' : 'Disabled'}</span>
                </button>
              </div>
            </div>

            {/* Editable Fields */}
            <div className="space-y-2.5">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={tpl.description}
                  onChange={(e) => {
                    const next = [...templates];
                    next[idx].description = e.target.value;
                    setTemplates(next);
                  }}
                  className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-xs leading-relaxed focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-400 mb-1">ATS Score (0-100)</label>
                  <input
                    type="number"
                    value={tpl.ats_score}
                    onChange={(e) => {
                      const next = [...templates];
                      next[idx].ats_score = parseInt(e.target.value) || 90;
                      setTemplates(next);
                    }}
                    className="w-full px-2.5 py-1 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-400 mb-1">Accent Hex Color</label>
                  <input
                    type="text"
                    value={tpl.accent_color}
                    onChange={(e) => {
                      const next = [...templates];
                      next[idx].accent_color = e.target.value;
                      setTemplates(next);
                    }}
                    className="w-full px-2.5 py-1 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
