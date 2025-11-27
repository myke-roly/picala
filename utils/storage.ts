const createStorage = () => {
  try {
    const SecureStore = require('expo-secure-store');
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;

    return {
      getItem: async (key: string): Promise<string | null> => {
        // Try SecureStore first (for tokens)
        try {
          const secureValue = await SecureStore.getItemAsync(key);
          if (secureValue) return secureValue;
        } catch (e) {
          // Ignore errors from SecureStore (e.g. key not found or not available)
        }
        // Fallback to AsyncStorage
        return await AsyncStorage.getItem(key);
      },
      setItem: async (key: string, value: string): Promise<void> => {
        // Use SecureStore for Supabase tokens
        if (key.includes('supabase.auth.token')) {
          try {
            await SecureStore.setItemAsync(key, value);
            return;
          } catch (e) {
            console.warn('SecureStore failed, falling back to AsyncStorage', e);
          }
        }
        await AsyncStorage.setItem(key, value);
      },
      removeItem: async (key: string): Promise<void> => {
        try {
          await SecureStore.deleteItemAsync(key);
        } catch (e) {
          // Ignore
        }
        await AsyncStorage.removeItem(key);
      },
      clear: async (): Promise<void> => {
        // SecureStore doesn't have a clear all easily without options, but we can ignore for now or implement if needed
        // For now, just clear AsyncStorage as it's the main store
        await AsyncStorage.clear();
      }
    };
  } catch (error) {
    // Fallback to memory storage if modules are missing
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
};

// Storage adapter that prefers SecureStore for sensitive data
const storage = createStorage();
export default storage;
