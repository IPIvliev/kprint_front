function escapeHtml (value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function slugify (value) {
  return String(value || '')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^a-zа-я0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
}

function formatInline (value) {
  return value.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}

export function markdownToHtml (markdown) {
  const lines = String(markdown || '').replace(/\r\n/g, '\n').split('\n')
  const html = []
  const paragraph = []
  let listTag = null

  function flushParagraph () {
    if (!paragraph.length) {
      return
    }
    html.push(`<p>${formatInline(escapeHtml(paragraph.join(' ')))}</p>`)
    paragraph.length = 0
  }

  function closeList () {
    if (!listTag) {
      return
    }
    html.push(`</${listTag}>`)
    listTag = null
  }

  function openListIfNeeded (tagName) {
    if (listTag === tagName) {
      return
    }
    closeList()
    html.push(`<${tagName}>`)
    listTag = tagName
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (!line) {
      flushParagraph()
      closeList()
      continue
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/)
    if (headingMatch) {
      flushParagraph()
      closeList()
      const level = headingMatch[1].length
      const headingText = headingMatch[2].trim()
      const headingId = level >= 2 ? ` id="${slugify(headingText)}"` : ''
      html.push(`<h${level}${headingId}>${formatInline(escapeHtml(headingText))}</h${level}>`)
      continue
    }

    const orderedMatch = line.match(/^\d+\.\s+(.+)$/)
    if (orderedMatch) {
      flushParagraph()
      openListIfNeeded('ol')
      html.push(`<li>${formatInline(escapeHtml(orderedMatch[1]))}</li>`)
      continue
    }

    const unorderedMatch = line.match(/^-\s+(.+)$/)
    if (unorderedMatch) {
      flushParagraph()
      openListIfNeeded('ul')
      html.push(`<li>${formatInline(escapeHtml(unorderedMatch[1]))}</li>`)
      continue
    }

    closeList()
    paragraph.push(line)
  }

  flushParagraph()
  closeList()
  return html.join('\n')
}
