<template>
    <div class="white_block" :class="background">
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

<style scoped>
.price_cards {
  width: 100%;
  margin-top: 50px;
  
  text-align: center;
}

.price_card {
  display: inline-block;
  vertical-align: top;
  width: 300px;
  height: 400px;
  background-color: var(--fillsprimary);
  border-radius: 24px;
  margin: 30px 20px 10px 20px;
  position: relative;
  padding: 0 20px;
}

.price_card_name {
  margin: 10px 0;
}

.price_card_short_description {
  color: #717272;
  margin: 10px 0;
  font-size: 0.8em;
}

.price_card_hr {
  color:var(--bs-gray-dark);
  width: 80%;
  margin: auto;
}

.price_card_description {
  margin: 10px 0;
  font-size: 0.9em;
  text-align:left;
}

ul {
  list-style: square url('@/assets/img/red_li.svg') inside;
  /* list-style-type: hiragana-iroha; */
}


.price_card_footer {
  margin: 20px 0;
  width:100%;
  position: absolute;
  bottom: 0px;
}

.price_card_footer_price {
  font-size: 1.5em;
  font-weight: 800;
  position: absolute;
  left: 20px;
  bottom: 3px;
}

.price_card_footer_button {
  position: absolute;
  right: 20px;
  bottom: 0px;
}
</style>