<template>
<div class="content">
  <div class="contact">
    <div class="container">
      <h1 class="title">Контакты</h1>

      <div v-if="loading" class="contact__state">Загрузка представительств...</div>
      <div v-else-if="error" class="contact__state">{{ error }}</div>
      <div v-else-if="selectedOffice" class="row gy-2">
        <div class="col-lg-6 col-xxl-5">
          <div class="contact__title">Город представительства:</div>
          <div ref="cityDropdown" class="header__lang contact__city-picker">
            <button
              type="button"
              class="header__langbtn"
              :class="{ active: cityMenuIsOpen }"
              @click="toggleCityMenu"
            >
              <span class="contact__city-btninner">
                <span class="contact__city-icon">
                  <img v-if="selectedOfficeEmblemUrl" :src="selectedOfficeEmblemUrl" :alt="selectedOffice?.name || 'City emblem'">
                  <span v-else class="contact__city-icon-placeholder">{{ selectedOfficeInitial }}</span>
                </span>
                <span class="contact__city-btntext">{{ selectedOfficeLabel }}</span>
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00033 0.666748C3.95033 0.666748 0.666992 3.95008 0.666992 8.00008C0.666992 12.0501 3.95033 15.3334 8.00033 15.3334C12.0503 15.3334 15.3337 12.0501 15.3337 8.00008C15.3337 3.95008 12.0503 0.666748 8.00033 0.666748ZM5.86699 6.50024C5.77238 6.49915 5.67914 6.52297 5.59664 6.56931C5.51415 6.61565 5.44529 6.68288 5.39699 6.76424C5.35152 6.84329 5.32984 6.93378 5.33457 7.02485C5.3393 7.11591 5.37024 7.20367 5.42366 7.27758L7.55699 10.2776C7.6079 10.3472 7.67467 10.4037 7.75176 10.4425C7.82885 10.4812 7.91406 10.501 8.00033 10.5002C8.0867 10.5011 8.17204 10.4813 8.24926 10.4426C8.32648 10.4039 8.39335 10.3473 8.44433 10.2776L10.5777 7.27758C10.6311 7.20367 10.662 7.11591 10.6667 7.02485C10.6715 6.93378 10.6498 6.84329 10.6043 6.76424C10.556 6.68278 10.487 6.61549 10.4044 6.56914C10.3218 6.5228 10.2284 6.49904 10.1337 6.50024H5.86699Z"></path>
              </svg>
            </button>
            <div class="header__langdrop" :class="{ open: cityMenuIsOpen }">
              <ul class="header__langlist">
                <li v-for="office in offices" :key="office.id">
                  <a href="#" class="contact__city-option" @click.prevent="selectCity(office.slug)">
                    <span class="contact__city-icon">
                      <img v-if="office.emblem_url" :src="office.emblem_url" :alt="office.name || 'City emblem'">
                      <span v-else class="contact__city-icon-placeholder">{{ cityInitial(office) }}</span>
                    </span>
                    <span>{{ officeLabel(office) }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="contact__title">Адрес:</div>
          <div class="contact__text">
            <p>{{ selectedOffice.address }}</p>
          </div>

          <div v-if="selectedOffice.contacts_note" class="contact__details">
            {{ selectedOffice.contacts_note }}
          </div>
        </div>

        <div class="col-lg-6 col-xxl-5">
          <div class="contact__row">
            <div class="contact__block" v-if="selectedOffice.email">
              <div class="contact__title">Почта для связи:</div>
              <div class="contact__link"><a :href="`mailto:${selectedOffice.email}`">{{ selectedOffice.email }}</a></div>
            </div>
            <div class="contact__block">
              <div class="contact__title">Телефон:</div>
              <div class="contact__link"><a :href="selectedOfficePhoneHref">{{ selectedOfficePhone }}</a></div>
              <div class="contact__btn" data-bs-toggle="modal" data-bs-target="#modalCallback">Перезвоните мне</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="contact__state">Представительства пока не добавлены.</div>
    </div>
  </div>

  <div class="map" v-if="selectedOffice">
    <div class="container">
      <iframe
        v-if="selectedOfficeMapUrl"
        class="map__map"
        :src="selectedOfficeMapUrl"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <div v-else class="map__map map__placeholder">Для этого города карта пока не добавлена.</div>
    </div>
  </div>

  <div class="dillers" v-if="selectedOffice && selectedOffice.photos && selectedOffice.photos.length">
    <div class="container">
      <div class="dillers__head">
        <h2 class="title">Фотографии офиса</h2>
      </div>
      <div class="row gy-2">
        <div
          v-for="photo in selectedOffice.photos"
          :key="photo.id || photo.image_url"
          class="col-lg-4 col-md-6"
        >
          <div class="dillercard dillercard--photo">
            <div class="dillercard__content dillercard__content--photo">
              <img :src="photo.image_url" :alt="photo.caption || selectedOffice.name">
            </div>
            <div class="dillercard__info" v-if="photo.caption">
              <div class="dillercard__name">{{ photo.caption }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <callback-window />
</div>
</template>

<script>
import CallbackWindow from './elements/CallbackWindow.vue'
import { DEFAULT_MAIN_OFFICE_PHONE, getContactOfficesData, phoneToTelHref } from '@/services/contact-office.service'

export default {
  name: 'ContactPage',
  components: { CallbackWindow },
  data () {
    return {
      loading: false,
      error: '',
      offices: [],
      selectedCitySlug: '',
      cityMenuIsOpen: false,
      mainOfficePhone: DEFAULT_MAIN_OFFICE_PHONE
    }
  },
  computed: {
    selectedOffice () {
      if (!this.offices.length) {
        return null
      }
      const bySlug = this.offices.find((office) => office.slug === this.selectedCitySlug)
      return bySlug || this.offices[0]
    },
    selectedOfficeEmblemUrl () {
      return String(this.selectedOffice?.emblem_url || '').trim()
    },
    selectedOfficeInitial () {
      return this.cityInitial(this.selectedOffice)
    },
    selectedOfficeLabel () {
      return this.officeLabel(this.selectedOffice)
    },
    selectedOfficePhone () {
      const localPhone = String(this.selectedOffice?.phone || '').trim()
      return localPhone || this.mainOfficePhone
    },
    selectedOfficePhoneHref () {
      return phoneToTelHref(this.selectedOfficePhone)
    },
    selectedOfficeMapUrl () {
      const embed = String(this.selectedOffice?.map_embed_url || '').trim()
      if (embed) {
        return embed
      }
      return this.buildCoordsMapUrl(this.selectedOffice?.latitude, this.selectedOffice?.longitude)
    }
  },
  created () {
    this.loadOffices()
  },
  mounted () {
    document.addEventListener('click', this.handleDocumentClick)
  },
  beforeUnmount () {
    document.removeEventListener('click', this.handleDocumentClick)
  },
  methods: {
    officeLabel (office) {
      const label = String(office?.name || '').trim() || 'Без названия'
      return office?.is_head_office ? `${label} (Главный офис)` : label
    },
    cityInitial (office) {
      const label = String(office?.name || '').trim()
      return label ? label[0].toUpperCase() : '?'
    },
    buildCoordsMapUrl (latitude, longitude) {
      const lat = Number(latitude)
      const lon = Number(longitude)
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
        return ''
      }
      const delta = 0.02
      const left = (lon - delta).toFixed(6)
      const right = (lon + delta).toFixed(6)
      const top = (lat + delta).toFixed(6)
      const bottom = (lat - delta).toFixed(6)
      const latValue = lat.toFixed(6)
      const lonValue = lon.toFixed(6)
      return `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${latValue}%2C${lonValue}`
    },
    toggleCityMenu () {
      this.cityMenuIsOpen = !this.cityMenuIsOpen
    },
    selectCity (slug) {
      this.selectedCitySlug = String(slug || '')
      this.cityMenuIsOpen = false
    },
    handleDocumentClick (event) {
      if (!this.cityMenuIsOpen) {
        return
      }
      const dropdown = this.$refs.cityDropdown
      if (!dropdown || typeof dropdown.contains !== 'function') {
        return
      }
      if (!dropdown.contains(event.target)) {
        this.cityMenuIsOpen = false
      }
    },
    async loadOffices () {
      this.loading = true
      this.error = ''
      try {
        const payload = await getContactOfficesData()
        this.offices = Array.isArray(payload?.offices) ? payload.offices : []

        const mainPhone = String(payload?.main_office_phone || '').trim()
        if (mainPhone) {
          this.mainOfficePhone = mainPhone
        }

        const defaultOffice = this.offices.find((office) => office.is_head_office) || this.offices[0]
        this.selectedCitySlug = String(defaultOffice?.slug || '')
      } catch (error) {
        this.offices = []
        this.error = 'Не удалось загрузить контакты представительств.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.contact__state {
  color: rgba(34, 37, 45, 0.7);
  font-size: 18px;
}

.contact__city-picker {
  max-width: 420px;
  margin-bottom: 24px;
}

.contact__city-picker .header__langbtn {
  width: 100%;
  justify-content: space-between;
  text-align: left;
  border: 1px solid #d7dce0;
  background: #eef1f3;
}

.contact__city-picker .header__langbtn:hover,
.contact__city-picker .header__langbtn.active {
  border-color: #cfd5da;
  background: #e7ebee;
}

.contact__city-btninner {
  min-width: 0;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.contact__city-btntext {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.contact__city-picker .header__langdrop {
  min-width: 100%;
  width: 100%;
}

.contact__city-picker .header__langlist {
  max-height: 260px;
  overflow-y: auto;
  border: 1px solid #e2e6ea;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.08);
}

.contact__city-picker .header__langlist a {
  display: block;
}

.contact__city-option {
  display: flex !important;
  align-items: center;
  gap: 10px;
}

.contact__city-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #f2f4f6;
}

.contact__city-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.contact__city-icon-placeholder {
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  color: rgba(34, 37, 45, 0.7);
}

.contact__details {
  color: rgba(34, 37, 45, 0.7);
  line-height: 1.5;
}

.map__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f4f7f9;
  color: rgba(34, 37, 45, 0.7);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
}

.map__map {
  width: 100%;
  height: 500px;
  display: block;
  border: 0;
}

@media (max-width: 991.98px) {
  .map__map {
    height: 420px;
  }
}

.dillercard--photo {
  overflow: hidden;
}

.dillercard__content--photo {
  padding: 0;
}

.dillercard__content--photo img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
}
</style>
