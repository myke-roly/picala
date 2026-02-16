import { supabase } from '../config/supabase';
import { User } from '@supabase/supabase-js';
import { DEEP_LINKS } from '../constants/deepLinks';
import Logger from './logger';

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
    const { data, error } = await supabase.auth.signUp({
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
    const { data, error } = await supabase.auth.signInWithPassword({
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

export const resendVerificationEmail = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    const { error } = await supabase.auth.resend({
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

export const forgotPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: DEEP_LINKS.RESET_PASSWORD,
    });

    if (error) {
      throw {
        code: error.message,
        message: getErrorMessage(error.message),
      };
    }

    return {
      success: true,
      message: 'Password reset link sent! Please check your email.',
    };
  } catch (error: any) {
    throw {
      code: error.code || 'auth/unknown',
      message: error.message || getErrorMessage(error.code),
    };
  }
};

export const verifyOtp = async (token: string): Promise<User> => {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
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

export const signOut = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();
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

export const getUser = async (): Promise<User | null> => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {

      return null;
    }

    return user;
  } catch (error) {

    return null;
  }
};

export const getSession = async () => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {

      return null;
    }

    return session;
  } catch (error) {

    return null;
  }
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return supabase.auth.onAuthStateChange((event, session) => {

    callback(session?.user || null);
  });
};

export const refreshSession = async () => {
  try {
    const { data, error } = await supabase.auth.refreshSession();

    if (error) {

      return null;
    }

    return data.session;
  } catch (error) {

    return null;
  }
};

export const isSessionValid = async (): Promise<boolean> => {
  try {
    const session = await getSession();
    return !!session && !isTokenExpired(session);
  } catch (error) {

    return false;
  }
};

const isTokenExpired = (session: any): boolean => {
  if (!session?.expires_at) return true;

  const expiresAt = new Date(session.expires_at * 1000);
  const now = new Date();

  // Consider token expired if it expires within the next 5 minutes
  return expiresAt.getTime() <= now.getTime() + 5 * 60 * 1000;
};


export const exchangeCodeForSession = async (code: string): Promise<{ success: boolean; session: any }> => {
  try {
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      throw {
        code: error.message,
        message: getErrorMessage(error.message),
      };
    }

    if (!session) {
      throw {
        code: 'auth/session-missing',
        message: 'Failed to retrieve session from code.',
      };
    }

    return { success: true, session };
  } catch (error: any) {
    throw {
      code: error.code || 'auth/unknown',
      message: error.message || getErrorMessage(error.code),
    };
  }
};

export const setSession = async (access_token: string, refresh_token: string): Promise<{ success: boolean; session: any }> => {
  try {
    const { data: { session }, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (error) {
      throw {
        code: error.message,
        message: getErrorMessage(error.message),
      };
    }

    if (!session) {
      throw {
        code: 'auth/session-missing',
        message: 'Failed to set session from tokens.',
      };
    }

    return { success: true, session };
  } catch (error: any) {
    throw {
      code: error.code || 'auth/unknown',
      message: error.message || getErrorMessage(error.code),
    };
  }
};


// Helper function to convert Supabase error messages to user-friendly messages
const ERROR_MESSAGES: Record<string, string> = {
  'User already registered': 'An account with this email already exists.',
  'Invalid login credentials': 'Invalid email or password. Please try again.',
  'Email not confirmed': 'Please check your email and confirm your account.',
  'Password should be at least 6 characters': 'Password should be at least 6 characters long.',
  'User not found': 'No account found with this email address.',
  'Too many requests': 'Too many failed attempts. Please try again later.',
  'Network request failed': 'Network error. Please check your connection and try again.',
  'verification-required': 'Please check your inbox for email verification!',
  'Invalid token': 'The verification link is invalid or has expired.',
  'Token expired': 'The verification link has expired. Please request a new one.',
};

const DEFAULT_ERROR_MESSAGE = 'An error occurred. Please try again.';

// Helper function to convert Supabase error messages to user-friendly messages
const getErrorMessage = (code: string): string => {
  Logger.error(`Auth Error: ${code}`);
  return ERROR_MESSAGES[code] || DEFAULT_ERROR_MESSAGE;
};
