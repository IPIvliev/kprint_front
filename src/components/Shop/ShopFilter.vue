<template>
<div class="row">
    <div class="filter">
        <div class="row" v-for="filter in filters">
            <div class="col-12">
                <div class="filter_header">{{filter.title}}</div>
                <div class="filter_body">
                    <ul class="filter_list" v-for="attr in filter.filter_attrs_list_values" v-if="filter.type=='C'">
                        <li class="filter_element">
                            <input class="filter-check-input" type="radio" :value="attr.value" :checked="filter.name" :id="attr.id" @click="$emit('selectFilter', filter.title, attr.value)">
                            <!-- <input class="filter-check-input" type="checkbox" :id="attr.id" @click="$emit('selectFilter', filter.title, attr.value)"> -->
                            <label :for="attr.id">
                                {{ attr.value }}<span class="filter_element_color" v-if="attr.color" :style="{'background-color': attr.color}"></span>
                            </label>
                            
                        </li>
                    </ul>
                    <span class="filter_clear" v-if="filter.type=='C'" @click="$emit('selectFilter', filter.title, 'all'); RemoveFilter(filter.name)">Сбросить фильтр "{{ filter.title }}"</span>
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
    created() {

    },
    methods: {
        RemoveFilter(filter_name) {
            console.log("hi!")
            filter_name = false
        }
    }
}
</script>
<style scoped>
.filter {
    background-color: white;
    width: 100%;
    min-height: 600px;
    border-radius: 20px;
    padding: 20px;
}

.filter_list {
    /* list-style: square url('@/assets/img/red_li.svg') inside; */

}

.filter_element {

}

.filter_clear {
    font-size: 0.7em;
    color: var(--colorsdark-red);
    cursor: pointer;
}

.filter_element_color {
    margin-left: 10px;
    border-radius: 9px;
    width: 18px;
    height: 18px;
}

.filter-check-input {
    position: absolute;
    z-index: -1;
    opacity: 0;
}

.filter-check-input+label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}
.filter-check-input+label::before {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}

.filter-check-input:checked+label::before {
  border-color: var(--colorsdark-red);
  background-color: var(--colorsdark-red);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");

}

/* стили при наведении курсора на checkbox */
.filter-check-input:not(:disabled):not(:checked)+label:hover::before {
  border-color: var(--colorsdark-red);
}
/* стили для активного состояния чекбокса (при нажатии на него) */
.filter-check-input:not(:disabled):active+label::before {
  background-color: var(--colorsdark-red);
  border-color: var(--colorsdark-red);
}
/* стили для чекбокса, находящегося в фокусе */
.filter-check-input:focus+label::before {
  box-shadow: 0 0 0 0.2rem var(--colorslight-red);
}
/* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */
.filter-check-input:focus:not(:checked)+label::before {
  border-color: var(--colorslight-red);
}
/* стили для чекбокса, находящегося в состоянии disabled */
.filter-check-input:disabled+label::before {
  background-color: var(--colorslight-red);
}

.filter_header {
    font-size: 1.2em;
    font-weight: 800;
}

.filter_body {
    margin: 20px 0;
}

.filter_input {
    /* margin-right: 30px; */
    text-align: center;
    width: 100%;
    padding: 12px 14px;
    background: #F4F7F9;
    border-radius: 16px;
    border: none;
    outline: none;
    font-size: 16px;
}

</style>