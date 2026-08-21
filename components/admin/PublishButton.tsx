"use client";

import React, { useState } from 'react';
import { useAdminDraftStore } from '@/store/adminDraftStore';
import { CloudUpload, CheckCircle2, AlertCircle, Loader2, GitCommit, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PublishButton() {
  const { stagedFiles, getStagedArray, clearAllStaged, hasPendingChanges } = useAdminDraftStore();
  const [status, setStatus] = useState<'idle' | 'publishing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [commitUrl, setCommitUrl] = useState<string | null>(null);

  const pendingList = getStagedArray();
  const count = pendingList.length;

  const handlePublish = async () => {
    if (count === 0 || status === 'publishing') return;

    setStatus('publishing');
    setErrorMessage(null);
    setCommitUrl(null);

    try {
      const payload = {
        files: pendingList.map((f) => ({
          path: f.path,
          content: f.content,
        })),
      };

      const res = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to push to GitHub');
      }

      setStatus('success');
      clearAllStaged();

      if (data.commits && data.commits.length > 0) {
        setCommitUrl(data.commits[0].url);
      } else if (data.repoUrl) {
        setCommitUrl(data.repoUrl);
      }

      // Return to idle after 4 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 4000);
    } catch (err: any) {
      console.error('Publish error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Push failed');
    }
  };

  return (
    <div className="flex items-center gap-3">
      <AnimatePresence>
        {count > 0 && status === 'idle' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>{count} staged {count === 1 ? 'change' : 'changes'}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handlePublish}
        disabled={count === 0 || status === 'publishing'}
        className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
          count === 0 && status === 'idle'
            ? 'bg-slate-100 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700/50 cursor-not-allowed'
            : status === 'publishing'
            ? 'bg-blue-600/80 text-white cursor-wait'
            : status === 'success'
            ? 'bg-emerald-600 text-white border border-emerald-500 shadow-emerald-500/20 shadow-lg'
            : status === 'error'
            ? 'bg-rose-600 text-white border border-rose-500'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border border-blue-500/30 shadow-blue-500/20 shadow-md hover:scale-[1.02] active:scale-[0.98]'
        }`}
      >
        {status === 'publishing' && (
          <>
            <Loader2 size={14} className="animate-spin" />
            <span>Committing to GitHub...</span>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle2 size={14} />
            <span>Pushed to GitHub!</span>
          </>
        )}

        {status === 'error' && (
          <>
            <AlertCircle size={14} />
            <span>Failed — Retry</span>
          </>
        )}

        {status === 'idle' && (
          <>
            <CloudUpload size={14} className={count > 0 ? 'text-white' : 'text-slate-400 dark:text-slate-500'} />
            <span>Push to GitHub</span>
          </>
        )}
      </button>

      {commitUrl && (
        <a
          href={commitUrl}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-semibold"
        >
          <span>View Commit</span>
          <ExternalLink size={10} />
        </a>
      )}

      {errorMessage && (
        <span className="text-xs text-rose-500 truncate max-w-xs">{errorMessage}</span>
      )}
    </div>
  );
}
