import { User } from './user';

export interface RegisterState {
  user: User | null;
  error: string | null;
}

export interface RegisterActions {
  register: (name: string, email: string, password: string) => Promise<void>;
}

export interface RegisterResponse {
  user: User;
  token: string;
}

export const initialState: RegisterState = {
  user: null,
  error: null,
};

export interface RegisterFormValues {
  name: string,
  email: string;
  password: string;
  confirmPassword: string,
}

export const initialValues: RegisterFormValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};
