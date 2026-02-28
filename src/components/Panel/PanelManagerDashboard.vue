<template>
  <div class="content content--pbn">
    <div class="panel">
      <div class="container">
        <div class="row">
          <menu-block />
          <div class="col-xxl-9 col-xl-8">
            <div class="panel__block">
              <div class="panel__head">
                <div class="panel__title">Дашборд менеджера</div>
              </div>
              <div class="panel__body">
                <div v-if="error" class="panel__table-text" style="margin-bottom: 12px;">
                  {{ error }}
                </div>
                <div class="row gy-1">
                  <div v-for="card in cards" :key="card.id" class="col-lg-6">
                    <router-link
                      class="panel__item"
                      :class="{
                        'panel__item--news': card.id === 'news-articles',
                        'panel__item--callback': card.id === 'callback-requests'
                      }"
                      :to="card.to"
                    >
                      <div class="panel__item-img">
                        <img :src="card.image" :alt="card.title">
                      </div>
                      <div class="panel__item-num">
                        <span>{{ card.value }}</span>{{ card.title }}
                      </div>
                      <div class="panel__item-plus" />
                    </router-link>
                  </div>
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
import panelPrintImage from '@/assets/img/panel_1.webp'
import panelShopImage from '@/assets/img/panel_2.webp'
import panelStudyImage from '@/assets/img/study_courses.png'
import panelNewsImage from '@/assets/img/news-business-text.png'
import panelCallbackImage from '@/assets/img/panel-icons/feedback.svg'
import {
  fetchManagerCallbackRequests,
  fetchPanelArticles,
  fetchPrintJobs,
  fetchShopOrderStatuses,
  fetchShopOrders
} from '@/services/panel.service'
import { fetchManagerStudyEnrollments } from '@/services/study-learning.service'
import { isManagerUser } from '@/utils/panelMode'

export default {
  name: 'PanelManagerDashboard',
  components: { MenuBlock },
  data () {
    return {
      error: '',
      stats: {
        printOrders: 0,
        shopOrders: 0,
        newsArticles: 0,
        studyPendingLearners: 0,
        callbackNewRequests: 0
      }
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.auth.user
    },
    cards () {
      return [
        {
          id: 'print-orders',
          to: '/panel/print/orders',
          image: panelPrintImage,
          value: this.stats.printOrders,
          title: 'заказов на печать'
        },
        {
          id: 'shop-orders',
          to: '/panel/shop/orders',
          image: panelShopImage,
          value: this.stats.shopOrders,
          title: 'заказов магазина'
        },
        {
          id: 'news-articles',
          to: '/panel/news/articles',
          image: panelNewsImage,
          value: this.stats.newsArticles,
          title: 'черновиков новостей'
        },
        {
          id: 'study-pending-learners',
          to: '/panel/study/enrollments',
          image: panelStudyImage,
          value: this.stats.studyPendingLearners,
          title: 'учеников без сертификата'
        },
        {
          id: 'callback-requests',
          to: '/panel/callback/requests',
          image: panelCallbackImage,
          value: this.stats.callbackNewRequests,
          title: 'новых обращений'
        }
      ]
    }
  },
  methods: {
    ensureAccess () {
      if (isManagerUser(this.currentUser)) {
        return true
      }
      this.$router.replace('/panel')
      return false
    },
    getListLength (result) {
      if (result.status !== 'fulfilled') {
        return 0
      }
      const payload = result.value && result.value.data
      return Array.isArray(payload) ? payload.length : 0
    },
    normalizeStatusToken (value) {
      return String(value || '')
        .toLowerCase()
        .replace(/ё/g, 'е')
        .replace(/[\s_-]+/g, '')
    },
    isNewStatusToken (value) {
      const token = this.normalizeStatusToken(value)
      return token === 'new' || token.startsWith('нов')
    },
    normalizeStudyStatusToken (value) {
      return String(value || '').trim().toLowerCase()
    },
    isEnrollmentPaid (enrollment) {
      if (enrollment?.paid_at) {
        return true
      }
      const status = this.normalizeStudyStatusToken(enrollment?.status)
      return status === 'active' || status === 'completed' || status === 'paid'
    },
    isCertificateIssued (enrollment) {
      return this.normalizeStudyStatusToken(enrollment?.certificate_status) === 'issued'
    },
    getNewUnpaidPrintOrdersCount (result) {
      if (result.status !== 'fulfilled') {
        return 0
      }
      const payload = result.value && result.value.data
      if (!Array.isArray(payload)) {
        return 0
      }
      return payload.filter((order) => {
        const statusRaw = order?.status || order?.status_code || order?.status_slug || order?.status_label || ''
        const isNew = this.isNewStatusToken(statusRaw)
        const isUnpaid = typeof order?.is_paid === 'boolean' ? !order.is_paid : true
        return isNew && isUnpaid
      }).length
    },
    getNewUnpaidShopOrdersCount (ordersResult, statusesResult) {
      if (ordersResult.status !== 'fulfilled') {
        return 0
      }
      const orders = Array.isArray(ordersResult.value?.data) ? ordersResult.value.data : []
      const statuses = statusesResult.status === 'fulfilled' && Array.isArray(statusesResult.value?.data)
        ? statusesResult.value.data
        : []
      return orders.filter((order) => {
        if (Boolean(order?.is_paid)) {
          return false
        }
        const statusById = statuses.find((item) => Number(item?.id) === Number(order?.status))
        const statusRaw = statusById?.name || order?.status_name || order?.status_label || order?.status_slug || order?.status || ''
        return this.isNewStatusToken(statusRaw)
      }).length
    },
    getDraftNewsCount (result) {
      if (result.status !== 'fulfilled') {
        return 0
      }
      const payload = result.value && result.value.data
      if (!Array.isArray(payload)) {
        return 0
      }
      return payload.filter((article) => String(article?.status || '').toLowerCase() === 'draft').length
    },
    getNewCallbackCount (result) {
      if (result.status !== 'fulfilled') {
        return 0
      }
      const payload = result.value && result.value.data
      if (!Array.isArray(payload)) {
        return 0
      }
      return payload.filter((requestItem) => {
        const status = String(requestItem?.status || '').toLowerCase()
        return !status || status === 'new'
      }).length
    },
    getStudyPendingLearnersCount (enrollmentsResult) {
      if (enrollmentsResult.status !== 'fulfilled') {
        return 0
      }
      const enrollments = Array.isArray(enrollmentsResult.value?.data) ? enrollmentsResult.value.data : []
      return enrollments.filter((enrollment) => this.isEnrollmentPaid(enrollment) && !this.isCertificateIssued(enrollment)).length
    },
    async fetchStats () {
      this.error = ''
      const results = await Promise.allSettled([
        fetchPrintJobs(),
        fetchShopOrders(),
        fetchShopOrderStatuses(),
        fetchPanelArticles(),
        fetchManagerStudyEnrollments(),
        fetchManagerCallbackRequests({ status: 'new' })
      ])
      const studyPendingLearners = this.getStudyPendingLearnersCount(results[4])

      this.stats.printOrders = this.getNewUnpaidPrintOrdersCount(results[0])
      this.stats.shopOrders = this.getNewUnpaidShopOrdersCount(results[1], results[2])
      this.stats.newsArticles = this.getDraftNewsCount(results[3])
      this.stats.studyPendingLearners = studyPendingLearners
      this.stats.callbackNewRequests = this.getNewCallbackCount(results[5])

      const failed = results.some((item) => item.status === 'rejected')
      if (failed) {
        this.error = 'Часть данных не удалось загрузить, показаны доступные значения.'
      }
    }
  },
  mounted () {
    if (!this.ensureAccess()) {
      return
    }
    this.fetchStats()
  }
}
</script>

<style scoped>
.panel__item--news .panel__item-img {
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 16px;
}

.panel__item--news .panel__item-img img {
  width: 72%;
  max-width: 250px;
  height: auto;
  object-fit: contain;
  transform: translate(-36px, -6px);
}

.panel__item--callback .panel__item-img {
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 26px 0 0 34px;
}

.panel__item--callback .panel__item-img img {
  width: 108px;
  height: 108px;
  padding: 24px;
  border-radius: 28px;
  background: linear-gradient(135deg, #ffe4ea 0%, #ffd2dc 100%);
  box-shadow: 0 14px 28px rgba(216, 58, 86, 0.22);
  object-fit: contain;
}

@media (max-width: 991.98px) {
  .panel__item--news .panel__item-img img {
    width: 68%;
    max-width: 220px;
    transform: translate(-24px, -2px);
  }

  .panel__item--callback .panel__item-img {
    padding: 22px 0 0 24px;
  }

  .panel__item--callback .panel__item-img img {
    width: 96px;
    height: 96px;
    padding: 20px;
    border-radius: 24px;
  }
}
</style>
