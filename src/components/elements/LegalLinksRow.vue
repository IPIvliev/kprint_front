<template>
  <div class="footer__dgdgf d-flex flex-wrap legal-links-row">
    <router-link
      v-for="item in links"
      :key="item.to"
      :to="item.to"
      :target="openInNewTab ? '_blank' : null"
      :rel="openInNewTab ? 'noopener noreferrer' : null"
    >
      {{ item.label }}
    </router-link>
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
  computed: {
    links () {
      return legalLinks
    }
  }
}
</script>
