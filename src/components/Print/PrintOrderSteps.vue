<template>
    <!-- video-->
    <div class="white_block white_background">
      <div class="container"> 
        <h1 class="title">Как происходит заказ на 3Д печать</h1>
        <div class="row gy-1" style="margin-top: 30px;">
          
          <div class="col-lg-3">
            <div class="print_order_step">
              <div class="step_window">
                <img class="step_window_img" src="@/assets/img/step_print_1.png">
                <span class="step_window_text">ШАГ 1</span>
              </div>
              <p class="step_text">Загружайте модель на сайт</p>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="print_order_step">
              <div class="step_window">
                <img class="step_window_img" src="@/assets/img/step_print_2.png">
                <span class="step_window_text">ШАГ 2</span>
              </div>
              <p class="step_text">Загружайте модель на сайт</p>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="print_order_step">
              <div class="step_window">
                <img class="step_window_img" src="@/assets/img/step_print_3.png">
                <span class="step_window_text">ШАГ 3</span>
              </div>
              <p class="step_text">Загружайте модель на сайт</p>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="print_order_step">
              <div class="step_window">
                <img class="step_window_img" src="@/assets/img/step_print_4.png">
                <span class="step_window_text">ШАГ 4</span>
              </div>
              <p class="step_text">Загружайте модель на сайт</p>
            </div>
          </div>
        </div>
        <div class="row gy-1" style="margin-top: 30px;">
          
          <div class="col-lg-3">
            <div class="print_order_step">
              <div class="step_window">
                <img class="step_window_img" src="@/assets/img/step_print_5.png">
                <span class="step_window_text">ШАГ 4</span>
              </div>
              <p class="step_text">Загружайте модель на сайт</p>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="print_order_step">
              <div class="step_window">
                <img class="step_window_img" src="@/assets/img/step_print_6.png">
                <span class="step_window_text">ШАГ 4</span>
              </div>
              <p class="step_text">Загружайте модель на сайт</p>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="print_order_step">
              <div class="step_window">
                <img class="step_window_img" src="@/assets/img/step_print_7.png">
                <span class="step_window_text">ШАГ 4</span>
              </div>
              <p class="step_text">Загружайте модель на сайт</p>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="print_order_step">
              <div class="step_window">
                <img class="step_window_img" src="@/assets/img/step_print_8.png">
                <span class="step_window_text">ШАГ 4</span>
              </div>
              <p class="step_text">Загружайте модель на сайт</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--	/video-->
</template>
<style scoped>
.print_order_step {
  height: 390px;
  width: 380px;
  background: url("@/assets/img/print_order_card.png") center / 360px no-repeat;
  align-items: center;

  display:inline-block;
    text-align:center;
}

.step_window {
  text-align:center;
  vertical-align:middle;
  display:inline-block;
  height: 180px;
  width: 80%;
  background-color: #fff;
  margin-left: -5%;
  margin-top: 10%;
  border-radius: 10px;
  /* border:  solid; */
  /* border-color: rgba(45, 133, 233, 1); */
  /* box-shadow: 0px 8px 12px #dde2e533, -10px 34px 34px #0000000f;
  backdrop-filter: blur(8px) brightness(100%);
  -webkit-backdrop-filter: blur(8px) brightness(100%);  */
}

.step_window_img {
  vertical-align: middle;
  display:inline-block;
  margin-top: 40px;
}

.step_window_text {
  margin-top: 135px;
  margin-left: -180px;
  height: 25px;
  width: 60px;
  font-size: small;
  font-weight: 800;
  color: rgba(216, 58, 86, 1);
  position: absolute;
  background-color: rgba(255, 233, 237, 1);
  border-radius: 10px;
  padding-top: 3px;
  /* border:  solid;
  border-color: rgba(45, 133, 233, 1);
  box-shadow: 0px 8px 12px #dde2e533, -10px 34px 34px #0000000f;
  backdrop-filter: blur(8px) brightness(100%);
  -webkit-backdrop-filter: blur(8px) brightness(100%); */
}

.step_text {
  vertical-align: middle;
  display:inline-block;
  width: 80%;
  margin-top: 10px;
}
</style>