<template>
    <!-- video-->
    <div class="white_block" :class="background">
      <div class="container"> 
        <div class="row gy-1">
          <div class="col-lg-12">
            <h2 class="title">Программа обучения</h2>
            
            <div class="course_programm">
              <div class="course_lesson" v-for="(lesson, index) in lessons" :key="lesson.id">
                <div class="row">
                  <div class="col-12">
                    <h3>{{ lesson.title }}</h3>
                    <p class="course_lesson_description">{{ lesson.description }}</p>
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
export default {
  data() {
    return {
      show_details: null,
    }
  },
  props: ['background', 'lessons'],
}
</script>
<style scoped>
hr {
  color:var(--bs-gray-dark);
}

.course_programm {
  background-color: var(--fillsprimary);
  width: 100%;
  padding: 20px;
  margin: 50px 0px;
  border-radius: 24px;
}

.course_lesson {
  margin: 30px 0 10px 0;
  padding: 0 10px;
}

.course_lesson_description {
  margin: 10px 0;
}
</style>