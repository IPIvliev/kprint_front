<template>
  <div class="content content--pbn">
    <div class="panel">
      <div class="container">
        <div class="row">
          <menu-block />
          <div class="col-xxl-9 col-xl-8">
            <div class="panel__block">
              <div class="panel__head">
                <div class="panel__title">Экзамены<span>{{ exams.length }}</span></div>
                <div class="panel__add-btn d-flex" style="gap: 10px;">
                  <button type="button" class="btn btn--grayborder btn--big" :disabled="loading" @click="loadExams">
                    {{ loading ? 'Обновление...' : 'Обновить' }}
                  </button>
                  <button type="button" class="btn btn--red btn--big" @click="openCreateExam">Добавить экзамен</button>
                </div>
              </div>
              <div class="panel__body">
                <div v-if="notice" class="study-exams__notice study-exams__notice--ok">{{ notice }}</div>
                <div v-if="error" class="study-exams__notice study-exams__notice--err">{{ error }}</div>

                <div class="panel__formrow">
                  <label>Курс</label>
                  <select v-model="selectedCourse" class="form-control" @change="onCourseChanged">
                    <option value="">Выберите курс</option>
                    <option v-for="course in courses" :key="course.id" :value="String(course.id)">{{ course.name }}</option>
                  </select>
                </div>

                <div class="panel__table">
                  <table>
                    <tr v-for="exam in exams" :key="`exam-${exam.id}`">
                      <td>
                        <span class="panel__table-title">{{ exam.title || 'Без названия' }}</span>
                        <span class="panel__table-sn panel__table-sn--detail">{{ shortText(exam.description) }}</span>
                      </td>
                      <td><span class="panel__table-subtitle">Тип:</span><span class="panel__table-text">{{ examTypeLabel(exam.exam_type) }}</span></td>
                      <td><span class="panel__table-subtitle">Урок:</span><span class="panel__table-text">{{ exam.lesson_title || '—' }}</span></td>
                      <td><span class="panel__table-subtitle">Порог:</span><span class="panel__table-text">{{ Number(exam.passing_correct_answers || 0) }}</span></td>
                      <td><span class="panel__table-subtitle">Вопросов:</span><span class="panel__table-text">{{ Number(exam.question_count || 0) }}</span></td>
                      <td>
                        <button type="button" class="btn btn--grayborder btn-sm" @click="selectExam(exam)">Вопросы</button>
                      </td>
                      <td>
                        <button type="button" class="btn btn--grayborder btn-sm" @click="openEditExam(exam)">Изменить</button>
                        <button type="button" class="btn btn--grayborder btn-sm" @click="removeExam(exam)">Удалить</button>
                      </td>
                    </tr>
                  </table>
                  <div v-if="loading" class="panel__table-text">Загрузка...</div>
                  <div v-else-if="!selectedCourse" class="panel__table-text">Выберите курс.</div>
                  <div v-else-if="!exams.length" class="panel__table-text">Экзаменов пока нет.</div>
                </div>

                <div v-if="activeExam" class="study-exams__questions">
                  <div class="study-exams__head">
                    <div class="study-exams__title">Вопросы экзамена: {{ activeExam.title }}</div>
                    <div class="study-exams__actions">
                      <button type="button" class="btn btn--grayborder btn-sm" @click="openPreview">Предпросмотр</button>
                      <button
                        v-if="questionOrderDirty"
                        type="button"
                        class="btn btn--grayborder btn-sm"
                        :disabled="questionOrderSaving"
                        @click="saveQuestionOrder"
                      >
                        {{ questionOrderSaving ? 'Сохраняем...' : 'Сохранить порядок вопросов' }}
                      </button>
                      <button type="button" class="btn btn--red btn-sm" @click="openCreateQuestion">Добавить вопрос</button>
                    </div>
                  </div>
                  <div class="study-exams__meta">Перетаскивайте вопросы и варианты ответов для изменения порядка.</div>
                  <div v-if="questionLoading" class="panel__table-text">Загрузка вопросов...</div>
                  <div v-else-if="!questions.length" class="panel__table-text">Вопросы пока не добавлены.</div>
                  <div v-else class="study-exams__question-list">
                    <article
                      v-for="(question, questionIndex) in questions"
                      :key="`question-${question.id}`"
                      class="study-exams__question"
                      draggable="true"
                      @dragstart="onQuestionDragStart(questionIndex)"
                      @dragover.prevent="onQuestionDragOver(questionIndex)"
                      @drop.prevent="onQuestionDrop"
                    >
                      <div class="study-exams__question-head">
                        <div>
                          <strong>{{ question.title }}</strong>
                          <div class="study-exams__meta">Порядок: {{ Number(question.sort_order || 0) }}, вариантов: {{ Number(question.options_count || 0) }}</div>
                        </div>
                        <div class="study-exams__actions">
                          <button type="button" class="btn btn--grayborder btn-sm" @click="openCreateOption(question.id)">Вариант</button>
                          <button type="button" class="btn btn--grayborder btn-sm" @click="openEditQuestion(question)">Изменить</button>
                          <button type="button" class="btn btn--grayborder btn-sm" @click="removeQuestion(question)">Удалить</button>
                        </div>
                      </div>
                      <div v-if="questionOptions(question.id).length" class="study-exams__option-list">
                        <div
                          v-for="(option, optionIndex) in questionOptions(question.id)"
                          :key="`option-${option.id}`"
                          class="study-exams__option"
                          draggable="true"
                          @dragstart.stop="onOptionDragStart(question.id, optionIndex)"
                          @dragover.stop.prevent="onOptionDragOver(question.id, optionIndex)"
                          @drop.stop.prevent="onOptionDrop(question.id)"
                        >
                          <span>{{ option.title }}</span>
                          <div class="study-exams__actions">
                            <span class="study-exams__badge" :class="option.is_correct ? 'ok' : 'bad'">{{ option.is_correct ? 'Верно' : 'Неверно' }}</span>
                            <button type="button" class="btn btn--grayborder btn-sm" @click="openEditOption(question.id, option)">Изменить</button>
                            <button type="button" class="btn btn--grayborder btn-sm" @click="removeOption(option)">Удалить</button>
                          </div>
                        </div>
                        <button
                          v-if="isOptionOrderDirty(question.id)"
                          type="button"
                          class="btn btn--grayborder btn-sm"
                          :disabled="isOptionOrderSaving(question.id)"
                          @click="saveOptionOrder(question.id)"
                        >
                          {{ isOptionOrderSaving(question.id) ? 'Сохраняем...' : 'Сохранить порядок вариантов' }}
                        </button>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showExamModal" class="modal fade show" style="display: block;" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditingExam ? 'Редактировать экзамен' : 'Новый экзамен' }}</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closeExamModal"></button>
          </div>
          <div class="modal-body">
            <div class="panel__formrow"><label>Название</label><input v-model="examForm.title" type="text" class="form-control"></div>
            <div class="panel__formrow"><label>Описание</label><textarea v-model="examForm.description" class="form-control" rows="4"></textarea></div>
            <div class="panel__formrow">
              <label>Тип</label>
              <select v-model="examForm.exam_type" class="form-control">
                <option value="lesson">Экзамен по уроку</option>
                <option value="final">Итоговый экзамен</option>
              </select>
            </div>
            <div v-if="examForm.exam_type === 'lesson'" class="panel__formrow">
              <label>Урок</label>
              <select v-model="examForm.lesson" class="form-control">
                <option value="">Выберите урок</option>
                <option v-for="lesson in lessons" :key="lesson.id" :value="String(lesson.id)">
                  {{ Number(lesson.order || 0) }}. {{ lesson.title }}
                </option>
              </select>
            </div>
            <div class="panel__formrow"><label>Порог</label><input v-model.number="examForm.passing_correct_answers" type="number" min="1" class="form-control"></div>
            <div class="panel__formrow"><label><input v-model="examForm.is_active" type="checkbox"> <span>Активен</span></label></div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn--grayborder" @click="closeExamModal">Отмена</button>
            <button type="button" class="btn btn--black" :disabled="savingExam" @click="saveExam">{{ savingExam ? 'Сохранение...' : 'Сохранить' }}</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showExamModal" class="modal-backdrop fade show"></div>

    <div v-if="showQuestionModal" class="modal fade show" style="display: block;" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditingQuestion ? 'Редактировать вопрос' : 'Новый вопрос' }}</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closeQuestionModal"></button>
          </div>
          <div class="modal-body">
            <div class="panel__formrow"><label>Вопрос</label><textarea v-model="questionForm.title" class="form-control" rows="4"></textarea></div>
            <div class="panel__formrow"><label>Порядок</label><input v-model.number="questionForm.sort_order" type="number" min="1" class="form-control"></div>
            <div class="panel__formrow"><label><input v-model="questionForm.is_active" type="checkbox"> <span>Активен</span></label></div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn--grayborder" @click="closeQuestionModal">Отмена</button>
            <button type="button" class="btn btn--black" :disabled="savingQuestion" @click="saveQuestion">{{ savingQuestion ? 'Сохранение...' : 'Сохранить' }}</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showQuestionModal" class="modal-backdrop fade show"></div>

    <div v-if="showOptionModal" class="modal fade show" style="display: block;" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditingOption ? 'Редактировать вариант' : 'Новый вариант' }}</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closeOptionModal"></button>
          </div>
          <div class="modal-body">
            <div class="panel__formrow"><label>Текст</label><textarea v-model="optionForm.title" class="form-control" rows="3"></textarea></div>
            <div class="panel__formrow"><label>Порядок</label><input v-model.number="optionForm.sort_order" type="number" min="1" class="form-control"></div>
            <div class="panel__formrow"><label><input v-model="optionForm.is_correct" type="checkbox"> <span>Правильный ответ</span></label></div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn--grayborder" @click="closeOptionModal">Отмена</button>
            <button type="button" class="btn btn--black" :disabled="savingOption" @click="saveOption">{{ savingOption ? 'Сохранение...' : 'Сохранить' }}</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showOptionModal" class="modal-backdrop fade show"></div>

    <div v-if="showPreviewModal" class="modal fade show" style="display: block;" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Предпросмотр: {{ activeExam ? activeExam.title : 'Экзамен' }}</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closePreview"></button>
          </div>
          <div class="modal-body">
            <p v-if="activeExam && activeExam.description">{{ activeExam.description }}</p>
            <div v-if="!questions.length" class="panel__table-text">В экзамене нет вопросов.</div>
            <div v-else class="study-exams__preview-list">
              <article v-for="(question, index) in questions" :key="`preview-question-${question.id}`" class="study-exams__preview-question">
                <h4>{{ index + 1 }}. {{ question.title }}</h4>
                <div class="study-exams__preview-options">
                  <label v-for="option in questionOptions(question.id)" :key="`preview-option-${option.id}`" class="study-exams__preview-option">
                    <input
                      type="checkbox"
                      :checked="isPreviewOptionChecked(question.id, option.id)"
                      @change="togglePreviewOption(question.id, option.id, $event.target.checked)"
                    >
                    <span>{{ option.title }}</span>
                  </label>
                </div>
              </article>
            </div>
            <div v-if="previewResult" class="study-exams__preview-result">
              {{ previewResult.passed ? 'Экзамен пройден' : 'Экзамен не пройден' }}:
              {{ previewResult.correct }} из {{ previewResult.total }}.
              Порог: {{ previewResult.threshold }}.
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn--grayborder" @click="closePreview">Закрыть</button>
            <button type="button" class="btn btn--black" :disabled="!questions.length" @click="evaluatePreview">Проверить результат</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showPreviewModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import MenuBlock from '../elements/Panel/MenuBlock.vue'
import { isManagerUser } from '@/utils/panelMode'
import {
  createStudyManagerExam,
  createStudyManagerExamOption,
  createStudyManagerExamQuestion,
  deleteStudyManagerExam,
  deleteStudyManagerExamOption,
  deleteStudyManagerExamQuestion,
  fetchStudyManagerCourses,
  fetchStudyManagerExamOptions,
  fetchStudyManagerExamQuestions,
  fetchStudyManagerExams,
  fetchStudyManagerLessons,
  updateStudyManagerExam,
  updateStudyManagerExamOption,
  updateStudyManagerExamQuestion
} from '@/services/panel.service'

export default {
  name: 'StudyExams',
  components: { MenuBlock },
  data () {
    return {
      courses: [],
      lessons: [],
      selectedCourse: '',
      exams: [],
      loading: false,
      questionLoading: false,
      error: '',
      notice: '',
      activeExamId: null,
      questions: [],
      optionsByQuestion: {},
      showExamModal: false,
      isEditingExam: false,
      editingExamId: null,
      savingExam: false,
      examForm: { title: '', description: '', exam_type: 'lesson', lesson: '', passing_correct_answers: 1, is_active: true },
      showQuestionModal: false,
      isEditingQuestion: false,
      editingQuestionId: null,
      savingQuestion: false,
      questionForm: { title: '', sort_order: 100, is_active: true },
      showOptionModal: false,
      isEditingOption: false,
      editingOptionId: null,
      optionQuestionId: null,
      savingOption: false,
      optionForm: { title: '', sort_order: 100, is_correct: false },
      draggedQuestionIndex: null,
      questionOrderDirty: false,
      questionOrderSaving: false,
      draggedOptionIndexByQuestion: {},
      optionOrderDirtyByQuestion: {},
      optionOrderSavingByQuestion: {},
      showPreviewModal: false,
      previewAnswers: {},
      previewResult: null
    }
  },
  computed: {
    activeExam () {
      return this.exams.find((item) => Number(item.id) === Number(this.activeExamId)) || null
    }
  },
  async mounted () {
    const user = this.$store?.state?.auth?.user || null
    if (!isManagerUser(user)) {
      this.$router.replace('/panel/study')
      return
    }
    await this.fetchCourses()
  },
  methods: {
    shortText (value) {
      const raw = String(value || '').replace(/<\/?[^>]+(>|$)/g, '').trim()
      if (!raw) return '—'
      return raw.length > 90 ? `${raw.slice(0, 90)}...` : raw
    },
    examTypeLabel (value) {
      return value === 'final' ? 'Итоговый' : 'По уроку'
    },
    questionOptions (questionId) {
      return this.optionsByQuestion[String(questionId)] || []
    },
    isOptionOrderDirty (questionId) {
      return this.optionOrderDirtyByQuestion[String(questionId)] === true
    },
    isOptionOrderSaving (questionId) {
      return this.optionOrderSavingByQuestion[String(questionId)] === true
    },
    async fetchCourses () {
      this.error = ''
      try {
        const response = await fetchStudyManagerCourses()
        this.courses = Array.isArray(response?.data) ? response.data : []
        if (!this.selectedCourse && this.courses.length) this.selectedCourse = String(this.courses[0].id)
        await this.onCourseChanged()
      } catch (error) {
        this.error = error?.userMessage || 'Не удалось загрузить курсы.'
      }
    },
    async onCourseChanged () {
      this.activeExamId = null
      this.questions = []
      this.optionsByQuestion = {}
      this.draggedQuestionIndex = null
      this.questionOrderDirty = false
      this.draggedOptionIndexByQuestion = {}
      this.optionOrderDirtyByQuestion = {}
      this.optionOrderSavingByQuestion = {}
      this.closePreview()
      await Promise.all([this.loadLessons(), this.loadExams()])
    },
    async loadLessons () {
      if (!this.selectedCourse) {
        this.lessons = []
        return
      }
      try {
        const response = await fetchStudyManagerLessons({ course: this.selectedCourse })
        this.lessons = Array.isArray(response?.data) ? response.data : []
      } catch (error) {
        this.lessons = []
      }
    },
    async loadExams () {
      if (!this.selectedCourse) {
        this.exams = []
        return
      }
      this.loading = true
      this.error = ''
      try {
        const response = await fetchStudyManagerExams({ course: this.selectedCourse })
        this.exams = Array.isArray(response?.data) ? response.data : []
      } catch (error) {
        this.error = error?.userMessage || 'Не удалось загрузить экзамены.'
      } finally {
        this.loading = false
      }
    },
    openCreateExam () {
      if (!this.selectedCourse) {
        this.error = 'Сначала выберите курс.'
        return
      }
      this.isEditingExam = false
      this.editingExamId = null
      this.examForm = { title: '', description: '', exam_type: 'lesson', lesson: '', passing_correct_answers: 1, is_active: true }
      this.showExamModal = true
    },
    openEditExam (exam) {
      this.isEditingExam = true
      this.editingExamId = exam.id
      this.examForm = {
        title: exam.title || '',
        description: exam.description || '',
        exam_type: exam.exam_type || 'lesson',
        lesson: exam.lesson ? String(exam.lesson) : '',
        passing_correct_answers: Number(exam.passing_correct_answers || 1),
        is_active: Boolean(exam.is_active)
      }
      this.showExamModal = true
    },
    closeExamModal () {
      this.showExamModal = false
      this.isEditingExam = false
      this.editingExamId = null
      this.savingExam = false
    },
    async saveExam () {
      if (!this.selectedCourse || !this.examForm.title.trim()) {
        this.error = 'Заполните название экзамена.'
        return
      }
      if (this.examForm.exam_type === 'lesson' && !this.examForm.lesson) {
        this.error = 'Для экзамена по уроку выберите урок.'
        return
      }
      this.savingExam = true
      this.error = ''
      this.notice = ''
      try {
        const payload = {
          course: Number(this.selectedCourse),
          title: this.examForm.title.trim(),
          description: this.examForm.description || '',
          exam_type: this.examForm.exam_type,
          lesson: this.examForm.exam_type === 'lesson' ? Number(this.examForm.lesson) : null,
          passing_correct_answers: Math.max(1, Number(this.examForm.passing_correct_answers || 1)),
          is_active: Boolean(this.examForm.is_active)
        }
        let savedId = this.editingExamId
        if (this.isEditingExam && this.editingExamId) {
          const response = await updateStudyManagerExam(this.editingExamId, payload)
          savedId = response?.data?.id || savedId
          this.notice = 'Экзамен обновлен.'
        } else {
          const response = await createStudyManagerExam(payload)
          savedId = response?.data?.id || null
          this.notice = 'Экзамен создан.'
        }
        this.closeExamModal()
        await this.loadExams()
        if (savedId) {
          const exam = this.exams.find((item) => Number(item.id) === Number(savedId))
          if (exam) await this.selectExam(exam)
        }
      } catch (error) {
        this.error = error?.userMessage || 'Не удалось сохранить экзамен.'
      } finally {
        this.savingExam = false
      }
    },
    async removeExam (exam) {
      if (!exam?.id) return
      if (!confirm('Удалить экзамен?')) return
      this.error = ''
      try {
        await deleteStudyManagerExam(exam.id)
        if (Number(this.activeExamId) === Number(exam.id)) {
          this.activeExamId = null
          this.questions = []
          this.optionsByQuestion = {}
        }
        this.notice = 'Экзамен удален.'
        await this.loadExams()
      } catch (error) {
        this.error = error?.userMessage || 'Не удалось удалить экзамен.'
      }
    },
    async selectExam (exam) {
      this.activeExamId = exam?.id || null
      this.closePreview()
      await this.loadQuestionsAndOptions()
    },
    async loadQuestionsAndOptions () {
      if (!this.activeExamId) {
        this.questions = []
        this.optionsByQuestion = {}
        return
      }
      this.questionLoading = true
      this.error = ''
      try {
        const [questionsResponse, optionsResponse] = await Promise.all([
          fetchStudyManagerExamQuestions({ exam: this.activeExamId }),
          fetchStudyManagerExamOptions({ exam: this.activeExamId })
        ])
        this.questions = (Array.isArray(questionsResponse?.data) ? questionsResponse.data : []).sort((a, b) => {
          const orderA = Number(a?.sort_order || 0)
          const orderB = Number(b?.sort_order || 0)
          if (orderA !== orderB) {
            return orderA - orderB
          }
          return Number(a?.id || 0) - Number(b?.id || 0)
        })
        const options = Array.isArray(optionsResponse?.data) ? optionsResponse.data : []
        const grouped = {}
        options.forEach((item) => {
          const key = String(item.question)
          if (!grouped[key]) grouped[key] = []
          grouped[key].push(item)
        })
        Object.keys(grouped).forEach((key) => {
          grouped[key].sort((a, b) => {
            const orderA = Number(a?.sort_order || 0)
            const orderB = Number(b?.sort_order || 0)
            if (orderA !== orderB) {
              return orderA - orderB
            }
            return Number(a?.id || 0) - Number(b?.id || 0)
          })
        })
        this.optionsByQuestion = grouped
        this.questionOrderDirty = false
        this.optionOrderDirtyByQuestion = {}
        this.optionOrderSavingByQuestion = {}
        this.draggedQuestionIndex = null
        this.draggedOptionIndexByQuestion = {}
        this.previewResult = null
      } catch (error) {
        this.error = error?.userMessage || 'Не удалось загрузить вопросы экзамена.'
      } finally {
        this.questionLoading = false
      }
    },
    onQuestionDragStart (index) {
      this.draggedQuestionIndex = index
    },
    onQuestionDragOver (targetIndex) {
      if (this.draggedQuestionIndex === null || this.draggedQuestionIndex === targetIndex) {
        return
      }
      const updated = [...this.questions]
      const [moved] = updated.splice(this.draggedQuestionIndex, 1)
      if (!moved) {
        return
      }
      updated.splice(targetIndex, 0, moved)
      this.questions = updated
      this.draggedQuestionIndex = targetIndex
      this.questionOrderDirty = true
    },
    onQuestionDrop () {
      this.draggedQuestionIndex = null
    },
    async saveQuestionOrder () {
      if (!this.activeExamId || !this.questionOrderDirty || this.questionOrderSaving) {
        return
      }
      this.questionOrderSaving = true
      this.error = ''
      try {
        await Promise.all(
          this.questions.map((question, index) => updateStudyManagerExamQuestion(question.id, {
            sort_order: index + 1
          }))
        )
        this.questions = this.questions.map((question, index) => ({
          ...question,
          sort_order: index + 1
        }))
        this.questionOrderDirty = false
        this.notice = 'Порядок вопросов сохранен.'
      } catch (error) {
        this.error = error?.userMessage || 'Не удалось сохранить порядок вопросов.'
      } finally {
        this.questionOrderSaving = false
      }
    },
    onOptionDragStart (questionId, index) {
      const key = String(questionId)
      this.draggedOptionIndexByQuestion = {
        ...this.draggedOptionIndexByQuestion,
        [key]: index
      }
    },
    onOptionDragOver (questionId, targetIndex) {
      const key = String(questionId)
      const draggingIndex = this.draggedOptionIndexByQuestion[key]
      if (draggingIndex === undefined || draggingIndex === null || draggingIndex === targetIndex) {
        return
      }
      const source = this.questionOptions(questionId)
      if (!source.length) {
        return
      }
      const updated = [...source]
      const [moved] = updated.splice(draggingIndex, 1)
      if (!moved) {
        return
      }
      updated.splice(targetIndex, 0, moved)
      this.optionsByQuestion = {
        ...this.optionsByQuestion,
        [key]: updated
      }
      this.draggedOptionIndexByQuestion = {
        ...this.draggedOptionIndexByQuestion,
        [key]: targetIndex
      }
      this.optionOrderDirtyByQuestion = {
        ...this.optionOrderDirtyByQuestion,
        [key]: true
      }
    },
    onOptionDrop (questionId) {
      const key = String(questionId)
      this.draggedOptionIndexByQuestion = {
        ...this.draggedOptionIndexByQuestion,
        [key]: null
      }
    },
    async saveOptionOrder (questionId) {
      const key = String(questionId)
      if (!this.isOptionOrderDirty(questionId) || this.isOptionOrderSaving(questionId)) {
        return
      }
      const options = this.questionOptions(questionId)
      if (!options.length) {
        return
      }
      this.optionOrderSavingByQuestion = {
        ...this.optionOrderSavingByQuestion,
        [key]: true
      }
      this.error = ''
      try {
        await Promise.all(
          options.map((option, index) => updateStudyManagerExamOption(option.id, {
            sort_order: index + 1
          }))
        )
        this.optionsByQuestion = {
          ...this.optionsByQuestion,
          [key]: options.map((option, index) => ({
            ...option,
            sort_order: index + 1
          }))
        }
        this.optionOrderDirtyByQuestion = {
          ...this.optionOrderDirtyByQuestion,
          [key]: false
        }
        this.notice = 'Порядок вариантов сохранен.'
      } catch (error) {
        this.error = error?.userMessage || 'Не удалось сохранить порядок вариантов.'
      } finally {
        this.optionOrderSavingByQuestion = {
          ...this.optionOrderSavingByQuestion,
          [key]: false
        }
      }
    },
    openPreview () {
      if (!this.activeExam) {
        return
      }
      const baseAnswers = {}
      this.questions.forEach((question) => {
        baseAnswers[String(question.id)] = []
      })
      this.previewAnswers = baseAnswers
      this.previewResult = null
      this.showPreviewModal = true
    },
    closePreview () {
      this.showPreviewModal = false
      this.previewAnswers = {}
      this.previewResult = null
    },
    isPreviewOptionChecked (questionId, optionId) {
      const selected = this.previewAnswers[String(questionId)] || []
      return selected.includes(Number(optionId))
    },
    togglePreviewOption (questionId, optionId, checked) {
      const key = String(questionId)
      const current = Array.isArray(this.previewAnswers[key]) ? [...this.previewAnswers[key]] : []
      const normalizedOptionId = Number(optionId)
      let next = current
      if (checked) {
        if (!next.includes(normalizedOptionId)) {
          next.push(normalizedOptionId)
        }
      } else {
        next = next.filter((id) => id !== normalizedOptionId)
      }
      this.previewAnswers = {
        ...this.previewAnswers,
        [key]: next
      }
    },
    evaluatePreview () {
      const total = this.questions.length
      if (!total) {
        this.previewResult = null
        return
      }
      let correct = 0
      this.questions.forEach((question) => {
        const selected = new Set(this.previewAnswers[String(question.id)] || [])
        const correctOptions = new Set(
          this.questionOptions(question.id)
            .filter((option) => Boolean(option.is_correct))
            .map((option) => Number(option.id))
        )
        const isCorrect = selected.size === correctOptions.size &&
          [...selected].every((item) => correctOptions.has(item))
        if (isCorrect) {
          correct += 1
        }
      })
      const threshold = Math.max(1, Number(this.activeExam?.passing_correct_answers || 1))
      this.previewResult = {
        correct,
        total,
        threshold,
        passed: correct >= threshold
      }
    },
    openCreateQuestion () {
      if (!this.activeExamId) return
      this.isEditingQuestion = false
      this.editingQuestionId = null
      this.questionForm = { title: '', sort_order: 100, is_active: true }
      this.showQuestionModal = true
    },
    openEditQuestion (question) {
      this.isEditingQuestion = true
      this.editingQuestionId = question.id
      this.questionForm = { title: question.title || '', sort_order: Number(question.sort_order || 100), is_active: Boolean(question.is_active) }
      this.showQuestionModal = true
    },
    closeQuestionModal () {
      this.showQuestionModal = false
      this.isEditingQuestion = false
      this.editingQuestionId = null
      this.savingQuestion = false
    },
    async saveQuestion () {
      if (!this.activeExamId || !this.questionForm.title.trim()) {
        this.error = 'Заполните вопрос.'
        return
      }
      this.savingQuestion = true
      this.error = ''
      try {
        const payload = {
          exam: Number(this.activeExamId),
          title: this.questionForm.title.trim(),
          sort_order: Number(this.questionForm.sort_order || 100),
          is_active: Boolean(this.questionForm.is_active)
        }
        if (this.isEditingQuestion && this.editingQuestionId) {
          await updateStudyManagerExamQuestion(this.editingQuestionId, payload)
          this.notice = 'Вопрос обновлен.'
        } else {
          await createStudyManagerExamQuestion(payload)
          this.notice = 'Вопрос добавлен.'
        }
        this.closeQuestionModal()
        await this.loadQuestionsAndOptions()
        await this.loadExams()
      } catch (error) {
        this.error = error?.userMessage || 'Не удалось сохранить вопрос.'
      } finally {
        this.savingQuestion = false
      }
    },
    async removeQuestion (question) {
      if (!question?.id) return
      if (!confirm('Удалить вопрос?')) return
      try {
        await deleteStudyManagerExamQuestion(question.id)
        this.notice = 'Вопрос удален.'
        await this.loadQuestionsAndOptions()
        await this.loadExams()
      } catch (error) {
        this.error = error?.userMessage || 'Не удалось удалить вопрос.'
      }
    },
    openCreateOption (questionId) {
      this.isEditingOption = false
      this.editingOptionId = null
      this.optionQuestionId = questionId
      this.optionForm = { title: '', sort_order: 100, is_correct: false }
      this.showOptionModal = true
    },
    openEditOption (questionId, option) {
      this.isEditingOption = true
      this.editingOptionId = option.id
      this.optionQuestionId = questionId
      this.optionForm = { title: option.title || '', sort_order: Number(option.sort_order || 100), is_correct: Boolean(option.is_correct) }
      this.showOptionModal = true
    },
    closeOptionModal () {
      this.showOptionModal = false
      this.isEditingOption = false
      this.editingOptionId = null
      this.optionQuestionId = null
      this.savingOption = false
    },
    async saveOption () {
      if (!this.optionQuestionId || !this.optionForm.title.trim()) {
        this.error = 'Заполните вариант ответа.'
        return
      }
      this.savingOption = true
      this.error = ''
      try {
        const payload = {
          question: Number(this.optionQuestionId),
          title: this.optionForm.title.trim(),
          sort_order: Number(this.optionForm.sort_order || 100),
          is_correct: Boolean(this.optionForm.is_correct)
        }
        if (this.isEditingOption && this.editingOptionId) {
          await updateStudyManagerExamOption(this.editingOptionId, payload)
          this.notice = 'Вариант обновлен.'
        } else {
          await createStudyManagerExamOption(payload)
          this.notice = 'Вариант добавлен.'
        }
        this.closeOptionModal()
        await this.loadQuestionsAndOptions()
      } catch (error) {
        this.error = error?.userMessage || 'Не удалось сохранить вариант.'
      } finally {
        this.savingOption = false
      }
    },
    async removeOption (option) {
      if (!option?.id) return
      if (!confirm('Удалить вариант ответа?')) return
      try {
        await deleteStudyManagerExamOption(option.id)
        this.notice = 'Вариант удален.'
        await this.loadQuestionsAndOptions()
      } catch (error) {
        this.error = error?.userMessage || 'Не удалось удалить вариант.'
      }
    }
  }
}
</script>

<style scoped>
.study-exams__notice { margin-bottom: 12px; padding: 10px 12px; border-radius: 10px; font-size: 14px; }
.study-exams__notice--ok { background: #e8f7ee; color: #1f7a41; }
.study-exams__notice--err { background: #fff0f2; color: #ac2f48; }
.study-exams__questions { margin-top: 16px; border-top: 1px solid #e3e8f2; padding-top: 14px; }
.study-exams__head { display: flex; justify-content: space-between; gap: 10px; align-items: center; flex-wrap: wrap; }
.study-exams__title { font-size: 18px; font-weight: 700; color: #1f273c; }
.study-exams__question-list { margin-top: 10px; display: grid; gap: 10px; }
.study-exams__question { border: 1px solid #e2e7f2; border-radius: 12px; padding: 12px; background: #fbfcff; }
.study-exams__question[draggable="true"] { cursor: move; }
.study-exams__question-head { display: flex; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
.study-exams__meta { margin-top: 6px; color: #5d6982; font-size: 13px; }
.study-exams__option-list { margin-top: 10px; display: grid; gap: 8px; }
.study-exams__option { border: 1px solid #e7ebf5; border-radius: 10px; background: #fff; padding: 8px 10px; display: flex; justify-content: space-between; gap: 10px; align-items: center; flex-wrap: wrap; }
.study-exams__option[draggable="true"] { cursor: move; }
.study-exams__actions { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.study-exams__badge { font-size: 12px; border-radius: 999px; padding: 4px 8px; }
.study-exams__badge.ok { background: #e8f7ee; color: #1f7a41; }
.study-exams__badge.bad { background: #f3f4f7; color: #627089; }
.study-exams__preview-list { display: grid; gap: 10px; }
.study-exams__preview-question { border: 1px solid #e3e8f2; border-radius: 10px; padding: 10px; }
.study-exams__preview-question h4 { margin: 0 0 8px; font-size: 15px; }
.study-exams__preview-options { display: grid; gap: 6px; }
.study-exams__preview-option { display: flex; gap: 8px; align-items: center; font-size: 14px; color: #33415f; }
.study-exams__preview-result { margin-top: 12px; padding: 10px; border-radius: 10px; background: #f2f6ff; color: #20345d; font-weight: 600; }
</style>
