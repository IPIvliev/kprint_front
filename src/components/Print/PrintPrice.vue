<template>
    <!-- video-->
    <div class="white_block white_background">
      <div class="container center"> 
        <div class="row gy-1 item_center">

            <h1 class="title center">Рассчитать стоимость 3Д-печати</h1>


            <div class="print_price center">
              <i class="icon_print"></i>
              <h3>Загрузите 3Д модель</h3>
              <p class="print_p">Поддерживаемый формат – .stl</p>
              <button class="print_button btn btn--red">Рассчитать печать</button>
            </div>

        </div>
      </div>
    </div>
    <!--	/video-->
</template>
<style scoped>
.item_center {
  display:inline-block;
    text-align:center;
}

.print_price {
  margin-top:120px;
  vertical-align:middle;
  display:inline-block;

    background-color: rgba(45, 133, 233, .1);
    width: 500px;
    height: 300px;

    border-radius: 40px;
    border: 2px dashed;
    border-color: rgba(45, 133, 233, 1);
    box-shadow: 0px 8px 12px #dde2e533, -10px 34px 34px #0000000f;
    backdrop-filter: blur(8px) brightness(100%);
    -webkit-backdrop-filter: blur(8px) brightness(100%); 
}

.icon_print {
  margin-top: 50px;
  display: inline-block;
  height: 64px;
  width: 64px;
  background-image: url("@/assets/img/icon_file.png");
}

.print_p {
  color: #2a2a2bd0;
}

.print_button {
  margin-top: 20px;
}
</style>