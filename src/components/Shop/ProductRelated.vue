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
  data () {
    return {
      id: this.$route.params.id
    }
  },
  created () {
    this.$store.dispatch('catalog/fetchCategoryProducts', this.id)
  },
  computed: {
    GetCategoryProducts () {
      const currentProductId = Number(this.$route.params.productid)
      return this.$store.state.catalog.products.filter((product) => product.id !== currentProductId)
    }
  }
}
</script>
