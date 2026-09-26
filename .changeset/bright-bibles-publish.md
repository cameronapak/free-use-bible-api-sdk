---
"free-use-bible-sdk": major
---

Replace the legacy `FreeUseBibleSDK` class with a generated function-based SDK covering the complete v1.15 API. Calls now use exported endpoint functions with typed options, such as `getTranslationBookChapter({ path: { translation, book, chapter } })`.
