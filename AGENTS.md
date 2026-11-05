<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.
<!-- END:nextjs-agent-rules -->

## Project scope

This is a Next.js catalog of reusable skills. Read `PRODUCT.md` and `DESIGN.md` before
changing the interface. The app lists `skills/<role>/<slug>/SKILL.md` and serves raw
Markdown for viewing, copying and downloading. Keep the root page focused on the catalog.

New or revised skills must adapt to the consuming project's sources and conventions.
Preserve owner metadata and other authors' content outside the requested changes.
There is no agent runtime, dashboard, time reporting, external connection or cron job.

## Verification

Run `npm test`, `npm run typecheck`, and `npm run build` after changes. Verify catalog
rendering and raw Markdown routes when changing the user flow. Do not add dependencies
without explicit approval.
