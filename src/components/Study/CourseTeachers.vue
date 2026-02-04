<template>
  <div class="white_block cmp-components-study-courseteachers" :class="background">
      <div class="container"> 
        <div class="row gy-1">
          <div class="col-lg-12">
            <h2 class="title">Спикеры</h2>
            <div class="course_teachers">
              <div class="course_teacher" v-for="(teacher, index) in teachers" :key="teacher.id">
                    <img class="course_teacher_photo" :src="teacher.photo" width="300" height="200">
                    <h3 class="course_teacher_name">{{ teacher.name }}</h3>
                    <p class="course_teacher_description">{{ teacher.short_description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      show_details: null,
    }
  },
  props: ['background', 'teachers'],
}
</script>
