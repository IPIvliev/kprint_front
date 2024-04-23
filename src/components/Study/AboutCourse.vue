<template>
    <!-- video-->
    <div class="white_block" :class="background">
      <div class="container"> 
        <div class="row gy-1">
          <div class="col-lg-8">
            <h1 class="title">{{ course.name }}</h1>
            <p class="innovation__text" style="margin-top: 30px;">
              {{ course.description }}
            </p>
          </div>
          <div class="col-lg-4" style="text-align: center;" >
            <img :src="course.photo" class="about_photo" width="500" height="400">
          </div>
        </div>
      </div>
    </div>
    <!--	/video-->
</template>
<script>
export default {
  props: ['background', 'course'],
}
</script>
<style scoped>
.about_photo {
  border-radius: 40px;
  object-fit: cover;
  object-position: 50% 50%;
}
</style>