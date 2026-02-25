const { test, expect } = require('@playwright/test')
const { mockSmokeApi } = require('./helpers/api-mocks')
const { buildStoredUser } = require('./helpers/session')

test('auth smoke: user can login and land on panel', async ({ page }) => {
  const loggedInUser = buildStoredUser({
    username: 'autotest',
    email: 'autotest@example.com'
  })

  await mockSmokeApi(page, {
    routes: {
      'POST /api/token': loggedInUser,
      'GET /api/shop/my/orders': [],
      'GET /api/printjobs': []
    }
  })

  await page.goto('/login')
  await expect(page.locator('.login__title')).toContainText('Войти в профиль')

  await page.fill('input[name="username"]', 'autotest@example.com')
  await page.fill('input[name="password"]', 'secret')
  await page.getByRole('button', { name: 'Войти' }).click()

  await expect(page).toHaveURL(/\/panel$/)
  await expect(page.locator('.header__slogan')).toContainText('Личный кабинет пользователя')
})
