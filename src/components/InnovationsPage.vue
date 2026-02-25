<template>
<div class="content">
  <section class="innovation innovation-it">
    <div class="container">
      <h1 class="title">ИТ-услуги и цифровые продукты</h1>
      <p class="innovation__text">
        ООО «НПП "3Д Аддитивные Технологии"» разрабатывает программные решения для аддитивного производства:
        от ПО для фотополимерных 3D-принтеров до отраслевого портала и сервисов интеграции.
      </p>
      <p class="innovation-it__meta">
        Информация раздела раскрывается в соответствии с Приказом Минцифры России от 2 июня 2025 г. № 511.
      </p>

      <div class="innovation-it__grid">
        <section class="innovation-it__card">
          <h2>Сведения о компании</h2>
          <dl class="innovation-it__details">
            <div>
              <dt>Полное наименование компании</dt>
              <dd>Общество с ограниченной ответственностью «НПП "3Д Аддитивные Технологии"»</dd>
            </div>
            <div>
              <dt>Юридический адрес</dt>
              <dd>603074, Нижегородская область, г. о. город Нижний Новгород, г. Нижний Новгород, ул. Маршала Воронова, д. 1Б</dd>
            </div>
            <div>
              <dt>ИНН</dt>
              <dd>5258144510</dd>
            </div>
            <div>
              <dt>ОКВЭД (основной)</dt>
              <dd>47.91.2 - Торговля розничная, осуществляемая непосредственно при помощи информационно-коммуникационной сети Интернет</dd>
            </div>
            <div>
              <dt>ОГРН</dt>
              <dd>1195275012437</dd>
            </div>
            <div>
              <dt>КПП</dt>
              <dd>525901001</dd>
            </div>
            <div>
              <dt>ОКПО</dt>
              <dd>36473855</dd>
            </div>
          </dl>
        </section>

        <section class="innovation-it__card">
          <h2>Контакты и доступность сайта</h2>
          <dl class="innovation-it__details">
            <div>
              <dt>Электронная почта</dt>
              <dd><a :href="mainOfficeEmailHref">{{ mainOfficeEmail }}</a></dd>
            </div>
            <div>
              <dt>Номер телефона</dt>
              <dd><a :href="mainOfficePhoneHref">{{ mainOfficePhone }}</a></dd>
            </div>
          </dl>
          <p class="innovation-it__note">
            Сайт и этот раздел доступны 24/7. Ознакомление с информацией открыто для любых лиц без регистрации
            и без передачи персональных данных.
          </p>
        </section>
      </div>

      <section class="innovation-it__section">
        <h2>Коды видов деятельности в области ИТ</h2>
        <ul class="innovation-it__codes">
          <li><strong>1.01</strong> Проектирование и разработка программ для ЭВМ и баз данных (включая тестирование и сопровождение).</li>
        </ul>
      </section>

      <section class="innovation-it__section">
        <h2>Описание реализуемых работ и услуг, а также стоимость</h2>
        <div class="innovation-it__table-wrap">
          <table class="innovation-it__table">
            <thead>
              <tr>
                <th>Работа/услуга</th>
                <th>Описание</th>
                <th>Стоимость</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Разработка ПО для фотополимерных 3D-принтеров</td>
                <td>Проектирование, разработка и внедрение программных модулей управления оборудованием и процессом печати.</td>
                <td>Договорная, рассчитывается по техническому заданию.</td>
              </tr>
              <tr>
                <td>Разработка отраслевого портала и веб-сервисов</td>
                <td>Создание и развитие веб-платформы для сервисов аддитивной отрасли, личных кабинетов и интеграций.</td>
                <td>Договорная, рассчитывается по техническому заданию.</td>
              </tr>
              <tr>
                <td>Интеграция и сопровождение программных продуктов</td>
                <td>Внедрение, адаптация, обновление и техническая поддержка разработанного программного обеспечения.</td>
                <td>Договорная, рассчитывается по объему работ и SLA.</td>
              </tr>
              <tr>
                <td>ПО для подбора фотополимерных материалов</td>
                <td>Разработка прикладного ПО для выбора материалов по технологическим и цветовым параметрам.</td>
                <td>Договорная, рассчитывается по техническому заданию.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="innovation-it__section">
        <h2>Дополнительные сведения в отдельных случаях</h2>
        <p class="innovation-it__note">
          Для нашей организации применимы требования о правах на ПО и базы данных, а также о технологическом стеке разработки.
        </p>

        <h3 class="innovation-it__subhead">1. Права на программы для ЭВМ и базы данных</h3>
        <ul class="innovation-it__extra">
          <li>Свидетельство о госрегистрации программы для ЭВМ № 2022668441, правообладатель: ООО «НПП "3Д Аддитивные Технологии"».</li>
          <li>Свидетельство о госрегистрации программы для ЭВМ № 2025684932, правообладатель: ООО «НПП "3Д Аддитивные Технологии"».</li>
          <li>Государственная аккредитация ИТ-организации: № 31552, решение AO-20221020-9248053450-4 от 11.11.2022.</li>
          <li>Предоставление прав на ПО осуществляется по лицензионным договорам (неисключительная лицензия), а также в формате SaaS/доступа к сервису по договору.</li>
        </ul>

        <h3 class="innovation-it__subhead">2. Языки программирования и применяемое ПО</h3>
        <ul class="innovation-it__extra">
          <li>Frontend: Vue.js, JavaScript/TypeScript, HTML, CSS/Sass.</li>
          <li>Backend и сервисы: Python, Golang, FastAPI/Django, REST API.</li>
          <li>Смарт-контракты: Solidity (EVM-совместимые сети), инструменты сборки и аудита контрактов.</li>
          <li>Компьютерное зрение и ML: YOLO, OpenCV, Python-экосистема для задач распознавания и классификации.</li>
          <li>Данные и инфраструктура: PostgreSQL, Redis, Docker, Nginx, GitLab CI/CD.</li>
        </ul>
      </section>

      <section class="innovation-it__section innovation-it__docs">
        <h2>Документы</h2>
        <p class="innovation-it__note">
          Для публичного ознакомления размещены подтверждающие документы по аккредитации и программным продуктам.
        </p>
        <div class="innovation-it__docs-grid">
          <article v-for="doc in documents" :key="doc.id" class="innovation-it__doc">
            <div class="innovation-it__doc-preview" :class="{ 'innovation-it__doc-preview--image': Boolean(doc.preview) }">
              <img v-if="doc.preview" :src="doc.preview" :alt="doc.title">
              <div v-else class="innovation-it__doc-file">{{ doc.badge }}</div>
              <span class="innovation-it__doc-badge">{{ doc.badge }}</span>
            </div>
            <h3>{{ doc.title }}</h3>
            <p>{{ doc.description }}</p>
            <div class="innovation-it__doc-actions">
              <a :href="doc.file" target="_blank" rel="noopener noreferrer">Открыть</a>
              <a :href="doc.file" :download="doc.downloadName">Скачать</a>
            </div>
          </article>
        </div>
      </section>
    </div>
  </section>

  <callback-window />
</div>
</template>

<script>
import CallbackWindow from './elements/CallbackWindow.vue'
import {
  DEFAULT_MAIN_OFFICE_EMAIL,
  DEFAULT_MAIN_OFFICE_PHONE,
  emailToMailtoHref,
  getContactOfficesData,
  phoneToTelHref
} from '@/services/contact-office.service'

export default {
  name: 'InnovationsPage',
  components: { CallbackWindow },
  data () {
    return {
      mainOfficeEmail: DEFAULT_MAIN_OFFICE_EMAIL,
      mainOfficePhone: DEFAULT_MAIN_OFFICE_PHONE,
      documents: [
        {
          id: 'software-2025684932',
          title: 'Свидетельство о регистрации ПО № 2025684932',
          description: 'Программа для ЭВМ. Формат предоставления прав: лицензионный договор / SaaS.',
          file: '/docs/software-certificate-2025684932.pdf',
          downloadName: 'software-certificate-2025684932.pdf',
          preview: '',
          badge: 'PDF'
        },
        {
          id: 'it-accreditation',
          title: 'Выписка об ИТ-аккредитации',
          description: 'Решение AO-20221020-9248053450-4, № в реестре 31552.',
          file: '/docs/it-accreditation-mincifry-ao-20221020-9248053450-4.pdf',
          downloadName: 'it-accreditation-mincifry-ao-20221020-9248053450-4.pdf',
          preview: '',
          badge: 'PDF'
        },
        {
          id: 'software-2022668441',
          title: 'Свидетельство о регистрации ПО № 2022668441',
          description: 'Скан свидетельства о госрегистрации программы для ЭВМ.',
          file: '/docs/software-certificate-2022668441.png',
          downloadName: 'software-certificate-2022668441.png',
          preview: '/docs/software-certificate-2022668441.png',
          badge: 'PNG'
        }
      ]
    }
  },
  computed: {
    mainOfficeEmailHref () {
      return emailToMailtoHref(this.mainOfficeEmail)
    },
    mainOfficePhoneHref () {
      return phoneToTelHref(this.mainOfficePhone)
    }
  },
  created () {
    this.loadContacts()
  },
  methods: {
    async loadContacts () {
      try {
        const payload = await getContactOfficesData()
        const email = String(payload?.main_office_email || '').trim()
        const phone = String(payload?.main_office_phone || '').trim()
        if (email) {
          this.mainOfficeEmail = email
        }
        if (phone) {
          this.mainOfficePhone = phone
        }
      } catch (error) {
        // keep defaults when contact offices API is unavailable
      }
    }
  }
}
</script>

<style scoped>
.innovation-it {
  padding-top: 42px;
  padding-bottom: 42px;
}

.innovation-it__meta {
  margin-top: 14px;
  color: #596066;
  font-size: 15px;
  line-height: 1.5;
}

.innovation-it__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-top: 28px;
}

.innovation-it__card {
  border-radius: 16px;
  background: #f6f7f8;
  border: 1px solid #e2e5e7;
  padding: 22px;
}

.innovation-it__card h2,
.innovation-it__section h2 {
  margin: 0;
  font-size: 26px;
  line-height: 1.25;
  font-weight: 700;
}

.innovation-it__details {
  margin: 18px 0 0;
}

.innovation-it__details div + div {
  margin-top: 12px;
}

.innovation-it__details dt {
  color: #596066;
  font-size: 14px;
  line-height: 1.4;
}

.innovation-it__details dd {
  margin: 4px 0 0;
  font-size: 16px;
  line-height: 1.5;
}

.innovation-it__details a {
  color: inherit;
  text-decoration: underline;
}

.innovation-it__section {
  margin-top: 28px;
}

.innovation-it__codes,
.innovation-it__extra {
  margin: 14px 0 0;
  padding-left: 20px;
}

.innovation-it__codes li,
.innovation-it__extra li {
  font-size: 16px;
  line-height: 1.55;
}

.innovation-it__note {
  margin: 16px 0 0;
  color: #565c62;
  font-size: 15px;
  line-height: 1.5;
}

.innovation-it__subhead {
  margin: 18px 0 0;
  font-size: 20px;
  line-height: 1.35;
  font-weight: 700;
}

.innovation-it__docs-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.innovation-it__doc {
  border: 1px solid #dfe3e6;
  border-radius: 14px;
  background: #fafbfb;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.innovation-it__doc-preview {
  position: relative;
  border-radius: 10px;
  background: linear-gradient(135deg, #eceff1, #f8f9fa);
  height: 190px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.innovation-it__doc-preview--image {
  background: #f1f3f4;
}

.innovation-it__doc-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.innovation-it__doc-file {
  font-size: 34px;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #2c3033;
}

.innovation-it__doc-badge {
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 5px 8px;
  border-radius: 8px;
  background: #111;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
}

.innovation-it__doc h3 {
  margin: 12px 0 0;
  font-size: 17px;
  line-height: 1.4;
}

.innovation-it__doc p {
  margin: 10px 0 0;
  color: #565c62;
  font-size: 14px;
  line-height: 1.5;
}

.innovation-it__doc-actions {
  display: flex;
  gap: 10px;
  margin-top: 14px;
}

.innovation-it__doc a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid #d0d4d7;
  background: #fff;
  color: #111;
  text-decoration: none;
  font-size: 14px;
  line-height: 1.4;
}

.innovation-it__doc-actions a:last-child {
  background: #111;
  border-color: #111;
  color: #fff;
}
.innovation-it__table-wrap {
  overflow-x: auto;
  margin-top: 16px;
}

.innovation-it__table {
  width: 100%;
  min-width: 760px;
  border-collapse: collapse;
}

.innovation-it__table th,
.innovation-it__table td {
  border: 1px solid #dfe3e6;
  padding: 12px;
  text-align: left;
  vertical-align: top;
  font-size: 15px;
  line-height: 1.5;
}

.innovation-it__table th {
  background: #f3f5f6;
  font-weight: 700;
}

@media (max-width: 991.98px) {
  .innovation-it__grid {
    grid-template-columns: 1fr;
  }

  .innovation-it__card h2,
  .innovation-it__section h2 {
    font-size: 22px;
  }

  .innovation-it__docs-grid {
    grid-template-columns: 1fr;
  }
}
</style>

