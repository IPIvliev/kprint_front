import router from '@/router'

describe('router configuration', () => {
  it('keeps route names unique', () => {
    const names = router.getRoutes().map((route) => route.name).filter(Boolean)
    expect(new Set(names).size).toBe(names.length)
  })

  it('contains critical public routes', () => {
    const byName = Object.fromEntries(router.getRoutes().map((route) => [route.name, route.path]))
    expect(byName.Home).toBe('/')
    expect(byName.Innovations).toBe('/it-innovations')
    expect(byName.MainShop).toBe('/shop')
    expect(byName.MainStudy).toBe('/study')
    expect(byName.MainPrint).toBe('/print')
    expect(byName.PanelStudyUserCourses).toBe('/panel/study/my/courses')
    expect(byName.LegalPersonalDataPolicy).toBe('/legal/personal-data-policy')
    expect(byName.LegalPdConsent).toBe('/legal/pd-consent')
    expect(byName.LegalAdsConsent).toBe('/legal/ads-consent')
    expect(byName.LegalTermsOffer).toBe('/legal/terms-offer')
    expect(byName.LegalDeliveryPayment).toBe('/legal/delivery-payment')
    expect(byName.LegalReturns).toBe('/legal/returns')
  })

  it('redirects legacy innovations url to the new it-innovations route', () => {
    const legacyRoute = router.getRoutes().find((route) => route.path === '/innovations')
    expect(legacyRoute?.redirect).toBe('/it-innovations')
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
