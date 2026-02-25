import { promptAuthForCart } from '@/services/cart-auth.service'

describe('cart-auth service', () => {
  it('redirects to login when user confirms', () => {
    const router = { push: vi.fn() }
    vi.spyOn(window, 'confirm').mockReturnValueOnce(true)

    promptAuthForCart({
      router,
      route: { fullPath: '/shop/cart?x=1' }
    })

    expect(router.push).toHaveBeenCalledWith({
      path: '/login',
      query: { next: '/shop/cart?x=1' }
    })
  })

  it('redirects to registration when user declines', () => {
    const router = { push: vi.fn() }
    vi.spyOn(window, 'confirm').mockReturnValueOnce(false)

    promptAuthForCart({
      router,
      route: { path: '/shop/order' }
    })

    expect(router.push).toHaveBeenCalledWith({
      path: '/registration',
      query: { next: '/shop/order' }
    })
  })
})
