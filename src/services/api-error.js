function stringifyPrimitive (value) {
  if (value === null || value === undefined) {
    return ''
  }
  if (typeof value === 'string') {
    return value.trim()
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }
  return ''
}

function collectMessages (value, bucket) {
  if (!value) {
    return
  }

  const asPrimitive = stringifyPrimitive(value)
  if (asPrimitive) {
    bucket.push(asPrimitive)
    return
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectMessages(item, bucket))
    return
  }

  if (typeof value === 'object') {
    if (value.detail) {
      collectMessages(value.detail, bucket)
    }
    Object.keys(value).forEach((key) => {
      if (key === 'detail') {
        return
      }
      collectMessages(value[key], bucket)
    })
  }
}

export function extractApiErrorMessage (error) {
  if (!error) {
    return ''
  }

  const messages = []
  const responseData = error.response && error.response.data
  collectMessages(responseData, messages)

  if (messages.length > 0) {
    return messages[0]
  }

  return stringifyPrimitive(error.message)
}

export function normalizeApiError (error) {
  if (!error || typeof error !== 'object') {
    return error
  }
  const userMessage = extractApiErrorMessage(error)
  if (userMessage) {
    error.userMessage = userMessage
  }
  return error
}
