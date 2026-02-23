<template>
  <div class="content content--pbn">
    <div class="panel">
      <div class="container">
        <div class="row">
          <menu-block />
          <div class="col-xxl-9 col-xl-8">
            <div class="panel__block">
              <div class="panel__head">
                <div class="panel__title">Заказы в магазине<span>{{ filteredOrders.length }}</span></div>
                <div class="panel__search d-none d-lg-block">
                  <div class="input">
                    <input
                      id="searchShopUserOrders"
                      v-model.trim="searchTerm"
                      type="text"
                      placeholder="Поиск по ID заказа"
                    >
                    <label class="panel__search-icon" for="searchShopUserOrders">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 12.75C10.3995 12.75 12.75 10.3995 12.75 7.5C12.75 4.60051 10.3995 2.25 7.5 2.25C4.60051 2.25 2.25 4.60051 2.25 7.5C2.25 10.3995 4.60051 12.75 7.5 12.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15.75 15.75L11.25 11.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </label>
                  </div>
                </div>
              </div>
              <div class="panel__body">
                <div class="panel__search d-block d-lg-none">
                  <div class="input">
                    <input
                      id="searchShopUserOrdersMob"
                      v-model.trim="searchTerm"
                      type="text"
                      placeholder="Поиск по ID заказа"
                    >
                    <label class="panel__search-icon" for="searchShopUserOrdersMob">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 12.75C10.3995 12.75 12.75 10.3995 12.75 7.5C12.75 4.60051 10.3995 2.25 7.5 2.25C4.60051 2.25 2.25 4.60051 2.25 7.5C2.25 10.3995 4.60051 12.75 7.5 12.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15.75 15.75L11.25 11.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </label>
                  </div>
                </div>

                <div class="panel__table">
                  <table>
                    <tr
                      v-for="order in filteredOrders"
                      :key="order.id"
                      class="shop-user-orders-row"
                    >
                      <td>
                        <span class="panel__table-title">Заказ #{{ order.id }}</span>
                        <span class="panel__table-sn panel__table-sn--detail">{{ formatDate(order.created_at) }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Сумма:</span>
                        <span class="panel__table-text">{{ formatMoney(order.total_price) }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Статус:</span>
                        <span class="panel__table-text">{{ statusName(order) }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Оплата:</span>
                        <span class="panel__table-text">{{ order.is_paid ? 'Оплачен' : 'Не оплачен' }}</span>
                      </td>
                      <td>
                        <button type="button" class="btn btn--grayborder btn-sm" @click="openOrder(order.id)">
                          Подробнее
                        </button>
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

    <teleport to="body">
      <div v-if="showModal" class="shop-user-order-modal-overlay" @click.self="closeModal">
        <div class="shop-user-order-modal">
          <button type="button" class="shop-user-order-modal__close" @click="closeModal">x</button>

          <div class="shop-user-order-modal__head">
            <div class="shop-user-order-modal__head-main">
              <h3>Заказ #{{ currentOrder ? currentOrder.id : '' }}</h3>
              <div class="shop-user-order-modal__created-at">
                {{ currentOrder ? formatDate(currentOrder.created_at) : '' }}
              </div>
            </div>
            <div v-if="currentOrder" class="shop-user-order-modal__badges">
              <span
                class="shop-user-order-modal__badge"
                :class="currentOrder.is_paid ? 'shop-user-order-modal__badge--paid' : 'shop-user-order-modal__badge--unpaid'"
              >
                {{ currentOrder.is_paid ? 'Оплачен' : 'Не оплачен' }}
              </span>
            </div>
          </div>

          <div v-if="modalLoading" class="panel__table-text">Загрузка деталей заказа...</div>
          <div v-else-if="modalError" class="panel__table-text">{{ modalError }}</div>

          <div v-else-if="currentOrder" class="shop-user-order-modal__body">
            <div class="shop-user-order-modal__summary-grid">
              <div class="shop-user-order-modal__summary-card">
                <span class="shop-user-order-modal__summary-label">Сумма заказа</span>
                <span class="shop-user-order-modal__summary-value">{{ formatMoney(currentOrder.total_price) }}</span>
              </div>
              <div class="shop-user-order-modal__summary-card">
                <span class="shop-user-order-modal__summary-label">Сумма товаров</span>
                <span class="shop-user-order-modal__summary-value">{{ formatMoney(currentOrder.products_price) }}</span>
              </div>
            </div>

            <div class="shop-user-order-modal__section">
              <div class="shop-user-order-modal__section-title">Состав заказа</div>
              <div v-if="!normalizeOrderItems(currentOrder.order_items).length" class="panel__table-text">
                Товары не найдены
              </div>
              <div v-else class="shop-user-order-modal__items">
                <div
                  v-for="item in normalizeOrderItems(currentOrder.order_items)"
                  :key="orderItemKey(item)"
                  class="shop-user-order-modal__item"
                >
                  <span class="shop-user-order-modal__item-name">{{ item.product_name || `Товар #${item.product}` }}</span>
                  <span class="shop-user-order-modal__item-qty">x {{ item.quantity }}</span>
                </div>
              </div>
            </div>

            <div class="shop-user-order-modal__section">
              <div class="shop-user-order-modal__section-title">Доставка</div>
              <div v-if="!primaryDelivery" class="panel__table-text">Данные о доставке отсутствуют</div>
              <div v-else class="shop-user-order-modal__delivery-grid">
                <div class="shop-user-order-modal__delivery-item">
                  <span class="shop-user-order-modal__delivery-label">Компания</span>
                  <span class="shop-user-order-modal__delivery-value">{{ primaryDelivery.company || '—' }}</span>
                </div>
                <div class="shop-user-order-modal__delivery-item">
                  <span class="shop-user-order-modal__delivery-label">Адрес</span>
                  <span class="shop-user-order-modal__delivery-value">{{ primaryDelivery.destination || '—' }}</span>
                </div>
                <div class="shop-user-order-modal__delivery-item">
                  <span class="shop-user-order-modal__delivery-label">Получатель</span>
                  <span class="shop-user-order-modal__delivery-value">{{ primaryDelivery.fio || '—' }}</span>
                </div>
                <div class="shop-user-order-modal__delivery-item">
                  <span class="shop-user-order-modal__delivery-label">Телефон</span>
                  <span class="shop-user-order-modal__delivery-value">{{ primaryDelivery.phone || '—' }}</span>
                </div>
                <div class="shop-user-order-modal__delivery-item shop-user-order-modal__delivery-item--full">
                  <span class="shop-user-order-modal__delivery-label">Email</span>
                  <span class="shop-user-order-modal__delivery-value">{{ primaryDelivery.email || '—' }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="shop-user-order-modal__actions">
            <button type="button" class="btn btn--grayborder" @click="closeModal">Закрыть</button>
            <button
              v-if="currentOrder && !currentOrder.is_paid"
              type="button"
              class="btn btn--red"
              @click="goToCartForPayment"
            >
              Оплатить в корзине
            </button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import MenuBlock from '../elements/Panel/MenuBlock.vue'
import {
  fetchShopOrderStatuses,
  fetchUserShopOrder,
  fetchUserShopOrders
} from '@/services/panel.service'

export default {
  name: 'PanelShopUserOrders',
  components: { MenuBlock },
  data () {
    return {
      orders: [],
      statuses: [],
      searchTerm: '',
      loading: false,
      error: '',
      showModal: false,
      modalLoading: false,
      modalError: '',
      currentOrder: null
    }
  },
  computed: {
    filteredOrders () {
      const term = String(this.searchTerm || '').trim().toLowerCase()
      return this.orders
        .filter((order) => {
          if (!term) {
            return true
          }
          return String(order.id || '').toLowerCase().includes(term)
        })
        .sort((a, b) => {
          const aTime = a.created_at ? new Date(a.created_at).getTime() : 0
          const bTime = b.created_at ? new Date(b.created_at).getTime() : 0
          return bTime - aTime
        })
    },
    primaryDelivery () {
      if (!this.currentOrder || !Array.isArray(this.currentOrder.delivery)) {
        return null
      }
      return this.currentOrder.delivery[0] || null
    }
  },
  mounted () {
    this.loadOrders()
    this.loadStatuses()
  },
  methods: {
    async loadOrders () {
      this.loading = true
      this.error = ''
      try {
        const response = await fetchUserShopOrders()
        this.orders = Array.isArray(response.data) ? response.data : []
      } catch (err) {
        this.error = err.userMessage || 'Не удалось загрузить заказы'
      } finally {
        this.loading = false
      }
    },
    async loadStatuses () {
      try {
        const response = await fetchShopOrderStatuses()
        this.statuses = Array.isArray(response.data) ? response.data : []
      } catch (err) {
        this.statuses = []
      }
    },
    async openOrder (orderId) {
      this.showModal = true
      this.modalLoading = true
      this.modalError = ''
      this.currentOrder = null
      try {
        const response = await fetchUserShopOrder(orderId)
        this.currentOrder = response && response.data ? response.data : null
      } catch (err) {
        this.modalError = err.userMessage || 'Не удалось загрузить детали заказа'
      } finally {
        this.modalLoading = false
      }
    },
    closeModal () {
      this.showModal = false
      this.modalLoading = false
      this.modalError = ''
      this.currentOrder = null
    },
    goToCartForPayment () {
      this.closeModal()
      this.$router.push('/shop/cart')
    },
    formatDate (value) {
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
        minute: '2-digit'
      })
    },
    formatMoney (value) {
      if (value === null || value === undefined || value === '') {
        return '—'
      }
      return `${value} Р`
    },
    statusName (order) {
      if (!order) {
        return '—'
      }
      if (order.status_name) {
        return order.status_name
      }
      const match = this.statuses.find((status) => Number(status.id) === Number(order.status))
      return match ? match.name : '—'
    },
    normalizeOrderItems (items) {
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
    orderItemKey (item) {
      return item.id || `${item.product || 'product'}-${item.quantity || 0}`
    }
  }
}
</script>

<style scoped>
.shop-user-orders-row td {
  vertical-align: middle;
}

.shop-user-order-modal-overlay {
  position: fixed;
  z-index: 1200;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  padding: 20px;
}

.shop-user-order-modal {
  width: min(980px, 100%);
  max-height: 85vh;
  overflow: auto;
  background: linear-gradient(180deg, #ffffff 0%, #fafbff 100%);
  border-radius: 18px;
  position: relative;
  padding: 28px;
  box-shadow: 0 20px 50px rgba(17, 24, 39, 0.3);
}

.shop-user-order-modal__close {
  border: 0;
  background: #eef1f8;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 20px;
  line-height: 1;
  position: absolute;
  right: 16px;
  top: 14px;
  transition: background 0.2s ease;
}

.shop-user-order-modal__close:hover {
  background: #dfe5f2;
}

.shop-user-order-modal__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 18px;
  padding-right: 44px;
}

.shop-user-order-modal__head-main h3 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
}

.shop-user-order-modal__created-at {
  margin-top: 6px;
  color: #6a7180;
  font-size: 14px;
}

.shop-user-order-modal__badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.shop-user-order-modal__badge {
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.shop-user-order-modal__badge--paid {
  background: #e7f8ed;
  color: #1d7a3a;
}

.shop-user-order-modal__badge--unpaid {
  background: #fff0f1;
  color: #b33948;
}

.shop-user-order-modal__body {
  display: grid;
  gap: 14px;
}

.shop-user-order-modal__summary-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.shop-user-order-modal__summary-card {
  background: #ffffff;
  border: 1px solid #e4e8f2;
  border-radius: 12px;
  padding: 14px;
  display: grid;
  gap: 6px;
}

.shop-user-order-modal__summary-label {
  color: #687085;
  font-size: 13px;
}

.shop-user-order-modal__summary-value {
  color: #121826;
  font-size: 20px;
  font-weight: 700;
}

.shop-user-order-modal__section {
  margin-top: 2px;
  background: #ffffff;
  border: 1px solid #e4e8f2;
  border-radius: 12px;
  padding: 14px;
}

.shop-user-order-modal__section-title {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #21293a;
}

.shop-user-order-modal__items {
  display: grid;
  gap: 8px;
}

.shop-user-order-modal__item {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  border-radius: 10px;
  background: #f5f7fc;
  padding: 9px 10px;
}

.shop-user-order-modal__item-name {
  color: #1c2435;
  font-size: 14px;
}

.shop-user-order-modal__item-qty {
  color: #4f5a73;
  font-size: 14px;
  font-weight: 600;
}

.shop-user-order-modal__delivery-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.shop-user-order-modal__delivery-item {
  background: #f5f7fc;
  border-radius: 10px;
  padding: 10px;
  display: grid;
  gap: 4px;
}

.shop-user-order-modal__delivery-item--full {
  grid-column: 1 / -1;
}

.shop-user-order-modal__delivery-label {
  color: #6c7282;
  font-size: 12px;
}

.shop-user-order-modal__delivery-value {
  color: #151a2b;
  font-size: 14px;
  font-weight: 600;
}

.shop-user-order-modal__actions {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid #e4e8f2;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

@media (max-width: 767px) {
  .shop-user-order-modal {
    padding: 20px;
    border-radius: 14px;
  }

  .shop-user-order-modal__head-main h3 {
    font-size: 22px;
  }

  .shop-user-order-modal__summary-grid,
  .shop-user-order-modal__delivery-grid {
    grid-template-columns: 1fr;
  }
}
</style>
