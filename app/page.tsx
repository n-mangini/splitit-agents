import type { Metadata } from "next";
import { SkillsCatalog } from "@/components/skills-catalog";
import { listSkills } from "@/lib/skills";

export const metadata: Metadata = {
  title: "Skills · SplitIt",
  description: "Instrucciones reutilizables para equipos de producto, gestión, desarrollo y calidad.",
};

export default async function SkillsPage() {
  return <SkillsCatalog groups={await listSkills()} />;
}
