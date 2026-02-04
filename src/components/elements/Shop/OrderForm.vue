<template>
  <form @submit="onSubmit" class="cmp-components-elements-shop-orderform">
        <div class="mb-1">
            <label for="fio" class="form-label">ФИО получателя</label>
            <input type="text" name="fio" class="form-control input_field" id="fio" v-model="fio" v-bind="fioAttrs" placeholder="Ваше имя" />
            <div>{{ errors.fio }}</div>
        </div>
        <div class="mb-1">
            <label for="phone" class="form-label">Номер телефона получателя</label>
            <input type="text" name="phone" class="form-control input_field"
                v-model="phone" 
                v-bind="phoneAttrs"
                id="phone" 
                v-imask="phoneNumberMask" 
                placeholder="+7(921)123-45-67" 
                @keypress="isNumber" 
                @accept="onAccept" 
                @complete="onComplete" 
                maxlength="18" 
            />
            <div>{{ errors.phone }}</div>
        </div>
        <div class="mb-2">
            <label for="email" class="form-label">Адрес электронной почты</label>
            <input type="text" name="email" class="form-control input_field" id="email" v-model="email" v-bind="emailAttrs" placeholder="Введите email" />
            <div>{{ errors.email }}</div>
        </div>
        <div class="mb-2">
            <label for="delivery" class="form-label">Доставка:</label>
            <!-- <DeliveryAddress :office = "office" />  -->
        </div>
        
        <div class="form-check ">
            <input class="form-check-input" type="checkbox" id="sign" name="sign" value="true" checked>
            <label class="form-check-label" for="sign">
                Я даю согласие на обработку моих персональных данных и соглашаюсь с политикой обработки персональных данных
            </label>
            <div>{{ errors.sign }}</div>
        </div>
        <hr>
        <button class="btn btn--red col-12" @click="createOrder">Оплатить</button>
    </form>
</template>
<script setup>

import { configure, useForm, Validator } from 'vee-validate';
import * as yup from 'yup';


const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    fio: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().min(6).required(),

  }),
});

const onSubmit = handleSubmit(values => {
    console.log(values)
    this.$store.dispatch("shop/fetchCreateOrder", values)
    alert(JSON.stringify(values, null, 2));
});

const [fio, fioAttrs] = defineField('fio');
const [phone, phoneAttrs] = defineField('phone');
const [email, emailAttrs] = defineField('email');

</script>

<script>
import {IMaskDirective} from 'vue-imask';
import DeliveryAddress from '@/components/elements/Shop/DeliveryAddress.vue'

export default {
    setup: () => ({ v$: useVuelidate() }),
    components: [ DeliveryAddress ],
    props: ['order'],
    data() {
        return {
            phoneNumberMask: {
                mask: '+{7} (000) 000-00-00'
            }
        }
    },
    validations () {
        return {
            fio: { required }
        }
    },
    directives: {
        imask: IMaskDirective
    },
    methods: {
        onAccept(e) {
            console.log("onAccept")
            const maskRef = e.detail
            this.phone = maskRef.value
        },
        onComplete(e) {
            console.log("onComplete")
            const maskRef = e.detail
            this.userPhone = maskRef.unmaskedValue
        },
        isNumber(e) {
            let regex = /[0-9]/

            if (!regex.test(e.key)) {
                e.returnValue = false;
            if (e.preventDefault) e.preventDefault();
            }
        },
        createOrder(order) {
            // console.log(values)
            // this.$store.dispatch("shop/fetchCreateOrder", order)
        }
    }
}
</script>

