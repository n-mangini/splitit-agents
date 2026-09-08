import assert from "node:assert/strict";
import test from "node:test";
import { buildGithubReport, type GithubPull } from "../lib/github-report.ts";

test("agrupa horas de PR por semana y soporta minutos, horas y sumas", () => {
  const pull = (number: number, author: string, createdAt: string, body: string): GithubPull => ({
    number,
    title: `PR ${number}`,
    state: number === 1 ? "open" : "closed",
    html_url: `https://github.com/SplitItLab/SplitIt/pull/${number}`,
    body,
    created_at: createdAt,
    merged_at: null,
    user: { login: author },
  });
  const report = buildGithubReport([
    pull(1, "Mateo", "2026-09-03T23:14:59Z", "estimated: 4 points\nactual: 55 m"),
    pull(2, "Mateo", "2026-09-04T12:00:00Z", "estimated: 3 points\nactual (until merge): 1 hr + 1.5 hr = 2.5 hr"),
    pull(3, "Feli", "2026-09-04T12:00:00Z", "estimated: X points\nactual: X hr"),
  ], "2026-09-04T12:00:00Z");

  assert.equal(report.open.length, 1);
  assert.equal(report.weeks[0].week, "2026-08-31");
  assert.equal(report.weeks[0].reported, 2);
  assert.equal(report.weeks[0].total, 3);
  assert.equal(report.weeks[0].actual, 55 / 60 + 2.5);
  assert.equal(report.weeks[0].estimated, 7);
  assert.equal(report.missingHours, 1);
});
