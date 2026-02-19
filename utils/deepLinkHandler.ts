import * as Linking from 'expo-linking';
import { router } from 'expo-router';

export const handleUrl = (url: string) => {
  try {
    // console.log('Incoming Deep Link:', url);
    const parsed = Linking.parse(url);

    // Provide a default path if none exists (e.g. standard deep link launch)
    let path = parsed.path || '';

    // Ensure path starts with /
    if (!path.startsWith('/')) {
      path = '/' + path;
    }

    // Some verify-email URLs might come as /verify-email directly or within the path
    // We normalize to ensure we handle it correctly

    // Combine query params and any potential hash fragments that Supabase might send
    // Supabase sometimes puts access tokens in the hash
    const queryParams = parsed.queryParams || {};

    // Handle hash if it exists (manual parsing as expo-linking sometimes keeps it in path or separate)
    // Note: expo-linking parse might not fully break down hash params into an object depending on version/format
    // But verify-email usually sends code as query param.
    // Reset Password / Implicit flow sends #access_token=...

    // Simple manual hash parser for robustness if expo-linking doesn't catch it
    const hashParams: Record<string, string> = {};
    if (url.includes('#')) {
      const hashParts = url.split('#');
      const hashString = hashParts.length > 1 ? hashParts[1] : '';
      if (hashString) {
        hashString.split('&').forEach(pair => {
          const [key, value] = pair.split('=');
          if (key) hashParams[key] = decodeURIComponent(value || '');
        });
      }
    }

    const allParams = { ...queryParams, ...hashParams };

    // Check if we should process this link
    // Only process if we have auth-related paths or params or specific dynamic routes
    const isAuthLink =
      path.includes('verify-email') ||
      path.includes('reset-password') ||
      allParams.code ||
      allParams.access_token ||
      allParams.token_hash ||
      allParams.token;

    const isDeepLink =
      path !== '/' &&
      path !== '' &&
      !path.startsWith('/--/'); // Ignore Expo Go internal paths if empty

    if (!isAuthLink && !isDeepLink) {
      // console.log('Ignoring non-actionable deep link:', { path });
      return;
    }

    // console.log('Processing deep link:', { path, allParams });

    // Navigate to the linking handler screen with all params
    // Note: We only redirect if it's an auth link. 
    // If it's a general deep link (like /profile/123), Expo Router might handle it automatically.
    // But for our auth flow we force the /linking route.
    if (isAuthLink) {
      router.replace({
        pathname: '/linking',
        params: { path, ...allParams },
      });
    } else {
      // Let normal routing happen or handle other deep links here
      // console.log('Passing through non-auth deep link');
    }

  } catch (e) {
    console.error('Error handling deep link:', e);
  }
};

export const setupDeepLinkListener = () => {
  // Handle initial URL if app was opened via deep link
  Linking.getInitialURL()
    .then((url) => {
      if (url) {
        handleUrl(url);
      }
    })
    .catch((e) => {
      console.error('Error getting initial URL:', e);
    });

  // Listen for incoming links when app is already running
  const subscription = Linking.addEventListener('url', (event) => {
    handleUrl(event.url);
  });

  return subscription;
};
