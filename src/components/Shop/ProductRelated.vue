<template>
    <!-- video-->
    <div class="white_block" :class="background" v-if="GetCategoryProducts != ''">
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
    <!--	/video-->
</template>
<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import SwiperClass, { Pagination } from 'swiper'
  import ProductCard from "@/components/elements/Shop/Showcase/ProductCard.vue"

  import 'swiper/css'
  import 'swiper/css/pagination'

export default {
  props: ['background', 'related'],
  components: {Swiper, SwiperSlide, ProductCard},
  data() {
    return {
      id: this.$route.params.id,
    }
  },
  created() {
    this.$store.dispatch("fetchCategoryProducts", this.id);
  },
  computed: {
    GetCategoryProducts() {
      return this.$store.state.products.filter((product) => product.id != this.$route.params.productid);
    },
  }
}
</script>
<style scoped>
a:active, /* активная/посещенная ссылка */
a:hover,  /* при наведении */
a {
  text-decoration: none;
  color: #000;
}

.cource {
  padding: 20px;
  /* height: 100px; */
  margin: 50px 0px;

  background-color: #fff;
  border-radius: 40px;
  border: 1px solid;
  border-color: #ffffff;
  box-shadow: 0px 8px 12px #dde2e533, -10px 34px 34px #0000000f;
  backdrop-filter: blur(8px) brightness(100%);
  -webkit-backdrop-filter: blur(8px) brightness(100%); 
}

.course_photo {
  border-radius: 40px;
  object-fit: cover;
  object-position: 50% 50%;
}

.period {
  color: #1D6E2F;
  font-weight: 800;
  padding: 10px;
  background-color: #EFF8F0;
  border-radius: 20px;
  /* border: 1px solid; */
  /* border-color: #ffffff; */
  /* box-shadow: 0px 8px 12px #dde2e533, -10px 34px 34px #0000000f; */
  /* backdrop-filter: blur(8px) brightness(100%); */
  /* -webkit-backdrop-filter: blur(8px) brightness(100%);  */
}

.icon-ellipse {
  width: 10px;
  margin: 0 10px;
}

.cource_footer {
  margin-top: 30px;
}
</style>