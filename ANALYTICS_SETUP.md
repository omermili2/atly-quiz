# Analytics Setup Guide

## Overview
Your Atly Quiz application now has comprehensive Mixpanel analytics tracking every user interaction, quiz data, and conversion metrics.

## 🚀 Quick Setup

### 1. Get Your Mixpanel Token
1. Go to [Mixpanel.com](https://mixpanel.com) and create/access your project
2. In your project settings, find your "Project Token"
3. Copy this token

### 2. Set Environment Variable
Create a `.env.local` file in your project root and add:
```bash
NEXT_PUBLIC_MIXPANEL_TOKEN=your_mixpanel_project_token_here
```

### 3. Deploy & Test
Once deployed, your analytics will start tracking automatically.

## 📊 What's Being Tracked

### **User Journey & Funnel**
- **Landing Page Load** - First touchpoint with UTM tracking
- **Quiz Started** - When user begins quiz
- **Question Views** - Each question viewed with timing
- **Quiz Completed** - Full completion with all answers
- **Pricing Page Views** - Conversion funnel tracking
- **Checkout Started** - Purchase intent tracking

### **Quiz Interactions**
- **Answer Selections** - Every single/multiple choice selection
- **Question Skips** - When users skip questions
- **Back Navigation** - When users go back to previous questions
- **Info Page Views** - Educational content engagement
- **Time Tracking** - Time spent on each question and overall

### **User Properties & Segmentation**
Each user gets tracked with:
- **All Quiz Answers** - Stored as `question_1_answer`, `question_2_answer`, etc.
- **User Segment** - Automatically categorized based on answers:
  - `celiac_diagnosed` - Medical necessity
  - `gluten_sensitive` - Health conscious  
  - `wellness_focused` - Lifestyle choice
  - `performance_athlete` - Performance optimization
  - `supporting_family` - Family support
- **Completion Metrics** - Completion rate, time to complete, questions skipped
- **Engagement Data** - Session info, referrer, UTM parameters

### **Conversion & Business Metrics**
- **Plan Selections** - Annual vs Monthly preference
- **Pricing Page Engagement** - Multiple visits, time spent
- **Checkout Events** - Purchase funnel tracking
- **Dropout Analysis** - Where users leave the funnel

## 🎯 Key Events You Can Track in Mixpanel

### **Funnel Analysis Events**
1. `Landing Page Loaded` → `Quiz Started` → `Quiz Completed` → `Pricing Page Viewed` → `Checkout Started`

### **Engagement Events**
- `Question Viewed` - Track drop-off by question
- `Answer Selected` - See popular answers
- `Question Skipped` - Identify problematic questions
- `Info Page Viewed` - Educational content effectiveness

### **User Behavior Events**
- `Back Navigation` - User journey patterns
- `Analysis Progress` - Engagement with loading experience
- `Plan Selected` - Pricing preference insights

## 📈 Recommended Mixpanel Dashboards

### **1. Funnel Conversion Dashboard**
Track the complete user journey from landing to purchase:
```
Landing Page → Quiz Start → Quiz Complete → Pricing → Checkout
```

### **2. Quiz Performance Dashboard**
- Question completion rates
- Average time per question
- Most/least popular answers
- Skip rates by question

### **3. User Segmentation Dashboard**
- User segments by quiz answers
- Segment-specific conversion rates
- Popular answers by segment

### **4. Revenue Analytics Dashboard**
- Plan selection preferences
- Conversion by traffic source
- User lifetime value by segment

## 🛠 Advanced Analytics Features

### **Cohort Analysis**
Track user behavior over time:
- Users who completed quiz in week 1 vs week 2
- Retention by user segment

### **A/B Testing Ready**
The system is set up to easily track experiments:
```javascript
analytics.track('Experiment Viewed', {
  experiment_name: 'pricing_page_v2',
  variant: 'control',
  user_segment: userSegment
});
```

### **Custom Events**
Add custom tracking anywhere:
```javascript
import analytics from '@/lib/analytics';

analytics.track('Custom Event', {
  custom_property: 'value',
  user_id: userId
});
```

## 🔍 Data You Can Access

### **Complete User Profiles**
Each user profile includes:
- All quiz answers
- Completion status and timing
- Traffic source and UTM data
- Engagement patterns
- Conversion status

### **Event Properties**
Every event includes:
- Session ID for journey tracking
- Timestamp for timing analysis
- User segment for personalization
- Question context for content optimization

## 📋 Sample Mixpanel Queries

### **Find High-Intent Users**
```javascript
// Users who completed quiz and viewed pricing
user['quiz_completed'] == true AND user['reached_pricing'] == true
```

### **Analyze Question Performance**
```javascript
// Questions with highest skip rates
event == "Question Skipped" 
GROUP BY properties["question_id"]
```

### **Segment Conversion Analysis**
```javascript
// Conversion by user segment
user['user_segment'] != null
GROUP BY user['user_segment']
```

## 🚨 Important Notes

1. **Privacy Compliant** - No PII is tracked, only behavioral data
2. **GDPR Ready** - User can be deleted from Mixpanel if requested
3. **Performance Optimized** - Analytics calls are non-blocking
4. **Error Handling** - Analytics failures won't break your app

## 🆘 Troubleshooting

### **Events Not Showing in Mixpanel**
1. Check your `NEXT_PUBLIC_MIXPANEL_TOKEN` is set correctly
2. Verify the token has the right permissions
3. Check browser dev tools for console errors

### **Missing User Properties**
1. Ensure users are being identified: `analytics.identifyUser()`
2. Check localStorage for `analytics_user_id`

### **Duplicate Events**
1. Make sure components aren't rendering multiple times
2. Check useEffect dependencies

## 📞 Support

For questions about the analytics implementation, check:
1. Browser dev tools console for errors
2. Mixpanel debugger for event validation
3. The analytics service file: `src/lib/analytics.ts`

---

**Your analytics are now tracking everything! 🎉**

Visit your Mixpanel dashboard to see real-time user data flowing in. 