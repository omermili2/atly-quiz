import type { QuizAnswer } from './types';

const STORAGE_KEYS = {
  ANALYTICS_USER_ID: 'analytics_user_id',
  FIRST_VISIT: 'first_visit',
  USER_SEGMENT_ANSWER: 'user_segment_answer',
} as const;

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

/**
 * Save user's first answer for segmentation purposes
 */
export function saveUserSegmentAnswer(answer: QuizAnswer): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.USER_SEGMENT_ANSWER, JSON.stringify(answer));
  } catch (error) {
    console.error('Failed to save user segment answer:', error);
  }
}

/**
 * Get user's first answer for segmentation
 */
export function getUserSegmentAnswer(): QuizAnswer | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const answer = getStorageItem(STORAGE_KEYS.USER_SEGMENT_ANSWER);
    return answer ? JSON.parse(answer) : null;
  } catch (error) {
    console.error('Failed to get user segment answer:', error);
    return null;
  }
} 