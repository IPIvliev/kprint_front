<template>
  <div class="page cmp-views-study-coursepage">
      <header-block/>
      <div class="content">
        <WhiteWelcome />
        <AboutCourse :background="'light_gray_background'" :course = "GetCourse"/>
        <CourseProgramm :background="'light_gray_background'" :lessons="GetCourse.lessons || []"/>
        <!-- <WhyWeStudyBlock :background="'light_gray_background'"/> -->
        <CourseTeachers :background="'light_gray_background'" :teachers="GetCourse.teachers || []"/>

        <CourseFeedbacks :background="'light_gray_background'" :feedbacks="GetCourse.feedbacks || []"/>

        <CoursePrices :background="'light_gray_background'" :prices="GetCourse.prices || []" :course="GetCourse"/>

        <CourseRelated :background="'gray_background'" :related="GetCourse.related || []"/>
        <!-- advantages-->
        <!--  /advantages-->
        <!-- halfitems-->
        <!--  /halfitems-->
        <!-- callback-->
        <GalleryBlock page-key="study" />
        <AlreadyStudy />
        <!--  /callback-->

      </div>
      <footer-block/>
    </div>
</template>

<script>
// @ is an alias to /src
import HeaderBlock from '@/components/HeaderBlock.vue'
import WhiteWelcome from '@/components/elements/WhiteWelcome.vue'
import AboutCourse from '@/components/Study/AboutCourse.vue'
import CourseProgramm from '@/components/Study/CourseProgramm.vue'
import CourseTeachers from '@/components/Study/CourseTeachers.vue'
import CourseFeedbacks from '@/components/Study/CourseFeedbacks.vue'
import CoursePrices from '@/components/Study/CoursePrices.vue'
import CourseRelated from '@/components/Study/CourseRelated.vue'

import AlreadyStudy from '@/components/Study/AlreadyStudy.vue'
import GalleryBlock from '@/components/elements/GalleryBlock.vue'

import FooterBlock from '@/components/FooterBlock.vue'

export default {
  name: 'StudyCoursePageView',
  components: {
    WhiteWelcome,
    AboutCourse,
    CourseProgramm,
    CourseTeachers,
    CourseFeedbacks,
    CoursePrices,
    CourseRelated,
    AlreadyStudy,
    GalleryBlock,
    FooterBlock,
    HeaderBlock

  },
  data () {
    return {
      id: this.$route.params.id
    }
  },
  created () {
    this.$store.dispatch('study/fetchCourse', this.id)
  },
  computed: {
    GetCourse () {
      return this.$store.state.study.course
    }
  }
}
</script>

<style src="@/assets/css/routes/study.css"></style>
