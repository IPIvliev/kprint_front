<template>
  <div class="main-welcome cmp-components-elements-whitewelcome" >
    <router-link to="/shop">
      <div class="item-main-welcome">
        <img class="img-main-item" src="../../assets/img/welcome-img-1.webp" loading="eager" decoding="async" />
        <div class="frame-main-item">
          <div class="text-wrapper-main-item">Магазин</div>
          <img class="icons-large-main-item" src="../../assets/img/Large.svg" />
        </div>
      </div>
    </router-link>
    <router-link to="/study">
      <div class="item-main-welcome">
        <img class="img-main-item" src="../../assets/img/welcome-img-2.webp" loading="lazy" decoding="async" />
        <div class="frame-main-item">
          <div class="text-wrapper-main-item">Обучение</div>
          <img class="icons-large-main-item" src="../../assets/img/Large.svg" />
        </div>
      </div>
    </router-link>
    <router-link to="/print">
      <div class="item-main-welcome">
        <img class="img-main-item" src="../../assets/img/welcome-img-3.webp" loading="lazy" decoding="async" />
        <div class="frame-main-item">
          <div class="text-wrapper-main-item">3D печать на заказ</div>
          <img class="icons-large-main-item" src="../../assets/img/Large.svg" />
        </div>
      </div>
    </router-link>

    <div
      v-if="showBear"
      class="whitewelcome-bear"
      :class="{ 'whitewelcome-bear--playing': isKalinkaPlaying }"
      role="button"
      tabindex="0"
      aria-label="Медведь с балалайкой"
      @click="playKalinka"
      @keydown.enter.prevent="playKalinka"
      @keydown.space.prevent="playKalinka"
    >
      <svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" role="img">
        <title>Резной медведь с балалайкой</title>
        <ellipse cx="80" cy="112" rx="42" ry="7" fill="rgba(56, 32, 18, 0.24)" />
        <g class="whitewelcome-bear__figure">
          <path d="M58 36C58 25 66 18 78 18C90 18 98 25 98 36V42H58V36Z" fill="#8B5A2B"/>
          <circle cx="64" cy="26" r="8" fill="#8B5A2B"/>
          <circle cx="92" cy="26" r="8" fill="#8B5A2B"/>
          <ellipse cx="78" cy="45" rx="27" ry="23" fill="#A06A37"/>
          <ellipse cx="78" cy="49" rx="12" ry="9" fill="#D0A16A"/>
          <circle cx="72" cy="42" r="2.2" fill="#2F1A0D"/>
          <circle cx="84" cy="42" r="2.2" fill="#2F1A0D"/>
          <path d="M73 53C76 56 80 56 83 53" stroke="#2F1A0D" stroke-width="2" stroke-linecap="round"/>
          <path d="M58 64C50 68 48 78 53 86C58 93 67 94 74 89L72 78L58 64Z" fill="#8B5A2B"/>
          <path d="M98 64C106 68 108 78 103 86C98 93 89 94 82 89L84 78L98 64Z" fill="#8B5A2B"/>
          <path d="M69 69L90 61L108 74L84 92L69 69Z" fill="#C48A4A"/>
          <path d="M90 61L108 74" stroke="#7A4A20" stroke-width="2"/>
          <path d="M85 68L94 74" stroke="#7A4A20" stroke-width="1.6"/>
          <path d="M82 72L91 78" stroke="#7A4A20" stroke-width="1.6"/>
          <path d="M78 76L87 82" stroke="#7A4A20" stroke-width="1.6"/>
          <rect x="105" y="70" width="22" height="3.8" rx="1.8" fill="#B67A3A"/>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import { fetchUserProfile } from '@/services/panel.service'

export default {
  data () {
    return {
      showBear: false,
      isKalinkaPlaying: false,
      kalinkaAudio: null
    }
  },
  mounted () {
    this.resolveBearVisibility()
  },
  beforeUnmount () {
    this.stopKalinka()
  },
  methods: {
    updateStoredUserShowBear (showBearValue) {
      const storeUser = this.$store?.state?.auth?.user
      if (!storeUser) {
        return
      }
      const nextUser = {
        ...storeUser,
        show_bear: Boolean(showBearValue)
      }
      try {
        localStorage.setItem('user', JSON.stringify(nextUser))
        this.$store.commit('auth/loginSuccess', nextUser)
      } catch (error) {
        // Keep page interactive if local persistence is unavailable.
      }
    },
    async resolveBearVisibility () {
      const storeUser = this.$store?.state?.auth?.user || null
      this.showBear = Boolean(storeUser?.show_bear)
      if (!this.$store?.state?.auth?.status?.loggedIn) {
        return
      }
      try {
        const response = await fetchUserProfile()
        const showBearValue = Boolean(response?.data?.show_bear)
        this.showBear = showBearValue
        this.updateStoredUserShowBear(showBearValue)
      } catch (error) {
        // Fallback to store value when profile endpoint is temporarily unavailable.
      }
    },
    getKalinkaAudio () {
      if (this.kalinkaAudio) {
        return this.kalinkaAudio
      }
      const audio = new Audio('/Kalinka.mp3')
      audio.preload = 'auto'
      audio.addEventListener('ended', () => {
        this.isKalinkaPlaying = false
      })
      audio.addEventListener('pause', () => {
        if (audio.ended || audio.currentTime === 0) {
          this.isKalinkaPlaying = false
        }
      })
      this.kalinkaAudio = audio
      return audio
    },
    stopKalinka () {
      const audio = this.kalinkaAudio
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
      this.isKalinkaPlaying = false
    },
    async playKalinka () {
      const audio = this.getKalinkaAudio()
      this.stopKalinka()
      this.isKalinkaPlaying = true
      try {
        await audio.play()
      } catch (error) {
        this.isKalinkaPlaying = false
      }
    }
  }
}
</script>
