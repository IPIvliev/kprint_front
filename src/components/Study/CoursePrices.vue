<template>
  <div class="white_block cmp-components-study-courseprices" :class="background">
      <div class="container">
        <div class="row gy-1">
          <div class="col-lg-12">
            <h2 class="title">Стоимость обучения</h2>
            <div class="price_cards">
              <div class="price_card" v-for="price in prices" :key="price.id">
                    <h3 class="price_card_name">{{ price.name }}</h3>
                    <p class="price_card_short_description">{{ price.short_description }}</p>
                    <hr class="price_card_hr">
                    <p class="price_card_description" v-html="price.description"></p>
                    <div class="price_card_footer">
                      <span class="price_card_footer_price">{{ Change(price.price) }}</span>
                      <button class="btn btn--red btn--small price_card_footer_button" @click="addCourseToCart(price)">Купить</button>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade show" v-if="showAddedModal" style="display: block;" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal__title">Поздравляем!</div>
            <div class="modal__text">Курс добавлен в корзину для оплаты</div>
            <div class="row gy-1" style="padding: 20px;">
              <div class="col-6">
                <button class="btn btn--red col-12" @click="goToCart">Перейти в корзину</button>
              </div>
              <div class="col-6">
                <button class="btn btn--white col-12" @click="closeModal">Закрыть</button>
              </div>
            </div>
            <div class="modal_close" @click="closeModal"></div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show" v-if="showAddedModal"></div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      show_details: null,
      showAddedModal: false
    }
  },
  props: ['background', 'prices', 'course'],
  methods: {
    Change (number) {
      number = Math.trunc(number)
      return number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' руб.'
    },
    addCourseToCart (price) {
      if (!this.course || !price) {
        return
      }
      this.$store.dispatch('shop/AddCourseToCart', {
        course_id: this.course.id,
        course_name: this.course.name,
        price_id: price.id,
        price_name: price.name,
        price: price.price,
        quantity: 1
      })
      this.showAddedModal = true
    },
    closeModal () {
      this.showAddedModal = false
    },
    goToCart () {
      this.showAddedModal = false
      this.$router.push('/shop/cart')
    }
  }
}
</script>
