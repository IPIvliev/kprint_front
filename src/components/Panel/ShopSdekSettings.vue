<template>
  <div class="content content--pbn">
    <div class="panel">
      <div class="container">
        <div class="row">
          <menu-block />
          <div class="col-xxl-9 col-xl-8">
            <div class="panel__block">
              <div class="panel__head">
                <div class="panel__title">Настройки СДЭК (SDEK Settings)</div>
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
                  <label>Код тарифа (Tariff Code)</label>
                  <input type="text" v-model="form.tariff_code" class="form-control">
                  <div class="panel__help-text">Код тарифа СДЭК для расчёта стоимости.</div>
                </div>
                <div class="panel__formrow">
                  <label>Аккаунт (Account)</label>
                  <input type="text" v-model="form.account" class="form-control">
                  <div class="panel__help-text">Логин/аккаунт для доступа к API СДЭК.</div>
                </div>
                <div class="panel__formrow">
                  <label>Пароль (Secure Password)</label>
                  <input type="text" v-model="form.secure" class="form-control">
                  <div class="panel__help-text">Пароль/секрет для доступа к API СДЭК.</div>
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
  fetchShopManagerSdekSettings,
  updateShopManagerSdekSettings,
} from '@/services/panel.service'

export default {
  name: 'ShopSdekSettings',
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
        tariff_code: '',
        account: '',
        secure: '',
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
        const response = await fetchShopManagerSdekSettings()
        const data = response.data || {}
        this.form = {
          title: data.title || '',
          koof: Number(data.koof || 0),
          more_days: Number(data.more_days || 0),
          tariff_code: data.tariff_code || '',
          account: data.account || '',
          secure: data.secure || '',
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
        await updateShopManagerSdekSettings(payload)
      } catch (err) {
        this.error = err.userMessage || 'Failed to save settings'
      } finally {
        this.saving = false
      }
    },
  },
}
</script>
