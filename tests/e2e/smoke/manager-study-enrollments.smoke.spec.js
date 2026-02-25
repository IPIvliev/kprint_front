const { test, expect } = require('@playwright/test')
const { mockSmokeApi } = require('./helpers/api-mocks')
const { applyStoredUser } = require('./helpers/session')

const managerEnrollmentList = [
  {
    id: 55,
    user_id: 1001,
    user_full_name: 'Ученик Автотест',
    user_email: 'student@example.com',
    course: 1,
    course_name: 'FDM печать',
    status: 'active',
    curator_name: 'Иван Иванов',
    lessons_completed: 0,
    lessons_total: 1,
    certificate_status: 'not_reviewed'
  }
]

const managerEnrollmentDetail = {
  id: 55,
  user_id: 1001,
  user_full_name: 'Ученик Автотест',
  user_email: 'student@example.com',
  course: 1,
  course_name: 'FDM печать',
  status: 'active',
  curator: 10,
  curator_name: 'Иван Иванов',
  price_name: 'Базовый тариф',
  certificate_status: 'not_reviewed',
  lesson_progress: [
    {
      id: 1,
      lesson: 101,
      lesson_order: 1,
      lesson_title: 'Введение',
      is_lesson_unlocked: true,
      is_exam_unlocked: false,
      is_video_completed: false,
      is_completed: false
    }
  ],
  exams: []
}

test('manager smoke: study enrollments page opens modal', async ({ page }) => {
  await applyStoredUser(page, {
    username: 'manager',
    is_manager: true,
    groups: ['manager']
  })

  await page.addInitScript(() => {
    window.localStorage.setItem('panelMode', 'manager')
    window.open = () => ({ closed: false })
  })

  await mockSmokeApi(page, {
    routes: {
      'GET /api/shop/my/orders': [],
      'GET /api/printjobs': [],
      'GET /api/study/manager/courses': [{ id: 1, name: 'FDM печать' }],
      'GET /api/study/manager/teachers': [{ id: 10, name: 'Иван Иванов' }],
      'GET /api/study/manager/enrollments': managerEnrollmentList,
      'GET /api/study/manager/enrollments/55': managerEnrollmentDetail
    }
  })

  await page.goto('/panel/study/enrollments')
  await expect(page.locator('.panel__title')).toContainText('Ученики обучения')
  await expect(page.locator('table')).toContainText('Ученик Автотест')

  await page.getByRole('button', { name: 'Управлять' }).click()
  await expect(page.locator('.panel-study-manager-modal__title')).toContainText('Ученик Автотест')
  await expect(page.getByText('Решение по сертификату', { exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Посмотреть шаблон сертификата (PDF)' })).toBeVisible()
})
