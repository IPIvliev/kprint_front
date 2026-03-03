<template>
    <!-- video-->
    <div class="white_block cmp-components-study-courseprogramm" :class="background">
      <div class="container">
        <div class="row gy-1">
          <div class="col-lg-12">
            <h2 class="title">Программа обучения</h2>

            <div class="course_programm">
              <div class="course_lesson" v-for="lesson in lessons" :key="lesson.id">
                <div class="row">
                  <div class="col-12">
                    <h3>{{ lesson.title }}</h3>
                    <div class="course_lesson_description" v-html="renderRichText(lesson.description)"></div>
                  </div>
                </div>
                <hr>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

</template>
<script>
import { sanitizeRichText } from '@/utils/sanitizeRichText'

export default {
  data () {
    return {
      show_details: null
    }
  },
  props: ['background', 'lessons'],
  methods: {
    renderRichText (html) {
      return sanitizeRichText(html)
    }
  }
}
</script>
