import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const generatedDirectory = new URL('../src/generated', import.meta.url)
const before = await snapshot(generatedDirectory)
const temporaryRoot = await mkdtemp(join(tmpdir(), 'free-use-bible-api-sdk-'))
const temporaryOutput = join(temporaryRoot, 'generated')

try {
  const generation = Bun.spawn(['bun', 'run', 'generate'], {
    cwd: fileURLToPath(new URL('..', import.meta.url)),
    env: { ...process.env, SDK_OUTPUT_PATH: temporaryOutput },
    stderr: 'inherit',
    stdout: 'ignore',
  })
  if ((await generation.exited) !== 0) {
    throw new Error('SDK generation failed.')
  }

  const after = await snapshot(pathToFileURL(`${temporaryOutput}/`))
  if (before !== after) {
    console.error('Generated SDK files are stale. Run `bun run generate`.')
    process.exitCode = 1
  } else {
    console.log('Generated SDK files are current.')
  }
} finally {
  await rm(temporaryRoot, { force: true, recursive: true })
}

async function snapshot(directory: URL): Promise<string> {
  const files: string[] = []
  for await (const file of new Bun.Glob('**/*').scan({
    cwd: fileURLToPath(directory),
    onlyFiles: true,
  })) {
    files.push(file)
  }

  const contents = await Promise.all(
    files.sort().map(async (file) => `${file}\0${await Bun.file(new URL(file, `${directory.href}/`)).text()}`),
  )
  return contents.join('\0')
}
