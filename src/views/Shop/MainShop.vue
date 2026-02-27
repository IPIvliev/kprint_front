<template>
  <div class="page cmp-views-shop-mainshop">
    <header-block />

    <div class="content">
      <div class="white_block light_gray_background">
        <div class="container">
          <div class="bread">
            <router-link to="/">Главная</router-link>
            <span class="arrow">></span>
            <router-link to="/shop">Магазин</router-link>
            <span class="arrow">></span>
            <router-link :to="{ path: '/shop/categories/' + categorySlug + '/showcase' }">{{ Category.title }}</router-link>
          </div>
          <h1 class="title">Каталог продукции</h1>
          <p class="news__text">
            Покупайте 3D-принтеры, расходные материалы для 3D-печати и профильное оборудование
            для аддитивных технологий.
          </p>

          <div class="row gy-1">
            <div class="col-md-3 col-sm-12">
              <ShopFilter
                :filters="Category.filter_attrs"
                :selectedFilters="filters"
                :facets="catalogFacets"
                @selectFilter="ChangeFilter"
                @rangeFilter="ChangeRangeFilter"
                @priceFilter="ChangePriceFilter"
              />
            </div>
            <div class="col-md-9 col-sm-12">
              <FilterElement :filters="filters" @selectFilter="ChangeFilter" />
              <div class="row">
                <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12" v-for="product in paginatedProducts" :key="product.id">
                  <ProductCard :product="product" />
                </div>
              </div>
            </div>
          </div>

          <div class="news__pagination" v-if="totalPages > 1">
            <ul class="news__list">
              <li v-for="(page, pageIndex) in paginationPages" :key="`catalog-page-${page}-${pageIndex}`">
                <span v-if="page === 'ellipsis'">...</span>
                <a v-else href="#" :class="{ active: page === currentPage }" @click.prevent="goToPage(page)">{{ page }}</a>
              </li>
              <li class="news__next">
                <a href="#" @click.prevent="goToNextPage">Далее
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_78_8940)">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 9C0.75 13.5562 4.44375 17.25 9 17.25C13.5562 17.25 17.25 13.5562 17.25 9C17.25 4.44375 13.5562 0.749999 9 0.75C4.44375 0.75 0.749999 4.44375 0.75 9ZM7.5 11.4C7.49877 11.5064 7.52557 11.6113 7.5777 11.7041C7.62983 11.797 7.70546 11.8744 7.797 11.9287C7.88592 11.9799 7.98773 12.0043 8.09018 11.999C8.19263 11.9936 8.29136 11.9588 8.3745 11.8987L11.7495 9.49875C11.8279 9.44147 11.8914 9.36636 11.935 9.27963C11.9786 9.1929 12.0008 9.09705 12 9C12.001 8.90282 11.9787 8.80682 11.9352 8.71995C11.8916 8.63308 11.828 8.55785 11.7495 8.5005L8.3745 6.1005C8.29136 6.0404 8.19263 6.0056 8.09018 6.00028C7.98773 5.99495 7.88592 6.01934 7.797 6.0705C7.70535 6.1249 7.62965 6.20248 7.57751 6.29543C7.52537 6.38839 7.49864 6.49343 7.5 6.6L7.5 11.4Z"></path>
                    </g>
                    <defs>
                      <clipPath>
                        <rect width="18" height="18" fill="white" transform="translate(0 18) rotate(-90)"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <WhiteWelcome />
    </div>

    <footer-block />
  </div>
</template>

<script>
import HeaderBlock from '../../components/HeaderBlock.vue'
import WhiteWelcome from '../../components/elements/WhiteWelcome.vue'
import FooterBlock from '../../components/FooterBlock.vue'
import ShopFilter from '@/components/Shop/ShopFilter.vue'
import ProductCard from '@/components/elements/Shop/Showcase/ProductCard.vue'
import FilterElement from '@/components/elements/Shop/Showcase/FilterElement.vue'

export default {
  data () {
    return {
      filters: [],
      priceFilter: {
        from: '',
        to: ''
      },
      currentPage: 1,
      pageSize: 9,
      priceDebounceTimer: null,
      priceDebounceMs: 450
    }
  },
  components: {
    FooterBlock,
    HeaderBlock,
    ShopFilter,
    FilterElement,
    ProductCard,
    WhiteWelcome
  },
  async created () {
    await this.$store.dispatch('catalog/fetchCategories')
    await this.loadCategoryProducts()
  },
  beforeUnmount () {
    if (this.priceDebounceTimer) {
      clearTimeout(this.priceDebounceTimer)
      this.priceDebounceTimer = null
    }
  },
  computed: {
    categoryLookup () {
      return String(this.$route.params.categorySlug || '').trim()
    },
    ProductsList () {
      return this.$store.state.catalog.products
    },
    paginatedProducts () {
      const offset = (this.currentPage - 1) * this.pageSize
      return this.ProductsList.slice(offset, offset + this.pageSize)
    },
    totalPages () {
      return Math.max(1, Math.ceil(this.ProductsList.length / this.pageSize))
    },
    paginationPages () {
      if (this.totalPages <= 7) {
        return Array.from({ length: this.totalPages }, (_, index) => index + 1)
      }
      const pages = [1]
      const start = Math.max(2, this.currentPage - 1)
      const end = Math.min(this.totalPages - 1, this.currentPage + 1)
      if (start > 2) {
        pages.push('ellipsis')
      }
      for (let page = start; page <= end; page += 1) {
        pages.push(page)
      }
      if (end < this.totalPages - 1) {
        pages.push('ellipsis')
      }
      pages.push(this.totalPages)
      return pages
    },
    Category () {
      const lookup = this.categoryLookup
      return this.$store.state.catalog.categories.find((category) => {
        return String(category.slug || '').trim() === lookup || String(category.id) === lookup
      }) || { filter_attrs: [], id: null, slug: lookup, title: '' }
    },
    categorySlug () {
      return this.Category.slug || this.categoryLookup
    },
    catalogFacets () {
      return this.$store.state.catalog.facets || null
    }
  },
  watch: {
    ProductsList () {
      this.syncCurrentPage()
    },
    '$route.params.categorySlug': {
      async handler () {
        this.filters = []
        this.priceFilter = { from: '', to: '' }
        this.currentPage = 1
        await this.loadCategoryProducts()
      }
    }
  },
  methods: {
    resolveFilterSelection (name, attr, filterAttrId, valueId) {
      let resolvedFilterAttrId = Number(filterAttrId || 0)
      let resolvedValueId = Number(valueId || 0)
      if (!resolvedFilterAttrId || (!resolvedValueId && attr !== 'all')) {
        const attrs = Array.isArray(this.Category?.filter_attrs) ? this.Category.filter_attrs : []
        const selectedAttr = attrs.find(item => String(item.title || '') === String(name || ''))
        if (selectedAttr) {
          resolvedFilterAttrId = Number(selectedAttr.id || 0)
          if (attr !== 'all') {
            const selectedValue = (selectedAttr.filter_attrs_list_values || []).find(
              item => String(item.value || '') === String(attr || '')
            )
            resolvedValueId = Number(selectedValue?.id || 0)
          }
        }
      }
      return {
        filterAttrId: resolvedFilterAttrId || null,
        valueId: resolvedValueId || null
      }
    },
    buildCategoryQueryParams () {
      const params = {
        include_facets: '1'
      }
      const attr = this.filters
        .filter(item => Number(item.filterAttrId) > 0 && Number(item.valueId) > 0)
        .map(item => `${Number(item.filterAttrId)}:${Number(item.valueId)}`)
      if (attr.length) {
        params.attr = attr
      }
      if (this.priceFilter.from) {
        params.price_from = this.priceFilter.from
      }
      if (this.priceFilter.to) {
        params.price_to = this.priceFilter.to
      }
      return params
    },
    async loadCategoryProducts () {
      await this.$store.dispatch('catalog/fetchCategoryProducts', {
        slug: this.categorySlug,
        filters: this.filters,
        price_from: this.priceFilter.from,
        price_to: this.priceFilter.to,
        params: this.buildCategoryQueryParams()
      })
      this.syncCurrentPage()
    },
    syncCurrentPage () {
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages
      }
      if (this.currentPage < 1) {
        this.currentPage = 1
      }
    },
    goToPage (page) {
      const pageNumber = Number(page)
      if (!Number.isFinite(pageNumber)) {
        return
      }
      this.currentPage = Math.min(this.totalPages, Math.max(1, pageNumber))
    },
    goToNextPage () {
      this.goToPage(this.currentPage + 1)
    },
    async ChangeFilter (name, attr, filterAttrId = null, valueId = null) {
      const resolved = this.resolveFilterSelection(name, attr, filterAttrId, valueId)
      if (this.filters.some(filter => filter.name === name)) {
        if (attr === 'all') {
          this.filters = this.filters.filter(item => item.name !== name)
        } else {
          this.filters = this.filters.filter(item => item.name !== name)
          this.filters.push({ name, attr, checked: true, filterAttrId: resolved.filterAttrId, valueId: resolved.valueId })
        }
      } else if (attr !== 'all') {
        this.filters.push({ name, attr, checked: true, filterAttrId: resolved.filterAttrId, valueId: resolved.valueId })
      }
      this.currentPage = 1
      await this.loadCategoryProducts()
    },
    ChangeRangeFilter () {
    },
    schedulePriceReload () {
      if (this.priceDebounceTimer) {
        clearTimeout(this.priceDebounceTimer)
      }
      this.priceDebounceTimer = setTimeout(() => {
        this.loadCategoryProducts()
      }, this.priceDebounceMs)
    },
    ChangePriceFilter (position, value) {
      if (position === 'from') {
        this.priceFilter.from = value
      } else {
        this.priceFilter.to = value
      }
      this.currentPage = 1
      this.schedulePriceReload()
    }
  }
}
</script>

<style src="@/assets/css/routes/shop.css"></style>
