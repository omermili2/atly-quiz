import mixpanel from 'mixpanel-browser';
import { getAnalyticsUserId } from './storage';
import type { 
  PlanType,
  QuizAnswer
} from './types';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || 'YOUR_MIXPANEL_TOKEN';

if (typeof window !== 'undefined') {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV === 'development',
    track_pageview: false, // We'll track manually
    persistence: 'localStorage',
  });
}

// Simplified event types
type PageEvent = 'Landing Page' | 'Quiz Question' | 'Quiz Info' | 'Quiz End' | 'Analysis' | 'Pricing';
type ActionEvent = 'continue' | 'back' | 'skip';

class AnalyticsService {
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.identifyUser();
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private track(eventName: string, properties?: Record<string, string | number | boolean | QuizAnswer | QuizAnswer[] | null>): void {
    if (typeof window === 'undefined') return;

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
    try {
      const userId = getAnalyticsUserId();
      mixpanel.identify(userId);
    } catch (error) {
      console.error('Failed to identify user:', error);
    }
  }

  // 1. PAGE VISITS - Track funnel progression
  trackPageVisit(page: PageEvent, questionId?: number, questionText?: string): void {
    this.track('Page Visit', {
      page,
      question_id: questionId || null,
      question_text: questionText || null,
      url: typeof window !== 'undefined' ? window.location.pathname : null,
    });
  }

  // 2. ACTIONS - Track user interactions
  trackAction(action: ActionEvent, context?: { questionId?: number; questionText?: string; fromPage?: string; toPage?: string }): void {
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
    this.track('Answer Selected', {
      question_id: questionId,
      question_text: questionText || null,
      answer: answer,
      question_type: questionType,
    });

    // Store in user profile for funnel analysis
    mixpanel.people.set({
      [`question_${questionId}_answer`]: Array.isArray(answer) ? answer.join(', ') : answer,
      [`question_${questionId}_text`]: questionText || '',
    });
  }

  // 4. CONVERSION - Track plan selection and checkout completion
  trackPlanSelection(planType: PlanType): void {
    this.track('Plan Selected', {
      plan_type: planType,
    });

    mixpanel.people.set({
      selected_plan: planType,
    });
  }

  trackCheckoutStart(planType: PlanType): void {
    this.track('Checkout Started', {
      plan_type: planType,
    });

    mixpanel.people.set({
      checkout_started: true,
    });
  }

  trackTrialStart(planType: PlanType): void {
    this.track('Free Trial Started', {
      plan_type: planType,
    });

    mixpanel.people.set({
      trial_started: true,
      trial_plan: planType,
      conversion_date: new Date().toISOString(),
    });
  }

  // Convenience methods for common page visits
  trackLandingPageLoad(): void {
    this.trackPageVisit('Landing Page');
  }

  trackQuestionViewed(questionId: number, questionText: string): void {
    this.trackPageVisit('Quiz Question', questionId, questionText);
  }

  trackInfoPageViewed(questionId: number, infoTitle: string): void {
    this.trackPageVisit('Quiz Info', questionId, infoTitle);
  }

  trackQuizEndViewed(): void {
    this.trackPageVisit('Quiz End');
  }

  trackAnalysisPageViewed(): void {
    this.trackPageVisit('Analysis');
  }

  trackPricingPageViewed(): void {
    this.trackPageVisit('Pricing');
  }

  // Convenience methods for common actions
  trackContinueClick(questionId?: number, questionText?: string): void {
    this.trackAction('continue', { questionId, questionText });
  }

  trackBackClick(questionId?: number, questionText?: string): void {
    this.trackAction('back', { questionId, questionText });
  }

  trackSkipClick(questionId?: number, questionText?: string): void {
    this.trackAction('skip', { questionId, questionText });
  }
}

const analytics = new AnalyticsService();
export default analytics; 