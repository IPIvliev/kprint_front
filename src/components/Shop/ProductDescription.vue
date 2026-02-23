<template>
  <div class="white_block cmp-components-shop-productdescription" :class="background">
        <div class="container">
            <div class="row gy-1">

                <div class="col-xl-4 col-sm-12">
                    <img :src="current_image" class="product_photo" width="420" height="420" @click="openGallery">
                    <div class="product_pictures_row">
                        <div
                          v-for="image in GetPhotos"
                          :key="image.src"
                          class="product_picture_item"
                          @mouseover="current_image = image.src"
                        >
                          <img :src="image.src" class="product_pictures" width="84" height="84">
                        </div>
                    </div>
                </div>
                <div class="col-xl-7 col-sm-12 product_description">
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

                    <p>Фотополимер "Реактив" предназначен для печати на 3d-принтерах, работающих по технологии LCD.
                        В жидком виде материал имеет низкую вязкость. и высокую скорость печати.
                    </p>
                    <div class="row product_characteristics">
                        <div class="col-xl-6 col-sm-12" v-for="filter in product.product_attrs_values" :key="`main-${filter.id || filter.filter_attr}`">
                            <span class="product_characteristic_name">{{ filter.filter_attr }}: </span>
                            <span class="product_characteristic_value">{{ filter.value }}</span>
                            <hr>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-6 col-sm-12">
                            <div class="row">
                                <div class="col-4">
                                    <div class="product_price">{{ getPrice(product.price) }} ₽</div>
                                </div>
                                <div class="col-4 middle-element">
                                    <ProductAmount :product="product"/>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn--red" :disabled="!productIsInStock(product)" @click="addProductToCart">
                                        <img class="basket_product" src="@/assets/img/small-5.svg" />
                                        <div class="text_btn_product">В корзину</div>
                                    </button>
                                </div>
                            </div>
                            <div v-if="hasMarketplaceLinks" class="product_marketplaces">
                                <a
                                  v-if="hasOzonUrl"
                                  :href="ozonProductUrl"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  class="btn product_marketplace_btn product_marketplace_btn--ozon"
                                >
                                  Купить на OZON
                                </a>
                                <a
                                  v-if="hasWbUrl"
                                  :href="wbProductUrl"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  class="btn product_marketplace_btn product_marketplace_btn--wb"
                                >
                                  Купить на WB
                                </a>
                            </div>
                        </div>
                        <div class="col-6"></div>
                    </div>
                </div>
            </div>
            <div class="row gy-1">
                <div class="col-12">
                    <div class="product_about">
                        <div class="row">
                            <div class="col-xl-6 col-sm-12">
                                <h4 class="product_about_title">Характеристики</h4>
                                <p>На принтерах Anycubic Photon на слой в 50 мкм рекомендуется выставлять время полимеризации от 10 секунд. На принтерах Anycubic Photon S время экспозиции можно уменьшить до 6.
                                </p><p>"Reactive" является, на сегодняшний день, самой быстрой смолой из линейки полимеров Gorky Liquid. Фотополимер отличается великолепной детализацией как по оси Z, так и по X/Y. Это позволяет печатать сложные, мелкие детали. Полимер будет незаменим, как при изготовлении функциональных деталей, так и при печати детализированных фигурок для настольных игр - везде, где требуется чёткость и максимальное качество.
                                </p><p>Смола упакована в металлическую тару. Банка со смолой помещается в специальный ложемент и картонную коробку для минимализации рисков повреждения при транспортировке. Первоначально будет доступна тара в 1 кг.</p>

                            </div>
                            <div class="col-xl-6 col-sm-12">
                                <div class="row product_characteristics">
                                    <div class="col-12" v-for="filter in product.product_attrs_values" :key="`details-${filter.id || filter.filter_attr}`">
                                        <span class="product_characteristic_name">{{ filter.filter_attr }}: </span>
                                        <span class="product_characteristic_value">{{ filter.value }}</span>
                                        <hr>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        <div v-if="show_gallery" class="product_gallery_modal" @click.self="closeGallery">
            <div class="product_gallery_modal__content" @click.stop>
                <button class="product_gallery_modal__close" type="button" @click.stop="closeGallery">×</button>
                <div class="product_gallery_modal__main">
                    <button type="button" class="product_gallery_modal__nav product_gallery_modal__nav--prev" @click="prevImage">‹</button>
                    <img :src="currentModalImage" class="product_gallery_modal__image" alt="">
                    <button type="button" class="product_gallery_modal__nav product_gallery_modal__nav--next" @click="nextImage">›</button>
                </div>
                <div class="product_gallery_modal__thumbs">
                    <div
                      v-for="(image, index) in GetPhotos"
                      :key="`modal-${image.src}`"
                      class="product_gallery_modal__thumb"
                      :class="{ active: index === modal_index }"
                      @click="setModalIndex(index)"
                    >
                      <img :src="image.src" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ProductStock from '@/components/elements/Shop/ProductStock.vue'
import ProductAmount from '@/components/elements/Shop/ProductAmount.vue'
import { promptAuthForCart } from '@/services/cart-auth.service'

export default {
  props: ['background', 'product'],
  components: { ProductStock, ProductAmount },
  data () {
    return {
      current_image: '',
      show_gallery: false,
      modal_index: 0
    }
  },
  beforeCreate () {
    this.$store.commit('shop/initialiseCart')
  },
  computed: {
    GetPhotos () {
      const photos = []
      if (this.product && this.product.photo) {
        photos.push({ src: this.resolveMediaUrl(this.product.photo) })
      }
      if (this.product && Array.isArray(this.product.product_images)) {
        this.product.product_images.forEach((photo) => {
          if (photo && photo.src) {
            photos.push({ src: this.resolveMediaUrl(photo.src) })
          }
        })
      }
      return photos
    },
    currentModalImage () {
      if (!this.GetPhotos.length) {
        return ''
      }
      const item = this.GetPhotos[this.modal_index] || this.GetPhotos[0]
      return item ? item.src : ''
    },
    ozonProductUrl () {
      return this.getMarketplaceUrl(this.product && this.product.ozon_url)
    },
    wbProductUrl () {
      return this.getMarketplaceUrl(this.product && this.product.wb_url)
    },
    hasOzonUrl () {
      return Boolean(this.ozonProductUrl)
    },
    hasWbUrl () {
      return Boolean(this.wbProductUrl)
    },
    hasMarketplaceLinks () {
      return this.hasOzonUrl || this.hasWbUrl
    },
    getCart () {
      console.log('localStorage ', localStorage.getItem('cart'))
      // return localStorage.getItem('cart')
      return this.$store.state.shop.cart
    },
    productIsInStock () {
      return this.$store.getters['shop/productIsInStock']
    }
  },
  watch: {
    product: {
      immediate: true,
      handler () {
        if (this.GetPhotos.length) {
          this.current_image = this.GetPhotos[0].src
          this.modal_index = 0
        } else {
          this.current_image = ''
          this.modal_index = 0
        }
      }
    }
  },
  methods: {
    resolveMediaUrl (path) {
      if (!path) {
        return ''
      }
      if (path.startsWith('http://') || path.startsWith('https://')) {
        return path
      }
      const base = (process.env.VUE_APP_API_BASE || '').replace(/\/+$/, '')
      if (!base) {
        return path
      }
      if (path.startsWith('/')) {
        return `${base}${path}`
      }
      return `${base}/${path}`
    },
    getMarketplaceUrl (url) {
      const value = String(url || '').trim()
      if (!value) {
        return ''
      }
      if (value.startsWith('http://') || value.startsWith('https://')) {
        return value
      }
      return `https://${value}`
    },
    getPrice (price) {
      price = String(price).split('.')
      price = price[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      return price
    },
    async addProductToCart () {
      const result = await this.$store.dispatch('shop/AddProductToCart', this.product)
      if (result?.requiresAuth) {
        promptAuthForCart({ router: this.$router, route: this.$route })
      }
    },
    openGallery () {
      if (!this.GetPhotos.length) {
        return
      }
      const index = this.GetPhotos.findIndex((item) => item.src === this.current_image)
      this.modal_index = index >= 0 ? index : 0
      this.show_gallery = true
    },
    closeGallery () {
      this.show_gallery = false
    },
    nextImage () {
      if (!this.GetPhotos.length) {
        return
      }
      this.modal_index = (this.modal_index + 1) % this.GetPhotos.length
    },
    prevImage () {
      if (!this.GetPhotos.length) {
        return
      }
      this.modal_index = (this.modal_index - 1 + this.GetPhotos.length) % this.GetPhotos.length
    },
    setModalIndex (index) {
      if (index < 0 || index >= this.GetPhotos.length) {
        return
      }
      this.modal_index = index
    }
  }
}
</script>
<style scoped>
.product_marketplaces {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.product_marketplace_btn {
  min-width: 170px;
  color: #fff !important;
  border: none !important;
  font-weight: 600;
}

.product_marketplace_btn--ozon {
  background: #005bff !important;
}

.product_marketplace_btn--ozon:hover {
  background: #0047c6 !important;
}

.product_marketplace_btn--wb {
  background: linear-gradient(90deg, #cb11ab 0%, #481173 100%) !important;
}

.product_marketplace_btn--wb:hover {
  background: linear-gradient(90deg, #b80f9c 0%, #3d0f61 100%) !important;
}
</style>
