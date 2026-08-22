"use client";

import React, { useState } from 'react';
import { useAdminDraftStore } from '@/store/adminDraftStore';
import { Navigation, Save, CheckCircle2, Plus, Trash2, Globe } from 'lucide-react';
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Navigation className="text-blue-400" size={20} />
            <span>Navigation & Footer Controller</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure header navigation links, navbar CTA button, footer link columns, and copyright statement.
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

      {/* Navbar Links */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Header Navbar Links</h2>
          <button
            onClick={addNavbarLink}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-semibold"
          >
            <Plus size={13} />
            <span>Add Link</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {nav.navbar.map((link: any, idx: number) => (
            <div key={link.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3">
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
                  className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-white text-xs font-medium w-1/3"
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
                  className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-300 text-xs font-mono flex-1"
                />
              </div>

              <button
                onClick={() => removeNavbarLink(link.id)}
                className="p-1 text-slate-500 hover:text-rose-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Navbar CTA Button */}
        <div className="pt-3 border-t border-slate-800/80">
          <label className="block text-xs font-bold text-blue-400 mb-2">Navbar Primary Action Button</label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={nav.navbar_cta.label}
              onChange={(e) => setNav({ ...nav, navbar_cta: { ...nav.navbar_cta, label: e.target.value } })}
              placeholder="Button Label"
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
            />
            <input
              type="text"
              value={nav.navbar_cta.url}
              onChange={(e) => setNav({ ...nav, navbar_cta: { ...nav.navbar_cta, url: e.target.value } })}
              placeholder="Target URL"
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono"
            />
          </div>
        </div>
      </div>

      {/* Footer Settings */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-white">Footer Copy & Credits</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Copyright Notice</label>
            <input
              type="text"
              value={nav.footer_copyright}
              onChange={(e) => setNav({ ...nav, footer_copyright: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Creator Attribution Text</label>
            <input
              type="text"
              value={nav.footer_credit}
              onChange={(e) => setNav({ ...nav, footer_credit: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">GitHub Repo URL</label>
            <input
              type="text"
              value={nav.footer_github_url}
              onChange={(e) => setNav({ ...nav, footer_github_url: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
