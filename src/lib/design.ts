// Design System Constants
// Centralized design tokens for consistent styling across the application

export const COLORS = {
  // Background gradients
  PRIMARY_GRADIENT: 'bg-gradient-to-br from-[#2b2e7a] via-[#5a2d91] to-[#a259c6]',
  
  // Text colors
  WHITE: 'text-white',
  WHITE_80: 'text-white/80',
  WHITE_90: 'text-white/90',
  PINK_200: 'text-pink-200',
  PINK_300: 'text-pink-300',
  
  // Interactive colors
  GRAY_300: 'text-gray-300',
  GRAY_200_HOVER: 'hover:text-gray-200',
  
  // Background overlays
  WHITE_10_BG: 'bg-white/10',
  WHITE_25_BG: 'bg-white/25',
} as const;

export const TYPOGRAPHY = {
  // Heading styles with drop shadow
  HEADING_BASE: 'font-extrabold text-white drop-shadow-lg',
  HEADING_LARGE: 'text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg',
  HEADING_MEDIUM: 'text-lg md:text-4xl font-extrabold text-white drop-shadow-lg',
  HEADING_SMALL: 'text-base md:text-4xl font-bold text-white drop-shadow-lg',
  
  // Body text responsive patterns
  BODY_SMALL_LARGE: 'text-sm md:text-lg',
  BODY_BASE_XL: 'text-base md:text-xl',
  BODY_SMALL_BASE: 'text-sm md:text-base',
  
  // Text weights and styles
  FONT_SEMIBOLD: 'font-semibold',
  FONT_MEDIUM: 'font-medium',
  FONT_BOLD: 'font-bold',
  
  // Text positioning
  LEADING_TIGHT: 'leading-tight',
  LEADING_SNUG: 'leading-snug',
  TEXT_CENTER: 'text-center',
  TEXT_LEFT: 'text-left',
} as const;

export const EFFECTS = {
  // Shadows and blur
  DROP_SHADOW: 'drop-shadow-lg',
  BACKDROP_BLUR: 'backdrop-blur-sm',
  SHADOW_XL: 'shadow-xl',
  
  // Transitions
  TRANSITION_COLORS: 'transition-colors duration-150',
  TRANSITION_ALL: 'transition-all duration-300',
} as const;

export const LAYOUT = {
  // Common spacing patterns
  SPACE_Y_4_6: 'space-y-4 md:space-y-6',
  SPACE_Y_2_6: 'space-y-2 md:space-y-6',
  
  // Padding patterns
  P_2_4: 'p-2 md:p-4',
  P_4_8: 'p-4 md:p-8',
  PT_2_12: 'pt-2 md:pt-12',
  
  // Margin patterns
  MB_1_2: 'mb-1 md:mb-2',
  MB_4_8: 'mb-4 md:mb-8',
  MT_4_8: 'mt-4 md:mt-8',
  
  // Flex layouts
  FLEX_CENTER: 'flex items-center justify-center',
  FLEX_CENTER_COL: 'flex flex-col items-center',
  FLEX_CENTER_BETWEEN: 'flex items-center justify-between',
  
  // Container patterns
  MIN_H_SCREEN: 'min-h-screen',
  MAX_W_XS: 'max-w-xs',
  MAX_W_2XL: 'max-w-2xl',
  MAX_W_3XL: 'max-w-3xl',
  W_FULL: 'w-full',
} as const;

export const COMPONENTS = {
  // Card styling patterns
  CARD_BASE: 'rounded-xl',
  CARD_GLASS: 'bg-white/10 backdrop-blur-sm rounded-xl',
  
  // Answer card common styling
  ANSWER_CARD_TEXT: 'text-sm md:text-lg font-semibold leading-snug break-words hyphens-none pr-2 flex-1 text-left',
  
  // Link styling
  LINK_SECONDARY: 'text-gray-300 text-sm md:text-base hover:text-gray-200 transition-colors duration-150',
  
  // Button areas
  BUTTON_CONTAINER: 'w-full max-w-xs',
  
  // Icon sizing
  ICON_SMALL: 'w-5 h-5 md:w-6 md:h-6',
  ICON_MEDIUM: 'text-xl md:text-3xl',
} as const;

export const RESPONSIVE = {
  // Common gap patterns
  GAP_2_4: 'gap-2 md:gap-4',
  GAP_1_2: 'gap-1 md:gap-2',
  
  // Grid patterns
  GRID_COLS_1: 'grid grid-cols-1',
  
  // Text wrapping and overflow
  TEXT_WRAP: 'break-words hyphens-none',
  TEXT_NOWRAP: 'whitespace-nowrap',
} as const;

// Compound styles for common UI patterns
export const COMPOUND_STYLES = {
  // Page container with gradient background
  PAGE_CONTAINER: `${LAYOUT.FLEX_CENTER_COL} ${LAYOUT.MIN_H_SCREEN} ${LAYOUT.P_4_8} ${TYPOGRAPHY.TEXT_CENTER} ${COLORS.PRIMARY_GRADIENT}`,
  
  // Main heading style
  MAIN_HEADING: `${TYPOGRAPHY.HEADING_LARGE} ${LAYOUT.MB_4_8} ${TYPOGRAPHY.LEADING_TIGHT}`,
  
  // Secondary heading style  
  SECONDARY_HEADING: `${TYPOGRAPHY.HEADING_MEDIUM} ${LAYOUT.MB_1_2} ${TYPOGRAPHY.TEXT_CENTER} ${RESPONSIVE.TEXT_NOWRAP}`,
  
  // Glass card with common styling
  GLASS_CARD: `${LAYOUT.FLEX_CENTER} ${RESPONSIVE.GAP_2_4} ${COLORS.WHITE_90} ${COMPONENTS.CARD_GLASS} ${LAYOUT.P_2_4} w-fit`,
  
  // Secondary link pattern
  SECONDARY_LINK: `${COMPONENTS.LINK_SECONDARY}`,
  
  // Answer text common pattern
  ANSWER_TEXT: `${COMPONENTS.ANSWER_CARD_TEXT}`,
  
  // Subtitle pattern
  SUBTITLE: `${TYPOGRAPHY.BODY_BASE_XL} ${COLORS.WHITE_80} ${LAYOUT.MB_4_8} ${TYPOGRAPHY.FONT_MEDIUM} ${TYPOGRAPHY.TEXT_CENTER}`,
  
  // CTA text pattern
  CTA_TEXT: `${COLORS.PINK_200} ${TYPOGRAPHY.FONT_SEMIBOLD} ${TYPOGRAPHY.BODY_BASE_XL}`,
} as const; 