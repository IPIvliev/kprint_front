import { publicApi } from './http'

export function fetchIp() {
  return publicApi.get('/api/external/ip')
}

export function fetchLocationByAbstract() {
  return publicApi.get('/api/external/location')
}

export function fetchLocationByDadata() {
  return publicApi.get('/api/external/location')
}
