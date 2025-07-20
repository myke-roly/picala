import {supabase} from '../config/supabase';
import {User, AuthError} from '@supabase/supabase-js';
import {DEEP_LINKS} from '../constants/deepLinks';

export interface AuthErrorType {
  code: string;
  message: string;
}

export interface SignUpResult {
  user: User | null;
  session: any | null;
  requiresEmailConfirmation: boolean;
}

export const signUp = async (email: string, password: string): Promise<SignUpResult> => {
  try {
    const {data, error} = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: DEEP_LINKS.VERIFY_EMAIL,
      },
    });

    if (error) {
      throw {
        code: error.message,
        message: getErrorMessage(error.message),
      };
    }

    if (!data.session) {
      throw {
        code: 'verification-required',
        message: 'Please check your inbox for email verification!',
      };
    }

    if (!data.user) {
      throw {
        code: 'auth/user-not-found',
        message: 'Failed to create user account.',
      };
    }

    return {
      user: data.user,
      session: data.session,
      requiresEmailConfirmation: !data.session,
    };
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

export const resendVerificationEmail = async (email: string): Promise<{success: boolean; message: string}> => {
  try {
    const {error} = await supabase.auth.resend({
      type: 'signup',
      email,
    });

    if (error) {
      throw {
        code: error.message,
        message: getErrorMessage(error.message),
      };
    }

    return {
      success: true,
      message: 'Verification email sent! Please check your inbox.',
    };
  } catch (error: any) {
    throw {
      code: error.code || 'auth/unknown',
      message: error.message || getErrorMessage(error.code),
    };
  }
};

export const verifyEmail = async (token: string): Promise<User> => {
  try {
    const {data, error} = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'signup',
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
        message: 'Failed to verify email.',
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
    case 'verification-required':
      return 'Please check your inbox for email verification!';
    case 'Invalid token':
      return 'The verification link is invalid or has expired.';
    case 'Token expired':
      return 'The verification link has expired. Please request a new one.';
    default:
      return 'An error occurred. Please try again.';
  }
};
