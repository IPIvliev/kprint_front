let pendingDraft = null

const STORAGE_KEY = 'pending_print_order_meta'

function writeMeta (draft) {
  if (typeof window === 'undefined' || !window.sessionStorage) {
    return
  }
  if (!draft) {
    window.sessionStorage.removeItem(STORAGE_KEY)
    return
  }
  const meta = {
    created_at: Date.now(),
    file_name: draft.file?.name || '',
    quantity: draft.quantity,
    material_name: draft.material_name || ''
  }
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(meta))
}

export function setPendingPrintOrderDraft (draft) {
  pendingDraft = draft || null
  writeMeta(pendingDraft)
}

export function getPendingPrintOrderDraft () {
  return pendingDraft
}

export function consumePendingPrintOrderDraft () {
  const draft = pendingDraft
  pendingDraft = null
  writeMeta(null)
  return draft
}

export function clearPendingPrintOrderDraft () {
  pendingDraft = null
  writeMeta(null)
}

export function buildPrintOrderFormData (draft) {
  const payload = new FormData()
  if (!draft) {
    return payload
  }
  if (draft.file) {
    payload.append('model_file', draft.file, draft.file.name)
  }
  if (draft.quantity !== undefined && draft.quantity !== null) {
    payload.append('quantity', String(draft.quantity))
  }
  if (draft.price_client !== undefined && draft.price_client !== null && draft.price_client !== '') {
    payload.append('price_client', String(draft.price_client))
  }
  if (draft.volume_mm3 !== undefined && draft.volume_mm3 !== null && draft.volume_mm3 !== '') {
    payload.append('volume_mm3', String(draft.volume_mm3))
  }
  if (draft.material_name) {
    payload.append('material_name', draft.material_name)
  }
  if (draft.preview_image) {
    payload.append('preview_image', draft.preview_image, draft.preview_image.name || 'preview.png')
  }
  if (draft.dimension_x_mm) {
    payload.append('dimension_x_mm', String(draft.dimension_x_mm))
  }
  if (draft.dimension_y_mm) {
    payload.append('dimension_y_mm', String(draft.dimension_y_mm))
  }
  if (draft.dimension_z_mm) {
    payload.append('dimension_z_mm', String(draft.dimension_z_mm))
  }
  return payload
}
