# Free Use Bible API SDK

A generated, type-safe TypeScript client for the [Free Use Bible API](https://bible.helloao.org). It covers all 24 operations in the production OpenAPI specification, including translations, simplified chapters, word annotations, audio timings, commentaries, cross references, and entity datasets.

The SDK uses the standard Fetch API, has no runtime dependencies, and works in Node.js 22.18 or newer, Bun, and modern browsers.

## Install

```sh
npm install free-use-bible-sdk
```

## Use

```ts
import {
  getAvailableTranslations,
  getSimpleTranslationBookChapter,
  getTranslationBookChapter,
} from 'free-use-bible-sdk'

const available = await getAvailableTranslations()
console.log(available.translations.length)

const chapter = await getTranslationBookChapter({
  path: { translation: 'BSB', book: 'ROM', chapter: 8 },
})
console.log(chapter.chapter.content)

const simple = await getSimpleTranslationBookChapter({
  path: { translation: 'BSB', book: 'ROM', chapter: 8 },
})
console.log(simple.chapter.content)
```

Requests use `https://bible.helloao.org` by default and throw parsed API errors for unsuccessful responses.

### Configure a client

Pass a client when you need a different base URL, custom Fetch implementation, headers, or other request options.

```ts
import { createClient, getTranslationBookChapter } from 'free-use-bible-sdk'

const client = createClient({
  baseUrl: 'https://bible.helloao.org',
  headers: { 'User-Agent': 'my-app/1.0' },
  throwOnError: true,
})

const chapter = await getTranslationBookChapter({
  client,
  path: { translation: 'BSB', book: 'GEN', chapter: 1 },
})
```

Every endpoint function and response type is exported from the package root. The normalized OpenAPI document is also available as `free-use-bible-sdk/openapi.json`.

## Content licenses

The MIT license covers this SDK and its OpenAPI document. It does not replace the license for any Bible translation, commentary, or dataset returned by the API. Read each resource's `licenseUrl`, `license`, `licenseNotes`, and `licenseNotice` fields before using or redistributing its content.

## Maintain

The production API specification is the source of truth. The sync step downloads it and applies a small deterministic normalization: the current API release version, package license metadata, explicit public security, and operation summaries required by strict linting.

```sh
bun install
bun run sync:spec
bun run generate
bun run check
bun run test:contract
```

- `bun run check:spec` detects production specification drift.
- `bun run check:generated` detects stale generated code.
- `bun run build:docs` writes Redoc HTML to `dist/redoc-static.html`.
- `bun run test:contract` checks representative production responses. It requires network access.

## Release

Add a Changeset for every publishable change:

```sh
bun run changeset
```

After a change reaches `main`, the Release workflow creates or updates a version PR. Merging that PR publishes to npm through Trusted Publishing, pushes the Git tag, and creates the GitHub Release. Do not add a package script named `publish`; it conflicts with npm's publish lifecycle.

### One-time trusted publisher setup

Before merging the first Changesets version PR:

1. In the `free-use-bible-sdk` npm settings, add a GitHub Actions trusted publisher for user `cameronapak`, repository `free-use-bible-api-sdk`, and workflow `release.yml`. Allow `npm publish`; do not set an environment.
2. In GitHub Actions settings, allow workflows to create and approve pull requests.
3. Merge the Changesets version PR. It will publish the breaking SDK redesign as `2.0.0` with npm provenance.

The release workflow intentionally uses no npm token or `NODE_AUTH_TOKEN`.

See [Agents.md](Agents.md) for repository guidance.
