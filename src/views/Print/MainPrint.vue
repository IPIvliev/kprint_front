<template>
    <div class="page">
      <header-block/>
      <div class="content">
        <WhiteWelcome/>
        <WhyWePrintBlock background="light_gray_background"/>
        <PrintPrice/>
        <PrintOrderSteps/>
        <GalleryBlock page-key="print" />
        <PartnersBlock
          title="Компании, которые заказывают у нас 3D-печать"
          category="print"
          fallback-category-title="Заказы на печать"
          :fallback-category-titles="[
            'Заказы на печать',
            '3D-печать',
            'Клиенты 3D-печати',
            'Компании, которые заказывают у нас 3D-печать'
          ]"
        />
        <MainPageNews/>

      </div>
      <footer-block/>
    </div>
    </template>

<script>
// @ is an alias to /src
import HeaderBlock from '../../components/HeaderBlock.vue'
import WhiteWelcome from '../../components/elements/WhiteWelcome.vue'
import WhyWePrintBlock from '@/components/Print/WhyWePrintBlock.vue'
import PrintPrice from '@/components/Print/PrintPrice.vue'
import PrintOrderSteps from '@/components/Print/PrintOrderSteps.vue'
import GalleryBlock from '@/components/elements/GalleryBlock.vue'
import PartnersBlock from '@/components/elements/PartnersBlock.vue'
import MainPageNews from '@/components/elements/MainPage/MainPageNews.vue'
import FooterBlock from '../../components/FooterBlock.vue'

export default {
  name: 'PrintMainView',
  components: {
    FooterBlock,
    WhiteWelcome,
    WhyWePrintBlock,
    PrintPrice,
    PrintOrderSteps,
    HeaderBlock,
    GalleryBlock,
    PartnersBlock,
    MainPageNews
  }
}
</script>

<style src="@/assets/css/routes/print.css"></style>
