const STORAGE_KEY = 'study_user_orders'

function toNumber (value) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null
  }
  return parsed
}

function normalizeText (value) {
  return String(value || '').trim()
}

function normalizeTimestamp (value) {
  const parsed = Date.parse(String(value || ''))
  if (Number.isNaN(parsed)) {
    return new Date().toISOString()
  }
  return new Date(parsed).toISOString()
}

function readRawOrders () {
  if (typeof window === 'undefined' || !window.localStorage) {
    return []
  }
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    return []
  }
}

function writeRawOrders (orders) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}

function normalizeOrder (order) {
  if (!order || typeof order !== 'object') {
    return null
  }

  const courseId = toNumber(order.course_id)
  const priceId = toNumber(order.price_id)
  if (!courseId || !priceId) {
    return null
  }

  return {
    id: normalizeText(order.id) || `${Date.now()}_${courseId}_${priceId}`,
    status: normalizeText(order.status) === 'paid' ? 'paid' : 'pending_payment',
    created_at: normalizeTimestamp(order.created_at),
    paid_at: order.paid_at ? normalizeTimestamp(order.paid_at) : '',
    course_id: courseId,
    course_name: normalizeText(order.course_name) || `Курс #${courseId}`,
    course_description: normalizeText(order.course_description),
    course_photo: normalizeText(order.course_photo),
    course_duration: normalizeText(order.course_duration),
    lessons_number: toNumber(order.lessons_number) || 0,
    teachers_number: toNumber(order.teachers_number) || 0,
    price_id: priceId,
    price_name: normalizeText(order.price_name) || `Тариф #${priceId}`,
    price_short_description: normalizeText(order.price_short_description),
    price_description: normalizeText(order.price_description),
    price_value: Number(order.price_value || 0)
  }
}

function normalizeOrderList (orders) {
  return orders
    .map(normalizeOrder)
    .filter(Boolean)
    .sort((a, b) => {
      const aTime = Date.parse(a.created_at)
      const bTime = Date.parse(b.created_at)
      return bTime - aTime
    })
}

function buildOrderFromSelection ({ course, price, existingId = '' }) {
  const now = new Date().toISOString()
  return normalizeOrder({
    id: existingId || `${Date.now()}_${Math.round(Math.random() * 100000)}`,
    status: 'pending_payment',
    created_at: now,
    paid_at: '',
    course_id: course.id,
    course_name: course.name,
    course_description: course.description,
    course_photo: course.photo,
    course_duration: course.duration,
    lessons_number: course.lessons_number,
    teachers_number: course.teachers_number,
    price_id: price.id,
    price_name: price.name,
    price_short_description: price.short_description,
    price_description: price.description,
    price_value: price.price
  })
}

export function listStudyOrders () {
  return normalizeOrderList(readRawOrders())
}

export function upsertPendingStudyOrder (selection) {
  if (!selection || !selection.course || !selection.price) {
    return null
  }

  const courseId = toNumber(selection.course.id)
  const priceId = toNumber(selection.price.id)
  if (!courseId || !priceId) {
    return null
  }

  const current = listStudyOrders()
  const existingPending = current.find((item) => item.course_id === courseId && item.status === 'pending_payment')
  const nextOrder = buildOrderFromSelection({
    course: selection.course,
    price: selection.price,
    existingId: existingPending ? existingPending.id : ''
  })

  if (!nextOrder) {
    return null
  }

  const nextOrders = existingPending
    ? current.map((item) => (item.id === existingPending.id ? nextOrder : item))
    : [nextOrder, ...current]

  writeRawOrders(nextOrders)
  return nextOrder
}

export function markStudyOrderPaid (orderId) {
  const id = normalizeText(orderId)
  if (!id) {
    return null
  }

  let updatedOrder = null
  const nextOrders = listStudyOrders().map((item) => {
    if (item.id !== id) {
      return item
    }
    updatedOrder = {
      ...item,
      status: 'paid',
      paid_at: new Date().toISOString()
    }
    return updatedOrder
  })

  writeRawOrders(nextOrders)
  return updatedOrder
}
