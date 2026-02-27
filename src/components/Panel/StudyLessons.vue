<template>
  <div class="content content--pbn">
    <div class="panel">
      <div class="container">
        <div class="row">
          <menu-block />
          <div class="col-xxl-9 col-xl-8">
            <div class="panel__block">
              <div class="panel__head">
                <div class="panel__title">Уроки<span>{{ filteredLessons.length }}</span></div>
                <div class="panel__search d-none d-lg-block">
                  <div class="input">
                    <input
                      id="searchLessons"
                      type="text"
                      v-model="searchTerm"
                      placeholder="Поиск по теме или описанию"
                    >
                    <label class="panel__search-icon" for="searchLessons">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 12.75C10.3995 12.75 12.75 10.3995 12.75 7.5C12.75 4.60051 10.3995 2.25 7.5 2.25C4.60051 2.25 2.25 4.60051 2.25 7.5C2.25 10.3995 4.60051 12.75 7.5 12.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15.75 15.75L11.25 11.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div class="panel__add-btn d-flex" style="gap: 12px;">
                  <div
                    class="btn btn--grayborder btn--big"
                    @click="saveOrder"
                    :style="savingOrder ? 'pointer-events: none; opacity: 0.6;' : ''"
                  >
                    Сохранить порядок
                  </div>
                  <div class="btn btn--red btn--big" @click="openCreate">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99961 14.4001C9.69699 14.4001 11.3249 13.7258 12.5251 12.5256C13.7253 11.3253 14.3996 9.69748 14.3996 8.0001C14.3996 6.30271 13.7253 4.67485 12.5251 3.47461C11.3249 2.27438 9.69699 1.6001 7.99961 1.6001C6.30222 1.6001 4.67436 2.27438 3.47413 3.47461C2.27389 4.67485 1.59961 6.30271 1.59961 8.0001C1.59961 9.69748 2.27389 11.3253 3.47413 12.5256C4.67436 13.7258 6.30222 14.4001 7.99961 14.4001ZM8.79961 5.6001C8.79961 5.38792 8.71532 5.18444 8.56529 5.03441C8.41527 4.88438 8.21178 4.8001 7.99961 4.8001C7.78744 4.8001 7.58395 4.88438 7.43392 5.03441C7.28389 5.18444 7.19961 5.38792 7.19961 5.6001V7.2001H5.59961C5.38744 7.2001 5.18395 7.28438 5.03392 7.43441C4.88389 7.58444 4.79961 7.78792 4.79961 8.0001C4.79961 8.21227 4.88389 8.41575 5.03392 8.56578C5.18395 8.71581 5.38744 8.8001 5.59961 8.8001H7.19961V10.4001C7.19961 10.6123 7.28389 10.8158 7.43392 10.9658C7.58395 11.1158 7.78744 11.2001 7.99961 11.2001C8.21178 11.2001 8.41527 11.1158 8.56529 10.9658C8.71532 10.8158 8.79961 10.6123 8.79961 10.4001V8.8001H10.3996C10.6118 8.8001 10.8153 8.71581 10.9653 8.56578C11.1153 8.41575 11.1996 8.21227 11.1996 8.0001C11.1996 7.78792 11.1153 7.58444 10.9653 7.43441C10.8153 7.28438 10.6118 7.2001 10.3996 7.2001H8.79961V5.6001Z" fill="white"></path>
                    </svg>
                    <div class="d-none d-md-block">Добавить урок</div>
                  </div>
                </div>
              </div>
              <div class="panel__body">
                <div class="panel__formrow">
                  <label>Курс</label>
                  <select v-model="selectedCourse" class="form-control" @change="fetchLessons">
                    <option v-for="option in courses" :key="option.id" :value="option.id">
                      {{ option.name }}
                    </option>
                  </select>
                </div>
                <div class="panel__search d-block d-lg-none">
                  <div class="input">
                    <input
                      id="searchLessonsMob"
                      type="text"
                      v-model="searchTerm"
                      placeholder="Поиск по теме или описанию"
                    >
                    <label class="panel__search-icon" for="searchLessonsMob">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 12.75C10.3995 12.75 12.75 10.3995 12.75 7.5C12.75 4.60051 10.3995 2.25 7.5 2.25C4.60051 2.25 2.25 4.60051 2.25 7.5C2.25 10.3995 4.60051 12.75 7.5 12.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15.75 15.75L11.25 11.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div class="panel__table">
                  <table>
                    <tr
                      v-for="(lesson, index) in filteredLessons"
                      :key="lessonKey(lesson)"
                      :draggable="canReorder"
                      @dragstart="onDragStart(index)"
                      @dragover.prevent="onDragOver(index)"
                      @drop.prevent="onDrop(index)"
                    >
                      <td>
                        <span class="panel__table-title">{{ lesson.title || 'Без названия' }}</span>
                        <span class="panel__table-sn panel__table-sn--detail">
                          {{ shortText(lesson.description) }}
                        </span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Курс:</span>
                        <span class="panel__table-text">{{ courseTitle(lesson.course) }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Порядок:</span>
                        <span class="panel__table-text">{{ lesson.order || index + 1 }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Открыть:</span>
                        <span class="panel__table-text">
                          {{ Number(lesson.unlock_after_days || 0) > 0 ? `на ${Number(lesson.unlock_after_days)} день` : 'сразу' }}
                        </span>
                      </td>
                      <td>
                        <span class="panel__table-icon" @click="openEdit(lesson)">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 15H6L13.875 7.12498C14.2728 6.72716 14.4963 6.18759 14.4963 5.62498C14.4963 5.06237 14.2728 4.52281 13.875 4.12498C13.4772 3.72716 12.9376 3.50366 12.375 3.50366C11.8124 3.50366 11.2728 3.72716 10.875 4.12498L3 12V15Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M10.125 4.875L13.125 7.875" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                        </span>
                        <span class="panel__table-icon" @click="removeLesson(lesson)">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 5.25H15" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M7.5 8.25V12.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M10.5 8.25V12.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M3.75 5.25L4.5 14.25C4.5 14.6478 4.65804 15.0294 4.93934 15.3107C5.22064 15.592 5.60218 15.75 6 15.75H12C12.3978 15.75 12.7794 15.592 13.0607 15.3107C13.342 15.0294 13.5 14.6478 13.5 14.25L14.25 5.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M6.75 5.25V3C6.75 2.80109 6.82902 2.61032 6.96967 2.46967C7.11032 2.32902 7.30109 2.25 7.5 2.25H10.5C10.6989 2.25 10.8897 2.32902 11.0303 2.46967C11.171 2.61032 11.25 2.80109 11.25 3V5.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                        </span>
                      </td>
                    </tr>
                  </table>
                  <div v-if="loading" class="panel__table-text">Загрузка...</div>
                  <div v-if="error" class="panel__table-text">{{ error }}</div>
                  <div v-if="!loading && !error && !filteredLessons.length" class="panel__table-text">
                    Ничего не найдено
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal fade show" style="display: block;" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Редактировать урок' : 'Новый урок' }}</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="panel__formrow">
              <label>Тема урока</label>
              <input type="text" v-model="form.title" class="form-control" placeholder="Тема урока">
            </div>
            <div class="panel__formrow">
              <label>Курс</label>
              <select v-model="form.course" class="form-control">
                <option disabled value="">Выберите курс</option>
                <option v-for="option in courses" :key="option.id" :value="option.id">
                  {{ option.name }}
                </option>
              </select>
            </div>
            <div class="panel__formrow">
              <label>Описание</label>
              <RichTextEditor
                v-model="form.description"
                :min-height="200"
              />
            </div>
            <div class="panel__formrow">
              <label>Текст урока</label>
              <RichTextEditor
                v-model="form.text_content"
                :min-height="260"
              />
            </div>
            <div class="panel__formrow">
              <label>Ссылка на видео</label>
              <input
                type="url"
                v-model="form.video_url"
                class="form-control"
                placeholder="https://..."
              >
            </div>
            <div class="panel__formrow">
              <label>Длительность видео (сек.)</label>
              <input
                type="number"
                min="0"
                step="1"
                v-model.number="form.video_duration_seconds"
                class="form-control"
                placeholder="0"
              >
            </div>
            <div class="panel__formrow">
              <label>Открывать после старта обучения (дней)</label>
              <input
                type="number"
                min="0"
                step="1"
                v-model.number="form.unlock_after_days"
                class="form-control"
                placeholder="0"
              >
              <small class="panel__table-sn panel__table-sn--detail">
                0 - сразу после выполнения условий по предыдущему уроку. Для первого урока: сразу после оплаты.
              </small>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn--grayborder" @click="closeModal">Отмена</button>
            <button type="button" class="btn btn--black" @click="saveLesson" :disabled="saving">
              {{ saving ? 'Сохранение...' : 'Сохранить' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import MenuBlock from '../elements/Panel/MenuBlock.vue'
import RichTextEditor from '@/components/elements/Panel/RichTextEditor.vue'
import {
  createStudyManagerLesson,
  deleteStudyManagerLesson,
  fetchStudyManagerCourses,
  fetchStudyManagerLessons,
  reorderStudyManagerLessons,
  updateStudyManagerLesson
} from '@/services/panel.service'

export default {
  name: 'StudyLessons',
  components: { MenuBlock, RichTextEditor },
  data () {
    return {
      lessons: [],
      courses: [],
      selectedCourse: '',
      searchTerm: '',
      loading: false,
      error: '',
      showModal: false,
      isEditing: false,
      saving: false,
      savingOrder: false,
      currentId: null,
      draggedIndex: null,
      form: {
        title: '',
        description: '',
        text_content: '',
        video_url: '',
        video_duration_seconds: 0,
        course: '',
        unlock_after_days: 0
      }
    }
  },
  computed: {
    filteredLessons () {
      const term = this.searchTerm.trim().toLowerCase()
      if (!term) {
        return this.lessons
      }
      return this.lessons.filter((l) => {
        const title = String(l.title || '').toLowerCase()
        const description = String(l.description || '').toLowerCase()
        return title.includes(term) || description.includes(term)
      })
    },
    canReorder () {
      return !this.searchTerm.trim()
    }
  },
  mounted () {
    this.fetchCourses()
  },
  methods: {
    async fetchCourses () {
      try {
        const response = await fetchStudyManagerCourses()
        this.courses = Array.isArray(response.data) ? response.data : []
        if (!this.selectedCourse && this.courses.length) {
          this.selectedCourse = this.courses[0].id
          await this.fetchLessons()
          return
        }
        await this.fetchLessons()
      } catch (err) {
        this.error = err.userMessage || 'Не удалось загрузить курсы'
      }
    },
    async fetchLessons () {
      this.loading = true
      this.error = ''
      try {
        const params = this.selectedCourse ? { course: this.selectedCourse } : {}
        const response = await fetchStudyManagerLessons(params)
        this.lessons = Array.isArray(response.data) ? response.data : []
      } catch (err) {
        this.error = err.userMessage || 'Не удалось загрузить уроки'
      } finally {
        this.loading = false
      }
    },
    lessonKey (lesson) {
      return lesson.id || lesson.pk || lesson.title
    },
    shortText (text) {
      const raw = String(text || '').replace(/<\/?[^>]+(>|$)/g, '')
      if (!raw) {
        return '—'
      }
      return raw.length > 70 ? `${raw.slice(0, 70)}...` : raw
    },
    courseTitle (courseId) {
      const option = this.courses.find((item) => item.id === courseId)
      return option ? option.name : '—'
    },
    openCreate () {
      this.isEditing = false
      this.currentId = null
      this.form = {
        title: '',
        description: '',
        text_content: '',
        video_url: '',
        video_duration_seconds: 0,
        course: this.selectedCourse || '',
        unlock_after_days: 0
      }
      this.showModal = true
    },
    openEdit (lesson) {
      this.isEditing = true
      this.currentId = lesson.id || lesson.pk
      this.form = {
        title: lesson.title || '',
        description: lesson.description || '',
        text_content: lesson.text_content || '',
        video_url: lesson.video_url || '',
        video_duration_seconds: Number(lesson.video_duration_seconds || 0),
        course: lesson.course || '',
        unlock_after_days: Number(lesson.unlock_after_days || 0)
      }
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
    },
    async saveLesson () {
      if (!this.form.title || !this.form.course) {
        this.error = 'Заполните тему и курс'
        return
      }
      this.saving = true
      this.error = ''
      try {
        const payload = {
          title: this.form.title,
          description: this.form.description || '',
          text_content: this.form.text_content || '',
          video_url: this.form.video_url || '',
          video_duration_seconds: Math.max(0, Number(this.form.video_duration_seconds || 0)),
          course: this.form.course,
          unlock_after_days: Math.max(0, Number(this.form.unlock_after_days || 0))
        }
        if (this.isEditing && this.currentId) {
          await updateStudyManagerLesson(this.currentId, payload)
        } else {
          await createStudyManagerLesson(payload)
        }
        this.closeModal()
        await this.fetchLessons()
      } catch (err) {
        this.error = err.userMessage || 'Не удалось сохранить урок'
      } finally {
        this.saving = false
      }
    },
    async removeLesson (lesson) {
      const id = lesson.id || lesson.pk
      if (!id) {
        return
      }
      if (!confirm('Удалить урок?')) {
        return
      }
      this.error = ''
      try {
        await deleteStudyManagerLesson(id)
        await this.fetchLessons()
      } catch (err) {
        this.error = err.userMessage || 'Не удалось удалить урок'
      }
    },
    onDragStart (index) {
      if (!this.canReorder) {
        return
      }
      this.draggedIndex = index
    },
    onDragOver (index) {
      if (!this.canReorder) {
        return
      }
      if (this.draggedIndex === null || this.draggedIndex === index) {
        return
      }
      const updated = [...this.lessons]
      const [moved] = updated.splice(this.draggedIndex, 1)
      updated.splice(index, 0, moved)
      this.lessons = updated
      this.draggedIndex = index
    },
    onDrop () {
      this.draggedIndex = null
    },
    async saveOrder () {
      if (!this.lessons.length || !this.canReorder) {
        return
      }
      this.savingOrder = true
      this.error = ''
      try {
        const payload = this.lessons.map((lesson, index) => ({
          id: lesson.id || lesson.pk,
          order: index + 1
        }))
        await reorderStudyManagerLessons(payload)
        await this.fetchLessons()
      } catch (err) {
        this.error = err.userMessage || 'Не удалось сохранить порядок'
      } finally {
        this.savingOrder = false
      }
    }
  }
}
</script>
