<template>
  <div class="row cmp-components-shop-shopfilter">
    <div class="filter">
        <div class="row" v-for="filter in filters">
            <div class="col-12">
                <div class="filter_header">{{filter.title}}</div>
                <div class="filter_body">
                    <ul class="filter_list" v-for="attr in filter.filter_attrs_list_values" v-if="filter.type=='C'">
                        <li class="filter_element">
                            <input class="filter-check-input" 
                                type="radio" 
                                :value="attr.value" 
                                v-model="filter.name"
                                :checked="attr.name"
                                :id="attr.id" 
                                @click="$emit('selectFilter', filter.title, attr.value)"
                            >

                            <!-- <input class="filter-check-input" type="checkbox" :id="attr.id" @click="$emit('selectFilter', filter.title, attr.value)"> -->
                            <label :for="attr.id">
                                {{ attr.value }}<span class="filter_element_color" v-if="attr.color" :style="{'background-color': attr.color}"></span>
                            </label>
                            
                        </li>
                        
                    </ul>
                    <ul v-if="filter.type=='C'">
                        <li>
                            <input class="filter-check-input" 
                                type="radio" 
                                value="all" 
                                v-model="filter.name"
                                :id="filter.name" 
                                checked="true"
                                @click="$emit('selectFilter', filter.title, 'all')"
                            >
                            <label :for="filter.name">
                                Все варианты
                            </label>
                        </li>
                    </ul>
                    <!-- <span class="filter_clear" v-if="filter.type=='C'" @click="$emit('selectFilter', filter.title, 'all'); RemoveFilter(filter.name)">Сбросить фильтр "{{ filter.title }}"</span> -->
                    <div v-for="attr in filter.filter_attrs_list_values" v-if="filter.type=='R'">
                        <div class="row">
                            <div class="col-6">
                                <input type="text" class="filter_input" placeholder="от" @input="$emit('rangeFilter')">
                            </div>
                            <div class="col-6">
                                <input type="text" class="filter_input" placeholder="до">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="filter_header">Стоимость</div>
                <div class="filter_body">
                    <div class="row">
                        <div class="col-6">
                            <input type="text" class="filter_input" placeholder="от" @input="$emit('priceFilter', 'from', $event.target.value)">
                        </div>
                        <div class="col-6">
                            <input type="text" class="filter_input" placeholder="до" @input="$emit('priceFilter', 'to', $event.target.value)">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props: ['filters','selectedFilters'],
    emits: ['selectFilter', 'rangeFilter', 'priceFilter'],
    data() {
        return {
            filter_name: '',
        }
    },
    created() {

    },
    methods: {
        RemoveFilter(filter_name) {

            console.log("hi!")
            /* For Radio */
            // filter_name = false

            /* For Checkbox */
            filter_name = 'all'
        }
    }
}
</script>
