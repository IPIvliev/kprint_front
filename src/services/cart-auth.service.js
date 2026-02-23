function resolveNextPath (route) {
  const fullPath = route?.fullPath
  if (typeof fullPath === 'string' && fullPath.startsWith('/')) {
    return fullPath
  }
  const path = route?.path
  if (typeof path === 'string' && path.startsWith('/')) {
    return path
  }
  return '/shop/cart'
}

export function promptAuthForCart ({ router, route }) {
  const next = resolveNextPath(route)
  const goToLogin = typeof window === 'undefined'
    ? true
    : window.confirm(
      'Товар добавлен в корзину. Чтобы привязать заказ к профилю, войдите в аккаунт. Нажмите OK для входа или Отмена для регистрации.'
    )
  const targetPath = goToLogin ? '/login' : '/registration'
  router.push({
    path: targetPath,
    query: { next }
  })
}
