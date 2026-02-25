const { test, expect } = require('@playwright/test')
const { mockSmokeApi } = require('./helpers/api-mocks')
const { applyStoredUser } = require('./helpers/session')

test('shop smoke: categories page is available', async ({ page }) => {
  await mockSmokeApi(page, {
    routes: {
      'GET /api/shop/categories': [
        { id: 1, parent: null, level: 0, title: 'Категория 1', name: 'Категория 1' }
      ]
    }
  })

  await page.goto('/shop')
  await expect(page.locator('h1.title')).toContainText('Каталог продукции')
})

test('print smoke: panel print orders page opens for authenticated user', async ({ page }) => {
  await applyStoredUser(page, {
    username: 'print-user'
  })

  await mockSmokeApi(page, {
    routes: {
      'GET /api/shop/my/orders': [],
      'GET /api/printjobs': [
        {
          id: 701,
          title: 'Тестовый заказ',
          created_at: '2026-02-20T10:00:00Z',
          status: 'NEW',
          status_label: 'Новый',
          quantity: 1,
          dimension_x_mm: 10,
          dimension_y_mm: 20,
          dimension_z_mm: 30
        }
      ],
      'GET /api/printjobs/701': {
        id: 701,
        title: 'Тестовый заказ',
        created_at: '2026-02-20T10:00:00Z',
        status: 'NEW',
        status_label: 'Новый',
        quantity: 1,
        dimension_x_mm: 10,
        dimension_y_mm: 20,
        dimension_z_mm: 30
      }
    }
  })

  await page.goto('/panel/print/orders')
  await expect(page.locator('.panel__title')).toContainText('Заказы на печать')
  await expect(page.locator('table')).toContainText('Тестовый заказ')

  await page.getByRole('button', { name: 'Открыть' }).click()
  await expect(page.locator('.print-order-modal__head')).toContainText('Заказ #701')
})
