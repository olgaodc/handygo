import { User } from './user';

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface AuthActions {
  login: (values: LoginFormValues, showToast: boolean) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export type AuthResponse = {
  token: string;
  userWithoutPassword: User;
};

export const initialState: AuthState = {
  user: null,
  token: null,
};

export interface LoginFormValues {
  email: string;
  password: string;
}

export const initialValues: LoginFormValues = {
  email: '',
  password: '',
};
