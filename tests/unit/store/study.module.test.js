const { fetchStudyCoursesMock, fetchStudyCourseMock } = vi.hoisted(() => ({
  fetchStudyCoursesMock: vi.fn(),
  fetchStudyCourseMock: vi.fn()
}))

vi.mock('@/services/study.service', () => ({
  fetchStudyCourses: fetchStudyCoursesMock,
  fetchStudyCourse: fetchStudyCourseMock
}))

import { study } from '@/store/study.module'

describe('store/study.module', () => {
  beforeEach(() => {
    fetchStudyCoursesMock.mockReset()
    fetchStudyCourseMock.mockReset()
  })

  it('normalizes missing arrays in setCourseData mutation', () => {
    const state = { courses: [], course: {} }
    study.mutations.setCourseData(state, { id: 1, name: 'C1', lessons: null })
    expect(state.course.id).toBe(1)
    expect(state.course.lessons).toEqual([])
    expect(state.course.teachers).toEqual([])
    expect(state.course.feedbacks).toEqual([])
    expect(state.course.prices).toEqual([])
    expect(state.course.related).toEqual([])
  })

  it('maps course list in setCoursesData mutation', () => {
    const state = { courses: [], course: {} }
    study.mutations.setCoursesData(state, [{ id: 5, name: 'Course', lessons: [], teachers: [] }])
    expect(state.courses).toHaveLength(1)
    expect(state.courses[0].id).toBe(5)
    expect(state.courses[0].name).toBe('Course')
  })

  it('fetches courses action', async () => {
    fetchStudyCoursesMock.mockResolvedValueOnce({ data: [{ id: 2 }] })
    const commit = vi.fn()
    await study.actions.fetchCourses({ commit })
    expect(fetchStudyCoursesMock).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('setCoursesData', [{ id: 2 }])
  })

  it('fetches course action', async () => {
    fetchStudyCourseMock.mockResolvedValueOnce({ data: { id: 8 } })
    const commit = vi.fn()
    await study.actions.fetchCourse({ commit }, 8)
    expect(fetchStudyCourseMock).toHaveBeenCalledWith(8)
    expect(commit).toHaveBeenCalledWith('setCourseData', { id: 8 })
  })
})
