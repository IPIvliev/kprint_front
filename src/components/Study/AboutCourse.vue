<template>
    <!-- video-->
    <div class="white_block cmp-components-study-aboutcourse" :class="background">
      <div class="container">
        <div class="row gy-1">
          <div class="col-lg-8">
            <h1 class="title">{{ course.name }}</h1>
            <div
              class="innovation__text"
              style="margin-top: 30px;"
              v-html="renderRichText(course.description)"
            ></div>
          </div>
          <div class="col-lg-4" style="text-align: center;" >
            <img :src="course.photo" class="about_photo" width="500" height="400">
          </div>
        </div>
      </div>
    </div>
    <!--  /video-->
</template>
<script>
import { sanitizeRichText } from '@/utils/sanitizeRichText'

export default {
  props: ['background', 'course'],
  methods: {
    renderRichText (html) {
      return sanitizeRichText(html)
    }
  }
}
</script>
