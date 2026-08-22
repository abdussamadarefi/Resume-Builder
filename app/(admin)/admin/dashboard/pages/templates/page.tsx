"use client";

import React, { useState } from 'react';
import { useAdminDraftStore } from '@/store/adminDraftStore';
import { FileText, Save, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import templatesPageDefault from '@/content/templates-page.json';

export default function TemplatesPageCMS() {
  const { stageFile, stagedFiles } = useAdminDraftStore();

  const [content, setContent] = useState(() => {
    if (stagedFiles['content/templates-page.json']) {
      try {
        return JSON.parse(stagedFiles['content/templates-page.json'].content);
      } catch { }
    }
    return templatesPageDefault;
  });

  const [saved, setSaved] = useState(false);

  const handleStage = () => {
    stageFile('content/templates-page.json', JSON.stringify(content, null, 2), 'Templates Gallery Page Header');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileText className="text-blue-400" size={20} />
            <span>Templates Gallery Page Controller (/templates)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Customize the header, badge pill, description, and filter category labels for the template showcase gallery.
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

      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-5">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles size={16} className="text-blue-400" />
          <span>Gallery Header & Copy</span>
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Badge Pill Text
            </label>
            <input
              type="text"
              value={content.badge_text}
              onChange={(e) => setContent({ ...content, badge_text: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-blue-500 rounded-xl text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Page Main Title
            </label>
            <input
              type="text"
              value={content.title}
              onChange={(e) => setContent({ ...content, title: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-blue-500 rounded-xl text-white text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Subtitle Paragraph
            </label>
            <textarea
              rows={3}
              value={content.subtitle}
              onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-blue-500 rounded-xl text-white text-xs leading-relaxed"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <h3 className="text-xs font-bold text-slate-200 flex items-center gap-2">
            <Filter size={14} className="text-purple-400" />
            <span>Category Filter Tabs</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {content.filter_tabs.map((tab: any, idx: number) => (
              <div key={tab.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">{tab.id}</span>
                <input
                  type="text"
                  value={tab.label}
                  onChange={(e) => {
                    const next = [...content.filter_tabs];
                    next[idx].label = e.target.value;
                    setContent({ ...content, filter_tabs: next });
                  }}
                  className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
