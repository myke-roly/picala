import {Linking, Platform} from 'react-native';
import {verifyEmail} from '../services/auth';
import {router} from 'expo-router';
import {DEEP_LINK_PATHS, DEEP_LINKS, URL_SCHEME} from '../constants/deepLinks';

export const handleUrl = (url: string) => {
  console.log('Deep link received:', url);

  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname;
    // const token = urlObj.searchParams.get('token');

    switch (true) {
      case path.includes(DEEP_LINK_PATHS.VERIFY_EMAIL):
        router.replace('/(auth)/verify-email');
        break;
      case path.includes(DEEP_LINK_PATHS.LOGIN):
        router.replace('/(auth)/login');
        break;
      case path.includes(DEEP_LINK_PATHS.REGISTER):
        router.replace('/(auth)/register');
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
