<template>
  <div class="content content--pbn">
    <div class="panel">
      <div class="container">
        <div class="row">
          <menu-block />
          <div class="col-xxl-9 col-xl-8">
            <div class="panel__block">
              <div class="panel__head">
                <div class="panel__title">Компании<span>{{ filteredCompanies.length }}</span></div>
                <div class="panel__search d-none d-lg-block">
                  <div class="input">
                    <input
                      id="searchCompanies"
                      v-model="searchTerm"
                      type="text"
                      placeholder="Поиск по компании, локации или сайту"
                    >
                    <label class="panel__search-icon" for="searchCompanies">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 12.75C10.3995 12.75 12.75 10.3995 12.75 7.5C12.75 4.60051 10.3995 2.25 7.5 2.25C4.60051 2.25 2.25 4.60051 2.25 7.5C2.25 10.3995 4.60051 12.75 7.5 12.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15.75 15.75L11.25 11.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div class="panel__add-btn">
                  <div class="btn btn--red btn--big" @click="openCreate">Добавить компанию</div>
                </div>
              </div>
              <div class="panel__body">
                <div class="panel__table">
                  <table>
                    <tr v-for="company in filteredCompanies" :key="company.id">
                      <td>
                        <img v-if="resolveMediaUrl(company.logo_url)" class="panel__table-img-model" :src="resolveMediaUrl(company.logo_url)" alt="">
                        <span v-else class="panel__table-text">Нет логотипа</span>
                      </td>
                      <td>
                        <span class="panel__table-title">{{ company.name || 'Без названия' }}</span>
                        <span class="panel__table-sn panel__table-sn--detail">{{ shortText(company.description) }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Категории:</span>
                        <span class="panel__table-text">{{ categoryLine(company) || '—' }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Локация:</span>
                        <span class="panel__table-text">{{ company.location || '—' }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Сайт:</span>
                        <span class="panel__table-text">{{ company.website || '—' }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Статус:</span>
                        <span class="panel__table-text">{{ company.is_active ? 'Активна' : 'Выключена' }}</span>
                      </td>
                      <td>
                        <span class="panel__table-icon" @click="openEdit(company)">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 15H6L13.875 7.12498C14.2728 6.72716 14.4963 6.18759 14.4963 5.62498C14.4963 5.06237 14.2728 4.52281 13.875 4.12498C13.4772 3.72716 12.9376 3.50366 12.375 3.50366C11.8124 3.50366 11.2728 3.72716 10.875 4.12498L3 12V15Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M10.125 4.875L13.125 7.875" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                        </span>
                        <span class="panel__table-icon" @click="removeCompany(company)">
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
                  <div v-if="!loading && !error && !filteredCompanies.length" class="panel__table-text">
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
            <h5 class="modal-title">{{ isEditing ? 'Редактировать компанию' : 'Новая компания' }}</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div v-if="error" class="panel__table-text" style="margin-bottom: 10px;">{{ error }}</div>
            <div class="panel__formrow">
              <label>Название</label>
              <input v-model="form.name" type="text" class="form-control" placeholder="Название компании">
            </div>
            <div class="panel__formrow">
              <label>Slug</label>
              <input v-model="form.slug" type="text" class="form-control" placeholder="company-name">
            </div>
            <div class="panel__formrow">
              <label>Описание</label>
              <textarea v-model="form.description" rows="4" class="form-control"></textarea>
            </div>
            <div class="panel__formrow">
              <label>Локация</label>
              <input v-model="form.location" type="text" class="form-control" placeholder="Город или страна">
            </div>
            <div class="panel__formrow">
              <label>Сайт</label>
              <input v-model="form.website" type="url" class="form-control" placeholder="https://example.com">
            </div>
            <div class="panel__formrow">
              <label>Порядок</label>
              <input v-model.number="form.sort_order" type="number" min="0" class="form-control">
            </div>
            <div class="panel__formrow">
              <label>Категории</label>
              <div class="panel__checkbox-list">
                <label v-for="category in categories" :key="category.id" class="panel__checkbox-item">
                  <input :value="category.id" type="checkbox" v-model="form.categories">
                  <span>{{ category.title }}</span>
                </label>
              </div>
            </div>
            <div class="panel__formrow">
              <label class="panel__checkbox-item">
                <input v-model="form.is_active" type="checkbox">
                <span>Активна</span>
              </label>
            </div>
            <div class="panel__formrow">
              <label>Источник логотипа</label>
              <div class="panel__radio-list">
                <label class="panel__checkbox-item">
                  <input v-model="form.sourceType" value="upload" type="radio">
                  <span>Загрузить файл</span>
                </label>
                <label class="panel__checkbox-item">
                  <input v-model="form.sourceType" value="media" type="radio">
                  <span>Выбрать из медиатеки</span>
                </label>
              </div>
            </div>
            <div v-if="form.sourceType === 'upload'" class="panel__formrow">
              <label>Файл логотипа</label>
              <input type="file" accept="image/*" class="form-control" @change="onImageChange">
              <img v-if="imagePreview" :src="imagePreview" class="panel__cover-preview" alt="">
            </div>
            <div v-else class="panel__formrow">
              <label>Путь в медиатеке</label>
              <input v-model="form.logo_media_path" type="text" class="form-control" placeholder="uploads/blog/file.png">
              <div class="panel__media-tools">
                <button type="button" class="btn btn--grayborder" @click="loadMediaLibrary">Обновить медиатеку</button>
              </div>
              <div v-if="mediaItems.length" class="panel__media-grid">
                <button
                  v-for="media in mediaItems.slice(0, 24)"
                  :key="media.path || media.url"
                  type="button"
                  class="panel__media-tile"
                  @click="selectMedia(media)"
                >
                  <img :src="resolveMediaUrl(media.url || media.path)" alt="">
                  <span>{{ media.name || media.path }}</span>
                </button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn--grayborder" @click="closeModal">Отмена</button>
            <button type="button" class="btn btn--black" :disabled="saving" @click="saveCompany">
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
import MenuBlock from '../elements/Panel/MenuBlock.vue'
import {
  createCompanyManagerCompany,
  deleteCompanyManagerCompany,
  fetchCompanyManagerCategories,
  fetchCompanyManagerCompanies,
  fetchPanelArticleMedia,
  updateCompanyManagerCompany
} from '@/services/panel.service'

export default {
  name: 'PanelCompanies',
  components: { MenuBlock },
  data () {
    return {
      companies: [],
      categories: [],
      mediaItems: [],
      searchTerm: '',
      loading: false,
      error: '',
      showModal: false,
      isEditing: false,
      saving: false,
      currentId: null,
      currentHadLogo: false,
      currentHadMediaPath: false,
      imageFile: null,
      imagePreview: '',
      form: {
        name: '',
        slug: '',
        description: '',
        location: '',
        website: '',
        categories: [],
        sort_order: 100,
        is_active: true,
        sourceType: 'upload',
        logo_media_path: ''
      }
    }
  },
  computed: {
    filteredCompanies () {
      const term = String(this.searchTerm || '').trim().toLowerCase()
      if (!term) {
        return this.companies
      }
      return this.companies.filter((company) => {
        return [
          company.name,
          company.description,
          company.location,
          company.website,
          this.categoryLine(company)
        ]
          .map((value) => String(value || '').toLowerCase())
          .some((value) => value.includes(term))
      })
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      this.loading = true
      this.error = ''
      try {
        const [companiesResponse, categoriesResponse] = await Promise.all([
          fetchCompanyManagerCompanies(),
          fetchCompanyManagerCategories()
        ])
        this.companies = Array.isArray(companiesResponse.data) ? companiesResponse.data : []
        this.categories = Array.isArray(categoriesResponse.data) ? categoriesResponse.data : []
      } catch (err) {
        this.error = err.userMessage || 'Не удалось загрузить компании'
      } finally {
        this.loading = false
      }
    },
    async loadMediaLibrary () {
      try {
        const response = await fetchPanelArticleMedia()
        this.mediaItems = Array.isArray(response.data) ? response.data : []
      } catch (err) {
        this.mediaItems = []
      }
    },
    categoryLine (company) {
      if (Array.isArray(company.category_titles) && company.category_titles.length) {
        return company.category_titles.join(', ')
      }
      const ids = new Set((Array.isArray(company.categories) ? company.categories : []).map((id) => Number(id)))
      return this.categories
        .filter((item) => ids.has(Number(item.id)))
        .map((item) => item.title)
        .join(', ')
    },
    shortText (text) {
      const value = String(text || '').trim()
      if (!value) {
        return '—'
      }
      return value.length > 90 ? `${value.slice(0, 90)}...` : value
    },
    resolveMediaUrl (path) {
      const value = String(path || '').trim()
      if (!value) {
        return ''
      }
      if (value.startsWith('http://') || value.startsWith('https://')) {
        return value
      }
      const base = String(process.env.VUE_APP_API_BASE || '').replace(/\/+$/, '')
      if (!base) {
        return value
      }
      if (value.startsWith('/')) {
        return `${base}${value}`
      }
      return `${base}/${value}`
    },
    normalizeSlug (value) {
      const raw = String(value || '').trim().toLowerCase()
      return raw
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9_-]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
    },
    normalizeWebsite (value) {
      const raw = String(value || '').trim()
      if (!raw) {
        return ''
      }
      if (/^https?:\/\//i.test(raw)) {
        return raw
      }
      return `https://${raw}`
    },
    isValidWebsite (value) {
      if (!value) {
        return true
      }
      try {
        const parsed = new URL(value)
        return parsed.protocol === 'http:' || parsed.protocol === 'https:'
      } catch (err) {
        return false
      }
    },
    resetForm () {
      this.currentId = null
      this.currentHadLogo = false
      this.currentHadMediaPath = false
      this.imageFile = null
      this.imagePreview = ''
      this.form = {
        name: '',
        slug: '',
        description: '',
        location: '',
        website: '',
        categories: [],
        sort_order: 100,
        is_active: true,
        sourceType: 'upload',
        logo_media_path: ''
      }
    },
    openCreate () {
      this.isEditing = false
      this.resetForm()
      this.showModal = true
      this.loadMediaLibrary()
    },
    openEdit (company) {
      this.isEditing = true
      this.currentId = company.id
      this.currentHadMediaPath = Boolean(company.logo_media_path)
      this.currentHadLogo = !this.currentHadMediaPath && Boolean(company.logo_url)
      this.imageFile = null
      this.imagePreview = this.resolveMediaUrl(company.logo_url)
      this.form = {
        name: company.name || '',
        slug: company.slug || '',
        description: company.description || '',
        location: company.location || '',
        website: company.website || '',
        categories: Array.isArray(company.categories) ? company.categories.map((id) => Number(id)) : [],
        sort_order: Number(company.sort_order || 100),
        is_active: Boolean(company.is_active),
        sourceType: company.logo_media_path ? 'media' : 'upload',
        logo_media_path: company.logo_media_path || ''
      }
      this.showModal = true
      this.loadMediaLibrary()
    },
    closeModal () {
      this.showModal = false
    },
    onImageChange (event) {
      const file = event && event.target && event.target.files && event.target.files[0]
      if (!file) {
        return
      }
      this.imageFile = file
      this.imagePreview = URL.createObjectURL(file)
    },
    selectMedia (media) {
      this.form.logo_media_path = String((media && media.path) || '').trim()
    },
    appendBaseFormData (payload, basePayload) {
      payload.append('name', basePayload.name)
      payload.append('description', basePayload.description)
      payload.append('location', basePayload.location)
      payload.append('website', basePayload.website)
      payload.append('sort_order', String(basePayload.sort_order))
      payload.append('is_active', String(basePayload.is_active))
      if (basePayload.slug) {
        payload.append('slug', basePayload.slug)
      }
      basePayload.categories.forEach((categoryId) => payload.append('categories', String(categoryId)))
    },
    async saveCompany () {
      const name = String(this.form.name || '').trim()
      if (!name) {
        this.error = 'Заполните название компании'
        return
      }

      const normalizedWebsite = this.normalizeWebsite(this.form.website)
      if (!this.isValidWebsite(normalizedWebsite)) {
        this.error = 'Укажите корректный адрес сайта'
        return
      }

      const basePayload = {
        name,
        description: String(this.form.description || '').trim(),
        location: String(this.form.location || '').trim(),
        website: normalizedWebsite,
        categories: Array.isArray(this.form.categories) ? this.form.categories.map((id) => Number(id)) : [],
        sort_order: Number(this.form.sort_order || 0),
        is_active: Boolean(this.form.is_active)
      }
      const normalizedSlug = this.normalizeSlug(this.form.slug)
      if (normalizedSlug) {
        basePayload.slug = normalizedSlug
      }

      this.saving = true
      this.error = ''
      try {
        let payload
        if (this.form.sourceType === 'media') {
          payload = {
            ...basePayload,
            logo_media_path: String(this.form.logo_media_path || '').trim()
          }
          if (this.isEditing) {
            payload.logo = null
          }
        } else if (this.imageFile) {
          payload = new FormData()
          this.appendBaseFormData(payload, basePayload)
          payload.append('logo_media_path', '')
          payload.append('logo', this.imageFile)
        } else {
          payload = { ...basePayload }
          if (!this.isEditing) {
            payload.logo_media_path = ''
          } else if (this.currentHadMediaPath) {
            payload.logo_media_path = ''
            payload.logo = null
          }
        }

        if (this.isEditing && this.currentId) {
          await updateCompanyManagerCompany(this.currentId, payload)
        } else {
          await createCompanyManagerCompany(payload)
        }
        this.closeModal()
        await this.fetchData()
      } catch (err) {
        this.error = err.userMessage || err.message || 'Не удалось сохранить компанию'
      } finally {
        this.saving = false
      }
    },
    async removeCompany (company) {
      if (!company || !company.id) {
        return
      }
      if (!confirm('Удалить компанию?')) {
        return
      }
      this.error = ''
      try {
        await deleteCompanyManagerCompany(company.id)
        await this.fetchData()
      } catch (err) {
        this.error = err.userMessage || 'Не удалось удалить компанию'
      }
    }
  }
}
</script>

<style scoped>
.panel__checkbox-list {
  display: grid;
  gap: 8px;
}

.panel__checkbox-item {
  display: inline-flex;
  gap: 8px;
  align-items: center;
}

.panel__radio-list {
  display: flex;
  gap: 14px;
}

.panel__media-tools {
  margin-top: 10px;
}

.panel__media-grid {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
}

.panel__media-tile {
  border: 1px solid #e4e7ec;
  border-radius: 8px;
  padding: 6px;
  display: grid;
  gap: 6px;
  background: #fff;
  text-align: left;
}

.panel__media-tile img {
  width: 100%;
  height: 90px;
  object-fit: cover;
  border-radius: 6px;
}

.panel__media-tile span {
  font-size: 11px;
  line-height: 1.2;
  color: #475467;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
