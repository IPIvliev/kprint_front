const {
  fetchDiscountAmountRequestMock,
  fetchUserCartOrderMock,
  syncUserCartOrderMock
} = vi.hoisted(() => ({
  fetchDiscountAmountRequestMock: vi.fn(),
  fetchUserCartOrderMock: vi.fn(),
  syncUserCartOrderMock: vi.fn()
}))

vi.mock('@/services/shop.service', () => ({
  fetchDiscountAmount: fetchDiscountAmountRequestMock,
  fetchUserCartOrder: fetchUserCartOrderMock,
  syncUserCartOrder: syncUserCartOrderMock
}))

import { shop } from '@/store/shop'

describe('store/shop module', () => {
  beforeEach(() => {
    fetchDiscountAmountRequestMock.mockReset()
    fetchUserCartOrderMock.mockReset()
    syncUserCartOrderMock.mockReset()
    window.localStorage.clear()
  })

  it('initialiseCart mutation reads cart and active order from localStorage', () => {
    window.localStorage.setItem('cart', JSON.stringify([{ id: 1, quantity: 2 }]))
    window.localStorage.setItem('shop_active_order_id', '11')
    const state = { cart: [], discount_amount: 0, new_order: '', active_order_id: null }

    shop.mutations.initialiseCart(state)

    expect(state.cart).toEqual([{ id: 1, quantity: 2 }])
    expect(state.active_order_id).toBe(11)
  })

  it('cart getters compute totals', () => {
    const state = {
      cart: [{ id: 1, quantity: 2 }, { id: 2, quantity: 1 }],
      discount_amount: 10
    }
    const rootState = {
      catalog: {
        products: [
          { id: 1, name: 'A', category: 4, price: 100, mass: 200, photo: '/a' },
          { id: 2, name: 'B', category: 4, price: 50, mass: 100, photo: '/b' }
        ]
      },
      delivery: {
        delivery_price: { price: 30 }
      }
    }
    const cartProducts = shop.getters.cartProducts(state, {}, rootState, {})
    const getters = {
      cartProducts,
      cartTotal: shop.getters.cartTotal(state, { cartProducts }, rootState, {})
    }

    expect(cartProducts).toHaveLength(2)
    expect(shop.getters.cartTotal(state, getters, rootState, {})).toBe(250)
    expect(shop.getters.cartTotalWeight(state, getters, rootState, {})).toBe(0.5)
    expect(shop.getters.cartTotalWithDelivery(state, getters, rootState, {})).toBe(255)
  })

  it('AddProductToCart returns not added for out-of-stock product', async () => {
    const state = { cart: [] }
    const rootState = {
      auth: { status: { loggedIn: false } },
      catalog: { products: [{ id: 1, stock: 0 }] }
    }
    const commit = vi.fn()
    const dispatch = vi.fn()

    const result = await shop.actions.AddProductToCart({
      commit,
      state,
      getters: {},
      rootState,
      dispatch
    }, { id: 1 })

    expect(commit).toHaveBeenCalledWith('initialiseCart')
    expect(result).toEqual({ added: false, requiresAuth: false })
    expect(dispatch).not.toHaveBeenCalled()
  })

  it('syncCartOrder throws for unauthorized user', async () => {
    await expect(shop.actions.syncCartOrder({
      commit: vi.fn(),
      getters: { cartProducts: [] },
      rootState: { auth: { status: { loggedIn: false } } },
      state: { cart: [{ id: 1, quantity: 1 }] }
    })).rejects.toThrow('Требуется авторизация')
  })

  it('syncCartOrder builds payload and commits synced order', async () => {
    syncUserCartOrderMock.mockResolvedValueOnce({
      data: { id: 99, is_paid: false, status: 'new' }
    })
    const commit = vi.fn()
    const getters = {
      cartProducts: [{ id: 1, quantity: 2, price: 100 }, { id: 2, quantity: 1, price: 50 }]
    }
    const rootState = {
      auth: { status: { loggedIn: true } },
      delivery: { delivery_price: { price: 40 } }
    }
    const state = { cart: [{ id: 1, quantity: 2 }], active_order_id: null }

    const result = await shop.actions.syncCartOrder({ commit, getters, rootState, state }, {
      fio: 'User',
      delivery_company: 'sdek'
    })

    expect(syncUserCartOrderMock).toHaveBeenCalledWith({
      total_price: 290,
      products_price: 250,
      order_items: [
        { product: 1, quantity: 2 },
        { product: 2, quantity: 1 }
      ],
      fio: 'User',
      delivery_company: 'sdek',
      delivery_price: 40
    })
    expect(commit).toHaveBeenCalledWith('setNewOrder', { id: 99, is_paid: false, status: 'new' })
    expect(commit).toHaveBeenCalledWith('setActiveOrderId', 99)
    expect(result).toEqual({ id: 99, is_paid: false, status: 'new' })
  })

  it('refreshActiveOrderState clears cart when active order is paid', async () => {
    fetchUserCartOrderMock.mockResolvedValueOnce({
      data: { id: 77, is_paid: true }
    })
    const commit = vi.fn()
    const rootState = { auth: { status: { loggedIn: true } } }
    const state = { active_order_id: 77 }

    const result = await shop.actions.refreshActiveOrderState({ state, rootState, commit })
    expect(fetchUserCartOrderMock).toHaveBeenCalledWith(77)
    expect(commit).toHaveBeenCalledWith('clearCartState')
    expect(result).toEqual({ is_paid: true, id: 77 })
  })

  it('refreshActiveOrderState handles 404 and clears active order id', async () => {
    const error = new Error('not found')
    error.response = { status: 404 }
    fetchUserCartOrderMock.mockRejectedValueOnce(error)
    const commit = vi.fn()
    const rootState = { auth: { status: { loggedIn: true } } }
    const state = { active_order_id: 88 }

    const result = await shop.actions.refreshActiveOrderState({ state, rootState, commit })
    expect(commit).toHaveBeenCalledWith('setActiveOrderId', null)
    expect(commit).toHaveBeenCalledWith('setNewOrder', '')
    expect(result).toBe(null)
  })

  it('fetchDiscountAmount commits zero on failure', async () => {
    fetchDiscountAmountRequestMock.mockRejectedValueOnce(new Error('promo error'))
    const commit = vi.fn()
    await expect(shop.actions.fetchDiscountAmount({ commit }, 'BAD')).rejects.toThrow('promo error')
    expect(fetchDiscountAmountRequestMock).toHaveBeenCalledWith({ promocode: 'BAD' })
    expect(commit).toHaveBeenCalledWith('setDiscountAmount', 0)
  })
})
