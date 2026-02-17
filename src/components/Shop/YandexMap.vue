<template>
  <yandex-map
    v-if="location"
    class="map cmp-components-shop-yandexmap"
    :settings="{
      location: {
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

    <template v-for="(office, index) in GetOffices">
      <yandex-map-marker
        v-if="activeLink === 'pochta'"
        :key="`pochta-${index}`"
        :settings="{
          coordinates: [office['longitude'], office['latitude']],
          onClick: () => $emit('selectMarker', index, office['postal-code'])
        }"
      >
        <div
          class="circle"
          :style="{
            '--color': '#D83A56',
            '--color': office['type-code'] === '袩袨效孝袨袦袗孝' ? '#4169E1' : 'var(--bs-primary)',
          }"
        >
          <div class="circle_element" />
        </div>
      </yandex-map-marker>

      <yandex-map-marker
        v-else
        :key="`sdek-${index}`"
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
    </template>
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
  YandexMapDefaultFeaturesLayer
} from 'vue-yandex-maps'

createYmapsOptions({
  apikey: process.env.VUE_APP_YMAPS_API_KEY
})
</script>

<script>
export default {
  props: ['location', 'GetOffices', 'activeLink'],
  emits: ['selectMarker']
}
</script>
