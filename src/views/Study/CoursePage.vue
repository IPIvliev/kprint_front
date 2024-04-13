<template>
    <div class="page">
      <header-block/>
      <div class="content">
        <CourseWelcome/>
    
        <WhyWeStudyBlock :background="'light_gray_background'"/>
    
        <!-- advantages-->
        <!--	/advantages-->
        <!-- halfitems-->
        <!--	/halfitems-->
        <!-- callback-->
        <GalleryBlock/>
        <AlreadyStudy />
        <!--	/callback-->
       
      </div>
      <footer-block/>
    </div>
    </template>
    
    <script>
    // @ is an alias to /src
    import HeaderBlock from '@/components/HeaderBlock.vue'
    import CourseWelcome from "@/components/Study/CourseWelcome.vue"
    
    import WhyWeStudyBlock from "@/components/Study/WhyWeStudyBlock.vue"
    import AlreadyStudy from "@/components/Study/AlreadyStudy.vue"
    import GalleryBlock from "@/components/elements/GalleryBlock.vue"
    import MainPageNews from "@/components/elements/MainPage/MainPageNews.vue"
    
    import FooterBlock from '@/components/FooterBlock.vue'
    import CallbackWindow from "@/components/elements/CallbackWindow.vue"
    
    
    export default {
      name: 'Курсы обучения',
      components: {
       CourseWelcome,
        WhyWeStudyBlock,
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
    