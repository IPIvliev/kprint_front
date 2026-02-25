<template>
<!-- footer-->
<footer class="footer">
  <div class="container">
    <div class="row footer__row">
      <div class="col-xxl-6 col-lg-8">
        <div class="row">
          <div class="col-12 col-md">
            <div class="footer__logo"> <router-link to="/"><img src="../assets/img/logo_gray.png" alt=""></router-link></div>
            <div id="socialFrom">
              <div class="footer__social" id="socialReplace">
                <div class="footer__title">Подпишитесь на нас:</div>
                <ul class="footer__icons">
                  <li>
                    <a href="https://vk.com/gorky_liquid" target="_blank" rel="noopener noreferrer" aria-label="VK">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="16" fill="#EFEFF0"></circle>
                        <text x="16" y="20" text-anchor="middle" font-size="10" font-family="Arial, sans-serif" font-weight="700" fill="#232629">VK</text>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://dzen.ru/gorky_liquid" target="_blank" rel="noopener noreferrer" aria-label="Dzen">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="16" fill="#EFEFF0"></circle>
                        <text x="16" y="20" text-anchor="middle" font-size="9" font-family="Arial, sans-serif" font-weight="700" fill="#232629">DZ</text>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://ok.ru/group/70000046325756" target="_blank" rel="noopener noreferrer" aria-label="Odnoklassniki">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="16" fill="#EFEFF0"></circle>
                        <text x="16" y="20" text-anchor="middle" font-size="9" font-family="Arial, sans-serif" font-weight="700" fill="#232629">OK</text>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-12 col-md">
            <ul class="footer__list">
              <li> <router-link to="/">Главная</router-link></li>
              <li> <router-link to="/about">О проекте</router-link></li>
              <li> <router-link to="/shop">Магазин</router-link></li>
              <li> <router-link to="/it-innovations">ИТ услуги</router-link></li>
            </ul>
          </div>
          <div class="col-12 col-md">
            <ul class="footer__list">
              <li> <router-link to="/gallery">Галерея</router-link></li>
              <li> <router-link to="/news">Новости</router-link></li>
              <li> <router-link to="/">Дилеры</router-link></li>
              <li> <router-link to="/contact">Контакты</router-link></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-xxl-5 col-lg-4 offset-xxl-1 mt-2 mt-md-4 mt-lg-0">
        <div class="footer__line tablet-visible mb-2 mb-md-0"></div>
        <div class="footer__block">
          <div class="footer__title">Почта для связи с нами:</div>
          <div class="footer__link"><a :href="mainOfficeEmailHref">{{ mainOfficeEmail }}</a></div>
        </div>
        <div class="footer__block">
          <div class="footer__title">Телефон:</div>
          <div class="footer__link"> <a :href="mainOfficePhoneHref">{{ mainOfficePhone }}</a></div>
          <div class="btn btn--red modal-trigger" data-bs-toggle="modal" data-bs-target="#modalCallback">Перезвоните мне</div>
        </div>
      </div>
      <div id="socialTo"></div>
    </div>
    <div class="footer__line"></div>
    <div class="footer__bottom">
      <p>&#169; 2026, ООО "НПП "3Д Аддитивные технологии". Все права защищены.</p>
      <LegalLinksRow />
    </div>
  </div>
</footer>
<!-- /footer-->
</template>

<script>
import {
  DEFAULT_MAIN_OFFICE_EMAIL,
  DEFAULT_MAIN_OFFICE_PHONE,
  emailToMailtoHref,
  getContactOfficesData,
  phoneToTelHref
} from '@/services/contact-office.service'
import LegalLinksRow from '@/components/elements/LegalLinksRow.vue'

export default {
  components: { LegalLinksRow },
  created () {
    this.loadMainOfficePhone()
  },
  data () {
    return {
      shopMenuIsOpen: false,
      mainOfficeEmail: DEFAULT_MAIN_OFFICE_EMAIL,
      mainOfficePhone: DEFAULT_MAIN_OFFICE_PHONE
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
  methods: {
    async loadMainOfficePhone () {
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
        // keep default phone when contact offices API is unavailable
      }
    },
    openShopMenu () {
      this.shopMenuIsOpen = !this.shopMenuIsOpen
    }
  }
}
</script>
