<template>
  <div class="page cmp-views-shop-cart">
        <header-block />
        <div class="content">
            <div class="white_block gray_background">
                <div class="container">
                    <h1 class="title">Корзина</h1>
                    <p class="news__text">Ваши покупки.</p>

                    <div class="row gy-1 cart_block">
                        <div class="col-12">
                            <CartProducts />
                        </div>

                        <div class="row gy-1">
                            <h3>Доставка</h3>
                        </div>

                        <div class="row gy-1" v-if="showDelivery">
                            <div class="col-3">
                                <div class="btn btn--white col-12 active">СДЭК</div>
                            </div>
                        </div>
                        <div class="row gy-1" v-if="showDelivery && GetSdekOffices.length > 0">
                            <div class="col-6">
                                <YandexMap :offices="GetSdekOffices" :location="location" @selectMarker="selectMarker" />
                            </div>
                            <div class="col-6 ">
                                <DeliveryDescription :office = "office" />
                            </div>
                        </div>
                        <div class="row gy-1" v-else-if="showDelivery">
                            <p v-if="gettingLocation">Загружаем пункты выдачи СДЭК...</p>
                            <p v-else>Пункты выдачи СДЭК временно недоступны. Обратитесь по телефону компании.</p>
                        </div>
                        <div class="row gy-1">
                            <div class="col-6">
                                <div class="row mb-1">
                                    <h3>Итого</h3>
                                </div>
                                <div class="delivery_description">
                                    <div class="total_row">
                                        <span class="text_gray">Товары</span>
                                        <div class="right">{{getTotalPrice}}</div>
                                    </div>
                                    <hr>
                                    <div class="total_row">
                                        <span class="text_gray">Доставка</span>
                                        <div class="right">
                                            <DeliveryPrice :office="office" />
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="total_row">
                                        <span class="text_gray">Промокод</span>
                                        <div class="right">

                                                <input type="text" class="form-control input_field_sale" placeholder="Введите промокод" @input="fetchDiscount">

                                        </div>

                                    </div>
                                    <hr>
                                    <div class="total_row">
                                        <span class="text_gray">Скидка</span>
                                        <div class="right">{{ getDiscountAmount }}%</div>

                                    </div>
                                    <hr>
                                    <div class="total_row strong">
                                        Итого стоимость с доставкой
                                        <div class="right">{{ getTotalPriceWithDelivery }} Р</div>
                                    </div>
                                </div>
                                <div class="delivery_description mt-1" v-if="showDelivery">

                                   <div class="total_row">
                                        <span class="text_gray">Общий вес</span>
                                        <div class="right">{{ getTotalWeight }} кг</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="row">
                                    <h3 class="mb-1">Доставка</h3>
                                </div>
                                <div class="row">
                                    <OrderForm
                                        :showDelivery="showDelivery"
                                        :office="office"
                                        deliveryCompany="sdek"
                                    />
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <!--  /news-->
            <!-- callback-->
            <!--  /callback-->
            <WhiteWelcome/>
        </div>

        <footer-block />
    </div>

</template>

<script >
import HeaderBlock from '@/components/HeaderBlock.vue'
import WhiteWelcome from '@/components/elements/WhiteWelcome.vue'
import CartProducts from '@/components/elements/Shop/CartProducts.vue'
import YandexMap from '@/components/Shop/YandexMap.vue'
import DeliveryDescription from '@/components/Shop/DeliveryDescription.vue'
import DeliveryPrice from '@/components/elements/Shop/DeliveryPrice.vue'
import OrderForm from '@/components/elements/Shop/OrderForm.vue'
import FooterBlock from '@/components/FooterBlock.vue'
import { fetchLocationByAbstract, fetchPublicIp } from '@/services/external.service'
export default {
  name: 'ShopCartView',
  components: { HeaderBlock, CartProducts, YandexMap, DeliveryDescription, DeliveryPrice, OrderForm, WhiteWelcome, FooterBlock },
  data () {
    return {
      ip: null,
      location: null,
      gettingLocation: null,
      selectedMarker: 0,
      office: {},
      productsGot: false
    }
  },
  beforeCreate () {

  },

  mounted () {

  },
  async created () {
    this.$store.commit('shop/initialiseCart')
    await this.$store.dispatch('catalog/fetchProducts').then(() => {
      this.productsGot = true
    })
    if (this.$store?.state?.auth?.status?.loggedIn) {
      try {
        await this.$store.dispatch('shop/syncCartOrderAfterLogin')
      } catch (error) {
        console.log(error)
      }
    }

    this.gettingLocation = true

    // Получаем публичный IP пользователя через внешний сервис.
    await fetchPublicIp()
      .then((publicIp) => {
        this.ip = publicIp
      })
      .catch((error) => {
        console.log(error)
        this.ip = null
      })

    // Геолокация по IP через backend endpoint.
    await fetchLocationByAbstract(this.ip ? { ip: this.ip } : {})
      .then(async (response) => {
        this.location = response?.data?.location?.data || null
        const postalCode = String(this.location?.postal_code || '').trim()
        const geoLat = Number(this.location?.geo_lat)
        const geoLon = Number(this.location?.geo_lon)
        if (postalCode) {
          await this.$store.dispatch('delivery/fetchSdekOffices', { postal_code: postalCode })
        } else if (Number.isFinite(geoLat) && Number.isFinite(geoLon)) {
          await this.$store.dispatch('delivery/fetchSdekOffices', { lat: geoLat, lon: geoLon })
        } else {
          this.$store.commit('delivery/setSdekOffices', [])
        }
        if (this.GetSdekOffices.length > 0) {
          this.selectMarker(0)
        }
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        this.gettingLocation = false
      })

    // Бесплатный запрос координат. Не точный
    // await navigator.geolocation.getCurrentPosition(pos => {
    //     this.gettingLocation = false;
    //     this.location = pos;
    //     console.log('Запрос на получние списка офисов')
    //     this.$store.dispatch("delivery/fetchPochtaOffices", {lat: this.location.coords.latitude, lon: this.location.coords.longitude});

    // }, err => {
    //     this.gettingLocation = false;
    //     this.errorStr = err.message;
    // })
  },
  computed: {
    GetSdekOffices () {
      try {
        const officesPayload = this.$store.state.delivery.sdek_offices
        const offices = Array.isArray(officesPayload)
          ? officesPayload
          : (Array.isArray(officesPayload?.offices) ? officesPayload.offices : [])
        return offices.filter((office) => {
          const hasCoordinates = Boolean(office?.location?.longitude) && Boolean(office?.location?.latitude)
          const isPickpoint = !office?.type || office.type === 'PVZ'
          return hasCoordinates && isPickpoint
        })
      } catch (error) {
        return []
      }
    },
    getTotalPrice () {
      return this.$store.getters['shop/cartTotal']
    },
    getTotalWeight () {
      return this.$store.getters['shop/cartTotalWeight']
    },
    getTotalPriceWithDelivery () {
      return this.$store.getters['shop/cartTotalWithDelivery']
    },
    getDiscountAmount () {
      return this.$store.getters['shop/getDiscountAmount']
    },
    showDelivery () {
      return this.$store.getters['shop/cartHasProducts']
    }
  },
  watch: {

  },
  methods: {
    selectMarker (index) {
      this.selectedMarker = index
      this.office = this.GetSdekOffices[index] || {}
      const destination = this.office?.location?.postal_code || this.office?.postal_code
      if (!destination) {
        return
      }
      this.$store.dispatch('delivery/fetchSdekPrice', {
        destination,
        products_mass: this.getTotalWeight * 1000
      })
    },
    fetchDiscount (e) {
      // console.log(e.target.value)
      this.$store.dispatch('shop/fetchDiscountAmount', e.target.value)
    }
  }
}

</script>

<style src="@/assets/css/routes/shop.css"></style>
