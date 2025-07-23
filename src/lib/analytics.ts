import mixpanel from 'mixpanel-browser';
import type { 
  PlanType,
  QuizAnswer
} from './types';

// Production analytics with clean event tracking
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN!;

if (typeof window !== 'undefined') {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: false,
    track_pageview: false,
    persistence: 'localStorage',
    ignore_dnt: true, // Ignore "Do Not Track" setting for development/testing
  });
}

// Storage functionality for analytics user ID
const STORAGE_KEYS = {
  ANALYTICS_USER_ID: 'analytics_user_id',
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
function getAnalyticsUserId(): string {
  const existingId = getStorageItem(STORAGE_KEYS.ANALYTICS_USER_ID);
  
  if (existingId) {
    return existingId;
  }

  const newId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  setStorageItem(STORAGE_KEYS.ANALYTICS_USER_ID, newId);
  return newId;
}

// Simplified event types
type PageEvent = 'Landing Page' | 'Quiz End' | 'Analysis' | 'Pricing' | string; // Allow dynamic page names
type ActionEvent = 'continue' | 'back' | 'skip';

interface IAnalyticsService {
  trackPageVisit(page: PageEvent, questionId?: number, questionText?: string): void;
  trackAction(action: ActionEvent, context?: { questionId?: number; questionText?: string; fromPage?: string; toPage?: string }): void;
  trackAnswer(questionId: number, answer: QuizAnswer | QuizAnswer[], questionType: 'single' | 'multiple', questionText?: string): void;
  trackPlanSelection(planType: PlanType): void;
  trackCheckoutStart(planType: PlanType): void;
  trackTrialStart(planType: PlanType): void;
  trackLandingPageLoad(): void;
  trackQuestionViewed(questionId: number, questionText: string): void;
  trackInfoPageViewed(questionId: number, infoTitle: string): void;
  trackQuizEndViewed(): void;
  trackAnalysisPageViewed(): void;
  trackPricingPageViewed(): void;
  trackContinueClick(questionId?: number, questionText?: string): void;
  trackBackClick(questionId?: number, questionText?: string): void;
  trackSkipClick(questionId?: number, questionText?: string): void;
}

class AnalyticsService implements IAnalyticsService {
  private sessionId: string;
  private initialized: boolean = false;

  constructor() {
    this.sessionId = this.generateSessionId();
    // Don't initialize immediately - wait for first use
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private init(): void {
    if (this.initialized || typeof window === 'undefined') return;
    
    try {
      this.identifyUser();
      this.initialized = true;
    } catch (error) {
      console.error('Analytics initialization error:', error);
    }
  }

  private track(eventName: string, properties?: Record<string, string | number | boolean | QuizAnswer | QuizAnswer[] | null>): void {
    if (typeof window === 'undefined' || !mixpanel) return;

    try {
      const baseProperties = {
        session_id: this.sessionId,
        timestamp: new Date().toISOString(),
        ...properties,
      };

      mixpanel.track(eventName, baseProperties);
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }

  private identifyUser(): void {
    if (typeof window === 'undefined' || !mixpanel) return;
    
    try {
      const userId = getAnalyticsUserId();
      mixpanel.identify(userId);
    } catch (error) {
      console.error('Failed to identify user:', error);
    }
  }

  // 1. PAGE VISITS - Track funnel progression
  trackPageVisit(page: PageEvent, questionId?: number, questionText?: string): void {
    this.init(); // Ensure initialization
    this.track('Page Visit', {
      page,
      question_id: questionId || null,
      question_text: questionText || null,
      url: typeof window !== 'undefined' ? window.location.pathname : null,
    });
  }

  // 2. ACTIONS - Track user interactions
  trackAction(action: ActionEvent, context?: { questionId?: number; questionText?: string; fromPage?: string; toPage?: string }): void {
    this.init(); // Ensure initialization
    this.track('User Action', {
      action,
      question_id: context?.questionId || null,
      question_text: context?.questionText || null,
      from_page: context?.fromPage || null,
      to_page: context?.toPage || null,
    });
  }

  // 3. ANSWERS - Track what users selected
  trackAnswer(questionId: number, answer: QuizAnswer | QuizAnswer[], questionType: 'single' | 'multiple', questionText?: string): void {
    this.init(); // Ensure initialization
    this.track('Answer Selected', {
      question_id: questionId,
      question_text: questionText || null,
      answer: answer,
      question_type: questionType,
    });

    // Store in user profile for funnel analysis
    if (typeof window !== 'undefined' && mixpanel) {
      try {
        mixpanel.people.set({
          [`question_${questionId}_answer`]: Array.isArray(answer) ? answer.join(', ') : answer,
          [`question_${questionId}_text`]: questionText || '',
        });
      } catch (error) {
        console.error('Failed to set user profile data:', error);
      }
    }
  }

  // 4. CONVERSION - Track plan selection and checkout completion
  trackPlanSelection(planType: PlanType): void {
    this.init(); // Ensure initialization
    this.track('Plan Selected', {
      plan_type: planType,
    });

    if (typeof window !== 'undefined' && mixpanel) {
      try {
        mixpanel.people.set({
          selected_plan: planType,
        });
      } catch (error) {
        console.error('Failed to set user profile data:', error);
      }
    }
  }

  trackCheckoutStart(planType: PlanType): void {
    this.init(); // Ensure initialization
    this.track('Checkout Started', {
      plan_type: planType,
    });

    if (typeof window !== 'undefined' && mixpanel) {
      try {
        mixpanel.people.set({
          checkout_started: true,
        });
      } catch (error) {
        console.error('Failed to set user profile data:', error);
      }
    }
  }

  trackTrialStart(planType: PlanType): void {
    this.init(); // Ensure initialization
    this.track('Free Trial Started', {
      plan_type: planType,
    });

    if (typeof window !== 'undefined' && mixpanel) {
      try {
        mixpanel.people.set({
          trial_started: true,
          trial_plan: planType,
          conversion_date: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Failed to set user profile data:', error);
      }
    }
  }

  // Convenience methods for common page visits
  trackLandingPageLoad(): void {
    this.init();
    this.trackPageVisit('Landing Page');
  }

  trackQuestionViewed(questionId: number, questionText: string): void {
    this.init();
    this.trackPageVisit(`Quiz Question ${questionId}`, questionId, questionText);
  }

  trackInfoPageViewed(questionId: number, infoTitle: string): void {
    this.init();
    this.trackPageVisit(`Quiz Info ${questionId}`, questionId, infoTitle);
  }

  trackQuizEndViewed(): void {
    this.init();
    this.trackPageVisit('Quiz End');
  }

  trackAnalysisPageViewed(): void {
    this.init();
    this.trackPageVisit('Analysis');
  }

  trackPricingPageViewed(): void {
    this.init();
    this.trackPageVisit('Pricing');
  }

  // Convenience methods for common actions
  trackContinueClick(questionId?: number, questionText?: string): void {
    this.init();
    this.trackAction('continue', { questionId, questionText });
  }

  trackBackClick(questionId?: number, questionText?: string): void {
    this.init();
    this.trackAction('back', { questionId, questionText });
  }

  trackSkipClick(questionId?: number, questionText?: string): void {
    this.init();
    this.trackAction('skip', { questionId, questionText });
  }
}

let analyticsInstance: AnalyticsService | null = null;

const getAnalytics = (): IAnalyticsService => {
  if (typeof window === 'undefined') {
    // Return a no-op service for SSR
    return {
      trackPageVisit: () => {},
      trackAction: () => {},
      trackAnswer: () => {},
      trackPlanSelection: () => {},
      trackCheckoutStart: () => {},
      trackTrialStart: () => {},
      trackLandingPageLoad: () => {},
      trackQuestionViewed: () => {},
      trackInfoPageViewed: () => {},
      trackQuizEndViewed: () => {},
      trackAnalysisPageViewed: () => {},
      trackPricingPageViewed: () => {},
      trackContinueClick: () => {},
      trackBackClick: () => {},
      trackSkipClick: () => {},
    };
  }

  if (!analyticsInstance) {
    analyticsInstance = new AnalyticsService();
  }
  return analyticsInstance;
};

const analytics = getAnalytics();

export default analytics; 