<template>
    <div class="white_block" :class="background">
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
<style scoped>

.course_teachers {
  width: 100%;
  margin: 50px 0px;
  
  text-align: center;
}

.course_teacher {
  display: inline-block;
  vertical-align: top;
  width: 300px;
  height: 400px;
  background-color: var(--fillsprimary);
  border-radius: 24px;
  margin: 30px 20px 10px 20px;

}

.course_teacher_photo {
  border-radius: 24px 24px 0 0;
  object-fit: cover;
  object-position: 50% 50%;
}

.course_teacher_name {
  margin: 10px 0;
}

.course_teacher_description {
  margin: 10px 0;
}
</style>