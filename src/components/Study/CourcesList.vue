<template>
    <!-- video-->
    <div class="white_block gray_background">
      <div class="container"> 
        <h1 class="title">Список курсов</h1>
        
          <div class="cource" v-for="course in CoursesList">
            <router-link :to="{path: '/study/course/' + course.id }">
              <div class="row">
                <div class="col-lg-3">
                  <img class="course_photo" :src="course.photo" width="340" height="200">
                </div>
                <div class="col-lg-9">
                  <div class="row">
                    <h3 style="margin-bottom: 10px;">{{ course.name }}</h3>
                  </div>
                  <div class="row">
                    <p>{{ course.description }}</p>
                  </div>
                  <div class="row cource_footer">
                    <div class="col-lg-3">
                      <span class="period">{{ course.duration }}</span>
                    </div>
                    
                    <div class="col-lg-9">
                      <p>
                        {{ course.lessons_number }} уроков 
                        <img class="icon-ellipse" src="@/assets/img/Ellipse.svg" /> 
                        {{ course.teachers_number }} преподавателя 
                        <img class="icon-ellipse" src="@/assets/img/Ellipse.svg" />
                        20 часов</p>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        

      </div>
    </div>
    <!--	/video-->
</template>
<script>
  export default {
    computed: {
        CoursesList () {
            return this.$store.state.study.courses
        },  
    }  
  }
</script>
<style scoped>
a:active, /* активная/посещенная ссылка */
a:hover,  /* при наведении */
a {
  text-decoration: none;
  color: #000;
}

.cource {
  padding: 20px;
  /* height: 100px; */
  margin: 50px 0;
  background-color: #fff;
  border-radius: 40px;
  border: 1px solid;
  border-color: #ffffff;
  box-shadow: 0px 8px 12px #dde2e533, -10px 34px 34px #0000000f;
  backdrop-filter: blur(8px) brightness(100%);
  -webkit-backdrop-filter: blur(8px) brightness(100%); 
}

.course_photo {
  border-radius: 40px;
  object-fit: cover;
  object-position: 50% 50%;
}

.period {
  color: #1D6E2F;
  font-weight: 800;
  padding: 10px;
  background-color: #EFF8F0;
  border-radius: 20px;
  /* border: 1px solid; */
  /* border-color: #ffffff; */
  /* box-shadow: 0px 8px 12px #dde2e533, -10px 34px 34px #0000000f; */
  /* backdrop-filter: blur(8px) brightness(100%); */
  /* -webkit-backdrop-filter: blur(8px) brightness(100%);  */
}

.icon-ellipse {
  width: 10px;
  margin: 0 10px;
}

.cource_footer {
  margin-top: 30px;
}
</style>