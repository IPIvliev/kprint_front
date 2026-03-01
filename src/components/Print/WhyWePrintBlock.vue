<template>
    <!-- video-->
    <div class="white_block" :class="background">
      <div class="container">
        <div class="row gy-1">
          <div class="col-lg-6">
            <h1 class="title">Почему 3D-печать заказывают у нас?</h1>
            <p class="innovation__text" style="margin-top: 30px;">
              Мы выполняем 3D-печать для прототипов, серий и индивидуальных заказов.
              Сопровождаем заявку от проверки 3D-модели до выдачи готового изделия, подбирая материал и технологию под задачу.
            </p>
          </div>
          <div class="col-lg-6" style="text-align: center;" >
            <img src="@/assets/img/whyweprint.webp" loading="lazy" decoding="async">
          </div>
        </div>
        <div class="row gy-1" style="margin-top: 30px;">
          <div class="col-lg-3">
            <article class="whywe_print_card">
              <h4 class="whywe_print_card_title">Печать под вашу задачу</h4>
              <p class="whywe_print_card_text">
                Подбираем технологию и материал под требования к точности, прочности и внешнему виду детали.
              </p>
            </article>
          </div>
          <div class="col-lg-3">
            <article class="whywe_print_card">
              <h4 class="whywe_print_card_title">Проверка модели перед запуском</h4>
              <p class="whywe_print_card_text">
                Анализируем STL-файл, предупреждаем о рисках печати и помогаем подготовить модель к производству.
              </p>
            </article>
          </div>
          <div class="col-lg-3">
            <article class="whywe_print_card">
              <h4 class="whywe_print_card_title">Прозрачный процесс в личном кабинете</h4>
              <p class="whywe_print_card_text">
                Через портал можно загрузить модель, согласовать стоимость, отследить статус и историю заказа.
              </p>
            </article>
          </div>
          <div class="col-lg-3">
            <article class="whywe_print_card">
              <h4 class="whywe_print_card_title">Доставка по РФ и самовывоз</h4>
              <p class="whywe_print_card_text">
                Организуем отправку по России, также доступен самовывоз и поддержка по заказу на каждом этапе.
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
    <!--  /video-->
</template>
<script>
export default {
  props: ['background']
}
</script>
<style scoped>
.whywe_print_card {
  position: relative;
  overflow: hidden;
  height: 100%;
  min-height: 220px;
  padding: 24px 18px;
  border: 1px solid rgba(34, 37, 45, 0.1);
  border-radius: 16px;
  background: #fff url("@/assets/img/whywe-card.png") center / cover no-repeat;
  box-shadow: 0 10px 24px rgba(34, 37, 45, 0.12);
}

.whywe_print_card::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 48px;
  height: 48px;
  background: #d83a56;
  clip-path: polygon(100% 0, 0 0, 100% 100%);
}

.whywe_print_card_title {
  margin: 0;
  color: #1f2432;
  font-size: 20px;
  font-weight: 800;
  line-height: 1.2;
}

.whywe_print_card_text {
  margin: 12px 0 0;
  color: rgba(34, 37, 45, 0.8);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
}

@media (max-width: 991px) {
  .whywe_print_card {
    min-height: 190px;
  }
}
</style>
