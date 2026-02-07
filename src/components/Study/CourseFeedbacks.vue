<template>
  <div class="white_block cmp-components-study-coursefeedbacks" :class="background">
    <div class="container">
      <div v-if="!normalizedFeedbacks.length" class="panel__table-text">Пока нет отзывов</div>
      <div v-else class="row gy-1">
        <div v-if="currentFeedback && currentFeedback.video" class="col-lg-4">
          <div class="feedback_video_block" @click="openVideo(currentFeedback)">
            <div class="feedback_video">
              <img
                class="feedback_video_img"
                :src="feedbackPhoto(currentFeedback)"
                alt=""
                width="100"
                height="100px"
              >
            </div>
            <div class="video__play">
              <svg width="26" height="38" viewBox="0 0 26 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.75293 37.5194V0.480469L25.714 18.9999L0.75293 37.5194Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div :class="currentFeedback && currentFeedback.video ? 'col-lg-8' : 'col-lg-12'">
          <div class="feedback_card" :class="{ 'feedback_card--full': !hasVideo }">
            <div class="feedback_card_header">
              <img class="feedback_card_avatar" :src="feedbackPhoto(currentFeedback)" alt="">
              <h1 class="feedback_card_title">{{ currentFeedback.name || 'Без имени' }}</h1>
            </div>
            <p class="feedback_card_text" :class="{ 'feedback_card_text--full': !hasVideo }" style="margin-top: 30px;">
              {{ feedbackText(currentFeedback) }}
            </p>
            <span v-if="hasMoreText(currentFeedback)" class="feedback_card_more" @click="toggleDetails">
              {{ show_details ? 'Скрыть' : 'Читать полностью...' }}
            </span>
          </div>
          <div v-if="normalizedFeedbacks.length > 1" class="feedback_paggination">
            <span class="feedback_paggination_previos" @click="prev"> &lt; </span>
            <span
              v-for="(item, index) in normalizedFeedbacks"
              :key="item.id || index"
              class="feedback_paggination_item"
              :class="{ active: index === currentIndex }"
              @click="goTo(index)"
            ></span>
            <span class="feedback_paggination_next" @click="next"> > </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show_details: false,
      currentIndex: 0,
    }
  },
  props: ['background', 'feedbacks'],
  computed: {
    normalizedFeedbacks() {
      return Array.isArray(this.feedbacks) ? this.feedbacks : []
    },
    currentFeedback() {
      if (!this.normalizedFeedbacks.length) {
        return {}
      }
      return this.normalizedFeedbacks[this.currentIndex] || this.normalizedFeedbacks[0]
    },
    hasVideo() {
      return !!(this.currentFeedback && this.currentFeedback.video)
    },
  },
  watch: {
    feedbacks() {
      if (this.currentIndex >= this.normalizedFeedbacks.length) {
        this.currentIndex = 0
      }
    },
  },
  methods: {
    resolveMediaUrl(path) {
      if (!path) {
        return ''
      }
      if (path.startsWith('http://') || path.startsWith('https://')) {
        return path
      }
      const base = (process.env.VUE_APP_API_BASE || '').replace(/\/+$/, '')
      if (!base) {
        return path
      }
      if (path.startsWith('/')) {
        return `${base}${path}`
      }
      return `${base}/${path}`
    },
    feedbackPhoto(item) {
      const photo = item && item.photo ? this.resolveMediaUrl(item.photo) : ''
      return photo || require('@/assets/img/_avatar180.jpg')
    },
    feedbackText(item) {
      const raw = String((item && item.description) || '').replace(/<\/?[^>]+(>|$)/g, '')
      if (!raw) {
        return ''
      }
      if (this.show_details) {
        return raw
      }
      return raw.length > 280 ? `${raw.slice(0, 280)}...` : raw
    },
    hasMoreText(item) {
      const raw = String((item && item.description) || '').replace(/<\/?[^>]+(>|$)/g, '')
      return raw.length > 280
    },
    toggleDetails() {
      this.show_details = !this.show_details
    },
    next() {
      if (!this.normalizedFeedbacks.length) {
        return
      }
      this.show_details = false
      this.currentIndex = (this.currentIndex + 1) % this.normalizedFeedbacks.length
    },
    prev() {
      if (!this.normalizedFeedbacks.length) {
        return
      }
      this.show_details = false
      this.currentIndex = (this.currentIndex - 1 + this.normalizedFeedbacks.length) % this.normalizedFeedbacks.length
    },
    goTo(index) {
      if (index < 0 || index >= this.normalizedFeedbacks.length) {
        return
      }
      this.show_details = false
      this.currentIndex = index
    },
    openVideo(item) {
      if (!item || !item.video) {
        return
      }
      window.open(item.video, '_blank', 'noopener')
    },
  },
}
</script>
