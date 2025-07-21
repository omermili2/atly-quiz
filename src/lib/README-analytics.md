# Simplified Analytics Documentation

This document outlines the streamlined analytics tracking focused on funnel analysis and conversion tracking.

## Event Categories

### 1. Page Visits (Funnel Analysis)
Track where users are in the funnel and identify drop-off points.

**Event:** `Page Visit`

**Pages tracked:**
- `Landing Page` - Entry point
- `Quiz Question` - Each question page (includes `question_id`)
- `Quiz Info` - Info pages between questions (includes `question_id`)
- `Quiz End` - Quiz completion page
- `Analysis` - Loading/analysis page
- `Pricing` - Pricing selection page

**Usage:**
```typescript
analytics.trackLandingPageLoad();
analytics.trackQuestionViewed(questionId);
analytics.trackInfoPageViewed(questionId);
analytics.trackQuizEndViewed();
analytics.trackAnalysisPageViewed();
analytics.trackPricingPageViewed();
```

### 2. User Actions
Track user interactions to understand engagement patterns.

**Event:** `User Action`

**Actions tracked:**
- `continue` - User proceeds forward
- `back` - User navigates backward
- `skip` - User skips current step

**Properties:**
- `action` - The action type
- `question_id` - Which question (if applicable)
- `from_page` - Source page (if applicable)
- `to_page` - Destination page (if applicable)

**Usage:**
```typescript
analytics.trackContinueClick(questionId);
analytics.trackBackClick(questionId);
analytics.trackSkipClick(questionId);
```

### 3. Answer Selection
Track what users answer to understand user segments and preferences.

**Event:** `Answer Selected`

**Properties:**
- `question_id` - Which question number
- `answer` - Array of selected answers (even for single choice)
- `question_type` - `'single'` or `'multiple'`

**User Profile Storage:**
Answers are stored in user profiles as `question_1_answer`, `question_2_answer`, etc.

**Usage:**
```typescript
// Single choice
analytics.trackAnswer(1, "I have a Celiac disease diagnosis", 'single');

// Multiple choice (handled automatically)
analytics.trackAnswer(2, ["Staff knowledge", "Reviews from people"], 'multiple');
```

### 4. Conversion Tracking
Track the complete conversion funnel from plan selection to trial start.

**Events:**
- `Plan Selected` - User selects a plan
- `Checkout Started` - User begins checkout process
- `Free Trial Started` - User completes signup (conversion!)

**Properties:**
- `plan_type` - `'annual'` or `'monthly'`

**User Profile Storage:**
- `selected_plan` - Last selected plan
- `checkout_started` - Boolean flag
- `trial_started` - Boolean flag (conversion indicator)
- `trial_plan` - Plan user converted with
- `conversion_date` - When conversion happened

**Usage:**
```typescript
analytics.trackPlanSelection('annual');
analytics.trackCheckoutStart('annual');
analytics.trackTrialStart('annual'); // This is the conversion event!
```

## Implementation

### Auto-tracked Events
These events are automatically tracked by components:

- **Page visits** - Tracked by page components on mount
- **Question answers** - Tracked by AnswerCard/MultipleChoiceCard on selection
- **Back/Skip actions** - Tracked by ProgressBar on click

### Manual Tracking Required
These events need to be manually added:

- **Continue clicks** - Add to buttons/forms
- **Plan selection** - Add to plan option clicks
- **Trial start** - Add to final form submission

## Funnel Analysis

With this simplified tracking, you can analyze:

1. **Drop-off rates** between pages
2. **Question completion rates** by question ID
3. **Most popular answers** by question
4. **Conversion rates** by plan type
5. **User journey patterns** (back/skip behavior)

## Data Points for Dashboards

### Funnel Metrics
- Landing Page → Quiz Start rate
- Question completion rate by question ID
- Quiz End → Pricing rate  
- Pricing → Checkout rate
- Checkout → Trial Start rate (conversion)

### User Behavior
- Most skipped questions
- Most common back navigation patterns
- Answer distribution by question
- Plan selection preferences

### Conversion Analysis
- Time from landing to conversion
- Answer patterns of converted users
- Plan type performance
- Drop-off analysis by funnel stage 