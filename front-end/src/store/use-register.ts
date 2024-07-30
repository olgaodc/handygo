import { create } from 'zustand';
import ApiService from '@/services/api-service';
import { persist } from 'zustand/middleware';
import {
  initialState, RegisterActions, RegisterResponse, RegisterState,
} from '@/types/register';
import useAuth from './use-auth';

const userRegister = create<RegisterState & RegisterActions>()(persist(
  (set) => ({
    ...initialState,
    register: async (
      name: string,
      surname: string,
      username: string,
      phone: string,
      email: string,
      password: string,
    ) => {
      try {
        const response = await ApiService.post<RegisterResponse>('/register', {
          name,
          surname,
          username,
          phone,
          email,
          password,
        });

        if (response.status === 201) {
          const { login } = useAuth.getState();
          await login(email, password);
        }
      } catch (err: any) {
        if (err.response && err.response.status === 400) {
          set({ error: 'User already exists' });
        } else {
          set({ error: 'Something went wrong. Please try again later.' });
        }
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
