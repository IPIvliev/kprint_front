<template>
  <form class="cmp-components-elements-shop-orderform" @submit.prevent="onSubmit">
    <div class="mb-1">
      <label for="fio" class="form-label">ФИО получателя</label>
      <input
        id="fio"
        v-model.trim="fio"
        type="text"
        name="fio"
        class="form-control input_field"
        placeholder="Ваше имя"
      />
      <div>{{ formErrors.fio }}</div>
    </div>
    <div class="mb-1">
      <label for="phone" class="form-label">Номер телефона получателя</label>
      <input
        id="phone"
        v-model="phone"
        type="text"
        name="phone"
        class="form-control input_field"
        v-imask="phoneNumberMask"
        placeholder="+7(921)123-45-67"
        @keypress="isNumber"
        @accept="onAccept"
      />
      <div>{{ formErrors.phone }}</div>
    </div>
    <div class="mb-2">
      <label for="email" class="form-label">Адрес электронной почты</label>
      <input
        id="email"
        v-model.trim="email"
        type="email"
        name="email"
        class="form-control input_field"
        placeholder="Введите email"
      />
      <div>{{ formErrors.email }}</div>
    </div>
    <div class="mb-2" v-if="showDelivery">
      <label class="form-label">Доставка:</label>
    </div>
    <div class="form-check">
      <input id="sign" v-model="agree" class="form-check-input" type="checkbox" name="sign" />
      <label class="form-check-label" for="sign">
        Я даю согласие на обработку моих персональных данных и соглашаюсь с политикой обработки персональных данных
      </label>
      <div>{{ formErrors.sign }}</div>
    </div>
    <hr />
    <button class="btn btn--red col-12" type="submit" :disabled="submitting">
      {{ submitting ? 'Отправка...' : 'Оплатить' }}
    </button>
    <div v-if="submitError" style="margin-top: 10px; color: #d83a56;">{{ submitError }}</div>
  </form>
</template>

<script>
import { IMaskDirective } from 'vue-imask'
import { createShopPayment } from '@/services/shop.service'

export default {
  directives: {
    imask: IMaskDirective
  },
  props: {
    showDelivery: {
      type: Boolean,
      default: false
    },
    office: {
      type: Object,
      default: () => ({})
    },
    deliveryCompany: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      fio: '',
      phone: '',
      email: '',
      agree: true,
      idempotencyKey: '',
      submitting: false,
      submitError: '',
      formErrors: {
        fio: '',
        phone: '',
        email: '',
        sign: ''
      },
      phoneNumberMask: {
        mask: '+{7} (000) 000-00-00'
      }
    }
  },
  methods: {
    buildIdempotencyKey () {
      if (typeof globalThis !== 'undefined' && globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function') {
        return globalThis.crypto.randomUUID()
      }
      return `order-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
    },
    normalizeDeliveryCompany () {
      if (this.deliveryCompany === 'sdek') {
        return 'sdek'
      }
      if (this.deliveryCompany === 'pochta') {
        return 'pochta_rossii'
      }
      return this.deliveryCompany || ''
    },
    resolveDeliveryDestination () {
      const office = this.office || {}
      if (this.deliveryCompany === 'sdek') {
        return office?.location?.address_full || office?.location?.postal_code || office?.address || ''
      }
      return office['address-source'] || office['postal-code'] || office?.address || ''
    },
    buildReturnUrl (orderId) {
      const origin = typeof window !== 'undefined' && window.location ? window.location.origin : ''
      if (!origin) {
        return ''
      }
      const url = new URL('/shop/cart', origin)
      url.searchParams.set('payment', 'return')
      if (orderId) {
        url.searchParams.set('shop_order_id', String(orderId))
      }
      return url.toString()
    },
    storePendingPayment (payment, orderId) {
      const paymentId = String(payment?.payment_id || '').trim()
      if (!paymentId) {
        return
      }
      localStorage.setItem('shop_last_payment_id', paymentId)
      localStorage.setItem('shop_last_payment_order_id', String(orderId || ''))
    },
    onAccept (e) {
      const maskRef = e.detail
      this.phone = maskRef.value
    },
    isNumber (e) {
      const regex = /[0-9]/
      if (!regex.test(e.key)) {
        e.returnValue = false
        if (e.preventDefault) {
          e.preventDefault()
        }
      }
    },
    validateForm () {
      this.formErrors = { fio: '', phone: '', email: '', sign: '' }

      if (!this.fio) {
        this.formErrors.fio = 'Введите ФИО'
      }
      if (!this.phone || this.phone.length < 10) {
        this.formErrors.phone = 'Введите телефон'
      }
      if (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
        this.formErrors.email = 'Введите корректный email'
      }
      if (!this.agree) {
        this.formErrors.sign = 'Требуется согласие'
      }

      return !Object.values(this.formErrors).some(Boolean)
    },
    async onSubmit () {
      if (!this.validateForm() || this.submitting) {
        return
      }

      this.submitting = true
      this.submitError = ''
      try {
        const order = await this.$store.dispatch('shop/fetchCreateOrder', {
          fio: this.fio,
          phone: this.phone,
          email: this.email,
          delivery_company: this.normalizeDeliveryCompany(),
          delivery_destination: this.resolveDeliveryDestination(),
          delivery_time: this.$store.state.delivery?.delivery_price?.delivery_time || '',
          idempotency_key: this.idempotencyKey || this.buildIdempotencyKey()
        })
        const orderId = Number(order?.id || 0)
        if (!orderId) {
          throw new Error('ORDER_CREATE_FAILED')
        }

        const paymentResponse = await createShopPayment({
          order_id: orderId,
          return_url: this.buildReturnUrl(orderId)
        })
        const payment = paymentResponse?.data || {}
        if (payment?.is_paid) {
          await this.$store.dispatch('shop/refreshActiveOrderState')
          this.idempotencyKey = this.buildIdempotencyKey()
          return
        }
        const confirmationUrl = String(payment?.confirmation_url || '').trim()
        if (!confirmationUrl) {
          throw new Error('PAYMENT_URL_MISSING')
        }

        this.storePendingPayment(payment, orderId)
        this.idempotencyKey = this.buildIdempotencyKey()
        window.location.href = confirmationUrl
      } catch (e) {
        this.submitError = e?.response?.data?.detail || 'Не удалось создать платёж. Попробуйте позже.'
      } finally {
        this.submitting = false
      }
    }
  },
  created () {
    this.idempotencyKey = this.buildIdempotencyKey()
  }
}
</script>
