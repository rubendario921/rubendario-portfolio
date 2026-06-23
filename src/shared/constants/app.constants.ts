/**
 * Application-wide constants.
 */
export const APP_CONSTANTS = {
  /**
   * Local storage keys.
   */
  STORAGE_KEYS: {
    USER_PREFERENCES: 'portfolio_user_preferences',
    THEME: 'portfolio_theme',
  },

  /**
   * Default configuration options.
   */
  DEFAULT_LOCALE: 'es-ES',

  /**
   * Technology categories.
   */
  TECH_CATEGORIES: {
    FRONTEND: 'Frontend',
    BACKEND: 'Backend',
    DATABASE: 'Database',
    DEVOPS: 'DevOps',
    MOBILE: 'Mobile',
    OTHER: 'Other',
  } as const,
} as const
