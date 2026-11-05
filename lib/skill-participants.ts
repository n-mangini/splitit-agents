import type { RoleGroup } from "./skills.ts";

const UNASSIGNED = "unassigned";

function participantKey(owner: string): string {
  return owner.trim().toLowerCase() || UNASSIGNED;
}

export function listParticipants(groups: readonly RoleGroup[]) {
  const participants = new Map<string, { value: string; label: string; count: number }>();
  for (const group of groups) {
    for (const skill of group.skills) {
      const value = participantKey(skill.owner);
      const existing = participants.get(value);
      if (existing) {
        existing.count += 1;
      } else {
        participants.set(value, {
          value,
          label: skill.owner.trim() || "Sin participante",
          count: 1,
        });
      }
    }
  }
  return [...participants.values()].sort((a, b) => {
    if (a.value === UNASSIGNED) return 1;
    if (b.value === UNASSIGNED) return -1;
    return a.label.localeCompare(b.label, "es");
  });
}

export function filterByParticipant(
  groups: readonly RoleGroup[],
  participant: string,
): readonly RoleGroup[] {
  if (!participant) return groups;
  const key = participantKey(participant);
  return groups.map((group) => ({
    ...group,
    skills: group.skills.filter((skill) => participantKey(skill.owner) === key),
  }));
}
