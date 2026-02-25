const { spawnSync } = require('child_process')

const major = Number(String(process.versions.node || '').split('.')[0] || 0)

if (major < 18) {
  console.error(`Playwright tests require Node.js 18+. Current runtime: ${process.versions.node}`)
  process.exit(1)
}

const cliPath = require.resolve('@playwright/test/cli')
const args = process.argv.slice(2)
const result = spawnSync(process.execPath, [cliPath, ...args], { stdio: 'inherit' })

if (result.error) {
  throw result.error
}

process.exit(result.status == null ? 1 : result.status)
