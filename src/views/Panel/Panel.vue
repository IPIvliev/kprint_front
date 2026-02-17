<template>
  <div class="page">
    <header-panel-block />
    <MainPanelPage />
    <footer-panel-block />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import MainPanelPage from '../../components/Panel/PanelMain.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'
import { isManagerUser, setStoredPanelMode } from '@/utils/panelMode'

export default {
  name: 'PanelHomeView',
  components: {
    MainPanelPage,
    FooterPanelBlock,
    HeaderPanelBlock
  },
  computed: {
    currentUser () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    redirectManagerToDashboard () {
      if (!isManagerUser(this.currentUser)) {
        return
      }
      if (!this.$route || this.$route.path !== '/panel') {
        return
      }
      setStoredPanelMode('manager')
      this.$router.replace('/panel/manager')
    }
  },
  mounted () {
    this.redirectManagerToDashboard()
  },
  watch: {
    currentUser () {
      this.redirectManagerToDashboard()
    }
  }
}
</script>
