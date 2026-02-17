<template>
  <div class="page">
    <HeaderBlock/>

    <div class="content">
      <WhiteWelcome/>
      <MainPageAbout/>
      <MainPageShop :background="'light_gray_background'"/>
      <MainPageVideo/>
      <UsageBlock/>
      <MainPageNews/>

      <!-- callback-->
      <CallbackWindow />
      <!--  /callback-->
    </div>

    <FooterBlock/>
  </div>
</template>

<script>
import HeaderBlock from '../components/HeaderBlock.vue'
import WhiteWelcome from '../components/elements/WhiteWelcome.vue'
import MainPageAbout from '../components/elements/MainPage/MainPageAbout.vue'
import MainPageShop from '../components/elements/MainPage/MainPageShop.vue'
import MainPageVideo from '../components/elements/MainPage/MainPageVideo.vue'
import UsageBlock from '../components/elements/UsageBlock.vue'
import MainPageNews from '../components/elements/MainPage/MainPageNews.vue'
import CallbackWindow from '../components/elements/CallbackWindow.vue'
import FooterBlock from '../components/FooterBlock.vue'

export default {
  name: 'MainPage',
  components: { HeaderBlock, FooterBlock, MainPageNews, MainPageAbout, MainPageVideo, UsageBlock, CallbackWindow, WhiteWelcome, MainPageShop },
  props: {
    msg: String
  },
  created () {
    this.$store.dispatch('catalog/fetchProducts')
    this.$store.dispatch('study/fetchCourses')
  },
  computed: {
    ProductsList () {
      // const bodyParameters = {
      //     key: "value"
      // }
      return this.$store.state.catalog.products
    }
  }
}
</script>
