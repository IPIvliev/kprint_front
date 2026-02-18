import { publicApi } from './http'

export function fetchCompanyCategories (params = {}) {
  return publicApi.get('/api/company-categories/', { params })
}

export function fetchCompanies (params = {}) {
  return publicApi.get('/api/companies/', { params })
}
