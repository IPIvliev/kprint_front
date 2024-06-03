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

                        <div class="row gy-1">
                            <div class="col-3">
                                <div class="btn btn--white col-12 active">Отделение Почты России</div>
                            </div>
                            <div class="col-3">
                                <div class="btn btn--white col-12 active">Пункт выдачи СДЭК</div>
                            </div>
                            <div class="col-3">
                                <div class="btn btn--white col-12">Курьер СДЭК</div>
                            </div>
                            <div class="col-3">
                                <div class="btn btn--white col-12">Самовывоз</div>
                            </div>
                        </div>
                        <div class="row gy-1">
                            <div class="col-6">
                                <!-- :position="[office['latitude'], office['latitude']]" -->
                                <yandex-map class="map"
                                    :settings="{
                                        location: {
                                            center: [43.924556, 56.322818],
                                            zoom: 11,
                                        },
                                    }"
                                    height="50vh"
                                    width="100%"
                                >
                                    <yandex-map-default-scheme-layer :settings="{ theme: 'light' }" />
                                    <yandex-map-controls :settings="{ position: 'right' }">
                                        <yandex-map-zoom-control />
                                    </yandex-map-controls>
                                    
                                    <yandex-map-default-features-layer />
                                    <yandex-map-default-marker v-for="(office, index) in GetPochtaOffices" :key="index"
                                        :settings="{
                                            coordinates: [office['longitude'], office['latitude']],
                                            title: office['type-code']
                                        }"
                                        
                                    >
                        
                                           
                                    </yandex-map-default-marker>
                      


                                </yandex-map>
                            </div>
                            <div class="col-6 ">
                                <div class="row gy-1 delivery_description">
                                    <div class="col-12">
                                        <div class="row" v-for="office in GetPochtaOffices">
                                            {{ office['address-source'] }}
                                        </div>
                                        <h4>ПВЗ «Ростов-на-Дону Сельмаш»</h4>
                                        <span>Адрес:</span>
                                        <p>344113, Ростов-на-Дону г, Космонавтов пр-кт, д.32Б</p>
                                        <span>Как добраться:</span>
                                        <p>Остановка - площадь Королева. Примерное расстояние от остановки до Отделения - 100 м., 
                                            в сторону ТЦ Северный. 10-этажное жилое кирпичное здание. 1 этаж. Расположение входа в отделение - первая линия. 
                                            Пункт выдачи заказов Яндекс.Маркет.
                                        </p>
                                        <span>Время работы:</span>
                                        <p>пн-вс: 09.00-21.00</p>
                                    </div>
                                </div>
                                <div class="row gy-1" style="margin-top: 20px;">
                                    <div class="col-6">
                                        <div class="btn btn--white col-12">Назад</div>
                                    </div>
                                    <div class="col-6">
                                        <div class="btn btn--white col-12">Выбрать</div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="row gy-1">
                            <div class="col-6">
                                <div class="row">
                                    <h3 class="mb-1">Доставка</h3>
                                </div>
                                <div class="row">
                                    <div class="mb-1">
                                        <label for="fio" class="form-label">ФИО получателя</label>
                                        <input type="text" class="form-control input_field" id="fio" placeholder="Ваше имя">
                                    </div>
                                    <div class="mb-1">
                                        <label for="fio" class="form-label">Номер телефона получателя</label>
                                        <input type="text" class="form-control input_field" id="fio" placeholder="Введите номер телефона">
                                    </div>
                                    <div class="mb-2">
                                        <label for="fio" class="form-label">Адрес электронной почты</label>
                                        <input type="text" class="form-control input_field" id="fio" placeholder="Введите email">
                                    </div>
                                    <div class="form-check ">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                        <label class="form-check-label" for="flexCheckDefault">
                                            Я даю согласие на обработку моих персональных данных и соглашаюсь с политикой обработки персональных данных
                                        </label>
                                    </div>
                                </div>

                            </div>
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
                                        <div class="right">750 Р</div>
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
                                    <hr>
                                    <router-link to="/shop/order"><div class="btn btn--red col-12">Оплатить</div></router-link>
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

  YandexMapDefaultFeaturesLayer,

} from "vue-yandex-maps";


</script>

<script >
import HeaderBlock from '@/components/HeaderBlock.vue'
import WhiteWelcome from "@/components/elements/WhiteWelcome.vue"
import ProductAmount from '@/components/elements/Shop/ProductAmount.vue'
import FooterBlock from '@/components/FooterBlock.vue'



export default {
    components: { HeaderBlock, ProductAmount, WhiteWelcome, FooterBlock },
    created() {
        this.$store.dispatch("fetchPochtaOffices", {lat:'56.322818', lon: '43.924556'});
    },
    computed: {
        GetPochtaOffices() {
            return this.$store.state.pochta_offices
        },
    },
    watch: {

    },
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
  width: var(--radius);
  height: var(--radius);
  /* border-radius: 50%; */
  background-color: currentColor;
  color: var(--color);
}

.circle_element {
  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-block;
  width: 10%;
  height: 10%;
  border-radius: 50%;
  background: #fff var(--image) no-repeat center center;
  transform: translate3d(-50%, -50%, 0);
}

</style>