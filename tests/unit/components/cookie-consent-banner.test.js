import { mount } from '@vue/test-utils'

const {
  hasCookieConsentMock,
  saveCookieConsentMock
} = vi.hoisted(() => ({
  hasCookieConsentMock: vi.fn(),
  saveCookieConsentMock: vi.fn()
}))

vi.mock('@/services/cookie-consent.service', () => ({
  hasCookieConsent: hasCookieConsentMock,
  saveCookieConsent: saveCookieConsentMock
}))

import CookieConsentBanner from '@/components/elements/CookieConsentBanner.vue'

function mountBanner () {
  return mount(CookieConsentBanner, {
    global: {
      stubs: {
        RouterLink: {
          template: '<a><slot /></a>'
        }
      }
    }
  })
}

describe('CookieConsentBanner', () => {
  beforeEach(() => {
    hasCookieConsentMock.mockReset()
    saveCookieConsentMock.mockReset()
  })

  it('shows banner when consent is missing', async () => {
    hasCookieConsentMock.mockReturnValue(false)
    const wrapper = mountBanner()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test="cookie-banner"]').exists()).toBe(true)
  })

  it('hides banner when consent already exists', async () => {
    hasCookieConsentMock.mockReturnValue(true)
    const wrapper = mountBanner()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test="cookie-banner"]').exists()).toBe(false)
  })

  it('accepts required-only cookies', async () => {
    hasCookieConsentMock.mockReturnValue(false)
    const wrapper = mountBanner()
    await wrapper.vm.$nextTick()

    await wrapper.find('[data-test="cookie-required-only"]').trigger('click')

    expect(saveCookieConsentMock).toHaveBeenCalledWith({ optionalCookiesAccepted: false })
    expect(wrapper.find('[data-test="cookie-banner"]').exists()).toBe(false)
  })

  it('accepts all cookies', async () => {
    hasCookieConsentMock.mockReturnValue(false)
    const wrapper = mountBanner()
    await wrapper.vm.$nextTick()

    await wrapper.find('[data-test="cookie-accept-all"]').trigger('click')

    expect(saveCookieConsentMock).toHaveBeenCalledWith({ optionalCookiesAccepted: true })
    expect(wrapper.find('[data-test="cookie-banner"]').exists()).toBe(false)
  })
})
