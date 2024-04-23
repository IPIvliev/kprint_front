<template>
    <!-- video-->
    <div class="white_block" :class="background">
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
<style scoped>
.feedback_video_block {
    background-color: var(--fillssecondary);
    overflow: hidden;
    position: relative;
    cursor: pointer;
    background-size: cover;
    background-position: center; 
}

.feedback_video {
  /* position: absolute; */
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.feedback_video_img {
  width: 100%;
  height: 80%;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: 24px;
}

.feedback_card {
  background-color: var(--fillsprimary);
  margin-left: 50px;
  padding: 30px;
  border-radius: 24px;
}

.feedback_card_header {
  vertical-align: middle;
}

.feedback_card_avatar {
  display: inline-block;
  border-radius: 30px;
  width: 64px;
  height: 64px;
  vertical-align: middle;
}

.feedback_card_title {
  margin-left: 20px;
  display: inline-block;
  vertical-align: middle;
  font-size: 48px;
  font-weight: bold;
  line-height: 60px;

}

.feedback_card_text {
    max-width: 850px;
    margin-bottom: 86px;
    font-size: 18px;
    line-height: 30px;
    color: #545555;
}

.feedback_card_more {
  color: #D83A56;
}

.feedback_paggination {
  margin: 30px 0;
  vertical-align: middle;
  text-align: center;
  
}

.feedback_paggination_previos {
  display: inline-block;
  vertical-align: middle;
  border-radius: 12px;
  padding: 10px;
  margin-right: 30px;
  background-color: var(--fillsprimary);
  color:#b6b6b6;
}

.feedback_paggination_item {
  vertical-align: middle;
  background-color: var(--fillsprimary);
  height: 20px;
  border-radius: 10px;
  width: 40px;
  display: inline-block;
  margin: 0 10px;
}

.active {
  background-color: #D83A56;
}

.feedback_paggination_next {
  vertical-align: middle;
  display: inline-block;
  margin-left: 30px;
  border-radius: 12px;
  padding: 10px;
  background-color: var(--fillsprimary);
  color:#b6b6b6;
}
</style>