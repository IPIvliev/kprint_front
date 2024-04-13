<template>
    <div class="page">
      <header-block/>
      <div class="content">
        <WhiteWelcome/>
        <WhyWePrintBlock background="light_gray_background"/>
        <PrintPrice/>
        <PrintOrderSteps/>
        <GalleryBlock/>
        <MainPageNews/>
        
      </div>
      <footer-block/>
    </div>
    </template>
    
    <script>
    // @ is an alias to /src
    import HeaderBlock from '../../components/HeaderBlock.vue'
    import WhiteWelcome from "../../components/elements/WhiteWelcome.vue"
    import WhyWePrintBlock from "@/components/Print/WhyWePrintBlock.vue"
    import PrintPrice from "@/components/Print/PrintPrice.vue"
    import PrintOrderSteps from "@/components/Print/PrintOrderSteps.vue"
    import GalleryBlock from "@/components/elements/GalleryBlock.vue"
    import MainPageNews from "@/components/elements/MainPage/MainPageNews.vue"
    import FooterBlock from '../../components/FooterBlock.vue'
    
    
    export default {
      name: 'Курсы обучения',
      components: {
        FooterBlock,
        WhiteWelcome,
        WhyWePrintBlock,
        PrintPrice,
        PrintOrderSteps,
        HeaderBlock,
        GalleryBlock,
        MainPageNews
      }
    }
    </script>
    