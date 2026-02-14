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
                    <router-link :to="{path: '/shop/categories/' + Category.id + '/showcase'}">{{ Category.title }}</router-link>
                  </div>
                <h1 class="title">Каталог продукции</h1>
                <p class="news__text">Покупайте 3Д принтеры, расходные материалы для 3D печати и прочее оборудование в области аддитивных технологий.</p>

                <div class="row gy-1">
                    <div class="col-md-3 col-sm-12">
                        <ShopFilter :filters="Category.filter_attrs" @selectFilter="ChangeFilter" @rangeFilter="ChangeRangeFilter" @priceFilter="ChangePriceFilter"/>
                    </div>
                    <div class="col-md-9 col-sm-12">
                        <FilterElement :filters="filters" @selectFilter="ChangeFilter"/>
                        <div class="row">
                            <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12" v-for="product in ProductsList" :key="product.id" >
                                <ProductCard :product="product" />
                            </div>
                        </div>
                    </div>                
                </div>
                <div class="news__pagination"> 
                <ul class="news__list"> 
                    <li> <a href="#">1</a></li>
                    <li> <a class="active" href="#">2</a></li>
                    <li> <a href="#">3</a></li>
                    <li> <span> ...</span></li>
                    <li> <a href="#">12</a></li>
                    <li class="news__next"><a href="#">Дальше
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_78_8940)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 9C0.75 13.5562 4.44375 17.25 9 17.25C13.5562 17.25 17.25 13.5562 17.25 9C17.25 4.44375 13.5562 0.749999 9 0.75C4.44375 0.75 0.749999 4.44375 0.75 9ZM7.5 11.4C7.49877 11.5064 7.52557 11.6113 7.5777 11.7041C7.62983 11.797 7.70546 11.8744 7.797 11.9287C7.88592 11.9799 7.98773 12.0043 8.09018 11.999C8.19263 11.9936 8.29136 11.9588 8.3745 11.8987L11.7495 9.49875C11.8279 9.44147 11.8914 9.36636 11.935 9.27963C11.9786 9.1929 12.0008 9.09705 12 9C12.001 8.90282 11.9787 8.80682 11.9352 8.71995C11.8916 8.63308 11.828 8.55785 11.7495 8.5005L8.3745 6.1005C8.29136 6.0404 8.19263 6.0056 8.09018 6.00028C7.98773 5.99495 7.88592 6.01934 7.797 6.0705C7.70535 6.1249 7.62965 6.20248 7.57751 6.29543C7.52537 6.38839 7.49864 6.49343 7.5 6.6L7.5 11.4Z"></path>
                        </g>
                        <defs>
                            <clipPath>
                            <rect width="18" height="18" fill="white" transform="translate(0 18) rotate(-90)"></rect>
                            </clipPath>
                        </defs>
                        </svg></a></li>
                </ul>
                </div>
            </div>
            </div>
            <!--	/news-->
            <!-- callback-->
             <!--	/callback-->
            <WhiteWelcome/>
        </div>

        <footer-block />
    </div>
</template>
<script>

import HeaderBlock from '../../components/HeaderBlock.vue'
import WhiteWelcome from "../../components/elements/WhiteWelcome.vue"
import FooterBlock from '../../components/FooterBlock.vue'
import ShopFilter from "@/components/Shop/ShopFilter.vue"
import ProductCard from "@/components/elements/Shop/Showcase/ProductCard.vue"
import FilterElement from "@/components/elements/Shop/Showcase/FilterElement.vue"


export default {
    
    data() {
        return {
            filters: [],
            priceFilter: {
                from: '',
                to: ''
            },
            products: [],
            id: this.$route.params.id,
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
    created() {
        this.$store.dispatch("catalog/fetchCategoryProducts", this.id);
        this.$store.dispatch("catalog/fetchCategories");
    },
    computed: {

        ProductsList () {
            if (this.filters != '') {

                let filtered = this.$store.state.catalog.products
                

                this.filters.forEach (filter => {
                    filtered = filtered.filter((product) => {
                        return product.product_attrs_values.some(
                            ({ value }) => value === filter.attr); 
                     })
                
                })
                
                this.products = filtered

                if (this.priceFilter.from) {
                    this.products = this.products.filter(product => product.price >= Number(this.priceFilter.from))
                }
                if (this.priceFilter.to) {
                    this.products = this.products.filter(product => product.price < Number(this.priceFilter.to))
                }

                return this.products
            } else {
                this.products = this.$store.state.catalog.products

                if (this.priceFilter.from) {
                    this.products = this.products.filter(product => product.price >= Number(this.priceFilter.from))
                }
                if (this.priceFilter.to) {
                    this.products = this.products.filter(product => product.price < Number(this.priceFilter.to))
                }

                return this.products
            }
        }, 

        Category () {
            // const bodyParameters = {
            //     key: "value"
            // }
            return this.$store.state.catalog.categories.filter(category => category.id === parseInt(this.$route.params.id))[0]
        },  
    },
    methods: {
        // Для чеклиста
        // ChangeFilter(name, attr) {
        //     if (this.filters.some(filter => filter.attr === attr)) {
        //         this.filters = this.filters.filter(item => item.attr !== attr)
        //     } else {
        //         this.filters.push({name, attr, checked: true})
        //     }

        // Для радиокнопки
        ChangeFilter(name, attr) {
            if (this.filters.some(filter => filter.name === name)) {
                if (attr === 'all') {
                    this.filters = this.filters.filter(item => item.name !== name)
                } else {

                    this.filters = this.filters.filter(item => item.name !== name)
                    this.filters.push({name, attr, checked: true})
                }

            } else {
                if (attr != 'all') {
                    this.filters.push({name, attr, checked: true})
                }
            }
        },
        ChangeRangeFilter(th) {
            console.log("Range Filter")
        },
        ChangePriceFilter(position, value) {
            if (position == 'from') {
                this.priceFilter.from = value
            } else {
                this.priceFilter.to = value
            }
        },
    }
}
</script>

<style src="@/assets/css/routes/shop.css"></style>
