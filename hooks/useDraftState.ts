"use client";

import { useState } from 'react';
import { useAdminDraftStore } from '@/store/adminDraftStore';

/**
 * Custom hook to initialize state from staged draft in Zustand store,
 * falling back to the default static JSON/Markdown content.
 */
export function useDraftState<T>(
  filePath: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>, boolean] {
  const stagedFiles = useAdminDraftStore((state) => state.stagedFiles);

  const [state, setState] = useState<T>(() => {
    const draft = stagedFiles[filePath];
    if (draft) {
      try {
        if (typeof defaultValue === 'string') {
          return draft.content as unknown as T;
        }
        return JSON.parse(draft.content) as T;
      } catch (err) {
        console.error(`Failed to parse draft for ${filePath}:`, err);
      }
    }
    return defaultValue;
  });

  const isDraft = Boolean(stagedFiles[filePath]);

  return [state, setState, isDraft];
}
