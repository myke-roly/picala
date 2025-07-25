// Deep link constants
export const DEEP_LINKS = {
  VERIFY_EMAIL: 'picala://verify-email',
  LOGIN: 'picala://login',
  REGISTER: 'picala://register',
} as const;

// URL scheme
export const URL_SCHEME = 'picala://';

export const DEEP_LINK_PATHS = {
  VERIFY_EMAIL: '/verify-email',
  LOGIN: '/login',
  REGISTER: '/register',
} as const;
