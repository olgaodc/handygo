import { User } from './user';

export interface AuthState {
  user: User | null;
  token: string | null;
  error: string | null;
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export type AuthResponse = {
  token: string;
  userWithoutPassword: User;
};

export const initialState: AuthState = {
  user: null,
  token: null,
  error: null,
};

export interface LoginFormValues {
  email: string;
  password: string;
}

export const initialValues: LoginFormValues = {
  email: '',
  password: '',
};
