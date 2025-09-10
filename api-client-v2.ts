import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core'
import { z } from 'zod'

type ChapterHebrewSubtitle = {
  type: 'hebrew_subtitle'
  content: Array<string | FormattedText | VerseFootnoteReference>
}
type FormattedText = {
  text: string
  poem?: (number | null) | undefined
  wordsOfJesus?: (boolean | null) | undefined
}
type VerseFootnoteReference = {
  noteId: number
}
type ChapterVerse = {
  type: 'verse'
  number: number
  content: Array<string | FormattedText | InlineHeading | InlineLineBreak | VerseFootnoteReference>
}
type InlineHeading = {
  heading: string
}
type InlineLineBreak = {
  lineBreak: boolean
}
type ChapterContent = ChapterHeading | ChapterLineBreak | ChapterHebrewSubtitle | ChapterVerse
type ChapterHeading = {
  type: 'heading'
  content: Array<string>
}
type ChapterLineBreak = {
  type: 'line_break'
}
type ChapterData = {
  number: number
  content: Array<ChapterContent>
  footnotes: Array<ChapterFootnote>
}
type ChapterFootnote = {
  noteId: number
  text: string
  reference?:
    | (Partial<{
        chapter: number
        verse: number
      }> | null)
    | undefined
  caller: string | null
}
type AvailableTranslations = {
  translations: Array<Translation>
}
type Translation = {
  id: string
  name: string
  englishName: string
  website: string
  licenseUrl: string
  shortName: string
  language: string
  languageName?: (string | null) | undefined
  languageEnglishName?: (string | null) | undefined
  textDirection: 'ltr' | 'rtl'
  availableFormats: Array<'json' | 'usfm'>
  listOfBooksApiLink: string
  numberOfBooks: number
  totalNumberOfChapters: number
  totalNumberOfVerses: number
  numberOfApocryphalBooks?: (number | null) | undefined
  totalNumberOfApocryphalChapters?: (number | null) | undefined
  totalNumberOfApocryphalVerses?: (number | null) | undefined
}
type TranslationBooks = {
  translation: Translation
  books: Array<TranslationBook>
}
type TranslationBook = {
  id: string
  translationId: string
  name: string
  commonName: string
  title?: (string | null) | undefined
  order: number
  numberOfChapters: number
  firstChapterApiLink: string
  lastChapterApiLink: string
  totalNumberOfVerses: number
  isApocryphal?: (boolean | null) | undefined
}
type TranslationBookChapter = {
  translation: Translation
  book: TranslationBook
  thisChapterLink: string
  thisChapterAudioLinks: AudioLinks
  nextChapterApiLink?: (string | null) | undefined
  nextChapterAudioLinks?: (AudioLinks | null) | undefined
  previousChapterApiLink?: (string | null) | undefined
  previousChapterAudioLinks?: (AudioLinks | null) | undefined
  numberOfVerses: number
  chapter: ChapterData
}
type AudioLinks = {}
type AvailableCommentaries = {
  commentaries: Array<Commentary>
}
type Commentary = {
  id: string
  name: string
  englishName: string
  website: string
  licenseUrl: string
  shortName: string
  language: string
  languageName?: (string | null) | undefined
  languageEnglishName?: (string | null) | undefined
  textDirection: 'ltr' | 'rtl'
  availableFormats: Array<'json' | 'usfm'>
  listOfBooksApiLink: string
  numberOfBooks: number
  totalNumberOfChapters: number
  totalNumberOfVerses: number
}
type CommentaryBooks = {
  commentary: Commentary
  books: Array<CommentaryBook>
}
type CommentaryBook = {
  id: string
  name: string
  commonName: string
  introduction?: (string | null) | undefined
  order: number
  firstChapterApiLink: string
  lastChapterApiLink: string
  numberOfChapters: number
  totalNumberOfVerses: number
}
type CommentaryBookChapter = {
  commentary: Commentary
  book: CommentaryBook
  thisChapterLink: string
  nextChapterApiLink?: (string | null) | undefined
  previousChapterApiLink?: (string | null) | undefined
  numberOfVerses: number
  chapter: CommentaryChapterData
}
type CommentaryChapterData = {
  number: number
  introduction?: (string | null) | undefined
  content: Array<ChapterVerse>
}
type CommentaryProfiles = {
  commentary: Commentary
  profiles: Array<CommentaryProfile>
}
type CommentaryProfile = {
  id: string
  subject: string
  reference?: (VerseRef | null) | undefined
  thisProfileLink: string
  referenceChapterLink?: (string | null) | undefined
}
type VerseRef = {
  book: string
  chapter: number
  verse: number
  endChapter?: (number | null) | undefined
  endVerse?: (number | null) | undefined
}
type CommentaryProfileContent = {
  commentary: Commentary
  profile: CommentaryProfile
  content: Array<string>
}

const Translation: z.ZodType<Translation> = z
  .object({
    id: z.string(),
    name: z.string(),
    englishName: z.string(),
    website: z.string(),
    licenseUrl: z.string(),
    shortName: z.string(),
    language: z.string(),
    languageName: z.union([z.string(), z.null()]).optional(),
    languageEnglishName: z.union([z.string(), z.null()]).optional(),
    textDirection: z.enum(['ltr', 'rtl']),
    availableFormats: z.array(z.enum(['json', 'usfm'])),
    listOfBooksApiLink: z.string(),
    numberOfBooks: z.number().int(),
    totalNumberOfChapters: z.number().int(),
    totalNumberOfVerses: z.number().int(),
    numberOfApocryphalBooks: z.union([z.number(), z.null()]).optional(),
    totalNumberOfApocryphalChapters: z.union([z.number(), z.null()]).optional(),
    totalNumberOfApocryphalVerses: z.union([z.number(), z.null()]).optional(),
  })
  .strict()
  .passthrough()
const AvailableTranslations: z.ZodType<AvailableTranslations> = z
  .object({ translations: z.array(Translation) })
  .strict()
  .passthrough()
const TranslationBook: z.ZodType<TranslationBook> = z
  .object({
    id: z.string(),
    translationId: z.string(),
    name: z.string(),
    commonName: z.string(),
    title: z.union([z.string(), z.null()]).optional(),
    order: z.number().int(),
    numberOfChapters: z.number().int(),
    firstChapterApiLink: z.string(),
    lastChapterApiLink: z.string(),
    totalNumberOfVerses: z.number().int(),
    isApocryphal: z.union([z.boolean(), z.null()]).optional(),
  })
  .strict()
  .passthrough()
const TranslationBooks: z.ZodType<TranslationBooks> = z
  .object({ translation: Translation, books: z.array(TranslationBook) })
  .strict()
  .passthrough()
const AudioLinks: z.ZodType<AudioLinks> = z.record(z.string())
const ChapterHeading: z.ZodType<ChapterHeading> = z
  .object({ type: z.literal('heading'), content: z.array(z.string()) })
  .strict()
  .passthrough()
const ChapterLineBreak: z.ZodType<ChapterLineBreak> = z
  .object({ type: z.literal('line_break') })
  .strict()
  .passthrough()
const FormattedText: z.ZodType<FormattedText> = z
  .object({ text: z.string(), poem: z.union([z.number(), z.null()]).optional(), wordsOfJesus: z.union([z.boolean(), z.null()]).optional() })
  .strict()
  .passthrough()
const VerseFootnoteReference: z.ZodType<VerseFootnoteReference> = z.object({ noteId: z.number().int() }).strict().passthrough()
const ChapterHebrewSubtitle: z.ZodType<ChapterHebrewSubtitle> = z
  .object({ type: z.literal('hebrew_subtitle'), content: z.array(z.union([z.string(), FormattedText, VerseFootnoteReference])) })
  .strict()
  .passthrough()
const InlineHeading: z.ZodType<InlineHeading> = z.object({ heading: z.string() }).strict().passthrough()
const InlineLineBreak: z.ZodType<InlineLineBreak> = z.object({ lineBreak: z.boolean() }).strict().passthrough()
const ChapterVerse: z.ZodType<ChapterVerse> = z
  .object({
    type: z.literal('verse'),
    number: z.number().int(),
    content: z.array(z.union([z.string(), FormattedText, InlineHeading, InlineLineBreak, VerseFootnoteReference])),
  })
  .strict()
  .passthrough()
const ChapterContent: z.ZodType<ChapterContent> = z.union([ChapterHeading, ChapterLineBreak, ChapterHebrewSubtitle, ChapterVerse])
const ChapterFootnote: z.ZodType<ChapterFootnote> = z
  .object({
    noteId: z.number().int(),
    text: z.string(),
    reference: z
      .union([z.object({ chapter: z.number().int(), verse: z.number().int() }).partial().strict().passthrough(), z.null()])
      .optional(),
    caller: z.union([z.string(), z.null()]),
  })
  .strict()
  .passthrough()
const ChapterData: z.ZodType<ChapterData> = z
  .object({ number: z.number().int(), content: z.array(ChapterContent), footnotes: z.array(ChapterFootnote) })
  .strict()
  .passthrough()
const TranslationBookChapter: z.ZodType<TranslationBookChapter> = z
  .object({
    translation: Translation,
    book: TranslationBook,
    thisChapterLink: z.string(),
    thisChapterAudioLinks: AudioLinks,
    nextChapterApiLink: z.union([z.string(), z.null()]).optional(),
    nextChapterAudioLinks: z.union([AudioLinks, z.null()]).optional(),
    previousChapterApiLink: z.union([z.string(), z.null()]).optional(),
    previousChapterAudioLinks: z.union([AudioLinks, z.null()]).optional(),
    numberOfVerses: z.number().int(),
    chapter: ChapterData,
  })
  .strict()
  .passthrough()
const Commentary: z.ZodType<Commentary> = z
  .object({
    id: z.string(),
    name: z.string(),
    englishName: z.string(),
    website: z.string(),
    licenseUrl: z.string(),
    shortName: z.string(),
    language: z.string(),
    languageName: z.union([z.string(), z.null()]).optional(),
    languageEnglishName: z.union([z.string(), z.null()]).optional(),
    textDirection: z.enum(['ltr', 'rtl']),
    availableFormats: z.array(z.enum(['json', 'usfm'])),
    listOfBooksApiLink: z.string(),
    numberOfBooks: z.number().int(),
    totalNumberOfChapters: z.number().int(),
    totalNumberOfVerses: z.number().int(),
  })
  .strict()
  .passthrough()
const AvailableCommentaries: z.ZodType<AvailableCommentaries> = z
  .object({ commentaries: z.array(Commentary) })
  .strict()
  .passthrough()
const CommentaryBook: z.ZodType<CommentaryBook> = z
  .object({
    id: z.string(),
    name: z.string(),
    commonName: z.string(),
    introduction: z.union([z.string(), z.null()]).optional(),
    order: z.number().int(),
    firstChapterApiLink: z.string(),
    lastChapterApiLink: z.string(),
    numberOfChapters: z.number().int(),
    totalNumberOfVerses: z.number().int(),
  })
  .strict()
  .passthrough()
const CommentaryBooks: z.ZodType<CommentaryBooks> = z
  .object({ commentary: Commentary, books: z.array(CommentaryBook) })
  .strict()
  .passthrough()
const CommentaryChapterData: z.ZodType<CommentaryChapterData> = z
  .object({ number: z.number().int(), introduction: z.union([z.string(), z.null()]).optional(), content: z.array(ChapterVerse) })
  .strict()
  .passthrough()
const CommentaryBookChapter: z.ZodType<CommentaryBookChapter> = z
  .object({
    commentary: Commentary,
    book: CommentaryBook,
    thisChapterLink: z.string(),
    nextChapterApiLink: z.union([z.string(), z.null()]).optional(),
    previousChapterApiLink: z.union([z.string(), z.null()]).optional(),
    numberOfVerses: z.number().int(),
    chapter: CommentaryChapterData,
  })
  .strict()
  .passthrough()
const VerseRef: z.ZodType<VerseRef> = z
  .object({
    book: z.string(),
    chapter: z.number().int(),
    verse: z.number().int(),
    endChapter: z.union([z.number(), z.null()]).optional(),
    endVerse: z.union([z.number(), z.null()]).optional(),
  })
  .strict()
  .passthrough()
const CommentaryProfile: z.ZodType<CommentaryProfile> = z
  .object({
    id: z.string(),
    subject: z.string(),
    reference: z.union([VerseRef, z.null()]).optional(),
    thisProfileLink: z.string(),
    referenceChapterLink: z.union([z.string(), z.null()]).optional(),
  })
  .strict()
  .passthrough()
const CommentaryProfiles: z.ZodType<CommentaryProfiles> = z
  .object({ commentary: Commentary, profiles: z.array(CommentaryProfile) })
  .strict()
  .passthrough()
const CommentaryProfileContent: z.ZodType<CommentaryProfileContent> = z
  .object({ commentary: Commentary, profile: CommentaryProfile, content: z.array(z.string()) })
  .strict()
  .passthrough()

export const schemas = {
  Translation,
  AvailableTranslations,
  TranslationBook,
  TranslationBooks,
  AudioLinks,
  ChapterHeading,
  ChapterLineBreak,
  FormattedText,
  VerseFootnoteReference,
  ChapterHebrewSubtitle,
  InlineHeading,
  InlineLineBreak,
  ChapterVerse,
  ChapterContent,
  ChapterFootnote,
  ChapterData,
  TranslationBookChapter,
  Commentary,
  AvailableCommentaries,
  CommentaryBook,
  CommentaryBooks,
  CommentaryChapterData,
  CommentaryBookChapter,
  VerseRef,
  CommentaryProfile,
  CommentaryProfiles,
  CommentaryProfileContent,
}

const endpoints = makeApi([
  {
    method: 'get',
    path: '/api/:translation/:book/:chapter.json',
    alias: 'getChapterFromTranslation',
    description: `Gets the content of a single chapter for a given book and translation.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'translation',
        type: 'Path',
        schema: z.string(),
      },
      {
        name: 'book',
        type: 'Path',
        schema: z.string(),
      },
      {
        name: 'chapter',
        type: 'Path',
        schema: z.number().int(),
      },
    ],
    response: TranslationBookChapter,
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.object({ error: z.string() }).partial().strict().passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/api/:translation/books.json',
    alias: 'getBooksForTranslation',
    description: `Gets the list of books that are available for the given translation.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'translation',
        type: 'Path',
        schema: z.string(),
      },
    ],
    response: TranslationBooks,
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.object({ error: z.string() }).partial().strict().passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/api/available_commentaries.json',
    alias: 'getAvailableCommentaries',
    description: `Gets the list of available Bible commentaries in the API.`,
    requestFormat: 'json',
    response: AvailableCommentaries,
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.object({ error: z.string() }).partial().strict().passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/api/available_translations.json',
    alias: 'getAvailableTranslations',
    description: `Gets the list of available translations in the API.`,
    requestFormat: 'json',
    response: AvailableTranslations,
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.object({ error: z.string() }).partial().strict().passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/api/c/:commentary/:book/:chapter.json',
    alias: 'getChapterFromCommentary',
    description: `Gets the content of a single chapter for a given book and commentary.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'commentary',
        type: 'Path',
        schema: z.string(),
      },
      {
        name: 'book',
        type: 'Path',
        schema: z.string(),
      },
      {
        name: 'chapter',
        type: 'Path',
        schema: z.number().int(),
      },
    ],
    response: CommentaryBookChapter,
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.object({ error: z.string() }).partial().strict().passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/api/c/:commentary/books.json',
    alias: 'getBooksForCommentary',
    description: `Gets the list of books that are available for the given commentary.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'commentary',
        type: 'Path',
        schema: z.string(),
      },
    ],
    response: CommentaryBooks,
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.object({ error: z.string() }).partial().strict().passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/api/c/:commentary/profiles.json',
    alias: 'getProfilesForCommentary',
    description: `Gets the list of profiles that are available for the given commentary. Profiles are overviews of people or people groups.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'commentary',
        type: 'Path',
        schema: z.string(),
      },
    ],
    response: CommentaryProfiles,
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.object({ error: z.string() }).partial().strict().passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/api/c/:commentary/profiles/:profile.json',
    alias: 'getProfileFromCommentary',
    description: `Gets a profile from a commentary.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'commentary',
        type: 'Path',
        schema: z.string(),
      },
      {
        name: 'profile',
        type: 'Path',
        schema: z.string(),
      },
    ],
    response: CommentaryProfileContent,
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.object({ error: z.string() }).partial().strict().passthrough(),
      },
    ],
  },
])

export const api = new Zodios('https://bible.helloao.org', endpoints)

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options)
}
