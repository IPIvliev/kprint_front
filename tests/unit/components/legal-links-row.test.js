import { RouterLinkStub, shallowMount } from '@vue/test-utils'
import LegalLinksRow from '@/components/elements/LegalLinksRow.vue'

describe('components/elements/LegalLinksRow.vue', () => {
  function mountComponent () {
    return shallowMount(LegalLinksRow, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
  }

  it('renders a single legal info trigger by default', () => {
    const wrapper = mountComponent()

    expect(wrapper.find('[data-test="legal-info-trigger"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Правовая информация')
    expect(wrapper.text()).not.toContain('Политика ПДн')
    expect(wrapper.text()).not.toContain('Возвраты и отмены')
  })

  it('opens and closes legal links modal', async () => {
    const wrapper = mountComponent()

    expect(wrapper.find('[data-test="legal-info-modal"]').exists()).toBe(false)

    await wrapper.find('[data-test="legal-info-trigger"]').trigger('click')
    expect(wrapper.find('[data-test="legal-info-modal"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Политика ПДн')
    expect(wrapper.text()).toContain('Согласие на ПДн')
    expect(wrapper.text()).toContain('Согласие на рассылку')
    expect(wrapper.text()).toContain('Соглашение и оферта')
    expect(wrapper.text()).toContain('Доставка и оплата')
    expect(wrapper.text()).toContain('Возвраты и отмены')

    await wrapper.find('[data-test="legal-info-close"]').trigger('click')
    expect(wrapper.find('[data-test="legal-info-modal"]').exists()).toBe(false)
  })

  it('keeps legal route targets inside modal links', async () => {
    const wrapper = mountComponent()
    await wrapper.find('[data-test="legal-info-trigger"]').trigger('click')

    const links = wrapper.findAllComponents(RouterLinkStub)
    const targets = links.map((link) => link.props('to'))

    expect(targets).toEqual([
      '/legal/personal-data-policy',
      '/legal/pd-consent',
      '/legal/ads-consent',
      '/legal/terms-offer',
      '/legal/delivery-payment',
      '/legal/returns'
    ])
  })
})
