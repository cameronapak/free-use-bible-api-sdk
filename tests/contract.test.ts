import { describe, expect, test } from 'bun:test'

import {
  getAvailableCommentaries,
  getAvailableDatasets,
  getAvailableTranslations,
  getDatasetBookChapter,
  getDatasetPeople,
  getSimpleCommentaryBookChapter,
  getSimpleTranslationBookChapter,
  getTranslationBookChapter,
  getTranslationBookChapterAudioTimings,
} from '../src/index.js'

describe('production API contracts', () => {
  test('lists translations and returns both chapter formats', async () => {
    const [available, structured, simple] = await Promise.all([
      getAvailableTranslations(),
      getTranslationBookChapter({
        path: { translation: 'BSB', book: 'GEN', chapter: 1 },
      }),
      getSimpleTranslationBookChapter({
        path: { translation: 'BSB', book: 'GEN', chapter: 1 },
      }),
    ])

    expect(available.translations.some(({ id }) => id === 'BSB')).toBe(true)
    expect(structured.translation.id).toBe('BSB')
    expect(structured.chapter.number).toBe(1)
    expect(structured.chapter.content.length).toBeGreaterThan(0)
    const structuredVerse = structured.chapter.content.find(({ type }) => type === 'verse')
    if (!structuredVerse || !('number' in structuredVerse) || !('content' in structuredVerse)) {
      throw new Error('Expected a structured verse.')
    }
    expect(structuredVerse.number).toBe(1)
    expect(structuredVerse.content).toBeArray()
    expect(simple.translation.id).toBe('BSB')
    expect(simple.chapter.number).toBe(1)
    expect(simple.chapter.content.length).toBeGreaterThan(0)
    const simpleVerse = simple.chapter.content.find(({ type }) => type === 'verse')
    if (!simpleVerse || !('number' in simpleVerse) || !('text' in simpleVerse)) {
      throw new Error('Expected a simplified verse.')
    }
    expect(simpleVerse.number).toBe(1)
    expect(simpleVerse.text).toStartWith('In the beginning')
  }, 30_000)

  test('returns commentaries and commentary content', async () => {
    const [available, chapter] = await Promise.all([
      getAvailableCommentaries(),
      getSimpleCommentaryBookChapter({
        path: { commentary: 'adam-clarke', book: 'GEN', chapter: 1 },
      }),
    ])

    expect(available.commentaries.some(({ id }) => id === 'adam-clarke')).toBe(true)
    expect(chapter.commentary.id).toBe('adam-clarke')
    expect(chapter.chapter.content.length).toBeGreaterThan(0)
  }, 30_000)

  test('returns entity datasets and chapter entities', async () => {
    const [available, chapter, people] = await Promise.all([
      getAvailableDatasets(),
      getDatasetBookChapter({
        path: { dataset: 'theographic', book: 'GEN', chapter: 1 },
      }),
      getDatasetPeople({ path: { dataset: 'theographic' } }),
    ])

    expect(available.datasets.some(({ id }) => id === 'theographic')).toBe(true)
    expect(chapter.dataset.id).toBe('theographic')
    expect(chapter.chapter.number).toBe(1)
    if (!('people' in chapter.chapter)) {
      throw new Error('Expected an entity dataset chapter.')
    }
    expect(chapter.chapter.people).toBeArray()
    expect(chapter.chapter.places).toBeArray()
    expect(chapter.chapter.events).toBeArray()
    expect(people.dataset.id).toBe('theographic')
    expect(people.people.length).toBeGreaterThan(0)
  }, 30_000)

  test('returns chapter audio timings', async () => {
    const timings = await getTranslationBookChapterAudioTimings({
      path: {
        translation: 'BSB',
        book: 'GEN',
        chapter: 1,
        reader: 'hays',
      },
    })

    expect(timings.translationId).toBe('BSB')
    expect(timings.bookId).toBe('GEN')
    expect(timings.chapterNumber).toBe(1)
    expect(timings.verses.length).toBeGreaterThan(0)
  }, 30_000)
})
