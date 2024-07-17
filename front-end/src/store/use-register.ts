import { create } from 'zustand';
import ApiService from '@/services/api-service';
import { User } from '@/types/user';
import { persist } from 'zustand/middleware';

interface RegisterState {
  user: User | null;
  error: string | null;
}

interface RegisterActions {
  register: (name: string, email: string, password: string) => Promise<void>;
}

interface RegisterResponse {
  user: User;
}

const initialState: RegisterState = {
  user: null,
  error: null,
};

const userRegister = create<RegisterState & RegisterActions>()(persist(
  (set) => ({
    ...initialState,
    register: async (name: string, email: string, password: string) => {
      try {
        const response = await ApiService.post<RegisterResponse>('/register', {
          name,
          email,
          password,
        });

        if (response.status === 201) {
          const { user } = response.data;
          set({ user });
        }
      } catch (err) {
        set({ error: 'Registration failed. Please try again.' });
      }
    },
  }),
  {
    name: 'user',
    partialize: (state) => Object.fromEntries(
      Object.entries(state).filter(
        ([key]) => !['error'].includes(key),
      ),
    ),
  },
));

export default userRegister;
