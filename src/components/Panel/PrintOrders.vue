<template>
  <div class="content content--pbn">
    <div class="panel">
      <div class="container">
        <div class="row">
          <menu-block />
          <div class="col-xxl-9 col-xl-8">
            <div class="panel__block">
              <div class="panel__head">
                <div class="panel__title">Заказы на печать<span>{{ filteredOrders.length }}</span></div>
                <div class="panel__search d-none d-lg-block">
                  <div class="input">
                    <input
                      id="searchPrintOrders"
                      v-model="searchTerm"
                      type="text"
                      placeholder="Поиск по ID или названию модели"
                    >
                    <label class="panel__search-icon" for="searchPrintOrders">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 12.75C10.3995 12.75 12.75 10.3995 12.75 7.5C12.75 4.60051 10.3995 2.25 7.5 2.25C4.60051 2.25 2.25 4.60051 2.25 7.5C2.25 10.3995 4.60051 12.75 7.5 12.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15.75 15.75L11.25 11.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </label>
                  </div>
                </div>
              </div>
              <div class="panel__body">
                <div class="panel__table-text" style="margin-bottom: 16px;">
                  Расчет стоимости на странице печати пока не создает заказ автоматически. Это отдельный будущий функционал.
                </div>
                <div class="panel__search d-block d-lg-none">
                  <div class="input">
                    <input
                      id="searchPrintOrdersMob"
                      v-model="searchTerm"
                      type="text"
                      placeholder="Поиск по ID или названию модели"
                    >
                    <label class="panel__search-icon" for="searchPrintOrdersMob">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 12.75C10.3995 12.75 12.75 10.3995 12.75 7.5C12.75 4.60051 10.3995 2.25 7.5 2.25C4.60051 2.25 2.25 4.60051 2.25 7.5C2.25 10.3995 4.60051 12.75 7.5 12.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15.75 15.75L11.25 11.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div class="panel__table">
                  <table>
                    <tr v-for="order in filteredOrders" :key="order.id">
                      <td>
                        <span class="panel__table-title">#{{ order.id }} {{ order.title || 'Без названия' }}</span>
                        <span class="panel__table-sn panel__table-sn--detail">{{ formatDate(order.created_at) }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Статус:</span>
                        <span class="panel__table-text">{{ statusLabel(order.status) }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Цена клиента:</span>
                        <span class="panel__table-text">{{ money(order.price_client) }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Цена менеджера:</span>
                        <span class="panel__table-text">{{ money(order.price_admin) }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Отправлен:</span>
                        <span class="panel__table-text">{{ order.is_submitted ? 'Да' : 'Нет' }}</span>
                      </td>
                    </tr>
                  </table>
                  <div v-if="loading" class="panel__table-text">Загрузка...</div>
                  <div v-if="error" class="panel__table-text">{{ error }}</div>
                  <div v-if="!loading && !error && !filteredOrders.length" class="panel__table-text">
                    Заказов пока нет
                  </div>
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
import MenuBlock from '../elements/Panel/MenuBlock.vue'
import { fetchPrintJobs } from '@/services/panel.service'

const STATUS_LABELS = {
  READY: 'Готова к заказу',
  PRINTING: 'В печати',
  DONE: 'Готово',
  REVIEW: 'На проверке',
  APPROVED: 'Согласовано',
  DELIVERY: 'В доставке',
  AT_PICKUP: 'В пункте выдачи',
  RECEIVED: 'Получено',
}

export default {
  name: 'PrintOrders',
  components: { MenuBlock },
  data() {
    return {
      orders: [],
      searchTerm: '',
      loading: false,
      error: '',
    }
  },
  computed: {
    filteredOrders() {
      const term = this.searchTerm.trim().toLowerCase()
      if (!term) {
        return this.orders
      }
      return this.orders.filter((item) => {
        const idPart = String(item.id || '')
        const titlePart = String(item.title || '').toLowerCase()
        return idPart.includes(term) || titlePart.includes(term)
      })
    },
  },
  mounted() {
    this.fetchOrders()
  },
  methods: {
    async fetchOrders() {
      this.loading = true
      this.error = ''
      try {
        const response = await fetchPrintJobs()
        this.orders = Array.isArray(response.data) ? response.data : []
      } catch (err) {
        this.error = err.userMessage || 'Не удалось загрузить заказы на печать'
      } finally {
        this.loading = false
      }
    },
    formatDate(value) {
      if (!value) {
        return '—'
      }
      const date = new Date(value)
      if (Number.isNaN(date.getTime())) {
        return String(value)
      }
      return date.toLocaleString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    },
    statusLabel(status) {
      if (!status) {
        return '—'
      }
      return STATUS_LABELS[status] || status
    },
    money(value) {
      if (value === null || value === undefined || value === '') {
        return '—'
      }
      return `${value} ₽`
    },
  },
}
</script>
