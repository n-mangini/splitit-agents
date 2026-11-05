import assert from "node:assert/strict";
import test from "node:test";
import { filterByParticipant, listParticipants } from "../lib/skill-participants.ts";
import { listSkills, type RoleGroup } from "../lib/skills.ts";

const groups: readonly RoleGroup[] = [
  {
    role: "pm", label: "Project Manager", skills: [
      { role: "pm", slug: "uno", name: "uno", owner: "@Ana", description: "", created: "" },
      { role: "pm", slug: "dos", name: "dos", owner: "", description: "", created: "" },
    ],
  },
  {
    role: "tl", label: "Tech Leader", skills: [
      { role: "tl", slug: "tres", name: "tres", owner: " @ana ", description: "", created: "" },
      { role: "tl", slug: "cuatro", name: "cuatro", owner: "@Beto", description: "", created: "" },
    ],
  },
];

test("agrupa participantes sin duplicar handles y conserva las skills sin owner", () => {
  assert.deepEqual(listParticipants(groups), [
    { value: "@ana", label: "@Ana", count: 2 },
    { value: "@beto", label: "@Beto", count: 1 },
    { value: "unassigned", label: "Sin participante", count: 1 },
  ]);
});

test("filtra todos los roles sin modificar el catálogo original y permite restablecerlo", () => {
  const before = structuredClone(groups);
  const filtered = filterByParticipant(groups, "@ANA");
  assert.deepEqual(filtered.map((group) => group.skills.map((skill) => skill.slug)), [["uno"], ["tres"]]);
  assert.deepEqual(groups, before);
  assert.deepEqual(filterByParticipant(groups, ""), groups);
});

test("permite filtrar sin participante y devuelve cero coincidencias para un handle ausente", () => {
  assert.deepEqual(filterByParticipant(groups, "unassigned").flatMap((group) => group.skills.map((skill) => skill.slug)), ["dos"]);
  assert.equal(filterByParticipant(groups, "@no-existe").flatMap((group) => group.skills).length, 0);
});

test("el filtro real muestra las diez skills de Marcos y los conteos coinciden con las tarjetas", async () => {
  const catalog = await listSkills();
  const participants = listParticipants(catalog);
  assert.equal(filterByParticipant(catalog, "@husseymarcos").flatMap((group) => group.skills).length, 10);
  for (const participant of participants) {
    const filtered = filterByParticipant(catalog, participant.value);
    assert.equal(filtered.flatMap((group) => group.skills).length, participant.count);
  }
  assert.equal(participants.reduce((total, participant) => total + participant.count, 0), catalog.flatMap((group) => group.skills).length);
});
