<template>
  <div class="page">
    <header-block />
    <div class="content">
      <section class="white_block white_background legal-document">
        <div class="container">
          <article class="legal-document__article" v-if="documentConfig" v-html="renderedHtml"></article>
          <article class="legal-document__article" v-else>
            <h1>Документ не найден</h1>
            <p>Запрошенная правовая страница отсутствует.</p>
          </article>
        </div>
      </section>
    </div>
    <footer-block />
  </div>
</template>

<script>
import HeaderBlock from '@/components/HeaderBlock.vue'
import FooterBlock from '@/components/FooterBlock.vue'
import { getLegalDocument } from '@/legal/legalDocuments'
import { markdownToHtml } from '@/utils/simpleMarkdown'

export default {
  name: 'LegalDocumentView',
  components: {
    HeaderBlock,
    FooterBlock
  },
  computed: {
    docKey () {
      return this.$route?.meta?.legalDocKey || ''
    },
    documentConfig () {
      return getLegalDocument(this.docKey)
    },
    renderedHtml () {
      if (!this.documentConfig) {
        return ''
      }
      return markdownToHtml(this.documentConfig.markdown)
    }
  }
}
</script>

<style scoped>
.legal-document__article {
  max-width: 960px;
  margin: 0 auto;
  color: #232629;
  line-height: 1.65;
  font-size: 16px;
}

.legal-document__article :deep(h1) {
  margin-bottom: 18px;
  font-size: 34px;
  line-height: 1.25;
}

.legal-document__article :deep(h2) {
  margin: 26px 0 12px;
  font-size: 24px;
  line-height: 1.3;
}

.legal-document__article :deep(h3) {
  margin: 18px 0 10px;
  font-size: 20px;
  line-height: 1.35;
}

.legal-document__article :deep(p) {
  margin-bottom: 12px;
}

.legal-document__article :deep(ul),
.legal-document__article :deep(ol) {
  margin: 0 0 14px 22px;
  padding: 0;
}

.legal-document__article :deep(li) {
  margin-bottom: 6px;
}
</style>
