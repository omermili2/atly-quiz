import { STORAGE_KEYS } from './constants';

function getStorageItem(key: string, defaultValue: string = ''): string {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    return localStorage.getItem(key) || defaultValue;
  } catch (error) {
    console.error(`Failed to get ${key} from localStorage:`, error);
    return defaultValue;
  }
}

function setStorageItem(key: string, value: string): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(`Failed to set ${key} in localStorage:`, error);
    return false;
  }
}

/**
 * Get or generate analytics user ID
 */
export function getAnalyticsUserId(): string {
  const existingId = getStorageItem(STORAGE_KEYS.ANALYTICS_USER_ID);
  
  if (existingId) {
    return existingId;
  }

  const newId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  setStorageItem(STORAGE_KEYS.ANALYTICS_USER_ID, newId);
  return newId;
}

/**
 * Get first visit timestamp
 */
export function getFirstVisit(): string {
  const existingVisit = getStorageItem(STORAGE_KEYS.FIRST_VISIT);
  
  if (existingVisit) {
    return existingVisit;
  }

  const now = new Date().toISOString();
  setStorageItem(STORAGE_KEYS.FIRST_VISIT, now);
  return now;
} 