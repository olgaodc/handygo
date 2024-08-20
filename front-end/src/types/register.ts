import { User } from './user';

export interface RegisterState {
  user: User | null;
}

export interface RegisterActions {
  register: (values: RegisterFormValues) => Promise<void>;
}

export interface RegisterResponse {
  user: User;
  token: string;
}

export const initialState: RegisterState = {
  user: null,
};

export interface RegisterFormValues {
  name: string,
  surname: string,
  username: string,
  phone: string,
  email: string;
  password: string;
  confirmPassword: string,
}

export const initialValues: RegisterFormValues = {
  name: '',
  surname: '',
  username: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
};
