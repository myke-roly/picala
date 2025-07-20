import {supabase} from '../config/supabase';
import {User, AuthError} from '@supabase/supabase-js';

export interface AuthErrorType {
  code: string;
  message: string;
}

export const signUp = async (email: string, password: string): Promise<User> => {
  try {
    const {data, error} = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw {
        code: error.message,
        message: getErrorMessage(error.message),
      };
    }

    if (!data.user) {
      throw {
        code: 'auth/user-not-found',
        message: 'Failed to create user account.',
      };
    }

    return data.user;
  } catch (error: any) {
    throw {
      code: error.code || 'auth/unknown',
      message: error.message || getErrorMessage(error.code),
    };
  }
};

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw {
        code: error.message,
        message: getErrorMessage(error.message),
      };
    }

    if (!data.user) {
      throw {
        code: 'auth/user-not-found',
        message: 'No user found with these credentials.',
      };
    }

    return data.user;
  } catch (error: any) {
    throw {
      code: error.code || 'auth/unknown',
      message: error.message || getErrorMessage(error.code),
    };
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    const {error} = await supabase.auth.signOut();
    if (error) {
      throw {
        code: error.message,
        message: getErrorMessage(error.message),
      };
    }
  } catch (error: any) {
    throw {
      code: error.code || 'auth/unknown',
      message: error.message || getErrorMessage(error.code),
    };
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  const {data} = await supabase.auth.getUser();
  return data.user;
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null);
  });
};

// Helper function to convert Supabase error messages to user-friendly messages
const getErrorMessage = (code: string): string => {
  switch (code) {
    case 'User already registered':
      return 'An account with this email already exists.';
    case 'Invalid login credentials':
      return 'Invalid email or password. Please try again.';
    case 'Email not confirmed':
      return 'Please check your email and confirm your account.';
    case 'Password should be at least 6 characters':
      return 'Password should be at least 6 characters long.';
    case 'User not found':
      return 'No account found with this email address.';
    case 'Too many requests':
      return 'Too many failed attempts. Please try again later.';
    case 'Network request failed':
      return 'Network error. Please check your connection and try again.';
    default:
      return 'An error occurred. Please try again.';
  }
};
