<template>
  <div>
    <router-link class="article" :to="linkOpen" :style="cardStyle">
      <div class="article__img">
        <img :src="image" :alt="article.title || ''">
      </div>
      <div class="article__content">
        <h3 class="article__title">{{ article.title }}</h3>
        <p class="article__text">{{ excerpt }}</p>
      </div>
      <ul class="article__list">
        <li>{{ displayDate }}</li>
        <li>{{ category.title }}</li>
      </ul>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    linkOpen () {
      const id = this.article && this.article.id
      if (!id) {
        return '/news'
      }
      const rawSlug = String((this.article && this.article.slug) || '').trim()
      if (!rawSlug) {
        return `/news/${id}`
      }
      return `/news/${id}/${encodeURIComponent(rawSlug)}`
    },
    image () {
      return this.article.article_image || ''
    },
    excerpt () {
      const plain = String(this.article.body || '').replace(/<\/?[^>]+(>|$)/g, '').trim()
      if (!plain) {
        return 'Описание отсутствует'
      }
      if (plain.length <= 100) {
        return plain
      }
      return `${plain.slice(0, 100)}...`
    },
    category () {
      const categoryDetail = this.article.category_detail || {}
      return {
        title: categoryDetail.title || this.article.category_title || 'Без категории',
        color: categoryDetail.color || this.article.category_color || ''
      }
    },
    displayDate () {
      return this.formatDate(
        this.article.publish_iso || this.article.publish || this.article.created || this.article.updated
      )
    },
    cardStyle () {
      const rawColor = String(this.category.color || '').trim()
      const color = /^#[0-9a-fA-F]{6}$/.test(rawColor) ? rawColor : '#F2F4F7'
      return {
        backgroundColor: color
      }
    }
  },
  methods: {
    formatDate (value) {
      const raw = String(value || '').trim()
      if (!raw) {
        return '—'
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
    }
  }
}
</script>
