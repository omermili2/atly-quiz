# Design System Documentation

This document outlines the centralized design system for the Atly Quiz application, ensuring consistent styling across all pages in the new single-page architecture.

## Architecture Overview

The design system supports the **single-page architecture** with:
- **Persistent header**: Fixed logo/navigation that never reloads
- **Smooth gradient backgrounds**: Consistent purple gradient across all pages  
- **Responsive design**: Mobile-first approach with desktop enhancements
- **SSR-compatible**: All styles work with server-side rendering

## Import and Usage

```typescript
import { 
  COLORS, 
  TYPOGRAPHY, 
  LAYOUT, 
  COMPONENTS, 
  COMPOUND_STYLES,
  RESPONSIVE 
} from '@/lib/design';
```

## Design Token Categories

### COLORS
Centralized color definitions for the purple gradient theme:

```typescript
export const COLORS = {
  // Background gradients
  PRIMARY_GRADIENT: 'bg-gradient-to-br from-[#2b2e7a] via-[#5a2d91] to-[#a259c6]',
  
  // Text colors with opacity variants
  WHITE: 'text-white',
  WHITE_80: 'text-white/80', 
  WHITE_90: 'text-white/90',
  PINK_200: 'text-pink-200',
  PINK_300: 'text-pink-300',
  
  // Interactive states
  GRAY_300: 'text-gray-300',
  GRAY_200_HOVER: 'hover:text-gray-200',
  
  // Semi-transparent backgrounds
  WHITE_10_BG: 'bg-white/10',
  WHITE_25_BG: 'bg-white/25',
};
```

### TYPOGRAPHY  
Responsive text patterns with drop shadows for the gradient background:

```typescript
export const TYPOGRAPHY = {
  // Headings with consistent drop shadow
  HEADING_BASE: 'font-extrabold text-white drop-shadow-lg',
  HEADING_LARGE: 'text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg',
  HEADING_MEDIUM: 'text-lg md:text-4xl font-extrabold text-white drop-shadow-lg',
  HEADING_SMALL: 'text-base md:text-4xl font-bold text-white drop-shadow-lg',
  
  // Responsive body text
  BODY_SMALL_LARGE: 'text-sm md:text-lg',
  BODY_BASE_XL: 'text-base md:text-xl',
  BODY_SMALL_BASE: 'text-sm md:text-base',
  
  // Font weights and alignment
  FONT_SEMIBOLD: 'font-semibold',
  FONT_MEDIUM: 'font-medium', 
  FONT_BOLD: 'font-bold',
  TEXT_CENTER: 'text-center',
  TEXT_LEFT: 'text-left',
  LEADING_TIGHT: 'leading-tight',
};
```

### LAYOUT
Spacing patterns optimized for the new architecture:

```typescript
export const LAYOUT = {
  // Responsive spacing
  SPACE_Y_4_6: 'space-y-4 md:space-y-6',
  SPACE_Y_2_6: 'space-y-2 md:space-y-6',
  
  // Padding patterns (adjusted for persistent header)
  P_2_4: 'p-2 md:p-4',
  P_4_8: 'p-4 md:p-8', 
  PT_2_12: 'pt-2 md:pt-12', // Reduced on desktop for tighter layout
  
  // Margin patterns
  MB_1_2: 'mb-1 md:mb-2',
  MB_4_8: 'mb-4 md:mb-8',
  MT_4_8: 'mt-4 md:mt-8',
  
  // Flex layouts (core patterns)
  FLEX_CENTER: 'flex items-center justify-center',
  FLEX_CENTER_COL: 'flex flex-col items-center',
  FLEX_CENTER_BETWEEN: 'flex items-center justify-between',
  
  // Container patterns
  MIN_H_SCREEN: 'min-h-screen',
  MAX_W_XS: 'max-w-xs',      // Buttons
  MAX_W_2XL: 'max-w-2xl',    // Content sections
  MAX_W_3XL: 'max-w-3xl',    // Wide content
  W_FULL: 'w-full',
};
```

### COMPONENTS
Component-specific styling patterns:

```typescript
export const COMPONENTS = {
  // Card styling for glass morphism effect
  CARD_BASE: 'rounded-xl',
  CARD_GLASS: 'bg-white/10 backdrop-blur-sm rounded-xl',
  
  // Standardized text patterns
  ANSWER_CARD_TEXT: 'text-sm md:text-lg font-semibold leading-snug break-words hyphens-none pr-2 flex-1 text-left',
  
  // Link styling with hover states
  LINK_SECONDARY: 'text-gray-300 text-sm md:text-base hover:text-gray-200 transition-colors duration-150',
  
  // Button containers (consistent sizing)
  BUTTON_CONTAINER: 'w-full max-w-xs',
  
  // Icon sizing patterns
  ICON_SMALL: 'w-5 h-5 md:w-6 md:h-6',
  ICON_MEDIUM: 'text-xl md:text-3xl',
};
```

### RESPONSIVE
Cross-cutting responsive patterns:

```typescript
export const RESPONSIVE = {
  // Gap patterns
  GAP_2_4: 'gap-2 md:gap-4',
  GAP_1_2: 'gap-1 md:gap-2',
  
  // Grid patterns
  GRID_COLS_1: 'grid grid-cols-1',
  
  // Text handling
  TEXT_WRAP: 'break-words hyphens-none',
  TEXT_NOWRAP: 'whitespace-nowrap',
};
```

### COMPOUND_STYLES
Pre-composed styles for common UI patterns:

```typescript
export const COMPOUND_STYLES = {
  // Glass card with common styling (used in info pages)
  GLASS_CARD: `${LAYOUT.FLEX_CENTER} ${RESPONSIVE.GAP_2_4} ${COLORS.WHITE_90} ${COMPONENTS.CARD_GLASS} ${LAYOUT.P_2_4} w-fit`,
  
  // Heading patterns  
  MAIN_HEADING: `${TYPOGRAPHY.HEADING_LARGE} ${LAYOUT.MB_4_8} ${TYPOGRAPHY.LEADING_TIGHT}`,
  SECONDARY_HEADING: `${TYPOGRAPHY.HEADING_MEDIUM} ${LAYOUT.MB_1_2} ${TYPOGRAPHY.TEXT_CENTER} ${RESPONSIVE.TEXT_NOWRAP}`,
  
  // Text patterns
  ANSWER_TEXT: `${COMPONENTS.ANSWER_CARD_TEXT}`,
  SUBTITLE: `${TYPOGRAPHY.BODY_BASE_XL} ${COLORS.WHITE_80} ${LAYOUT.MB_4_8} ${TYPOGRAPHY.FONT_MEDIUM} ${TYPOGRAPHY.TEXT_CENTER}`,
  CTA_TEXT: `${COLORS.PINK_200} ${TYPOGRAPHY.FONT_SEMIBOLD} ${TYPOGRAPHY.BODY_BASE_XL}`,
  
  // Link patterns
  SECONDARY_LINK: `${COMPONENTS.LINK_SECONDARY}`,
};
```

## New Architecture Integration

### Single-Page Layout

The layout system now supports persistent components:

```typescript
// Root layout with persistent header and gradient
<body className={`${inter.className} ${COLORS.PRIMARY_GRADIENT} min-h-screen`}>
  <div className="min-h-screen flex flex-col">
    {!isLandingPage && <Header />}
    <div className="flex-1">{children}</div>
  </div>
</body>
```

### Page-Specific Adaptations

**Landing Page**: Full-screen with background image
```typescript
// Special case: background image with overlay
<div className="relative min-h-screen">
  <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url(...)"}} />
  <div className="absolute inset-0 bg-gradient-to-t from-[#5a2d91]/80 via-[#2b2e7a]/50 to-transparent" />
  <main className="relative z-20">...</main>
</div>
```

**Quiz Pages**: Account for header height
```typescript
// Adjusted height calculation for persistent header
<main className="min-h-[calc(100vh-140px)]">
```

**Info Pages**: Tighter spacing for desktop
```typescript
// Reduced top padding on desktop (pt-2 md:pt-3)
<div className="pt-1 md:pt-3">
```

## Usage Examples

### Component Styling
```typescript
// Answer cards with consistent styling
<div className={`${COMPOUND_STYLES.ANSWER_TEXT} ${
  isSelected ? COLORS.WHITE : 'text-[#2b2e7a]'
}`}>
  {answer}
</div>

// Info cards with glass morphism
<div className={COMPOUND_STYLES.GLASS_CARD}>
  <span className={COMPONENTS.ICON_MEDIUM}>{icon}</span>
  <span className={`${TYPOGRAPHY.BODY_SMALL_LARGE} ${TYPOGRAPHY.FONT_MEDIUM}`}>
    {text}
  </span>
</div>
```

### Responsive Layout
```typescript
// Quiz question layout
<Section maxWidth="2xl" spacing="sm" className="pt-4 md:pt-6">
  <div className={LAYOUT.SPACE_Y_2_6}>
    <h1 className={`${TYPOGRAPHY.HEADING_SMALL} ${TYPOGRAPHY.LEADING_TIGHT}`}>
      {question}
    </h1>
    <ProgressBar />
    <QuizAnswers />
  </div>
</Section>
```

### Conditional Styling
```typescript
// Dynamic card states
<Card className={`${COMPONENTS.CARD_GLASS} ${
  isSelected ? COLORS.WHITE_25_BG : COLORS.WHITE_10_BG
}`}>
```

## Design Principles

### 1. Mobile-First Responsive
- Base styles for mobile (320px+)
- `md:` prefix for desktop (768px+)
- Touch-friendly interaction areas (44px minimum)

### 2. Glass Morphism Theme
- Semi-transparent backgrounds (`bg-white/10`)
- Backdrop blur effects (`backdrop-blur-sm`)
- Consistent border radius (`rounded-xl`)

### 3. Accessibility
- High contrast white text on dark gradient
- Drop shadows for text readability
- Focus states on interactive elements

### 4. Performance
- Utility-first approach reduces bundle size
- Consistent class reuse across components
- No runtime style generation

## Migration Patterns

When updating components:

1. **Replace repeated classes** with design tokens
2. **Use compound styles** for common patterns  
3. **Apply responsive patterns** consistently
4. **Maintain accessibility** standards

## File Organization

```
src/
├── lib/design.ts          # Design system constants
├── components/
│   ├── ui/               # Reusable UI components
│   └── layout/           # Layout components
└── app/                  # Page implementations
```

This design system ensures visual consistency while supporting the smooth, single-page architecture that eliminates page jumping and provides an optimal user experience. 