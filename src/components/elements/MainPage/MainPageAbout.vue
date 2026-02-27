<template>
  <div class="about about-company">
    <div class="container">
      <div class="row g-4">
        <div class="col-xxl-5 col-lg-6">
          <div id="aboutBlockFrom">
            <div class="about__blockrow" id="aboutBlockReplace">
              <div class="about__block about__block--1 about-company__fact">
                <div class="about__blcoktitle"><span>С 2019</span></div>
                <div class="about__blocktext">
                  ООО «НПП "3Д Аддитивные Технологии"» развивает решения для аддитивной отрасли.
                </div>
              </div>
              <div class="about__block about__block--2 about-company__fact">
                <div class="about__blcoktitle"><span>НИОКР</span></div>
                <div class="about__blocktext">
                  Исследуем аддитивные технологии и внедряем результаты.
                </div>
              </div>
              <div class="about__block about__block--3 about-company__fact">
                <div class="about__blcoktitle"><span>Производство</span></div>
                <div class="about__blocktext">
                  Собственное производство материалов и сервисный контур изготовления изделий.
                </div>
              </div>
              <div class="about__block about__block--4 about-company__fact">
                <div class="about__blcoktitle"><span>Интеллектуальная собственность</span></div>
                <div class="about__blocktext">
                  Сертификаты на программное обеспечение и патенты в области аддитивных технологий.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xxl-6 col-lg-6">
          <h2 class="about__title">Исследования, разработка и производство в едином контуре</h2>
          <div id="aboutBlockTo"></div>
          <div class="about__text">
            Мы работаем на стыке инженерии, материаловедения и программной разработки. Выполняем полный цикл:
            от прикладных исследований и создания ПО до производства материалов и выпуска изделий под заказ.
          </div>
          <div class="about__items">
            <div class="about__itemsrow">
              <div class="about__item">
                <div class="about__icon"><img src="img/tooth.svg" alt=""></div>
                <div class="about__itemtitle">Разработка ПО для аддитивных технологий</div>
                <div class="about__itemtext">ИТ-услуги и прикладные программные решения для оборудования, материалов и производственных процессов.</div>
              </div>
              <div class="about__item">
                <div class="about__icon"><img src="img/car.svg" alt=""></div>
                <div class="about__itemtitle">Собственное производство фотополимерных материалов и филамента</div>
                <div class="about__itemtext">Собственное производство фотополимерных материалов и филамента для 3D-печати.</div>
              </div>
              <div class="about__item">
                <div class="about__icon"><img src="img/box.svg" alt=""></div>
                <div class="about__itemtitle">Ферма 3D-принтеров для изделий под заказ</div>
                <div class="about__itemtext">Изготавливаем прототипы и функциональные изделия по требованиям заказчика.</div>
              </div>
              <div class="about__item">
                <div class="about__icon"><img src="img/design.svg" alt=""></div>
                <div class="about__itemtitle">Обучение 3D-печати и 3D-сканированию</div>
                <div class="about__itemtext">Проводим обучение для специалистов, производственных команд и образовательных программ.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showExtended" class="about-company__cases">
        <h3 class="about-company__cases-title">Ключевые программные разработки</h3>
        <div class="about-company__cases-grid">
          <article class="about-company__case">
            <h4>ПО для высокоскоростного фотополимерного 3D-принтера</h4>
            <p>Собственная разработка программного контура управления оборудованием и производственным процессом.</p>
          </article>
          <article class="about-company__case">
            <h4>Отраслевой портал для аддитивных технологий</h4>
            <p>Единая цифровая точка для сервисов, взаимодействия с клиентами и развития экосистемы решений.</p>
          </article>
          <article class="about-company__case">
            <h4>ПО для подбора фотополимерных материалов по матрице цветов лица пациента</h4>
            <p>Решение для задач протезирования, где важна точность цвета и повторяемость технологического результата.</p>
          </article>
        </div>
      </div>

      <div v-if="showExtended" class="about-company__timeline">
        <h3 class="about-company__timeline-title">Как мы развиваем направление с 2019 года</h3>
        <div class="about-company__timeline-list">
          <article class="about-company__timeline-item">
            <div class="about-company__timeline-year">2019</div>
            <h4>Создание компании и проведение исследований</h4>
            <p>Запуск компании и старт прикладных исследований в области аддитивных технологий.</p>
          </article>
          <article class="about-company__timeline-item">
            <div class="about-company__timeline-year">2020</div>
            <h4>Старт производства фотополимерных смол</h4>
            <p>Начато серийное производство более 20 видов фотополимерных смол.</p>
          </article>
          <article class="about-company__timeline-item">
            <div class="about-company__timeline-year">2021</div>
            <h4>Товарный знак Gorky Liquid и стоматологические смолы</h4>
            <p>Зарегистрирован товарный знак Gorky Liquid, начата разработка и производство стоматологических смол.</p>
          </article>
          <article class="about-company__timeline-item">
            <div class="about-company__timeline-year">2022</div>
            <h4>Принтер, программные продукты и статус ИТ-компании</h4>
            <p>Разработан фотополимерный принтер, начата разработка программных продуктов, компания включена в реестр ИТ-компаний.</p>
          </article>
          <article class="about-company__timeline-item">
            <div class="about-company__timeline-year">2023</div>
            <h4>Сертификат российского происхождения продукции</h4>
            <p>Получен сертификат о российском происхождении выпускаемой продукции.</p>
          </article>
          <article class="about-company__timeline-item">
            <div class="about-company__timeline-year">2024</div>
            <h4>Медицинское регистрационное удостоверение</h4>
            <p>Получено медицинское регистрационное удостоверение на стоматологические материалы.</p>
          </article>
          <article class="about-company__timeline-item">
            <div class="about-company__timeline-year">2025</div>
            <h4>Развитие оборудования и запуск филамента</h4>
            <p>Продолжена разработка фотополимерного принтера и запущено производство филамента.</p>
          </article>
          <article class="about-company__timeline-item">
            <div class="about-company__timeline-year">2026</div>
            <h4>Запуск виртуального портала</h4>
            <p>Запущен виртуальный портал в области аддитивных технологий.</p>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    background: {
      type: String,
      default: ''
    },
    showExtended: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.about-company__fact {
  min-height: 160px;
}

.about-company__cases {
  margin-top: 64px;
  border-top: 1px solid #d7d9da;
  padding-top: 38px;
}

.about-company__cases-title {
  margin: 0 0 24px;
  font-size: 30px;
  line-height: 1.2;
  font-weight: 700;
}

.about-company__cases-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.about-company__case {
  border-radius: 16px;
  background: #f3f4f4;
  padding: 24px;
}

.about-company__case h4 {
  margin: 0;
  font-size: 18px;
  line-height: 1.35;
  font-weight: 700;
}

.about-company__case p {
  margin: 12px 0 0;
  font-size: 15px;
  line-height: 1.55;
  color: #56595a;
}

.about-company__timeline {
  margin-top: 36px;
}

.about-company__timeline-title {
  margin: 0 0 22px;
  font-size: 30px;
  line-height: 1.2;
  font-weight: 700;
}

.about-company__timeline-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.about-company__timeline-item {
  border-radius: 16px;
  background: #fafafa;
  border: 1px solid #e3e6e6;
  padding: 20px;
}

.about-company__timeline-year {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  background: #d83a56;
  color: #fff;
  font-size: 13px;
  line-height: 1;
  font-weight: 700;
}

.about-company__timeline-item h4 {
  margin: 14px 0 0;
  font-size: 18px;
  line-height: 1.35;
  font-weight: 700;
}

.about-company__timeline-item p {
  margin: 10px 0 0;
  color: #595d60;
  font-size: 15px;
  line-height: 1.5;
}

@media (max-width: 1199.98px) {
  .about-company__cases-grid {
    grid-template-columns: 1fr 1fr;
  }

  .about-company__cases-title {
    font-size: 27px;
  }

  .about-company__timeline-title {
    font-size: 27px;
  }

  .about-company__timeline-list {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 767.98px) {
  .about-company__cases {
    margin-top: 44px;
    padding-top: 28px;
  }

  .about-company__cases-grid {
    grid-template-columns: 1fr;
  }

  .about-company__cases-title {
    font-size: 23px;
  }

  .about-company__timeline {
    margin-top: 28px;
  }

  .about-company__timeline-title {
    font-size: 23px;
  }

  .about-company__timeline-list {
    grid-template-columns: 1fr;
  }
}
</style>
