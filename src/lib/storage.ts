import { STORAGE_KEYS } from './constants';
import type { QuizAnswers, QuizAnswer, StorageResult } from './types';


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
 * Get all quiz answers from localStorage
 */
export function getQuizAnswers(): QuizAnswers {
  try {
    const answers = getStorageItem(STORAGE_KEYS.QUIZ_ANSWERS, '{}');
    return JSON.parse(answers);
  } catch (error) {
    console.error('Failed to parse quiz answers from localStorage:', error);
    return {};
  }
}

/**
 * Save a single answer to localStorage
 */
export function saveSingleAnswer(questionId: number, answer: string): StorageResult {
  try {
    const savedAnswers = getQuizAnswers();
    savedAnswers[questionId] = answer;
    const success = setStorageItem(STORAGE_KEYS.QUIZ_ANSWERS, JSON.stringify(savedAnswers));
    return { success };
  } catch (error) {
    console.error('Failed to save single answer to localStorage:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Save multiple answers to localStorage
 */
export function saveMultipleAnswers(questionId: number, answers: string[]): StorageResult {
  try {
    const savedAnswers = getQuizAnswers();
    savedAnswers[questionId] = answers;
    const success = setStorageItem(STORAGE_KEYS.QUIZ_ANSWERS, JSON.stringify(savedAnswers));
    return { success };
  } catch (error) {
    console.error('Failed to save multiple answers to localStorage:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get analytics user ID, creating one if it doesn't exist
 */
export function getAnalyticsUserId(): string {
  let userId = getStorageItem(STORAGE_KEYS.ANALYTICS_USER_ID);
  
  if (!userId) {
    userId = 'user_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
    setStorageItem(STORAGE_KEYS.ANALYTICS_USER_ID, userId);
  }
  
  return userId;
}

/**
 * Get first visit timestamp, creating one if it doesn't exist
 */
export function getFirstVisit(): string {
  let firstVisit = getStorageItem(STORAGE_KEYS.FIRST_VISIT);
  
  if (!firstVisit) {
    firstVisit = new Date().toISOString();
    setStorageItem(STORAGE_KEYS.FIRST_VISIT, firstVisit);
  }
  
  return firstVisit;
}


export function clearQuizData(): StorageResult {
  try {
    if (typeof window === 'undefined') return { success: false, error: 'Not in browser environment' };
    
    localStorage.removeItem(STORAGE_KEYS.QUIZ_ANSWERS);
    return { success: true };
  } catch (error) {
    console.error('Failed to clear quiz data from localStorage:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


export function getQuizProgress(): {
  totalAnswered: number;
  answeredQuestions: number[];
  completionPercentage: number;
} {
  const answers = getQuizAnswers();
  const answeredQuestions = Object.keys(answers).map(Number);
  const totalAnswered = answeredQuestions.length;
  

  const estimatedTotalQuestions = 5;
  const completionPercentage = (totalAnswered / estimatedTotalQuestions) * 100;
  
  return {
    totalAnswered,
    answeredQuestions,
    completionPercentage: Math.min(completionPercentage, 100)
  };
} 