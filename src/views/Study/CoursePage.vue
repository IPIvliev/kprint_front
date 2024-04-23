<template>
    <div class="page">
      <header-block/>
      <div class="content">
        <WhiteWelcome />
        <AboutCourse :background="'light_gray_background'" :course = "GetCourse"/>
        <CourseProgramm :background="'light_gray_background'" :lessons="GetCourse.lessons"/>
        <!-- <WhyWeStudyBlock :background="'light_gray_background'"/> -->
        <CourseTeachers :background="'light_gray_background'" :teachers="GetCourse.teachers"/>

        <CourseFeedbacks :background="'light_gray_background'" :feedbacks="GetCourse.feedbacks"/>

        <CoursePrices :background="'light_gray_background'" :prices="GetCourse.prices"/>

        <CourseRelated :background="'gray_background'" :related="GetCourse.related"/>
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
    import WhiteWelcome from "@/components/elements/WhiteWelcome.vue"
    import AboutCourse from "@/components/Study/AboutCourse.vue"
    import CourseProgramm from "@/components/Study/CourseProgramm.vue"
    import CourseTeachers from "@/components/Study/CourseTeachers.vue"
    import CourseFeedbacks from "@/components/Study/CourseFeedbacks.vue"
    import CoursePrices from "@/components/Study/CoursePrices.vue"
    import CourseRelated from "@/components/Study/CourseRelated.vue"
    
    import WhyWeStudyBlock from "@/components/Study/WhyWeStudyBlock.vue"
    
    import AlreadyStudy from "@/components/Study/AlreadyStudy.vue"
    import GalleryBlock from "@/components/elements/GalleryBlock.vue"
    import MainPageNews from "@/components/elements/MainPage/MainPageNews.vue"
    
    import FooterBlock from '@/components/FooterBlock.vue'
    import CallbackWindow from "@/components/elements/CallbackWindow.vue"
     
    export default {
      name: 'Курсы обучения',
      components: {
        WhiteWelcome,
        AboutCourse,
        CourseProgramm,
        CourseTeachers,
        CourseFeedbacks,
        CoursePrices,
        CourseRelated,
        WhyWeStudyBlock,
        AlreadyStudy,
        GalleryBlock,
        MainPageNews,
        FooterBlock,
        HeaderBlock,
        CallbackWindow,
    
      },
      data() {
      return {
        id: this.$route.params.id,
      }
    },
    created() {
      this.$store.dispatch("fetchCourse", this.id);
    },
    computed: {
      GetCourse() {
        return this.$store.state.course
      },
    }
    }
</script>
<style scoped>
  
</style>
    