<template>
  <div class="content content--pbn">
    <div class="panel">
      <div class="container">
        <div class="row">
          <menu-block />
          <div class="col-xxl-9 col-xl-8">
            <div class="panel__block">
              <div class="panel__head">
                <div class="panel__title">Материалы печати<span>{{ filteredMaterials.length }}</span></div>
                <div class="panel__search d-none d-lg-block">
                  <div class="input">
                    <input
                      id="searchPrintMaterials"
                      v-model="searchTerm"
                      type="text"
                      placeholder="Поиск по материалу или категории"
                    >
                    <label class="panel__search-icon" for="searchPrintMaterials">
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
                    <div class="d-none d-md-block">Добавить материал</div>
                  </div>
                </div>
              </div>
              <div class="panel__body">
                <div class="panel__formrow" style="max-width: 360px; margin-bottom: 12px;">
                  <label for="filterPrintMaterialsCategory">Категория</label>
                  <select id="filterPrintMaterialsCategory" v-model="selectedCategoryId" class="form-control">
                    <option value="">Все категории</option>
                    <option v-for="category in categoryOptions" :key="category.id" :value="String(category.id)">
                      {{ categoryOptionLabel(category) }}
                    </option>
                  </select>
                </div>
                <div class="panel__search d-block d-lg-none">
                  <div class="input">
                    <input
                      id="searchPrintMaterialsMob"
                      v-model="searchTerm"
                      type="text"
                      placeholder="Поиск по материалу или категории"
                    >
                    <label class="panel__search-icon" for="searchPrintMaterialsMob">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 12.75C10.3995 12.75 12.75 10.3995 12.75 7.5C12.75 4.60051 10.3995 2.25 7.5 2.25C4.60051 2.25 2.25 4.60051 2.25 7.5C2.25 10.3995 4.60051 12.75 7.5 12.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15.75 15.75L11.25 11.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </label>
                  </div>
                </div>

                <div class="panel__table">
                  <table>
                    <tr v-for="material in filteredMaterials" :key="material.id">
                      <td>
                        <span class="panel__table-title">{{ material.name }}</span>
                        <span class="panel__table-sn panel__table-sn--detail">ID: {{ material.id }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Категория:</span>
                        <span class="panel__table-text">{{ material.category_full_name || material.category_name || categoryName(material.category) }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Цена:</span>
                        <span class="panel__table-text">{{ material.price_per_mm3 }} руб/см3</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Цвет:</span>
                        <span class="panel__table-text" style="display: inline-flex; align-items: center; gap: 8px;">
                          <span
                            style="display:inline-block; width:14px; height:14px; border-radius:50%; border:1px solid #d9d9d9;"
                            :style="{ backgroundColor: material.color || '#ffffff' }"
                          ></span>
                          {{ material.color || '—' }}
                        </span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Статус:</span>
                        <span class="panel__table-text">{{ material.is_active ? 'Активен' : 'Отключен' }}</span>
                      </td>
                      <td>
                        <span class="panel__table-icon" @click="openEdit(material)">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 15H6L13.875 7.12498C14.2728 6.72716 14.4963 6.18759 14.4963 5.62498C14.4963 5.06237 14.2728 4.52281 13.875 4.12498C13.4772 3.72716 12.9376 3.50366 12.375 3.50366C11.8124 3.50366 11.2728 3.72716 10.875 4.12498L3 12V15Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M10.125 4.875L13.125 7.875" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                        </span>
                        <span class="panel__table-icon" @click="removeMaterial(material)">
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
                  <div v-if="!loading && !error && !filteredMaterials.length" class="panel__table-text">
                    Материалов пока нет
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
            <h5 class="modal-title">{{ isEditing ? 'Редактировать материал' : 'Новый материал' }}</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div v-if="error" class="panel__table-text" style="margin-bottom: 12px;">
              {{ error }}
            </div>
            <div class="panel__formrow">
              <label>Категория</label>
              <select v-model="form.category" class="form-control">
                <option :value="null">Выберите категорию</option>
                <option v-for="category in categoryOptions" :key="category.id" :value="category.id">
                  {{ categoryOptionLabel(category) }}
                </option>
              </select>
            </div>
            <div class="panel__formrow">
              <label>Название</label>
              <input v-model="form.name" type="text" class="form-control" placeholder="Например, PLA White">
            </div>
            <div class="panel__formrow">
              <label>Цена за 1 см3, руб</label>
              <input v-model="form.price_per_mm3" type="number" min="0" step="0.01" class="form-control">
            </div>
            <div class="panel__formrow">
              <label>Цвет</label>
              <div style="display: flex; gap: 12px; align-items: center;">
                <input v-model="form.color" type="color" class="form-control form-control-color">
                <input v-model="form.color" type="text" class="form-control" placeholder="#FFFFFF">
              </div>
            </div>
            <div class="panel__formrow">
              <label>Порядок сортировки</label>
              <input v-model.number="form.sort_order" type="number" min="0" class="form-control">
            </div>
            <div class="panel__formrow">
              <label style="display: flex; gap: 8px; align-items: center;">
                <input v-model="form.is_active" type="checkbox">
                <span>Материал активен</span>
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn--grayborder" @click="closeModal">Отмена</button>
            <button type="button" class="btn btn--black" :disabled="saving" @click="saveMaterial">
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
  createPrintManagerMaterial,
  deletePrintManagerMaterial,
  fetchPrintManagerMaterialCategories,
  fetchPrintManagerMaterials,
  updatePrintManagerMaterial,
} from '@/services/panel.service'

export default {
  name: 'PrintMaterials',
  components: { MenuBlock },
  data() {
    return {
      materials: [],
      categories: [],
      searchTerm: '',
      selectedCategoryId: '',
      loading: false,
      error: '',
      showModal: false,
      isEditing: false,
      saving: false,
      currentId: null,
      form: {
        category: null,
        name: '',
        color: '#ffffff',
        price_per_mm3: '0.00',
        sort_order: 0,
        is_active: true,
      },
    }
  },
  computed: {
    categoryOptions() {
      const byParent = new Map()
      this.categories.forEach((item) => {
        const parentId = item.parent || null
        if (!byParent.has(parentId)) {
          byParent.set(parentId, [])
        }
        byParent.get(parentId).push(item)
      })

      for (const [, list] of byParent) {
        list.sort((a, b) => {
          const aSort = Number(a.sort_order || 0)
          const bSort = Number(b.sort_order || 0)
          if (aSort !== bSort) {
            return aSort - bSort
          }
          return String(a.name || '').localeCompare(String(b.name || ''), 'ru')
        })
      }

      const flattened = []
      const walk = (parentId, depth) => {
        const children = byParent.get(parentId) || []
        children.forEach((child) => {
          flattened.push({
            ...child,
            _depth: depth,
          })
          walk(child.id, depth + 1)
        })
      }

      walk(null, 0)
      return flattened
    },
    filteredMaterials() {
      const term = this.searchTerm.trim().toLowerCase()
      const selectedCategorySet = this.getCategoryFilterSet()
      return this.materials.filter((item) => {
        if (selectedCategorySet && !selectedCategorySet.has(String(item.category))) {
          return false
        }
        if (!term) {
          return true
        }
        const name = String(item.name || '').toLowerCase()
        const category = String(
          item.category_full_name ||
          item.category_name ||
          this.categoryName(item.category) ||
          ''
        ).toLowerCase()
        return name.includes(term) || category.includes(term)
      })
    },
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.loading = true
      this.error = ''
      try {
        const [materialsResponse, categoriesResponse] = await Promise.all([
          fetchPrintManagerMaterials(),
          fetchPrintManagerMaterialCategories(),
        ])
        this.materials = Array.isArray(materialsResponse.data) ? materialsResponse.data : []
        this.categories = Array.isArray(categoriesResponse.data) ? categoriesResponse.data : []
      } catch (err) {
        this.error = err.userMessage || 'Не удалось загрузить материалы'
      } finally {
        this.loading = false
      }
    },
    categoryName(categoryId) {
      const category = this.categories.find((item) => Number(item.id) === Number(categoryId))
      return category ? (category.full_name || category.name) : '—'
    },
    categoryOptionLabel(category) {
      const depth = Number(category._depth || 0)
      const prefix = depth ? `${'— '.repeat(depth)}` : ''
      return `${prefix}${category.name}`
    },
    getCategoryFilterSet() {
      if (!this.selectedCategoryId) {
        return null
      }
      const rootId = Number(this.selectedCategoryId)
      const childrenMap = new Map()
      this.categories.forEach((category) => {
        const parentId = category.parent || null
        if (!childrenMap.has(parentId)) {
          childrenMap.set(parentId, [])
        }
        childrenMap.get(parentId).push(category.id)
      })

      const result = new Set([String(rootId)])
      const stack = [rootId]
      while (stack.length) {
        const current = stack.pop()
        const children = childrenMap.get(current) || []
        children.forEach((childId) => {
          result.add(String(childId))
          stack.push(childId)
        })
      }
      return result
    },
    openCreate() {
      this.isEditing = false
      this.currentId = null
      this.error = ''
      this.form = {
        category: null,
        name: '',
        color: '#ffffff',
        price_per_mm3: '0.00',
        sort_order: 0,
        is_active: true,
      }
      this.showModal = true
    },
    openEdit(material) {
      this.isEditing = true
      this.currentId = material.id
      this.error = ''
      this.form = {
        category: material.category || null,
        name: material.name || '',
        color: (material.color || '#ffffff').toLowerCase(),
        price_per_mm3: material.price_per_mm3 || '0.00',
        sort_order: Number(material.sort_order || 0),
        is_active: !!material.is_active,
      }
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    normalizeColor(value) {
      const color = String(value || '').trim()
      if (/^#[0-9a-fA-F]{6}$/.test(color)) {
        return color.toUpperCase()
      }
      return ''
    },
    async saveMaterial() {
      if (!this.form.category) {
        this.error = 'Выберите категорию'
        return
      }
      if (!this.form.name.trim()) {
        this.error = 'Заполните название материала'
        return
      }
      const color = this.normalizeColor(this.form.color)
      if (!color) {
        this.error = 'Цвет должен быть в формате #RRGGBB'
        return
      }
      const price = Number(this.form.price_per_mm3)
      if (Number.isNaN(price) || price < 0) {
        this.error = 'Цена должна быть неотрицательным числом'
        return
      }

      this.saving = true
      this.error = ''
      try {
        const payload = {
          category: Number(this.form.category),
          name: this.form.name.trim(),
          color,
          price_per_mm3: price.toFixed(2),
          sort_order: Number(this.form.sort_order || 0),
          is_active: !!this.form.is_active,
        }
        if (this.isEditing && this.currentId) {
          await updatePrintManagerMaterial(this.currentId, payload)
        } else {
          await createPrintManagerMaterial(payload)
        }
        this.closeModal()
        await this.fetchData()
      } catch (err) {
        this.error = err.userMessage || 'Не удалось сохранить материал'
      } finally {
        this.saving = false
      }
    },
    async removeMaterial(material) {
      if (!material || !material.id) {
        return
      }
      if (!confirm(`Удалить материал "${material.name}"?`)) {
        return
      }
      this.error = ''
      try {
        await deletePrintManagerMaterial(material.id)
        await this.fetchData()
      } catch (err) {
        this.error = err.userMessage || 'Не удалось удалить материал'
      }
    },
  },
}
</script>
