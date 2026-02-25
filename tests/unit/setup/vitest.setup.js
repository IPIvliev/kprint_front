if (typeof globalThis.atob !== 'function') {
  globalThis.atob = (value) => Buffer.from(String(value), 'base64').toString('binary')
}

if (typeof globalThis.btoa !== 'function') {
  globalThis.btoa = (value) => Buffer.from(String(value), 'binary').toString('base64')
}

if (!process.env.BASE_URL) {
  process.env.BASE_URL = '/'
}

beforeEach(() => {
  window.localStorage.clear()
  window.sessionStorage.clear()
})
