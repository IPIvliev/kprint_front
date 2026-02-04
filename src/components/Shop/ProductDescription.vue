<template>
  <div class="white_block cmp-components-shop-productdescription" :class="background">
        <div class="container"> 
            <div class="row gy-1">

                <div class="col-xl-1 d-sm-block d-none">
                    <img :src="image.src" class="product_pictures" 
                    v-for="image in GetPhotos" 
                    @mouseover="current_image = image.src"
                    width="100" height="100">
                </div>
                <div class="col-xl-4 col-sm-12">
                    <img :src="current_image" class="product_photo" width="420" height="420">
                </div>
                <div class="col-xl-7 col-sm-12 product_description">
                    <div class="rating-stock-m-shop-item">
                        <div class="rating-shop-item">
                            <img class="icons-small-shop-item" src="@/assets/img/icon_Star.svg" />
                            <img class="icons-small-shop-item" src="@/assets/img/icon_Star.svg" />
                            <img class="icons-small-shop-item" src="@/assets/img/icon_Star.svg" />
                            <img class="icons-small-shop-item" src="@/assets/img/icon_Star.svg" />
                            <img class="icons-small-shop-item" src="@/assets/img/icon_Star.svg" />
                        </div>
                        <div class="stock-shop-item">
                            <ProductStock :stock="product.stock" />
                        </div>
                    </div>

                    <p>Фотополимер "Реактив" предназначен для печати на 3d-принтерах, работающих по технологии LCD. 
                        В жидком виде материал имеет низкую вязкость. и высокую скорость печати.
                    </p>
                    <div class="row product_characteristics">
                        <div class="col-xl-6 col-sm-12" v-for="filter in product.product_attrs_values">
                            <span class="product_characteristic_name">{{ filter.filter_attr }}: </span>
                            <span class="product_characteristic_value">{{ filter.value }}</span>
                            <hr>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-6 col-sm-12">
                            <div class="row">
                                <div class="col-4">
                                    <div class="product_price">{{ getPrice(product.price) }} ₽</div>
                                </div>
                                <div class="col-4 middle-element">
                                    <ProductAmount :product="product"/>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn--red" :disabled="!productIsInStock(product)" @click="addProductToCart">
                                        <img class="basket_product" src="@/assets/img/small-5.svg" />
                                        <div class="text_btn_product">В корзину</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-6"></div>
                    </div>
                </div>
            </div>
            <div class="row gy-1">
                <div class="col-12">
                    <div class="product_about">
                        <div class="row">
                            <div class="col-xl-6 col-sm-12">
                                <h4 class="product_about_title">Характеристики</h4>
                                <p>На принтерах Anycubic Photon на слой в 50 мкм рекомендуется выставлять время полимеризации от 10 секунд. На принтерах Anycubic Photon S время экспозиции можно уменьшить до 6.
                                </p><p>"Reactive" является, на сегодняшний день, самой быстрой смолой из линейки полимеров Gorky Liquid. Фотополимер отличается великолепной детализацией как по оси Z, так и по X/Y. Это позволяет печатать сложные, мелкие детали. Полимер будет незаменим, как при изготовлении функциональных деталей, так и при печати детализированных фигурок для настольных игр - везде, где требуется чёткость и максимальное качество.
                                </p><p>Смола упакована в металлическую тару. Банка со смолой помещается в специальный ложемент и картонную коробку для минимализации рисков повреждения при транспортировке. Первоначально будет доступна тара в 1 кг.</p>
                                
                            </div>
                            <div class="col-xl-6 col-sm-12">
                                <div class="row product_characteristics">
                                    <div class="col-12" v-for="filter in product.product_attrs_values">
                                        <span class="product_characteristic_name">{{ filter.filter_attr }}: </span>
                                        <span class="product_characteristic_value">{{ filter.value }}</span>
                                        <hr>
                                    </div>
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
import ProductStock from "@/components/elements/Shop/ProductStock.vue"
import ProductAmount from '@/components/elements/Shop/ProductAmount.vue'

    export default {
        props: ['background', 'product'],
        components: { ProductStock, ProductAmount },
        data() {
            return {
                current_image: ''
            }
        },
        beforeCreate() {
            this.$store.commit('shop/initialiseCart');
        },
        computed: {
            GetPhotos() {
                let photos = []
                photos.push({ src: this.product.photo })
                this.product.product_images.forEach((photo) => {
                    photos.push({ src: photo.src })
                })
                this.current_image = this.product.photo
                return photos
            },
            getCart() {
                console.log("localStorage ", localStorage.getItem('cart'))
                // return localStorage.getItem('cart')
                return this.$store.state.shop.cart
            },
            productIsInStock() {
                return this.$store.getters['shop/productIsInStock']
            },
        },
        methods: {
            getPrice(price) {
                price = String(price).split('.')
                price = price[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            return price
            },
            addProductToCart() {
                this.$store.dispatch("shop/AddProductToCart", this.product)
            }
        }
    }
</script>
