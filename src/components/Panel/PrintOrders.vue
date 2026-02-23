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
                      placeholder="Поиск по ID или названию"
                    >
                    <label class="panel__search-icon" for="searchPrintOrders">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 12.75C10.3995 12.75 12.75 10.3995 12.75 7.5C12.75 4.60051 10.3995 2.25 7.5 2.25C4.60051 2.25 2.25 4.60051 2.25 7.5C2.25 10.3995 4.60051 12.75 7.5 12.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15.75 15.75L11.25 11.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div v-if="!isManagerMode" class="print-order-head-action d-none d-lg-flex">
                  <button type="button" class="btn btn--red" @click="goToPrintCalculator">
                    Создать заказ на 3Д печать
                  </button>
                </div>
              </div>

              <div class="panel__body">
                <div class="panel__formrow" style="max-width: 280px; margin-bottom: 12px;">
                  <label for="printStatusFilter">Статус</label>
                  <select id="printStatusFilter" v-model="statusFilter" class="form-control">
                    <option value="">Все</option>
                    <option v-for="status in STATUS_OPTIONS" :key="status.value" :value="status.value">
                      {{ status.label }}
                    </option>
                  </select>
                </div>

                <div class="panel__search d-block d-lg-none">
                  <div class="input">
                    <input
                      id="searchPrintOrdersMob"
                      v-model="searchTerm"
                      type="text"
                      placeholder="Поиск по ID или названию"
                    >
                    <label class="panel__search-icon" for="searchPrintOrdersMob">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 12.75C10.3995 12.75 12.75 10.3995 12.75 7.5C12.75 4.60051 10.3995 2.25 7.5 2.25C4.60051 2.25 2.25 4.60051 2.25 7.5C2.25 10.3995 4.60051 12.75 7.5 12.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15.75 15.75L11.25 11.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div v-if="!isManagerMode" class="print-order-head-action d-flex d-lg-none" style="margin-bottom: 12px;">
                  <button type="button" class="btn btn--red" @click="goToPrintCalculator">
                    Создать заказ на 3Д печать
                  </button>
                </div>

                <div class="panel__table">
                  <table>
                    <tr
                      v-for="order in filteredOrders"
                      :key="order.id"
                      :class="{ 'print-order-row--active': selectedOrder && selectedOrder.id === order.id }"
                    >
                      <td class="print-order-table__thumb-cell">
                        <img
                          v-if="resolveOrderPreviewUrl(order)"
                          :src="resolveOrderPreviewUrl(order)"
                          class="print-order-thumb-image"
                          alt="Превью модели"
                        >
                        <div v-else class="print-order-thumb-empty">STL</div>
                      </td>
                      <td>
                        <span class="panel__table-title">#{{ order.id }} {{ order.title || 'Без названия' }}</span>
                        <span class="panel__table-sn panel__table-sn--detail">{{ formatDate(order.created_at) }}</span>
                        <span class="panel__table-sn panel__table-sn--detail">Габариты: {{ formatDimensions(order) }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Статус:</span>
                        <span class="panel__table-text">{{ statusLabel(order.status, order.status_label) }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Цена:</span>
                        <span class="panel__table-text">{{ money(order.price_admin || order.price_client) }}</span>
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn--grayborder btn-sm"
                          @click="openOrderModal(order.id)"
                        >
                          Открыть
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
      <div v-if="isDetailModalOpen && selectedOrder" class="print-order-modal-overlay" @click.self="closeDetailModal">
        <div class="print-order-modal">
          <button type="button" class="print-order-modal__close" @click="closeDetailModal">x</button>

          <div class="print-order-modal__head">
            <h3>Заказ #{{ selectedOrder.id }}</h3>
            <span class="print-order-detail__status">{{ statusLabel(selectedOrder.status, selectedOrder.status_label) }}</span>
          </div>

          <div class="print-order-timeline">
            <div
              v-for="item in timelineItems"
              :key="item.key"
              class="print-order-timeline__item"
              :class="[
                `print-order-timeline__item--${item.state}`,
                { 'print-order-timeline__item--final': item.isFinal },
              ]"
            >
              <div class="print-order-timeline__dot"></div>
              <div class="print-order-timeline__title">{{ item.title }}</div>
            </div>
          </div>

          <div class="print-order-detail__grid">
            <div>
              <div class="print-order-main-preview">
                <img
                  v-if="resolvedPreviewUrl"
                  :src="resolvedPreviewUrl"
                  alt="Превью модели"
                  class="print-order-main-preview__image"
                >
                <div v-else class="print-order-main-preview__empty">
                  Превью модели пока не готово
                </div>
              </div>
              <div class="print-order-main-preview__actions">
                <button
                  type="button"
                  class="btn btn--grayborder"
                  :disabled="!resolvedModelUrl"
                  @click="showModel3DPreview = !showModel3DPreview"
                >
                  {{ showModel3DPreview ? 'Скрыть 3D-превью' : 'Показать 3D-превью' }}
                </button>
              </div>
              <order-model-preview
                v-if="showModel3DPreview && resolvedModelUrl"
                :model-url="resolvedModelUrl"
                :order-id="selectedOrder.id"
              />
              <div class="panel__table-text" style="margin-top: 10px;">
                <strong>STL:</strong>
                <a v-if="selectedOrder.model_file" :href="resolvedModelUrl" target="_blank" rel="noopener">Скачать файл</a>
                <span v-else>—</span>
              </div>
            </div>
            <div>
              <div class="panel__table-text"><strong>Количество:</strong> {{ selectedOrder.quantity || 1 }}</div>
              <div class="panel__table-text"><strong>Объем:</strong> {{ selectedOrder.volume_mm3 || '—' }} мм3</div>
              <div class="panel__table-text"><strong>Габариты:</strong> {{ formatDimensions(selectedOrder) }}</div>
              <div class="panel__table-text"><strong>Материал:</strong> {{ selectedOrder.material_name || '—' }}</div>
              <div class="panel__table-text"><strong>Расчетная цена:</strong> {{ money(selectedOrder.price_client) }}</div>
              <div class="panel__table-text"><strong>Цена менеджера:</strong> {{ money(selectedOrder.price_admin) }}</div>
              <div class="panel__table-text"><strong>Адрес СДЭК:</strong> {{ selectedOrder.delivery_address || '—' }}</div>
              <div class="panel__table-text"><strong>Трек-номер:</strong> {{ selectedOrder.tracking_number || '—' }}</div>
              <div v-if="selectedOrder.manager_comment" class="panel__table-text"><strong>Комментарий менеджера:</strong> {{ selectedOrder.manager_comment }}</div>
              <div v-if="selectedOrder.customer_comment" class="panel__table-text"><strong>Комментарий пользователя:</strong> {{ selectedOrder.customer_comment }}</div>
            </div>
          </div>

          <div v-if="selectedOrder.photos && selectedOrder.photos.length" class="print-order-photos">
            <a
              v-for="photo in selectedOrder.photos"
              :key="photo.id"
              :href="resolveMediaUrl(photo.image)"
              class="print-order-photo"
              target="_blank"
              rel="noopener"
            >
              <img :src="resolveMediaUrl(photo.image)" alt="Результат печати">
            </a>
          </div>

          <div class="print-order-actions">
            <div v-if="!isManagerMode" class="panel__table-text" style="margin-bottom: 6px;">
              Порядок работы: отправка на проверку стоимости, согласование цены, тестовая оплата,
              проверка готового изделия и адрес СДЭК.
            </div>

            <div v-if="!isManagerMode && canRequestPriceReview" class="print-order-action-row">
              <div class="print-order-dimensions">
                <div class="print-order-dimensions__title">
                  Подтвердите габариты модели перед отправкой менеджеру:
                </div>
                <div class="print-order-dimensions__grid">
                  <label>
                    X, см
                    <input
                      v-model="reviewDimensions.x"
                      type="number"
                      min="0.01"
                      step="0.01"
                      class="form-control"
                      @input="onReviewDimensionInput('x')"
                    >
                  </label>
                  <label>
                    Y, см
                    <input
                      v-model="reviewDimensions.y"
                      type="number"
                      min="0.01"
                      step="0.01"
                      class="form-control"
                      @input="onReviewDimensionInput('y')"
                    >
                  </label>
                  <label>
                    Z, см
                    <input
                      v-model="reviewDimensions.z"
                      type="number"
                      min="0.01"
                      step="0.01"
                      class="form-control"
                      @input="onReviewDimensionInput('z')"
                    >
                  </label>
                  <label>
                    Количество
                    <input
                      v-model="reviewQuantity"
                      type="number"
                      min="1"
                      step="1"
                      class="form-control"
                      @input="onReviewQuantityInput"
                    >
                  </label>
                </div>
                <div class="print-order-dimensions__summary">
                  <span>Объём: <strong>{{ formatVolume(reviewVolumeCm3) }} см3</strong></span>
                  <span>Примерная стоимость: <strong>{{ money(reviewEstimatedPrice) }}</strong></span>
                </div>
              </div>
              <button type="button" class="btn btn--red" :disabled="actionLoading" @click="onRequestPriceReview">
                Отправить на ручную проверку стоимости
              </button>
            </div>

            <div v-if="!isManagerMode && canAcceptOrRejectPrice" class="print-order-action-row">
              <div class="print-order-action-buttons">
                <button type="button" class="btn btn--red" :disabled="actionLoading" @click="onAcceptPrice">
                  Согласовать стоимость
                </button>
                <button type="button" class="btn btn--grayborder" :disabled="actionLoading" @click="onRejectPrice">
                  Отказаться от заказа
                </button>
              </div>
            </div>

            <div v-if="!isManagerMode && canPay" class="print-order-action-row">
              <button type="button" class="btn btn--red" :disabled="actionLoading" @click="onPayStub">
                Оплатить (тестовая заглушка)
              </button>
            </div>

            <div v-if="!isManagerMode && canReviewResult" class="print-order-action-row">
              <textarea
                v-model="deliveryAddress"
                class="form-control"
                rows="2"
                placeholder="Адрес СДЭК для отправки"
              ></textarea>
              <textarea
                v-model="reworkReason"
                class="form-control"
                rows="2"
                placeholder="Причина отправки на доработку"
              ></textarea>
              <div class="print-order-action-buttons">
                <button type="button" class="btn btn--red" :disabled="actionLoading" @click="onAcceptResult">
                  Принять заказ
                </button>
                <button type="button" class="btn btn--grayborder" :disabled="actionLoading" @click="onRequestRework">
                  На доработку
                </button>
              </div>
            </div>

            <div v-if="!isManagerMode && canRepeatOrder" class="print-order-action-row">
              <button type="button" class="btn btn--grayborder" :disabled="actionLoading" @click="onRepeatOrder">
                Повторить заказ
              </button>
            </div>

            <div v-if="!isManagerMode && canUserMarkReceived" class="print-order-action-row">
              <button type="button" class="btn btn--red" :disabled="actionLoading" @click="onUserMarkReceived">
                Отметить как полученный
              </button>
            </div>

            <div v-if="isManagerMode && canManagerSetPrice" class="print-order-action-row">
              <input
                v-model="managerPrice"
                type="number"
                min="0"
                step="0.01"
                class="form-control"
                placeholder="Итоговая стоимость"
              >
              <textarea
                v-model="managerComment"
                class="form-control"
                rows="2"
                placeholder="Комментарий к цене"
              ></textarea>
              <button type="button" class="btn btn--red" :disabled="actionLoading" @click="onManagerSetPrice">
                Сохранить цену и отметить как "Стоимость проверена"
              </button>
            </div>

            <div v-if="isManagerMode && canManagerStartPrinting" class="print-order-action-row">
              <button type="button" class="btn btn--red" :disabled="actionLoading" @click="onManagerStartPrinting">
                Начать печать
              </button>
            </div>

            <div v-if="isManagerMode && canManagerSendForReview" class="print-order-action-row">
              <input
                type="file"
                class="form-control"
                multiple
                accept="image/*"
                @change="onManagerPhotosChange"
              >
              <textarea
                v-model="managerReviewComment"
                class="form-control"
                rows="2"
                placeholder="Комментарий к готовому изделию"
              ></textarea>
              <button type="button" class="btn btn--red" :disabled="actionLoading" @click="onManagerSendForReview">
                Отправить заказчику на проверку
              </button>
            </div>

            <div v-if="isManagerMode && canManagerStartDelivery" class="print-order-action-row">
              <input
                v-model="trackingNumber"
                type="text"
                class="form-control"
                placeholder="Трек-номер СДЭК"
              >
              <button type="button" class="btn btn--red" :disabled="actionLoading" @click="onManagerStartDelivery">
                Передать в доставку
              </button>
            </div>

            <div v-if="isManagerMode && canManagerMarkReceived" class="print-order-action-row">
              <button type="button" class="btn btn--red" :disabled="actionLoading" @click="onManagerMarkReceived">
                Отметить как полученный
              </button>
            </div>

            <div v-if="canDeleteOrder" class="print-order-action-row">
              <button type="button" class="btn btn--grayborder" :disabled="actionLoading" @click="onDeleteOrder">
                Удалить заказ
              </button>
            </div>

            <div v-if="actionError" class="panel__table-text" style="color: #c13333;">{{ actionError }}</div>
            <div v-if="actionSuccess" class="panel__table-text" style="color: #198754;">{{ actionSuccess }}</div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import MenuBlock from '../elements/Panel/MenuBlock.vue'
import {
  acceptPrintOrderPrice,
  acceptPrintOrderResult,
  deletePrintOrder,
  fetchPrintOrder,
  fetchPrintOrders,
  managerMarkPrintOrderReceived,
  managerSendPrintOrderForReview,
  managerSetPrintOrderPrice,
  managerStartPrintOrder,
  managerStartPrintOrderDelivery,
  payPrintOrder,
  rejectPrintOrderPrice,
  repeatPrintOrder,
  requestPrintOrderPriceReview,
  requestPrintOrderRework,
  userMarkPrintOrderReceived
} from '@/services/print.service'
import {
  getSafePanelMode,
  getStoredPanelMode,
  isManagerUser,
  PANEL_MODE_EVENT
} from '@/utils/panelMode'

const STATUS_OPTIONS = [
  { value: 'NEW', label: 'Новый заказ' },
  { value: 'PRICE_REVIEW_REQUIRED', label: 'Требуется проверка стоимости' },
  { value: 'PRICE_VERIFIED', label: 'Стоимость проверена' },
  { value: 'CANCELLED', label: 'Отменен' },
  { value: 'IN_PAYMENT', label: 'В оплате' },
  { value: 'PAID', label: 'Оплачен' },
  { value: 'PRINTING', label: 'В печати' },
  { value: 'CUSTOMER_REVIEW', label: 'На проверке заказчиком' },
  { value: 'ACCEPTED_BY_CUSTOMER', label: 'Принят заказчиком' },
  { value: 'REWORK', label: 'На доработку' },
  { value: 'IN_DELIVERY', label: 'В доставке' },
  { value: 'RECEIVED', label: 'Получен' }
]

const STATUS_LABELS = STATUS_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.label
  return acc
}, {})

const TIMELINE_FLOW = [
  'NEW',
  'PRICE_REVIEW_REQUIRED',
  'PRICE_VERIFIED',
  'IN_PAYMENT',
  'PAID',
  'PRINTING',
  'CUSTOMER_REVIEW',
  'ACCEPTED_BY_CUSTOMER',
  'IN_DELIVERY',
  'RECEIVED'
]

export default {
  name: 'PrintOrders',
  components: {
    MenuBlock,
    OrderModelPreview: defineAsyncComponent(() => import('@/components/Print/OrderModelPreview.vue'))
  },
  data () {
    return {
      STATUS_OPTIONS,
      panelMode: 'user',
      orders: [],
      selectedOrder: null,
      isDetailModalOpen: false,
      showModel3DPreview: false,
      searchTerm: '',
      statusFilter: '',
      loading: false,
      error: '',
      actionLoading: false,
      actionError: '',
      actionSuccess: '',
      deliveryAddress: '',
      reworkReason: '',
      managerPrice: '',
      managerComment: '',
      managerReviewComment: '',
      managerPhotos: [],
      trackingNumber: '',
      reviewDimensions: {
        x: '',
        y: '',
        z: ''
      },
      reviewQuantity: 1,
      reviewBaseDimensionsCm: {
        x: null,
        y: null,
        z: null
      }
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.auth.user
    },
    isManager () {
      return isManagerUser(this.currentUser)
    },
    panelModeSafe () {
      return getSafePanelMode(this.currentUser, this.panelMode)
    },
    isManagerMode () {
      return this.isManager && this.panelModeSafe === 'manager'
    },
    filteredOrders () {
      const term = this.searchTerm.trim().toLowerCase()
      return this.orders.filter((order) => {
        if (this.statusFilter && order.status !== this.statusFilter) {
          return false
        }
        if (!term) {
          return true
        }
        const idPart = String(order.id || '')
        const titlePart = String(order.title || '').toLowerCase()
        return idPart.includes(term) || titlePart.includes(term)
      })
    },
    resolvedModelUrl () {
      if (!this.selectedOrder?.model_file) {
        return ''
      }
      return this.resolveMediaUrl(this.selectedOrder.model_file)
    },
    resolvedPreviewUrl () {
      if (!this.selectedOrder?.preview_image) {
        return ''
      }
      return this.resolveMediaUrl(this.selectedOrder.preview_image)
    },
    timelineItems () {
      if (!this.selectedOrder) {
        return []
      }

      const currentStatus = this.selectedOrder.status
      let referenceStatus = currentStatus

      if (currentStatus === 'CANCELLED') {
        referenceStatus = 'PRICE_VERIFIED'
      } else if (currentStatus === 'REWORK') {
        referenceStatus = 'CUSTOMER_REVIEW'
      }

      const referenceIndex = TIMELINE_FLOW.indexOf(referenceStatus)

      const baseItems = TIMELINE_FLOW.map((status, index) => {
        let state = 'pending'

        if (referenceIndex >= 0) {
          if (currentStatus === 'CANCELLED' || currentStatus === 'REWORK') {
            state = index <= referenceIndex ? 'completed' : 'pending'
          } else if (index < referenceIndex) {
            state = 'completed'
          } else if (index === referenceIndex) {
            state = 'active'
          }
        }

        return {
          key: status,
          title: STATUS_LABELS[status] || status,
          state,
          isFinal: false
        }
      })

      const extraItems = []
      if (currentStatus === 'REWORK') {
        extraItems.push({
          key: 'REWORK',
          title: STATUS_LABELS.REWORK,
          state: 'active',
          isFinal: false
        })
      } else if (currentStatus === 'CANCELLED') {
        extraItems.push({
          key: 'CANCELLED',
          title: STATUS_LABELS.CANCELLED,
          state: 'active',
          isFinal: true
        })
      }

      const items = [...baseItems, ...extraItems]
      if (items.length > 0) {
        items[items.length - 1].isFinal = true
      }
      return items
    },
    canRequestPriceReview () {
      return this.selectedOrder && ['NEW', 'REWORK'].includes(this.selectedOrder.status)
    },
    canAcceptOrRejectPrice () {
      return this.selectedOrder && this.selectedOrder.status === 'PRICE_VERIFIED'
    },
    canPay () {
      return this.selectedOrder && this.selectedOrder.status === 'IN_PAYMENT'
    },
    canReviewResult () {
      return this.selectedOrder && this.selectedOrder.status === 'CUSTOMER_REVIEW'
    },
    canRepeatOrder () {
      return this.selectedOrder && ['ACCEPTED_BY_CUSTOMER', 'CANCELLED', 'IN_DELIVERY', 'RECEIVED'].includes(this.selectedOrder.status)
    },
    canUserMarkReceived () {
      return this.selectedOrder && this.selectedOrder.status === 'IN_DELIVERY'
    },
    canManagerSetPrice () {
      return this.selectedOrder && ['NEW', 'PRICE_REVIEW_REQUIRED', 'REWORK'].includes(this.selectedOrder.status)
    },
    canManagerStartPrinting () {
      return this.selectedOrder && this.selectedOrder.status === 'PAID'
    },
    canManagerSendForReview () {
      return this.selectedOrder && ['PRINTING', 'REWORK'].includes(this.selectedOrder.status)
    },
    canManagerStartDelivery () {
      return this.selectedOrder && this.selectedOrder.status === 'ACCEPTED_BY_CUSTOMER'
    },
    canManagerMarkReceived () {
      return this.selectedOrder && this.selectedOrder.status === 'IN_DELIVERY'
    },
    canDeleteOrder () {
      return Boolean(this.selectedOrder?.id)
    },
    reviewParsedDimensionsCm () {
      return {
        x: this.parsePositiveDimension(this.reviewDimensions.x),
        y: this.parsePositiveDimension(this.reviewDimensions.y),
        z: this.parsePositiveDimension(this.reviewDimensions.z)
      }
    },
    reviewQuantityValue () {
      return this.parsePositiveInteger(this.reviewQuantity) || 0
    },
    reviewVolumeCm3 () {
      const { x, y, z } = this.reviewParsedDimensionsCm
      if (!x || !y || !z) {
        return 0
      }
      return this.roundTo2(x * y * z)
    },
    reviewUnitPricePerCm3 () {
      const priceClient = this.parsePositiveDimension(this.selectedOrder?.price_client)
      if (!priceClient) {
        return 0
      }
      const baseQuantity = this.parsePositiveInteger(this.selectedOrder?.quantity) || 1
      const volumeMm3 = this.parsePositiveDimension(this.selectedOrder?.volume_mm3)
      if (volumeMm3) {
        const volumeCm3 = volumeMm3 / 1000
        if (volumeCm3 > 0) {
          return priceClient / (volumeCm3 * baseQuantity)
        }
      }
      const baseXcm = this.mmToCm(this.selectedOrder?.dimension_x_mm)
      const baseYcm = this.mmToCm(this.selectedOrder?.dimension_y_mm)
      const baseZcm = this.mmToCm(this.selectedOrder?.dimension_z_mm)
      if (!baseXcm || !baseYcm || !baseZcm) {
        return 0
      }
      const baseVolumeCm3 = baseXcm * baseYcm * baseZcm
      if (baseVolumeCm3 <= 0) {
        return 0
      }
      return priceClient / (baseVolumeCm3 * baseQuantity)
    },
    reviewEstimatedPrice () {
      if (!this.reviewVolumeCm3 || !this.reviewUnitPricePerCm3 || !this.reviewQuantityValue) {
        return 0
      }
      return this.roundTo2(this.reviewVolumeCm3 * this.reviewUnitPricePerCm3 * this.reviewQuantityValue)
    }
  },
  mounted () {
    this.syncPanelMode()
    if (typeof window !== 'undefined') {
      window.addEventListener(PANEL_MODE_EVENT, this.syncPanelMode)
      window.addEventListener('storage', this.syncPanelMode)
    }
    this.fetchOrders()
  },
  beforeUnmount () {
    if (typeof window !== 'undefined') {
      window.removeEventListener(PANEL_MODE_EVENT, this.syncPanelMode)
      window.removeEventListener('storage', this.syncPanelMode)
    }
  },
  watch: {
    isManagerMode () {
      this.fetchOrders()
    },
    '$route.query.orderId': {
      async handler (newValue) {
        if (newValue) {
          await this.openOrderModal(Number(newValue))
        }
      }
    }
  },
  methods: {
    syncPanelMode () {
      this.panelMode = getStoredPanelMode()
    },
    async fetchOrders () {
      this.loading = true
      this.error = ''
      try {
        const params = {}
        if (this.isManagerMode) {
          params.my = 0
        }
        const response = await fetchPrintOrders(params)
        this.orders = Array.isArray(response.data) ? response.data : []

        const routeOrderId = Number(this.$route?.query?.orderId || 0)
        if (routeOrderId) {
          await this.openOrderModal(routeOrderId)
        } else if (this.selectedOrder?.id && this.isDetailModalOpen) {
          await this.selectOrder(this.selectedOrder.id)
        }
      } catch (err) {
        this.error = err.userMessage || 'Не удалось загрузить заказы на печать'
      } finally {
        this.loading = false
      }
    },
    async openOrderModal (orderId) {
      await this.selectOrder(orderId)
      if (this.selectedOrder?.id) {
        this.isDetailModalOpen = true
      }
      const queryOrderId = String(this.$route?.query?.orderId || '')
      const selectedId = String(orderId)
      if (queryOrderId !== selectedId) {
        this.$router.replace({
          path: '/panel/print/orders',
          query: { orderId: selectedId }
        })
      }
    },
    closeDetailModal () {
      this.isDetailModalOpen = false
      this.showModel3DPreview = false
      if (this.$route?.query?.orderId) {
        this.$router.replace({ path: '/panel/print/orders' })
      }
    },
    async selectOrder (orderId) {
      if (!orderId) {
        return
      }
      this.actionError = ''
      this.actionSuccess = ''
      try {
        const response = await fetchPrintOrder(orderId)
        this.selectedOrder = response?.data || null
        this.prefillForms()
      } catch (err) {
        this.actionError = err.userMessage || 'Не удалось открыть заказ'
      }
    },
    prefillForms () {
      this.showModel3DPreview = false
      this.deliveryAddress = this.selectedOrder?.delivery_address || ''
      this.reworkReason = ''
      this.managerPrice = this.selectedOrder?.price_admin || ''
      this.managerComment = this.selectedOrder?.manager_comment || ''
      this.managerReviewComment = ''
      this.managerPhotos = []
      this.trackingNumber = this.selectedOrder?.tracking_number || ''
      const reviewXcm = this.mmToCm(this.selectedOrder?.dimension_x_mm)
      const reviewYcm = this.mmToCm(this.selectedOrder?.dimension_y_mm)
      const reviewZcm = this.mmToCm(this.selectedOrder?.dimension_z_mm)
      this.reviewDimensions = {
        x: this.formatDimensionForInput(reviewXcm),
        y: this.formatDimensionForInput(reviewYcm),
        z: this.formatDimensionForInput(reviewZcm)
      }
      this.reviewBaseDimensionsCm = {
        x: reviewXcm,
        y: reviewYcm,
        z: reviewZcm
      }
      this.reviewQuantity = this.parsePositiveInteger(this.selectedOrder?.quantity) || 1
    },
    async performAction (action, successMessage) {
      if (!this.selectedOrder?.id) {
        return
      }

      this.actionLoading = true
      this.actionError = ''
      this.actionSuccess = ''

      try {
        const response = await action()
        if (response?.data) {
          this.selectedOrder = response.data
          this.upsertOrder(response.data)
        }
        this.actionSuccess = successMessage
        this.prefillForms()
        await this.fetchOrders()
      } catch (err) {
        this.actionError = err.userMessage || 'Не удалось выполнить действие'
      } finally {
        this.actionLoading = false
      }
    },
    upsertOrder (order) {
      if (!order || !order.id) {
        return
      }
      const index = this.orders.findIndex((item) => item.id === order.id)
      if (index === -1) {
        this.orders = [order, ...this.orders]
        return
      }
      this.orders.splice(index, 1, {
        ...this.orders[index],
        ...order
      })
    },
    async onRequestPriceReview () {
      const payload = this.getValidatedReviewPayload()
      if (!payload) {
        return
      }
      await this.performAction(
        () => requestPrintOrderPriceReview(this.selectedOrder.id, payload),
        'Заказ отправлен на ручную проверку стоимости.'
      )
    },
    async onAcceptPrice () {
      await this.performAction(
        () => acceptPrintOrderPrice(this.selectedOrder.id),
        'Стоимость согласована, заказ переведен в оплату.'
      )
    },
    async onRejectPrice () {
      await this.performAction(
        () => rejectPrintOrderPrice(this.selectedOrder.id, {}),
        'Заказ отменен.'
      )
    },
    async onPayStub () {
      await this.performAction(
        () => payPrintOrder(this.selectedOrder.id),
        'Оплата отмечена (тестовый режим).'
      )
    },
    async onAcceptResult () {
      if (!this.deliveryAddress.trim()) {
        this.actionError = 'Укажите адрес СДЭК.'
        return
      }
      await this.performAction(
        () => acceptPrintOrderResult(this.selectedOrder.id, { delivery_address: this.deliveryAddress.trim() }),
        'Заказ принят. Менеджер увидит адрес доставки.'
      )
    },
    async onRequestRework () {
      if (!this.reworkReason.trim()) {
        this.actionError = 'Укажите причину доработки.'
        return
      }
      await this.performAction(
        () => requestPrintOrderRework(this.selectedOrder.id, { reason: this.reworkReason.trim() }),
        'Заказ отправлен на доработку.'
      )
    },
    async onRepeatOrder () {
      this.actionLoading = true
      this.actionError = ''
      this.actionSuccess = ''
      try {
        const response = await repeatPrintOrder(this.selectedOrder.id)
        const newOrder = response?.data
        if (newOrder?.id) {
          this.actionSuccess = 'Создан повторный заказ.'
          await this.fetchOrders()
          await this.openOrderModal(newOrder.id)
        }
      } catch (err) {
        this.actionError = err.userMessage || 'Не удалось повторить заказ'
      } finally {
        this.actionLoading = false
      }
    },
    async onManagerSetPrice () {
      if (!this.managerPrice && this.managerPrice !== 0) {
        this.actionError = 'Укажите стоимость.'
        return
      }
      await this.performAction(
        () => managerSetPrintOrderPrice(this.selectedOrder.id, {
          price_admin: this.managerPrice,
          manager_comment: this.managerComment
        }),
        'Стоимость обновлена.'
      )
    },
    async onManagerStartPrinting () {
      await this.performAction(
        () => managerStartPrintOrder(this.selectedOrder.id),
        'Статус заказа изменен на "В печати".'
      )
    },
    onManagerPhotosChange (event) {
      this.managerPhotos = Array.from(event?.target?.files || [])
    },
    async onManagerSendForReview () {
      const payload = new FormData()
      this.managerPhotos.forEach((file) => {
        payload.append('photos', file)
      })
      if (this.managerReviewComment.trim()) {
        payload.append('manager_comment', this.managerReviewComment.trim())
      }

      await this.performAction(
        () => managerSendPrintOrderForReview(this.selectedOrder.id, payload),
        'Заказ отправлен заказчику на проверку.'
      )
    },
    async onManagerStartDelivery () {
      if (!this.trackingNumber.trim()) {
        this.actionError = 'Укажите трек-номер.'
        return
      }
      await this.performAction(
        () => managerStartPrintOrderDelivery(this.selectedOrder.id, { tracking_number: this.trackingNumber.trim() }),
        'Заказ передан в доставку.'
      )
    },
    async onUserMarkReceived () {
      await this.performAction(
        () => userMarkPrintOrderReceived(this.selectedOrder.id),
        'Заказ отмечен как полученный.'
      )
    },
    async onManagerMarkReceived () {
      await this.performAction(
        () => managerMarkPrintOrderReceived(this.selectedOrder.id),
        'Заказ отмечен как полученный.'
      )
    },
    async onDeleteOrder () {
      if (!this.selectedOrder?.id) {
        return
      }
      const isConfirmed = typeof window === 'undefined'
        ? true
        : window.confirm(`Удалить заказ #${this.selectedOrder.id}? Это действие нельзя отменить.`)
      if (!isConfirmed) {
        return
      }

      this.actionLoading = true
      this.actionError = ''
      this.actionSuccess = ''

      const orderId = this.selectedOrder.id
      try {
        await deletePrintOrder(orderId)
        this.orders = this.orders.filter(order => order.id !== orderId)
        this.closeDetailModal()
        this.selectedOrder = null
        await this.fetchOrders()
      } catch (err) {
        this.actionError = err.userMessage || 'Не удалось удалить заказ'
      } finally {
        this.actionLoading = false
      }
    },
    goToPrintCalculator () {
      this.$router.push({
        path: '/print',
        query: { start: 'upload' }
      })
    },
    resolveOrderPreviewUrl (order) {
      return this.resolveMediaUrl(order?.preview_image || '')
    },
    formatDimensionForInput (value) {
      if (value === null || value === undefined || value === '') {
        return ''
      }
      const numeric = Number(value)
      if (!Number.isFinite(numeric) || numeric <= 0) {
        return ''
      }
      return numeric.toFixed(2)
    },
    parsePositiveDimension (value) {
      if (value === null || value === undefined || value === '') {
        return null
      }
      const numeric = Number(String(value).replace(',', '.'))
      if (!Number.isFinite(numeric) || numeric <= 0) {
        return null
      }
      return numeric
    },
    parsePositiveInteger (value) {
      if (value === null || value === undefined || value === '') {
        return null
      }
      const normalized = String(value).trim()
      if (!/^\d+$/.test(normalized)) {
        return null
      }
      const numeric = Number(normalized)
      if (!Number.isInteger(numeric) || numeric <= 0) {
        return null
      }
      return numeric
    },
    mmToCm (value) {
      const mm = this.parsePositiveDimension(value)
      if (!mm) {
        return null
      }
      return mm / 10
    },
    roundTo2 (value) {
      if (!Number.isFinite(value)) {
        return 0
      }
      return Math.round(value * 100) / 100
    },
    onReviewDimensionInput (axis) {
      const currentValue = this.parsePositiveDimension(this.reviewDimensions[axis])
      if (!currentValue) {
        this.reviewDimensions = {
          ...this.reviewDimensions,
          [axis]: ''
        }
        return
      }
      const baseDimensions = this.getReviewBaseDimensionsCm()
      if (!baseDimensions) {
        this.reviewDimensions = {
          ...this.reviewDimensions,
          [axis]: this.formatDimensionForInput(currentValue)
        }
        return
      }
      const baseAxisValue = this.parsePositiveDimension(baseDimensions[axis])
      if (!baseAxisValue) {
        return
      }
      const scaleFactor = currentValue / baseAxisValue
      this.reviewDimensions = {
        x: this.formatDimensionForInput(baseDimensions.x * scaleFactor),
        y: this.formatDimensionForInput(baseDimensions.y * scaleFactor),
        z: this.formatDimensionForInput(baseDimensions.z * scaleFactor)
      }
    },
    onReviewQuantityInput () {
      const quantity = this.parsePositiveInteger(this.reviewQuantity)
      this.reviewQuantity = quantity || ''
    },
    getReviewBaseDimensionsCm () {
      const baseX = this.parsePositiveDimension(this.reviewBaseDimensionsCm.x)
      const baseY = this.parsePositiveDimension(this.reviewBaseDimensionsCm.y)
      const baseZ = this.parsePositiveDimension(this.reviewBaseDimensionsCm.z)
      if (baseX && baseY && baseZ) {
        return {
          x: baseX,
          y: baseY,
          z: baseZ
        }
      }
      const currentX = this.reviewParsedDimensionsCm.x
      const currentY = this.reviewParsedDimensionsCm.y
      const currentZ = this.reviewParsedDimensionsCm.z
      if (currentX && currentY && currentZ) {
        this.reviewBaseDimensionsCm = {
          x: currentX,
          y: currentY,
          z: currentZ
        }
        return this.reviewBaseDimensionsCm
      }
      return null
    },
    getValidatedReviewPayload () {
      const xCm = this.parsePositiveDimension(this.reviewDimensions.x)
      const yCm = this.parsePositiveDimension(this.reviewDimensions.y)
      const zCm = this.parsePositiveDimension(this.reviewDimensions.z)
      if (!xCm || !yCm || !zCm) {
        this.actionError = 'Перед отправкой укажите габариты X, Y и Z в сантиметрах.'
        return null
      }
      const quantity = this.parsePositiveInteger(this.reviewQuantity)
      if (!quantity) {
        this.actionError = 'Перед отправкой укажите количество (целое число больше 0).'
        return null
      }
      const payload = {
        dimension_x_mm: this.roundTo2(xCm * 10).toFixed(2),
        dimension_y_mm: this.roundTo2(yCm * 10).toFixed(2),
        dimension_z_mm: this.roundTo2(zCm * 10).toFixed(2),
        quantity,
        volume_mm3: this.roundTo2(this.reviewVolumeCm3 * 1000).toFixed(2)
      }
      if (this.reviewEstimatedPrice > 0) {
        payload.price_client = this.reviewEstimatedPrice.toFixed(2)
      }
      return payload
    },
    formatVolume (value) {
      const numeric = Number(value)
      if (!Number.isFinite(numeric) || numeric <= 0) {
        return '—'
      }
      return numeric.toFixed(2)
    },
    formatDimensions (order) {
      if (!order) {
        return '—'
      }
      const x = this.parsePositiveDimension(order.dimension_x_mm)
      const y = this.parsePositiveDimension(order.dimension_y_mm)
      const z = this.parsePositiveDimension(order.dimension_z_mm)
      if (!x || !y || !z) {
        return '—'
      }
      return `X ${x.toFixed(2)} мм, Y ${y.toFixed(2)} мм, Z ${z.toFixed(2)} мм`
    },
    statusLabel (status, labelFromApi) {
      if (labelFromApi) {
        return labelFromApi
      }
      return STATUS_LABELS[status] || status || '—'
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
    money (value) {
      if (value === null || value === undefined || value === '') {
        return '—'
      }
      const numeric = Number(value)
      if (Number.isFinite(numeric)) {
        return `${numeric.toFixed(2)} ₽`
      }
      return `${value} ₽`
    },
    resolveMediaUrl (path) {
      if (!path) {
        return ''
      }
      if (path.startsWith('http://') || path.startsWith('https://')) {
        return path
      }
      const base = (process.env.VUE_APP_API_BASE || '').replace(/\/+$/, '')
      if (!base) {
        return path
      }
      if (path.startsWith('/')) {
        return `${base}${path}`
      }
      return `${base}/${path}`
    }
  }
}
</script>

<style scoped>
.print-order-row--active {
  background: rgba(45, 133, 233, 0.08);
}

.print-order-head-action {
  margin-left: auto;
}

.print-order-table__thumb-cell {
  width: 124px;
}

.print-order-thumb-image {
  display: block;
  width: 112px;
  height: 78px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #d6e1ed;
  background: #f0f5fb;
}

.print-order-thumb-empty {
  width: 112px;
  height: 78px;
  border-radius: 8px;
  border: 1px solid #d6e1ed;
  background: #f0f5fb;
  color: #4c627a;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.print-order-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1300;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 16px;
  background: rgba(18, 36, 56, 0.58);
}

.print-order-modal {
  position: relative;
  width: min(1320px, calc(100vw - 32px));
  max-height: calc(100vh - 32px);
  overflow-x: hidden;
  overflow-y: auto;
  background: #fff;
  border-radius: 16px;
  padding: 24px;
}

.print-order-modal__close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 50%;
  background: #eaf0f7;
  color: #253448;
  font-size: 18px;
}

.print-order-modal__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.print-order-detail__status {
  color: #355d86;
  font-weight: 600;
}

.print-order-main-preview {
  width: 100%;
  min-height: 220px;
  border-radius: 12px;
  border: 1px solid #dce7f3;
  background: #f2f7fc;
  overflow: hidden;
}

.print-order-main-preview__image {
  width: 100%;
  max-height: 420px;
  object-fit: contain;
  display: block;
}

.print-order-main-preview__empty {
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #60748a;
  font-size: 13px;
  padding: 16px;
  text-align: center;
}

.print-order-main-preview__actions {
  margin-top: 10px;
  margin-bottom: 10px;
}

.print-order-timeline {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.print-order-timeline__item {
  min-height: 36px;
  flex: 1 1 210px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid #dbe5f0;
  background: #f7fafd;
  color: #7f8fa3;
}

.print-order-timeline__item::after {
  display: none;
}

.print-order-timeline__item--final::after {
  display: none;
}

.print-order-timeline__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #c9d6e6;
  background: #fff;
  z-index: 1;
}

.print-order-timeline__title {
  font-size: 12px;
  line-height: 1.25;
}

.print-order-timeline__item--completed {
  color: #355d86;
}

.print-order-timeline__item--completed .print-order-timeline__dot {
  border-color: #2d85e9;
  background: #2d85e9;
}

.print-order-timeline__item--completed {
  border-color: #c7def9;
  background: #f0f7ff;
}

.print-order-timeline__item--active {
  color: #152233;
  font-weight: 600;
}

.print-order-timeline__item--active .print-order-timeline__dot {
  border-color: #d83a56;
  background: #d83a56;
}

.print-order-timeline__item--active {
  border-color: #f0b7c2;
  background: #fff2f5;
}

.print-order-detail__grid {
  display: grid;
  grid-template-columns: minmax(430px, 1.55fr) minmax(300px, 1fr);
  gap: 14px;
  margin-bottom: 12px;
}

.print-order-photos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  margin: 12px 0;
}

.print-order-photo {
  display: block;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #dde6f0;
}

.print-order-photo img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.print-order-actions {
  margin-top: 12px;
  display: grid;
  gap: 12px;
}

.print-order-action-row {
  display: grid;
  gap: 10px;
}

.print-order-action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.print-order-dimensions {
  border: 1px solid #dfe8f2;
  border-radius: 10px;
  padding: 10px;
  background: #f7fafd;
}

.print-order-dimensions__title {
  font-size: 13px;
  color: #44586f;
  margin-bottom: 8px;
}

.print-order-dimensions__grid {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, minmax(120px, 1fr));
}

.print-order-dimensions__grid label {
  display: grid;
  gap: 4px;
  font-size: 13px;
  color: #4f6276;
}

.print-order-dimensions__summary {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  color: #2c4056;
  font-size: 13px;
}

@media (max-width: 992px) {
  .print-order-modal-overlay {
    padding: 10px;
  }

  .print-order-modal {
    width: calc(100vw - 20px);
    max-height: calc(100vh - 20px);
    padding: 16px;
  }

  .print-order-detail__grid {
    grid-template-columns: 1fr;
  }

  .print-order-timeline__item {
    flex-basis: 100%;
  }

  .print-order-dimensions__grid {
    grid-template-columns: 1fr;
  }
}
</style>
