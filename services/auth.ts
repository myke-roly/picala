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
  try {
    const {
      data: {user},
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error('Error getting current user:', error);
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const getCurrentSession = async () => {
  try {
    const {
      data: {session},
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error('Error getting current session:', error);
      return null;
    }

    return session;
  } catch (error) {
    console.error('Error getting current session:', error);
    return null;
  }
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth event:', event, session?.user?.email);
    callback(session?.user || null);
  });
};

export const refreshSession = async () => {
  try {
    const {data, error} = await supabase.auth.refreshSession();

    if (error) {
      console.error('Error refreshing session:', error);
      return null;
    }

    return data.session;
  } catch (error) {
    console.error('Error refreshing session:', error);
    return null;
  }
};

export const isSessionValid = async (): Promise<boolean> => {
  try {
    const session = await getCurrentSession();
    return !!session && !isTokenExpired(session);
  } catch (error) {
    console.error('Error checking session validity:', error);
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
