import assert from "node:assert/strict";
import test from "node:test";
import { listSkills, readSkillMarkdown } from "../lib/skills.ts";

test("el catálogo conserva las skills de todos los autores y publica las diez reutilizables", async () => {
  const groups = await listSkills();
  assert.deepEqual(groups.map((group) => group.role), ["pm", "po", "qa", "tl"]);
  const skills = groups.flatMap((group) => group.skills);
  const owned = skills.filter((skill) => skill.owner === "@husseymarcos");
  assert.equal(owned.length, 10);
  assert.ok(skills.some((skill) => skill.owner === "@n-mangini"));
  assert.ok(skills.some((skill) => skill.owner === "@lucasmonteverdi1"));
  assert.ok(skills.some((skill) => skill.role === "qa" && skill.name === "frontend-screenshots"));
  assert.equal(new Set(skills.map((skill) => skill.name)).size, skills.length);
  for (const skill of owned) {
    assert.ok(skill.description.length > 0);
    assert.match(skill.created, /^\d{4}-\d{2}-\d{2}$/);
    const markdown = await readSkillMarkdown(skill.role, skill.slug);
    assert.ok(markdown);
    assert.doesNotMatch(markdown, /SplitIt|splitit|\/Users\/|sites-project:\/\//);
  }
});

test("cada skill listada se puede leer para copiar, ver o descargar", async () => {
  const groups = await listSkills();
  for (const group of groups) {
    for (const skill of group.skills) {
      const markdown = await readSkillMarkdown(group.role, skill.slug);
      assert.ok(markdown, `${group.role}/${skill.slug}`);
      assert.ok(markdown.startsWith("---\n"));
      assert.ok(markdown.includes(`name: ${skill.name}`));
    }
  }
});

test("el nuevo deck aparece una sola vez con su identificador reutilizable", async () => {
  assert.ok(await readSkillMarkdown("pm", "crear-deck-reveal"));
  assert.equal(await readSkillMarkdown("pm", "crear-deck-splitit"), null);
});

test("rechaza roles desconocidos y rutas fuera del catálogo", async () => {
  for (const [role, slug] of [
    ["unknown", "revisar-pr"],
    ["..", "README"],
    ["pm", "../README"],
    ["pm", "../../package.json"],
    ["pm", ""],
    ["pm", "no-existe"],
  ]) {
    assert.equal(await readSkillMarkdown(role, slug), null);
  }
});
