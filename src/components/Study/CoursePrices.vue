<template>
  <div class="white_block cmp-components-study-courseprices" :class="background">
      <div class="container"> 
        <div class="row gy-1">
          <div class="col-lg-12">
            <h2 class="title">Варианты обучения</h2>
            <div class="price_cards">
              <div class="price_card" v-for="(price, index) in prices" :key="price.id">
                    <h3 class="price_card_name">{{ price.name }}</h3>
                    <p class="price_card_short_description">{{ price.short_description }}</p>
                    <hr class="price_card_hr">
                    <p class="price_card_description" v-html="price.description"></p>
                    <div class="price_card_footer">
                      <span class="price_card_footer_price">{{ Change(price.price) }}</span>
                      <button class="btn btn--red btn--small price_card_footer_button">Записаться</button>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      show_details: null,
    }
  },
  props: ['background', 'prices'],
  methods: {
    Change(number) {
      number = Math.trunc(number)
      return number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' ₽'
    }
  }
}
</script>

