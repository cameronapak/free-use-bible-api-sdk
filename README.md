
# OpenAPI Specification for Free Use Bible API

This project contains an OpenAPI 3.1.0 specification for the Free Use Bible API (https://bible.helloao.org/docs/reference/), designed to generate a TypeScript SDK using openapi-zod-client. The generated SDK works very well for interacting with the API.

## Generating the SDK

Run the following command to generate the SDK:

```bash
bun run gen-sdk-v2
```

This generates `api-client-v2.ts` with full TypeScript types and Zod validation.

## Usage Example

```typescript
import { createApiClient } from "./api-client-v2";

const client = createApiClient("https://bible.helloao.org");

// Get available translations
const translations = await client.getAvailableTranslations();
console.log(translations.translations[0]);

// Get books for a translation
const books = await client.getBooksForTranslation({ params: { translation: "BSB" } });
console.log(books.books);

// Get a chapter
const chapter = await client.getChapterFromTranslation({
  params: { translation: "BSB", book: "Romans", chapter: 8 }
});
console.log(chapter.chapter.content);
```

## For contributors

See [Agents.md](Agents.md) for guidance when working with this repository.