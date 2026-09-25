import { revalidateTag } from "next/cache";
import { getGithubReport, GITHUB_CACHE_TAG } from "@/lib/github";

export const dynamic = "force-dynamic";

async function reportResponse() {
  try {
    return Response.json(await getGithubReport(), { headers: { "cache-control": "no-store" } });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "No se pudo consultar GitHub" },
      { status: 502, headers: { "cache-control": "no-store" } },
    );
  }
}

export const GET = reportResponse;

export async function POST() {
  revalidateTag(GITHUB_CACHE_TAG, { expire: 0 });
  return reportResponse();
}
