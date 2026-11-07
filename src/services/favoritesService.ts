/**
 * Saved / Favourite Properties Service
 */

const KEY = 'alderwick_saved_properties';

export function getSavedPropertyRefs(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isPropertySaved(ref: string): boolean {
  const list = getSavedPropertyRefs();
  return list.includes(ref.toUpperCase());
}

export function toggleSavedProperty(ref: string): boolean {
  try {
    const list = getSavedPropertyRefs();
    const upper = ref.toUpperCase();
    let updated: string[];
    let isNowSaved = false;
    if (list.includes(upper)) {
      updated = list.filter(r => r !== upper);
      isNowSaved = false;
    } else {
      updated = [...list, upper];
      isNowSaved = true;
    }
    localStorage.setItem(KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('alderwick_favorites_changed', { detail: { count: updated.length } }));
    return isNowSaved;
  } catch {
    return false;
  }
}
