import axios from 'axios';

const postgrestApiUrl = import.meta.env.VITE_POSTGREST_API_URL;

if (!postgrestApiUrl) {
  throw new Error('Missing PostgREST environment variable');
}

export const postgrestClient = axios.create({
  baseURL: postgrestApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example function to sign in a user
export const signIn = async (email: string, password: string) => {
  try {
    const response = await postgrestClient.post('/rpc/signin', { email, password });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error signing in');
    }
    throw new Error('Error signing in');
  }
};

// Example function to sign up a user
export const signUp = async (email: string, password: string, username: string) => {
  try {
    const response = await postgrestClient.post('/rpc/signup', { email, password, username });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error signing up');
    }
    throw new Error('Error signing up');
  }
};

// Example function to sign out a user
export const signOut = async () => {
  try {
    // Implement sign out logic if needed
    return { message: 'Signed out successfully' };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error signing out');
    }
    throw new Error('Error signing out');
  }
};