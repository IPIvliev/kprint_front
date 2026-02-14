import {
  fetchPochtaOffices,
  fetchSdekOffices,
  fetchPochtaPrice,
  fetchSdekPrice,
} from '@/services/delivery.service'
import { fetchLocationByAbstract } from '@/services/external.service'

export const delivery = {
  namespaced: true,
  state: {
    pochta_offices: [],
    sdek_offices: [],
    user_location: [],
    delivery_price: [],
  },
  mutations: {
    setPochtaOffices(state, pochtaOffices) {
      state.pochta_offices = pochtaOffices
    },
    setSdekOffices(state, pochtaOffices) {
      state.sdek_offices = pochtaOffices
    },
    setPrice(state, DeliveryPrice) {
      state.delivery_price = DeliveryPrice
    },
    setUserLocation(state, userLocation) {
      state.user_location = userLocation
    },
  },
  actions: {
    fetchUserLocation({ commit }) {
      return fetchLocationByAbstract()
        .then(response => {
          commit('setUserLocation', response.data)
        })
    },
    fetchPochtaOffices({ commit }, location) {
      return fetchPochtaOffices({
        lat: location.lat,
        lon: location.lon,
      })
        .then(response => {
          commit('setPochtaOffices', response.data)
        })
    },
    fetchSdekOffices({ commit }, postal_code) {
      return fetchSdekOffices({
        postal_code: postal_code,
      })
        .then(response => {
          commit('setSdekOffices', response.data)
        })
    },
    fetchPochtaPrice({ commit }, data) {
      return fetchPochtaPrice({
        destination: data.destination,
        products_mass: data.products_mass,
      })
        .then(response => {
          commit('setPrice', response.data)
        })
    },
    fetchSdekPrice({ commit }, data) {
      return fetchSdekPrice({
        destination: data.destination,
        products_mass: data.products_mass,
      })
        .then(response => {
          commit('setPrice', response.data)
        })
    },
  },
}
