import router from '@/router'

describe('router configuration', () => {
  it('keeps route names unique', () => {
    const names = router.getRoutes().map((route) => route.name).filter(Boolean)
    expect(new Set(names).size).toBe(names.length)
  })

  it('contains critical public routes', () => {
    const byName = Object.fromEntries(router.getRoutes().map((route) => [route.name, route.path]))
    expect(byName.Home).toBe('/')
    expect(byName.MainShop).toBe('/shop')
    expect(byName.MainStudy).toBe('/study')
    expect(byName.MainPrint).toBe('/print')
    expect(byName.PanelStudyUserCourses).toBe('/panel/study/my/courses')
  })

  it('contains critical panel routes', () => {
    const byName = Object.fromEntries(router.getRoutes().map((route) => [route.name, route.path]))
    expect(byName.PanelStudyUserCourse).toBe('/panel/study/my/courses/:enrollmentId')
    expect(byName.PanelStudyUserLesson).toBe('/panel/study/my/courses/:enrollmentId/lessons/:lessonId')
    expect(byName.PanelStudyUserExam).toBe('/panel/study/my/courses/:enrollmentId/exams/:examId')
    expect(byName.PanelStudyEnrollments).toBe('/panel/study/enrollments')
    expect(byName.PanelShopOrders).toBe('/panel/shop/orders')
  })
})
