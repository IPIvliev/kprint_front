<template>

<div class="content">
  <!-- teaser-->
  <div class="teaser">
    <div class="teaser__img"><img :src="image" alt=""></div>
  </div>
  <!--  /teaser-->
  <!-- post-->
  <div class="post">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 nout-hide">
          <div class="post__sidebar"> <router-link class="post__link" to="/news">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_78_2225)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3333 7.99992C15.3333 12.0499 12.0499 15.3333 7.99992 15.3333C3.94992 15.3333 0.666585 12.0499 0.666585 7.99992C0.666585 3.94992 3.94992 0.666584 7.99992 0.666585C12.0499 0.666585 15.3333 3.94992 15.3333 7.99992ZM9.49976 10.1333C9.50085 10.2279 9.47703 10.3211 9.43069 10.4036C9.38435 10.4861 9.31712 10.555 9.23576 10.6033C9.15672 10.6487 9.06622 10.6704 8.97515 10.6657C8.88409 10.6609 8.79633 10.63 8.72242 10.5766L5.72242 8.44325C5.65278 8.39234 5.59626 8.32557 5.55754 8.24848C5.51882 8.17139 5.49901 8.08619 5.49976 7.99992C5.4989 7.91354 5.51866 7.8282 5.55738 7.75098C5.59611 7.67377 5.65268 7.6069 5.72242 7.55592L8.72242 5.42258C8.79633 5.36916 8.88409 5.33823 8.97515 5.3335C9.06622 5.32877 9.15672 5.35044 9.23576 5.39592C9.31722 5.44427 9.38451 5.51323 9.43086 5.59586C9.4772 5.67848 9.50097 5.77186 9.49976 5.86658L9.49976 10.1333Z" fill="#D83A56"></path>
                </g>
                <defs>
                  <clipPath>
                    <rect width="16" height="16" fill="white" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 16 16)"></rect>
                  </clipPath>
                </defs>
              </svg>вернуться к публикациям</router-link>
            <div class="post__dateblock">
              <div class="post__daterow">
                <div class="post__datetitle">Дата публикации:</div>
                <div class="post__datetext">{{ articleDate }}</div>
              </div>
              <div class="post__daterow">
                <div class="post__datetitle">Тип публикации:</div>
                <div class="post__datetext">
                  <router-link
                    v-if="articleCategory.slug"
                    class="post__type-link"
                    :to="categoryLink(articleCategory.slug)"
                  >
                    {{ articleCategory.title }}
                  </router-link>
                  <span v-else>{{ articleCategory.title }}</span>
                </div>
              </div>
            </div>
            <div class="post__social">
              <div class="post__socialtitle">Поделиться публикацией:</div>
              <ul class="post__sociallist">
                <li>
                  <a href="https://vk.com/gorky_liquid" target="_blank" rel="noopener noreferrer" aria-label="VK">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="16" cy="16" r="16" fill="#EFEFF0"></circle>
                      <text x="16" y="20" text-anchor="middle" font-size="10" font-family="Arial, sans-serif" font-weight="700" fill="#232629">VK</text>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="https://dzen.ru/gorky_liquid" target="_blank" rel="noopener noreferrer" aria-label="Dzen">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="16" cy="16" r="16" fill="#EFEFF0"></circle>
                      <text x="16" y="20" text-anchor="middle" font-size="9" font-family="Arial, sans-serif" font-weight="700" fill="#232629">DZ</text>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="https://ok.ru/group/70000046325756" target="_blank" rel="noopener noreferrer" aria-label="Odnoklassniki">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="16" cy="16" r="16" fill="#EFEFF0"></circle>
                      <text x="16" y="20" text-anchor="middle" font-size="9" font-family="Arial, sans-serif" font-weight="700" fill="#232629">OK</text>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <h1 class="post__title">{{ article.title }}</h1>
          <div class="post__dateblock nout-visible">
            <div class="post__daterow">
              <div class="post__datetitle">Дата публикации:</div>
              <div class="post__datetext">{{ articleDate }}</div>
            </div>
            <div class="post__daterow">
              <div class="post__datetitle">Тип публикации:</div>
              <div class="post__datetext">
                <router-link
                  v-if="articleCategory.slug"
                  class="post__type-link"
                  :to="categoryLink(articleCategory.slug)"
                >
                  {{ articleCategory.title }}
                </router-link>
                <span v-else>{{ articleCategory.title }}</span>
              </div>
            </div>
          </div>
          <div class="post__content" v-if="articleBody" v-html="articleBody"></div>
          <div class="post__content" v-else>
            <p>Текст статьи отсутствует.</p>
          </div>
          <ul v-if="articleTags.length" class="post__hashtags">
            <li v-for="tag in articleTags" :key="tag.id || tag.title">
              <router-link :to="tagLink(tag)">{{ tag.title }}</router-link>
            </li>
          </ul>
          <div class="post__social nout-visible">
            <div class="post__socialtitle">Поделиться публикацией:</div>
            <ul class="post__sociallist">
              <li>
                <a href="https://vk.com/gorky_liquid" target="_blank" rel="noopener noreferrer" aria-label="VK">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="16" fill="#EFEFF0"></circle>
                    <text x="16" y="20" text-anchor="middle" font-size="10" font-family="Arial, sans-serif" font-weight="700" fill="#232629">VK</text>
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://dzen.ru/gorky_liquid" target="_blank" rel="noopener noreferrer" aria-label="Dzen">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="16" fill="#EFEFF0"></circle>
                    <text x="16" y="20" text-anchor="middle" font-size="9" font-family="Arial, sans-serif" font-weight="700" fill="#232629">DZ</text>
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://ok.ru/group/70000046325756" target="_blank" rel="noopener noreferrer" aria-label="Odnoklassniki">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="16" fill="#EFEFF0"></circle>
                    <text x="16" y="20" text-anchor="middle" font-size="9" font-family="Arial, sans-serif" font-weight="700" fill="#232629">OK</text>
                  </svg>
                </a>
              </li>
            </ul>
          </div><router-link class="post__link nout-visible" to="/news">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_78_2225)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3333 7.99992C15.3333 12.0499 12.0499 15.3333 7.99992 15.3333C3.94992 15.3333 0.666585 12.0499 0.666585 7.99992C0.666585 3.94992 3.94992 0.666584 7.99992 0.666585C12.0499 0.666585 15.3333 3.94992 15.3333 7.99992ZM9.49976 10.1333C9.50085 10.2279 9.47703 10.3211 9.43069 10.4036C9.38435 10.4861 9.31712 10.555 9.23576 10.6033C9.15672 10.6487 9.06622 10.6704 8.97515 10.6657C8.88409 10.6609 8.79633 10.63 8.72242 10.5766L5.72242 8.44325C5.65278 8.39234 5.59626 8.32557 5.55754 8.24848C5.51882 8.17139 5.49901 8.08619 5.49976 7.99992C5.4989 7.91354 5.51866 7.8282 5.55738 7.75098C5.59611 7.67377 5.65268 7.6069 5.72242 7.55592L8.72242 5.42258C8.79633 5.36916 8.88409 5.33823 8.97515 5.3335C9.06622 5.32877 9.15672 5.35044 9.23576 5.39592C9.31722 5.44427 9.38451 5.51323 9.43086 5.59586C9.4772 5.67848 9.50097 5.77186 9.49976 5.86658L9.49976 10.1333Z" fill="#D83A56"></path>
              </g>
              <defs>
                <clipPath>
                  <rect width="16" height="16" fill="white" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 16 16)"></rect>
                </clipPath>
              </defs>
            </svg>вернуться к публикациям</router-link>
        </div>
      </div>
    </div>
  </div>
  <!--  /post-->
  <!-- callback-->
  <div class="callback">
    <div class="container">
      <div class="callback__block modal-trigger" data-bs-toggle="modal" data-bs-target="#modalCallback">
        <div class="callback__img"><img src="../assets/img/callback.webp" alt=""></div>
        <div class="callback__content">
          <h2 class="callback__title">Хотите узнать больше о наших принтерах или материалах?</h2>
          <p class="callback__text">Укажите свои контактные данные и наш менеджер свяжется с вами для консультации</p>
          <div class="callback__form">
            <button class="btn btn--red btn--big" type="button">Перезвоните мне</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  /callback-->
  <!-- slider-->
  <div class="slider">
    <div class="container">
      <div class="block-header">
        <div class="block-header__block">
          <h2 class="title">Другие публикации</h2>
          <div class="block-header__num">+{{ relatedArticles.length }}</div>
        </div>
        <router-link class="btn btn--black" to="/news">Все новости</router-link>
      </div>
      <div v-if="relatedArticles.length" class="slider__slider">
        <swiper
          :slides-per-view="4"
          :space-between="30"
          :pagination="{ clickable: true }"
          :breakpoints="swiperBreakpoints"
          :modules="modules"
          class="slider__swiper"
        >
          <swiper-slide v-for="related in relatedArticles" :key="`related-${related.id || related.slug}`">
            <article-card :article="related" />
          </swiper-slide>
        </swiper>
      </div>
      <div v-else-if="loadingRelated" class="slider__empty">Загрузка публикаций...</div>
      <div v-else class="slider__empty">Пока нет других публикаций</div>
    </div>
  </div>
  <!--  /slider-->
</div>
</template>

<script>
import { publicApi } from '@/services/http'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { Pagination } from 'swiper'
import ArticleCard from '@/components/News/ArticleCard.vue'

import 'swiper/css'
import 'swiper/css/pagination'

export default {
  name: 'ArticlePage',
  components: { Swiper, SwiperSlide, ArticleCard },
  data () {
    const parsedId = Number(this.$route.params.id)
    return {
      id: Number.isFinite(parsedId) ? parsedId : null,
      article: {},
      relatedArticles: [],
      loadingRelated: false,
      modules: [Pagination],
      swiperBreakpoints: {
        0: { slidesPerView: 1, spaceBetween: 16 },
        576: { slidesPerView: 2, spaceBetween: 20 },
        992: { slidesPerView: 3, spaceBetween: 24 },
        1400: { slidesPerView: 4, spaceBetween: 30 }
      }
    }
  },
  computed: {
    image () {
      return this.resolveMediaUrl(this.article.article_image || '')
    },
    articleCategory () {
      const category = this.article.category_detail || {}
      const title = category.title || this.article.category_title || '—'
      const slug = category.slug || this.article.category_slug || ''
      return { title, slug }
    },
    articleTags () {
      if (!Array.isArray(this.article.tags)) {
        return []
      }
      return this.article.tags
        .map((tag) => {
          if (tag && typeof tag === 'object') {
            return {
              id: tag.id,
              title: tag.title || tag.name || '',
              slug: tag.slug || ''
            }
          }
          return { id: tag, title: String(tag || ''), slug: '' }
        })
        .filter((tag) => tag.title)
    },
    articleBody () {
      return this.sanitizeHtml(this.article.body || '')
    },
    articleDate () {
      return this.formatDate(
        this.article.publish_iso || this.article.publish || this.article.created || this.article.updated
      )
    }
  },
  watch: {
    '$route.params.id' (nextId) {
      const parsedId = Number(nextId)
      this.id = Number.isFinite(parsedId) ? parsedId : null
      this.loadArticle()
    }
  },
  mounted () {
    this.loadArticle()
  },
  methods: {
    async loadArticle () {
      if (!this.id) {
        this.$router.replace('/news')
        return
      }
      try {
        const response = await publicApi.get(`/api/articles/${this.id}/`)
        this.article = response.data || {}
        this.ensureCanonicalArticleUrl()
        await this.fetchRelatedArticles()
      } catch (error) {
        this.$router.replace('/news')
      }
    },
    extractArticles (payload) {
      if (Array.isArray(payload)) {
        return payload
      }
      if (payload && Array.isArray(payload.results)) {
        return payload.results
      }
      return []
    },
    async fetchRelatedArticles () {
      this.loadingRelated = true
      try {
        const response = await publicApi.get('/api/articles/')
        const source = this.extractArticles(response && response.data)
        const currentId = Number(this.article && this.article.id)
        const sorted = source
          .filter((item) => item && item.id && Number(item.id) !== currentId)
          .sort((left, right) => {
            const leftDate = new Date(left.publish_iso || left.publish || left.created || left.updated || 0).getTime()
            const rightDate = new Date(right.publish_iso || right.publish || right.created || right.updated || 0).getTime()
            return rightDate - leftDate
          })
        this.relatedArticles = sorted.slice(0, 8)
      } catch (error) {
        this.relatedArticles = []
      } finally {
        this.loadingRelated = false
      }
    },
    ensureCanonicalArticleUrl () {
      const articleId = Number(this.article && this.article.id)
      if (!Number.isFinite(articleId) || articleId <= 0) {
        return
      }
      const targetSlug = String((this.article && this.article.slug) || '').trim()
      const currentId = Number(this.$route.params.id)
      const currentSlug = String(this.$route.params.slug || '').trim()

      if (!targetSlug) {
        if (currentSlug) {
          this.$router.replace({
            name: 'Article',
            params: { id: String(articleId) },
            query: this.$route.query,
            hash: this.$route.hash
          })
        }
        return
      }

      if (currentId === articleId && currentSlug === targetSlug) {
        return
      }

      this.$router.replace({
        name: 'Article',
        params: { id: String(articleId), slug: targetSlug },
        query: this.$route.query,
        hash: this.$route.hash
      })
    },
    tagLink (tag) {
      if (!tag || !tag.slug) {
        return '/news'
      }
      return `/news/tag/${tag.slug}`
    },
    categoryLink (slug) {
      if (!slug) {
        return '/news'
      }
      return `/news/category/${slug}`
    },
    formatDate (value) {
      const raw = String(value || '').trim()
      if (!raw) {
        return '-'
      }
      if (/^\d{2}\.\d{2}\.\d{4}$/.test(raw)) {
        return raw
      }
      const parsed = new Date(raw)
      if (Number.isNaN(parsed.getTime())) {
        return raw
      }
      const pad = (num) => String(num).padStart(2, '0')
      return `${pad(parsed.getDate())}.${pad(parsed.getMonth() + 1)}.${parsed.getFullYear()}`
    },
    sanitizeHtml (html) {
      if (!html) {
        return ''
      }
      const container = document.createElement('div')
      container.innerHTML = String(html)
      const blockedSelectors = 'script,style,iframe,object,embed,link,meta'
      container.querySelectorAll(blockedSelectors).forEach((el) => el.remove())

      container.querySelectorAll('*').forEach((el) => {
        Array.from(el.attributes).forEach((attr) => {
          const name = attr.name.toLowerCase()
          const rawValue = String(attr.value || '').trim()
          const value = rawValue.toLowerCase()
          if (name.startsWith('on')) {
            el.removeAttribute(attr.name)
            return
          }
          if ((name === 'href' || name === 'src') && value.startsWith('javascript:')) {
            el.removeAttribute(attr.name)
            return
          }
          if (name === 'src' || name === 'href') {
            const resolved = this.resolveMediaUrl(rawValue)
            if (resolved) {
              el.setAttribute(attr.name, resolved)
            }
          }
        })
      })
      return container.innerHTML
    },
    resolveMediaUrl (path) {
      const raw = String(path || '').trim()
      if (!raw) {
        return ''
      }
      if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('data:')) {
        return raw
      }
      const base = (process.env.VUE_APP_API_BASE || '').replace(/\/+$/, '')
      if (!base) {
        return raw
      }
      if (raw.startsWith('/')) {
        return `${base}${raw}`
      }
      return `${base}/${raw}`
    }
  }
}
</script>

<style scoped>
.post__type-link {
  color: inherit;
  text-decoration: underline;
}

.slider__empty {
  font-size: 15px;
  line-height: 1.5;
  color: #667085;
  padding: 16px 0;
}
</style>
