import { getToken } from "@vercel/connect";
import { buildGithubReport, type GithubPull, type GithubReport } from "@/lib/github-report";

export const GITHUB_CACHE_TAG = "splitit-github-pulls";
const CONNECTOR = "github/splitit-github";
const PULLS_URL = "https://api.github.com/repos/SplitItLab/SplitIt/pulls?state=all&per_page=100";

export async function getGithubReport(): Promise<GithubReport> {
  const token = await getToken(CONNECTOR, {
    subject: { type: "app" },
    scopes: ["contents:read", "metadata:read", "pull_requests:read"],
  });
  const response = await fetch(PULLS_URL, {
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${token}`,
      "x-github-api-version": "2022-11-28",
    },
    next: { revalidate: 21_600, tags: [GITHUB_CACHE_TAG] },
  });

  if (!response.ok) throw new Error(`GitHub respondió ${response.status}`);
  return buildGithubReport(await response.json() as GithubPull[]);
}
