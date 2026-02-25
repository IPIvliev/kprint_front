<template>
      <!-- footer-->
      <footer class="footer footer--login">
        <div class="container">
          <div class="footer__line"></div>
          <div class="footer__bottom">
            <p>&#169; 2026, Kulibin Print. Все права защищены.</p>
            <LegalLinksRow />
          </div>
        </div>
      </footer>
      <!-- /footer-->
</template>

<script>
import LegalLinksRow from '@/components/elements/LegalLinksRow.vue'

export default {
  components: { LegalLinksRow }
}
</script>
