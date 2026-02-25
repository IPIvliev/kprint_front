import {
  getCookieConsent,
  hasCookieConsent,
  resetCookieConsent,
  saveCookieConsent,
  shouldEnableOptionalCookies
} from '@/services/cookie-consent.service'

describe('cookie-consent service', () => {
  beforeEach(() => {
    resetCookieConsent()
  })

  it('returns empty state before any user choice', () => {
    expect(hasCookieConsent()).toBe(false)
    expect(getCookieConsent()).toBe(null)
    expect(shouldEnableOptionalCookies()).toBe(false)
  })

  it('stores required-only decision', () => {
    saveCookieConsent({ optionalCookiesAccepted: false })

    expect(hasCookieConsent()).toBe(true)
    expect(shouldEnableOptionalCookies()).toBe(false)
    expect(document.cookie).toContain('gl_cookie_consent=')
  })

  it('stores accept-all decision', () => {
    saveCookieConsent({ optionalCookiesAccepted: true })

    expect(hasCookieConsent()).toBe(true)
    expect(shouldEnableOptionalCookies()).toBe(true)
  })
})

