import {Linking} from 'react-native';
import {verifyEmail} from '../services/auth';
import {router} from 'expo-router';
import {DEEP_LINKS, URL_SCHEME} from '../constants/deepLinks';

export const handleEmailVerificationLink = async (url: string) => {
  try {
    // Parse the URL to extract token and type
    const urlObj = new URL(url);
    const token = urlObj.searchParams.get('token');
    const type = urlObj.searchParams.get('type');
    const email = urlObj.searchParams.get('email');

    if (token && type === 'signup') {
      // Verify the email
      await verifyEmail(token);

      // Navigate to login with success message
      router.replace({
        pathname: '/(auth)/login',
        params: {verified: 'true'},
      });

      return true;
    }

    return false;
  } catch (error) {
    console.error('Error handling email verification link:', error);

    // Navigate to verification screen with error
    router.replace({
      pathname: '/(auth)/verify-email',
      params: {error: 'verification_failed'},
    });

    return false;
  }
};

export const handleAppScheme = (url: string) => {
  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname;

    if (path === '/verify-email') {
      // Navigate to verification screen
      router.replace('/(auth)/verify-email');
    }
  } catch (error) {
    console.error('Error handling app scheme:', error);
  }
};

export const setupDeepLinkListener = () => {
  const handleUrl = (url: string) => {
    console.log('Deep link received:', url);

    // Handle Supabase verification links
    if (url.includes('auth/v1/verify')) {
      handleEmailVerificationLink(url);
    }

    // Handle our custom app scheme
    if (url.startsWith(URL_SCHEME)) {
      handleAppScheme(url);
    }
  };

  // Handle initial URL if app was opened via deep link
  Linking.getInitialURL().then((url) => {
    if (url) {
      handleUrl(url);
    }
  });

  // Listen for incoming links when app is already running
  const subscription = Linking.addEventListener('url', (event) => {
    handleUrl(event.url);
  });

  return subscription;
};
