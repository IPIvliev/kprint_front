<template>
  <div class="content content--pbn">
    <div class="panel">
      <div class="container">
        <div class="row">
          <menu-block />
          <div class="col-xxl-9 col-xl-8">
            <div class="panel__block">
              <div class="panel__head">
                <div class="panel__title">Обращения на обратный звонок<span>{{ requests.length }}</span></div>
                <div class="panel__formrow panel__formrow--inline">
                  <label for="callback-status-filter">Статус</label>
                  <select
                    id="callback-status-filter"
                    v-model="selectedStatus"
                    class="form-control"
                    @change="fetchRequests"
                  >
                    <option v-for="status in statusOptions" :key="status.value" :value="status.value">
                      {{ status.label }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="panel__body">
                <div v-if="error" class="panel__table-text" style="margin-bottom: 12px;">
                  {{ error }}
                </div>

                <div class="panel__table">
                  <table>
                    <tr v-for="requestItem in requests" :key="requestItem.id">
                      <td>
                        <span class="panel__table-title">{{ requestItem.name }}</span>
                        <span class="panel__table-sn panel__table-sn--detail">{{ requestItem.phone }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Дата:</span>
                        <span class="panel__table-text">{{ formatDate(requestItem.created) }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Статус:</span>
                        <span class="panel__table-text">{{ statusLabel(requestItem) }}</span>
                      </td>
                      <td>
                        <select
                          class="form-control"
                          :value="requestItem.status"
                          :disabled="updatingId === requestItem.id"
                          @change="updateStatus(requestItem, $event)"
                        >
                          <option
                            v-for="status in editableStatuses"
                            :key="`${requestItem.id}-${status.value}`"
                            :value="status.value"
                          >
                            {{ status.label }}
                          </option>
                        </select>
                      </td>
                    </tr>
                  </table>

                  <div v-if="loading" class="panel__table-text">Загрузка...</div>
                  <div v-else-if="!requests.length" class="panel__table-text">Нет обращений для выбранного фильтра</div>
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
import {
  fetchManagerCallbackRequests,
  updateManagerCallbackRequest
} from '@/services/panel.service'
import { isManagerUser } from '@/utils/panelMode'

const STATUS_MAP = {
  new: 'Новое обращение',
  contacted: 'Связался',
  no_answer: 'Не отвечает'
}

export default {
  name: 'CallbackRequests',
  components: { MenuBlock },
  data () {
    return {
      requests: [],
      selectedStatus: 'new',
      loading: false,
      error: '',
      updatingId: null,
      statusOptions: [
        { value: 'new', label: 'Новые обращения' },
        { value: 'contacted', label: 'Связался' },
        { value: 'no_answer', label: 'Не отвечает' },
        { value: 'all', label: 'Все обращения' }
      ],
      editableStatuses: [
        { value: 'new', label: 'Новое обращение' },
        { value: 'contacted', label: 'Связался' },
        { value: 'no_answer', label: 'Не отвечает' }
      ]
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.auth.user
    }
  },
  mounted () {
    if (!isManagerUser(this.currentUser)) {
      this.$router.replace('/panel')
      return
    }
    this.fetchRequests()
  },
  methods: {
    async fetchRequests () {
      this.loading = true
      this.error = ''
      try {
        const params = this.selectedStatus === 'all'
          ? { status: 'all' }
          : { status: this.selectedStatus }
        const response = await fetchManagerCallbackRequests(params)
        this.requests = Array.isArray(response.data) ? response.data : []
      } catch (err) {
        this.requests = []
        this.error = err.userMessage || 'Не удалось загрузить обращения'
      } finally {
        this.loading = false
      }
    },
    statusLabel (requestItem) {
      if (requestItem && requestItem.status_label) {
        return requestItem.status_label
      }
      return STATUS_MAP[String(requestItem?.status || '').toLowerCase()] || '-'
    },
    formatDate (value) {
      const raw = String(value || '').trim()
      if (!raw) {
        return '-'
      }
      const parsed = new Date(raw)
      if (Number.isNaN(parsed.getTime())) {
        return raw
      }
      const pad = (num) => String(num).padStart(2, '0')
      return `${pad(parsed.getDate())}.${pad(parsed.getMonth() + 1)}.${parsed.getFullYear()} ${pad(parsed.getHours())}:${pad(parsed.getMinutes())}`
    },
    async updateStatus (requestItem, event) {
      const nextStatus = String(event.target.value || '').trim()
      if (!nextStatus || nextStatus === requestItem.status) {
        return
      }

      this.updatingId = requestItem.id
      this.error = ''
      try {
        await updateManagerCallbackRequest(requestItem.id, { status: nextStatus })
        await this.fetchRequests()
      } catch (err) {
        this.error = err.userMessage || 'Не удалось обновить статус'
      } finally {
        this.updatingId = null
      }
    }
  }
}
</script>

<style scoped>
.panel__formrow--inline {
  min-width: 260px;
}

.panel__formrow--inline label {
  margin-bottom: 8px;
}

@media (max-width: 767.98px) {
  .panel__formrow--inline {
    width: 100%;
    min-width: 0;
    margin-top: 12px;
  }
}
</style>
