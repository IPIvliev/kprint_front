<template>
  <div ref="root" class="footer__dgdgf legal-links-row">
    <button
      type="button"
      class="legal-links-row__trigger"
      data-test="legal-info-trigger"
      :aria-expanded="isOpen ? 'true' : 'false'"
      @click="toggleModal"
    >
      Правовая информация
    </button>

    <div v-if="isOpen" class="legal-links-row__modal" data-test="legal-info-modal" role="dialog">
      <div class="legal-links-row__head">
        <span>Правовая информация</span>
        <button
          type="button"
          class="legal-links-row__close"
          data-test="legal-info-close"
          aria-label="Закрыть правовую информацию"
          @click="closeModal"
        >
          x
        </button>
      </div>
      <div class="legal-links-row__list">
        <router-link
          v-for="item in links"
          :key="item.to"
          :to="item.to"
          :target="openInNewTab ? '_blank' : null"
          :rel="openInNewTab ? 'noopener noreferrer' : null"
          @click="closeModal"
        >
          {{ item.label }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { legalLinks } from '@/legal/legalLinks'

export default {
  name: 'LegalLinksRow',
  props: {
    openInNewTab: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    links () {
      return legalLinks
    }
  },
  mounted () {
    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', this.handleOutsideClick)
      document.addEventListener('keydown', this.handleKeydown)
    }
  },
  beforeUnmount () {
    if (typeof document !== 'undefined') {
      document.removeEventListener('mousedown', this.handleOutsideClick)
      document.removeEventListener('keydown', this.handleKeydown)
    }
  },
  methods: {
    toggleModal () {
      this.isOpen = !this.isOpen
    },
    closeModal () {
      this.isOpen = false
    },
    handleOutsideClick (event) {
      if (!this.isOpen) {
        return
      }
      const root = this.$refs.root
      if (root && !root.contains(event.target)) {
        this.closeModal()
      }
    },
    handleKeydown (event) {
      if (event.key === 'Escape') {
        this.closeModal()
      }
    }
  }
}
</script>

<style scoped>
.legal-links-row {
  position: relative;
  margin-left: auto;
  display: flex;
  align-items: center;
}

.legal-links-row__trigger {
  border: 0;
  background: transparent;
  padding: 0;
  color: inherit;
  font: inherit;
  line-height: inherit;
  white-space: nowrap;
  cursor: pointer;
}

.legal-links-row__trigger:hover {
  color: #b8b9ba;
}

.legal-links-row__modal {
  position: absolute;
  right: 0;
  bottom: calc(100% + 12px);
  width: min(320px, calc(100vw - 24px));
  padding: 12px;
  border: 1px solid #303132;
  border-radius: 10px;
  background: #1f2022;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.45);
  z-index: 30;
}

.legal-links-row__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
  color: #f0f0f0;
  font-size: 14px;
  line-height: 18px;
}

.legal-links-row__close {
  border: 0;
  background: transparent;
  padding: 0;
  color: #b8b9ba;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
}

.legal-links-row__close:hover {
  color: #fff;
}

.legal-links-row__list {
  display: grid;
  gap: 8px;
}

.legal-links-row__list a {
  margin: 0;
  white-space: normal;
  color: #b8b9ba;
  text-decoration: none;
  font-size: 13px;
  line-height: 16px;
}

.legal-links-row__list a:hover {
  color: #fff;
}
</style>
