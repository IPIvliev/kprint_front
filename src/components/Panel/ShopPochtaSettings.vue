<template>
  <div class="content content--pbn">
    <div class="panel">
      <div class="container">
        <div class="row">
          <menu-block />
          <div class="col-xxl-9 col-xl-8">
            <div class="panel__block">
              <div class="panel__head">
                <div class="panel__title">Настройки Почты России (Pochta Settings)</div>
                <div class="panel__add-btn">
                  <button type="button" class="btn btn--black" @click="saveSettings" :disabled="saving">
                    {{ saving ? 'Сохранение...' : 'Сохранить' }}
                  </button>
                </div>
              </div>
              <div class="panel__body">
                <div v-if="error" class="panel__table-text" style="margin-bottom: 12px;">
                  {{ error }}
                </div>
                <div v-if="loading" class="panel__table-text">Загрузка...</div>

                <div v-if="!loading" class="panel__formrow">
                  <label>Название (Title)</label>
                  <input type="text" v-model="form.title" class="form-control">
                  <div class="panel__help-text">Отображаемое название службы доставки в админке.</div>
                </div>
                <div class="panel__formrow">
                  <label>Коэффициент цены (%) (Price Koof)</label>
                  <input type="number" v-model.number="form.koof" class="form-control" min="0">
                  <div class="panel__help-text">Процент надбавки к рассчитанной цене доставки.</div>
                </div>
                <div class="panel__formrow">
                  <label>Доп. дни доставки (Extra Days)</label>
                  <input type="number" v-model.number="form.more_days" class="form-control" min="0">
                  <div class="panel__help-text">Сколько дней добавлять к сроку доставки.</div>
                </div>
                <div class="panel__formrow">
                  <label>Макс. отделений (Max Offices)</label>
                  <input type="number" v-model.number="form.top" class="form-control" min="0">
                  <div class="panel__help-text">Ограничение количества отделений в выдаче.</div>
                </div>
                <div class="panel__formrow">
                  <label>Радиус поиска (км) (Search Radius)</label>
                  <input type="number" v-model.number="form.searchRadius" class="form-control" min="0">
                  <div class="panel__help-text">Максимальный радиус поиска отделений.</div>
                </div>
                <div class="panel__formrow">
                  <label>Категория РПО (Mail Category)</label>
                  <input type="text" v-model="form.mail_category" class="form-control">
                  <div class="panel__help-text">Категория почтового отправления для API.</div>
                </div>
                <div class="panel__formrow">
                  <label>Тип РПО (Mail Type)</label>
                  <input type="text" v-model="form.mail_type" class="form-control">
                  <div class="panel__help-text">Тип почтового отправления (например, POSTAL_PARCEL).</div>
                </div>
                <div class="panel__formrow">
                  <label>SMS уведомление (получатель) (SMS Notice Recipient)</label>
                  <input type="number" v-model.number="form.sms_notice_recipient" class="form-control" min="0">
                  <div class="panel__help-text">Кому отправлять SMS‑уведомления (код сервиса).</div>
                </div>
                <div class="panel__formrow">
                  <label>Тип транспортировки (Transport Type)</label>
                  <input type="text" v-model="form.transport_type" class="form-control">
                  <div class="panel__help-text">Тип транспортировки для API (например, SURFACE).</div>
                </div>
                <div class="panel__formrow">
                  <label>Токен (Token)</label>
                  <input type="text" v-model="form.token" class="form-control">
                  <div class="panel__help-text">Токен доступа к API Почты России.</div>
                </div>
                <div class="panel__formrow">
                  <label>Ключ (Key)</label>
                  <input type="text" v-model="form.key" class="form-control">
                  <div class="panel__help-text">Ключ доступа к API Почты России.</div>
                </div>
                <div class="panel__formrow">
                  <label class="panel__checkbox">
                    <input type="checkbox" v-model="form.fragile">
                    <span>Осторожно / хрупко (Fragile)</span>
                  </label>
                  <div class="panel__help-text">Указывать отправление как хрупкое.</div>
                </div>
                <div class="panel__formrow">
                  <label class="panel__checkbox">
                    <input type="checkbox" v-model="form.with_electronic_notice">
                    <span>С электронным уведомлением (With Electronic Notice)</span>
                  </label>
                  <div class="panel__help-text">Включить электронное уведомление о вручении.</div>
                </div>
                <div class="panel__formrow">
                  <label class="panel__checkbox">
                    <input type="checkbox" v-model="form.with_order_of_notice">
                    <span>С заказным уведомлением (With Order of Notice)</span>
                  </label>
                  <div class="panel__help-text">Включить заказное уведомление о вручении.</div>
                </div>
                <div class="panel__formrow">
                  <label class="panel__checkbox">
                    <input type="checkbox" v-model="form.with_simple_notice">
                    <span>С простым уведомлением (With Simple Notice)</span>
                  </label>
                  <div class="panel__help-text">Включить простое уведомление о вручении.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuBlock from "../elements/Panel/MenuBlock.vue"
import {
  fetchShopManagerPochtaSettings,
  updateShopManagerPochtaSettings,
} from '@/services/panel.service'

export default {
  name: 'ShopPochtaSettings',
  components: { MenuBlock },
  data() {
    return {
      loading: false,
      saving: false,
      error: '',
      form: {
        title: '',
        koof: 0,
        more_days: 0,
        top: 0,
        searchRadius: 0,
        fragile: false,
        mail_category: '',
        mail_type: '',
        sms_notice_recipient: 0,
        transport_type: '',
        with_electronic_notice: false,
        with_order_of_notice: false,
        with_simple_notice: false,
        token: '',
        key: '',
      },
    }
  },
  mounted() {
    this.fetchSettings()
  },
  methods: {
    async fetchSettings() {
      this.loading = true
      this.error = ''
      try {
        const response = await fetchShopManagerPochtaSettings()
        const data = response.data || {}
        this.form = {
          title: data.title || '',
          koof: Number(data.koof || 0),
          more_days: Number(data.more_days || 0),
          top: Number(data.top || 0),
          searchRadius: Number(data.searchRadius || 0),
          fragile: Boolean(data.fragile),
          mail_category: data.mail_category || '',
          mail_type: data.mail_type || '',
          sms_notice_recipient: Number(data.sms_notice_recipient || 0),
          transport_type: data.transport_type || '',
          with_electronic_notice: Boolean(data.with_electronic_notice),
          with_order_of_notice: Boolean(data.with_order_of_notice),
          with_simple_notice: Boolean(data.with_simple_notice),
          token: data.token || '',
          key: data.key || '',
        }
      } catch (err) {
        this.error = err.userMessage || 'Failed to load settings'
      } finally {
        this.loading = false
      }
    },
    async saveSettings() {
      this.saving = true
      this.error = ''
      try {
        const payload = { ...this.form }
        await updateShopManagerPochtaSettings(payload)
      } catch (err) {
        this.error = err.userMessage || 'Failed to save settings'
      } finally {
        this.saving = false
      }
    },
  },
}
</script>
