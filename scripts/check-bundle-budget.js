const fs = require('node:fs')
const path = require('node:path')

const distRoot = path.resolve(__dirname, '..', 'dist')
const jsDir = path.join(distRoot, 'js')
const cssDir = path.join(distRoot, 'css')

const limits = {
  vendorKb: Number(process.env.BUNDLE_MAX_VENDOR_KB || 260),
  appJsKb: Number(process.env.BUNDLE_MAX_APP_JS_KB || 80),
  appCssKb: Number(process.env.BUNDLE_MAX_APP_CSS_KB || 330),
  entryKb: Number(process.env.BUNDLE_MAX_ENTRY_KB || 650),
}

function findHashedFile(dirPath, regex) {
  const names = fs.readdirSync(dirPath)
  const match = names.find((name) => regex.test(name))
  if (!match) {
    throw new Error(`Required file was not found in ${dirPath}: ${regex}`)
  }
  return path.join(dirPath, match)
}

function fileSizeKb(filePath) {
  return fs.statSync(filePath).size / 1024
}

function fmt(value) {
  return `${value.toFixed(2)} KiB`
}

function assertUnder(name, value, limit) {
  if (value > limit) {
    throw new Error(`${name} is ${fmt(value)} and exceeds ${fmt(limit)}.`)
  }
}

function main() {
  const vendorFile = findHashedFile(jsDir, /^chunk-vendors\..+\.js$/)
  const appJsFile = findHashedFile(jsDir, /^app\..+\.js$/)
  const appCssFile = findHashedFile(cssDir, /^app\..+\.css$/)

  const vendorKb = fileSizeKb(vendorFile)
  const appJsKb = fileSizeKb(appJsFile)
  const appCssKb = fileSizeKb(appCssFile)
  const entryKb = vendorKb + appJsKb + appCssKb

  assertUnder('chunk-vendors.js', vendorKb, limits.vendorKb)
  assertUnder('app.js', appJsKb, limits.appJsKb)
  assertUnder('app.css', appCssKb, limits.appCssKb)
  assertUnder('entrypoint total', entryKb, limits.entryKb)

  process.stdout.write(
    [
      `bundle budget OK`,
      `chunk-vendors: ${fmt(vendorKb)} (limit ${fmt(limits.vendorKb)})`,
      `app.js: ${fmt(appJsKb)} (limit ${fmt(limits.appJsKb)})`,
      `app.css: ${fmt(appCssKb)} (limit ${fmt(limits.appCssKb)})`,
      `entrypoint: ${fmt(entryKb)} (limit ${fmt(limits.entryKb)})`,
    ].join('\n') + '\n'
  )
}

main()
