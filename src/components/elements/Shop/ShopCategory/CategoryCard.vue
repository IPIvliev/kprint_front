<template>
  <div
    v-for="category in categories"
    :key="category.id"
    class="col-12 col-sm-6 col-lg-4 cmp-components-elements-shop-shop-category-categorycard"
  >
    <router-link :to="{ path: categoryPath(category) }" class="category_card_link">
      <article class="category_card">
        <img
          :src="resolveMediaUrl(category.photo)"
          class="category_card_img"
          :alt="category.title || 'Категория'"
          loading="lazy"
        >

        <div class="category_card_overlay"></div>
        <div class="category_card_content">
          <span class="category_card_badge">Категория</span>
          <h2 class="category_card_footer_title">{{ category.title }}</h2>
          <span class="category_card_action">
            Смотреть товары
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.75 9H14.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.75 4.5L14.25 9L9.75 13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
      </article>
    </router-link>
  </div>
</template>
<script>
export default {
  props: ['categories'],
  methods: {
    categoryPath (category) {
      const lookup = category?.slug || category?.id
      if (category?.level === 1) {
        return `/shop/categories/${lookup}/showcase`
      }
      return `/shop/categories/${lookup}`
    },
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
