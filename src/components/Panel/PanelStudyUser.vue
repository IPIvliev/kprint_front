<template>
  <div class="content content--pbn">
    <div class="panel">
      <div class="container">
        <div class="row">
          <menu-block />
          <div class="col-xxl-9 col-xl-8">
            <div class="panel__block">
              <div class="panel__head">
                <div class="panel__title">Обучение<span>{{ studyOrders.length }}</span></div>
                <router-link to="/study" class="btn btn--grayborder btn-sm">
                  Подобрать курс
                </router-link>
              </div>
              <div class="panel__body">
                <div v-if="notice" class="panel-study__notice panel-study__notice--success">{{ notice }}</div>
                <div v-if="error" class="panel-study__notice panel-study__notice--error">{{ error }}</div>

                <div v-if="!studyOrders.length" class="panel-study__empty">
                  <div class="panel-study__empty-title">У вас пока нет курсов в личном кабинете.</div>
                  <div class="panel-study__empty-text">
                    Выберите курс в разделе обучения, нажмите "Купить" и вернитесь сюда для оплаты и доступа к урокам.
                  </div>
                  <router-link to="/study" class="btn btn--red">Перейти к курсам</router-link>
                </div>

                <div v-else class="panel-study__list">
                  <article
                    v-for="order in studyOrders"
                    :key="order.id"
                    class="panel-study__course"
                  >
                    <div class="panel-study__course-main">
                      <div class="panel-study__course-title-row">
                        <h3 class="panel-study__course-title">{{ order.course_name }}</h3>
                        <span
                          class="panel-study__course-badge"
                          :class="order.status === 'paid' ? 'panel-study__course-badge--paid' : 'panel-study__course-badge--pending'"
                        >
                          {{ order.status === 'paid' ? 'Доступ открыт' : 'Ожидает оплаты' }}
                        </span>
                      </div>
                      <div class="panel-study__course-meta">
                        <span>{{ order.lessons_number }} уроков</span>
                        <span>{{ order.teachers_number }} преподавателей</span>
                        <span>Тариф: {{ order.price_name }}</span>
                      </div>
                      <div class="panel-study__course-time">
                        Добавлено: {{ formatDate(order.created_at) }}
                      </div>
                    </div>
                    <div class="panel-study__course-actions">
                      <button type="button" class="btn btn--grayborder btn-sm" @click="openOrder(order.id)">
                        Подробнее
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

    <teleport to="body">
      <div v-if="showModal && currentOrder" class="panel-study-modal-overlay" @click.self="closeModal">
        <div class="panel-study-modal">
          <button type="button" class="panel-study-modal__close" @click="closeModal">x</button>
          <div class="panel-study-modal__head">
            <h3>{{ currentOrder.course_name }}</h3>
            <div class="panel-study-modal__status">
              <span
                class="panel-study-modal__status-badge"
                :class="currentOrder.status === 'paid' ? 'panel-study-modal__status-badge--paid' : 'panel-study-modal__status-badge--pending'"
              >
                {{ currentOrder.status === 'paid' ? 'Оплачено' : 'Не оплачено' }}
              </span>
            </div>
          </div>

          <div class="panel-study-modal__body">
            <div class="panel-study-modal__grid">
              <div class="panel-study-modal__card">
                <div class="panel-study-modal__card-title">Курс</div>
                <div class="panel-study-modal__card-value">{{ currentOrder.course_name }}</div>
                <div v-if="currentOrder.course_duration" class="panel-study-modal__card-subvalue">
                  Длительность: {{ currentOrder.course_duration }}
                </div>
                <div class="panel-study-modal__card-subvalue">
                  {{ currentOrder.lessons_number }} уроков
                </div>
              </div>

              <div class="panel-study-modal__card">
                <div class="panel-study-modal__card-title">Тариф</div>
                <div class="panel-study-modal__card-value">{{ currentOrder.price_name }}</div>
                <div class="panel-study-modal__card-price">{{ formatMoney(currentOrder.price_value) }}</div>
              </div>
            </div>

            <div v-if="currentOrder.course_description" class="panel-study-modal__section">
              <div class="panel-study-modal__section-title">Описание курса</div>
              <p class="panel-study-modal__section-text">{{ currentOrder.course_description }}</p>
            </div>

            <div class="panel-study-modal__section">
              <div class="panel-study-modal__section-title">Детали тарифа</div>
              <p v-if="currentOrder.price_short_description" class="panel-study-modal__section-text">
                {{ currentOrder.price_short_description }}
              </p>
              <p v-if="currentOrder.price_description" class="panel-study-modal__section-text">
                {{ currentOrder.price_description }}
              </p>
              <p v-if="!currentOrder.price_short_description && !currentOrder.price_description" class="panel-study-modal__section-text">
                Описание тарифа пока не заполнено.
              </p>
            </div>

            <div class="panel-study-modal__section">
              <div class="panel-study-modal__section-title">Доступ к обучению</div>
              <p v-if="currentOrder.status === 'paid'" class="panel-study-modal__section-text">
                Курс оплачен. На следующем этапе здесь появятся уроки, экзамены и трекинг прогресса.
              </p>
              <p v-else class="panel-study-modal__section-text">
                Для открытия уроков и экзаменов нужно оплатить курс.
              </p>
            </div>
          </div>

          <div class="panel-study-modal__actions">
            <button type="button" class="btn btn--grayborder" @click="closeModal">Закрыть</button>
            <button
              v-if="currentOrder.status !== 'paid'"
              type="button"
              class="btn btn--red"
              :disabled="paymentSubmitting"
              @click="payCurrentCourse"
            >
              {{ paymentSubmitting ? 'Обработка...' : 'Оплатить курс' }}
            </button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import MenuBlock from '../elements/Panel/MenuBlock.vue'
import { fetchStudyCourse } from '@/services/study.service'
import {
  listStudyOrders,
  markStudyOrderPaid,
  upsertPendingStudyOrder
} from '@/services/study-order.service'

export default {
  name: 'PanelStudyUser',
  components: { MenuBlock },
  data () {
    return {
      studyOrders: [],
      showModal: false,
      modalOrderId: '',
      paymentSubmitting: false,
      error: '',
      notice: ''
    }
  },
  computed: {
    currentOrder () {
      if (!this.modalOrderId) {
        return null
      }
      return this.studyOrders.find((item) => item.id === this.modalOrderId) || null
    }
  },
  mounted () {
    this.loadOrders()
    this.processRoutePurchase()
  },
  watch: {
    '$route.query' () {
      this.processRoutePurchase()
    }
  },
  methods: {
    loadOrders () {
      this.studyOrders = listStudyOrders()
    },
    clearRoutePurchaseQuery () {
      const query = { ...(this.$route?.query || {}) }
      delete query.study_course_id
      delete query.study_price_id
      this.$router.replace({ path: this.$route.path, query }).catch(() => {})
    },
    async processRoutePurchase () {
      const courseId = Number(this.$route?.query?.study_course_id || 0)
      const priceId = Number(this.$route?.query?.study_price_id || 0)
      if (!courseId || !priceId) {
        return
      }

      this.error = ''
      try {
        const response = await fetchStudyCourse(courseId)
        const course = response && response.data ? response.data : null
        const prices = Array.isArray(course?.prices) ? course.prices : []
        const price = prices.find((item) => Number(item.id) === priceId) || null

        if (!course || !price) {
          this.error = 'Не удалось добавить курс в кабинет: тариф не найден.'
          return
        }

        const order = upsertPendingStudyOrder({ course, price })
        this.loadOrders()
        if (order && order.id) {
          this.openOrder(order.id)
          this.notice = 'Курс добавлен в кабинет. Подтвердите оплату для открытия доступа.'
        }
      } catch (error) {
        this.error = error?.userMessage || 'Не удалось загрузить выбранный курс.'
      } finally {
        this.clearRoutePurchaseQuery()
      }
    },
    openOrder (orderId) {
      this.modalOrderId = String(orderId || '')
      this.showModal = Boolean(this.currentOrder)
    },
    closeModal () {
      this.showModal = false
      this.modalOrderId = ''
      this.paymentSubmitting = false
    },
    async payCurrentCourse () {
      if (!this.currentOrder || this.currentOrder.status === 'paid' || this.paymentSubmitting) {
        return
      }

      const confirmText = 'На текущем этапе платежный шлюз для обучения еще не подключен. Отметить курс как оплаченный для проверки сценария?'
      if (typeof window !== 'undefined' && !window.confirm(confirmText)) {
        return
      }

      this.paymentSubmitting = true
      try {
        const updated = markStudyOrderPaid(this.currentOrder.id)
        this.loadOrders()
        if (updated && updated.id) {
          this.modalOrderId = updated.id
          this.notice = 'Курс отмечен как оплаченный. Доступ открыт.'
          this.error = ''
        }
      } finally {
        this.paymentSubmitting = false
      }
    },
    formatDate (value) {
      if (!value) {
        return '-'
      }
      const date = new Date(value)
      if (Number.isNaN(date.getTime())) {
        return String(value)
      }
      return date.toLocaleString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    formatMoney (value) {
      const number = Number(value || 0)
      return `${number.toLocaleString('ru-RU')} руб.`
    }
  }
}
</script>

<style scoped>
.panel-study__notice {
  margin-bottom: 14px;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 14px;
}

.panel-study__notice--success {
  background: #e8f7ee;
  color: #1f7a41;
}

.panel-study__notice--error {
  background: #fff0f2;
  color: #ac2f48;
}

.panel-study__empty {
  border: 1px dashed #cfd6e4;
  border-radius: 14px;
  padding: 22px;
  display: grid;
  gap: 10px;
  justify-items: start;
}

.panel-study__empty-title {
  font-weight: 700;
  font-size: 18px;
  color: #21263a;
}

.panel-study__empty-text {
  color: #646b7b;
  font-size: 14px;
  line-height: 1.55;
  max-width: 650px;
}

.panel-study__list {
  display: grid;
  gap: 12px;
}

.panel-study__course {
  border: 1px solid #e1e6f2;
  border-radius: 14px;
  padding: 14px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  align-items: center;
}

.panel-study__course-title-row {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.panel-study__course-title {
  margin: 0;
  font-size: 19px;
  color: #1d2437;
}

.panel-study__course-badge {
  border-radius: 999px;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 600;
}

.panel-study__course-badge--paid {
  background: #e9f8ee;
  color: #1f7a41;
}

.panel-study__course-badge--pending {
  background: #fff1f2;
  color: #b83850;
}

.panel-study__course-meta {
  margin-top: 8px;
  color: #5b6272;
  font-size: 14px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.panel-study__course-time {
  margin-top: 6px;
  color: #8a91a2;
  font-size: 13px;
}

.panel-study-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(5, 8, 15, 0.6);
  z-index: 1500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.panel-study-modal {
  width: min(900px, 100%);
  max-height: 86vh;
  overflow: auto;
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  position: relative;
  box-shadow: 0 20px 48px rgba(12, 20, 37, 0.35);
}

.panel-study-modal__close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 0;
  background: #edf1f8;
  font-size: 16px;
}

.panel-study-modal__head {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 14px;
  padding-right: 40px;
}

.panel-study-modal__head h3 {
  margin: 0;
  font-size: 26px;
  color: #19233a;
}

.panel-study-modal__status-badge {
  display: inline-flex;
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
}

.panel-study-modal__status-badge--paid {
  background: #e9f8ee;
  color: #1f7a41;
}

.panel-study-modal__status-badge--pending {
  background: #fff1f2;
  color: #b83850;
}

.panel-study-modal__body {
  display: grid;
  gap: 12px;
}

.panel-study-modal__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.panel-study-modal__card {
  border: 1px solid #e3e8f2;
  border-radius: 12px;
  padding: 12px;
  background: #fcfdff;
}

.panel-study-modal__card-title {
  color: #667089;
  font-size: 13px;
}

.panel-study-modal__card-value {
  margin-top: 5px;
  color: #1a2338;
  font-size: 18px;
  font-weight: 700;
}

.panel-study-modal__card-subvalue {
  margin-top: 6px;
  color: #556079;
  font-size: 13px;
}

.panel-study-modal__card-price {
  margin-top: 6px;
  font-size: 20px;
  font-weight: 700;
  color: #1b2336;
}

.panel-study-modal__section {
  border: 1px solid #e3e8f2;
  border-radius: 12px;
  padding: 12px;
}

.panel-study-modal__section-title {
  font-size: 15px;
  font-weight: 700;
  color: #1e2740;
  margin-bottom: 8px;
}

.panel-study-modal__section-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
  color: #515b72;
}

.panel-study-modal__section-text + .panel-study-modal__section-text {
  margin-top: 8px;
}

.panel-study-modal__actions {
  margin-top: 15px;
  padding-top: 12px;
  border-top: 1px solid #e3e8f2;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

@media (max-width: 767px) {
  .panel-study__course {
    grid-template-columns: 1fr;
  }

  .panel-study-modal {
    padding: 20px;
  }

  .panel-study-modal__grid {
    grid-template-columns: 1fr;
  }
}
</style>
