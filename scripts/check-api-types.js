const { execSync } = require('node:child_process')

function run(command) {
  return execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()
}

function main() {
  const status = run('git status --porcelain --untracked-files=all -- src/types/openapi.d.ts')
  if (status) {
    console.error('src/types/openapi.d.ts is out of date or not committed.')
    try {
      const diff = run('git --no-pager diff -- src/types/openapi.d.ts')
      if (diff) {
        console.error(diff)
      }
    } catch (error) {
      // ignore diff command failures and continue with clear exit code below
    }
    console.error(status)
    process.exit(1)
  }
}

main()
