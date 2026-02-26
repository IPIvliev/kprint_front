const path = require('node:path')
const fs = require('node:fs')
const { getPrerenderRoutes } = require('./scripts/seo-routes')

function resolveChromiumExecutable() {
  const explicitCandidates = [
    process.env.PRERENDER_CHROME_PATH,
    process.env.CHROME_PATH,
    process.env.PUPPETEER_EXECUTABLE_PATH
  ]
    .map((value) => String(value || '').trim())
    .filter(Boolean)
  for (const executablePath of explicitCandidates) {
    if (fs.existsSync(executablePath)) {
      return executablePath
    }
  }
  try {
    const { chromium } = require('playwright')
    const autoPath = chromium.executablePath()
    if (autoPath && fs.existsSync(autoPath)) {
      return autoPath
    }
  } catch (error) {
    // ignore: playwright is optional here
  }
  try {
    const puppeteer = require('puppeteer')
    const autoPath = puppeteer.executablePath()
    if (autoPath && fs.existsSync(autoPath)) {
      return autoPath
    }
  } catch (error) {
    // ignore: puppeteer is optional here
  }
  const systemCandidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Chromium\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Chromium\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  ]
  for (const executablePath of systemCandidates) {
    if (fs.existsSync(executablePath)) {
      return executablePath
    }
  }
  return null
}

function createPrerenderPlugin() {
  if (process.env.ENABLE_PRERENDER === '0') {
    return null
  }
  try {
    const PrerendererPlugin = require('@prerenderer/webpack-plugin')
    const PuppeteerRenderer = require('@prerenderer/renderer-puppeteer')
    const chromeExecutable = resolveChromiumExecutable()
    if (!chromeExecutable) {
      process.stdout.write('[seo] prerender disabled: no Chromium executable was found\n')
      return null
    }
    return new PrerendererPlugin({
      staticDir: path.join(__dirname, 'dist'),
      routes: getPrerenderRoutes(),
      renderer: new PuppeteerRenderer({
        headless: true,
        executablePath: chromeExecutable,
        renderAfterDocumentEvent: 'app-rendered',
        renderAfterTime: Number(process.env.PRERENDER_WAIT_MS || 5000)
      })
    })
  } catch (error) {
    process.stdout.write(`[seo] prerender disabled: ${error.message}\n`)
    return null
  }
}

module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  },
  configureWebpack: () => {
    const prerenderPlugin = createPrerenderPlugin()
    if (!prerenderPlugin) {
      return {}
    }
    return {
      plugins: [prerenderPlugin]
    }
  }
}
