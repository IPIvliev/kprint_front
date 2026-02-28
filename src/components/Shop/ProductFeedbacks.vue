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
                          v-for="(review, index) in normalizedReviews"
                          :key="review.id || `review-${index}`"
                          class="product_review_card"
                        >
                            <header class="product_review_head">
                                <span class="product_review_tag">Отзыв</span>
                                <strong class="product_review_author">{{ review.author_name || 'Покупатель' }}</strong>
                            </header>
                            <div class="product_review_body" :class="{ 'product_review_body--with-photo': review.photo_url }">
                              <img
                                v-if="review.photo_url"
                                :src="review.photo_url"
                                alt="Фото отзыва"
                                class="product_review_photo"
                              >
                              <div v-if="review.text" class="product_review_text" v-html="review.text"></div>
                            </div>
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
    },
    normalizedReviews () {
      return this.reviews.map((review) => ({
        ...review,
        photo_url: this.resolveMediaUrl(review?.photo)
      }))
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
<style scoped>
.product_reviews_list {
  margin-top: 12px;
  display: grid;
  gap: 16px;
}

.product_review_card {
  border: 1px solid #e1e6f0;
  border-radius: 16px;
  padding: 18px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafd 100%);
  box-shadow: 0 8px 24px rgba(18, 34, 66, 0.08);
}

.product_review_head {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 12px;
}

.product_review_tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  border-radius: 999px;
  background: #edf2fb;
  color: #3d4a67;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.product_review_author {
  font-size: 17px;
  line-height: 1.3;
  color: #1f273d;
}

.product_review_body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.product_review_body--with-photo {
  grid-template-columns: 220px minmax(0, 1fr);
  align-items: start;
}

.product_review_photo {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #e2e7f1;
  background: #fff;
}

.product_review_text {
  color: #3f4c69;
  font-size: 15px;
  line-height: 1.6;
  word-break: break-word;
}

.product_review_text :deep(p) {
  margin: 0 0 10px;
}

.product_review_text :deep(p:last-child) {
  margin-bottom: 0;
}

.product_review_text :deep(ul),
.product_review_text :deep(ol) {
  margin: 0 0 10px;
  padding-left: 20px;
}

@media (max-width: 767px) {
  .product_review_card {
    padding: 14px;
  }

  .product_review_body--with-photo {
    grid-template-columns: 1fr;
  }
}
</style>
