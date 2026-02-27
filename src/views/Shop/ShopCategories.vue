<template>
  <div class="page">
    <header-block />

    <div class="content">
      <div class="news">
        <div class="container">
          <h1 class="title">Каталог продукции</h1>
          <div class="row gy-1">
            <CategoryCard :categories="FilterCategories" />
          </div>
        </div>
      </div>
      <callback-window />
      <WhiteWelcome />
    </div>

    <footer-block />
  </div>
</template>

<script>
import HeaderBlock from '../../components/HeaderBlock.vue'
import FooterBlock from '../../components/FooterBlock.vue'
import CategoryCard from '@/components/elements/Shop/ShopCategory/CategoryCard.vue'

export default {
  data () {
    return {
      categories: []
    }
  },
  components: {
    FooterBlock,
    HeaderBlock,
    CategoryCard
  },
  computed: {
    currentCategory () {
      const lookup = String(this.$route.params.categorySlug || '').trim()
      if (!lookup) {
        return null
      }
      return this.$store.state.catalog.categories.find((category) => {
        return String(category.slug || '').trim() === lookup || String(category.id) === lookup
      }) || null
    },
    FilterCategories () {
      if (this.currentCategory) {
        return this.$store.state.catalog.categories.filter(category => category.parent === this.currentCategory.id)
      }
      return this.$store.state.catalog.categories.filter(category => category.level === 0)
    }
  },
  created () {
    this.$store.dispatch('catalog/fetchCategories')
  }
}
</script>

<style src="@/assets/css/routes/shop.css"></style>
