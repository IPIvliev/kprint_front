<template>
  <div class="content content--pbn">
    <div class="panel">
      <div class="container">
        <div class="row">
          <menu-block />
          <div class="col-xxl-9 col-xl-8">
            <div class="panel__block">
              <div class="panel__head">
                <div class="panel__title">Изображения галереи<span>{{ filteredItems.length }}</span></div>
                <div class="panel__search d-none d-lg-block">
                  <div class="input">
                    <input
                      id="searchGalleryItems"
                      v-model="searchTerm"
                      type="text"
                      placeholder="Поиск по названию и описанию"
                    >
                    <label class="panel__search-icon" for="searchGalleryItems">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 12.75C10.3995 12.75 12.75 10.3995 12.75 7.5C12.75 4.60051 10.3995 2.25 7.5 2.25C4.60051 2.25 2.25 4.60051 2.25 7.5C2.25 10.3995 4.60051 12.75 7.5 12.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15.75 15.75L11.25 11.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div class="panel__add-btn">
                  <div class="btn btn--red btn--big" @click="openCreate">Добавить изображение</div>
                </div>
              </div>
              <div class="panel__body">
                <div class="panel__table">
                  <table>
                    <tr v-for="item in filteredItems" :key="item.id">
                      <td>
                        <img v-if="resolveMediaUrl(item.image_url)" class="panel__table-img-model" :src="resolveMediaUrl(item.image_url)" alt="">
                        <span v-else class="panel__table-text">Нет превью</span>
                      </td>
                      <td>
                        <span class="panel__table-title">{{ item.title || 'Без названия' }}</span>
                        <span class="panel__table-sn panel__table-sn--detail">{{ shortText(item.description) }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Категория:</span>
                        <span class="panel__table-text">{{ item.category_title || categoryTitle(item.category) || '—' }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Источник:</span>
                        <span class="panel__table-text">{{ item.media_path ? 'Медиатека' : 'Загрузка' }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Статус:</span>
                        <span class="panel__table-text">{{ item.is_active ? 'Активно' : 'Выключено' }}</span>
                      </td>
                      <td>
                        <span class="panel__table-icon" @click="openEdit(item)">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 15H6L13.875 7.12498C14.2728 6.72716 14.4963 6.18759 14.4963 5.62498C14.4963 5.06237 14.2728 4.52281 13.875 4.12498C13.4772 3.72716 12.9376 3.50366 12.375 3.50366C11.8124 3.50366 11.2728 3.72716 10.875 4.12498L3 12V15Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M10.125 4.875L13.125 7.875" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                        </span>
                        <span class="panel__table-icon" @click="removeItem(item)">
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
                  <div v-if="!loading && !error && !filteredItems.length" class="panel__table-text">
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
            <h5 class="modal-title">{{ isEditing ? 'Редактировать изображение' : 'Новое изображение' }}</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="panel__formrow">
              <label>Категория</label>
              <select v-model.number="form.category" class="form-control">
                <option :value="0" disabled>Выберите категорию</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.title }}
                </option>
              </select>
            </div>
            <div class="panel__formrow">
              <label>Название</label>
              <input v-model="form.title" type="text" class="form-control" placeholder="Название изображения">
            </div>
            <div class="panel__formrow">
              <label>Описание</label>
              <textarea v-model="form.description" rows="4" class="form-control"></textarea>
            </div>
            <div class="panel__formrow">
              <label>Порядок</label>
              <input v-model.number="form.sort_order" type="number" min="0" class="form-control">
            </div>
            <div class="panel__formrow">
              <label class="panel__checkbox-item">
                <input v-model="form.is_active" type="checkbox">
                <span>Активно</span>
              </label>
            </div>
            <div class="panel__formrow">
              <label>Источник изображения</label>
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
              <label>Файл</label>
              <input type="file" accept="image/*" class="form-control" @change="onImageChange">
              <img v-if="imagePreview" :src="imagePreview" class="panel__cover-preview" alt="">
            </div>
            <div v-else class="panel__formrow">
              <label>Путь в медиатеке</label>
              <input v-model="form.media_path" type="text" class="form-control" placeholder="uploads/blog/file.png">
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
            <button type="button" class="btn btn--black" :disabled="saving" @click="saveItem">
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
  createGalleryManagerItem,
  deleteGalleryManagerItem,
  fetchGalleryManagerCategories,
  fetchGalleryManagerItems,
  fetchPanelArticleMedia,
  updateGalleryManagerItem
} from '@/services/panel.service'

export default {
  name: 'PanelGalleryItems',
  components: { MenuBlock },
  data () {
    return {
      items: [],
      categories: [],
      mediaItems: [],
      searchTerm: '',
      loading: false,
      error: '',
      showModal: false,
      isEditing: false,
      saving: false,
      currentId: null,
      currentHadImage: false,
      imageFile: null,
      imagePreview: '',
      form: {
        category: 0,
        title: '',
        description: '',
        sort_order: 100,
        is_active: true,
        sourceType: 'upload',
        media_path: ''
      }
    }
  },
  computed: {
    filteredItems () {
      const term = String(this.searchTerm || '').trim().toLowerCase()
      if (!term) {
        return this.items
      }
      return this.items.filter((item) => {
        return [item.title, item.description, item.category_title]
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
        const [itemsResponse, categoriesResponse] = await Promise.all([
          fetchGalleryManagerItems(),
          fetchGalleryManagerCategories()
        ])
        this.items = Array.isArray(itemsResponse.data) ? itemsResponse.data : []
        this.categories = Array.isArray(categoriesResponse.data) ? categoriesResponse.data : []
      } catch (err) {
        this.error = err.userMessage || 'Не удалось загрузить изображения галереи'
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
    categoryTitle (categoryId) {
      const category = this.categories.find((item) => Number(item.id) === Number(categoryId))
      return category ? category.title : ''
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
    resetForm () {
      this.currentId = null
      this.currentHadImage = false
      this.imageFile = null
      this.imagePreview = ''
      this.form = {
        category: 0,
        title: '',
        description: '',
        sort_order: 100,
        is_active: true,
        sourceType: 'upload',
        media_path: ''
      }
    },
    openCreate () {
      this.isEditing = false
      this.resetForm()
      this.showModal = true
      this.loadMediaLibrary()
    },
    openEdit (item) {
      this.isEditing = true
      this.currentId = item.id
      this.currentHadImage = Boolean(item.image && !item.media_path)
      this.imageFile = null
      this.imagePreview = this.resolveMediaUrl(item.image_url)
      this.form = {
        category: Number(item.category || 0),
        title: item.title || '',
        description: item.description || '',
        sort_order: Number(item.sort_order || 100),
        is_active: Boolean(item.is_active),
        sourceType: item.media_path ? 'media' : 'upload',
        media_path: item.media_path || ''
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
      this.form.media_path = String((media && media.path) || '').trim()
    },
    async saveItem () {
      if (!this.form.category) {
        this.error = 'Выберите категорию'
        return
      }
      if (!String(this.form.title || '').trim()) {
        this.error = 'Заполните название изображения'
        return
      }

      const basePayload = {
        category: Number(this.form.category),
        title: String(this.form.title || '').trim(),
        description: String(this.form.description || '').trim(),
        sort_order: Number(this.form.sort_order || 0),
        is_active: Boolean(this.form.is_active)
      }

      this.saving = true
      this.error = ''
      try {
        let payload
        if (this.form.sourceType === 'media') {
          const mediaPath = String(this.form.media_path || '').trim()
          if (!mediaPath) {
            throw new Error('Укажите путь файла из медиатеки')
          }
          payload = {
            ...basePayload,
            media_path: mediaPath
          }
          if (this.isEditing) {
            payload.image = null
          }
        } else if (this.imageFile) {
          payload = new FormData()
          Object.entries(basePayload).forEach(([key, value]) => payload.append(key, value))
          payload.append('media_path', '')
          payload.append('image', this.imageFile)
        } else if (!this.isEditing) {
          throw new Error('Выберите файл изображения')
        } else if (!this.currentHadImage) {
          throw new Error('Выберите файл изображения')
        } else {
          payload = { ...basePayload, media_path: '' }
        }

        if (this.isEditing && this.currentId) {
          await updateGalleryManagerItem(this.currentId, payload)
        } else {
          await createGalleryManagerItem(payload)
        }
        this.closeModal()
        await this.fetchData()
      } catch (err) {
        this.error = err.userMessage || err.message || 'Не удалось сохранить изображение'
      } finally {
        this.saving = false
      }
    },
    async removeItem (item) {
      if (!item || !item.id) {
        return
      }
      if (!confirm('Удалить изображение галереи?')) {
        return
      }
      this.error = ''
      try {
        await deleteGalleryManagerItem(item.id)
        await this.fetchData()
      } catch (err) {
        this.error = err.userMessage || 'Не удалось удалить изображение'
      }
    }
  }
}
</script>

<style scoped>
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
