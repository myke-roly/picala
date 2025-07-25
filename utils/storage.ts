import {Platform} from 'react-native';

// Create a storage object that matches the AsyncStorage interface
const createStorage = () => {
  if (Platform.OS === 'web') {
    // For web, use localStorage directly
    return {
      getItem: async (key: string): Promise<string | null> => {
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            return window.localStorage.getItem(key);
          }
          return null;
        } catch (error) {
          console.error('Error getting item from localStorage:', error);
          return null;
        }
      },

      setItem: async (key: string, value: string): Promise<void> => {
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem(key, value);
          }
        } catch (error) {
          console.error('Error setting item in localStorage:', error);
        }
      },

      removeItem: async (key: string): Promise<void> => {
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.removeItem(key);
          }
        } catch (error) {
          console.error('Error removing item from localStorage:', error);
        }
      },

      clear: async (): Promise<void> => {
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.clear();
          }
        } catch (error) {
          console.error('Error clearing localStorage:', error);
        }
      },
    };
  } else {
    // For mobile, use AsyncStorage
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      return AsyncStorage;
    } catch (error) {
      console.error('AsyncStorage not available:', error);
      // Fallback to memory storage
      const memoryStorage = new Map<string, string>();
      return {
        getItem: async (key: string): Promise<string | null> => {
          return memoryStorage.get(key) || null;
        },
        setItem: async (key: string, value: string): Promise<void> => {
          memoryStorage.set(key, value);
        },
        removeItem: async (key: string): Promise<void> => {
          memoryStorage.delete(key);
        },
        clear: async (): Promise<void> => {
          memoryStorage.clear();
        },
      };
    }
  }
};

const storage = createStorage();
export default storage;
