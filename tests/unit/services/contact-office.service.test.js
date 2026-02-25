const { publicApiMock } = vi.hoisted(() => ({
  publicApiMock: {
    get: vi.fn()
  }
}))

vi.mock('@/services/http', () => ({
  publicApi: publicApiMock
}))

import {
  emailToMailtoHref,
  fetchContactOffices,
  getContactOfficesData,
  phoneToTelHref
} from '@/services/contact-office.service'

describe('contact-office service', () => {
  beforeEach(() => {
    publicApiMock.get.mockReset()
  })

  it('converts phone and email to href', () => {
    expect(phoneToTelHref('+7 960 186-35-96')).toBe('tel:+79601863596')
    expect(phoneToTelHref('')).toBe('')
    expect(emailToMailtoHref('info@kprint.ru')).toBe('mailto:info@kprint.ru')
    expect(emailToMailtoHref('')).toBe('')
  })

  it('normalizes offices payload', async () => {
    publicApiMock.get.mockResolvedValueOnce({
      data: {
        main_office_phone: '',
        main_office_email: '',
        offices: [
          {
            id: '4',
            name: 'Офис',
            is_head_office: true,
            phone: '+7 111 222-33-44',
            email: 'office@kprint.ru',
            photos: [{ id: 1, image_url: 'http://img/1.png', caption: 'x' }]
          }
        ]
      }
    })

    const payload = await fetchContactOffices()

    expect(publicApiMock.get).toHaveBeenCalledWith('/api/contact-offices/')
    expect(payload.main_office_phone).toBe('+7 111 222-33-44')
    expect(payload.main_office_email).toBe('office@kprint.ru')
    expect(payload.offices[0].id).toBe(4)
    expect(payload.offices[0].photos).toHaveLength(1)
  })

  it('uses cache unless force option is set', async () => {
    publicApiMock.get.mockResolvedValue({
      data: {
        main_office_phone: '+7 900 000-00-00',
        main_office_email: 'a@b.c',
        offices: []
      }
    })

    const first = await getContactOfficesData()
    const second = await getContactOfficesData()
    const forced = await getContactOfficesData({ force: true })

    expect(first).toEqual(second)
    expect(publicApiMock.get).toHaveBeenCalledTimes(2)
    expect(forced.main_office_phone).toBe('+7 900 000-00-00')
  })
})
