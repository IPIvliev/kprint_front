import {
  getSafePanelMode,
  getStoredPanelMode,
  isManagerUser,
  normalizePanelMode,
  PANEL_MODE_STORAGE_KEY,
  setStoredPanelMode
} from '@/utils/panelMode'

describe('panelMode utils', () => {
  it('normalizes panel mode', () => {
    expect(normalizePanelMode('manager')).toBe('manager')
    expect(normalizePanelMode('anything')).toBe('user')
  })

  it('detects manager from flags and groups', () => {
    expect(isManagerUser({ is_manager: true })).toBe(true)
    expect(isManagerUser({ groups: ['manager'] })).toBe(true)
    expect(isManagerUser({ groups: [{ name: 'Менеджер' }] })).toBe(true)
    expect(isManagerUser({ groups: ['user'] })).toBe(false)
  })

  it('stores and reads panel mode from localStorage', () => {
    const handler = vi.fn()
    window.addEventListener('panel-mode-updated', handler)

    setStoredPanelMode('manager')

    expect(window.localStorage.getItem(PANEL_MODE_STORAGE_KEY)).toBe('manager')
    expect(getStoredPanelMode()).toBe('manager')
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('returns safe mode based on user role', () => {
    expect(getSafePanelMode({ groups: ['manager'] }, 'manager')).toBe('manager')
    expect(getSafePanelMode({ groups: ['user'] }, 'manager')).toBe('user')
  })
})
