import {
  fetchPochtaOffices,
  fetchSdekOffices,
  fetchPochtaPrice,
  fetchSdekPrice
} from '@/services/delivery.service'
import { fetchLocationByAbstract } from '@/services/external.service'

export const delivery = {
  namespaced: true,
  state: {
    pochta_offices: [],
    sdek_offices: [],
    user_location: [],
    delivery_price: []
  },
  mutations: {
    setPochtaOffices (state, pochtaOffices) {
      state.pochta_offices = pochtaOffices
    },
    setSdekOffices (state, sdekOffices) {
      state.sdek_offices = sdekOffices
    },
    setPrice (state, DeliveryPrice) {
      state.delivery_price = DeliveryPrice
    },
    setUserLocation (state, userLocation) {
      state.user_location = userLocation
    }
  },
  actions: {
    fetchUserLocation ({ commit }) {
      return fetchLocationByAbstract()
        .then(response => {
          commit('setUserLocation', response.data)
        })
    },
    fetchPochtaOffices ({ commit }, location) {
      return fetchPochtaOffices({
        lat: location.lat,
        lon: location.lon
      })
        .then(response => {
          commit('setPochtaOffices', response.data)
        })
    },
    fetchSdekOffices ({ commit }, payload) {
      const params = {}
      if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
        if (payload.postal_code) {
          params.postal_code = payload.postal_code
        }
        if (payload.lat !== undefined && payload.lat !== null && payload.lat !== '') {
          params.lat = payload.lat
        }
        if (payload.lon !== undefined && payload.lon !== null && payload.lon !== '') {
          params.lon = payload.lon
        }
      } else if (payload !== undefined && payload !== null && payload !== '') {
        params.postal_code = payload
      }

      return fetchSdekOffices(params)
        .then(response => {
          const payload = response?.data
          const offices = Array.isArray(payload)
            ? payload
            : (Array.isArray(payload?.offices) ? payload.offices : [])
          commit('setSdekOffices', offices)
        })
        .catch(error => {
          commit('setSdekOffices', [])
          throw error
        })
    },
    fetchPochtaPrice ({ commit }, data) {
      return fetchPochtaPrice({
        destination: data.destination,
        products_mass: data.products_mass
      })
        .then(response => {
          commit('setPrice', response.data)
        })
    },
    fetchSdekPrice ({ commit }, data) {
      return fetchSdekPrice({
        destination: data.destination,
        products_mass: data.products_mass
      })
        .then(response => {
          commit('setPrice', response.data)
        })
    }
  }
}
