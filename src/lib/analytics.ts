import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || 'YOUR_MIXPANEL_TOKEN';

if (typeof window !== 'undefined') {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV === 'development',
    track_pageview: true,
    persistence: 'localStorage',
  });
}

// Types for better TypeScript support
export interface QuizAnswers {
  [questionId: number]: string | string[];
}

export interface UserProperties {
  first_visit?: string;
  last_active?: string;
  quiz_started?: boolean;
  quiz_completed?: boolean;
  quiz_completion_date?: string;
  total_questions_answered?: number;
  questions_skipped?: number;
  time_to_complete_quiz?: number;
  reached_pricing?: boolean;
  user_agent?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
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
    try {
      return JSON.parse(localStorage.getItem('quizAnswers') || '{}');
    } catch {
      return {};
    }
  }

  private getTimeSpent(): number {
    return this.startTime ? Date.now() - this.startTime : 0;
  }

  private getQuestionTimeSpent(): number {
    return this.questionStartTime ? Date.now() - this.questionStartTime : 0;
  }

  // Initialize user tracking
  identifyUser(): void {
    if (typeof window === 'undefined') return;

    const userId = this.getUserId();
    const now = new Date().toISOString();
    
    // Set user properties
    const properties: UserProperties = {
      first_visit: localStorage.getItem('first_visit') || now,
      last_active: now,
      user_agent: navigator.userAgent,
      referrer: document.referrer || 'direct',
      utm_source: new URLSearchParams(window.location.search).get('utm_source') || undefined,
      utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || undefined,
      utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || undefined,
    };

    // Store first visit if not exists
    if (!localStorage.getItem('first_visit')) {
      localStorage.setItem('first_visit', now);
    }

    mixpanel.identify(userId);
    mixpanel.people.set(properties);
  }

  private getUserId(): string {
    let userId = localStorage.getItem('analytics_user_id');
    if (!userId) {
      userId = 'user_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
      localStorage.setItem('analytics_user_id', userId);
    }
    return userId;
  }

  // Page tracking
  trackPageView(page: string, properties?: Record<string, unknown>): void {
    if (typeof window === 'undefined') return;

    mixpanel.track('Page Viewed', {
      page,
      url: window.location.href,
      path: window.location.pathname,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
      ...properties,
    });
  }

  // Landing page events
  trackLandingPageLoad(): void {
    this.identifyUser();
    this.startTime = Date.now();
    
    this.trackPageView('Landing Page', {
      event_type: 'funnel_start',
    });

    mixpanel.track('Landing Page Loaded', {
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });
  }

  trackLandingPageEngagement(action: 'testimonial_viewed' | 'continue_clicked' | 'logo_clicked'): void {
    mixpanel.track('Landing Page Interaction', {
      action,
      session_id: this.sessionId,
      time_on_page: this.getTimeSpent(),
      timestamp: new Date().toISOString(),
    });
  }

  // Quiz flow events
  trackQuizStarted(): void {
    this.trackPageView('Quiz Started');
    
    mixpanel.track('Quiz Started', {
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

    mixpanel.track('Question Viewed', {
      question_id: questionId,
      question_text: questionText,
      question_type: questionType,
      session_id: this.sessionId,
      answers_so_far: Object.keys(this.getQuizAnswers()).length,
      timestamp: new Date().toISOString(),
    });
  }

  trackAnswerSelected(questionId: number, answer: string | string[], questionType: 'single' | 'multiple'): void {
    const timeSpent = this.getQuestionTimeSpent();
    const answers = this.getQuizAnswers();
    
    mixpanel.track('Answer Selected', {
      question_id: questionId,
      answer: answer,
      question_type: questionType,
      time_spent_on_question: timeSpent,
      session_id: this.sessionId,
      total_answers: Object.keys(answers).length + 1,
      timestamp: new Date().toISOString(),
    });

    // Update user properties with the answer
    const answerKey = `question_${questionId}_answer`;
    mixpanel.people.set({
      [answerKey]: answer,
      total_questions_answered: Object.keys(answers).length + 1,
      last_question_answered: questionId,
    });
  }

  trackQuestionSkipped(questionId: number, questionText: string): void {
    const timeSpent = this.getQuestionTimeSpent();
    
    mixpanel.track('Question Skipped', {
      question_id: questionId,
      question_text: questionText,
      time_spent_on_question: timeSpent,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });

    // Track skipped questions count
    const skippedCount = (localStorage.getItem('questions_skipped') || '0');
    const newSkippedCount = parseInt(skippedCount) + 1;
    localStorage.setItem('questions_skipped', newSkippedCount.toString());
    
    mixpanel.people.set({
      questions_skipped: newSkippedCount,
    });
  }

  trackBackNavigation(fromQuestionId: number, toQuestionId: number): void {
    mixpanel.track('Back Navigation', {
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

    mixpanel.track('Info Page Viewed', {
      question_id: questionId,
      info_title: infoTitle,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });
  }

  // Quiz completion events
  trackQuizCompleted(): void {
    const totalTime = this.getTimeSpent();
    const answers = this.getQuizAnswers();
    const skippedCount = parseInt(localStorage.getItem('questions_skipped') || '0');
    const completedCount = Object.keys(answers).length;
    
    this.trackPageView('Quiz Completed');
    
    mixpanel.track('Quiz Completed', {
      session_id: this.sessionId,
      total_time_spent: totalTime,
      questions_answered: completedCount,
      questions_skipped: skippedCount,
      completion_rate: (completedCount / (completedCount + skippedCount)) * 100,
      all_answers: answers,
      timestamp: new Date().toISOString(),
    });

    mixpanel.people.set({
      quiz_completed: true,
      quiz_completion_date: new Date().toISOString(),
      time_to_complete_quiz: totalTime,
      final_completion_rate: (completedCount / (completedCount + skippedCount)) * 100,
    });
  }

  // Loader and analysis events
  trackAnalysisStarted(): void {
    this.trackPageView('Analysis Started');
    
    mixpanel.track('Analysis Started', {
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });
  }

  trackAnalysisProgress(percentage: number, currentStep: string): void {
    // Only track key milestones to avoid spam
    if (percentage % 25 === 0 || percentage === 100) {
      mixpanel.track('Analysis Progress', {
        percentage,
        current_step: currentStep,
        session_id: this.sessionId,
        timestamp: new Date().toISOString(),
      });
    }
  }

  // Pricing and conversion events
  trackPricingPageViewed(): void {
    this.trackPageView('Pricing Page');
    
    mixpanel.track('Pricing Page Viewed', {
      session_id: this.sessionId,
      total_funnel_time: this.getTimeSpent(),
      timestamp: new Date().toISOString(),
    });

    mixpanel.people.set({
      reached_pricing: true,
    });

    // Increment pricing page views counter
    mixpanel.people.increment('pricing_page_views');
  }

  trackPlanSelected(planType: 'annual' | 'monthly'): void {
    mixpanel.track('Plan Selected', {
      plan_type: planType,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });
  }

  trackCheckoutStarted(planType: string, planPrice: number): void {
    mixpanel.track('Checkout Started', {
      plan_type: planType,
      plan_price: planPrice,
      session_id: this.sessionId,
      total_funnel_time: this.getTimeSpent(),
      timestamp: new Date().toISOString(),
    });
  }

  // Dropout tracking
  trackDropoff(page: string, reason?: string): void {
    mixpanel.track('User Dropped Off', {
      page,
      reason,
      session_id: this.sessionId,
      time_spent_before_dropout: this.getTimeSpent(),
      answers_collected: Object.keys(this.getQuizAnswers()).length,
      timestamp: new Date().toISOString(),
    });
  }

  // Error tracking
  trackError(error: Error, context: string): void {
    mixpanel.track('Error Occurred', {
      error_message: error.message,
      error_stack: error.stack,
      context,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });
  }

  // Custom events for specific insights
  trackUserSegment(): void {
    const answers = this.getQuizAnswers();
    
    // Analyze user segments based on answers
    let userSegment = 'unknown';
    let primaryMotivation = 'unknown';
    
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

    mixpanel.track('User Segment Identified', {
      user_segment: userSegment,
      primary_motivation: primaryMotivation,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });
  }
}

// Export singleton instance
export const analytics = new AnalyticsService();

// Convenience functions
export const track = analytics.trackPageView.bind(analytics);
export const identify = analytics.identifyUser.bind(analytics);

export default analytics; 