import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { refreshSession, isSessionValid } from '@/services/auth';

export const usePersistentAuth = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const appState = useRef(AppState.currentState);
  const refreshTimeoutRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active' && isAuthenticated) {
        // App has come to the foreground, check session validity
        // console.log('App came to foreground, checking session...');

        try {
          const isValid = await isSessionValid();

          if (!isValid) {
            // console.log('Session is invalid, attempting to refresh...');
            await refreshSession();
          }
        } catch (error) {
          // console.error('Error checking/refreshing session on app foreground:', error);
        }
      }

      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription?.remove();
    };
  }, [isAuthenticated]);

  // Set up periodic session refresh when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // Refresh session every 30 minutes
      const refreshInterval = 30 * 60 * 1000; // 30 minutes

      refreshTimeoutRef.current = setInterval(async () => {
        try {
          // console.log('Performing periodic session refresh...');
          await refreshSession();
        } catch (error) {
          // console.error('Error during periodic session refresh:', error);
        }
      }, refreshInterval);
    } else {
      // Clear interval if user is not authenticated
      if (refreshTimeoutRef.current) {
        clearInterval(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }
    }

    return () => {
      if (refreshTimeoutRef.current) {
        clearInterval(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }
    };
  }, [isAuthenticated, user]);

  return {
    user,
    loading,
    isAuthenticated,
  };
};
