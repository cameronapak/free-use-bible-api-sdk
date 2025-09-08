import { createApiClient } from "./api-client-v2";

const client = createApiClient("https://bible.helloao.org");

const translationsResponse = await client.getAvailableTranslations();

console.log(translationsResponse.translations[0]);

const bookResponse = await client.getBooksForTranslation({
  params: {
    translation: "BSB"
  }
})

console.log(bookResponse.books);

const chapterResponse = await client.getChapterFromTranslation({
  params: {
    // @TODO - HUH??
    "chapter.json": 1,
    book: "Romans",
    translation: "BSB",
    chapter: 8
  }
})

console.log(chapterResponse.chapter.content);