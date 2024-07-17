import ApiService from '@/services/api-service';
import { User } from '@/types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  token: string | null;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

type AuthResponse = {
  token: string;
  userWithoutPassword: User;
};

const initialState: AuthState = {
  user: null,
  token: null,
  error: null,
};

const useAuth = create<AuthState & AuthActions>()(persist((set) => ({
  ...initialState,
  login: async (email: string, password: string) => {
    try {
      const response = await ApiService.post<AuthResponse>('/login', {
        email,
        password,
      });
      if (response.status === 200) {
        const { userWithoutPassword: user } = response.data;
        const { token } = response.data;
        set({ user, token });
      }
    } catch {
      set({ error: 'Login failed. Please try again.' });
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
