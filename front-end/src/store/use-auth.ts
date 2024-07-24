import ApiService from '@/services/api-service';
import {
  AuthActions, AuthResponse, AuthState, initialState,
} from '@/types/login';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuth = create<AuthState & AuthActions>()(persist((set) => ({
  ...initialState,
  login: async (email: string, password: string) => {
    try {
      const response = await ApiService.post<AuthResponse>('/login', {
        email,
        password,
      });
      if (response.status === 200) {
        const { userWithoutPassword: user, token } = response.data;
        set({ user, token });
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        set({ error: 'Incorrect email or password' });
      } else {
        set({ error: 'Something went wrong. Please try again later.' });
      }
    }
  },
  logout: () => {
    set(initialState);
  },
}), {
  name: 'user',
  partialize: (state) => Object.fromEntries(
    Object.entries(state).filter(
      ([key]) => !['error'].includes(key),
    ),
  ),
}));

export default useAuth;
