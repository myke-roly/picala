import {Linking, Platform} from 'react-native';
import {verifyEmail} from '../services/auth';
import {router} from 'expo-router';
import {DEEP_LINKS, URL_SCHEME} from '../constants/deepLinks';

export const handleEmailVerificationLink = async (url: string) => {
  try {
    console.log('Processing email verification link:', url);

    // Parse the URL to extract token and type
    const urlObj = new URL(url);
    const token = urlObj.searchParams.get('token');
    const type = urlObj.searchParams.get('type');
    const email = urlObj.searchParams.get('email');

    console.log('Extracted params:', {token: !!token, type, email});

    if (token && type === 'signup') {
      console.log('Redirecting to verification screen...');

      // Navigate to the dedicated verification screen
      router.replace({
        pathname: '/verify-email',
        params: {token, type},
      });

      return true;
    } else {
      console.log('Invalid verification link - missing token or wrong type');

      // Navigate to verification screen with error
      router.replace({
        pathname: '/verify-email',
        params: {error: 'invalid_link'},
      });
    }

    return false;
  } catch (error) {
    console.error('Error handling email verification link:', error);

    // Navigate to verification screen with error
    router.replace({
      pathname: '/verify-email',
      params: {error: 'verification_failed'},
    });

    return false;
  }
};

export const handleUrl = (url: string) => {
  console.log('Deep link received:', url);

  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname;

    switch (path) {
      case '/verify-email':
        router.replace('/(auth)/verify-email');
        break;
      default:
        break;
    }
  } catch (error) {
    console.error('Error handling app scheme:', error);
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
    .catch((error) => {
      console.error('Error getting initial URL:', error);
    });

  // Listen for incoming links when app is already running
  const subscription = Linking.addEventListener('url', (event) => {
    handleUrl(event.url);
  });

  return subscription;
};
