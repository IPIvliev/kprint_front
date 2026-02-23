import axios from 'axios'
import { publicApi } from './http'

export function fetchIp () {
  return publicApi.get('/api/external/ip')
}

export function fetchLocationByAbstract (params = {}) {
  return publicApi.get('/api/external/location', { params })
}

export function fetchLocationByDadata (params = {}) {
  return publicApi.get('/api/external/location', { params })
}

export async function fetchPublicIp () {
  const response = await axios.get('https://api.ipify.org', {
    params: { format: 'json' },
    timeout: 5000
  })
  return response?.data?.ip || null
}
