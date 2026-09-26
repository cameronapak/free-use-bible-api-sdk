# Agents.md - Free Use Bible API SDK

## What this is
Guidance for agents working on the generated TypeScript SDK and OpenAPI specification for the Free Use Bible API. Keep answers concise, verify commands, and prefer links to source over duplication. See [`README`](README.md) for the public overview.

## Quickstart commands
- Install: `bun install`
- Full offline verification: `bun run check`
- Live API contracts: `bun run test:contract`
- Sync production spec: `bun run sync:spec`
- Regenerate SDK: `bun run generate`
- Build docs: `bun run build:docs` (writes `dist/redoc-static.html`)
- Add release metadata: `bun run changeset`

## Architecture overview
- `openapi.json` is a normalized snapshot of the production OpenAPI 3.1 specification.
- `scripts/sync-openapi.ts` downloads production and applies reviewed metadata normalization.
- Hey API generates the dependency-free Fetch client under `src/generated`.
- `scripts/patch-generated.ts` applies strict, count-checked compatibility fixes after generation.
- `src/index.ts` is the package entry point.

## Environment and configuration
- Tooling and package manager: Bun.
- Published runtime: ESM on Node.js 22.18+, Bun, or modern browsers.
- No environment variables or runtime dependencies are required.

## Project structure (high level)
- `openapi.json`: normalized production contract.
- `openapi-ts.config.ts`: generator configuration.
- `src/generated`: committed generated SDK and types.
- `scripts`: spec synchronization, generated patches, and drift checking.
- `tests`: offline transport tests, compile-time contracts, and live API contracts.

## Development workflow
- Do not hand-edit `openapi.json` or `src/generated`.
- For API updates: run `bun run sync:spec`, review the diff, update normalization when upstream metadata intentionally changes, then run `bun run generate`.
- Run `bun run check` before completion. Run `bun run test:contract` when network access is available.
- `bun run check:spec` and `bun run check:generated` detect drift without changing tracked files.
- Publishable changes require a Changeset. Never add a `publish` package script; the GitHub release workflow owns publishing.

## Deployment
- `bun run build` emits the publishable package to `dist`.
- `bun run build:docs` emits static documentation to `dist/redoc-static.html`.
- GitHub Actions runs offline package checks separately from production drift and contract checks.
- Changesets creates version PRs and publishes merged versions to npm through GitHub OIDC.

## Integrations
- API: https://bible.helloao.org
- Reference: https://bible.helloao.org/docs/reference/
- Content licenses vary by translation, commentary, and dataset. Do not treat the SDK's MIT license as a content license.

## References
- [`README`](README.md)
- [`openapi.json`](openapi.json)
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [Redocly CLI](https://redocly.com/docs/cli/)
