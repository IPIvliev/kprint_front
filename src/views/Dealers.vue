<template>
<div class="page">
  <header-block />

  <div class="content">
    <section class="dealers-hero">
      <div class="container">
        <div class="dealers-hero__badge">Партнерство и дилерская сеть</div>
        <h1 class="dealers-hero__title">Сотрудничество в аддитивных технологиях</h1>
        <p class="dealers-hero__lead">
          Мы динамично развивающаяся компания, открытая к разным форматам сотрудничества:
          от разработки и внедрения решений до поставок материалов и обучения персонала.
        </p>
        <div class="dealers-hero__chips">
          <span>Собственные разработки</span>
          <span>Производство материалов</span>
          <span>Оптовые поставки</span>
          <span>Обучение и экспертиза</span>
        </div>
      </div>
    </section>

    <section class="dealers-section">
      <div class="container">
        <h2 class="dealers-section__title">Что мы можем сделать для партнера</h2>
        <div class="dealers-grid">
          <article class="dealers-card">
            <h3>Разработка ПО под задачу</h3>
            <p>
              Создаем программное обеспечение любой сложности, включая решения с использованием
              компьютерного зрения и нейросетей в области аддитивных технологий.
            </p>
          </article>
          <article class="dealers-card">
            <h3>Материалы с заданными свойствами</h3>
            <p>
              Разрабатываем и производим фотополимерную смолу или филамент с нужными заказчику
              параметрами под технологию и изделие.
            </p>
          </article>
          <article class="dealers-card">
            <h3>Оптовые поставки и сбыт</h3>
            <p>
              Постоянно расширяем каналы сбыта и готовы предложить конкурентные оптовые цены
              на нашу продукцию для региональных и отраслевых партнеров.
            </p>
          </article>
          <article class="dealers-card">
            <h3>Обучение сотрудников</h3>
            <p>
              Проводим обучение сотрудников заказчика: от базовой подготовки до прикладных
              программ по применению аддитивных технологий на производстве.
            </p>
          </article>
          <article class="dealers-card">
            <h3>Консалтинг и внедрение</h3>
            <p>
              Оказываем консультационные услуги и выступаем экспертами по внедрению
              аддитивных технологий в действующие производственные процессы, а также можем
              выступить в качестве экспертов по внедрению аддитивных технологий.
            </p>
          </article>
          <article class="dealers-card">
            <h3>Пилотные и R&amp;D проекты</h3>
            <p>
              Помогаем проверить гипотезы на пилоте: подбираем технологию, материал,
              экономическую модель и масштабируем решение после валидации.
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="dealers-section dealers-section--alt">
      <div class="container">
        <h2 class="dealers-section__title">Форматы сотрудничества</h2>
        <div class="dealers-columns">
          <div class="dealers-list-card">
            <h3>Для дилеров и дистрибьюторов</h3>
            <ul>
              <li>Оптовые прайсы и гибкая политика поставок.</li>
              <li>Поддержка при запуске продаж и обучении команды.</li>
              <li>Совместные активности для развития регионального спроса.</li>
            </ul>
          </div>
          <div class="dealers-list-card">
            <h3>Для производственных компаний</h3>
            <ul>
              <li>Подбор и внедрение аддитивных технологий под задачи цеха.</li>
              <li>Разработка ПО, интеграция и автоматизация рабочих процессов.</li>
              <li>Экспертная поддержка на этапе внедрения и масштабирования.</li>
            </ul>
          </div>
        </div>

        <div class="dealers-steps">
          <div class="dealers-step">
            <span>01</span>
            <p>Формируем цели проекта и требования к результату.</p>
          </div>
          <div class="dealers-step">
            <span>02</span>
            <p>Предлагаем технологическую схему, материалы и экономику.</p>
          </div>
          <div class="dealers-step">
            <span>03</span>
            <p>Запускаем пилот или поставку и проверяем KPI на практике.</p>
          </div>
          <div class="dealers-step">
            <span>04</span>
            <p>Масштабируем решение и сопровождаем операционную работу.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="dealers-cta">
      <div class="container">
        <h2>Открыты к новым партнерам</h2>
        <p>
          Если вы ищете надежного технологического партнера в области аддитивного производства,
          обсудим задачу и подготовим рабочее предложение по сотрудничеству.
        </p>
        <div class="dealers-cta__actions">
          <router-link to="/contact" class="btn btn--red">Обсудить сотрудничество</router-link>
          <router-link to="/it-innovations" class="btn btn--grayborder">Наши ИТ-компетенции</router-link>
        </div>
      </div>
    </section>

    <partners-block
      title="Наши дилеры"
      category="dealers"
      fallback-category-title="Наши дилеры"
      :fallback-to-all="true"
    />

    <callback-window />
  </div>

  <footer-block />
</div>
</template>

<script>
import HeaderBlock from '@/components/HeaderBlock.vue'
import FooterBlock from '@/components/FooterBlock.vue'
import CallbackWindow from '@/components/elements/CallbackWindow.vue'
import PartnersBlock from '@/components/elements/PartnersBlock.vue'

export default {
  name: 'DealersPageView',
  components: {
    FooterBlock,
    HeaderBlock,
    CallbackWindow,
    PartnersBlock
  }
}
</script>

<style scoped>
.dealers-hero {
  position: relative;
  overflow: hidden;
  padding: 96px 0 56px;
  background: linear-gradient(180deg, #ffffff 0%, #fcfcfd 100%);
}

.dealers-hero::before {
  content: '';
  position: absolute;
  right: -130px;
  top: -90px;
  width: 420px;
  height: 420px;
  border-radius: 999px;
  border: 1px solid rgba(216, 58, 86, 0.18);
  background: transparent;
  pointer-events: none;
}

.dealers-hero::after {
  content: none;
}

.dealers-hero .container {
  position: relative;
  z-index: 1;
}

.dealers-hero__badge {
  display: inline-flex;
  align-items: center;
  padding: 10px 16px;
  margin-bottom: 22px;
  border-radius: 6px;
  border: 1px solid rgba(216, 58, 86, 0.22);
  background: rgba(216, 58, 86, 0.04);
  color: #aa3249;
  font-size: 14px;
  line-height: 1;
  font-weight: 700;
}

.dealers-hero__title {
  margin: 0;
  max-width: 920px;
  font-size: 56px;
  line-height: 1.15;
  color: #1f1f21;
}

.dealers-hero__lead {
  margin: 24px 0 0;
  max-width: 860px;
  font-size: 22px;
  line-height: 1.62;
  color: #4f5254;
}

.dealers-hero__chips {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.dealers-hero__chips span {
  padding: 10px 14px;
  border-radius: 6px;
  border: 1px solid #e6e7ea;
  background: #ffffff;
  color: #3a3f41;
  font-size: 15px;
  line-height: 1.2;
}

.dealers-section {
  position: relative;
  padding: 42px 0;
}

.dealers-section--alt {
  margin: 0;
  padding-top: 34px;
  padding-bottom: 50px;
  background: #fff;
  border-top: 1px solid #eff0f2;
  border-bottom: 1px solid #eff0f2;
}

.dealers-section__title {
  position: relative;
  margin: 0 0 26px;
  padding-left: 18px;
  font-size: 40px;
  line-height: 1.25;
  color: #202123;
}

.dealers-section__title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 4px;
  height: calc(100% - 14px);
  border-radius: 4px;
  background: #d83a56;
}

.dealers-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.dealers-card {
  position: relative;
  padding: 24px 24px 22px;
  border: 1px solid #e3e4e7;
  border-radius: 12px;
  background: #fff;
  border-top: 2px solid #d83a56;
  box-shadow: none;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.dealers-card h3 {
  margin: 0 0 12px;
  font-size: 24px;
  line-height: 1.3;
  color: #202123;
}

.dealers-card p {
  margin: 0;
  color: #4f5254;
  font-size: 17px;
  line-height: 1.68;
}

.dealers-card:hover {
  border-color: #d8dbe0;
  background: #fcfcfd;
}

.dealers-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.dealers-list-card {
  position: relative;
  padding: 22px 24px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #e3e4e7;
  border-top: 2px solid #d83a56;
  box-shadow: none;
}

.dealers-list-card::before {
  content: none;
}

.dealers-list-card h3 {
  margin: 0 0 14px;
  font-size: 24px;
  line-height: 1.3;
  color: #232527;
}

.dealers-list-card ul {
  margin: 0;
  padding-left: 20px;
  display: grid;
  gap: 10px;
}

.dealers-list-card li {
  color: #4f5254;
  font-size: 17px;
  line-height: 1.6;
}

.dealers-steps {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.dealers-step {
  border-radius: 12px;
  border: 1px solid #e3e4e7;
  padding: 16px;
  background: #fff;
  box-shadow: none;
}

.dealers-step span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 8px;
  background: #d83a56;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
}

.dealers-step p {
  margin: 0;
  color: #505456;
  font-size: 16px;
  line-height: 1.6;
}

.dealers-cta {
  position: relative;
  padding: 44px 0 54px;
}

.dealers-cta .container {
  position: relative;
  padding: 34px 32px;
  border: 1px solid #e3e4e7;
  border-left: 4px solid #d83a56;
  border-radius: 12px;
  background: #fff;
  box-shadow: none;
}

.dealers-cta h2 {
  margin: 0;
  font-size: 40px;
  line-height: 1.2;
  color: #202123;
}

.dealers-cta p {
  margin: 16px 0 0;
  max-width: 820px;
  color: #4f5254;
  font-size: 20px;
  line-height: 1.6;
}

.dealers-cta__actions {
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

@media (max-width: 1199.98px) {
  .dealers-hero__title {
    font-size: 50px;
  }

  .dealers-hero__lead {
    font-size: 20px;
  }

  .dealers-section__title {
    font-size: 36px;
  }

  .dealers-card h3,
  .dealers-list-card h3 {
    font-size: 22px;
  }

  .dealers-card p,
  .dealers-list-card li,
  .dealers-step p {
    font-size: 16px;
  }

  .dealers-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .dealers-steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 991.98px) {
  .dealers-hero {
    padding: 72px 0 40px;
  }

  .dealers-hero::before {
    right: -190px;
    top: -120px;
  }

  .dealers-hero__title {
    font-size: 42px;
  }

  .dealers-hero__lead {
    font-size: 18px;
  }

  .dealers-section__title {
    font-size: 32px;
  }

  .dealers-cta h2 {
    font-size: 34px;
  }

  .dealers-cta p {
    font-size: 18px;
  }

  .dealers-columns {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 767.98px) {
  .dealers-hero {
    padding-top: 62px;
  }

  .dealers-hero__title {
    font-size: 34px;
  }

  .dealers-hero__lead {
    font-size: 17px;
    line-height: 1.58;
  }

  .dealers-hero__chips span {
    font-size: 14px;
  }

  .dealers-grid,
  .dealers-steps {
    grid-template-columns: 1fr;
  }

  .dealers-section__title,
  .dealers-cta h2 {
    font-size: 30px;
  }

  .dealers-section__title {
    padding-left: 14px;
  }

  .dealers-section__title::before {
    top: 6px;
    width: 4px;
    height: calc(100% - 12px);
  }

  .dealers-card h3,
  .dealers-list-card h3 {
    font-size: 22px;
  }

  .dealers-card p,
  .dealers-list-card li,
  .dealers-step p,
  .dealers-cta p {
    font-size: 17px;
  }

  .dealers-cta .container {
    padding: 28px 20px;
    border-radius: 10px;
  }
}
</style>
