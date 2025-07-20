import mixpanel from 'mixpanel-browser';
import { getTotalQuestions } from './questions';
import { getAnalyticsUserId, getFirstVisit } from './storage';
import type { 
  UserProperties, 
  UserSegment, 
  PrimaryMotivation, 
  AnalyticsEventType,
  PlanType,
  LandingPageAction,
  QuizAnswer,
  AnalyticsProperties
} from './types';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || 'YOUR_MIXPANEL_TOKEN';

if (typeof window !== 'undefined') {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV === 'development',
    track_pageview: true,
    persistence: 'localStorage',
  });
}

class AnalyticsService {
  private startTime: number | null = null;
  private questionStartTime: number | null = null;
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private getTimeSpent(): number {
    if (!this.startTime) return 0;
    return Math.round((Date.now() - this.startTime) / 1000);
  }

  private getQuestionTimeSpent(): number {
    if (!this.questionStartTime) return 0;
    return Math.round((Date.now() - this.questionStartTime) / 1000);
  }

  private track(eventName: AnalyticsEventType, properties?: AnalyticsProperties): void {
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
      const firstVisit = getFirstVisit();
      
      mixpanel.identify(userId);
      
      const userProperties: UserProperties = {
        first_visit: firstVisit,
        last_active: new Date().toISOString(),
        user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
        referrer: typeof window !== 'undefined' ? document.referrer : '',
      };

      const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
      if (urlParams.get('utm_source')) userProperties.utm_source = urlParams.get('utm_source')!;
      if (urlParams.get('utm_medium')) userProperties.utm_medium = urlParams.get('utm_medium')!;
      if (urlParams.get('utm_campaign')) userProperties.utm_campaign = urlParams.get('utm_campaign')!;

      mixpanel.people.set(userProperties);
    } catch (error) {
      console.error('Failed to identify user:', error);
    }
  }

  trackPageView(page: string, properties?: Record<string, string | number | boolean>): void {
    if (typeof window === 'undefined') return;

    this.track('Page Viewed', {
      page,
      url: window.location.href,
      path: window.location.pathname,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
      ...properties,
    });
  }

  trackLandingPageLoad(): void {
    this.identifyUser();
    this.startTime = Date.now();
    
    this.trackPageView('Landing Page', {
      event_type: 'funnel_start',
    });

    this.track('Landing Page Loaded', {
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });
  }

  trackLandingPageEngagement(action: LandingPageAction): void {
    this.track('Landing Page Interaction', {
      action,
      time_on_page: this.getTimeSpent(),
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });
  }

  trackQuizStarted(): void {
    this.track('Quiz Started', {
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });

    mixpanel.people.set({
      quiz_started: true,
    });
  }

  trackQuestionViewed(questionId: number, questionText: string, questionType: 'single' | 'multiple'): void {
    this.questionStartTime = Date.now();
    
    this.trackPageView('Quiz Question', {
      question_id: questionId,
      question_type: questionType,
    });

    this.track('Question Viewed', {
      question_id: questionId,
      question_text: questionText,
      question_type: questionType,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });
  }

  trackAnswerSelected(questionId: number, answer: QuizAnswer, questionType: 'single' | 'multiple'): void {
    const timeSpent = this.getQuestionTimeSpent();
    
    this.track('Answer Selected', {
      question_id: questionId,
      question_text: '', 
      question_type: questionType,
      answer: answer,
      time_spent_on_question: timeSpent,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });

    mixpanel.people.set({
      [`question_${questionId}_answer`]: answer,
      last_question_answered: questionId,
    });
  }

  trackQuestionSkipped(questionId: number, reason: string = 'user_skipped'): void {
    const timeSpent = this.getQuestionTimeSpent();
    
    this.track('Question Skipped', {
      question_id: questionId,
      reason,
      time_spent_on_question: timeSpent,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });

    mixpanel.people.increment('questions_skipped');
  }

  trackBackNavigation(fromQuestion: number, toQuestion: number): void {
    this.track('Back Navigation', {
      from_question: fromQuestion,
      to_question: toQuestion,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });
  }

  trackInfoPageViewed(questionId: number, infoTitle: string): void {
    this.trackPageView('Quiz Info Page', {
      question_id: questionId,
      info_title: infoTitle,
    });

    this.track('Info Page Viewed', {
      question_id: questionId,
      question_text: infoTitle,
      question_type: 'single',
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });
  }

  trackQuizCompleted(): void {
    const totalTime = this.getTimeSpent();
    const totalQuestions = getTotalQuestions();
    
    this.track('Quiz Completed', {
      total_funnel_time: totalTime,
      total_questions: totalQuestions,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });

    mixpanel.people.set({
      quiz_completed: true,
      quiz_completion_date: new Date().toISOString(),
      time_to_complete_quiz: totalTime,
    });

    mixpanel.people.increment('quiz_completions');
  }

  trackAnalysisStarted(): void {
    this.trackPageView('Analysis Page');
    
    this.track('Analysis Started', {
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });
  }

  trackAnalysisProgress(percentage: number, currentStep: string): void {
    this.track('Analysis Progress', {
      percentage,
      current_step: currentStep,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });
  }

  trackPricingPageViewed(): void {
    this.trackPageView('Pricing Page');
    
    this.track('Pricing Page Viewed', {
      session_id: this.sessionId,
      total_funnel_time: this.getTimeSpent(),
      timestamp: new Date().toISOString(),
    });

    mixpanel.people.set({
      reached_pricing: true,
    });

    mixpanel.people.increment('pricing_page_views');
  }

  trackPlanSelected(planType: PlanType): void {
    this.track('Plan Selected', {
      plan_type: planType,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });

    mixpanel.people.set({
      selected_plan: planType,
    });
  }

  trackCheckoutStarted(planType: PlanType, planPrice: number): void {
    this.track('Checkout Started', {
      plan_type: planType,
      plan_price: planPrice,
      session_id: this.sessionId,
      total_funnel_time: this.getTimeSpent(),
      timestamp: new Date().toISOString(),
    });

    mixpanel.people.set({
      checkout_started: true,
    });
  }

  trackUserDropoff(page: string, reason: string = 'unknown'): void {
    const timeSpent = this.getTimeSpent();
    
    this.track('User Dropped Off', {
      page,
      reason,
      time_spent_before_dropout: timeSpent,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });
  }

  trackError(errorMessage: string, context: string = ''): void {
    this.track('Error Occurred', {
      error_message: errorMessage,
      context,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });
  }

  trackUserSegment(): void {
    // Simplified user segmentation without localStorage dependency
    // User segments are now primarily determined by Mixpanel's people properties
    // which are set when answers are selected
    
    this.track('User Segment Identified', {
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });
  }
}

const analytics = new AnalyticsService();
export default analytics; 