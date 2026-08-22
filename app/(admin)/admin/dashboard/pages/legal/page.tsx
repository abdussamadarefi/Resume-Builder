"use client";

import React, { useState } from 'react';
import { useAdminDraftStore } from '@/store/adminDraftStore';
import { ShieldAlert, Save, CheckCircle2, FileText, Plus, Trash2 } from 'lucide-react';
import privacyDefault from '@/content/legal/privacy.json';
import termsDefault from '@/content/legal/terms.json';
import cookiesDefault from '@/content/legal/cookies.json';

export default function LegalPagesCMS() {
  const { stageFile, stagedFiles } = useAdminDraftStore();

  const [activePolicy, setActivePolicy] = useState<'privacy' | 'terms' | 'cookies'>('privacy');

  const [privacy, setPrivacy] = useState(() => {
    if (stagedFiles['content/legal/privacy.json']) {
      try {
        return JSON.parse(stagedFiles['content/legal/privacy.json'].content);
      } catch { }
    }
    return privacyDefault;
  });

  const [terms, setTerms] = useState(() => {
    if (stagedFiles['content/legal/terms.json']) {
      try {
        return JSON.parse(stagedFiles['content/legal/terms.json'].content);
      } catch { }
    }
    return termsDefault;
  });

  const [cookies, setCookies] = useState(() => {
    if (stagedFiles['content/legal/cookies.json']) {
      try {
        return JSON.parse(stagedFiles['content/legal/cookies.json'].content);
      } catch { }
    }
    return cookiesDefault;
  });

  const [saved, setSaved] = useState(false);

  const getCurrentData = () => {
    if (activePolicy === 'privacy') return privacy;
    if (activePolicy === 'terms') return terms;
    return cookies;
  };

  const updateCurrentData = (updated: any) => {
    if (activePolicy === 'privacy') setPrivacy(updated);
    if (activePolicy === 'terms') setTerms(updated);
    if (activePolicy === 'cookies') setCookies(updated);
  };

  const handleStageAll = () => {
    stageFile('content/legal/privacy.json', JSON.stringify(privacy, null, 2), 'Privacy Policy (/privacy)');
    stageFile('content/legal/terms.json', JSON.stringify(terms, null, 2), 'Terms of Service (/terms)');
    stageFile('content/legal/cookies.json', JSON.stringify(cookies, null, 2), 'Cookie Policy (/cookies)');

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const current = getCurrentData();

  const addClause = () => {
    const nextSections = [
      ...current.sections,
      {
        id: `s_${Date.now()}`,
        title: 'New Section Title',
        content: 'Write clause content here...',
      },
    ];
    updateCurrentData({ ...current, sections: nextSections });
  };

  const removeClause = (id: string) => {
    const nextSections = current.sections.filter((s: any) => s.id !== id);
    updateCurrentData({ ...current, sections: nextSections });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <ShieldAlert className="text-blue-400" size={20} />
            <span>Legal Policies CMS (/privacy, /terms, /cookies)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Edit the plain-English summaries, last updated dates, and individual legal clauses.
          </p>
        </div>

        <button
          onClick={handleStageAll}
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
              <span>Stage All 3 Policies</span>
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800/80 pb-3">
        {[
          { id: 'privacy', label: 'Privacy Policy' },
          { id: 'terms', label: 'Terms of Service' },
          { id: 'cookies', label: 'Cookie Policy' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActivePolicy(tab.id as any)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${activePolicy === tab.id
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Policy Details */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Badge Text</label>
            <input
              type="text"
              value={current.badge}
              onChange={(e) => updateCurrentData({ ...current, badge: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Last Updated Date</label>
            <input
              type="text"
              value={current.last_updated}
              onChange={(e) => updateCurrentData({ ...current, last_updated: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] text-slate-400 mb-1">Page Title</label>
          <input
            type="text"
            value={current.title}
            onChange={(e) => updateCurrentData({ ...current, title: e.target.value })}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-bold"
          />
        </div>

        <div>
          <label className="block text-[11px] text-slate-400 mb-1">Subtitle</label>
          <textarea
            rows={2}
            value={current.subtitle}
            onChange={(e) => updateCurrentData({ ...current, subtitle: e.target.value })}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs leading-relaxed"
          />
        </div>

        {/* TL;DR Summary Box */}
        <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/20 space-y-2">
          <label className="block text-xs font-bold text-blue-300">TL;DR Highlight Summary</label>
          <textarea
            rows={2}
            value={current.tldr_content}
            onChange={(e) => updateCurrentData({ ...current, tldr_content: e.target.value })}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs leading-relaxed"
          />
        </div>

        {/* Clauses Repeater */}
        <div className="space-y-3 pt-3 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <FileText size={14} className="text-purple-400" />
              <span>Policy Clauses ({current.sections.length})</span>
            </h3>

            <button
              onClick={addClause}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              <Plus size={12} />
              <span>Add Clause</span>
            </button>
          </div>

          <div className="space-y-3">
            {current.sections.map((sec: any, idx: number) => (
              <div key={sec.id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400">Clause #{idx + 1}</span>
                  <button
                    onClick={() => removeClause(sec.id)}
                    className="p-1 text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <input
                  type="text"
                  value={sec.title}
                  onChange={(e) => {
                    const next = [...current.sections];
                    next[idx].title = e.target.value;
                    updateCurrentData({ ...current, sections: next });
                  }}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-white text-xs font-bold"
                />

                <textarea
                  rows={3}
                  value={sec.content}
                  onChange={(e) => {
                    const next = [...current.sections];
                    next[idx].content = e.target.value;
                    updateCurrentData({ ...current, sections: next });
                  }}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-300 text-xs leading-relaxed"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
