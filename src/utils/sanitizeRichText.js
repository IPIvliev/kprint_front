const BLOCKED_SELECTOR = 'script,style,iframe,object,embed,link,meta,base,form,input,button,textarea,select,option'

function resolveRichTextUrl (raw) {
  const value = String(raw || '').trim()
  if (!value) {
    return ''
  }
  if (value.startsWith('#')) {
    return value
  }
  if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('mailto:') || value.startsWith('tel:') || value.startsWith('data:')) {
    return value
  }
  const base = (process.env.VUE_APP_API_BASE || '').replace(/\/+$/, '')
  if (!base) {
    return value
  }
  if (value.startsWith('/')) {
    return `${base}${value}`
  }
  return `${base}/${value}`
}

function isBlockedUrl (value) {
  const lower = String(value || '').trim().toLowerCase()
  return lower.startsWith('javascript:') || lower.startsWith('vbscript:')
}

export function sanitizeRichText (html) {
  const raw = String(html || '').trim()
  if (!raw) {
    return ''
  }

  const container = document.createElement('div')
  container.innerHTML = raw
  container.querySelectorAll(BLOCKED_SELECTOR).forEach((el) => el.remove())

  container.querySelectorAll('*').forEach((el) => {
    Array.from(el.attributes).forEach((attr) => {
      const name = String(attr.name || '').toLowerCase()
      const value = String(attr.value || '').trim()

      if (!name) {
        return
      }
      if (name.startsWith('on') || name === 'srcdoc') {
        el.removeAttribute(attr.name)
        return
      }
      if (name === 'href' || name === 'src' || name.endsWith(':href')) {
        if (!value || isBlockedUrl(value)) {
          el.removeAttribute(attr.name)
          return
        }
        const resolved = resolveRichTextUrl(value)
        if (resolved) {
          el.setAttribute(attr.name, resolved)
        } else {
          el.removeAttribute(attr.name)
        }
        return
      }
      if (name === 'target' && value === '_blank') {
        el.setAttribute('rel', 'noopener noreferrer')
      }
    })
  })

  return container.innerHTML
}

