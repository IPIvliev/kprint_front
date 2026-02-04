<template>
  <div class="page cmp-views-shop-productpage">
        <header-block />
        <div class="content">
            <div class="white_block gray_background" style="padding-bottom: 10px; padding-top: 10px;">
                <div class="container">
                  <div class="bread">
                    <router-link to="/">Главная</router-link>
                    <span class="arrow">></span>
                    <router-link to="/shop">Магазин</router-link>
                    <span class="arrow">></span>
                    <router-link :to="{path: '/shop/categories/' + GetProduct.category + '/showcase'}">{{ GetProduct.category_title }}</router-link>
                  </div>
                  <h1 class="title">{{ GetProduct.name }}</h1>
                  <!-- <p class="news__text">Покупайте 3Д принтеры, расходные материалы для 3D печати и прочее оборудование в области аддитивных технологий.</p> -->
                </div>
            </div>
            <ProductDescription :background="'gray_background'" :product = "GetProduct" />
            <ProductVideos :background="'light_gray_background'" :product = "GetProduct" />
            <ProductFeedbacks :background="'gray_background'" :product = "GetProduct" />
            <ProductRelated :background="'gray_background'" class="d-xl-block d-none" />

            <WhiteWelcome/>
        </div>

        <footer-block />
    </div>
</template>

<script>

import HeaderBlock from '@/components/HeaderBlock.vue'
import ProductDescription from "@/components/Shop/ProductDescription.vue"
import ProductVideos from "@/components/Shop/ProductVideos.vue"
import ProductFeedbacks from "@/components/Shop/ProductFeedbacks.vue"
import ProductRelated from "@/components/Shop/ProductRelated.vue"
import WhiteWelcome from "@/components/elements/WhiteWelcome.vue"
import FooterBlock from '@/components/FooterBlock.vue'

export default {
    components: { HeaderBlock, ProductDescription, ProductVideos, ProductFeedbacks, ProductRelated, WhiteWelcome, FooterBlock },
    data() {
        return {
          id: this.$route.params.productid,
        }
      },
      created() {
        this.$store.dispatch("catalog/fetchProduct", this.id);
      },
      computed: {
        GetProduct() {
          return this.$store.state.catalog.product
        },
      },
      watch: {
        '$route.params.productid': {
          immediate: true,
          handler(id) {
            this.$store.dispatch("catalog/fetchProduct", id);
          },
        },
      },

}

</script>

