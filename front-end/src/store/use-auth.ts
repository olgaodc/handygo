import ApiService from '@/services/api-service';
import {
  AuthActions, AuthResponse, AuthState, initialState,
  LoginFormValues,
} from '@/types/login';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-toastify';
import useLikedCards from './use-like-card';

const useAuth = create<AuthState & AuthActions>()(
  persist((set) => ({
    ...initialState,
    login: async (values: LoginFormValues, showToast = true) => {
      try {
        const response = await ApiService.post<AuthResponse>('/login', values);
        if (response.status === 200) {
          const { userWithoutPassword: user, token } = response.data;
          set({ user, token });

          if (showToast) {
            toast.success('Logged in successfully!');
          }
        }
      } catch (err: any) {
        const errorMessage = err?.response?.data?.message || 'Something went wrong. Please try again later.';
        toast.error(errorMessage);
      }
    },
    logout: () => {
      set(initialState);
      useLikedCards.setState({ likedCards: [] });
    },
    setUser: (user) => set({ user }),
  }), {
    name: 'user',
  }),
);

export default useAuth;
