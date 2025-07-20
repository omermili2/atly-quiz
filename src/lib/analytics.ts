import mixpanel from 'mixpanel-browser';
import { getTotalQuestions } from './questions';
import { getQuizAnswers as getStoredQuizAnswers, getAnalyticsUserId, getFirstVisit } from './storage';
import type { 
  QuizAnswers, 
  UserProperties, 
  UserSegment, 
  PrimaryMotivation, 
  AnalyticsEventType,
  PlanType,
  LandingPageAction,
  QuizAnswer,
  QuestionEventProperties,
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
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private getQuizAnswers(): QuizAnswers {
    return getStoredQuizAnswers();
  }

  private getTimeSpent(): number {
    return this.startTime ? Date.now() - this.startTime : 0;
  }

  private getQuestionTimeSpent(): number {
    return this.questionStartTime ? Date.now() - this.questionStartTime : 0;
  }

  private track(event: AnalyticsEventType, properties?: AnalyticsProperties): void {
    if (typeof window === 'undefined') return;
    mixpanel.track(event, properties);
  }

  identifyUser(): void {
    if (typeof window === 'undefined') return;

    const userId = getAnalyticsUserId();
    const now = new Date().toISOString();
    const firstVisit = getFirstVisit();
    
    // Set user properties
    const properties: UserProperties = {
      first_visit: firstVisit,
      last_active: now,
      user_agent: navigator.userAgent,
      referrer: document.referrer || 'direct',
      utm_source: new URLSearchParams(window.location.search).get('utm_source') || undefined,
      utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || undefined,
      utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || undefined,
    };

    mixpanel.identify(userId);
    mixpanel.people.set(properties);
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
      session_id: this.sessionId,
      time_on_page: this.getTimeSpent(),
      timestamp: new Date().toISOString(),
    });
  }

  trackQuizStarted(): void {
    this.trackPageView('Quiz Started');
    
    this.track('Quiz Started', {
      session_id: this.sessionId,
      time_to_start: this.getTimeSpent(),
      timestamp: new Date().toISOString(),
    });

    mixpanel.people.set({
      quiz_started: true,
      quiz_start_date: new Date().toISOString(),
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
      answers_so_far: Object.keys(this.getQuizAnswers()).length,
      timestamp: new Date().toISOString(),
    });
  }

  trackAnswerSelected(questionId: number, answer: QuizAnswer, questionType: 'single' | 'multiple'): void {
    const timeSpent = this.getQuestionTimeSpent();
    const answers = this.getQuizAnswers();
    
    this.track('Answer Selected', {
      question_id: questionId,
      question_text: '', 
      question_type: questionType,
      answer: answer,
      time_spent_on_question: timeSpent,
      session_id: this.sessionId,
      total_answers: Object.keys(answers).length + 1,
      timestamp: new Date().toISOString(),
    });

    const answerKey = `question_${questionId}_answer` as const;
    mixpanel.people.set({
      [answerKey]: answer,
      total_questions_answered: Object.keys(answers).length + 1,
      last_question_answered: questionId,
    });
  }

  trackQuestionSkipped(questionId: number, questionText: string): void {
    const timeSpent = this.getQuestionTimeSpent();
    
    this.track('Question Skipped', {
      question_id: questionId,
      question_text: questionText,
      question_type: 'single',
      time_spent_on_question: timeSpent,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });
  }

  trackBackNavigation(fromQuestionId: number, toQuestionId: number): void {
    this.track('Back Navigation', {
      from_question: fromQuestionId,
      to_question: toQuestionId,
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
    const answers = this.getQuizAnswers();
    const completedCount = Object.keys(answers).length;
    const totalQuestions = getTotalQuestions();
    const skippedCount = totalQuestions - completedCount;
    
    this.trackPageView('Quiz Completed');
    
    this.track('Quiz Completed', {
      session_id: this.sessionId,
      total_time_spent: totalTime,
      questions_answered: completedCount,
      questions_skipped: skippedCount,
      completion_rate: completedCount > 0 ? (completedCount / totalQuestions) * 100 : 0,
      all_answers: answers,
      timestamp: new Date().toISOString(),
    });

    mixpanel.people.set({
      quiz_completed: true,
      quiz_completion_date: new Date().toISOString(),
      time_to_complete_quiz: totalTime,
      final_completion_rate: completedCount > 0 ? (completedCount / totalQuestions) * 100 : 0,
    });
  }

  trackAnalysisStarted(): void {
    this.trackPageView('Analysis Started');
    
    this.track('Analysis Started', {
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });
  }

  trackAnalysisProgress(percentage: number, currentStep: string): void {
    if (percentage % 25 === 0 || percentage === 100) {
      this.track('Analysis Progress', {
        percentage,
        current_step: currentStep,
        session_id: this.sessionId,
        timestamp: new Date().toISOString(),
      });
    }
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
  }

  trackCheckoutStarted(planType: PlanType, planPrice: number): void {
    this.track('Checkout Started', {
      plan_type: planType,
      plan_price: planPrice,
      session_id: this.sessionId,
      total_funnel_time: this.getTimeSpent(),
      timestamp: new Date().toISOString(),
    });
  }

  trackDropoff(page: string, reason?: string): void {
    this.track('User Dropped Off', {
      page,
      reason,
      session_id: this.sessionId,
      time_spent_before_dropout: this.getTimeSpent(),
      answers_collected: Object.keys(this.getQuizAnswers()).length,
      timestamp: new Date().toISOString(),
    });
  }

  trackError(error: Error, context: string): void {
    this.track('Error Occurred', {
      error_message: error.message,
      error_stack: error.stack,
      context,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });
  }

  trackUserSegment(): void {
    const answers = this.getQuizAnswers();
    
    let userSegment: UserSegment = 'unknown';
    let primaryMotivation: PrimaryMotivation = 'unknown';
    
    if (answers[1]) {
      const motivation = Array.isArray(answers[1]) ? answers[1][0] : answers[1];
      if (motivation.includes('Celiac')) {
        userSegment = 'celiac_diagnosed';
        primaryMotivation = 'medical_necessity';
      } else if (motivation.includes('sensitivity')) {
        userSegment = 'gluten_sensitive';
        primaryMotivation = 'health_conscious';
      } else if (motivation.includes('wellness')) {
        userSegment = 'wellness_focused';
        primaryMotivation = 'lifestyle_choice';
      } else if (motivation.includes('athlete')) {
        userSegment = 'performance_athlete';
        primaryMotivation = 'performance_optimization';
      } else if (motivation.includes('support')) {
        userSegment = 'supporting_family';
        primaryMotivation = 'family_support';
      }
    }

    mixpanel.people.set({
      user_segment: userSegment,
      primary_motivation: primaryMotivation,
    });

    this.track('User Segment Identified', {
      user_segment: userSegment,
      primary_motivation: primaryMotivation,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });
  }
}

export const analytics = new AnalyticsService();
export const track = analytics.trackPageView.bind(analytics);
export const identify = analytics.identifyUser.bind(analytics);

export default analytics; 