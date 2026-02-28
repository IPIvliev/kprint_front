import { flushPromises, shallowMount } from '@vue/test-utils'

const {
  fetchStudyManagerCoursesMock,
  fetchStudyManagerTeachersMock,
  assignManagerStudyEnrollmentCuratorMock,
  decideManagerStudyCertificateMock,
  fetchManagerEnrollmentCertificateTemplateMock,
  fetchManagerStudyEnrollmentMock,
  fetchManagerStudyEnrollmentsMock,
  unlockManagerStudyFinalExamMock,
  unlockManagerStudyLessonMock,
  isManagerUserMock
} = vi.hoisted(() => ({
  fetchStudyManagerCoursesMock: vi.fn(),
  fetchStudyManagerTeachersMock: vi.fn(),
  assignManagerStudyEnrollmentCuratorMock: vi.fn(),
  decideManagerStudyCertificateMock: vi.fn(),
  fetchManagerEnrollmentCertificateTemplateMock: vi.fn(),
  fetchManagerStudyEnrollmentMock: vi.fn(),
  fetchManagerStudyEnrollmentsMock: vi.fn(),
  unlockManagerStudyFinalExamMock: vi.fn(),
  unlockManagerStudyLessonMock: vi.fn(),
  isManagerUserMock: vi.fn()
}))

vi.mock('@/services/panel.service', () => ({
  fetchStudyManagerCourses: fetchStudyManagerCoursesMock,
  fetchStudyManagerTeachers: fetchStudyManagerTeachersMock
}))

vi.mock('@/services/study-learning.service', () => ({
  assignManagerStudyEnrollmentCurator: assignManagerStudyEnrollmentCuratorMock,
  decideManagerStudyCertificate: decideManagerStudyCertificateMock,
  fetchManagerEnrollmentCertificateTemplate: fetchManagerEnrollmentCertificateTemplateMock,
  fetchManagerStudyEnrollment: fetchManagerStudyEnrollmentMock,
  fetchManagerStudyEnrollments: fetchManagerStudyEnrollmentsMock,
  unlockManagerStudyFinalExam: unlockManagerStudyFinalExamMock,
  unlockManagerStudyLesson: unlockManagerStudyLessonMock
}))

vi.mock('@/utils/panelMode', () => ({
  isManagerUser: isManagerUserMock
}))

import StudyEnrollmentsView from '@/components/Panel/StudyEnrollments.vue'

function mountView () {
  const $router = { replace: vi.fn() }
  const $store = { state: { auth: { user: { id: 1, username: 'manager' } } } }

  const wrapper = shallowMount(StudyEnrollmentsView, {
    global: {
      mocks: { $router, $store },
      stubs: {
        MenuBlock: true,
        teleport: true
      }
    }
  })

  return { wrapper, $router }
}

describe('components/Panel/StudyEnrollments.vue certificate controls', () => {
  beforeEach(() => {
    fetchStudyManagerCoursesMock.mockReset()
    fetchStudyManagerTeachersMock.mockReset()
    assignManagerStudyEnrollmentCuratorMock.mockReset()
    decideManagerStudyCertificateMock.mockReset()
    fetchManagerEnrollmentCertificateTemplateMock.mockReset()
    fetchManagerStudyEnrollmentMock.mockReset()
    fetchManagerStudyEnrollmentsMock.mockReset()
    unlockManagerStudyFinalExamMock.mockReset()
    unlockManagerStudyLessonMock.mockReset()
    isManagerUserMock.mockReset()

    isManagerUserMock.mockReturnValue(true)
    fetchStudyManagerCoursesMock.mockResolvedValue({ data: [] })
    fetchStudyManagerTeachersMock.mockResolvedValue({ data: [] })
    fetchManagerStudyEnrollmentsMock.mockResolvedValue({ data: [] })
    fetchManagerStudyEnrollmentMock.mockResolvedValue({ data: null })
    fetchManagerEnrollmentCertificateTemplateMock.mockResolvedValue({ data: new Blob() })
  })

  it('shows issued label and hides issue/reject actions when certificate is already issued', async () => {
    const { wrapper } = mountView()
    await flushPromises()

    await wrapper.setData({
      showModal: true,
      modalLoading: false,
      modalError: '',
      currentEnrollment: {
        id: 17,
        certificate_status: 'issued',
        exams: [],
        lesson_progress: []
      }
    })
    await flushPromises()

    expect(wrapper.find('[data-testid="certificate-issued-label"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="certificate-issue-btn"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="certificate-reject-btn"]').exists()).toBe(false)
  })

  it('shows issue/reject actions when certificate is not issued', async () => {
    const { wrapper } = mountView()
    await flushPromises()

    await wrapper.setData({
      showModal: true,
      modalLoading: false,
      modalError: '',
      currentEnrollment: {
        id: 18,
        certificate_status: 'not_reviewed',
        exams: [],
        lesson_progress: []
      }
    })
    await flushPromises()

    expect(wrapper.find('[data-testid="certificate-issued-label"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="certificate-issue-btn"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="certificate-reject-btn"]').exists()).toBe(true)
  })
})
