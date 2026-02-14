const fs = require('node:fs')
const path = require('node:path')
const { spawnSync } = require('node:child_process')

function resolveSchemaPath() {
  const cwd = process.cwd()
  const candidates = [
    process.env.OPENAPI_SCHEMA_PATH && path.resolve(cwd, process.env.OPENAPI_SCHEMA_PATH),
    path.resolve(cwd, '../kprint_back/openapi.json'),
    path.resolve(cwd, 'openapi.json'),
  ].filter(Boolean)

  return candidates.find((candidate) => fs.existsSync(candidate))
}

function main() {
  const schemaPath = resolveSchemaPath()
  if (!schemaPath) {
    console.error('OpenAPI schema file not found.')
    console.error('Checked: OPENAPI_SCHEMA_PATH, ../kprint_back/openapi.json, ./openapi.json')
    process.exit(1)
  }

  const outputPath = path.resolve(process.cwd(), 'src/types/openapi.d.ts')
  const packageRoot = path.dirname(require.resolve('openapi-typescript/package.json'))
  const cliPath = path.join(packageRoot, 'bin', 'cli.js')
  const result = spawnSync(process.execPath, [cliPath, schemaPath, '-o', outputPath], {
    stdio: 'inherit',
  })

  if (result.status !== 0) {
    process.exit(result.status || 1)
  }
}

main()
