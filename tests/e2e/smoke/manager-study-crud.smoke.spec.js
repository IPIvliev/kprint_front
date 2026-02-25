const { test, expect } = require('@playwright/test')
const { mockSmokeApi } = require('./helpers/api-mocks')
const { applyStoredUser } = require('./helpers/session')

async function initManagerSession (page) {
  await applyStoredUser(page, {
    username: 'manager',
    is_manager: true,
    groups: ['manager']
  })

  await page.addInitScript(() => {
    window.localStorage.setItem('panelMode', 'manager')
  })
}

function baseManagerRoutes () {
  return {
    'GET /api/shop/my/orders': [],
    'GET /api/printjobs': []
  }
}

async function acceptNextDialog (page) {
  page.once('dialog', (dialog) => dialog.accept())
}

test('manager study categories: create and delete refreshes table', async ({ page }) => {
  await initManagerSession(page)

  const createdName = 'Category E2E Created'
  let categories = [{ id: 10, title: 'Category Seed', description: 'Seed category', parent: null }]

  await mockSmokeApi(page, {
    routes: {
      ...baseManagerRoutes(),
      'GET /api/study/manager/courses': [],
      'GET /api/study/manager/categories': () => categories,
      'POST /api/study/manager/categories': () => {
        categories = [...categories, { id: 11, title: createdName, description: 'Created', parent: null }]
        return categories[categories.length - 1]
      },
      'DELETE /api/study/manager/categories/10': () => {
        categories = categories.filter((item) => item.id !== 10)
        return { ok: true }
      }
    }
  })

  await page.goto('/panel/study/categories')
  await expect(page.locator('.panel__table table')).toContainText('Category Seed')

  await page.locator('.panel__add-btn .btn--red').click()
  const modal = page.locator('.modal.show')
  await modal.locator('input.form-control[placeholder="Название категории"]').fill(createdName)
  await modal.locator('.modal-footer .btn--black').click()

  await expect(modal).toHaveCount(0)
  await expect(page.locator('.panel__table table')).toContainText(createdName)

  await acceptNextDialog(page)
  await page.locator('.panel__table table tr').first().locator('.panel__table-icon').nth(1).click()
  await expect(page.locator('.panel__table table')).not.toContainText('Category Seed')
  await expect(page.locator('.panel__table table')).toContainText(createdName)
})

test('manager study courses: create and delete refreshes table', async ({ page }) => {
  await initManagerSession(page)

  const createdName = 'Course E2E Created'
  let courses = [{ id: 10, name: 'Course Seed', description: 'Seed course', category: 1, status: 'published' }]

  await mockSmokeApi(page, {
    routes: {
      ...baseManagerRoutes(),
      'GET /api/study/manager/categories': [{ id: 1, title: 'Category 1' }],
      'GET /api/study/manager/teachers': [{ id: 1, name: 'Teacher 1' }],
      'GET /api/study/manager/courses': () => courses,
      'POST /api/study/manager/courses': () => {
        courses = [
          ...courses,
          {
            id: 11,
            name: createdName,
            description: 'Created course',
            category: 1,
            status: 'published'
          }
        ]
        return courses[courses.length - 1]
      },
      'DELETE /api/study/manager/courses/10': () => {
        courses = courses.filter((item) => item.id !== 10)
        return { ok: true }
      }
    }
  })

  await page.goto('/panel/study/courses')
  await expect(page.locator('.panel__table table')).toContainText('Course Seed')

  await page.locator('.panel__add-btn .btn--red').click()
  const modal = page.locator('.modal.show')
  await modal.locator('input.form-control[placeholder="Название курса"]').fill(createdName)
  await modal.locator('select.form-control').first().selectOption('1')
  await modal.locator('.modal-footer .btn--black').click()

  await expect(modal).toHaveCount(0)
  await expect(page.locator('.panel__table table')).toContainText(createdName)

  await acceptNextDialog(page)
  await page.locator('.panel__table table tr').first().locator('.panel__table-icon').nth(1).click()
  await expect(page.locator('.panel__table table')).not.toContainText('Course Seed')
  await expect(page.locator('.panel__table table')).toContainText(createdName)
})

test('manager study lessons: create and delete refreshes table', async ({ page }) => {
  await initManagerSession(page)

  const createdName = 'Lesson E2E Created'
  let lessons = [{ id: 10, title: 'Lesson Seed', description: 'Seed lesson', course: 1, order: 1 }]

  await mockSmokeApi(page, {
    routes: {
      ...baseManagerRoutes(),
      'GET /api/study/manager/courses': [{ id: 1, name: 'Course 1' }],
      'GET /api/study/manager/lessons': () => lessons,
      'POST /api/study/manager/lessons': () => {
        lessons = [
          ...lessons,
          {
            id: 11,
            title: createdName,
            description: 'Created lesson',
            course: 1,
            order: 2
          }
        ]
        return lessons[lessons.length - 1]
      },
      'DELETE /api/study/manager/lessons/10': () => {
        lessons = lessons.filter((item) => item.id !== 10)
        return { ok: true }
      }
    }
  })

  await page.goto('/panel/study/lessons')
  await expect(page.locator('.panel__table table')).toContainText('Lesson Seed')

  await page.locator('.panel__add-btn .btn--red').click()
  const modal = page.locator('.modal.show')
  await modal.locator('input.form-control[placeholder="Тема урока"]').fill(createdName)
  await modal.locator('select.form-control').first().selectOption('1')
  await modal.locator('.modal-footer .btn--black').click()

  await expect(modal).toHaveCount(0)
  await expect(page.locator('.panel__table table')).toContainText(createdName)

  await acceptNextDialog(page)
  await page.locator('.panel__table table tr').first().locator('.panel__table-icon').nth(1).click()
  await expect(page.locator('.panel__table table')).not.toContainText('Lesson Seed')
  await expect(page.locator('.panel__table table')).toContainText(createdName)
})

test('manager study prices: create and delete refreshes table', async ({ page }) => {
  await initManagerSession(page)

  const createdName = 'Price E2E Created'
  let prices = [{ id: 10, name: 'Price Seed', short_description: 'Seed price', course: 1, price: '1000' }]

  await mockSmokeApi(page, {
    routes: {
      ...baseManagerRoutes(),
      'GET /api/study/manager/courses': [{ id: 1, name: 'Course 1' }],
      'GET /api/study/manager/prices': () => prices,
      'POST /api/study/manager/prices': () => {
        prices = [
          ...prices,
          {
            id: 11,
            name: createdName,
            short_description: 'Created price',
            course: 1,
            price: '1200'
          }
        ]
        return prices[prices.length - 1]
      },
      'DELETE /api/study/manager/prices/10': () => {
        prices = prices.filter((item) => item.id !== 10)
        return { ok: true }
      }
    }
  })

  await page.goto('/panel/study/prices')
  await expect(page.locator('.panel__table table')).toContainText('Price Seed')

  await page.locator('.panel__add-btn .btn--red').click()
  const modal = page.locator('.modal.show')
  await modal.locator('input.form-control[placeholder="Название варианта обучения"]').fill(createdName)
  await modal.locator('select.form-control').first().selectOption('1')
  await modal.locator('.modal-footer .btn--black').click()

  await expect(modal).toHaveCount(0)
  await expect(page.locator('.panel__table table')).toContainText(createdName)

  await acceptNextDialog(page)
  await page.locator('.panel__table table tr').first().locator('.panel__table-icon').nth(1).click()
  await expect(page.locator('.panel__table table')).not.toContainText('Price Seed')
  await expect(page.locator('.panel__table table')).toContainText(createdName)
})

test('manager study feedbacks: create and delete refreshes table', async ({ page }) => {
  await initManagerSession(page)

  const createdName = 'Feedback E2E Created'
  let feedbacks = [{ id: 10, name: 'Feedback Seed', description: 'Seed feedback', course: 1, status: 'published' }]

  await mockSmokeApi(page, {
    routes: {
      ...baseManagerRoutes(),
      'GET /api/study/manager/courses': [{ id: 1, name: 'Course 1' }],
      'GET /api/study/manager/feedbacks': () => feedbacks,
      'POST /api/study/manager/feedbacks': () => {
        feedbacks = [
          ...feedbacks,
          {
            id: 11,
            name: createdName,
            description: 'Created feedback',
            course: 1,
            status: 'published'
          }
        ]
        return feedbacks[feedbacks.length - 1]
      },
      'DELETE /api/study/manager/feedbacks/10': () => {
        feedbacks = feedbacks.filter((item) => item.id !== 10)
        return { ok: true }
      }
    }
  })

  await page.goto('/panel/study/feedbacks')
  await expect(page.locator('.panel__table table')).toContainText('Feedback Seed')

  await page.locator('.panel__add-btn .btn--red').click()
  const modal = page.locator('.modal.show')
  await modal.locator('input.form-control[placeholder="ФИО"]').fill(createdName)
  await modal.locator('select.form-control').first().selectOption('1')
  await modal.locator('.modal-footer .btn--black').click()

  await expect(modal).toHaveCount(0)
  await expect(page.locator('.panel__table table')).toContainText(createdName)

  await acceptNextDialog(page)
  await page.locator('.panel__table table tr').first().locator('.panel__table-icon').nth(1).click()
  await expect(page.locator('.panel__table table')).not.toContainText('Feedback Seed')
  await expect(page.locator('.panel__table table')).toContainText(createdName)
})

