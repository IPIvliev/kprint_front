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
      <div>{{ formErrors.delivery_destination }}</div>
    </div>
    <div class="checkout-consents">
      <p class="checkout-consents__title">
        Для оформления заказа отметьте обязательные подтверждения:
      </p>
      <label class="checkout-consents__item">
        <input v-model="termsOfferAccepted" class="form-check-input" type="checkbox" name="terms_offer_accepted">
        <span>
          <strong class="checkout-consents__badge">Обязательно</strong>
          Принимаю
          <router-link to="/legal/terms-offer" target="_blank" rel="noopener noreferrer">соглашение и оферту</router-link>
        </span>
      </label>
      <div>{{ formErrors.terms_offer_accepted }}</div>

      <label class="checkout-consents__item">
        <input v-model="pdAccepted" class="form-check-input" type="checkbox" name="pd_accepted">
        <span>
          <strong class="checkout-consents__badge">Обязательно</strong>
          Даю
          <router-link to="/legal/pd-consent" target="_blank" rel="noopener noreferrer">согласие на ПДн</router-link>
        </span>
      </label>
      <div>{{ formErrors.pd_accepted }}</div>

      <label class="checkout-consents__item">
        <input v-model="adsAccepted" class="form-check-input" type="checkbox" name="ads_accepted">
        <span>
          <strong class="checkout-consents__badge checkout-consents__badge--optional">Опционально</strong>
          Хочу получать
          <router-link to="/legal/ads-consent" target="_blank" rel="noopener noreferrer">новости и акции</router-link>
        </span>
      </label>
      <p class="checkout-consents__status" :class="{ 'checkout-consents__status--ready': isCheckoutConsentsAccepted }">
        {{ isCheckoutConsentsAccepted ? 'Обязательные пункты отмечены. Заказ можно отправить.' : 'Без 2 обязательных отметок отправка заказа недоступна.' }}
      </p>
    </div>
    <hr />
    <button class="btn btn--red col-12" type="submit" :disabled="submitting || !isCheckoutConsentsAccepted">
      {{ submitting ? 'Отправка...' : 'Оплатить' }}
    </button>
    <div v-if="submitError" style="margin-top: 10px; color: #d83a56;">{{ submitError }}</div>
  </form>
</template>

<script>
import { IMaskDirective } from 'vue-imask'
import { createShopPayment } from '@/services/shop.service'
import { fetchUserProfile } from '@/services/panel.service'

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
  computed: {
    isCheckoutConsentsAccepted () {
      return this.termsOfferAccepted && this.pdAccepted
    }
  },
  data () {
    return {
      fio: '',
      phone: '',
      email: '',
      termsOfferAccepted: false,
      pdAccepted: false,
      adsAccepted: false,
      idempotencyKey: '',
      submitting: false,
      submitError: '',
      formErrors: {
        fio: '',
        phone: '',
        email: '',
        terms_offer_accepted: '',
        pd_accepted: '',
        delivery_destination: ''
      },
      phoneNumberMask: {
        mask: '+{7} (000) 000-00-00'
      }
    }
  },
  watch: {
    '$store.state.shop.new_order': {
      handler () {
        this.applyRecipientFromActiveOrder()
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
      this.formErrors = { fio: '', phone: '', email: '', terms_offer_accepted: '', pd_accepted: '', delivery_destination: '' }

      if (!this.fio) {
        this.formErrors.fio = 'Введите ФИО'
      }
      if (!this.phone || this.phone.length < 10) {
        this.formErrors.phone = 'Введите телефон'
      }
      if (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
        this.formErrors.email = 'Введите корректный email'
      }
      if (!this.termsOfferAccepted) {
        this.formErrors.terms_offer_accepted = 'Нужно принять соглашение и оферту'
      }
      if (!this.pdAccepted) {
        this.formErrors.pd_accepted = 'Нужно согласиться на обработку ПДн'
      }
      if (this.showDelivery && !this.resolveDeliveryDestination()) {
        this.formErrors.delivery_destination = 'Выберите пункт выдачи СДЭК'
      }

      return !Object.values(this.formErrors).some(Boolean)
    },
    setFieldIfEmpty (field, value) {
      const nextValue = String(value || '').trim()
      if (!nextValue) {
        return
      }
      if (!String(this[field] || '').trim()) {
        this[field] = nextValue
      }
    },
    applyRecipientFromObject (payload = {}) {
      this.setFieldIfEmpty('fio', payload.fio || payload.full_name || payload.username)
      this.setFieldIfEmpty('phone', payload.phone)
      this.setFieldIfEmpty('email', payload.email)
    },
    applyRecipientFromActiveOrder () {
      const order = this.$store?.state?.shop?.new_order
      if (!order || typeof order !== 'object') {
        return
      }
      const deliveries = Array.isArray(order.delivery) ? order.delivery : []
      const delivery = deliveries[0] || {}
      this.applyRecipientFromObject({
        fio: delivery?.fio,
        phone: delivery?.phone,
        email: delivery?.email
      })
    },
    async hydrateRecipientFields () {
      this.applyRecipientFromObject(this.$store?.state?.auth?.user || {})
      this.applyRecipientFromActiveOrder()
      try {
        const response = await fetchUserProfile()
        this.applyRecipientFromObject(response?.data || {})
      } catch {
        // keep checkout usable even if profile request fails
      }
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
          terms_offer_accepted: this.termsOfferAccepted,
          pd_accepted: this.pdAccepted,
          ads_accepted: this.adsAccepted,
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
    this.hydrateRecipientFields()
  }
}
</script>

<style scoped>
.checkout-consents {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
  padding: 10px 12px;
  border: 1px solid #d9dee8;
  border-radius: 8px;
  background: #f7f9fc;
}

.checkout-consents__title {
  margin: 0;
  color: #232629;
  font-size: 13px;
  line-height: 1.35;
  font-weight: 600;
}

.checkout-consents__item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  line-height: 1.35;
  color: #5d636f;
}

.checkout-consents__item input {
  margin-top: 3px;
}

.checkout-consents__badge {
  display: inline-block;
  margin-right: 6px;
  padding: 1px 6px;
  border-radius: 999px;
  background: #fde8ec;
  color: #c9314f;
  font-size: 11px;
  line-height: 1.2;
}

.checkout-consents__badge--optional {
  background: #ecf2ff;
  color: #3c5fa8;
}

.checkout-consents__status {
  margin: 0;
  color: #a03d52;
  font-size: 12px;
  line-height: 1.35;
}

.checkout-consents__status--ready {
  color: #2f8f4e;
}
</style>
