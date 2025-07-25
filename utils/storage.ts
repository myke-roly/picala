const createStorage = () => {
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
};

const storage = createStorage();
export default storage;
