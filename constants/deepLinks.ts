export const URL_SCHEME = process.env.EXPO_PUBLIC_BASE_URL || 'picala://';

export const DEEP_LINKS = {
  VERIFY_EMAIL: `${URL_SCHEME}verify-email`,
  LOGIN: `${URL_SCHEME}login`,
  REGISTER: `${URL_SCHEME}register`,
} as const;

export const DEEP_LINK_PATHS = {
  VERIFY_EMAIL: '/verify-email',
  LOGIN: '/login',
  REGISTER: '/register',
} as const;
