<template>
    <div class="page">
        <header-block />
        <div class="content">
            <div class="white_block gray_background">
                <div class="container">
                    <h1 class="title">Корзина</h1>
                    <p class="news__text">Ваши покупки.</p>

                    <div class="row gy-1 cart_block">
                        <div class="col-12">
                            <CartProducts />
                        </div>
             
                        <div class="row gy-1">
                            <h3>Доставка</h3>
                        </div>

                        <div class="row gy-1" v-if="GetPochtaOffices.length > 0">
                            <div class="col-3">
                                <div class="btn btn--white col-12" @click="activate('main', 'pochta')" :class="{ active : activeLink == 'pochta' }">Почта России</div>
                            </div>
                            <div class="col-3">
                                <div class="btn btn--white col-12" @click="activate('main', 'sdek')" :class="{ active : activeLink == 'sdek' }">СДЭК</div>
                            </div>
                            <!-- <div class="col-3">
                                <div class="btn btn--white col-12" @click="activate('main', 'self')" :class="{ active : activeLink == 'self' }">Самовывоз</div>
                            </div> -->
                        </div>
                        <!-- <div class="row gy-1" v-if="activeLink == 'pochta' && GetPochtaOffices.length > 0">
                            <div class="col-6">
                                <div class="btn btn--white col-12"
                                      
                                    @click="activate('pochta', 'pochta_gosp', 'ГОПС')"
                                    :class="{ active : pochtaLink == 'pochta_gosp' }">
                                    Почтовое отделение
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="btn btn--white col-12" 
                                    
                                    @click="activate('pochta', 'pochta_postomat', 'ПОЧТОМАТ')" 
                                    :class="{ active : pochtaLink == 'pochta_postomat' }">
                                    Почтомат
                                </div>
                            </div>
                        </div> -->
                        <div class="row gy-1" v-if="GetPochtaOffices.length > 0">
                            <div class="col-6">
                                <YandexMap :activeLink = activeLink :GetOffices = "activeLink == 'pochta' ? GetPochtaOffices : GetSdekOffices" :location = "location" @selectMarker="selectMarker"/>
                            </div>
                            <div class="col-6 ">
                                <DeliveryDescription :office = "office" />
                            </div>
                        </div>
                        <div class="row gy-1" v-else>
                            <p>Доставка не доступна по техническим причинам. Обратитесь по телефону компании.</p>
                        </div>
                        <div class="row gy-1">
                            <div class="col-6">
                                <div class="row mb-1">
                                    <h3>Итого</h3>
                                </div>
                                <div class="delivery_description">
                                    <div class="total_row">
                                        <span class="text_gray">Товары</span>
                                        <div class="right">{{getTotalPrice}}</div>
                                    </div>
                                    <hr>
                                    <div class="total_row">
                                        <span class="text_gray">Доставка</span>
                                        <div class="right">
                                            <DeliveryPrice :office="office" />
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="total_row">
                                        <span class="text_gray">Промокод</span>
                                        <div class="right">
  
                                                <input type="text" class="form-control input_field_sale" placeholder="Введите промокод" @input="fetchDiscount">
                                                
                                        </div>
                                        
                                    </div>
                                    <hr>
                                    <div class="total_row">
                                        <span class="text_gray">Скидка</span>
                                        <div class="right">{{ getDiscountAmount }}%</div>
                                        
                                    </div>
                                    <hr>
                                    <div class="total_row strong">
                                        Итого стоимость с доставкой
                                        <div class="right">{{ getTotalPriceWithDelivery }} Р</div>
                                    </div>
                                </div>
                                <div class="delivery_description mt-1">

                                   <div class="total_row">
                                        <span class="text_gray">Общий вес</span>
                                        <div class="right">{{ getTotalWeight }} кг</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="row">
                                    <h3 class="mb-1">Доставка</h3>
                                </div>
                                <div class="row">
                                    <OrderForm />
                                </div>

                            </div>

                        </div>
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

<script >
import HeaderBlock from '@/components/HeaderBlock.vue'
import WhiteWelcome from "@/components/elements/WhiteWelcome.vue"
import CartProducts from '@/components/elements/Shop/CartProducts.vue'
import YandexMap from '@/components/Shop/YandexMap.vue'
import DeliveryDescription from '@/components/Shop/DeliveryDescription.vue'
import DeliveryPrice from '@/components/elements/Shop/DeliveryPrice.vue'
import OrderForm from '@/components/elements/Shop/OrderForm.vue'
import FooterBlock from '@/components/FooterBlock.vue'
import axios from 'axios'

const DADATA_URL = process.env.VUE_APP_DADATA_URL
const DADATA_TOKEN = process.env.VUE_APP_DADATA_TOKEN
export default {
    components: { HeaderBlock, CartProducts, YandexMap, DeliveryDescription, DeliveryPrice, OrderForm, WhiteWelcome, FooterBlock },
    data() {
        return {
            ip: null,
            location: null,
            gettingLocation: null,
            selectedMarker: 0,
            activeLink: 'pochta',
            pochtaLink: 'pochta_gosp',
            pochtaFilter: 'ГОПС',
            postPrice: 0,
            sdekFilter: '',
            office: [],
            productsGot: false,
        }
    },
	beforeCreate() {
		
	},

    mounted() {



        
    },
    async created() {
        await this.$store.dispatch("fetchProducts").then(() => {
            this.productsGot = true
        })
        

        this.gettingLocation = true;

        // Запрос ip
        axios.get('https://api.ipify.org?format=json').then(response => {
            this.ip = response.data.ip;
        })
        .catch(error => {
            console.log(error);
        });

        // Запрос координат по api. Платно, но точно
        // axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key=28400f98798f43aa9c5bd5fa15be0ce0').then(response => {
        //     this.gettingLocation = false;
        //     this.location = response.data;
        //     this.$store.dispatch("fetchPochtaOffices", {lat: response.data.latitude, lon: response.data.longitude});
        // })
        // .catch(e => {
        //     console.log(e); 
        // });
       
        // Запрос координат по api. Почти бесплатно и почти точно...
        await axios.get(`${DADATA_URL}`, 
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${DADATA_TOKEN}`
          },
        }
        ).then(response => {

            this.gettingLocation = false;
            this.location = response.data['location'].data;
            this.$store.dispatch("fetchPochtaOffices", {lat: response.data['location'].data.geo_lat, lon: response.data['location'].data.geo_lon});
            this.$store.dispatch("fetchSdekOffices", response.data['location'].data.postal_code);
        })
        .catch(e => {
            console.log(e); 
        });
        
        // Бесплатный запрос координат. Не точный
        // await navigator.geolocation.getCurrentPosition(pos => {
        //     this.gettingLocation = false;
        //     this.location = pos;
        //     console.log('Запрос на получние списка офисов')
        //     this.$store.dispatch("fetchPochtaOffices", {lat: this.location.coords.latitude, lon: this.location.coords.longitude});
            
        // }, err => {
        //     this.gettingLocation = false;
        //     this.errorStr = err.message;
        // })



    },
    computed: {
        GetPochtaOffices() {
            try {
                // console.log('Запрос на вывод списка офисов')
                return this.$store.state.pochta_offices.filter((office) => office["type-code"] === this.pochtaFilter)
                
            } catch(error) {
                return []
            }
        },
        GetSdekOffices() {
            try {
                // console.log('Запрос на вывод списка офисов')
                return this.$store.state.sdek_offices.filter((office) => office["type"] === 'PVZ')
                
            } catch(error) {
                return []
            }
        },        
        getTotalPrice() {
            return this.$store.getters['shop/cartTotal']
        },
        getTotalWeight() {
            return this.$store.getters['shop/cartTotalWeight']
        },
        getTotalPriceWithDelivery() {
            return this.$store.getters['shop/cartTotalWithDelivery']
        },
        getDiscountAmount() {
            return this.$store.getters['shop/getDiscountAmount']
        },
    },
    watch: {
        
    },
    methods: {
        selectMarker(index) {
            this.selectedMarker = index
            console.log('this.getTotalWeight ', this.getTotalWeight)

            if (this.activeLink == 'pochta') {
                this.office = this.GetPochtaOffices[index]
                this.$store.dispatch("fetchPochtaPrice", { destination: this.office['postal-code'], products_mass: this.getTotalWeight*1000 });
                
            } else {
                this.office = this.GetSdekOffices[index]
                this.$store.dispatch("fetchSdekPrice", { destination: this.office['location']['postal_code'], products_mass: this.getTotalWeight*1000 });
            }
            
        },
        activate(parent, position, type="ГОПС") {
            if (parent == 'main') {
                this.activeLink = position
            } else {
                this.pochtaLink = position
                this.pochtaFilter = type
            }
        },
        fetchDiscount(e) {
            // console.log(e.target.value)
            this.$store.dispatch("shop/fetchDiscountAmount", e.target.value)

        },
    }
}

</script>

<style scoped>
.map {
    border-radius: 24px;
}

.cart_block {
    margin: 50px 0;
    padding: 40px;
    border-radius: 24px;
    background-color: var(--fillssecondary);
}

.strong {
    font-weight: 800;
}

.cart_footer {
    display: inline-block;
    float: right;
}

.cart_footer_text {
    font-weight: 600;
    font-size: 1.2em;
    display: inline-block;
    margin-right: 20px;
}

.btn:hover {
    border: 1px solid #D83A56;
    background-color: rgba(248, 59, 73, 0.02);
}

.active {
    border: 1px solid #D83A56;
    background-color: rgba(248, 59, 73, 0.02);
}

.delivery_description {
    background-color: #fff;
    padding: 20px;
    border-radius: 16px;
}

.input_field {
    border-radius: 20px;
    height: 64px;
}

.input_field_sale {
    border-radius: 20px;
    height: 32px;
}

.input_field_sale:focus {
    border-color: var(--colorsdark-red);
    box-shadow: 0 0 0 0.2rem var(--colorslight-red);
} 

.input_field:focus {
    border-color: var(--colorsdark-red);
    box-shadow: 0 0 0 0.2rem var(--colorslight-red);
}

.right {
    display: inline;
    float: right;
}

</style>