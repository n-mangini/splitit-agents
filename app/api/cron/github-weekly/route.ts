import { revalidateTag } from "next/cache";
import { getGithubReport, GITHUB_CACHE_TAG } from "@/lib/github";

export async function GET(request: Request) {
  if (!process.env.CRON_SECRET || request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  revalidateTag(GITHUB_CACHE_TAG, { expire: 0 });
  const report = await getGithubReport();
  return Response.json({ ok: true, fetchedAt: report.fetchedAt, latestWeek: report.weeks[0] ?? null });
}
