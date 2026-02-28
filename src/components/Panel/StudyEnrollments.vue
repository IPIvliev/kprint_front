<template>
  <div class="content content--pbn">
    <div class="panel">
      <div class="container">
        <div class="row">
          <menu-block />
          <div class="col-xxl-9 col-xl-8">
            <div class="panel__block">
              <div class="panel__head">
                <div class="panel__title">Ученики обучения<span>{{ filteredEnrollments.length }}</span></div>
                <div class="panel__add-btn">
                  <button type="button" class="btn btn--grayborder btn--big" :disabled="loading" @click="loadEnrollments">
                    {{ loading ? 'Обновление...' : 'Обновить' }}
                  </button>
                </div>
              </div>
              <div class="panel__body">
                <div v-if="notice" class="panel-study-manager__notice panel-study-manager__notice--success">{{ notice }}</div>
                <div v-if="error" class="panel-study-manager__notice panel-study-manager__notice--error">{{ error }}</div>

                <div class="panel-study-manager__filters">
                  <div class="panel__formrow">
                    <label>Курс</label>
                    <select v-model="selectedCourse" class="form-control" @change="loadEnrollments">
                      <option value="">Все курсы</option>
                      <option v-for="course in courses" :key="course.id" :value="String(course.id)">
                        {{ course.name }}
                      </option>
                    </select>
                  </div>
                  <div class="panel__formrow">
                    <label>Статус</label>
                    <select v-model="selectedStatus" class="form-control" @change="loadEnrollments">
                      <option value="">Все статусы</option>
                      <option value="pending_payment">Ожидает оплаты</option>
                      <option value="active">Активен</option>
                      <option value="completed">Завершен</option>
                      <option value="cancelled">Отменен</option>
                    </select>
                  </div>
                  <div class="panel__formrow">
                    <label>Куратор</label>
                    <select v-model="selectedCurator" class="form-control" @change="loadEnrollments">
                      <option value="">Все кураторы</option>
                      <option v-for="teacher in teachers" :key="teacher.id" :value="String(teacher.id)">
                        {{ teacher.name }}
                      </option>
                    </select>
                  </div>
                  <div class="panel__formrow">
                    <label>Поиск</label>
                    <input
                      v-model="searchTerm"
                      class="form-control"
                      type="text"
                      placeholder="Имя, email, курс, куратор"
                    >
                  </div>
                </div>

                <div class="panel__table panel__table--study-manager">
                  <table>
                    <tr v-for="row in filteredEnrollments" :key="`enrollment-${row.id}`">
                      <td>
                        <span class="panel__table-title">{{ enrollmentUserLabel(row) }}</span>
                        <span class="panel__table-sn panel__table-sn--detail">{{ row.user_email || '—' }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Курс:</span>
                        <span class="panel__table-text">{{ row.course_name || '—' }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Статус:</span>
                        <span class="panel__table-text">{{ statusLabel(row.status) }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Куратор:</span>
                        <span class="panel__table-text">{{ row.curator_name || 'Не назначен' }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Прогресс:</span>
                        <span class="panel__table-text">
                          {{ Number(row.lessons_completed || 0) }}/{{ Number(row.lessons_total || 0) }}
                        </span>
                      </td>
                      <td>
                        <button type="button" class="btn btn--grayborder btn-sm" @click="openEnrollment(row.id)">
                          Управлять
                        </button>
                      </td>
                    </tr>
                  </table>
                  <div v-if="loading" class="panel__table-text">Загрузка...</div>
                  <div v-else-if="!filteredEnrollments.length" class="panel__table-text">Ничего не найдено</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <teleport to="body">
      <div v-if="showModal" class="panel-study-manager-modal-overlay" @click.self="closeModal">
        <div class="panel-study-manager-modal">
          <button type="button" class="panel-study-manager-modal__close" @click="closeModal">x</button>
          <h3 v-if="currentEnrollment" class="panel-study-manager-modal__title">
            {{ enrollmentUserLabel(currentEnrollment) }}
          </h3>
          <div v-if="modalLoading" class="panel__table-text">Загрузка данных ученика...</div>
          <div v-else-if="modalError" class="panel__table-text">{{ modalError }}</div>
          <div v-else-if="currentEnrollment" class="panel-study-manager-modal__body">
            <div class="panel-study-manager-modal__grid">
              <div class="panel-study-manager-modal__card">
                <div class="panel-study-manager-modal__label">Курс</div>
                <div class="panel-study-manager-modal__value">{{ currentEnrollment.course_name || '—' }}</div>
              </div>
              <div class="panel-study-manager-modal__card">
                <div class="panel-study-manager-modal__label">Тариф</div>
                <div class="panel-study-manager-modal__value">{{ currentEnrollment.price_name || '—' }}</div>
              </div>
              <div class="panel-study-manager-modal__card">
                <div class="panel-study-manager-modal__label">Статус обучения</div>
                <div class="panel-study-manager-modal__value">{{ statusLabel(currentEnrollment.status) }}</div>
              </div>
              <div class="panel-study-manager-modal__card">
                <div class="panel-study-manager-modal__label">Сертификат</div>
                <div class="panel-study-manager-modal__value">{{ certificateLabel(currentEnrollment.certificate_status) }}</div>
              </div>
            </div>

            <div class="panel-study-manager-modal__section">
              <div class="panel-study-manager-modal__section-title">Назначение куратора</div>
              <div class="panel-study-manager-modal__section-row">
                <select v-model="modalCurator" class="form-control">
                  <option value="">Без куратора</option>
                  <option v-for="teacher in courseTeachers" :key="teacher.id" :value="String(teacher.id)">
                    {{ teacher.name }}
                  </option>
                </select>
                <button
                  type="button"
                  class="btn btn--black btn-sm"
                  :disabled="curatorSubmitting"
                  @click="saveCurator"
                >
                  {{ curatorSubmitting ? 'Сохранение...' : 'Сохранить куратора' }}
                </button>
              </div>
            </div>

            <div class="panel-study-manager-modal__section">
              <div class="panel-study-manager-modal__section-title">Уроки и доступы</div>
              <div v-if="!sortedLessonProgress.length" class="panel__table-text">Для курса нет уроков.</div>
              <div v-else class="panel-study-manager-lessons">
                <article
                  v-for="progress in sortedLessonProgress"
                  :key="`manager-lesson-${progress.id}`"
                  class="panel-study-manager-lesson"
                >
                  <div class="panel-study-manager-lesson__head">
                    <strong>{{ progress.lesson_order }}. {{ progress.lesson_title }}</strong>
                    <span>Видео: {{ progress.is_video_completed ? 'просмотрено' : 'не просмотрено' }}</span>
                  </div>
                  <div class="panel-study-manager-lesson__meta">
                    <span>Урок: {{ progress.is_lesson_unlocked ? 'открыт' : 'закрыт' }}</span>
                    <span>Экзамен: {{ progress.is_exam_unlocked ? 'открыт' : 'закрыт' }}</span>
                    <span>Завершен: {{ progress.is_completed ? 'да' : 'нет' }}</span>
                  </div>
                  <div class="panel-study-manager-lesson__actions">
                    <button
                      type="button"
                      class="btn btn--grayborder btn-sm"
                      :disabled="isLessonSubmitting(progress.lesson)"
                      @click="unlockLesson(progress.lesson)"
                    >
                      Открыть урок
                    </button>
                    <button
                      type="button"
                      class="btn btn--red btn-sm"
                      :disabled="isLessonSubmitting(progress.lesson)"
                      @click="unlockLessonExam(progress.lesson)"
                    >
                      Открыть урок + экзамен
                    </button>
                  </div>
                  <div class="panel-study-manager-lesson__exam-state">
                    <span v-if="lessonExam(progress.lesson)">
                      Экзамен: {{ lessonExam(progress.lesson).is_passed ? 'сдан' : (lessonExam(progress.lesson).is_unlocked ? 'открыт' : 'закрыт') }},
                      попыток: {{ Number(lessonExam(progress.lesson).attempts_count || 0) }}
                    </span>
                    <span v-else>Экзамен по уроку не настроен</span>
                  </div>
                </article>
              </div>
            </div>

            <div class="panel-study-manager-modal__section">
              <div class="panel-study-manager-modal__section-title">Итоговый экзамен</div>
              <div class="panel-study-manager-modal__section-row">
                <div class="panel-study-manager-modal__hint">
                  <template v-if="finalExam">
                    Статус: {{ finalExam.is_passed ? 'сдан' : (finalExam.is_unlocked ? 'открыт' : 'закрыт') }},
                    попыток: {{ Number(finalExam.attempts_count || 0) }}
                  </template>
                  <template v-else>Итоговый экзамен не настроен.</template>
                </div>
                <button
                  type="button"
                  class="btn btn--grayborder btn-sm"
                  :disabled="finalExamSubmitting"
                  @click="unlockFinalExam"
                >
                  {{ finalExamSubmitting ? 'Открываем...' : 'Открыть итоговый экзамен' }}
                </button>
              </div>
            </div>

            <div class="panel-study-manager-modal__section">
              <div class="panel-study-manager-modal__section-title">Решение по сертификату</div>
              <div v-if="isCertificateIssued" class="panel-study-manager-modal__section-row">
                <div data-testid="certificate-issued-label" class="panel-study-manager-modal__hint panel-study-manager-modal__hint--ok">
                  Сертификат выдан
                </div>
                <button
                  type="button"
                  class="btn btn--grayborder btn-sm"
                  :disabled="certificateTemplateLoading"
                  @click="openCertificateTemplate"
                >
                  {{ certificateTemplateLoading ? 'Подготовка PDF...' : 'Посмотреть шаблон сертификата (PDF)' }}
                </button>
              </div>
              <template v-else>
                <div class="panel__formrow">
                  <label>Комментарий</label>
                  <textarea
                    v-model="certificateComment"
                    rows="4"
                    class="form-control"
                    placeholder="Комментарий к решению по сертификату"
                  ></textarea>
                </div>
                <div class="panel-study-manager-modal__section-row">
                  <button
                    data-testid="certificate-issue-btn"
                    type="button"
                    class="btn btn--black btn-sm"
                    :disabled="certificateSubmitting === 'issued'"
                    @click="setCertificateDecision('issued')"
                  >
                    {{ certificateSubmitting === 'issued' ? 'Сохраняем...' : 'Выдать сертификат' }}
                  </button>
                  <button
                    data-testid="certificate-reject-btn"
                    type="button"
                    class="btn btn--grayborder btn-sm"
                    :disabled="certificateSubmitting === 'rejected'"
                    @click="setCertificateDecision('rejected')"
                  >
                    {{ certificateSubmitting === 'rejected' ? 'Сохраняем...' : 'Отклонить сертификат' }}
                  </button>
                  <button
                    type="button"
                    class="btn btn--grayborder btn-sm"
                    :disabled="certificateTemplateLoading"
                    @click="openCertificateTemplate"
                  >
                    {{ certificateTemplateLoading ? 'Подготовка PDF...' : 'Посмотреть шаблон сертификата (PDF)' }}
                  </button>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import MenuBlock from '../elements/Panel/MenuBlock.vue'
import { fetchStudyManagerCourses, fetchStudyManagerTeachers } from '@/services/panel.service'
import { isManagerUser } from '@/utils/panelMode'
import {
  assignManagerStudyEnrollmentCurator,
  decideManagerStudyCertificate,
  fetchManagerEnrollmentCertificateTemplate,
  fetchManagerStudyEnrollment,
  fetchManagerStudyEnrollments,
  unlockManagerStudyFinalExam,
  unlockManagerStudyLesson
} from '@/services/study-learning.service'

export default {
  name: 'StudyEnrollments',
  components: { MenuBlock },
  data () {
    return {
      courses: [],
      teachers: [],
      enrollments: [],
      selectedCourse: '',
      selectedStatus: '',
      selectedCurator: '',
      searchTerm: '',
      loading: false,
      error: '',
      notice: '',
      showModal: false,
      modalLoading: false,
      modalError: '',
      currentEnrollment: null,
      courseTeachers: [],
      modalCurator: '',
      curatorSubmitting: false,
      lessonSubmittingById: {},
      finalExamSubmitting: false,
      certificateComment: '',
      certificateSubmitting: '',
      certificateTemplateLoading: false
    }
  },
  computed: {
    filteredEnrollments () {
      const term = String(this.searchTerm || '').trim().toLowerCase()
      if (!term) {
        return this.enrollments
      }
      return this.enrollments.filter((item) => {
        const fields = [
          this.enrollmentUserLabel(item),
          item.user_email,
          item.course_name,
          item.curator_name
        ]
        return fields.some((value) => String(value || '').toLowerCase().includes(term))
      })
    },
    sortedLessonProgress () {
      const rows = Array.isArray(this.currentEnrollment?.lesson_progress) ? this.currentEnrollment.lesson_progress : []
      return [...rows].sort((a, b) => {
        const orderA = Number(a?.lesson_order || 0)
        const orderB = Number(b?.lesson_order || 0)
        if (orderA !== orderB) {
          return orderA - orderB
        }
        return Number(a?.id || 0) - Number(b?.id || 0)
      })
    },
    finalExam () {
      const exams = Array.isArray(this.currentEnrollment?.exams) ? this.currentEnrollment.exams : []
      return exams.find((item) => item?.exam_type === 'final') || null
    },
    isCertificateIssued () {
      return String(this.currentEnrollment?.certificate_status || '').toLowerCase() === 'issued'
    }
  },
  async mounted () {
    const user = this.$store?.state?.auth?.user || null
    if (!isManagerUser(user)) {
      this.$router.replace('/panel/study')
      return
    }
    await this.fetchReferenceData()
    await this.loadEnrollments()
  },
  methods: {
    enrollmentUserLabel (enrollment) {
      return enrollment?.user_full_name || enrollment?.username || enrollment?.user_email || `Пользователь #${enrollment?.user_id || '—'}`
    },
    statusLabel (status) {
      const value = String(status || '').toLowerCase()
      if (value === 'pending_payment') return 'Ожидает оплаты'
      if (value === 'active') return 'Активен'
      if (value === 'completed') return 'Завершен'
      if (value === 'cancelled') return 'Отменен'
      return status || '—'
    },
    certificateLabel (status) {
      const value = String(status || '').toLowerCase()
      if (value === 'issued') return 'Сертификат выдан'
      if (value === 'rejected') return 'Сертификат отклонен'
      if (value === 'not_reviewed') return 'Не рассмотрен'
      return status || '—'
    },
    lessonExam (lessonId) {
      const exams = Array.isArray(this.currentEnrollment?.exams) ? this.currentEnrollment.exams : []
      return exams.find((item) => item?.exam_type === 'lesson' && Number(item.lesson_id) === Number(lessonId)) || null
    },
    isLessonSubmitting (lessonId) {
      return this.lessonSubmittingById[String(lessonId)] === true
    },
    async fetchReferenceData () {
      try {
        const [coursesResponse, teachersResponse] = await Promise.all([
          fetchStudyManagerCourses(),
          fetchStudyManagerTeachers()
        ])
        this.courses = Array.isArray(coursesResponse?.data) ? coursesResponse.data : []
        this.teachers = Array.isArray(teachersResponse?.data) ? teachersResponse.data : []
      } catch (error) {
        this.error = error?.userMessage || 'Не удалось загрузить справочники обучения.'
      }
    },
    async loadEnrollments () {
      this.loading = true
      this.error = ''
      try {
        const params = {}
        if (this.selectedCourse) params.course = this.selectedCourse
        if (this.selectedStatus) params.status = this.selectedStatus
        if (this.selectedCurator) params.curator = this.selectedCurator
        const response = await fetchManagerStudyEnrollments(params)
        this.enrollments = Array.isArray(response?.data) ? response.data : []
      } catch (error) {
        this.error = error?.userMessage || 'Не удалось загрузить список учеников.'
      } finally {
        this.loading = false
      }
    },
    updateEnrollmentInList (payload) {
      if (!payload?.id) {
        return
      }
      const index = this.enrollments.findIndex((row) => Number(row.id) === Number(payload.id))
      if (index === -1) {
        this.enrollments = [payload, ...this.enrollments]
        return
      }
      this.enrollments.splice(index, 1, {
        ...this.enrollments[index],
        ...payload
      })
    },
    async loadCourseTeachers (courseId) {
      if (!courseId) {
        this.courseTeachers = []
        return
      }
      try {
        const response = await fetchStudyManagerTeachers({ course: courseId })
        this.courseTeachers = Array.isArray(response?.data) ? response.data : []
      } catch (error) {
        this.courseTeachers = []
      }
    },
    async openEnrollment (enrollmentId) {
      this.showModal = true
      this.modalLoading = true
      this.modalError = ''
      this.currentEnrollment = null
      this.certificateComment = ''
      this.modalCurator = ''
      try {
        const response = await fetchManagerStudyEnrollment(enrollmentId)
        this.currentEnrollment = response?.data || null
        this.updateEnrollmentInList(this.currentEnrollment)
        this.certificateComment = this.currentEnrollment?.certificate_decision_comment || ''
        this.modalCurator = this.currentEnrollment?.curator ? String(this.currentEnrollment.curator) : ''
        await this.loadCourseTeachers(this.currentEnrollment?.course)
      } catch (error) {
        this.modalError = error?.userMessage || 'Не удалось загрузить ученика.'
      } finally {
        this.modalLoading = false
      }
    },
    closeModal () {
      this.showModal = false
      this.modalLoading = false
      this.modalError = ''
      this.currentEnrollment = null
      this.courseTeachers = []
      this.modalCurator = ''
      this.lessonSubmittingById = {}
      this.finalExamSubmitting = false
      this.certificateSubmitting = ''
      this.certificateTemplateLoading = false
    },
    async saveCurator () {
      if (!this.currentEnrollment || this.curatorSubmitting) {
        return
      }
      this.curatorSubmitting = true
      this.notice = ''
      this.error = ''
      try {
        const payload = {
          curator: this.modalCurator ? Number(this.modalCurator) : null
        }
        const response = await assignManagerStudyEnrollmentCurator(this.currentEnrollment.id, payload)
        this.currentEnrollment = response?.data || this.currentEnrollment
        this.updateEnrollmentInList(this.currentEnrollment)
        this.notice = 'Куратор обновлен.'
      } catch (error) {
        this.error = error?.userMessage || 'Не удалось назначить куратора.'
      } finally {
        this.curatorSubmitting = false
      }
    },
    replaceLessonProgressRow (progressPayload) {
      if (!this.currentEnrollment || !progressPayload?.lesson) {
        return
      }
      const current = Array.isArray(this.currentEnrollment.lesson_progress) ? [...this.currentEnrollment.lesson_progress] : []
      const index = current.findIndex((item) => Number(item.lesson) === Number(progressPayload.lesson))
      if (index === -1) {
        current.push(progressPayload)
      } else {
        current.splice(index, 1, progressPayload)
      }
      this.currentEnrollment = {
        ...this.currentEnrollment,
        lesson_progress: current
      }
    },
    async unlockLesson (lessonId) {
      await this.unlockLessonAccess(lessonId, { open_lesson: true, open_exam: false })
    },
    async unlockLessonExam (lessonId) {
      await this.unlockLessonAccess(lessonId, { open_lesson: true, open_exam: true })
    },
    async unlockLessonAccess (lessonId, payload) {
      if (!this.currentEnrollment || !lessonId || this.isLessonSubmitting(lessonId)) {
        return
      }
      const key = String(lessonId)
      this.lessonSubmittingById = { ...this.lessonSubmittingById, [key]: true }
      this.notice = ''
      this.error = ''
      try {
        const response = await unlockManagerStudyLesson(this.currentEnrollment.id, lessonId, payload)
        this.replaceLessonProgressRow(response?.data || null)
        this.updateEnrollmentInList(this.currentEnrollment)
        this.notice = 'Доступ к уроку обновлен.'
      } catch (error) {
        this.error = error?.userMessage || 'Не удалось обновить доступ к уроку.'
      } finally {
        this.lessonSubmittingById = { ...this.lessonSubmittingById, [key]: false }
      }
    },
    async unlockFinalExam () {
      if (!this.currentEnrollment || this.finalExamSubmitting) {
        return
      }
      this.finalExamSubmitting = true
      this.notice = ''
      this.error = ''
      try {
        const response = await unlockManagerStudyFinalExam(this.currentEnrollment.id)
        this.currentEnrollment = response?.data || this.currentEnrollment
        this.updateEnrollmentInList(this.currentEnrollment)
        this.notice = 'Итоговый экзамен открыт вручную.'
      } catch (error) {
        this.error = error?.userMessage || 'Не удалось открыть итоговый экзамен.'
      } finally {
        this.finalExamSubmitting = false
      }
    },
    async setCertificateDecision (decision) {
      if (!this.currentEnrollment || this.certificateSubmitting) {
        return
      }
      this.certificateSubmitting = decision
      this.notice = ''
      this.error = ''
      try {
        const response = await decideManagerStudyCertificate(this.currentEnrollment.id, {
          status: decision,
          comment: this.certificateComment || ''
        })
        this.currentEnrollment = response?.data || this.currentEnrollment
        this.updateEnrollmentInList(this.currentEnrollment)
        this.notice = 'Решение по сертификату сохранено.'
      } catch (error) {
        this.error = error?.userMessage || 'Не удалось сохранить решение по сертификату.'
      } finally {
        this.certificateSubmitting = ''
      }
    },
    async openCertificateTemplate () {
      if (!this.currentEnrollment?.id || this.certificateTemplateLoading) {
        return
      }
      this.certificateTemplateLoading = true
      this.notice = ''
      this.error = ''
      try {
        const response = await fetchManagerEnrollmentCertificateTemplate(this.currentEnrollment.id)
        const blob = response?.data instanceof Blob
          ? response.data
          : new Blob([response?.data], { type: 'application/pdf' })
        const objectUrl = window.URL.createObjectURL(blob)
        const popup = window.open(objectUrl, '_blank', 'noopener,noreferrer')
        if (!popup) {
          const link = document.createElement('a')
          link.href = objectUrl
          link.download = `certificate-template-${this.currentEnrollment.id}.pdf`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
        window.setTimeout(() => {
          window.URL.revokeObjectURL(objectUrl)
        }, 60000)
      } catch (error) {
        this.error = error?.userMessage || 'Не удалось открыть шаблон сертификата.'
      } finally {
        this.certificateTemplateLoading = false
      }
    }
  }
}
</script>

<style scoped>
.panel-study-manager__notice {
  margin-bottom: 14px;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 14px;
}

.panel-study-manager__notice--success {
  background: #e8f7ee;
  color: #1f7a41;
}

.panel-study-manager__notice--error {
  background: #fff0f2;
  color: #ac2f48;
}

.panel-study-manager__filters {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 14px;
}

.panel-study-manager-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(5, 8, 15, 0.6);
  z-index: 1600;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.panel-study-manager-modal {
  width: min(980px, 100%);
  max-height: 90vh;
  overflow: auto;
  background: #fff;
  border-radius: 16px;
  padding: 22px;
  position: relative;
}

.panel-study-manager-modal__close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 0;
  background: #edf1f8;
}

.panel-study-manager-modal__title {
  margin: 0;
  padding-right: 36px;
  font-size: 24px;
  color: #1d2438;
}

.panel-study-manager-modal__body {
  margin-top: 12px;
  display: grid;
  gap: 12px;
}

.panel-study-manager-modal__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}

.panel-study-manager-modal__card {
  border: 1px solid #e4e8f3;
  border-radius: 12px;
  padding: 10px;
  background: #fbfcff;
}

.panel-study-manager-modal__label {
  font-size: 12px;
  color: #667089;
}

.panel-study-manager-modal__value {
  margin-top: 4px;
  font-size: 15px;
  font-weight: 700;
  color: #1f273d;
}

.panel-study-manager-modal__section {
  border: 1px solid #e4e8f3;
  border-radius: 12px;
  padding: 12px;
}

.panel-study-manager-modal__section-title {
  font-size: 15px;
  font-weight: 700;
  color: #1d2438;
  margin-bottom: 10px;
}

.panel-study-manager-modal__section-row {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.panel-study-manager-modal__hint {
  color: #5b6780;
  font-size: 14px;
}

.panel-study-manager-modal__hint--ok {
  color: #1f7a41;
  font-weight: 600;
}

.panel-study-manager-lessons {
  display: grid;
  gap: 10px;
}

.panel-study-manager-lesson {
  border: 1px solid #e4e8f2;
  border-radius: 10px;
  padding: 10px;
  background: #fcfdff;
}

.panel-study-manager-lesson__head {
  display: flex;
  gap: 8px;
  justify-content: space-between;
  flex-wrap: wrap;
  color: #20283d;
}

.panel-study-manager-lesson__meta {
  margin-top: 8px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  color: #5d6982;
  font-size: 13px;
}

.panel-study-manager-lesson__actions {
  margin-top: 9px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.panel-study-manager-lesson__exam-state {
  margin-top: 8px;
  color: #5d6982;
  font-size: 13px;
}

@media (max-width: 991px) {
  .panel-study-manager__filters {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .panel-study-manager-modal__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 767px) {
  .panel-study-manager__filters {
    grid-template-columns: 1fr;
  }

  .panel-study-manager-modal__grid {
    grid-template-columns: 1fr;
  }
}
</style>
