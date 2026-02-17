<template>
  <div class="row gy-1 delivery_description cmp-components-shop-deliverydescription">
        <div class="col-12" v-if="office['address-source']">

            <h4>{{ office['address-source'] }}</h4>
            <br>
            <span class="title">Стоимость доставки:</span>
            <DeliveryPrice :office="office" />
            <br>
            <span class="title">Ориентировочное время доставки:</span>
            <DeliveryPeriod :office="office" />
            <br>
            <span class="title">Адрес:</span>
            <p>{{ office['postal-code'] }}, {{ office['settlement'] }} г, {{ office['address-source'] }}</p>
            <br>
            <span class="title">Время работы:</span>
            <ul>
                <li v-for="day in office['working-hours']" :key="`pochta-${day['weekday-id']}`">

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
        <div class="col-12" v-else-if="office['code']">
            <h4>{{ office['location']['address_full'] }}</h4>
            <br>
            <span class="title">Стоимость доставки:</span>
            <DeliveryPrice :office="office" />
            <br>
            <span class="title">Ориентировочное время доставки:</span>
            <DeliveryPeriod :office="office" />
            <br>
            <span class="title">Время работы:</span>
            <ul>
                <li v-for="day in office['work_time_list']" :key="`sdek-${day['day']}`">
                    {{ getWeekday(day['day']) }}: {{ day['time'] }}
                </li>
            </ul>
        </div>
        <div class="col-12" v-else>
            <h4>Выберите пункт доставки на карте</h4>
        </div>
    </div>
</template>
<script>
import DeliveryPrice from '@/components/elements/Shop/DeliveryPrice.vue'
import DeliveryPeriod from '@/components/elements/Shop/DeliveryPeriod.vue'

export default {
  props: ['office'],
  components: { DeliveryPrice, DeliveryPeriod },
  methods: {
    getWeekday (id) {
      switch (id) {
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
    }
  }
}
</script>
