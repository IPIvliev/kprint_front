<template>
<div class="page">
  <header-block/>
  <div class="content">
    <WhiteWelcome/>

    <WhyWeStudyBlock :background="'light_gray_background'"/>

    <CourcesList/>
    <!-- advantages-->
    <!--	/advantages-->
    <!-- halfitems-->
    <!--	/halfitems-->
    <!-- callback-->
    <GalleryBlock/>
    <AlreadyStudy />
    <!--	/callback-->
    <MainPageNews/>

    
  </div>
  <footer-block/>
</div>
</template>

<script>
// @ is an alias to /src
import HeaderBlock from '../../components/HeaderBlock.vue'
import WhiteWelcome from "../../components/elements/WhiteWelcome.vue"

import WhyWeStudyBlock from "@/components/Study/WhyWeStudyBlock.vue"
import CourcesList from "@/components/Study/CourcesList.vue"
import AlreadyStudy from "@/components/Study/AlreadyStudy.vue"
import GalleryBlock from "@/components/elements/GalleryBlock.vue"
import MainPageNews from "@/components/elements/MainPage/MainPageNews.vue"

import FooterBlock from '../../components/FooterBlock.vue'
import CallbackWindow from "../../components/elements/CallbackWindow.vue"


export default {
  name: 'Курсы обучения',
  components: {
    WhiteWelcome,
    WhyWeStudyBlock,
    CourcesList,
    AlreadyStudy,
    GalleryBlock,
    MainPageNews,
    FooterBlock,
    HeaderBlock,
    CallbackWindow,

  },
  created() {
        this.$store.dispatch("fetchCourses");
  },
}
</script>
