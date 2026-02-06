<template>
  <div class="content content--pbn">
    <div class="panel">
      <div class="container">
        <div class="row">
          <menu-block />
          <div class="col-xxl-9 col-xl-8">
            <div class="panel__block">
              <div class="panel__head">
                <div class="panel__title">Категории курсов<span>{{ filteredCategories.length }}</span></div>
                <div class="panel__search d-none d-lg-block">
                  <div class="input">
                    <input
                      id="searchCategories"
                      type="text"
                      v-model="searchTerm"
                      placeholder="Поиск по названию или описанию"
                    >
                    <label class="panel__search-icon" for="searchCategories">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 12.75C10.3995 12.75 12.75 10.3995 12.75 7.5C12.75 4.60051 10.3995 2.25 7.5 2.25C4.60051 2.25 2.25 4.60051 2.25 7.5C2.25 10.3995 4.60051 12.75 7.5 12.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15.75 15.75L11.25 11.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div class="panel__add-btn">
                  <div class="btn btn--red btn--big" @click="openCreate">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99961 14.4001C9.69699 14.4001 11.3249 13.7258 12.5251 12.5256C13.7253 11.3253 14.3996 9.69748 14.3996 8.0001C14.3996 6.30271 13.7253 4.67485 12.5251 3.47461C11.3249 2.27438 9.69699 1.6001 7.99961 1.6001C6.30222 1.6001 4.67436 2.27438 3.47413 3.47461C2.27389 4.67485 1.59961 6.30271 1.59961 8.0001C1.59961 9.69748 2.27389 11.3253 3.47413 12.5256C4.67436 13.7258 6.30222 14.4001 7.99961 14.4001ZM8.79961 5.6001C8.79961 5.38792 8.71532 5.18444 8.56529 5.03441C8.41527 4.88438 8.21178 4.8001 7.99961 4.8001C7.78744 4.8001 7.58395 4.88438 7.43392 5.03441C7.28389 5.18444 7.19961 5.38792 7.19961 5.6001V7.2001H5.59961C5.38744 7.2001 5.18395 7.28438 5.03392 7.43441C4.88389 7.58444 4.79961 7.78792 4.79961 8.0001C4.79961 8.21227 4.88389 8.41575 5.03392 8.56578C5.18395 8.71581 5.38744 8.8001 5.59961 8.8001H7.19961V10.4001C7.19961 10.6123 7.28389 10.8158 7.43392 10.9658C7.58395 11.1158 7.78744 11.2001 7.99961 11.2001C8.21178 11.2001 8.41527 11.1158 8.56529 10.9658C8.71532 10.8158 8.79961 10.6123 8.79961 10.4001V8.8001H10.3996C10.6118 8.8001 10.8153 8.71581 10.9653 8.56578C11.1153 8.41575 11.1996 8.21227 11.1996 8.0001C11.1996 7.78792 11.1153 7.58444 10.9653 7.43441C10.8153 7.28438 10.6118 7.2001 10.3996 7.2001H8.79961V5.6001Z" fill="white"></path>
                    </svg>
                    <div class="d-none d-md-block">Добавить категорию</div>
                  </div>
                </div>
              </div>
              <div class="panel__body">
                <div class="panel__search d-block d-lg-none">
                  <div class="input">
                    <input
                      id="searchCategoriesMob"
                      type="text"
                      v-model="searchTerm"
                      placeholder="Поиск по названию или описанию"
                    >
                    <label class="panel__search-icon" for="searchCategoriesMob">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 12.75C10.3995 12.75 12.75 10.3995 12.75 7.5C12.75 4.60051 10.3995 2.25 7.5 2.25C4.60051 2.25 2.25 4.60051 2.25 7.5C2.25 10.3995 4.60051 12.75 7.5 12.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15.75 15.75L11.25 11.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div class="panel__table">
                  <table>
                    <tr v-for="category in filteredCategories" :key="categoryKey(category)">
                      <td>
                        <span class="panel__table-title">{{ category.title || 'Без названия' }}</span>
                        <span class="panel__table-sn panel__table-sn--detail">
                          {{ shortText(category.description) }}
                        </span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Родитель:</span>
                        <span class="panel__table-text">{{ parentTitle(category.parent) }}</span>
                      </td>
                      <td>
                        <span class="panel__table-icon" @click="openEdit(category)">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 15H6L13.875 7.12498C14.2728 6.72716 14.4963 6.18759 14.4963 5.62498C14.4963 5.06237 14.2728 4.52281 13.875 4.12498C13.4772 3.72716 12.9376 3.50366 12.375 3.50366C11.8124 3.50366 11.2728 3.72716 10.875 4.12498L3 12V15Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M10.125 4.875L13.125 7.875" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                        </span>
                        <span class="panel__table-icon" @click="removeCategory(category)">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 5.25H15" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M7.5 8.25V12.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M10.5 8.25V12.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M3.75 5.25L4.5 14.25C4.5 14.6478 4.65804 15.0294 4.93934 15.3107C5.22064 15.592 5.60218 15.75 6 15.75H12C12.3978 15.75 12.7794 15.592 13.0607 15.3107C13.342 15.0294 13.5 14.6478 13.5 14.25L14.25 5.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M6.75 5.25V3C6.75 2.80109 6.82902 2.61032 6.96967 2.46967C7.11032 2.32902 7.30109 2.25 7.5 2.25H10.5C10.6989 2.25 10.8897 2.32902 11.0303 2.46967C11.171 2.61032 11.25 2.80109 11.25 3V5.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                        </span>
                      </td>
                    </tr>
                  </table>
                  <div v-if="loading" class="panel__table-text">Загрузка...</div>
                  <div v-if="error" class="panel__table-text">{{ error }}</div>
                  <div v-if="!loading && !error && !filteredCategories.length" class="panel__table-text">
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
            <h5 class="modal-title">{{ isEditing ? 'Редактировать категорию' : 'Новая категория' }}</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="panel__formrow">
              <label>Название</label>
              <input type="text" v-model="form.title" class="form-control" placeholder="Название категории">
            </div>
            <div class="panel__formrow">
              <label>Описание</label>
              <textarea v-model="form.description" class="form-control" rows="6" placeholder="Описание категории"></textarea>
            </div>
            <div class="panel__formrow">
              <label>Родительская категория</label>
              <select v-model="form.parent" class="form-control">
                <option :value="null">Без родителя</option>
                <option v-for="option in parentOptions" :key="option.id" :value="option.id">
                  {{ option.title }}
                </option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn--grayborder" @click="closeModal">Отмена</button>
            <button type="button" class="btn btn--black" @click="saveCategory" :disabled="saving">
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
import { api } from '@/services/http'
import authHeader from '@/services/auth-header'

export default {
  name: 'StudyCategories',
  components: { MenuBlock },
  data() {
    return {
      categories: [],
      searchTerm: '',
      loading: false,
      error: '',
      showModal: false,
      isEditing: false,
      saving: false,
      currentId: null,
      form: {
        title: '',
        description: '',
        parent: null,
      },
    }
  },
  computed: {
    filteredCategories() {
      const term = this.searchTerm.trim().toLowerCase()
      if (!term) {
        return this.categories
      }
      return this.categories.filter((c) => {
        const title = String(c.title || '').toLowerCase()
        const description = String(c.description || '').toLowerCase()
        return title.includes(term) || description.includes(term)
      })
    },
    parentOptions() {
      return this.categories.filter((item) => item.id !== this.currentId)
    },
  },
  mounted() {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      this.loading = true
      this.error = ''
      try {
        const response = await api.get('/api/study/manager/categories', { headers: authHeader() })
        this.categories = Array.isArray(response.data) ? response.data : []
      } catch (err) {
        this.error = 'Не удалось загрузить категории'
      } finally {
        this.loading = false
      }
    },
    categoryKey(category) {
      return category.id || category.pk || category.title
    },
    shortText(text) {
      const raw = String(text || '').replace(/<\/?[^>]+(>|$)/g, '')
      if (!raw) {
        return '—'
      }
      return raw.length > 120 ? `${raw.slice(0, 120)}...` : raw
    },
    parentTitle(parentId) {
      if (!parentId) {
        return '—'
      }
      const parent = this.categories.find((item) => item.id === parentId)
      return parent ? parent.title : '—'
    },
    openCreate() {
      this.isEditing = false
      this.currentId = null
      this.form = {
        title: '',
        description: '',
        parent: null,
      }
      this.showModal = true
    },
    openEdit(category) {
      this.isEditing = true
      this.currentId = category.id || category.pk
      this.form = {
        title: category.title || '',
        description: category.description || '',
        parent: category.parent || null,
      }
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    async saveCategory() {
      if (!this.form.title) {
        this.error = 'Заполните название категории'
        return
      }
      this.saving = true
      this.error = ''
      try {
        const payload = {
          title: this.form.title,
          description: this.form.description || '',
          parent: this.form.parent || null,
        }
        if (this.isEditing && this.currentId) {
          await api.patch(`/api/study/manager/categories/${this.currentId}`, payload, { headers: authHeader() })
        } else {
          await api.post('/api/study/manager/categories', payload, { headers: authHeader() })
        }
        this.closeModal()
        await this.fetchCategories()
      } catch (err) {
        this.error = 'Не удалось сохранить категорию'
      } finally {
        this.saving = false
      }
    },
    async removeCategory(category) {
      const id = category.id || category.pk
      if (!id) {
        return
      }
      if (!confirm('Удалить категорию?')) {
        return
      }
      this.error = ''
      try {
        await api.delete(`/api/study/manager/categories/${id}`, { headers: authHeader() })
        await this.fetchCategories()
      } catch (err) {
        this.error = 'Не удалось удалить категорию'
      }
    },
  },
}
</script>
