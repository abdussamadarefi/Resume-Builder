"use client";

import React, { useState } from 'react';
import { useAdminDraftStore } from '@/store/adminDraftStore';
import { useDraftState } from '@/hooks/useDraftState';
import { PageHeader, TabBar, Card, FormField } from '@/components/admin/ui';
import { ShieldAlert, FileText, Plus, Trash2, ShieldCheck, Scale, Cookie } from 'lucide-react';
import privacyDefault from '@/content/legal/privacy.json';
import termsDefault from '@/content/legal/terms.json';
import cookiesDefault from '@/content/legal/cookies.json';

export default function LegalPoliciesCMS() {
  const { stageFile } = useAdminDraftStore();
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'cookies'>('privacy');

  const [privacy, setPrivacy] = useDraftState('content/legal/privacy.json', privacyDefault);
  const [terms, setTerms] = useDraftState('content/legal/terms.json', termsDefault);
  const [cookies, setCookies] = useDraftState('content/legal/cookies.json', cookiesDefault);
  const [saved, setSaved] = useState(false);

  const getCurrentData = () => {
    switch (activeTab) {
      case 'privacy':
        return privacy;
      case 'terms':
        return terms;
      case 'cookies':
        return cookies;
    }
  };

  const updateCurrentData = (updated: any) => {
    switch (activeTab) {
      case 'privacy':
        setPrivacy(updated);
        break;
      case 'terms':
        setTerms(updated);
        break;
      case 'cookies':
        setCookies(updated);
        break;
    }
  };

  const handleStageAll = () => {
    stageFile('content/legal/privacy.json', JSON.stringify(privacy, null, 2), 'Legal: Privacy Policy');
    stageFile('content/legal/terms.json', JSON.stringify(terms, null, 2), 'Legal: Terms of Service');
    stageFile('content/legal/cookies.json', JSON.stringify(cookies, null, 2), 'Legal: Cookie Policy');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const current = getCurrentData();

  const addClause = () => {
    const newSec = {
      id: `sec_${Date.now()}`,
      title: 'New Section Title',
      content: 'Clause text content goes here...',
    };
    updateCurrentData({
      ...current,
      sections: [...current.sections, newSec],
    });
  };

  const removeClause = (id: string) => {
    updateCurrentData({
      ...current,
      sections: current.sections.filter((s: any) => s.id !== id),
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        icon={ShieldAlert}
        title="Legal Compliance & Policies CMS"
        description="Edit your Privacy Policy, Terms of Service, and Cookie Policy with live preview clauses and TL;DR summaries."
        onStage={handleStageAll}
        saved={saved}
      />

      <TabBar
        active={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
          { id: 'terms', label: 'Terms of Service', icon: Scale },
          { id: 'cookies', label: 'Cookie Policy', icon: Cookie },
        ]}
      />

      <Card title={`${current.title} Settings`} icon={FileText}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Policy Document Title"
              bold
              value={current.title}
              onChange={(e) => updateCurrentData({ ...current, title: e.target.value })}
            />

            <FormField
              label="Last Updated Date (YYYY-MM-DD)"
              value={current.last_updated}
              onChange={(e) => updateCurrentData({ ...current, last_updated: e.target.value })}
            />
          </div>

          <FormField
            label="Introductory Subtitle"
            multiline
            rows={2}
            value={current.subtitle}
            onChange={(e) => updateCurrentData({ ...current, subtitle: e.target.value })}
          />

          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-3">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">TL;DR Highlight Callout Box</span>
            <FormField
              label="TL;DR Headline"
              value={current.tldr_headline}
              onChange={(e) => updateCurrentData({ ...current, tldr_headline: e.target.value })}
            />
            <FormField
              label="TL;DR Summary"
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
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors shadow-sm border border-slate-200 dark:border-slate-700"
              >
                <Plus size={12} />
                <span>Add Clause</span>
              </button>
            </div>

            <div className="space-y-3">
              {current.sections.map((sec: any, idx: number) => (
                <div key={sec.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm dark:shadow-none">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Clause #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeClause(sec.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                      title="Delete Clause"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <FormField
                    bold
                    value={sec.title}
                    onChange={(e) => {
                      const next = [...current.sections];
                      next[idx].title = e.target.value;
                      updateCurrentData({ ...current, sections: next });
                    }}
                  />

                  <FormField
                    multiline
                    rows={3}
                    value={sec.content}
                    onChange={(e) => {
                      const next = [...current.sections];
                      next[idx].content = e.target.value;
                      updateCurrentData({ ...current, sections: next });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
