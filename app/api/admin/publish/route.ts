import { NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { commitMultipleFiles } from '@/lib/github-api';

const CONTENT_DIR = path.join(process.cwd(), 'content');

const PublishSchema = z.object({
  files: z.array(
    z.object({
      path: z.string(), // e.g. "content/landing.json"
      content: z.string(), // file contents
    })
  ),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { files, message } = PublishSchema.parse(json);

    if (files.length === 0) {
      return NextResponse.json(
        { error: 'No files to commit' },
        { status: 400 }
      );
    }

    // 1. In local environment or alongside remote, update local files directly
    for (const item of files) {
      const relPath = item.path.replace(/^content[\/\\]/, '');
      const fullPath = path.join(CONTENT_DIR, relPath);
      const parentDir = path.dirname(fullPath);

      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }

      fs.writeFileSync(fullPath, item.content, 'utf-8');
    }

    const timestamp = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const commitMessage = message || `cms: update content (${files.length} files) — ${timestamp}`;

    // 2. If GITHUB_TOKEN is available, commit directly to the GitHub repository
    let githubResult = null;
    if (process.env.GITHUB_TOKEN) {
      try {
        githubResult = await commitMultipleFiles(files, commitMessage);
      } catch (ghErr: any) {
        console.warn('GitHub commit failed (local files were still updated):', ghErr);
        return NextResponse.json({
          success: true,
          localUpdated: true,
          githubCommitted: false,
          warning: `Local files updated. GitHub sync warning: ${ghErr.message}`,
          filesCount: files.length,
        });
      }
    }

    return NextResponse.json({
      success: true,
      localUpdated: true,
      githubCommitted: !!githubResult,
      commits: githubResult?.commits || [],
      repoUrl: githubResult?.repoUrl || null,
      message: `${files.length} file(s) published successfully.`,
    });
  } catch (err: any) {
    console.error('Publish error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to publish changes' },
      { status: 500 }
    );
  }
}
