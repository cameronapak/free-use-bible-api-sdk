import { describe, expect, test } from 'bun:test'

import {
  createClient,
  getAvailableTranslations,
  getTranslationBookChapter,
  getTranslationBookChapterAudioTimings,
} from '../src/index.js'

describe('generated SDK', () => {
  test('interpolates every segment in a dot-suffixed path', async () => {
    let request: Request | undefined
    const client = createClient({
      baseUrl: 'https://example.test',
      fetch: (async (input) => {
        request = input as Request
        return Response.json({})
      }) as typeof fetch,
      headers: [['X-Client', 'my-app']],
      throwOnError: true,
    })

    await getTranslationBookChapterAudioTimings({
      client,
      path: {
        translation: 'BSB',
        book: 'GEN',
        chapter: 1,
        reader: 'hays',
      },
    })

    expect(request?.url).toBe('https://example.test/api/BSB/GEN/1.hays.audioTimings.json')
    expect(request?.headers.get('X-Client')).toBe('my-app')
  })

  test('throws the parsed API error with a custom client using default options', async () => {
    const client = createClient({
      baseUrl: 'https://example.test',
      fetch: (async () => Response.json({ error: 'missing' }, { status: 404 })) as unknown as typeof fetch,
    })

    const request = getTranslationBookChapter({
      client,
      path: {
        translation: 'missing',
        book: 'GEN',
        chapter: 1,
      },
    })

    await expect(request).rejects.toEqual({ error: 'missing' })
  })

  test('keeps endpoint response parsing and shape fixed', async () => {
    const client = createClient({
      baseUrl: 'https://example.test',
      fetch: (async () => Response.json({ translations: [] })) as unknown as typeof fetch,
    })
    const unsafeOptions = {
      client,
      parseAs: 'text',
      responseStyle: 'fields',
      responseTransformer: async () => 'changed',
      throwOnError: false,
    } as unknown as Parameters<typeof getAvailableTranslations>[0]

    const result = await getAvailableTranslations(unsafeOptions)

    expect(result).toEqual({ translations: [] })
  })
})
