<template>
  <div class="content content--pbn">
    <div class="panel">
      <div class="container">
        <div class="row">
          <menu-block />
          <div class="col-xxl-9 col-xl-8">
            <div class="panel__block">
              <div class="panel__head">
                <div class="panel__title">Заказы<span>{{ filteredOrders.length }}</span></div>
                <div class="panel__search d-none d-lg-block">
                  <div class="input">
                    <input
                      id="searchOrders"
                      type="text"
                      v-model="searchTerm"
                      placeholder="Поиск по ID заказа"
                    >
                    <label class="panel__search-icon" for="searchOrders">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 12.75C10.3995 12.75 12.75 10.3995 12.75 7.5C12.75 4.60051 10.3995 2.25 7.5 2.25C4.60051 2.25 2.25 4.60051 2.25 7.5C2.25 10.3995 4.60051 12.75 7.5 12.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15.75 15.75L11.25 11.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </label>
                  </div>
                </div>
              </div>
              <div class="panel__body">
                <div class="panel__formrow" style="display: flex; gap: 12px; flex-wrap: wrap;">
                  <div style="min-width: 180px;">
                    <label>Статус</label>
                    <select v-model="filters.status" class="form-control">
                      <option value="">Все</option>
                      <option v-for="status in statuses" :key="status.id" :value="status.id">
                        {{ status.name }}
                      </option>
                    </select>
                  </div>
                  <div style="min-width: 160px;">
                    <label>Оплата</label>
                    <select v-model="filters.is_paid" class="form-control">
                      <option value="">Все</option>
                      <option value="true">Оплачен</option>
                      <option value="false">Не оплачен</option>
                    </select>
                  </div>
                  <div style="min-width: 180px;">
                    <label>Дата от</label>
                    <input type="date" v-model="filters.date_from" class="form-control">
                  </div>
                  <div style="min-width: 180px;">
                    <label>Дата до</label>
                    <input type="date" v-model="filters.date_to" class="form-control">
                  </div>
                </div>
                <div class="panel__search d-block d-lg-none">
                  <div class="input">
                    <input
                      id="searchOrdersMob"
                      type="text"
                      v-model="searchTerm"
                      placeholder="Поиск по ID заказа"
                    >
                    <label class="panel__search-icon" for="searchOrdersMob">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 12.75C10.3995 12.75 12.75 10.3995 12.75 7.5C12.75 4.60051 10.3995 2.25 7.5 2.25C4.60051 2.25 2.25 4.60051 2.25 7.5C2.25 10.3995 4.60051 12.75 7.5 12.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15.75 15.75L11.25 11.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div class="panel__table">
                  <table>
                    <tr v-for="order in filteredOrders" :key="orderKey(order)">
                      <td>
                        <span class="panel__table-title">Заказ #{{ order.id }}</span>
                        <span class="panel__table-sn panel__table-sn--detail">
                          {{ formatDate(order.created_at) }}
                        </span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Сумма:</span>
                        <span class="panel__table-text">{{ order.total_price || '—' }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Оплата:</span>
                        <span class="panel__table-text">{{ order.is_paid ? 'Оплачен' : 'Не оплачен' }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Статус:</span>
                        <span class="panel__table-text">{{ statusName(order.status) }}</span>
                      </td>
                      <td>
                        <span class="panel__table-icon" @click="openEdit(order)">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 15H6L13.875 7.12498C14.2728 6.72716 14.4963 6.18759 14.4963 5.62498C14.4963 5.06237 14.2728 4.52281 13.875 4.12498C13.4772 3.72716 12.9376 3.50366 12.375 3.50366C11.8124 3.50366 11.2728 3.72716 10.875 4.12498L3 12V15Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M10.125 4.875L13.125 7.875" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                        </span>
                      </td>
                    </tr>
                  </table>
                  <div v-if="loading" class="panel__table-text">Загрузка...</div>
                  <div v-if="error" class="panel__table-text">{{ error }}</div>
                  <div v-if="!loading && !error && !filteredOrders.length" class="panel__table-text">
                    Ничего не найдено
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal fade show" style="display: block;" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Заказ #{{ currentId }}</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div v-if="error" class="panel__table-text" style="margin-bottom: 12px;">
              {{ error }}
            </div>
            <div v-if="orderDetail" class="panel__formrow">
              <div class="panel__table-text">Сумма: {{ orderDetail.total_price || '—' }}</div>
              <div class="panel__table-text">Товары: {{ normalizeOrderItems(orderDetail.order_items).length }}</div>
            </div>
            <div class="panel__formrow">
              <label>Статус</label>
              <select v-model="form.status" class="form-control">
                <option value="">Выберите статус</option>
                <option v-for="status in statuses" :key="status.id" :value="status.id">
                  {{ status.name }}
                </option>
              </select>
            </div>
            <div class="panel__formrow">
              <label>Оплата</label>
              <select v-model="form.is_paid" class="form-control">
                <option :value="true">Оплачен</option>
                <option :value="false">Не оплачен</option>
              </select>
            </div>
            <div v-if="orderDetail" class="panel__formrow">
              <label>Состав заказа</label>
              <div class="panel__table">
                <table>
                  <tr v-for="item in normalizeOrderItems(orderDetail.order_items)" :key="item.id || `${item.product}-${item.quantity}`">
                    <td>
                      <span class="panel__table-title">Товар #{{ item.product }}</span>
                    </td>
                    <td>
                      <span class="panel__table-text">Кол-во: {{ item.quantity }}</span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn--grayborder" @click="closeModal">Отмена</button>
            <button type="button" class="btn btn--black" @click="saveOrder" :disabled="saving">
              {{ saving ? 'Сохранение...' : 'Сохранить' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import MenuBlock from "../elements/Panel/MenuBlock.vue"
import {
  fetchShopOrder,
  fetchShopOrders,
  fetchShopOrderStatuses,
  updateShopOrder,
} from '@/services/panel.service'

export default {
  name: 'ShopOrders',
  components: { MenuBlock },
  data() {
    return {
      orders: [],
      statuses: [],
      orderDetail: null,
      searchTerm: '',
      loading: false,
      error: '',
      showModal: false,
      saving: false,
      currentId: null,
      form: {
        status: '',
        is_paid: false,
      },
      filters: {
        status: '',
        is_paid: '',
        date_from: '',
        date_to: '',
      },
    }
  },
  computed: {
    filteredOrders() {
      const term = this.searchTerm.trim().toLowerCase()
      const filtered = this.orders.filter((o) => {
        if (term && !String(o.id || '').includes(term)) {
          return false
        }
        if (this.filters.status && Number(o.status) !== Number(this.filters.status)) {
          return false
        }
        if (this.filters.is_paid !== '') {
          const paid = this.filters.is_paid === 'true'
          if (!!o.is_paid !== paid) {
            return false
          }
        }
        if (this.filters.date_from || this.filters.date_to) {
          const created = o.created_at ? new Date(o.created_at) : null
          if (this.filters.date_from) {
            const from = new Date(this.filters.date_from)
            if (!created || created < from) {
              return false
            }
          }
          if (this.filters.date_to) {
            const to = new Date(this.filters.date_to)
            to.setHours(23, 59, 59, 999)
            if (!created || created > to) {
              return false
            }
          }
        }
        return true
      })
      return filtered.sort((a, b) => {
        const aTime = a.created_at ? new Date(a.created_at).getTime() : 0
        const bTime = b.created_at ? new Date(b.created_at).getTime() : 0
        return bTime - aTime
      })
    },
  },
  mounted() {
    this.fetchStatuses()
    this.fetchOrders()
  },
  methods: {
    async fetchStatuses() {
      try {
        const response = await fetchShopOrderStatuses()
        this.statuses = Array.isArray(response.data) ? response.data : []
      } catch (err) {
        this.statuses = []
      }
    },
    async fetchOrders() {
      this.loading = true
      this.error = ''
      try {
        const response = await fetchShopOrders()
        this.orders = Array.isArray(response.data) ? response.data : []
      } catch (err) {
        this.error = err.userMessage || 'Не удалось загрузить заказы'
      } finally {
        this.loading = false
      }
    },
    orderKey(order) {
      return order.id || order.pk
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
    statusName(value) {
      const status = this.statuses.find((item) => Number(item.id) === Number(value))
      return status ? status.name : (value || '—')
    },
    normalizeOrderItems(items) {
      if (!items) {
        return []
      }
      if (Array.isArray(items)) {
        return items
      }
      if (typeof items === 'object') {
        return [items]
      }
      return []
    },
    openEdit(order) {
      this.currentId = order.id || order.pk
      this.form = {
        status: order.status || '',
        is_paid: !!order.is_paid,
      }
      this.error = ''
      this.orderDetail = null
      this.showModal = true
      this.fetchOrderDetail()
    },
    closeModal() {
      this.showModal = false
    },
    async fetchOrderDetail() {
      if (!this.currentId) {
        return
      }
      try {
        const response = await fetchShopOrder(this.currentId)
        this.orderDetail = response && response.data ? response.data : null
      } catch (err) {
        this.orderDetail = null
      }
    },
    async saveOrder() {
      if (!this.currentId) {
        return
      }
      this.saving = true
      this.error = ''
      try {
        const payload = {
          status: this.form.status,
          is_paid: this.form.is_paid,
        }
        await updateShopOrder(this.currentId, payload)
        this.closeModal()
        await this.fetchOrders()
      } catch (err) {
        this.error = err.userMessage || 'Не удалось сохранить заказ'
      } finally {
        this.saving = false
      }
    },
  },
}
</script>
