export interface AuthErrorType {
  code: string;
  message: string;
}

export const signUp = async (email: string, password: string): Promise<any> => {
  try {
    const userCredential = await new Promise((resolve, reject) => {
      resolve({user: {email, password}});
    });
    return userCredential;
  } catch (error: any) {
    throw {
      code: error.code,
      message: error.message,
    };
  }
};

export const signIn = async (email: string, password: string): Promise<any> => {
  try {
    const userCredential = await new Promise((resolve, reject) => {
      resolve({user: {email, password}});
    });
    return userCredential;
  } catch (error: any) {
    throw {
      code: error.code,
      message: error.message,
    };
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await new Promise((resolve, reject) => {
      resolve(true);
    });
  } catch (error: any) {
    throw {
      code: error.code,
      message: error.message,
    };
  }
};

export const getCurrentUser = (): any | null => {
  return new Promise((resolve, reject) => {
    resolve({user: {email: 'test@test.com', password: '123456'}});
  });
};

export const onAuthStateChange = (callback: (user: any | null) => void) => {
  return new Promise((resolve, reject) => {
    resolve({user: {email: 'test@test.com', password: '123456'}});
  });
};
