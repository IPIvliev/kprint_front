<template>
  <div class="content content--pbn">
    <div class="panel">
      <div class="container">
        <div class="row">
          <menu-block />
          <div class="col-xxl-9 col-xl-8">
            <div class="panel__block">
              <div class="panel__head">
                <div class="panel__title">Обучение<span>{{ orders.length }}</span></div>
                <router-link to="/study" class="btn btn--grayborder btn-sm">Подобрать курс</router-link>
              </div>

              <div class="panel__body">
                <div v-if="notice" class="study-note study-note--ok">{{ notice }}</div>
                <div v-if="error" class="study-note study-note--err">{{ error }}</div>
                <div v-if="loading && !orders.length" class="panel__table-text">Загрузка...</div>

                <div v-else-if="!orders.length" class="study-empty">
                  <div class="study-empty__title">У вас пока нет курсов в личном кабинете.</div>
                  <div class="study-empty__text">Выберите курс в разделе обучения и нажмите "Купить".</div>
                  <router-link to="/study" class="btn btn--red">Перейти к курсам</router-link>
                </div>

                <div v-else class="study-layout">
                  <section class="study-workspace">
                    <div v-if="isCoursesPage" class="study-panel">
                      <h3>Выбор курса</h3>
                      <p class="study-panel__text">Нажмите "Открыть курс", чтобы перейти к оплате и урокам.</p>
                      <div class="study-courses-grid">
                        <article
                          v-for="order in orders"
                          :key="`workspace-order-${order.id}`"
                          class="study-card"
                        >
                          <h3 class="study-card__title">{{ courseName(order) }}</h3>
                          <p class="study-card__meta">{{ lessonsTotal(order) }} уроков, тариф: {{ priceName(order) }}</p>
                          <div class="study-actions">
                            <span class="study-badge" :class="isPaid(order) ? 'study-badge--ok' : 'study-badge--wait'">
                              {{ isPaid(order) ? 'Оплачено' : 'Не оплачено' }}
                            </span>
                            <button type="button" class="btn btn--red btn-sm" @click="goToCourse(order.id)">
                              Открыть курс
                            </button>
                          </div>
                        </article>
                      </div>
                    </div>

                    <div v-else-if="detailLoading" class="panel__table-text">Загрузка деталей курса...</div>
                    <div v-else-if="detailError" class="panel__table-text">{{ detailError }}</div>
                    <div v-else-if="!currentOrder" class="panel__table-text">
                      Курс не найден. <button type="button" class="btn btn--grayborder btn-sm" @click="goToCourses">К списку</button>
                    </div>

                    <div v-else class="study-panel">
                      <div class="study-panel__head">
                        <h3>{{ courseName(currentOrder) }}</h3>
                        <span class="study-badge" :class="isPaid(currentOrder) ? 'study-badge--ok' : 'study-badge--wait'">
                          {{ isPaid(currentOrder) ? 'Оплачено' : 'Не оплачено' }}
                        </span>
                      </div>

                      <nav class="study-breadcrumbs" aria-label="Навигация обучения">
                        <button type="button" class="study-breadcrumbs__item" @click="goToCourses">Курсы</button>
                        <span class="study-breadcrumbs__sep">/</span>
                        <button type="button" class="study-breadcrumbs__item" @click="goToCourse(currentOrder.id)">Курс</button>
                        <template v-if="isLessonPage">
                          <span class="study-breadcrumbs__sep">/</span>
                          <span class="study-breadcrumbs__item study-breadcrumbs__item--current">Урок</span>
                        </template>
                        <template v-if="isExamPage">
                          <span class="study-breadcrumbs__sep">/</span>
                          <span class="study-breadcrumbs__item study-breadcrumbs__item--current">Экзамен</span>
                        </template>
                      </nav>

                      <template v-if="isCourseInfoPage">
                        <div class="study-section">
                          <div class="study-info-grid">
                            <article class="study-info-card">
                              <h4 class="study-info-card__title">О курсе</h4>
                              <p class="study-info-card__line"><b>Уроков:</b> {{ lessonsTotal(currentOrder) }}</p>
                              <p v-if="courseDuration(currentOrder)" class="study-info-card__line"><b>Длительность:</b> {{ courseDuration(currentOrder) }}</p>
                              <p class="study-info-card__line"><b>Преподавателей:</b> {{ teachersCount(currentOrder) }}</p>
                              <p class="study-info-card__line"><b>Прогресс:</b> {{ completedLessons(currentOrder) }}/{{ lessonsTotal(currentOrder) }}</p>
                              <p class="study-info-card__line"><b>Куратор:</b> {{ curatorName(currentOrder) || 'Пока не назначен' }}</p>
                              <p class="study-info-card__line"><b>Сертификат:</b> {{ certificateLabel(currentOrder.certificate_status) }}</p>
                            </article>
                            <article class="study-info-card">
                              <h4 class="study-info-card__title">Тариф</h4>
                              <p class="study-info-card__line"><b>{{ priceName(currentOrder) }}</b></p>
                              <p class="study-info-card__line">{{ money(priceValue(currentOrder)) }}</p>
                              <p v-if="priceShortDescription(currentOrder)" class="study-info-card__line">{{ priceShortDescription(currentOrder) }}</p>
                            </article>
                          </div>
                          <div class="study-actions">
                            <button v-if="isPaid(currentOrder) && firstOpenLessonId" class="btn btn--grayborder" @click="goToLesson(currentOrder.id, firstOpenLessonId)">
                              Перейти к первому открытому уроку
                            </button>
                            <button v-else-if="!isPaid(currentOrder)" class="btn btn--red" :disabled="paymentSubmitting" @click="payCourse">
                              {{ paymentSubmitting ? 'Обработка...' : 'Оплатить курс' }}
                            </button>
                            <button
                              v-if="currentOrder.certificate_status === 'issued'"
                              class="btn btn--red"
                              :disabled="certificateDownloading"
                              @click="downloadCertificate"
                            >
                              {{ certificateDownloading ? 'Подготовка PDF...' : 'Скачать сертификат PDF' }}
                            </button>
                          </div>
                        </div>

                        <div v-if="courseDescription(currentOrder)" class="study-section">
                          <h4 class="study-section__title">Описание курса</h4>
                          <p>{{ courseDescription(currentOrder) }}</p>
                        </div>

                        <div class="study-section">
                          <h4 class="study-section__title">Детали тарифа</h4>
                          <p v-if="priceDescription(currentOrder)">{{ priceDescription(currentOrder) }}</p>
                          <p v-else class="lesson-help">Описание тарифа пока не заполнено.</p>
                        </div>

                        <div class="study-section">
                          <h4 class="study-section__title">Уроки курса</h4>
                          <article v-for="row in lessonRows" :key="row.id" class="lesson-card">
                            <div class="lesson-card__head">
                              <h4>{{ row.lesson_order }}. {{ row.lesson_title }}</h4>
                              <span class="lesson-badge" :class="row.is_lesson_unlocked ? 'lesson-badge--open' : 'lesson-badge--lock'">
                                {{ row.is_lesson_unlocked ? 'Открыт' : 'Закрыт' }}
                              </span>
                            </div>
                            <p class="lesson-card__meta">Просмотрено: {{ Number(row.watched_seconds || 0) }} сек.</p>
                            <div class="study-actions">
                              <button v-if="canView(row)" class="btn btn--grayborder btn-sm" @click="goToLesson(currentOrder.id, lessonId(row))">Смотреть урок</button>
                              <span v-else class="lesson-help">{{ unlockHint(row) }}</span>
                              <button
                                v-if="lessonExam(currentOrder, lessonId(row)) && canOpenExam(lessonExam(currentOrder, lessonId(row)))"
                                class="btn btn--red btn-sm"
                                @click="goToExam(currentOrder.id, lessonExam(currentOrder, lessonId(row)).id)"
                              >
                                Экзамен по уроку
                              </button>
                            </div>
                          </article>
                          <div class="study-actions">
                            <button
                              v-if="finalExam(currentOrder) && canOpenExam(finalExam(currentOrder))"
                              class="btn btn--red"
                              @click="goToExam(currentOrder.id, finalExam(currentOrder).id)"
                            >
                              Итоговый экзамен
                            </button>
                          </div>
                        </div>
                      </template>

                      <div v-else-if="isLessonPage" class="study-section">
                        <p v-if="!currentLesson" class="panel__table-text">Урок не найден.</p>
                        <p v-else-if="!canView(currentLesson)" class="panel__table-text">Этот урок пока закрыт.</p>
                        <template v-else>
                          <h4>{{ currentLesson.lesson_order }}. {{ currentLesson.lesson_title }}</h4>
                          <p v-if="currentLesson.lesson_description">{{ currentLesson.lesson_description }}</p>

                          <p v-if="lessonVideoLoading" class="lesson-help">Подготавливаем защищенную ссылку на видео...</p>
                          <p v-if="lessonVideoError" class="lesson-help">{{ lessonVideoError }}</p>

                          <div v-if="safeUrl(currentLessonVideoUrl)" class="lesson-video">
                            <iframe v-if="embedUrl(currentLessonVideoUrl)" :src="embedUrl(currentLessonVideoUrl)" allowfullscreen></iframe>
                            <video
                              v-else-if="isDirectVideo(currentLessonVideoUrl)"
                              controls
                              :src="safeUrl(currentLessonVideoUrl)"
                              @ended="markWatched(currentLesson)"
                            />
                            <a :href="safeUrl(currentLessonVideoUrl)" target="_blank" rel="noopener noreferrer">Открыть видео в новой вкладке</a>
                          </div>

                          <pre v-if="currentLesson.lesson_text_content" class="lesson-text">{{ currentLesson.lesson_text_content }}</pre>
                          <div class="study-actions">
                            <button class="btn btn--grayborder" @click="goToCourse(currentOrder.id)">К курсу</button>
                            <button
                              v-if="!currentLesson.is_video_completed && !isDirectVideo(currentLessonVideoUrl)"
                              class="btn btn--grayborder"
                              :disabled="isLessonSubmitting(lessonId(currentLesson))"
                              @click="markWatched(currentLesson)"
                            >
                              {{ isLessonSubmitting(lessonId(currentLesson)) ? 'Сохранение...' : 'Я посмотрел видео полностью' }}
                            </button>
                          </div>
                        </template>
                      </div>

                      <div v-else-if="isExamPage" class="study-section">
                        <p v-if="examError" class="study-note study-note--err">{{ examError }}</p>
                        <p v-if="examSubmitResult" class="study-note study-note--ok">{{ examSubmitResult }}</p>
                        <div v-if="examLoading" class="panel__table-text">Загрузка экзамена...</div>
                        <div v-else-if="!activeExam || !activeExam.questions || !activeExam.questions.length" class="panel__table-text">В экзамене нет вопросов.</div>
                        <form v-else @submit.prevent="submitExam">
                          <h4>{{ activeExam.title || 'Экзамен' }}</h4>
                          <p v-if="activeExam.description">{{ activeExam.description }}</p>
                          <article v-for="(q, index) in activeExam.questions" :key="q.id" class="exam-q">
                            <h5>{{ index + 1 }}. {{ q.title }}</h5>
                            <label v-for="opt in q.options || []" :key="opt.id" class="exam-opt">
                              <input type="checkbox" :checked="isSelected(q.id, opt.id)" @change="toggleOption(q.id, opt.id, $event.target.checked)">
                              <span>{{ opt.title }}</span>
                            </label>
                          </article>
                          <div class="study-actions">
                            <button type="button" class="btn btn--grayborder" @click="goToCourse(currentOrder.id)">К курсу</button>
                            <button type="submit" class="btn btn--red" :disabled="examSubmitting">{{ examSubmitting ? 'Проверяем...' : 'Завершить экзамен' }}</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuBlock from '../elements/Panel/MenuBlock.vue'
import {
  createMyStudyEnrollment,
  fetchMyEnrollmentCertificatePdf,
  fetchMyEnrollmentExamDetail,
  fetchMyLessonVideoUrl,
  fetchMyStudyEnrollment,
  fetchMyStudyEnrollments,
  payMyStudyEnrollment,
  submitMyEnrollmentExam,
  updateMyLessonProgress
} from '@/services/study-learning.service'

export default {
  name: 'PanelStudyUser',
  components: { MenuBlock },
  data () {
    return {
      orders: [],
      loading: false,
      selectedOrderId: null,
      currentOrderDetail: null,
      detailLoading: false,
      detailError: '',
      paymentSubmitting: false,
      lessonSubmittingById: {},
      activeExam: null,
      examAnswers: {},
      examLoading: false,
      examSubmitting: false,
      examError: '',
      examSubmitResult: '',
      lessonVideoUrl: '',
      lessonVideoExpiresAt: null,
      lessonVideoLoading: false,
      lessonVideoError: '',
      certificateDownloading: false,
      notice: '',
      error: '',
      purchaseInProgress: false
    }
  },
  computed: {
    routeOrderId () { return Number(this.$route?.params?.enrollmentId || 0) },
    routeLessonId () { return Number(this.$route?.params?.lessonId || 0) },
    routeExamId () { return Number(this.$route?.params?.examId || 0) },
    isCoursesPage () { return this.$route?.name === 'PanelStudyUserCourses' },
    isCoursePage () { return this.$route?.name === 'PanelStudyUserCourse' },
    isLessonsPage () { return this.$route?.name === 'PanelStudyUserLessons' },
    isCourseInfoPage () { return this.isCoursePage || this.isLessonsPage },
    isLessonPage () { return this.$route?.name === 'PanelStudyUserLesson' },
    isExamPage () { return this.$route?.name === 'PanelStudyUserExam' },
    currentOrder () {
      if (this.currentOrderDetail && Number(this.currentOrderDetail.id) === Number(this.selectedOrderId)) return this.currentOrderDetail
      return this.orders.find((x) => Number(x.id) === Number(this.selectedOrderId)) || null
    },
    lessonRows () {
      const rows = Array.isArray(this.currentOrder?.lesson_progress) ? [...this.currentOrder.lesson_progress] : []
      return rows.sort((a, b) => Number(a.lesson_order || 0) - Number(b.lesson_order || 0))
    },
    currentLesson () {
      if (!this.routeLessonId) return null
      return this.lessonRows.find((x) => Number(this.lessonId(x)) === Number(this.routeLessonId)) || null
    },
    currentLessonVideoUrl () {
      return String(this.lessonVideoUrl || this.currentLesson?.lesson_video_url || '').trim()
    },
    firstOpenLessonId () {
      const row = this.lessonRows.find((x) => this.canView(x))
      return row ? this.lessonId(row) : null
    }
  },
  async mounted () {
    await this.loadOrders()
    await this.processPurchaseFromRoute()
    await this.syncRouteState()
  },
  watch: {
    '$route.fullPath': {
      async handler () {
        await this.processPurchaseFromRoute()
        await this.syncRouteState()
      }
    }
  },
  methods: {
    async pushRoute (location) { try { await this.$router.push(location) } catch (e) {} },
    goToCourses () { return this.pushRoute({ name: 'PanelStudyUserCourses' }) },
    goToCourse (id) { return this.pushRoute({ name: 'PanelStudyUserCourse', params: { enrollmentId: Number(id) } }) },
    goToLessons (id) { if (!this.isPaid(this.currentOrder)) return; return this.goToCourse(id) },
    goToLesson (orderId, lessonId) { return this.pushRoute({ name: 'PanelStudyUserLesson', params: { enrollmentId: Number(orderId), lessonId: Number(lessonId) } }) },
    goToExam (orderId, examId) { return this.pushRoute({ name: 'PanelStudyUserExam', params: { enrollmentId: Number(orderId), examId: Number(examId) } }) },

    async loadOrders () {
      this.loading = true
      try {
        const response = await fetchMyStudyEnrollments()
        this.orders = Array.isArray(response?.data) ? response.data : []
      } catch (err) {
        this.error = err?.userMessage || 'Не удалось загрузить курсы.'
      } finally {
        this.loading = false
      }
    },
    async loadOrderDetail (id) {
      this.detailLoading = true
      this.detailError = ''
      try {
        const response = await fetchMyStudyEnrollment(id)
        this.currentOrderDetail = response?.data || null
        const idx = this.orders.findIndex((x) => Number(x.id) === Number(id))
        if (idx >= 0) this.orders.splice(idx, 1, this.currentOrderDetail)
      } catch (err) {
        this.detailError = err?.userMessage || 'Не удалось загрузить детали курса.'
      } finally {
        this.detailLoading = false
      }
    },
    async syncRouteState () {
      if (this.isCoursesPage || !this.routeOrderId) {
        this.selectedOrderId = null
        this.currentOrderDetail = null
        this.resetExam()
        this.resetLessonVideoState()
        return
      }
      if (Number(this.selectedOrderId) !== Number(this.routeOrderId) || Number(this.currentOrderDetail?.id || 0) !== Number(this.routeOrderId)) {
        this.selectedOrderId = Number(this.routeOrderId)
        this.currentOrderDetail = null
        await this.loadOrderDetail(this.routeOrderId)
      }
      if (this.isLessonPage) await this.loadLessonVideoUrl()
      else this.resetLessonVideoState()
      if (this.isExamPage) await this.loadExam()
      else this.resetExam()
    },
    clearPurchaseQuery () {
      const query = { ...(this.$route?.query || {}) }
      delete query.study_course_id
      delete query.study_price_id
      this.$router.replace({ path: this.$route.path, query }).catch(() => {})
    },
    async processPurchaseFromRoute () {
      if (this.purchaseInProgress) return
      const courseId = Number(this.$route?.query?.study_course_id || 0)
      const priceId = Number(this.$route?.query?.study_price_id || 0)
      if (!courseId || !priceId) return
      this.purchaseInProgress = true
      this.notice = ''
      this.error = ''
      try {
        const response = await createMyStudyEnrollment({ course: courseId, price: priceId })
        const enrollment = response?.data || null
        await this.loadOrders()
        if (enrollment?.id) await this.goToCourse(enrollment.id)
        this.notice = 'Курс добавлен в кабинет. Подтвердите оплату для открытия доступа.'
      } catch (err) {
        if (err?.response?.status === 409) {
          const enrolled = err?.response?.data?.enrollment
          if (enrolled?.id) await this.goToCourse(enrolled.id)
          this.notice = err?.response?.data?.detail || 'Курс уже есть в кабинете.'
        } else {
          this.error = err?.userMessage || 'Не удалось добавить выбранный курс.'
        }
      } finally {
        this.purchaseInProgress = false
        this.clearPurchaseQuery()
      }
    },
    async payCourse () {
      if (!this.currentOrder || this.isPaid(this.currentOrder) || this.paymentSubmitting) return
      this.paymentSubmitting = true
      try {
        await payMyStudyEnrollment(this.currentOrder.id, { payment_reference: `study-${Date.now()}` })
        await this.loadOrderDetail(this.currentOrder.id)
        await this.loadOrders()
        this.notice = 'Оплата курса подтверждена. Доступ к обучению открыт.'
      } catch (err) {
        this.error = err?.userMessage || 'Не удалось подтвердить оплату.'
      } finally {
        this.paymentSubmitting = false
      }
    },

    lessonId (row) { return Number(row?.lesson?.id || row?.lesson || row?.id || 0) || null },
    canView (row) { return Boolean(this.isPaid(this.currentOrder) && row?.is_lesson_unlocked) },
    isLessonSubmitting (lessonId) { return this.lessonSubmittingById[String(lessonId)] === true },
    resetLessonVideoState () {
      this.lessonVideoUrl = ''
      this.lessonVideoExpiresAt = null
      this.lessonVideoLoading = false
      this.lessonVideoError = ''
    },
    async loadLessonVideoUrl () {
      this.lessonVideoError = ''
      this.lessonVideoLoading = false
      this.lessonVideoExpiresAt = null
      this.lessonVideoUrl = String(this.currentLesson?.lesson_video_url || '').trim()

      if (!this.currentOrder || !this.currentLesson || !this.canView(this.currentLesson)) return
      const lessonId = this.lessonId(this.currentLesson)
      if (!lessonId) return

      this.lessonVideoLoading = true
      try {
        const response = await fetchMyLessonVideoUrl(this.currentOrder.id, lessonId)
        this.lessonVideoUrl = String(response?.data?.url || this.lessonVideoUrl || '').trim()
        this.lessonVideoExpiresAt = Number(response?.data?.expires_at || 0) || null
      } catch (err) {
        this.lessonVideoError = err?.userMessage || 'Не удалось получить защищенную ссылку на видео.'
      } finally {
        this.lessonVideoLoading = false
      }
    },
    unlockHint (row) {
      if (!this.isPaid(this.currentOrder)) return 'Урок откроется после оплаты курса'
      return Number(row?.lesson_unlock_after_days || 0) > 0
        ? `Откроется после ${Number(row.lesson_unlock_after_days)}-го дня и завершения предыдущего урока/экзамена`
        : 'Откроется после завершения предыдущего урока и экзамена'
    },
    async markWatched (row) {
      if (!this.currentOrder || !this.canView(row)) return
      const lid = this.lessonId(row)
      if (!lid || this.isLessonSubmitting(lid)) return
      this.lessonSubmittingById = { ...this.lessonSubmittingById, [String(lid)]: true }
      try {
        await updateMyLessonProgress(this.currentOrder.id, lid, {
          watched_seconds: Number(row?.lesson_video_duration_seconds || row?.watched_seconds || 0),
          is_video_completed: true
        })
        await this.loadOrderDetail(this.currentOrder.id)
      } catch (err) {
        this.error = err?.userMessage || 'Не удалось обновить прогресс урока.'
      } finally {
        this.lessonSubmittingById = { ...this.lessonSubmittingById, [String(lid)]: false }
      }
    },

    lessonExam (order, lessonId) {
      const exams = Array.isArray(order?.exams) ? order.exams : []
      return exams.find((x) => x.exam_type === 'lesson' && Number(x.lesson_id) === Number(lessonId)) || null
    },
    finalExam (order) {
      const exams = Array.isArray(order?.exams) ? order.exams : []
      return exams.find((x) => x.exam_type === 'final') || null
    },
    canOpenExam (exam) { return Boolean(exam && this.isPaid(this.currentOrder) && exam.is_unlocked && !exam.is_passed) },
    async loadExam () {
      if (!this.currentOrder || !this.routeExamId) return
      this.examLoading = true
      this.examError = ''
      this.examSubmitResult = ''
      this.activeExam = null
      this.examAnswers = {}
      try {
        const response = await fetchMyEnrollmentExamDetail(this.currentOrder.id, this.routeExamId)
        this.activeExam = response?.data || null
        const next = {}
        ;(this.activeExam?.questions || []).forEach((q) => { next[String(q.id)] = [] })
        this.examAnswers = next
      } catch (err) {
        this.examError = err?.userMessage || 'Не удалось загрузить экзамен.'
      } finally {
        this.examLoading = false
      }
    },
    resetExam () {
      this.activeExam = null
      this.examAnswers = {}
      this.examLoading = false
      this.examSubmitting = false
      this.examError = ''
      this.examSubmitResult = ''
    },
    isSelected (qid, oid) { return (this.examAnswers[String(qid)] || []).includes(Number(oid)) },
    toggleOption (qid, oid, checked) {
      const key = String(qid)
      const prev = Array.isArray(this.examAnswers[key]) ? [...this.examAnswers[key]] : []
      const n = Number(oid)
      const next = checked ? [...new Set([...prev, n])] : prev.filter((x) => x !== n)
      this.examAnswers = { ...this.examAnswers, [key]: next }
    },
    async submitExam () {
      if (!this.currentOrder || !this.activeExam || this.examSubmitting) return
      this.examSubmitting = true
      this.examError = ''
      this.examSubmitResult = ''
      try {
        const answers = (this.activeExam.questions || []).map((q) => ({ question: q.id, options: this.examAnswers[String(q.id)] || [] }))
        const response = await submitMyEnrollmentExam(this.currentOrder.id, this.activeExam.id, { answers })
        const result = response?.data || {}
        await this.loadOrderDetail(this.currentOrder.id)
        if (result.is_passed) {
          this.notice = `Экзамен сдан: ${result.correct_answers}/${result.total_questions}.`
          await this.goToCourse(this.currentOrder.id)
          return
        }
        this.examSubmitResult = `Недостаточно правильных ответов: ${result.correct_answers}/${result.total_questions}.`
      } catch (err) {
        this.examError = err?.userMessage || 'Не удалось отправить ответы.'
      } finally {
        this.examSubmitting = false
      }
    },
    certificateLabel (status) {
      const value = String(status || '').toLowerCase()
      if (value === 'issued') return 'Выдан'
      if (value === 'rejected') return 'Отклонен'
      return 'Не рассмотрен'
    },
    async downloadCertificate () {
      if (!this.currentOrder?.id || this.certificateDownloading) return
      this.certificateDownloading = true
      this.error = ''
      try {
        const response = await fetchMyEnrollmentCertificatePdf(this.currentOrder.id)
        const blob = response?.data instanceof Blob
          ? response.data
          : new Blob([response?.data], { type: 'application/pdf' })
        const fileName = `certificate-${this.currentOrder.id}.pdf`
        const objectUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = objectUrl
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(objectUrl)
      } catch (err) {
        this.error = err?.userMessage || 'Не удалось скачать сертификат.'
      } finally {
        this.certificateDownloading = false
      }
    },

    isPaid (order) { const st = String(order?.status || '').toLowerCase(); return st === 'active' || st === 'completed' || st === 'paid' },
    courseName (order) { return order?.course?.name || order?.course_name || 'Курс' },
    courseDuration (order) { return order?.course?.duration || order?.course_duration || '' },
    courseDescription (order) { return order?.course?.description || order?.course_description || '' },
    priceName (order) { return order?.price?.name || order?.price_name || 'Тариф' },
    priceShortDescription (order) { return order?.price?.short_description || order?.price_short_description || '' },
    priceDescription (order) { return order?.price?.description || order?.price_description || '' },
    priceValue (order) { return Number(order?.price?.price || order?.price_value || 0) },
    teachersCount (order) { return Number(order?.course?.teachers_number || order?.teachers_number || 0) || 0 },
    lessonsTotal (order) { return Number(order?.lessons_total || order?.course?.lessons_number || order?.lessons_number || 0) || 0 },
    completedLessons (order) { return Number(order?.lessons_completed || 0) || 0 },
    curatorName (order) { return order?.curator?.name || '' },
    safeUrl (value) {
      const s = String(value || '').trim()
      if (!s) return ''
      try { const url = new URL(s); if (!['http:', 'https:'].includes(url.protocol)) return ''; return url.toString() } catch (e) { return '' }
    },
    isDirectVideo (value) { return /\.(mp4|webm|ogg|m3u8)(\?.*)?$/i.test(this.safeUrl(value)) },
    embedUrl (value) {
      const url = this.safeUrl(value)
      if (!url) return ''
      try {
        const u = new URL(url)
        const h = u.hostname.toLowerCase()
        if (h.includes('youtube.com')) { const id = u.searchParams.get('v'); return id ? `https://www.youtube.com/embed/${id}` : '' }
        if (h.includes('youtu.be')) { const id = u.pathname.replace('/', ''); return id ? `https://www.youtube.com/embed/${id}` : '' }
        if (h.includes('vimeo.com')) { const id = u.pathname.split('/').filter(Boolean).pop(); return id ? `https://player.vimeo.com/video/${id}` : '' }
      } catch (e) {}
      return ''
    },
    money (v) { return `${Number(v || 0).toLocaleString('ru-RU')} руб.` }
  }
}
</script>

<style scoped>
.study-note { margin-bottom: 12px; padding: 10px 12px; border-radius: 10px; font-size: 14px; }
.study-note--ok { background: #e8f7ee; color: #1f7a41; }
.study-note--err { background: #fff0f2; color: #ac2f48; }
.study-empty { border: 1px dashed #cfd6e4; border-radius: 14px; padding: 20px; display: grid; gap: 10px; justify-items: start; }
.study-empty__title { font-size: 18px; font-weight: 700; color: #21263a; }
.study-empty__text { color: #646b7b; font-size: 14px; }
.study-layout { display: grid; grid-template-columns: 1fr; gap: 14px; align-items: start; }
.study-workspace { min-width: 0; }
.study-card { border: 1px solid #e1e6f2; border-radius: 12px; padding: 12px; background: #fff; display: grid; gap: 8px; }
.study-card--active { border-color: #b9c7e9; box-shadow: 0 8px 20px rgba(26, 45, 82, 0.08); }
.study-card__title { margin: 0; font-size: 16px; color: #1d2437; }
.study-card__meta { margin: 0; font-size: 13px; color: #5b6272; }
.study-panel { background: #fff; border: 1px solid #e3e8f2; border-radius: 14px; padding: 16px; display: grid; gap: 12px; }
.study-panel__head { display: flex; justify-content: space-between; gap: 10px; flex-wrap: wrap; align-items: center; }
.study-panel__head h3 { margin: 0; font-size: 24px; color: #19233a; }
.study-panel__text { margin: 0; color: #515b72; font-size: 14px; }
.study-courses-grid { display: grid; gap: 10px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
.study-badge { border-radius: 999px; padding: 6px 12px; font-size: 12px; font-weight: 600; }
.study-badge--ok { background: #e9f8ee; color: #1f7a41; }
.study-badge--wait { background: #fff1f2; color: #b83850; }
.study-breadcrumbs { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.study-breadcrumbs__item { border: 0; padding: 0; background: transparent; color: #4c5b7a; font-size: 13px; }
.study-breadcrumbs__item--current { color: #22304f; font-weight: 700; }
.study-breadcrumbs__item:disabled { opacity: 0.45; cursor: not-allowed; }
.study-breadcrumbs__sep { color: #8c95aa; font-size: 13px; }
.study-section { border: 1px solid #e3e8f2; border-radius: 12px; padding: 12px; display: grid; gap: 10px; }
.study-section__title { margin: 0; font-size: 16px; color: #1f273c; }
.study-actions { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.study-info-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.study-info-card { border: 1px solid #e4e8f2; border-radius: 12px; padding: 10px; background: #fbfcff; }
.study-info-card__title { margin: 0 0 8px; font-size: 15px; color: #1f273c; }
.study-info-card__line { margin: 0 0 6px; font-size: 13px; color: #4f5f7f; }
.study-info-card__line:last-child { margin-bottom: 0; }
.lesson-card { border: 1px solid #e4e8f2; border-radius: 12px; padding: 10px; display: grid; gap: 8px; background: #fbfcff; }
.lesson-card__head { display: flex; justify-content: space-between; gap: 8px; flex-wrap: wrap; align-items: center; }
.lesson-card__head h4 { margin: 0; font-size: 15px; color: #1f273c; }
.lesson-card__meta { margin: 0; font-size: 13px; color: #63708a; }
.lesson-badge { border-radius: 999px; padding: 4px 9px; font-size: 11px; font-weight: 600; }
.lesson-badge--open { background: #edf4ff; color: #2f5ba7; }
.lesson-badge--lock { background: #f3f4f7; color: #687188; }
.lesson-help { font-size: 13px; color: #63708a; }
.lesson-video { display: grid; gap: 8px; }
.lesson-video iframe { width: 100%; aspect-ratio: 16/9; border: 0; border-radius: 10px; background: #000; }
.lesson-video video { width: 100%; border-radius: 10px; background: #000; }
.lesson-text { margin: 0; white-space: pre-wrap; font-family: inherit; font-size: 13px; color: #4a566f; }
.exam-q { border: 1px solid #e5e9f3; border-radius: 12px; padding: 10px; display: grid; gap: 8px; }
.exam-q h5 { margin: 0; font-size: 14px; color: #1f273c; }
.exam-opt { display: flex; gap: 8px; align-items: center; font-size: 14px; color: #4a566f; }
@media (max-width: 1199px) {
  .study-courses-grid { grid-template-columns: 1fr; }
  .study-info-grid { grid-template-columns: 1fr; }
}
</style>
