# Deprecated Free Use Bible API SDK

This repository and the previously published [`free-use-bible-sdk`](https://www.npmjs.com/package/free-use-bible-sdk) package are deprecated. This repository will not be published or maintained as a separate SDK.

Use HelloAO's official TypeScript and JavaScript client instead:

- [Source code](https://github.com/HelloAOLab/bible-api/tree/main/packages/free-use-bible-api)
- [Official documentation](https://bible.helloao.org/docs/sdks/javascript.html)
- [npm package: `free-use-bible-api`](https://www.npmjs.com/package/free-use-bible-api)

```sh
npm install free-use-bible-api
```

```ts
import { FreeUseBibleApi } from 'free-use-bible-api'

const api = new FreeUseBibleApi()
const chapter = await api.getTranslationBookChapter('BSB', 'ROM', 8)
```

## Migration note

The official package is not a drop-in replacement for `free-use-bible-sdk` or this repository's generated client. It uses a `FreeUseBibleApi` class instead of the legacy `FreeUseBibleSDK` class or generated endpoint functions. It also has different caching and error behavior.

As of `free-use-bible-api` 0.4.0, compare the official client's current API before migrating code that depends on custom Fetch implementations, custom headers, direct audio-timing methods, commentary response types, entity-dataset navigation types, or the packaged OpenAPI document. Use the Free Use Bible API directly when the official client does not yet cover a required operation.

Content returned by the API has its own licensing terms. Review each resource's license fields before using or redistributing it.
