const UPSTREAM_SPEC_URL = 'https://bible.helloao.org/openapi.json'
const API_VERSION = '1.15.0'
const EXPECTED_UPSTREAM_VERSION = '1.0.0'

const operationSummaries: Record<string, string> = {
  getAvailableTranslations: 'List available Bible translations',
  getTranslationBooks: 'List books in a translation',
  getTranslationBookChapter: 'Get a chapter from a translation',
  getSimpleTranslationBookChapter: 'Get a simplified chapter from a translation',
  getTranslationBookChapterAudioTimings: 'Get audio timings for a chapter',
  getTranslationBookChapterWords: 'Get word annotations for a chapter',
  getSimpleTranslationBookChapterWords: 'Get simplified word annotations for a chapter',
  getTranslationComplete: 'Download a complete translation',
  getSimpleTranslationComplete: 'Download a complete simplified translation',
  getAvailableCommentaries: 'List available commentaries',
  getCommentaryBooks: 'List books in a commentary',
  getCommentaryBookChapter: 'Get a chapter from a commentary',
  getSimpleCommentaryBookChapter: 'Get a simplified chapter from a commentary',
  getAvailableDatasets: 'List available datasets',
  getDatasetBooks: 'List books in a dataset',
  getDatasetBookChapter: 'Get chapter data from a dataset',
  getDatasetPeople: 'List people in a dataset',
  getDatasetPerson: 'Get a person from a dataset',
  getDatasetPlaces: 'List places in a dataset',
  getDatasetPlace: 'Get a place from a dataset',
  getDatasetEvents: 'List events in a dataset',
  getDatasetEvent: 'Get an event from a dataset',
  getDatasetPeopleGroups: 'List people groups in a dataset',
  getDatasetPeopleGroup: 'Get a people group from a dataset',
}

type Operation = {
  operationId?: string
  summary?: string
}

type OpenApiDocument = {
  openapi: string
  info: {
    version: string
    license?: {
      name: string
      identifier: string
    }
  }
  paths: Record<string, Record<string, Operation>>
  security?: unknown[]
}

function assertExpectedUpstreamMetadata(document: OpenApiDocument): void {
  if (document.info.version !== EXPECTED_UPSTREAM_VERSION) {
    throw new Error(
      `Upstream changed info.version from ${EXPECTED_UPSTREAM_VERSION} to ${document.info.version}. Review API_VERSION before syncing.`,
    )
  }
  if (document.info.license !== undefined) {
    throw new Error('Upstream added info.license. Review it before applying the local MIT metadata.')
  }
  if (document.security !== undefined) {
    throw new Error('Upstream added global security. Review it before declaring the API public.')
  }
}

function normalize(document: OpenApiDocument): OpenApiDocument {
  document.info.version = API_VERSION
  document.info.license = {
    name: 'MIT',
    identifier: 'MIT',
  }
  document.security = []

  for (const pathItem of Object.values(document.paths)) {
    for (const operation of Object.values(pathItem)) {
      if (!operation.operationId) continue

      const summary = operationSummaries[operation.operationId]
      if (!summary) {
        throw new Error(`Missing summary for operation ${operation.operationId}`)
      }
      operation.summary = summary
    }
  }

  return document
}

const response = await fetch(UPSTREAM_SPEC_URL, { signal: AbortSignal.timeout(15_000) })
if (!response.ok) {
  throw new Error(`Could not download ${UPSTREAM_SPEC_URL}: ${response.status} ${response.statusText}`)
}

const upstreamDocument = (await response.json()) as OpenApiDocument
assertExpectedUpstreamMetadata(upstreamDocument)
const document = normalize(upstreamDocument)
const output = `${JSON.stringify(document, null, 2)}\n`
const specPath = new URL('../openapi.json', import.meta.url)

if (process.argv.includes('--check')) {
  const current = await Bun.file(specPath).text()
  if (current !== output) {
    console.error('openapi.json differs from the current production specification. Run `bun run sync:spec`.')
    process.exit(1)
  }
  console.log('openapi.json matches the current production specification.')
} else {
  await Bun.write(specPath, output)
  console.log(`Updated openapi.json from ${UPSTREAM_SPEC_URL}.`)
}
