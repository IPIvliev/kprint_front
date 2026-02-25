<template>
  <div v-if="isVisible" class="cookie-banner" data-test="cookie-banner">
    <div class="cookie-banner__content">
      <p class="cookie-banner__title">Согласие на cookies</p>
      <p class="cookie-banner__text">
        Мы используем обязательные cookies для работы сайта. Аналитические cookies включаются только после вашего согласия.
      </p>
      <p class="cookie-banner__links">
        <router-link to="/legal/personal-data-policy#9-cookies-и-аналитика" target="_blank" rel="noopener noreferrer">О cookies в политике ПДн</router-link>
      </p>
      <div class="cookie-banner__actions">
        <button class="btn btn--grayborder cookie-banner__btn" type="button" data-test="cookie-required-only" @click="acceptRequiredOnly">
          Только обязательные
        </button>
        <button class="btn btn--red cookie-banner__btn" type="button" data-test="cookie-accept-all" @click="acceptAll">
          Принять все
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { hasCookieConsent, saveCookieConsent } from '@/services/cookie-consent.service'

export default {
  name: 'CookieConsentBanner',
  data () {
    return {
      isVisible: false
    }
  },
  mounted () {
    this.isVisible = !hasCookieConsent()
  },
  methods: {
    acceptRequiredOnly () {
      saveCookieConsent({ optionalCookiesAccepted: false })
      this.isVisible = false
    },
    acceptAll () {
      saveCookieConsent({ optionalCookiesAccepted: true })
      this.isVisible = false
    }
  }
}
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 16px;
  z-index: 10000;
  display: flex;
  justify-content: center;
}

.cookie-banner__content {
  width: 100%;
  max-width: 860px;
  background: #ffffff;
  border: 1px solid #d9dee8;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(35, 38, 41, 0.14);
  padding: 14px 16px;
}

.cookie-banner__title {
  margin: 0 0 6px;
  color: #232629;
  font-size: 16px;
  line-height: 1.3;
  font-weight: 700;
}

.cookie-banner__text {
  margin: 0;
  color: #5d636f;
  font-size: 13px;
  line-height: 1.45;
}

.cookie-banner__links {
  margin: 8px 0 0;
  font-size: 12px;
  line-height: 1.4;
}

.cookie-banner__actions {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cookie-banner__btn {
  min-height: 38px;
}
</style>

