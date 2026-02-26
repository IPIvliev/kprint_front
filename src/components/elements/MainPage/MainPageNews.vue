<template>
  <div class="slider">
    <div class="container">
      <div class="block-header">
        <div class="block-header__block">
          <h2 class="title">Статьи и пресс–релизы</h2>
          <div class="block-header__num">+{{ articles.length }}</div>
        </div>
        <router-link class="btn btn--black" to="/news">Все новости</router-link>
      </div>
      <div v-if="articles.length" class="slider__slider">
        <swiper
          :slides-per-view="4"
          :space-between="30"
          :pagination="{ clickable: true }"
          :breakpoints="swiperBreakpoints"
          :modules="modules"
        >
          <swiper-slide v-for="article in articles" :key="`home-article-${article.id || article.slug}`">
            <article-card :article="article" />
          </swiper-slide>
        </swiper>
      </div>
      <div v-else-if="loading" class="slider__empty">Загрузка публикаций...</div>
      <div v-else class="slider__empty">Публикации пока отсутствуют</div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { Pagination } from 'swiper'
import ArticleCard from '@/components/News/ArticleCard.vue'

import 'swiper/css'
import 'swiper/css/pagination'

export default {
  name: 'MainPageNews',
  components: { Swiper, SwiperSlide, ArticleCard },
  data () {
    return {
      articles: [],
      loading: false,
      modules: [Pagination],
      swiperBreakpoints: {
        0: { slidesPerView: 1, spaceBetween: 16 },
        576: { slidesPerView: 2, spaceBetween: 20 },
        992: { slidesPerView: 3, spaceBetween: 24 },
        1400: { slidesPerView: 4, spaceBetween: 30 }
      }
    }
  },
  mounted () {
    this.fetchArticles()
  },
  methods: {
    extractArticles (payload) {
      if (Array.isArray(payload)) {
        return payload
      }
      if (payload && Array.isArray(payload.results)) {
        return payload.results
      }
      return []
    },
    sortByDate (items) {
      return [...items].sort((left, right) => {
        const leftDate = new Date(left.publish_iso || left.publish || left.created || left.updated || 0).getTime()
        const rightDate = new Date(right.publish_iso || right.publish || right.created || right.updated || 0).getTime()
        return rightDate - leftDate
      })
    },
    async fetchArticles () {
      this.loading = true
      try {
        const payload = await this.$store.dispatch('news/fetchArticles', {
          page: 1,
          pageSize: 8
        })
        const items = this.extractArticles(payload && payload.items)
        this.articles = this.sortByDate(items).slice(0, 8)
      } catch (error) {
        this.articles = []
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.slider__empty {
  font-size: 15px;
  line-height: 1.5;
  color: #667085;
  padding: 16px 0;
}
</style>
