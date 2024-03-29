<template>
<div class="page">
  <header-block/>
  <ContactPage/>
  <WhiteWelcome/>
  <footer-block/>
</div>
</template>

<script>
// @ is an alias to /src
import HeaderBlock from '../components/HeaderBlock.vue'

import WhiteWelcome from "../components/elements/WhiteWelcome.vue"

import ContactPage from '../components/ContactPage.vue'
import FooterBlock from '../components/FooterBlock.vue'

export default {
  name: 'Contact',
  components: {
    ContactPage,
    FooterBlock,
    HeaderBlock,
    WhiteWelcome
  }
}
</script>
