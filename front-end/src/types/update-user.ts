import { User } from './user';

export interface UpdateState {
  user: User | null;
  token: string | null;
}

export interface UpdateUserActions {
  update: (
    values: UpdateUserFormValues
  ) => Promise<void>;
}

export interface UpdateResponse {
  token: string;
  userWithoutPassword: User;
}

export const initialState: UpdateState = {
  user: null,
  token: null,
};

export interface UpdateUserFormValues {
  name: string,
  surname: string,
  username: string,
  phone: string,
  email: string;
  currentPassword: string,
  newPassword: string,
}

export const initialValues: UpdateUserFormValues = {
  name: '',
  surname: '',
  username: '',
  phone: '',
  email: '',
  currentPassword: '',
  newPassword: '',
};
