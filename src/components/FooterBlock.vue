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
                  <li> <a href="#">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM17.6677 16.7028V25.4076H14.0661V16.7031H12.2667V13.7034H14.0661V11.9024C14.0661 9.45519 15.0821 8 17.9688 8H20.3721V11.0001H18.8699C17.7462 11.0001 17.6718 11.4193 17.6718 12.2017L17.6677 13.7031H20.3891L20.0707 16.7028H17.6677Z"></path>
                      </svg></a></li>
                  <li> <a href="#">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM17.3027 21.0508C17.1449 21.2171 16.8369 21.2507 16.8369 21.2507H15.8169C15.8169 21.2507 13.5665 21.3835 11.584 19.358C9.42202 17.1481 7.51299 12.7637 7.51299 12.7637C7.51299 12.7637 7.4028 12.4761 7.52217 12.3376C7.65656 12.1811 8.02301 12.1713 8.02301 12.1713L10.4613 12.1557C10.4613 12.1557 10.6908 12.1926 10.8553 12.3114C10.9913 12.4097 11.0673 12.5924 11.0673 12.5924C11.0673 12.5924 11.4613 13.5708 11.983 14.4557C13.0022 16.1837 13.4763 16.5615 13.8219 16.3763C14.3261 16.1067 14.175 13.9338 14.175 13.9338C14.175 13.9338 14.1842 13.1455 13.9212 12.794C13.7175 12.522 13.3336 12.4425 13.1641 12.4204C13.0264 12.4024 13.2518 12.0894 13.5439 11.9492C13.983 11.7387 14.7576 11.7264 15.6733 11.7354C16.387 11.7428 16.5924 11.7862 16.8712 11.8526C17.5182 12.0058 17.498 12.497 17.4544 13.5571C17.4414 13.8742 17.4263 14.2421 17.4263 14.6671C17.4263 14.7626 17.4234 14.8644 17.4205 14.9691C17.4054 15.5122 17.388 16.1342 17.7526 16.3656C17.9396 16.4836 18.3962 16.3828 19.539 14.4786C20.0807 13.5757 20.4864 12.5146 20.4864 12.5146C20.4864 12.5146 20.5757 12.3253 20.7134 12.2442C20.8545 12.1615 21.0448 12.1869 21.0448 12.1869L23.6108 12.1713C23.6108 12.1713 24.3821 12.0803 24.5064 12.4228C24.6375 12.7809 24.2185 13.6183 23.17 14.9899C22.1755 16.2914 21.6915 16.7706 21.736 17.1943C21.7684 17.504 22.083 17.7841 22.6867 18.3338C23.947 19.4823 24.2848 20.0866 24.366 20.2318C24.3727 20.2438 24.3777 20.2527 24.3812 20.2585C24.9463 21.1786 23.7543 21.2507 23.7543 21.2507L21.4747 21.2819C21.4747 21.2819 20.9855 21.3769 20.3411 20.9426C20.0036 20.7154 19.6737 20.3441 19.3595 19.9905C18.8797 19.4506 18.4365 18.9517 18.0581 19.0696C17.4229 19.2678 17.4421 20.6108 17.4421 20.6108C17.4421 20.6108 17.4471 20.8984 17.3027 21.0508Z"></path>
                      </svg></a></li>
                  <li> <a href="#">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM22.6677 10.4995C23.402 10.7011 23.9804 11.2948 24.1766 12.0488C24.5333 13.4154 24.5333 16.2667 24.5333 16.2667C24.5333 16.2667 24.5333 19.1179 24.1766 20.4845C23.9804 21.2385 23.402 21.8323 22.6677 22.0339C21.3369 22.4 16 22.4 16 22.4C16 22.4 10.663 22.4 9.33213 22.0339C8.59778 21.8323 8.01945 21.2385 7.82319 20.4845C7.46663 19.1179 7.46663 16.2667 7.46663 16.2667C7.46663 16.2667 7.46663 13.4154 7.82319 12.0488C8.01945 11.2948 8.59778 10.7011 9.33213 10.4995C10.663 10.1333 16 10.1333 16 10.1333C16 10.1333 21.3369 10.1333 22.6677 10.4995Z"></path>
                        <path d="M14.3999 19.2V13.8667L18.6666 16.5335L14.3999 19.2Z"></path>
                      </svg></a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-12 col-md">
            <ul class="footer__list">
              <li> <router-link to="/">Главная</router-link></li>
              <li> <router-link to="/about">О проекте</router-link></li>
              <li> <router-link to="/shop">Магазин</router-link></li>
              <li> <router-link to="/innovations">ИТ услуги</router-link></li>
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
      <div class="footer__dgdgf d-flex flex-wrap"><a href="#">Политика конфиденциальности</a><a href="#">Условия обслуживания</a></div>
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

export default {
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
