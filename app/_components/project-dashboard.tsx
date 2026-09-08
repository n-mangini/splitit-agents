"use client";

import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  GitPullRequest,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { RefreshConnectionsContext } from "@/app/_components/app-shell";
import { Button } from "@/components/ui/button";
import type { GithubReport, WeeklyHours } from "@/lib/github-report";
import { buildTicketReport, type TimeEntryCatalog } from "@/lib/time-entry-report";
import { cn } from "@/lib/utils";

const MILESTONES = [
  { date: "2026-08-20", title: "Entorno operativo" },
  { date: "2026-09-17", title: "Creación de eventos" },
  { date: "2026-10-15", title: "MVP gastos" },
  { date: "2026-11-12", title: "Entrega final" },
] as const;

export function ProjectDashboard({ catalog }: { readonly catalog: TimeEntryCatalog }) {
  const refreshConnections = useContext(RefreshConnectionsContext);
  const [refreshing, setRefreshing] = useState(false);
  const [github, setGithub] = useState<GithubReport | null>(null);
  const [githubError, setGithubError] = useState(false);
  const tickets = buildTicketReport(catalog.tickets);
  const totalEstimate = tickets.reduce((sum, ticket) => sum + (ticket.estimate ?? 0), 0);
  const totalEarned = tickets.reduce((sum, ticket) => sum + ticket.earned, 0);
  const progress = totalEstimate === 0 ? 0 : Math.round(totalEarned / totalEstimate * 100);
  const done = tickets.filter((ticket) => isDone(ticket.status)).length;
  const active = tickets.filter((ticket) => !isDone(ticket.status));
  const missingHours = tickets.filter((ticket) => ticket.hours === null).length;
  const missingPlan = tickets.filter((ticket) => !ticket.planned).length;
  const today = dateKey(new Date());
  const nextMilestone = MILESTONES.find((milestone) => milestone.date >= today);

  const refreshConnection = async (force = true) => {
    setRefreshing(true);
    try {
      const [, githubResponse] = await Promise.all([
        refreshConnections(),
        fetch("/api/github", { cache: "no-store", method: force ? "POST" : "GET" }),
      ]);
      if (!githubResponse.ok) throw new Error("GitHub unavailable");
      setGithub(await githubResponse.json() as GithubReport);
      setGithubError(false);
    } catch {
      setGithubError(true);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    void refreshConnection(false);
  }, []);

  return (
    <main className="min-w-0 px-4 py-6 sm:px-7 lg:px-10 lg:py-8 xl:px-12">
        <header className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">{formatLongDate(new Date())}</p>
            <h1 className="text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">Estado del proyecto</h1>
            <p className="mt-1 text-sm text-muted-foreground">Lo importante de SplitIt, sin reconstruirlo entre herramientas.</p>
          </div>
          <Button className="w-fit" disabled={refreshing} onClick={() => void refreshConnection()}>
            <RefreshCw className={cn(refreshing && "animate-spin")} /> Actualizar fuentes
          </Button>
        </header>

        <section className="mt-6 overflow-hidden rounded-xl bg-foreground text-background" aria-labelledby="attention-title">
          <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,.7fr)] lg:items-end">
            <div>
              <div className="flex items-center gap-2 text-xs text-background/65">
                <AlertTriangle className="size-4 text-primary" aria-hidden="true" />
                Requiere atención
              </div>
              <h2 className="mt-3 max-w-2xl text-xl font-semibold tracking-[-0.025em] sm:text-2xl" id="attention-title">
                {active.length > 0 ? `${active.length} tickets siguen abiertos antes del próximo hito.` : "El alcance registrado está completo."}
              </h2>
              <p className="mt-2 text-sm leading-6 text-background/65">
                {missingPlan > 0 ? `${missingPlan} tickets no tienen semana planificada y ` : ""}{missingHours} no tienen horas reales cargadas.
                {github?.missingHours ? ` Además, ${github.missingHours} PRs no declararon tiempo real.` : ""}
              </p>
            </div>
            <Link className="group flex items-center justify-between border-t border-white/15 pt-4 text-sm font-medium lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0" href="/horas">
              Revisar datos faltantes
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        <dl className="mt-6 grid overflow-hidden rounded-xl border bg-card sm:grid-cols-2 xl:grid-cols-4 xl:divide-x" aria-label="Resumen del proyecto">
          <Metric label="Avance ganado" value={`${progress}%`} note={`${done} de ${tickets.length} tickets cerrados`} />
          <Metric label="Trabajo abierto" value={String(active.length)} note={active.length === 1 ? "ticket activo" : "tickets activos"} />
          <Metric label="PRs abiertas" value={github ? String(github.open.length) : "—"} note={github ? `${github.missingHours} PRs sin horas` : githubError ? "GitHub sin conexión" : "Consultando GitHub"} />
          <Metric label="Próximo hito" value={nextMilestone ? `${daysUntil(nextMilestone.date)} días` : "—"} note={nextMilestone?.title ?? "Plan completado"} />
        </dl>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,.6fr)]">
          <section className="rounded-xl border bg-card" aria-labelledby="github-hours-title">
            <div className="flex items-start justify-between gap-4 border-b px-5 py-4">
              <div>
                <h2 className="flex items-center gap-2 text-sm font-semibold" id="github-hours-title"><GitPullRequest className="size-4" /> Horas por PR</h2>
                <p className="mt-1 text-xs text-muted-foreground">Cada PR cuenta en la semana en que fue abierto.</p>
              </div>
              <a className="text-xs font-medium text-primary-ink hover:underline" href="https://github.com/SplitItLab/SplitIt/pulls" rel="noreferrer" target="_blank">Ver GitHub</a>
            </div>
            <GithubHours error={githubError} report={github} />
          </section>

          <section className="rounded-xl border bg-card" aria-labelledby="milestones-title">
            <div className="border-b px-5 py-4">
              <h2 className="text-sm font-semibold" id="milestones-title">Hitos</h2>
              <p className="mt-1 text-xs text-muted-foreground">Fechas acordadas del proyecto.</p>
            </div>
            <ol className="p-5">
              {MILESTONES.map((milestone, index) => {
                const complete = milestone.date < today;
                const current = milestone === nextMilestone;
                return (
                  <li className="relative flex gap-3 pb-5 last:pb-0" key={milestone.date}>
                    <span className={cn("relative z-10 mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border bg-card", (complete || current) && "border-primary")}>
                      {complete ? <CheckCircle2 className="size-3.5 text-primary" /> : <span className={cn("size-1.5 rounded-full bg-border", current && "bg-primary")} />}
                    </span>
                    {index < MILESTONES.length - 1 ? <span className="absolute bottom-0 left-[9px] top-5 w-px bg-border" /> : null}
                    <div className="min-w-0 flex-1">
                      <p className={cn("text-sm", current && "font-semibold")}>{milestone.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{formatShortDate(milestone.date)}{current ? ` · faltan ${daysUntil(milestone.date)} días` : ""}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>

        {catalog.issues.length > 0 ? (
          <section className="mt-6 rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm" aria-label="Problemas en los datos">
            <strong>{catalog.issues.length} archivos necesitan revisión.</strong>{" "}
            <Link className="font-medium underline underline-offset-4" href="/horas">Ver detalle</Link>
          </section>
        ) : null}
    </main>
  );
}

function Metric({ label, note, value }: { readonly label: string; readonly note: string; readonly value: string }) {
  return (
    <div className="border-b p-5 last:border-b-0 sm:border-b-0">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-2 font-mono text-2xl font-semibold tracking-[-0.04em] tabular-nums">{value}</dd>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
    </div>
  );
}

function GithubHours({ error, report }: { readonly error: boolean; readonly report: GithubReport | null }) {
  if (error) return <p className="p-5 text-sm text-muted-foreground">No se pudo leer GitHub. Revisá el conector.</p>;
  if (!report) return <p className="p-5 text-sm text-muted-foreground">Consultando PRs…</p>;

  return (
    <div className="p-5">
      {report.open.length > 0 ? (
        <div className="mb-5 divide-y border-y">
          {report.open.map((pull) => (
            <a className="flex items-center gap-3 py-3 text-sm hover:text-primary-ink" href={pull.url} key={pull.number} rel="noreferrer" target="_blank">
              <span className="font-mono text-xs text-muted-foreground">#{pull.number}</span>
              <span className="min-w-0 flex-1 truncate">{pull.title}</span>
              <span className="font-mono text-xs tabular-nums">{pull.actual === null ? "Sin horas" : `${formatHours(pull.actual)} h`}</span>
            </a>
          ))}
        </div>
      ) : null}

      <div className="divide-y">
        {report.weeks.slice(0, 4).map((week) => <WeekRow key={week.week} week={week} />)}
      </div>
      <p className="mt-4 text-[11px] text-muted-foreground">Actualizado {formatUpdated(report.fetchedAt)} · corte automático: jueves, 09:00 (Argentina).</p>
    </div>
  );
}

function WeekRow({ week }: { readonly week: WeeklyHours }) {
  return (
    <div className="py-3 first:pt-0 last:pb-0">
      <div className="grid grid-cols-[1fr_auto_auto] items-baseline gap-4 text-sm">
        <span className="font-medium">Semana del {formatShortDate(week.week)}</span>
        <span className="font-mono text-xs tabular-nums">{formatHours(week.actual)} h / {formatHours(week.estimated)} h</span>
        <span className={cn("font-mono text-xs tabular-nums", week.variance > 0 ? "text-destructive" : "text-primary-ink")}>{formatVariance(week.variance)}</span>
      </div>
      <div className="mt-1 space-y-1 text-xs text-muted-foreground">
        {week.people.map((person) => (
          <div className="flex justify-between gap-4" key={person.author}>
            <span>{person.author} · {person.pulls} {person.pulls === 1 ? "PR" : "PRs"}</span>
            <span className="font-mono tabular-nums">{formatHours(person.actual)} h · {formatVariance(person.variance)}</span>
          </div>
        ))}
        {week.people.length === 0 ? <p>Sin horas reportadas.</p> : null}
      </div>
      <p className="mt-1 text-[11px] text-muted-foreground">{week.reported} de {week.total} PRs con horas</p>
    </div>
  );
}

function isDone(status: string): boolean {
  return /^(done|completado|completed)$/i.test(status.trim());
}

function dateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function parseDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

function daysUntil(value: string): number {
  return Math.max(0, Math.round((parseDate(value).getTime() - parseDate(dateKey(new Date())).getTime()) / 86_400_000));
}

function formatLongDate(date: Date): string {
  return new Intl.DateTimeFormat("es-AR", { weekday: "long", day: "numeric", month: "long" }).format(date);
}

function formatShortDate(value: string): string {
  return new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "short" }).format(parseDate(value));
}

function formatHours(hours: number): string {
  return new Intl.NumberFormat("es-AR", { maximumFractionDigits: 1 }).format(hours);
}

function formatUpdated(value: string): string {
  return new Intl.DateTimeFormat("es-AR", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

function formatVariance(hours: number): string {
  if (hours === 0) return "0 h";
  return `${hours > 0 ? "+" : "−"}${formatHours(Math.abs(hours))} h`;
}
