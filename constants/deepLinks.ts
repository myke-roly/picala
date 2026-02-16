import * as Linking from 'expo-linking';

// Dynamically determine the URL scheme based on the environment (Expo Go vs Production/Dev Build)
export const URL_SCHEME = Linking.createURL('/');

export const DEEP_LINKS = {
  VERIFY_EMAIL: Linking.createURL('/verify-email'),
  LOGIN: Linking.createURL('/login'),
  REGISTER: Linking.createURL('/register'),
  RESET_PASSWORD: Linking.createURL('/reset-password'),
} as const;

export const DEEP_LINK_PATHS = {
  VERIFY_EMAIL: '/verify-email',
  LOGIN: '/login',
  REGISTER: '/register',
  RESET_PASSWORD: '/reset-password',
} as const;
