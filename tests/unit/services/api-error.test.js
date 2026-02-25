import { extractApiErrorMessage, normalizeApiError } from '@/services/api-error'

describe('api-error service', () => {
  it('extracts the first nested API message', () => {
    const error = {
      response: {
        data: {
          detail: '',
          course: ['Курс не найден'],
          nested: {
            items: ['ignored']
          }
        }
      }
    }

    expect(extractApiErrorMessage(error)).toBe('Курс не найден')
  })

  it('falls back to plain error message', () => {
    expect(extractApiErrorMessage({ message: 'Network Error' })).toBe('Network Error')
    expect(extractApiErrorMessage(null)).toBe('')
  })

  it('adds userMessage in normalizeApiError', () => {
    const error = {
      message: 'fallback',
      response: { data: { detail: 'Платеж отклонен' } }
    }

    const normalized = normalizeApiError(error)
    expect(normalized.userMessage).toBe('Платеж отклонен')
    expect(normalized).toBe(error)
  })
})
