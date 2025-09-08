import { ApiClient } from "./api-client";

const client = new ApiClient({
  baseUrl: "https://bible.helloao.org"
});

const translationsResponse = await client.general.getAvailableTranslations();

console.log(translationsResponse.translations[0]);

const bookResponse = await client.general.getBooksForTranslation("BSB");

console.log(bookResponse.books);

const chapterResponse = await client.general.getChapterFromTranslation("BSB", "Romans", 8)

console.log(chapterResponse.chapter.content);