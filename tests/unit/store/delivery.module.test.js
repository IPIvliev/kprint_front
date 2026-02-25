const {
  fetchPochtaOfficesMock,
  fetchSdekOfficesMock,
  fetchPochtaPriceMock,
  fetchSdekPriceMock,
  fetchLocationByAbstractMock
} = vi.hoisted(() => ({
  fetchPochtaOfficesMock: vi.fn(),
  fetchSdekOfficesMock: vi.fn(),
  fetchPochtaPriceMock: vi.fn(),
  fetchSdekPriceMock: vi.fn(),
  fetchLocationByAbstractMock: vi.fn()
}))

vi.mock('@/services/delivery.service', () => ({
  fetchPochtaOffices: fetchPochtaOfficesMock,
  fetchSdekOffices: fetchSdekOfficesMock,
  fetchPochtaPrice: fetchPochtaPriceMock,
  fetchSdekPrice: fetchSdekPriceMock
}))

vi.mock('@/services/external.service', () => ({
  fetchLocationByAbstract: fetchLocationByAbstractMock
}))

import { delivery } from '@/store/delivery.module'

describe('store/delivery.module', () => {
  beforeEach(() => {
    fetchPochtaOfficesMock.mockReset()
    fetchSdekOfficesMock.mockReset()
    fetchPochtaPriceMock.mockReset()
    fetchSdekPriceMock.mockReset()
    fetchLocationByAbstractMock.mockReset()
  })

  it('fetches and commits user location', async () => {
    fetchLocationByAbstractMock.mockResolvedValueOnce({ data: { city: 'Moscow' } })
    const commit = vi.fn()
    await delivery.actions.fetchUserLocation({ commit })
    expect(commit).toHaveBeenCalledWith('setUserLocation', { city: 'Moscow' })
  })

  it('maps sdek payload to offices array', async () => {
    fetchSdekOfficesMock.mockResolvedValueOnce({ data: { offices: [{ id: 1 }] } })
    const commit = vi.fn()
    await delivery.actions.fetchSdekOffices({ commit }, { postal_code: '101000', lat: 1, lon: 2 })
    expect(fetchSdekOfficesMock).toHaveBeenCalledWith({ postal_code: '101000', lat: 1, lon: 2 })
    expect(commit).toHaveBeenCalledWith('setSdekOffices', [{ id: 1 }])
  })

  it('clears offices on sdek request error', async () => {
    fetchSdekOfficesMock.mockRejectedValueOnce(new Error('network'))
    const commit = vi.fn()
    await expect(delivery.actions.fetchSdekOffices({ commit }, '101000')).rejects.toThrow('network')
    expect(fetchSdekOfficesMock).toHaveBeenCalledWith({ postal_code: '101000' })
    expect(commit).toHaveBeenCalledWith('setSdekOffices', [])
  })

  it('fetches and commits pochta offices and prices', async () => {
    fetchPochtaOfficesMock.mockResolvedValueOnce({ data: [{ id: 4 }] })
    fetchPochtaPriceMock.mockResolvedValueOnce({ data: { price: 250 } })
    const commit = vi.fn()

    await delivery.actions.fetchPochtaOffices({ commit }, { lat: 11, lon: 22 })
    await delivery.actions.fetchPochtaPrice({ commit }, { destination: 'a', products_mass: 3 })

    expect(fetchPochtaOfficesMock).toHaveBeenCalledWith({ lat: 11, lon: 22 })
    expect(commit).toHaveBeenCalledWith('setPochtaOffices', [{ id: 4 }])
    expect(fetchPochtaPriceMock).toHaveBeenCalledWith({ destination: 'a', products_mass: 3 })
    expect(commit).toHaveBeenCalledWith('setPrice', { price: 250 })
  })

  it('fetches and commits sdek price', async () => {
    fetchSdekPriceMock.mockResolvedValueOnce({ data: { price: 300 } })
    const commit = vi.fn()
    await delivery.actions.fetchSdekPrice({ commit }, { destination: 'b', products_mass: 5 })
    expect(fetchSdekPriceMock).toHaveBeenCalledWith({ destination: 'b', products_mass: 5 })
    expect(commit).toHaveBeenCalledWith('setPrice', { price: 300 })
  })
})
