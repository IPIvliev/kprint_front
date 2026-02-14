<template>
  <yandex-map class="map cmp-components-shop-yandexmap" v-if="location"
        :settings="{
            location: {
                // center: [location.coords.longitude, location.coords.latitude],
                center: [location.geo_lon, location.geo_lat],
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
        <yandex-map-marker v-if="activeLink === 'pochta'" v-for="(office, index) in GetOffices" :key="index"
            :settings="{
                coordinates: [office['longitude'], office['latitude']],
                onClick: () => $emit('selectMarker', index, office['postal-code'])
                
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
        
        <yandex-map-marker v-else v-for="(office, index) in GetOffices"
            :settings="{
                coordinates: [office['location']['longitude'], office['location']['latitude']],
                onClick: () => $emit('selectMarker', index)
                
            }"
        >
            <div
                class="circle"
                :style="{
                    '--color': '#D83A56',
                    '--color': 'var(--bs-green)',
                }"

            >
                <div class="circle_element" />
            </div>
        </yandex-map-marker> 
        <!-- <yandex-map-listener
            :settings="{ 
                onClick: updateMap(event),
                // onMouseUp: updateMap('map', 'update'),
            }"
        /> -->

    </yandex-map>
</template>
<script setup>
import {
  createYmapsOptions,
  YandexMap,
  YandexMapControls,
  YandexMapDefaultSchemeLayer,
  YandexMapZoomControl,
  YandexMapMarker,
  YandexMapGeolocationControl,
  YandexMapDefaultFeaturesLayer,

} from "vue-yandex-maps";

createYmapsOptions({
  apikey: process.env.VUE_APP_YMAPS_API_KEY,
})

</script>

<script>
    export default {
        props: ['location', 'GetOffices', 'activeLink'],
        emits: ['selectMarker'],
        data() {
            return {

            }
        },

    }
</script>

