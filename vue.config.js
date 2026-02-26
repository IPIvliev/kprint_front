const path = require('node:path')
const fs = require('node:fs')
const { getPrerenderRoutes } = require('./scripts/seo-routes')

function resolveChromiumExecutable() {
  const explicitPath = String(process.env.PRERENDER_CHROME_PATH || '').trim()
  if (explicitPath) {
    return explicitPath
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
        renderAfterDocumentEvent: 'app-rendered'
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
