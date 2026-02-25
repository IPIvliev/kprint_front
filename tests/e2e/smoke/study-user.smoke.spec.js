const { test, expect } = require('@playwright/test')
const { mockSmokeApi } = require('./helpers/api-mocks')
const { applyStoredUser } = require('./helpers/session')

const enrollmentListPayload = [
  {
    id: 1,
    status: 'active',
    course_name: 'FDM печать',
    price_name: 'Базовый тариф',
    price_value: '4500.00',
    lessons_total: 1,
    lessons_completed: 0,
    certificate_status: 'not_reviewed'
  }
]

const enrollmentDetailPayload = {
  id: 1,
  status: 'active',
  course_name: 'FDM печать',
  course_duration: '2 недели',
  course_description: 'Базовый курс по FDM печати',
  teachers_number: 1,
  lessons_total: 1,
  lessons_completed: 0,
  certificate_status: 'not_reviewed',
  price_name: 'Базовый тариф',
  price_value: '4500.00',
  price_description: 'Доступ к базовым урокам',
  lesson_progress: [
    {
      id: 10,
      lesson: 101,
      lesson_order: 1,
      lesson_title: 'Введение',
      lesson_description: 'Старт урока',
      lesson_text_content: 'Текст урока',
      lesson_video_url: '',
      lesson_video_duration_seconds: 0,
      is_lesson_unlocked: true,
      watched_seconds: 0,
      is_video_completed: false,
      is_completed: false,
      lesson_unlock_after_days: 0
    }
  ],
  exams: []
}

test('study smoke: user opens course and lesson in panel', async ({ page }) => {
  await applyStoredUser(page, {
    username: 'student',
    full_name: 'Тестовый Ученик'
  })

  await mockSmokeApi(page, {
    routes: {
      'GET /api/shop/my/orders': [],
      'GET /api/printjobs': [],
      'GET /api/study/my/enrollments': enrollmentListPayload,
      'GET /api/study/my/enrollments/1': enrollmentDetailPayload
    }
  })

  await page.goto('/panel/study/my/courses')
  await expect(page.locator('.panel__title')).toContainText('Обучение')
  await expect(page.locator('.study-card__title')).toContainText('FDM печать')

  await page.getByRole('button', { name: 'Открыть курс' }).click()
  await expect(page).toHaveURL(/\/panel\/study\/my\/courses\/1$/)
  await expect(page.getByRole('heading', { name: 'О курсе' })).toBeVisible()

  await page.getByRole('button', { name: 'Смотреть урок' }).click()
  await expect(page).toHaveURL(/\/panel\/study\/my\/courses\/1\/lessons\/101$/)
  await expect(page.locator('.study-section')).toContainText('Введение')
})
