const CYRILLIC_TO_LATIN = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'e',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'sch',
  ъ: '',
  ы: 'y',
  ь: '',
  э: 'e',
  ю: 'yu',
  я: 'ya'
}

export function transliterateCyrillic (value) {
  const raw = String(value || '').trim().toLowerCase()
  if (!raw) {
    return ''
  }
  return raw
    .split('')
    .map((char) => (Object.prototype.hasOwnProperty.call(CYRILLIC_TO_LATIN, char) ? CYRILLIC_TO_LATIN[char] : char))
    .join('')
}

export function latinSlugify (value, fallback = 'item') {
  const transliterated = transliterateCyrillic(value)
  const normalized = transliterated
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')

  if (normalized) {
    return normalized
  }

  const fallbackNormalized = String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')

  return fallbackNormalized || fallback
}

export function buildPublicSlug (value, objectId, fallback = 'item') {
  const base = latinSlugify(value, fallback)
  if (!objectId) {
    return base
  }
  const normalizedId = Number(objectId)
  if (!Number.isFinite(normalizedId) || normalizedId <= 0) {
    return base
  }
  return `${base}-${Math.trunc(normalizedId)}`
}
