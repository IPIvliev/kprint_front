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
                            <table class="table">
                                <thead>
                                    <tr class="text-center text_gray">
                                        <th scope="col">Наименование товара</th>
                                        <th scope="col">Стоимость</th>
                                        <th scope="col" >Количество</th>
                                        <th scope="col">Итого</th>
                                        <th scope="col">Удалить</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="gray_background align-middle">
                                        <td class="">
                                            <img class="table_img" src="http://localhost:8081/product_photos/sj2mq5dkn6ilb0n2d3rq557adnrqg19w.jpg" width="80" height="80">
                                            <p class="product_name">
                                                Castable LCD 1 фотополимерная смола df df s fsfsd sdfd fdfdfdfdfd  df Gorky Liquid, 1 кг
                                            </p>
                                        </td>
                                        <td><div class="table_price">8 000 ₽</div></td>
                                        <td>

                                            <ProductAmount/>
                                            
                                        </td>
                                        <td><div class="table_price">8 000 ₽</div></td>
                                        <td>
                                            <div class="table_trash">
                                                <img src="@/assets/img/trash.svg" />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
             
                        <div class="row gy-1">
                            <h3>Доставка</h3>
                        </div>

                        <div class="row gy-1" v-if="GetPochtaOffices.length > 0">
                            <div class="col-3">
                                <div class="btn btn--white col-12" @click="activate('main', 'pochta')" :class="{ active : activeLink == 'pochta' }">Почта России</div>
                            </div>
                            <!-- <div class="col-3">
                                <div class="btn btn--white col-12" @click="activate('main', 'sdek')" :class="{ active : activeLink == 'sdek' }">СДЭК</div>
                            </div>
                            <div class="col-3">
                                <div class="btn btn--white col-12" @click="activate('main', 'self')" :class="{ active : activeLink == 'self' }">Самовывоз</div>
                            </div> -->
                        </div>
                        <div class="row gy-1" v-if="activeLink == 'pochta' && GetPochtaOffices.length > 0">
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
                        </div>
                        <div class="row gy-1" v-if="GetPochtaOffices.length > 0">
                            <div class="col-6">
                                <!-- :position="[office['latitude'], office['latitude']]" -->
                                <yandex-map class="map" v-if="location"
                                    :settings="{
                                        location: {
                                            // center: [location.coords.longitude, location.coords.latitude],
                                            center: [location.longitude, location.latitude],
                                            zoom: 11,
                                        },
                                    }"
                                    height="50vh"
                                    width="100%"
                                >
                                    <yandex-map-default-scheme-layer :settings="{ theme: 'light' }" />
                                    <yandex-map-controls :settings="{ position: 'top left' }">
                                        <yandex-map-zoom-control />
                                    </yandex-map-controls>
                                    <yandex-map-controls :settings="{ position: 'left' }">
                                        <yandex-map-geolocation-control />
                                    </yandex-map-controls>
                                    <yandex-map-default-features-layer />
                                    <!-- <yandex-map-default-marker v-for="(office, index) in GetPochtaOffices" :key="index"
                                        :settings="{
                                            coordinates: [office['longitude'], office['latitude']],
                                            title: [office['type-code'] + ' - ' + office['address-source']],
                                            onClick: () => selectMarker(index),
                                            color: '#00CC00'
                                        }"
                                        
                                    >
                                    </yandex-map-default-marker> -->
                                    <yandex-map-marker v-for="(office, index) in GetPochtaOffices" :key="index"
                                        :settings="{
                                            coordinates: [office['longitude'], office['latitude']],
                                            onClick: () => selectMarker(index, office['postal-code']),
                                        }"
                                    >
                                        <div
                                            class="circle"
                                            :style="{
                                                '--color': '#D83A56',
                                                '--color': office['type-code'] == 'ПОЧТОМАТ' ? '#4169E1' : 'var(--bs-primary)',
                                            }"

                                        >
                                            <div class="circle_element" />
                                        </div>
                                    </yandex-map-marker>       
                                    
                      
                                    <yandex-map-listener
                                        :settings="{ 
                                            onClick: updateMap(event),
                                            // onMouseUp: updateMap('map', 'update'),
                                        }"
                                    />

                                </yandex-map>
                            </div>
                            <div class="col-6 ">
                                <div class="row gy-1 delivery_description">
                                    <div class="col-12" v-if="location">
                                        <!-- <div class="row" v-for="(office, index ) in GetPochtaOffices">
                                            {{ office }}
                                        </div> -->
                                        <h4>{{ GetPochtaOffices[selectedMarker]['type-code'] }} {{ GetPochtaOffices[selectedMarker]['address-source'] }}</h4>
                                        <br>
                                        <span>Стоимость доставки:</span>
                                        <p>{{ GetPochtaPrice }}</p>
                                        <br>
                                        <span>Ориентировочное время доставки:</span>
                                        <p>{{  }} дня</p>
                                        <br>
                                        <span>Адрес:</span>
                                        <p>{{ GetPochtaOffices[selectedMarker]['postal-code'] }}, {{ GetPochtaOffices[selectedMarker]['settlement'] }} г, {{ GetPochtaOffices[selectedMarker]['address-source'] }}</p>
                                        <br>
                                        <span>Время работы:</span>
                                        <ul>
                                            <li v-for="day in GetPochtaOffices[selectedMarker]['working-hours']">
 
                                                    {{ getWeekday(day['weekday-id']) }}: 
                                                    <span v-if="day['begin-worktime']">
                                                        {{ day['begin-worktime'].substr(0, 5) }} - {{ day['end-worktime'].substr(0, 5) }}
                                                    </span>
                                                    <span class="text-danger" v-else>
                                                        Выходной
                                                    </span>

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <!-- <div class="row gy-1" style="margin-top: 20px;">
                                    <div class="col-6">
                                        <div class="btn btn--white col-12">Назад</div>
                                    </div>
                                    <div class="col-6">
                                        <div class="btn btn--white col-12">Выбрать</div>
                                    </div>
                                </div> -->
                                
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
                                        <span class="text_gray">3 товара</span>
                                        <div class="right">8 500 Р</div>
                                    </div>
                                    <hr>
                                    <div class="total_row">
                                        <span class="text_gray">Доставка</span>
                                        <div class="right">{{ GetPochtaPrice }}</div>
                                    </div>
                                    <hr>
                                    <div class="total_row">
                                        <span class="text_gray">Промокод</span>
                                        <div class="right">
  
                                                <input type="text" class="form-control input_field_sale" placeholder="Введите промокод">

                                        </div>
                                    </div>
                                    <hr>
                                    <div class="total_row strong">
                                        Итого стоимость с доставкой
                                        <div class="right">9 2500 Р</div>
                                    </div>
                                   
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="row">
                                    <h3 class="mb-1">Доставка</h3>
                                </div>
                                <div class="row">
                                    <Form :validation-schema="schema">
                                        <div class="mb-1">
                                            <label for="fio" class="form-label">ФИО получателя</label>
                                            <Field type="text" name="fio" class="form-control input_field" id="fio" placeholder="Ваше имя" :rules="isRequired" />
                                            <ErrorMessage name="fio" />
                                        </div>
                                        <div class="mb-1">
                                            <label for="fio" class="form-label">Номер телефона получателя</label>
                                            <input type="text" class="form-control input_field" id="fio" placeholder="Введите номер телефона">
                                        </div>
                                        <div class="mb-2">
                                            <label for="email" class="form-label">Адрес электронной почты</label>
                                            <Field type="text" name="email" class="form-control input_field" id="email" placeholder="Введите email" :rules="validateEmail"/>
                                            <ErrorMessage name="email" />
                                        </div>
                                        <div class="form-check ">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                            <label class="form-check-label" for="flexCheckDefault">
                                                Я даю согласие на обработку моих персональных данных и соглашаюсь с политикой обработки персональных данных
                                            </label>
                                        </div>
                                        <hr>
                                        <button class="btn btn--red col-12">Оплатить</button>
                                    </Form>
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

<script setup >
import {
  YandexMap,
  YandexMapControls,
  YandexMapDefaultSchemeLayer,
  YandexMapZoomControl,
  YandexMapDefaultMarker,
  YandexMapMarker,
  YandexMapListener,
  YandexMapGeolocationControl,
  YandexMapDefaultFeaturesLayer,

} from "vue-yandex-maps";



import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

// const logMapClick: onClicklick = (object, event) => console.log(object, event);

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});

</script>

<script >
import HeaderBlock from '@/components/HeaderBlock.vue'
import WhiteWelcome from "@/components/elements/WhiteWelcome.vue"
import ProductAmount from '@/components/elements/Shop/ProductAmount.vue'
import FooterBlock from '@/components/FooterBlock.vue'
import axios from 'axios'

export default {
    components: { HeaderBlock, ProductAmount, WhiteWelcome, FooterBlock },
    data() {
        return {
            location: null,
            gettingLocation: null,
            selectedMarker: 0,
            activeLink: 'pochta',
            pochtaLink: 'pochta_gosp',
            pochtaFilter: 'ГОПС',
            postPrice: 0,
        }
    },
    beforeRouteEnter() {
        
    },
    async created() {

        // await this.$store.dispatch("fetchUserLocation")
        this.gettingLocation = true;

        // Запрос координат по api. Платно, но точно
        axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key=28400f98798f43aa9c5bd5fa15be0ce0').then(response => {
            this.gettingLocation = false;
            this.location = response.data;
            this.$store.dispatch("fetchPochtaOffices", {lat: response.data.latitude, lon: response.data.longitude});
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
        GetPochtaPrice() {
            if (this.GetPochtaOffices.length > 0) {
                // console.log('Запрос на вывод цены доставки')
                return (this.$store.state.pochta_price['total-rate']/100 + ' руб.')
            } else {
                return 'Доставка не доступна'
            }
        },
        // GetUserLocation() {
        //     try {
        //         console.log('Запрос на вывод координат пользователя через api')
        //         return this.$store.state.user_location
                
        //     } catch(error) {
        //         return []
        //     }
        // },
    },
    watch: {
        
    },
    methods: {
        getWeekday(id) {
            switch(id) {
                case 1:
                    return 'Понедельник'
                case 2:
                    return 'Вторник'
                case 3:
                    return 'Среда'
                case 4:
                    return 'Четверг'
                case 5:
                    return 'Пятница'
                case 6:
                    return 'Суббота'
                case 7:
                    return 'Воскресенье'
           }
        },
        selectMarker(index, postal_code) {
            this.selectedMarker = index
            // console.log('Запрос на получение цены доставки')
            this.$store.dispatch("fetchPochtaPrice", postal_code);
        },
        activate(parent, position, type="ГОПС") {
            if (parent == 'main') {
                this.activeLink = position
            } else {
                this.pochtaLink = position
                this.pochtaFilter = type
            }
        },
        updateMap(event) {
            console.log(event)
        },
        isRequired(value) {
            if (!value) {
                return 'this field is required';
            }
      
            return true;
        },
        validateEmail(value) {
        // if the field is empty
            if (!value) {
                return 'This field is required';
            }
            // if the field is not a valid email
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!regex.test(value)) {
                return 'This field must be a valid email';
            }
            // All is good
            return true;
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
.table {
    border-collapse: separate;
    border-spacing:0 20px;
}

.text_gray {
    color: var(--bs-gray);
}

.strong {
    font-weight: 800;
}

table tr {
    /* line-height:100px */
}

table tr td:first-child {
    border-radius: 24px 0 0 24px;
}

table tr td:last-child {
    border-radius: 0 24px 24px 0;
}

.table tbody tr td {
     vertical-align: middle;
     
}

.table_img {
    border-radius: 16px;
    /* vertical-align: middle; */
    margin-left: 5px;
    float:left;
    margin-right:10px;
}

.product_name {
    display: inline;
    /* margin: 20px; */
}
.table_price {
    font-weight: 800;
}


.table_trash {
  display: flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  gap: 7px;
  /* padding: 10px var(--tokens-4xl) 10px var(--tokens-4xl); */
  position: relative;
  border-radius: var(--tokens-m);
    background-color: #fff;
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


.circle {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  /* background-color: var(--bs-primary); */
  background-color: var(--color);
  border: solid 1px #000;
  /* background-color: #D83A56; */
  color: var(--color);
}

.circle_element {
  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-block;
  width: 50%;
  height: 50%;
  border-radius: 50%;
  transform: translate3d(-50%, -50%, 0);
}

</style>