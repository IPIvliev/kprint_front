<template>
  <div class="main-welcome cmp-components-study-coursewelcome" >
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
