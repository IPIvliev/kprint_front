<template>
    <!-- video-->
    <div class="white_block" :class="background" v-if="GetCategoryProducts.length">
      <div class="container">
        <h1 class="title">Похожие товары</h1>
      </div>
      <div class="container">
        <div class="row">
          <swiper
            :spaceBetween="30"
            :slidesPerView="4"
            :freeMode="true"

            class="mySwiper"
          >
            <swiper-slide v-for="product in GetCategoryProducts" :key="product.id">
              <ProductCard :product="product"/>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
    <!--  /video-->
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import ProductCard from '@/components/elements/Shop/Showcase/ProductCard.vue'

import 'swiper/css'
import 'swiper/css/pagination'

export default {
  props: ['background', 'related'],
  components: { Swiper, SwiperSlide, ProductCard },
  created () {
    this.$store.dispatch('catalog/fetchCategoryProducts', this.$route.params.categorySlug)
  },
  computed: {
    GetCategoryProducts () {
      const routeLookup = String(this.$route.params.productSlug || '').trim()
      return this.$store.state.catalog.products.filter((product) => {
        const productLookup = String(product.slug || product.id || '').trim()
        return productLookup !== routeLookup
      })
    }
  }
}
</script>
