import { create } from 'zustand';
import ApiService from '@/services/api-service';
import { persist } from 'zustand/middleware';
import {
  initialState, RegisterActions, RegisterFormValues, RegisterResponse, RegisterState,
} from '@/types/register';
import { toast } from 'react-toastify';
import useAuth from './use-auth';

const userRegister = create<RegisterState & RegisterActions>()(persist(
  () => ({
    ...initialState,
    register: async (values: RegisterFormValues) => {
      try {
        const response = await ApiService.post<RegisterResponse>('/register', values);

        if (response.status === 201) {
          const { login } = useAuth.getState();
          await login(values, false);

          toast.success('Registered successfully!');
        }
      } catch (err: any) {
        if (err.response && err.response.status === 400) {
          toast.error('User already exists');
        } else {
          const errorMessage = err?.response?.data?.message || 'Something went wrong. Please try again later.';
          toast.error(errorMessage);
        }
      }
    },
  }),
  {
    name: 'user',
  },
));

export default userRegister;
