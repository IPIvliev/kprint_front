<template>
  <yandex-map
    v-if="mapCenter"
    class="map cmp-components-shop-yandexmap"
    :settings="{
      location: {
        center: mapCenter,
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

    <template v-for="(office, index) in offices">
      <yandex-map-marker
        v-if="hasCoordinates(office)"
        :key="`sdek-${index}`"
        :settings="{
          coordinates: [Number(office['location']['longitude']), Number(office['location']['latitude'])],
          onClick: () => $emit('selectMarker', index)
        }"
      >
        <div
          class="circle"
          :style="{
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
  props: ['location', 'offices'],
  emits: ['selectMarker'],
  computed: {
    mapCenter () {
      const geoLon = Number(this.location?.geo_lon)
      const geoLat = Number(this.location?.geo_lat)
      if (Number.isFinite(geoLon) && Number.isFinite(geoLat)) {
        return [geoLon, geoLat]
      }

      const firstOffice = Array.isArray(this.offices) ? this.offices[0] : null
      const officeLon = Number(firstOffice?.location?.longitude)
      const officeLat = Number(firstOffice?.location?.latitude)
      if (Number.isFinite(officeLon) && Number.isFinite(officeLat)) {
        return [officeLon, officeLat]
      }

      return null
    }
  },
  methods: {
    hasCoordinates (office) {
      const longitude = Number(office?.location?.longitude)
      const latitude = Number(office?.location?.latitude)
      return Number.isFinite(longitude) && Number.isFinite(latitude)
    }
  }
}
</script>
