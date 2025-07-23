# Analytics Documentation

This document outlines the analytics tracking implementation for the Atly Quiz application, designed for funnel analysis and conversion tracking.

## Architecture Overview

The analytics system uses a **lazy-loading, SSR-safe** approach:
- **Client-side only**: Analytics only initialize in the browser (no SSR issues)
- **Lazy initialization**: Service instantiates when first used
- **Mixpanel integration**: Production-ready event tracking
- **TypeScript interfaces**: Consistent API across the app

## Core Types

```typescript
export type PlanType = 'annual' | 'monthly';
export type QuizAnswer = string | string[];
```

## Event Categories

### 1. Page Visits (Funnel Analysis)
Track user progression through the quiz funnel.

**Event:** `Page Visit`

**Pages tracked:**
- `Landing Page` - Entry point with background image
- `Quiz Question {N}` - Each question page (includes question text)
- `Quiz Info {N}` - Info pages between questions  
- `Quiz End` - Completion page with food emojis
- `Analysis` - Loading/progress page
- `Pricing` - Plan selection and payment

**Properties:**
- `page` - Page identifier
- `question_id` - Question number (if applicable)
- `question_text` - Actual question text (if applicable)
- `url` - Current pathname

**Auto-tracked by:**
- Page components on mount (QuestionTracker, InfoTracker)
- Analytics calls in useEffect hooks

### 2. User Actions
Track navigation and engagement patterns.

**Event:** `User Action`

**Actions tracked:**
- `continue` - User proceeds forward
- `back` - User navigates backward  
- `skip` - User skips current step

**Properties:**
- `action` - Action type
- `question_id` - Current question (if applicable)
- `question_text` - Question text (if applicable)

**Auto-tracked by:**
- ProgressBar component (back/skip buttons)
- Continue button clicks

### 3. Answer Selection
Track user choices for segmentation and analysis.

**Event:** `Answer Selected`

**Properties:**
- `question_id` - Question number
- `question_text` - Full question text
- `answer` - Selected answer(s)
- `question_type` - `'single'` or `'multiple'`

**User Profile Storage:**
Mixpanel user profiles store:
- `question_1_answer`, `question_2_answer`, etc.
- `question_1_text`, `question_2_text`, etc.

**Auto-tracked by:**
- AnswerCard component (single choice)
- MultipleChoiceCard component (multiple choice)

### 4. Conversion Tracking
Track plan selection and trial starts.

**Events:**
- `Plan Selected` - User selects annual/monthly
- `Checkout Started` - User begins checkout
- `Free Trial Started` - Conversion complete

**Properties:**
- `plan_type` - `'annual'` or `'monthly'`

**User Profile Storage:**
- `selected_plan` - Last selected plan
- `checkout_started` - Boolean flag
- `trial_started` - Conversion indicator
- `trial_plan` - Converted plan type
- `conversion_date` - Conversion timestamp

## Implementation Details

### SSR-Safe Initialization

```typescript
// Analytics service uses lazy loading
let analyticsInstance: AnalyticsService | null = null;

const getAnalytics = (): IAnalyticsService => {
  if (typeof window === 'undefined') {
    // Return no-op service for SSR
    return { trackPageVisit: () => {}, ... };
  }
  
  if (!analyticsInstance) {
    analyticsInstance = new AnalyticsService();
  }
  return analyticsInstance;
};
```

### User Identification

```typescript
// Custom user ID format: user_{timestamp}_{random}
const userId = getAnalyticsUserId(); // e.g., "user_1703123456789_abc123def"
mixpanel.identify(userId);
```

### Component Integration

**Automatic Tracking:**
```typescript
// QuestionTracker.tsx - Tracks question views
useEffect(() => {
  analytics.trackQuestionViewed(questionId, questionText);
}, [questionId, questionText]);

// AnswerCard.tsx - Tracks answer selection
const handleSelect = () => {
  analytics.trackAnswer(questionId, answer, 'single', questionText);
};
```

**Manual Tracking:**
```typescript
// Page components
analytics.trackLandingPageLoad();
analytics.trackPricingPageViewed();

// User actions
analytics.trackContinueClick(questionId, questionText);
analytics.trackPlanSelection('annual');
```

## New Architecture Benefits

### Single-Page Architecture
- **Persistent header**: No page jumps, smoother UX
- **Gradient background**: Consistent visual experience
- **Client-side navigation**: Faster transitions between pages

### Analytics Advantages
- **Session continuity**: No analytics reinitialization between pages
- **Better funnel tracking**: Smoother user journey tracking
- **Reduced bounce rate**: Users stay within single-page app

## Dashboard Analysis

### Key Funnels
1. **Landing → Quiz Start**: Measure initial engagement
2. **Question Progression**: Track drop-offs by question text
3. **Quiz → Pricing**: Conversion to pricing page
4. **Pricing → Trial**: Final conversion rate

### Segmentation
- **By Answer Patterns**: Group users by response combinations
- **By Question Drop-off**: Identify problematic questions
- **By Plan Preference**: Annual vs monthly selection patterns

### Performance Metrics
- **Question Completion Rate**: By question text (not just ID)
- **Time to Complete**: Full quiz duration
- **Conversion by Source**: Landing page to trial completion

## Example Queries

With question text included, create meaningful filters:

```sql
-- High-value users who mentioned Celiac
question_text = "What's your main reason for eating gluten-free?" 
AND answer contains "Celiac"

-- Users who skipped dining confidence questions
action = "skip" 
AND question_text contains "dining out"

-- Conversion rate by user segment
trial_started = true 
GROUP BY question_1_answer
```

## Error Handling

The system gracefully handles:
- **SSR environments**: No-op service prevents server errors
- **Missing Mixpanel**: Browser checks prevent runtime errors  
- **Storage failures**: Fallback user ID generation
- **Network issues**: Silent failures with console logging

This implementation provides robust, production-ready analytics while maintaining excellent developer experience and user performance. 