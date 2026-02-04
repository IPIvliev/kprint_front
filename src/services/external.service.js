import axios from 'axios'

const ABSTRACT_API_URL = process.env.VUE_APP_ABSTRACT_API_URL
const ABSTRACT_API_KEY = process.env.VUE_APP_ABSTRACT_API_KEY
const DADATA_URL = process.env.VUE_APP_DADATA_URL
const DADATA_TOKEN = process.env.VUE_APP_DADATA_TOKEN

export function fetchIp() {
  return axios.get('https://api.ipify.org?format=json')
}

export function fetchLocationByAbstract() {
  return axios.get(`${ABSTRACT_API_URL}?api_key=${ABSTRACT_API_KEY}`)
}

export function fetchLocationByDadata() {
  return axios.get(DADATA_URL, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${DADATA_TOKEN}`
    },
  })
}
