<template>
    <div class="page">
        <header-block />

        <div class="content">
            <!-- news-->
            <div class="news">
                <div class="container">
                    <h1 class="title">Каталог продукции</h1>
                    {{ this.$route.params.id }}
                    <div class="row gy-1">
                        <CategoryCard :categories="FilterCategories"/>
                    </div>
                </div>
            </div>
            <!--  /news-->
            <!-- callback-->
            <callback-window />
            <!--  /callback-->
            <WhiteWelcome/>
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
    FilterCategories () {
      if (this.$route.params.id) {
        console.log('router id present')
        return this.$store.state.catalog.categories.filter(category => category.parent === parseInt(this.$route.params.id))
      } else {
        console.log('No router id')
        return this.$store.state.catalog.categories.filter(category => category.level === 0)
      }
    }

  },
  created () {
    this.$store.dispatch('catalog/fetchCategories')
  },
  mounted () {

  }

}
</script>

<style src="@/assets/css/routes/shop.css"></style>
