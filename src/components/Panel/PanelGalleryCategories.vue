<template>
  <div class="content content--pbn">
    <div class="panel">
      <div class="container">
        <div class="row">
          <menu-block />
          <div class="col-xxl-9 col-xl-8">
            <div class="panel__block">
              <div class="panel__head">
                <div class="panel__title">Категории галереи<span>{{ filteredCategories.length }}</span></div>
                <div class="panel__search d-none d-lg-block">
                  <div class="input">
                    <input
                      id="searchGalleryCategories"
                      v-model="searchTerm"
                      type="text"
                      placeholder="Поиск по названию, slug и описанию"
                    >
                    <label class="panel__search-icon" for="searchGalleryCategories">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 12.75C10.3995 12.75 12.75 10.3995 12.75 7.5C12.75 4.60051 10.3995 2.25 7.5 2.25C4.60051 2.25 2.25 4.60051 2.25 7.5C2.25 10.3995 4.60051 12.75 7.5 12.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15.75 15.75L11.25 11.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div class="panel__add-btn">
                  <div class="btn btn--red btn--big" @click="openCreate">Добавить категорию</div>
                </div>
              </div>
              <div class="panel__body">
                <div class="panel__table">
                  <table>
                    <tr v-for="category in filteredCategories" :key="category.id">
                      <td>
                        <span class="panel__table-title">{{ category.title || 'Без названия' }}</span>
                        <span class="panel__table-sn panel__table-sn--detail">{{ shortText(category.description) }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Slug:</span>
                        <span class="panel__table-text">{{ category.slug || '—' }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Страницы:</span>
                        <span class="panel__table-text">{{ pageTitles(category.pages).join(', ') || '—' }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Изображений:</span>
                        <span class="panel__table-text">{{ category.items_count || 0 }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Статус:</span>
                        <span class="panel__table-text">{{ category.is_active ? 'Активна' : 'Выключена' }}</span>
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
              <input v-model="form.title" type="text" class="form-control" placeholder="Название категории">
            </div>
            <div class="panel__formrow">
              <label>Slug</label>
              <input v-model="form.slug" type="text" class="form-control" placeholder="gallery-category">
            </div>
            <div class="panel__formrow">
              <label>Описание</label>
              <textarea v-model="form.description" class="form-control" rows="4"></textarea>
            </div>
            <div class="panel__formrow">
              <label>Порядок</label>
              <input v-model.number="form.sort_order" type="number" class="form-control" min="0">
            </div>
            <div class="panel__formrow">
              <label>Страницы галереи</label>
              <div class="panel__checkbox-list">
                <label v-for="page in pages" :key="page.id" class="panel__checkbox-item">
                  <input :value="page.id" type="checkbox" v-model="form.pages">
                  <span>{{ page.title }} ({{ page.key }})</span>
                </label>
              </div>
            </div>
            <div class="panel__formrow">
              <label class="panel__checkbox-item">
                <input v-model="form.is_active" type="checkbox">
                <span>Активна</span>
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn--grayborder" @click="closeModal">Отмена</button>
            <button type="button" class="btn btn--black" :disabled="saving" @click="saveCategory">
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
  createGalleryManagerCategory,
  deleteGalleryManagerCategory,
  fetchGalleryManagerCategories,
  fetchGalleryManagerPages,
  updateGalleryManagerCategory
} from '@/services/panel.service'

export default {
  name: 'PanelGalleryCategories',
  components: { MenuBlock },
  data () {
    return {
      categories: [],
      pages: [],
      searchTerm: '',
      loading: false,
      error: '',
      showModal: false,
      isEditing: false,
      saving: false,
      currentId: null,
      form: {
        title: '',
        slug: '',
        description: '',
        sort_order: 100,
        pages: [],
        is_active: true
      }
    }
  },
  computed: {
    filteredCategories () {
      const term = String(this.searchTerm || '').trim().toLowerCase()
      if (!term) {
        return this.categories
      }
      return this.categories.filter((category) => {
        return [category.title, category.slug, category.description]
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
        const [categoriesResponse, pagesResponse] = await Promise.all([
          fetchGalleryManagerCategories(),
          fetchGalleryManagerPages()
        ])
        this.categories = Array.isArray(categoriesResponse.data) ? categoriesResponse.data : []
        this.pages = Array.isArray(pagesResponse.data) ? pagesResponse.data : []
      } catch (err) {
        this.error = err.userMessage || 'Не удалось загрузить категории галереи'
      } finally {
        this.loading = false
      }
    },
    shortText (text) {
      const value = String(text || '').trim()
      if (!value) {
        return '—'
      }
      return value.length > 90 ? `${value.slice(0, 90)}...` : value
    },
    pageTitles (pageIds) {
      const ids = new Set((Array.isArray(pageIds) ? pageIds : []).map((id) => Number(id)))
      return this.pages
        .filter((page) => ids.has(Number(page.id)))
        .map((page) => page.title)
    },
    openCreate () {
      this.isEditing = false
      this.currentId = null
      this.form = {
        title: '',
        slug: '',
        description: '',
        sort_order: 100,
        pages: [],
        is_active: true
      }
      this.showModal = true
    },
    openEdit (category) {
      this.isEditing = true
      this.currentId = category.id
      this.form = {
        title: category.title || '',
        slug: category.slug || '',
        description: category.description || '',
        sort_order: Number(category.sort_order || 100),
        pages: Array.isArray(category.pages) ? category.pages.map((id) => Number(id)) : [],
        is_active: Boolean(category.is_active)
      }
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
    },
    normalizeSlug (value) {
      const raw = String(value || '').trim().toLowerCase()
      return raw
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9_-]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
    },
    async saveCategory () {
      const title = String(this.form.title || '').trim()
      if (!title) {
        this.error = 'Заполните название категории'
        return
      }

      this.saving = true
      this.error = ''
      try {
        const payload = {
          title,
          description: String(this.form.description || '').trim(),
          sort_order: Number(this.form.sort_order || 0),
          is_active: Boolean(this.form.is_active),
          pages: Array.isArray(this.form.pages) ? this.form.pages.map((id) => Number(id)) : []
        }
        const normalizedSlug = this.normalizeSlug(this.form.slug)
        if (normalizedSlug) {
          payload.slug = normalizedSlug
        }

        if (this.isEditing && this.currentId) {
          await updateGalleryManagerCategory(this.currentId, payload)
        } else {
          await createGalleryManagerCategory(payload)
        }
        this.closeModal()
        await this.fetchData()
      } catch (err) {
        this.error = err.userMessage || 'Не удалось сохранить категорию'
      } finally {
        this.saving = false
      }
    },
    async removeCategory (category) {
      if (!category || !category.id) {
        return
      }
      if (!confirm('Удалить категорию галереи?')) {
        return
      }
      this.error = ''
      try {
        await deleteGalleryManagerCategory(category.id)
        await this.fetchData()
      } catch (err) {
        this.error = err.userMessage || 'Не удалось удалить категорию'
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
</style>
