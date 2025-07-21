# Design System Documentation

This file documents the centralized design system for consistent styling across the application.

## Import and Usage

```typescript
import { 
  COLORS, 
  TYPOGRAPHY, 
  LAYOUT, 
  COMPONENTS, 
  COMPOUND_STYLES 
} from '@/lib/design';
```

## Design Token Categories

### COLORS
Centralized color definitions:
- `PRIMARY_GRADIENT` - Main background gradient
- `WHITE`, `WHITE_80`, `WHITE_90` - Text colors with opacity
- `PINK_200`, `PINK_300` - Accent colors
- `WHITE_10_BG`, `WHITE_25_BG` - Semi-transparent backgrounds

### TYPOGRAPHY  
Text styling patterns:
- `HEADING_LARGE`, `HEADING_MEDIUM`, `HEADING_SMALL` - Responsive headings with drop shadow
- `BODY_SMALL_LARGE`, `BODY_BASE_XL` - Responsive body text
- `FONT_SEMIBOLD`, `FONT_MEDIUM`, `FONT_BOLD` - Font weights
- `TEXT_CENTER`, `TEXT_LEFT` - Text alignment

### LAYOUT
Spacing and positioning:
- `FLEX_CENTER`, `FLEX_CENTER_COL`, `FLEX_CENTER_BETWEEN` - Flex layouts
- `SPACE_Y_4_6`, `SPACE_Y_2_6` - Vertical spacing
- `P_2_4`, `P_4_8`, `PT_2_12` - Padding patterns
- `MB_1_2`, `MB_4_8`, `MT_4_8` - Margin patterns
- `MAX_W_XS`, `MAX_W_2XL`, `MAX_W_3XL` - Max width containers

### COMPONENTS
Component-specific styling:
- `CARD_GLASS` - Semi-transparent card background
- `ANSWER_CARD_TEXT` - Standardized answer text styling
- `LINK_SECONDARY` - Secondary link styling with hover
- `ICON_SMALL`, `ICON_MEDIUM` - Icon sizing patterns

### COMPOUND_STYLES
Pre-composed styles for common patterns:
- `PAGE_CONTAINER` - Standard page layout with gradient
- `MAIN_HEADING` - Large hero heading
- `SECONDARY_HEADING` - Section heading  
- `GLASS_CARD` - Semi-transparent card with blur
- `ANSWER_TEXT` - Answer card text styling
- `SUBTITLE` - Subtitle text pattern
- `CTA_TEXT` - Call-to-action text styling

## Usage Examples

### Basic Usage
```typescript
// Instead of inline classes
<div className="flex flex-col items-center min-h-screen">

// Use design tokens
<div className={`${LAYOUT.FLEX_CENTER_COL} ${LAYOUT.MIN_H_SCREEN}`}>
```

### Compound Styles
```typescript
// Instead of repeating complex class combinations
<main className="flex flex-col items-center min-h-screen p-4 md:p-8 text-center bg-gradient-to-br from-[#2b2e7a] via-[#5a2d91] to-[#a259c6]">

// Use compound style
<main className={COMPOUND_STYLES.PAGE_CONTAINER}>
```

### Conditional Styling
```typescript
<p className={`${COMPOUND_STYLES.ANSWER_TEXT} ${
  isSelected ? COLORS.WHITE : 'text-[#2b2e7a]'
}`}>
```

## Benefits

1. **Consistency** - Ensures uniform styling across components
2. **Maintainability** - Update styles in one place
3. **Developer Experience** - Autocomplete and type safety
4. **Performance** - Reduced bundle size vs repeated inline classes
5. **Scalability** - Easy to extend and modify design system

## Migration Guide

When updating existing components:

1. Import design constants
2. Replace repeated class combinations with compound styles
3. Use individual tokens for custom combinations
4. Update component-specific patterns

## File Structure

- `src/lib/design.ts` - Main design system file
- Components updated: `PageLayout`, `AnswerCard`, `MultipleChoiceCard`, `ProgressBar`, `InfoPage` 