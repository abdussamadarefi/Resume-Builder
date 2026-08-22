"use client";

import React, { useState } from 'react';
import { useAdminDraftStore } from '@/store/adminDraftStore';
import { PageHeader, Card, FormField, TabBar } from '@/components/admin/ui';
import { ShieldAlert, FileText, Plus, Trash2 } from 'lucide-react';
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
      <PageHeader
        icon={ShieldAlert}
        iconColor="text-blue-600 dark:text-blue-400"
        title="Legal Policies CMS (/privacy, /terms, /cookies)"
        description="Edit the plain-English summaries, last updated dates, and individual legal clauses."
        onStage={handleStageAll}
        saved={saved}
      />

      <TabBar
        tabs={[
          { id: 'privacy', label: 'Privacy Policy' },
          { id: 'terms', label: 'Terms of Service' },
          { id: 'cookies', label: 'Cookie Policy' },
        ]}
        activeTab={activePolicy}
        onChange={(id) => setActivePolicy(id as any)}
      />

      {/* Policy Details */}
      <Card title="Policy Header & Highlights" icon={FileText}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Badge Text"
            value={current.badge}
            onChange={(e) => updateCurrentData({ ...current, badge: e.target.value })}
          />

          <FormField
            label="Last Updated Date"
            value={current.last_updated}
            onChange={(e) => updateCurrentData({ ...current, last_updated: e.target.value })}
          />
        </div>

        <FormField
          label="Page Title"
          bold
          value={current.title}
          onChange={(e) => updateCurrentData({ ...current, title: e.target.value })}
        />

        <FormField
          label="Subtitle"
          multiline
          rows={2}
          value={current.subtitle}
          onChange={(e) => updateCurrentData({ ...current, subtitle: e.target.value })}
        />

        {/* TL;DR Summary Box */}
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-500/20 space-y-2">
          <FormField
            label="TL;DR Highlight Summary"
            labelSub="Plain English overview at top of page"
            multiline
            rows={2}
            value={current.tldr_content}
            onChange={(e) => updateCurrentData({ ...current, tldr_content: e.target.value })}
          />
        </div>

        {/* Clauses Repeater */}
        <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
              <FileText size={14} className="text-purple-600 dark:text-purple-400" />
              <span>Policy Clauses ({current.sections.length})</span>
            </h3>

            <button
              type="button"
              onClick={addClause}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shadow-sm"
            >
              <Plus size={12} />
              <span>Add Clause</span>
            </button>
          </div>

          <div className="space-y-3">
            {current.sections.map((sec: any, idx: number) => (
              <div key={sec.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm dark:shadow-none">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500">Clause #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeClause(sec.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                    title="Delete clause"
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
                  className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:border-blue-500"
                />

                <textarea
                  rows={3}
                  value={sec.content}
                  onChange={(e) => {
                    const next = [...current.sections];
                    next[idx].content = e.target.value;
                    updateCurrentData({ ...current, sections: next });
                  }}
                  className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 text-xs leading-relaxed focus:outline-none focus:border-blue-500"
                />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
