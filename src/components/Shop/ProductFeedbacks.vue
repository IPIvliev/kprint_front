<template>
    <div v-if="reviews.length" class="white_block" :class="background">
        <div class="container">
            <div class="row gy-1">
                <div class="col-12">
                    <h3 class="product_section_title">Отзывы о товаре</h3>
                </div>
                <div class="col-12">
                    <div class="product_reviews_list">
                        <article
                          v-for="review in reviews"
                          :key="review.id || `${review.author_name}-${review.source_url}`"
                          class="product_review_card"
                        >
                            <div class="product_review_head">
                                <strong>{{ review.author_name || 'Покупатель' }}</strong>
                                <a
                                  v-if="review.source_url"
                                  :href="review.source_url"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Источник
                                </a>
                            </div>
                            <img
                              v-if="resolveMediaUrl(review.photo)"
                              :src="resolveMediaUrl(review.photo)"
                              alt="Фото отзыва"
                              class="product_review_photo"
                            >
                            <div v-if="review.text" class="product_review_text" v-html="review.text"></div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ['background', 'product'],
  computed: {
    reviews () {
      return Array.isArray(this.product?.product_reviews) ? this.product.product_reviews : []
    }
  },
  methods: {
    resolveMediaUrl (path) {
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
    }
  }
}
</script>
