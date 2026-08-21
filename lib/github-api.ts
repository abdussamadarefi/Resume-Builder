const GITHUB_API = 'https://api.github.com';
const OWNER = process.env.GITHUB_OWNER || 'abdussamadarefi';
const REPO = process.env.GITHUB_REPO || 'Resume-Builder';
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const TOKEN = process.env.GITHUB_TOKEN;

function getHeaders() {
  return {
    Authorization: `Bearer ${TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  };
}

export interface CommitFileItem {
  path: string;
  content: string;
}

export interface CommitResult {
  path: string;
  url: string;
  sha?: string;
}

/**
 * Fetches the current SHA of a file in the repository (required for updates)
 */
export async function getFileSha(filePath: string): Promise<string | null> {
  if (!TOKEN) return null;

  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${filePath}?ref=${BRANCH}`,
      { headers: getHeaders(), cache: 'no-store' }
    );

    if (!res.ok) return null;
    const data = await res.json();
    return data.sha || null;
  } catch (error) {
    console.error(`Error fetching SHA for ${filePath}:`, error);
    return null;
  }
}

/**
 * Commits a single file to the GitHub repository
 */
export async function commitFile(
  filePath: string,
  content: string,
  message: string
): Promise<CommitResult> {
  if (!TOKEN) {
    throw new Error('GITHUB_TOKEN environment variable is not configured.');
  }

  const sha = await getFileSha(filePath);
  const encodedContent = Buffer.from(content).toString('base64');

  const body: Record<string, unknown> = {
    message,
    content: encodedContent,
    branch: BRANCH,
  };

  if (sha) {
    body.sha = sha;
  }

  const res = await fetch(
    `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${filePath}`,
    {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(`GitHub API Error: ${err.message || 'Failed to commit file'}`);
  }

  const data = await res.json();
  return {
    path: filePath,
    url: data.commit?.html_url || `https://github.com/${OWNER}/${REPO}`,
    sha: data.content?.sha,
  };
}

/**
 * Commits multiple files to the GitHub repository sequentially
 */
export async function commitMultipleFiles(
  files: CommitFileItem[],
  message: string
): Promise<{ commits: CommitResult[]; repoUrl: string }> {
  if (!TOKEN) {
    throw new Error('GITHUB_TOKEN is missing. Please add GITHUB_TOKEN in your environment variables.');
  }

  const results: CommitResult[] = [];

  for (const file of files) {
    const res = await commitFile(file.path, file.content, message);
    results.push(res);
  }

  return {
    commits: results,
    repoUrl: `https://github.com/${OWNER}/${REPO}`,
  };
}
