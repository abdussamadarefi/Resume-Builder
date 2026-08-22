"use client";

import React, { useState } from 'react';
import { useAdminDraftStore } from '@/store/adminDraftStore';
import { Palette, Save, CheckCircle2, Eye, EyeOff, Sparkles, Star } from 'lucide-react';
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Palette className="text-blue-400" size={20} />
            <span>Templates Registry Manager (10 Templates)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Enable or disable templates, toggle Featured / New status pills, customize ATS ratings and descriptions.
          </p>
        </div>

        <button
          onClick={handleStage}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
        >
          {saved ? (
            <>
              <CheckCircle2 size={14} className="text-emerald-300" />
              <span>Staged in Draft!</span>
            </>
          ) : (
            <>
              <Save size={14} />
              <span>Stage Changes</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((tpl: any, idx: number) => (
          <div
            key={tpl.id}
            className={`p-5 rounded-2xl border transition-all space-y-4 ${tpl.enabled
                ? 'bg-slate-900/40 border-slate-800/80'
                : 'bg-slate-950/40 border-slate-800/40 opacity-60'
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
                    <span className="text-sm font-bold text-white">{tpl.name}</span>
                    <span className="text-[10px] font-mono text-slate-500">({tpl.id})</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Category: {tpl.category} • Mode: {tpl.doc_type}
                  </span>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFeatured(tpl.id)}
                  title={tpl.featured ? 'Featured Template' : 'Mark as Featured'}
                  className={`p-1.5 rounded-lg border text-xs transition-colors ${tpl.featured
                      ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                      : 'bg-slate-950 border-slate-800 text-slate-600 hover:text-slate-400'
                    }`}
                >
                  <Star size={13} />
                </button>

                <button
                  onClick={() => toggleTemplate(tpl.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${tpl.enabled
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-slate-800 text-slate-400'
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
                <label className="block text-[10px] text-slate-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={tpl.description}
                  onChange={(e) => {
                    const next = [...templates];
                    next[idx].description = e.target.value;
                    setTemplates(next);
                  }}
                  className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">ATS Score (0-100)</label>
                  <input
                    type="number"
                    value={tpl.ats_score}
                    onChange={(e) => {
                      const next = [...templates];
                      next[idx].ats_score = parseInt(e.target.value) || 90;
                      setTemplates(next);
                    }}
                    className="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-white text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Accent Hex Color</label>
                  <input
                    type="text"
                    value={tpl.accent_color}
                    onChange={(e) => {
                      const next = [...templates];
                      next[idx].accent_color = e.target.value;
                      setTemplates(next);
                    }}
                    className="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-white text-xs font-mono"
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
