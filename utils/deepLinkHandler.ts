import { Linking } from 'react-native';
import { router } from 'expo-router';

export const handleUrl = (url: string) => {


  const urlObj = new URL(url);
  const path = urlObj.pathname;
  const params = Object.fromEntries(urlObj.searchParams);

  if (!path) return;

  router.replace({
    pathname: '/linking',
    params: { path, ...params },
  });
};

export const setupDeepLinkListener = () => {
  // Handle initial URL if app was opened via deep link
  Linking.getInitialURL()
    .then((url) => {
      if (url) {
        handleUrl(url);
      }
    })
    .catch(() => {

    });

  // Listen for incoming links when app is already running
  const subscription = Linking.addEventListener('url', (event) => {
    handleUrl(event.url);
  });

  return subscription;
};
