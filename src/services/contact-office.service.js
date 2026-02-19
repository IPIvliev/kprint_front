import { publicApi } from './http'

export const DEFAULT_MAIN_OFFICE_PHONE = '+7 960 186-35-96'
export const DEFAULT_MAIN_OFFICE_EMAIL = 'info@kprint.ru'

let contactsCache = null
let contactsPromise = null

function normalizeOfficePhoto (photo = {}) {
  return {
    id: Number(photo.id || 0),
    image_url: String(photo.image_url || '').trim(),
    caption: String(photo.caption || '').trim()
  }
}

function normalizeOffice (office = {}) {
  return {
    id: Number(office.id || 0),
    name: String(office.name || '').trim(),
    slug: String(office.slug || '').trim(),
    emblem_url: String(office.emblem_url || '').trim(),
    address: String(office.address || '').trim(),
    map_embed_url: String(office.map_embed_url || '').trim(),
    latitude: office.latitude ?? null,
    longitude: office.longitude ?? null,
    phone: String(office.phone || '').trim(),
    email: String(office.email || '').trim(),
    contacts_note: String(office.contacts_note || '').trim(),
    is_head_office: Boolean(office.is_head_office),
    photos: Array.isArray(office.photos) ? office.photos.map(normalizeOfficePhoto).filter((photo) => photo.image_url) : []
  }
}

function normalizeContactsPayload (payload = {}) {
  const offices = Array.isArray(payload.offices) ? payload.offices.map(normalizeOffice).filter((office) => office.id > 0) : []
  const mainOfficeFromList = offices.find((office) => office.is_head_office)
  const mainOfficePhone = String(payload.main_office_phone || '').trim() || mainOfficeFromList?.phone || DEFAULT_MAIN_OFFICE_PHONE
  const mainOfficeEmail = String(payload.main_office_email || '').trim() || mainOfficeFromList?.email || DEFAULT_MAIN_OFFICE_EMAIL
  return {
    main_office_phone: mainOfficePhone,
    main_office_email: mainOfficeEmail,
    offices
  }
}

export function phoneToTelHref (phone) {
  const raw = String(phone || '').trim()
  const normalized = raw.replace(/[^\d+]/g, '')
  if (!normalized) {
    return ''
  }
  if (normalized.startsWith('+')) {
    return `tel:${normalized}`
  }
  return `tel:+${normalized}`
}

export function emailToMailtoHref (email) {
  const normalized = String(email || '').trim()
  if (!normalized) {
    return ''
  }
  return `mailto:${normalized}`
}

export async function fetchContactOffices () {
  const response = await publicApi.get('/api/contact-offices/')
  return normalizeContactsPayload(response?.data || {})
}

export async function getContactOfficesData (options = {}) {
  const force = Boolean(options.force)
  if (!force && contactsCache) {
    return contactsCache
  }

  if (!force && contactsPromise) {
    return contactsPromise
  }

  contactsPromise = fetchContactOffices()
    .then((payload) => {
      contactsCache = payload
      return payload
    })
    .finally(() => {
      contactsPromise = null
    })

  return contactsPromise
}
