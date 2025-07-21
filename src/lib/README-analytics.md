# Simplified Analytics Documentation

This document outlines the streamlined analytics tracking focused on funnel analysis and conversion tracking.

## Event Categories

### 1. Page Visits (Funnel Analysis)
Track where users are in the funnel and identify drop-off points.

**Event:** `Page Visit`

**Pages tracked:**
- `Landing Page` - Entry point
- `Quiz Question` - Each question page (includes `question_id` and `question_text`)
- `Quiz Info` - Info pages between questions (includes `question_id` and `question_text`)
- `Quiz End` - Quiz completion page
- `Analysis` - Loading/analysis page
- `Pricing` - Pricing selection page

**Usage:**
```typescript
analytics.trackLandingPageLoad();
analytics.trackQuestionViewed(questionId, questionText);
analytics.trackInfoPageViewed(questionId, infoTitle);
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
- `question_text` - The actual question text (if applicable)
- `from_page` - Source page (if applicable)
- `to_page` - Destination page (if applicable)

**Usage:**
```typescript
analytics.trackContinueClick(questionId, questionText);
analytics.trackBackClick(questionId, questionText);
analytics.trackSkipClick(questionId, questionText);
```

### 3. Answer Selection
Track what users answer to understand user segments and preferences.

**Event:** `Answer Selected`

**Properties:**
- `question_id` - Which question number
- `question_text` - The actual question text
- `answer` - Array of selected answers (even for single choice)
- `question_type` - `'single'` or `'multiple'`

**User Profile Storage:**
Answers are stored in user profiles as:
- `question_1_answer`, `question_2_answer`, etc. - The selected answers
- `question_1_text`, `question_2_text`, etc. - The question text for easy reference

**Usage:**
```typescript
// Single choice
analytics.trackAnswer(1, "I have a Celiac disease diagnosis", 'single', "What's your main reason for eating gluten-free?");

// Multiple choice (handled automatically)
analytics.trackAnswer(2, ["Staff knowledge", "Reviews from people"], 'multiple', "When choosing a place, what matters most to you?");
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

- **Page visits** - Tracked by page components on mount (includes question text)
- **Question answers** - Tracked by AnswerCard/MultipleChoiceCard on selection (includes question text)
- **Back/Skip actions** - Tracked by ProgressBar on click (includes question text)

### Manual Tracking Required
These events need to be manually added:

- **Continue clicks** - Add to buttons/forms
- **Plan selection** - Add to plan option clicks
- **Trial start** - Add to final form submission

## Mixpanel Dashboard Benefits

### Enhanced Filtering
With question text included, you can now:

1. **Filter by Question Text**: Instead of remembering that "Question 1" is about motivation, you can filter by "What's your main reason for eating gluten-free?"

2. **Create Meaningful Cohorts**: 
   - Users who answered "I have a Celiac disease diagnosis" 
   - Users who skipped "When choosing a place, what matters most to you?"

3. **Better Dashboard Readability**: Charts show actual question text instead of just question IDs

### Improved Analytics Workflow
- **Easier Analysis**: No need to cross-reference question IDs with question text
- **Better Collaboration**: Non-technical team members can understand reports without a reference sheet
- **Faster Insights**: Question text appears directly in Mixpanel filters and breakdowns

## Funnel Analysis

With this simplified tracking, you can analyze:

1. **Drop-off rates** between pages (now with question text for context)
2. **Question completion rates** by question text (more readable)
3. **Most popular answers** by question (with full question context)
4. **Conversion rates** by plan type
5. **User journey patterns** (back/skip behavior with question context)

## Data Points for Dashboards

### Funnel Metrics
- Landing Page → Quiz Start rate
- Question completion rate by question text (not just ID)
- Quiz End → Pricing rate  
- Pricing → Checkout rate
- Checkout → Trial Start rate (conversion)

### User Behavior
- Most skipped questions (with question text visible)
- Most common back navigation patterns (with question context)
- Answer distribution by question (readable question text)
- Plan selection preferences

### Conversion Analysis
- Time from landing to conversion
- Answer patterns of converted users (with readable question text)
- Plan type performance
- Drop-off analysis by funnel stage

## Example Mixpanel Filters

Now you can create filters like:
- `question_text contains "gluten-free"`
- `question_text = "What's your main reason for eating gluten-free?"`
- `answer contains "Celiac"`

This makes your analytics much more user-friendly and reduces the need to maintain separate question ID reference sheets! 