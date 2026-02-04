<template>
    <!-- video-->
    <div class="white_block cmp-components-study-coursefeedbacks" :class="background">
      <div class="container"> 
        <div class="row gy-1">
          <div class="col-lg-4">
            <div class="feedback_video_block">
              <div class="feedback_video"><img class="feedback_video_img" src="@/assets/img/_avatar180.jpg" alt="" width="100" height="100px"></div>
              <div class="video__play">
                <svg width="26" height="38" viewBox="0 0 26 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.75293 37.5194V0.480469L25.714 18.9999L0.75293 37.5194Z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="feedback_card">
              <div class="feedback_card_header">
                <img class="feedback_card_avatar" src="@/assets/img/_avatar180.jpg" alt="" >
                <h1 class="feedback_card_title">Изя Файрман</h1>
              </div>
              <p class="feedback_card_text" style="margin-top: 30px;">
                Богатый опыт в области 3Д-печати, профессиональная команда и собственный корпоративны университет позволяют нам проводить обучение 3Д печати.
                Лицензия на предоставление образовательных услуг гарантирует, что студенты не только получат знания, но также имеют возможность получить диплом государственного образца.
              </p>
              <span class="feedback_card_more">Читать полностью...</span>
            </div>
            <div class="feedback_paggination"> 
              <span class="feedback_paggination_previos"> &lt; </span>
              <span class="feedback_paggination_item active"></span>
              <span class="feedback_paggination_item"></span>
              <span class="feedback_paggination_item"></span>
              <span class="feedback_paggination_item"></span>
              <span class="feedback_paggination_next"> > </span>
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
  props: ['background', 'feedbacks'],
}
</script>
