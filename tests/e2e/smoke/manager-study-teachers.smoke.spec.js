const { test, expect } = require('@playwright/test')
const { mockSmokeApi } = require('./helpers/api-mocks')
const { applyStoredUser } = require('./helpers/session')

test('manager smoke: study teachers supports create and delete flow', async ({ page }) => {
  await applyStoredUser(page, {
    username: 'manager',
    is_manager: true,
    groups: ['manager']
  })

  await page.addInitScript(() => {
    window.localStorage.setItem('panelMode', 'manager')
  })

  const createdTeacherName = 'Teacher E2E Created'
  let createCalls = 0
  let deleteCalls = 0
  let teachers = [
    {
      id: 10,
      name: 'Teacher Seed',
      short_description: 'Seed teacher'
    }
  ]

  await mockSmokeApi(page, {
    routes: {
      'GET /api/shop/my/orders': [],
      'GET /api/printjobs': [],
      'GET /api/study/manager/courses': [],
      'GET /api/study/manager/teachers': () => teachers,
      'POST /api/study/manager/teachers': () => {
        createCalls += 1
        teachers = [
          ...teachers,
          {
            id: 11,
            name: createdTeacherName,
            short_description: 'Created in smoke'
          }
        ]
        return teachers[teachers.length - 1]
      },
      'DELETE /api/study/manager/teachers/10': () => {
        deleteCalls += 1
        teachers = teachers.filter((item) => item.id !== 10)
        return { ok: true }
      }
    }
  })

  await page.goto('/panel/study/teachers')
  await expect(page.locator('.panel__title')).toBeVisible()
  await expect(page.locator('.panel__table table')).toContainText('Teacher Seed')

  await page.locator('.panel__add-btn .btn--red').click()
  await expect(page.locator('.modal.show')).toBeVisible()
  await page.locator('.modal.show input.form-control').first().fill(createdTeacherName)
  await page.locator('.modal.show .modal-footer .btn--black').click()

  await expect(page.locator('.modal.show')).toHaveCount(0)
  await expect(page.locator('.panel__table table')).toContainText(createdTeacherName)
  expect(createCalls).toBe(1)

  page.once('dialog', (dialog) => dialog.accept())
  await page.locator('.panel__table table tr').first().locator('.panel__table-icon').nth(1).click()

  await expect(page.locator('.panel__table table')).not.toContainText('Teacher Seed')
  await expect(page.locator('.panel__table table')).toContainText(createdTeacherName)
  expect(deleteCalls).toBe(1)
})

