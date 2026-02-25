const STORAGE_KEY = 'gl_cookie_consent'
const COOKIE_NAME = 'gl_cookie_consent'
const COOKIE_VERSION = 'v1_2026-02-26'
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365

function canUseWindowStorage () {
  return typeof window !== 'undefined' && !!window.localStorage
}

function readStoredValue () {
  if (!canUseWindowStorage()) {
    return null
  }

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

function writeBrowserCookie (optionalCookiesAccepted) {
  if (typeof document === 'undefined') {
    return
  }

  const consentMode = optionalCookiesAccepted ? 'all' : 'required'
  const securePart = typeof window !== 'undefined' && window.location?.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${COOKIE_NAME}=${COOKIE_VERSION}:${consentMode}; Max-Age=${COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${securePart}`
}

function notifyConsentUpdated (payload) {
  if (typeof window === 'undefined' || typeof window.dispatchEvent !== 'function') {
    return
  }
  window.dispatchEvent(new CustomEvent('gl-cookie-consent-updated', { detail: payload }))
}

export function getCookieConsent () {
  return readStoredValue()
}

export function hasCookieConsent () {
  return !!getCookieConsent()
}

export function shouldEnableOptionalCookies () {
  const consent = getCookieConsent()
  return consent?.optionalCookiesAccepted === true
}

export function saveCookieConsent ({ optionalCookiesAccepted }) {
  const payload = {
    version: COOKIE_VERSION,
    necessaryCookiesAccepted: true,
    optionalCookiesAccepted: optionalCookiesAccepted === true,
    decidedAt: new Date().toISOString()
  }

  if (canUseWindowStorage()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  }
  writeBrowserCookie(payload.optionalCookiesAccepted)
  notifyConsentUpdated(payload)
  return payload
}

export function resetCookieConsent () {
  if (canUseWindowStorage()) {
    window.localStorage.removeItem(STORAGE_KEY)
  }
  if (typeof document !== 'undefined') {
    document.cookie = `${COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax`
  }
}

