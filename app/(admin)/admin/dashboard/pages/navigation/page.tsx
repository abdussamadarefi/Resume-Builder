"use client";

import React, { useState } from 'react';
import { useAdminDraftStore } from '@/store/adminDraftStore';
import { PageHeader, Card, FormField } from '@/components/admin/ui';
import { Navigation, Plus, Trash2 } from 'lucide-react';
import navigationDefault from '@/content/navigation.json';

export default function NavigationPageCMS() {
  const { stageFile, stagedFiles } = useAdminDraftStore();

  const [nav, setNav] = useState(() => {
    if (stagedFiles['content/navigation.json']) {
      try {
        return JSON.parse(stagedFiles['content/navigation.json'].content);
      } catch { }
    }
    return navigationDefault;
  });

  const [saved, setSaved] = useState(false);

  const handleStage = () => {
    stageFile('content/navigation.json', JSON.stringify(nav, null, 2), 'Global Navbar & Footer Links');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const addNavbarLink = () => {
    const newL = {
      id: `nav_${Date.now()}`,
      label: 'New Link',
      url: '/',
      order: nav.navbar.length,
      enabled: true,
    };
    setNav({ ...nav, navbar: [...nav.navbar, newL] });
  };

  const removeNavbarLink = (id: string) => {
    setNav({ ...nav, navbar: nav.navbar.filter((l: any) => l.id !== id) });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        icon={Navigation}
        iconColor="text-blue-600 dark:text-blue-400"
        title="Navigation & Footer Controller"
        description="Configure header navigation links, navbar CTA button, footer link columns, and copyright statement."
        onStage={handleStage}
        saved={saved}
      />

      {/* Navbar Links */}
      <Card
        title="Header Navbar Links"
        headerRight={
          <button
            type="button"
            onClick={addNavbarLink}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shadow-sm"
          >
            <Plus size={13} />
            <span>Add Link</span>
          </button>
        }
      >
        <div className="space-y-2.5">
          {nav.navbar.map((link: any, idx: number) => (
            <div key={link.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-sm dark:shadow-none">
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => {
                    const next = [...nav.navbar];
                    next[idx].label = e.target.value;
                    setNav({ ...nav, navbar: next });
                  }}
                  placeholder="Label"
                  className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded text-slate-900 dark:text-white text-xs font-medium w-1/3 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  value={link.url}
                  onChange={(e) => {
                    const next = [...nav.navbar];
                    next[idx].url = e.target.value;
                    setNav({ ...nav, navbar: next });
                  }}
                  placeholder="URL (e.g. /templates)"
                  className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded text-slate-700 dark:text-slate-300 text-xs font-mono flex-1 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="button"
                onClick={() => removeNavbarLink(link.id)}
                className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                title="Delete link"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Navbar CTA Button */}
        <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800/80">
          <label className="block text-xs font-bold text-blue-600 dark:text-blue-400 mb-2">Navbar Primary Action Button</label>
          <div className="grid grid-cols-2 gap-3">
            <FormField
              label="Button Label"
              value={nav.navbar_cta.label}
              onChange={(e) => setNav({ ...nav, navbar_cta: { ...nav.navbar_cta, label: e.target.value } })}
            />
            <FormField
              label="Target URL"
              mono
              value={nav.navbar_cta.url}
              onChange={(e) => setNav({ ...nav, navbar_cta: { ...nav.navbar_cta, url: e.target.value } })}
            />
          </div>
        </div>
      </Card>

      {/* Footer Settings */}
      <Card title="Footer Copy & Credits">
        <div className="space-y-4">
          <FormField
            label="Copyright Notice"
            value={nav.footer_copyright}
            onChange={(e) => setNav({ ...nav, footer_copyright: e.target.value })}
          />

          <FormField
            label="Creator Attribution Text"
            value={nav.footer_credit}
            onChange={(e) => setNav({ ...nav, footer_credit: e.target.value })}
          />

          <FormField
            label="GitHub Repo URL"
            mono
            value={nav.footer_github_url}
            onChange={(e) => setNav({ ...nav, footer_github_url: e.target.value })}
          />
        </div>
      </Card>
    </div>
  );
}
