export const Colors = {
  primaryDeepBlue: '#0F1B3D',
  primaryGold: '#F8D26A',
  neutralWhite: '#FFFFFF',
  neutralBlack: '#000000',
  glassTint: 'rgba(255,255,255,0.10)',
  glassTintDark: 'rgba(15,27,61,0.08)',
  accentLavender: '#EAE8FF',
  dangerRed: '#A61C2C',
  textPrimary: '#0F1B3D',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  divider: 'rgba(15,27,61,0.08)',
  shadow: 'rgba(0,0,0,0.12)',
  glassBorder: 'rgba(255,255,255,0.18)',
  glassBg: 'rgba(255,255,255,0.08)',
} as const;

export const Typography = {
  h1: {
    fontSize: 28,
    fontWeight: '600' as const,
    lineHeight: 36,
  },
  h2: {
    fontSize: 22,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  caption: {
    fontSize: 11,
    fontWeight: '400' as const,
    lineHeight: 14,
  },
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
} as const;

export const Radii = {
  card: 18,
  bigCard: 24,
  pill: 32,
  button: 12,
  small: 8,
} as const;

export const Shadows = {
  soft: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 6,
  },
  medium: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  light: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
} as const;

export const Animations = {
  short: 180,
  medium: 280,
  long: 350,
} as const;
