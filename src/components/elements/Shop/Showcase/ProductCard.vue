<template>
  <router-link :to="{path: '/shop/categories/' + product.category + '/' + product.id }" class="cmp-components-elements-shop-showcase-productcard">
      <div class="item-card-shop">
        <div class="div-shop-item">
          <div class="img-shop-item"><img class="img-2-shop-item" :src="product.photo" height="262"/></div>
          <div class="div-shop-item">
            <div class="rating-stock-m-shop-item">
              <div class="rating-shop-item">
                <img class="icons-small-shop-item" src="@/assets/img/icon_Star.svg" />
                <img class="icons-small-shop-item" src="@/assets/img/icon_Star.svg" />
                <img class="icons-small-shop-item" src="@/assets/img/icon_Star.svg" />
                <img class="icons-small-shop-item" src="@/assets/img/icon_Star.svg" />
                <img class="icons-small-shop-item" src="@/assets/img/icon_Star.svg" />
              </div>
              <div class="stock-shop-item">
                <ProductStock :stock="product.stock" />
              </div>
            </div>
            <div class="item-shop-item">
              <div class="description-shop-item">Специальные смолы</div>
              <p class="text-wrapper-shop-item">
                {{ product.name }}
              </p>
            </div>
          </div>
        </div>
        <div class="footer-shop-item">
          <div class="price-shop-item">
            <!-- <div class="before-shop-item">
              <div class="overlap-group-shop-item">
                <div class="before-2-shop-item">3 000 ₽</div>
                <div class="rectangle-shop-item"></div>
              </div>
            </div> -->
            <div class="now-shop-item">{{ getPrice(product.price) }} ₽</div>
          </div>
          <div class="buttons-shop-item">
            <div class="item-card-button-m-shop-item"><img class="icons-medium-shop-item" src="@/assets/img/medium.svg" /></div>
            <div class="item-card-button-m-2-shop-item">
              <img class="icons-small-2-shop-item" src="@/assets/img/small-5.svg" />
              <div class="text-wrapper-2-shop-item">В корзину</div>
            </div>
          </div>
        </div>
      </div>
    </router-link>

</template>

<script>
import ProductStock from '@/components/elements/Shop/ProductStock.vue'

export default {
  props: ['product'],
  components: { ProductStock },
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {
    getPrice (price) {
      price = String(price).split('.')
      price = price[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      return price
    }
  }
}
</script>
