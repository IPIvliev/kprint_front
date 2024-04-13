<template>
  <div class="page">
    <HeaderBlock/>

    <div class="content">
      <WhiteWelcome/>
      <MainPageShop :background="'light_gray_background'"/>
      <MainPageVideo/>
      <UsageBlock/>
      <MainPageNews/>



      <!-- callback-->
      <CallbackWindow />
      <!--	/callback-->
    </div>
    <!-- modal bootstrap-->
    <div class="modal fade" id="modalCallback">
      <div class="modal-dialog modal-dialog-centered">
        <form class="modal-content" action="#">
          <div class="modal__title">Обратный звонок</div>
          <div class="modal__text">Укажите ваш номер и наш менеджер свяжется с вами для консультации</div>
          <div class="input input--label">
            <input type="text" name="tel">
            <div class="input__label">Ваш номер</div>
          </div>
          <button class="btn btn--red btn--big" type="submit">Отправить заявку</button>
          <div class="modal_close" data-bs-dismiss="modal"></div>
        </form>
      </div>
    </div>
    <!-- /modal bootstrap-->

    <FooterBlock/>
  </div>
</template>

<script>
import HeaderBlock from "../components/HeaderBlock.vue"
import WhiteWelcome from "../components/elements/WhiteWelcome.vue"
import MainPageShop from "../components/elements/MainPage/MainPageShop.vue"
import MainPageVideo from "../components/elements/MainPage/MainPageVideo.vue"
import UsageBlock from "../components/elements/UsageBlock.vue"
import MainPageNews from "../components/elements/MainPage/MainPageNews.vue"
import CallbackWindow from "../components/elements/CallbackWindow.vue"
import FooterBlock from "../components/FooterBlock.vue"

export default {
  name: 'MainPage',
  components: {HeaderBlock, FooterBlock, MainPageNews, MainPageVideo, UsageBlock, CallbackWindow, WhiteWelcome, MainPageShop },
  props: {
    msg: String
  },
  created() {
        this.$store.dispatch("fetchProducts");
        this.$store.dispatch("fetchCourses");
    },
    computed: {
        ProductsList () {
            // const bodyParameters = {
            //     key: "value"
            // }
            return this.$store.state.products
        },  
    }  
}
</script>
