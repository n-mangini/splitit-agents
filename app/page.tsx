import { ProjectDashboard } from "@/app/_components/project-dashboard";
import { listTickets } from "@/lib/time-entries";

export default async function Page() {
  return <ProjectDashboard catalog={await listTickets()} />;
}
