import { getAvailableTranslations } from '../src/index.js'

if (false) {
  // @ts-expect-error SDK operations always return parsed response data.
  getAvailableTranslations({ responseStyle: 'fields' })
  // @ts-expect-error SDK operations always parse their declared JSON response.
  getAvailableTranslations({ parseAs: 'text' })
  // @ts-expect-error SDK operations always throw unsuccessful responses.
  getAvailableTranslations({ throwOnError: false })
  // @ts-expect-error Response transforms would invalidate the generated return type.
  getAvailableTranslations({ responseTransformer: async () => 'changed' })
}
