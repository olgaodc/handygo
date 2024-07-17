import { create } from 'zustand';
import ApiService from '@/services/api-service';
import { User } from '@/types/user';

interface RegisterState {
  user: User | null;
  error: string | null;
  register: (name: string, email: string, password: string) => Promise<void>;
}

interface RegisterResponse {
  token: string;
  user: User;
}

const userRegister = create<RegisterState>((set) => ({
  user: null,
  error: null,
  register: async (name: string, email: string, password: string) => {
    const response = await ApiService.post<RegisterResponse>('/register', {
      name,
      email,
      password,
    });

    if (response.status === 201) {
      set({ user: response.data.user, error: null });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } else {
      set({ error: 'Registration failed' });
    }
  },
}));

export default userRegister;
