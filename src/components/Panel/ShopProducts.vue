<template>
  <div class="content content--pbn">
    <div class="panel">
      <div class="container">
        <div class="row">
          <menu-block />
          <div class="col-xxl-9 col-xl-8">
            <div class="panel__block">
              <div class="panel__head">
                <div class="panel__title">Товары<span>{{ filteredProducts.length }}</span></div>
                <div class="panel__search d-none d-lg-block">
                  <div class="input">
                    <input
                      id="searchShopProducts"
                      type="text"
                      v-model="searchTerm"
                      placeholder="Поиск по названию или артикулу"
                    >
                    <label class="panel__search-icon" for="searchShopProducts">
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
                    <div class="d-none d-md-block">Добавить товар</div>
                  </div>
                </div>
              </div>
              <div class="panel__body">
                <div class="panel__search d-block d-lg-none">
                  <div class="input">
                    <input
                      id="searchShopProductsMob"
                      type="text"
                      v-model="searchTerm"
                      placeholder="Поиск по названию или артикулу"
                    >
                    <label class="panel__search-icon" for="searchShopProductsMob">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 12.75C10.3995 12.75 12.75 10.3995 12.75 7.5C12.75 4.60051 10.3995 2.25 7.5 2.25C4.60051 2.25 2.25 4.60051 2.25 7.5C2.25 10.3995 4.60051 12.75 7.5 12.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15.75 15.75L11.25 11.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div class="panel__table">
                  <table>
                    <tr v-for="product in filteredProducts" :key="productKey(product)">
                      <td v-if="product.photo">
                        <img class="panel__table-img-model" :src="resolveMediaUrl(product.photo)" alt="">
                      </td>
                      <td v-else>
                        <img class="panel__table-img-model" src="@/assets/img/model_1.webp" alt="">
                      </td>
                      <td>
                        <span class="panel__table-title">{{ product.name || 'Без названия' }}</span>
                        <span class="panel__table-sn panel__table-sn--detail">
                          Артикул: {{ product.article || '-' }}
                        </span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Цена:</span>
                        <span class="panel__table-text">{{ product.price || '-' }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Остаток:</span>
                        <span class="panel__table-text">{{ product.stock ?? '-' }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Категория:</span>
                        <span class="panel__table-text">{{ categoryTitle(product.category) }}</span>
                      </td>
                      <td>
                        <span class="panel__table-icon" @click="openEdit(product)">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 15H6L13.875 7.12498C14.2728 6.72716 14.4963 6.18759 14.4963 5.62498C14.4963 5.06237 14.2728 4.52281 13.875 4.12498C13.4772 3.72716 12.9376 3.50366 12.375 3.50366C11.8124 3.50366 11.2728 3.72716 10.875 4.12498L3 12V15Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M10.125 4.875L13.125 7.875" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                        </span>
                        <span class="panel__table-icon" @click="removeProduct(product)">
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
                  <div v-if="!loading && !error && !filteredProducts.length" class="panel__table-text">
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
            <h5 class="modal-title">{{ isEditing ? 'Редактировать товар' : 'Новый товар' }}</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div v-if="error" class="panel__table-text" style="margin-bottom: 12px;">
              {{ error }}
            </div>
            <div class="panel__formrow">
              <label>Название</label>
              <input type="text" v-model="form.name" class="form-control" placeholder="Название товара">
            </div>
            <div class="panel__formrow">
              <label>Категория</label>
              <select v-model="form.category" class="form-control">
                <option disabled value="">Выберите категорию</option>
                <option v-for="option in categories" :key="option.id" :value="option.id">
                  {{ option.title }}
                </option>
              </select>
            </div>
            <div class="panel__formrow">
              <label>Артикул</label>
              <input type="text" v-model="form.article" class="form-control" placeholder="Артикул">
            </div>
            <div class="panel__formrow">
              <label>Ozon URL</label>
              <input type="url" v-model="form.ozon_url" class="form-control" placeholder="https://www.ozon.ru/product/...">
            </div>
            <div class="panel__formrow">
              <label>WB URL</label>
              <input type="url" v-model="form.wb_url" class="form-control" placeholder="https://www.wildberries.ru/catalog/...">
            </div>
            <div class="panel__formrow">
              <label>Цена</label>
              <input type="number" v-model="form.price" class="form-control" placeholder="Стоимость">
            </div>
            <div class="panel__formrow">
              <label>Остаток</label>
              <input type="number" v-model="form.stock" class="form-control" placeholder="Количество на складе">
            </div>
            <div class="panel__formrow">
              <label>Масса (гр)</label>
              <input type="number" v-model="form.mass" class="form-control" placeholder="Масса">
            </div>
            <div class="panel__formrow">
              <label>Описание</label>
              <textarea v-model="form.description" class="form-control" rows="6" placeholder="Описание товара"></textarea>
            </div>
            <div class="panel__formrow">
              <label>Обложка товара</label>
              <div
                class="panel__dropzone"
                @dragover.prevent
                @dragenter.prevent
                @drop.prevent="onDrop"
                @click="triggerFileSelect"
              >
                <div>Перетащите изображение сюда или нажмите для выбора</div>
              </div>
              <input
                ref="imageInput"
                type="file"
                class="form-control d-none"
                accept="image/*"
                @change="onImageChange"
              >
              <div v-if="imagePreview" class="panel__formrow">
                <img :src="imagePreview" alt="Предпросмотр" style="width: 200px; height: 200px; object-fit: cover; border-radius: 12px;">
              </div>
            </div>
            <div class="panel__formrow" v-if="isEditing && currentId">
              <label>Галерея товара</label>
              <div class="panel__dropzone" @dragover.prevent @dragenter.prevent @drop.prevent="onGalleryDrop" @click="triggerGallerySelect">
                <div>Перетащите изображения сюда или нажмите для загрузки</div>
              </div>
              <input
                ref="galleryInput"
                type="file"
                class="form-control d-none"
                accept="image/*"
                multiple
                @change="onGalleryChange"
              >
              <div v-if="galleryPreviews.length" class="panel__formrow" style="display: flex; gap: 12px; flex-wrap: wrap;">
                <div v-for="(src, idx) in galleryPreviews" :key="`preview-${idx}`">
                  <img :src="src" alt="" style="width: 110px; height: 90px; object-fit: cover; border-radius: 8px; opacity: 0.85;">
                </div>
              </div>
              <div class="panel__formrow" style="display: flex; gap: 12px; flex-wrap: wrap;">
                <div v-for="img in productImages" :key="img.id" style="position: relative;">
                  <img :src="resolveMediaUrl(img.src)" alt="" style="width: 110px; height: 90px; object-fit: cover; border-radius: 8px;">
                  <button type="button" class="btn btn--grayborder" style="position:absolute; top:6px; right:6px; padding:2px 6px;" @click="removeProductImage(img)">x</button>
                </div>
              </div>
            </div>
            <div class="panel__formrow" v-if="isEditing && currentId">
              <label>Характеристики товара</label>
              <div style="display:flex; gap:10px; align-items:flex-end; flex-wrap:wrap; margin-bottom:12px;">
                <div style="min-width:220px;">
                  <select v-model="newProductAttr.filter_attr" class="form-control">
                    <option disabled value="">Выберите фильтр</option>
                    <option v-for="option in filterAttrs" :key="option.id" :value="option.id">
                      {{ option.title }}
                    </option>
                  </select>
                </div>
                <div style="min-width:220px;">
                  <select v-model="newProductAttr.value" class="form-control">
                    <option disabled value="">Выберите значение</option>
                    <option
                      v-for="option in attrValueOptions(newProductAttr.filter_attr)"
                      :key="option.id"
                      :value="option.id"
                    >
                      {{ option.value }}
                    </option>
                  </select>
                </div>
                <button type="button" class="btn btn--grayborder" @click="addProductAttrValue" :disabled="attrSaving">
                  Добавить
                </button>
              </div>
              <div
                v-for="item in productAttrValues"
                :key="item.id"
                style="display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin-bottom:8px;"
              >
                <div style="min-width:220px;">
                  <select v-model="item.filter_attr" class="form-control" @change="updateProductAttrValue(item)">
                    <option v-for="option in filterAttrs" :key="option.id" :value="option.id">
                      {{ option.title }}
                    </option>
                  </select>
                </div>
                <div style="min-width:220px;">
                  <select v-model="item.value" class="form-control" @change="updateProductAttrValue(item)">
                    <option
                      v-for="option in attrValueOptions(item.filter_attr)"
                      :key="option.id"
                      :value="option.id"
                    >
                      {{ option.value }}
                    </option>
                  </select>
                </div>
                <button type="button" class="btn btn--grayborder" @click="removeProductAttrValue(item)" :disabled="attrSaving">
                  Удалить
                </button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn--grayborder" @click="closeModal">Отмена</button>
            <button type="button" class="btn btn--black" @click="saveProduct" :disabled="saving">
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
  createShopManagerFilterAttrValue,
  createShopManagerProduct,
  createShopManagerProductImage,
  deleteShopManagerFilterAttrValue,
  deleteShopManagerProduct,
  deleteShopManagerProductImage,
  fetchShopManagerCategories,
  fetchShopManagerFilterAttrs,
  fetchShopManagerProduct,
  fetchShopManagerProducts,
  fetchShopPublicProduct,
  updateShopManagerFilterAttrValue,
  updateShopManagerProduct
} from '@/services/panel.service'

export default {
  name: 'ShopProducts',
  components: { MenuBlock },
  data () {
    return {
      products: [],
      categories: [],
      searchTerm: '',
      loading: false,
      error: '',
      showModal: false,
      isEditing: false,
      saving: false,
      currentId: null,
      imageFile: null,
      imagePreview: '',
      productImages: [],
      galleryFiles: [],
      galleryPreviews: [],
      uploadingGallery: false,
      filterAttrs: [],
      productAttrValues: [],
      attrSaving: false,
      newProductAttr: {
        filter_attr: '',
        value: ''
      },
      form: {
        name: '',
        description: '',
        article: '',
        ozon_url: '',
        wb_url: '',
        stock: 0,
        mass: 0,
        price: '',
        category: ''
      }
    }
  },
  computed: {
    filteredProducts () {
      const term = this.searchTerm.trim().toLowerCase()
      if (!term) {
        return this.products
      }
      return this.products.filter((p) => {
        const name = String(p.name || '').toLowerCase()
        const article = String(p.article || '').toLowerCase()
        return name.includes(term) || article.includes(term)
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
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetchShopManagerCategories(),
          fetchShopManagerProducts()
        ])
        this.categories = Array.isArray(categoriesResponse.data) ? categoriesResponse.data : []
        this.products = Array.isArray(productsResponse.data) ? productsResponse.data : []
      } catch (err) {
        this.error = err.userMessage || 'Не удалось загрузить товары'
      } finally {
        this.loading = false
      }
    },
    productKey (product) {
      return product.id || product.pk || product.name
    },
    categoryTitle (categoryId) {
      if (categoryId && typeof categoryId === 'object') {
        return categoryId.title || categoryId.name || '-'
      }
      const option = this.categories.find((item) => Number(item.id) === Number(categoryId))
      return option ? option.title : '-'
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
    },
    normalizeId (raw) {
      if (raw && typeof raw === 'object') {
        return raw.id || raw.pk || ''
      }
      return raw
    },
    attrValueOptions (filterAttrId) {
      const id = Number(filterAttrId || 0)
      if (!id) {
        return []
      }
      const selectedAttr = this.filterAttrs.find((item) => Number(item.id) === id)
      return Array.isArray(selectedAttr?.filter_attrs_list_values) ? selectedAttr.filter_attrs_list_values : []
    },
    async loadProductAttrMeta () {
      const response = await fetchShopManagerFilterAttrs()
      this.filterAttrs = Array.isArray(response?.data) ? response.data : []
    },
    async fetchProductAttrValues () {
      if (!this.currentId) {
        this.productAttrValues = []
        return
      }
      const response = await fetchShopManagerProduct(this.currentId)
      const rawValues = Array.isArray(response?.data?.product_attrs_values) ? response.data.product_attrs_values : []
      this.productAttrValues = rawValues
        .map((item) => {
          const filterTitle = String(item?.filter_attr || '').trim()
          const valueTitle = String(item?.value || '').trim()
          const attr = this.filterAttrs.find((option) => String(option?.title || '').trim() === filterTitle)
          const filterAttrId = Number(attr?.id || 0) || ''
          const listValues = Array.isArray(attr?.filter_attrs_list_values) ? attr.filter_attrs_list_values : []
          const value = listValues.find((option) => String(option?.value || '').trim() === valueTitle)
          const valueId = Number(value?.id || 0) || ''
          return {
            id: item?.id,
            filter_attr: filterAttrId,
            value: valueId
          }
        })
        .filter((item) => item.id && item.filter_attr && item.value)
    },
    resetProductAttrEditor () {
      this.productAttrValues = []
      this.newProductAttr = {
        filter_attr: '',
        value: ''
      }
    },
    async addProductAttrValue () {
      const filterAttrId = Number(this.newProductAttr.filter_attr || 0)
      const valueId = Number(this.newProductAttr.value || 0)
      if (!this.currentId || !filterAttrId || !valueId) {
        return
      }
      this.attrSaving = true
      try {
        await createShopManagerFilterAttrValue({
          filter_attr: filterAttrId,
          product: Number(this.currentId),
          value: valueId
        })
        this.newProductAttr.value = ''
        await this.fetchProductAttrValues()
      } catch (err) {
        this.error = err.userMessage || 'Не удалось добавить характеристику'
      } finally {
        this.attrSaving = false
      }
    },
    async updateProductAttrValue (item) {
      const id = Number(item?.id || 0)
      const filterAttrId = Number(item?.filter_attr || 0)
      const valueId = Number(item?.value || 0)
      if (!id || !filterAttrId || !valueId || !this.currentId) {
        return
      }
      this.attrSaving = true
      try {
        await updateShopManagerFilterAttrValue(id, {
          filter_attr: filterAttrId,
          product: Number(this.currentId),
          value: valueId
        })
      } catch (err) {
        this.error = err.userMessage || 'Не удалось обновить характеристику'
      } finally {
        this.attrSaving = false
      }
    },
    async removeProductAttrValue (item) {
      const id = Number(item?.id || 0)
      if (!id) {
        return
      }
      this.attrSaving = true
      try {
        await deleteShopManagerFilterAttrValue(id)
        await this.fetchProductAttrValues()
      } catch (err) {
        this.error = err.userMessage || 'Не удалось удалить характеристику'
      } finally {
        this.attrSaving = false
      }
    },
    openCreate () {
      this.isEditing = false
      this.currentId = null
      this.error = ''
      this.form = {
        name: '',
        description: '',
        article: '',
        ozon_url: '',
        wb_url: '',
        stock: 0,
        mass: 0,
        price: '',
        category: ''
      }
      this.imageFile = null
      this.imagePreview = ''
      this.productImages = []
      this.galleryPreviews = []
      this.resetProductAttrEditor()
      this.showModal = true
    },
    async openEdit (product) {
      this.isEditing = true
      this.currentId = product.id || product.pk
      this.error = ''
      const rawCategory =
        (product.category && typeof product.category === 'object' && (product.category.id || product.category.pk)) ||
        product.category_id ||
        product.categoryId ||
        product.category
      const categoryId = rawCategory !== undefined && rawCategory !== null && rawCategory !== ''
        ? Number(rawCategory)
        : ''
      this.form = {
        name: product.name || '',
        description: product.description || '',
        article: product.article || '',
        ozon_url: product.ozon_url || '',
        wb_url: product.wb_url || '',
        stock: product.stock ?? 0,
        mass: product.mass ?? 0,
        price: product.price || '',
        category: categoryId
      }
      this.imageFile = null
      this.imagePreview = product.photo ? this.resolveMediaUrl(product.photo) : ''
      this.productImages = []
      this.galleryPreviews = []
      this.resetProductAttrEditor()
      this.fetchProductImages()
      try {
        await this.loadProductAttrMeta()
        await this.fetchProductAttrValues()
      } catch (err) {
        this.error = err.userMessage || 'Не удалось загрузить характеристики товара'
      }
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
      this.resetProductAttrEditor()
    },
    triggerFileSelect () {
      if (this.$refs.imageInput) {
        this.$refs.imageInput.click()
      }
    },
    onImageChange (event) {
      const file = event.target.files && event.target.files[0]
      if (!file) {
        return
      }
      this.imageFile = file
      this.imagePreview = URL.createObjectURL(file)
    },
    onDrop (event) {
      const file = event.dataTransfer.files && event.dataTransfer.files[0]
      if (!file) {
        return
      }
      if (!file.type || !file.type.startsWith('image/')) {
        return
      }
      this.imageFile = file
      this.imagePreview = URL.createObjectURL(file)
    },
    triggerGallerySelect () {
      if (this.$refs.galleryInput) {
        this.$refs.galleryInput.click()
      }
    },
    onGalleryChange (event) {
      const files = Array.from(event.target.files || [])
      if (!files.length) {
        return
      }
      this.galleryFiles = files
      this.galleryPreviews = files.map((file) => URL.createObjectURL(file))
      this.uploadGalleryFiles()
    },
    onGalleryDrop (event) {
      const files = Array.from(event.dataTransfer.files || [])
      if (!files.length) {
        return
      }
      this.galleryFiles = files.filter((file) => file.type && file.type.startsWith('image/'))
      this.galleryPreviews = this.galleryFiles.map((file) => URL.createObjectURL(file))
      this.uploadGalleryFiles()
    },
    async fetchProductImages () {
      if (!this.currentId) {
        return
      }
      try {
        let response = await fetchShopManagerProduct(this.currentId)
        let data = response && response.data ? response.data : {}
        let list = Array.isArray(data.product_images) ? data.product_images : []
        if (!list.length) {
          response = await fetchShopPublicProduct(this.currentId)
          data = response && response.data ? response.data : {}
          list = Array.isArray(data.product_images) ? data.product_images : []
        }
        this.productImages = list
      } catch (err) {
        // ignore gallery load errors
      }
    },
    async uploadGalleryFiles () {
      if (!this.currentId || !this.galleryFiles.length) {
        return
      }
      this.uploadingGallery = true
      const created = []
      for (const file of this.galleryFiles) {
        const payload = new FormData()
        payload.append('src', file)
        payload.append('product', this.currentId)
        try {
          const response = await createShopManagerProductImage(payload)
          if (response && response.data) {
            created.push(response.data)
          }
        } catch (err) {
          // ignore upload errors to allow the rest to continue
        }
      }
      if (created.length) {
        this.productImages = [...this.productImages, ...created]
      }
      this.galleryFiles = []
      await this.fetchProductImages()
      this.galleryPreviews = []
      this.uploadingGallery = false
    },
    async removeProductImage (img) {
      if (!img || !img.id) {
        return
      }
      if (!confirm('Удалить изображение?')) {
        return
      }
      await deleteShopManagerProductImage(img.id)
      await this.fetchProductImages()
    },
    async saveProduct () {
      if (!this.form.name || !this.form.category) {
        this.error = 'Заполните название и категорию'
        return
      }
      this.saving = true
      this.error = ''
      try {
        const payload = new FormData()
        payload.append('name', this.form.name)
        payload.append('description', this.form.description || '')
        payload.append('article', this.form.article || '')
        payload.append('ozon_url', this.form.ozon_url || '')
        payload.append('wb_url', this.form.wb_url || '')
        payload.append('stock', this.form.stock ?? 0)
        payload.append('mass', this.form.mass ?? 0)
        payload.append('price', this.form.price || '0')
        payload.append('category', this.form.category)
        if (this.imageFile) {
          payload.append('photo', this.imageFile)
        }
        if (this.isEditing && this.currentId) {
          await updateShopManagerProduct(this.currentId, payload)
        } else {
          await createShopManagerProduct(payload)
        }
        this.closeModal()
        await this.fetchData()
      } catch (err) {
        this.error = err.userMessage || 'Не удалось сохранить товар'
      } finally {
        this.saving = false
      }
    },
    async removeProduct (product) {
      const id = product.id || product.pk
      if (!id) {
        return
      }
      if (!confirm('Удалить товар?')) {
        return
      }
      this.error = ''
      try {
        await deleteShopManagerProduct(id)
        await this.fetchData()
      } catch (err) {
        this.error = err.userMessage || 'Не удалось удалить товар'
      }
    }
  }
}
</script>

