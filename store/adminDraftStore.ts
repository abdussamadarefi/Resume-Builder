import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface StagedFile {
  path: string; // e.g. "content/landing.json"
  content: string; // serialized JSON or Markdown string
  label: string; // human readable name, e.g. "Landing Page Hero"
  timestamp: number;
}

interface AdminDraftStore {
  stagedFiles: Record<string, StagedFile>;
  stageFile: (path: string, content: string, label: string) => void;
  unstageFile: (path: string) => void;
  clearAllStaged: () => void;
  getStagedArray: () => StagedFile[];
  hasPendingChanges: () => boolean;
}

export const useAdminDraftStore = create<AdminDraftStore>()(
  persist(
    (set, get) => ({
      stagedFiles: {},

      stageFile: (path: string, content: string, label: string) => {
        set((state) => ({
          stagedFiles: {
            ...state.stagedFiles,
            [path]: {
              path,
              content,
              label,
              timestamp: Date.now(),
            },
          },
        }));
      },

      unstageFile: (path: string) => {
        set((state) => {
          const next = { ...state.stagedFiles };
          delete next[path];
          return { stagedFiles: next };
        });
      },

      clearAllStaged: () => {
        set({ stagedFiles: {} });
      },

      getStagedArray: () => {
        return Object.values(get().stagedFiles);
      },

      hasPendingChanges: () => {
        return Object.keys(get().stagedFiles).length > 0;
      },
    }),
    {
      name: 'rf_admin_draft_store',
    }
  )
);
