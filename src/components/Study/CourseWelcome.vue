<template>
    <div class="main-welcome" >
      <div class="container"> 
          <div class="cource">
              <div class="row">
                <div class="col-lg-3">
                  <img class="course_photo" :src="course.photo" width="340" height="200">
                </div>
                <div class="col-lg-9">
                  <div class="row">
                    <h3 style="margin-bottom: 10px;"> {{ course.name }} </h3>
                  </div>
                  <div class="row">
                    <p> {{ course.description }} </p>
                  </div>
                  <div class="row cource_footer">
                    <div class="col-lg-3">
                      <span class="period"> {{ course.duration }} </span>
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
          </div>
        </div>
      </div>
</template>
<script>
  export default {
    props: ['course']
  }
</script>
<style scoped>
  .main-welcome {
    /* text-align: center; */
    background-color: var(--fillsprimary);
    background-image: url("../../assets/img/pattern.svg");
    border-radius: 0px 0px 80px 80px;
    padding: 40px 0;
    
  }

a:active, /* активная/посещенная ссылка */
a:hover,  /* при наведении */
a {
  text-decoration: none;
  color: #000;
}

.cource {
  padding: 20px;
  /* height: 100px; */
  margin: 50px 0px;

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