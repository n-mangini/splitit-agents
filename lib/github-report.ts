export type GithubPull = {
  readonly number: number;
  readonly title: string;
  readonly state: "open" | "closed";
  readonly html_url: string;
  readonly body: string | null;
  readonly created_at: string;
  readonly merged_at: string | null;
  readonly user: { readonly login: string };
};

export type PullRequestHours = {
  readonly number: number;
  readonly title: string;
  readonly author: string;
  readonly state: "open" | "closed";
  readonly url: string;
  readonly ticket: string | null;
  readonly createdAt: string;
  readonly estimated: number | null;
  readonly actual: number | null;
};

export type WeeklyHours = {
  readonly week: string;
  readonly estimated: number;
  readonly actual: number;
  readonly variance: number;
  readonly reported: number;
  readonly total: number;
  readonly people: readonly {
    readonly author: string;
    readonly estimated: number;
    readonly actual: number;
    readonly variance: number;
    readonly pulls: number;
  }[];
};

export type GithubReport = {
  readonly repository: "SplitItLab/SplitIt";
  readonly fetchedAt: string;
  readonly open: readonly PullRequestHours[];
  readonly weeks: readonly WeeklyHours[];
  readonly missingHours: number;
};

export function buildGithubReport(pulls: readonly GithubPull[], fetchedAt = new Date().toISOString()): GithubReport {
  const records = pulls.map(parsePullRequest);
  const byWeek = new Map<string, PullRequestHours[]>();

  for (const pull of records) {
    const week = mondayOf(pull.createdAt);
    byWeek.set(week, [...(byWeek.get(week) ?? []), pull]);
  }
  if (!byWeek.has(mondayOf(fetchedAt))) byWeek.set(mondayOf(fetchedAt), []);

  return {
    repository: "SplitItLab/SplitIt",
    fetchedAt,
    open: records.filter((pull) => pull.state === "open"),
    weeks: [...byWeek]
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([week, weekPulls]) => summarizeWeek(week, weekPulls)),
    missingHours: records.filter((pull) => pull.actual === null).length,
  };
}

function parsePullRequest(pull: GithubPull): PullRequestHours {
  const body = pull.body ?? "";
  const ticket = body.match(/SPT[-\s](\d+)/i)?.[1];
  return {
    number: pull.number,
    title: pull.title,
    author: pull.user.login,
    state: pull.state,
    url: pull.html_url,
    ticket: ticket ? `SPT-${ticket}` : null,
    createdAt: pull.created_at,
    estimated: parseTimeLine(body, "estimated", true),
    actual: parseTimeLine(body, "actual", false),
  };
}

function parseTimeLine(body: string, field: "estimated" | "actual", pointsAreHours: boolean): number | null {
  const line = body.match(new RegExp(`^${field}(?:\\s*\\([^)]*\\))?\\s*:\\s*(.+)$`, "im"))?.[1];
  if (!line || /\bX\b/i.test(line)) return null;
  const value = line.includes("=") ? line.split("=").at(-1) ?? "" : line;
  const matches = [...value.matchAll(/(\d+(?:[.,]\d+)?)\s*(points?|pts?|hours?|hrs?|hr|h|minutes?|mins?|min|m)\b/gi)];
  if (matches.length === 0) return null;

  return matches.reduce((hours, match) => {
    const amount = Number(match[1].replace(",", "."));
    const unit = match[2].toLowerCase();
    return hours + (unit.startsWith("m") ? amount / 60 : pointsAreHours || /^(points?|pts?|hours?|hrs?|hr|h)$/.test(unit) ? amount : 0);
  }, 0);
}

function summarizeWeek(week: string, pulls: readonly PullRequestHours[]): WeeklyHours {
  const reported = pulls.filter((pull) => pull.actual !== null);
  const estimated = reported.reduce((sum, pull) => sum + (pull.estimated ?? 0), 0);
  const actual = reported.reduce((sum, pull) => sum + (pull.actual ?? 0), 0);
  const authors = [...new Set(reported.map((pull) => pull.author))];

  return {
    week,
    estimated,
    actual,
    variance: actual - estimated,
    reported: reported.length,
    total: pulls.length,
    people: authors.map((author) => {
      const authored = reported.filter((pull) => pull.author === author);
      const authorEstimate = authored.reduce((sum, pull) => sum + (pull.estimated ?? 0), 0);
      const authorActual = authored.reduce((sum, pull) => sum + (pull.actual ?? 0), 0);
      return { author, estimated: authorEstimate, actual: authorActual, variance: authorActual - authorEstimate, pulls: authored.length };
    }),
  };
}

function mondayOf(value: string): string {
  const date = new Date(value);
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() - day + 1);
  return date.toISOString().slice(0, 10);
}
