import { readSkillMarkdown } from "@/lib/skills";

export async function GET(
  request: Request,
  ctx: { params: Promise<{ role: string; slug: string }> },
) {
  const { role, slug } = await ctx.params;
  const markdown = await readSkillMarkdown(role, slug);
  if (markdown === null) {
    return new Response("Not found", { status: 404 });
  }

  const download = new URL(request.url).searchParams.has("dl");
  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      ...(download
        ? { "Content-Disposition": `attachment; filename="${slug}-SKILL.md"` }
        : {}),
    },
  });
}
