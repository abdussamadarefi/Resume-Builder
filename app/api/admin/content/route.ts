import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

// GET: Read any file in content/
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const file = searchParams.get('file');

    if (!file) {
      return NextResponse.json({ error: 'Query parameter "file" is required' }, { status: 400 });
    }

    // Security check: prevent path traversal
    const safePath = path.normalize(file).replace(/^(\.\.[\/\\])+/, '');
    const fullPath = path.join(CONTENT_DIR, safePath);

    if (!fullPath.startsWith(CONTENT_DIR)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const content = fs.readFileSync(fullPath, 'utf-8');

    if (safePath.endsWith('.json')) {
      try {
        const json = JSON.parse(content);
        return NextResponse.json({ path: safePath, content: json });
      } catch {
        return NextResponse.json({ path: safePath, raw: content });
      }
    }

    return NextResponse.json({ path: safePath, content });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}
