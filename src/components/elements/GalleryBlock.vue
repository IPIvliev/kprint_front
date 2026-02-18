<template>
  <div class="gallery">
    <div class="container">
      <div class="title">{{ title }}</div>

      <div v-if="showCategories && categoryButtons.length" class="gallery__categories">
        <button
          type="button"
          class="gallery__category-btn"
          :class="{ 'gallery__category-btn--active': activeCategorySlug === 'all' }"
          @click="activeCategorySlug = 'all'"
        >
          Все
        </button>
        <button
          v-for="category in categoryButtons"
          :key="`gallery-category-${category.id || category.slug}`"
          type="button"
          class="gallery__category-btn"
          :class="{ 'gallery__category-btn--active': activeCategorySlug === category.slug }"
          @click="activeCategorySlug = category.slug"
        >
          {{ category.title }}
        </button>
      </div>

      <div v-if="loading" class="gallery__state">Загрузка галереи...</div>
      <div v-else-if="error" class="gallery__state">{{ error }}</div>
      <div v-else-if="galleryItems.length" class="row gy-1">
        <div
          v-for="(item, index) in galleryItems"
          :key="itemKey(item, index)"
          :class="itemColumnClass(index)"
        >
          <button
            type="button"
            class="gallery__item"
            :class="itemSizeClass(index)"
            @click="openGallery(index)"
          >
            <img :src="resolvedItemUrl(item)" :alt="item.title || 'Галерея'">
            <div class="gallery__over">
              <div v-if="shouldShowContent(index, item)" class="gallery__content">
                <div v-if="item.title" class="gallery__title">{{ item.title }}</div>
                <div v-if="item.description" class="gallery__text">{{ item.description }}</div>
              </div>
              <div class="gallery__icon"></div>
            </div>
          </button>
        </div>
      </div>
      <div v-else class="gallery__state">Фотографии пока не добавлены.</div>
    </div>

    <div v-if="show_gallery && galleryItems.length" class="product_gallery_modal" @click.self="closeGallery">
      <div class="product_gallery_modal__content" @click.stop>
        <button class="product_gallery_modal__close" type="button" @click.stop="closeGallery">×</button>
        <div class="product_gallery_modal__main">
          <button type="button" class="product_gallery_modal__nav product_gallery_modal__nav--prev" @click="prevImage">‹</button>
          <img :src="currentModalImage" class="product_gallery_modal__image" :alt="currentModalAlt">
          <button type="button" class="product_gallery_modal__nav product_gallery_modal__nav--next" @click="nextImage">›</button>
        </div>
        <div class="product_gallery_modal__thumbs">
          <div
            v-for="(item, index) in galleryItems"
            :key="`modal-${item.id || index}`"
            class="product_gallery_modal__thumb"
            :class="{ active: index === modal_index }"
            @click="setModalIndex(index)"
          >
            <img :src="resolvedItemUrl(item)" :alt="item.title || 'Галерея'">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchGalleryCategories } from '@/services/gallery.service'

const LAYOUT_PATTERN = [
  { col: 'col-lg-6', item: 'gallery__item--big', content: true },
  { col: 'col-lg-3', item: 'gallery__item--mini', content: false },
  { col: 'col-lg-3', item: 'gallery__item--mini', content: false },
  { col: 'col-lg-6', item: 'gallery__item--small', content: true },
  { col: 'col-lg-3', item: 'gallery__item--small', content: false },
  { col: 'col-lg-3', item: 'gallery__item--small', content: false }
]

export default {
  name: 'GalleryBlock',
  props: {
    title: {
      type: String,
      default: 'Галерея'
    },
    pageKey: {
      type: String,
      default: ''
    },
    showCategories: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      categories: [],
      loading: false,
      error: '',
      activeCategorySlug: 'all',
      show_gallery: false,
      modal_index: 0
    }
  },
  computed: {
    categoryButtons () {
      return this.categories.filter((category) => {
        const items = Array.isArray(category.items) ? category.items : []
        return items.length > 0
      })
    },
    visibleCategories () {
      if (!this.showCategories || this.activeCategorySlug === 'all') {
        return this.categoryButtons
      }
      return this.categoryButtons.filter(
        (category) => String(category.slug || '') === this.activeCategorySlug
      )
    },
    galleryItems () {
      const items = []
      this.visibleCategories.forEach((category) => {
        const categoryItems = Array.isArray(category.items) ? category.items : []
        categoryItems.forEach((item) => {
          const imageUrl = this.resolveMediaUrl(item && item.image_url)
          if (!imageUrl) {
            return
          }
          items.push({
            ...(item || {}),
            category_title: category.title,
            _resolvedImageUrl: imageUrl
          })
        })
      })
      return items
    },
    currentModalImage () {
      if (!this.galleryItems.length) {
        return ''
      }
      const item = this.galleryItems[this.modal_index] || this.galleryItems[0]
      return this.resolvedItemUrl(item)
    },
    currentModalAlt () {
      if (!this.galleryItems.length) {
        return 'Галерея'
      }
      const item = this.galleryItems[this.modal_index] || this.galleryItems[0]
      return item && item.title ? item.title : 'Галерея'
    }
  },
  watch: {
    pageKey () {
      this.loadGallery()
    },
    galleryItems () {
      if (!this.galleryItems.length) {
        this.closeGallery()
        this.modal_index = 0
        return
      }
      if (this.modal_index >= this.galleryItems.length) {
        this.modal_index = 0
      }
    }
  },
  mounted () {
    this.loadGallery()
  },
  methods: {
    async loadGallery () {
      this.loading = true
      this.error = ''
      try {
        const params = {}
        if (this.pageKey) {
          params.page = this.pageKey
        }
        const response = await fetchGalleryCategories(params)
        this.categories = Array.isArray(response.data) ? response.data : []
        this.activeCategorySlug = 'all'
      } catch (err) {
        this.categories = []
        this.error = err.userMessage || 'Не удалось загрузить галерею'
      } finally {
        this.loading = false
      }
    },
    layoutAt (index) {
      return LAYOUT_PATTERN[index % LAYOUT_PATTERN.length]
    },
    itemColumnClass (index) {
      const layout = this.layoutAt(index)
      return ['col-12', layout.col]
    },
    itemSizeClass (index) {
      return this.layoutAt(index).item
    },
    shouldShowContent (index, item) {
      return Boolean(this.layoutAt(index).content && (item.title || item.description))
    },
    itemKey (item, index) {
      return `gallery-item-${item.id || 'x'}-${index}`
    },
    resolvedItemUrl (item) {
      return String((item && item._resolvedImageUrl) || '')
    },
    resolveMediaUrl (path) {
      const value = String(path || '').trim()
      if (!value) {
        return ''
      }
      if (value.startsWith('http://') || value.startsWith('https://')) {
        return value
      }
      const base = String(process.env.VUE_APP_API_BASE || '').replace(/\/+$/, '')
      if (!base) {
        return value
      }
      if (value.startsWith('/')) {
        return `${base}${value}`
      }
      return `${base}/${value}`
    },
    openGallery (index) {
      if (!this.galleryItems.length) {
        return
      }
      this.modal_index = Number(index) >= 0 ? Number(index) : 0
      this.show_gallery = true
    },
    closeGallery () {
      this.show_gallery = false
    },
    nextImage () {
      if (!this.galleryItems.length) {
        return
      }
      this.modal_index = (this.modal_index + 1) % this.galleryItems.length
    },
    prevImage () {
      if (!this.galleryItems.length) {
        return
      }
      this.modal_index = (this.modal_index - 1 + this.galleryItems.length) % this.galleryItems.length
    },
    setModalIndex (index) {
      if (index < 0 || index >= this.galleryItems.length) {
        return
      }
      this.modal_index = index
    }
  }
}
</script>

<style scoped>
.gallery__item {
  border: none;
  padding: 0;
  width: 100%;
  border-radius: 20px;
}

.gallery__item img {
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  object-fit: cover;
  border-radius: 20px;
}

.gallery__categories {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: -36px 0 32px;
}

.gallery__category-btn {
  border: 1px solid #d0d5dd;
  background: #f2f4f7;
  color: #344054;
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 14px;
  line-height: 1.2;
}

.gallery__category-btn--active {
  border-color: #d83a56;
  background: #d83a56;
  color: #fff;
}

.gallery__state {
  font-size: 16px;
  line-height: 1.5;
  color: #7a7b7b;
}

.product_gallery_modal {
  position: fixed;
  inset: 0;
  background: rgba(9, 10, 12, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 24px;
}

.product_gallery_modal__content {
  background: #fff;
  border-radius: 20px;
  max-width: 980px;
  width: 100%;
  padding: 24px;
  position: relative;
}

.product_gallery_modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #f2f2f2;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
}

.product_gallery_modal__main {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product_gallery_modal__image {
  max-width: 100%;
  max-height: 70vh;
  border-radius: 16px;
  object-fit: contain;
}

.product_gallery_modal__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: #f2f2f2;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  z-index: 2;
}

.product_gallery_modal__nav--prev {
  left: 12px;
}

.product_gallery_modal__nav--next {
  right: 12px;
}

.product_gallery_modal__thumbs {
  display: flex;
  gap: 10px;
  margin-top: 16px;
  overflow-x: auto;
  padding-bottom: 6px;
}

.product_gallery_modal__thumb {
  width: 72px;
  height: 72px;
  border-radius: 12px;
  border: 2px solid transparent;
  cursor: pointer;
  overflow: hidden;
  flex: 0 0 auto;
}

.product_gallery_modal__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product_gallery_modal__thumb.active {
  border-color: #d83a56;
}
</style>
