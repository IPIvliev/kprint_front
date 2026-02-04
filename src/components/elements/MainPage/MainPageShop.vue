<template>
  <div class="white_block cmp-components-elements-main-page-mainpageshop" :class="background">
      <div class="container"> 
        <h2 class="title">Купить фотополимерные материалы <br />и оборудование для 3Д-печати</h2>
      

        <div class="row gy-1 shop">
          <div class="col-xl-3 col-lg-4 col-md-6" v-for="product in ProductsList" :key="product.id" >
            <ProductCard :product="product" />
          </div>


        </div>
        <div class="row">
          <div class="button-center">
            <div class="button-l-shop"><div class="lable-shop">Посмотреть весь каталог</div></div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import ProductCard from "@/components/elements/Shop/Showcase/ProductCard.vue"

export default {
  props: ['background'],
  components: {ProductCard},
  created() {
        this.$store.dispatch("catalog/fetchProducts");
    },
  computed: {
    ProductsList () {
      return this.$store.state.catalog.products
    },  
  }  
}
</script>
