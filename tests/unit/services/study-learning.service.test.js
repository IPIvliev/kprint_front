const { apiMock } = vi.hoisted(() => ({
  apiMock: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn()
  }
}))

vi.mock('@/services/http', () => ({
  api: apiMock
}))

import {
  assignManagerStudyEnrollmentCurator,
  createMyStudyEnrollment,
  decideManagerStudyCertificate,
  fetchManagerEnrollmentCertificateTemplate,
  fetchManagerStudyEnrollment,
  fetchManagerStudyEnrollments,
  fetchMyEnrollmentCertificatePdf,
  fetchMyEnrollmentExamDetail,
  fetchMyEnrollmentExams,
  fetchMyStudyEnrollment,
  fetchMyStudyEnrollments,
  payMyStudyEnrollment,
  submitMyEnrollmentExam,
  unlockManagerStudyFinalExam,
  unlockManagerStudyLesson,
  updateMyLessonProgress
} from '@/services/study-learning.service'

describe('study-learning service', () => {
  beforeEach(() => {
    apiMock.get.mockReset()
    apiMock.post.mockReset()
    apiMock.patch.mockReset()
  })

  it('works with student enrollment flow endpoints', async () => {
    await fetchMyStudyEnrollments()
    await createMyStudyEnrollment({ course: 1, price: 2 })
    await fetchMyStudyEnrollment('7')
    await payMyStudyEnrollment('7', { payment_reference: 'ref' })
    await updateMyLessonProgress('7', '5', { watched_seconds: 60 })
    await fetchMyEnrollmentExams('7')
    await fetchMyEnrollmentExamDetail('7', '9')
    await submitMyEnrollmentExam('7', '9', { answers: [] })
    await fetchMyEnrollmentCertificatePdf('7')

    expect(apiMock.get).toHaveBeenCalledWith('/api/study/my/enrollments')
    expect(apiMock.post).toHaveBeenCalledWith('/api/study/my/enrollments', { course: 1, price: 2 })
    expect(apiMock.get).toHaveBeenCalledWith('/api/study/my/enrollments/7')
    expect(apiMock.post).toHaveBeenCalledWith('/api/study/my/enrollments/7/pay', { payment_reference: 'ref' })
    expect(apiMock.patch).toHaveBeenCalledWith('/api/study/my/enrollments/7/lessons/5/progress', { watched_seconds: 60 })
    expect(apiMock.get).toHaveBeenCalledWith('/api/study/my/enrollments/7/exams')
    expect(apiMock.get).toHaveBeenCalledWith('/api/study/my/enrollments/7/exams/9')
    expect(apiMock.post).toHaveBeenCalledWith('/api/study/my/enrollments/7/exams/9/submit', { answers: [] })
    expect(apiMock.get).toHaveBeenCalledWith('/api/study/my/enrollments/7/certificate/pdf', { responseType: 'blob' })
  })

  it('works with manager endpoints for enrollments', async () => {
    await fetchManagerStudyEnrollments({ course: '1' })
    await fetchManagerStudyEnrollment('3')
    await assignManagerStudyEnrollmentCurator('3', { curator: 9 })
    await unlockManagerStudyLesson('3', '4', { open_lesson: true })
    await unlockManagerStudyFinalExam('3')
    await decideManagerStudyCertificate('3', { status: 'issued' })
    await fetchManagerEnrollmentCertificateTemplate('3')

    expect(apiMock.get).toHaveBeenCalledWith('/api/study/manager/enrollments', { params: { course: '1' } })
    expect(apiMock.get).toHaveBeenCalledWith('/api/study/manager/enrollments/3')
    expect(apiMock.post).toHaveBeenCalledWith('/api/study/manager/enrollments/3/assign-curator', { curator: 9 })
    expect(apiMock.post).toHaveBeenCalledWith('/api/study/manager/enrollments/3/lessons/4/unlock', { open_lesson: true })
    expect(apiMock.post).toHaveBeenCalledWith('/api/study/manager/enrollments/3/final-exam/unlock')
    expect(apiMock.post).toHaveBeenCalledWith('/api/study/manager/enrollments/3/certificate', { status: 'issued' })
    expect(apiMock.get).toHaveBeenCalledWith('/api/study/manager/enrollments/3/certificate/template', { responseType: 'blob' })
  })
})
