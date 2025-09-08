
# OpenAPI Specification for Free Use Bible API

This project contains a modular OpenAPI 3.1.0 specification for the Free Use Bible API (https://bible.helloao.org/docs/reference/).

## Files

- **openapi.json**: Main specification file with info, servers, and paths referencing individual endpoint files and schemas.

- **schemas.json**: Shared JSON Schema definitions for all API objects (e.g., Translation, CommentaryBook, ChapterData).

- **available-translations.json**: Defines the GET /api/available_translations endpoint with GET operation, no parameters, response schema, and example.

- **list-books-translation.json**: Defines the GET /api/{translation}/books endpoint with path parameter, response schema, and example.

- **get-chapter-translation.json**: Defines the GET /api/{translation}/{book}/{chapter} endpoint with path parameters, response schema, and example.


## For contributors
See [Agents.md](Agents.md) for guidance when working with this repository.