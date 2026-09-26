import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: './openapi.json',
  output: {
    path: process.env.SDK_OUTPUT_PATH ?? './src/generated',
    tsConfigPath: './tsconfig.json',
    module: {
      extension: '.js',
    },
  },
  plugins: [
    {
      name: '@hey-api/client-fetch',
      throwOnError: true,
    },
    '@hey-api/typescript',
    {
      name: '@hey-api/sdk',
      responseStyle: 'data',
    },
  ],
})
