# Agents.md - OpenAPI Bible API Spec

## What this is
Guidance for Agents when working with this OpenAPI specification repository for the Free Use Bible API. Keep answers concise, verify commands, and prefer links to source over duplication. See [`README`](README.md) for overview.

## Quickstart commands
- Install: `bun install`
- Lint: `bun run lint`
- Build: `bun run build-docs` (generates `redoc-static.html`)
- Start/Preview: Open `redoc-static.html` in browser after build; no dev server.
- Test: `bun run lint` for validation; no unit tests.
- Lint/Format/Types: `bun run lint`; no format/typecheck scripts (use external tools if needed).
- Data export/sync: Not applicable (no dynamic data).

## Architecture overview
- Framework: OpenAPI 3.1.0 specification defining Bible API endpoints.
- Rendering: Static JSON; no SSG/SSR (use for API docs or code generation).
- Data flow:
  - Client requests to hosted API (https://bible.helloao.org).
  - Spec defines paths for translations, books, chapters with schemas.
  - Responses include Bible content, footnotes, audio links.
- Key modules: [`openapi.json`](openapi.json) (main spec), [`schemas.json`](schemas.json) (shared schemas), endpoint files (*.json).

## Environment and configuration
- Runtime: Bun (Node compatible), package manager: Bun.
- Env files: No environment variables needed.
- Required vars: None.
- See README for API server details.

## Project structure (high level)
- openapi.json: Main OpenAPI spec with paths and components ref.
- schemas.json: Shared JSON schemas for API objects (e.g., Translation, ChapterData).
- available-translations.json, list-books-translation.json, get-chapter-translation.json: Endpoint definitions (where to edit paths/parameters/responses).
- package.json, bun.lock, tsconfig.json: Dependencies and config.
- README.md: Project overview and file descriptions.

## Development workflow
- Typical loop: `bun install` → edit JSON files → `bun run lint` → `bun run build-docs` → commit → PR.
- Common tasks:
  - Validate spec: `bun run lint openapi.json`.
  - Preview docs: Run `bun run build-docs` and open `redoc-static.html`.
- Troubleshooting: Fix lint warnings (e.g., schema conformance); check examples against schemas; use [OpenAPI docs](https://spec.openapis.org/oas/latest.html).

## Deployment
- Hosting: Static file host (e.g., GitHub Pages, Vercel) for spec/docs; API hosted at bible.helloao.org.
- Build command: `bun run build-docs`; output: `redoc-static.html`.
- CI: No workflows; add GitHub Actions for lint on PR if needed.
- Post-deploy: Update API server if generating from spec.

## Integrations
- Bible API: Free, no-auth endpoints at https://bible.helloao.org/api (e.g., /available_translations, /{translation}/{book}/{chapter}); no rate limits noted; see [docs](https://bible.helloao.org/docs/reference/) for usage.
- Others: MIT licensed; integrate with tools like Swagger UI for rendering; audio links to openbible.com.

## References
- Source files: [`openapi.json`](openapi.json), [`schemas.json`](schemas.json).
- Dashboards: [Bible API](https://bible.helloao.org/docs/reference/).
- Read more: [`README`](README.md), [OpenAPI Spec](https://spec.openapis.org/oas/latest.html), [Redocly](https://redocly.com/docs/cli/).