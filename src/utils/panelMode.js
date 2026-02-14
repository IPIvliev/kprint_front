export const PANEL_MODE_STORAGE_KEY = 'panelMode'
export const PANEL_MODE_EVENT = 'panel-mode-updated'

export function normalizePanelMode(mode) {
  return mode === 'manager' ? 'manager' : 'user'
}

export function isManagerUser(user) {
  if (!user) {
    return false
  }

  if (user.is_manager === true || user.isManager === true) {
    return true
  }

  const groups = user.groups || user.group || user.roles || user.role || user.groups_names || user.groups_list
  if (!groups) {
    return false
  }

  const isManagerName = (value) => {
    if (!value) {
      return false
    }

    const name = String(value).toLowerCase()
    return name === 'менеджер' || name === 'manager'
  }

  if (Array.isArray(groups)) {
    return groups.some((item) => {
      if (typeof item === 'string') {
        return isManagerName(item)
      }

      if (item && typeof item === 'object') {
        return isManagerName(item.name || item.title || item.label)
      }

      return false
    })
  }

  if (typeof groups === 'string') {
    return isManagerName(groups)
  }

  if (groups && typeof groups === 'object') {
    return isManagerName(groups.name || groups.title || groups.label)
  }

  return false
}

export function getStoredPanelMode() {
  if (typeof window === 'undefined') {
    return 'user'
  }

  return normalizePanelMode(window.localStorage.getItem(PANEL_MODE_STORAGE_KEY))
}

export function setStoredPanelMode(mode) {
  const normalized = normalizePanelMode(mode)

  if (typeof window === 'undefined') {
    return normalized
  }

  window.localStorage.setItem(PANEL_MODE_STORAGE_KEY, normalized)
  window.dispatchEvent(new CustomEvent(PANEL_MODE_EVENT, { detail: { mode: normalized } }))
  return normalized
}

export function getSafePanelMode(user, mode) {
  return isManagerUser(user) ? normalizePanelMode(mode) : 'user'
}
