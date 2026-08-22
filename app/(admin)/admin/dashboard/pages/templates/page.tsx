"use client";

import React, { useState } from 'react';
import { useAdminDraftStore } from '@/store/adminDraftStore';
import { PageHeader, Card, FormField } from '@/components/admin/ui';
import { FileText, Sparkles, Filter } from 'lucide-react';
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
      <PageHeader
        icon={FileText}
        iconColor="text-blue-600 dark:text-blue-400"
        title="Templates Gallery Page Controller (/templates)"
        description="Customize the header, badge pill, description, and filter category labels for the template showcase gallery."
        onStage={handleStage}
        saved={saved}
      />

      <Card title="Gallery Header & Copy" icon={Sparkles}>
        <div className="space-y-4">
          <FormField
            label="Badge Pill Text"
            value={content.badge_text}
            onChange={(e) => setContent({ ...content, badge_text: e.target.value })}
          />

          <FormField
            label="Page Main Title"
            bold
            value={content.title}
            onChange={(e) => setContent({ ...content, title: e.target.value })}
          />

          <FormField
            label="Subtitle Paragraph"
            multiline
            rows={3}
            value={content.subtitle}
            onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
          />
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 dark:text-slate-200 flex items-center gap-2">
            <Filter size={14} className="text-purple-600 dark:text-purple-400" />
            <span>Category Filter Tabs</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {content.filter_tabs.map((tab: any, idx: number) => (
              <div key={tab.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm dark:shadow-none">
                <span className="text-xs font-mono text-slate-500">{tab.id}</span>
                <input
                  type="text"
                  value={tab.label}
                  onChange={(e) => {
                    const next = [...content.filter_tabs];
                    next[idx].label = e.target.value;
                    setContent({ ...content, filter_tabs: next });
                  }}
                  className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white shadow-sm dark:shadow-none focus:outline-none focus:border-blue-500"
                />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
