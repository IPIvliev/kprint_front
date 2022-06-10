<template lang="pug">
.page
  header-block
  registration-page
</template>

<script>
// @ is an alias to /src
import HeaderBlock from '../components/HeaderBlock.vue'
import RegistrationPage from '../components/RegistrationPage.vue'


export default {
  name: 'Registration',
  components: {
    RegistrationPage,
    HeaderBlock
  }
}
</script>
