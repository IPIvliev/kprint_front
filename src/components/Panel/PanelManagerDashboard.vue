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
                      :class="{ 'panel__item--news': card.id === 'news-articles' }"
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
import {
  fetchPanelArticles,
  fetchPrintJobs,
  fetchShopOrders,
  fetchStudyManagerCourses
} from '@/services/panel.service'
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
        studyCourses: 0
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
          id: 'study-courses',
          to: '/panel/study/courses',
          image: panelStudyImage,
          value: this.stats.studyCourses,
          title: 'курсов'
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
    async fetchStats () {
      this.error = ''
      const results = await Promise.allSettled([
        fetchPrintJobs(),
        fetchShopOrders(),
        fetchPanelArticles(),
        fetchStudyManagerCourses()
      ])

      this.stats.printOrders = this.getListLength(results[0])
      this.stats.shopOrders = this.getListLength(results[1])
      this.stats.newsArticles = this.getDraftNewsCount(results[2])
      this.stats.studyCourses = this.getListLength(results[3])

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

@media (max-width: 991.98px) {
  .panel__item--news .panel__item-img img {
    width: 68%;
    max-width: 220px;
    transform: translate(-24px, -2px);
  }
}
</style>
