import { flushPromises, shallowMount } from '@vue/test-utils'

const {
  createStudyManagerTeacherMock,
  deleteStudyManagerTeacherMock,
  fetchStudyManagerTeachersMock,
  updateStudyManagerTeacherMock
} = vi.hoisted(() => ({
  createStudyManagerTeacherMock: vi.fn(),
  deleteStudyManagerTeacherMock: vi.fn(),
  fetchStudyManagerTeachersMock: vi.fn(),
  updateStudyManagerTeacherMock: vi.fn()
}))

vi.mock('@/services/panel.service', () => ({
  createStudyManagerTeacher: createStudyManagerTeacherMock,
  deleteStudyManagerTeacher: deleteStudyManagerTeacherMock,
  fetchStudyManagerTeachers: fetchStudyManagerTeachersMock,
  updateStudyManagerTeacher: updateStudyManagerTeacherMock
}))

import StudyTeachersView from '@/components/Panel/StudyTeachers.vue'

function mountView () {
  return shallowMount(StudyTeachersView, {
    global: {
      stubs: {
        MenuBlock: true,
        PanelRichTextEditor: true
      }
    }
  })
}

describe('components/Panel/StudyTeachers.vue', () => {
  beforeEach(() => {
    createStudyManagerTeacherMock.mockReset()
    deleteStudyManagerTeacherMock.mockReset()
    fetchStudyManagerTeachersMock.mockReset()
    updateStudyManagerTeacherMock.mockReset()
    fetchStudyManagerTeachersMock.mockResolvedValue({ data: [] })
    createStudyManagerTeacherMock.mockResolvedValue({ data: { id: 1 } })
    updateStudyManagerTeacherMock.mockResolvedValue({ data: { id: 1 } })
    deleteStudyManagerTeacherMock.mockResolvedValue({})
    vi.stubGlobal('confirm', vi.fn(() => true))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('creates a teacher and refreshes list without setting UI error', async () => {
    const wrapper = mountView()
    await flushPromises()

    const refreshSpy = vi.spyOn(wrapper.vm, 'fetchData').mockResolvedValue(undefined)
    wrapper.vm.openCreate()
    wrapper.vm.form.name = 'Test teacher'
    wrapper.vm.form.short_description = 'Short'
    wrapper.vm.form.description = 'Description'

    await wrapper.vm.saveTeacher()

    expect(createStudyManagerTeacherMock).toHaveBeenCalledTimes(1)
    expect(refreshSpy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.error).toBe('')
    expect(wrapper.vm.showModal).toBe(false)

    const payload = createStudyManagerTeacherMock.mock.calls[0][0]
    expect(payload).toBeInstanceOf(FormData)
    expect(payload.get('name')).toBe('Test teacher')
  })

  it('deletes a teacher and refreshes list without setting UI error', async () => {
    const wrapper = mountView()
    await flushPromises()

    const refreshSpy = vi.spyOn(wrapper.vm, 'fetchData').mockResolvedValue(undefined)
    await wrapper.vm.removeTeacher({ id: 42, name: 'Teacher' })

    expect(confirm).toHaveBeenCalledTimes(1)
    expect(deleteStudyManagerTeacherMock).toHaveBeenCalledWith(42)
    expect(refreshSpy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.error).toBe('')
  })
})

