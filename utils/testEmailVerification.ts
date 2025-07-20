import {verifyEmail} from '../services/auth';

// Test function to verify email with a token
export const testEmailVerification = async (token: string) => {
  try {
    console.log('Testing email verification with token:', token);

    const user = await verifyEmail(token);

    console.log('Email verification successful!');
    console.log('User:', user);

    return {
      success: true,
      user,
      message: 'Email verified successfully!',
    };
  } catch (error: any) {
    console.error('Email verification failed:', error);

    return {
      success: false,
      error: error.message,
      message: 'Email verification failed',
    };
  }
};

// Function to extract token from verification URL
export const extractTokenFromUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    const token = urlObj.searchParams.get('token');
    const type = urlObj.searchParams.get('type');

    return {
      token,
      type,
      isValid: !!(token && type === 'signup'),
    };
  } catch (error) {
    console.error('Error parsing URL:', error);
    return {
      token: null,
      type: null,
      isValid: false,
    };
  }
};
