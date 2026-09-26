import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const generatedDirectory = process.env.SDK_OUTPUT_PATH
  ? resolve(process.env.SDK_OUTPUT_PATH)
  : fileURLToPath(new URL('../src/generated', import.meta.url))

const sdkPath = resolve(generatedDirectory, 'sdk.gen.ts')
let sdk = await Bun.file(sdkPath).text()

const optionsBefore =
  'export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean, TResponse = unknown> = Options2<TData, ThrowOnError, TResponse> & {'
const optionsAfter =
  "export type Options<TData extends TDataShape = TDataShape, TResponse = unknown> = Omit<Options2<TData, true, TResponse>, 'parseAs' | 'responseStyle' | 'responseTransformer' | 'throwOnError'> & {"

if (!sdk.includes(optionsBefore)) {
  throw new Error('Could not constrain generated SDK options. The generator output changed.')
}
sdk = sdk.replace(optionsBefore, optionsAfter)

const genericPattern = /<ThrowOnError extends boolean = true>/g
const genericCount = sdk.match(genericPattern)?.length ?? 0
if (genericCount !== 24) {
  throw new Error(`Expected to fix 24 operation generics, found ${genericCount}.`)
}
sdk = sdk.replace(genericPattern, '')

const optionGenericPattern = /Options<(\w+), ThrowOnError>/g
const optionGenericCount = sdk.match(optionGenericPattern)?.length ?? 0
if (optionGenericCount !== 24) {
  throw new Error(`Expected to fix 24 operation option types, found ${optionGenericCount}.`)
}
sdk = sdk.replace(optionGenericPattern, 'Options<$1>')

const resultGeneric = ", ThrowOnError, 'data'>"
const resultGenericCount = sdk.split(resultGeneric).length - 1
if (resultGenericCount !== 48) {
  throw new Error(`Expected to fix 48 operation result generics, found ${resultGenericCount}.`)
}
sdk = sdk.replaceAll(resultGeneric, ", true, 'data'>")

const operationPattern = /\{\n    responseStyle: 'data',\n    url: ([^\n]+),\n    \.\.\.options\n\}/g
let operationCount = 0
sdk = sdk.replace(operationPattern, (_match, url: string) => {
  operationCount += 1
  return `{\n    ...options,\n    parseAs: 'json',\n    responseStyle: 'data',\n    responseTransformer: undefined,\n    throwOnError: true,\n    url: ${url}\n}`
})

if (operationCount !== 24) {
  throw new Error(`Expected to constrain 24 generated operations, found ${operationCount}.`)
}
await Bun.write(sdkPath, sdk)

const utilsPath = resolve(generatedDirectory, 'client/utils.gen.ts')
let utils = await Bun.file(utilsPath).text()
const headersBefore =
  'const iterator = header instanceof Headers ? headersEntries(header) : Object.entries(header);'
const headersAfter = `const iterator =
      header instanceof Headers || Array.isArray(header)
        ? headersEntries(new Headers(header as HeadersInit))
        : Object.entries(header);`

if (!utils.includes(headersBefore)) {
  throw new Error('Could not patch tuple header handling. The generator output changed.')
}
utils = utils.replace(headersBefore, headersAfter)
await Bun.write(utilsPath, utils)

console.log('Applied generated SDK compatibility patches.')
